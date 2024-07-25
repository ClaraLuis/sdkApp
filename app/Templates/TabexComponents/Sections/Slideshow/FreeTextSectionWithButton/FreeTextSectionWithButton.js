import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import { WebsiteDesignWorkPlaceContext } from '../../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { LanguageContext } from '../../../../LanguageContext/LanguageContext';
import { TemplateRoutingContext } from '../../../../TemplateRoutingContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FetchingContext } from '../../../../FetchingContext/FetchingContext';
import { ImageComponent } from '../../../../ImageComponent';

const FreeTextSectionWithButton = (props) => {
    const { lang, langdetect } = useContext(LanguageContext);
    const { routingcountext, StaticPagesLinksContext, routingtemp } = useContext(TemplateRoutingContext);
    const { CurrentPageIdContext, StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const { fetchAuthorizationQueryContext, cardonclickfunctionContext } = useContext(FetchingContext);

    useEffect(() => {
        if (props?.sectionpropertiesProps != undefined) {
            var secpropobj = {};
            props?.sectionpropertiesProps?.forEach(function (sectionpropertiesobj, sectionpropertiesindex) {
                secpropobj[sectionpropertiesobj.property_css_name] = sectionpropertiesobj.property_value;
            });
            setsectionproperties({ ...secpropobj });
        }
    }, [props.sectionpropertiesProps]);

    const [maincontainerarrayofobjs, setmaincontainerarrayofobjs] = useState([]);
    useEffect(() => {
        if (sectionproperties.length != 0 && sectionproperties.maincontainerarrayofobjs != undefined) {
            var maincontainerarrayofobjsparsed = JSON.parse(sectionproperties.maincontainerarrayofobjs);
            if (Array.isArray(maincontainerarrayofobjsparsed)) {
                setmaincontainerarrayofobjs([...maincontainerarrayofobjsparsed]);
            }
        }
    }, [sectionproperties]);

    const cardsrender = React.useMemo(() => {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop),
                    marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom),
                    backgroundColor: sectionproperties.backgroundColor,
                }}
            >
                <ImageComponent
                    path={'/tr:w-290,h-300/' + maincontainerarrayofobjs[0]?.back_bgimage}
                    style={{ width: '100%', height: '100%', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, resizeMode: 'cover' }}
                />
                {maincontainerarrayofobjs.length != 0 && (
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            right: 0,
                            left: 0,
                            backgroundColor:
                                sectionproperties.cardimg_opacity != undefined && sectionproperties.cardimg_opacity != null
                                    ? 'rgba(0,0,0,' + sectionproperties.cardimg_opacity + ')'
                                    : 'rgba(0,0,0,0 )',
                        }}
                    ></View>
                )}
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: StyleParseToIntFuncContext(sectionproperties.paddingTop),
                        paddingBottom: StyleParseToIntFuncContext(sectionproperties.paddingBottom),
                        paddingRight: langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.paddingRight) : StyleParseToIntFuncContext(sectionproperties.paddingLeft),
                        paddingLeft: langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.paddingLeft) : StyleParseToIntFuncContext(sectionproperties.paddingRight),
                    }}
                >
                    {sectionproperties.sectiontitleshow == 'Show' && (
                        <View style={{ flexDirection: sectionproperties.sectiontitlestyle == 'Line Before Text' ? 'row' : 'column', alignItems: 'center' }}>
                            {sectionproperties.sectiontitlestyle == 'Line Before Text' && <View style={{ height: 1, backgroundColor: sectionproperties.linebgcolor, flex: 1, marginBottom: 10 }} />}
                            <Text
                                style={{
                                    paddingHorizontal: sectionproperties.sectiontitlestyle == 'Line Before Text' ? 10 : 0,
                                    textAlign: 'center',
                                    color: sectionproperties.sectionTitleColor,
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
                                    marginBottom: StyleParseToIntFuncContext(sectionproperties.sectionTitleMarginBottom),
                                    fontWeight: sectionproperties.sectionTitleFontWeight,
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
                                            : sectionproperties.sectiontitlefontfamily == 'ASUL'
                                            ? sectionproperties.sectionTitleFontWeight == 300
                                                ? 'Asul-Regular'
                                                : sectionproperties.sectionTitleFontWeight == 400
                                                ? 'Asul-Regular'
                                                : sectionproperties.sectionTitleFontWeight == 500
                                                ? 'Asul-Regular'
                                                : sectionproperties.sectionTitleFontWeight == 600
                                                ? 'Asul-Regular'
                                                : sectionproperties.sectionTitleFontWeight == 700
                                                ? 'Asul-Bold'
                                                : sectionproperties.sectionTitleFontWeight == 800
                                                ? 'Asul-Bold'
                                                : 'Poppins-Regular'
                                            : 'Poppins-Medium',
                                }}
                            >
                                {langdetect == 'en' ? sectionproperties.sectionTitleContent : sectionproperties.sectionTitleContent_ar}
                            </Text>

                            {sectionproperties.sectiontitlestyle == 'Line Before Text' && <View style={{ height: 1, backgroundColor: sectionproperties.linebgcolor, flex: 1, marginBottom: 10 }} />}

                            {sectionproperties.sectiontitlestyle == 'Line Under Text' && (
                                <View
                                    style={{
                                        height: 1,
                                        backgroundColor: sectionproperties.linebgcolor,
                                        width:
                                            StyleParseToIntFuncContext(
                                                sectionproperties.sectitle_lineafterwidth != null && sectionproperties.sectitle_lineafterwidth != undefined
                                                    ? sectionproperties.sectitle_lineafterwidth
                                                    : 100,
                                            ) + '%',
                                        marginBottom: 10,
                                    }}
                                />
                            )}
                        </View>
                    )}

                    {sectionproperties.prodCatShow == 'Show' && (
                        <Text
                            style={{
                                textAlign: 'center',
                                color: sectionproperties.prodCatColor,
                                fontSize: StyleParseToIntFuncContext(sectionproperties.prodCatFontSize),
                                fontWeight: sectionproperties.prodCatFontWeight,
                                marginBottom: StyleParseToIntFuncContext(sectionproperties.descriptionMarginBottom),
                                fontFamily:
                                    sectionproperties.descFontFamily == 'Poppins'
                                        ? sectionproperties.prodCatFontWeight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.prodCatFontWeight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.prodCatFontWeight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.prodCatFontWeight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.prodCatFontWeight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold'
                                        : sectionproperties.descFontFamily == 'Pacifico'
                                        ? 'Pacifico-Regular'
                                        : sectionproperties.descFontFamily == 'Great Vibes'
                                        ? 'GreatVibes-Regular'
                                        : sectionproperties.descFontFamily == 'ASUL'
                                        ? sectionproperties.prodCatFontWeight == 300
                                            ? 'Asul-Regular'
                                            : sectionproperties.prodCatFontWeight == 400
                                            ? 'Asul-Regular'
                                            : sectionproperties.prodCatFontWeight == 500
                                            ? 'Asul-Regular'
                                            : sectionproperties.prodCatFontWeight == 600
                                            ? 'Asul-Regular'
                                            : sectionproperties.prodCatFontWeight == 700
                                            ? 'Asul-Bold'
                                            : sectionproperties.prodCatFontWeight == 800
                                            ? 'Asul-Bold'
                                            : 'Poppins-Regular'
                                        : 'Poppins-Medium',
                            }}
                        >
                            {langdetect == 'en' ? sectionproperties.descriptionContentEn : sectionproperties.descriptionContentAr}
                        </Text>
                    )}

                    {sectionproperties.generalbtn_show == 'Show' && (
                        <TouchableOpacity
                            style={{
                                backgroundColor: sectionproperties.generalbtn_bgColor,
                                borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomleftradius),
                                borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomrightradius),
                                borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertopleftradius),
                                borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertoprightradius),
                                width: StyleParseToIntFuncContext(sectionproperties.generalbtn_width),
                                height: StyleParseToIntFuncContext(sectionproperties.generalbtn_height),
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={() => {
                                if (sectionproperties.btntype == 'WhatsApp') {
                                    Linking.openURL('whatsapp://send?text=&phone=' + fetchAuthorizationQueryContext?.data?.data?.instinfo?.whatsappnumber);
                                } else if (sectionproperties.btntype == 'Another WhatsApp Number') {
                                    Linking.openURL('whatsapp://send?text=&phone=' + sectionproperties.btnlink);
                                } else if (sectionproperties.btntype == 'App Product Link') {
                                    if (sectionproperties.btnlink != undefined && sectionproperties.btnlink != null && sectionproperties.btnlink != '') {
                                        cardonclickfunctionContext('productinfo', sectionproperties.btnlink, null, null);
                                    }
                                } else if (sectionproperties.btntype == 'Affiliate Signup') {
                                    routingcountext(StaticPagesLinksContext.Afiiliatesignup);
                                } else if (sectionproperties.btntype == 'External Link') {
                                    if (sectionproperties.btnlink != undefined && sectionproperties.btnlink != null && sectionproperties.btnlink != '') {
                                        Linking.openURL(sectionproperties.btnlink);
                                    }
                                } else if (sectionproperties.btntype == 'App Page') {
                                    routingtemp(sectionproperties.btnlink);
                                } else {
                                }
                                // routingcountext(StaticPagesLinksContext.VendorPage);
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.generalbtn_fontsize),
                                    color: sectionproperties.generalbtn_textColor,
                                }}
                            >
                                {langdetect == 'en' ? sectionproperties.generalbtn_content : sectionproperties.slideshow_btn_text_ar}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    }, [sectionproperties]);

    return cardsrender;
};

const styles = StyleSheet.create({});

export default FreeTextSectionWithButton;
