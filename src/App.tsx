import { useState } from 'react'
import Container from "react-bootstrap/Container";

import Quiz from "./components/Quiz/Quiz.tsx";
import Start from "./components/Start.tsx";
import Highscore from "./components/Highscore/Highscore.tsx";

import './App.scss'

enum CurrentAppView {
    START,
    QUIZ,
    HIGHSCORE
}

function App() {
    const [currentAppView, setCurrentAppView] = useState<CurrentAppView>(CurrentAppView.START)

    function showHighscore() {
        setCurrentAppView(CurrentAppView.HIGHSCORE)
    }

    return (
        <>
            <Container>
                {currentAppView === CurrentAppView.START ?
                    <Start
                        onStart={() => setCurrentAppView(CurrentAppView.QUIZ)}
                        onHighscore={() => showHighscore()}
                    /> : null}

                {currentAppView === CurrentAppView.QUIZ ?
                    <Quiz onNavigateToHighscore={() => showHighscore()} /> : null}

                {currentAppView === CurrentAppView.HIGHSCORE ?
                    <Highscore onBack={() => setCurrentAppView(CurrentAppView.START)} /> : null}
            </Container>
        </>
    )
}

export default App
