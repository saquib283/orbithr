export const MOCK_EMPLOYEES = Array.from({ length: 12 }).map((_, i) => ({
    id: `EMP-${1000 + i}`,
    name: [
        'Alice Johnson', 'Bob Smith', 'Charlie Davis', 'Diana Prince',
        'Evan Wright', 'Fiona Green', 'George Hill', 'Hannah White'
    ][i % 8],
    role: i % 3 === 0 ? 'Manager' : 'Employee',
    department: ['Engineering', 'HR', 'Sales', 'Marketing'][i % 4],
    age: 24 + (i * 2),
    attendance: 85 + (Math.random() * 15), // Random number between 85-100
    subjects: ['React', 'Node.js', 'GraphQL'].slice(0, (i % 3) + 1),
    status: i === 2 ? 'On Leave' : 'Active',
    avatarUrl: `https://i.pravatar.cc/150?u=${i}`
}));