const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    data: {
      users
    }
  });
});

exports.getUser = (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'This route not yet defined'
  });
};

exports.createUser = (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'This route not yet defined'
  });
};

exports.updateUser = (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'This route not yet defined'
  });
};

exports.deleteUser = (req, res) => {
  res.status(501).json({
    status: 'error',
    message: 'This route not yet defined'
  });
};
