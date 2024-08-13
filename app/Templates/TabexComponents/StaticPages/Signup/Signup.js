import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import CustomerInformationForm from './CustomerInformationForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';
import { ImageComponent } from '../../../ImageComponent';

const Signup = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { templateproperties_context } = useContext(FetchingContext);
    const { StaticPagesLinksContext, routingcountext } = useContext(TemplateRoutingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [StatePageProperties, setStatePageProperties] = useState({});
    useEffect(() => {
        StatePageProperties11.pages.forEach(function (item, index) {
            if (CurrentPageIdContext == item.pageid) {
                setStatePageProperties(item.pageobj);
            }
        });
    }, [StatePageProperties11]);
    useEffect(() => {
        var secpropobj = {};
        if (StatePageProperties != undefined && StatePageProperties.pageobj != undefined && StatePageProperties.pageobj.pageproperties != undefined) {
            StatePageProperties.pageobj.pageproperties.forEach(function (sectionitem, sectionindex) {
                secpropobj[sectionitem.property_css_name] = sectionitem.property_value;
            });
        }
        if (templateproperties_context?.logoarrayofobjects != undefined) {
            secpropobj.logoarrayofobjects = JSON.parse(templateproperties_context?.logoarrayofobjects);
        } else {
            secpropobj.logoarrayofobjects = {};
        }
        setsectionproperties({ ...secpropobj });
    }, [StatePageProperties]);

    return (
        <View style={[{ height: '100%', paddingBottom: 40 }]}>
            <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false} style={{ height: '100%' }}>
                {Object.keys(sectionproperties).length != 0 && (
                    <View style={{ position: 'relative' }}>
                        {sectionproperties.cardstyletype == 'Style 1' && (
                            <View
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    width: '100%',
                                    height: 400,
                                    backgroundColor: sectionproperties.primarycolor,
                                    zIndex: -100,
                                    borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.shapeborderbottomleftradius, '', true),
                                    borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.shapeborderbottomrightradius, '', true),
                                    borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.shapebordertopleftradius, '', true),
                                    borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.shapebordertoprightradius, '', true),
                                }}
                            ></View>
                        )}
                        <View
                            style={{
                                zIndex: 1000,
                                paddingTop: 10,
                                marginBottom: 20,
                            }}
                        >
                            {sectionproperties.showlogo == 'Show' && (
                                <View
                                    style={[
                                        styles.logocontainer,
                                        generalstyles.flexColumn,
                                        {
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginBottom: 10,
                                            width: StyleParseToIntFuncContext(sectionproperties.logo_width != null && sectionproperties.logo_width != undefined ? sectionproperties.logo_width : 80),
                                            height: StyleParseToIntFuncContext(
                                                sectionproperties.logo_height != null && sectionproperties.logo_height != undefined ? sectionproperties.logo_height : 80,
                                            ),
                                            // width: 80,
                                            // height: 80,
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                        },
                                    ]}
                                >
                                    <ImageComponent
                                        path={langdetect == 'en' ? sectionproperties?.logoarrayofobjects[0]?.englishlogo : sectionproperties?.logoarrayofobjects[0]?.arabiclogo}
                                        resizeMode="contain"
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </View>
                            )}
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {sectionproperties.slideshowtext1_show == 'Show' && (
                                    <Text
                                        style={[
                                            {
                                                marginBottom: 5,
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
                                        {langdetect == 'en' ? sectionproperties.slideshowText1Content : sectionproperties.slideshowText1Content_ar}
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
                                        {langdetect == 'en' ? sectionproperties.slideshowText2Content : sectionproperties.slideshowText2Content_Ar}
                                    </Text>
                                )}
                            </View>
                            <TouchableOpacity
                                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}
                                onPress={() => {
                                    routingcountext(StaticPagesLinksContext.Login);
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'Poppins-Medium',
                                        // marginBottom: 10,
                                        color: sectionproperties.generaltext_fontColor,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                    }}
                                >
                                    {lang.alreadyhaveanaccount}
                                </Text>
                                <View
                                    style={[
                                        generalstyles.allcentered,
                                        {
                                            marginStart: 5,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.login_btn_fontSize),
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            {
                                                color: sectionproperties.login_btn_color,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.login_btn_fontSize),
                                                fontFamily:
                                                    sectionproperties.login_btn_fontweight == 300
                                                        ? 'Poppins-Thin'
                                                        : sectionproperties.login_btn_fontweight == 400
                                                        ? 'Poppins-Light'
                                                        : sectionproperties.login_btn_fontweight == 500
                                                        ? 'Poppins-Regular'
                                                        : sectionproperties.login_btn_fontweight == 600
                                                        ? 'Poppins-Medium'
                                                        : sectionproperties.login_btn_fontweight == 700
                                                        ? 'Poppins-Semibold'
                                                        : 'Poppins-Bold',
                                                textTransform:
                                                    sectionproperties.login_btn_texttransform == 'Uppercase'
                                                        ? 'uppercase'
                                                        : sectionproperties.login_btn_texttransform == 'Capitalize'
                                                        ? 'capitalize'
                                                        : 'lowercase',
                                                textDecorationLine: 'underline',
                                            },
                                        ]}
                                    >
                                        {lang.login}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <CustomerInformationForm formtype="add" StatePageProperties={StatePageProperties} />
                    </View>
                )}
            </KeyboardAwareScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    logocontainer: {
        width: 120,
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Signup;
