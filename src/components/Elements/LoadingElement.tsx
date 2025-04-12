import Spinner from "react-bootstrap/Spinner";

interface LoadingElementProps {
    variant?: string
}

export default function LoadingElement({variant = "light"}: LoadingElementProps) {
    return (
        <div className="d-flex align-items-center justify-content-center">
            <Spinner animation="border" role="status" variant={variant}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}