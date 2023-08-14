import {
    DF,
    DF_COLOR,
    FW,
    FW_COLOR,
    GK,
    GK_COLOR,
    MF,
    MF_COLOR,
} from './consts';

export const getShortPosName = (longPosName) => {
    if (longPosName === GK) {
        return 'GK';
    }
    if (longPosName === DF) {
        return 'DF';
    }
    if (longPosName === MF) {
        return 'MF';
    }
    if (longPosName === FW) {
        return 'FW';
    }
    return longPosName;
};
export const getItemColor = (position) => {
    if (position === GK) {
        return 'bg-[#ffeaa7]';
    }
    if (position === DF) {
        return 'bg-[#74b9ff]';
    }
    if (position === MF) {
        return 'bg-[#55efc4]';
    }
    if (position === FW) {
        return 'bg-[#ff7675]';
    }
};

export const getTextColor = (position) => {
    if (position === GK) {
        return 'text-[#ff9f43]';
    }
    if (position === DF) {
        return 'text-[#2e86de]';
    }
    if (position === MF) {
        return 'text-[#10ac84]';
    }
    if (position === FW) {
        return 'text-[#ee5253]';
    }
};
