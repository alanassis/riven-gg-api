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

      switch (error.status) {
        case 404:
          errorMessage.message = "Invocador não encontrado";
          break;
        default:
          errorMessage.message = "Serviço indisponível";
          break;
      }

      return res.status(400).json(errorMessage);
    }
  },

  throwError(message, status = "") {
    throw {
      status: status || 0,
      message,
    };
  },
};
