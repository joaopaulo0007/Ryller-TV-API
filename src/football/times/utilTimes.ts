import { Time, TimeModel,Statistics,StatisticsModel } from "./models";


async function salvarTime(time: Time) {
    try {
        const existingTeam = await TimeModel.findOne({ id: time.id });
        if (!existingTeam) {
            const newTime = new TimeModel(time);
            await newTime.save();
            console.log(`Time ${time.name} salvo com sucesso.`);
        } else {
            console.log(`Time ${time.name} já existe no banco de dados.`);
        }
    } catch (error) {
        console.error(`Erro ao salvar o time ${time.name}:`, error);
    }
}

async function insert(times: Array<{ team: any, venue: any }>) {
    for (const teamObj of times) {
        const time: Time = {
            id: teamObj.team.id.toString(),
            name: teamObj.team.name,
            logo: teamObj.team.logo,
            country: teamObj.team.country,
            founded: teamObj.team.founded.toString(),
            code: teamObj.team.code,
            national: teamObj.team.national,
            venue: {
                id: teamObj.venue.id.toString(),
                name: teamObj.venue.name,
                city: teamObj.venue.city,
                capacity: teamObj.venue.capacity.toString(),
                surface: teamObj.venue.surface,
                image: teamObj.venue.image,
                address: teamObj.venue.address,
            }
        };
        await salvarTime(time);
    }
}
async function insertTimeStatistics(statistics: Statistics) {
    try {
      const existingStatistic = await StatisticsModel.findOne({
        teamId: statistics.teamId,
        season: statistics.season,
        league:statistics.league,
        
      });
  
      if (!existingStatistic) {
        const newStatistic = new StatisticsModel(statistics);
        await newStatistic.save();
        console.log(`Estatísticas para o time ${statistics.teamId} no ano ${statistics.season} salvas com sucesso.`);
      } else {
        console.log(`Estatísticas para o time ${statistics.teamId} no ano ${statistics.season} já existem no banco de dados.`);
      }
    } catch (error) {
      console.error(`Erro ao salvar as estatísticas para o time ${statistics.teamId} no ano ${statistics.season}:`, error);
    }
  }
  
export {insert,insertTimeStatistics}
