import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Linking } from 'react-native';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { SIZES } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { ImageComponent } from '../../../ImageComponent';
import ViewMoreText from 'react-native-view-more-text';
import clip from 'text-clipper';
import { Feather, FontAwesome } from '@expo/vector-icons';
import RenderHtml from 'react-native-render-html';

const CTAProductCard = (props) => {
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { cardonclickfunctionContext, addtofavoritescontext, showUpTopNotificationBarContext, fetchAuthorizationQueryContext } = useContext(FetchingContext);
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
    // const source = {
    //     html:
    //         langdetect == 'en'
    //             ? item.description_en.length > 500
    //                 ? '<p><span style="font-size: 15px">' + item.description_en.slice(0, 500) + '...</span> </p>'
    //                 : '<p><span style="font-size: 15px">' + item.description_en + '</span> </p>'
    //             : item.description_ar?.length > 500
    //             ? '<p><span style="font-size: 15px">' + item.description_ar.slice(0, 450) + +'...</span> </p>'
    //             : '<p><span style="font-size: 15px">' + item.description_ar + '</span> </p>',
    // };
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
                        width:
                            props.sectiondirection != 'slider'
                                ? SIZES.width > 1024
                                    ? SIZES.width / 3 - 18
                                    : SIZES.width > 768
                                    ? SIZES.width / 3 - 18
                                    : Platform.OS === 'ios'
                                    ? SIZES.width - 35
                                    : SIZES.width - 35
                                : SIZES.width > 1024
                                ? SIZES.width / 5 - 10
                                : SIZES.width > 768
                                ? SIZES.width / 4
                                : Platform.OS === 'ios'
                                ? SIZES.width - 80
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
                    <View
                        style={[
                            styles.productsCardImageCont,
                            generalstyles.allcentered,
                            {
                                marginBottom: StyleParseToIntFuncContext(sectionproperties.image_mb),
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
                                height: StyleParseToIntFuncContext(sectionproperties.image_height != null && sectionproperties.image_height != undefined ? sectionproperties.image_height : 0),
                                overflow: 'hidden',
                            },
                        ]}
                    >
                        <ImageComponent
                            path={imageurlgrouper()}
                            // resizeMode={sectionproperties.bgcovercontain == 'Cover' ? 'cover' : 'contain'}
                            style={[
                                {
                                    width: StyleParseToIntFuncContext(sectionproperties.imageInnerWidth_Height) + '%',
                                    height: StyleParseToIntFuncContext(sectionproperties.imageInnerWidth_Height) + '%',
                                    resizeMode: sectionproperties.bgcovercontain == 'Cover' ? 'cover' : 'contain',
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
                        {sectionproperties.favBtnShow == 'Show' && (
                            <TouchableOpacity
                                style={[
                                    styles.addtowishlistbtn,
                                    {
                                        backgroundColor: item.IsFavExists ? sectionproperties.activebgcolor : sectionproperties.favBtnbgColor,
                                        width: StyleParseToIntFuncContext(sectionproperties.favBtnWidth),
                                        height: StyleParseToIntFuncContext(sectionproperties.favBtnHeight),
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.fav_btn_borderBottomLeftRadius, '', true),
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
                                    {'-' + parseFloat(Math.round(10.0 * ((parseInt(item.defaultprice) - parseInt(item.defaultsaleprice)) / parseInt(item.defaultprice)) * 100) / 10.0).toFixed(0) + '%'}{' '}
                                </Text>
                            </View>
                        )}
                    </View>
                    <View
                        style={[
                            styles.productsCardDesc,
                            {
                                alignItems: 'flex-start',
                                paddingHorizontal: StyleParseToIntFuncContext(sectionproperties.innersectionpaddinghorizontal),
                            },
                        ]}
                    >
                        {sectionproperties.showpill == 'Show' && (
                            <View
                                style={[
                                    generalstyles.allcentered,
                                    {
                                        paddingHorizontal: 7,
                                        minWidth: StyleParseToIntFuncContext(sectionproperties.pillwidth),
                                        height: StyleParseToIntFuncContext(sectionproperties.pillheight),
                                        backgroundColor: sectionproperties.pillbgcolor,
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.pillborderBottomLeftRadius),
                                        marginBottom: 2,
                                    },
                                ]}
                            >
                                <Text style={[generalstyles.poppinsMedium, { color: sectionproperties.pillcolor, fontSize: StyleParseToIntFuncContext(sectionproperties.pillfontSize) }]}>
                                    {langdetect == 'en' ? sectionproperties.countertitleen : sectionproperties.countertitlear}
                                </Text>
                            </View>
                        )}
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
                        {sectionproperties.prodCatShow == 'Show' && sectionproperties.descriptionoverwritestyles == 'No' && (
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
                                    maxHeight: 80,
                                    overflow: 'hidden',
                                    // textAlign: langdetect == 'en' ? 'left' : 'right',
                                    textAlign: sectionproperties.productnamecentered == 'Centered' ? 'center' : 'left',
                                }}
                            >
                                {clip(langdetect == 'en' ? item.description_en : item.description_ar, 65, { html: true, stripTags: true })}
                            </ViewMoreText>
                        )}
                        {sectionproperties.prodCatShow == 'Show' && sectionproperties.descriptionoverwritestyles == 'Yes' && (
                            <View>
                                <RenderHtml
                                    source={{
                                        html:
                                            langdetect == 'en'
                                                ? item.description_en.length > 500
                                                    ? '<p><span style="font-size: 15px">' + item.description_en.slice(0, 550) + '...</span> </p>'
                                                    : '<p><span style="font-size: 15px">' + item.description_en + '</span> </p>'
                                                : item.description_ar?.length > 500
                                                ? '<p><span style="font-size: 15px">' + item.description_ar.slice(0, 450) + +'...</span> </p>'
                                                : '<p><span style="font-size: 15px">' + item.description_ar + '</span> </p>',
                                    }}
                                    flexDirection={''}
                                    tagsStyles={{
                                        body: {
                                            direction: langdetect == 'en' ? 'ltr' : 'ltr',
                                        },
                                    }}
                                    style={{ textAlign: langdetect == 'en' ? 'right' : 'left' }}
                                    contentWidth={5}
                                />
                            </View>
                        )}
                        {sectionproperties.priceDirection == 'Horizontal Direction' && (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: '100%',
                                    justifyContent: sectionproperties.productnamecentered == 'Centered' ? 'center' : 'flex-start',
                                    marginTop: StyleParseToIntFuncContext(sectionproperties.productpricemarginTop),
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
                                    width: '100%',
                                    marginTop: StyleParseToIntFuncContext(sectionproperties.productpricemarginTop),
                                }}
                            >
                                {sectionproperties.prodPriceShow == 'Show' && (
                                    <Text
                                        style={{
                                            textAlign: 'left',
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
                                            textAlign: 'left',
                                            width: '100%',
                                        }}
                                    >
                                        {langdetect == 'en' ? item.currencyname : ''} {item.defaultprice} {langdetect == 'en' ? '' : item.currencyname}
                                    </Text>
                                )}
                            </View>
                        )}
                        {sectionproperties.showcashbackcontainer == 'Show' && item.productcashbackvalue > 0 && (
                            <View style={[generalstyles.allcentered, { width: '100%', marginBottom: 5 }]}>
                                <View style={[generalstyles.flexRow, generalstyles.allcentered]}>
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
                        <View
                            style={[
                                generalstyles.flexRow,
                                generalstyles.allcentered,
                                {
                                    width: '100%',
                                    marginVertical: 7,
                                    display: sectionproperties.youtbtn_show == 'Hide' && sectionproperties.callbtn_show == 'Hide' ? 'none' : 'flex',
                                },
                            ]}
                        >
                            {sectionproperties.youtbtn_show == 'Show' && (
                                <TouchableOpacity
                                    style={[
                                        generalstyles.flexRow,
                                        generalstyles.allcentered,
                                        {
                                            flex: 1,
                                            borderRightColor: '#eee',
                                            borderRightWidth: 1,
                                            paddingVertical: 5,
                                        },
                                    ]}
                                    onPress={() => {
                                        Linking.openURL('whatsapp://send?text=&phone=' + fetchAuthorizationQueryContext?.data?.data?.instinfo?.whatsappnumber);
                                    }}
                                >
                                    <FontAwesome
                                        name="whatsapp"
                                        size={StyleParseToIntFuncContext(sectionproperties.whatsappiconfontsize)}
                                        style={{
                                            color: sectionproperties.youtubebtnTextcolor,
                                        }}
                                    />
                                    <Text
                                        style={[
                                            generalstyles.poppinsMedium,
                                            { marginHorizontal: 5, fontSize: StyleParseToIntFuncContext(sectionproperties.youtubebtniconfontsize), color: sectionproperties.youtubebtnTextcolor },
                                        ]}
                                    >
                                        {langdetect == 'en' ? sectionproperties.whatsappbtncontenten : sectionproperties.whatsappbtncontentar}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            {sectionproperties.callbtn_show == 'Show' && (
                                <TouchableOpacity
                                    style={[generalstyles.flexRow, generalstyles.allcentered, { flex: 1 }]}
                                    onPress={() => {
                                        Linking.openURL('tel:' + item.product_phonenumber);
                                    }}
                                >
                                    <Feather
                                        name="phone"
                                        size={StyleParseToIntFuncContext(sectionproperties.callbtniconfontsize)}
                                        style={{
                                            color: sectionproperties.callbtnTextcolor,
                                        }}
                                    />
                                    <Text
                                        style={[
                                            generalstyles.poppinsMedium,
                                            { marginHorizontal: 5, fontSize: StyleParseToIntFuncContext(sectionproperties.callbtnfontsize), color: sectionproperties.callbtnTextcolor },
                                        ]}
                                    >
                                        {langdetect == 'en' ? sectionproperties.callbtntext_en : sectionproperties.callbtntext_ar}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }, [sectionproperties, item.productid, item.quantity, item.IsFavExists]);
    return cardsrender;
};
export default CTAProductCard;

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
