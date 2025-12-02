import { useState, useEffect } from 'react';
import Home from '../Home';
import StarterLoader from '../StarterLoader/StarterLoader';

import PageTransition from '../../../Components/Others/PageTransition/PageTransition';

const HomeWithLoader = () => {
    const [showHome, setShowHome] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowHome(true);
        }, 2900);

        return () => clearTimeout(timer);
    }, []);

    return showHome ? (
        <PageTransition>
            <Home />
        </PageTransition>
    ) : (
        <StarterLoader />
    );
};

export default HomeWithLoader;
