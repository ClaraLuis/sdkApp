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

const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityState, children, onPress, pageidprops, pro, pagenameprops }) => {
    const { CurrentPageIdContext, setCurrentPageIdContext } = React.useContext(WebsiteDesignWorkPlaceContext);
    const { routingcountext } = React.useContext(TemplateRoutingContext);
    return (
        <View
            style={{
                flex: 1,
                paddingTop: 10,
                alignItems: 'center',
            }}
        >
            <TouchableOpacity
                style={{
                    flex: 1,

                    fontSize: 20,
                }}
                activeOpacity={1}
                onPress={() => {
                    setCurrentPageIdContext(pageidprops);
                    routingcountext(pagenameprops);
                }}
            >
                {children}
            </TouchableOpacity>
        </View>
    );
};
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
    const { langdetect } = useContext(LanguageContext);
    const { templateproperties_context } = useContext(FetchingContext);
    const [currentpage, setcurrentpage] = useState(props.currentpageprops);
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
    });
    const { routingtemp } = React.useContext(TemplateRoutingContext);
    const [IsAnyBottomNavPageExists, setIsAnyBottomNavPageExists] = useState(false);
    const { fetch_inst_tabex_websitetemplatesQueryContext, StyleParseToIntFuncContext } = React.useContext(WebsiteDesignWorkPlaceContext);
    const deviceTypeMap = {
        [DeviceType.UNKNOWN]: 'unknown',
        [DeviceType.PHONE]: 'phone',
        [DeviceType.TABLET]: 'tablet',
        [DeviceType.DESKTOP]: 'desktop',
        [DeviceType.TV]: 'tv',
    };
    const [devicetype, setdevicetype] = useState('unknown');
    useEffect(() => {
        fetch_inst_tabex_websitetemplatesQueryContext.data.data.template.pages.forEach(function (arrayItem, arrayindex) {
            if (arrayItem.mobapp_Isbottomnavigation == 1) {
                setIsAnyBottomNavPageExists(true);
            }
        });
        getDeviceTypeAsync().then((deviceType) => {
            setdevicetype(deviceTypeMap[deviceType]);
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
    const [templateproperties, settemplateproperties] = useState(templateproperties_context);

    return (
        <View style={{ width: SIZES.width, zIndex: 1000 }}>
            {IsAnyBottomNavPageExists && (
                <Tab.Navigator
                    tabBar={(props) => <CustomTabBar props={props} />}
                    screenOptions={{
                        tabBarStyle: {
                            bottom: Platform.OS == 'ios' ? (devicetype == 'tablet' ? 65 : 1) : -10,
                        },
                    }}
                >
                    {fetch_inst_tabex_websitetemplatesQueryContext.data.data.template.pages.map(function (arrayItem, arrayindex) {
                        if (arrayItem.mobapp_Isbottomnavigation == 1) {
                            return (
                                <Tab.Screen
                                    name={arrayItem.pagename}
                                    component={Login}
                                    options={{
                                        tabBarVisible: false,
                                        headerShown: false,
                                        tabBarButton: (props) => (
                                            <TouchableOpacity
                                                style={[generalstyles.allcentered, { backgroundColor: '#fff', flex: 1, alignItems: 'center' }]}
                                                onPress={() => {
                                                    routingtemp(arrayItem.pagename);
                                                    // setCurrentPageIdContext(pageidprops);
                                                }}
                                            >
                                                {TabexIcons[arrayItem.mobapp_pageicon] != undefined && (
                                                    <View>
                                                        {TabexIcons[arrayItem.mobapp_pageicon].family == 'AntDesign' && (
                                                            <AntDesign
                                                                name={TabexIcons[arrayItem.mobapp_pageicon].name}
                                                                style={{
                                                                    color: currentpage?.pageid == arrayItem.pageid ? templateproperties.active_iconcolor : templateproperties.bottomnav_iconcolor,
                                                                }}
                                                                size={StyleParseToIntFuncContext(templateproperties.bottomnav_iconsize)}
                                                                // size={18}
                                                            />
                                                        )}
                                                        {TabexIcons[arrayItem.mobapp_pageicon].family == 'Feather' && (
                                                            <Feather
                                                                name={TabexIcons[arrayItem.mobapp_pageicon].name}
                                                                style={{
                                                                    color: currentpage?.pageid == arrayItem.pageid ? templateproperties.active_iconcolor : templateproperties.bottomnav_iconcolor,
                                                                }}
                                                                size={StyleParseToIntFuncContext(templateproperties.bottomnav_iconsize)}
                                                            />
                                                        )}
                                                        {TabexIcons[arrayItem.mobapp_pageicon].family == 'EvilIcons' && (
                                                            <EvilIcons
                                                                name={TabexIcons[arrayItem.mobapp_pageicon].name}
                                                                style={{
                                                                    color: currentpage?.pageid == arrayItem.pageid ? templateproperties.active_iconcolor : templateproperties.bottomnav_iconcolor,
                                                                }}
                                                                size={StyleParseToIntFuncContext(templateproperties.bottomnav_iconsize)}
                                                            />
                                                        )}
                                                        {TabexIcons[arrayItem.mobapp_pageicon].family == 'MaterialIcons' && (
                                                            <MaterialIcons
                                                                name={TabexIcons[arrayItem.mobapp_pageicon].name}
                                                                style={{
                                                                    color: currentpage?.pageid == arrayItem.pageid ? templateproperties.active_iconcolor : templateproperties.bottomnav_iconcolor,
                                                                }}
                                                                size={StyleParseToIntFuncContext(templateproperties.bottomnav_iconsize)}
                                                            />
                                                        )}
                                                        {TabexIcons[arrayItem.mobapp_pageicon].family == 'MaterialCommunityIcons' && (
                                                            <MaterialCommunityIcons
                                                                name={TabexIcons[arrayItem.mobapp_pageicon].name}
                                                                style={{
                                                                    color: currentpage?.pageid == arrayItem.pageid ? templateproperties.active_iconcolor : templateproperties.bottomnav_iconcolor,
                                                                }}
                                                                size={StyleParseToIntFuncContext(templateproperties.bottomnav_iconsize)}
                                                            />
                                                        )}
                                                        {TabexIcons[arrayItem.mobapp_pageicon].family == 'FontAwesome5' && (
                                                            <FontAwesome5
                                                                name={TabexIcons[arrayItem.mobapp_pageicon].name}
                                                                style={{
                                                                    color: currentpage?.pageid == arrayItem.pageid ? templateproperties.active_iconcolor : templateproperties.bottomnav_iconcolor,
                                                                }}
                                                                size={StyleParseToIntFuncContext(templateproperties.bottomnav_iconsize)}
                                                            />
                                                        )}
                                                        {TabexIcons[arrayItem.mobapp_pageicon].family == 'SimpleLineIcons' && (
                                                            <SimpleLineIcons
                                                                name={TabexIcons[arrayItem.mobapp_pageicon].name}
                                                                style={{
                                                                    color: currentpage?.pageid == arrayItem.pageid ? templateproperties.active_iconcolor : templateproperties.bottomnav_iconcolor,
                                                                }}
                                                                size={StyleParseToIntFuncContext(templateproperties.bottomnav_iconsize)}
                                                            />
                                                        )}
                                                        {TabexIcons[arrayItem.mobapp_pageicon].family == 'Image' && (
                                                            <Image
                                                                source={icons.cart2}
                                                                resizeMode="cover"
                                                                style={{
                                                                    width:
                                                                        StyleParseToIntFuncContext(
                                                                            templateproperties.bottomnav_iconsize != null && templateproperties.bottomnav_iconsize != undefined
                                                                                ? templateproperties.bottomnav_iconsize
                                                                                : 0,
                                                                        ) + 6,
                                                                    height:
                                                                        StyleParseToIntFuncContext(
                                                                            templateproperties.bottomnav_iconsize != null && templateproperties.bottomnav_iconsize != undefined
                                                                                ? templateproperties.bottomnav_iconsize
                                                                                : 0,
                                                                        ) + 4,
                                                                    tintColor: currentpage?.pageid == arrayItem.pageid ? templateproperties.active_iconcolor : templateproperties.bottomnav_iconcolor,
                                                                }}
                                                            />
                                                        )}
                                                    </View>
                                                )}
                                                {/* <TabBarCustomButton {...props} pro={props} pageidprops={arrayItem.pageid} pagenameprops={arrayItem.pagename} /> */}
                                                <Text
                                                    style={{
                                                        fontSize: StyleParseToIntFuncContext(templateproperties.textfontsize),
                                                        fontFamily:
                                                            templateproperties.bottomnavtextfontweight == 300
                                                                ? 'Poppins-Thin'
                                                                : templateproperties.bottomnavtextfontweight == 400
                                                                ? 'Poppins-Light'
                                                                : templateproperties.bottomnavtextfontweight == 500
                                                                ? 'Poppins-Regular'
                                                                : templateproperties.bottomnavtextfontweight == 600
                                                                ? 'Poppins-Medium'
                                                                : templateproperties.bottomnavtextfontweight == 700
                                                                ? 'Poppins-Semibold'
                                                                : 'Poppins-Bold',
                                                        color:
                                                            currentpage?.pageid == arrayItem.pageid
                                                                ? templateproperties.activepagecolor
                                                                : templateproperties?.textcolor != null
                                                                ? templateproperties?.textcolor
                                                                : 'black',
                                                    }}
                                                >
                                                    {langdetect == 'en' ? arrayItem.pagename : arrayItem.pagename_ar}
                                                </Text>
                                            </TouchableOpacity>
                                        ),
                                    }}
                                />
                            );
                        }
                    })}
                </Tab.Navigator>
            )}
        </View>
    );
};

export default BottomTabs;
