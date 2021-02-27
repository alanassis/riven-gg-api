const { LolApi, Constants } = require("twisted");
const { throwError, getPosition } = require("./utils");
const lolApi = new LolApi(process.env.RIOT_KEY);

module.exports = {
  async getByNick(region, nick) {
    if (nick.length < 3 || nick.length > 16)
      throwError("Nome de invocador inválido", 400);

    const summoner = (await lolApi.Summoner.getByName(nick, region)).response;

    return {
      accountId: summoner.accountId,
      summonerId: summoner.id,
      region,
      nickname: summoner.name,
      level: summoner.summonerLevel,
      profileIconId: summoner.profileIconId,
    };
  },

  async getLeagues(region, summonerId) {
    const league = (await lolApi.League.bySummoner(summonerId, region))
      .response;
    return league;
  },

  async getMatches(region, accountId) {
    const { response } = await lolApi.Match.list(accountId, region, {
      queue: [400, 420, 430, 440],
      champion: Constants.Champions.RIVEN,
      endIndex: 10,
    });

    let matches = await Promise.all(
      response.matches.map(async (m) => {
        const { gameId, participants } = await this.getMatchDetail(
          m.platformId,
          m.gameId
        );

        const summonerParticipant = participants.find(
          (par) => par.championId == m.champion
        );

        const enemyParticipant = participants.find((par) => {
          const enemyPosition = getPosition(
            par.timeline.lane,
            par.timeline.role
          );
          const summonerPosition = getPosition(
            summonerParticipant.timeline.lane,
            summonerParticipant.timeline.role
          );

          return (
            enemyPosition == summonerPosition && par.championId != m.champion
          );
        });

        if (!enemyParticipant) return {};

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

    matches = matches.filter((val) => {
      for (const i in val) return true;
      return false;
    });

    return matches;
  },

  async getMatchDetail(region, gameId) {
    const data = await lolApi.Match.get(gameId, region);
    return data.response;
  },
};
