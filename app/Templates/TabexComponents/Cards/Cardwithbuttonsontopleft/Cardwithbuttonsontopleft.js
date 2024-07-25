import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { icons, SIZES, COLORS } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { AntDesign, Feather, SimpleLineIcons, FontAwesome5, MaterialCommunityIcons } from 'react-native-vector-icons';
import { urlEndpoint } from '../../../../config/imagekit';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { useSelector } from 'react-redux';
import { ImageComponent } from '../../../ImageComponent';

const Cardwithbuttonsontopleft = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const { lang, langdetect } = useContext(LanguageContext);
    const { CurrentPageIdContext, StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { cardonclickfunctionContext, setProductInfoIdContext, addtofavoritescontext } = useContext(FetchingContext);
    const { routingcountext, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
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
                onPress={() => {
                    cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                }}
                style={[
                    styles.productsCard,
                    {
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom != null && sectionproperties.marginBottom != undefined ? sectionproperties.marginBottom : 0),
                        marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop != null && sectionproperties.marginTop != undefined ? sectionproperties.marginTop : 0),
                        width:
                            props.sectiondirection != 'slider'
                                ? SIZES.width > 1025
                                    ? SIZES.width / 5 - 20
                                    : SIZES.width > 768
                                    ? SIZES.width / 4 - 20
                                    : SIZES.width / 2 - 20
                                : SIZES.width > 1024
                                ? SIZES.width / 6
                                : SIZES.width > 768
                                ? SIZES.width / 5
                                : Platform.OS === 'ios'
                                ? SIZES.width - StyleParseToIntFuncContext(sectionproperties.width)
                                : SIZES.width - -StyleParseToIntFuncContext(sectionproperties.width) - 30,
                        backgroundColor: sectionproperties.backgroundColortransparent == 'Transparent' ? 'transparent' : sectionproperties.backgroundColor,
                        marginRight:
                            langdetect == 'en'
                                ? StyleParseToIntFuncContext(sectionproperties.card_marginRight != null && sectionproperties.card_marginRight != undefined ? sectionproperties.card_marginRight : 0)
                                : StyleParseToIntFuncContext(sectionproperties.card_marginLeft != null && sectionproperties.card_marginLeft != undefined ? sectionproperties.card_marginLeft : 0),
                        marginLeft:
                            langdetect == 'en'
                                ? StyleParseToIntFuncContext(sectionproperties.card_marginLeft != null && sectionproperties.card_marginLeft != undefined ? sectionproperties.card_marginLeft : 0)
                                : StyleParseToIntFuncContext(sectionproperties.card_marginRight != null && sectionproperties.card_marginRight != undefined ? sectionproperties.card_marginRight : 0),
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
                        paddingBottom: StyleParseToIntFuncContext(sectionproperties.paddingBottom),
                        paddingTop: StyleParseToIntFuncContext(sectionproperties.paddingTop),
                        paddingLeft: langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.paddingLeft) : StyleParseToIntFuncContext(sectionproperties.paddingRight),
                        paddingRight: langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.paddingRight) : StyleParseToIntFuncContext(sectionproperties.paddingLeft),
                    },
                ]}
            >
                <View style={{ width: '100%' }}>
                    <View
                        style={[
                            styles.productsCardImageCont,
                            {
                                width: '100%',
                                borderColor: sectionproperties.image_bordercolor,
                                borderWidth: StyleParseToIntFuncContext(sectionproperties.image_borderwidth, '', true),
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
                                backgroundColor: sectionproperties.image_bgcolor,
                                height: StyleParseToIntFuncContext(sectionproperties.image_height != null && sectionproperties.image_height != undefined ? sectionproperties.image_height : 0),
                                marginBottom: StyleParseToIntFuncContext(sectionproperties.image_mb != null && sectionproperties.image_mb != undefined ? sectionproperties.image_mb : 0),
                                overflow: 'hidden',
                            },
                        ]}
                    >
                        <ImageComponent
                            path={imageurlgrouper()}
                            resizeMethod="resize"
                            style={[
                                {
                                    resizeMode: sectionproperties.bgcovercontain == 'Contain' ? 'contain' : 'cover',
                                    width: '100%',
                                    height: '100%',
                                },
                            ]}
                        />

                        {sectionproperties.favBtnShow == 'Show' && (
                            <TouchableOpacity
                                style={[
                                    styles.addtowishlistbtn,
                                    {
                                        backgroundColor: sectionproperties.favbtn_bgtransparent == 'Transparent' ? 'transparent' : sectionproperties.favBtnbgColor,
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.fav_btn_borderBottomLeftRadius, '', true),
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
                                    styles.addtocartbtn,
                                    {
                                        backgroundColor: sectionproperties.cartbtn_bgtransparent == 'Transparent' ? 'transparent' : sectionproperties.cartBtnbgColor,
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true),
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
                                            paddingTop: Platform.OS === 'ios' ? 1 : 0,
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
                        {sectionproperties.prodsalePriceshow == 'Show' && item.hassale != 0 && (
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
                    </View>
                    <View
                        style={[
                            styles.productsCardDesc,
                            {
                                alignItems: sectionproperties.productnamecentered == 'Centered' ? 'center' : 'flex-start',
                            },
                        ]}
                    >
                        <Text
                            style={{
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
                                textAlign: sectionproperties.productnamecentered == 'Centered' ? 'center' : 'left',
                            }}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                        >
                            {item.name}
                        </Text>
                        <View
                            style={[
                                generalstyles.flexRow,
                                {
                                    marginVertical: StyleParseToIntFuncContext(sectionproperties.productpricemarginvertical),
                                },
                            ]}
                        >
                            {sectionproperties.prodPriceShow == 'Show' && (
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
                                        textAlign: 'center',
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
                                        textAlign: 'center',
                                    }}
                                >
                                    {langdetect == 'en' ? item.currencyname : ''} {item.defaultprice} {langdetect == 'en' ? '' : item.currencyname}
                                </Text>
                            )}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }, [sectionproperties, item.productid, item.quantity]);
    return cardsrender;
};
export default Cardwithbuttonsontopleft;
const styles = StyleSheet.create({
    productsCard: {
        alignItems: 'center',
    },
    productsCardImageCont: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    productsCardDesc: {
        flexDirection: 'column',
        width: '100%',
    },
    addtocartbtn: {
        width: 35,
        height: 35,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 50,
        left: 7,
    },
    addtowishlistbtn: {
        position: 'absolute',
        top: 7,
        left: 7,
        width: 35,
        height: 35,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    hassalestyles: {
        position: 'absolute',
        top: 7,
        right: 7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
