import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "react-bootstrap/Button";

import {getQuestions, QuestionResponse} from "../../api/quiz";
import QuizQuestionElement from "./QuizQuestionElement";

import { QuizState } from "./QuizState.ts";
import QuizHighscoreElement from "./QuizHighscoreElement.tsx";
import LoadingElement from "../Elements/LoadingElement.tsx";

import styles from './Quiz.module.css';
import ErrorElement from "../Elements/ErrorElement.tsx";

interface QuizProps {
    onNavigateToHighscore: () => void;
}

export default function Quiz({ onNavigateToHighscore } : QuizProps) {
    const queryClient = useQueryClient();

    const [quizState, setQuizState] = useState<QuizState>(QuizState.LOADING);
    const [quizStartedTime, setQuizStartedTime] = useState<Date | null>(null);
    const [secondsRemaining, setSecondsRemaining] = useState<number>(60);
    const [selectedAnswer, setSelectedAnswer] = useState<{ [key: number]: boolean }>({});
    const [finishedQuizHighscore, setFinishedQuizHighscore] = useState<number | null>(null);

    const quiz = useQuery<QuestionResponse, Error>({
        queryKey: ['questions'],
        queryFn: getQuestions,
        refetchOnWindowFocus: false,
    });

    const restart = () => {
        queryClient.removeQueries({queryKey: ['questions']});
        setQuizState(QuizState.LOADING);
        setQuizStartedTime(null);
        setSecondsRemaining(60);
        setSelectedAnswer({});
        setFinishedQuizHighscore(null);
    };

    const getMillisecondsRemaining = () => {
        return quizStartedTime ? -(new Date().getTime() - 60 * 1000 - quizStartedTime.getTime()) : 0;
    };

    useEffect(() => {
        if (quiz.isSuccess && quizState === QuizState.LOADING && !quizStartedTime) {
            setQuizStartedTime(new Date());
            setQuizState(QuizState.RUNNING);
        }
    }, [quiz.isSuccess, quizState, quizStartedTime]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (quiz.isSuccess && quizStartedTime && quizState === QuizState.RUNNING) {
                const msRemaining = getMillisecondsRemaining();
                if (msRemaining > 0) {
                    setSecondsRemaining(msRemaining / 1000);
                } else {
                    setQuizState(QuizState.FAILED);
                    setSecondsRemaining(0);
                }
            }
        }, 20);

        return () => clearInterval(interval);
    }, [secondsRemaining, quizStartedTime, quiz.isSuccess, quizState]);

    const selectAnswer = (isCorrect: boolean, questionIndex: number): boolean => {
        if (quizState !== QuizState.RUNNING) {
            return false;
        }
        setSelectedAnswer(prevSelectedAnswer => ({
            ...prevSelectedAnswer,
            [questionIndex]: isCorrect
        }));
        return true;
    };

    const submitQuiz = () => {
        if (quizState !== QuizState.RUNNING) return;
        let correctCount = 0;
        for (const key in selectedAnswer) {
            if (selectedAnswer[key]) correctCount++;
        }
        if (quiz.data && quizStartedTime) {
            setQuizState(QuizState.HIGHSCORE);
            const percentage = correctCount / quiz.data.questions.length;
            const timeRemaining = getMillisecondsRemaining();
            setFinishedQuizHighscore(Math.round(percentage * (timeRemaining + 30 * 1000)));
        }
    };

    const showCheckResultsButton = (
        quiz.isSuccess &&
        quizState === QuizState.RUNNING &&
        Object.keys(selectedAnswer).length === quiz.data.questions.length
    );

    const showHighscore = (
        quiz.isSuccess &&
        quizState === QuizState.HIGHSCORE &&
        finishedQuizHighscore !== null
    );

    return (
        <>
            {quiz.isLoading && <div className="mt-3 mb-3"><LoadingElement /></div>}
            {quiz.isError && <div className="mt-3 mb-3"><ErrorElement /></div>}
            {quiz.isSuccess && (
                <>
                    <h1 className={styles.quizTitle}>Time remaining:<br />{Math.round(secondsRemaining * 100) / 100}</h1>
                    <div>
                        {quiz.data?.questions.map((question, index) => (
                            <div key={question._id}>
                                <QuizQuestionElement
                                    question={question}
                                    quizState={quizState}
                                    onAnswerSelected={(isCorrect) => selectAnswer(isCorrect, index)}
                                />
                            </div>
                        ))}
                    </div>
                    <div>
                        {showHighscore && (
                            <QuizHighscoreElement
                                finishedQuizHighscore={finishedQuizHighscore}
                                restart={restart}
                                onQuizSubmitted={onNavigateToHighscore}
                            />
                        )}
                    </div>
                    {showCheckResultsButton && (
                        <Button onClick={submitQuiz}>Check result!</Button>
                    )}
                    {secondsRemaining <= 0 && (
                        <Button onClick={restart}>Restart quiz!</Button>
                    )}
                </>
            )}
        </>
    );
}