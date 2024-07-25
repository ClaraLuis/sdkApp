import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, Platform } from 'react-native';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { icons, images, SIZES, COLORS, FONTS } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { urlEndpoint } from '../../../../config/imagekit';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import Oneperrowcard from '../Oneperrowcard/Oneperrowcard';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { ImageComponent } from '../../../ImageComponent';

const Singlecard = (props) => {
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
                        marginStart: StyleParseToIntFuncContext(sectionproperties.card_marginLeft != null && sectionproperties.card_marginLeft != undefined ? sectionproperties.card_marginLeft : 0),
                        marginEnd: StyleParseToIntFuncContext(sectionproperties.card_marginRight != null && sectionproperties.card_marginRight != undefined ? sectionproperties.card_marginRight : 0),
                        paddingLeft:
                            langdetect == 'en'
                                ? StyleParseToIntFuncContext(sectionproperties.paddingLeft != null && sectionproperties.paddingLeft != undefined ? sectionproperties.paddingLeft : 0)
                                : StyleParseToIntFuncContext(sectionproperties.paddingRight != null && sectionproperties.paddingRight != undefined ? sectionproperties.paddingRight : 0),
                        paddingRight:
                            langdetect == 'en'
                                ? StyleParseToIntFuncContext(sectionproperties.paddingRight != null && sectionproperties.paddingRight != undefined ? sectionproperties.paddingRight : 0)
                                : StyleParseToIntFuncContext(sectionproperties.paddingLeft != null && sectionproperties.paddingLeft != undefined ? sectionproperties.paddingLeft : 0),
                    },
                ]}
            >
                <View style={{ flexDirection: 'row', marginTop: 7 }}>
                    <View>
                        <ImageComponent
                            resizeMethod="resize"
                            path={item.image}
                            style={[
                                styles.productsCardImageCont,
                                {
                                    width: StyleParseToIntFuncContext(sectionproperties.image_width != null && sectionproperties.image_width != undefined ? sectionproperties.image_width : 0),
                                    height: StyleParseToIntFuncContext(sectionproperties.image_height != null && sectionproperties.image_height != undefined ? sectionproperties.image_height : 0),
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
                                    borderColor: sectionproperties.image_bordercolor,
                                    // borderWidth: StyleParseToIntFuncContext(sectionproperties.image_borderwidth),
                                },
                            ]}
                        />

                        {sectionproperties.favBtnShow == 'Show' && (
                            <TouchableOpacity
                                style={[
                                    {
                                        width: StyleParseToIntFuncContext(sectionproperties.favBtnWidth != null && sectionproperties.favBtnWidth != undefined ? sectionproperties.favBtnWidth : 10),
                                        height: StyleParseToIntFuncContext(sectionproperties.favBtnHeight != null && sectionproperties.favBtnHeight != undefined ? sectionproperties.favBtnHeight : 10),
                                        backgroundColor: sectionproperties.favbtn_bgtransparent == 'Transparent' ? 'Transparent' : sectionproperties.favBtnbgColor,
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.fav_btn_borderBottomLeftRadius, '', true),
                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.favbtnborderwidth, '', true),
                                        borderColor: sectionproperties.favbtnbordercolor,
                                        position: 'absolute',
                                        marginStart: 73,
                                        top: 5,
                                    },
                                    generalstyles.allcentered,
                                ]}
                                onPress={() => {
                                    addtofavoritescontext(item.productid);
                                }}
                            >
                                {!item.IsFavExists && (
                                    <AntDesign
                                        name="hearto"
                                        size={StyleParseToIntFuncContext(sectionproperties.favBtnIconfontsize)}
                                        style={{
                                            color: sectionproperties.favBtniconcolor,
                                            paddingTop: 1,
                                            paddingStart: 1,
                                        }}
                                    />
                                )}
                                {item.IsFavExists && (
                                    <AntDesign
                                        name="heart"
                                        size={StyleParseToIntFuncContext(sectionproperties.favBtnIconfontsize)}
                                        style={{
                                            color: sectionproperties.activefaviconcolor,
                                            paddingStart: Platform.OS === 'ios' ? 1 : 0,
                                            paddingTop: Platform.OS === 'ios' ? 1 : 0,
                                        }}
                                    />
                                )}
                            </TouchableOpacity>
                        )}
                    </View>
                    <View
                        style={{
                            width: SIZES.width - 170,
                            marginStart: 10,
                            justifyContent: 'space-between',
                            marginEnd: 10,
                        }}
                    >
                        {sectionproperties.prodNameShow == 'Show' && (
                            <Text
                                style={[
                                    // generalstyles.poppinsMedium,
                                    {
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
                                        // color: 'black',
                                        // fontSize:16,
                                        // fontWeight:'bold',
                                    },
                                ]}
                                numberOfLines={2}
                                ellipsizeMode="tail"
                            >
                                {item.name}
                            </Text>
                        )}

                        <View style={{ flexDirection: 'row' }}>
                            <View style={[{ flexDirection: 'row', flex: 1 }]}>
                                {sectionproperties.prodsalePriceshow == 'Show' && (
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

                                            paddingTop: 5,

                                            // color: 'black',
                                            // fontSize:18,
                                            // fontWeight:'bold',
                                        }}
                                    >
                                        {langdetect == 'en' ? 'EGP' : ''} {item.hassale != 0 ? item.defaultsaleprice : item.defaultprice} {langdetect == 'en' ? '' : 'ج.م'}
                                    </Text>
                                )}
                                <Text> </Text>
                                {sectionproperties.prodPriceShow == 'Show' && item.hassale != 0 && (
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

                                            paddingTop: 7,
                                            // color: '#808080',
                                            // fontSize:18,
                                            // fontWeight:'600',

                                            // textDecorationLine: 'line-through',
                                            // textDecorationStyle: 'solid',
                                        }}
                                    >
                                        {langdetect == 'en' ? 'EGP' : ''} {item.defaultprice} {langdetect == 'en' ? '' : 'ج.م'}
                                    </Text>
                                )}
                            </View>

                            <View>
                                {sectionproperties.favBtnShow == 'Show' && (
                                    <TouchableOpacity
                                        style={[
                                            styles.bttn,
                                            generalstyles.allcentered,
                                            {
                                                width: StyleParseToIntFuncContext(
                                                    sectionproperties.cartBtnWidth != null && sectionproperties.cartBtnWidth != undefined ? sectionproperties.cartBtnWidth : 55,
                                                ),
                                                height: StyleParseToIntFuncContext(
                                                    sectionproperties.cartBtnHeight != null && sectionproperties.cartBtnHeight != undefined ? sectionproperties.cartBtnHeight : 30,
                                                ),
                                                backgroundColor: sectionproperties.cartBtnbgColor,
                                                borderRadius: StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true),
                                                borderColor: sectionproperties.cartbtnbordercolor,
                                                borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth, '', true),
                                            },
                                        ]}
                                        onPress={() => {
                                            cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.bttnText,
                                                generalstyles.allcentered,
                                                {
                                                    color: sectionproperties.cartBtnTextcolor,
                                                    textTransform:
                                                        sectionproperties.cartBtnTexttransform == 'Uppercase'
                                                            ? 'uppercase'
                                                            : sectionproperties.cartBtnTexttransform == 'Capitalize'
                                                            ? 'capitalize'
                                                            : 'lowercase',
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
                                                    paddingStart: Platform.OS === 'ios' ? 3 : 0,
                                                    paddingBottom: Platform.OS === 'ios' ? 2.5 : 0,
                                                },
                                            ]}
                                        >
                                            Buy
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }, [sectionproperties, item.productid]);
    return cardsrender;
};
export default Singlecard;
const styles = StyleSheet.create({
    productsCard: {
        alignItems: 'center',
        // marginEnd: 5,
        // marginStart: 5,
        // backgroundColor:'#e8eaed',
        width: 375,
        height: 110,
        // marginBottom: 15,
        // borderRadius:25,
    },
    bttn: {
        // borderRadius:65,
        // backgroundColor:'#4f1261',
        // width:55,
        // height:30,
        alignItems: 'center',
    },
    bttnText: {
        //  color:'white',
        //  marginVertical:6.5,
    },
    productsCardImageCont: {
        // width:95,
        // height:95,
        // borderRadius:15,
        // marginStart:5,
    },

    favBttn: {
        // position:'absolute',
        // marginStart:70,
        // backgroundColor:'white',
        // width:25,
        // height:25,
        // borderRadius:100,
        // alignItems:'center',
        // paddingTop:4.5,
        // paddingStart:1,
        // top:4,
    },
});
