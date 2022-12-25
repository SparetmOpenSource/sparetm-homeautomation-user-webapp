import { useEffect } from 'react';
import { HomePageTypography } from '../../../Data/HomePageConstant';
import TextBlinkAnimation from '../../Others/TextBlinkAnimation/TextBlinkAnimation';
import './BrandCanvas.css';

const BrandCanvas = () => {
    const sentence = HomePageTypography.page_1.app_name.split('');
    useEffect(() => {
        var canvas = document.getElementById(
            'brandCanvas',
        ) as HTMLCanvasElement;
        var ctx = canvas.getContext('2d');
        var col = function (
            x: any,
            y: any,
            r: string | number,
            g: string | number,
            b: string | number,
        ) {
            ctx!.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
            ctx!.fillRect(x, y, 1, 1);
        };
        var R = function (x: number, y: number, t: number) {
            return Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + t));
        };

        var G = function (x: number, y: number, t: number) {
            return Math.floor(
                192 +
                    64 *
                        Math.sin(
                            (x * x * Math.cos(t / 4) +
                                y * y * Math.sin(t / 3)) /
                                300,
                        ),
            );
        };

        var B = function (x: number, y: number, t: number) {
            return Math.floor(
                192 +
                    64 *
                        Math.sin(
                            5 * Math.sin(t / 9) +
                                ((x - 100) * (x - 100) +
                                    (y - 100) * (y - 100)) /
                                    1100,
                        ),
            );
        };

        var t = 0;
        var x = 0;
        var y = 0;

        var run = function () {
            for (x = 0; x <= 35; x++) {
                for (y = 0; y <= 35; y++) {
                    col(x, y, R(x, y, t), G(x, y, t), B(x, y, t));
                }
            }
            t = t + 0.05;
            window.requestAnimationFrame(run);
        };

        run();
    }, []);

    return (
        <div className="brandCanvas">
            <div className="brandCanvas_textContainer">
                {sentence.map((letter, index) => {
                    return (
                        <TextBlinkAnimation
                            key={index}
                            color="#3a3a3a"
                            size="calc(48px + (68 - 48) * ((100vw - 1280px) / (1600 - 1280)))"
                            height="27px"
                            weight="700"
                            opacity="0.5"
                            mode="color-burn"
                        >
                            {letter === ' ' ? '\u00A0' : letter}
                        </TextBlinkAnimation>
                    );
                })}
            </div>
            <div className="brandCanvas_canvasContainer">
                <canvas id="brandCanvas" width="32" height="32" />
            </div>
        </div>
    );
};

export default BrandCanvas;
