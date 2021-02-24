const { LolApi } = require("twisted");
const { getSummonerId } = require("./utils");
const lolApi = new LolApi(process.env.RIOT_KEY);

module.exports = {
  async getById(region, summonerId) {
    const league = await lolApi.League.bySummoner(summonerId, region);

    console.log(league);

    return {
      ...league,
    };
  },
};
