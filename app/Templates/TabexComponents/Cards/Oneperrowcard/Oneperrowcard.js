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

const Oneperrowcard = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);

    const { lang, langdetect } = useContext(LanguageContext);
    const { CurrentPageIdContext, fetch_inst_tabex_websitetemplatesQueryContext, sectionindexcontext, pageindexcontext, ProjectOpenrcTypeContext, StyleParseToIntFuncContext } =
        useContext(WebsiteDesignWorkPlaceContext);
    const { cardonclickfunctionContext, setProductInfoIdContext, addtofavoritescontext } = useContext(FetchingContext);
    const { routingcountext, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
    const [sectionproperties, setsectionproperties] = useState(props.sectionpropertiesprops);
    const [item, setitem] = useState(props.itemprops);
    const [index, setindex] = useState(props.itemprops);
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
        if (props.itemprops != undefined) {
            setitem(props.itemprops);
        }
    }, [props.itemprops]);
    const cardsrender = React.useMemo(() => {
        return (
            <View
                style={[
                    styles.productsCard,
                    {
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom != null && sectionproperties.marginBottom != undefined ? sectionproperties.marginBottom : 0),
                        marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop != null && sectionproperties.marginTop != undefined ? sectionproperties.marginTop : 0),
                        width: '100%',
                    },
                ]}
            >
                <View style={[generalstyles.flexRow]}>
                    <View
                        style={[
                            styles.productsCardImageCont,
                            {
                                width: 100,
                                // borderColor: sectionproperties.prodimage_color,
                                // borderWidth: StyleParseToIntFuncContext(sectionproperties.prodimage_borderwidth, '', true),
                                // borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.prodimage__borderBottomLeftRadius, '', true),
                                // borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.prodimage__borderBottomRightRadius, '', true),
                                // borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.prodimage__borderTopLeftRadius, '', true),
                                // borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.prodimage__borderTopRightRadius, '', true),
                                // backgroundColor: sectionproperties.prodimage_bgcolor,
                                height: 100,
                                marginEnd: 5,
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
                                    borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true),
                                    borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true),
                                    borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_borderTopLeftRadius, '', true),
                                    borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.image_borderTopRightRadius, '', true),
                                },
                            ]}
                        />
                        {sectionproperties.favBtnShow == 'Show' && (
                            <TouchableOpacity
                                style={[
                                    styles.addtowishlistbtn,
                                    {
                                        backgroundColor: sectionproperties.favBtnbgColor,
                                        borderRadius: 50,
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
                    </View>
                    <View style={[styles.productsCardDesc, { flex: 1, marginBottom: 'auto', flexDirection: 'row' }]}>
                        <View style={[{ flex: 1, marginEnd: 10 }]}>
                            <View style={[{ flexDirection: 'row' }]}>
                                {sectionproperties.prodNameShow == 'Show' && (
                                    <Text
                                        style={{
                                            color: sectionproperties.prodNameColor,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.prodNameFontSize),
                                            fontFamily: sectionproperties.prodname_lightbold == 'Light' ? 'Poppins-Light' : 'Poppins-Medium',
                                            textTransform:
                                                sectionproperties.prodNameTextTranform == 'Uppercase'
                                                    ? 'uppercase'
                                                    : sectionproperties.prodNameTextTranform == 'Capitalize'
                                                    ? 'capitalize'
                                                    : 'lowercase',
                                            textAlign: 'left',
                                            flexShrink: 1,
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                )}
                            </View>
                            <View style={[generalstyles.flexColumn]}>
                                {sectionproperties.prodPriceShow == 'Show' && (
                                    <Text
                                        style={{
                                            color: sectionproperties.prodPriceColor,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.prodpriceFontSize),
                                            fontFamily: sectionproperties.prodprice_lightbold == 'Light' ? 'Poppins-Light' : 'Poppins-Medium',
                                            textAlign: 'left',
                                        }}
                                    >
                                        {langdetect == 'en' ? 'EGP' : ''} {item.defaultprice} {langdetect == 'en' ? '' : 'ج.م'}
                                    </Text>
                                )}
                                {sectionproperties.prodsalePriceshow == 'Show' && (
                                    <Text
                                        style={[
                                            {
                                                color: sectionproperties.prodsalePriceColor,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.prodsalepriceFontSize),
                                                fontFamily: sectionproperties.prodsaleprice_lightbold == 'Light' ? 'Poppins-Light' : 'Poppins-Medium',
                                                textDecorationLine: 'line-through',
                                                textDecorationStyle: 'solid',
                                                textAlign: 'left',
                                            },
                                        ]}
                                    >
                                        {langdetect == 'en' ? 'EGP' : ''} {item.defaultsaleprice} {langdetect == 'en' ? '' : 'ج.م'}
                                    </Text>
                                )}
                            </View>
                        </View>
                        {sectionproperties.cartBtnShow == 'Show' && (
                            <TouchableOpacity
                                style={[
                                    styles.addtocartbtn,
                                    {
                                        backgroundColor: sectionproperties.cartBtnbgColor,
                                        borderRadius: 50,
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
                                        width: 15,
                                        height: 15,
                                        tintColor: sectionproperties.cartBtnTextcolor,
                                    }}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        );
    }, [sectionproperties, item.productid, item.quantity]);
    return cardsrender;
};
export default Oneperrowcard;
const styles = StyleSheet.create({
    productsCard: {
        flex: 1,
        alignItems: 'center',
        marginEnd: 5,
        marginStart: 5,
        // marginBottom: 30,
    },
    productsCardImageCont: {
        width: '100%',
        elevation: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    productsCardDesc: {
        width: '100%',
        paddingStart: 2,
        paddingEnd: 2,
        marginTop: 5,
    },
    addtocartbtn: {
        width: 50,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addtowishlistbtn: {
        position: 'absolute',
        top: 5,
        left: 5,
        width: 30,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
