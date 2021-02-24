const { LolApi } = require("twisted");
const { getSummonerId } = require("./utils");
const lolApi = new LolApi(process.env.RIOT_KEY);

module.exports = {
  async getByNick(region, nick) {
    const summoner = await getSummonerId(nick, region);

    const currentPatch = (await lolApi.DataDragon.getVersions())[0];
    const iconLink = `http://ddragon.leagueoflegends.com/cdn/${currentPatch}/img/profileicon/${summoner.profileIconId}.png`;

    return {
      nickname: summoner.name,
      level: summoner.summonerLevel,
      profileIcon: iconLink,
    };
  },
};
