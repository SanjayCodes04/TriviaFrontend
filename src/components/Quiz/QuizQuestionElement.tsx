import { useState } from "react";
import classnames from "classnames";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

import { QuizQuestion } from "../../api/quiz.ts";
import { QuizState } from "./QuizState.ts";

import styles from './QuizQuestionElement.module.css';

interface QuizQuestionElementProps {
    question: QuizQuestion;
    quizState: QuizState;
    onAnswerSelected: (correct: boolean) => boolean;
}

export default function QuizQuestionElement({
                                         question,
                                         quizState,
                                         onAnswerSelected
                                     }: QuizQuestionElementProps) {

    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    const answers = [
        { title: question.correctAnswer, isCorrect: true },
        ...question.incorrectAnswers.map(incorrectAnswer => ({
            title: incorrectAnswer,
            isCorrect: false
        }))
    ].sort((a, b) => a.title.localeCompare(b.title));

    const selectAnswer = (index: number) => {
        if (onAnswerSelected(answers[index].isCorrect)) {
            setSelectedIndex(index);
        }
    };

    return (
        <Card className={classnames('mb-3', styles.questionCard)}>
            <Card.Header>
                <h5 className="mb-0">
                    {question.icon} {question.title}
                </h5>
            </Card.Header>
            <Card.Body>
                <Form>
                    <ListGroup className="gap-2 list-group-radio d-flex align-items-center flex-wrap flex-row">
                        {answers.map((answer, index) => (
                            <ListGroup.Item
                                key={index}
                                onClick={() => selectAnswer(index)}
                                className={classnames(
                                    "p-2",
                                    styles.answerOption,
                                    {
                                        [styles.answerOptionSelected]: selectedIndex === index,
                                        [styles.answerOptionValid]: quizState !== QuizState.RUNNING && answer.isCorrect,
                                        [styles.answerOptionInValid]: quizState !== QuizState.RUNNING && !answer.isCorrect
                                    }
                                )}
                            >
                                <Form.Check type="radio" id={`question-${question._id}-${index}`}>
                                    <Form.Check.Input
                                        type="radio"
                                        onChange={() => selectAnswer(index)}
                                        checked={selectedIndex === index}
                                    />
                                    <Form.Check.Label className={styles.answerOptionLabel}>
                                        {answer.title}
                                    </Form.Check.Label>
                                </Form.Check>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Form>
            </Card.Body>
        </Card>
    );
}