import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Platform, View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { COLORS, images, SIZES } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import SpinnerButton from 'react-native-spinner-button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Orderhistory = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { fetchorderhistoryQueryContext, fetchAuthorizationQueryContext, FetchQueriesEngineContext, setFetchQueriesEngineContext, setorderid, setorderindex } = useContext(FetchingContext);
    const { StaticPagesLinksContext, routingcountext } = useContext(TemplateRoutingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [StatePageProperties, setStatePageProperties] = useState({});
    const navigation = useNavigation();

    useEffect(() => {
        StatePageProperties11.pages.forEach(function (item, index) {
            if (CurrentPageIdContext == item.pageid) {
                setStatePageProperties(item.pageobj);
            }
        });
    }, [StatePageProperties11]);

    useEffect(() => {
        var secpropobj = {};
        if (StatePageProperties != undefined && StatePageProperties.pageobj != undefined && StatePageProperties.pageobj.pageproperties != undefined) {
            StatePageProperties.pageobj.pageproperties.forEach(function (sectionitem, sectionindex) {
                secpropobj[sectionitem.property_css_name] = sectionitem.property_value;
            });
        }
        setsectionproperties({ ...secpropobj });
    }, [StatePageProperties]);

    useEffect(() => {
        if (fetchAuthorizationQueryContext.data.data.loggedin == true) {
            var tempFetchQueriesEngineContext = { ...FetchQueriesEngineContext };
            tempFetchQueriesEngineContext.orderhistory = true;
            setFetchQueriesEngineContext({ ...tempFetchQueriesEngineContext });
        } else {
            routingcountext('');
        }
    }, []);
    return (
        <View
            style={[
                generalstyles.containerInner,
                {
                    height: '100%',
                },
            ]}
        >
            {fetchorderhistoryQueryContext.isFetching && (
                <View style={{ height: 400 }}>
                    <SpinnerButton buttonStyle={{ width: 50, height: 50 }} isLoading={true} indicatorCount={10} spinnerType={'MaterialIndicator'} spinnerColor={'#000'}></SpinnerButton>
                </View>
            )}
            {!fetchorderhistoryQueryContext.isFetching && fetchorderhistoryQueryContext.isSuccess && (
                <>
                    <View style={[generalstyles.flexRow, { marginBottom: 5 }]}>
                        <TouchableOpacity
                            style={[
                                generalstyles.flexColumn,
                                {
                                    marginTop: StyleParseToIntFuncContext(
                                        sectionproperties.sectionTitleMarginTop != null && sectionproperties.sectionTitleMarginTop != undefined ? sectionproperties.sectionTitleMarginTop : 0,
                                    ),
                                    marginBottom: StyleParseToIntFuncContext(
                                        sectionproperties.sectionTitleMarginBottom != null && sectionproperties.sectionTitleMarginBottom != undefined ? sectionproperties.sectionTitleMarginBottom : 0,
                                    ),
                                },
                            ]}
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <View style={[generalstyles.flexRow]}>
                                <TouchableOpacity>
                                    <AntDesign
                                        name={langdetect == 'en' ? 'arrowleft' : 'arrowright'}
                                        size={StyleParseToIntFuncContext(sectionproperties.icontextfontsize)}
                                        style={{
                                            color: sectionproperties.sectionTitleColor,
                                            marginEnd: 5,
                                        }}
                                    />
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        marginEnd: 5,
                                        color: sectionproperties.sectionTitleColor,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
                                        textTransform:
                                            sectionproperties.sectionTitleTextTransform == 'Uppercase'
                                                ? 'uppercase'
                                                : sectionproperties.sectionTitleTextTransform == 'Capitalize' || sectionproperties.sectionTitleTextTransform == 'capitalize'
                                                ? 'capitalize'
                                                : sectionproperties.sectionTitleTextTransform == 'none'
                                                ? 'none'
                                                : 'lowercase',
                                        fontFamily:
                                            sectionproperties.sectionTitleFontWeight == 300
                                                ? 'Poppins-Thin'
                                                : sectionproperties.sectionTitleFontWeight == 400
                                                ? 'Poppins-Light'
                                                : sectionproperties.sectionTitleFontWeight == 500
                                                ? 'Poppins-Regular'
                                                : sectionproperties.sectionTitleFontWeight == 600
                                                ? 'Poppins-Medium'
                                                : sectionproperties.sectionTitleFontWeight == 700
                                                ? 'Poppins-Semibold'
                                                : 'Poppins-Bold',
                                    }}
                                >
                                    {langdetect == 'en' ? sectionproperties.sectionTitleContent : sectionproperties.sectionTitleContent_ar}:
                                </Text>
                                <View
                                    style={[
                                        generalstyles.allcentered,
                                        {
                                            marginTop: 'auto',
                                            marginBottom: 'auto',
                                            width: 20,
                                            height: 20,
                                            backgroundColor: sectionproperties.badge_bgcolor,
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.badge_borderradius, '', true),
                                        },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            paddingTop: Platform.OS == 'ios' ? 0 : 1,
                                            paddingStart: Platform.OS == 'ios' ? (langdetect == 'en' ? 1 : 0) : 0,
                                            paddingEnd: Platform.OS == 'ios' ? (langdetect == 'en' ? 0 : 1) : 0,
                                            textTransform: 'capitalize',
                                            fontFamily: 'Poppins-Medium',
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.badge_fontsize),
                                            color: sectionproperties.badge_color,
                                        }}
                                    >
                                        {!fetchorderhistoryQueryContext.isFetching && fetchorderhistoryQueryContext.isSuccess && fetchorderhistoryQueryContext.data.data.ordershistory.length}
                                    </Text>
                                </View>
                            </View>
                            {sectionproperties.shownumberofservices == 'Show' && (
                                <View>
                                    <Text style={[generalstyles.poppinsMedium]}>Number of sessions: {fetchorderhistoryQueryContext.data.data.servicescount}</Text>
                                </View>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[generalstyles.allcentered, { marginStart: 'auto', width: 38, height: 38, backgroundColor: 'white', borderRadius: 100, marginBottom: 10 }]}
                            onPress={() => {
                                fetchorderhistoryQueryContext.refetch();
                            }}
                        >
                            <EvilIcons name="refresh" size={30} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        {fetchorderhistoryQueryContext.data.data.ordershistory.map((item, index) => {
                            return (
                                <View
                                    style={[
                                        generalstyles.flexColumn,
                                        {
                                            backgroundColor: sectionproperties.backgroundColor,
                                            borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.borderTopLeftRadius, '', true),
                                            borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.borderTopRightRadius, '', true),
                                            borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.borderBottomLeftRadius, '', true),
                                            borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.borderBottomRightRadius, '', true),
                                            marginBottom: 15,
                                            padding: 15,
                                            paddingTop: 10,
                                            paddingBottom: 10,
                                        },
                                    ]}
                                >
                                    <View style={{ flexDirection: 'column' }}>
                                        {sectionproperties.statusvisibility == 'Show' && item?.instorderstatus?.orderstatusname_en == 'Cancelled' && (
                                            <View
                                                style={[{ alignItems: 'center', backgroundColor: '#f0a8b9', borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, width: 100, marginBottom: 5 }]}
                                            >
                                                <Text
                                                    style={{
                                                        textTransform: 'capitalize',
                                                        fontFamily: 'Poppins-Medium',
                                                        color: item.statuscolor,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                                        color: COLORS.danger,
                                                    }}
                                                >
                                                    {item?.instorderstatus != null
                                                        ? langdetect == 'en'
                                                            ? item?.instorderstatus?.orderstatusname_en
                                                            : item?.instorderstatus?.orderstatusname_ar
                                                        : lang.inprogress}
                                                </Text>
                                            </View>
                                        )}
                                        {sectionproperties.showorderid == 'Show' && (
                                            <View style={[generalstyles.flexRow, { alignItems: 'center' }]}>
                                                <Text
                                                    style={{
                                                        marginEnd: 5,
                                                        color: sectionproperties.slideshowText1ContentColor,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.slideshowText1ContentFontSize),
                                                        fontFamily:
                                                            sectionproperties.slideshowText1ContentFontWeight == 300
                                                                ? 'Poppins-Thin'
                                                                : sectionproperties.slideshowText1ContentFontWeight == 400
                                                                ? 'Poppins-Light'
                                                                : sectionproperties.slideshowText1ContentFontWeight == 500
                                                                ? 'Poppins-Regular'
                                                                : sectionproperties.slideshowText1ContentFontWeight == 600
                                                                ? 'Poppins-Medium'
                                                                : sectionproperties.slideshowText1ContentFontWeight == 700
                                                                ? 'Poppins-Semibold'
                                                                : 'Poppins-Bold',
                                                        textTransform:
                                                            sectionproperties.slideshowText1ContentTextTransform == 'Uppercase'
                                                                ? 'uppercase'
                                                                : sectionproperties.slideshowText1ContentTextTransform == 'Capitalize'
                                                                ? 'capitalize'
                                                                : sectionproperties.slideshowText1ContentTextTransform == 'None'
                                                                ? 'none'
                                                                : 'lowercase',
                                                    }}
                                                >
                                                    {langdetect == 'en' ? sectionproperties.slideshowText1Content : sectionproperties.slideshowText1Content_ar}:
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.slideshowText1ContentFontSize),
                                                        color: sectionproperties.text1secondarycolor,
                                                        fontFamily:
                                                            sectionproperties.slideshowText1ContentFontWeight == 300
                                                                ? 'Poppins-Thin'
                                                                : sectionproperties.slideshowText1ContentFontWeight == 400
                                                                ? 'Poppins-Light'
                                                                : sectionproperties.slideshowText1ContentFontWeight == 500
                                                                ? 'Poppins-Regular'
                                                                : sectionproperties.slideshowText1ContentFontWeight == 600
                                                                ? 'Poppins-Medium'
                                                                : sectionproperties.slideshowText1ContentFontWeight == 700
                                                                ? 'Poppins-Semibold'
                                                                : 'Poppins-Bold',
                                                    }}
                                                >
                                                    {item.orderid}
                                                </Text>
                                            </View>
                                        )}
                                        <View style={[generalstyles.flexRow, { alignItems: 'center' }]}>
                                            {sectionproperties.producttype == 'Product' && (
                                                <View style={[generalstyles.flexRow, { alignItems: 'center', flex: 1 }]}>
                                                    <Text
                                                        style={{
                                                            fontFamily:
                                                                sectionproperties.slideshowText2ContentFontWeight == 300
                                                                    ? 'Poppins-Thin'
                                                                    : sectionproperties.slideshowText2ContentFontWeight == 400
                                                                    ? 'Poppins-Light'
                                                                    : sectionproperties.slideshowText2ContentFontWeight == 500
                                                                    ? 'Poppins-Regular'
                                                                    : sectionproperties.slideshowText2ContentFontWeight == 600
                                                                    ? 'Poppins-Medium'
                                                                    : sectionproperties.slideshowText2ContentFontWeight == 700
                                                                    ? 'Poppins-Semibold'
                                                                    : 'Poppins-Bold',
                                                            textTransform:
                                                                sectionproperties.slideshowText2ContentTextTransform == 'Uppercase'
                                                                    ? 'uppercase'
                                                                    : sectionproperties.slideshowText2ContentTextTransform == 'Capitalize'
                                                                    ? 'capitalize'
                                                                    : sectionproperties.slideshowText2ContentTextTransform == 'None'
                                                                    ? 'none'
                                                                    : 'lowercase',
                                                            color: sectionproperties.slideshowText2ContentColor,
                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.slideshowText2ContentFontSize),
                                                            marginEnd: 2,
                                                        }}
                                                    >
                                                        {langdetect == 'en' ? 'Reservations:' : 'الخدمات:'}
                                                        {/* {lang.items}: */}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.slideshowText2ContentFontSize),
                                                            fontFamily:
                                                                sectionproperties.slideshowText2ContentFontWeight == 300
                                                                    ? 'Poppins-Thin'
                                                                    : sectionproperties.slideshowText2ContentFontWeight == 400
                                                                    ? 'Poppins-Light'
                                                                    : sectionproperties.slideshowText2ContentFontWeight == 500
                                                                    ? 'Poppins-Regular'
                                                                    : sectionproperties.slideshowText2ContentFontWeight == 600
                                                                    ? 'Poppins-Medium'
                                                                    : sectionproperties.slideshowText2ContentFontWeight == 700
                                                                    ? 'Poppins-Semibold'
                                                                    : 'Poppins-Bold',
                                                            color: sectionproperties.slideshowText2ContentColor,
                                                        }}
                                                    >
                                                        {item.orderitems.length}
                                                    </Text>
                                                </View>
                                            )}
                                            {sectionproperties.total_fontsize != 0 && (
                                                <View style={[generalstyles.flexRow, { alignItems: 'center' }]}>
                                                    <Text
                                                        style={{
                                                            fontFamily:
                                                                sectionproperties.total_fontweight == 300
                                                                    ? 'Poppins-Thin'
                                                                    : sectionproperties.total_fontweight == 400
                                                                    ? 'Poppins-Light'
                                                                    : sectionproperties.total_fontweight == 500
                                                                    ? 'Poppins-Regular'
                                                                    : sectionproperties.total_fontweight == 600
                                                                    ? 'Poppins-Medium'
                                                                    : sectionproperties.total_fontweight == 700
                                                                    ? 'Poppins-Semibold'
                                                                    : 'Poppins-Bold',
                                                            color: sectionproperties.total_color,
                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.total_fontsize),
                                                            marginEnd: 5,
                                                            textTransform:
                                                                sectionproperties.total_texttransform == 'Uppercase'
                                                                    ? 'uppercase'
                                                                    : sectionproperties.total_texttransform == 'Capitalize'
                                                                    ? 'capitalize'
                                                                    : sectionproperties.total_texttransform == 'None'
                                                                    ? 'none'
                                                                    : 'lowercase',
                                                        }}
                                                    >
                                                        {lang.total}:
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            fontFamily:
                                                                sectionproperties.total_fontweight == 300
                                                                    ? 'Poppins-Thin'
                                                                    : sectionproperties.total_fontweight == 400
                                                                    ? 'Poppins-Light'
                                                                    : sectionproperties.total_fontweight == 500
                                                                    ? 'Poppins-Regular'
                                                                    : sectionproperties.total_fontweight == 600
                                                                    ? 'Poppins-Medium'
                                                                    : sectionproperties.total_fontweight == 700
                                                                    ? 'Poppins-Semibold'
                                                                    : 'Poppins-Bold',
                                                            color: sectionproperties.total_secondaryColor,
                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.total_fontsize),
                                                        }}
                                                    >
                                                        {parseFloat(item.totalorderprice).toFixed(2)}{' '}
                                                        {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                                                    </Text>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                    <View style={[generalstyles.flexRow, { alignItems: 'center' }]}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                            <AntDesign
                                                name="clockcircleo"
                                                style={{
                                                    color: sectionproperties.generaltext_fontColor,
                                                }}
                                            />
                                            <Text
                                                style={{
                                                    marginStart: 3,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                                    color: sectionproperties.generaltext_fontColor,
                                                    fontFamily:
                                                        sectionproperties.generaltext_fontWeight == 300
                                                            ? 'Poppins-Thin'
                                                            : sectionproperties.generaltext_fontWeight == 400
                                                            ? 'Poppins-Light'
                                                            : sectionproperties.generaltext_fontWeight == 500
                                                            ? 'Poppins-Regular'
                                                            : sectionproperties.generaltext_fontWeight == 600
                                                            ? 'Poppins-Medium'
                                                            : sectionproperties.generaltext_fontWeight == 700
                                                            ? 'Poppins-Semibold'
                                                            : 'Poppins-Bold',
                                                }}
                                            >
                                                {item.timestamp}
                                            </Text>
                                        </View>
                                        {sectionproperties.statusvisibility == 'Show' && item?.instorderstatus?.orderstatusname_en != 'Cancelled' && (
                                            <View style={[generalstyles.flexRow, { alignItems: 'center' }]}>
                                                <Text
                                                    style={{
                                                        textTransform: 'capitalize',
                                                        fontFamily: 'Poppins-Medium',
                                                        color: item.statuscolor,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                                    }}
                                                >
                                                    {item.instorderstatus != null
                                                        ? langdetect == 'en'
                                                            ? item?.instorderstatus?.orderstatusname_en
                                                            : item?.instorderstatus?.orderstatusname_ar
                                                        : lang.inprogress}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                    <View style={[generalstyles.allcentered, { marginTop: 10 }]}>
                                        <TouchableOpacity
                                            style={[
                                                generalstyles.allcentered,
                                                {
                                                    width: StyleParseToIntFuncContext(
                                                        sectionproperties.generalbtn_width != null && sectionproperties.generalbtn_width != undefined ? sectionproperties.generalbtn_width : 0,
                                                    ),
                                                    height: StyleParseToIntFuncContext(
                                                        sectionproperties.generalbtn_height != null && sectionproperties.generalbtn_height != undefined ? sectionproperties.generalbtn_height : 0,
                                                    ),
                                                    borderColor: sectionproperties.generalbtn_bordercolor,
                                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderwidth, '', true),
                                                    borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertopleftradius, '', true),
                                                    borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertoprightradius, '', true),
                                                    borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomleftradius, '', true),
                                                    borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomrightradius, '', true),
                                                    backgroundColor: sectionproperties.generalbtn_bgColor,
                                                },
                                            ]}
                                            onPress={() => {
                                                setorderid(item.orderid);
                                                setorderindex(index);
                                                routingcountext(StaticPagesLinksContext.OrderDetails);
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: sectionproperties.generalbtn_textColor,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.generalbtn_fontsize),
                                                    fontFamily:
                                                        sectionproperties.generalbtn_fontweight == 300
                                                            ? 'Poppins-Thin'
                                                            : sectionproperties.generalbtn_fontweight == 400
                                                            ? 'Poppins-Light'
                                                            : sectionproperties.generalbtn_fontweight == 500
                                                            ? 'Poppins-Regular'
                                                            : sectionproperties.generalbtn_fontweight == 600
                                                            ? 'Poppins-Medium'
                                                            : sectionproperties.generalbtn_fontweight == 700
                                                            ? 'Poppins-Semibold'
                                                            : 'Poppins-Bold',
                                                    textTransform:
                                                        sectionproperties.generalbtn_texttransform == 'Uppercase'
                                                            ? 'uppercase'
                                                            : sectionproperties.generalbtn_texttransform == 'Capitalize'
                                                            ? 'capitalize'
                                                            : sectionproperties.generalbtn_texttransform == 'none'
                                                            ? 'none'
                                                            : 'lowercase',
                                                }}
                                            >
                                                {langdetect == 'en' ? sectionproperties.slideshow_btn_text : sectionproperties.slideshow_btn_text_ar}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })}
                        {fetchorderhistoryQueryContext.data.data.ordershistory.length == 0 && (
                            <View style={{ height: 500, width: '100%', display: 'flex', alignItem: 'center', justifyContent: 'center' }}>
                                <View style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                    {/* <Ionicons name="ios-sad-outline" size={StyleParseToIntFuncContext(sectionproperties.noprod_iconfontSize)} color={sectionproperties.noprod_iconcolor} /> */}
                                    <Text
                                        style={{
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
                                            color: sectionproperties.noprod_color,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.noprod_fontSize),
                                        }}
                                    >
                                        {langdetect == 'en' ? sectionproperties.nocards_content_en : sectionproperties.nocards_content_ar}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>
                </>
            )}
        </View>
    );
};
const styles = StyleSheet.create({});

export default Orderhistory;
