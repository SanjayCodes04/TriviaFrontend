import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack"


interface StartProps {
    onStart: () => void,
    onHighscore: () => void,
}


export default function Start({onStart, onHighscore}: StartProps) {
    return (
        <Container className={"text-center align-items-center justify-content-center min-vh-100 d-flex"}>
            <Stack gap={2} className={"align-self-center"}>
                <Button onClick={onStart} size="lg">Launch game!</Button>
                <Button onClick={onHighscore} size="lg" variant="secondary">Show highscore</Button>
            </Stack>

        </Container>
    )
}