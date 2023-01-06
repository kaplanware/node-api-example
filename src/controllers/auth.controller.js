const user = require('../models/user.model');
const bcrypt = require('bcrypt');
const APIError = require('../utils/errors');

const login = async (req, res) => {
    // console.log(req.body)
    // return res.json(req.body);
    const { email } = req.body;
    const userCheck = await user.findOne({ email }).exec();
    if (userCheck) {
        const passwordCheck = await bcrypt.compare(req.body.password, userCheck.password);
        if (passwordCheck) {
            return res.status(200).json({
                status: true,
                data: userCheck,
                message: "Giriş başarılı"
            })
        }
        else {
            return res.status(400).json({
                status: false,
                message: "Şifre yanlış"
            })
        }
    }
    else {
        return res.status(400).json({
            status: false,
            message: "Giriş başarısız"
        })
    }

}

const register = async (req, res) => {
    const {email} = req.body;
    const userCheck = await user.findOne({email});
    if(userCheck){
        throw new APIError("Email already exists", 401);
    }
    else{
        req.body.password = await bcrypt.hash(req.body.password, 10);

        try{
            const userSave = new user(req.body);
            await userSave.save().then((response) => {
                return res.status(201).json({
                    status: true,
                    data: response,
                    message: "Kullanıcı başarıyla oluşturuldu",
                })
            }).catch((err) => {
                console.log("kayıt başarısız", err)
            });
        }
        catch(err){
            console.log(err);
        }
    }
}

module.exports = {
    login,
    register
};