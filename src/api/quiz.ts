import {z} from "zod";
import axios from "axios";
import baseUrl from "./baseUrl.ts";

enum QuizQuestionType {
    heightOfMountain = 'heightOfMountain',
    countryOfMountain = 'countryOfMountain',
    populationInCity = 'populationInCity',
    cityInCountry = 'cityInCountry',
    other = 'other'
}
const QuizQuestionTypeEnum = z.nativeEnum(QuizQuestionType);
type QuizQuestionTypeEnum = z.infer<typeof QuizQuestionTypeEnum>;

const QuizQuestion = z.object({
    _id: z.string(),
    title: z.string(),
    icon: z.string().emoji(),
    type: QuizQuestionTypeEnum,
    correctAnswer: z.string(),
    incorrectAnswers: z.array(z.string())
})
export type QuizQuestion = z.infer<typeof QuizQuestion>;

const QuestionResponse = z.object({
    questions: z.array(QuizQuestion)
})
export type QuestionResponse = z.infer<typeof QuestionResponse>;

export async function getQuestions() {
    const result = await axios.get(`${baseUrl}/questions`);
    return QuestionResponse.parse(result.data)
}