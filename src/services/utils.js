const { Constants } = require("twisted");

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

  throwError(message, status = "") {
    throw {
      status: status || 0,
      message,
    };
  },

  isNickValid(nick) {
    if (nick.length < 3 || nick.length > 16)
      throwError("Nome de invocador inválido", 400);
  },

  getRegion(region) {
    let selectedRegion;
    for (let i in Constants.Regions) {
      if (region.toLocaleLowerCase() === i.toLocaleLowerCase()) {
        selectedRegion = i;
      }
    }

    if (!selectedRegion) throwError("Região inválida", 400);

    return selectedRegion;
  },
};
