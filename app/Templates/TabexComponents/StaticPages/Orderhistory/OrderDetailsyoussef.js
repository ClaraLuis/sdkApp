import React, { useState, useContext, useEffect, Fragment } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, SafeAreaView, FlatList } from 'react-native';
import { icons, SIZES, COLORS, images } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { urlEndpoint } from '../../../../config/imagekit';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ImageComponent } from '../../../ImageComponent';

const OrderDetails = (props) => {
    const navigation = useNavigation();
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const queryClient = useQueryClient();
    const { lang, langdetect } = useContext(LanguageContext);
    const { CurrentPageIdContext, StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { routingcountext } = useContext(TemplateRoutingContext);
    const {
        DeleteOrderMutationContext,
        orderindex,
        orderid,
        fetchorderhistoryQueryContext,
        FetchQueriesEngineContext,
        setFetchQueriesEngineContext,
        fetchAuthorizationQueryContext,
        fetchCustomerStatusContext,
    } = useContext(FetchingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [StatePageProperties, setStatePageProperties] = useState({});
    const [statusArr, setstatusArr] = useState([]);

    const [openreviewmodalproductobj, setopenreviewmodalproductobj] = useState({});
    const [openreviewmodal, setopenreviewmodal] = useState(false);
    useEffect(() => {
        if (fetchAuthorizationQueryContext.data.data.loggedin == true) {
            var tempFetchQueriesEngineContext = { ...FetchQueriesEngineContext };
            tempFetchQueriesEngineContext.orderhistory = true;
            setFetchQueriesEngineContext({ ...tempFetchQueriesEngineContext });
        } else {
            routingcountext('');
        }
    }, []);
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
            tempFetchQueriesEngineContext.fetchCustomerStatus = true;
            setFetchQueriesEngineContext({ ...tempFetchQueriesEngineContext });
        } else {
        }
    }, []);
    useEffect(() => {
        if (
            fetchorderhistoryQueryContext.isSuccess &&
            !fetchCustomerStatusContext.isFetching == true &&
            fetchCustomerStatusContext.isSuccess == true &&
            fetchCustomerStatusContext?.data?.data?.customer_statusArr.length != 0
        ) {
            if (fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex]?.instorderstatus == null) {
                var tempstatusArr = [...statusArr];
                tempstatusArr = [...fetchCustomerStatusContext?.data?.data?.customer_statusArr];
                var statusobj = {
                    orderstatusname_en: 'In progress',
                    orderstatusname_ar: 'جارى',
                    statuscolor: 'orange',
                    active: 1,
                };
                tempstatusArr.unshift(statusobj);
                setstatusArr([...tempstatusArr]);
            } else {
                var tempstatusArr = [...statusArr];
                tempstatusArr = [...fetchCustomerStatusContext?.data?.data?.customer_statusArr];
                var statusobj = {
                    orderstatusname_en: 'In progress',
                    orderstatusname_ar: 'جارى',
                    statuscolor: 'orange',
                    active: 1,
                };
                tempstatusArr.unshift(statusobj);
                setstatusArr([...tempstatusArr]);
            }
        }
    }, [fetchCustomerStatusContext.isSuccess, fetchorderhistoryQueryContext.isSuccess]);
    const getbgcolor = (status) => {
        if (
            fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex]?.instorderstatus == null ||
            fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex]?.instorderstatus?.orderstatusname_en == null
        ) {
            if (status.orderstatusname_en == 'In progress') {
                return 'orange';
            } else {
                return 'grey';
            }
        } else {
            if (fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex]?.instorderstatus?.orderstatusname_en == status.orderstatusname_en) {
                return status.statuscolor;
            } else {
                return 'grey';
            }
        }
    };
    const showdeletebuttonorder = () => {
        var showbutton = false;
        if (fetchAuthorizationQueryContext?.data?.data?.instinfo?.cancustomerdeleteorder == 1) {
            if (orderindex.length != 0) {
                if (fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex]?.instorderstatus == null) {
                    showbutton = true;
                }
            }
        }
        return showbutton;
    };
    return (
        <View
            style={[
                generalstyles.container,
                {
                    height: '100%',
                    paddingStart: 0,
                    paddingEnd: 0,
                    paddingTop: StyleParseToIntFuncContext(sectionproperties.marginTop, '', true),
                    paddingBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom, '', true),
                },
            ]}
        >
            {!fetchorderhistoryQueryContext.isFetching && fetchorderhistoryQueryContext.isSuccess && orderindex.length != 0 && (
                <View>
                    <View style={[generalstyles.containerInner, { marginBottom: 10 }]}>
                        <View style={[generalstyles.allcentered, { flexDirection: 'row', marginBottom: 20 }]}>
                            <Text
                                style={{
                                    textAlign: 'left',
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
                                    color: sectionproperties.sectionTitleColor,
                                    marginEnd: 5,
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
                            <Text
                                style={{
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
                                    textAlign: 'left',
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
                                    color: sectionproperties.sectiontitlesecondarycolor,
                                }}
                            >
                                {orderid}
                            </Text>
                        </View>

                        {!fetchCustomerStatusContext.isFetching &&
                            fetchCustomerStatusContext.isSuccess &&
                            fetchCustomerStatusContext?.data?.data?.customer_statusArr.length != 0 &&
                            sectionproperties.showSummarySection == 'Show' && (
                                <View style={[generalstyles.flexRow, { marginBottom: 10, width: '100%', position: 'relative', paddingHorizontal: 5 }]}>
                                    <FlatList
                                        horizontal={true}
                                        data={statusArr}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item) => item.id}
                                        renderItem={({ item, index }) => {
                                            if (item.active == 1) {
                                                return (
                                                    <View style={[generalstyles.flexColumn, { minWidth: 100, paddingTop: 3 }]}>
                                                        <View>
                                                            {statusArr.length - 1 != index && (
                                                                <View
                                                                    style={{
                                                                        position: 'absolute',
                                                                        top: 7,
                                                                        width: '100%',
                                                                        height: 1,
                                                                        backgroundColor: getbgcolor(item),
                                                                    }}
                                                                />
                                                            )}
                                                            <View
                                                                style={[
                                                                    generalstyles.allcentered,
                                                                    {
                                                                        width: 20,
                                                                        height: 20,
                                                                        borderRadius: 100,
                                                                        backgroundColor: getbgcolor(item),
                                                                        position: 'absolute',
                                                                        top: -2,
                                                                    },
                                                                ]}
                                                            >
                                                                {item.orderstatusname_en ==
                                                                    fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex]?.instorderstatus?.orderstatusname_en && (
                                                                    <Feather name="check" size={16} color={'white'} />
                                                                )}
                                                            </View>
                                                        </View>
                                                        <Text
                                                            style={[
                                                                generalstyles.poppinsMedium,
                                                                {
                                                                    fontSize: StyleParseToIntFuncContext(14),
                                                                    marginTop: 25,
                                                                    textTransform: 'capitalize',
                                                                    color: getbgcolor(item),
                                                                    textAlign: 'left',
                                                                },
                                                            ]}
                                                        >
                                                            {langdetect == 'en' ? item.orderstatusname_en : item.orderstatusname_ar}
                                                        </Text>
                                                    </View>
                                                );
                                            }
                                        }}
                                    />
                                </View>
                            )}
                    </View>
                    <View>
                        <Text
                            style={[
                                generalstyles.containerInner,
                                {
                                    fontFamily:
                                        sectionproperties.innersection_titlefontweight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.innersection_titlefontweight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.innersection_titlefontweight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.innersection_titlefontweight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.innersection_titlefontweight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                    textTransform:
                                        sectionproperties.innersection_titletextTransform == 'Uppercase'
                                            ? 'uppercase'
                                            : sectionproperties.innersection_titletextTransform == 'Capitalize'
                                            ? 'capitalize'
                                            : 'lowercase',
                                    marginBottom: 10,
                                    textAlign: 'left',
                                    fontSize: StyleParseToIntFuncContext(
                                        sectionproperties.innersection_titlefontsize != null && sectionproperties.innersection_titlefontsize != undefined
                                            ? sectionproperties.innersection_titlefontsize
                                            : 15,
                                    ),
                                    color: sectionproperties.innersection_titlecolor,
                                },
                            ]}
                        >
                            {lang.paymentmethod}
                        </Text>
                        <View
                            style={[
                                {
                                    padding: 10,
                                    marginBottom: 10,
                                    backgroundColor: sectionproperties.backgroundColor,
                                },
                            ]}
                        >
                            <View style={[generalstyles.flexRow, { marginBottom: 5, justifyContent: 'center', alignItems: 'center' }]}>
                                <Text
                                    style={{
                                        fontFamily: 'Poppins-Medium',
                                        color: sectionproperties.generaltext_fontColor,
                                        fontSize: StyleParseToIntFuncContext(
                                            sectionproperties.generaltext_fontSize != null && sectionproperties.generaltext_fontSize != undefined ? sectionproperties.generaltext_fontSize : 15,
                                        ),
                                    }}
                                >
                                    {fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex]?.paymentmethod == 'cod'
                                        ? langdetect == 'en'
                                            ? sectionproperties.cod_text_en
                                            : sectionproperties.cod_text_ar
                                        : lang.onlinepayment}
                                </Text>
                            </View>
                            <View style={{ width: '100%', backgroundColor: '#eee', height: 1, marginBottom: 10 }}></View>
                            <View style={[generalstyles.flexRow, { marginBottom: 5 }]}>
                                <View style={{ width: 7, height: 7, borderRadius: 50, backgroundColor: sectionproperties.generaltext_fontColor, opacity: 0.2, marginEnd: 10 }}></View>
                                <Text
                                    style={{
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
                                        color: sectionproperties.generaltext_fontColor,
                                        fontSize: StyleParseToIntFuncContext(
                                            sectionproperties.generaltext_fontSize != null && sectionproperties.generaltext_fontSize != undefined ? sectionproperties.generaltext_fontSize : 15,
                                        ),
                                    }}
                                >
                                    {lang.subtotal}:{' '}
                                </Text>
                                <Text
                                    style={{
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
                                        color: sectionproperties.text_secondarycolor,
                                        fontSize: StyleParseToIntFuncContext(
                                            sectionproperties.generaltext_fontSize != null && sectionproperties.generaltext_fontSize != undefined ? sectionproperties.generaltext_fontSize : 15,
                                        ),
                                    }}
                                >
                                    {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''}{' '}
                                    {fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex]?.orderitemstotalprice}{' '}
                                    {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                                </Text>
                            </View>
                            {fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex]?.haspromocode == 1 && (
                                <View style={[generalstyles.flexRow, { marginBottom: 5 }]}>
                                    <View style={{ width: 7, height: 7, borderRadius: 50, backgroundColor: sectionproperties.generaltext_fontColor, opacity: 0.2, marginEnd: 10 }}></View>
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins-Medium',
                                            color: COLORS.danger,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                            opacity: 0.8,
                                        }}
                                    >
                                        {lang.discount}:{' '}
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins-Medium',
                                            color: COLORS.danger,
                                            fontSize: StyleParseToIntFuncContext(
                                                sectionproperties.generaltext_fontSize != null && sectionproperties.generaltext_fontSize != undefined ? sectionproperties.generaltext_fontSize : 15,
                                            ),
                                        }}
                                    >
                                        - {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''}{' '}
                                        {fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex]?.discountprice}{' '}
                                        {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                                    </Text>
                                </View>
                            )}
                            {fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex]?.haspromocode == 1 && (
                                <View style={[generalstyles.flexRow, { marginBottom: 5 }]}>
                                    <View style={{ width: 7, height: 7, borderRadius: 50, backgroundColor: sectionproperties.generaltext_fontColor, opacity: 0.2, marginEnd: 10 }}></View>
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins-Medium',
                                            color: sectionproperties.generaltext_fontColor,
                                            fontSize: StyleParseToIntFuncContext(
                                                sectionproperties.generaltext_fontSize != null && sectionproperties.generaltext_fontSize != undefined ? sectionproperties.generaltext_fontSize : 15,
                                            ),
                                        }}
                                    >
                                        {lang.subtotalafterdiscount}:{' '}
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins-Medium',
                                            color: sectionproperties.text_secondarycolor,
                                            fontSize: StyleParseToIntFuncContext(
                                                sectionproperties.generaltext_fontSize != null && sectionproperties.generaltext_fontSize != undefined ? sectionproperties.generaltext_fontSize : 15,
                                            ),
                                        }}
                                    >
                                        {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''}{' '}
                                        {fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex]?.priceafterdiscount}{' '}
                                        {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                                    </Text>
                                </View>
                            )}
                            {sectionproperties.hideshipping == 'Show' && (
                                <View style={[generalstyles.flexRow, { marginBottom: 5 }]}>
                                    <View style={{ width: 7, height: 7, borderRadius: 50, backgroundColor: sectionproperties.generaltext_fontColor, opacity: 0.2, marginEnd: 10 }}></View>
                                    <Text
                                        style={{
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
                                            color: sectionproperties.generaltext_fontColor,
                                            fontSize: StyleParseToIntFuncContext(
                                                sectionproperties.generaltext_fontSize != null && sectionproperties.generaltext_fontSize != undefined ? sectionproperties.generaltext_fontSize : 15,
                                            ),
                                        }}
                                    >
                                        {lang.shippingfees}:{' '}
                                    </Text>
                                    <Text
                                        style={{
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
                                            color: sectionproperties.text_secondarycolor,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                        }}
                                    >
                                        {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''}{' '}
                                        {fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex]?.zoneprice}{' '}
                                        {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                                    </Text>
                                </View>
                            )}
                            <View style={[generalstyles.flexRow, { marginBottom: 5 }]}>
                                <View style={{ width: 7, height: 7, borderRadius: 50, backgroundColor: sectionproperties.generaltext_fontColor, opacity: 0.2, marginEnd: 10 }}></View>
                                <Text
                                    style={{
                                        color: sectionproperties.total_color,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.total_fontsize),
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
                                        textTransform:
                                            sectionproperties.total_texttransform == 'Uppercase'
                                                ? 'uppercase'
                                                : sectionproperties.total_texttransform == 'Capitalize'
                                                ? 'capitalize'
                                                : sectionproperties.total_texttransform == 'none'
                                                ? 'none'
                                                : 'lowercase',
                                    }}
                                >
                                    {lang.total}:{' '}
                                </Text>
                                <Text
                                    style={{
                                        color: sectionproperties.total_secondaryColor,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.total_fontsize),
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
                                        textTransform:
                                            sectionproperties.total_texttransform == 'Uppercase'
                                                ? 'uppercase'
                                                : sectionproperties.total_texttransform == 'Capitalize'
                                                ? 'capitalize'
                                                : sectionproperties.total_texttransform == 'none'
                                                ? 'none'
                                                : 'lowercase',
                                    }}
                                >
                                    {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''}{' '}
                                    {fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex]?.totalorderprice}{' '}
                                    {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text
                            style={[
                                generalstyles.containerInner,
                                {
                                    marginBottom: 10,
                                    textAlign: 'left',
                                    fontFamily:
                                        sectionproperties.innersection_titlefontweight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.innersection_titlefontweight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.innersection_titlefontweight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.innersection_titlefontweight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.innersection_titlefontweight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.innersection_titlefontsize),
                                    color: sectionproperties.innersection_titlecolor,
                                    textTransform:
                                        sectionproperties.innersection_titletextTransform == 'Uppercase'
                                            ? 'uppercase'
                                            : sectionproperties.innersection_titletextTransform == 'Capitalize'
                                            ? 'capitalize'
                                            : sectionproperties.innersection_titletextTransform == 'none'
                                            ? 'none'
                                            : 'lowercase',
                                },
                            ]}
                        >
                            {lang.address}
                        </Text>
                        <View
                            style={[
                                {
                                    padding: 10,
                                    marginBottom: 10,
                                    backgroundColor: sectionproperties.backgroundColor,
                                },
                            ]}
                        >
                            <View style={[generalstyles.flexRow, { marginBottom: 5 }]}>
                                <View style={{ width: 7, height: 7, borderRadius: 50, backgroundColor: sectionproperties.generaltext_fontColor, opacity: 0.2, marginEnd: 10 }}></View>
                                <Text
                                    style={{
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
                                        color: sectionproperties.generaltext_fontColor,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                        marginEnd: 5,
                                    }}
                                >
                                    {lang.country}:{' '}
                                </Text>
                                <Text
                                    style={{
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
                                        color: sectionproperties.text_secondarycolor,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                    }}
                                >
                                    {fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex]?.country}
                                </Text>
                            </View>
                            <View style={[generalstyles.flexRow, { marginBottom: 5 }]}>
                                <View style={{ width: 7, height: 7, borderRadius: 50, backgroundColor: sectionproperties.generaltext_fontColor, opacity: 0.2, marginEnd: 10 }}></View>
                                <Text
                                    style={{
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
                                        color: sectionproperties.generaltext_fontColor,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                        marginEnd: 5,
                                    }}
                                >
                                    {lang.state}:{' '}
                                </Text>
                                <Text
                                    style={{
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
                                        color: sectionproperties.text_secondarycolor,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                    }}
                                >
                                    {fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex]?.state}
                                </Text>
                            </View>
                            <View style={[generalstyles.flexRow, { marginBottom: 5 }]}>
                                <View style={{ width: 7, height: 7, borderRadius: 50, backgroundColor: sectionproperties.generaltext_fontColor, opacity: 0.2, marginEnd: 10 }}></View>
                                <Text
                                    style={{
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
                                        color: sectionproperties.generaltext_fontColor,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                        marginEnd: 5,
                                    }}
                                >
                                    {lang.address}:{' '}
                                </Text>
                                <Text
                                    style={{
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
                                        color: sectionproperties.text_secondarycolor,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex]?.address}
                                </Text>
                            </View>
                        </View>
                    </View>
                    {sectionproperties.shownotes == 'Show' && (
                        <View>
                            <Text
                                style={[
                                    generalstyles.containerInner,
                                    {
                                        marginBottom: 10,
                                        textAlign: 'left',
                                        fontFamily:
                                            sectionproperties.innersection_titlefontweight == 300
                                                ? 'Poppins-Thin'
                                                : sectionproperties.innersection_titlefontweight == 400
                                                ? 'Poppins-Light'
                                                : sectionproperties.innersection_titlefontweight == 500
                                                ? 'Poppins-Regular'
                                                : sectionproperties.innersection_titlefontweight == 600
                                                ? 'Poppins-Medium'
                                                : sectionproperties.innersection_titlefontweight == 700
                                                ? 'Poppins-Semibold'
                                                : 'Poppins-Bold',
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.innersection_titlefontsize),
                                        color: sectionproperties.innersection_titlecolor,
                                        textTransform:
                                            sectionproperties.innersection_titletextTransform == 'Uppercase'
                                                ? 'uppercase'
                                                : sectionproperties.innersection_titletextTransform == 'Capitalize'
                                                ? 'capitalize'
                                                : sectionproperties.innersection_titletextTransform == 'none'
                                                ? 'none'
                                                : 'lowercase',
                                    },
                                ]}
                            >
                                {langdetect == 'en' ? 'Notes' : 'الملاحظات'}
                            </Text>
                            <View
                                style={[
                                    {
                                        padding: 10,
                                        marginBottom: 10,
                                        backgroundColor: sectionproperties.backgroundColor,
                                    },
                                ]}
                            >
                                <View style={[generalstyles.flexRow, { marginBottom: 5 }]}>
                                    <View style={{ width: 7, height: 7, borderRadius: 50, backgroundColor: sectionproperties.generaltext_fontColor, opacity: 0.2, marginEnd: 10 }}></View>
                                    <Text
                                        style={{
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
                                            color: sectionproperties.text_secondarycolor,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                        }}
                                    >
                                        {fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex]?.notes}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}
                    <View>
                        <Text
                            style={[
                                generalstyles.containerInner,
                                {
                                    marginBottom: 10,
                                    textAlign: 'left',
                                    fontFamily:
                                        sectionproperties.innersection_titlefontweight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.innersection_titlefontweight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.innersection_titlefontweight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.innersection_titlefontweight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.innersection_titlefontweight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.innersection_titlefontsize),
                                    color: sectionproperties.innersection_titlecolor,
                                    textTransform:
                                        sectionproperties.innersection_titletextTransform == 'Uppercase'
                                            ? 'uppercase'
                                            : sectionproperties.innersection_titletextTransform == 'Capitalize'
                                            ? 'capitalize'
                                            : sectionproperties.innersection_titletextTransform == 'none'
                                            ? 'none'
                                            : 'lowercase',
                                },
                            ]}
                        >
                            {lang.items}
                        </Text>
                        <View
                            style={{
                                backgroundColor: sectionproperties.backgroundColor,
                            }}
                        >
                            {fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex]?.orderitems.map((item, index) => {
                                var variantoptions = [];
                                if (item.isvariant == 1) {
                                    var decodevariantoptions = JSON.parse(item.variantoptions);
                                    variantoptions = decodevariantoptions;
                                }
                                return (
                                    <View style={{ flexDirection: 'column', padding: 10, paddingTop: index != 0 ? 0 : 10 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View
                                                style={{
                                                    width: 70,
                                                    height: 70,
                                                    backgroundColor: sectionproperties.image_bgcolor,
                                                }}
                                            >
                                                <ImageComponent
                                                    path={item.mainproductimage}
                                                    resizeMode="contain"
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        borderBottomLeftRadius:
                                                            langdetect == 'en'
                                                                ? StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true)
                                                                : StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true),
                                                        borderBottomRightRadius:
                                                            langdetect == 'en'
                                                                ? StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true)
                                                                : StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true),
                                                        borderTopLeftRadius:
                                                            langdetect == 'en'
                                                                ? StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true)
                                                                : StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true),
                                                        borderTopRightRadius:
                                                            langdetect == 'en'
                                                                ? StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true)
                                                                : StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true),
                                                    }}
                                                />
                                            </View>
                                            <View
                                                style={{
                                                    paddingStart: 10,
                                                    flexShrink: 1,
                                                    flexDirection: 'column',
                                                    width: '100%',
                                                    justifyContent: sectionproperties.prodPriceShow == 'Show' ? 'flex-start' : 'center',
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: sectionproperties.prodNameColor,
                                                        textTransform: 'capitalize',
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.prodNameFontSize),
                                                        fontFamily: 'Poppins-Medium',
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    {item.productname}
                                                </Text>
                                                {item.isvariant == 1 && (
                                                    <View>
                                                        {variantoptions.map((variantoptionitem, varitanoptionindex) => {
                                                            return (
                                                                <View style={{ flexDirection: 'row', direction: 'ltr' }}>
                                                                    <Text
                                                                        style={{
                                                                            fontFamily: 'Poppins-Medium',
                                                                            color: sectionproperties.varianttitle_color,
                                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.varianttitle_fontSize),
                                                                            textTransform: 'capitalize',
                                                                            textAlign: 'left',
                                                                            marginEnd: 2,
                                                                        }}
                                                                    >
                                                                        {variantoptionitem.optionname}:
                                                                    </Text>
                                                                    <Text
                                                                        style={{
                                                                            textAlign: 'left',
                                                                            fontFamily: 'Poppins-Medium',
                                                                            color: sectionproperties.varianttext_color,
                                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.varianttext_fontSize),
                                                                        }}
                                                                    >
                                                                        {variantoptionitem.valuename}
                                                                    </Text>
                                                                </View>
                                                            );
                                                        })}
                                                    </View>
                                                )}
                                                {sectionproperties.producttype == 'Product' && (
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text
                                                            style={{
                                                                fontFamily: 'Poppins-Medium',
                                                                color: sectionproperties.prodPriceColor,
                                                                fontSize: StyleParseToIntFuncContext(sectionproperties.prodpriceFontSize),
                                                            }}
                                                        >
                                                            {item.quantity}{' '}
                                                        </Text>
                                                        <Text style={{ fontFamily: 'Poppins-Medium', color: sectionproperties.prodPriceColor }}>x </Text>
                                                        <Text
                                                            style={{
                                                                fontFamily: 'Poppins-Medium',
                                                                color: sectionproperties.prodPriceColor,
                                                                fontSize: StyleParseToIntFuncContext(sectionproperties.prodpriceFontSize),
                                                            }}
                                                        >
                                                            {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''} {item.finalprice}{' '}
                                                            {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                                                        </Text>
                                                    </View>
                                                )}
                                                {sectionproperties.prodPriceShow == 'Show' && (
                                                    <Text
                                                        style={{
                                                            fontFamily:
                                                                sectionproperties.prodPriceFontWeight == 300
                                                                    ? 'Poppins-Thin'
                                                                    : sectionproperties.prodPriceFontWeight == 400
                                                                    ? 'Poppins-Light'
                                                                    : sectionproperties.prodPriceFontWeight == 500
                                                                    ? 'Poppins-Regular'
                                                                    : sectionproperties.prodPriceFontWeight == 600
                                                                    ? 'Poppins-Medium'
                                                                    : sectionproperties.prodPriceFontWeight == 700
                                                                    ? 'Poppins-Semibold'
                                                                    : 'Poppins-Bold',
                                                            textAlign: 'left',
                                                            color: sectionproperties.prodPriceColor,
                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.prodpriceFontSize),
                                                        }}
                                                    >
                                                        {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''} {item.itemtotalprice}{' '}
                                                        {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                                                    </Text>
                                                )}
                                            </View>
                                        </View>
                                        {index != fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex]?.orderitems.length - 1 && (
                                            <View style={{ backgroundColor: '#eee', width: '100%', height: 1, marginTop: 10 }}></View>
                                        )}
                                        {item.productcanrate == 1 && (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    if (item.hasreview == 0) {
                                                        // setopenreviewmodal(true);
                                                        // setopenreviewmodalproductobj(item);
                                                        navigation.navigate('Addreview', {
                                                            itemobj: item,
                                                            reviewpayloadobj: {
                                                                reviewtitle: item.reviewtitle,
                                                                reviewbody: item.reviewbody,
                                                                reviewrate: item.review_rating,
                                                                reviewname: item.review_name,
                                                            },
                                                        });
                                                    } else {
                                                        navigation.navigate('Addreview', {
                                                            itemobj: item,
                                                            reviewpayloadobj: {
                                                                reviewtitle: item.reviewtitle,
                                                                reviewbody: item.reviewbody,
                                                                reviewrate: item.review_rating,
                                                                reviewname: item.review_name,
                                                            },
                                                        });
                                                    }
                                                }}
                                            >
                                                {item.hasreview == 0 && <Text>Rate item</Text>}
                                                {item.hasreview == 1 && <Text style={{ color: 'green' }}>View Rate</Text>}
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                );
                            })}
                        </View>
                        {showdeletebuttonorder() == true && (
                            <TouchableOpacity
                                style={{
                                    marginTop: 10,
                                    justifyContent: 'center',
                                    width: '100%',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    if (orderindex.length != 0) {
                                        // alert(fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex]?.orderid);
                                        DeleteOrderMutationContext.mutate({ orderid: fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex]?.orderid });
                                    }
                                }}
                                disabled={DeleteOrderMutationContext.isLoading}
                            >
                                <Text
                                    style={{
                                        // fontFamily: 'Poppins-Light',
                                        // color: sectionproperties.userinfo_titlecolor,
                                        // fontSize: 12,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.generalbtn_fontsize) == 0 ? 15 : 0,
                                        color: 'red',
                                    }}
                                >
                                    {DeleteOrderMutationContext.isLoading ? 'Loading..' : lang.deleteorder}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    wishlistCard: {
        width: SIZES.width - 160,
        height: 270,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        alignItems: 'center',
        marginEnd: 10,
        marginStart: 10,
        marginBottom: 30,
    },
    wishlistCardImageCont: {
        width: '100%',
        height: 220,
        borderRadius: 10,
        elevation: 1,
        borderColor: COLORS.white,
        borderWidth: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        position: 'relative',
    },
    wishlistCardImage: {
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
});

export default OrderDetails;
