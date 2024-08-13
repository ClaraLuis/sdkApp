// import React, { useEffect, useState, useContext } from 'react';
// import { View, Text, ActivityIndicator, Image, I18nManager, Platform } from 'react-native';
// import { WebsiteDesignWorkPlaceContext } from '../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
// import { FetchingContext } from './FetchingContext/FetchingContext';
// import { createStackNavigator } from '@react-navigation/stack';
// import TemplateDraft from './TemplateDraft';
// import SpinnerButton from 'react-native-spinner-button';
// import generalstyles from './TabexComponents/GeneralFiles/Stylesheet/Stylesheet';
// import { icons, images, SIZES, COLORS, FONTS } from './TabexComponents/GeneralFiles/constants';
// import { currentOTAversion } from '../Env_Variables';
// import Constants from 'expo-constants';
// import { Splashlogos } from '../../AppIcons/index';
// import { LanguageContext } from './LanguageContext/LanguageContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import BottomTabs from './TabexComponents/StaticPages/BottomTabs/BottomTabs';
// import Addreview from './TabexComponents/StaticPages/Orderhistory/Addreview';

// // import { Restart } from 'fiction-expo-restart';
// import * as Updates from 'expo-updates';

// import InstituteLoader from '../InstituteLoader';
// const TemplateDraftRouter = (props) => {
//     const Stack = createStackNavigator();
//     const { setdefaultlang, langdetect } = useContext(LanguageContext);
//     const { fetch_inst_tabex_websitetemplatesQueryContext, isScreenLoadedContext } = React.useContext(WebsiteDesignWorkPlaceContext);
//     const { fetchAuthorizationQueryContext, fetchcustomercartQueryContext } = React.useContext(FetchingContext);
//     const [splashimage, setsplashimage] = useState(null);

//     useEffect(() => {
//         const setdefaultlangusef = async () => {
//             var langValue = await AsyncStorage.getItem('lang');

//             if (langValue == null || langValue == undefined) {
//                 if (fetchAuthorizationQueryContext.data.data.instinfo.defaultlang == 'ar') {
//                     AsyncStorage.setItem('lang', 'ar');
//                     setdefaultlang('ar');
//                     if (!I18nManager.isRTL) {
//                         Updates.reloadAsync();
//                     }
//                 } else if (fetchAuthorizationQueryContext.data.data.instinfo.defaultlang == 'en') {
//                     AsyncStorage.setItem('lang', 'en');
//                     setdefaultlang('en');

//                     if (I18nManager.isRTL) {
//                         Updates.reloadAsync();
//                     }
//                 }
//             }
//         };
//         if (fetchAuthorizationQueryContext.isSuccess) {
//             setdefaultlangusef();
//         }
//     }, [fetchAuthorizationQueryContext.isSuccess]);
//     useEffect(() => {
//         setsplashimage(Constants?.manifest?.slug);
//     }, []);

//     const isfetchingmaindata = () => {
//         if (fetch_inst_tabex_websitetemplatesQueryContext.isSuccess) {
//             // if (fetchAuthorizationQueryContext.isSuccess && fetch_inst_tabex_websitetemplatesQueryContext.isSuccess) {
//             return false;
//         } else {
//             return true;
//         }
//     };
//     const isnstallfromstoreapp = () => {
//         var isdownload = false;
//         var TargetedIosSdk = fetch_inst_tabex_websitetemplatesQueryContext?.data?.data?.instinfo?.iosappsdk;
//         var TargetedAndroidSdk = fetch_inst_tabex_websitetemplatesQueryContext?.data?.data?.instinfo?.androidappsdk;
//         var expoIOSSDK = Constants?.expoConfig?.extra?.iossdk;
//         var expoAndroidSDK = Constants?.expoConfig?.extra?.androidsdk;
//         if (Constants?.expoConfig?.extra?.iossdk == undefined) {
//             expoIOSSDK = '45';
//         }
//         if (Constants?.expoConfig?.extra?.androidsdk == undefined) {
//             expoAndroidSDK = '45';
//         }
//         if (Platform.OS == 'ios') {
//             if (Constants?.expoConfig?.extra?.iossdk == undefined) {
//             }
//             if (TargetedIosSdk != expoIOSSDK) {
//                 isdownload = true;
//             }
//         } else if (Platform.OS == 'android') {
//             if (TargetedAndroidSdk != expoAndroidSDK) {
//                 isdownload = true;
//             }
//         }
//         return { isdownload: isdownload };
//     };
//     return (
//         <View style={{ width: SIZES.width, height: '100%', backgroundColor: '#f8f8f9' }}>
//             {isfetchingmaindata() && <InstituteLoader isupdatesprops={false} />}
//             {/* {fetchAuthorizationQueryContext.isSuccess && ( */}

