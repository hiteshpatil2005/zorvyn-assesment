const User = require('./user.model');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json({ success: true, data: users });
};