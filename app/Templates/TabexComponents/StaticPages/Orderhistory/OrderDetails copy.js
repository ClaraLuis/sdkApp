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

const OrderDetails = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const queryClient = useQueryClient();
    const { lang, langdetect } = useContext(LanguageContext);
    const { CurrentPageIdContext, StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { routingcountext } = useContext(TemplateRoutingContext);
    const { orderindex, orderid, fetchorderhistoryQueryContext, FetchQueriesEngineContext, setFetchQueriesEngineContext, fetchAuthorizationQueryContext, fetchCustomerStatusContext } =
        useContext(FetchingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [StatePageProperties, setStatePageProperties] = useState({});
    const [statusArr, setstatusArr] = useState([]);
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
        if (!fetchCustomerStatusContext.isFetching == true && fetchCustomerStatusContext.isSuccess == true && fetchCustomerStatusContext?.data?.data?.customer_statusArr.length != 0) {
            var customerStatusTemp = queryClient.getQueryData('FetchCustomerStatus_API');
            if (fetchorderhistoryQueryContext.data.data.ordershistory[orderindex].instorderstatus == null) {
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
    }, [fetchCustomerStatusContext.isSuccess]);
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
                                <View style={[generalstyles.flexRow, generalstyles.allcentered, { marginBottom: 10, width: '100%', position: 'relative', paddingHorizontal: 5, paddingStart: 0 }]}>
                                    <FlatList
                                        horizontal={true}
                                        data={statusArr}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item) => item.id}
                                        renderItem={({ item, index }) => {
                                            if (item.orderstatusname_en == 'In progress' || item.active == 1) {
                                                return (
                                                    <View style={[generalstyles.flexColumn, generalstyles.allcentered, { minWidth: 100, paddingTop: 3 }]}>
                                                        <View>
                                                            {statusArr.length - 1 != index && (
                                                                <View
                                                                    style={{
                                                                        position: 'absolute',
                                                                        top: 7,
                                                                        width: '100%',
                                                                        height: 1,
                                                                        backgroundColor:
                                                                            fetchorderhistoryQueryContext.data.data.ordershistory[orderindex].instorderstatus == null
                                                                                ? 'grey'
                                                                                : fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex].instorderstatus.orderstatusname_en ==
                                                                                  item.orderstatusname_en
                                                                                ? item.statuscolor
                                                                                : 'grey',
                                                                    }}
                                                                />
                                                            )}
                                                            {/* {fetchorderhistoryQueryContext.data.data.ordershistory[orderindex].instorderstatus == null && ( */}
                                                            <View
                                                                style={[
                                                                    generalstyles.allcentered,
                                                                    {
                                                                        width: 20,
                                                                        height: 20,
                                                                        borderRadius: 100,
                                                                        backgroundColor:
                                                                            fetchorderhistoryQueryContext.data.data.ordershistory[orderindex].instorderstatus == null
                                                                                ? 'grey'
                                                                                : fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex].instorderstatus.orderstatusname_en ==
                                                                                  item.orderstatusname_en
                                                                                ? item.statuscolor
                                                                                : 'grey',
                                                                        position: 'absolute',
                                                                        top: -2,
                                                                    },
                                                                ]}
                                                            >
                                                                {fetchorderhistoryQueryContext.data.data.ordershistory[orderindex].instorderstatus != null && (
                                                                    <Feather name="check" size={16} color={'white'} />
                                                                )}
                                                            </View>
                                                            {/* )} */}
                                                        </View>
                                                        <Text
                                                            style={[
                                                                generalstyles.poppinsMedium,
                                                                {
                                                                    fontSize: StyleParseToIntFuncContext(14),
                                                                    alignItems: 'center',
                                                                    marginTop: 25,
                                                                    textTransform: 'capitalize',
                                                                    color:
                                                                        fetchorderhistoryQueryContext.data.data.ordershistory[orderindex].instorderstatus == null
                                                                            ? 'grey'
                                                                            : fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex].instorderstatus.orderstatusname_en ==
                                                                              item.orderstatusname_en
                                                                            ? item.statuscolor
                                                                            : 'grey',
                                                                    paddingStart: 10,
                                                                },
                                                            ]}
                                                        >
                                                            {/* {statusArr[0].orderstatusname_en} */}
                                                            {langdetect == 'en' ? item.orderstatusname_en : item.orderstatusname_ar}
                                                        </Text>
                                                    </View>
                                                    // <View style={[generalstyles.flexColumn, generalstyles.allcentered, { minWidth: 100, paddingTop: 3 }]}>
                                                    //     <View>
                                                    //         {statusArr.length - 1 != index && (
                                                    //             <View
                                                    //                 style={{
                                                    //                     position: 'absolute',
                                                    //                     top: 7,
                                                    //                     width: '100%',
                                                    //                     height: 1,
                                                    //                     backgroundColor:
                                                    //                         item.orderstatusname_en == 'In progress' || item.orderstatusname_en == null
                                                    //                             ? 'orange'
                                                    //                             : fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex].instorderstatus.orderstatusname_en ==
                                                    //                               item.orderstatusname_en
                                                    //                             ? item.statuscolor
                                                    //                             : 'grey',
                                                    //                 }}
                                                    //             />
                                                    //         )}
                                                    //         <View
                                                    //             style={[
                                                    //                 generalstyles.allcentered,
                                                    //                 {
                                                    //                     width: 20,
                                                    //                     height: 20,
                                                    //                     borderRadius: 100,
                                                    //                     backgroundColor:
                                                    //                         item.orderstatusname_en == 'In progress' ||
                                                    //                         fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex].instorderstatus == null
                                                    //                             ? 'orange'
                                                    //                             : fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex]?.instorderstatus?.orderstatusname_en ==
                                                    //                               item.orderstatusname_en
                                                    //                             ? item.statuscolor
                                                    //                             : 'grey',
                                                    //                     position: 'absolute',
                                                    //                     top: -2,
                                                    //                 },
                                                    //             ]}
                                                    //         >
                                                    //             {fetchorderhistoryQueryContext.data.data.ordershistory[orderindex].instorderstatus != null && (
                                                    //                 <Feather name="check" size={16} color={'white'} />
                                                    //             )}
                                                    //         </View>
                                                    //     </View>
                                                    //     <Text
                                                    //         style={[
                                                    //             generalstyles.poppinsMedium,
                                                    //             {
                                                    //                 fontSize: StyleParseToIntFuncContext(14),
                                                    //                 alignItems: 'center',
                                                    //                 marginTop: 25,
                                                    //                 textTransform: 'capitalize',
                                                    //                 color:
                                                    //                     fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex].instorderstatus == null
                                                    //                         ? 'grey'
                                                    //                         : fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex].instorderstatus.orderstatusname_en ==
                                                    //                           item.orderstatusname_en
                                                    //                         ? item.statuscolor
                                                    //                         : 'grey',
                                                    //                 paddingStart: 10,
                                                    //             },
                                                    //         ]}
                                                    //     >
                                                    //         {langdetect == 'en' ? item.orderstatusname_en : item.orderstatusname_ar}
                                                    //     </Text>
                                                    // </View>
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
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.innersection_titlefontsize),
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
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                    }}
                                >
                                    {fetchorderhistoryQueryContext.data.data.ordershistory[orderindex].paymentmethod == 'cod' ? lang.cashondelivery : lang.onlinepayment}
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
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
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
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                    }}
                                >
                                    {langdetect == 'en' ? 'EGP' : ''} {fetchorderhistoryQueryContext.data.data.ordershistory[orderindex].orderitemstotalprice} {langdetect == 'en' ? '' : 'ج.م'}
                                </Text>
                            </View>
                            {fetchorderhistoryQueryContext?.data?.data?.ordershistory[orderindex]?.haspromocode == 1 && (
                                <View style={[generalstyles.flexRow, { marginBottom: 5 }]}>
                                    <View style={{ width: 7, height: 7, borderRadius: 50, backgroundColor: sectionproperties.generaltext_fontColor, opacity: 0.2, marginEnd: 10 }}></View>
                                    <Text style={{ fontFamily: 'Poppins-Medium', color: sectionproperties.prodsalePriceColor, fontSize: sectionproperties.generaltext_fontSize, opacity: 0.8 }}>
                                        {lang.discount}:{' '}
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins-Medium',
                                            color: sectionproperties.prodsalePriceColor,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                        }}
                                    >
                                        {langdetect == 'en' ? 'EGP' : ''} 454 {langdetect == 'en' ? '' : 'ج.م'}
                                    </Text>
                                </View>
                            )}
                            {fetchorderhistoryQueryContext.data.data.ordershistory[orderindex].haspromocode == 1 && (
                                <View style={[generalstyles.flexRow, { marginBottom: 5 }]}>
                                    <View style={{ width: 7, height: 7, borderRadius: 50, backgroundColor: sectionproperties.generaltext_fontColor, opacity: 0.2, marginEnd: 10 }}></View>
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins-Medium',
                                            color: sectionproperties.generaltext_fontColor,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                        }}
                                    >
                                        {subtotalafterdiscount}:{' '}
                                    </Text>
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins-Medium',
                                            color: sectionproperties.text_secondarycolor,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                        }}
                                    >
                                        {langdetect == 'en' ? 'EGP' : ''} {fetchorderhistoryQueryContext.data.data.ordershistory[orderindex].priceafterdiscount} {langdetect == 'en' ? '' : 'ج.م'}
                                    </Text>
                                </View>
                            )}
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
                                    {langdetect == 'en' ? 'EGP' : ''} {fetchorderhistoryQueryContext.data.data.ordershistory[orderindex].zoneprice} {langdetect == 'en' ? '' : 'ج.م'}
                                </Text>
                            </View>
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
                                    {langdetect == 'en' ? 'EGP' : ''} {fetchorderhistoryQueryContext.data.data.ordershistory[orderindex].totalorderprice} {langdetect == 'en' ? '' : 'ج.م'}
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
                                    {fetchorderhistoryQueryContext.data.data.ordershistory[orderindex].country}
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
                                    {fetchorderhistoryQueryContext.data.data.ordershistory[orderindex].state}
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
                                    {fetchorderhistoryQueryContext.data.data.ordershistory[orderindex].address}
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
                            {lang.items}
                        </Text>
                        <View
                            style={{
                                backgroundColor: sectionproperties.backgroundColor,
                            }}
                        >
                            {fetchorderhistoryQueryContext.data.data.ordershistory[orderindex].orderitems.map((item, index) => {
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
                                                <Image
                                                    source={{ uri: urlEndpoint + item.mainproductimage }}
                                                    resizeMode="cover"
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
                                            <View style={{ paddingStart: 10, flexShrink: 1, flexDirection: 'column', width: '100%' }}>
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
                                                        {langdetect == 'en' ? 'EGP' : ''} {item.finalprice} {langdetect == 'en' ? '' : 'ج.م'}
                                                    </Text>
                                                </View>
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
                                                        // fontFamily: 'Poppins-Medium',
                                                        textAlign: 'left',
                                                        color: sectionproperties.prodPriceColor,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.prodpriceFontSize),
                                                    }}
                                                >
                                                    {langdetect == 'en' ? 'EGP' : ''} {item.itemtotalprice} {langdetect == 'en' ? '' : 'ج.م'}
                                                </Text>
                                            </View>
                                        </View>
                                        {index != fetchorderhistoryQueryContext.data.data.ordershistory[orderindex].orderitems.length - 1 && (
                                            <View style={{ backgroundColor: '#eee', width: '100%', height: 1, marginTop: 10 }}></View>
                                        )}
                                    </View>
                                );
                            })}
                        </View>
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
