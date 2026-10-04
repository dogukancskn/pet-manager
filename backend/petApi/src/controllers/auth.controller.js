const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Ad, email ve şifre gerekli"
            });
        }

        const userExists = await User.findOne({
            where: { email }
        });

        if (userExists) {
            return res.status(400).json({
                message: "Bu email zaten kayıtlı",
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "Kullanıcı oluşturuldu",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Bir hata oluştu",
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email ve şifre gerekli",
            });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({
                message: "Kullanıcı bulunamadı"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Şifre yanlış",
            });
        }

        //Token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.status(200).json({
            success: true,
            message: "Giriş başarılı",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Bir hata oluştu",
        });
    }
}
exports.getMe = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "Kullanıcı bulunamadı"
            });
        }

        res.status(200).json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Kullanıcı bilgileri alınamadı"
        });
    }
};
