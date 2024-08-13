import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, Platform } from 'react-native';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { icons, images, SIZES, COLORS, FONTS } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { MaterialIcons } from 'react-native-vector-icons';
import { urlEndpoint } from '../../../../config/imagekit';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { useDispatch, useSelector } from 'react-redux';
import { ImageComponent } from '../../../ImageComponent';

const CollectionCardWithBottomTextContainer = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const { lang, langdetect } = useContext(LanguageContext);
    const { CurrentPageIdContext, StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { routingcountext, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
    const { cardonclickfunctionContext } = useContext(FetchingContext);
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
                onPress={() => {
                    cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                }}
                style={[
                    generalstyles.allcentered,
                    generalstyles.flexColumn,
                    {
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom != null && sectionproperties.marginBottom != undefined ? sectionproperties.marginBottom : 0),
                        marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop != null && sectionproperties.marginTop != undefined ? sectionproperties.marginTop : 0),
                        width:
                            props.sectiondirection != 'slider'
                                ? SIZES.width > 1024
                                    ? SIZES.width / 5 - 15
                                    : SIZES.width > 768
                                    ? SIZES.width / 4 - 10
                                    : SIZES.width / 2 - 10
                                : SIZES.width > 1024
                                ? SIZES.width / 5
                                : SIZES.width > 768
                                ? SIZES.width / 4
                                : Platform.OS === 'ios'
                                ? SIZES.width - 220
                                : SIZES.width - 210,
                        // marginHorizontal: 5,
                        paddingBottom: 20,
                        paddingStart: StyleParseToIntFuncContext(sectionproperties.card_marginLeft),
                        paddingEnd: StyleParseToIntFuncContext(sectionproperties.card_marginRight),
                    },
                ]}
            >
                <View
                    style={[
                        styles.cardImageCont,
                        generalstyles.allcentered,
                        {
                            // borderColor: sectionproperties.image_bordercolor,
                            // borderWidth: StyleParseToIntFuncContext(sectionproperties.image_borderwidth, '', true),
                            backgroundColor: sectionproperties.image_bgcolor,
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
                            height: StyleParseToIntFuncContext(sectionproperties.image_height != null && sectionproperties.image_height != undefined ? sectionproperties.image_height : 0),
                        },
                    ]}
                >
                    {sectionproperties.image_show == 'show' && (
                        <ImageComponent
                            resizeMethod="resize"
                            // path={item.image}
                            path={imageurlgrouper()}
                            resizeMode={sectionproperties.bgcovercontain == 'Cover' ? 'cover' : 'contain'}
                            style={[
                                styles.cardImage,
                                {
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
                    )}
                </View>
                <View
                    style={[
                        generalstyles.flexRow,
                        generalstyles.allcentered,
                        {
                            position: 'absolute',
                            bottom: 0,
                            backgroundColor: sectionproperties.backgroundColor,
                            zIndex: 1000,
                            width: sectionproperties.image_show == 'show' ? '80%' : '95%',
                            padding: 10,
                            borderTopLeftRadius:
                                langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.borderTopLeftRadius) : StyleParseToIntFuncContext(sectionproperties.borderTopRightRadius),
                            borderTopRightRadius:
                                langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.borderTopRightRadius) : StyleParseToIntFuncContext(sectionproperties.borderTopLeftRadius),
                            borderBottomLeftRadius:
                                langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.borderBottomLeftRadius) : StyleParseToIntFuncContext(sectionproperties.borderBottomRightRadius),
                            borderBottomRightRadius:
                                langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.borderBottomRightRadius) : StyleParseToIntFuncContext(sectionproperties.borderBottomLeftRadius),
                        },
                    ]}
                >
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                            textAlign: 'left',
                            flex: 1,
                            color: sectionproperties.generaltext_fontColor,
                            fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                            fontFamily:
                                sectionproperties.generaltext_fontWeight == 300 || sectionproperties.generaltext_fontWeight == 400
                                    ? 'Poppins-Light'
                                    : sectionproperties.generaltext_fontWeight == 500 || sectionproperties.generaltext_fontWeight == 600
                                    ? 'Poppins-Medium'
                                    : 'Poppins-Bold',
                            textTransform:
                                sectionproperties.generaltext_textTransform == 'Uppercase'
                                    ? 'uppercase'
                                    : sectionproperties.prodNameTextTranform == 'Capitalize'
                                    ? 'capitalize'
                                    : sectionproperties.prodNameTextTranform == 'Lowercase'
                                    ? 'lowercase'
                                    : 'none',
                        }}
                    >
                        {item.name}
                    </Text>
                    <MaterialIcons
                        name={langdetect == 'en' ? 'keyboard-arrow-right' : 'keyboard-arrow-left'}
                        size={StyleParseToIntFuncContext(sectionproperties.icontextfontsize)}
                        style={{
                            color: sectionproperties.generaltext_fontColor,
                        }}
                    />
                </View>
            </TouchableOpacity>
        );
    }, [sectionproperties, item.productid, item.quantity]);
    return cardsrender;
};
export default CollectionCardWithBottomTextContainer;
const styles = StyleSheet.create({
    cardImageCont: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
});
