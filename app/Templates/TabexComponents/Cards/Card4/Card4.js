import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { icons, images, SIZES, COLORS, FONTS } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { urlEndpoint } from '../../../../config/imagekit';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { useDispatch, useSelector } from 'react-redux';
import { ImageComponent } from '../../../ImageComponent';

const Card4 = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);

    const { lang, langdetect } = useContext(LanguageContext);
    const { CurrentPageIdContext, fetch_inst_tabex_websitetemplatesQueryContext, sectionindexcontext, pageindexcontext, ProjectOpenrcTypeContext, StyleParseToIntFuncContext } =
        useContext(WebsiteDesignWorkPlaceContext);
    const { cardonclickfunctionContext, setProductInfoIdContext, addtofavoritescontext } = useContext(FetchingContext);
    const { routingcountext, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [item, setitem] = useState(props.cardinfoitemprops);
    const [index, setindex] = useState(props.cardinfoindexprops);
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
    //     StatePageProperties.pageobj.sections.forEach(function (sectionitem, sectionindex) {
    //         if (sectionitem.sectionid == props.sectionidprops) {
    //             sectionitem.sectionproperties.forEach(function (sectionpropertiesobj, sectionpropertiesindex) {
    //                 secpropobj[sectionpropertiesobj.property_css_name] = sectionpropertiesobj.property_value;
    //             });
    //         }
    //     });
    //     setsectionproperties({ ...secpropobj });
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
    const cardsrender = React.useMemo(() => {
        return (
            <View
                style={[
                    styles.productsCard,
                    {
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom != null && sectionproperties.marginBottom != undefined ? sectionproperties.marginBottom : 0),
                        marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop != null && sectionproperties.marginTop != undefined ? sectionproperties.marginTop : 0),
                    },
                ]}
            >
                <View
                    style={[
                        styles.productsCardImageCont,
                        {
                            borderColor: sectionproperties.image_bordercolor,
                            borderWidth: StyleParseToIntFuncContext(sectionproperties.image_borderWidth, '', true),
                            borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true),
                            borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true),
                            borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_borderTopLeftRadius, '', true),
                            borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.image_borderTopRightRadius, '', true),
                            backgroundColor: sectionproperties.image_bgcolor,
                            shadowColor: sectionproperties.image_shadowcolor,
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.1,
                            shadowRadius: 3,
                            elevation: 1,
                        },
                    ]}
                >
                    <View style={[styles.cardImageCont, {}]}>
                        <ImageComponent
                            path={item.image}
                            resizeMode="cover"
                            style={[
                                styles.cardImage,
                                {
                                    borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true),
                                    borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadiu, '', true),
                                    borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_borderTopLeftRadius, '', true),
                                    borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.image_borderTopRightRadius, '', true),
                                },
                            ]}
                        />
                    </View>
                    {sectionproperties.favBtnShow == 'Show' && (
                        <TouchableOpacity
                            style={[
                                styles.addtowishlistbtn,
                                {
                                    backgroundColor: sectionproperties.favBtnbgColor,
                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.fav_btn_borderBottomLeftRadius, '', true),
                                    shadowColor: sectionproperties.favbtn_shadowcolor,
                                    shadowOffset: {
                                        width: 0,
                                        height: 5,
                                    },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 3,
                                    elevation: 1,
                                },
                            ]}
                            onPress={() => {
                                addtofavoritescontext(item.productid);
                            }}
                        >
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
                        </TouchableOpacity>
                    )}
                    {sectionproperties.cartBtnShow == 'Show' && (
                        <TouchableOpacity
                            style={[
                                styles.addtocartbtn,
                                {
                                    backgroundColor: sectionproperties.cartBtnbgColor,
                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true),
                                    shadowColor: sectionproperties.cartbtn_shadowcolor,
                                    shadowOffset: {
                                        width: 0,
                                        height: 5,
                                    },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 3,
                                    elevation: 1,
                                },
                            ]}
                            onPress={() => {
                                cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                            }}
                        >
                            <Image
                                source={icons.cart}
                                resizeMode="cover"
                                style={{
                                    width: 17,
                                    height: 17,
                                    tintColor: sectionproperties.cartBtnTextcolor,
                                }}
                                resizeMethod="resize"
                            />
                        </TouchableOpacity>
                    )}

                    <View style={[generalstyles.flexColumn, styles.variantsCont]}>
                        {/* {item.productimages != undefined &&
                        item.productimages != null &&
                        item.productimages.length != 0 &&
                        item.productimages.map((variantitem, variantindex) => {
                            if (variantindex < 3) {
                                return (
                                    <View style={[styles.variantImageCont, { bottom: variant.bottom }]}>
                                        <Image
                                            source={variantitem.path}
                                            resizeMode="cover"
                                            style={{
                                                width: '70%',
                                                height: '70%',
                                                borderRadius: 10,
                                            }}
                                        />
                                    </View>
                                );
                            }
                        })} */}
                    </View>
                </View>
                <View style={styles.productsCardDesc}>
                    {sectionproperties.prodNameShow == 'Show' && (
                        <Text
                            ellipsizeMode="tail"
                            numberOfLines={2}
                            style={{
                                color: sectionproperties.prodNameColor,
                                textTransform: 'capitalize',
                                fontSize: StyleParseToIntFuncContext(sectionproperties.prodNameFontSize),
                                fontFamily: 'Poppins-Medium',
                            }}
                        >
                            {item.name}
                        </Text>
                    )}
                    <View style={[generalstyles.flexColumn]}>
                        {sectionproperties.prodPriceShow == 'Show' && (
                            <Text
                                style={{
                                    color: sectionproperties.prodPriceColor,
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.prodpriceFontSize),
                                    fontFamily: 'Poppins-Medium',
                                }}
                            >
                                {langdetect == 'en' ? item.currencyname : ''} {item.defaultprice} {langdetect == 'en' ? '' : item.currencyname}
                            </Text>
                        )}
                        {sectionproperties.prodsalePriceshow == 'Show' && (
                            <Text
                                style={[
                                    {
                                        color: sectionproperties.prodsalePriceColor,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.prodsalepriceFontSize),
                                        fontFamily: 'Poppins-Medium',
                                        textDecorationLine: 'line-through',
                                        textDecorationStyle: 'solid',
                                    },
                                ]}
                            >
                                {langdetect == 'en' ? item.currencyname : ''} {item.defaultsaleprice} {langdetect == 'en' ? '' : item.currencyname}
                            </Text>
                        )}
                    </View>
                </View>
            </View>
        );
    }, [sectionproperties, item.productid, item.quantity]);
    return cardsrender;
};
export default Card4;
const styles = StyleSheet.create({
    productsCard: {
        flex: 1,
        width: SIZES.width - 200,
        alignItems: 'center',
        marginEnd: 5,
        marginStart: 5,
        // marginBottom: 30,
    },
    productsCardImageCont: {
        width: '100%',
        height: 200,
        elevation: 1,
        // borderColor: COLORS.white,
        // borderWidth: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        position: 'relative',
    },
    productsCardImage: {
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    variantsCont: {
        position: 'absolute',
        bottom: 0,
        right: 2,
    },
    variantImageCont: {
        width: 45,
        height: 45,
        borderRadius: 45 / 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.turqouise,
        marginBottom: 5,
        borderWidth: 3,
        borderColor: '#ccc',
    },
    productsCardDesc: {
        flexDirection: 'column',
        marginTop: 'auto',
        marginBottom: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingStart: 10,
        paddingEnd: 10,
    },
    addtocartbtn: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 50,
        left: 10,
    },
    addtowishlistbtn: {
        position: 'absolute',
        top: 10,
        left: 10,
        width: 30,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
