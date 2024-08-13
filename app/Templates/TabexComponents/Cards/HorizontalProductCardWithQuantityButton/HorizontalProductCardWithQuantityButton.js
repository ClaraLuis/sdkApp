import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { SIZES } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { AntDesign } from 'react-native-vector-icons';
import { urlEndpoint } from '../../../../config/imagekit';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import ViewMoreText from 'react-native-view-more-text';
import clip from 'text-clipper';
import { useSelector } from 'react-redux';
import RenderHtml from 'react-native-render-html';
import { ImageComponent } from '../../../ImageComponent';

const HorizontalProductCardWithQuantityButton = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const { lang, langdetect } = useContext(LanguageContext);
    const { CurrentPageIdContext, StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { cardonclickfunctionContext, addtofavoritescontext, AddtoCartMutationContext } = useContext(FetchingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [item, setitem] = useState(props.cardinfoitemprops);
    const [index, setindex] = useState(props.cardinfoindexprops);
    const [StatePageProperties, setStatePageProperties] = useState({});
    const [showquantitybtn, setshowquantitybtn] = useState(true);

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
    const secondRegEx = /((&nbsp;))*/gim;
    const resulten = item?.description_en?.replace(secondRegEx, '');
    const resultar = item?.description_ar?.replace(secondRegEx, '');

    const cardsrender = React.useMemo(() => {
        return (
            <TouchableOpacity
                style={[
                    generalstyles.flexRow,
                    {
                        width:
                            props.sectiondirection != 'slider'
                                ? SIZES.width > 768
                                    ? SIZES.width / 2 - 40
                                    : Platform.OS === 'ios'
                                    ? SIZES.width - 40
                                    : SIZES.width - 40
                                : SIZES.width > 1024
                                ? SIZES.width / 2 - 120
                                : SIZES.width > 768
                                ? SIZES.width / 2 - 40
                                : Platform.OS === 'ios'
                                ? SIZES.width - 60
                                : SIZES.width - 20,
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
                        marginHorizontal: 10,
                        marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop),
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom),
                        padding: 10,
                    },
                ]}
                onPress={() => {
                    cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                }}
            >
                <View style={[generalstyles.flexRow, { width: '100%' }]}>
                    <View style={[generalstyles.allcentered]}>
                        <View
                            style={[
                                {
                                    borderColor: sectionproperties.image_bordercolor,
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.image_borderwidth, '', true),
                                    backgroundColor: sectionproperties.image_bgcolor,
                                    borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true),
                                    borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true),
                                    borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true),
                                    borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true),
                                    height: StyleParseToIntFuncContext(sectionproperties.image_height, '', true),
                                    width: StyleParseToIntFuncContext(sectionproperties.image_width, '', true),
                                },
                            ]}
                        >
                            <ImageComponent
                                resizeMethod="resize"
                                path={item.image}
                                resizeMode="cover"
                                style={[
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
                                    },
                                ]}
                            />
                        </View>
                    </View>
                    <View>
                        <View style={[generalstyles.flexRow, { flex: 1, paddingStart: 10, marginBottom: 'auto', marginTop: 5 }]}>
                            <View style={[generalstyles.flexColumn, { paddingEnd: 50 }]}>
                                <Text
                                    ellipsizeMode="tail"
                                    numberOfLines={1}
                                    style={[
                                        generalstyles.allcentered,

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
                                                sectionproperties.prodNameTextTranform == 'Uppercase'
                                                    ? 'uppercase'
                                                    : sectionproperties.prodNameTextTranform == 'Capitalize'
                                                    ? 'capitalize'
                                                    : 'lowercase',
                                        },
                                    ]}
                                >
                                    {item.name}
                                </Text>
                                {sectionproperties.prodCatShow == 'Show' && (
                                    <View
                                        style={[
                                            {
                                                alignItems: props.numberofcols == 1 ? 'center' : 'flex-start',
                                                justifyContent: props.numberofcols == 1 ? 'center' : 'flex-start',
                                            },
                                        ]}
                                    >
                                        <Text
                                            style={{
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
                                                textAlign: 'left',
                                            }}
                                        >
                                            {clip(langdetect == 'en' ? resulten : resultar, 37, { html: true, stripTags: true })}
                                        </Text>
                                    </View>
                                )}
                                <View style={[generalstyles.flexRow]}>
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
                            </View>
                            {sectionproperties.favBtnShow == 'Show' && (
                                <TouchableOpacity
                                    style={[
                                        generalstyles.allcentered,
                                        {
                                            marginStart: 'auto',
                                            marginBottom: 'auto',
                                            width: StyleParseToIntFuncContext(sectionproperties.favBtnWidth),
                                            height: StyleParseToIntFuncContext(sectionproperties.favBtnHeight),
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.fav_btn_borderBottomLeftRadius, '', 'true'),
                                            backgroundColor: item.IsFavExists == true ? sectionproperties.activebgcolor : sectionproperties.favBtnbgColor,
                                            backgroundColor: sectionproperties.favbtn_bgtransparent,
                                            borderWidth: StyleParseToIntFuncContext(sectionproperties.favbtnborderwidth, '', 'true'),
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
                        </View>
                        {/* {sectionproperties.cartBtnShow == 'Show' && (
                            <TouchableOpacity
                                style={[
                                    generalstyles.allcentered,
                                    {
                                        position: 'absolute',
                                        bottom: -30,
                                        width: StyleParseToIntFuncContext(sectionproperties.cartBtnWidth),
                                        height: StyleParseToIntFuncContext(sectionproperties.cartBtnHeight),
                                        backgroundColor: sectionproperties.cartbtn_bgtransparent == 'Transparent' ? 'transparent' : sectionproperties.cartBtnbgColor,
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true),
                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth, '', true),
                                        borderColor: sectionproperties.cartbtnbordercolor,
                                    },
                                ]}
                                onPress={() => {
                                    cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                                }}
                            >
                                <Text
                                    style={{
                                        color: sectionproperties.cartBtnTextcolor,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.cartBtnTextfontsize),
                                        fontFamily:
                                            sectionproperties.cartBtnTextfontweight == 300
                                                ? 'Poppins-Thin'
                                                : sectionproperties.cartBtnTextfontweight == 400
                                                ? 'Pacifico-Regular'
                                                : sectionproperties.cartBtnTextfontweight == 500
                                                ? 'Poppins-Regular'
                                                : sectionproperties.cartBtnTextfontweight == 600
                                                ? 'Poppins-Medium'
                                                : sectionproperties.cartBtnTextfontweight == 700
                                                ? 'Poppins-Semibold'
                                                : 'Poppins-Bold',
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
                            </TouchableOpacity>
                        )} */}
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
                                            marginLeft: 10,
                                            marginRight: 10,
                                            flex: 1,
                                            width: '100%',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: 'Poppins-Medium',
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.quantitybtn_textfontsize),
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
                                                var tempitem = { ...item };
                                                tempitem.quantity = parseInt(tempitem.quantity);
                                                tempitem.quantity = tempitem.quantity + 1;
                                                if (tempitem.quantity <= 0) {
                                                    tempitem.quantity = 0;
                                                }
                                                setitem({ ...tempitem });
                                                addtocartfunc('add', tempitem.quantity);
                                            } else {
                                                ChangeCartItemQuantityContext(item, parseInt(parseInt(item.quantity) + 1));
                                            }
                                        }}
                                    >
                                        <AntDesign name="plus" size={StyleParseToIntFuncContext(sectionproperties.add_quantitybtn_textfontsize)} color={sectionproperties.add_quantitybtn_textcolor} />
                                    </TouchableOpacity>
                                </View>
                            )}
                            {sectionproperties.cartBtnShow == 'Show' && showquantitybtn == false && (
                                <View style={[styles.addtocartbtn, generalstyles.allcentered]}>
                                    <TouchableOpacity
                                        style={[
                                            generalstyles.allcentered,
                                            {
                                                position: 'absolute',
                                                bottom: -30,
                                                width: StyleParseToIntFuncContext(sectionproperties.cartBtnWidth),
                                                height: StyleParseToIntFuncContext(sectionproperties.cartBtnHeight),
                                                backgroundColor: sectionproperties.cartbtn_bgtransparent == 'Transparent' ? 'transparent' : sectionproperties.cartBtnbgColor,
                                                borderRadius: StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true),
                                                borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth, '', true),
                                                borderColor: sectionproperties.cartbtnbordercolor,
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
                                        <Text
                                            style={{
                                                color: sectionproperties.cartBtnTextcolor,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.cartBtnTextfontsize),
                                                fontFamily:
                                                    sectionproperties.cartBtnTextfontweight == 300
                                                        ? 'Poppins-Thin'
                                                        : sectionproperties.cartBtnTextfontweight == 400
                                                        ? 'Pacifico-Regular'
                                                        : sectionproperties.cartBtnTextfontweight == 500
                                                        ? 'Poppins-Regular'
                                                        : sectionproperties.cartBtnTextfontweight == 600
                                                        ? 'Poppins-Medium'
                                                        : sectionproperties.cartBtnTextfontweight == 700
                                                        ? 'Poppins-Semibold'
                                                        : 'Poppins-Bold',
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
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }, [sectionproperties, item.productid, item.quantity]);
    return cardsrender;
};

export default HorizontalProductCardWithQuantityButton;
const styles = StyleSheet.create({});
