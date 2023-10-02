const chatPage = (req, res) => {
  res.json({ status: true, user: req.user });
};

module.exports = chatPage;
