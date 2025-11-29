const Employee = require('../models/Employee');
const { signToken } = require('../utils/auth');
const { AuthenticationError, ForbiddenError } = require('apollo-server');

const resolvers = {
    Query: {
        getEmployees: async (_, { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', filter }, context) => {
            const skip = (page - 1) * limit;
            const sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
            let query = {};
            if (filter) {
                query = {
                    $or: [
                        { name: { $regex: filter, $options: 'i' } },       // Case-insensitive Name
                        { class: { $regex: filter, $options: 'i' } },      // Case-insensitive Class
                        { department: { $regex: filter, $options: 'i' } }, // Case-insensitive Dept
                        { role: { $regex: filter, $options: 'i' } }        // Case-insensitive Role
                    ]
                };
            }
            const employees = await Employee.find(query)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit);

            const totalCount = await Employee.countDocuments(query);

            return {
                employees,
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page
            };
        },
        getEmployee: async (_, { id }) => {
            return await Employee.findById(id);
        }
    },

    Mutation: {
        // 3. Login Mutation (Returns Token)
        login: async (_, { email, password }) => {
            // 1. Get credentials from Environment Variables
            // (We keep the strings as fallbacks just in case .env isn't loaded)
            const validEmail = process.env.ADMIN_EMAIL || 'admin@orbit.com';
            const validPass = process.env.ADMIN_PASSWORD || 'admin123';

            if (email === validEmail && password === validPass) {
                const adminUser = {
                    id: 'admin-1',
                    role: 'ADMIN',
                    name: 'Super Admin',
                    department: 'HQ',
                    status: 'Active',
                    attendance: 100,
                    subjects: [],
                    age: 35,
                    class: 'Senior Management'
                };

                // Generate JWT
                const token = signToken(adminUser);
                return { token, user: adminUser };
            }

            throw new AuthenticationError('Invalid credentials');
        },

        addEmployee: async (_, { input }, context) => {
            if (context.user?.role !== 'ADMIN') throw new ForbiddenError('Access Denied: Admins only');

            const generatedAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(input.name)}&background=random&color=fff&size=128`;

            const newEmployee = new Employee({
                ...input, 

                status: input.status || 'Active',
                attendance: input.attendance || 100,
                department: input.department || 'General',

                avatarUrl: generatedAvatar
            });

            return await newEmployee.save();
        },

        updateEmployee: async (_, { id, input }, context) => {
            if (context.user?.role !== 'ADMIN') throw new ForbiddenError('Access Denied: Admins only');

            return await Employee.findByIdAndUpdate(id, input, { new: true });
        },

        deleteEmployee: async (_, { id }, context) => {
            if (context.user?.role !== 'ADMIN') throw new ForbiddenError('Access Denied: Admins only');

            await Employee.findByIdAndDelete(id);
            return true;
        }
    }
};

module.exports = resolvers;