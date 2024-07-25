import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { SIZES } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { urlEndpoint } from '../../../../config/imagekit';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import SpinnerButton from 'react-native-spinner-button';
import { useDispatch, useSelector } from 'react-redux';
import { ImageComponent } from '../../../ImageComponent';

const Card6 = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { cardonclickfunctionContext, showUpTopNotificationBarContext, AddtoCartMutationContext, setProductInfoIdContext, addtofavoritescontext, clearcartfuncContext, iscrossvendorfunccontext } =
        useContext(FetchingContext);
    const { routingcountext, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [Quantity, setQuantity] = useState(0);
    const [item, setitem] = useState(props.cardinfoitemprops);
    const [StatePageProperties, setStatePageProperties] = useState({});
    // useEffect(() => {
    //     StatePageProperties11.pages.forEach(function (item, index) {
    //         if (CurrentPageIdContext == item.pageid) {
    //             var pageobj = item.pageobj;

    //             setStatePageProperties(pageobj);
    //         }
    //     });
    // }, [StatePageProperties11]);
    useEffect(() => {
        if (props?.sectionpropertiesProps != undefined) {
            var secpropobj = {};
            props?.sectionpropertiesProps?.forEach(function (sectionpropertiesobj, sectionpropertiesindex) {
                secpropobj[sectionpropertiesobj.property_css_name] = sectionpropertiesobj.property_value;
            });
            setsectionproperties({ ...secpropobj });
        }
    }, [props.sectionpropertiesProps]);
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
        if (props.cardinfoitemprops != undefined) {
            setitem(props.cardinfoitemprops);
            if (props.cardinfoitemprops.quantity != undefined && props.cardinfoitemprops.quantity != null && props.cardinfoitemprops.quantity != 0 && props.cardinfoitemprops.quantity != '0') {
                setQuantity(parseInt(props.cardinfoitemprops.quantity));
                console.log('mmm' + props.cardinfoitemprops.quantity);
            }
        }
    }, [props.cardinfoitemprops]);
    const updatequantity = (type) => {
        var tempitem = Quantity;

        tempitem = parseInt(tempitem);
        if (type == 'add') {
            tempitem = tempitem + 1;
        } else if (type == 'remove') {
            tempitem = tempitem - 1;
        }
        if (tempitem <= 0) {
            tempitem = 0;
        }
        setQuantity(tempitem);
    };
    const addtocartfunc = () => {
        const addtocardpayloadobj = {
            functype: 'add',
            productid: item.productid,
            variantid: '',
            quantity: Quantity,
        };
        var iscrossvendordetected = false;
        var iscrossvendorfuncresp = iscrossvendorfunccontext(addtocardpayloadobj);

        if (iscrossvendorfuncresp.isinstdisallowcrossvendor) {
            if (iscrossvendorfuncresp.iscrossvendordetected) {
                iscrossvendordetected = true;
            }
        }
        if (iscrossvendordetected) {
            clearcartfuncContext();

            setTimeout(function () {
                addtocartfunc();
            }, 500);
        } else {
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
                showUpTopNotificationBarContext(langdetect == 'en' ? 'Please Choose Quantity' : 'من فضلك اختر كمية', 'orange');
            }

            if (runfunc == true) {
                AddtoCartMutationContext.mutate(addtocardpayloadobj);
            }
        }
    };
    const addtocartbuttonrender = () => {
        if (AddtoCartMutationContext.isLoading) {
            if (AddtoCartMutationContext?.variables?.productid == item.productid) {
                return (
                    <View style={{ width: '100%' }}>
                        <SpinnerButton buttonStyle={{ width: 20, height: 20 }} isLoading={true} indicatorCount={10} spinnerType={'MaterialIndicator'} spinnerColor={'white'} />
                    </View>
                );
            } else {
                return lang.addtocart;
            }
        }
        if (!AddtoCartMutationContext.isLoading) {
            return lang.addtocart;
        }
    };
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
            <View
                style={[
                    styles.productsCard,
                    {
                        paddingBottom: 5,
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom),
                        marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop),
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
                        marginStart: StyleParseToIntFuncContext(sectionproperties.card_marginLeft),
                        marginEnd: StyleParseToIntFuncContext(sectionproperties.card_marginRight),
                        width:
                            props.sectiondirection != 'slider'
                                ? SIZES.width > 1024
                                    ? SIZES.width / 5 - StyleParseToIntFuncContext(sectionproperties.card_marginLeft) - StyleParseToIntFuncContext(sectionproperties.card_marginRight)
                                    : SIZES.width > 768
                                    ? SIZES.width / 4 - StyleParseToIntFuncContext(sectionproperties.card_marginLeft) - StyleParseToIntFuncContext(sectionproperties.card_marginRight)
                                    : Platform.OS === 'ios'
                                    ? SIZES.width / 2 - StyleParseToIntFuncContext(sectionproperties.card_marginLeft) - StyleParseToIntFuncContext(sectionproperties.card_marginRight)
                                    : SIZES.width / 2 - StyleParseToIntFuncContext(sectionproperties.card_marginLeft) - StyleParseToIntFuncContext(sectionproperties.card_marginRight)
                                : SIZES.width > 1024
                                ? SIZES.width / 5
                                : SIZES.width > 768
                                ? SIZES.width / 3 - 50
                                : Platform.OS == 'ios'
                                ? StyleParseToIntFuncContext(sectionproperties.width)
                                : parseFloat(StyleParseToIntFuncContext(sectionproperties.width) - 20),
                        //
                        // 220
                        //   200
                    },
                ]}
            >
                <View style={[generalstyles.flexColumn, { width: '100%', height: '100%' }]}>
                    <View
                        style={[
                            styles.productsCardImageCont,
                            {
                                width: '100%',
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
                                borderWidth: StyleParseToIntFuncContext(sectionproperties.image_borderwidth, '', true),
                                borderColor: sectionproperties.image_bordercolor,
                                height: 130,
                                // height: SIZES.width > 768 ? 200 : StyleParseToIntFuncContext(sectionproperties.image_height),
                            },
                        ]}
                    >
                        <TouchableOpacity
                            style={[
                                generalstyles.allcentered,
                                {
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
                                },
                            ]}
                            onPress={() => {
                                cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                            }}
                        >
                            <ImageComponent
                                path={imageurlgrouper()}
                                resizeMethod="resize"
                                style={{
                                    width: StyleParseToIntFuncContext(sectionproperties.imageInnerWidth_Height) + '%',
                                    height: StyleParseToIntFuncContext(sectionproperties.imageInnerWidth_Height) + '%',
                                    objectFit: sectionproperties.bgcovercontain == 'Contain' ? 'contain' : 'cover',
                                }}
                            />
                        </TouchableOpacity>
                        {sectionproperties.favBtnShow == 'Show' && (
                            <TouchableOpacity
                                style={[
                                    styles.addtowishlistbtn,
                                    {
                                        width: StyleParseToIntFuncContext(sectionproperties.favBtnWidth),
                                        height: StyleParseToIntFuncContext(sectionproperties.favBtnHeight),
                                        backgroundColor: props?.cardinfoitemprops?.IsFavExists == true ? sectionproperties.activebgcolor : sectionproperties.favBtnbgColor,
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
                                        {!props?.cardinfoitemprops?.IsFavExists && (
                                            <AntDesign
                                                name="staro"
                                                size={StyleParseToIntFuncContext(sectionproperties.favBtnIconfontsize)}
                                                style={{
                                                    color: sectionproperties.favBtniconcolor,
                                                }}
                                            />
                                        )}
                                        {props?.cardinfoitemprops?.IsFavExists && (
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
                                        {!props?.cardinfoitemprops?.IsFavExists && (
                                            <AntDesign
                                                name="hearto"
                                                size={StyleParseToIntFuncContext(sectionproperties.favBtnIconfontsize)}
                                                style={{
                                                    color: sectionproperties.favBtniconcolor,
                                                }}
                                            />
                                        )}
                                        {props?.cardinfoitemprops?.IsFavExists && (
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
                                    },
                                ]}
                            >
                                <Text style={[generalstyles.poppinsMedium, { color: sectionproperties.badge_color, fontSize: StyleParseToIntFuncContext(sectionproperties.badge_fontsize) }]}>
                                    {langdetect == 'en' ? sectionproperties.badgeContentEn : sectionproperties.badgeContentAr}
                                </Text>
                            </View>
                        )}
                    </View>
                    <View style={[{ paddingTop: Platform.OS == 'ios' ? 7 : 5, paddingLeft: 10, paddingBottom: Platform.OS == 'ios' ? 8 : 6 }]}>
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
                    </View>
                    <View style={[generalstyles.flexColumn, { padding: 10, paddingTop: 0, marginTop: 'auto' }]}>
                        {item.hassale == 0 && (
                            <View style={[generalstyles.flexRow, { marginBottom: Platform.OS == 'ios' ? 5 : 0 }]}>
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
                        )}
                        {item.hassale == 1 && (
                            <View style={[generalstyles.flexRow, { marginBottom: Platform.OS == 'ios' ? 5 : 0 }]}>
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
                        <View style={[{ marginBottom: Platform.OS == 'ios' ? 10 : 5, flexDirection: sectionproperties.totalsectiondirection == 'Vertical' ? 'row' : 'column' }]}>
                            <View
                                style={[
                                    {
                                        width: Platform.OS == 'ios' ? 95 : 90,
                                        height: Platform.OS == 'ios' ? 40 : 38,
                                        flexDirection: 'row',
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.quantitybtn_borderradius, '', true),
                                        alignItems: 'center',
                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.quantitybtnborderwidth, '', true),
                                        borderColor: sectionproperties.quantitybtnbordercolor,
                                        marginEnd: 5,
                                    },
                                ]}
                            >
                                <TouchableOpacity
                                    style={[
                                        generalstyles.allcentered,
                                        {
                                            width: 27,
                                            // width: StyleParseToIntFuncContext(sectionproperties.remove_quantitybtn_width),
                                            height: StyleParseToIntFuncContext(sectionproperties.remove_quantitybtn_height),
                                            backgroundColor: sectionproperties.remove_quantitybtn_bgcolor,
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.remove_quantitybtn_borderradius, '', true),
                                        },
                                    ]}
                                    onPress={() => {
                                        updatequantity('remove');
                                    }}
                                >
                                    <AntDesign
                                        name="minus"
                                        size={StyleParseToIntFuncContext(sectionproperties.remove_quantitybtn_textfontsize)}
                                        color={sectionproperties.remove_quantitybtn_textcolor}
                                    />
                                </TouchableOpacity>
                                <View
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginLeft: 5,
                                        marginRight: 5,
                                        flex: 1,
                                        width: '100%',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.quantitybtn_textfontsize),
                                            fontFamily: 'Poppins-Medium',
                                            color: sectionproperties.quantitybtn_textcolor,
                                        }}
                                    >
                                        {Quantity}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={[
                                        generalstyles.allcentered,
                                        {
                                            width: 27,
                                            height: StyleParseToIntFuncContext(sectionproperties.add_quantitybtn_height),
                                            backgroundColor: sectionproperties.add_quantitybtn_bgcolor,
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.add_quantitybtn_borderradius, '', true),
                                        },
                                    ]}
                                    onPress={() => {
                                        updatequantity('add');
                                    }}
                                >
                                    <AntDesign name="plus" size={StyleParseToIntFuncContext(sectionproperties.add_quantitybtn_textfontsize)} color={sectionproperties.add_quantitybtn_textcolor} />
                                </TouchableOpacity>
                            </View>
                            {sectionproperties.total_fontsize != 0 && (
                                <View
                                    style={[
                                        {
                                            flexDirection: sectionproperties.totalsectiondirection == 'Vertical' ? 'column' : 'row',
                                            marginTop: sectionproperties.totalsectiondirection == 'Vertical' ? 0 : 5,
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            generalstyles.poppinsMedium,
                                            {
                                                textAlign: 'left',
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.total_fontsize),
                                                color: sectionproperties.total_color,
                                                textTransform:
                                                    sectionproperties.cartBtnTexttransform == 'Uppercase'
                                                        ? 'uppercase'
                                                        : sectionproperties.cartBtnTexttransform == 'Capitalize'
                                                        ? 'capitalize'
                                                        : sectionproperties.cartBtnTexttransform == 'None'
                                                        ? 'none'
                                                        : 'lowercase',
                                                marginEnd: 5,
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
                                        {lang.total}:
                                    </Text>
                                    <Text
                                        style={[
                                            generalstyles.poppinsMedium,
                                            {
                                                width: '100%',
                                                textAlign: 'left',
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
                                                color: sectionproperties.total_secondaryColor,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.total_fontsize),
                                            },
                                        ]}
                                    >
                                        {langdetect == 'en' ? item.currencyname : ''} {item.hassale == 1 ? Math.ceil(Quantity * item.defaultsaleprice) : Math.ceil(Quantity * item.defaultprice)}{' '}
                                        {langdetect == 'en' ? '' : item.currencyname}
                                    </Text>
                                </View>
                            )}
                        </View>
                        {sectionproperties.cartBtnShow == 'Show' && (
                            <TouchableOpacity
                                style={[
                                    generalstyles.allcentered,
                                    {
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        width: StyleParseToIntFuncContext(sectionproperties.cartBtnWidth),
                                        maxWidth: '90%',
                                        height: StyleParseToIntFuncContext(
                                            sectionproperties.cartBtnHeight != null && sectionproperties.cartBtnHeight != undefined ? sectionproperties.cartBtnHeight : 0,
                                        ),
                                        backgroundColor: sectionproperties.cartBtnbgColor,
                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth, '', true),
                                        borderColor: sectionproperties.cartbtnbordercolor,
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true),
                                    },
                                ]}
                                onPress={() => {
                                    if (item.hasvariants == 0) {
                                        addtocartfunc();
                                    } else {
                                        cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                                    }
                                }}
                            >
                                <Text
                                    style={[
                                        generalstyles.poppinsMedium,
                                        {
                                            color: sectionproperties.cartBtnTextcolor,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.cartBtnTextfontsize),
                                            textTransform: 'capitalize',
                                        },
                                    ]}
                                >
                                    {addtocartbuttonrender()}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        );
    }, [sectionproperties, item.productid, Quantity, props?.cardinfoitemprops?.IsFavExists]);
    return cardsrender;
};
export default Card6;
const styles = StyleSheet.create({
    productsCard: {
        flex: 1,
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
        paddingStart: 2,
        paddingEnd: 2,
        marginTop: 5,
    },
    addtowishlistbtn: {
        position: 'absolute',
        top: 5,
        left: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    hassalestyles: {
        position: 'absolute',
        top: 5,
        right: 6,
        // width: 50,
        // height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
