import { motion, Transition } from "framer-motion";
import { useEffect, useState } from "react";

// Assets
import AlexaHome from '../../../Assets/Alexa-home.png';
import MicroProcessorHome from '../../../Assets/MicroProcessor-home.png';
import RaspberryHome from '../../../Assets/Raspberry-home.png';
import ArduinoHome from '../../../Assets/arduino-home.svg';
import EspressifHome from '../../../Assets/espressif-home.svg';
import KafkaHome from '../../../Assets/kafka-home.svg';
import ReactHome from '../../../Assets/react-home.svg';
import SpringHome from '../../../Assets/spring-home.svg';

export default function ReorderingGrid() {
    const [icons, setIcons] = useState(initialIcons);

    useEffect(() => {
        const timeout = setTimeout(() => setIcons(shuffle(icons)), 4000);
        return () => clearTimeout(timeout);
    }, [icons]);

    return (
        <motion.ul style={container}>
            {icons.map((icon) => (
                <motion.li
                    key={icon}
                    layout="position"
                    transition={spring}
                    style={item}
                >
                    <img src={icon} alt="icon" style={imgStyle} draggable={false} />
                </motion.li>
            ))}
        </motion.ul>
    );
}

const initialIcons = [
    AlexaHome,
    MicroProcessorHome,
    RaspberryHome,
    ArduinoHome,
    EspressifHome,
    KafkaHome,
    ReactHome,
    SpringHome,
];

function shuffle(array: string[]) {
    return [...array].sort(() => Math.random() - 0.5);
}

const spring: Transition = {
    type: "spring",
    damping: 25, // Higher damping = less bounce/oscillation
    stiffness: 45, // Lower stiffness = slower/softer movement
    mass: 1,
};

const container: React.CSSProperties = {
    listStyle: "none",
    padding: "20px", // More breathing room from edges
    boxSizing: "border-box", 
    margin: 0,
    position: "relative",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridTemplateRows: "1fr 1fr",
    gap: 20, // Spread the cards out more
    width: "100%", 
    height: "100%",
    overflowAnchor: "none" as any, 
};

const item: React.CSSProperties = {
    width: "100%",
    height: "100%",
    borderRadius: "24px",
    overflow: "hidden", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // Glassmorphism Styles
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)", // Safari support
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
};

const imgStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "contain", // Or 'cover' depending on preference, 'contain' ensures full logo visibility
    pointerEvents: "none", // Prevent image dragging interfering with motion
    padding: "35px", // Increased internal spacing to shrink logos
};
