import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { icons, SIZES } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { urlEndpoint } from '../../../../config/imagekit';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { AntDesign, Feather, SimpleLineIcons, FontAwesome5, MaterialCommunityIcons } from 'react-native-vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { ImageComponent } from '../../../ImageComponent';

const CardWithImageOnTop_moderncard = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const { langdetect } = useContext(LanguageContext);
    const { CurrentPageIdContext, StyleParseToIntFuncContext, ProjectOpenrcTypeContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { cardonclickfunctionContext, setProductInfoIdContext, addtofavoritescontext } = useContext(FetchingContext);
    const { routingcountext, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [item, setitem] = useState(props.cardinfoitemprops);
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
    const imageurlgrouper = () => {
        var imageurl = '/tr:w-' + sectionproperties.imagetr_w + ',h-' + sectionproperties.imagetr_h;
        if (sectionproperties.cm_pad_resize == 'Yes') {
            imageurl = imageurl + ',cm-pad_resize';
        }
        imageurl = imageurl + '/' + item.image;
        return imageurl;
    };
    const cardsrender = React.useMemo(() => {
        return (
            <TouchableOpacity
                style={[generalstyles.allcentered, { marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom) }]}
                onPress={() => {
                    cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                }}
            >
                <View
                    style={[
                        styles.productsCard,
                        {
                            width:
                                props.sectiondirection != 'slider'
                                    ? SIZES.width > 1024
                                        ? SIZES.width / 5 - StyleParseToIntFuncContext(sectionproperties.card_marginRight) - StyleParseToIntFuncContext(sectionproperties.card_marginLeft)
                                        : SIZES.width > 768
                                        ? SIZES.width / 4 - StyleParseToIntFuncContext(sectionproperties.card_marginRight) - StyleParseToIntFuncContext(sectionproperties.card_marginLeft)
                                        : // : SIZES.width / 2 - 50
                                          SIZES.width / 2 - StyleParseToIntFuncContext(sectionproperties.card_marginRight) - StyleParseToIntFuncContext(sectionproperties.card_marginLeft)
                                    : SIZES.width > 1024
                                    ? SIZES.width / 5 - StyleParseToIntFuncContext(sectionproperties.card_marginRight) - StyleParseToIntFuncContext(sectionproperties.card_marginLeft)
                                    : SIZES.width > 768
                                    ? SIZES.width / 4 - StyleParseToIntFuncContext(sectionproperties.card_marginRight) - StyleParseToIntFuncContext(sectionproperties.card_marginLeft)
                                    : Platform.OS === 'ios'
                                    ? SIZES.width - 270
                                    : SIZES.width - 200,
                            // width:
                            // props.sectiondirection != 'slider'
                            //     ? SIZES.width > 1024
                            //         ? SIZES.width / 5 - StyleParseToIntFuncContext(sectionproperties.card_marginRight) - StyleParseToIntFuncContext(sectionproperties.card_marginLeft)
                            //         : SIZES.width > 768
                            //         ? SIZES.width / 4 - StyleParseToIntFuncContext(sectionproperties.card_marginRight) - StyleParseToIntFuncContext(sectionproperties.card_marginLeft)
                            //         : SIZES.width / 2 - 20
                            //     : SIZES.width > 1024
                            //     ? SIZES.width / 5 - StyleParseToIntFuncContext(sectionproperties.card_marginRight) - StyleParseToIntFuncContext(sectionproperties.card_marginLeft)
                            //     : SIZES.width > 768
                            //     ? SIZES.width / 4 - StyleParseToIntFuncContext(sectionproperties.card_marginRight) - StyleParseToIntFuncContext(sectionproperties.card_marginLeft)
                            //     : Platform.OS === 'ios'
                            //     ? SIZES.width - 200
                            //     : SIZES.width - 200,
                            backgroundColor: sectionproperties.backgroundColor,
                            borderTopLeftRadius:
                                langdetect == 'en'
                                    ? StyleParseToIntFuncContext(sectionproperties.borderTopLeftRadius, '', true)
                                    : StyleParseToIntFuncContext(sectionproperties.borderTopRightRadius, '', true),
                            borderTopRightRadius:
                                langdetect == 'en'
                                    ? StyleParseToIntFuncContext(sectionproperties.borderTopRightRadius, '', true)
                                    : StyleParseToIntFuncContext(sectionproperties.borderTopLeftRadius, '', true),
                            borderBottomLeftRadius:
                                langdetect == 'en'
                                    ? StyleParseToIntFuncContext(sectionproperties.borderBottomLeftRadius, '', true)
                                    : StyleParseToIntFuncContext(sectionproperties.borderBottomRightRadius, '', true),
                            borderBottomRightRadius:
                                langdetect == 'en'
                                    ? StyleParseToIntFuncContext(sectionproperties.borderBottomRightRadius, '', true)
                                    : StyleParseToIntFuncContext(sectionproperties.borderBottomLeftRadius, '', true),
                            borderWidth: StyleParseToIntFuncContext(sectionproperties.sectioncardborderwidth, '', true),
                            borderColor: sectionproperties.sectioncardbordercolor,
                            marginEnd: StyleParseToIntFuncContext(
                                sectionproperties.card_marginRight != null && sectionproperties.card_marginRight != undefined ? sectionproperties.card_marginRight : 10,
                            ),
                            marginStart: StyleParseToIntFuncContext(
                                sectionproperties.card_marginLeft != null && sectionproperties.card_marginLeft != undefined ? sectionproperties.card_marginLeft : 10,
                            ),
                            position: 'relative',
                            paddingBottom: StyleParseToIntFuncContext(sectionproperties.paddingBottom),
                        },
                    ]}
                >
                    {sectionproperties.showbadge == 'Show' && item.hassale != 0 && (
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
                    <View
                        style={[
                            styles.productsCardImageCont,
                            {
                                width: 100,
                                height: 100,
                                borderColor: sectionproperties.image_bordercolor,
                                borderWidth: StyleParseToIntFuncContext(sectionproperties.image_borderwidth, '', true),
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
                                backgroundColor: sectionproperties.image_bgcolor,
                            },
                        ]}
                    >
                        <ImageComponent
                            path={imageurlgrouper()}
                            resizeMode={sectionproperties.bgcovercontain == 'Cover' ? 'cover' : 'contain'}
                            style={[
                                styles.productsCardImage,
                                {
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
                                    resizeMode: sectionproperties.bgcovercontain == 'Cover' ? 'cover' : 'contain',
                                },
                            ]}
                        />
                    </View>

                    {sectionproperties.favBtnShow == 'Show' && (
                        <TouchableOpacity
                            style={[
                                styles.addtowishlistbtn,
                                {
                                    width: StyleParseToIntFuncContext(sectionproperties.favBtnWidth),
                                    height: StyleParseToIntFuncContext(sectionproperties.favBtnHeight),
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

                    <View style={styles.productsCardDesc}>
                        {sectionproperties.prodNameShow == 'Show' && (
                            <Text
                                style={{
                                    minHeight: 35,
                                    textAlign: 'center',
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
                                    marginBottom: 2,
                                }}
                                numberOfLines={2}
                                ellipsizeMode="tail"
                            >
                                {item.name}
                            </Text>
                        )}
                    </View>
                    {item.defaultsaleprice != 0 && (
                        <View style={[generalstyles.flexRow]}>
                            {sectionproperties.prodPriceShow == 'Show' && (
                                <Text
                                    style={{
                                        marginEnd: 2,
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
                            )}
                            {sectionproperties.prodsalePriceshow == 'Show' && item.hassale != 0 && (
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
                                    }}
                                >
                                    {langdetect == 'en' ? item.currencyname : ''} {item.defaultprice} {langdetect == 'en' ? '' : item.currencyname}
                                </Text>
                            )}
                        </View>
                    )}
                    {item.defaultsaleprice == 0 && (
                        <View style={[generalstyles.flexRow]}>
                            {sectionproperties.prodPriceShow == 'Show' && (
                                <Text
                                    style={{
                                        marginEnd: 2,
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
                                    {langdetect == 'en' ? item.currencyname : ''} {item.defaultprice} {langdetect == 'en' ? '' : item.currencyname}
                                </Text>
                            )}
                        </View>
                    )}
                </View>
                {sectionproperties.cartBtnShow == 'Show' && (
                    <TouchableOpacity
                        style={[
                            styles.addtocartbtn,
                            generalstyles.allcentered,
                            {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'absolute',
                                bottom: 0,
                                backgroundColor: sectionproperties.cartBtnbgColor,
                                borderRadius: StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true),
                                borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth, '', true),
                                borderColor: sectionproperties.cartbtnbordercolor,
                                width: StyleParseToIntFuncContext(sectionproperties.cartBtnWidth != null && sectionproperties.cartBtnWidth != undefined ? sectionproperties.cartBtnWidth : 40),
                                height: StyleParseToIntFuncContext(sectionproperties.cartBtnHeight != null && sectionproperties.cartBtnHeight != undefined ? sectionproperties.cartBtnHeight : 30),
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
                                    paddingTop: Platform.OS === 'ios' ? 1 : 0,
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
                                    paddingBottom: Platform.OS === 'ios' ? 1 : 0,
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
                                    paddingBottom: Platform.OS === 'ios' ? 1 : 0,
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
                                    paddingBottom: Platform.OS === 'ios' ? 1 : 0,
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
                                    paddingBottom: Platform.OS === 'ios' ? 1 : 0,
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

                        {sectionproperties.carticonstyle == 'Shopping cart 2' && (
                            <Image
                                resizeMethod="resize"
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
            </TouchableOpacity>
        );
    }, [sectionproperties, item.productid, item.quantity]);
    return cardsrender;
};
export default CardWithImageOnTop_moderncard;
const styles = StyleSheet.create({
    productsCard: {
        alignItems: 'center',
        marginTop: 50,
    },
    productsCardImageCont: {
        // width: 80,
        // height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -50,
        position: 'relative',
    },
    productsCardImage: {
        width: '100%',
        height: '100%',
    },
    productsCardDesc: {
        marginTop: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingStart: 5,
        paddingEnd: 5,
    },
    addtocartbtn: {
        width: 40,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        backgroundColor: '#264656',
        marginBottom: -15,
        position: 'absolute',
    },
    addtowishlistbtn: {
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    hassalestyles: {
        position: 'absolute',
        top: 0,
        left: 0,
        // width: 50,
        // height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
