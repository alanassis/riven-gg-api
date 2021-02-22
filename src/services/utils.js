module.exports = {
  async safeAsync(res, func) {
    try {
      return await func();
    } catch (error) {
      return res.status(400).json({
        code: error.code,
        message: error.message,
      });
    }
  },

  throwError(message, code = "") {
    throw {
      code: code || 0,
      message,
    };
  },
};
