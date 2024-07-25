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

const HorizontalProductCard = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const { lang, langdetect } = useContext(LanguageContext);
    const { CurrentPageIdContext, StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { cardonclickfunctionContext, addtofavoritescontext } = useContext(FetchingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [item, setitem] = useState(props.cardinfoitemprops);
    const [index, setindex] = useState(props.cardinfoindexprops);
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

    const secondRegEx = /((&nbsp;))*/gim;
    const resulten = item?.description_en?.replace(secondRegEx, '');
    const resultar = item?.description_ar?.replace(secondRegEx, '');
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
            <TouchableOpacity
                style={[
                    generalstyles.flexRow,
                    {
                        width:
                            props.sectiondirection != 'slider'
                                ? SIZES.width > 768
                                    ? SIZES.width / 2 - 20
                                    : Platform.OS === 'ios'
                                    ? SIZES.width - StyleParseToIntFuncContext(sectionproperties.card_marginLeft) - StyleParseToIntFuncContext(sectionproperties.card_marginRight)
                                    : SIZES.width - -StyleParseToIntFuncContext(sectionproperties.card_marginLeft) - StyleParseToIntFuncContext(sectionproperties.card_marginRight)
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
                        marginLeft: langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.card_marginLeft) : StyleParseToIntFuncContext(sectionproperties.card_marginRight),
                        marginRight: langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.card_marginRight) : StyleParseToIntFuncContext(sectionproperties.card_marginLeft),
                        marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop),
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom),
                        paddingHorizontal: StyleParseToIntFuncContext(sectionproperties.cardpaddinghorizontal),
                        paddingVertical: StyleParseToIntFuncContext(sectionproperties.cardpaddingvertical),
                        borderWidth: StyleParseToIntFuncContext(sectionproperties.sectioncardborderwidth, '', true),
                        borderColor: sectionproperties.sectioncardbordercolor,
                    },
                ]}
                onPress={() => {
                    cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                }}
            >
                <View style={[generalstyles.flexRow, { width: '100%' }]}>
                    <View style={[generalstyles.allcentered]}>
                        {sectionproperties.image_show == 'show' && (
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
                                        height: StyleParseToIntFuncContext(sectionproperties.image_height),
                                        width: StyleParseToIntFuncContext(sectionproperties.image_width),
                                        marginBottom: StyleParseToIntFuncContext(sectionproperties.image_mb),
                                    },
                                ]}
                            >
                                <ImageComponent
                                    resizeMethod="resize"
                                    path={imageurlgrouper()}
                                    resizeMode={sectionproperties.bgcovercontain == 'Cover' ? 'cover' : 'contain'}
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
                        )}

                        {sectionproperties.cartBtnShow == 'Show' && (
                            <TouchableOpacity
                                style={[
                                    generalstyles.allcentered,
                                    {
                                        position: 'absolute',
                                        bottom: -25,
                                        width: StyleParseToIntFuncContext(sectionproperties.cartBtnWidth),
                                        height: StyleParseToIntFuncContext(sectionproperties.cartBtnHeight),
                                        backgroundColor: sectionproperties.cartBtnbgColor,
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
                        )}
                    </View>
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
                                            sectionproperties.prodNameTextTranform == 'Uppercase' ? 'uppercase' : sectionproperties.prodNameTextTranform == 'Capitalize' ? 'capitalize' : 'lowercase',
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
                                        {item.description} {clip(langdetect == 'en' ? resulten : resultar, 50, { html: true, stripTags: true })}
                                    </Text>
                                </View>
                            )}
                            <View
                                style={[
                                    generalstyles.flexColumn,
                                    {
                                        marginTop: StyleParseToIntFuncContext(sectionproperties.productpricemarginTop),
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
                                            textAlign: 'left',
                                        }}
                                    >
                                        {langdetect == 'en' ? item.currencyname : ''} {item.hassale != 0 ? item.defaultsaleprice : item.defaultprice} {langdetect == 'en' ? '' : item.currencyname}
                                    </Text>
                                )}
                                {sectionproperties.prodsalePriceshow == 'Show' && item.hassale != 0 && (
                                    <View
                                        style={[
                                            generalstyles.flexRow,
                                            {
                                                width: '100%',
                                                marginTop: sectionproperties.showpill == 'Show' ? 5 : 0,
                                            },
                                        ]}
                                    >
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
                                            }}
                                        >
                                            {langdetect == 'en' ? item.currencyname : ''} {item.defaultprice} {langdetect == 'en' ? '' : item.currencyname}
                                        </Text>
                                        {sectionproperties.showpill == 'Show' && item.hassale == 1 && (
                                            <View
                                                style={[
                                                    generalstyles.allcentered,
                                                    {
                                                        width: StyleParseToIntFuncContext(sectionproperties.pillwidth),
                                                        height: StyleParseToIntFuncContext(sectionproperties.pillheight),
                                                        backgroundColor: sectionproperties.pillbgcolor,
                                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.pillborderBottomLeftRadius),
                                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.pillBorderWidth),
                                                        borderColor: sectionproperties.pillBorderColor,
                                                        marginHorizontal: 5,
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
                                                        parseFloat(
                                                            Math.round(10.0 * ((parseInt(item.defaultprice) - parseInt(item.defaultsaleprice)) / parseInt(item.defaultprice)) * 100) / 10.0,
                                                        ).toFixed(0) +
                                                        '%'}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
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
                </View>
            </TouchableOpacity>
        );
    }, [sectionproperties, item.productid, item.quantity]);
    return cardsrender;
};
export default HorizontalProductCard;
const styles = StyleSheet.create({});
