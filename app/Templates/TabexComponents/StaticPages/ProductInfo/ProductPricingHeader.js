import React, { useState, useContext, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Image, Linking, Share, Platform, Modal, FlatList } from 'react-native';
import { SIZES, icons, images } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { MaterialCommunityIcons, SimpleLineIcons, Feather, AntDesign, FontAwesome5 } from 'react-native-vector-icons';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import RenderHtml from 'react-native-render-html';
import SpinnerButton from 'react-native-spinner-button';
import { useSelector } from 'react-redux';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { useQueryClient } from 'react-query';
import { urlEndpoint } from '../../../../config/imagekit';
import { useNavigation } from '@react-navigation/native';

const ProductPricingHeader = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const queryClient = useQueryClient();
    const { lang, langdetect } = useContext(LanguageContext);
    const { showUpTopNotificationBarContext, fetchAuthorizationQueryContext, ProductInfoIdContext } = useContext(FetchingContext);
    const { StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    // const [sectionproperties, setsectionproperties] = useState('');
    const [IsFavItemProps, setIsFavItemProps] = useState(props.actions.IsFavItemProps);
    const [fetchProductInfoQuery, setfetchProductInfoQuery] = useState(props.actions.fetchProductInfoQuery);
    // const [addtocardpayloadobj, setaddtocardpayloadobj] = useState(props.actions.addtocardpayloadobj);
    const StatePageProperties = props.actions.StatePageProperties;
    const sectionproperties = props.actions.sectionproperties;
    const addtocardpayloadobj = props.actions.addtocardpayloadobj;
    const setaddtocardpayloadobj = props.actions.setaddtocardpayloadobj;

    const getprice_discountpriceprops = props.actions.getprice_discountpriceprops;
    const quantityconditionfoundobjprops = props.actions.quantityconditionfoundobjprops;

    const variantchecker = props.actions.variantchecker;
    const variantindexcompleted = props.actions.variantindexcompleted;

    const [showMoredesc, setShowMoredesc] = useState(false);
    const [indexSelected, setIndexSelected] = useState(0);
    const [defaultpricing, setdefaultpricing] = useState('');

    useEffect(() => {
        if (!fetchProductInfoQuery.isFetching && fetchProductInfoQuery.isSuccess) {
            if (fetchProductInfoQuery.data.data.productinfo != null) {
                variantchecker();
                var tempaddtocardpayloadobj = { ...addtocardpayloadobj };
                tempaddtocardpayloadobj.productid = fetchProductInfoQuery.data.data.productinfo.productid;
                setaddtocardpayloadobj({ ...tempaddtocardpayloadobj });
            }
        }
    }, [fetchProductInfoQuery.isSuccess, fetchProductInfoQuery.data]);

    useEffect(() => {
        var price = '';
        if (variantindexcompleted.length == 0 && fetchProductInfoQuery.data.data.productinfo.hassale == 0) {
            price = getprice_discountpriceprops('defaultprice', 0, variantindexcompleted);
        } else if (variantindexcompleted.length == 0 && fetchProductInfoQuery.data.data.productinfo.hassale == 1) {
            price = getprice_discountpriceprops('defaultsaleprice', 0, variantindexcompleted);
        } else if (variantindexcompleted.length != 0 && fetchProductInfoQuery?.data?.data?.productinfo?.variants[variantindexcompleted]?.hassale == 1) {
            price = getprice_discountpriceprops('defaultsaleprice', 0, variantindexcompleted);
        } else {
            price = getprice_discountpriceprops('defaultprice', 0, variantindexcompleted);
        }
        setdefaultpricing(price);
        // }, [variantindexcompleted, fetchProductInfoQuery.data.data.productinfo.productid, ProductInfoIdContext]);
    }, [variantindexcompleted, props]);
    const SaleCounterPill = () => {
        return (
            <View style={[generalstyles.flexRow]}>
                <Text
                    style={{
                        fontSize: StyleParseToIntFuncContext(sectionproperties.counterTitleFontSize),
                        color: sectionproperties.counterTitleColor,
                        fontFamily:
                            sectionproperties.counterTitleFontWeight == 300
                                ? 'Poppins-Thin'
                                : sectionproperties.counterTitleFontWeight == 400
                                ? 'Poppins-Light'
                                : sectionproperties.counterTitleFontWeight == 500
                                ? 'Poppins-Regular'
                                : sectionproperties.counterTitleFontWeight == 600
                                ? 'Poppins-Medium'
                                : sectionproperties.counterTitleFontWeight == 700
                                ? 'Poppins-Semibold'
                                : 'Poppins-Bold',
                    }}
                >
                    {langdetect == 'en' ? sectionproperties.countertitleen : sectionproperties.countertitlear}
                </Text>
                <Text
                    style={{
                        marginStart: 5,
                        fontSize: StyleParseToIntFuncContext(sectionproperties.counterValueFontSize),
                        color: sectionproperties.counterValueColor,
                        fontFamily:
                            sectionproperties.counterValueFontWeight == 300
                                ? 'Poppins-Thin'
                                : sectionproperties.counterValueFontWeight == 400
                                ? 'Poppins-Light'
                                : sectionproperties.counterValueFontWeight == 500
                                ? 'Poppins-Regular'
                                : sectionproperties.counterValueFontWeight == 600
                                ? 'Poppins-Medium'
                                : sectionproperties.counterValueFontWeight == 700
                                ? 'Poppins-Semibold'
                                : 'Poppins-Bold',
                    }}
                >
                    {Math.ceil(parseFloat(getprice_discountpriceprops('defaultprice', 0, variantindexcompleted) - getprice_discountpriceprops('defaultsaleprice', 0, variantindexcompleted)))}{' '}
                    {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                </Text>

                <View
                    style={{
                        marginHorizontal: 10,
                        paddingHorizontal: 5,
                        backgroundColor: sectionproperties.pillbgcolor,
                        borderRadius: StyleParseToIntFuncContext(sectionproperties.pillborderBottomLeftRadius),
                        borderWidth: StyleParseToIntFuncContext(sectionproperties.pillBorderWidth),
                        borderColor: sectionproperties.pillBorderColor,
                        direction: 'ltr',
                    }}
                >
                    <Text
                        style={{
                            color: sectionproperties.pillcolor,
                            fontWeight: sectionproperties.pillfontWeight,
                            fontSize: 13,
                            lineHeight: 25,
                        }}
                    >
                        {'-' +
                            Math.floor(
                                Math.round(
                                    10.0 *
                                        ((parseFloat(getprice_discountpriceprops('defaultprice', 0, variantindexcompleted)) -
                                            parseFloat(getprice_discountpriceprops('defaultsaleprice', 0, variantindexcompleted))) /
                                            parseFloat(getprice_discountpriceprops('defaultprice', 0, variantindexcompleted))) *
                                        100,
                                ) / 10.0,
                            ) +
                            '%'}
                    </Text>
                </View>
            </View>
        );
    };
    return (
        <>
            {sectionproperties.showDefaultPricingSection == 'Show' && (
                <View style={[generalstyles.flexRow, { marginTop: 5 }]}>
                    <Text
                        style={{
                            color: sectionproperties.defaultPriceColor,
                            fontSize: StyleParseToIntFuncContext(sectionproperties.defaultPriceFontSize),
                            fontFamily:
                                sectionproperties.defaultPriceFontWeight == 300
                                    ? 'Poppins-Thin'
                                    : sectionproperties.defaultPriceFontWeight == 400
                                    ? 'Poppins-Light'
                                    : sectionproperties.defaultPriceFontWeight == 500
                                    ? 'Poppins-Regular'
                                    : sectionproperties.defaultPriceFontWeight == 600
                                    ? 'Poppins-Medium'
                                    : sectionproperties.defaultPriceFontWeight == 700
                                    ? 'Poppins-Semibold'
                                    : 'Poppins-Bold',
                            textAlign: 'left',
                        }}
                    >
                        {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''} {defaultpricing}
                        {/* {fetchProductInfoQuery.data.data.productinfo.hassale == 0
                            ? getprice_discountpriceprops('defaultprice', 0, variantindexcompleted)
                            : getprice_discountpriceprops('defaultsaleprice', 0, variantindexcompleted)}{' '} */}
                        {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                    </Text>
                    {fetchProductInfoQuery.data.data.productinfo.hassale == 1 && variantindexcompleted.length == 0 && (
                        <Text
                            style={{
                                marginHorizontal: 5,
                                color: sectionproperties.defaultSalePriceColor,
                                fontSize: StyleParseToIntFuncContext(sectionproperties.defaultSalePriceFontSize),
                                fontFamily:
                                    sectionproperties.defaultSalePriceFontWeight == 300
                                        ? 'Poppins-Thin'
                                        : sectionproperties.defaultSalePriceFontWeight == 400
                                        ? 'Poppins-Light'
                                        : sectionproperties.defaultSalePriceFontWeight == 500
                                        ? 'Poppins-Regular'
                                        : sectionproperties.defaultSalePriceFontWeight == 600
                                        ? 'Poppins-Medium'
                                        : sectionproperties.defaultSalePriceFontWeight == 700
                                        ? 'Poppins-Semibold'
                                        : 'Poppins-Bold',
                                textAlign: 'left',
                                textDecorationLine: 'line-through',
                                textDecorationStyle: 'solid',
                            }}
                        >
                            {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''} {getprice_discountpriceprops('defaultprice', 0, variantindexcompleted)}{' '}
                            {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                        </Text>
                    )}
                    {fetchProductInfoQuery.data.data.productinfo.hasvariants == 1 &&
                        variantindexcompleted != undefined &&
                        fetchProductInfoQuery?.data?.data?.productinfo?.variants[variantindexcompleted]?.hassale == 1 && (
                            <Text
                                style={{
                                    marginHorizontal: 5,
                                    color: sectionproperties.defaultSalePriceColor,
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.defaultSalePriceFontSize),
                                    fontFamily:
                                        sectionproperties.defaultSalePriceFontWeight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.defaultSalePriceFontWeight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.defaultSalePriceFontWeight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.defaultSalePriceFontWeight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.defaultSalePriceFontWeight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                    textAlign: 'left',
                                    textDecorationLine: 'line-through',
                                    textDecorationStyle: 'solid',
                                }}
                            >
                                {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''} {getprice_discountpriceprops('defaultprice', 0, variantindexcompleted)}{' '}
                                {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                            </Text>
                        )}
                </View>
            )}
            {quantityconditionfoundobjprops != null && (
                <View
                    style={[
                        generalstyles.allcentered,
                        {
                            marginVertical: 10,
                            padding: 10,
                            backgroundColor: sectionproperties.pillbgcolor,
                            borderRadius: StyleParseToIntFuncContext(sectionproperties.pillborderBottomLeftRadius),
                            borderWidth: StyleParseToIntFuncContext(sectionproperties.pillBorderWidth),
                            borderColor: sectionproperties.pillBorderColor,
                            direction: 'ltr',
                        },
                    ]}
                >
                    {quantityconditionfoundobjprops?.type == 'subtract' && (
                        <Text style={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                            {langdetect == 'en' ? 'You have earned extra' : 'لقد حصلت على خصم'}{' '}
                            <Text
                                style={{
                                    fontSize: 15,
                                }}
                            >
                                {quantityconditionfoundobjprops?.value}%
                            </Text>{' '}
                            {langdetect == 'en' ? 'Off' : 'اكتر'}
                        </Text>
                    )}
                    {quantityconditionfoundobjprops?.type == 'add' && (
                        <Text style={{ fontSize: 14, fontFamily: 'Poppins-Medium' }}>
                            {langdetect == 'en' ? 'You will pay extra' : 'هتدفع'}{' '}
                            <Text
                                style={{
                                    fontFamily: 'Poppins-Bold',
                                    fontSize: 16,
                                }}
                            >
                                {quantityconditionfoundobjprops?.value}%
                            </Text>{' '}
                            {langdetect == 'en' ? '' : 'اكتر'}
                        </Text>
                    )}
                </View>
            )}
            {sectionproperties.showpill == 'Show' && fetchProductInfoQuery.data.data.productinfo.hassale == 1 && variantindexcompleted.length == 0 && (
                <View style={[generalstyles.flexRow, { marginTop: 3 }]}>{SaleCounterPill()}</View>
            )}
            {fetchProductInfoQuery.data.data.productinfo.hasvariants == 1 &&
                variantindexcompleted != undefined &&
                fetchProductInfoQuery?.data?.data?.productinfo?.variants[variantindexcompleted]?.hassale == 1 && <View style={[generalstyles.flexRow, { marginTop: 3 }]}>{SaleCounterPill()}</View>}
        </>
    );
};

export default ProductPricingHeader;

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        // borderRadius: 20,
        // padding: 35,
        width: SIZES.width,
        height: SIZES.height - 80,
    },
});
