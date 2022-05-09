module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.code).json(err.message);
};
