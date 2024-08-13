// const urlEndpoint = 'https://ik.imagekit.io/ppcqtfrxp'; //insert your own url end point here
// const publicKey = 'public_h8U+4K+MFoeq+MKLf34NST4axAo='; //insert your own public key here
import { LanguageContext } from '../Templates/LanguageContext/LanguageContext';
import React, { useEffect, useState, useContext, useMemo } from 'react';
import { FetchingContext } from '../Templates/FetchingContext/FetchingContext';
export const urlEndpoint1 = () => {
    const { lang, langdetect } = useContext(FetchingContext);

    return lang.quantity;
};
