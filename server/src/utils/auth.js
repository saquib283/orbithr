const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key_fallback';
module.exports = {
    signToken: ({ id, role }) => {
        const payload = { id, role };
        return jwt.sign({ data: payload }, JWT_SECRET, { expiresIn: '2h' });
    },
    getUserFromToken: (token) => {
        if (!token) return null;
        try {
            const cleanToken = token.replace('Bearer ', '');
            const { data } = jwt.verify(cleanToken, JWT_SECRET);
            return data;
        } catch (err) {
            return null;
        }
    }
};