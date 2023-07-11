const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const ResponseUtils = require("./responseUtils");
const { users } = require("../entities/users.entities");



// const signJWTToken = (user) => {
//   let token = jwt.sign({ user }, config.secret, {
//     expiresIn: process.env.JWT_EXPIRY_TIME, // 5m
//   });

//   return { token, expiresIn: 300000 };
// };

const signJWTToken = (user) => {
  const token = jwt.sign(user, 'your_secret_key', { expiresIn: '1h' });
  const expiresIn = 3600; // 1 hour in seconds

  return {
    token,
    expiresIn,
  };
};


const verifyJWTToken = async (token, req, res) => {
  return jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return ResponseUtils.sendError(res, req, {}, "Unauthorized!", 401);
    }

    req.user = decoded.user;

    return true;
  });
};


const verifyUserToken = async (token, req, res) => {
  try {
    const user = await users.findOne({
      where: {
        remember_token: token
      }
    });

    // console.log(token,"user ");

    if (!user) {
      return ResponseUtils.sendError(res, req, {}, "Unauthorized!", 401);
    }

    req.user = user;
    return true;
  } catch (err) {
    return ResponseUtils.sendError(res, req, {}, "Unauthorized!", 401);
  }
};


module.exports = { signJWTToken, verifyJWTToken, verifyUserToken };
