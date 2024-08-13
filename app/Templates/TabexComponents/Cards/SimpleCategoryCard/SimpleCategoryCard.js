import React, { useEffect, useState, useContext, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { SIZES } from '../../GeneralFiles/constants';
import { urlEndpoint } from '../../../../config/imagekit';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { ImageComponent } from '../../../ImageComponent';

const SimpleCategorycard = (props) => {
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { cardonclickfunctionContext } = useContext(FetchingContext);
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
    const cardsrender = useMemo(() => {
        return (
            <TouchableOpacity
                style={[
                    styles.cardcontainer,
                    generalstyles.allcentered,
                    {
                        borderWidth: StyleParseToIntFuncContext(sectionproperties.sectioncardborderwidth, '', true),
                        borderColor: sectionproperties.sectioncardbordercolor,
                        padding: sectionproperties.image_show == 'hide' ? 5 : 0,
                        paddingVertical: sectionproperties.image_show == 'hide' ? 15 : 0,
                        // minHeight: 'auto',
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom),
                        marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop),
                        marginStart: StyleParseToIntFuncContext(sectionproperties.card_marginLeft),
                        marginEnd: StyleParseToIntFuncContext(sectionproperties.card_marginRight),
                        paddingStart: StyleParseToIntFuncContext(sectionproperties.paddingLeft),
                        paddingEnd: StyleParseToIntFuncContext(sectionproperties.paddingRight),
                        paddingTop: StyleParseToIntFuncContext(sectionproperties.paddingTop),
                        paddingBottom: StyleParseToIntFuncContext(sectionproperties.paddingBottom),
                        width:
                            props.sectiondirection != 'slider'
                                ? SIZES.width > 1024
                                    ? sectionproperties.image_borderBottomRightRadius == 100
                                        ? StyleParseToIntFuncContext(sectionproperties.image_height) + 30
                                        : SIZES.width / 8 - StyleParseToIntFuncContext(sectionproperties.card_marginLeft) - StyleParseToIntFuncContext(sectionproperties.card_marginRight)
                                    : SIZES.width > 768
                                    ? sectionproperties.image_borderBottomRightRadius == 100
                                        ? Platform.OS === 'ios'
                                            ? StyleParseToIntFuncContext(sectionproperties.image_height)
                                            : StyleParseToIntFuncContext(sectionproperties.image_height) - 5
                                        : SIZES.width / 8 - 30
                                    : sectionproperties.image_borderBottomRightRadius == 100
                                    ? Platform.OS === 'ios'
                                        ? StyleParseToIntFuncContext(sectionproperties.image_height) + 3
                                        : StyleParseToIntFuncContext(sectionproperties.image_height) - 3
                                    : SIZES.width / props.numberOfColsvertical - 16
                                : SIZES.width > 1024
                                ? sectionproperties.image_borderBottomRightRadius == 100
                                    ? Platform.OS === 'ios'
                                        ? StyleParseToIntFuncContext(sectionproperties.image_height)
                                        : StyleParseToIntFuncContext(sectionproperties.image_height) - 5
                                    : SIZES.width / 6
                                : SIZES.width > 768
                                ? sectionproperties.image_borderBottomRightRadius == 100
                                    ? Platform.OS === 'ios'
                                        ? StyleParseToIntFuncContext(sectionproperties.image_height)
                                        : StyleParseToIntFuncContext(sectionproperties.image_height) - 5
                                    : SIZES.width / 5
                                : Platform.OS === 'ios'
                                ? sectionproperties.image_borderBottomRightRadius == 100
                                    ? Platform.OS === 'ios'
                                        ? StyleParseToIntFuncContext(sectionproperties.image_height)
                                        : StyleParseToIntFuncContext(sectionproperties.image_height) - 5
                                    : StyleParseToIntFuncContext(sectionproperties.width)
                                : // SIZES.width - 320
                                sectionproperties.image_borderBottomRightRadius == 100
                                ? Platform.OS === 'ios'
                                    ? StyleParseToIntFuncContext(sectionproperties.image_height)
                                    : StyleParseToIntFuncContext(sectionproperties.image_height) - 5
                                : parseInt(StyleParseToIntFuncContext(sectionproperties.width) - 2),
                        backgroundColor: sectionproperties.backgroundColortransparent == 'Transparent' ? 'transparent' : sectionproperties.backgroundColor,
                        borderRadius: StyleParseToIntFuncContext(sectionproperties.sectioncardborderradius, '', true),
                    },
                ]}
                onPress={() => {
                    // alert(sectionproperties.onClickRoute);
                    cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                }}
            >
                {sectionproperties.image_show == 'show' && (
                    <View
                        style={[
                            styles.cardImageCont,
                            {
                                borderColor: sectionproperties.image_bordercolor,
                                borderWidth: StyleParseToIntFuncContext(sectionproperties.image_borderwidth, '', true),
                                backgroundColor: sectionproperties.image_bgtransparent == 'Transparent' ? 'transparent' : sectionproperties.image_bgcolor,
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
                                    SIZES.width > 768 && sectionproperties.image_borderBottomRightRadius != 100 && props.sectiondirection == 'slider'
                                        ? StyleParseToIntFuncContext(sectionproperties.image_height) + 60
                                        : SIZES.width > 1024 && sectionproperties.image_borderBottomRightRadius != 100 && props.sectiondirection != 'slider'
                                        ? StyleParseToIntFuncContext(sectionproperties.image_height) + 60
                                        : SIZES.width > 1024 && sectionproperties.image_borderBottomRightRadius == 100
                                        ? StyleParseToIntFuncContext(sectionproperties.image_height) + 30
                                        : Platform.OS === 'ios'
                                        ? StyleParseToIntFuncContext(sectionproperties.image_height)
                                        : StyleParseToIntFuncContext(sectionproperties.image_height) - 5,
                            },
                        ]}
                    >
                        <ImageComponent
                            resizeMethod="resize"
                            path={Platform.OS === 'ios' ? '/tr:w-' + sectionproperties.imagetr_w + ',h-' + sectionproperties.imagetr_h + '/' + item.image : '/tr:w-230,h-220/' + item.image}
                            resizeMode={sectionproperties.bgcovercontain == 'Cover' ? 'cover' : 'contain'}
                            style={[
                                styles.cardImage,
                                {
                                    width: StyleParseToIntFuncContext(sectionproperties.imageInnerWidth_Height) + '%',
                                    height: StyleParseToIntFuncContext(sectionproperties.imageInnerWidth_Height) + '%',
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
                {sectionproperties.general_showtext == 'Show' && (
                    <View style={styles.cardcontainerDesc}>
                        <Text
                            style={{
                                textAlign: 'center',
                                color: sectionproperties.generaltext_fontColor,
                                textTransform: 'capitalize',
                                fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                fontFamily:
                                    sectionproperties.generaltext_fontWeight == 300
                                        ? 'Poppins-Thin'
                                        : sectionproperties.generaltext_fontWeight == 400
                                        ? 'Poppins-Light'
                                        : sectionproperties.generaltext_fontWeight == 500
                                        ? 'Poppins-Regular'
                                        : sectionproperties.generaltext_fontWeight == 600
                                        ? 'Poppins-Medium'
                                        : sectionproperties.generaltext_fontWeight == 700
                                        ? 'Poppins-Semibold'
                                        : 'Poppins-Bold',
                                textTransform:
                                    sectionproperties.generaltext_textTransform == 'Uppercase'
                                        ? 'uppercase'
                                        : sectionproperties.generaltext_textTransform == 'Capitalize'
                                        ? 'capitalize'
                                        : sectionproperties.generaltext_textTransform == 'None'
                                        ? 'none'
                                        : 'lowercase',
                            }}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                        >
                            {item.name}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        );
    }, [sectionproperties, item.collectionid, item.productid]);
    return cardsrender;
};
export default SimpleCategorycard;
const styles = StyleSheet.create({
    cardcontainer: {
        alignItems: 'center',
        height: 'auto',
    },
    cardImageCont: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    cardcontainerDesc: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingStart: 5,
        paddingEnd: 5,
        marginTop: 5,
    },
});
