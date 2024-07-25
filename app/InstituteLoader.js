// import React, { useEffect, useState, useContext } from 'react';
// import { View, Text, ActivityIndicator, Image, I18nManager, Linking, TouchableOpacity, Platform } from 'react-native';

// import generalstyles from './Templates/TabexComponents/GeneralFiles/Stylesheet/Stylesheet';
// import { icons, images, SIZES, COLORS, FONTS } from './Templates/TabexComponents/GeneralFiles/constants';
// import { currentOTAversion } from './Env_Variables';
// import Constants from 'expo-constants';
// import { Splashlogos } from '../AppIcons/index';
// import { LanguageContext } from './Templates/LanguageContext/LanguageContext';

// const InstituteLoader = (props) => {
//     const { lang } = useContext(LanguageContext);

//     const [splashimage, setsplashimage] = useState(null);

//     useEffect(() => {
//         // setsplashimage(Constants?.manifest?.slug);
//         setsplashimage(Constants?.expoConfig?.slug);
//     }, []);

//     return (
//         <View style={[generalstyles.allcentered, { width: SIZES.width, display: 'flex' }]}>
//             <View style={{ width: SIZES.width, height: '100%', backgroundColor: 'white' }}>
//                 {/* <View style={[generalstyles.allcentered, { width: '100%', height: '100%', backgroundColor: Constants?.manifest?.splash?.backgroundColor, position: 'absolute', top: 0, left: 0 }]}> */}
//                 <View style={[generalstyles.allcentered, { width: '100%', height: '100%', backgroundColor: Constants?.expoConfig?.splash?.backgroundColor, position: 'absolute', top: 0, left: 0 }]}>
//                     {splashimage != null && (
//                         <>
//                             <Image source={Splashlogos[splashimage]} style={{ resizeMode: 'contain', width: '80%', height: '40%' }} />
//                             {/* <Text>Imag ehere{splashimage}</Text> */}
//                         </>
//                     )}
//                     {!props.isdownloadversionfromstore && (
//                         <>
//                             <ActivityIndicator size="large" color="#ccc" />
//                             <Text>{currentOTAversion}</Text>
//                             {props.isupdatesprops == true && <Text>{lang.installingupdates}</Text>}
//                         </>
//                     )}
//                     {props.isdownloadversionfromstore && (
//                         <>
//                             <TouchableOpacity
//                                 style={{
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     marginBottom: 10,
//                                     width: '100%',
//                                 }}
//                                 onPress={() => {
//                                     if (Platform.OS == 'ios') {
//                                         // fetch_inst_tabex_websitetemplatesQueryContext
//                                         if (props?.fetch_inst_tabex_websitetemplatesQueryContext?.data?.data?.instinfo?.mobileapplink_appstore != null) {
//                                             Linking.openURL(props?.fetch_inst_tabex_websitetemplatesQueryContext?.data?.data?.instinfo?.mobileapplink_appstore);
//                                         } else {
//                                             alert('Url Not found');
//                                         }
//                                     } else if (Platform.OS == 'android') {
//                                         if (props?.fetch_inst_tabex_websitetemplatesQueryContext?.data?.data?.instinfo?.mobileapplink_playstore != null) {
//                                             Linking.openURL(props?.fetch_inst_tabex_websitetemplatesQueryContext?.data?.data?.instinfo?.mobileapplink_playstore);
//                                         } else {
//                                             alert('Url Not found');
//                                         }
//                                     }
//                                 }}
//                             >
//                                 <Text
//                                     style={{
//                                         fontFamily: 'Poppins-Bold',
//                                         backgroundColor: 'white',
//                                         color: 'black',
//                                         fontSize: 15,
//                                         textDecorationLine: 'underline',
//                                     }}
//                                 >
//                                     {lang.downloadupdate}
//                                 </Text>
//                             </TouchableOpacity>
//                         </>
//                     )}
//                 </View>
//             </View>
//         </View>
//     );
// };

// export default InstituteLoader;

