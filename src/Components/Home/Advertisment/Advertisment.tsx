import './Advertisment.css';
import AppFeatures from './AppFeatures/AppFeatures';
import Contact from './Contact/Contact';
import Landing from './Landing/Landing';
import UserReview from './UserReview/UserReview';
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
