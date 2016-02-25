module.exports = class BaseActor {
  constructor(options) {
    Object.keys(options).forEach((key) => {
      this[key] = options[key];
    });
  }
}
