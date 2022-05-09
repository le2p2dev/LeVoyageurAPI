module.exports = {
  test(req, res, next) {
    return res.send({
      status: 200,
      response: "ok",
    });
  },
};
