const { LolApi, Constants } = require("twisted");
const { throwError } = require("./utils");
const lolApi = new LolApi(process.env.RIOT_KEY);

module.exports = {
  async getByNick(nick) {
    if (nick.length < 3 || nick.length > 16)
      throwError("Nome de invocador inválido");

    const summoner = await lolApi.Summoner.getByName(
      nick,
      Constants.Regions.BRAZIL
    );

    return {
      nickname: summoner.response.name,
      level: summoner.response.summonerLevel,
      profileIconId: summoner.response.profileIconId,
    };
  },
};
