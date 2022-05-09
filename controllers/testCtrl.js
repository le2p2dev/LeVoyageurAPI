module.exports = {
  test(req, res, next) {
    return res.json({
      status: 200,
      response: "ok",
    });
  },
};
