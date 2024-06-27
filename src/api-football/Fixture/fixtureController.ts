import { Request, Response } from 'express';
import FixtureService from '../Fixture/fixtureService';

const fixtureService = new FixtureService();

class FixtureController {
  async getFixture(req: Request, res: Response): Promise<void> {
    const matchId = req.params.id;
    if (!matchId) {
      res.status(400).json({ error: 'Match ID is required' });
      return;
    }

    try {
      const options = await fixtureService.getFixture(matchId);
      res.status(200).json(options);
    } catch (error: any) {
      console.log(error)
      res.status(500).json({ error: `Failed to get match options: ${error.message}` });
    }
  }
}

export default new FixtureController();
