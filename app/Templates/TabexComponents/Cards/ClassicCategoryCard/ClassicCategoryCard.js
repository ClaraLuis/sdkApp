import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { SIZES } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { urlEndpoint } from '../../../../config/imagekit';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { useSelector } from 'react-redux';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { ImageComponent } from '../../../ImageComponent';

const ClassicCategoryCard = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { cardonclickfunctionContext } = useContext(FetchingContext);
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
                onPress={() => {
                    cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                }}
                style={[
                    styles.productsCard,
                    {
                        width:
                            props.sectiondirection != 'slider'
                                ? SIZES.width > 1025
                                    ? SIZES.width / 5 - 20
                                    : SIZES.width > 768
                                    ? SIZES.width / 4 - 20
                                    : SIZES.width / props.numberOfColsvertical -
                                      StyleParseToIntFuncContext(sectionproperties.card_marginRight) -
                                      StyleParseToIntFuncContext(sectionproperties.card_marginLeft)
                                : SIZES.width > 1024
                                ? SIZES.width / 6
                                : SIZES.width > 768
                                ? SIZES.width / 5
                                : Platform.OS === 'ios'
                                ? SIZES.width - StyleParseToIntFuncContext(sectionproperties.width)
                                : SIZES.width - StyleParseToIntFuncContext(sectionproperties.width),
                        // : SIZES.width - 190,
                        backgroundColor: sectionproperties.backgroundColortransparent == 'Transparent' ? 'transparent' : sectionproperties.backgroundColor,
                        marginRight:
                            langdetect == 'en'
                                ? StyleParseToIntFuncContext(sectionproperties.card_marginRight != undefined && sectionproperties.card_marginRight != null ? sectionproperties.card_marginRight : 10)
                                : StyleParseToIntFuncContext(sectionproperties.card_marginLeft != undefined && sectionproperties.card_marginLeft != null ? sectionproperties.card_marginLeft : 10),
                        marginLeft:
                            langdetect == 'en'
                                ? StyleParseToIntFuncContext(sectionproperties.card_marginLeft != null && sectionproperties.card_marginLeft != undefined ? sectionproperties.card_marginLeft : 10)
                                : StyleParseToIntFuncContext(sectionproperties.card_marginRight != null && sectionproperties.card_marginRight != undefined ? sectionproperties.card_marginRight : 0),
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom != null && sectionproperties.marginBottom != undefined ? sectionproperties.marginBottom : 0),
                        marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop != null && sectionproperties.marginTop != undefined ? sectionproperties.marginTop : 0),
                        borderRadius: StyleParseToIntFuncContext(sectionproperties.sectioncardborderradius, '', true),
                        overflow: 'hidden',
                    },
                ]}
            >
                <View style={[generalstyles.allcentered, { width: '100%' }]}>
                    <View
                        style={[
                            styles.productsCardImageCont,
                            {
                                width: '100%',
                                height: StyleParseToIntFuncContext(sectionproperties.image_height != null && sectionproperties.image_height != undefined ? sectionproperties.image_height : 0),
                                borderRadius: StyleParseToIntFuncContext(sectionproperties.sectioncardborderradius, '', true),
                            },
                        ]}
                    >
                        <View
                            style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor:
                                    sectionproperties.darknessopacity != undefined && sectionproperties.darknessopacity != null
                                        ? 'rgba(0,0,0,' + sectionproperties.darknessopacity + ')'
                                        : 'rgba(0,0,0,0 )',
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                right: 0,
                                left: 0,
                                zIndex: 1000,
                                borderRadius: StyleParseToIntFuncContext(sectionproperties.sectioncardborderradius, '', true),
                            }}
                        />
                        <ImageComponent
                            path={imageurlgrouper()}
                            style={[
                                {
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.sectioncardborderradius, '', true),
                                    resizeMode: sectionproperties.bgcovercontain == 'Cover' ? 'cover' : 'contain',
                                },
                            ]}
                            resizeMethod="resize"
                        />
                        {sectionproperties.general_showtext == 'Show' && (
                            <Text
                                style={{
                                    position: 'absolute',
                                    bottom: sectionproperties.textstylesposition == 'Bottom' ? 10 : '',
                                    top: sectionproperties.textstylesposition == 'Top Left' ? 10 : '',
                                    left: sectionproperties.textstylesposition == 'Top Left' ? 10 : '',
                                    width: '80%',
                                    // top: 10,
                                    // left: 20,
                                    zIndex: 2000,
                                    color: sectionproperties.generaltext_fontColor,
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
                                            : sectionproperties.generaltext_textTransform == 'Lowercase'
                                            ? 'lowercase'
                                            : 'none',
                                    textAlign: sectionproperties.generaltext_position == 'Not Centered' ? 'left' : 'center',
                                }}
                                numberOfLines={2}
                                ellipsizeMode="tail"
                            >
                                {item.name}
                            </Text>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }, [sectionproperties, item.productid, item.quantity]);
    return cardsrender;
};
export default ClassicCategoryCard;
const styles = StyleSheet.create({
    productsCard: {
        flex: 1,
        alignItems: 'center',
    },
    productsCardImageCont: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
});
