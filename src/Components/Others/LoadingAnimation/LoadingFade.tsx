import './LoadingFade.css';

const LoadingFade = () => {
    return (
        <div className="loadingFade skeleton">
            <div className="snippet" data-title=".dot-collision">
                <div className="stage">
                    <div className="dot-collision"></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingFade;
