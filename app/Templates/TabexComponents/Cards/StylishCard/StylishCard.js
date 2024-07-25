import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { icons, SIZES } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { urlEndpoint } from '../../../../config/imagekit';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { Feather, SimpleLineIcons, FontAwesome5, MaterialCommunityIcons } from 'react-native-vector-icons';
import SpinnerButton from 'react-native-spinner-button';
import ViewMoreText from 'react-native-view-more-text';
import clip from 'text-clipper';
import { useSelector } from 'react-redux';
import { ImageComponent } from '../../../ImageComponent';

const StylishCard = (props) => {
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { cardonclickfunctionContext, showUpTopNotificationBarContext, AddtoCartMutationContext, addtofavoritescontext } = useContext(FetchingContext);
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
    const updatequantity = (type) => {
        var tempitem = { ...item };
        tempitem.quantity = parseInt(tempitem.quantity);
        if (type == 'add') {
            tempitem.quantity = tempitem.quantity + 1;
        } else if (type == 'remove') {
            tempitem.quantity = tempitem.quantity - 1;
        }
        if (tempitem.quantity <= 0) {
            tempitem.quantity = 0;
        }
        setitem({ ...tempitem });
    };
    const addtocartfunc = () => {
        const addtocardpayloadobj = {
            functype: 'add',
            productid: item.productid,
            variantid: '',
            quantity: item.quantity,
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
                    <View style={{ width: '100%' }}>
                        <Text></Text>
                        <SpinnerButton buttonStyle={{ width: 30, height: 30 }} isLoading={true} indicatorCount={10} spinnerType={'MaterialIndicator'} spinnerColor={'white'} />
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
    const cardsrender = React.useMemo(() => {
        return (
            <TouchableOpacity
                style={[
                    styles.productsCard,
                    {
                        width:
                            props.sectiondirection != 'slider'
                                ? SIZES.width > 1024
                                    ? SIZES.width / 4 - StyleParseToIntFuncContext(sectionproperties.card_marginRight) - StyleParseToIntFuncContext(sectionproperties.card_marginLeft)
                                    : SIZES.width > 768
                                    ? SIZES.width / 4 - StyleParseToIntFuncContext(sectionproperties.card_marginRight) - StyleParseToIntFuncContext(sectionproperties.card_marginLeft)
                                    : SIZES.width / 2 - 20
                                : SIZES.width > 1024
                                ? SIZES.width / 5
                                : Platform.OS === 'ios'
                                ? 200
                                : 195,
                        backgroundColor: sectionproperties.backgroundColor,
                        borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.borderBottomLeftRadius, '', true),
                        borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.borderBottomRightRadius, '', true),
                        borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.borderTopLeftRadius, '', true),
                        borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.borderTopRightRadius, '', true),
                        borderWidth: StyleParseToIntFuncContext(sectionproperties.sectioncardborderwidth, '', true),
                        borderColor: sectionproperties.sectioncardbordercolor,
                        marginEnd: StyleParseToIntFuncContext(sectionproperties.card_marginRight != null && sectionproperties.card_marginRight != undefined ? sectionproperties.card_marginRight : 10),
                        marginStart: StyleParseToIntFuncContext(sectionproperties.card_marginLeft != null && sectionproperties.card_marginLeft != undefined ? sectionproperties.card_marginLeft : 10),
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom),
                        position: 'relative',
                    },
                ]}
                onPress={() => {
                    cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                }}
            >
                <View
                    style={[
                        generalstyles.allcentered,
                        {
                            width: '100%',
                            height: StyleParseToIntFuncContext(sectionproperties.image_height, '', true),
                            backgroundColor: sectionproperties.image_bgcolor,
                            borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true),
                            borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true),
                            borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true),
                            borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true),
                            overflow: 'hidden',
                        },
                    ]}
                >
                    <ImageComponent
                        resizeMethod="resize"
                        path={imageurlgrouper()}
                        resizeMode={sectionproperties.bgcovercontain == 'Cover' ? 'cover' : 'contain'}
                        style={[
                            {
                                width: StyleParseToIntFuncContext(sectionproperties.imageInnerWidth_Height) + '%',
                                height: StyleParseToIntFuncContext(sectionproperties.imageInnerWidth_Height) + '%',
                            },
                        ]}
                    />
                </View>
                <View style={[generalstyles.allcentered, { position: 'absolute', top: 5, left: 10 }]}>
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
                                            ? sectionproperties.favbtn_bgtransparent == 'Transparent'
                                                ? 'transparent'
                                                : sectionproperties.activebgcolor
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

                <View style={{ paddingVertical: 10, paddingStart: 10 }}>
                    {sectionproperties.showcashbackcontainer == 'Show' && item.productcashbackvalue > 0 && (
                        <View style={[{ width: '100%', marginBottom: 5, justifyContent: sectionproperties.productnamecentered == 'Centered' ? 'center' : 'flex-start' }]}>
                            <View
                                style={[
                                    generalstyles.flexRow,
                                    generalstyles.allcentered,
                                    {
                                        paddingHorizontal: 4,
                                        // height: 30,
                                        // width: StyleParseToIntFuncContext(sectionproperties.cashbackcontainerwidth) + '%',
                                        height: StyleParseToIntFuncContext(sectionproperties.cashbackcontainerheight),
                                        // background: sectionproperties.cashbackcontainerbgcolor,
                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.cashbackcontainerborderwidth, '', true),
                                        borderStyle: sectionproperties.cashbackcontainerborderstyle,
                                        borderColor: sectionproperties.cashbackcontainerbordercolor,
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.cashbackcontainerborderradius, '', true),
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        {
                                            fontFamily: 'Poppins-Light',
                                            color: sectionproperties.cashbackcontainercolor,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.cashbackcontainerfontsize),
                                        },
                                    ]}
                                >
                                    {langdetect == 'en' ? sectionproperties.cashbackcontainercontenten : sectionproperties.cashbackcontainercontentar}
                                </Text>
                                <Text
                                    style={[
                                        {
                                            fontFamily: 'Poppins-Medium',
                                            color: sectionproperties.cashbackcontainercolor,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.cashbackcontainerfontsize),
                                        },
                                    ]}
                                >
                                    {langdetect == 'en' ? item.currencyname : ''} {item.productcashbackvalue} {langdetect == 'en' ? '' : item.currencyname}
                                </Text>
                            </View>
                        </View>
                    )}
                    {sectionproperties.prodNameShow == 'Show' && (
                        <Text
                            style={{
                                paddingEnd: 10,
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
                                marginBottom: 5,
                            }}
                            numberOfLines={1}
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
                    <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                        <View style={[generalstyles.flexColumn]}>
                            {sectionproperties.prodPriceShow == 'Show' && (
                                <Text
                                    style={{
                                        textAlign: 'left',
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
                                        textAlign: 'left',
                                    }}
                                >
                                    {langdetect == 'en' ? item.currencyname : ''} {item.defaultprice} {langdetect == 'en' ? '' : item.currencyname}
                                </Text>
                            )}
                        </View>
                        <View style={{ marginStart: 'auto' }}>
                            {sectionproperties.cartBtnShow == 'Show' && sectionproperties.quantitybtn_show != 'Show' && (
                                <View
                                    style={[
                                        generalstyles.allcentered,
                                        {
                                            direction: 'ltr',
                                        },
                                    ]}
                                >
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
                                                borderBottomLeftRadius: langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true) : 0,
                                                borderTopRightRadius: langdetect == 'ar' ? StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true) : 0,
                                                borderTopLeftRadius: langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true) : 0,
                                                borderBottomRightRadius: langdetect == 'ar' ? StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true) : 0,
                                                borderColor: sectionproperties.cartbtnbordercolor,
                                                borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth, '', true),
                                                backgroundColor: sectionproperties.cartBtnbgColor,
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
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                    {sectionproperties.quantitybtn_show == 'Show' && (
                        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', marginTop: 5 }}>
                            <View
                                style={[
                                    {
                                        width: StyleParseToIntFuncContext(sectionproperties.quantitybtn_width),
                                        height: StyleParseToIntFuncContext(sectionproperties.quantitybtn_height),
                                        flexDirection: 'row',
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.quantitybtn_borderradius, '', true),
                                        alignItems: 'center',
                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.quantitybtnborderwidth, '', true),
                                        borderColor: sectionproperties.quantitybtnbordercolor,
                                        marginEnd: 5,
                                        backgroundColor: sectionproperties.quantitybtn_bgcolor,
                                    },
                                ]}
                            >
                                {langdetect == 'en' && (
                                    <TouchableOpacity
                                        style={[
                                            generalstyles.allcentered,
                                            {
                                                width: StyleParseToIntFuncContext(sectionproperties.remove_quantitybtn_width),
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
                                )}
                                {langdetect == 'ar' && (
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
                                )}
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
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.quantitybtn_textfontsize),
                                            fontFamily: 'Poppins-Medium',
                                            color: sectionproperties.quantitybtn_textcolor,
                                        }}
                                    >
                                        {item.quantity}
                                    </Text>
                                </View>
                                {langdetect == 'en' && (
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
                                )}
                                {langdetect == 'ar' && (
                                    <TouchableOpacity
                                        style={[
                                            generalstyles.allcentered,
                                            {
                                                width: StyleParseToIntFuncContext(sectionproperties.remove_quantitybtn_width),
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
                                )}
                            </View>
                            <View style={{ marginStart: 'auto' }}>
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
                                                    borderBottomLeftRadius: langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true) : 0,
                                                    borderTopRightRadius: langdetect == 'en' ? 0 : StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true),
                                                    borderTopLeftRadius: langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true) : 0,
                                                    borderBottomRightRadius: langdetect == 'en' ? 0 : StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true),
                                                    borderColor: sectionproperties.cartbtnbordercolor,
                                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth, '', true),
                                                    backgroundColor: sectionproperties.cartBtnbgColor,
                                                },
                                                generalstyles.allcentered,
                                            ]}
                                            onPress={() => {
                                                if (item.hasvariants == 0) {
                                                    addtocartfunc();
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
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    }, [sectionproperties, item.productid]);
    return cardsrender;
};
export default StylishCard;

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