import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ActivityIndicator, Image, I18nManager, Linking, TouchableOpacity, Platform } from 'react-native';

import generalstyles from './Templates/TabexComponents/GeneralFiles/Stylesheet/Stylesheet';
import { icons, images, SIZES, COLORS, FONTS } from './Templates/TabexComponents/GeneralFiles/constants';
import { currentOTAversion } from './Env_Variables';
import Constants from 'expo-constants';
import { Splashlogos } from '../AppIcons/index';
import { LanguageContext } from './Templates/LanguageContext/LanguageContext';

const InstituteLoader = (props) => {
    const { lang } = useContext(LanguageContext);

    const [splashimage, setsplashimage] = useState(null);

    useEffect(() => {
        // setsplashimage(Constants?.manifest?.slug);
        setsplashimage(Constants?.expoConfig?.slug);
    }, []);

    return (
        <View style={[generalstyles.allcentered, { width: SIZES.width, display: 'flex' }]}>
            <View style={{ width: SIZES.width, height: '100%', backgroundColor: 'white' }}>
                {/* <View style={[generalstyles.allcentered, { width: '100%', height: '100%', backgroundColor: Constants?.manifest?.splash?.backgroundColor, position: 'absolute', top: 0, left: 0 }]}> */}
                <View style={[generalstyles.allcentered, { width: '100%', height: '100%', backgroundColor: Constants?.expoConfig?.splash?.backgroundColor, position: 'absolute', top: 0, left: 0 }]}>
                    {splashimage != null && (
                        <>
                            {Constants?.expoConfig?.extra?.loadercontain != 'cover' && <Image source={Splashlogos[splashimage]} style={{ resizeMode: 'contain', width: '80%', height: '40%' }} />}
                            {Constants?.expoConfig?.extra?.loadercontain == 'cover' && (
                                <Image source={Splashlogos[splashimage]} style={{ resizeMode: 'cover', width: '100%', height: '100%', position: 'absolute' }} />
                            )}
                            {/* <Text>Imag ehere{splashimage}</Text> */}
                        </>
                    )}
                    {!props.isdownloadversionfromstore && (
                        <View
                            style={{
                                position: Constants?.expoConfig?.extra?.loadercontain == 'cover' ? 'absolute' : 'relative',
                                bottom: Constants?.expoConfig?.extra?.loadercontain == 'cover' ? 150 : 0,
                            }}
                        >
                            <ActivityIndicator size="large" color="#ccc" />
                            <Text>{currentOTAversion}</Text>
                            {props.isupdatesprops == true && <Text>{lang.installingupdates}</Text>}
                        </View>
                    )}
                    {props.isdownloadversionfromstore && (
                        <>
                            <TouchableOpacity
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 10,
                                    width: '100%',
                                }}
                                onPress={() => {
                                    if (Platform.OS == 'ios') {
                                        // fetch_inst_tabex_websitetemplatesQueryContext
                                        if (props?.fetch_inst_tabex_websitetemplatesQueryContext?.data?.data?.instinfo?.mobileapplink_appstore != null) {
                                            Linking.openURL(props?.fetch_inst_tabex_websitetemplatesQueryContext?.data?.data?.instinfo?.mobileapplink_appstore);
                                        } else {
                                            alert('Url Not found');
                                        }
                                    } else if (Platform.OS == 'android') {
                                        if (props?.fetch_inst_tabex_websitetemplatesQueryContext?.data?.data?.instinfo?.mobileapplink_playstore != null) {
                                            Linking.openURL(props?.fetch_inst_tabex_websitetemplatesQueryContext?.data?.data?.instinfo?.mobileapplink_playstore);
                                        } else {
                                            alert('Url Not found');
                                        }
                                    }
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'Poppins-Bold',
                                        backgroundColor: 'white',
                                        color: 'black',
                                        fontSize: 15,
                                        textDecorationLine: 'underline',
                                    }}
                                >
                                    {lang.downloadupdate}
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </View>
    );
};

export default InstituteLoader;