//             <View style={{ width: SIZES.width, height: '100%' }}>
//                 {!isnstallfromstoreapp().isdownload && (
//                     <>
//                         {fetch_inst_tabex_websitetemplatesQueryContext.isSuccess && fetch_inst_tabex_websitetemplatesQueryContext.data.data.status && (
//                             <View style={{ width: SIZES.width, height: '100%' }}>
//                                 {/* {isScreenLoadedContext == false && instituteloader()} */}
//                                 <Stack.Navigator
//                                     screenOptions={{
//                                         headerShown: false,
//                                         keyboardHidesTabBar: true,
//                                     }}
//                                     // initialRouteName={'ordersuccess'}
//                                     // initialRouteName={GeneralProjectOpenrcTypeContext == 'subdomain' ? 'TemplateDraftRouter' : 'WebsiteDesignWorkPlaceRouter'}
//                                 >
//                                     {fetch_inst_tabex_websitetemplatesQueryContext?.data?.data?.template?.pages?.map(function (arrayItem, arrayindex) {
//                                         return <Stack.Screen name={arrayItem.pagename}>{(props) => <TemplateDraft {...props} pageprops={arrayItem} pageindex={arrayindex} />}</Stack.Screen>;
//                                     })}
//                                     <Stack.Screen name={'Addreview'}>{(props) => <Addreview />}</Stack.Screen>
//                                 </Stack.Navigator>
//                                 <BottomTabs currentpageprops={null} />
//                             </View>
//                         )}
//                     </>
//                 )}
//                 {isnstallfromstoreapp().isdownload && (
//                     <>
//                         <InstituteLoader isupdatesprops={false} isdownloadversionfromstore={true} fetch_inst_tabex_websitetemplatesQueryContext={fetch_inst_tabex_websitetemplatesQueryContext} />
//                     </>
//                 )}
//                 {fetch_inst_tabex_websitetemplatesQueryContext.isSuccess && !fetch_inst_tabex_websitetemplatesQueryContext.data.data.status && (
//                     <View>
//                         <Text>Error Found</Text>
//                     </View>
//                 )}
//             </View>
//             {/* )} */}
//         </View>
//     );
// };

// export default TemplateDraftRouter;

import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ActivityIndicator, Image, I18nManager, Platform } from 'react-native';
import { WebsiteDesignWorkPlaceContext } from '../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { FetchingContext } from './FetchingContext/FetchingContext';
import { createStackNavigator } from '@react-navigation/stack';
import TemplateDraft from './TemplateDraft';
import SpinnerButton from 'react-native-spinner-button';
import generalstyles from './TabexComponents/GeneralFiles/Stylesheet/Stylesheet';
import { icons, images, SIZES, COLORS, FONTS } from './TabexComponents/GeneralFiles/constants';
import { currentOTAversion } from '../Env_Variables';
import Constants from 'expo-constants';
import { Splashlogos } from '../../AppIcons/index';
import { LanguageContext } from './LanguageContext/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabs from './TabexComponents/StaticPages/BottomTabs/BottomTabs';
import Addreview from './TabexComponents/StaticPages/Orderhistory/Addreview';

// import { Restart } from 'fiction-expo-restart';
import * as Updates from 'expo-updates';

