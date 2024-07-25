import React, { useState, useContext, useEffect, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SIZES, icons, images } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';

const OverallTotalSection = (props) => {
    const { lang, langdetect } = useContext(LanguageContext);
    const { fetchAuthorizationQueryContext } = useContext(FetchingContext);
    const { StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const [fetchProductInfoQuery, setfetchProductInfoQuery] = useState(props.actions.fetchProductInfoQuery);
    const sectionproperties = props.actions.sectionproperties;
    const getprice_discountpriceprops = props.actions.getprice_discountpriceprops;
    const variantindexcompleted = props.actions.variantindexcompleted;

    return (
        <View style={[generalstyles.flexRow, { flex: 1 }]}>
            {fetchProductInfoQuery.data.data.productinfo.hasvariants == 1 && variantindexcompleted.length == 0 && (
                <View style={[generalstyles.flexColumn]}>
                    <View style={[generalstyles.flexRow]}>
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
                                        : sectionproperties.total_texttransform == 'None'
                                        ? 'none'
                                        : 'lowercase',
                            }}
                        >
                            {lang.total}:{' '}
                        </Text>
                        <Text
                            style={{
                                fontSize: StyleParseToIntFuncContext(sectionproperties.prodpriceFontSize),
                                color: sectionproperties.prodPriceColor,
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
                            }}
                        >
                            {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''}{' '}
                            {fetchProductInfoQuery.data.data.productinfo.hassale == 0
                                ? parseFloat(getprice_discountpriceprops('defaultprice', 1, variantindexcompleted).toFixed(2))
                                : parseFloat(getprice_discountpriceprops('defaultsaleprice', 1, variantindexcompleted).toFixed(2))}{' '}
                            {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                        </Text>
                    </View>
                    {fetchProductInfoQuery.data.data.productinfo.hassale == 1 && (
                        <View style={[generalstyles.flexRow]}>
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
                                            : sectionproperties.total_texttransform == 'None'
                                            ? 'none'
                                            : 'lowercase',
                                }}
                            >
                                {langdetect == 'en' ? 'Was' : 'قبل'}:{' '}
                            </Text>
                            <Text
                                style={{
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.prodsalepriceFontSize),
                                    color: sectionproperties.prodsalePriceColor,
                                    fontFamily:
                                        sectionproperties.prodsalePriceFontWeight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.prodsalePriceFontWeight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.prodsalePriceFontWeight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.prodsalePriceFontWeight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.prodsalePriceFontWeight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                    textAlign: 'left',
                                    textDecorationLine: 'line-through',
                                    textDecorationStyle: 'solid',
                                }}
                            >
                                {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''} {parseFloat(getprice_discountpriceprops('defaultprice', 1, variantindexcompleted))}{' '}
                                {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                            </Text>
                        </View>
                    )}
                </View>
            )}
            {fetchProductInfoQuery.data.data.productinfo.hasvariants == 1 && variantindexcompleted.length != 0 && (
                <View style={[generalstyles.flexColumn]}>
                    <View style={[generalstyles.flexRow]}>
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
                                        : sectionproperties.total_texttransform == 'None'
                                        ? 'none'
                                        : 'lowercase',
                            }}
                        >
                            {lang.total}:{' '}
                        </Text>
                        <Text
                            style={{
                                fontSize: StyleParseToIntFuncContext(sectionproperties.prodpriceFontSize),
                                color: sectionproperties.prodPriceColor,
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
                            }}
                        >
                            {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''}{' '}
                            {fetchProductInfoQuery.data.data.productinfo.variants[variantindexcompleted].hassale == 1
                                ? parseFloat(getprice_discountpriceprops('defaultsaleprice', 1, variantindexcompleted))
                                : parseFloat(getprice_discountpriceprops('defaultprice', 1, variantindexcompleted))}{' '}
                            {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                        </Text>
                    </View>
                    {fetchProductInfoQuery.data.data.productinfo.variants[variantindexcompleted].hassale == 1 && (
                        <View style={[generalstyles.flexRow]}>
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
                                            : sectionproperties.total_texttransform == 'None'
                                            ? 'none'
                                            : 'lowercase',
                                }}
                            >
                                {langdetect == 'en' ? 'Was' : 'قبل'}:{' '}
                            </Text>
                            <Text
                                style={{
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.prodsalepriceFontSize),
                                    color: sectionproperties.prodsalePriceColor,
                                    fontFamily:
                                        sectionproperties.prodsalePriceFontWeight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.prodsalePriceFontWeight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.prodsalePriceFontWeight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.prodsalePriceFontWeight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.prodsalePriceFontWeight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                    textAlign: 'left',
                                    textDecorationLine: 'line-through',
                                    textDecorationStyle: 'solid',
                                }}
                            >
                                {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''} {parseFloat(getprice_discountpriceprops('defaultprice', 1, variantindexcompleted))}{' '}
                                {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                            </Text>
                        </View>
                    )}
                </View>
            )}
            {fetchProductInfoQuery.data.data.productinfo.hasvariants == 0 && (
                <View style={[generalstyles.flexColumn]}>
                    <View style={[generalstyles.flexRow]}>
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
                                        : sectionproperties.total_texttransform == 'None'
                                        ? 'none'
                                        : 'lowercase',
                            }}
                        >
                            {lang.total}:{' '}
                        </Text>
                        <Text
                            style={{
                                fontSize: StyleParseToIntFuncContext(sectionproperties.prodpriceFontSize),
                                color: sectionproperties.prodPriceColor,
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
                            }}
                        >
                            {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''}{' '}
                            {fetchProductInfoQuery.data.data.productinfo.hassale == 0
                                ? parseFloat(getprice_discountpriceprops('defaultprice', 1, variantindexcompleted))
                                : parseFloat(getprice_discountpriceprops('defaultsaleprice', 1, variantindexcompleted))}{' '}
                            {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                        </Text>
                    </View>
                    {fetchProductInfoQuery.data.data.productinfo.hassale == 1 && (
                        <View style={[generalstyles.flexRow]}>
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
                                            : sectionproperties.total_texttransform == 'None'
                                            ? 'none'
                                            : 'lowercase',
                                }}
                            >
                                {langdetect == 'en' ? 'Was' : 'قبل'}:{' '}
                            </Text>
                            <Text
                                style={{
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.prodsalepriceFontSize),
                                    color: sectionproperties.prodsalePriceColor,
                                    fontFamily:
                                        sectionproperties.prodsalePriceFontWeight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.prodsalePriceFontWeight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.prodsalePriceFontWeight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.prodsalePriceFontWeight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.prodsalePriceFontWeight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                    textAlign: 'left',
                                    textDecorationLine: 'line-through',
                                    textDecorationStyle: 'solid',
                                }}
                            >
                                {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''} {parseFloat(getprice_discountpriceprops('defaultprice', 1, variantindexcompleted))}{' '}
                                {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                            </Text>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

export default OverallTotalSection;

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
