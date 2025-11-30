import './PicFrame.css';
import Pooh from './../../../Assets/Pooh.jpg';

const PicFrame = () => {

    return (
        <div className="picFrame">
            <section className="picFrame_firstBorder">
                <section className="picFrame_secondBorder">
                    <section className="picFrame_thirdBorder">
                        <img
                            className="home-page-svg"
                            src={Pooh}
                            height="100%"
                            width="100%"
                            loading="lazy"
                            alt="home_icon"
                        />
                    </section>
                </section>
            </section>
        </div>
    );
};

export default PicFrame;
