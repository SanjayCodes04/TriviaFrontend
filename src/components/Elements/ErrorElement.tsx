import {Alert} from "react-bootstrap";

export default function ErrorElement() {
    return (
        <Alert variant={"danger"}>
            <strong>An unknown error has occurred.</strong>
        </Alert>
    )
}