const { LolApi, Constants } = require("twisted");
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
      accountId: summoner.accountId,
      summonerId: summoner.id,
      region,
      nickname: summoner.name,
      level: summoner.summonerLevel,
      profileIcon: iconLink,
    };
  },

  async getLeagues(region, summonerId) {
    const league = (await lolApi.League.bySummoner(summonerId, region))
      .response;
    return league;
  },

  async getMatches(region, accountId) {
    const { response } = await lolApi.Match.list(accountId, region, {
      champion: Constants.Champions.RIVEN,
      endIndex: 10,
    });

    const matches = await Promise.all(
      response.matches.map(async (m) => {
        const { gameId, participants } = await this.getMatchDetail(
          m.platformId,
          m.gameId
        );

        const summonerParticipant = participants.find(
          (par) => par.championId == m.champion
        );

        if (!summonerParticipant) throwError("Erro interno: 1");

        const enemyParticipant = participants.find(
          (par) =>
            par.timeline.lane == summonerParticipant.timeline.lane &&
            par.championId != m.champion
        );

        if (!enemyParticipant) throwError("Erro interno: 2");

        summonerParticipant.championName = Constants.getChampionNameCapital(
          summonerParticipant.championId
        );

        delete summonerParticipant.championId;

        enemyParticipant.championName = Constants.getChampionNameCapital(
          enemyParticipant.championId
        );

        delete enemyParticipant.championId;

        return { gameId, summonerParticipant, enemyParticipant };
      })
    );

    return matches;
  },

  async getMatchDetail(region, gameId) {
    const data = await lolApi.Match.get(gameId, region);
    return data.response;
  },
};
