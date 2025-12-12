import './PicFrame.css';
// import Pooh from './../../../Assets/Pooh.jpg';
import { useWindowSize } from '../../../Hooks/useWindowSize';
import { useMemo, useState } from 'react';
import PlantSimulatorAnimated from './PlantSimulator/Animation/AnimatedPlantProps';

const PicFrame = () => {

        const { height } = useWindowSize();
        const [lineLn] = useState(() => {
            const h = height;
            return h <= 800 ? 150 : h >= 950 ? 195 : 0;
        });
        const [angleLF] = useState(25);
        const [angleRT] = useState(25);
        const [branchWD] = useState(20);

        const plantSimulator = useMemo(
            () => (
                <PlantSimulatorAnimated
                    initial={{
                        branchWD,
                        lineLn,
                        angleLF,
                        angleRT,
                        branchColor: 'grey',
                        leafColor1: 'palevioletred',
                        leafColor2: 'palevioletred',
                        backgroundColor: 'rgba(250, 235, 215, 0.7)', // `${color?.button.split(')')[0]},0.1)`
                    }}
                    animateKey="angleLF"
                    amplitude={3}
                    speed={1}
                />
            ),
            [branchWD, lineLn, angleLF, angleRT],
        );

    return (
        <div className="picFrame">
            <section className="picFrame_firstBorder">
                <section className="picFrame_secondBorder">
                    <section className="picFrame_thirdBorder">
                        {/* <img
                            className="home-page-svg"
                            src={Pooh}
                            height="100%"
                            width="100%"
                            loading="lazy"
                            alt="home_icon"
                        /> */}
                        {plantSimulator}
                    </section>
                </section>
            </section>
        </div>
    );
};

export default PicFrame;
