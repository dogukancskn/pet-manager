const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Token yok",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;//user bilgisi eklemek için

        next()
    } catch (error) {
        return res.status(401).json({
            message: "Geçersiz token",
        });
    }
}