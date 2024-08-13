import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { Badge, Icon } from 'react-native-elements';
import { icons, images, SIZES, COLORS, FONTS } from '../../../GeneralFiles/constants';
import { WebsiteDesignWorkPlaceContext } from '../../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import generalstyles from '../../../GeneralFiles/Stylesheet/Stylesheet';
import { urlEndpoint } from '../../../../../config/imagekit';
import { LanguageContext } from '../../../../LanguageContext/LanguageContext';
import { Feather } from '@expo/vector-icons';
import { TemplateRoutingContext } from '../../../../TemplateRoutingContext';
import { useDispatch, useSelector } from 'react-redux';

const SearchbarWithFilter = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);

    const { lang, langdetect } = useContext(LanguageContext);
    const { routingcountext, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
    const { CurrentPageIdContext, StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const [sectionproperties, setsectionproperties] = useState('');
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
    const cardsrender = React.useMemo(() => {
        return (
            <View
                style={[
                    {
                        backgroundColor: sectionproperties.lower_section_background,
                        paddingTop: StyleParseToIntFuncContext(sectionproperties.paddingTop),
                        paddingBottom: StyleParseToIntFuncContext(sectionproperties.paddingBottom),
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom),
                        marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop),
                    },
                ]}
            >
                {Object.keys(sectionproperties).length != 0 && (
                    <View
                        style={[
                            {
                                width: '100%',
                                paddingEnd: langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.paddingRight) : StyleParseToIntFuncContext(sectionproperties.paddingLeft),
                                paddingStart: langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.paddingLeft) : StyleParseToIntFuncContext(sectionproperties.paddingRight),
                                backgroundColor: sectionproperties.backgroundColortransparent == 'Transparent' ? 'transparent' : sectionproperties.backgroundColor,
                                borderBottomLeftRadius:
                                    langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.borderBottomLeftRadius) : StyleParseToIntFuncContext(sectionproperties.borderBottomRightRadius),
                                borderBottomRightRadius:
                                    langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.borderBottomRightRadius) : StyleParseToIntFuncContext(sectionproperties.borderBottomLeftRadius),
                                borderTopLeftRadius:
                                    langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.borderTopLeftRadius) : StyleParseToIntFuncContext(sectionproperties.borderTopRightRadius),
                                borderTopRightRadius:
                                    langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.borderTopRightRadius) : StyleParseToIntFuncContext(sectionproperties.borderTopLeftRadius),
                            },
                        ]}
                    >
                        <View style={[{ justifyContent: 'flex-start', textAlign: 'left' }]}>
                            {sectionproperties.sectiontitleshow == 'Show' && (
                                <Text
                                    style={[
                                        {
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
                                            color: sectionproperties.sectionTitleColor,
                                            fontFamily:
                                                sectionproperties.sectiontitlefontfamily == 'Poppins'
                                                    ? sectionproperties.sectionTitleFontWeight == 300
                                                        ? 'Poppins-Thin'
                                                        : sectionproperties.sectionTitleFontWeight == 400
                                                        ? 'Poppins-Light'
                                                        : sectionproperties.sectionTitleFontWeight == 500
                                                        ? 'Poppins-Regular'
                                                        : sectionproperties.sectionTitleFontWeight == 600
                                                        ? 'Poppins-Medium'
                                                        : sectionproperties.sectionTitleFontWeight == 700
                                                        ? 'Poppins-Semibold'
                                                        : 'Poppins-Bold'
                                                    : sectionproperties.sectiontitlefontfamily == 'ASUL'
                                                    ? sectionproperties.sectionTitleFontWeight == 300
                                                        ? 'Asul-Regular'
                                                        : sectionproperties.sectionTitleFontWeight == 400
                                                        ? 'Asul-Regular'
                                                        : sectionproperties.sectionTitleFontWeight == 500
                                                        ? 'Asul-Regular'
                                                        : sectionproperties.sectionTitleFontWeight == 600
                                                        ? 'Asul-Bold'
                                                        : sectionproperties.sectionTitleFontWeight == 700
                                                        ? 'Asul-Bold'
                                                        : 'Poppins-Medium'
                                                    : sectionproperties.sectiontitlefontfamily == 'Pacifico'
                                                    ? 'Pacifico-Regular'
                                                    : sectionproperties.sectiontitlefontfamily == 'Great Vibes'
                                                    ? 'GreatVibes-Regular'
                                                    : sectionproperties.sectiontitlefontfamily == 'Playfair'
                                                    ? 'PlayfairDisplay'
                                                    : 'Poppins-Medium',
                                            marginBottom: StyleParseToIntFuncContext(sectionproperties.sectionTitleMarginBottom),
                                            marginEnd: 'auto',
                                        },
                                    ]}
                                >
                                    {langdetect == 'en' ? sectionproperties.sectionTitleContent : sectionproperties.sectionTitleContent_ar}
                                </Text>
                            )}
                            {sectionproperties.prodCatShow == 'Show' && (
                                <Text
                                    style={[
                                        {
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.prodCatFontSize),
                                            color: sectionproperties.prodCatColor,
                                            marginBottom: StyleParseToIntFuncContext(sectionproperties.descriptionMarginBottom),
                                            marginEnd: 'auto',
                                            fontFamily:
                                                sectionproperties.prodCatFontWeight == 300
                                                    ? 'Poppins-Thin'
                                                    : sectionproperties.prodCatFontWeight == 400
                                                    ? 'Poppins-Light'
                                                    : sectionproperties.prodCatFontWeight == 500
                                                    ? 'Poppins-Regular'
                                                    : sectionproperties.prodCatFontWeight == 600
                                                    ? 'Poppins-Medium'
                                                    : sectionproperties.prodCatFontWeight == 700
                                                    ? 'Poppins-Semibold'
                                                    : 'Poppins-Bold',
                                        },
                                    ]}
                                >
                                    {langdetect == 'en' ? sectionproperties.descriptionContentEn : sectionproperties.descriptionContentAr}
                                </Text>
                            )}
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                routingcountext(StaticPagesLinksContext.Search);
                            }}
                            style={[
                                generalstyles.flexRow,
                                {
                                    backgroundColor: sectionproperties.searchbarcont_bgcolortransparent == 'Transparent' ? 'transparent' : sectionproperties.searchbarcont_bgcolor,
                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.searchbarcont_borderBottomLeftRadius, '', true),
                                    width: StyleParseToIntFuncContext(sectionproperties.searchbarcont_width) + '%',
                                    height: StyleParseToIntFuncContext(sectionproperties.searchbarcont_height),
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.searchbarcontinput_borderwidth, '', true),
                                    borderColor: sectionproperties.searchbarcontinput_bordercolor,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    paddingStart: 10,
                                    paddingEnd: 5,
                                },
                            ]}
                        >
                            <Text style={[generalstyles.poppinsMedium, { color: '#ccc' }]}>{lang.search}</Text>
                            <View
                                style={[
                                    generalstyles.allcentered,
                                    {
                                        width: StyleParseToIntFuncContext(sectionproperties.searchbaricon_width),
                                        height: StyleParseToIntFuncContext(sectionproperties.searchbaricon_height),
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.searchbaricon_borderBottomLeftRadius),
                                        backgroundColor: sectionproperties.searchbaricon_bgcolor,
                                    },
                                ]}
                            >
                                <Feather name="search" size={StyleParseToIntFuncContext(sectionproperties.searchbaricon_fontsize)} color={sectionproperties.searchbaricon_color} />
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }, [sectionproperties]);
    return cardsrender;
};

const styles = StyleSheet.create({});

export default SearchbarWithFilter;
