import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { icons, SIZES } from '../../GeneralFiles/constants';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { AntDesign, Feather, SimpleLineIcons, FontAwesome5, MaterialCommunityIcons } from 'react-native-vector-icons';
import { BlurView } from 'expo-blur';
import { ImageComponent } from '../../../ImageComponent';

const Card3 = (props) => {
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { cardonclickfunctionContext, addtofavoritescontext } = useContext(FetchingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [item, setitem] = useState(props.cardinfoitemprops);
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
    const cardsrender = React.useMemo(() => {
        return (
            <TouchableOpacity
                style={[
                    styles.cardcontainer,
                    {
                        height: StyleParseToIntFuncContext(sectionproperties.height),
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom),
                        marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop),
                        marginStart: StyleParseToIntFuncContext(sectionproperties.card_marginLeft),
                        marginEnd: StyleParseToIntFuncContext(sectionproperties.card_marginRight),
                        width: props.sectiondirection != 'slider' ? SIZES.width / 2 - 20 : SIZES.width > 1024 ? SIZES.width - 950 : SIZES.width > 768 ? SIZES.width - 650 : SIZES.width - 150,
                        borderRadius: StyleParseToIntFuncContext(sectionproperties.sectioncardborderradius, '', true),
                        overflow: 'hidden',
                    },
                ]}
                onPress={() => {
                    cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                }}
            >
                <ImageComponent
                    path={imageurlgrouper()}
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: sectionproperties.backgroundColor,
                        resizeMode: sectionproperties.bgcovercontain == 'Cover' ? 'cover' : 'cover',
                    }}
                />
                <View
                    style={[
                        styles.innercard,
                        {
                            overflow: 'hidden',
                            position: 'absolute',
                            borderRadius: StyleParseToIntFuncContext(sectionproperties.reservation_borderradius, '', true),
                        },
                    ]}
                >
                    <BlurView
                        // tint="white"
                        intensity={30}
                        style={{
                            width: '100%',
                            padding: 10,
                        }}
                    >
                        <View style={[generalstyles.flexRow, { justifyContent: 'space-between' }]}>
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
                        {sectionproperties.prodNameShow == 'Show' && (
                            <Text
                                style={[
                                    // generalstyles.poppinsMedium,
                                    {
                                        color: sectionproperties.prodNameColor,
                                        textTransform: 'capitalize',
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
                                numberOfLines={2}
                                ellipsizeMode="tail"
                            >
                                {item.name}
                            </Text>
                        )}
                    </BlurView>
                </View>
                <View
                    style={[
                        generalstyles.flexRow,
                        {
                            width: '100%',
                            paddingHorizontal: 15,
                            position: 'absolute',
                            bottom: 15,
                        },
                    ]}
                >
                    {sectionproperties.favBtnShow == 'Show' && (
                        <TouchableOpacity
                            style={[
                                styles.addtowishlistbtn,
                                {
                                    width: StyleParseToIntFuncContext(sectionproperties.favBtnWidth),
                                    height: StyleParseToIntFuncContext(sectionproperties.favBtnHeight),
                                    backgroundColor: sectionproperties.favBtnbgColor,
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
                    {sectionproperties.cartBtnShow == 'Show' && (
                        <TouchableOpacity
                            style={[
                                styles.addtocartbtn,
                                {
                                    marginHorizontal: 20,
                                    width: StyleParseToIntFuncContext(sectionproperties.cartBtnWidth),
                                    height: StyleParseToIntFuncContext(sectionproperties.cartBtnHeight),
                                    backgroundColor: sectionproperties.cartBtnbgColor,
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth, '', true),
                                    borderColor: sectionproperties.cartbtnbordercolor,
                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true),
                                },
                            ]}
                            onPress={() => {
                                cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                            }}
                        >
                            {sectionproperties.carticonstyle == 'Shopping cart 1' && (
                                <MaterialCommunityIcons name="cart-outline" size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)} color={sectionproperties.cart_iconcolor} />
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
                                    resizeMethod="resize"
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
                                        paddingTop: Platform.OS === 'ios' ? 1 : 0,
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
                        </TouchableOpacity>
                    )}
                </View>
            </TouchableOpacity>
        );
    }, [sectionproperties, item.productid, item.quantity]);
    return cardsrender;
};
export default Card3;
const styles = StyleSheet.create({
    cardcontainer: {
        alignItems: 'center',
        // marginBottom: 10,
    },
    innercard: {
        width: '90%',
        marginTop: 10,
        justifyContent: 'center',
    },
    addtocartbtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        // left: 10,
    },
    addtowishlistbtn: {
        // left: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
