import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { SIZES } from '../../../GeneralFiles/constants';
import { WebsiteDesignWorkPlaceContext } from '../../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import generalstyles from '../../../GeneralFiles/Stylesheet/Stylesheet';
import { LanguageContext } from '../../../../LanguageContext/LanguageContext';
import { ImageComponent } from '../../../../ImageComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { TemplateRoutingContext } from '../../../../TemplateRoutingContext';

const Slideshow2 = (props) => {
    const navigation = useNavigation();
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { StaticPagesLinksContext, routingcountext } = useContext(TemplateRoutingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [imagesarray_ar, setimagesarray_ar] = useState([]);
    const [imagesarray, setimagesarray] = useState([]);
    const [wholearray, setwholearray] = useState([]);

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
        if (sectionproperties.length != 0) {
            if (sectionproperties.arrayofobjectimagesonly != undefined) {
                var temparr = [];
                var temparr_ar = [];
                var slideshowstylesarrayofobjsparsed = JSON.parse(sectionproperties.arrayofobjectimagesonly);
                setwholearray([...slideshowstylesarrayofobjsparsed]);
                if (Array.isArray(slideshowstylesarrayofobjsparsed)) {
                    slideshowstylesarrayofobjsparsed.forEach(function (arrayitem) {
                        temparr.push(arrayitem.bgsection_image);
                        temparr_ar.push(arrayitem.bgsection_image_ar);
                    });

                    setimagesarray_ar([...temparr_ar]);
                    setimagesarray([...temparr]);
                }
            }
        }
    }, [sectionproperties]);
    const cardsrender = React.useMemo(() => {
        return (
            <View
                style={[
                    generalstyles.allcentered,
                    {
                        backgroundColor: sectionproperties.backgroundColor,
                        marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop),
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom),
                        paddingStart: StyleParseToIntFuncContext(sectionproperties.paddingLeft),
                        paddingEnd: StyleParseToIntFuncContext(sectionproperties.paddingRight),
                        paddingTop: StyleParseToIntFuncContext(sectionproperties.paddingTop),
                        paddingBottom: StyleParseToIntFuncContext(sectionproperties.paddingBottom),
                        width: SIZES.width,
                    },
                ]}
            >
                {Object.keys(sectionproperties).length != 0 && (
                    <FlatList
                        data={langdetect == 'en' ? imagesarray : imagesarray_ar}
                        renderItem={({ item, index }) => {
                            return (
                                <View
                                    style={[
                                        {
                                            // width: 380,
                                            width: StyleParseToIntFuncContext(sectionproperties.image_width),
                                            height:
                                                SIZES.width > 768
                                                    ? StyleParseToIntFuncContext(sectionproperties.height_responsive) == null ||
                                                      StyleParseToIntFuncContext(sectionproperties.height_responsive) == undefined
                                                        ? StyleParseToIntFuncContext(sectionproperties.image_height) + 220
                                                        : StyleParseToIntFuncContext(sectionproperties.height_responsive)
                                                    : StyleParseToIntFuncContext(sectionproperties.image_height),

                                            // SIZES.width > 1024
                                            //     ? StyleParseToIntFuncContext(sectionproperties.image_height) + 100
                                            //     : SIZES.width > 768
                                            //     ? StyleParseToIntFuncContext(sectionproperties.image_height) + 50
                                            //     : StyleParseToIntFuncContext(sectionproperties.image_height),
                                            marginEnd: 15,
                                        },
                                    ]}
                                >
                                    {wholearray[index].IsClickableimg == 'Yes' && (
                                        <TouchableOpacity
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: StyleParseToIntFuncContext(sectionproperties.imageborderradius, '', true),
                                                overflow: 'hidden',
                                            }}
                                            onPress={() => {
                                                if (wholearray[index].IsClickableimg == 'Yes') {
                                                    if (wholearray[index]?.clickableimg_page_route && wholearray[index]?.clickableimg_page_route.length != 0) {
                                                        routingcountext(wholearray[index]?.clickableimg_page_route, false, '');
                                                    } else {
                                                        navigation.navigate('TemplateDraftRouter', {
                                                            screen: StaticPagesLinksContext?.GeneralProductsComponent,
                                                            params: {
                                                                genprodcompstinfo: {
                                                                    collectionid: wholearray[index]?.Clickableimg_getcoection,
                                                                    srcfrom: 'GeneralProductsComponent',
                                                                    fetchingtype: 'products',
                                                                },
                                                            },
                                                        });
                                                    }
                                                }
                                            }}
                                        >
                                            <ImageComponent
                                                path={'/tr:w-' + sectionproperties.imagetr_w + ',h-' + sectionproperties.imagetr_h + '/' + item}
                                                resizeMode={sectionproperties.bgcovercontain == 'Cover' ? 'cover' : 'contain'}
                                                style={[
                                                    {
                                                        width: '100%',
                                                        height: '100%',
                                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.imageborderradius, '', true),
                                                    },
                                                ]}
                                            />
                                        </TouchableOpacity>
                                    )}
                                    {wholearray[index].IsClickableimg != 'Yes' && (
                                        <ImageComponent
                                            path={'/tr:w-' + sectionproperties.imagetr_w + ',h-' + sectionproperties.imagetr_h + '/' + item}
                                            resizeMode={sectionproperties.bgcovercontain == 'Cover' ? 'cover' : 'contain'}
                                            style={[
                                                {
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.imageborderradius, '', true),

                                                    // resizeMode: sectionproperties.bgcovercontain == 'Cover' ? 'cover' : 'contain',
                                                },
                                            ]}
                                        />
                                    )}
                                </View>
                            );
                        }}
                        contentContainerStyle={{ paddingVertical: SIZES.padding * 0.8 }}
                        numColumns={1}
                        horizontal
                    />
                )}
            </View>
        );
    }, [sectionproperties, imagesarray, imagesarray_ar]);
    return cardsrender;
};

const styles = StyleSheet.create({});

export default Slideshow2;
