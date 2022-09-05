const jwt=require('jsonwebtoken')
const { createError }=require("../utils/error.js")
const Admin=require('../models/Admins')


const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "Not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) return next(createError(403, "Invalid Token!"));
    req.user = user;
    next();
  });
};

const verifyEmployee = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

const verifyAdmin = async(req, res, next) => {
  verifyToken(req, res, next, () => {
    const isAdmin=Admin.find({_id:req.user._id})
    if (isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
module.exports={verifyEmployee,verifyAdmin}