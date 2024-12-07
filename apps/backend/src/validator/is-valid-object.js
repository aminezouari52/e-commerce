const ObjectId = require("mongoose").Types.ObjectId;

module.exports = function isValidObjectIdTest(id) {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
};
