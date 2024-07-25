import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { SIZES } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { AntDesign, FontAwesome } from 'react-native-vector-icons';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import ViewMoreText from 'react-native-view-more-text';
import clip from 'text-clipper';
import { ImageComponent } from '../../../ImageComponent';
// import StarRating from 'react-native-star-rating';
import RenderHtml from 'react-native-render-html';
import SpinnerButton from 'react-native-spinner-button';
import Stars from 'react-native-stars';

const ClassicHorizontalProductCard = (props) => {
    const { lang, langdetect } = useContext(LanguageContext);
    const { CurrentPageIdContext, StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { cardonclickfunctionContext, setProductInfoIdContext, addtofavoritescontext, AddtoCartMutationContext, showUpTopNotificationBarContext } = useContext(FetchingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [item, setitem] = useState(props.cardinfoitemprops);
    const [showquantitybtn, setshowquantitybtn] = useState(false);
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
    const FavouriteButton = () => {
        return (
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
        );
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
                                    ? SIZES.width - 25
                                    : SIZES.width - 28
                                : SIZES.width > 1024
                                ? SIZES.width - 800
                                : SIZES.width > 768
                                ? SIZES.width - 400
                                : Platform.OS === 'ios'
                                ? SIZES.width - 50
                                : SIZES.width - 40,
                        backgroundColor: sectionproperties.backgroundColor,
                        borderRadius: StyleParseToIntFuncContext(sectionproperties.sectioncardborderradius, '', true),
                        marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop),
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom),
                        paddingStart: StyleParseToIntFuncContext(sectionproperties.paddingLeft),
                        paddingEnd: StyleParseToIntFuncContext(sectionproperties.paddingRight),
                        paddingTop: StyleParseToIntFuncContext(sectionproperties.paddingTop),
                        paddingBottom: StyleParseToIntFuncContext(sectionproperties.paddingBottom),
                        marginEnd: StyleParseToIntFuncContext(sectionproperties.card_marginRight),
                        marginStart: StyleParseToIntFuncContext(sectionproperties.card_marginLeft),
                    },
                ]}
                onPress={() => {
                    cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                }}
            >
                <View style={[generalstyles.flexRow, { width: '100%', height: '100%' }]}>
                    {sectionproperties.image_show == 'show' && item.image != '' && (
                        <View
                            style={[
                                {
                                    marginBottom: 'auto',
                                    borderColor: sectionproperties.image_bordercolor,
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.image_borderwidth, '', true),
                                    backgroundColor: sectionproperties.image_bgcolor,
                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.imageborderradius, '', true),
                                    height: StyleParseToIntFuncContext(sectionproperties.image_height != null && sectionproperties.image_height != undefined ? sectionproperties.image_height : 80),
                                    width: StyleParseToIntFuncContext(sectionproperties.image_width != null && sectionproperties.image_width != undefined ? sectionproperties.image_width : 90),
                                    // width: SIZES.width > 1024 ? 100 : 100,
                                },
                            ]}
                        >
                            <ImageComponent
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
                                resizeMethod="resize"
                            />
                        </View>
                    )}
                    <View
                        style={[
                            generalstyles.flexRow,
                            {
                                flex: 1,
                                paddingStart: 10,
                                marginBottom: 'auto',
                                marginTop: sectionproperties.prodCatShow == 'Show' ? 0 : 'auto',
                                height: '100%',
                            },
                        ]}
                    >
                        <View style={[generalstyles.flexColumn, { width: '100%', flex: 1 }]}>
                            <View style={[generalstyles.flexRow]}>
                                <View style={{ flex: 1 }}>
                                    {item.productcanrate == 1 && (
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
                                    )}
                                    {sectionproperties.quantityshow == 'Show' && (
                                        <View style={[generalstyles.flexRow]}>
                                            <Text
                                                ellipsizeMode="tail"
                                                numberOfLines={1}
                                                style={[
                                                    generalstyles.allcentered,

                                                    {
                                                        marginBottom: 'auto',
                                                        textAlign: 'left',
                                                        color: sectionproperties.quantitycolor,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.quantityfontsize),
                                                        fontFamily:
                                                            sectionproperties.quantityfontweight == 300
                                                                ? 'Poppins-Thin'
                                                                : sectionproperties.quantityfontweight == 400
                                                                ? 'Poppins-Light'
                                                                : sectionproperties.quantityfontweight == 500
                                                                ? 'Poppins-Regular'
                                                                : sectionproperties.quantityfontweight == 600
                                                                ? 'Poppins-Medium'
                                                                : sectionproperties.quantityfontweight == 700
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
                                                        flex: 1,
                                                    },
                                                ]}
                                            >
                                                {item.measurmentunit}
                                            </Text>
                                        </View>
                                    )}
                                    <View
                                        style={[
                                            generalstyles.flexRow,
                                            {
                                                marginTop: sectionproperties.prodCatShow == 'Show' ? 0 : sectionproperties.prodPriceShow == 'Show' ? 0 : 15,
                                            },
                                        ]}
                                    >
                                        <Text
                                            ellipsizeMode="tail"
                                            numberOfLines={sectionproperties.wordbreak == '1' ? 1 : 2}
                                            style={[
                                                generalstyles.allcentered,

                                                {
                                                    marginBottom: 'auto',
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
                                                    flex: 1,
                                                    marginBottom: StyleParseToIntFuncContext(sectionproperties.productnamemarginbottom),
                                                },
                                            ]}
                                        >
                                            {item.name}
                                        </Text>
                                        {sectionproperties.favBtnShow == 'Show' && sectionproperties.quantityshow == 'Hide' && FavouriteButton()}
                                    </View>
                                </View>
                                {sectionproperties.favBtnShow == 'Show' && sectionproperties.quantityshow == 'Show' && FavouriteButton()}
                            </View>

                            {sectionproperties.prodCatShow == 'Show' && (
                                <View
                                    style={[
                                        {
                                            alignItems: 'flex-start',
                                            justifyContent: 'flex-start',
                                        },
                                    ]}
                                >
                                    {sectionproperties.descriptionoverwritestyles == 'Yes' && (
                                        <View>
                                            <RenderHtml
                                                source={{
                                                    html: langdetect == 'en' ? item.description + '...' : item.description_ar,
                                                }}
                                                flexDirection={''}
                                                tagsStyles={{
                                                    body: {
                                                        direction: langdetect == 'en' ? 'ltr' : 'ltr',
                                                    },
                                                }}
                                                style={{ textAlign: langdetect == 'en' ? 'right' : 'left' }}
                                                contentWidth={100}
                                            />
                                        </View>
                                    )}

                                    {sectionproperties.descriptionoverwritestyles == 'No' && (
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
                                                textAlign: langdetect == 'en' ? 'left' : 'right',
                                            }}
                                        >
                                            {clip(item.description, 65, { html: true, stripTags: true })}
                                        </ViewMoreText>
                                    )}
                                </View>
                            )}
                            <View
                                style={[
                                    generalstyles.flexRow,
                                    {
                                        marginTop: sectionproperties.prodCatShow == 'Show' ? 0 : sectionproperties.prodPriceShow == 'Show' ? 0 : 20,
                                    },
                                ]}
                            >
                                <View style={[generalstyles.flexColumn, { flex: 1 }]}>
                                    {sectionproperties.prodPriceShow == 'Show' && item.isproducttobesold == 1 && (
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
                                    <View style={{ width: '100%', flexDirection: 'row' }}>
                                        {sectionproperties.prodsalePriceshow == 'Show' && item.hassale != 0 && item.isproducttobesold == 1 && (
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
                                </View>
                                {sectionproperties.cartBtnShow == 'Show' && showquantitybtn == false && (
                                    <TouchableOpacity
                                        style={[
                                            generalstyles.allcentered,
                                            {
                                                width: StyleParseToIntFuncContext(sectionproperties.cartBtnWidth),
                                                height: StyleParseToIntFuncContext(sectionproperties.cartBtnHeight),
                                                backgroundColor: sectionproperties.cartBtnbgColor,
                                                borderRadius: StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true),
                                                borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth, '', true),
                                                borderColor: sectionproperties.cartBtnTextcolor,
                                            },
                                        ]}
                                        // onPress={() => {
                                        // cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                                        // }}
                                        onPress={() => {
                                            if (sectionproperties.quantitybtn_show == 'Show') {
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
                                                }
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
                                            }}
                                        >
                                            {langdetect == 'en' ? sectionproperties.cartBtnContentenglish : sectionproperties.cartBtnContentarabic}
                                        </Text>
                                    </TouchableOpacity>
                                )}
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
                                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.remove_quantitybtn_borderradius, '', true),
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
                                            <AntDesign
                                                name="plus"
                                                size={StyleParseToIntFuncContext(sectionproperties.add_quantitybtn_textfontsize)}
                                                color={sectionproperties.add_quantitybtn_textcolor}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }, [sectionproperties, item.productid, item.quantity, item]);
    return cardsrender;
};
export default ClassicHorizontalProductCard;
