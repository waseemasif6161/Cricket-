
import { GoogleGenAI, Type } from "@google/genai";
import type { CricketData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const teamSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING, description: "Name of the cricket team." },
        flag: { type: Type.STRING, description: "A single emoji character representing the country's flag." },
    },
    required: ["name", "flag"],
};

const teamScoreSchema = {
    type: Type.OBJECT,
    properties: {
        team: teamSchema,
        runs: { type: Type.INTEGER, description: "Total runs scored by the team." },
        wickets: { type: Type.INTEGER, description: "Total wickets lost by the team." },
        overs: { type: Type.NUMBER, description: "Overs played by the team." },
    },
    required: ["team", "runs", "wickets", "overs"],
};

const playerPerformanceSchema = {
    type: Type.OBJECT,
    properties: {
        playerName: { type: Type.STRING, description: "Name of the player." },
        statistic: { type: Type.STRING, description: "The player's key statistic (e.g., '105 (68 balls)' or '4/25')." },
    },
    required: ["playerName", "statistic"],
};

const matchSchema = {
    type: Type.OBJECT,
    properties: {
        id: { type: Type.STRING, description: "A unique identifier for the match." },
        status: { type: Type.STRING, enum: ["Live", "Finished"], description: "The current status of the match." },
        teamA_score: teamScoreSchema,
        teamB_score: teamScoreSchema,
        toss: { type: Type.STRING, description: "Information about the coin toss." },
        summary: { type: Type.STRING, description: "A concise summary of the match result or current state." },
        topScorer: playerPerformanceSchema,
        bestBowler: playerPerformanceSchema,
        venue: { type: Type.STRING, description: "The city and stadium where the match is being played." },
    },
    required: ["id", "status", "teamA_score", "teamB_score", "toss", "summary", "topScorer", "bestBowler", "venue"],
};

export const fetchCricketData = async (): Promise<CricketData> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `
Generate a realistic set of cricket match data for a sports application. Provide the data in a JSON object with two keys: 'liveMatches' and 'recentMatches'.
- 'liveMatches' should be an array of 2-3 ongoing international or major league matches (e.g., T20, ODI). Use teams like India, Australia, England, Pakistan, South Africa, New Zealand, etc.
- 'recentMatches' should be an array of 4-5 recently concluded matches.
- For each match, generate plausible and realistic data according to the schema.
- For live matches, one team should be batting, so their opponent's score might have 0 overs if they haven't batted yet.
- Summaries should be informative, e.g., 'India won by 5 wickets' or 'Australia need 120 runs in 15 overs'.
- Ensure every ID is unique.
`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        liveMatches: {
                            type: Type.ARRAY,
                            items: matchSchema,
                            description: "A list of currently live cricket matches.",
                        },
                        recentMatches: {
                            type: Type.ARRAY,
                            items: matchSchema,
                            description: "A list of recently finished cricket matches.",
                        },
                    },
                },
            },
        });
        
        const jsonText = response.text.trim();
        const data = JSON.parse(jsonText);
        return data as CricketData;

    } catch (error) {
        console.error("Error fetching cricket data from Gemini API:", error);
        throw new Error("Failed to fetch cricket data.");
    }
};
