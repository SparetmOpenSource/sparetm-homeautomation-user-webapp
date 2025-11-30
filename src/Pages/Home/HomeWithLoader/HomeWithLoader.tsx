import { useState, useEffect } from 'react';
import Home from '../Home';
import StarterLoader from '../StarterLoader/StarterLoader';

const HomeWithLoader = () => {
    const [showHome, setShowHome] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowHome(true);
        }, 2900);

        return () => clearTimeout(timer);
    }, []);

    return showHome ? <Home /> : <StarterLoader />;
};

export default HomeWithLoader;
