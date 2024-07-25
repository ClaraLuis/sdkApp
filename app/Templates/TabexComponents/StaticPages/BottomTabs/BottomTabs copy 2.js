import React, { useState, useEffect, useContext } from 'react';
import { StatusBar, View, Image, TouchableOpacity, Text, Dimensions, Platform } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { isIphoneX } from 'react-native-iphone-x-helper';
import Login from '../../StaticPages/Login/Login';
import { AntDesign, MaterialIcons, Feather, EvilIcons, MaterialCommunityIcons, FontAwesome5, SimpleLineIcons } from 'react-native-vector-icons';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { SIZES, icons } from '../../GeneralFiles/constants';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import * as NavigationBar from 'expo-navigation-bar';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { DeviceType, getDeviceTypeAsync } from 'expo-device';

const windowHeight = Dimensions.get('window').height;
const screenHeight = Dimensions.get('screen').height;
const navbarHeight = screenHeight - windowHeight;

const CustomTabBar = (props) => {
    if (isIphoneX()) {
        return (
            // <View>
            <BottomTabBar {...props.props} />
            // </View>
        );
    } else {
        return <BottomTabBar {...props.props} />;
    }
};

const BottomTabs = (props) => {
    const { lang, langdetect } = useContext(LanguageContext);
    const { templateproperties_context } = useContext(FetchingContext);
    const { setCurrentPageIdContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    // const [currentpage, setcurrentpage] = useState(props.currentpageprops);
    const [TabexIcons, setTabexIcons] = useState({
        home1: { family: 'AntDesign', name: 'home' },
        appmenu1: { family: 'Feather', name: 'menu' },
        shopcart1: { family: 'MaterialCommunityIcons', name: 'cart-outline' },
        shopcart2: { family: 'Image', name: icons.cart },
        shopbag1: { family: 'Feather', name: 'shopping-bag' },
        shopbag2: { family: 'SimpleLineIcons', name: 'handbag' },
        shopbag3: { family: 'FontAwesome5', name: 'shopping-bag' },
        shopbag4: { family: 'SimpleLineIcons', name: 'bag' },
        wishlist1: { family: 'AntDesign', name: 'star' },
        wishlist2: { family: 'AntDesign', name: 'hearto' },
        collection1: { family: 'MaterialIcons', name: 'dashboard-customize' },
        search1: { family: 'Feather', name: 'search' },
        percentage1: { family: 'Feather', name: 'percent' },
        calendar1: { family: 'AntDesign', name: 'calendar' },
    });
    const { routingtemp } = React.useContext(TemplateRoutingContext);
    const [IsAnyBottomNavPageExists, setIsAnyBottomNavPageExists] = useState(false);
    const { fetch_inst_tabex_websitetemplatesQueryContext, StyleParseToIntFuncContext } = React.useContext(WebsiteDesignWorkPlaceContext);
    const { setcanbrowseApplicationContext, canbrowseApplicationContext } = React.useContext(FetchingContext);

    useEffect(() => {
        fetch_inst_tabex_websitetemplatesQueryContext?.data?.data?.template?.pages?.forEach(function (arrayItem, arrayindex) {
            if (arrayItem.mobapp_Isbottomnavigation == 1) {
                setIsAnyBottomNavPageExists(true);
            }
        });
    }, []);

    useEffect(() => {
        // if (Platform.OS == 'android') {
        //     const fetchData = async () => {
        //         const visibility = await NavigationBar.setVisibilityAsync('hidden');
        //         await NavigationBar.setBehaviorAsync('overlay-swipe');
        //         // await NavigationBar.setPositionAsync('absolute');
        //     };
        //     // call the function
        //     fetchData()
        //         // make sure to catch any error
        //         .catch(() => {
        //             alert('error');
        //         });
        // }
    }, []);
    // const [templateproperties_context, settemplateproperties] = useState(templateproperties_context);

    return (
        <View
            style={{
                marginStart: 'auto',
                marginEnd: 'auto',
                width: '100%',
                zIndex: 1000,
                backgroundColor: templateproperties_context.template_backgroundcolor == null ? '#f8f8f9' : templateproperties_context.template_backgroundcolor,
                paddingBottom: StyleParseToIntFuncContext(templateproperties_context.bottomnavmarginbottom),
                borderLeftWidth: StyleParseToIntFuncContext(templateproperties_context.bottomnavhorizontalborderwidth),
                borderRightWidth: StyleParseToIntFuncContext(templateproperties_context.bottomnavhorizontalborderwidth),
                borderColor: templateproperties_context.bottomnavbordercolor,
            }}
        >
            <View
                style={{
                    marginStart: 'auto',
                    marginEnd: 'auto',
                    width: templateproperties_context.bottomnavwidth == null ? '100%' : templateproperties_context.bottomnavwidth + '%',
                    zIndex: 1000,
                    backgroundColor: templateproperties_context.bottomnavbgcolor != null ? templateproperties_context.bottomnavbgcolor : '#fff',
                    borderRadius: 100,
                }}
            >
                {IsAnyBottomNavPageExists && (
                    <View style={{ width: '100%', flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                        {fetch_inst_tabex_websitetemplatesQueryContext?.data?.data?.template?.pages?.map(function (arrayItem, arrayindex) {
                            if (arrayItem.mobapp_Isbottomnavigation == 1) {
                                return (
                                    <TouchableOpacity
                                        style={[
                                            generalstyles.allcentered,
                                            {
                                                flex: 1,
                                                marginTop: 'auto',
                                                marginBottom: 'auto',
                                                paddingVertical: templateproperties_context.bottomnavwidth == null || templateproperties_context.bottomnavwidth == '100%' ? 0 : 15,
                                            },
                                        ]}
                                        onPress={() => {
                                            if (canbrowseApplicationContext) {
                                                routingtemp(arrayItem.pagename);
                                            }
                                        }}
                                    >
                                        {TabexIcons[arrayItem.mobapp_pageicon] != undefined && (
                                            <View
                                                style={{
                                                    marginTop: templateproperties_context.bottomnavwidth == null || templateproperties_context.bottomnavwidth == '100%' ? 10 : 0,
                                                    marginBottom: templateproperties_context.bottomnavwidth == null || templateproperties_context.bottomnavwidth == '100%' ? 0 : 3,
                                                }}
                                            >
                                                {TabexIcons[arrayItem.mobapp_pageicon].family == 'AntDesign' && (
                                                    <AntDesign
                                                        name={TabexIcons[arrayItem.mobapp_pageicon].name}
                                                        style={{
                                                            color:
                                                                CurrentPageIdContext == arrayItem.pageid ? templateproperties_context.active_iconcolor : templateproperties_context.bottomnav_iconcolor,
                                                        }}
                                                        size={StyleParseToIntFuncContext(templateproperties_context.bottomnav_iconsize)}
                                                        // size={18}
                                                    />
                                                )}
                                                {TabexIcons[arrayItem.mobapp_pageicon].family == 'Feather' && (
                                                    <Feather
                                                        name={TabexIcons[arrayItem.mobapp_pageicon].name}
                                                        style={{
                                                            color:
                                                                CurrentPageIdContext == arrayItem.pageid ? templateproperties_context.active_iconcolor : templateproperties_context.bottomnav_iconcolor,
                                                        }}
                                                        size={StyleParseToIntFuncContext(templateproperties_context.bottomnav_iconsize)}
                                                    />
                                                )}
                                                {TabexIcons[arrayItem.mobapp_pageicon].family == 'EvilIcons' && (
                                                    <EvilIcons
                                                        name={TabexIcons[arrayItem.mobapp_pageicon].name}
                                                        style={{
                                                            color:
                                                                CurrentPageIdContext == arrayItem.pageid ? templateproperties_context.active_iconcolor : templateproperties_context.bottomnav_iconcolor,
                                                        }}
                                                        size={StyleParseToIntFuncContext(templateproperties_context.bottomnav_iconsize)}
                                                    />
                                                )}
                                                {TabexIcons[arrayItem.mobapp_pageicon].family == 'MaterialIcons' && (
                                                    <MaterialIcons
                                                        name={TabexIcons[arrayItem.mobapp_pageicon].name}
                                                        style={{
                                                            color:
                                                                CurrentPageIdContext == arrayItem.pageid ? templateproperties_context.active_iconcolor : templateproperties_context.bottomnav_iconcolor,
                                                        }}
                                                        size={StyleParseToIntFuncContext(templateproperties_context.bottomnav_iconsize)}
                                                    />
                                                )}
                                                {TabexIcons[arrayItem.mobapp_pageicon].family == 'MaterialCommunityIcons' && (
                                                    <MaterialCommunityIcons
                                                        name={TabexIcons[arrayItem.mobapp_pageicon].name}
                                                        style={{
                                                            color:
                                                                CurrentPageIdContext == arrayItem.pageid ? templateproperties_context.active_iconcolor : templateproperties_context.bottomnav_iconcolor,
                                                        }}
                                                        size={StyleParseToIntFuncContext(templateproperties_context.bottomnav_iconsize)}
                                                    />
                                                )}
                                                {TabexIcons[arrayItem.mobapp_pageicon].family == 'FontAwesome5' && (
                                                    <FontAwesome5
                                                        name={TabexIcons[arrayItem.mobapp_pageicon].name}
                                                        style={{
                                                            color:
                                                                CurrentPageIdContext == arrayItem.pageid ? templateproperties_context.active_iconcolor : templateproperties_context.bottomnav_iconcolor,
                                                        }}
                                                        size={StyleParseToIntFuncContext(templateproperties_context.bottomnav_iconsize)}
                                                    />
                                                )}
                                                {TabexIcons[arrayItem.mobapp_pageicon].family == 'SimpleLineIcons' && (
                                                    <SimpleLineIcons
                                                        name={TabexIcons[arrayItem.mobapp_pageicon].name}
                                                        style={{
                                                            color:
                                                                CurrentPageIdContext == arrayItem.pageid ? templateproperties_context.active_iconcolor : templateproperties_context.bottomnav_iconcolor,
                                                        }}
                                                        size={StyleParseToIntFuncContext(templateproperties_context.bottomnav_iconsize)}
                                                    />
                                                )}
                                                {TabexIcons[arrayItem.mobapp_pageicon].family == 'Image' && (
                                                    <Image
                                                        source={icons.cart2}
                                                        resizeMode="cover"
                                                        style={{
                                                            width:
                                                                StyleParseToIntFuncContext(
                                                                    templateproperties_context.bottomnav_iconsize != null && templateproperties_context.bottomnav_iconsize != undefined
                                                                        ? templateproperties_context.bottomnav_iconsize
                                                                        : 0,
                                                                ) + 6,
                                                            height:
                                                                StyleParseToIntFuncContext(
                                                                    templateproperties_context.bottomnav_iconsize != null && templateproperties_context.bottomnav_iconsize != undefined
                                                                        ? templateproperties_context.bottomnav_iconsize
                                                                        : 0,
                                                                ) + 4,
                                                            tintColor:
                                                                CurrentPageIdContext == arrayItem.pageid ? templateproperties_context.active_iconcolor : templateproperties_context.bottomnav_iconcolor,
                                                        }}
                                                    />
                                                )}
                                            </View>
                                        )}
                                        <Text
                                            style={{
                                                fontSize: StyleParseToIntFuncContext(templateproperties_context.textfontsize),
                                                fontFamily:
                                                    templateproperties_context.bottomnavtextfontweight == 300
                                                        ? 'Poppins-Thin'
                                                        : templateproperties_context.bottomnavtextfontweight == 400
                                                        ? 'Poppins-Light'
                                                        : templateproperties_context.bottomnavtextfontweight == 500
                                                        ? 'Poppins-Regular'
                                                        : templateproperties_context.bottomnavtextfontweight == 600
                                                        ? 'Poppins-Medium'
                                                        : templateproperties_context.bottomnavtextfontweight == 700
                                                        ? 'Poppins-Semibold'
                                                        : 'Poppins-Bold',
                                                color:
                                                    CurrentPageIdContext == arrayItem.pageid
                                                        ? templateproperties_context.activepagecolor
                                                        : templateproperties_context?.textcolor != null
                                                        ? templateproperties_context?.textcolor
                                                        : 'black',
                                                marginBottom:
                                                    templateproperties_context.bottomnavwidth == null || templateproperties_context.bottomnavwidth == '100%' ? (Platform.OS == 'ios' ? 30 : 10) : 0,
                                            }}
                                        >
                                            {langdetect == 'en' ? arrayItem.pagename : arrayItem.pagename_ar}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            }
                        })}
                    </View>
                )}
            </View>
        </View>
    );
};

export default BottomTabs;
