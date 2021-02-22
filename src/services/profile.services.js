const { LolApi, Constants } = require("twisted");
const lolApi = new LolApi(process.env.RIOT_KEY);

module.exports = {
  async getByNick(nick) {
    const summoner = await lolApi.Summoner.getByName(
      nick,
      Constants.Regions.BRAZIL
    );

    return {
      nickname: summoner.response.name,
      level: summoner.response.summonerLevel,
    };
  },
};
