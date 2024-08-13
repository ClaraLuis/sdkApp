import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { icons, SIZES } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { urlEndpoint } from '../../../../config/imagekit';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { AntDesign, Feather, SimpleLineIcons, FontAwesome5, MaterialCommunityIcons } from 'react-native-vector-icons';
import { BlurView } from 'expo-blur';
import ViewMoreText from 'react-native-view-more-text';
import clip from 'text-clipper';
import { useSelector } from 'react-redux';
import { ImageComponent } from '../../../ImageComponent';

const ProductCardWithBlurEffect = (props) => {
    const { lang, langdetect } = useContext(LanguageContext);
    const { CurrentPageIdContext, StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { cardonclickfunctionContext, addtofavoritescontext } = useContext(FetchingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [item, setitem] = useState(props.cardinfoitemprops);
    const [index, setindex] = useState(props.cardinfoindexprops);
    const imageurlgrouper = () => {
        var imageurl = '/tr:w-' + sectionproperties.imagetr_w + ',h-' + sectionproperties.imagetr_h;
        if (sectionproperties.cm_pad_resize == 'Yes') {
            imageurl = imageurl + ',cm-pad_resize';
        }
        imageurl = imageurl + '/' + item.image;
        return imageurl;
    };
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
            <TouchableOpacity
                style={{
                    height: StyleParseToIntFuncContext(sectionproperties.height),
                    marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom != null && sectionproperties.marginBottom != undefined ? sectionproperties.marginBottom : 0),
                    marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop != null && sectionproperties.marginTop != undefined ? sectionproperties.marginTop : 0),
                    backgroundColor: sectionproperties.backgroundColor,
                    borderWidth: StyleParseToIntFuncContext(sectionproperties.sectioncardborderwidth, '', true),
                    borderColor: sectionproperties.sectioncardbordercolor,
                    marginStart: StyleParseToIntFuncContext(sectionproperties.card_marginLeft != null && sectionproperties.card_marginLeft != undefined ? sectionproperties.card_marginLeft : 0),
                    marginEnd: StyleParseToIntFuncContext(sectionproperties.card_marginRight != null && sectionproperties.card_marginRight != undefined ? sectionproperties.card_marginRight : 0),
                    paddingEnd: StyleParseToIntFuncContext(sectionproperties.paddingRight != null && sectionproperties.paddingRight != undefined ? sectionproperties.paddingRight : 0),
                    paddingBottom: StyleParseToIntFuncContext(sectionproperties.paddingBottom != null && sectionproperties.paddingBottom != undefined ? sectionproperties.paddingBottom : 0),
                    paddingTop: StyleParseToIntFuncContext(sectionproperties.paddingTop != null && sectionproperties.paddingTop != undefined ? sectionproperties.paddingTop : 0),
                    paddingStart: StyleParseToIntFuncContext(sectionproperties.paddingLeft != null && sectionproperties.paddingLeft != undefined ? sectionproperties.paddingLeft : 0),
                    width:
                        props.sectiondirection != 'slider'
                            ? SIZES.width > 1024
                                ? SIZES.width / 4 - 20
                                : SIZES.width > 768
                                ? SIZES.width / 3 - 20
                                : SIZES.width - 30
                            : SIZES.width > 1024
                            ? SIZES.width / 5
                            : SIZES.width > 768
                            ? SIZES.width / 4
                            : SIZES.width - 150,
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
                }}
                onPress={() => {
                    cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                }}
            >
                <View
                    style={{
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
                        borderColor: sectionproperties.image_bordercolor,
                        borderWidth: StyleParseToIntFuncContext(sectionproperties.image_borderwidth, '', true),
                        overflow: 'hidden',
                    }}
                >
                    <ImageComponent
                        resizeMethod="resize"
                        path={imageurlgrouper()}
                        style={{
                            width: '100%',
                            height: '100%',
                            marginBottom: StyleParseToIntFuncContext(sectionproperties.image_mb != null && sectionproperties.image_mb != undefined ? sectionproperties.image_mb : 0),
                            resizeMode: sectionproperties.bgcovercontain == 'Cover' ? 'cover' : 'contain',
                        }}
                    />
                    {item.hassale != 0 && sectionproperties.showbadge == 'Show' && (
                        <View
                            style={[
                                styles.hassalestyles,
                                {
                                    width: StyleParseToIntFuncContext(sectionproperties.badge_width),
                                    height: StyleParseToIntFuncContext(sectionproperties.badge_height),
                                    backgroundColor: sectionproperties.badge_bgcolor,
                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.badge_borderradius),
                                },
                            ]}
                        >
                            <Text style={[generalstyles.poppinsMedium, { color: sectionproperties.badge_color, fontSize: StyleParseToIntFuncContext(sectionproperties.badge_fontsize) }]}>
                                {langdetect == 'en' ? sectionproperties.badgeContentEn : sectionproperties.badgeContentAr}
                            </Text>
                        </View>
                    )}
                    {sectionproperties.prodPriceShow == 'Show' && (
                        <View style={{ position: 'absolute', right: 10, top: 10 }}>
                            <View
                                style={{
                                    backgroundColor: sectionproperties.pricesection_bgcolor,
                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.pricesection_borderBottomLeftRadius),
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.pricesection_borderwidth),
                                    borderColor: sectionproperties.pricesection_bordercolor,
                                    paddingVertical: 7,
                                    paddingHorizontal: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    style={{
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
                                    {langdetect == 'en' ? item.currencyname : ''} {item.hassale != 0 ? item.defaultsaleprice : item.defaultprice} {langdetect == 'en' ? '' : item.currencyname}
                                </Text>
                            </View>
                        </View>
                    )}
                    <View
                        style={{
                            position: 'absolute',
                            overflow: 'hidden',
                            width: '95%',
                            bottom: 5,
                            left: 10,
                            right: 10,
                            marginLeft: 'auto',
                            borderRadius: StyleParseToIntFuncContext(sectionproperties.reservation_borderradius),
                            display:
                                sectionproperties.prodNameShow == 'Hide' && sectionproperties.prodCatShow == 'Hide' && sectionproperties.favBtnShow == 'Hide' && sectionproperties.cartBtnShow == 'Hide'
                                    ? 'none'
                                    : 'flex',
                        }}
                    >
                        <BlurView
                            // tint="#000000"
                            // intensity={StyleParseToIntFuncContext(sectionproperties.innersectionintensity)}
                            intensity={200}
                            style={{
                                width: '100%',
                                paddingTop: StyleParseToIntFuncContext(sectionproperties.reservation_padding_top),
                                paddingBottom: StyleParseToIntFuncContext(sectionproperties.reservation_padding_top),
                                paddingLeft:
                                    langdetect == 'en'
                                        ? StyleParseToIntFuncContext(sectionproperties.reservation_padding_left)
                                        : StyleParseToIntFuncContext(sectionproperties.reservation_padding_right),
                                paddingRight:
                                    langdetect == 'en'
                                        ? StyleParseToIntFuncContext(sectionproperties.reservation_padding_right)
                                        : StyleParseToIntFuncContext(sectionproperties.reservation_padding_left),
                            }}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'column', alignItems: 'center', flex: 1, justifyContent: 'flex-start', justifyContent: 'center' }}>
                                    {sectionproperties.prodNameShow == 'Show' && (
                                        <Text
                                            style={{
                                                width: '100%',
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
                                                    sectionproperties.prodNameTextTranform == 'Uppercase'
                                                        ? 'uppercase'
                                                        : sectionproperties.prodNameTextTranform == 'Capitalize'
                                                        ? 'capitalize'
                                                        : sectionproperties.prodNameTextTranform == 'None'
                                                        ? 'none'
                                                        : 'lowercase',
                                            }}
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >
                                            {item.name}
                                        </Text>
                                    )}
                                    {sectionproperties.prodCatShow == 'Show' && (
                                        <View style={{ width: '100%' }}>
                                            <ViewMoreText
                                                renderViewMore={(onPress) => {
                                                    return (
                                                        <Text
                                                            onPress={onPress}
                                                            style={[
                                                                generalstyles.primaryMedium,
                                                                {
                                                                    textDecorationLine: 'underline',
                                                                    textAlign: 'left',
                                                                },
                                                            ]}
                                                        >
                                                            {lang.viewmore}
                                                        </Text>
                                                    );
                                                }}
                                                renderViewLess={(onPress) => {
                                                    return (
                                                        <Text
                                                            onPress={onPress}
                                                            style={[
                                                                generalstyles.primaryMedium,
                                                                {
                                                                    textDecorationLine: 'underline',
                                                                    textAlign: 'left',
                                                                },
                                                            ]}
                                                        >
                                                            {lang.viewless}
                                                        </Text>
                                                    );
                                                }}
                                                textStyle={{
                                                    color: sectionproperties.prodCatColor,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.prodCatFontSize),
                                                    fontFamily:
                                                        sectionproperties.prodCatFontWeight == 300
                                                            ? 'Poppins-Thin'
                                                            : sectionproperties.prodCatFontWeight == 400
                                                            ? 'Poppins-Light'
                                                            : sectionproperties.prodCatFontWeight == 500
                                                            ? 'Poppins-Regular'
                                                            : sectionproperties.prodCatFontWeight == 600
                                                            ? 'Poppins-Medium'
                                                            : sectionproperties.prodCatFontWeight == 700
                                                            ? 'Poppins-Semibold'
                                                            : 'Poppins-Bold',
                                                    // backgroundColor: 'red',
                                                    textAlign: 'left',
                                                }}
                                            >
                                                {clip(langdetect == 'en' ? item.description_en : item.description_ar, 37, { html: true, stripTags: true, maxLines: 2 })}
                                            </ViewMoreText>
                                        </View>
                                    )}
                                </View>

                                <View style={{ marginStart: 'auto', flexDirection: 'row', alignItems: 'center' }}>
                                    {sectionproperties.favBtnShow == 'Show' && (
                                        <TouchableOpacity
                                            style={[
                                                generalstyles.allcentered,
                                                {
                                                    width: StyleParseToIntFuncContext(
                                                        sectionproperties.favBtnWidth != null && sectionproperties.favBtnWidth != undefined ? sectionproperties.favBtnWidth : 33,
                                                    ),
                                                    height: StyleParseToIntFuncContext(
                                                        sectionproperties.favBtnHeight != null && sectionproperties.favBtnHeight != undefined ? sectionproperties.favBtnHeight : 33,
                                                    ),
                                                    backgroundColor:
                                                        item.IsFavExists == false
                                                            ? sectionproperties.favbtn_bgtransparent == 'Transparent'
                                                                ? 'transparent'
                                                                : sectionproperties.favBtnbgColor
                                                            : sectionproperties.activebgcolor,
                                                    borderColor: sectionproperties.favbtnbordercolor,
                                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.favbtnborderwidth, '', true),
                                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.fav_btn_borderBottomLeftRadius),
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
                                    {sectionproperties.cartBtnShow == 'Show' && (
                                        <TouchableOpacity
                                            style={[
                                                generalstyles.allcentered,
                                                {
                                                    width: StyleParseToIntFuncContext(
                                                        sectionproperties.cartBtnWidth != null && sectionproperties.cartBtnWidth != undefined ? sectionproperties.cartBtnWidth : 33,
                                                    ),
                                                    height: StyleParseToIntFuncContext(
                                                        sectionproperties.cartBtnHeight != null && sectionproperties.cartBtnHeight != undefined ? sectionproperties.cartBtnHeight : 33,
                                                    ),
                                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true),
                                                    borderColor: sectionproperties.cartbtnbordercolor,
                                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth, '', true),
                                                    backgroundColor: sectionproperties.cartbtn_bgtransparent == 'Transparent' ? 'transparent' : sectionproperties.cartBtnbgColor,
                                                },
                                            ]}
                                            onPress={() => {
                                                cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                                            }}
                                        >
                                            {sectionproperties.carticonstyle == 'Shopping cart 1' && (
                                                <MaterialCommunityIcons
                                                    name="cart-outline"
                                                    size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                                    color={sectionproperties.cart_iconcolor}
                                                    style={{
                                                        color: sectionproperties.cart_iconcolor,
                                                        paddingStart: Platform.OS === 'ios' ? 1 : 0,
                                                    }}
                                                />
                                            )}
                                            {sectionproperties.carticonstyle == 'Shopping bag 1' && (
                                                <Feather
                                                    name="shopping-bag"
                                                    size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                                    style={{
                                                        color: sectionproperties.cart_iconcolor,
                                                        paddingStart: Platform.OS === 'ios' ? 1 : 0,
                                                        paddingTop: Platform.OS === 'ios' ? 1 : 0,
                                                    }}
                                                />
                                            )}
                                            {sectionproperties.carticonstyle == 'Shopping bag 2' && (
                                                <SimpleLineIcons
                                                    name="handbag"
                                                    size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                                    style={{
                                                        color: sectionproperties.cart_iconcolor,
                                                        paddingStart: Platform.OS === 'ios' ? 1 : 0,
                                                    }}
                                                />
                                            )}
                                            {sectionproperties.carticonstyle == 'Shopping bag 3' && (
                                                <FontAwesome5
                                                    name="shopping-bag"
                                                    size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                                    style={{
                                                        color: sectionproperties.cart_iconcolor,
                                                        paddingStart: Platform.OS === 'ios' ? 1 : 0,
                                                        paddingTop: Platform.OS === 'ios' ? 1 : 0,
                                                    }}
                                                />
                                            )}
                                            {sectionproperties.carticonstyle == 'Shopping bag 4' && (
                                                <SimpleLineIcons
                                                    name="bag"
                                                    size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                                    style={{
                                                        color: sectionproperties.cart_iconcolor,
                                                        paddingStart: Platform.OS === 'ios' ? 1 : 0,
                                                        paddingTop: Platform.OS === 'ios' ? 1 : 0,
                                                    }}
                                                />
                                            )}
                                            {sectionproperties.carticonstyle == 'Shopping cart 2' && (
                                                <Image
                                                    source={icons.cart2}
                                                    resizeMode="cover"
                                                    style={{
                                                        width: StyleParseToIntFuncContext(
                                                            sectionproperties.cartBtn_iconFontSize != null && sectionproperties.cartBtn_iconFontSize != undefined
                                                                ? sectionproperties.cartBtn_iconFontSize
                                                                : 0,
                                                        ),
                                                        height: StyleParseToIntFuncContext(
                                                            sectionproperties.cartBtn_iconFontSize != null && sectionproperties.cartBtn_iconFontSize != undefined
                                                                ? sectionproperties.cartBtn_iconFontSize
                                                                : 0,
                                                        ),
                                                        tintColor: sectionproperties.cart_iconcolor,
                                                    }}
                                                />
                                            )}
                                            {sectionproperties.carticonstyle == 'Calendar 1' && (
                                                <AntDesign
                                                    name="calendar"
                                                    size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                                    style={{
                                                        color: sectionproperties.cart_iconcolor,
                                                        paddingStart: Platform.OS === 'ios' ? 1 : 0,
                                                        paddingTop: Platform.OS === 'ios' ? 1 : 0,
                                                    }}
                                                />
                                            )}
                                            {sectionproperties.carticonstyle == 'Arrow' && (
                                                <Feather
                                                    name={langdetect == 'en' ? 'arrow-up-right' : 'arrow-up-left'}
                                                    size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                                    style={{
                                                        color: sectionproperties.cart_iconcolor,
                                                        paddingStart: Platform.OS === 'ios' ? 1 : 0,
                                                        paddingBottom: Platform.OS === 'ios' ? 1 : 0,
                                                    }}
                                                />
                                            )}
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        </BlurView>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }, [sectionproperties, item.productid, item.quantity]);
    return cardsrender;
};
export default ProductCardWithBlurEffect;
const styles = StyleSheet.create({
    hassalestyles: {
        position: 'absolute',
        top: 10,
        left: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    productsCard: {
        alignItems: 'center',
    },
    bttn: {
        alignItems: 'center',
    },
});
