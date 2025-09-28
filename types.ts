
export enum MatchStatus {
  LIVE = 'Live',
  FINISHED = 'Finished',
}

export enum ActiveTab {
  LIVE = 'live',
  RECENT = 'recent',
}

export interface Team {
  name: string;
  flag: string; // emoji character
}

export interface TeamScore {
  team: Team;
  runs: number;
  wickets: number;
  overs: number;
}

export interface PlayerPerformance {
  playerName: string;
  statistic: string;
}

export interface Match {
  id: string;
  status: MatchStatus;
  teamA_score: TeamScore;
  teamB_score: TeamScore;
  toss: string;
  summary: string;
  topScorer: PlayerPerformance;
  bestBowler: PlayerPerformance;
  venue: string;
}

export interface CricketData {
    liveMatches: Match[];
    recentMatches: Match[];
}
