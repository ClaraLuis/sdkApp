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
import ViewMoreText from 'react-native-view-more-text';
import clip from 'text-clipper';
import SpinnerButton from 'react-native-spinner-button';
import { useSelector } from 'react-redux';
import { ImageComponent } from '../../../ImageComponent';

const CardWithImageOnTop = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const { lang, langdetect } = useContext(LanguageContext);
    const { CurrentPageIdContext, ProjectOpenrcTypeContext, StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { cardonclickfunctionContext, setProductInfoIdContext, addtofavoritescontext, AddtoCartMutationContext, showUpTopNotificationBarContext } = useContext(FetchingContext);
    const { routingcountext, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
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
                        <SpinnerButton buttonStyle={{ width: 25, height: 25 }} isLoading={true} indicatorCount={10} spinnerType={'MaterialIndicator'} spinnerColor={'white'} />
                    </View>
                );
            } else {
                return (
                    <View>
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
                    </View>
                );
            }
        }
        if (!AddtoCartMutationContext.isLoading) {
            return (
                <View>
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
                </View>
            );
        }
    };
    const cardsrender = React.useMemo(() => {
        return (
            <TouchableOpacity
                style={[{ marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom) }]}
                onPress={() => {
                    setProductInfoIdContext(item.productid);
                    routingcountext(StaticPagesLinksContext.ProductInfo);
                }}
            >
                <View
                    style={[
                        styles.productsCard,
                        {
                            width:
                                props.sectiondirection != 'slider'
                                    ? SIZES.width > 1025
                                        ? SIZES.width / 4 - 30
                                        : SIZES.width > 768
                                        ? SIZES.width / 3 - 30
                                        : SIZES.width - 50
                                    : SIZES.width > 1025
                                    ? SIZES.width / 4
                                    : SIZES.width > 768
                                    ? SIZES.width / 3
                                    : Platform.OS === 'ios'
                                    ? SIZES.width - 150
                                    : SIZES.width - 180,
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
                            marginTop: props.numberofcols == 1 ? 65 : 50,
                        },
                    ]}
                >
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
                    <View style={[generalstyles.allcentered, { width: '100%' }]}>
                        <View
                            style={[
                                styles.productsCardImageCont,
                                {
                                    marginTop: props.numberofcols == 1 ? -70 : -50,
                                    borderColor: sectionproperties.image_bordercolor,
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.image_borderwidth, '', true),
                                    borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true),
                                    borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true),
                                    borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true),
                                    borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true),
                                    backgroundColor: sectionproperties.image_bgtransparent == 'Transparent' ? 'transparent' : sectionproperties.image_bgcolor,
                                    width: props.numberofcols == 1 ? 140 : 100,
                                    height: props.numberofcols == 1 ? 140 : 100,
                                },
                            ]}
                        >
                            <ImageComponent
                                path={item.image}
                                style={[
                                    styles.productsCardImage,
                                    {
                                        borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true),
                                        borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true),
                                        borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true),
                                        borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true),
                                        resizeMode: 'contain',
                                    },
                                ]}
                            />
                        </View>
                    </View>
                    {sectionproperties.favBtnShow == 'Show' && (
                        <TouchableOpacity
                            style={[styles.addtowishlistbtn, {}]}
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
                    <View
                        style={[
                            styles.productsCardDesc,
                            {
                                marginTop: props.numberofcols == 1 ? 0 : 5,
                                alignItems: props.numberofcols == 1 ? 'center' : 'flex-start',
                                justifyContent: props.numberofcols == 1 ? 'center' : 'flex-start',
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
                            }}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {item.name}
                        </Text>
                    </View>
                    {sectionproperties.prodCatShow == 'Show' && (
                        <View
                            style={[
                                styles.productsCardDesc,
                                {
                                    alignItems: props.numberofcols == 1 ? 'center' : 'flex-start',
                                    justifyContent: props.numberofcols == 1 ? 'center' : 'flex-start',
                                },
                            ]}
                        >
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
                                }}
                            >
                                {clip(langdetect == 'en' ? item.description_en : item.description_ar, 37, { html: true, stripTags: true })}
                            </ViewMoreText>
                        </View>
                    )}
                    <View style={[generalstyles.flexRow]}>
                        <View
                            style={[
                                generalstyles.flexRow,
                                {
                                    flex: 1,
                                    paddingHorizontal: 10,
                                    paddingBottom: 10,
                                    justifyContent: props.numberofcols == 1 ? 'center' : 'flex-start',
                                },
                            ]}
                        >
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
                    </View>
                    <View style={[generalstyles.flexRow]}>
                        <View
                            style={[
                                {
                                    width: Platform.OS == 'ios' ? 90 : 110,
                                    height: Platform.OS == 'ios' ? 40 : 38,
                                    flexDirection: 'row',
                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.quantitybtn_borderradius, '', true),
                                    alignItems: 'center',
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.quantitybtnborderwidth, '', true),
                                    borderColor: StyleParseToIntFuncContext(sectionproperties.quantitybtnbordercolor),
                                    marginEnd: 5,
                                    marginStart: 5,
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
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.remove_quantitybtn_borderradius, '', true),
                                    },
                                ]}
                                onPress={() => {
                                    updatequantity('remove');
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
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.quantitybtn_textfontsize),
                                        fontFamily: 'Poppins-Medium',
                                        color: sectionproperties.quantitybtn_textcolor,
                                        fontFamily:
                                            sectionproperties.quantitybtn_textfontweight == 300
                                                ? 'Poppins-Thin'
                                                : sectionproperties.quantitybtn_textfontweight == 400
                                                ? 'Poppins-Light'
                                                : sectionproperties.quantitybtn_textfontweight == 500
                                                ? 'Poppins-Regular'
                                                : sectionproperties.quantitybtn_textfontweight == 600
                                                ? 'Poppins-Medium'
                                                : sectionproperties.quantitybtn_textfontweight == 700
                                                ? 'Poppins-Semibold'
                                                : 'Poppins-Bold',
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
                        {sectionproperties.cartBtnShow == 'Show' && (
                            <TouchableOpacity
                                style={[
                                    styles.addtocartbtn,
                                    generalstyles.allcentered,
                                    {
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: sectionproperties.cartBtnbgColor,
                                        borderTopLeftRadius: langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true) : 0,
                                        borderTopRightRadius: langdetect == 'en' ? 0 : StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true),
                                        borderBottomRightRadius: langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true) : 0,
                                        borderBottomLeftRadius: langdetect == 'en' ? 0 : StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true),
                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth, '', true),
                                        borderColor: sectionproperties.cartbtnbordercolor,
                                        width: StyleParseToIntFuncContext(sectionproperties.cartBtnWidth != null && sectionproperties.cartBtnWidth != undefined ? sectionproperties.cartBtnWidth : 40),
                                        height: StyleParseToIntFuncContext(
                                            sectionproperties.cartBtnHeight != null && sectionproperties.cartBtnHeight != undefined ? sectionproperties.cartBtnHeight : 30,
                                        ),
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
                                {addtocartbuttonrender()}
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }, [sectionproperties, item.productid, item.quantity]);
    return cardsrender;
};
export default CardWithImageOnTop;
const styles = StyleSheet.create({
    productsCard: {
        marginTop: 50,
    },
    productsCardImageCont: {
        width: 80,
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    productsCardImage: {
        width: '100%',
        height: '100%',
    },
    productsCardDesc: {
        display: 'flex',
        paddingStart: 10,
        paddingEnd: 10,
    },
    addtocartbtn: {
        width: 40,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        backgroundColor: '#264656',
    },
    addtowishlistbtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 13,
        right: 10,
    },
    hassalestyles: {
        position: 'absolute',
        top: 13,
        left: 10,
        // width: 50,
        // height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
