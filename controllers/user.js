const User = require("../models/user");

exports.getUserById = async (req, res, next, id) => {
  User.findOne({id}).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    users,
    message: 'user list get success'
  });
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this user",
        });
      }
      res.status(200).json({
        user,
        message: 'User data updated successfully',
        success: true
      });
    }
  );
};