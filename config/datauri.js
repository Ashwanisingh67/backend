const DataUriParser = require("datauri/parser.js");
const path = require("path");

const getDataUri = (file) => {
  if (!file || !file.originalname || !file.buffer) {
    throw new Error("Invalid file object: Missing originalname or buffer");
  }

  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};

module.exports = getDataUri;