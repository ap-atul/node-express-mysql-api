const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

const Log = require('../utils/logger')
const HttpException = require('../utils/http_exception')

dotenv.config();

const auth = () => {

	return async function (req, res, next){
		try{

			const authHeader = req.headers.authorization;
			const bearer = 'Bearer ';

			if(!authHeader || !authHeader.startswith(bearer)){
				Log.debug("Authentication failed user token not found");
				throw new HttpException(401, 'Access denied. No credentials send!');
			}

			const token = authHeader.replace(bearer, '');
			const secret = process.env.SECRET_JWT || "";

			const decoded = jwt.verify(token, secret);
			const user = await UserModel.findOne({id: decoded.user_id});

			if(!user){
				Log.debug("Authentication failed user token invalid");
				throw new HttpException(401, "Authentication failed!");
			}

			req.currentUser = user;
			next();

		} catch (e) {
			e.status = 401;
			next(e);
		}
	}

}


module.exports = auth;