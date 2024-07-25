import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { SIZES } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { urlEndpoint } from '../../../../config/imagekit';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import ViewMoreText from 'react-native-view-more-text';
import clip from 'text-clipper';
import { useSelector } from 'react-redux';
import { AntDesign, Feather, SimpleLineIcons, FontAwesome5, MaterialCommunityIcons } from 'react-native-vector-icons';
import { ImageComponent } from '../../../ImageComponent';
import SpinnerButton from 'react-native-spinner-button';

const Modernproductcardwithquantitybutton = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const { lang, langdetect } = useContext(LanguageContext);
    const { CurrentPageIdContext, StyleParseToIntFuncContext, ProjectOpenrcTypeContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { cardonclickfunctionContext, showUpTopNotificationBarContext, AddtoCartMutationContext, addtofavoritescontext } = useContext(FetchingContext);
    const { routingcountext, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [item, setitem] = useState(props.cardinfoitemprops);
    const [StatePageProperties, setStatePageProperties] = useState({});
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
                    <View style={[generalstyles.allcentered, {}]}>
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
    const cartbtn = () => {
        return (
            // generalstyles.allcentered,
            <View style={[{ flexDirection: 'row', marginTop: 10 }]}>
                {showquantitybtn == true && sectionproperties.cartBtnShow == 'Show' && (
                    <View
                        style={[
                            {
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: sectionproperties.quantitybtn_width == 0 ? '100%' : StyleParseToIntFuncContext(sectionproperties.quantitybtn_width),
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
                                            ? StyleParseToIntFuncContext(sectionproperties.innerquantbtnbordertopleftradius, '', true)
                                            : StyleParseToIntFuncContext(sectionproperties.innerquantbtnbordertoprightradius, '', true),
                                    borderTopRightRadius:
                                        langdetect == 'en'
                                            ? StyleParseToIntFuncContext(sectionproperties.innerquantbtnbordertoprightradius, '', true)
                                            : StyleParseToIntFuncContext(sectionproperties.innerquantbtnbordertopleftradius, '', true),
                                    borderBottomLeftRadius:
                                        langdetect == 'en'
                                            ? StyleParseToIntFuncContext(sectionproperties.innerquantbtnborderbottomleftradius, '', true)
                                            : StyleParseToIntFuncContext(sectionproperties.innerquantbtnborderbottomrightradius, '', true),
                                    borderBottomRightRadius:
                                        langdetect == 'en'
                                            ? StyleParseToIntFuncContext(sectionproperties.innerquantbtnborderbottomrightradius, '', true)
                                            : StyleParseToIntFuncContext(sectionproperties.innerquantbtnborderbottomleftradius, '', true),
                                },
                            ]}
                            onPress={(e) => {
                                e.stopPropagation();

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
                                    cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                                }
                            }}
                        >
                            <AntDesign name="minus" size={StyleParseToIntFuncContext(sectionproperties.remove_quantitybtn_textfontsize)} color={sectionproperties.remove_quantitybtn_textcolor} />
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
                                {addtocartbuttonrender()}
                                {/* {item.quantity} */}
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
                                            ? StyleParseToIntFuncContext(sectionproperties.innerquantbtnbordertoprightradius, '', true)
                                            : StyleParseToIntFuncContext(sectionproperties.innerquantbtnbordertopleftradius, '', true),
                                    borderTopRightRadius:
                                        langdetect == 'en'
                                            ? StyleParseToIntFuncContext(sectionproperties.innerquantbtnbordertopleftradius, '', true)
                                            : StyleParseToIntFuncContext(sectionproperties.innerquantbtnbordertoprightradius, '', true),
                                    borderBottomLeftRadius:
                                        langdetect == 'en'
                                            ? StyleParseToIntFuncContext(sectionproperties.innerquantbtnborderbottomrightradius, '', true)
                                            : StyleParseToIntFuncContext(sectionproperties.innerquantbtnborderbottomleftradius, '', true),
                                    borderBottomRightRadius:
                                        langdetect == 'en'
                                            ? StyleParseToIntFuncContext(sectionproperties.innerquantbtnborderbottomleftradius, '', true)
                                            : StyleParseToIntFuncContext(sectionproperties.innerquantbtnborderbottomrightradius, '', true),
                                },
                            ]}
                            onPress={(e) => {
                                e.stopPropagation();

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
                            <AntDesign name="plus" size={StyleParseToIntFuncContext(sectionproperties.add_quantitybtn_textfontsize)} color={sectionproperties.add_quantitybtn_textcolor} />
                        </TouchableOpacity>
                    </View>
                )}
                {sectionproperties.cartBtnShow == 'Show' && showquantitybtn == false && (
                    <View
                        style={[
                            generalstyles.allcentered,
                            {
                                width: '100%',
                            },
                        ]}
                    >
                        <TouchableOpacity
                            style={[
                                {
                                    marginStart: 'auto',
                                    width:
                                        sectionproperties.cartBtnWidth == 0
                                            ? '100%'
                                            : StyleParseToIntFuncContext(sectionproperties.cartBtnWidth != null && sectionproperties.cartBtnWidth != undefined ? sectionproperties.cartBtnWidth : 33),
                                    height: StyleParseToIntFuncContext(sectionproperties.cartBtnHeight != null && sectionproperties.cartBtnHeight != undefined ? sectionproperties.cartBtnHeight : 33),
                                    borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.cartbtnupperborderradius, '', true),
                                    borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.cartbtnupperborderradius, '', true),
                                    borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.cartbtnlowerborderradius, '', true),
                                    borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.cartbtnlowerborderradius, '', true),
                                    borderColor: sectionproperties.cartbtnbordercolor,
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth, '', true),
                                    backgroundColor: sectionproperties.cartBtnbgColor,
                                },
                                generalstyles.allcentered,
                            ]}
                            onPress={(e) => {
                                e.stopPropagation();
                                if (item.hasvariants == 0) {
                                    setshowquantitybtn(true);

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
                            {StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize) != 0 && (
                                <>
                                    {sectionproperties.carticonstyle == 'Shopping cart 1' && (
                                        <MaterialCommunityIcons
                                            name="cart-outline"
                                            size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                            color={sectionproperties.cartBtnTextcolor}
                                        />
                                    )}
                                    {sectionproperties.carticonstyle == 'Shopping bag 1' && (
                                        <Feather
                                            name="shopping-bag"
                                            size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                            style={{
                                                color: sectionproperties.cartBtnTextcolor,
                                            }}
                                        />
                                    )}
                                    {sectionproperties.carticonstyle == 'Shopping bag 2' && (
                                        <SimpleLineIcons
                                            name="handbag"
                                            size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                            style={{
                                                color: sectionproperties.cartBtnTextcolor,
                                            }}
                                        />
                                    )}
                                    {sectionproperties.carticonstyle == 'Shopping bag 3' && (
                                        <FontAwesome5
                                            name="shopping-bag"
                                            size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                            style={{
                                                color: sectionproperties.cartBtnTextcolor,
                                            }}
                                        />
                                    )}
                                    {sectionproperties.carticonstyle == 'Shopping bag 4' && (
                                        <SimpleLineIcons
                                            name="bag"
                                            size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                            style={{
                                                color: sectionproperties.cartBtnTextcolor,
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
                                                tintColor: sectionproperties.cartBtnTextcolor,
                                            }}
                                        />
                                    )}
                                    {sectionproperties.carticonstyle == 'Plus Icon' && (
                                        <AntDesign
                                            name="plus"
                                            size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                            style={{
                                                color: sectionproperties.cartBtnTextcolor,
                                                paddingStart: Platform.OS === 'ios' ? 1 : 0,
                                                paddingTop: Platform.OS === 'ios' ? 1 : 0,
                                            }}
                                        />
                                    )}
                                </>
                            )}
                            {StyleParseToIntFuncContext(sectionproperties.cartBtnTextfontsize) != 0 && (
                                <Text
                                    style={{
                                        color: sectionproperties.cartBtnTextcolor,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.cartBtnTextfontsize),
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
                                        textTransform:
                                            sectionproperties.cartBtnTexttransform == 'Uppercase'
                                                ? 'uppercase'
                                                : sectionproperties.cartBtnTexttransform == 'Capitalize'
                                                ? 'capitalize'
                                                : sectionproperties.cartBtnTexttransform == 'Lowercase'
                                                ? 'lowercase'
                                                : 'none',
                                    }}
                                >
                                    {langdetect == 'en' ? sectionproperties.cartBtnContentenglish : sectionproperties.cartBtnContentarabic}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    };
    const cardsrender = React.useMemo(() => {
        return (
            <TouchableOpacity
                style={[
                    styles.productsCard,
                    {
                        width:
                            props.sectiondirection != 'slider'
                                ? SIZES.width > 1024
                                    ? SIZES.width / 4 - 65
                                    : SIZES.width > 768
                                    ? SIZES.width / 4 - 5
                                    : Platform.OS === 'ios'
                                    ? SIZES.width / 2 - 10
                                    : SIZES.width / 2 - 5
                                : SIZES.width > 1024
                                ? SIZES.width / 5
                                : StyleParseToIntFuncContext(sectionproperties.width, '', true),
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

                        position: 'relative',
                        paddingEnd: StyleParseToIntFuncContext(sectionproperties.card_marginRight != null && sectionproperties.card_marginRight != undefined ? sectionproperties.card_marginRight : 10),
                        paddingStart: StyleParseToIntFuncContext(sectionproperties.card_marginLeft != null && sectionproperties.card_marginLeft != undefined ? sectionproperties.card_marginLeft : 10),
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom),
                        marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop),
                    },
                ]}
                onPress={() => {
                    cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                }}
            >
                <View
                    style={{
                        width: '100%',
                        backgroundColor: sectionproperties.backgroundColortransparent == 'Transparent' ? 'transparent' : sectionproperties.backgroundColor,
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
                        borderWidth: StyleParseToIntFuncContext(sectionproperties.sectioncardborderwidth, '', true),
                        borderColor: sectionproperties.sectioncardbordercolor,
                    }}
                >
                    <View
                        style={{
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
                            width: '100%',
                            overflow: 'hidden',
                        }}
                    >
                        <ImageComponent
                            resizeMethod="resize"
                            path={imageurlgrouper()}
                            resizeMode={sectionproperties.bgcovercontain == 'Cover' ? 'cover' : 'contain'}
                            style={[
                                {
                                    width: '100%',
                                    height: StyleParseToIntFuncContext(sectionproperties.image_height, '', true),
                                    backgroundColor: sectionproperties.image_bgtransparent == 'Transparent' ? 'transparent' : sectionproperties.image_bgcolor,
                                },
                            ]}
                        />
                        {sectionproperties.buttonposition == 'On top of image' && (
                            <View style={{ position: 'absolute', bottom: 10, right: StyleParseToIntFuncContext(sectionproperties.cartbadgeright) }}>{cartbtn()}</View>
                        )}
                    </View>
                    <View style={[generalstyles.allcentered, { position: 'absolute', top: 5, left: 10 }]}>
                        {sectionproperties.showbadge == 'Show' && item.hassale != 0 && (
                            <View
                                style={[
                                    styles.hassalestyles,
                                    {
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: StyleParseToIntFuncContext(sectionproperties.badge_width),
                                        height: StyleParseToIntFuncContext(sectionproperties.badge_height),
                                        backgroundColor: sectionproperties.badge_bgcolor,
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.badge_borderradius),
                                        borderColor: sectionproperties.badgebordercolor,
                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.badgeborderwidth),
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
                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.pillBorderWidth),
                                        borderColor: sectionproperties.pillBorderColor,
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        generalstyles.poppinsMedium,
                                        { color: sectionproperties.pillcolor, fontSize: StyleParseToIntFuncContext(sectionproperties.pillfontSize), direction: 'ltr' },
                                    ]}
                                >
                                    {'-' + parseFloat(Math.round(10.0 * ((parseInt(item.defaultprice) - parseInt(item.defaultsaleprice)) / parseInt(item.defaultprice)) * 100) / 10.0).toFixed(0) + '%'}
                                </Text>
                            </View>
                        )}
                    </View>

                    <View style={{ position: 'absolute', top: 5, right: 10 }}>
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
                                        backgroundColor:
                                            item.IsFavExists == true
                                                ? sectionproperties.activebgcolor
                                                : sectionproperties.favbtn_bgtransparent == 'Transparent'
                                                ? 'transparent'
                                                : sectionproperties.favBtnbgColor,
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
                    <View style={[generalstyles.flexColumn, { paddingVertical: 10, paddingHorizontal: 12, paddingBottom: 0, width: '100%' }]}>
                        {sectionproperties.wordbreak == 1 && (
                            <Text
                                style={{
                                    textAlign: 'left',
                                    marginBottom: 1,
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
                                }}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {item.name}
                            </Text>
                        )}
                        {sectionproperties.wordbreak == 2 && (
                            <Text
                                style={{
                                    textAlign: 'left',
                                    marginBottom: 1,
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
                                }}
                                numberOfLines={2}
                                ellipsizeMode="tail"
                            >
                                {item.name}
                            </Text>
                        )}
                        {sectionproperties.prodCatShow == 'Show' && (
                            <View>
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
                                        textAlign: 'left',
                                    }}
                                >
                                    {clip(langdetect == 'en' ? item.description_en : item.description_ar, 23, { html: true, stripTags: true })}
                                </ViewMoreText>
                            </View>
                        )}
                        {sectionproperties.priceDirection == 'Horizontal Direction' && (
                            <View style={{ flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', marginTop: 4 }}>
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
                                    {sectionproperties.prodsalePriceshow == 'Show' && item.defaultsaleprice != 0 && (
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
                                            }}
                                        >
                                            {langdetect == 'en' ? item.currencyname : ''} {item.defaultprice} {langdetect == 'en' ? '' : item.currencyname}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        )}
                        {sectionproperties.priceDirection == 'Vertical Direction' && (
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <View style={{ flexDirection: 'column', width: '80%', alignItems: 'flex-start', marginTop: 4 }}>
                                    {sectionproperties.prodsalePriceshow == 'Show' && item.defaultsaleprice != 0 && (
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
                                            }}
                                        >
                                            {langdetect == 'en' ? item.currencyname : ''} {item.defaultprice} {langdetect == 'en' ? '' : item.currencyname}
                                        </Text>
                                    )}
                                    {sectionproperties.prodsalePriceshow == 'Show' && item.defaultsaleprice == 0 && <Text></Text>}
                                    {sectionproperties.prodPriceShow == 'Show' && (
                                        <Text
                                            style={{
                                                color: sectionproperties.prodPriceColor,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.prodpriceFontSize),
                                                lineHeight: 20,
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
                                </View>
                                {sectionproperties.cartBtnShow == 'Show' && showquantitybtn == false && (
                                    <View style={[generalstyles.allcentered]}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                                            }}
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
                                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth, '', true),
                                                    backgroundColor: sectionproperties.cartbtn_bgtransparent == 'Transparent' ? 'transparent' : sectionproperties.cartBtnbgColor,
                                                },
                                                generalstyles.allcentered,
                                            ]}
                                        >
                                            {sectionproperties.carticonstyle == 'Shopping cart 1' && (
                                                <MaterialCommunityIcons
                                                    name="cart-outline"
                                                    size={StyleParseToIntFuncContext(sectionproperties.cartBtnTextfontsize)}
                                                    color={sectionproperties.cartBtnTextcolor}
                                                    style={{
                                                        color: sectionproperties.cartBtnTextcolor,
                                                        paddingStart: Platform.OS === 'ios' ? 1 : 0,
                                                        paddingTop: Platform.OS === 'ios' ? 1 : 0,
                                                    }}
                                                />
                                            )}
                                            {sectionproperties.carticonstyle == 'Shopping bag 1' && (
                                                <Feather
                                                    name="shopping-bag"
                                                    size={StyleParseToIntFuncContext(sectionproperties.cartBtnTextfontsize)}
                                                    style={{
                                                        color: sectionproperties.cartBtnTextcolor,
                                                        paddingStart: Platform.OS === 'ios' ? 1 : 0,
                                                        paddingTop: Platform.OS === 'ios' ? 1 : 0,
                                                    }}
                                                />
                                            )}
                                            {sectionproperties.carticonstyle == 'Shopping bag 2' && (
                                                <SimpleLineIcons
                                                    name="handbag"
                                                    size={StyleParseToIntFuncContext(sectionproperties.cartBtnTextfontsize)}
                                                    style={{
                                                        color: sectionproperties.cartBtnTextcolor,
                                                        paddingStart: Platform.OS === 'ios' ? 1 : 0,
                                                        paddingTop: Platform.OS === 'ios' ? 1 : 0,
                                                    }}
                                                />
                                            )}
                                            {sectionproperties.carticonstyle == 'Shopping bag 3' && (
                                                <FontAwesome5
                                                    name="shopping-bag"
                                                    size={StyleParseToIntFuncContext(sectionproperties.cartBtnTextfontsize)}
                                                    style={{
                                                        color: sectionproperties.cartBtnTextcolor,
                                                        paddingStart: Platform.OS === 'ios' ? 1 : 0,
                                                        paddingTop: Platform.OS === 'ios' ? 1 : 0,
                                                    }}
                                                />
                                            )}
                                            {sectionproperties.carticonstyle == 'Shopping bag 4' && (
                                                <SimpleLineIcons
                                                    name="bag"
                                                    size={StyleParseToIntFuncContext(sectionproperties.cartBtnTextfontsize)}
                                                    style={{
                                                        color: sectionproperties.cartBtnTextcolor,
                                                        paddingStart: Platform.OS === 'ios' ? 1 : 0,
                                                        paddingTop: Platform.OS === 'ios' ? 1 : 0,
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
                                                            sectionproperties.cartBtnTextfontsize != null && sectionproperties.cartBtnTextfontsize != undefined
                                                                ? sectionproperties.cartBtn_iconFontSize
                                                                : 0,
                                                        ),
                                                        height: StyleParseToIntFuncContext(
                                                            sectionproperties.cartBtnTextfontsize != null && sectionproperties.cartBtnTextfontsize != undefined
                                                                ? sectionproperties.cartBtn_iconFontSize
                                                                : 0,
                                                        ),
                                                        tintColor: sectionproperties.cartBtnTextcolor,
                                                    }}
                                                />
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                    {sectionproperties.buttonposition == 'bottom' && cartbtn()}
                </View>
            </TouchableOpacity>
        );
    }, [sectionproperties, item.productid, item.quantity]);
    return cardsrender;
};
export default Modernproductcardwithquantitybutton;

const styles = StyleSheet.create({
    productsCard: {
        // flex: 1,
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
        // position: 'absolute',
        // top: 5,
        // right: 6,
        // width: 50,
        // height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
