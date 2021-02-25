const { LolApi } = require("twisted");
const { throwError } = require("./utils");
const lolApi = new LolApi(process.env.RIOT_KEY);

module.exports = {
  async getByNick(region, nick) {
    if (nick.length < 3 || nick.length > 16)
      throwError("Nome de invocador inválido", 400);

    const summoner = (await lolApi.Summoner.getByName(nick, region)).response;

    const currentPatch = (await lolApi.DataDragon.getVersions())[0];
    const iconLink = `http://ddragon.leagueoflegends.com/cdn/${currentPatch}/img/profileicon/${summoner.profileIconId}.png`;

    return {
      id: summoner.id,
      region,
      nickname: summoner.name,
      level: summoner.summonerLevel,
      profileIcon: iconLink,
    };
  },

  async getLeagueByNick(region, summonerId) {
    const league = (await lolApi.League.bySummoner(summonerId, region))
      .response;
    return league;
  },
};
