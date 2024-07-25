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

const Moderncategorycard = (props) => {
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
                                    : SIZES.width / 2 - 20
                                : SIZES.width > 1024
                                ? SIZES.width / 6
                                : SIZES.width > 768
                                ? SIZES.width / 5
                                : Platform.OS === 'ios'
                                ? SIZES.width - 250
                                : SIZES.width - 190,
                        backgroundColor: sectionproperties.backgroundColor,
                        marginLeft: StyleParseToIntFuncContext(sectionproperties.card_marginLeft),
                        marginRight: StyleParseToIntFuncContext(sectionproperties.card_marginRight),
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom),
                        paddingHorizontal: StyleParseToIntFuncContext(sectionproperties.cardpaddinghorizontal),
                        paddingVertical: StyleParseToIntFuncContext(sectionproperties.cardpaddingvertical),
                        borderRadius: StyleParseToIntFuncContext(sectionproperties.sectioncardborderradius),
                        // backgroundColor: '#262626',
                        // marginHorizontal: 10,
                        // marginBottom: 20,
                        // padding: 15,
                        // borderRadius: 10,
                    },
                ]}
            >
                <View style={{ width: '100%', marginBottom: StyleParseToIntFuncContext(sectionproperties.image_mb) }}>
                    <View
                        style={[
                            generalstyles.allcentered,
                            {
                                width: StyleParseToIntFuncContext(sectionproperties.image_width),
                                height: StyleParseToIntFuncContext(sectionproperties.image_height),
                                borderRadius: StyleParseToIntFuncContext(sectionproperties.imageborderradius, '', true),
                                backgroundColor: sectionproperties.image_bgcolor,
                                overflow: 'hidden',
                            },
                        ]}
                    >
                        <ImageComponent
                            resizeMethod="resize"
                            path={imageurlgrouper()}
                            resizeMode="cover"
                            style={[
                                {
                                    width: StyleParseToIntFuncContext(sectionproperties.imageInnerWidth_Height, '', true) + '%',
                                    height: StyleParseToIntFuncContext(sectionproperties.imageInnerWidth_Height, '', true) + '%',
                                },
                            ]}
                        />
                    </View>
                </View>
                <View style={{ width: '100%' }}>
                    <Text
                        style={{
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
                            textAlign: 'left',
                        }}
                    >
                        {item.name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }, [sectionproperties, item.productid, item.quantity]);
    return cardsrender;
};
export default Moderncategorycard;
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
