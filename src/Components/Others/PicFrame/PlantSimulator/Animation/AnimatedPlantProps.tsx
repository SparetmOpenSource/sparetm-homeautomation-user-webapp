import PlantSimulator from '../PlantSimulator';
import { useState, useEffect } from 'react';

interface PlantSimulatorAnimationProps {
    initial: {
        lineLn: number;
        angleLF: number;
        angleRT: number;
        branchWD: number;
        branchColor: string;
        leafColor1: string;
        leafColor2: string;
        backgroundColor: string;
    };
    animateKey?: keyof Omit<
        PlantSimulatorAnimationProps['initial'],
        'branchColor' | 'leafColor1' | 'leafColor2' | 'backgroundColor'
    >;
    amplitude?: number; // how much variation
    speed?: number; // oscillation speed
}

const PlantSimulatorAnimated = ({
    initial,
    animateKey = 'angleLF',
    amplitude = 20,
    speed = 1,
}: PlantSimulatorAnimationProps) => {
    const [animatedValue, setAnimatedValue] = useState(
        initial[animateKey] as number,
    );

    useEffect(() => {
        let frameId: number;
        const startTime = performance.now();

        const animate = (time: number) => {
            const elapsed = (time - startTime) / 1000;
            const base = initial[animateKey] as number;
            // Smooth oscillation using sine wave
            const newValue = base + Math.sin(elapsed * speed) * amplitude;
            setAnimatedValue(newValue);
            frameId = requestAnimationFrame(animate);
        };

        frameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameId);
    }, [animateKey, amplitude, speed, initial]);

    const animatedProps = {
        ...initial,
        [animateKey]: animatedValue,
    };

    // Keep opposite side angles symmetric if animating one of them
    if (animateKey === 'angleLF') {
        animatedProps.angleRT = animatedProps.angleLF;
    } else if (animateKey === 'angleRT') {
        animatedProps.angleLF = animatedProps.angleRT;
    }

    return <PlantSimulator {...animatedProps} />;
};

export default PlantSimulatorAnimated;
