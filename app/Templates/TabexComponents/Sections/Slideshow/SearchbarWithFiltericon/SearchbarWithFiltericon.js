import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { icons, SIZES } from '../../../GeneralFiles/constants';
import { WebsiteDesignWorkPlaceContext } from '../../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import generalstyles from '../../../GeneralFiles/Stylesheet/Stylesheet';
import { LanguageContext } from '../../../../LanguageContext/LanguageContext';
import { Feather } from '@expo/vector-icons';
import { TemplateRoutingContext } from '../../../../TemplateRoutingContext';

const SearchbarWithFiltericon = (props) => {
    const { lang, langdetect } = useContext(LanguageContext);
    const { routingcountext, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
    const { StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const [sectionproperties, setsectionproperties] = useState('');

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
                    generalstyles.allcentered,
                    {
                        width: SIZES.width,
                        paddingEnd: StyleParseToIntFuncContext(sectionproperties.paddingRight),
                        paddingStart: StyleParseToIntFuncContext(sectionproperties.paddingLeft),
                        paddingTop: StyleParseToIntFuncContext(sectionproperties.paddingTop),
                        paddingBottom: StyleParseToIntFuncContext(sectionproperties.paddingBottom),
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom),
                        marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop),
                        backgroundColor: sectionproperties.backgroundColortransparent == 'Transparent' ? 'transparent' : sectionproperties.backgroundColor,
                        borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.borderBottomLeftRadius),
                        borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.borderBottomRightRadius),
                        borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.borderTopLeftRadius),
                        borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.borderTopRightRadius),
                    },
                ]}
            >
                {Object.keys(sectionproperties).length != 0 && (
                    <View style={[generalstyles.flexColumn, { width: '100%' }]}>
                        <View style={[generalstyles.flexColumn, { justifyContent: 'flex-start' }]}>
                            {sectionproperties.sectiontitleshow == 'Show' && (
                                <Text
                                    style={[
                                        generalstyles.poppinsMedium,
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
                                                    : sectionproperties.sectiontitlefontfamily == 'Pacifico'
                                                    ? 'Pacifico-Regular'
                                                    : sectionproperties.sectiontitlefontfamily == 'Great Vibes'
                                                    ? 'GreatVibes-Regular'
                                                    : 'Poppins-Medium',
                                            marginBottom: StyleParseToIntFuncContext(sectionproperties.sectionTitleMarginBottom),
                                            textAlign: 'left',
                                        },
                                    ]}
                                >
                                    {langdetect == 'en' ? sectionproperties.sectionTitleContent : sectionproperties.sectionTitleContent_ar}
                                </Text>
                            )}
                            {sectionproperties.prodCatShow == 'Show' && (
                                <Text
                                    style={[
                                        generalstyles.poppinsMedium,
                                        {
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
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.prodCatFontSize),
                                            color: sectionproperties.prodCatColor,
                                            marginBottom: StyleParseToIntFuncContext(sectionproperties.descriptionMarginBottom),
                                            marginLeft: StyleParseToIntFuncContext(sectionproperties.description_marginLeft),
                                            marginRight: StyleParseToIntFuncContext(sectionproperties.description_marginRight),
                                            textAlign: 'left',
                                        },
                                    ]}
                                >
                                    {langdetect == 'en' ? sectionproperties.descriptionContentEn : sectionproperties.descriptionContentAr}
                                </Text>
                            )}
                        </View>
                        <View style={[generalstyles.allcentered, { flexDirection: 'row' }]}>
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
                                        justifyContent: 'center',
                                        paddingStart: 10,
                                        paddingEnd: 5,
                                    },
                                ]}
                            >
                                <Feather name="search" size={StyleParseToIntFuncContext(sectionproperties.searchbaricon_fontsize)} color={sectionproperties.searchbaricon_color} />
                                <Text style={[generalstyles.poppinsMedium, { flex: 1, color: '#ccc', paddingStart: 5, textAlign: 'left' }]}>{lang.search}</Text>
                            </TouchableOpacity>
                            {/* {sectionproperties.showFilter == 'show' && (
                                <TouchableOpacity
                                    style={[
                                        generalstyles.allcentered,
                                        {
                                            marginStart: 5,
                                            width: StyleParseToIntFuncContext(sectionproperties.filterbtn_width),
                                            height: StyleParseToIntFuncContext(sectionproperties.filterbtn_height),
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.filter_borderBottomLeftRadius, '', true),
                                            // borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.filter_borderBottomRightRadius, '', true),
                                            // borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.filter_borderTopLeftRadius, '', true),
                                            // borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.filter_borderTopRightRadius, '', true),
                                            backgroundColor: sectionproperties.filter_backgroundcolor,
                                        },
                                    ]}
                                    onPress={() => {
                                        routingcountext(StaticPagesLinksContext.Filter, {
                                            ProductFilterObjContext: ProductFilterObjContext,
                                            setProductFilterObjContext: setProductFilterObjContext,
                                        });
                                    }}
                                >
                                    <Image source={icons.filter} resizeMode="cover" style={[{ width: '80%', height: '80%', tintColor: sectionproperties.iconColor }]} />
                                </TouchableOpacity>
                            )} */}
                        </View>
                    </View>
                )}
            </View>
        );
    }, [sectionproperties]);
    return cardsrender;
};

const styles = StyleSheet.create({});

export default SearchbarWithFiltericon;
