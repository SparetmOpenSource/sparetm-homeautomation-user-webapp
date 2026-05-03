import { useEffect, useState } from 'react';
import Home from '../home';
import StarterLoader from '../starterloader/starterloader';

import PageTransition from '../../../../../shared/commoncomponents/pagetransition/pagetransition';

const INTRO_PLAYED_KEY = 'home_intro_played';

const HomeWithLoader = () => {
    const hasPlayed = sessionStorage.getItem(INTRO_PLAYED_KEY);
    const [showHome, setShowHome] = useState(!!hasPlayed);

    useEffect(() => {
        if (hasPlayed) return;

        const timer = setTimeout(() => {
            sessionStorage.setItem(INTRO_PLAYED_KEY, 'true');
            setShowHome(true);
        }, 2900);

        return () => clearTimeout(timer);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return showHome ? (
        <PageTransition>
            <Home />
        </PageTransition>
    ) : (
        <StarterLoader />
    );
};

export default HomeWithLoader;

