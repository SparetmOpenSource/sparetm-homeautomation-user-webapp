import UserTestimonial from '../../UserTestimonial/UserTestimonial';
import './UserReview.css';

const UserReview = () => {
    return (
        <div
            className="userReview"
            style={{
                background: '#25292D',
                color: 'lavender',
            }}
        >
            <div
                className="userReview_content"
                style={{ background: '#25292D' }}
            >
                <section className="userReview_content_heading">
                    <p style={{ color: '#e2ff00' }}>REVIEWS AND FEEDBACK</p>
                    <h1>
                        <span style={{ color: '#00B5FF' }}>Here's</span> what
                        people say about{' '}
                        <span style={{ color: '#00B5FF' }}>Open Bridge.</span>
                    </h1>
                </section>
                <section className="userReview_content_body">
                    <UserTestimonial />
                </section>
            </div>
        </div>
    );
};

export default UserReview;
