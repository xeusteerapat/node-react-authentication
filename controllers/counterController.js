let counter = 0;

const getCounter = (req, res) => {
  res.send(String(counter));
};

const updateCounter = (req, res) => {
  counter = String(req.body.counter);
  res.send(counter);
};

module.exports = {
  getCounter,
  updateCounter
};
