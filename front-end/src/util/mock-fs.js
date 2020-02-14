// This file fixes 'googleapis' use of 'fs' module which cannot be invoked when using webpack

module.exports = {
  readFile() {}
};
