
import mongoose, { Document, Schema } from 'mongoose';

interface MinuteStats {
  total: number | null;
  percentage: string | null;
}

interface Goals {
  total: number;
  average: string;
  minute: {
    [key: string]: MinuteStats;
  };
}

interface Fixtures {
  played: {
    home: number;
    away: number;
    total: number;
  };
  wins: {
    home: number;
    away: number;
    total: number;
  };
  draws: {
    home: number;
    away: number;
    total: number;
  };
  loses: {
    home: number;
    away: number;
    total: number;
  };
}

interface Streak {
  wins: number;
  draws: number;
  loses: number;
}

interface Biggest {
  streak: Streak;
  wins: {
    home: string | null;
    away: string | null;
  };
  loses: {
    home: string | null;
    away: string | null;
  };
  goals: {
    for: {
      home: number;
      away: number;
    };
    against: {
      home: number;
      away: number;
    };
  };
}

interface CleanSheet {
  home: number;
  away: number;
  total: number;
}

interface FailedToScore {
  home: number;
  away: number;
  total: number;
}

interface Penalty {
  scored: {
    total: number;
    percentage: string;
  };
  missed: {
    total: number;
    percentage: string;
  };
  total: number;
}

interface Lineup {
  formation: string;
  played: number;
}

interface Cards {
  yellow: {
    [key: string]: MinuteStats;
  };
  red: {
    [key: string]: MinuteStats;
  };
}

interface Statistics {
  teamID:string,
  league:string,
  season:string,
  form: string;
  fixtures: Fixtures;
  goals: {
    for: Goals;
    against: Goals;
  };
  biggest: Biggest;
  clean_sheet: CleanSheet;
  failed_to_score: FailedToScore;
  penalty: Penalty;
  lineups: Lineup[];
  cards: Cards;
}



interface Venue {
    id: string;
    name: string;
    city: string;
    capacity: string;
    surface: string;
    image: string;
    address: string;
}

interface Time {
    id: string;
    name: string;
    logo: string;
    country: string;
    founded: string;
    code: string;
    national: boolean;
    venue: Venue;
}

const minuteStatsSchema = new Schema({
    total: { type: Number, default: null },
    percentage: { type: String, default: null },
  });
  
  const goalsSchema = new Schema({
    total: {
      home: { type: Number, required: true },
      away: { type: Number, required: true },
      total: { type: Number, required: true },
    },
    average: {
      home: { type: String, required: true },
      away: { type: String, required: true },
      total: { type: String, required: true },
    },
    minute: {
      type: Map,
      of: minuteStatsSchema,
      required: true,
    },
  });
  
  const fixturesSchema = new Schema({
    played: {
      home: { type: Number, required: true },
      away: { type: Number, required: true },
      total: { type: Number, required: true },
    },
    wins: {
      home: { type: Number, required: true },
      away: { type: Number, required: true },
      total: { type: Number, required: true },
    },
    draws: {
      home: { type: Number, required: true },
      away: { type: Number, required: true },
      total: { type: Number, required: true },
    },
    loses: {
      home: { type: Number, required: true },
      away: { type: Number, required: true },
      total: { type: Number, required: true },
    },
  });
  
  const streakSchema = new Schema({
    wins: { type: Number, required: true },
    draws: { type: Number, required: true },
    loses: { type: Number, required: true },
  });
  
  const biggestSchema = new Schema({
    streak: streakSchema,
    wins: {
      home: { type: String, default: null },
      away: { type: String, default: null },
    },
    loses: {
      home: { type: String, default: null },
      away: { type: String, default: null },
    },
    goals: {
      for: {
        home: { type: Number, required: true },
        away: { type: Number, required: true },
      },
      against: {
        home: { type: Number, required: true },
        away: { type: Number, required: true },
      },
    },
  });
  
  const cleanSheetSchema = new Schema({
    home: { type: Number, required: true },
    away: { type: Number, required: true },
    total: { type: Number, required: true },
  });
  
  const failedToScoreSchema = new Schema({
    home: { type: Number, required: true },
    away: { type: Number, required: true },
    total: { type: Number, required: true },
  });
  
  const penaltySchema = new Schema({
    scored: {
      total: { type: Number, required: true },
      percentage: { type: String, required: true },
    },
    missed: {
      total: { type: Number, required: true },
      percentage: { type: String, required: true },
    },
    total: { type: Number, required: true },
  });
  
  const lineupSchema = new Schema({
    formation: { type: String, required: true },
    played: { type: Number, required: true },
  });
  
  const cardsSchema = new Schema({
    yellow: {
      type: Map,
      of: minuteStatsSchema,
      required: true,
    },
    red: {
      type: Map,
      of: minuteStatsSchema,
      required: true,
    },
  });
  
  const statisticsSchema = new Schema({
    teamId: { type: String, required: true },
    year: { type: String, required: true },
    league:{type:String,required:true},
    form: { type: String, required: true },
    fixtures: fixturesSchema,
    goals: {
      for: goalsSchema,
      against: goalsSchema,
    },
    biggest: biggestSchema,
    clean_sheet: cleanSheetSchema,
    failed_to_score: failedToScoreSchema,
    penalty: penaltySchema,
    lineups: [lineupSchema],
    cards: cardsSchema,
  });
  
  

const venueSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    capacity: { type: String, required: true },
    surface: { type: String, required: true },
    image: { type: String, required: true },
    address: { type: String, required: null },
});

const timeSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    logo: { type: String, required: true },
    country: { type: String, required: true },
    founded: { type: String, required: true },
    code: { type: String, required: true },
    national: { type: Boolean, required: true },
    venue: { type: venueSchema, required: true },
});

const StatisticsModel=mongoose.model("Statistics", statisticsSchema);
const TimeModel = mongoose.model("Time", timeSchema);

export { Time, TimeModel, Statistics, StatisticsModel};
