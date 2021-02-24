module.exports = {
  async safeAsync(res, func) {
    try {
      return await func();
    } catch (error) {
      console.log(error.message);

      const errorMessage = {
        status: error.status || 0,
        message: error.message,
      };

      if (error.message.includes("ENOTFOUND")) {
        errorMessage.message = "Invocador não encontrado";
      }

      return res.status(400).json(errorMessage);
    }
  },

  throwError(message, status) {
    throw {
      status: status || 0,
      message,
    };
  },
};
