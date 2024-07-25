import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
    // base colors
    primary: '#022648',
    secondary: '#eac435',

    // colors
    black: '#1E1F20',
    white: '#FFFFFF',

    lightGray: '#F5F5F6',
    lightGray2: '#F6F6F7',
    lightGray3: '#EFEFF1',
    lightGray4: '#F8F8F9',
    transparent: 'transparent',
    darkgray: '#898C95',

    cimon: '#f76566',
    success: '#3ac47d',
    info: '#16aaff',
    warning: '#f7b924',
    danger: '#d92550',
    light: '#999999',
    dark: '#343a40',
    focus: '#444054',
    turqouise: '#008eb3',
    turqouisehover: '#007a99',
    dark: '#454d54',

    fav: '#ff1a75',
    favhover: '#cc0052',
};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,

    // font sizes
    largeTitle: 50,
    h1: 21,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,
    p: 14,

    // app dimensions
    width,
    height,
};

export const FONTS = {
    largeTitle: {
        fontFamily: 'Poppins-Black',
        fontSize: SIZES.largeTitle,
        lineHeight: 55,
    },
    h1: {
        fontFamily: 'Poppins-Medium',
        fontSize: SIZES.h1,
        lineHeight: 36,
        color: COLORS.primary,
    },
    h2: {
        fontFamily: 'Poppins-Black',
        fontSize: SIZES.h2,
        lineHeight: 30,
        color: COLORS.primary,
    },
    h3: {
        fontFamily: 'Poppins-Black',
        fontSize: SIZES.h3,
        lineHeight: 22,
        color: COLORS.primary,
    },
    h4: {
        fontFamily: 'Poppins-Black',
        fontSize: SIZES.h4,
        lineHeight: 22,
        color: COLORS.primary,
    },
    p: { fontFamily: 'Poppins-Medium', fontSize: SIZES.p, lineHeight: 15 },
    body1: { fontFamily: 'Poppins-Black', fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: 'Poppins-Black', fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: 'Poppins-Black', fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: 'Poppins-Black', fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: 'Poppins-Black', fontSize: SIZES.body5, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
