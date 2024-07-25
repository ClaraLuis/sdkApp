import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { SIZES } from '../../GeneralFiles/constants';
import { urlEndpoint } from '../../../../config/imagekit';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { BlurView } from 'expo-blur';
import { useSelector } from 'react-redux';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { ImageComponent } from '../../../ImageComponent';

const Cardwithblureffect = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);

    const { lang, langdetect } = useContext(LanguageContext);
    const { CurrentPageIdContext, StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { routingcountext, StaticPagesLinksContext, routingtemp } = useContext(TemplateRoutingContext);
    const { cardonclickfunctionContext } = useContext(FetchingContext);
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
    const cardsrender = React.useMemo(() => {
        return (
            <TouchableOpacity
                style={[
                    styles.cardcontainer,
                    {
                        width:
                            props.sectiondirection != 'slider'
                                ? SIZES.width > 1024
                                    ? SIZES.width / 6
                                    : SIZES.width > 768
                                    ? SIZES.width / 4 - 20
                                    : SIZES.width / props.numberOfColsvertical -
                                      StyleParseToIntFuncContext(sectionproperties.cardmarginhorizontal) -
                                      StyleParseToIntFuncContext(sectionproperties.cardmarginhorizontal) -
                                      5
                                : SIZES.width > 1024
                                ? SIZES.width / 6
                                : SIZES.width > 768
                                ? SIZES.width / 4
                                : Platform.OS === 'ios'
                                ? StyleParseToIntFuncContext(sectionproperties.width)
                                : StyleParseToIntFuncContext(sectionproperties.width) + 20,
                        height: StyleParseToIntFuncContext(sectionproperties.height != null && sectionproperties.height != undefined ? sectionproperties.height : 0),
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom != null && sectionproperties.marginBottom != undefined ? sectionproperties.marginBottom : 0),
                        marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop != null && sectionproperties.marginTop != undefined ? sectionproperties.marginTop : 0),
                        borderColor: sectionproperties.sectioncardbordercolor,
                        borderWidth: StyleParseToIntFuncContext(sectionproperties.sectioncardborderwidth, '', true),
                        borderRadius: StyleParseToIntFuncContext(sectionproperties.sectioncardborderradius, '', true),
                        marginLeft: StyleParseToIntFuncContext(sectionproperties.cardmarginhorizontal),
                        marginRight: StyleParseToIntFuncContext(sectionproperties.cardmarginhorizontal),
                    },
                ]}
                onPress={() => {
                    cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                }}
            >
                <ImageComponent
                    path={'/tr:w-' + sectionproperties.imagetr_w + ',h-' + sectionproperties.imagetr_h + '/' + item.image}
                    resizeMode={'cover'}
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: StyleParseToIntFuncContext(sectionproperties.sectioncardborderradius, '', true),
                    }}
                    resizeMethod="resize"
                />
                <View
                    style={{
                        borderRadius: StyleParseToIntFuncContext(sectionproperties.reservation_borderradius, '', true),
                        overflow: 'hidden',
                        position: 'absolute',
                        bottom: 20,
                    }}
                >
                    <BlurView
                        BlurTint="dark"
                        intensity={200}
                        style={{
                            justifyContent: 'center',
                            alignSelf: 'center',
                            paddingStart: 15,
                            paddingEnd: 15,
                            paddingTop: 15,
                            paddingBottom: 15,
                        }}
                    >
                        <View
                            style={[
                                {
                                    width: '100%',
                                },
                            ]}
                        >
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={[
                                    {
                                        textAlign: 'center',
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
                                    },
                                ]}
                            >
                                {item.name}
                            </Text>
                        </View>
                    </BlurView>
                </View>
            </TouchableOpacity>
        );
    }, [sectionproperties, item.productid, item.quantity]);
    return cardsrender;
};
export default Cardwithblureffect;
const styles = StyleSheet.create({
    cardcontainer: {
        flex: 1,
        alignItems: 'center',
    },
});
