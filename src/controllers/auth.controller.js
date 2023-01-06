const user = require('../models/user.model');
const bcrypt = require('bcrypt');
const APIError = require('../utils/errors');
const Response = require('../utils/response');

const login = async (req, res) => {
    // console.log(req.body)
    // return res.json(req.body);
    const { email } = req.body;
    const userCheck = await user.findOne({ email }).exec();
    if (userCheck) {
        const passwordCheck = await bcrypt.compare(req.body.password, userCheck.password);
        if (passwordCheck)
            return new Response({email : email}, "Login successful").success(res);
        else
            throw new Response({email : email},"Password is incorrect").error401(res);
    }
    else
        throw new Response({email : email},"Email is incorrect").error401(res);

}

const register = async (req, res) => {
    const {email} = req.body;
    const userCheck = await user.findOne({email});
    if(userCheck){
        throw new APIError("Email already exists", 401);
    }
    else{
        req.body.password = await bcrypt.hash(req.body.password, 10);

        const userSave = new user(req.body);
        await userSave.save().then((data) => {
            data.password = "";
            return new Response(data, "User created successfully").created(res);
        }).catch((err) => {
            throw new APIError(err.message, 500);
        });
    }
}

module.exports = {
    login,
    register
};