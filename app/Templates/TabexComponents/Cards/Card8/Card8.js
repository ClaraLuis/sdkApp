import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, Platform } from 'react-native';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { icons, images, SIZES, COLORS, FONTS } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { urlEndpoint } from '../../../../config/imagekit';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { AntDesign, Feather, SimpleLineIcons, FontAwesome5, MaterialCommunityIcons } from 'react-native-vector-icons';
import { BlurView } from 'expo-blur';
import ViewMoreText from 'react-native-view-more-text';
import clip from 'text-clipper';
import { useDispatch, useSelector } from 'react-redux';

const Card8 = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);

    const { lang, langdetect } = useContext(LanguageContext);
    const { CurrentPageIdContext, fetch_inst_tabex_websitetemplatesQueryContext, sectionindexcontext, pageindexcontext, ProjectOpenrcTypeContext, StyleParseToIntFuncContext } =
        useContext(WebsiteDesignWorkPlaceContext);
    const { cardonclickfunctionContext, setProductInfoIdContext, addtofavoritescontext } = useContext(FetchingContext);
    const { routingcountext, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [item, setitem] = useState(props.cardinfoitemprops);
    const [index, setindex] = useState(props.cardinfoindexprops);
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
    //     StatePageProperties.pageobj.sections.forEach(function (sectionitem, sectionindex) {
    //         if (sectionitem.sectionid == props.sectionidprops) {
    //             sectionitem.sectionproperties.forEach(function (sectionpropertiesobj, sectionpropertiesindex) {
    //                 secpropobj[sectionpropertiesobj.property_css_name] = sectionpropertiesobj.property_value;
    //             });
    //         }
    //     });
    //     setsectionproperties({ ...secpropobj });
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
            <View style={{ padding: 20 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingBottom: 5,
                        paddingEnd: StyleParseToIntFuncContext(sectionproperties.paddingRight != null && sectionproperties.paddingRight != undefined ? sectionproperties.paddingRight : 0),
                        paddingBottom: StyleParseToIntFuncContext(sectionproperties.paddingBottom != null && sectionproperties.paddingBottom != undefined ? sectionproperties.paddingBottom : 0),
                        paddingTop: StyleParseToIntFuncContext(sectionproperties.paddingTop != null && sectionproperties.paddingTop != undefined ? sectionproperties.paddingTop : 0),
                        paddingStart: StyleParseToIntFuncContext(sectionproperties.paddingLeft != null && sectionproperties.paddingLeft != undefined ? sectionproperties.paddingLeft : 0),
                        backgroundColor: sectionproperties.backgroundColor,
                        marginStart: StyleParseToIntFuncContext(sectionproperties.card_marginLeft != null && sectionproperties.card_marginLeft != undefined ? sectionproperties.card_marginLeft : 0),
                        marginEnd: StyleParseToIntFuncContext(sectionproperties.card_marginRight != null && sectionproperties.card_marginRight != undefined ? sectionproperties.card_marginRight : 0),
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
                        width:
                            props.sectiondirection != 'slider'
                                ? props.numberofcols == 2
                                    ? SIZES.width / 2 - 40
                                    : props.numberofcols == 3
                                    ? SIZES.width / 3 - 20
                                    : props.numberofcols == 4
                                    ? SIZES.width / 4 - 20
                                    : SIZES.width - 10
                                : SIZES.width - 150,
                    }}
                >
                    {/* Badge */}

                    <View style={[generalstyles.allcentered, { position: 'absolute', top: 5, right: 5 }]}>
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

                    {/* Cart */}
                    <View style={[generalstyles.allcentered, { position: 'absolute', bottom: -20, right: 20 }]}>
                        {sectionproperties.cartBtnShow == 'Show' && (
                            <View style={[generalstyles.allcentered]}>
                                <TouchableOpacity
                                    style={[
                                        {
                                            width: StyleParseToIntFuncContext(
                                                sectionproperties.cartBtnWidth != null && sectionproperties.cartBtnWidth != undefined ? sectionproperties.cartBtnWidth : 33,
                                            ),
                                            height: StyleParseToIntFuncContext(
                                                sectionproperties.cartBtnHeight != null && sectionproperties.cartBtnHeight != undefined ? sectionproperties.cartBtnHeight : 33,
                                            ),
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true),
                                            borderColor: sectionproperties.cartbtnbordercolor,
                                            backgroundColor: sectionproperties.cartbtn_bgtransparent == 'Transparent' ? 'transparent' : sectionproperties.cartBtnbgColor,
                                            borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth, '', true),
                                        },
                                        generalstyles.allcentered,
                                    ]}
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
                            </View>
                        )}
                    </View>

                    <View>
                        <Image
                            source={images.tabexlogo}
                            resizeMode="cover"
                            style={{
                                width: 50,
                                height: 60,
                                borderTopLeftRadius:
                                    langdetect == 'en'
                                        ? StyleParseToIntFuncContext(sectionproperties.image_borderTopLeftRadius, '', true)
                                        : StyleParseToIntFuncContext(sectionproperties.image_borderTopRightRadius, '', true),
                                borderTopRightRadius:
                                    langdetect == 'en'
                                        ? StyleParseToIntFuncContext(sectionproperties.image_borderTopRightRadius, '', true)
                                        : StyleParseToIntFuncContext(sectionproperties.image_borderTopLeftRadius, '', true),
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
                            }}
                            resizeMethod="resize"
                        />
                        {sectionproperties.favBtnShow == 'Show' && (
                            <View style={[{ position: 'absolute', top: 5, right: 5 }, generalstyles.allcentered]}>
                                <TouchableOpacity
                                    onClick={() => {
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
                                                        width: StyleParseToIntFuncContext(sectionproperties.favBtnWidth),
                                                        height: StyleParseToIntFuncContext(sectionproperties.favBtnHeight),
                                                        backgroundColor: sectionproperties.favBtnbgColor,
                                                        backgroundColor: sectionproperties.favbtn_bgtransparent,
                                                        borderColor: sectionproperties.favbtnbordercolor,
                                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.favbtnborderwidth, '', true),
                                                    }}
                                                />
                                            )}
                                            {item.IsFavExists && (
                                                <AntDesign
                                                    name="star"
                                                    size={StyleParseToIntFuncContext(sectionproperties.favBtnIconfontsize)}
                                                    style={{
                                                        color: sectionproperties.activefaviconcolor,
                                                        backgroundColor: sectionproperties.activebgcolor,
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
                                                        width: StyleParseToIntFuncContext(sectionproperties.favBtnWidth),
                                                        height: StyleParseToIntFuncContext(sectionproperties.favBtnHeight),
                                                        backgroundColor: sectionproperties.favBtnbgColor,
                                                        backgroundColor: sectionproperties.favbtn_bgtransparent,
                                                        borderColor: sectionproperties.favbtnbordercolor,
                                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.favbtnborderwidth, '', true),
                                                    }}
                                                />
                                            )}
                                            {item.IsFavExists && (
                                                <AntDesign
                                                    name="heart"
                                                    size={StyleParseToIntFuncContext(sectionproperties.favBtnIconfontsize)}
                                                    style={{
                                                        color: sectionproperties.activefaviconcolor,
                                                        backgroundColor: sectionproperties.activebgcolor,
                                                    }}
                                                />
                                            )}
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        {sectionproperties.prodNameShow == 'Show' && (
                            <Text
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
                                    },
                                ]}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {item.name}
                            </Text>
                        )}

                        <View style={{ flexDirection: 'row' }}>
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
                                    }}
                                >
                                    {langdetect == 'en' ? item.currencyname : ''} {item.defaultprice} {langdetect == 'en' ? '' : item.currencyname}
                                </Text>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        );
    }, [sectionproperties, item.productid, item.quantity]);
    return cardsrender;
};
export default Card8;

const styles = StyleSheet.create({
    hassalestyles: {
        position: 'absolute',
        top: 10,
        left: 10,
        // width: 50,
        // height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    productsCard: {
        alignItems: 'center',
        // marginEnd: 5,
        // marginStart: 5,
        // backgroundColor:'#e8eaed',
        width: 375,
        height: 110,
        // marginBottom: 15,
        // borderRadius:25,
    },
    bttn: {
        // borderRadius:65,
        // backgroundColor:'#4f1261',
        // width:55,
        // height:30,
        alignItems: 'center',
    },
    bttnText: {
        //  color:'white',
        //  marginVertical:6.5,
    },
    productsCardImageCont: {
        // width:95,
        // height:95,
        // borderRadius:15,
        // marginStart:5,
    },

    favBttn: {
        // position:'absolute',
        // marginStart:70,
        // backgroundColor:'white',
        // width:25,
        // height:25,
        // borderRadius:100,
        // alignItems:'center',
        // paddingTop:4.5,
        // paddingStart:1,
        // top:4,
    },
});
