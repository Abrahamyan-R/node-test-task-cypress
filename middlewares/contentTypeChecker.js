module.exports = (req, res, next) => {
  const { 'content-type': contentType } = req.headers;
  // checking content type existance
  // because there are cypress test in which content type not specified
  if (contentType && contentType != 'application/json') return res.status(415).send();

  next();
};