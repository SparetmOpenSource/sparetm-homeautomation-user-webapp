export const Spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
};

export const generateRandomInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const ConvertTheRangeToRound = (
    currentValue: number,
    in_min: number,
    in_max: number,
    out_min: number,
    out_max: number,
) => {
    let result = ((currentValue - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
    return Math.round(result);
};

export const ConvertTheRange = (
    currentValue: number,
    in_min: number,
    in_max: number,
    out_min: number,
    out_max: number,
) => {
    let result = ((currentValue - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
    return result;
};

export function convertMsToMinutes(progress_ms: number): number {
    return progress_ms / 1000 / 60;
}
