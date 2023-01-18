import jwt from 'jsonwebtoken';
const jwtSecret = toString(process.env.TOKEN_SECRET);

export const loggedIn = (req, res, next) => {
    const token = req.header('access-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        jwt.verify(token, jwtSecret, (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: 'Token is not valid' });
            } else {
                req.user = decoded.id;
                next();
            }
        });
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};
