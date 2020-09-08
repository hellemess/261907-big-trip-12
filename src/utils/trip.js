export const addZero = (number) => number < 10 ? `0${number}` : number;

export const formatEventEditTime = (time) => time.toLocaleString(`en-GB`).replace(/,( \d{2}:\d{2}):\d{2}$/, `$1`);

export const formatEventTime = (time) => time.toLocaleString(`en-GB`, {hour: `2-digit`, minute: `2-digit`});

export const isFutureEvent = (date) => date > new Date();
