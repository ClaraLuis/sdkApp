import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { icons, SIZES } from '../../GeneralFiles/constants';
import { AntDesign, Feather, SimpleLineIcons, FontAwesome5, MaterialCommunityIcons } from 'react-native-vector-icons';
import { urlEndpoint } from '../../../../config/imagekit';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { useSelector } from 'react-redux';
import { Platform } from 'react-native';
import { ImageComponent } from '../../../ImageComponent';

const Elegantcard_cartbtninbottomofimage = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const { lang, langdetect } = useContext(LanguageContext);
    const { CurrentPageIdContext, StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { cardonclickfunctionContext, setProductInfoIdContext, addtofavoritescontext } = useContext(FetchingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [item, setitem] = useState(props.cardinfoitemprops);
    const [StatePageProperties, setStatePageProperties] = useState({});
    // useEffect(() => {
    //     StatePageProperties11.pages.forEach(function (item, index) {
    //         if (CurrentPageIdContext == item.pageid) {
    //             setStatePageProperties(item.pageobj);
    //         }
    //     });
    // }, [StatePageProperties11]);
    // useEffect(() => {
    //     var secpropobj = {};
    //     if (Object.keys(StatePageProperties).length != 0) {
    //         StatePageProperties.pageobj.sections.forEach(function (sectionitem, sectionindex) {
    //             if (sectionitem.sectionid == props.sectionidprops) {
    //                 sectionitem.sectionproperties.forEach(function (sectionpropertiesobj, sectionpropertiesindex) {
    //                     secpropobj[sectionpropertiesobj.property_css_name] = sectionpropertiesobj.property_value;
    //                 });
    //             }
    //         });
    //         setsectionproperties({ ...secpropobj });
    //     }
    // }, [StatePageProperties]);
    useEffect(() => {
        if (props?.sectionpropertiesProps != undefined) {
            var secpropobj = {};
            props?.sectionpropertiesProps?.forEach(function (sectionpropertiesobj, sectionpropertiesindex) {
                secpropobj[sectionpropertiesobj.property_css_name] = sectionpropertiesobj.property_value;
            });
            setsectionproperties({ ...secpropobj });
        }
    }, [props.sectionpropertiesProps]);

    useEffect(() => {
        if (props.cardinfoitemprops != undefined) {
            setitem(props.cardinfoitemprops);
        }
    }, [props.cardinfoitemprops]);
    const cardsrender = React.useMemo(() => {
        return (
            <View
                style={[
                    styles.mostPopularCard,
                    {
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom != null && sectionproperties.marginBottom != undefined ? sectionproperties.marginBottom : 0),
                        marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop != null && sectionproperties.marginTop != undefined ? sectionproperties.marginTop : 0),
                        marginStart: StyleParseToIntFuncContext(sectionproperties.card_marginLeft),
                        marginEnd: StyleParseToIntFuncContext(sectionproperties.card_marginRight),
                        width:
                            SIZES.width > 1024
                                ? SIZES.width / 5 - StyleParseToIntFuncContext(sectionproperties.card_marginLeft) - StyleParseToIntFuncContext(sectionproperties.card_marginRight)
                                : SIZES.width > 768
                                ? SIZES.width / 4 - StyleParseToIntFuncContext(sectionproperties.card_marginLeft) - StyleParseToIntFuncContext(sectionproperties.card_marginRight)
                                : props.sectiondirection == 'slider'
                                ? Platform.OS === 'ios'
                                    ? SIZES.width - 220
                                    : SIZES.width - 180
                                : SIZES.width / 2 - StyleParseToIntFuncContext(sectionproperties.card_marginLeft) - StyleParseToIntFuncContext(sectionproperties.card_marginRight),
                        backgroundColor: sectionproperties.backgroundColor,
                        paddingStart: StyleParseToIntFuncContext(sectionproperties.paddingLeft),
                        paddingEnd: StyleParseToIntFuncContext(sectionproperties.paddingRight),
                        paddingTop: StyleParseToIntFuncContext(sectionproperties.paddingTop),
                        paddingBottom: StyleParseToIntFuncContext(sectionproperties.paddingBottom),
                    },
                ]}
            >
                <View
                    style={[
                        styles.cardImageCont,
                        generalstyles.allcentered,
                        {
                            borderColor: sectionproperties.image_bordercolor,
                            borderWidth: StyleParseToIntFuncContext(sectionproperties.image_borderwidth, '', true),
                            backgroundColor: sectionproperties.image_bgcolor,
                            borderTopLeftRadius:
                                langdetect == 'en'
                                    ? StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true)
                                    : StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true),
                            borderTopRightRadius:
                                langdetect == 'en'
                                    ? StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true)
                                    : StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true),
                            borderBottomLeftRadius:
                                langdetect == 'en'
                                    ? StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true)
                                    : StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true),
                            borderBottomRightRadius:
                                langdetect == 'en'
                                    ? StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true)
                                    : StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true),
                            height: StyleParseToIntFuncContext(sectionproperties.image_height != null && sectionproperties.image_height != undefined ? sectionproperties.image_height : 0),
                        },
                    ]}
                >
                    <TouchableOpacity
                        style={{
                            width: '100%',
                            height: '100%',
                            borderTopLeftRadius:
                                langdetect == 'en'
                                    ? StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true)
                                    : StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true),
                            borderTopRightRadius:
                                langdetect == 'en'
                                    ? StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true)
                                    : StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true),
                            borderBottomLeftRadius:
                                langdetect == 'en'
                                    ? StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true)
                                    : StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true),
                            borderBottomRightRadius:
                                langdetect == 'en'
                                    ? StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true)
                                    : StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true),
                            overflow: 'hidden',
                        }}
                        onPress={() => {
                            cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                        }}
                    >
                        <ImageComponent
                            resizeMethod="resize"
                            path={'/tr:w-' + sectionproperties.imagetr_w + ',h-' + sectionproperties.imagetr_h + '/' + item.image}
                            // resizeMode="cover"
                            style={[
                                styles.cardImage,
                                {
                                    width: '100%',
                                    height: '100%',
                                    resizeMode: sectionproperties.bgcovercontain == 'Cover' ? 'cover' : 'contain',
                                    opacity:
                                        sectionproperties.showoutofstock == 'Show' && item.quantavailtype == 'limit' && item.currentquantity < 1 && item.hasvariants == 0
                                            ? StyleParseToIntFuncContext(sectionproperties.outofstockimageopcity)
                                            : 1,
                                },
                            ]}
                        />
                        {sectionproperties.showoutofstock == 'Show' && item.quantavailtype == 'limit' && item.hasvariants == 0 && item.currentquantity < 1 && (
                            <View
                                style={[
                                    generalstyles.allcentered,
                                    {
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute',
                                    },
                                ]}
                            >
                                <View
                                    style={[
                                        generalstyles.allcentered,
                                        {
                                            backgroundColor: sectionproperties.outstock_bg,
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.outstock_borderradius),
                                            width: StyleParseToIntFuncContext(sectionproperties.outstock_width),
                                            height: StyleParseToIntFuncContext(sectionproperties.outstock_height),
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            generalstyles.poppinsMedium,
                                            {
                                                color: sectionproperties.outstock_color,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.outstock_fontSize),
                                            },
                                        ]}
                                    >
                                        {langdetect == 'en' ? sectionproperties.outstock_contenten : sectionproperties.outstock_contentar}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>
                    {sectionproperties.favBtnShow == 'Show' && (
                        <TouchableOpacity
                            style={[
                                styles.addtowishlistbtn,
                                {
                                    backgroundColor: sectionproperties.favbtn_bgtransparent == 'Transparent' ? 'transparent' : sectionproperties.favBtnbgColor,
                                    shadowColor: sectionproperties.favbtn_shadowcolor,
                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.fav_btn_borderBottomLeftRadius, '', true),
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.favbtnborderwidth, '', true),
                                    borderColor: sectionproperties.favbtnbordercolor,
                                },
                            ]}
                            onPress={() => {
                                addtofavoritescontext(item.productid);
                            }}
                        >
                            {sectionproperties.faviconshape == 'Star Shape' && (
                                <View>
                                    {!item.IsFavExists && (
                                        <AntDesign
                                            name="staro"
                                            size={StyleParseToIntFuncContext(sectionproperties.favBtnIconfontsize)}
                                            style={{
                                                color: sectionproperties.favBtniconcolor,
                                            }}
                                        />
                                    )}
                                    {item.IsFavExists && (
                                        <AntDesign
                                            name="star"
                                            size={StyleParseToIntFuncContext(sectionproperties.favBtnIconfontsize)}
                                            style={{
                                                color: sectionproperties.activefaviconcolor,
                                            }}
                                        />
                                    )}
                                </View>
                            )}
                            {sectionproperties.faviconshape == 'Heart Shape' && (
                                <View>
                                    {!item.IsFavExists && (
                                        <AntDesign
                                            name="hearto"
                                            size={StyleParseToIntFuncContext(sectionproperties.favBtnIconfontsize)}
                                            style={{
                                                color: sectionproperties.favBtniconcolor,
                                            }}
                                        />
                                    )}
                                    {item.IsFavExists && (
                                        <AntDesign
                                            name="heart"
                                            size={StyleParseToIntFuncContext(sectionproperties.favBtnIconfontsize)}
                                            style={{
                                                color: sectionproperties.activefaviconcolor,
                                            }}
                                        />
                                    )}
                                </View>
                            )}
                        </TouchableOpacity>
                    )}
                    {sectionproperties.showbadge == 'Show' && item.hassale != 0 && (
                        <View
                            style={[
                                styles.hassalestyles,
                                {
                                    width: StyleParseToIntFuncContext(sectionproperties.badge_width),
                                    height: StyleParseToIntFuncContext(sectionproperties.badge_height),
                                    backgroundColor: sectionproperties.badge_bgcolor,
                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.badge_borderradius),
                                    top: StyleParseToIntFuncContext(sectionproperties.badge_top),
                                    left: StyleParseToIntFuncContext(sectionproperties.badge_right),
                                },
                            ]}
                        >
                            <Text style={[generalstyles.poppinsMedium, { color: sectionproperties.badge_color, fontSize: StyleParseToIntFuncContext(sectionproperties.badge_fontsize) }]}>
                                {langdetect == 'en' ? sectionproperties.badgeContentEn : sectionproperties.badgeContentAr}
                            </Text>
                        </View>
                    )}
                    {sectionproperties.showpill == 'Show' && item.hassale == 1 && (
                        <View
                            style={[
                                generalstyles.allcentered,
                                {
                                    position: 'absolute',
                                    top: StyleParseToIntFuncContext(sectionproperties.pillpositionfromtop),
                                    left: StyleParseToIntFuncContext(sectionproperties.pillpositionfromright),
                                    width: StyleParseToIntFuncContext(sectionproperties.pillwidth),
                                    height: StyleParseToIntFuncContext(sectionproperties.pillheight),
                                    backgroundColor: sectionproperties.pillbgcolor,
                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.pillborderBottomLeftRadius),
                                },
                            ]}
                        >
                            <Text style={[generalstyles.poppinsMedium, { color: sectionproperties.pillcolor, fontSize: StyleParseToIntFuncContext(sectionproperties.pillfontSize), direction: 'ltr' }]}>
                                {'-' + parseFloat(Math.round(10.0 * ((parseInt(item.defaultprice) - parseInt(item.defaultsaleprice)) / parseInt(item.defaultprice)) * 100) / 10.0).toFixed(0) + '%'}{' '}
                            </Text>
                        </View>
                    )}
                    {/* <View style={[generalstyles.flexColumn, { position: 'absolute', top: 10, right: 10 }]}>
                    <View style={{ width: 20, height: 20, borderRadius: 100, backgroundColor: 'red', marginBottom: -10 }}></View>
                    <View style={{ width: 20, height: 20, borderRadius: 100, backgroundColor: 'blue', marginBottom: -10 }}></View>
                    <View style={{ width: 20, height: 20, borderRadius: 100, backgroundColor: 'green', marginBottom: -10 }}></View>
                </View> */}
                </View>
                <View style={[generalstyles.allcentered]}>
                    {sectionproperties.cartBtnShow == 'Show' && (
                        <TouchableOpacity
                            style={[
                                styles.addtocartbtn,
                                {
                                    width: StyleParseToIntFuncContext(sectionproperties.cartBtnWidth != undefined && sectionproperties.cartBtnWidth != null ? sectionproperties.cartBtnWidth : 40),
                                    height: StyleParseToIntFuncContext(sectionproperties.cartBtnHeight != undefined && sectionproperties.cartBtnHeight != null ? sectionproperties.cartBtnHeight : 40),
                                    backgroundColor: sectionproperties.cartBtnbgColor,
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth, '', true),
                                    borderColor: sectionproperties.cartbtnbordercolor,
                                    backgroundColor: sectionproperties.cartBtnbgColor,
                                    shadowColor: sectionproperties.cartbtn_shadowcolor,
                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true),
                                },
                            ]}
                            onPress={() => {
                                cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                            }}
                        >
                            {sectionproperties.carticonstyle == 'Shopping cart 1' && (
                                <MaterialCommunityIcons name="cart-outline" size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)} color={sectionproperties.cart_iconcolor} />
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
                            {sectionproperties.carticonstyle == 'Shopping cart 2' && (
                                <Image
                                    source={icons.cart2}
                                    resizeMode="cover"
                                    style={{
                                        width: StyleParseToIntFuncContext(
                                            sectionproperties.cartBtn_iconFontSize != null && sectionproperties.cartBtn_iconFontSize != undefined ? sectionproperties.cartBtn_iconFontSize : 0,
                                        ),
                                        height: StyleParseToIntFuncContext(
                                            sectionproperties.cartBtn_iconFontSize != null && sectionproperties.cartBtn_iconFontSize != undefined ? sectionproperties.cartBtn_iconFontSize : 0,
                                        ),
                                        tintColor: sectionproperties.cart_iconcolor,
                                    }}
                                />
                            )}
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.cardDescription}>
                    {sectionproperties.prodNameShow == 'Show' && sectionproperties.wordbreak == '2' && (
                        <Text
                            ellipsizeMode="tail"
                            numberOfLines={2}
                            style={[
                                {
                                    minHeight: 35,
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
                                            : sectionproperties.prodNameTextTranform == 'Lowercase'
                                            ? 'lowercase'
                                            : 'none',
                                    textAlign: sectionproperties.productnamecentered == 'Centered' ? 'center' : 'left',
                                    width: '100%',
                                },
                            ]}
                            onPress={() => {
                                cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                            }}
                        >
                            {item.name}
                        </Text>
                    )}
                    {sectionproperties.prodNameShow == 'Show' && sectionproperties.wordbreak == '1' && (
                        <Text
                            ellipsizeMode="tail"
                            numberOfLines={1}
                            style={[
                                {
                                    width: '100%',
                                    marginBottom: 5,
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
                                            : sectionproperties.prodNameTextTranform == 'Lowercase'
                                            ? 'lowercase'
                                            : 'none',
                                    textAlign: sectionproperties.productnamecentered == 'Centered' ? 'center' : 'left',
                                },
                            ]}
                            onPress={() => {
                                cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                            }}
                        >
                            {item.name}
                        </Text>
                    )}
                    <View
                        style={[
                            generalstyles.flexColumn,
                            {
                                width: '100%',
                            },
                        ]}
                    >
                        {sectionproperties.prodPriceShow == 'Show' && (
                            <Text
                                style={{
                                    width: '100%',
                                    textAlign: sectionproperties.productnamecentered == 'Centered' ? 'center' : 'left',
                                    color: sectionproperties.prodPriceColor,
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.prodpriceFontSize),
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
                                }}
                            >
                                {langdetect == 'en' ? item.currencyname : ''} {item.hassale == 1 ? item.defaultsaleprice : item.defaultprice} {langdetect == 'en' ? '' : item.currencyname}
                            </Text>
                        )}
                        {sectionproperties.prodsalePriceshow == 'Show' && item.hassale == 1 && (
                            <Text
                                style={{
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
                                    width: '100%',
                                    textAlign: sectionproperties.productnamecentered == 'Centered' ? 'center' : 'left',
                                }}
                            >
                                {langdetect == 'en' ? item.currencyname : ''} {item.defaultprice} {langdetect == 'en' ? '' : item.currencyname}
                            </Text>
                        )}
                        {sectionproperties.showprofitcontainer == 'Show' && (
                            <View style={{ width: '100%', marginTop: 5 }}>
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        width: StyleParseToIntFuncContext(sectionproperties.profitcontainerwidth),
                                        height: StyleParseToIntFuncContext(sectionproperties.profitcontainerheight),
                                        backgroundColor: sectionproperties.profitcontainerbgcolor,
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.profitcontainerborderradius),
                                        borderColor: sectionproperties.profitcontainerbordercolor,
                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.profitcontainerborderwidth, '', true),
                                        borderStyle: 'dashed',
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: sectionproperties.profitcontainercolor,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.profitcontainerfontsize),
                                            fontFamily:
                                                sectionproperties.profitcontainerfontweight == 300
                                                    ? 'Poppins-Thin'
                                                    : sectionproperties.profitcontainerfontweight == 400
                                                    ? 'Poppins-Light'
                                                    : sectionproperties.profitcontainerfontweight == 500
                                                    ? 'Poppins-Regular'
                                                    : sectionproperties.profitcontainerfontweight == 600
                                                    ? 'Poppins-Medium'
                                                    : sectionproperties.profitcontainerfontweight == 700
                                                    ? 'Poppins-Semibold'
                                                    : 'Poppins-Bold',
                                            textDecorationStyle: 'solid',
                                            textAlign: sectionproperties.productnamecentered == 'Centered' ? 'center' : 'left',
                                        }}
                                    >
                                        {langdetect == 'en' ? sectionproperties.profitcontainercontenten : sectionproperties.profitcontainercontentar}:{' '}
                                    </Text>
                                    <Text
                                        style={{
                                            color: sectionproperties.profitcontainercolor,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.profitcontainerfontsize),
                                            fontFamily:
                                                sectionproperties.profitcontainersecondaryfontweight == 300
                                                    ? 'Poppins-Thin'
                                                    : sectionproperties.profitcontainersecondaryfontweight == 400
                                                    ? 'Poppins-Light'
                                                    : sectionproperties.profitcontainersecondaryfontweight == 500
                                                    ? 'Poppins-Regular'
                                                    : sectionproperties.profitcontainersecondaryfontweight == 600
                                                    ? 'Poppins-Medium'
                                                    : sectionproperties.profitcontainersecondaryfontweight == 700
                                                    ? 'Poppins-Semibold'
                                                    : 'Poppins-Bold',
                                            textDecorationStyle: 'solid',
                                            textAlign: sectionproperties.productnamecentered == 'Centered' ? 'center' : 'left',
                                        }}
                                    >
                                        {langdetect == 'en' ? item.currencyname : ''}{' '}
                                        {parseFloat(Math.round(parseInt(item.hassale == 1 ? item.defaultsaleprice : item.defaultprice) * (item.prodaffpercentprofit / 100))).toFixed(0)}{' '}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        );
    }, [sectionproperties, item.productid, item.quantity]);
    return cardsrender;
};
export default Elegantcard_cartbtninbottomofimage;
const styles = StyleSheet.create({
    mostPopularCard: {
        flex: 1,
        alignItems: 'center',
        // marginEnd: 5,
        // marginStart: 5,
    },
    cardImageCont: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    cardDescription: {
        flexDirection: 'column',
        marginTop: 17,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingStart: 5,
        paddingEnd: 5,
    },
    addtocartbtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: -15,
    },
    addtowishlistbtn: {
        position: 'absolute',
        top: 7,
        right: 7,
        width: 30,
        height: 30,
        borderRadius: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    hassalestyles: {
        position: 'absolute',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
