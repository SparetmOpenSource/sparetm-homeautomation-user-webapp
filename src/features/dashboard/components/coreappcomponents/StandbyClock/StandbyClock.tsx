// import React, { useState, useEffect } from 'react';

// const StandbyClock: React.FC = () => {
//     const [time, setTime] = useState<Date>(new Date());

//     useEffect(() => {
//         const timer = setInterval(() => setTime(new Date()), 1000);
//         return () => clearInterval(timer);
//     }, []);

//     const formatTime = (date: Date): { hours: string; minutes: string } => {
//         let rawHours = date.getHours();
//         const rawMinutes = date.getMinutes();

//         rawHours = rawHours % 12 || 12;

//         const hours = rawHours.toString();
//         const minutes = rawMinutes < 10 ? `0${rawMinutes}` : rawMinutes.toString();

//         return { hours, minutes };
//     };

//     const { hours, minutes } = formatTime(time);
//     const timeString = `${hours}:${minutes}`;
//     const timeChars = timeString.split('');

//     let numberIndex = 0;

//     return (
//         <>
//             <style>
//                 {`
//           @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@900&display=swap');

//           /* 
//             The Balanced Drift:
//             8-second loop. Noticeable but still elegant.
//             Max scale of 1.03, subtle 1.5 degree rotation.
//           */
//           @keyframes balancedDrift {
//             0% { 
//               transform: translate3d(0, 0, 0) scale(1) rotate(0deg); 
//             }
//             25% { 
//               transform: translate3d(-0.02em, -0.015em, 0) scale(1.03) rotate(-1.5deg); 
//             }
//             50% { 
//               transform: translate3d(0.01em, 0.015em, 0) scale(0.98) rotate(1deg); 
//             }
//             75% { 
//               transform: translate3d(0.02em, -0.01em, 0) scale(1.02) rotate(1.5deg); 
//             }
//             100% { 
//               transform: translate3d(0, 0, 0) scale(1) rotate(0deg); 
//             }
//           }

//           /* 20-second color shift for a relaxing pace */
//           @keyframes balancedColorShift {
//             0% { filter: hue-rotate(0deg); }
//             50% { filter: hue-rotate(180deg); }
//             100% { filter: hue-rotate(360deg); }
//           }
//         `}
//             </style>

//             <div style={styles.container}>
//                 <div style={styles.clockWrapper}>
//                     {timeChars.map((char, i) => {
//                         const isColon = char === ':';

//                         let color = '';
//                         let opacity = 1;

//                         if (isColon) {
//                             color = 'rgba(255, 255, 255, 0.75)';
//                         } else {
//                             numberIndex++;
//                             const isPrimary = numberIndex % 2 !== 0;
//                             color = isPrimary ? '#FF5241' : '#FF8C7F';
//                             opacity = isPrimary ? 1 : 0.88;
//                         }

//                         // Stagger set to 0.5s to match the 8s loop pace
//                         const animationDelay = `${i * 0.5}s`;

//                         if (isColon) {
//                             return (
//                                 <div
//                                     key={i}
//                                     style={{
//                                         ...styles.colonWrapper,
//                                         zIndex: i + 1,
//                                         // The balanced 8s loop
//                                         animation: 'balancedDrift 8s ease-in-out infinite',
//                                         animationDelay,
//                                     }}
//                                 >
//                                     <div style={{ ...styles.dot, marginBottom: '0.12em' }} />
//                                     <div style={{ ...styles.dot }} />
//                                 </div>
//                             );
//                         }

//                         return (
//                             <span
//                                 key={i}
//                                 style={{
//                                     ...styles.char,
//                                     color,
//                                     opacity,
//                                     zIndex: i + 1,
//                                     marginLeft: i === 0 ? '0' : '-0.20em',
//                                     // The balanced 8s loop
//                                     animation: 'balancedDrift 8s ease-in-out infinite',
//                                     animationDelay,
//                                 }}
//                             >
//                                 {char}
//                             </span>
//                         );
//                     })}
//                 </div>
//             </div>
//         </>
//     );
// };

// const styles: Record<string, React.CSSProperties> = {
//     container: {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//         width: '100vw',
//         backgroundColor: 'rgb(0,0,0)',
//         overflow: 'hidden',
//         userSelect: 'none',
//         WebkitFontSmoothing: 'antialiased',
//         MozOsxFontSmoothing: 'grayscale',
//     },
//     clockWrapper: {
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         fontFamily: '"SF Pro Rounded", ui-rounded, "Nunito", sans-serif',
//         fontSize: 'clamp(8rem, 36vw, 40rem)',
//         fontWeight: 900,
//         letterSpacing: '0',
//         // The balanced 20s color loop
//         animation: 'balancedColorShift 20s linear infinite',
//     },
//     char: {
//         position: 'relative',
//         display: 'inline-block',
//         lineHeight: 0.85,
//         willChange: 'transform, filter',
//         backfaceVisibility: 'hidden',
//         transformOrigin: 'center center',
//     },
//     colonWrapper: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '0.85em',
//         marginLeft: '-0.15em',
//         marginRight: '0.05em',
//         willChange: 'transform',
//         backfaceVisibility: 'hidden',
//     },
//     dot: {
//         width: '0.22em',
//         height: '0.22em',
//         borderRadius: '50%',
//         backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     }
// };

