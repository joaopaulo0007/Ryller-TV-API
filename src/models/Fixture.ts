import { Schema, model, Document } from 'mongoose';
import { IFixture } from '../interfaces/IFixture';

const fixtureSchema = new Schema({
  fixture: {
    id: { type: Number, required: true },
    referee: { type: String, required: true },
    timezone: { type: String, required: true },
    date: { type: String, required: true },
    timestamp: { type: Number, required: true },
    periods: {
      first: { type: Number, required: true },
      second: { type: Number, required: true },
    },
    venue: {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      city: { type: String, required: true },
    },
    status: {
      long: { type: String, required: true },
      short: { type: String, required: true },
      elapsed: { type: Number, required: true },
    },
  },
  league: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    country: { type: String, required: true },
    logo: { type: String, required: true },
    flag: { type: String, default: null },
    season: { type: Number, required: true },
    round: { type: String, required: true },
  },
  teams: {
    home: {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      logo: { type: String, required: true },
      winner: { type: Boolean, required: true },
    },
    away: {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      logo: { type: String, required: true },
      winner: { type: Boolean, required: true },
    },
  },
  goals: {
    home: { type: Number, required: true },
    away: { type: Number, required: true },
  },
  score: {
    halftime: {
      home: { type: Number, required: true },
      away: { type: Number, required: true },
    },
    fulltime: {
      home: { type: Number, required: true },
      away: { type: Number, required: true },
    },
    extratime: {
      home: { type: Number, default: null },
      away: { type: Number, default: null },
    },
    penalty: {
      home: { type: Number, default: null },
      away: { type: Number, default: null },
    },
  },
  events: [
    {
      time: {
        elapsed: { type: Number, required: true },
        extra: { type: Number, default: null },
      },
      team: {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        logo: { type: String, required: true },
      },
      player: {
        id: { type: Number, required: true },
        name: { type: String, required: true },
      },
      assist: {
        id: { type: Number, default: null },
        name: { type: String, default: null },
      },
      type: { type: String, required: true },
      detail: { type: String, required: true },
      comments: { type: String, default: null },
    },
  ],
  lineups: [
    {
      team: {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        logo: { type: String, required: true },
        colors: { type: String, default: null },
      },
      coach: {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        photo: { type: String, required: true },
      },
      formation: { type: String, required: true },
      startXI: [
        {
          player: {
            id: { type: Number, required: true },
            name: { type: String, required: true },
            number: { type: Number, required: true },
            pos: { type: String, required: true },
            grid: { type: String, required: true },
          },
        },
      ],
      substitutes: [
        {
          player: {
            id: { type: Number, required: true },
            name: { type: String, required: true },
            number: { type: Number, required: true },
            pos: { type: String, default: null },
            grid: { type: String, default: null },
          },
        },
      ],
    },
  ],
  statistics: [
    {
      team: {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        logo: { type: String, required: true },
      },
      statistics: [
        {
          type: { type: String, required: true },
          value: { type: Schema.Types.Mixed, default: null }, // Default to null
        },
      ],
    },
  ],
  players: [
    {
      team: {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        logo: { type: String, required: true },
        update: { type: String, required: true },
      },
      players: [
        {
          player: {
            id: { type: Number, required: true },
            name: { type: String, required: true },
            photo: { type: String, required: true },
          },
          statistics: [
            {
              games: {
                minutes: { type: Number, required: true },
                number: { type: Number, required: true },
                position: { type: String, required: true },
                rating: { type: String, required: true },
                captain: { type: Boolean, required: true },
                substitute: { type: Boolean, required: true },
              },
              offsides: { type: Number, default: null },
              shots: {
                total: { type: Number, required: true },
                on: { type: Number, required: true },
              },
              goals: {
                total: { type: Number, default: null },
                conceded: { type: Number, required: true },
                assists: { type: Number, default: null },
                saves: { type: Number, default: 0 }, // Default to 0
              },
              passes: {
                total: { type: Number, required: true },
                key: { type: Number, required: true },
                accuracy: { type: String, required: true },
              },
              tackles: {
                total: { type: Number, default: null },
                blocks: { type: Number, required: true },
                interceptions: { type: Number, required: true },
              },
              duels: {
                total: { type: Number, default: null },
                won: { type: Number, default: null },
              },
              dribbles: {
                attempts: { type: Number, required: true },
                success: { type: Number, required: true },
                past: { type: Number, default: null },
              },
              fouls: {
                drawn: { type: Number, required: true },
                committed: { type: Number, required: true },
              },
              cards: {
                yellow: { type: Number, required: true },
                red: { type: Number, required: true },
              },
              penalty: {
                won: { type: Number, default: null },
                commited: { type: Number, default: null },
                scored: { type: Number, required: true },
                missed: { type: Number, required: true },
                saved: { type: Number, default: 0 }, // Default to 0
              },
            },
          ],
        },
      ],
    },
  ],
});

const Fixture = model<IFixture & Document>('Fixture', fixtureSchema);

export { Fixture };
