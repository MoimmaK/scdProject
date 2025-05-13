const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'your-secret-key';

function generateToken(user) {
    return jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
}

function authenticateToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch {
        res.status(403).json({ error: 'Invalid or expired token.' });
    }
}



module.exports = { generateToken, authenticateToken };
