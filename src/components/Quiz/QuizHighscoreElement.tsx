import { FormEvent, MutableRefObject, useId, useRef, useState } from "react";
import { Button, Modal, Form, Stack } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";

import { submitHighscore } from "../../api/highscore.ts";
import LoadingElement from "../Elements/LoadingElement.tsx";

import styles from './QuizHighscoreElement.module.css';

interface IQuizHighscoreElementProps {
    finishedQuizHighscore: number;
    restart: () => void;
    onQuizSubmitted: () => void;
}

export default function QuizHighscoreElement({
                                        finishedQuizHighscore,
                                        restart,
                                        onQuizSubmitted
                                    }: IQuizHighscoreElementProps) {

    const queryClient = useQueryClient();
    const [showHighscoreModal, setShowHighscoreModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const formNameId = useId();

    const handleCloseModal = () => {
        setShowHighscoreModal(false);
        restart();
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleSubmittingData();
    };

    const handleSubmittingData = async () => {
        if (!formRef.current) return;
        const formData = new FormData(formRef.current);
        const formJson = Object.fromEntries(formData.entries());

        try {
            setIsSubmitting(true);
            await submitHighscore({
                score: finishedQuizHighscore,
                name: formJson.name as string
            });
            queryClient.removeQueries({queryKey: ['highscore']});
            onQuizSubmitted();
        } catch (error) {
            console.error('Failed to submit highscore:', error);
            // Handle error appropriately
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleShowModal = () => setShowHighscoreModal(true);

    return (
        <>
            <h1 className={styles.quizScore}>Your score: {finishedQuizHighscore}</h1>
            <Stack gap={2} className="col-md-4">
                <Button onClick={restart}>Restart!</Button>
                {finishedQuizHighscore !== 0 && (
                    <Button onClick={handleShowModal}>Submit highscore</Button>
                )}
            </Stack>

            <Modal show={showHighscoreModal} onHide={handleCloseModal} animation={true}>
                <Form onSubmit={handleFormSubmit} ref={formRef as MutableRefObject<HTMLFormElement>}>
                    <Modal.Header closeButton>
                        <Modal.Title>Submit highscore!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {!isSubmitting ? (
                            <>
                                <Form.Label htmlFor={formNameId} className="mb-3">
                                    Please enter your name
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Your name"
                                    name="name"
                                    id={formNameId}
                                    required
                                />
                            </>
                        ) : (
                            <LoadingElement variant="dark" />
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        {!isSubmitting && (
                            <Button type="submit" variant="primary">
                                Submit highscore
                            </Button>
                        )}
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};