// export default StandbyClock;

import React, { useState, useEffect } from 'react';

const StandbyClock: React.FC = () => {
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date): { hours: string; minutes: string } => {
        let rawHours = date.getHours();
        const rawMinutes = date.getMinutes();

        rawHours = rawHours % 12 || 12;

        const hours = rawHours.toString();
        const minutes = rawMinutes < 10 ? `0${rawMinutes}` : rawMinutes.toString();

        return { hours, minutes };
    };

    const { hours, minutes } = formatTime(time);
    const timeString = `${hours}:${minutes}`;
    const timeChars = timeString.split('');

    let numberIndex = 0;

    return (
        <>
            <style>
                {`
          @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@900&display=swap');

          /* 
            The Balanced Drift:
            8-second loop. Noticeable but still elegant.
            Max scale of 1.03, subtle 1.5 degree rotation.
          */
          @keyframes balancedDrift {
            0% { 
              transform: translate3d(0, 0, 0) scale(1) rotate(0deg); 
            }
            25% { 
              transform: translate3d(-0.02em, -0.015em, 0) scale(1.03) rotate(-1.5deg); 
            }
            50% { 
              transform: translate3d(0.01em, 0.015em, 0) scale(0.98) rotate(1deg); 
            }
            75% { 
              transform: translate3d(0.02em, -0.01em, 0) scale(1.02) rotate(1.5deg); 
            }
            100% { 
              transform: translate3d(0, 0, 0) scale(1) rotate(0deg); 
            }
          }

          /* 20-second color shift for a relaxing pace */
          @keyframes balancedColorShift {
            0% { filter: hue-rotate(0deg); }
            50% { filter: hue-rotate(180deg); }
            100% { filter: hue-rotate(360deg); }
          }
        `}
            </style>

            <div style={styles.container}>
                <div style={styles.clockWrapper}>
                    {timeChars.map((char, i) => {
                        const isColon = char === ':';

                        let backgroundGradient = '';
                        let opacity = 1;

                        if (!isColon) {
                            numberIndex++;
                            const isPrimary = numberIndex % 2 !== 0;
                            // Replaced solid colors with linear gradients (45deg angle)
                            backgroundGradient = isPrimary
                                ? 'linear-gradient(45deg, #FF5241 10%, #F5A623 90%)'
                                : 'linear-gradient(45deg, #FF8C7F 10%, #F7C873 90%)';
                            opacity = isPrimary ? 1 : 0.88;
                        }

                        // Stagger set to 0.5s to match the 8s loop pace
                        const animationDelay = `${i * 0.5}s`;

                        if (isColon) {
                            return (
                                <div
                                    key={i}
                                    style={{
                                        ...styles.colonWrapper,
                                        zIndex: i + 1,
                                        // The balanced 8s loop
                                        animation: 'balancedDrift 8s ease-in-out infinite',
                                        animationDelay,
                                    }}
                                >
                                    <div style={{ ...styles.dot, marginBottom: '0.12em' }} />
                                    <div style={{ ...styles.dot }} />
                                </div>
                            );
                        }

                        return (
                            <span
                                key={i}
                                style={{
                                    ...styles.char,
                                    // Apply the gradient as a background
                                    backgroundImage: backgroundGradient,
                                    // Clip the background to the shape of the text
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    color: 'transparent',

                                    opacity,
                                    zIndex: i + 1,
                                    marginLeft: i === 0 ? '0' : '-0.20em',
                                    // The balanced 8s loop
                                    animation: 'balancedDrift 8s ease-in-out infinite',
                                    animationDelay,
                                }}
                            >
                                {char}
                            </span>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgb(0,0,0)',
        overflow: 'hidden',
        userSelect: 'none',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
    },
    clockWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"SF Pro Rounded", ui-rounded, "Nunito", sans-serif',
        fontSize: 'clamp(8rem, 36vw, 40rem)',
        fontWeight: 900,
        letterSpacing: '0',
        // The balanced 20s color loop
        animation: 'balancedColorShift 20s linear infinite',
    },
    char: {
        position: 'relative',
        display: 'inline-block',
        lineHeight: 0.85,
        willChange: 'transform, filter',
        backfaceVisibility: 'hidden',
        transformOrigin: 'center center',
    },
    colonWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '0.85em',
        marginLeft: '-0.15em',
        marginRight: '0.05em',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
    },
    dot: {
        width: '0.22em',
        height: '0.22em',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    }
};

export default StandbyClock;