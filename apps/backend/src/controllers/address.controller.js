// const validateAddressInput = require("../validation/validateAddress");
const Address = require("../models/address");

const createAddress = async (req, res) => {
  const address = await Address.create(req.body);
  res.status(200).send(address);
};

module.exports = {
  createAddress,
};
