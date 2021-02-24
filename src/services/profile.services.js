const { LolApi, Constants } = require("twisted");
const { throwError } = require("./utils");
const lolApi = new LolApi(process.env.RIOT_KEY);

module.exports = {
  async getByNick(region, nick) {
    if (nick.length < 3 || nick.length > 16)
      throwError("Nome de invocador inválido", 400);

    let selectedRegion;
    for (let i in Constants.Regions) {
      if (region.toLocaleLowerCase() === i.toLocaleLowerCase()) {
        selectedRegion = i;
      }
    }

    if (!selectedRegion) throwError("Região inválida", 400);

    const summoner = (await lolApi.Summoner.getByName(nick, selectedRegion))
      .response;

    const currentPatch = (await lolApi.DataDragon.getVersions())[0];
    const iconLink = `http://ddragon.leagueoflegends.com/cdn/${currentPatch}/img/profileicon/${summoner.profileIconId}.png`;

    return {
      nickname: summoner.name,
      level: summoner.summonerLevel,
      profileIcon: iconLink,
    };
  },
};
