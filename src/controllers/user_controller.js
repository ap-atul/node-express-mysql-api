const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const UserModel = require('../models/user_model')
const HttpException = require('../utils/http_exception');

dotenv.config();

class UserController {

    test = async (req, res, next) => {
        res.status(200).send({message : "Hello World"});
    }

    getAllUsers = async (req, res, next) => {
        let userList = await UserModel.find();

        if(!userList.length){
            throw new HttpException(404, "Users not found");
        }

        userList = userList.map(user => {
            const {password, ...unknown} = user;
            return unknown;
        });

        res.send(userList);
    }

    userLogin = async (req, res, next) => {
        const {email, password: pass} = req.body;
        const user = await UserModel.findOne({email});

        if(!user){
            throw new HttpException(401, "Incorrect passowrd.");
        }

        const secret = process.env.SECRET_JWT || "";
        const token = jwt.sign({user_id: user.id.toString()}, secret);

        res.send({token});
    }

    hashPassword = async (req) => {
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
    }

}


module.exports = new UserController;