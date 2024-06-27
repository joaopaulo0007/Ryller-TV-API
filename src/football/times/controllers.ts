import express from 'express';
import axios from 'axios';
import { insert, insertTimeStatistics } from './utilTimes'; 
import { Statistics } from './models'; 

const headers = {
  "x-rapidapi-host": "v3.football.api-sports.io",
  "x-rapidapi-key": process.env.API_KEY
};

async function buscarTimes(league: any, season: any, team: any, estatisticas: boolean = false) {
  try {
    let url = `https://v3.football.api-sports.io/${estatisticas ? 'teams/statistics' : 'teams'}`;
    console.log(url)
    console.log(league, season, team)
    const options = {
      method: 'GET',
      url: url,
      headers: headers,
      params: {
        league: league,
        season: season,
        team: team
      }
    };
    const response = await axios.request(options);
    
    return response.data.response; 
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
}

async function getTimes(req: express.Request, res: express.Response) {
  const { league, season, team } = req.body;

  if (!league || !season) {
    return res.status(400).send({ error: "league and season are required" });
  }

  try {
    const result = await buscarTimes(league, season, team);
  
    await insert(result);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while fetching teams' });
  }
}

async function getStatisticas(req: express.Request, res: express.Response) {
  const { league, season, team } = req.body;

  if (!league || !season || !team) {
    return res.status(400).send({ error: "team, league and season are required" });
  }
  
  try {
    const results = await buscarTimes(league, season, team, true);
    
    if (!results ) {
      return res.status(404).send({ error: "No statistics found for the given parameters" });
    }
    console.log(results.team.id)
    console.log(results.league.id)
    console.log(results.league.season)
    
  
   
    const statistics: Statistics = {
      teamId: results.team.id,
      season: results.league.season,
      league: results.league.id,
      form: results.form,
      fixtures: results.fixtures,
      goals: results.goals,
      biggest: results.biggest,
      clean_sheet: results.clean_sheet,
      failed_to_score: results.failed_to_score,
      penalty: results.penalty,
      lineups: results.lineups,
      cards: results.cards,
    };

    await insertTimeStatistics(statistics);
    res.send(results);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while fetching statistics' });
  }
}



export { getTimes, getStatisticas };
