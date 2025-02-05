import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './Pages/ThemeProvider';
import { useState } from 'react';
import { GlobalRoutesNew } from './Pages/GlobalRoutes/GlobalRoutesNew';

function App() {
    const [backgroundColor] = useState<string>('black');

    return (
        <ThemeProvider>
            <div
                className="App"
                style={{
                    background: backgroundColor,
                }}
            >
                <Router>
                    <GlobalRoutesNew />
                </Router>
            </div>
        </ThemeProvider>
    );
}

export default App;
