import { useEffect, useRef } from 'react';
import './PlantSimulator.css';

/**
 * how to use:
 *   <PlantSimulator
            branchWD={branchWD}
            lineLn={lineLn}
            angleLF={angleLF}
            angleRT={angleRT}
            branchColor="gray"
            leafColor1="palevioletred"
            leafColor2="palevioletred"
            backgroundColor="#FAEBD7"
    />
 */

interface PlantSimulatorProps {
    lineLn: number;
    angleLF: number;
    angleRT: number;
    branchWD: number;
    branchColor: string;
    leafColor1: string;
    leafColor2: string;
    backgroundColor: string;
}

// -- lineLn(max-200px) angleLF(max-90), angleRT(max-90), branchWD(max-100px), branchColor, leafColor1, leafColor2, backgroundColor -- //
const PlantSimulator = ({
    lineLn,
    angleLF,
    angleRT,
    branchWD,
    branchColor,
    leafColor1,
    leafColor2,
    backgroundColor,
}: PlantSimulatorProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.style.backgroundColor = backgroundColor;

        const draw = (
            startX: number,
            startY: number,
            lineLength: number,
            angle: number,
            branchWidth: number,
            bodyColor: string,
        ): void => {
            ctx.beginPath();
            ctx.save();
            ctx.strokeStyle = bodyColor;
            ctx.fillStyle = bodyColor;
            ctx.lineWidth = branchWidth;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.translate(startX, startY);
            ctx.rotate(angle * (Math.PI / 180));
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -lineLength);
            ctx.stroke();

            if (lineLength < 5) {
                ctx.restore();
                return;
            }

            if (branchWidth < 5 && lineLength < 10) {
                draw(
                    0,
                    -lineLength,
                    lineLength * 0.75,
                    angleLF,
                    branchWidth * 0.75,
                    leafColor1,
                );
                draw(
                    0,
                    -lineLength,
                    lineLength * 0.75,
                    -angleRT,
                    branchWidth * 0.75,
                    leafColor2,
                );
            } else {
                draw(
                    0,
                    -lineLength,
                    lineLength * 0.75,
                    angleLF,
                    branchWidth * 0.75,
                    branchColor,
                );
                draw(
                    0,
                    -lineLength,
                    lineLength * 0.75,
                    -angleRT,
                    branchWidth * 0.75,
                    branchColor,
                );
            }

            ctx.restore();
        };

        const drawTree = (width: number, height: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            draw(width / 2, height - 40, lineLn, 0, branchWD, branchColor);
        };

        let timeoutId: NodeJS.Timeout | undefined;
        const debounceDraw = (width: number, height: number) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => drawTree(width, height), 100);
        };

        const parent = canvas.parentElement;
        if (!parent) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                debounceDraw(width, height);
            }
        });

        observer.observe(parent);

        // ✅ ADDED: Trigger an initial & prop-change redraw
        const { width, height } = parent.getBoundingClientRect();
        drawTree(width, height);

        return () => {
            observer.disconnect();
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [
        lineLn,
        angleLF,
        angleRT,
        branchWD,
        branchColor,
        leafColor1,
        leafColor2,
        backgroundColor,
    ]);

    return <canvas className="treeSimulator-canvas" ref={canvasRef}></canvas>;
};

export default PlantSimulator;
