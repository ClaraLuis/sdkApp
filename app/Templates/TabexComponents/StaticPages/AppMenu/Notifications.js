import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Platform, TextInput, Linking, I18nManager } from 'react-native';
import { icons, SIZES, COLORS, images } from '../../GeneralFiles/constants';
import Feather from 'react-native-vector-icons/Feather';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import SpinnerButton from 'react-native-spinner-button';

const Notifications = (props) => {
    const { lang, langdetect, setlang } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { GeneralAPIMutationContext } = useContext(FetchingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [notificationarr, setnotificationarr] = useState([]);

    useEffect(() => {
        setsectionproperties(props.sectionproperties);
        GeneralAPIMutationContext.mutate({
            endpointurl: '/fetchcustomernotifications',

            mutateSuccesscallback: (data, variables) => {
                if (data.data.status) {
                    setnotificationarr(data.data.notifications);
                } else {
                    alert(data.data.reason);
                }
            },
        });
    }, []);

    return (
        <View style={{ height: '100%', paddingBottom: 120 }}>
            {Object.keys(sectionproperties).length != 0 && (
                <View>
                    {GeneralAPIMutationContext.isLoading && (
                        <View style={[generalstyles.allcentered, { width: '100%', height: 500 }]}>
                            <SpinnerButton buttonStyle={{ width: 50, height: 50 }} isLoading={true} indicatorCount={10} spinnerType={'MaterialIndicator'} spinnerColor={'#ccc'}></SpinnerButton>
                        </View>
                    )}
                    {!GeneralAPIMutationContext.isLoading && (
                        <FlatList
                            data={notificationarr}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={[generalstyles.flexColumn, { backgroundColor: 'white', borderRadius: 10 }]}>
                                        <View style={{ flexDirection: 'row', flex: 1, paddingEnd: 30 }}>
                                            <View style={[generalstyles.flexRow, { justifyContent: 'center' }]}>
                                                <View
                                                    style={[
                                                        {
                                                            width: StyleParseToIntFuncContext(sectionproperties.notificationiconwidth),
                                                            height: StyleParseToIntFuncContext(sectionproperties.notificationiconheight),
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            alignContent: 'center',
                                                            marginEnd: 10,
                                                            marginBottom: 'auto',
                                                            // marginTop: 'auto',
                                                            marginStart: 10,
                                                            marginTop: 5,
                                                            backgroundColor: sectionproperties.notificationiconbgcolor,
                                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.notificationiconborderradius, '', true),
                                                        },
                                                    ]}
                                                >
                                                    <Feather
                                                        name="bell"
                                                        size={StyleParseToIntFuncContext(sectionproperties.notificationiconfontsize)}
                                                        style={{ color: sectionproperties.notificationiconcolor, marginTop: 5 }}
                                                    />
                                                </View>
                                            </View>

                                            <View
                                                style={{
                                                    display: 'flex',
                                                    flex: 1,
                                                }}
                                            >
                                                <Text
                                                    style={[
                                                        generalstyles.poppinsMedium,
                                                        {
                                                            color: sectionproperties.notificationtitlecolor,
                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.notificationtitlefontSize),
                                                            textAlign: 'left',
                                                        },
                                                    ]}
                                                >
                                                    {item.body}
                                                </Text>
                                                <Text
                                                    style={[
                                                        generalstyles.poppinsMedium,
                                                        {
                                                            color: sectionproperties.notificationbodycolor,
                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.notificationbodyfontSize),
                                                            textAlign: 'left',
                                                        },
                                                    ]}
                                                >
                                                    {item.title}
                                                </Text>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'flex-start',
                                                    }}
                                                >
                                                    <AntDesign name="clockcircleo" size={11} color={'grey'} style={{ marginEnd: 3 }} />
                                                    <Text
                                                        style={[
                                                            {
                                                                color: 'grey',
                                                                fontSize: 12,
                                                                paddingTop: Platform.OS === 'ios' ? 0 : 2,
                                                                fontFamily: 'Poppins-Light',
                                                            },
                                                        ]}
                                                    >
                                                        {item.timestamp}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View
                                            style={{
                                                width: '100%',
                                                height: 1,
                                                backgroundColor: '#eee',
                                                marginVertical: 20,
                                            }}
                                        />
                                    </View>
                                );
                            }}
                        />
                    )}
                    {!GeneralAPIMutationContext.isLoading && notificationarr.length == 0 && (
                        <View style={[generalstyles.allcentered, { width: '100%', height: '50%' }]}>
                            <AntDesign
                                name="notification"
                                size={StyleParseToIntFuncContext(sectionproperties.noprod_iconfontSize)}
                                style={{
                                    color: sectionproperties.noprod_iconcolor,
                                }}
                            />
                            <Text
                                style={{
                                    marginTop: 20,
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.noprod_fontSize),
                                    color: sectionproperties.noprod_color,
                                    fontFamily:
                                        sectionproperties.noprod_fontWeight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.noprod_fontWeight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.noprod_fontWeight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.noprod_fontWeight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.noprod_fontWeight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                }}
                            >
                                {langdetect == 'en' ? sectionproperties.nocards_content_en : sectionproperties.nocards_content_ar}
                            </Text>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    settingscard: {
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    settingsiconcont: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginEnd: 10,
    },
    titlecont: {
        paddingStart: 20,
        paddingEnd: 20,
        width: '100%',
        marginBottom: 10,
        textAlign: 'left',
    },
});

export default Notifications;
