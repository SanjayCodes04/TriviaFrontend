import {z} from "zod";
import axios from "axios";
import baseUrl from "./baseUrl.ts";

const HighscoreEntry = z.object({
    _id: z.string(),
    name: z.string(),
    score: z.number()
})
export type HighscoreEntry = z.infer<typeof HighscoreEntry>;

const HighscoreResponse = z.array(HighscoreEntry);
export type HighscoreResponse = z.infer<typeof HighscoreResponse>;

export async function getHighscore() {
    const result = await axios.get(`${baseUrl}/highscore`);
    return HighscoreResponse.parse(result.data)
}

export async function submitHighscore({score, name}: {score: number, name: string}) {
    const result = await axios.put(`${baseUrl}/highscore`, {score, name});
    return result.data
}