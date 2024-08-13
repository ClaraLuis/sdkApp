import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import Svg, { Path } from 'react-native-svg';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { Home, Shop } from '../screens';
import Wishlist from '../screens/Wishlist';
import Onboarding from '../screens/Onboarding';
import Menu from '../screens/Menu';
import { COLORS, icons } from '../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();
const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
    var isSelected = accessibilityState.selected;

    if (isSelected) {
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
                        // top: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: COLORS.info,
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.1,
                        shadowRadius: 3,
                        elevation: 1,
                    }}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    height: 60,
                    backgroundColor: COLORS.white,
                }}
                activeOpacity={1}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        );
    }
};

const CustomTabBar = (props) => {
    if (isIphoneX()) {
        return (
            <View>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 30,
                        backgroundColor: COLORS.white,
                    }}
                ></View>
                <BottomTabBar {...props.props} />
            </View>
        );
    } else {
        return <BottomTabBar {...props.props} />;
    }
};

const Tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    right: 0,
                    borderTopWidth: 0,
                    backgroundColor: 'transparent',
                    elevation: 0,
                },
            }}
            tabBar={(props) => <CustomTabBar props={props} />}
        >
            {/* <Tab.Screen
        name="Onboarding"
        component={Onboarding}
        options={{
          tabBarVisible: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="dashboard"
              style={{
                color: focused ? COLORS.white : COLORS.primary,
              }}
              size={22}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      /> */}
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarVisible: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons
                            name="dashboard"
                            style={{
                                color: focused ? COLORS.white : COLORS.primary,
                            }}
                            size={22}
                        />
                    ),
                    tabBarButton: (props) => <TabBarCustomButton {...props} />,
                }}
            />

            <Tab.Screen
                name="Shop"
                component={Shop}
                options={{
                    tabBarVisible: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.cart}
                            resizeMode="cover"
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: focused ? COLORS.white : COLORS.info,
                            }}
                        />
                        // <Feather
                        //   name="shopping-bag"
                        //   style={{
                        //     color: focused ? COLORS.white : COLORS.info,
                        //   }}
                        //   size={22}
                        // />
                    ),
                    tabBarButton: (props) => <TabBarCustomButton {...props} />,
                }}
            />

            <Tab.Screen
                name="Wishlist"
                component={Wishlist}
                options={{
                    tabBarVisible: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <AntDesign
                            name="star"
                            style={{
                                color: focused ? COLORS.white : COLORS.fav,
                            }}
                            size={22}
                        />
                    ),
                    tabBarButton: (props) => <TabBarCustomButton {...props} />,
                }}
            />

            <Tab.Screen
                name="Menu"
                component={Menu}
                options={{
                    tabBarVisible: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Feather
                            name="menu"
                            style={{
                                color: focused ? COLORS.white : COLORS.primary,
                            }}
                            size={22}
                        />
                    ),
                    tabBarButton: (props) => <TabBarCustomButton {...props} />,
                }}
            />
        </Tab.Navigator>
    );
};

export default Tabs;
