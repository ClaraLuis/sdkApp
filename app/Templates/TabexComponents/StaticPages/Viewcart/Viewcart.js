import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, SafeAreaView, FlatList, Platform } from 'react-native';
import { SIZES, COLORS, images, icons } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { AntDesign, SimpleLineIcons, Feather, FontAwesome5, MaterialCommunityIcons } from 'react-native-vector-icons';
// import Feather from 'react-native-vector-icons/Feather';
import { urlEndpoint } from '../../../../config/imagekit';
import { useQueryClient } from 'react-query';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import SpinnerButton from 'react-native-spinner-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ImageComponent } from '../../../ImageComponent';

const Viewcart = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    // const { routingtemp } = React.useContext(TemplateRoutingContext);
    const navigation = useNavigation();
    const queryClient = useQueryClient();
    const { lang, langdetect } = useContext(LanguageContext);
    const { ProjectOpenrcTypeContext, StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const {
        fetchAuthorizationQueryContext,
        fetchcustomercartQueryContext,
        ChangeCartItemQuantityContext,
        ApplyPromoCodeMutationContext,
        deletecartitemContext,
        AddtoCartMutationContext,
        showUpTopNotificationBarContext,
    } = useContext(FetchingContext);
    const { routingcountext, StaticPagesLinksContext, routingtemp } = useContext(TemplateRoutingContext);
    const [sectionproperties, setsectionproperties] = useState('');

    const [StatePageProperties, setStatePageProperties] = useState({});
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
    return (
        <View
            style={[
                generalstyles.container,
                {
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingTop: 0,
                    height: '100%',
                    backgroundColor: sectionproperties.sectionbgcolor != null ? sectionproperties.sectionbgcolor : '',
                },
            ]}
        >
            <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false} style={{ height: '100%' }}>
                {Object.keys(sectionproperties).length != 0 && (
                    <SafeAreaView>
                        <TouchableOpacity
                            style={[
                                generalstyles.flexRow,
                                generalstyles.containerInner,
                                {
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
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

                                    marginEnd: 5,
                                }}
                            >
                                {langdetect == 'en' ? sectionproperties.sectionTitleContent : sectionproperties.sectionTitleContent_ar}:{/* {lang.mycart}: */}
                            </Text>
                            <View
                                style={{
                                    marginTop: 'auto',
                                    marginBottom: 'auto',
                                    width: 20,
                                    height: 20,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: sectionproperties.badge_bgcolor,
                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.badge_borderradius),
                                }}
                            >
                                <Text
                                    style={{
                                        paddingTop: Platform.OS == 'ios' ? 0 : 1,
                                        paddingStart: Platform.OS == 'ios' ? (langdetect == 'en' ? 1 : 0) : 0,
                                        paddingEnd: Platform.OS == 'ios' ? (langdetect == 'en' ? 0 : 1) : 0,
                                        fontFamily: 'Poppins-Medium',
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.badge_fontsize),
                                        color: sectionproperties.badge_color,
                                    }}
                                >
                                    {fetchcustomercartQueryContext?.data?.data?.customercart?.cartitems_count_withquantity}
                                    {/* {fetchcustomercartQueryContext?.data?.data?.customercart?.cartitems?.length} */}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {fetchcustomercartQueryContext?.data?.data?.customercart?.cartitems?.length != 0 && (
                            <View>
                                <View style={[generalstyles.containerInner]}>
                                    {fetchcustomercartQueryContext?.data?.data?.customercart?.cartitems.map((item, index) => {
                                        if (item.product_extrafields != null) {
                                            var product_extrafields = JSON.parse(item.product_extrafields);
                                            // var product_extrafields_parsed = JSON.stringify(product_extrafields);
                                            // alert(product_extrafields_parsed);
                                        }
                                        return (
                                            <View
                                                style={[
                                                    generalstyles.allcentered,
                                                    {
                                                        marginBottom: 15,
                                                        paddingVertical: StyleParseToIntFuncContext(sectionproperties.innersectionpaddingvertical),
                                                        paddingHorizontal: StyleParseToIntFuncContext(sectionproperties.innersectionpaddinghorizontal),
                                                        backgroundColor: sectionproperties.reservation_bgcolor,
                                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.reservation_borderradius, '', true),
                                                    },
                                                ]}
                                            >
                                                <View style={[generalstyles.flexRow, { marginBottom: 5 }]}>
                                                    <View
                                                        style={[
                                                            {
                                                                width: 80,
                                                                height: 80,
                                                                marginEnd: 10,
                                                                borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true),
                                                                borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true),
                                                                borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true),
                                                                borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true),
                                                                borderColor: sectionproperties.image_bordercolor,
                                                                borderWidth: StyleParseToIntFuncContext(sectionproperties.image_borderWidth, '', true),
                                                                marginBottom: 'auto',
                                                            },
                                                        ]}
                                                    >
                                                        <ImageComponent
                                                            path={
                                                                item.productinfo.hasvariants == 0
                                                                    ? '/tr:w-' + sectionproperties.imagetr_w + ',h-' + sectionproperties.imagetr_h + '/' + item.productinfo.productmainimage
                                                                    : '/tr:w-' + sectionproperties.imagetr_w + ',h-' + sectionproperties.imagetr_h + '/' + item.productinfo.variantinfo.variantimageurl
                                                            }
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true),
                                                                borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true),
                                                                borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true),
                                                                borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true),
                                                            }}
                                                            resizeMode="contain"
                                                        />
                                                    </View>
                                                    <View
                                                        style={{
                                                            display: 'flex',
                                                            flex: 1,
                                                            marginBottom: 'auto',
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                textAlign: 'left',
                                                                marginBottom: 2,
                                                                color: sectionproperties.prodNameColor,
                                                                fontSize: StyleParseToIntFuncContext(sectionproperties.prodNameFontSize),
                                                                fontFamily:
                                                                    sectionproperties.prodNameFontWeight == 300
                                                                        ? 'Poppins-Thin'
                                                                        : sectionproperties.prodNameFontWeight == 400
                                                                        ? 'Poppins-Light'
                                                                        : sectionproperties.prodNameFontWeight == 500
                                                                        ? 'Poppins-Regular'
                                                                        : sectionproperties.prodNameFontWeight == 600
                                                                        ? 'Poppins-Medium'
                                                                        : sectionproperties.prodNameFontWeight == 700
                                                                        ? 'Poppins-Semibold'
                                                                        : 'Poppins-Bold',

                                                                textTransform:
                                                                    sectionproperties.prodNameTextTranform == 'Uppercase'
                                                                        ? 'uppercase'
                                                                        : sectionproperties.prodNameTextTranform == 'Capitalize'
                                                                        ? 'capitalize'
                                                                        : 'lowercase',
                                                            }}
                                                        >
                                                            {langdetect == 'en' ? item.productinfo.name_en : item.productinfo.name_ar}
                                                        </Text>
                                                        {item?.productinfo?.item_type == 'service' && (
                                                            <View style={[generalstyles.flexColumn]}>
                                                                <View style={[generalstyles.flexRow]}>
                                                                    <AntDesign
                                                                        name="calendar"
                                                                        style={{
                                                                            color: COLORS.darkgray,
                                                                        }}
                                                                    />
                                                                    <Text
                                                                        style={[
                                                                            generalstyles.poppinsMedium,
                                                                            {
                                                                                color: COLORS.darkgray,
                                                                                marginStart: 5,
                                                                                fontSize: 13,
                                                                            },
                                                                        ]}
                                                                    >
                                                                        {item.reserv_fixeddate}
                                                                    </Text>
                                                                </View>
                                                                <View style={[generalstyles.flexRow]}>
                                                                    <AntDesign
                                                                        name="clockcircleo"
                                                                        style={{
                                                                            color: COLORS.darkgray,
                                                                        }}
                                                                    />
                                                                    <Text
                                                                        style={[
                                                                            generalstyles.poppinsMedium,
                                                                            {
                                                                                color: COLORS.darkgray,
                                                                                marginStart: 5,
                                                                                fontSize: 13,
                                                                            },
                                                                        ]}
                                                                    >
                                                                        {item.reserv_time}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        )}

                                                        {item.productinfo.hasvariants == 1 &&
                                                            item.productinfo.variantinfo.variantoptions.map((variantitem, variantindex) => {
                                                                return (
                                                                    // direction: 'ltr'
                                                                    <View style={{ flexDirection: 'row' }}>
                                                                        <Text
                                                                            style={{
                                                                                fontFamily:
                                                                                    sectionproperties.varianttitle_fontweight == 300
                                                                                        ? 'Poppins-Thin'
                                                                                        : sectionproperties.varianttitle_fontweight == 400
                                                                                        ? 'Poppins-Light'
                                                                                        : sectionproperties.varianttitle_fontweight == 500
                                                                                        ? 'Poppins-Regular'
                                                                                        : sectionproperties.varianttitle_fontweight == 600
                                                                                        ? 'Poppins-Medium'
                                                                                        : sectionproperties.varianttitle_fontweight == 700
                                                                                        ? 'Poppins-Semibold'
                                                                                        : 'Poppins-Bold',

                                                                                textTransform:
                                                                                    sectionproperties.varianttitle_texttransform == 'Uppercase'
                                                                                        ? 'uppercase'
                                                                                        : sectionproperties.varianttitle_texttransform == 'Capitalize'
                                                                                        ? 'capitalize'
                                                                                        : 'lowercase',
                                                                                color: sectionproperties.varianttitle_color,
                                                                                fontSize: StyleParseToIntFuncContext(sectionproperties.varianttitle_fontSize),
                                                                                textAlign: 'left',
                                                                                marginEnd: 5,
                                                                                // direction: 'ltr',
                                                                                display:
                                                                                    variantitem.optionname == 'Color' ||
                                                                                    variantitem.optionname == 'Colour' ||
                                                                                    variantitem.optionname == 'color' ||
                                                                                    variantitem.optionname == 'colour'
                                                                                        ? 'none'
                                                                                        : 'flex',
                                                                            }}
                                                                        >
                                                                            {/* {langdetect == 'en' ? variantitem.optionname : variantitem.optionname_ar}: */}
                                                                            {langdetect == 'ar' ? ':' : ''}
                                                                            {variantitem.optionname}
                                                                            {langdetect == 'en' ? ':' : ''}
                                                                        </Text>

                                                                        <Text
                                                                            style={{
                                                                                textAlign: 'left',
                                                                                fontFamily:
                                                                                    sectionproperties.varianttext_fontweight == 300
                                                                                        ? 'Poppins-Thin'
                                                                                        : sectionproperties.varianttext_fontweight == 400
                                                                                        ? 'Poppins-Light'
                                                                                        : sectionproperties.varianttext_fontweight == 500
                                                                                        ? 'Poppins-Regular'
                                                                                        : sectionproperties.varianttext_fontweight == 600
                                                                                        ? 'Poppins-Medium'
                                                                                        : sectionproperties.varianttext_fontweight == 700
                                                                                        ? 'Poppins-Semibold'
                                                                                        : 'Poppins-Bold',

                                                                                color: sectionproperties.varianttext_color,
                                                                                fontSize: StyleParseToIntFuncContext(sectionproperties.varianttext_fontSize),
                                                                                display:
                                                                                    variantitem.optionname == 'Color' ||
                                                                                    variantitem.optionname == 'Colour' ||
                                                                                    variantitem.optionname == 'color' ||
                                                                                    variantitem.optionname == 'colour'
                                                                                        ? 'none'
                                                                                        : 'flex',
                                                                            }}
                                                                        >
                                                                            {variantitem.optionvalue}
                                                                        </Text>
                                                                        <View
                                                                            style={{
                                                                                width: 20,
                                                                                height: 20,
                                                                                borderRadius: 100,
                                                                                backgroundColor: variantitem.optionvalue,
                                                                                display:
                                                                                    variantitem.optionname == 'Color' ||
                                                                                    variantitem.optionname == 'Colour' ||
                                                                                    variantitem.optionname == 'color' ||
                                                                                    variantitem.optionname == 'colour'
                                                                                        ? 'flex'
                                                                                        : 'none',
                                                                            }}
                                                                        ></View>
                                                                    </View>
                                                                );
                                                            })}
                                                        {item.product_extrafields != null && (
                                                            <View>
                                                                {product_extrafields.map((extrafielditem, extrafieldindex) => {
                                                                    return (
                                                                        <View style={{ flexDirection: 'row' }}>
                                                                            <Text
                                                                                style={{
                                                                                    fontFamily:
                                                                                        sectionproperties.varianttitle_fontweight == 300
                                                                                            ? 'Poppins-Thin'
                                                                                            : sectionproperties.varianttitle_fontweight == 400
                                                                                            ? 'Poppins-Light'
                                                                                            : sectionproperties.varianttitle_fontweight == 500
                                                                                            ? 'Poppins-Regular'
                                                                                            : sectionproperties.varianttitle_fontweight == 600
                                                                                            ? 'Poppins-Medium'
                                                                                            : sectionproperties.varianttitle_fontweight == 700
                                                                                            ? 'Poppins-Semibold'
                                                                                            : 'Poppins-Bold',

                                                                                    textTransform:
                                                                                        sectionproperties.varianttitle_texttransform == 'Uppercase'
                                                                                            ? 'uppercase'
                                                                                            : sectionproperties.varianttitle_texttransform == 'Capitalize'
                                                                                            ? 'capitalize'
                                                                                            : 'lowercase',
                                                                                    color: sectionproperties.varianttitle_color,
                                                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.varianttitle_fontSize),
                                                                                    textAlign: 'left',
                                                                                    marginEnd: 5,
                                                                                }}
                                                                            >
                                                                                {langdetect == 'en' ? extrafielditem.title_en : extrafielditem.title_ar}:{' '}
                                                                            </Text>
                                                                            <Text
                                                                                style={{
                                                                                    textAlign: 'left',
                                                                                    fontFamily:
                                                                                        sectionproperties.varianttext_fontweight == 300
                                                                                            ? 'Poppins-Thin'
                                                                                            : sectionproperties.varianttext_fontweight == 400
                                                                                            ? 'Poppins-Light'
                                                                                            : sectionproperties.varianttext_fontweight == 500
                                                                                            ? 'Poppins-Regular'
                                                                                            : sectionproperties.varianttext_fontweight == 600
                                                                                            ? 'Poppins-Medium'
                                                                                            : sectionproperties.varianttext_fontweight == 700
                                                                                            ? 'Poppins-Semibold'
                                                                                            : 'Poppins-Bold',

                                                                                    color: sectionproperties.varianttext_color,
                                                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.varianttext_fontSize),
                                                                                }}
                                                                            >
                                                                                {extrafielditem.value}
                                                                            </Text>
                                                                        </View>
                                                                    );
                                                                })}
                                                            </View>
                                                        )}
                                                        {item.productinfo.hasvariants == 0 && sectionproperties.prodPriceshow == 'Show' && (
                                                            <View>
                                                                {item.productinfo.hassale == 0 && (
                                                                    <Text
                                                                        style={{
                                                                            textAlign: 'left',
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

                                                                            color: sectionproperties.prodPriceColor,
                                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.prodpriceFontSize),
                                                                        }}
                                                                    >
                                                                        {item.quantity} x {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : ''} {item.finalprice}{' '}
                                                                        {langdetect == 'en' ? '' : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                                                    </Text>
                                                                )}
                                                                {item.productinfo.hassale == 1 && (
                                                                    <View style={[generalstyles.flexRow]}>
                                                                        <Text
                                                                            style={{
                                                                                textAlign: 'left',
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

                                                                                color: sectionproperties.prodPriceColor,
                                                                                fontSize: StyleParseToIntFuncContext(sectionproperties.prodpriceFontSize),
                                                                            }}
                                                                        >
                                                                            {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : ''} {item.finalprice}{' '}
                                                                            {langdetect == 'en' ? '' : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                                                        </Text>
                                                                        <Text
                                                                            style={{
                                                                                textAlign: 'left',
                                                                                textDecorationLine: 'line-through',
                                                                                textDecorationStyle: 'solid',
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

                                                                                color: sectionproperties.prodsalePriceColor,
                                                                            }}
                                                                        >
                                                                            {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : ''} {item.productinfo.defaultprice}{' '}
                                                                            {langdetect == 'en' ? '' : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                                                        </Text>
                                                                    </View>
                                                                )}
                                                            </View>
                                                        )}
                                                        {item.productinfo.hasvariants == 1 && sectionproperties.prodPriceshow == 'Show' && (
                                                            <View>
                                                                {item.productinfo.variantinfo.hassale == 0 && (
                                                                    <Text
                                                                        style={{
                                                                            textAlign: 'left',
                                                                            fontFamily: 'Poppins-Medium',
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

                                                                            color: sectionproperties.prodPriceColor,
                                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.prodpriceFontSize),
                                                                        }}
                                                                    >
                                                                        {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : ''}{' '}
                                                                        {item.productinfo.variantinfo.variantprice}{' '}
                                                                        {langdetect == 'en' ? '' : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                                                    </Text>
                                                                )}
                                                                {item.productinfo.variantinfo.hassale == 1 && (
                                                                    <View style={[generalstyles.flexRow]}>
                                                                        <Text
                                                                            style={{
                                                                                textAlign: 'left',
                                                                                fontFamily: 'Poppins-Medium',
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

                                                                                color: sectionproperties.prodPriceColor,
                                                                                fontSize: StyleParseToIntFuncContext(sectionproperties.prodpriceFontSize),
                                                                            }}
                                                                        >
                                                                            {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : ''}{' '}
                                                                            {item.productinfo.variantinfo.variantsaleprice}{' '}
                                                                            {langdetect == 'en' ? '' : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                                                        </Text>
                                                                        <Text
                                                                            style={{
                                                                                textAlign: 'left',
                                                                                textDecorationLine: 'line-through',
                                                                                textDecorationStyle: 'solid',
                                                                                color: sectionproperties.prodsalePriceColor,
                                                                                fontSize: StyleParseToIntFuncContext(sectionproperties.prodsalepriceFontSize),
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
                                                                            }}
                                                                        >
                                                                            {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : ''}{' '}
                                                                            {item.productinfo.variantinfo.variantprice}{' '}
                                                                            {langdetect == 'en' ? '' : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                                                        </Text>
                                                                    </View>
                                                                )}
                                                            </View>
                                                        )}
                                                    </View>
                                                </View>
                                                <View style={[generalstyles.flexRow]}>
                                                    {sectionproperties.showtrashbtn == 'Show' && (
                                                        <TouchableOpacity
                                                            style={[
                                                                generalstyles.allcentered,
                                                                generalstyles.flexRow,
                                                                {
                                                                    width: 25,
                                                                    height: 25,
                                                                    marginEnd: 5,
                                                                    flex: 1,
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'flex-start',
                                                                    backgroundColor: sectionproperties.trashbtn_bgColor,
                                                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.trashbtn_borderBottomLeftRadius, '', true),
                                                                },
                                                            ]}
                                                            onPress={() => {
                                                                deletecartitemContext(item);
                                                            }}
                                                        >
                                                            <Feather
                                                                name="trash-2"
                                                                size={StyleParseToIntFuncContext(sectionproperties.trashbtn_Textfontsize)}
                                                                color={sectionproperties.trashbtn_Textcolor}
                                                            />
                                                            <Text
                                                                style={[
                                                                    generalstyles.poppinsMedium,
                                                                    {
                                                                        paddingTop: Platform.OS == 'ios' ? 0 : 4,
                                                                        marginStart: 5,
                                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.trashbtn_Textfontsize),
                                                                        color: sectionproperties.trashbtn_Textcolor,
                                                                    },
                                                                ]}
                                                            >
                                                                {lang.remove}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )}
                                                    {item?.productinfo?.isproducthasquantitychange == 1 && (
                                                        <View
                                                            style={[
                                                                {
                                                                    flex: 1,
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'flex-end',
                                                                },
                                                            ]}
                                                        >
                                                            <View
                                                                style={[
                                                                    {
                                                                        flexDirection: 'row',
                                                                        alignItems: 'center',
                                                                        borderColor: sectionproperties.quantitybtnbordercolor,
                                                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.quantitybtnborderwidth, '', true),
                                                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.quantitybtn_borderradius, '', true),
                                                                    },
                                                                ]}
                                                            >
                                                                <TouchableOpacity
                                                                    style={[
                                                                        generalstyles.allcentered,
                                                                        {
                                                                            width: StyleParseToIntFuncContext(
                                                                                sectionproperties.remove_quantitybtn_width != null && sectionproperties.remove_quantitybtn_width != undefined
                                                                                    ? sectionproperties.remove_quantitybtn_width
                                                                                    : 0,
                                                                            ),
                                                                            height: StyleParseToIntFuncContext(
                                                                                sectionproperties.remove_quantitybtn_height != null && sectionproperties.remove_quantitybtn_height != undefined
                                                                                    ? sectionproperties.remove_quantitybtn_height
                                                                                    : 0,
                                                                            ),
                                                                            backgroundColor: sectionproperties.remove_quantitybtn_bgcolor,
                                                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.remove_quantitybtn_borderradius),
                                                                        },
                                                                    ]}
                                                                    onPress={() => {
                                                                        if (item.quantity > 1) {
                                                                            ChangeCartItemQuantityContext(item, parseInt(parseInt(item.quantity) - 1));
                                                                        } else {
                                                                            deletecartitemContext(item);
                                                                        }
                                                                    }}
                                                                >
                                                                    {AddtoCartMutationContext.isLoading && (
                                                                        <SpinnerButton
                                                                            buttonStyle={{ width: 22, height: 22 }}
                                                                            isLoading={true}
                                                                            indicatorCount={10}
                                                                            spinnerType={'MaterialIndicator'}
                                                                            spinnerColor={sectionproperties.remove_quantitybtn_textcolor}
                                                                        ></SpinnerButton>
                                                                    )}
                                                                    {!AddtoCartMutationContext.isLoading && (
                                                                        <AntDesign
                                                                            name="minus"
                                                                            size={StyleParseToIntFuncContext(sectionproperties.remove_quantitybtn_textfontsize)}
                                                                            color={sectionproperties.remove_quantitybtn_textcolor}
                                                                        />
                                                                    )}
                                                                </TouchableOpacity>
                                                                <View
                                                                    style={{
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        marginLeft: 10,
                                                                        marginRight: 10,
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.quantitybtn_textfontsize),
                                                                            fontFamily: 'Poppins-Medium',
                                                                            color: sectionproperties.quantitybtn_textcolor,
                                                                        }}
                                                                    >
                                                                        {item.quantity}
                                                                    </Text>
                                                                </View>
                                                                <TouchableOpacity
                                                                    style={[
                                                                        generalstyles.allcentered,
                                                                        {
                                                                            width: StyleParseToIntFuncContext(
                                                                                sectionproperties.add_quantitybtn_width != null && sectionproperties.add_quantitybtn_width != undefined
                                                                                    ? sectionproperties.add_quantitybtn_width
                                                                                    : 0,
                                                                            ),
                                                                            height: StyleParseToIntFuncContext(
                                                                                sectionproperties.add_quantitybtn_height != null && sectionproperties.add_quantitybtn_height != undefined
                                                                                    ? sectionproperties.add_quantitybtn_height
                                                                                    : 0,
                                                                            ),
                                                                            backgroundColor: sectionproperties.add_quantitybtn_bgcolor,
                                                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.add_quantitybtn_borderradius, '', true),
                                                                        },
                                                                    ]}
                                                                    onPress={() => {
                                                                        ChangeCartItemQuantityContext(item, parseInt(parseInt(item.quantity) + 1));
                                                                    }}
                                                                >
                                                                    {AddtoCartMutationContext.isLoading && (
                                                                        <SpinnerButton
                                                                            buttonStyle={{ width: 22, height: 22 }}
                                                                            isLoading={true}
                                                                            indicatorCount={10}
                                                                            spinnerType={'MaterialIndicator'}
                                                                            spinnerColor={sectionproperties.add_quantitybtn_textcolor}
                                                                        ></SpinnerButton>
                                                                    )}
                                                                    {!AddtoCartMutationContext.isLoading && (
                                                                        <AntDesign
                                                                            name="plus"
                                                                            size={StyleParseToIntFuncContext(sectionproperties.add_quantitybtn_textfontsize)}
                                                                            color={sectionproperties.add_quantitybtn_textcolor}
                                                                        />
                                                                    )}
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    )}
                                                </View>
                                            </View>
                                        );
                                    })}
                                </View>
                                {sectionproperties.showinputfields == 'Show' && (
                                    <View style={[generalstyles.containerInner, { marginBottom: 15, marginTop: 10, backgroundColor: sectionproperties.summary_sectionbgcolor, paddingVertical: 20 }]}>
                                        <Text
                                            style={[
                                                generalstyles.form_label,
                                                {
                                                    color: sectionproperties.form_labelcolor,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.form_labelfontsize),
                                                    textAlign: 'left',
                                                },
                                            ]}
                                        >
                                            {lang.doyouhavepromocode}
                                        </Text>

                                        <View style={[generalstyles.flexColumn, generalstyles.allcentered]}>
                                            {/* <TextInput
                                                style={[
                                                    generalstyles.poppinsMedium,
                                                    {
                                                        color: sectionproperties.inputfieldcolor,
                                                        flex: 1,
                                                        backgroundColor: sectionproperties.input_bgcolor,
                                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
                                                        height: 45,
                                                        paddingLeft: 10,
                                                        paddingRight: 10,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                                        marginBottom: 10,
                                                        width: '100%',
                                                        textAlign: langdetect == 'en' ? 'left' : 'right',
                                                    },
                                                ]}
                                                underlineColorAndroid="transparent"
                                                placeholderTextColor={COLORS.light}
                                                placeholder={langdetect == 'en' ? 'Gift Card Or Discount Code...' : 'كوبون، كود خصم... '}
                                                value={fetchcustomercartQueryContext.data.data.customercart.couponname}
                                                onChangeText={(event) => {
                                                    var cartarr = queryClient.getQueryData('fetchcustomercart_API');
                                                    cartarr.data.customercart.couponname = event;
                                                    queryClient.setQueryData('fetchcustomercart_API', cartarr);
                                                }}
                                                // disabled={fetchcustomercartQueryContext.data.data.customercart.couponexists ? true : false}
                                            /> */}
                                            <View
                                                style={[
                                                    generalstyles.flexRow,
                                                    styles.textinput,
                                                    {
                                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
                                                        color: sectionproperties.inputfieldcolor,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                                        shadowColor: sectionproperties.inputshadowcolor,
                                                        shadowOpacity: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 0.1 : 0,
                                                        shadowOffset: {
                                                            width: 0,
                                                            height: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                                        },
                                                        shadowRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                                        elevation: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 1 : 0,
                                                        backgroundColor: sectionproperties.input_bgcolor,
                                                        borderWidth:
                                                            sectionproperties.inputfieldbordertype == 'All' ? StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) : 0,
                                                        borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                                        borderColor: sectionproperties.inputfieldborderColor,
                                                        height: 40,
                                                        marginBottom: 20,
                                                    },
                                                ]}
                                            >
                                                <TextInput
                                                    style={[
                                                        generalstyles.poppinsMedium,
                                                        {
                                                            height: '100%',
                                                            width: '100%',
                                                            paddingHorizontal: 10,
                                                        },
                                                    ]}
                                                    // placeholderTextColor={COLORS.light}
                                                    // placeholder={langdetect == 'en' ? 'Gift Card Or Discount Code...' : 'كوبون، كود خصم... '}
                                                    // value={fetchcustomercartQueryContext.data.data.customercart.couponname}
                                                    // onChangeText={(event) => {
                                                    //     var cartarr = queryClient.getQueryData('fetchcustomercart_API');
                                                    //     cartarr.data.customercart.couponname = event;
                                                    //     queryClient.setQueryData('fetchcustomercart_API', cartarr);
                                                    // }}
                                                    // underlineColorAndroid="transparent"
                                                    placeholderTextColor={COLORS.light}
                                                    placeholder={langdetect == 'en' ? 'Gift Card Or Discount Code...' : 'كوبون، كود خصم... '}
                                                    value={fetchcustomercartQueryContext?.data?.data?.customercart?.couponname}
                                                    onChangeText={(event) => {
                                                        var cartarr = queryClient.getQueryData('fetchcustomercart_API');
                                                        cartarr.data.customercart.couponname = event;
                                                        queryClient.setQueryData('fetchcustomercart_API', cartarr);
                                                    }}
                                                />
                                            </View>
                                            <TouchableOpacity
                                                style={{
                                                    width: StyleParseToIntFuncContext(
                                                        sectionproperties.applybtn_width != null && sectionproperties.applybtn_width != undefined ? sectionproperties.applybtn_width : 270,
                                                    ),
                                                    backgroundColor: sectionproperties.applybtn_bgColor,
                                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.applybtn_borderBottomLeftRadius, '', true),
                                                    borderWidth: StyleParseToIntFuncContext(
                                                        sectionproperties.applybtnborderwidth != undefined && sectionproperties.applybtnborderwidth != null ? sectionproperties.applybtnborderwidth : 0,
                                                        '',
                                                        true,
                                                    ),
                                                    borderColor: sectionproperties.applybtnbordercolor,
                                                    alignItems: 'center',
                                                    height: StyleParseToIntFuncContext(
                                                        sectionproperties.applybtn_height != null && sectionproperties.applybtn_height != undefined ? sectionproperties.applybtn_height : 45,
                                                    ),
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexDirection: 'row',
                                                }}
                                                onPress={() => {
                                                    if (fetchcustomercartQueryContext?.data?.data?.customercart != undefined) {
                                                        if (
                                                            fetchcustomercartQueryContext?.data?.data?.customercart?.couponname != undefined &&
                                                            fetchcustomercartQueryContext?.data?.data?.customercart?.couponname != 0
                                                        ) {
                                                            if (!fetchcustomercartQueryContext?.data?.data?.customercart?.couponexists) {
                                                                var payloadobj = {
                                                                    couponname: fetchcustomercartQueryContext?.data?.data?.customercart?.couponname,
                                                                    functype: 'add',
                                                                };
                                                                ApplyPromoCodeMutationContext.mutate(payloadobj);
                                                            } else {
                                                                var payloadobj = {
                                                                    functype: 'delete',
                                                                };
                                                                ApplyPromoCodeMutationContext.mutate(payloadobj);
                                                            }
                                                        } else {
                                                            showUpTopNotificationBarContext(lang.pleasewritepromocode, 'orange');
                                                        }
                                                    }
                                                }}
                                                disabled={ApplyPromoCodeMutationContext.isLoading ? true : false}
                                            >
                                                {!ApplyPromoCodeMutationContext.isLoading && (
                                                    <Text
                                                        style={{
                                                            color: sectionproperties.applybtn_textColor,
                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.applybtn_fontsize),
                                                            fontFamily:
                                                                sectionproperties.applybtn_Textfontweight == 300
                                                                    ? 'Poppins-Thin'
                                                                    : sectionproperties.applybtn_Textfontweight == 400
                                                                    ? 'Poppins-Light'
                                                                    : sectionproperties.applybtn_Textfontweight == 500
                                                                    ? 'Poppins-Regular'
                                                                    : sectionproperties.applybtn_Textfontweight == 600
                                                                    ? 'Poppins-Medium'
                                                                    : sectionproperties.applybtn_Textfontweight == 700
                                                                    ? 'Poppins-Semibold'
                                                                    : 'Poppins-Bold',

                                                            textTransform:
                                                                sectionproperties.applybtn_texttransform == 'Uppercase'
                                                                    ? 'uppercase'
                                                                    : sectionproperties.applybtn_texttransform == 'Capitalize'
                                                                    ? 'capitalize'
                                                                    : sectionproperties.applybtn_texttransform == 'None'
                                                                    ? 'none'
                                                                    : 'lowercase',
                                                        }}
                                                    >
                                                        {fetchcustomercartQueryContext?.data?.data?.customercart?.couponexists ? lang.remove : lang.apply}
                                                    </Text>
                                                )}
                                                {ApplyPromoCodeMutationContext.isLoading && (
                                                    <SpinnerButton
                                                        buttonStyle={{ width: 22, height: 22 }}
                                                        isLoading={true}
                                                        indicatorCount={10}
                                                        spinnerType={'MaterialIndicator'}
                                                        spinnerColor={'white'}
                                                    ></SpinnerButton>
                                                )}
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                                {sectionproperties.showSummarySection == 'Show' && (
                                    <View
                                        style={{
                                            padding: 15,
                                            backgroundColor: sectionproperties.summary_sectionbgcolor,
                                            borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.summary_sectionbordertoprightradius, '', true),
                                            borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.summary_sectionbordertopleftradius, '', true),
                                            borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.summary_sectionborderbottomrightradius, '', true),
                                            borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.summary_sectionborderbottomleftradius, '', true),
                                        }}
                                    >
                                        <View
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                flex: 1,
                                            }}
                                        >
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text
                                                    style={[
                                                        {
                                                            flex: 1,
                                                            textAlign: 'left',
                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.summary_fontsize),
                                                            color: sectionproperties.summary_textcolor,
                                                            fontFamily:
                                                                sectionproperties.summary_textfontweight == 300
                                                                    ? 'Poppins-Thin'
                                                                    : sectionproperties.summary_textfontweight == 400
                                                                    ? 'Poppins-Light'
                                                                    : sectionproperties.summary_textfontweight == 500
                                                                    ? 'Poppins-Regular'
                                                                    : sectionproperties.summary_textfontweight == 600
                                                                    ? 'Poppins-Medium'
                                                                    : sectionproperties.summary_textfontweight == 700
                                                                    ? 'Poppins-Semibold'
                                                                    : 'Poppins-Bold',

                                                            textTransform:
                                                                sectionproperties.summary_texttransform == 'Uppercase'
                                                                    ? 'uppercase'
                                                                    : sectionproperties.summary_texttransform == 'Capitalize'
                                                                    ? 'capitalize'
                                                                    : sectionproperties.summary_texttransform == 'None'
                                                                    ? 'none'
                                                                    : 'lowercase',
                                                        },
                                                    ]}
                                                >
                                                    {lang.subtotal}:
                                                </Text>
                                                <Text
                                                    style={[
                                                        generalstyles.poppinsMedium,
                                                        {
                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.summary_fontsize),
                                                            color: sectionproperties.summary_textcolor,
                                                            fontFamily:
                                                                sectionproperties.summary_textfontweight == 300
                                                                    ? 'Poppins-Thin'
                                                                    : sectionproperties.summary_textfontweight == 400
                                                                    ? 'Poppins-Light'
                                                                    : sectionproperties.summary_textfontweight == 500
                                                                    ? 'Poppins-Regular'
                                                                    : sectionproperties.summary_textfontweight == 600
                                                                    ? 'Poppins-Medium'
                                                                    : sectionproperties.summary_textfontweight == 700
                                                                    ? 'Poppins-Semibold'
                                                                    : 'Poppins-Bold',
                                                        },
                                                    ]}
                                                >
                                                    {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : ''} {/* {}{' '} */}
                                                    {parseFloat(fetchcustomercartQueryContext?.data?.data?.customercart?.totalprice).toFixed(2)}{' '}
                                                    {langdetect == 'en' ? '' : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                                </Text>
                                            </View>
                                            {fetchcustomercartQueryContext?.data?.data?.customercart?.couponexists && (
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text
                                                        style={[
                                                            {
                                                                flex: 1,
                                                                textAlign: 'left',
                                                                fontSize: StyleParseToIntFuncContext(sectionproperties.summary_fontsize),
                                                                color: sectionproperties.prodsalePriceColor,
                                                                fontFamily:
                                                                    sectionproperties.summary_textfontweight == 300
                                                                        ? 'Poppins-Thin'
                                                                        : sectionproperties.summary_textfontweight == 400
                                                                        ? 'Poppins-Light'
                                                                        : sectionproperties.summary_textfontweight == 500
                                                                        ? 'Poppins-Regular'
                                                                        : sectionproperties.summary_textfontweight == 600
                                                                        ? 'Poppins-Medium'
                                                                        : sectionproperties.summary_textfontweight == 700
                                                                        ? 'Poppins-Semibold'
                                                                        : 'Poppins-Bold',

                                                                textTransform:
                                                                    sectionproperties.summary_texttransform == 'Uppercase'
                                                                        ? 'uppercase'
                                                                        : sectionproperties.summary_texttransform == 'Capitalize'
                                                                        ? 'capitalize'
                                                                        : sectionproperties.summary_texttransform == 'None'
                                                                        ? 'none'
                                                                        : 'lowercase',
                                                            },
                                                        ]}
                                                    >
                                                        {lang.discount}:
                                                    </Text>
                                                    <View>
                                                        <Text
                                                            style={[
                                                                generalstyles.poppinsMedium,
                                                                {
                                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.summary_fontsize),
                                                                    color: sectionproperties.prodsalePriceColor,
                                                                    fontFamily:
                                                                        sectionproperties.summary_textfontweight == 300
                                                                            ? 'Poppins-Thin'
                                                                            : sectionproperties.summary_textfontweight == 400
                                                                            ? 'Poppins-Light'
                                                                            : sectionproperties.summary_textfontweight == 500
                                                                            ? 'Poppins-Regular'
                                                                            : sectionproperties.summary_textfontweight == 600
                                                                            ? 'Poppins-Medium'
                                                                            : sectionproperties.summary_textfontweight == 700
                                                                            ? 'Poppins-Semibold'
                                                                            : 'Poppins-Bold',
                                                                },
                                                            ]}
                                                        >
                                                            - {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : ''}{' '}
                                                            {/* {fetchcustomercartQueryContext?.data?.data?.customercart?.discountprice}{' '} */}
                                                            {parseFloat(fetchcustomercartQueryContext?.data?.data?.customercart?.discountprice).toFixed(2)}{' '}
                                                            {langdetect == 'en' ? '' : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                                        </Text>
                                                    </View>
                                                </View>
                                            )}
                                            {fetchcustomercartQueryContext?.data?.data?.customercart?.genpayments?.length != 0 &&
                                                fetchcustomercartQueryContext?.data?.data?.customercart?.genpayments?.map((item, index) => {
                                                    return (
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <Text
                                                                style={[
                                                                    {
                                                                        flex: 1,
                                                                        textAlign: 'left',
                                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.summary_fontsize),
                                                                        // color: sectionproperties.summary_textcolor,
                                                                        color: item.addsubtype == 'subtract' ? COLORS.danger : COLORS.success,
                                                                        fontFamily:
                                                                            sectionproperties.summary_textfontweight == 300
                                                                                ? 'Poppins-Thin'
                                                                                : sectionproperties.summary_textfontweight == 400
                                                                                ? 'Poppins-Light'
                                                                                : sectionproperties.summary_textfontweight == 500
                                                                                ? 'Poppins-Regular'
                                                                                : sectionproperties.summary_textfontweight == 600
                                                                                ? 'Poppins-Medium'
                                                                                : sectionproperties.summary_textfontweight == 700
                                                                                ? 'Poppins-Semibold'
                                                                                : 'Poppins-Bold',

                                                                        textTransform:
                                                                            sectionproperties.summary_texttransform == 'Uppercase'
                                                                                ? 'uppercase'
                                                                                : sectionproperties.summary_texttransform == 'Capitalize'
                                                                                ? 'capitalize'
                                                                                : sectionproperties.summary_texttransform == 'None'
                                                                                ? 'none'
                                                                                : 'lowercase',
                                                                    },
                                                                ]}
                                                            >
                                                                {langdetect == 'en' ? item.title_en : item.title_ar}:
                                                            </Text>
                                                            <Text
                                                                style={[
                                                                    generalstyles.poppinsMedium,
                                                                    {
                                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.summary_fontsize),
                                                                        color: sectionproperties.summary_textcolor,
                                                                        fontFamily:
                                                                            sectionproperties.summary_textfontweight == 300
                                                                                ? 'Poppins-Thin'
                                                                                : sectionproperties.summary_textfontweight == 400
                                                                                ? 'Poppins-Light'
                                                                                : sectionproperties.summary_textfontweight == 500
                                                                                ? 'Poppins-Regular'
                                                                                : sectionproperties.summary_textfontweight == 600
                                                                                ? 'Poppins-Medium'
                                                                                : sectionproperties.summary_textfontweight == 700
                                                                                ? 'Poppins-Semibold'
                                                                                : 'Poppins-Bold',
                                                                        color: item.addsubtype == 'subtract' ? COLORS.danger : COLORS.success,
                                                                    },
                                                                ]}
                                                            >
                                                                {item.addsubtype == 'subtract' && <Text>- </Text>}
                                                                {item.valuetype == 'value' && (
                                                                    <Text>
                                                                        {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : ''} {item.value}{' '}
                                                                        {langdetect == 'en' ? '' : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                                                    </Text>
                                                                )}
                                                                {item.valuetype == 'percentage' && <Text>{item.value}%</Text>}
                                                            </Text>
                                                        </View>
                                                    );
                                                })}
                                            {/* {sectionproperties.hideshipping == 'Show' && ( */}
                                            {/* <View style={[generalstyles.flexRow]}>
                                                <Text
                                                    style={{
                                                        //fontFamily: 'Poppins-Medium',
                                                        color: sectionproperties.summary_textcolor,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.summary_fontsize),
                                                        fontFamily:
                                                            sectionproperties.summary_textfontweight == 300
                                                                ? 'Poppins-Thin'
                                                                : sectionproperties.summary_textfontweight == 400
                                                                ? 'Poppins-Light'
                                                                : sectionproperties.summary_textfontweight == 500
                                                                ? 'Poppins-Regular'
                                                                : sectionproperties.summary_textfontweight == 600
                                                                ? 'Poppins-Medium'
                                                                : sectionproperties.summary_textfontweight == 700
                                                                ? 'Poppins-Semibold'
                                                                : 'Poppins-Bold',
                                                        textTransform:
                                                            sectionproperties.summary_texttransform == 'Uppercase'
                                                                ? 'uppercase'
                                                                : sectionproperties.summary_texttransform == 'Capitalize'
                                                                ? 'capitalize'
                                                                : sectionproperties.summary_texttransform == 'None'
                                                                ? 'none'
                                                                : 'lowercase',
                                                    }}
                                                >
                                                    {lang.shippingfees}
                                                </Text>
                                                {fetchcustomercartQueryContext.data.data.customercart.zoneexists && (
                                                    <Text
                                                        style={{
                                                            marginStart: 'auto',
                                                            //fontFamily: 'Poppins-Medium',
                                                            color: sectionproperties.summary_textcolor,
                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.summary_fontsize),
                                                            fontFamily:
                                                                sectionproperties.summary_textfontweight == 300
                                                                    ? 'Poppins-Thin'
                                                                    : sectionproperties.summary_textfontweight == 400
                                                                    ? 'Poppins-Light'
                                                                    : sectionproperties.summary_textfontweight == 500
                                                                    ? 'Poppins-Regular'
                                                                    : sectionproperties.summary_textfontweight == 600
                                                                    ? 'Poppins-Medium'
                                                                    : sectionproperties.summary_textfontweight == 700
                                                                    ? 'Poppins-Semibold'
                                                                    : 'Poppins-Bold',
                                                        }}
                                                    >
                                                        {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : ''}{' '}
                                                        {fetchcustomercartQueryContext.data.data.customercart.zoneprice}{' '}
                                                        {langdetect == 'en' ? '' : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                                    </Text>
                                                )}
                                                {!fetchcustomercartQueryContext.data.data.customercart.zoneexists && (
                                                    <Text
                                                        style={{
                                                            marginStart: 'auto',
                                                            fontFamily: 'Poppins-Medium',
                                                            color: COLORS.danger,
                                                            fontSize: 15,
                                                        }}
                                                    >
                                                        {lang.outofzone}
                                                    </Text>
                                                )}
                                            </View> */}
                                            {/* )} */}
                                            <View
                                                style={{
                                                    width: '100%',
                                                    height: 1,
                                                    backgroundColor: '#e6e6e6',
                                                    marginBottom: 7,
                                                    marginTop: 7,
                                                }}
                                            ></View>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text
                                                    style={[
                                                        {
                                                            marginBottom: 7,
                                                            flex: 1,
                                                            textAlign: 'left',
                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.total_fontsize),
                                                            color: sectionproperties.total_color,
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
                                                        },
                                                    ]}
                                                >
                                                    {lang.total}:
                                                </Text>
                                                <View>
                                                    <Text
                                                        style={[
                                                            generalstyles.poppinsMedium,
                                                            {
                                                                marginBottom: 7,
                                                                textAlign: 'right',
                                                                fontSize: StyleParseToIntFuncContext(sectionproperties.total_fontsize),
                                                                color: sectionproperties.total_color,
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
                                                            },
                                                        ]}
                                                    >
                                                        {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : ''}{' '}
                                                        {/* {fetchcustomercartQueryContext?.data?.data?.customercart?.totalpriceafterdiscount_noshipping}{' '} */}
                                                        {parseFloat(fetchcustomercartQueryContext?.data?.data?.customercart?.totalpriceafterdiscount_noshipping).toFixed(2)}{' '}
                                                        {langdetect == 'en' ? '' : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                                    </Text>
                                                    {sectionproperties.hideshipping == 'Show' && (
                                                        <Text
                                                            style={{
                                                                fontSize: 12,
                                                                marginBottom: 7,
                                                                color: COLORS.light,
                                                                textAlign: 'right',
                                                                textTransform: 'uppercase',
                                                            }}
                                                        >
                                                            {lang.excludingdelivery}
                                                        </Text>
                                                    )}
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )}
                                <View
                                    style={{
                                        padding: SIZES.padding * 2,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <TouchableOpacity
                                        style={[
                                            generalstyles.allcentered,
                                            {
                                                width: StyleParseToIntFuncContext(
                                                    sectionproperties.checkoutBtnWidth != null && sectionproperties.checkoutBtnWidth != undefined ? sectionproperties.checkoutBtnWidth : 270,
                                                ),
                                                height: StyleParseToIntFuncContext(
                                                    sectionproperties.checkoutBtnHeight != null && sectionproperties.checkoutBtnHeight != undefined ? sectionproperties.checkoutBtnHeight : 45,
                                                ),
                                                flexDirection: 'row',
                                                backgroundColor: sectionproperties.checkoutBtnbgColor,
                                                borderRadius: StyleParseToIntFuncContext(sectionproperties.checkout_borderBottomLeftRadius, '', true),
                                                borderWidth: StyleParseToIntFuncContext(sectionproperties.checkout_borderWidth, '', true),
                                                borderColor: sectionproperties.checkout_bordercolor,
                                            },
                                        ]}
                                        onPress={() => {
                                            routingcountext(StaticPagesLinksContext.Checkout);
                                            // routingcountext(StaticPagesLinksContext.Ordersuccess, { status: 'true', reason: '' });
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: sectionproperties.checkoutBtnTextcolor,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.checkoutBtnTextfontsize),
                                                fontFamily:
                                                    sectionproperties.checkoutBtnTextfontweight == 300
                                                        ? 'Poppins-Thin'
                                                        : sectionproperties.checkoutBtnTextfontweight == 400
                                                        ? 'Poppins-Light'
                                                        : sectionproperties.checkoutBtnTextfontweight == 500
                                                        ? 'Poppins-Regular'
                                                        : sectionproperties.checkoutBtnTextfontweight == 600
                                                        ? 'Poppins-Medium'
                                                        : sectionproperties.checkoutBtnTextfontweight == 700
                                                        ? 'Poppins-Semibold'
                                                        : 'Poppins-Bold',
                                                textTransform:
                                                    sectionproperties.checkoutBtnTexttransform == 'Uppercase'
                                                        ? 'uppercase'
                                                        : sectionproperties.checkoutBtnTexttransform == 'Capitalize'
                                                        ? 'capitalize'
                                                        : sectionproperties.checkoutBtnTexttransform == 'None'
                                                        ? 'none'
                                                        : 'lowercase',
                                            }}
                                        >
                                            {langdetect == 'en' ? sectionproperties.checkoutButtonContenten : sectionproperties.checkoutButtonContentar}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        {fetchcustomercartQueryContext?.data?.data?.customercart?.cartitems?.length == 0 && (
                            <View style={{ height: 500, width: '100%', display: 'flex', alignItem: 'center', justifyContent: 'center' }}>
                                <View style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                    {sectionproperties.noporudtcicontype == 'Shopping cart 1' && (
                                        <MaterialCommunityIcons
                                            name="cart-outline"
                                            size={StyleParseToIntFuncContext(sectionproperties.noprod_iconfontSize)}
                                            color={sectionproperties.noprod_iconcolor}
                                        />
                                    )}
                                    {sectionproperties.noporudtcicontype == 'Shopping cart 2' && (
                                        <Image
                                            source={icons.cart2}
                                            resizeMode="cover"
                                            style={{
                                                width: StyleParseToIntFuncContext(
                                                    sectionproperties.noprod_iconfontSize != null && sectionproperties.noprod_iconfontSize != undefined ? sectionproperties.noprod_iconfontSize : 0,
                                                ),
                                                height: StyleParseToIntFuncContext(
                                                    sectionproperties.noprod_iconfontSize != null && sectionproperties.noprod_iconfontSize != undefined ? sectionproperties.noprod_iconfontSize : 0,
                                                ),
                                                tintColor: sectionproperties.noprod_iconcolor,
                                            }}
                                        />
                                    )}
                                    {sectionproperties.noporudtcicontype == 'Shopping bag 1' && (
                                        <Feather
                                            name="shopping-bag"
                                            size={StyleParseToIntFuncContext(sectionproperties.noprod_iconfontSize)}
                                            style={{
                                                color: sectionproperties.noprod_iconcolor,
                                            }}
                                        />
                                    )}
                                    {sectionproperties.noporudtcicontype == 'Shopping bag 2' && (
                                        <SimpleLineIcons
                                            name="handbag"
                                            size={StyleParseToIntFuncContext(sectionproperties.noprod_iconfontSize)}
                                            style={{
                                                color: sectionproperties.noprod_iconcolor,
                                            }}
                                        />
                                    )}
                                    {sectionproperties.noporudtcicontype == 'Shopping bag 3' && (
                                        <FontAwesome5
                                            name="shopping-bag"
                                            size={StyleParseToIntFuncContext(sectionproperties.noprod_iconfontSize)}
                                            style={{
                                                color: sectionproperties.noprod_iconcolor,
                                            }}
                                        />
                                    )}
                                    {sectionproperties.noporudtcicontype == 'Shopping bag 4' && (
                                        <SimpleLineIcons
                                            name="bag"
                                            size={StyleParseToIntFuncContext(sectionproperties.noprod_iconfontSize)}
                                            style={{
                                                color: sectionproperties.noprod_iconcolor,
                                            }}
                                        />
                                    )}
                                    {sectionproperties.noporudtcicontype == 'Calendar 1' && (
                                        <AntDesign
                                            name="calendar"
                                            size={StyleParseToIntFuncContext(sectionproperties.noprod_iconfontSize)}
                                            style={{
                                                color: sectionproperties.noprod_iconcolor,
                                            }}
                                        />
                                    )}
                                    {sectionproperties.noporudtcicontype == 'Sad Face' && (
                                        <Ionicons name="ios-sad-outline" size={StyleParseToIntFuncContext(sectionproperties.noprod_iconfontSize)} color={sectionproperties.noprod_iconcolor} />
                                    )}

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
                                            marginTop: 15,
                                        }}
                                    >
                                        {langdetect == 'en' ? sectionproperties.nocards_content_en : sectionproperties.nocards_content_ar}
                                    </Text>
                                    {sectionproperties.generalbtn_show == 'Show' && (
                                        <TouchableOpacity
                                            style={[
                                                generalstyles.allcentered,
                                                {
                                                    width: StyleParseToIntFuncContext(sectionproperties.generalbtn_width) + '%',
                                                    height: StyleParseToIntFuncContext(sectionproperties.generalbtn_height),
                                                    backgroundColor: sectionproperties.generalbtn_bgColor,
                                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderwidth, '', true),
                                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.generalbtnborderradius, '', true),
                                                    borderColor: sectionproperties.generalbtn_bordercolor,
                                                    marginTop: 10,
                                                },
                                            ]}
                                            onPress={() => {
                                                if (sectionproperties.btnroute != null) {
                                                    routingtemp(sectionproperties.btnroute);
                                                } else {
                                                    navigation.navigate('TemplateDraftRouter', {
                                                        screen: StaticPagesLinksContext.GeneralProductsComponent,
                                                        params: {
                                                            genprodcompstinfo: {
                                                                // collectionid: ProductsFetchingTypeSectionObj.collectionid,
                                                                srcfrom: 'GeneralProductsComponent',
                                                                // fetchingtype: sectionitem?.productsfetchingtype,
                                                            },
                                                        },
                                                    });
                                                }
                                                // sectionproperties.btnroute
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
                                                }}
                                            >
                                                {langdetect == 'en' ? sectionproperties.generalbtn_content : sectionproperties.slideshow_btn_text_ar}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                    {/* <Image
                                        source={images.shoppingcart}
                                        style={{
                                            width: '50%',
                                            height: '50%',
                                        }}
                                        resizeMode={SIZES.width > 768 ? 'contain' : 'cover'}
                                    />
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
                                    </Text> */}
                                </View>
                            </View>
                        )}
                    </SafeAreaView>
                )}
            </KeyboardAwareScrollView>
        </View>
    );
};
const styles = StyleSheet.create({});

export default Viewcart;
