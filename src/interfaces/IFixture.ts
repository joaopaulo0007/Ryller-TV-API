export interface IFixture {
  fixture: {
    id: number;
    referee: string;
    timezone: string;
    date: string;
    timestamp: number;
    periods: {
      first: number;
      second: number;
    };
    venue: {
      id: number;
      name: string;
      city: string;
    };
    status: {
      long: string;
      short: string;
      elapsed: number;
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string | null;
    season: number;
    round: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
      winner: boolean;
    };
    away: {
      id: number;
      name: string;
      logo: string;
      winner: boolean;
    };
  };
  goals: {
    home: number;
    away: number;
  };
  score: {
    halftime: {
      home: number;
      away: number;
    };
    fulltime: {
      home: number;
      away: number;
    };
    extratime: {
      home: number | null;
      away: number | null;
    };
    penalty: {
      home: number | null;
      away: number | null;
    };
  };
  events: Array<{
    time: {
      elapsed: number;
      extra: number | null;
    };
    team: {
      id: number;
      name: string;
      logo: string;
    };
    player: {
      id: number;
      name: string;
    };
    assist: {
      id: number | null;
      name: string | null;
    };
    type: string;
    detail: string;
    comments: string | null;
  }>;
  lineups: Array<{
    team: {
      id: number;
      name: string;
      logo: string;
      colors: string | null;
    };
    coach: {
      id: number;
      name: string;
      photo: string;
    };
    formation: string;
    startXI: Array<{
      player: {
        id: number;
        name: string;
        number: number;
        pos: string;
        grid: string;
      };
    }>;
    substitutes: Array<{
      player: {
        id: number;
        name: string;
        number: number;
        pos: string | null;
        grid: string | null;
      };
    }>;
  }>;
  statistics: Array<{
    team: {
      id: number;
      name: string;
      logo: string;
    };
    statistics: Array<{
      type: string;
      value: number | string | null;
    }>;
  }>;
  players: Array<{
    team: {
      id: number;
      name: string;
      logo: string;
      update: string;
    };
    players: Array<{
      player: {
        id: number;
        name: string;
        photo: string;
      };
      statistics: Array<{
        games: {
          minutes: number;
          number: number;
          position: string;
          rating: string;
          captain: boolean;
          substitute: boolean;
        };
        offsides: number | null;
        shots: {
          total: number;
          on: number;
        };
        goals: {
          total: number | null;
          conceded: number;
          assists: number | null;
          saves: number;
        };
        passes: {
          total: number;
          key: number;
          accuracy: string;
        };
        tackles: {
          total: number | null;
          blocks: number;
          interceptions: number;
        };
        duels: {
          total: number | null;
          won: number | null;
        };
        dribbles: {
          attempts: number;
          success: number;
          past: number | null;
        };
        fouls: {
          drawn: number;
          committed: number;
        };
        cards: {
          yellow: number;
          red: number;
        };
        penalty: {
          won: number | null;
          commited: number | null;
          scored: number;
          missed: number;
          saved: number;
        };
      }>;
    }>;
  }>;
}