import InstituteLoader from '../InstituteLoader';
const TemplateDraftRouter = (props) => {
    const Stack = createStackNavigator();
    const { setdefaultlang, langdetect } = useContext(LanguageContext);
    const { fetch_inst_tabex_websitetemplatesQueryContext, isScreenLoadedContext } = React.useContext(WebsiteDesignWorkPlaceContext);
    const { fetchAuthorizationQueryContext, fetchcustomercartQueryContext, templateproperties_context } = React.useContext(FetchingContext);
    const [splashimage, setsplashimage] = useState(null);

    useEffect(() => {
        const setdefaultlangusef = async () => {
            var langValue = await AsyncStorage.getItem('lang');

            if (langValue == null || langValue == undefined) {
                if (fetchAuthorizationQueryContext.data.data.instinfo.defaultlang == 'ar') {
                    AsyncStorage.setItem('lang', 'ar');
                    setdefaultlang('ar');
                    if (!I18nManager.isRTL) {
                        Updates.reloadAsync();
                    }
                } else if (fetchAuthorizationQueryContext.data.data.instinfo.defaultlang == 'en') {
                    AsyncStorage.setItem('lang', 'en');
                    setdefaultlang('en');

                    if (I18nManager.isRTL) {
                        Updates.reloadAsync();
                    }
                }
            }
        };
        if (fetchAuthorizationQueryContext.isSuccess) {
            setdefaultlangusef();
        }
    }, [fetchAuthorizationQueryContext.isSuccess]);
    useEffect(() => {
        setsplashimage(Constants?.manifest?.slug);
    }, []);

    const isfetchingmaindata = () => {
        if (fetch_inst_tabex_websitetemplatesQueryContext.isSuccess) {
            // if (fetchAuthorizationQueryContext.isSuccess && fetch_inst_tabex_websitetemplatesQueryContext.isSuccess) {
            return false;
        } else {
            return true;
        }
    };
    const isnstallfromstoreapp = () => {
        var isdownload = false;
        var TargetedIosSdk = fetch_inst_tabex_websitetemplatesQueryContext?.data?.data?.instinfo?.iosappsdk;
        var TargetedAndroidSdk = fetch_inst_tabex_websitetemplatesQueryContext?.data?.data?.instinfo?.androidappsdk;
        var expoIOSSDK = Constants?.expoConfig?.extra?.iossdk;
        var expoAndroidSDK = Constants?.expoConfig?.extra?.androidsdk;
        if (Constants?.expoConfig?.extra?.iossdk == undefined) {
            expoIOSSDK = '49';
        }
        if (Constants?.expoConfig?.extra?.androidsdk == undefined) {
            expoAndroidSDK = '49';
        }
        if (Platform.OS == 'ios') {
            if (Constants?.expoConfig?.extra?.iossdk == undefined) {
            }
            if (TargetedIosSdk == expoIOSSDK || TargetedIosSdk == '48') {
                isdownload = false;
            } else {
                isdownload = true;
            }
        } else if (Platform.OS == 'android') {
            if (TargetedAndroidSdk == expoAndroidSDK || TargetedAndroidSdk == '48') {
                isdownload = false;
            } else {
                isdownload = true;
            }
        }
        return { isdownload: isdownload };
    };
    // const isnstallfromstoreapp = () => {
    //     var isdownload = false;
    //     var TargetedIosSdk = fetch_inst_tabex_websitetemplatesQueryContext?.data?.data?.instinfo?.iosappsdk;
    //     var TargetedAndroidSdk = fetch_inst_tabex_websitetemplatesQueryContext?.data?.data?.instinfo?.androidappsdk;
    //     var expoIOSSDK = Constants?.expoConfig?.extra?.iossdk;
    //     var expoAndroidSDK = Constants?.expoConfig?.extra?.androidsdk;
    //     if (Constants?.expoConfig?.extra?.iossdk == undefined) {
    //         expoIOSSDK = '45';
    //     }
    //     if (Constants?.expoConfig?.extra?.androidsdk == undefined) {
    //         expoAndroidSDK = '45';
    //     }
    //     if (Platform.OS == 'ios') {
    //         if (Constants?.expoConfig?.extra?.iossdk == undefined) {
    //         }
    //         if (TargetedIosSdk != expoIOSSDK) {
    //             isdownload = true;
    //         }
    //     } else if (Platform.OS == 'android') {
    //         if (TargetedAndroidSdk != expoAndroidSDK) {
    //             isdownload = true;
    //         }
    //     }
    //     return { isdownload: isdownload };
    // };
    return (
        <View style={{ width: SIZES.width, height: '100%', backgroundColor: '#f8f8f9' }}>
            {/* comment for tabex design */}
            {isfetchingmaindata() && <InstituteLoader isupdatesprops={false} />}
            {/* {fetchAuthorizationQueryContext.isSuccess && ( */}

            <View style={{ width: SIZES.width, height: '100%' }}>
                {/* comment for tabex design */}

                {!isnstallfromstoreapp().isdownload && (
                    <>
                        {fetch_inst_tabex_websitetemplatesQueryContext.isSuccess && fetch_inst_tabex_websitetemplatesQueryContext.data.data.status && (
                            <View
                                style={{
                                    width: SIZES.width,
                                    height: '100%',
                                }}
                            >
                                {/* {isScreenLoadedContext == false && instituteloader()} */}
                                <Stack.Navigator
                                    screenOptions={{
                                        headerShown: false,
                                        keyboardHidesTabBar: true,
                                    }}
                                    // initialRouteName={'ordersuccess'}
                                    // initialRouteName={GeneralProjectOpenrcTypeContext == 'subdomain' ? 'TemplateDraftRouter' : 'WebsiteDesignWorkPlaceRouter'}
                                >
                                    {fetch_inst_tabex_websitetemplatesQueryContext?.data?.data?.template?.pages?.map(function (arrayItem, arrayindex) {
                                        return <Stack.Screen name={arrayItem.pagename}>{(props) => <TemplateDraft {...props} pageprops={arrayItem} pageindex={arrayindex} />}</Stack.Screen>;
                                    })}
                                    <Stack.Screen name={'Addreview'}>{(props) => <Addreview />}</Stack.Screen>
                                </Stack.Navigator>
                                <View
                                    style={{
                                        width: '100%',
                                        display:
                                            fetchAuthorizationQueryContext?.data?.data?.loggedin == true
                                                ? 'flex'
                                                : templateproperties_context?.hidebottomnavwhenlogin == 'Hide' && fetchAuthorizationQueryContext?.data?.data?.loggedin == false
                                                ? 'none'
                                                : 'flex',
                                    }}
                                >
                                    <BottomTabs currentpageprops={null} />
                                </View>
                            </View>
                        )}
                    </>
                )}
                {isnstallfromstoreapp().isdownload && (
                    <>
                        <InstituteLoader isupdatesprops={false} isdownloadversionfromstore={true} fetch_inst_tabex_websitetemplatesQueryContext={fetch_inst_tabex_websitetemplatesQueryContext} />
                    </>
                )}
                {fetch_inst_tabex_websitetemplatesQueryContext.isSuccess && !fetch_inst_tabex_websitetemplatesQueryContext.data.data.status && (
                    <View>
                        <Text>Error Found</Text>
                    </View>
                )}
            </View>
            {/* )} */}
        </View>
    );
};

export default TemplateDraftRouter;
