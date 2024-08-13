import React, { useState, useContext, useEffect } from 'react';
import { Platform, View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { icons, COLORS, images, SIZES } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { AntDesign, Feather, SimpleLineIcons, FontAwesome5, MaterialCommunityIcons } from 'react-native-vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ImageComponent } from '../../../ImageComponent';

const Wishlist = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const navigation = useNavigation();
    const { lang, langdetect } = useContext(LanguageContext);
    const { ProjectOpenrcTypeContext, StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { routingcountext, StaticPagesLinksContext, routingtemp } = useContext(TemplateRoutingContext);
    const { fetchFavoriteProductsQueryContext, FetchQueriesEngineContext, setFetchQueriesEngineContext, setProductInfoIdContext, addtofavoritescontext, fetchAuthorizationQueryContext } =
        useContext(FetchingContext);
    const [StatePageProperties, setStatePageProperties] = useState({});
    const [sectionproperties, setsectionproperties] = useState('');
    useEffect(() => {
        var tempFetchQueriesEngineContext = { ...FetchQueriesEngineContext };
        tempFetchQueriesEngineContext.fetchfavoriteproducts = true;
        setFetchQueriesEngineContext({ ...tempFetchQueriesEngineContext });
        StatePageProperties11.pages.forEach(function (item, index) {
            if (CurrentPageIdContext == item.pageid) {
                setStatePageProperties(item.pageobj);
            }
        });
    }, [StatePageProperties11]);
    useEffect(() => {
        var secpropobj = {};
        if (StatePageProperties.pageobj != undefined && StatePageProperties.pageobj.pageproperties != undefined) {
            StatePageProperties.pageobj.pageproperties.forEach(function (sectionitem, sectionindex) {
                secpropobj[sectionitem.property_css_name] = sectionitem.property_value;
            });
        }
        setsectionproperties({ ...secpropobj });
    }, [StatePageProperties]);

    const WishListCard = (item, index) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setProductInfoIdContext(item.productid);
                    routingcountext(StaticPagesLinksContext.ProductInfo);
                }}
                style={{
                    flexDirection: sectionproperties.showcardsas == 'Cards' ? 'row' : 'column',
                    marginBottom: 10,
                    paddingVertical: StyleParseToIntFuncContext(sectionproperties.innersectionpaddingvertical),
                    paddingHorizontal: StyleParseToIntFuncContext(sectionproperties.innersectionpaddinghorizontal),
                    backgroundColor: sectionproperties.reservation_bgcolor,
                    borderRadius: StyleParseToIntFuncContext(sectionproperties.reservation_borderradius, '', true),
                }}
            >
                <TouchableOpacity
                    style={[
                        generalstyles.allcentered,
                        generalstyles.flexRow,
                        {
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            width: StyleParseToIntFuncContext(sectionproperties.trashbtn_Width),
                            height: StyleParseToIntFuncContext(sectionproperties.trashbtn_Height),
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 'auto',
                            borderRadius: StyleParseToIntFuncContext(sectionproperties.trashbtn_borderBottomLeftRadius, '', true),
                            zIndex: 1000,
                            borderColor: sectionproperties.trashbtn_Textcolor,
                            borderWidth: 1,
                        },
                    ]}
                    onPress={(e) => {
                        e.stopPropagation();
                        addtofavoritescontext(item.productid);
                    }}
                >
                    <Feather name="trash-2" size={StyleParseToIntFuncContext(sectionproperties.trashbtn_Textfontsize)} color={sectionproperties.trashbtn_Textcolor} />
                </TouchableOpacity>
                <View style={{ flexDirection: sectionproperties.cardstyletype == 'Style 1' ? 'row' : 'column', width: '100%' }}>
                    <View style={{ flexDirection: sectionproperties.showcardsas == 'Cards' ? 'column' : 'row', flex: 1, width: '100%' }}>
                        <View
                            style={{
                                width: sectionproperties.showcardsas == 'Cards' ? '100%' : 60,
                                height: sectionproperties.showcardsas == 'Cards' ? 150 : 60,
                                marginEnd: 10,
                                marginBottom: sectionproperties.showcardsas == 'Cards' ? 20 : 'auto',
                            }}
                        >
                            <ImageComponent
                                path={'/tr:w-' + sectionproperties.imagetr_w + ',h-' + sectionproperties.imagetr_h + '/' + item.productmainimage}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                resizeMethod="resize"
                            />
                        </View>
                        <View
                            style={{
                                display: 'flex',
                                // justifyContent: 'center',
                                flex: 1,
                                flexDirection: 'column',
                                paddingEnd: 10,
                            }}
                        >
                            <Text
                                ellipsizeMode="tail"
                                numberOfLines={2}
                                style={[
                                    {
                                        textAlign: 'left',
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
                                            sectionproperties.prodNameTextTranform == 'Uppercase' ? 'uppercase' : sectionproperties.prodNameTextTranform == 'Capitalize' ? 'capitalize' : 'lowercase',
                                        marginBottom: sectionproperties.showcardsas == 'Cards' ? 10 : 0,
                                    },
                                ]}
                            >
                                {langdetect == 'ar' ? item.name_ar : item.name_en}
                            </Text>
                            <View style={[generalstyles.flexRow, { alignItems: 'center' }]}>
                                {sectionproperties.prodPriceshow == 'Show' && (
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
                                        {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''} {item.hassale == 1 ? item.defaultsaleprice : item.defaultprice}{' '}
                                        {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                                    </Text>
                                )}
                                {item.hassale == 1 && sectionproperties.prodsalePriceshow == 'Show' && (
                                    <Text
                                        style={{
                                            textAlign: 'left',
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
                                            textDecorationLine: 'line-through',
                                            textDecorationStyle: 'solid',
                                        }}
                                    >
                                        {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''} {item.defaultprice}{' '}
                                        {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                                    </Text>
                                )}
                            </View>
                        </View>
                    </View>
                    {sectionproperties.cardstyletype == 'Style 1' && sectionproperties.showcardsas != 'Cards' && (
                        <View style={{ flexDirection: 'row', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            {sectionproperties.cartBtnShow == 'Show' && (
                                <TouchableOpacity
                                    style={[
                                        generalstyles.allcentered,
                                        generalstyles.flexRow,
                                        {
                                            width: StyleParseToIntFuncContext(sectionproperties.cartBtnWidth),
                                            height: StyleParseToIntFuncContext(sectionproperties.cartBtnHeight),
                                            marginEnd: 5,
                                            marginBottom: 'auto',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: sectionproperties.cartBtnbgColor,
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true),
                                        },
                                    ]}
                                    onPress={() => {
                                        setProductInfoIdContext(item.productid);
                                        routingcountext(StaticPagesLinksContext.ProductInfo);
                                    }}
                                >
                                    {sectionproperties.carticonstyle == 'Shopping cart 1' && (
                                        <MaterialCommunityIcons
                                            name="cart-outline"
                                            size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                            style={{
                                                color: sectionproperties.cart_iconcolor,
                                            }}
                                        />
                                    )}
                                    {sectionproperties.carticonstyle == 'Shopping cart 2' && (
                                        <Image
                                            source={icons.cart2}
                                            resizeMode="cover"
                                            style={{
                                                width: StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize),
                                                height: StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize),
                                                tintColor: sectionproperties.cart_iconcolor,
                                            }}
                                        />
                                    )}
                                    {sectionproperties.carticonstyle == 'Shopping bag 1' && (
                                        <Feather
                                            name="shopping-bag"
                                            size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                            style={{
                                                color: sectionproperties.cart_iconcolor,
                                            }}
                                        />
                                    )}
                                    {sectionproperties.carticonstyle == 'Shopping bag 2' && (
                                        <SimpleLineIcons
                                            name="handbag"
                                            size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                            style={{
                                                color: sectionproperties.cart_iconcolor,
                                            }}
                                        />
                                    )}
                                    {sectionproperties.carticonstyle == 'Shopping bag 3' && (
                                        <FontAwesome5
                                            name="shopping-bag"
                                            size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                            style={{
                                                color: sectionproperties.cart_iconcolor,
                                            }}
                                        />
                                    )}
                                    {sectionproperties.carticonstyle == 'Shopping bag 4' && (
                                        <SimpleLineIcons
                                            name="bag"
                                            size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                            style={{
                                                color: sectionproperties.cart_iconcolor,
                                            }}
                                        />
                                    )}
                                    {sectionproperties.carticonstyle == 'Calendar 1' && (
                                        <AntDesign
                                            name="calendar"
                                            size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                            style={{
                                                color: sectionproperties.cart_iconcolor,
                                            }}
                                        />
                                    )}
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity
                                style={[
                                    generalstyles.allcentered,
                                    generalstyles.flexRow,
                                    {
                                        width: StyleParseToIntFuncContext(sectionproperties.trashbtn_Width),
                                        height: StyleParseToIntFuncContext(sectionproperties.trashbtn_Height),
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: 'auto',
                                        backgroundColor: sectionproperties.trashbtn_bgColor,
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.trashbtn_borderBottomLeftRadius, '', true),
                                    },
                                ]}
                                onPress={() => {
                                    addtofavoritescontext(item.productid);
                                }}
                            >
                                <Feather name="trash-2" size={StyleParseToIntFuncContext(sectionproperties.trashbtn_Textfontsize)} color={sectionproperties.trashbtn_Textcolor} />
                            </TouchableOpacity>
                        </View>
                    )}
                    {sectionproperties.cardstyletype == 'Style 2' && sectionproperties.showcardsas != 'Cards' && (
                        <View style={[generalstyles.flexRow, { width: '100%', marginTop: 10 }]}>
                            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                                <TouchableOpacity
                                    style={[
                                        generalstyles.allcentered,
                                        generalstyles.flexRow,
                                        {
                                            marginBottom: 'auto',
                                            backgroundColor: sectionproperties.trashbtn_bgColor,
                                            justifyContent: 'flex-start',
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.trashbtn_borderBottomLeftRadius, '', true),
                                        },
                                    ]}
                                    onPress={() => {
                                        addtofavoritescontext(item.productid);
                                    }}
                                >
                                    <Feather name="trash-2" size={StyleParseToIntFuncContext(sectionproperties.trashbtn_Textfontsize)} color={sectionproperties.trashbtn_Textcolor} />
                                    <Text
                                        style={[
                                            generalstyles.poppinsMedium,
                                            {
                                                marginStart: 5,
                                                color: sectionproperties.trashbtn_Textcolor,
                                            },
                                        ]}
                                    >
                                        {lang.remove}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                {sectionproperties.cartBtnShow == 'Show' && (
                                    <TouchableOpacity
                                        style={[
                                            generalstyles.allcentered,
                                            generalstyles.flexRow,
                                            {
                                                width: StyleParseToIntFuncContext(sectionproperties.cartBtnWidth),
                                                height: StyleParseToIntFuncContext(sectionproperties.cartBtnHeight),
                                                marginBottom: 'auto',
                                                flexDirection: 'row',
                                                marginStart: 'auto',
                                                backgroundColor: sectionproperties.cartBtnbgColor,
                                                borderRadius: StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true),
                                                borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth),
                                                borderColor: sectionproperties.cartbtnbordercolor,
                                            },
                                        ]}
                                        onPress={() => {
                                            setProductInfoIdContext(item.productid);
                                            routingcountext(StaticPagesLinksContext.ProductInfo);
                                        }}
                                    >
                                        {sectionproperties.carticonstyle == 'Shopping cart 1' && sectionproperties.cartBtn_iconFontSize != 0 && (
                                            <MaterialCommunityIcons
                                                name="cart-outline"
                                                size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                                style={{
                                                    color: sectionproperties.cart_iconcolor,
                                                }}
                                            />
                                        )}
                                        {sectionproperties.carticonstyle == 'Shopping cart 2' && sectionproperties.cartBtn_iconFontSize != 0 && (
                                            <Image
                                                source={icons.cart2}
                                                resizeMode="cover"
                                                style={{
                                                    width: StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize),
                                                    height: StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize),
                                                    tintColor: sectionproperties.cart_iconcolor,
                                                }}
                                            />
                                        )}
                                        {sectionproperties.carticonstyle == 'Shopping bag 1' && sectionproperties.cartBtn_iconFontSize != 0 && (
                                            <Feather
                                                name="shopping-bag"
                                                size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                                style={{
                                                    color: sectionproperties.cart_iconcolor,
                                                }}
                                            />
                                        )}
                                        {sectionproperties.carticonstyle == 'Shopping bag 2' && sectionproperties.cartBtn_iconFontSize != 0 && (
                                            <SimpleLineIcons
                                                name="handbag"
                                                size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                                style={{
                                                    color: sectionproperties.cart_iconcolor,
                                                }}
                                            />
                                        )}
                                        {sectionproperties.carticonstyle == 'Shopping bag 3' && sectionproperties.cartBtn_iconFontSize != 0 && (
                                            <FontAwesome5
                                                name="shopping-bag"
                                                size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                                style={{
                                                    color: sectionproperties.cart_iconcolor,
                                                }}
                                            />
                                        )}
                                        {sectionproperties.carticonstyle == 'Shopping bag 4' && sectionproperties.cartBtn_iconFontSize != 0 && (
                                            <SimpleLineIcons
                                                name="bag"
                                                size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                                style={{
                                                    color: sectionproperties.cart_iconcolor,
                                                }}
                                            />
                                        )}
                                        {sectionproperties.carticonstyle == 'Calendar 1' && sectionproperties.cartBtn_iconFontSize != 0 && (
                                            <AntDesign
                                                name="calendar"
                                                size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                                style={{
                                                    color: sectionproperties.cart_iconcolor,
                                                }}
                                            />
                                        )}
                                        {sectionproperties.cartbtnoverwritetext == 'No' && (
                                            <Text
                                                style={{
                                                    marginStart: sectionproperties.cartBtn_iconFontSize == 0 ? 0 : 10,
                                                    color: sectionproperties.cartBtnTextcolor,
                                                    fontFamily:
                                                        sectionproperties.cartBtnTextfontweight == 300
                                                            ? 'Poppins-Thin'
                                                            : sectionproperties.cartBtnTextfontweight == 400
                                                            ? 'Poppins-Light'
                                                            : sectionproperties.cartBtnTextfontweight == 500
                                                            ? 'Poppins-Regular'
                                                            : sectionproperties.cartBtnTextfontweight == 600
                                                            ? 'Poppins-Medium'
                                                            : sectionproperties.cartBtnTextfontweight == 700
                                                            ? 'Poppins-Semibold'
                                                            : 'Poppins-Bold',
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.cartBtnTextfontsize),
                                                    textTransform:
                                                        sectionproperties.cartBtnTexttransform == 'Uppercase'
                                                            ? 'uppercase'
                                                            : sectionproperties.cartBtnTexttransform == 'Capitalize'
                                                            ? 'capitalize'
                                                            : sectionproperties.cartBtnTexttransform == 'None'
                                                            ? 'none'
                                                            : 'lowercase',
                                                }}
                                            >
                                                {langdetect == 'en' ? item.productactionbuttontext_en : item.productactionbuttontext_ar}
                                            </Text>
                                        )}
                                        {sectionproperties.cartbtnoverwritetext == 'Yes' && (
                                            <Text
                                                style={{
                                                    marginStart: sectionproperties.cartBtn_iconFontSize == 0 ? 0 : 10,
                                                    color: sectionproperties.cartBtnTextcolor,
                                                    fontFamily:
                                                        sectionproperties.cartBtnTextfontweight == 300
                                                            ? 'Poppins-Thin'
                                                            : sectionproperties.cartBtnTextfontweight == 400
                                                            ? 'Poppins-Light'
                                                            : sectionproperties.cartBtnTextfontweight == 500
                                                            ? 'Poppins-Regular'
                                                            : sectionproperties.cartBtnTextfontweight == 600
                                                            ? 'Poppins-Medium'
                                                            : sectionproperties.cartBtnTextfontweight == 700
                                                            ? 'Poppins-Semibold'
                                                            : 'Poppins-Bold',
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.cartBtnTextfontsize),
                                                    textTransform:
                                                        sectionproperties.cartBtnTexttransform == 'Uppercase'
                                                            ? 'uppercase'
                                                            : sectionproperties.cartBtnTexttransform == 'Capitalize'
                                                            ? 'capitalize'
                                                            : sectionproperties.cartBtnTexttransform == 'None'
                                                            ? 'none'
                                                            : 'lowercase',
                                                }}
                                            >
                                                {langdetect == 'en' ? sectionproperties.cartBtnContentenglish : sectionproperties.cartBtnContentarabic}
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <View
            style={[
                generalstyles.container,
                {
                    height: '100%',
                    paddingTop: 0,
                    backgroundColor: sectionproperties.sectionbgcolor != null ? sectionproperties.sectionbgcolor : '',
                },
            ]}
        >
            {Object.keys(sectionproperties).length != 0 && (
                <SafeAreaView>
                    {!fetchFavoriteProductsQueryContext.isFetching && fetchFavoriteProductsQueryContext.isSuccess && (
                        <View>
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
                                            sectionproperties.sectionTitleMarginBottom != null && sectionproperties.sectionTitleMarginBottom != undefined
                                                ? sectionproperties.sectionTitleMarginBottom
                                                : 0,
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
                                        {fetchFavoriteProductsQueryContext.data.data.products.length}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            {fetchFavoriteProductsQueryContext.data.data.products.length != 0 && (
                                <View
                                    style={[
                                        {
                                            paddingLeft: sectionproperties.showcardsas == 'Cards' ? 0 : 15,
                                            paddingRight: sectionproperties.showcardsas == 'Cards' ? 0 : 15,
                                        },
                                    ]}
                                >
                                    {sectionproperties.showcardsas == 'Vertical' &&
                                        fetchFavoriteProductsQueryContext.data.data.products.map(function (item, index) {
                                            return <View>{WishListCard(item, index)}</View>;
                                        })}

                                    {sectionproperties.showcardsas == 'Cards' && (
                                        <FlatList
                                            horizontal={true}
                                            data={fetchFavoriteProductsQueryContext.data.data.products}
                                            showsHorizontalScrollIndicator={false}
                                            keyExtractor={(item) => item.id}
                                            renderItem={({ item, index }) => (
                                                <View
                                                    style={{
                                                        width: SIZES.width / 2 - 20,
                                                        marginHorizontal: 10,
                                                    }}
                                                >
                                                    {WishListCard(item, index, (type = 'Cards'))}
                                                </View>
                                            )}
                                        />
                                    )}
                                </View>
                            )}

                            {fetchFavoriteProductsQueryContext.data.data.products.length == 0 && (
                                <View style={{ height: 500, width: '100%', display: 'flex', alignItem: 'center', justifyContent: 'center' }}>
                                    <View style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                        {sectionproperties.noporudtcicontype == 'Shopping cart 1' && (
                                            <MaterialCommunityIcons
                                                name="cart-outline"
                                                size={StyleParseToIntFuncContext(sectionproperties.noprod_iconfontSize)}
                                                color={sectionproperties.noprod_iconfontSize}
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
                                                    tintColor: sectionproperties.noprod_iconfontSize,
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
                                        {sectionproperties.noporudtcicontype == 'Star' && (
                                            <AntDesign
                                                name="staro"
                                                size={StyleParseToIntFuncContext(sectionproperties.noprod_iconfontSize)}
                                                style={{
                                                    color: sectionproperties.noprod_iconcolor,
                                                }}
                                            />
                                        )}
                                        {sectionproperties.noporudtcicontype == 'Heart' && (
                                            <AntDesign
                                                name="hearto"
                                                size={StyleParseToIntFuncContext(sectionproperties.noprod_iconfontSize)}
                                                style={{
                                                    color: sectionproperties.noprod_iconcolor,
                                                }}
                                            />
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
                                    </View>
                                </View>
                            )}
                        </View>
                    )}
                </SafeAreaView>
            )}
        </View>
    );
};
const styles = StyleSheet.create({});

export default Wishlist;
