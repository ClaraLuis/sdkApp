import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { icons, SIZES } from '../../GeneralFiles/constants';
import { AntDesign, Feather, SimpleLineIcons, FontAwesome5, MaterialCommunityIcons } from 'react-native-vector-icons';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { useSelector } from 'react-redux';
import { Platform } from 'react-native';
import { ImageComponent } from '../../../ImageComponent';
import SpinnerButton from 'react-native-spinner-button';

const CardWithClosedQuantityButton = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { ChangeCartItemQuantityContext, cardonclickfunctionContext, addtofavoritescontext, showUpTopNotificationBarContext, AddtoCartMutationContext } = useContext(FetchingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [item, setitem] = useState(props.cardinfoitemprops);
    const [StatePageProperties, setStatePageProperties] = useState({});

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

    const [showquantitybtn, setshowquantitybtn] = useState(false);
    useEffect(() => {
        if (item.quantity == 0) {
            setshowquantitybtn(false);
        } else {
            setshowquantitybtn(true);
        }
    }, [props.cardinfoitemprops]);
    const addtocartfunc = (type, quantity) => {
        const addtocardpayloadobj = {
            functype: 'add',
            productid: item.productid,
            variantid: '',
            quantity: quantity,
        };

        var runfunc = false;
        if (addtocardpayloadobj.productid.length != 0 && addtocardpayloadobj.quantity > 0) {
            if (item.hasvariants == 1) {
                if (addtocardpayloadobj.variantid.length != 0) {
                    runfunc = true;
                } else {
                    showUpTopNotificationBarContext('Please Choose Product Options', 'orange');
                }
            } else {
                runfunc = true;
            }
        } else {
            showUpTopNotificationBarContext('Please Choose Quantity', 'orange');
        }

        if (runfunc == true) {
            AddtoCartMutationContext.mutate(addtocardpayloadobj);
        }
    };
    const addtocartbuttonrender = () => {
        if (AddtoCartMutationContext.isLoading) {
            if (AddtoCartMutationContext?.variables?.productid == item.productid) {
                return (
                    <View style={[generalstyles.allcentered, { marginTop: 10 }]}>
                        <SpinnerButton
                            buttonStyle={{ width: 25, height: 25 }}
                            isLoading={true}
                            indicatorCount={10}
                            spinnerType={'MaterialIndicator'}
                            spinnerColor={sectionproperties.quantitybtn_textcolor}
                        />
                    </View>
                );
            } else {
                return item.quantity;
            }
        }
        if (!AddtoCartMutationContext.isLoading) {
            return item.quantity;
        }
    };
    const AddQuantity = () => {
        return (
            <TouchableOpacity
                style={[
                    generalstyles.allcentered,
                    {
                        width: StyleParseToIntFuncContext(sectionproperties.remove_quantitybtn_width),
                        height: StyleParseToIntFuncContext(sectionproperties.remove_quantitybtn_height),
                        backgroundColor: sectionproperties.remove_quantitybtn_bgcolor,
                        borderTopLeftRadius:
                            langdetect == 'en'
                                ? StyleParseToIntFuncContext(sectionproperties.remove_quantitybtn_leftborderradius, '', true)
                                : StyleParseToIntFuncContext(sectionproperties.remove_quantitybtn_rightborderradius, '', true),
                        borderTopRightRadius:
                            langdetect == 'en'
                                ? StyleParseToIntFuncContext(sectionproperties.remove_quantitybtn_rightborderradius, '', true)
                                : StyleParseToIntFuncContext(sectionproperties.remove_quantitybtn_leftborderradius, '', true),
                        borderBottomLeftRadius:
                            langdetect == 'en'
                                ? StyleParseToIntFuncContext(sectionproperties.remove_quantitybtn_leftborderradius, '', true)
                                : StyleParseToIntFuncContext(sectionproperties.remove_quantitybtn_rightborderradius, '', true),
                        borderBottomRightRadius:
                            langdetect == 'en'
                                ? StyleParseToIntFuncContext(sectionproperties.remove_quantitybtn_rightborderradius, '', true)
                                : StyleParseToIntFuncContext(sectionproperties.remove_quantitybtn_leftborderradius, '', true),
                    },
                ]}
                onPress={() => {
                    if (item.hasvariants == 0) {
                        var tempitem = { ...item };
                        tempitem.quantity = parseInt(tempitem.quantity);
                        tempitem.quantity = tempitem.quantity - 1;
                        if (tempitem.quantity <= 0) {
                            tempitem.quantity = 0;
                            setshowquantitybtn(false);
                        }
                        setitem({ ...tempitem });
                        addtocartfunc('add', tempitem.quantity);
                    } else {
                        ChangeCartItemQuantityContext(item, parseInt(parseInt(item.quantity) - 1));
                    }
                }}
            >
                <AntDesign name="minus" size={StyleParseToIntFuncContext(sectionproperties.remove_quantitybtn_textfontsize)} color={sectionproperties.remove_quantitybtn_textcolor} />
            </TouchableOpacity>
        );
    };

    const DecreaseQuantity = () => {
        return (
            <TouchableOpacity
                style={[
                    generalstyles.allcentered,
                    {
                        width: StyleParseToIntFuncContext(sectionproperties.add_quantitybtn_width),
                        height: StyleParseToIntFuncContext(sectionproperties.add_quantitybtn_height),
                        backgroundColor: sectionproperties.add_quantitybtn_bgcolor,
                        borderTopLeftRadius:
                            langdetect == 'en'
                                ? StyleParseToIntFuncContext(sectionproperties.add_quantitybtn_leftborderradius, '', true)
                                : StyleParseToIntFuncContext(sectionproperties.add_quantitybtn_rightborderradius, '', true),
                        borderTopRightRadius:
                            langdetect == 'en'
                                ? StyleParseToIntFuncContext(sectionproperties.add_quantitybtn_rightborderradius, '', true)
                                : StyleParseToIntFuncContext(sectionproperties.add_quantitybtn_leftborderradius, '', true),
                        borderBottomLeftRadius:
                            langdetect == 'en'
                                ? StyleParseToIntFuncContext(sectionproperties.add_quantitybtn_leftborderradius, '', true)
                                : StyleParseToIntFuncContext(sectionproperties.add_quantitybtn_rightborderradius, '', true),
                        borderBottomRightRadius:
                            langdetect == 'en'
                                ? StyleParseToIntFuncContext(sectionproperties.add_quantitybtn_rightborderradius, '', true)
                                : StyleParseToIntFuncContext(sectionproperties.add_quantitybtn_leftborderradius, '', true),
                    },
                ]}
                onPress={() => {
                    if (item.hasvariants == 0) {
                        if (item.quantity == item.maximumproductquant) {
                            showUpTopNotificationBarContext('Max: ' + item.maximumproductquant + ', Min: ' + item.minimumproductquant, 'orange');
                        } else {
                            var tempitem = { ...item };
                            tempitem.quantity = parseInt(tempitem.quantity);
                            tempitem.quantity = tempitem.quantity + 1;
                            if (tempitem.quantity <= 0) {
                                tempitem.quantity = 0;
                            }
                            setitem({ ...tempitem });
                            addtocartfunc('add', tempitem.quantity);
                        }
                    } else {
                        ChangeCartItemQuantityContext(item, parseInt(parseInt(item.quantity) + 1));
                    }
                }}
            >
                <AntDesign name="plus" size={StyleParseToIntFuncContext(sectionproperties.add_quantitybtn_textfontsize)} color={sectionproperties.add_quantitybtn_textcolor} />
            </TouchableOpacity>
        );
    };
    const cardsrender = React.useMemo(() => {
        return (
            <View
                style={[
                    styles.mostPopularCard,
                    {
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom != null && sectionproperties.marginBottom != undefined ? sectionproperties.marginBottom : 0),
                        marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop != null && sectionproperties.marginTop != undefined ? sectionproperties.marginTop : 0),
                        paddingStart: StyleParseToIntFuncContext(sectionproperties.card_marginLeft),
                        paddingEnd: StyleParseToIntFuncContext(sectionproperties.card_marginRight),
                        width:
                            SIZES.width > 1024
                                ? SIZES.width / 4 - 80
                                : SIZES.width > 768
                                ? SIZES.width / 4 - 4
                                : props.sectiondirection == 'slider'
                                ? Platform.OS === 'ios'
                                    ? SIZES.width - 225
                                    : // 190
                                      SIZES.width - 160
                                : SIZES.width / 2 - 10,
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
                        style={{ width: '100%', height: '100%' }}
                        onPress={() => {
                            cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                        }}
                    >
                        <ImageComponent
                            resizeMethod="resize"
                            resizeMode={sectionproperties.bgcovercontain == 'Cover' ? 'cover' : 'contain'}
                            path={props.sectiondirection == 'slider' ? '/tr:w-' + sectionproperties.imagetr_w + ',h-' + sectionproperties.imagetr_h + '/' + item.image : item.image}
                            style={[
                                styles.cardImage,
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
                                    opacity: sectionproperties.showoutofstock == 'Show' && item.quantavailtype == 'limit' && item.currentquantity < 1 && item.hasvariants == 0 ? 0.5 : 1,
                                },
                            ]}
                        />
                        {sectionproperties.showoutofstock == 'Show' && item.quantavailtype == 'limit' && item.currentquantity < 1 && item.hasvariants == 0 && (
                            <View
                                style={[
                                    generalstyles.allcentered,
                                    {
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute',
                                        top: 0,
                                        bottom: 0,
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

                    {sectionproperties.showbadge == 'Show' && item.hassale == 1 && (
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
                                {'-' + parseFloat(Math.round(10.0 * ((parseInt(item.defaultprice) - parseInt(item.defaultsaleprice)) / parseInt(item.defaultprice)) * 100) / 10.0).toFixed(0) + '%'}
                            </Text>
                        </View>
                    )}
                    <View style={[styles.quanitityCartContainer]}>
                        {showquantitybtn == true && sectionproperties.cartBtnShow == 'Show' && (
                            <View
                                style={[
                                    {
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        width: StyleParseToIntFuncContext(sectionproperties.quantitybtn_width),
                                        height: StyleParseToIntFuncContext(sectionproperties.quantitybtn_height),
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.quantitybtn_borderradius, '', true),
                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.quantitybtnborderwidth, '', true),
                                        borderColor: sectionproperties.quantitybtnbordercolor,
                                        backgroundColor: sectionproperties.quantitybtn_bgcolor,
                                    },
                                ]}
                            >
                                {langdetect == 'en' && AddQuantity()}
                                {langdetect == 'ar' && DecreaseQuantity()}

                                <View
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginLeft: 10,
                                        marginRight: 10,
                                        flex: 1,
                                        width: '100%',
                                    }}
                                >
                                    <Text
                                        style={[
                                            generalstyles.allcentered,
                                            {
                                                fontFamily: 'Poppins-Medium',
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.quantitybtn_textfontsize),
                                                color: sectionproperties.quantitybtn_textcolor,
                                            },
                                        ]}
                                    >
                                        {addtocartbuttonrender()}
                                        {/* {item.quantity} */}
                                    </Text>
                                </View>
                                {langdetect == 'en' && DecreaseQuantity()}
                                {langdetect == 'ar' && AddQuantity()}
                            </View>
                        )}
                        {sectionproperties.cartBtnShow == 'Show' && showquantitybtn == false && (
                            <View
                                style={[
                                    styles.addtocartbtn,
                                    generalstyles.allcentered,
                                    {
                                        display: sectionproperties.showoutofstock == 'Show' && item.quantavailtype == 'limit' && item.currentquantity < 1 && item.hasvariants == 0 ? 'none' : 'flex',
                                    },
                                ]}
                            >
                                <TouchableOpacity
                                    style={[
                                        styles.addtocartbtn,
                                        {
                                            width: StyleParseToIntFuncContext(
                                                sectionproperties.cartBtnWidth != undefined && sectionproperties.cartBtnWidth != null ? sectionproperties.cartBtnWidth : 40,
                                            ),
                                            height: StyleParseToIntFuncContext(
                                                sectionproperties.cartBtnHeight != undefined && sectionproperties.cartBtnHeight != null ? sectionproperties.cartBtnHeight : 40,
                                            ),
                                            borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth, '', true),
                                            borderColor: sectionproperties.cartbtnbordercolor,
                                            backgroundColor: sectionproperties.cartBtnbgColor,
                                            shadowColor: sectionproperties.cartbtn_shadowcolor,
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true),
                                        },
                                    ]}
                                    onPress={() => {
                                        setshowquantitybtn(true);
                                        if (item.hasvariants == 0) {
                                            var tempitem = { ...item };
                                            tempitem.quantity = parseInt(tempitem.quantity);
                                            tempitem.quantity = tempitem.quantity + 1;
                                            if (tempitem.quantity <= 0) {
                                                tempitem.quantity = 0;
                                            }
                                            setitem({ ...tempitem });
                                            addtocartfunc('add', tempitem.quantity);
                                        } else {
                                            cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                                        }
                                    }}
                                >
                                    {sectionproperties.carticonstyle == 'Shopping cart 1' && (
                                        <MaterialCommunityIcons
                                            name="cart-outline"
                                            size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                            color={sectionproperties.cart_iconcolor}
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
                                    {sectionproperties.carticonstyle == 'Plus Icon' && (
                                        <AntDesign
                                            name="plus"
                                            size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                            style={{
                                                color: sectionproperties.cart_iconcolor,
                                                paddingStart: Platform.OS === 'ios' ? 1 : 0,
                                                paddingTop: Platform.OS === 'ios' ? 1 : 0,
                                            }}
                                        />
                                    )}
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>

                <View style={styles.cardDescription}>
                    {sectionproperties.prodNameShow == 'Show' && (
                        <Text
                            ellipsizeMode="tail"
                            numberOfLines={1}
                            style={[
                                {
                                    minHeight: 20,
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
                                    textAlign: 'center',
                                },
                            ]}
                            onPress={() => {
                                cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                            }}
                        >
                            {item.name}
                        </Text>
                    )}
                    <View style={[generalstyles.flexColumn]}>
                        {sectionproperties.prodPriceShow == 'Show' && (
                            <Text
                                style={{
                                    maxHeight: 25,
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
                                }}
                            >
                                {langdetect == 'en' ? item.currencyname : ''} {item.defaultprice} {langdetect == 'en' ? '' : item.currencyname}
                            </Text>
                        )}
                    </View>
                </View>
            </View>
        );
    }, [sectionproperties, item.productid, item.quantity]);

    return cardsrender;
};

const styles = StyleSheet.create({
    mostPopularCard: {
        flex: 1,
        alignItems: 'center',
        marginEnd: 5,
        marginStart: 5,
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
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        paddingStart: 5,
        paddingEnd: 5,
    },
    addtocartbtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
    },
    quanitityCartContainer: {
        position: 'absolute',
        bottom: -18,
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

export default CardWithClosedQuantityButton;
