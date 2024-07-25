import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { SIZES } from '../../../GeneralFiles/constants';
import { WebsiteDesignWorkPlaceContext } from '../../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import generalstyles from '../../../GeneralFiles/Stylesheet/Stylesheet';
import { LanguageContext } from '../../../../LanguageContext/LanguageContext';
// import Carousel from 'react-native-snap-carousel';
import { BlurView } from 'expo-blur';
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { urlEndpoint } from '../../../../../config/imagekit';
import { ImageComponent } from '../../../../ImageComponent';

const SlideshowWithCoolTransition = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);

    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [StatePageProperties, setStatePageProperties] = useState({});
    const [cardsarray, setcardsarray] = useState([]);
    const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
    function wp(percentage) {
        const value = (percentage * viewportWidth) / 100;
        return Math.round(value);
    }
    const slideWidth = wp(70);
    const sliderWidth = viewportWidth;
    const itemWidth = slideWidth;

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
        if (sectionproperties.length != 0 && sectionproperties.slideshowarrayofobj != undefined) {
            var slideshowarrayofobjparsed = JSON.parse(sectionproperties.slideshowarrayofobj);
            if (Array.isArray(slideshowarrayofobjparsed)) {
                setcardsarray([...slideshowarrayofobjparsed]);
            }
        }
    }, [sectionproperties]);
    const cardsrender = React.useMemo(() => {
        return (
            <View
                style={[
                    generalstyles.allcentered,
                    {
                        backgroundColor: sectionproperties.backgroundColortransparent == 'Transparent' ? 'transparent' : sectionproperties.backgroundColor,
                        marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop),
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom),
                        paddingLeft: StyleParseToIntFuncContext(sectionproperties.paddingLeft),
                        paddingRight: StyleParseToIntFuncContext(sectionproperties.paddingRight),
                        paddingTop: StyleParseToIntFuncContext(sectionproperties.paddingTop),
                        paddingBottom: StyleParseToIntFuncContext(sectionproperties.paddingBottom),
                        width: SIZES.width,
                    },
                ]}
            >
                <View>
                    <Text
                        style={{
                            color: sectionproperties.sectionTitleColor,
                            fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
                            marginBottom: StyleParseToIntFuncContext(sectionproperties.sectionTitleMarginBottom),
                            fontFamily:
                                sectionproperties.sectionTitleFontWeight == 300
                                    ? 'Poppins-Thin'
                                    : sectionproperties.sectionTitleFontWeight == 400
                                    ? 'Poppins-Light'
                                    : sectionproperties.sectionTitleFontWeight == 500
                                    ? 'Poppins-Regular'
                                    : sectionproperties.sectionTitleFontWeight == 600
                                    ? 'Poppins-Medium'
                                    : sectionproperties.sectionTitleFontWeight == 700
                                    ? 'Poppins-Semibold'
                                    : 'Poppins-Bold',
                        }}
                    >
                        {langdetect == 'en' ? sectionproperties.sectionTitleContent : sectionproperties.sectionTitleContent_ar}
                    </Text>
                </View>
                {/* {Object.keys(sectionproperties).length != 0 && (
                    <Carousel
                        layout={'default'}
                        useScrollView={true}
                        data={cardsarray}
                        renderItem={({ item, index }) => {
                            return (
                                <View
                                    style={[
                                        styles.categorycard_carousel,
                                        {
                                            height: StyleParseToIntFuncContext(sectionproperties.image_height),
                                            // height: 300,
                                        },
                                    ]}
                                >
                                    <View style={[styles.categorycard_carouselImageCont]}>
                                        <ImageComponent
                                            path={item.imageen}
                                            resizeMode="cover"
                                            style={[
                                                styles.categorycard_carouselImage,
                                                {
                                                    borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true),
                                                    borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true),
                                                    borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true),
                                                    borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true),
                                                },
                                            ]}
                                        />
                                    </View>
                                    {sectionproperties.generalbtn_show == 'Show' && (
                                        <TouchableOpacity
                                            style={[
                                                styles.categorycard_carouselarrowcont,
                                                {
                                                    width: StyleParseToIntFuncContext(sectionproperties.generalbtn_width),
                                                    height: StyleParseToIntFuncContext(sectionproperties.generalbtn_height),
                                                    borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertopleftradius, '', true),
                                                    borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertoprightradius, '', true),
                                                    borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomleftradius, '', true),
                                                    borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomrightradius, '', true),
                                                    backgroundColor: sectionproperties.generalbtn_bgColor,
                                                    bottom: StyleParseToIntFuncContext(sectionproperties.generalbtn_marginBottom),
                                                },
                                            ]}
                                        >
                                            <View
                                                style={{
                                                    borderColor: sectionproperties.generalbtn_bordercolor,
                                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderwidth),
                                                    width: 50,
                                                    height: 50,
                                                    borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertopleftradius, '', true),
                                                    borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertoprightradius, '', true),
                                                    borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomleftradius, '', true),
                                                    borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomrightradius, '', true),
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <AntDesign
                                                    name={langdetect == 'en' ? 'arrowright' : 'arrowleft'}
                                                    size={StyleParseToIntFuncContext(sectionproperties.generalbtn_fontsize)}
                                                    style={{
                                                        color: sectionproperties.generalbtn_textColor,
                                                        transform: [{ rotate: '-45deg' }],
                                                    }}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    <View
                                        style={[
                                            generalstyles.allcentered,
                                            {
                                                borderRadius: 10,
                                                overflow: 'hidden',
                                                position: 'absolute',
                                                bottom: 180,
                                                display: sectionproperties.slideshowtext1_show != 'Show' && sectionproperties.slideshowtext2_show != 'Show' ? 'none' : 'flex',
                                            },
                                        ]}
                                    >
                                        <BlurView
                                            BlurTint="dark"
                                            intensity={20}
                                            style={[
                                                generalstyles.flexColumn,
                                                {
                                                    justifyContent: 'center',
                                                    alignSelf: 'center',
                                                    paddingStart: 15,
                                                    paddingEnd: 15,
                                                    paddingTop: 15,
                                                    paddingBottom: 15,
                                                    borderRadius: 100,
                                                },
                                            ]}
                                        >
                                            {sectionproperties.slideshowtext1_show == 'Show' && (
                                                <Text
                                                    style={[
                                                        {
                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.slideshowText1ContentFontSize),
                                                            color: sectionproperties.slideshowText1ContentColor,
                                                            fontFamily:
                                                                sectionproperties.slideshowText1ContentFontWeight == 300
                                                                    ? 'Poppins-Thin'
                                                                    : sectionproperties.slideshowText1ContentFontWeight == 400
                                                                    ? 'Poppins-Light'
                                                                    : sectionproperties.slideshowText1ContentFontWeight == 500
                                                                    ? 'Poppins-Regular'
                                                                    : sectionproperties.slideshowText1ContentFontWeight == 600
                                                                    ? 'Poppins-Medium'
                                                                    : sectionproperties.slideshowText1ContentFontWeight == 700
                                                                    ? 'Poppins-Semibold'
                                                                    : 'Poppins-Bold',
                                                        },
                                                    ]}
                                                >
                                                    {langdetect == 'en' ? item.titleen : item.titlear}
                                                </Text>
                                            )}
                                            {sectionproperties.slideshowtext2_show == 'Show' && (
                                                <Text
                                                    style={[
                                                        {
                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.slideshowText2ContentFontSize),
                                                            color: sectionproperties.slideshowText2ContentColor,
                                                            fontFamily:
                                                                sectionproperties.slideshowText2ContentFontWeight == 300
                                                                    ? 'Poppins-Thin'
                                                                    : sectionproperties.slideshowText2ContentFontWeight == 400
                                                                    ? 'Poppins-Light'
                                                                    : sectionproperties.slideshowText2ContentFontWeight == 500
                                                                    ? 'Poppins-Regular'
                                                                    : sectionproperties.slideshowText2ContentFontWeight == 600
                                                                    ? 'Poppins-Medium'
                                                                    : sectionproperties.slideshowText2ContentFontWeight == 700
                                                                    ? 'Poppins-Semibold'
                                                                    : 'Poppins-Bold',
                                                        },
                                                    ]}
                                                >
                                                    {langdetect == 'en' ? item.descriptionen : item.descriptionar}
                                                </Text>
                                            )}
                                        </BlurView>
                                    </View>
                                </View>
                            );
                        }}
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                    />
                )} */}
            </View>
        );
    }, [sectionproperties, cardsarray]);
    return cardsrender;
};

const styles = StyleSheet.create({
    categorycard_carousel: {
        alignItems: 'center',
        marginEnd: 10,
        marginStart: 10,
    },
    categorycard_carouselImageCont: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: '90%',
    },
    categorycard_carouselImage: {
        width: '100%',
        height: '100%',
    },
    categorycard_carouselarrowcont: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1000,
    },
});

export default SlideshowWithCoolTransition;
