import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './Pages/ThemeProvider';
import { useState } from 'react';
import { GlobalRoutes } from './Pages/GlobalRoutes/GlobalRoutes';

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
                    <GlobalRoutes />
                </Router>
            </div>
        </ThemeProvider>
    );
}

export default App;
