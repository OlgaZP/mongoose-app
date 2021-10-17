const createError = require('http-errors');
const { User } = require('./../models');

module.exports.createUser = async (req, res, next) => {
  const { body } = req;
  console.log(`body`, body);

  try {
    console.log(`controller: into createUser function`);

    const newUserInstanse = new User(body);
    const createdUser = await newUserInstanse.save();
    console.log(`createdUser`, createdUser);
    if (createdUser) {
      res.status(200).send(createdUser);
    }
    next(createError(400, 'Bad request'));
  } catch (err) {
    next(err);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    console.log(`controller: into getUsers function`);

    const foundUsers = await User.find().limit(3);
    console.log(`foundUsers`, foundUsers);

    res.status(200).send({ data: foundUsers });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  try {
    console.log(`controller: into getUserById function`);
    // const userId = '616c398f0147bebe865bccd3';
    const foundUser = await User.findById(userId);
    console.log(`foundUser`, foundUser);
    if (foundUser) {
      return res.status(200).send({ data: foundUser });
    }
    next(createError(404, 'User not found'));
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserById = async (req, res, next) => {
  const {
    params: { userId },
    body,
  } = req;

  try {
    console.log(`controller: into updateUserById function`);
    console.log(`body`, body);

    const updatedUser = await User.findByIdAndUpdate(userId, body);

    if (updatedUser) {
      return next();
      // return res.status(200).send({ data: updatedUser });
    }
    next(createError(404, 'User not found'));
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUserById = async (req, res, next) => {
  const {
    params: { userId },
  } = req;
  try {
    console.log(`controller: into deleteUserById function`);
    const deletedUser = await User.findByIdAndDelete(userId);

    if (deletedUser) {
      return res.status(200).send({ data: deletedUser });
    }
    next(createError(400, 'User not found'));
  } catch (err) {
    next(err);
  }
};
