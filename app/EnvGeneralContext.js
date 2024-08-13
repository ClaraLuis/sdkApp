import React, { useEffect, useState } from 'react';
import Constants from 'expo-constants';
// '6375fbc6ad8ee'; // moshtryatak
// '637cece9ba4c3'; // normoda
// '63304bd612d50'; // Nahr Trade
// '63445a7571676'; // Eden
// '6370eaf20b354'; // United Media
// '637520a028d56'; // Coupon
// '6385f700d5167'; // Altawfiqiya
// '637282ddcc389'; // Rainbow Maids
// '6373c2b21ed3b'; // IUBETOEG
// '6373b60bd5001'; // B2B Outfits
// '63010861a7b47'; // Home Mart
// '63304bd612d50'; // Nahr Trade
// '633e9d4867772'; // Jazzan
// '633ae3b545fd0'; // Luxus Auto
// '6344167a3a93a'; // Baba Abdo
// '6354fefb3f40f'; // Transforma
// '636673debe95e'; // Fame Art Production
// '638482215762c'; // Luca men wear
// '638f043a4dc74'; // Triple M
// '63a2fdb84217e'; // Sahla
// '63a1f1b855331'; // French4cars
// '63ac2fa68ab71'; // Netjry
// '63ada9eb8418f'; // 40 Cars
// '63b012315ebf3'; // Yalla Decor
// '63bd67da79aaf'; // Dan Club
// '63bc39b166c5d'; // Dahab
// '63cd4fd3349e2'; // Daloos
// '63c6f2afcdb7e'; // Agent 47
// '63c3fe876e735'; // TikTop Plus
// '63bd596a2fc42'; // El wadi
// '63c65ea8c2fea'; // Walker
// '63cfa2f5a4ea7'; // Zrayer
// '63c594b54f43f'; // King's Group
// '63d67f1889da5'; // Compass
// '63c6b88fef275'; // Business Assets
// '63cbe06b59e3c'; // Matgar Shopping
// '63cbfaa08152f'; // Sahraat
// '63d7ab26821b1'; // Marzouk Wood
// '63d8f893488c3'; // Qutb
// '63e361d9629a0'; // AL AHLYA - Bearing
// '63e0dd13d6abf'; // One
// '63e3891f1c0d8'; // medgo
// '63d804ee5454a'; // Marly
// '63ea069d3f33d'; // Collab Plus
// '63eb6a56078ac'; // Neemo

export const EnvGeneralContext = React.createContext();
export const EnvGeneralContext_Provider = (props) => {
    const [GeneralProjectOpenrcTypeContext, setProjectOpenrcTypeContext] = useState(Constants?.expoConfig?.extra?.projectsrctype);
    const [GeneralINSTAPIKEYCONTEXT, setINSTAPIKEYCONTEXT] = useState(Constants?.expoConfig?.extra?.instapikey);

    // const [GeneralProjectOpenrcTypeContext, setProjectOpenrcTypeContext] = useState('workplace');
    // const [GeneralINSTAPIKEYCONTEXT, setINSTAPIKEYCONTEXT] = useState('tabex');

    return (
        <EnvGeneralContext.Provider
            value={{
                GeneralProjectOpenrcTypeContext,
                GeneralINSTAPIKEYCONTEXT,
                setINSTAPIKEYCONTEXT,
            }}
        >
            {props.children}
        </EnvGeneralContext.Provider>
    );
};
