const { LolApi } = require("twisted");
const lolApi = new LolApi(process.env.RIOT_KEY);

function throwError(message, status) {
  throw {
    status: status || 0,
    message,
  };
}

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

  async getSummonerId(nick, region) {
    if (nick.length < 3 || nick.length > 16)
      throwError("Nome de invocador inválido", 400);

    const summoner = await lolApi.Summoner.getByName(nick, region);

    return summoner.response;
  },

  throwError,
};
