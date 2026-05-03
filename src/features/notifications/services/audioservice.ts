import { getNotificationConfig } from '../../../utils/notificationconfig';

const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
let audioCtx: AudioContext | null = null;
let hasInteracted = false;

const initAudio = () => {
    if (!audioCtx && AudioContext) {
        audioCtx = new AudioContext();
    }
};

const enableSound = () => {
    hasInteracted = true;
    initAudio();
    if (audioCtx) {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume().then(() => {
                console.log("AudioContext resumed by user interaction.");
            });
        }
        try {
            const silentOsc = audioCtx.createOscillator();
            const silentGain = audioCtx.createGain();
            silentOsc.type = 'sine';
            silentOsc.frequency.value = 0.01;
            silentGain.gain.value = 0.001;
            silentOsc.connect(silentGain);
            silentGain.connect(audioCtx.destination);
            silentOsc.start();
            console.log("Audio Keep-Alive started (Silent Oscillator).");
        } catch (e) {
            console.error("Keep-Alive failed", e);
        }
    }
    window.removeEventListener('click', enableSound, true);
    window.removeEventListener('keydown', enableSound, true);
    window.removeEventListener('touchstart', enableSound, true);
};

if (typeof window !== 'undefined') {
    window.addEventListener('click', enableSound, true);
    window.addEventListener('keydown', enableSound, true);
    window.addEventListener('touchstart', enableSound, true);
}

export const playNotificationSound = async (isManual: boolean = false) => {
    const { soundEnabled } = getNotificationConfig();
    if (!soundEnabled && !isManual) return;
    if (isManual) hasInteracted = true;
    if (!hasInteracted) return;
    
    initAudio();
    if (!audioCtx) return;

    try {
        if (audioCtx.state === 'suspended') {
            await audioCtx.resume();
        }
        const currentTime = audioCtx.currentTime;
        const playNote = (frequency: number, startTime: number, duration: number) => {
            const oscillator = audioCtx!.createOscillator();
            const gainNode = audioCtx!.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx!.destination);
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(frequency, startTime);
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        };
        playNote(1046.5, currentTime, 0.5);
        playNote(1318.5, currentTime + 0.12, 0.6);
        console.log("Notification chime played");
    } catch (error) {
        console.error("Audio generation failed", error);
    }
};
