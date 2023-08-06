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
};
export const getItemColor = (position) => {
    if (position === GK) {
        return 'bg-' + GK_COLOR;
    }
    if (position === DF) {
        return 'bg-' + DF_COLOR;
    }
    if (position === MF) {
        return 'bg-' + MF_COLOR;
    }
    if (position === FW) {
        return 'bg-' + FW_COLOR;
    }
};
