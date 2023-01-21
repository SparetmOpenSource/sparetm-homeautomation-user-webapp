import React from 'react';
import './Advertisment.css';
import Landing from './Landing/Landing';

const AppFeatures = React.lazy(() => import('./AppFeatures/AppFeatures'));
const Contact = React.lazy(() => import('./Contact/Contact'));
const UserReview = React.lazy(() => import('./UserReview/UserReview'));

const Advertisment = () => {
    return (
        <div className="advertisment">
            <Landing />
            <AppFeatures />
            <UserReview />
            <Contact />
        </div>
    );
};

export default Advertisment;
