import { useQuery } from "@tanstack/react-query";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import { getHighscore } from "../../api/highscore.ts";
import LoadingElement from "../Elements/LoadingElement.tsx";
import ErrorElement from "../Elements/ErrorElement.tsx";

import styles from './Highscore.module.css';

interface HighscoreProps {
    onBack: () => void;
}

interface HighscoreData {
    _id: string;
    name: string;
    score: number;
}

const Highscore: React.FC<HighscoreProps> = ({ onBack }) => {
    const highscoreData = useQuery<HighscoreData[], Error>({
        queryKey: ['highscore'],
        queryFn: getHighscore,
        refetchOnWindowFocus: false,
    });

    const handleBackClick = () => {
        onBack();
    };

    return (
        <>
            <div className="mt-2 mb-3">
                <h1 className={styles.highscoreTitle}>Highscore</h1>
            </div>
            {highscoreData.isLoading && <LoadingElement />}
            {highscoreData.isError && <ErrorElement />}
            {highscoreData.isSuccess && (
                <Table striped bordered hover className={styles.highscoreTable}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                    </thead>
                    <tbody>
                    {highscoreData.data.map((highscore) => (
                        <tr key={highscore._id}>
                            <td>{highscore.name}</td>
                            <td>{highscore.score}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
            <Button onClick={handleBackClick}>Back</Button>
        </>
    );
};

export default Highscore;
