const authSucc = (res, data, code = 200, status = "nice") => {
  //   const testOn204 = code === 204 ? 200 : code;
  res.status(code).json({
    code,
    status,
    ...data,
  });
};

module.exports = authSucc;
