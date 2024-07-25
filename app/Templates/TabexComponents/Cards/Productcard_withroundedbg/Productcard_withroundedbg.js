import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { SIZES } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { ImageComponent } from '../../../ImageComponent';
// import StarRating from 'react-native-star-rating';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import SpinnerButton from 'react-native-spinner-button';
import RenderHtml from 'react-native-render-html';
import Stars from 'react-native-stars';
import { FontAwesome } from '@expo/vector-icons';

const Productcard_withroundedbg = (props) => {
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { routingcountext, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
    const { cardonclickfunctionContext, addtofavoritescontext, showUpTopNotificationBarContext, AddtoCartMutationContext, isAddtoCartMutationContextDone } = useContext(FetchingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [item, setitem] = useState(props.cardinfoitemprops);
    const [index, setindex] = useState(props.cardinfoindexprops);
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
    const addtocartfunc = () => {
        AddtoCartMutationContext.mutate({
            functype: 'add',
            item_type: 'product',
            productid: item.productid,
            quantity: 1,
        });
        if (AddtoCartMutationContext.isLoading == false) {
            setTimeout(function () {
                routingcountext(StaticPagesLinksContext.Checkout);
            }, 2000);
        }
    };
    const sourceshortdesc = {
        html: item.shortdescription,
    };
    const cardsrender = React.useMemo(() => {
        return (
            <TouchableOpacity
                style={[
                    styles.productsCard,
                    {
                        backgroundColor: sectionproperties.backgroundColor,
                        borderTopRightRadius:
                            langdetect == 'en'
                                ? StyleParseToIntFuncContext(sectionproperties.borderTopRightRadius, '', true)
                                : StyleParseToIntFuncContext(sectionproperties.borderTopLeftRadius, '', true),
                        borderTopLeftRadius:
                            langdetect == 'en'
                                ? StyleParseToIntFuncContext(sectionproperties.borderTopLeftRadius, '', true)
                                : StyleParseToIntFuncContext(sectionproperties.borderTopRightRadius, '', true),
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
                        // width:
                        //     props.sectiondirection != 'slider'
                        //         ? SIZES.width > 1024
                        //             ? SIZES.width / 5 - 20
                        //             : SIZES.width > 768
                        //             ? SIZES.width / 4
                        //             : Platform.OS === 'ios'
                        //             ? SIZES.width - 215
                        //             : SIZES.width - 200
                        //         : SIZES.width > 1024
                        //         ? SIZES.width / 5 - 10
                        //         : SIZES.width > 768
                        //         ? SIZES.width / 4
                        //         : Platform.OS === 'ios'
                        // ? SIZES.width - StyleParseToIntFuncContext(sectionproperties.width)
                        // : SIZES.width - StyleParseToIntFuncContext(sectionproperties.width) - 20,
                        width:
                            props.sectiondirection != 'slider'
                                ? SIZES.width > 1024
                                    ? SIZES.width / 5 - StyleParseToIntFuncContext(sectionproperties.card_marginLeft) - StyleParseToIntFuncContext(sectionproperties.card_marginRight)
                                    : SIZES.width > 768
                                    ? SIZES.width / 4 - StyleParseToIntFuncContext(sectionproperties.card_marginLeft) - StyleParseToIntFuncContext(sectionproperties.card_marginRight)
                                    : Platform.OS === 'ios'
                                    ? SIZES.width / props.numberOfColsvertical -
                                      StyleParseToIntFuncContext(sectionproperties.card_marginRight) -
                                      StyleParseToIntFuncContext(sectionproperties.card_marginLeft)
                                    : // SIZES.width - 230
                                      SIZES.width / props.numberOfColsvertical -
                                      StyleParseToIntFuncContext(sectionproperties.card_marginRight) -
                                      StyleParseToIntFuncContext(sectionproperties.card_marginLeft)
                                : SIZES.width > 1024
                                ? SIZES.width / 5 - StyleParseToIntFuncContext(sectionproperties.card_marginLeft) - StyleParseToIntFuncContext(sectionproperties.card_marginRight)
                                : SIZES.width > 768
                                ? SIZES.width / 4 - StyleParseToIntFuncContext(sectionproperties.card_marginLeft) - StyleParseToIntFuncContext(sectionproperties.card_marginRight)
                                : Platform.OS === 'ios'
                                ? SIZES.width - StyleParseToIntFuncContext(sectionproperties.width)
                                : sectionproperties.width < 300
                                ? // : SIZES.width - StyleParseToIntFuncContext(sectionproperties.width) + 40,
                                  SIZES.width - StyleParseToIntFuncContext(sectionproperties.width) + 35
                                : SIZES.width - StyleParseToIntFuncContext(sectionproperties.width) - 20,
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom != null && sectionproperties.marginBottom != undefined ? sectionproperties.marginBottom : 0),
                        marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop != null && sectionproperties.marginTop != undefined ? sectionproperties.marginTop : 0),
                        marginLeft: langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.card_marginLeft) : StyleParseToIntFuncContext(sectionproperties.card_marginRight),
                        marginRight: langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.card_marginRight) : StyleParseToIntFuncContext(sectionproperties.card_marginLeft),
                        paddingLeft: langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.paddingLeft) : StyleParseToIntFuncContext(sectionproperties.paddingRight),
                        paddingRight: langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.paddingRight) : StyleParseToIntFuncContext(sectionproperties.paddingLeft),
                        paddingBottom: StyleParseToIntFuncContext(sectionproperties.paddingBottom),
                        paddingTop: StyleParseToIntFuncContext(sectionproperties.paddingTop),
                    },
                ]}
                onPress={() => {
                    cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                }}
            >
                <View style={{ width: '100%' }}>
                    {sectionproperties.image_height != 0 && (
                        <View
                            style={[
                                styles.productsCardImageCont,
                                generalstyles.allcentered,
                                {
                                    position: 'relative',
                                    borderColor: sectionproperties.image_bordercolor,
                                    // borderWidth: StyleParseToIntFuncContext(sectionproperties.image_borderwidth, '', true),
                                    borderWidth: sectionproperties.image_borderType == 'All' ? StyleParseToIntFuncContext(sectionproperties.image_borderwidth, '', true) : 0,
                                    borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.image_borderwidth, '', true),

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
                                    height:
                                        StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true) == 100 &&
                                        StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true) == 100 &&
                                        (StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true) == 100) &
                                            (StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true) == 100)
                                            ? props.sectiondirection != 'slider'
                                                ? SIZES.width > 1024
                                                    ? SIZES.width / 5 - StyleParseToIntFuncContext(sectionproperties.card_marginLeft) - StyleParseToIntFuncContext(sectionproperties.card_marginRight)
                                                    : SIZES.width > 768
                                                    ? SIZES.width / 4 - StyleParseToIntFuncContext(sectionproperties.card_marginLeft) - StyleParseToIntFuncContext(sectionproperties.card_marginRight)
                                                    : Platform.OS === 'ios'
                                                    ? SIZES.width / props.numberOfColsvertical -
                                                      StyleParseToIntFuncContext(sectionproperties.card_marginRight) -
                                                      StyleParseToIntFuncContext(sectionproperties.card_marginLeft)
                                                    : // SIZES.width - 230
                                                      SIZES.width - 215
                                                : SIZES.width > 1024
                                                ? SIZES.width / 5 - StyleParseToIntFuncContext(sectionproperties.card_marginLeft) - StyleParseToIntFuncContext(sectionproperties.card_marginRight)
                                                : SIZES.width > 768
                                                ? SIZES.width / 4 - StyleParseToIntFuncContext(sectionproperties.card_marginLeft) - StyleParseToIntFuncContext(sectionproperties.card_marginRight)
                                                : Platform.OS === 'ios'
                                                ? SIZES.width - StyleParseToIntFuncContext(sectionproperties.width)
                                                : // : SIZES.width - StyleParseToIntFuncContext(sectionproperties.width) + 40,
                                                  SIZES.width - StyleParseToIntFuncContext(sectionproperties.width) - 20
                                            : StyleParseToIntFuncContext(sectionproperties.image_height != null && sectionproperties.image_height != undefined ? sectionproperties.image_height : 0),
                                    paddingBottom: StyleParseToIntFuncContext(sectionproperties.image_mb),
                                    overflow: 'hidden',
                                },
                            ]}
                        >
                            <ImageComponent
                                path={imageurlgrouper()}
                                resizeMode={sectionproperties.bgcovercontain == 'Cover' ? 'cover' : 'contain'}
                                style={[
                                    {
                                        width: StyleParseToIntFuncContext(sectionproperties.imageInnerWidth_Height) + '%',
                                        height: StyleParseToIntFuncContext(sectionproperties.imageInnerWidth_Height) + '%',
                                        resizeMode: sectionproperties.bgcovercontain == 'Cover' ? 'cover' : 'contain',

                                        // borderTopLeftRadius:
                                        //     langdetect == 'en'
                                        //         ? StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true)
                                        //         : StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true),
                                        // borderTopRightRadius:
                                        //     langdetect == 'en'
                                        //         ? StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true)
                                        //         : StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true),
                                        // borderBottomLeftRadius:
                                        //     langdetect == 'en'
                                        //         ? StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true)
                                        //         : StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true),
                                        // borderBottomRightRadius:
                                        //     langdetect == 'en'
                                        //         ? StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true)
                                        //         : StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true),
                                        opacity: sectionproperties.showoutofstock == 'Show' && item.quantavailtype == 'limit' && item.currentquantity < 1 && item.hasvariants == 0 ? 0.4 : 1,
                                    },
                                ]}
                                resizeMethod="resize"
                            />
                            {sectionproperties.showbadge == 'Show' && item.hassale != 0 && sectionproperties.btnposition == 'Top' && (
                                <View
                                    style={[
                                        styles.hassalestyles,
                                        {
                                            width: StyleParseToIntFuncContext(sectionproperties.badge_width),
                                            height: StyleParseToIntFuncContext(sectionproperties.badge_height),
                                            backgroundColor: sectionproperties.badge_bgcolor,
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.badge_borderradius),
                                            top: 5,
                                            left: 3,
                                        },
                                    ]}
                                >
                                    <Text style={[generalstyles.poppinsMedium, { color: sectionproperties.badge_color, fontSize: StyleParseToIntFuncContext(sectionproperties.badge_fontsize) }]}>
                                        {langdetect == 'en' ? sectionproperties.badgeContentEn : sectionproperties.badgeContentAr}
                                    </Text>
                                </View>
                            )}
                            {sectionproperties.showbadge == 'Show' && item.hassale != 0 && sectionproperties.btnposition == 'Bottom' && (
                                <View
                                    style={[
                                        styles.hassalestyles,
                                        {
                                            width: StyleParseToIntFuncContext(sectionproperties.badge_width),
                                            height: StyleParseToIntFuncContext(sectionproperties.badge_height),
                                            backgroundColor: sectionproperties.badge_bgcolor,
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.badge_borderradius),
                                            bottom: 10,
                                        },
                                    ]}
                                >
                                    <Text style={[generalstyles.poppinsMedium, { color: sectionproperties.badge_color, fontSize: StyleParseToIntFuncContext(sectionproperties.badge_fontsize) }]}>
                                        {langdetect == 'en' ? sectionproperties.badgeContentEn : sectionproperties.badgeContentAr}
                                    </Text>
                                </View>
                            )}
                            {sectionproperties.favBtnShow == 'Show' && sectionproperties.btnposition == 'Bottom' && (
                                <TouchableOpacity
                                    style={[
                                        styles.addtowishlistbtn,
                                        generalstyles.shadow,
                                        {
                                            backgroundColor: item.IsFavExists ? sectionproperties.activebgcolor : sectionproperties.favBtnbgColor,
                                            width: StyleParseToIntFuncContext(sectionproperties.favBtnWidth),
                                            height: StyleParseToIntFuncContext(sectionproperties.favBtnHeight),
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.fav_btn_borderBottomLeftRadius, '', true),
                                            borderColor: sectionproperties.favbtnbordercolor,
                                            borderWidth: StyleParseToIntFuncContext(sectionproperties.favbtnborderwidth, '', true),
                                            bottom: 3,
                                            right: 7,
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
                            {sectionproperties.favBtnShow == 'Show' && sectionproperties.btnposition == 'Top' && (
                                <TouchableOpacity
                                    style={[
                                        styles.addtowishlistbtn,
                                        generalstyles.shadow,
                                        {
                                            backgroundColor: item.IsFavExists ? sectionproperties.activebgcolor : sectionproperties.favBtnbgColor,
                                            width: StyleParseToIntFuncContext(sectionproperties.favBtnWidth),
                                            height: StyleParseToIntFuncContext(sectionproperties.favBtnHeight),
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.fav_btn_borderBottomLeftRadius, '', true),
                                            borderColor: sectionproperties.favbtnbordercolor,
                                            borderWidth: StyleParseToIntFuncContext(sectionproperties.favbtnborderwidth, '', true),
                                            top: StyleParseToIntFuncContext(sectionproperties.favbtnpositionfromtop),
                                            right: StyleParseToIntFuncContext(sectionproperties.favbtnpositionfromright),
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
                            {/* item.currentquantity < 1 && */}
                            {sectionproperties.showoutofstock == 'Show' && item.quantavailtype == 'limit' && item.hasvariants == 0 && item.currentquantity < 1 && (
                                <View
                                    style={[
                                        generalstyles.allcentered,
                                        {
                                            width: '100%',
                                            height: '100%',
                                            position: 'absolute',
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
                                    <Text
                                        style={[
                                            generalstyles.poppinsMedium,
                                            { color: sectionproperties.pillcolor, fontSize: StyleParseToIntFuncContext(sectionproperties.pillfontSize), direction: 'ltr' },
                                        ]}
                                    >
                                        {'-' +
                                            parseFloat(Math.round(10.0 * ((parseInt(item.defaultprice) - parseInt(item.defaultsaleprice)) / parseInt(item.defaultprice)) * 100) / 10.0).toFixed(0) +
                                            '%'}{' '}
                                    </Text>
                                </View>
                            )}
                        </View>
                    )}
                    <View
                        style={[
                            styles.productsCardDesc,
                            generalstyles.allcentered,
                            {
                                display:
                                    sectionproperties.showrating == 'Hide' &&
                                    sectionproperties.prodNameShow == 'Hide' &&
                                    sectionproperties.prodPriceShow == 'Hide' &&
                                    sectionproperties.prodsalePriceshow == 'Hide' &&
                                    sectionproperties.showcashbackcontainer == 'Hide' &&
                                    sectionproperties.cartBtnShow == 'Hide'
                                        ? 'none'
                                        : 'flex',
                            },
                        ]}
                    >
                        {item.productcanrate == 1 && sectionproperties.showrating == 'Show' && (
                            <View style={{ justifyContent: 'flex-start', width: '100%' }}>
                                <View
                                    style={{
                                        width: '30%',
                                    }}
                                >
                                    <Stars
                                        disabled={true}
                                        display={item.productoverallrate}
                                        spacing={1}
                                        count={5}
                                        half={true}
                                        fullStar={<FontAwesome name={'star'} size={14} color="#FAB400" />}
                                        emptyStar={<FontAwesome name={'star-o'} size={14} color="#FAB400" />}
                                        halfStar={<FontAwesome name={'star-half-empty'} size={14} color="#FAB400" />}
                                    />
                                    {/* <StarRating disabled={true} maxStars={5} rating={item.productoverallrate} starSize={17} fullStarColor="#FAB400" emptyStarColor="#FAB400" /> */}
                                </View>
                            </View>
                        )}
                        {/* short description */}

                        {sectionproperties.prodNameShow == 'Show' && sectionproperties.wordbreak == '1' && (
                            <Text
                                ellipsizeMode="tail"
                                numberOfLines={1}
                                style={[
                                    {
                                        width: '100%',
                                        textAlign: sectionproperties.productnamecentered == 'Centered' ? 'center' : 'left',
                                        color: sectionproperties.prodNameColor,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.prodNameFontSize),
                                        marginTop: 5,
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
                                                : sectionproperties.prodNameTextTranform == 'Lowercase'
                                                ? 'lowercase'
                                                : 'none',
                                        marginBottom: 1,
                                    },
                                ]}
                            >
                                {item.name}
                            </Text>
                        )}
                        {sectionproperties.prodNameShow == 'Show' && sectionproperties.wordbreak != '1' && sectionproperties.wordbreak != '2' && (
                            <Text
                                ellipsizeMode="tail"
                                style={[
                                    {
                                        width: '100%',
                                        textAlign: sectionproperties.productnamecentered == 'Centered' ? 'center' : 'left',
                                        color: sectionproperties.prodNameColor,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.prodNameFontSize),
                                        marginTop: 5,
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
                                                : sectionproperties.prodNameTextTranform == 'Lowercase'
                                                ? 'lowercase'
                                                : 'none',
                                        marginBottom: 1,
                                    },
                                ]}
                            >
                                {item.name}
                            </Text>
                        )}
                        {sectionproperties.prodNameShow == 'Show' && sectionproperties.wordbreak == '2' && (
                            <Text
                                ellipsizeMode="tail"
                                numberOfLines={2}
                                style={[
                                    {
                                        width: '100%',
                                        textAlign: sectionproperties.productnamecentered == 'Centered' ? 'center' : 'left',
                                        color: sectionproperties.prodNameColor,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.prodNameFontSize),
                                        marginTop: 5,
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
                                                : sectionproperties.prodNameTextTranform == 'Lowercase'
                                                ? 'lowercase'
                                                : 'none',
                                        marginBottom: 1,
                                        minHeight: 40,
                                    },
                                ]}
                            >
                                {item.name}
                            </Text>
                        )}
                        {/* {sectionproperties.prodNameShow == 'Show' && (
                            <Text
                                ellipsizeMode="tail"
                                style={[
                                    {
                                        width: '100%',
                                        textAlign: sectionproperties.productnamecentered == 'Centered' ? 'center' : 'left',
                                        color: sectionproperties.prodNameColor,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.prodNameFontSize),
                                        marginTop: 5,
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
                                                : sectionproperties.prodNameTextTranform == 'Lowercase'
                                                ? 'lowercase'
                                                : 'none',
                                        marginBottom: 1,
                                    },
                                ]}
                            >
                                <RenderHtml
                                    source={sourceshortdesc}
                                    tagsStyles={{
                                        body: {
                                            direction: langdetect == 'en' ? 'ltr' : 'rtl',
                                            textAlign: 'left',
                                        },
                                        span: {
                                            direction: langdetect == 'en' ? 'ltr' : 'rtl',
                                            textAlign: 'left',
                                            color: sectionproperties.descriptionoverwritestyles == 'Yes' ? sectionproperties.desc_secondarycolor : '',
                                        },
                                    }}
                                />
                            </Text>
                        )} */}
                        {sectionproperties.priceDirection == 'Horizontal Direction' && (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: '100%',
                                    justifyContent: sectionproperties.productnamecentered == 'Centered' ? 'center' : 'flex-start',
                                }}
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
                        {sectionproperties.priceDirection == 'Vertical Direction' && (
                            <View
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    // justifyContent: 'center',
                                    width: '100%',
                                    minHeight: 50,
                                }}
                            >
                                {sectionproperties.prodPriceShow == 'Show' && (
                                    <Text
                                        style={{
                                            textAlign: sectionproperties.productnamecentered == 'Centered' ? 'center' : 'left',
                                            width: '100%',
                                            marginBottom: 1,
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
                                            textAlign: sectionproperties.productnamecentered == 'Centered' ? 'center' : 'left',
                                            width: '100%',
                                        }}
                                    >
                                        {langdetect == 'en' ? item.currencyname : ''} {item.defaultprice} {langdetect == 'en' ? '' : item.currencyname}
                                    </Text>
                                )}
                            </View>
                        )}
                        {sectionproperties.showcashbackcontainer == 'Show' && item.productcashbackvalue > 0 && (
                            <View style={[{ width: '100%', marginBottom: 5, justifyContent: sectionproperties.productnamecentered == 'Centered' ? 'center' : 'flex-start' }]}>
                                <View
                                    style={[
                                        generalstyles.flexRow,
                                        generalstyles.allcentered,
                                        {
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
                        {sectionproperties.cartBtnShow == 'Show' && (
                            <View style={[generalstyles.flexRow, { marginTop: 5, marginBottom: 10 }]}>
                                <TouchableOpacity
                                    style={[
                                        styles.addtocartbtn,
                                        {
                                            backgroundColor: sectionproperties.cartBtnbgColor,
                                            borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth, '', true),
                                            width: StyleParseToIntFuncContext(sectionproperties.cartBtnWidth),
                                            height: StyleParseToIntFuncContext(sectionproperties.cartBtnHeight),
                                            borderColor: sectionproperties.cartbtnbordercolor,
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true),
                                        },
                                    ]}
                                    onPress={() => {
                                        // if (item.currentquantity < 1 && sectionproperties.showoutofstock == 'Show' && item.quantavailtype == 'limit' && item.hasvariants == 0) {
                                        //     showUpTopNotificationBarContext(langdetect == 'en' ? 'Out Of Stock' : 'نفذت الكمية', 'orange');
                                        // } else {
                                        cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                                        // }
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
                                </TouchableOpacity>
                            </View>
                        )}
                        {sectionproperties.showbuynowbtn == 'Show' && item.hasvariants == 0 && (
                            <View style={[generalstyles.flexRow, { marginTop: 5, marginBottom: 10 }]}>
                                <TouchableOpacity
                                    style={[
                                        styles.addtocartbtn,
                                        {
                                            backgroundColor: sectionproperties.cartBtnbgColor,
                                            borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth, '', true),
                                            width: StyleParseToIntFuncContext(sectionproperties.cartBtnWidth),
                                            height: StyleParseToIntFuncContext(sectionproperties.cartBtnHeight),
                                            borderColor: sectionproperties.cartbtnbordercolor,
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true),
                                        },
                                    ]}
                                    onPress={() => {
                                        addtocartfunc();
                                    }}
                                >
                                    {AddtoCartMutationContext.isLoading == false && (
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
                                            {langdetect == 'en' ? 'Buy Now' : 'إشترى الان'}
                                        </Text>
                                    )}
                                    {AddtoCartMutationContext.isLoading == true && (
                                        <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <SpinnerButton
                                                buttonStyle={{ width: 25, height: 25 }}
                                                isLoading={true}
                                                indicatorCount={10}
                                                spinnerType={'MaterialIndicator'}
                                                spinnerColor={sectionproperties.cartBtnTextcolor}
                                            ></SpinnerButton>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }, [sectionproperties, item.productid, item.quantity, item.IsFavExists]);
    return cardsrender;
};
export default Productcard_withroundedbg;

const styles = StyleSheet.create({
    productsCard: {
        // width: SIZES.width - 220,
        borderStyle: 'solid',
        alignItems: 'center',
        // marginEnd: 5,
        // marginStart: 5,
        // marginBottom: 30,
    },
    productsCardImageCont: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    productsCardDesc: {
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingStart: 5,
        paddingEnd: 5,
    },
    addtocartbtn: {
        // width: 120,
        // height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addtowishlistbtn: {
        // width: 35,
        // height: 35,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    hassalestyles: {
        position: 'absolute',
        left: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
