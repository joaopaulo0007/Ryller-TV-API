import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IFixture } from '../../interfaces/IFixture';
import { Fixture } from '../../models/Fixture';
require('dotenv').config()

class FixtureService {
  private readonly API_KEY: string = process.env.API_KEY;
  private readonly API_HOST: string = 'api-football-v1.p.rapidapi.com';
  private readonly API_URL: string = `https://${this.API_HOST}/v3/fixtures`;

  private getMatchOptions(matchId: string): AxiosRequestConfig {
    return {
      method: 'GET',
      url: this.API_URL,
      params: { id: matchId },
      headers: {
        'x-rapidapi-key': this.API_KEY,
        'x-rapidapi-host': this.API_HOST
      }
    };
  }

  public async getFixture(matchId: string): Promise<IFixture> {
    try {
      const res = this.getMatchOptions(matchId);
      const response: AxiosResponse<{ response: IFixture[] }> = await axios(res);
      const fixtureData = response.data.response[0];

      const existingFixture = await Fixture.findOne({ 'fixture.id': fixtureData.fixture.id });
      if (!existingFixture) {
        const newFixture = new Fixture(fixtureData);
        await newFixture.save();
        console.log(`Partida ${fixtureData.fixture.id} salva com sucesso.`);
      }

      return fixtureData;
    } catch (error: any) {
      throw new Error(`Failed to fetch match data: ${error.message}`);
    }
  }

}

export default FixtureService;
