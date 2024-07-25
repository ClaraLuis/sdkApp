import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage, Platform } from 'react-native';
import { icons, SIZES, COLORS, images } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';

const Ordersuccess = (props) => {
    const route = useRoute();
    const { lang, langdetect, setlang } = useContext(LanguageContext);
    const { fetchAuthorizationQueryContext } = useContext(FetchingContext);
    const { CurrentPageIdContext, StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { routingcountext, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const [StatePageProperties, setStatePageProperties] = useState({});
    const [orderstatus, setorderstatus] = useState(route?.params?.status);
    const [orderstatusreason, setorderstatusreason] = useState(route?.params?.reason);
    useEffect(() => {
        StatePageProperties11.pages.forEach(function (item, index) {
            if (CurrentPageIdContext == item.pageid) {
                setStatePageProperties(item.pageobj);
            }
        });
    }, [StatePageProperties11]);
    useEffect(() => {
        var secpropobj = {};
        if (StatePageProperties.pageobj != undefined && StatePageProperties.pageobj.pageproperties != undefined) {
            StatePageProperties.pageobj.pageproperties.forEach(function (sectionitem, sectionindex) {
                secpropobj[sectionitem.property_css_name] = sectionitem.property_value;
            });
        }
        setsectionproperties({ ...secpropobj });
    }, [StatePageProperties]);

    return (
        <View
            style={[
                generalstyles.container,
                {
                    width: '100%',
                    flexDirection: 'column',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: 0,
                    paddingRight: 0,
                    height: SIZES.height,
                    backgroundColor: sectionproperties.backgroundColor,
                },
            ]}
        >
            {orderstatus != undefined && orderstatus != null && orderstatus.length != 0 && (
                <>
                    {orderstatus == 'true' && (
                        <View style={[generalstyles.flexColumn, generalstyles.allcentered, { paddingStart: 60, paddingEnd: 60, marginBottom: 180 }]}>
                            <Feather
                                name="check-circle"
                                size={30}
                                style={{
                                    color: sectionproperties.slideshowText1ContentColor,
                                    marginBottom: 10,
                                }}
                            />
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 15,
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
                                    color: sectionproperties.slideshowText1ContentColor,
                                }}
                            >
                                {langdetect == 'en' ? sectionproperties.slideshowText1Content : sectionproperties.slideshowText1Content_ar}
                            </Text>
                            {fetchAuthorizationQueryContext.data.data.loggedin && (
                                <TouchableOpacity
                                    style={[
                                        generalstyles.allcentered,
                                        {
                                            marginTop: 20,
                                            width: StyleParseToIntFuncContext(sectionproperties.generalbtn_width),
                                            height: StyleParseToIntFuncContext(sectionproperties.generalbtn_height),
                                            backgroundColor: sectionproperties.generalbtn_bgColor,
                                            borderTopLeftRadius:
                                                langdetect == 'en'
                                                    ? StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertopleftradius, '', true)
                                                    : StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertoprightradius, '', true),
                                            borderTopRightRadius:
                                                langdetect == 'en'
                                                    ? StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertoprightradius, '', true)
                                                    : StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertopleftradius, '', true),
                                            borderBottomLeftRadius:
                                                langdetect == 'en'
                                                    ? StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomleftradius, '', true)
                                                    : StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomrightradius, '', true),
                                            borderBottomRightRadius:
                                                langdetect == 'en'
                                                    ? StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomrightradius, '', true)
                                                    : StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomleftradius, '', true),
                                            borderWidth: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderwidth, '', true),
                                            borderColor: sectionproperties.generalbtn_bordercolor,
                                        },
                                    ]}
                                    onPress={() => {
                                        routingcountext(StaticPagesLinksContext.Ordershistory);
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: sectionproperties.generalbtn_textColor,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.generalbtn_fontsize),
                                            fontFamily:
                                                sectionproperties.generalbtn_fontweight == 300
                                                    ? 'Poppins-Thin'
                                                    : sectionproperties.generalbtn_fontweight == 400
                                                    ? 'Poppins-Light'
                                                    : sectionproperties.generalbtn_fontweight == 500
                                                    ? 'Poppins-Regular'
                                                    : sectionproperties.generalbtn_fontweight == 600
                                                    ? 'Poppins-Medium'
                                                    : sectionproperties.generalbtn_fontweight == 700
                                                    ? 'Poppins-Semibold'
                                                    : 'Poppins-Bold',
                                        }}
                                    >
                                        {langdetect == 'en' ? sectionproperties.generalbtn_content : sectionproperties.slideshow_btn_text_ar}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                    {orderstatus == 'false' && (
                        <View style={[generalstyles.flexColumn, generalstyles.allcentered, { paddingStart: 60, paddingEnd: 60, marginBottom: 100 }]}>
                            <Ionicons
                                name="sad-outline"
                                size={sectionproperties.icontextfontsize}
                                style={{
                                    color: sectionproperties.slideshowText2ContentColor,
                                    marginBottom: 10,
                                }}
                            />
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: sectionproperties.slideshowText2ContentFontSize,
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
                                    color: sectionproperties.slideshowText2ContentColor,
                                }}
                            >
                                {langdetect == 'en' ? sectionproperties.slideshowText2Content : sectionproperties.slideshowText2Content_Ar}
                                <Text style={{ color: 'red' }}>{orderstatusreason}</Text>
                            </Text>
                        </View>
                    )}
                </>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    settingscard: {
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    settingsiconcont: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginEnd: 10,
    },
    titlecont: {
        paddingStart: 20,
        paddingEnd: 20,
        width: '100%',
        marginBottom: 10,
        textAlign: 'left',
    },
});

export default Ordersuccess;
