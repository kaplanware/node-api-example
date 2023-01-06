const user = require('../models/user.model');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    console.log(req.body)
    return res.json(req.body);
}

const register = async (req, res) => {
    const {email} = req.body;
    const userCheck = await user.findOne({email});
    if(userCheck){
        console.log("mail kullanılıyor")
    }
    else{
        req.body.password = await bcrypt.hash(req.body.password, 10);
        console.log(req.body);

        try{
            const user = new user(req.body);
            await user.save().then((response) => {
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
        // const newUser = new user({
        //     email,
        //     password
        // });
        // newUser.save();
        // return res.json({
        //     message: "Kayıt başarılı"
        // })
    }
    console.log(email)
    console.log(req.body)
    return res.json(email);
}

module.exports = {
    login,
    register
};