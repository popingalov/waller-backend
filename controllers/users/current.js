const current = async (req, res, next) => {
  res.json({
    name: req.user.name,
    email: req.user.email,
  });
};

module.exports = current;
