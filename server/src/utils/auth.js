const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key_fallback';

module.exports = {
    // Function to create a JWT token
    signToken: ({ id, role }) => {
        // Payload stores user ID and Role
        const payload = { id, role };

        // Sign the token with secret and set expiration
        return jwt.sign({ data: payload }, JWT_SECRET, { expiresIn: '2h' });
    },

    // Middleware helper to verify token from headers
    getUserFromToken: (token) => {
        if (!token) return null;

        try {
            // Remove 'Bearer ' prefix if present
            const cleanToken = token.replace('Bearer ', '');

            // Verify and decode
            const { data } = jwt.verify(cleanToken, JWT_SECRET);
            return data;
        } catch (err) {
            // If token is invalid or expired
            return null;
        }
    }
};