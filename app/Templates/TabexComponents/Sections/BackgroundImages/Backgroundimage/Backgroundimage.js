import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Linking } from 'react-native';
import { SIZES } from '../../../GeneralFiles/constants';
import { WebsiteDesignWorkPlaceContext } from '../../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { urlEndpoint } from '../../../../../config/imagekit';
import generalstyles from '../../../GeneralFiles/Stylesheet/Stylesheet';
import { LanguageContext } from '../../../../LanguageContext/LanguageContext';
import { TemplateRoutingContext } from '../../../../TemplateRoutingContext';
import { Video } from 'expo-av';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { ImageComponent } from '../../../../ImageComponent';
const Backgroundimage = (props) => {
    const navigation = useNavigation();
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { StaticPagesLinksContext, routingcountext } = useContext(TemplateRoutingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [bgimagearrayofobjs, setbgimagearrayofobjs] = useState([]);
    const [maincontainerarrayofobjs, setmaincontainerarrayofobjs] = useState([]);
    const [status, setStatus] = useState({});
    const video = useRef(null);
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
                var temparr = [...slideshowarrayofobjparsed];
                temparr.forEach(function (item) {
                    item.linkclicked = false;
                });
                setbgimagearrayofobjs([...temparr]);
            }
            if (sectionproperties.maincontainerarrayofobjs != undefined) {
                var maincontainerarrayofobjsparsed = JSON.parse(sectionproperties.maincontainerarrayofobjs);
                if (Array.isArray(maincontainerarrayofobjsparsed)) {
                    setmaincontainerarrayofobjs([...maincontainerarrayofobjsparsed]);
                }
            }
        }
    }, [sectionproperties]);
    const BackgroundImageContainer = (item, index) => {
        return (
            <View
                style={[
                    generalstyles.allcentered,
                    {
                        width: '100%',
                        height: sectionproperties.sectionbgstyle == 'Text above image' ? 'auto' : '100%',
                    },
                ]}
            >
                {item.linktype == 'Image' && (
                    <View
                        style={{
                            width: '100%',
                            height:
                                sectionproperties.sectionbgstyle == 'Text above image'
                                    ? SIZES.width > 1024
                                        ? StyleParseToIntFuncContext(sectionproperties.image_height) + 100
                                        : SIZES.width > 768
                                        ? StyleParseToIntFuncContext(sectionproperties.image_height) + 50
                                        : StyleParseToIntFuncContext(sectionproperties.image_height)
                                    : '100%',
                            borderTopLeftRadius: StyleParseToIntFuncContext(
                                sectionproperties.image_bordertopleftradius != null && sectionproperties.image_bordertopleftradius != undefined ? sectionproperties.image_bordertopleftradius : 0,
                                '',
                                true,
                            ),
                            borderTopRightRadius: StyleParseToIntFuncContext(
                                sectionproperties.image_bordertoprightradius != null && sectionproperties.image_bordertoprightradius != undefined ? sectionproperties.image_bordertoprightradius : 0,
                                '',
                                true,
                            ),
                            borderBottomLeftRadius: StyleParseToIntFuncContext(
                                sectionproperties.image_borderBottomLeftRadius != null && sectionproperties.image_borderBottomLeftRadius != undefined
                                    ? sectionproperties.image_borderBottomLeftRadius
                                    : 0,
                                '',
                                true,
                            ),
                            borderBottomRightRadius: StyleParseToIntFuncContext(
                                sectionproperties.image_borderBottomRightRadius != null && sectionproperties.image_borderBottomRightRadius != undefined
                                    ? sectionproperties.image_borderBottomRightRadius
                                    : 0,
                                '',
                                true,
                            ),
                            marginBottom: StyleParseToIntFuncContext(sectionproperties.image_mb != null && sectionproperties.image_mb != undefined ? sectionproperties.image_mb : 0),
                            backgroundColor: sectionproperties.image_bgcolor,
                        }}
                    >
                        <ImageComponent
                            path={
                                bgimagearrayofobjs.length != 0
                                    ? langdetect == 'en'
                                        ? '/tr:w-' + sectionproperties.imagetr_w + ',h-' + sectionproperties.imagetr_h + '/' + bgimagearrayofobjs[index].imageen
                                        : '/tr:w-' + sectionproperties.imagetr_w + ',h-' + sectionproperties.imagetr_h + '/' + bgimagearrayofobjs[index].imagear
                                    : ''
                            }
                            resizeMode={sectionproperties.bgcovercontain == 'Contain' ? 'contain' : 'cover'}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderTopLeftRadius: StyleParseToIntFuncContext(
                                    sectionproperties.image_bordertopleftradius != null && sectionproperties.image_bordertopleftradius != undefined ? sectionproperties.image_bordertopleftradius : 0,
                                    '',
                                    true,
                                ),
                                borderTopRightRadius: StyleParseToIntFuncContext(
                                    sectionproperties.image_bordertoprightradius != null && sectionproperties.image_bordertoprightradius != undefined
                                        ? sectionproperties.image_bordertoprightradius
                                        : 0,
                                    '',
                                    true,
                                ),
                                borderBottomLeftRadius: StyleParseToIntFuncContext(
                                    sectionproperties.image_borderBottomLeftRadius != null && sectionproperties.image_borderBottomLeftRadius != undefined
                                        ? sectionproperties.image_borderBottomLeftRadius
                                        : 0,
                                    '',
                                    true,
                                ),
                                borderBottomRightRadius: StyleParseToIntFuncContext(
                                    sectionproperties.image_borderBottomRightRadius != null && sectionproperties.image_borderBottomRightRadius != undefined
                                        ? sectionproperties.image_borderBottomRightRadius
                                        : 0,
                                    '',
                                    true,
                                ),
                            }}
                        />
                    </View>
                )}
                {item.linktype == 'Image With External Link' && (
                    <View
                        style={{
                            width: '100%',
                            height:
                                sectionproperties.sectionbgstyle == 'Text above image'
                                    ? SIZES.width > 1024
                                        ? StyleParseToIntFuncContext(sectionproperties.image_height) + 100
                                        : SIZES.width > 768
                                        ? StyleParseToIntFuncContext(sectionproperties.image_height) + 50
                                        : StyleParseToIntFuncContext(sectionproperties.image_height)
                                    : '100%',
                            borderTopLeftRadius: StyleParseToIntFuncContext(
                                sectionproperties.image_bordertopleftradius != null && sectionproperties.image_bordertopleftradius != undefined ? sectionproperties.image_bordertopleftradius : 0,
                                '',
                                true,
                            ),
                            borderTopRightRadius: StyleParseToIntFuncContext(
                                sectionproperties.image_bordertoprightradius != null && sectionproperties.image_bordertoprightradius != undefined ? sectionproperties.image_bordertoprightradius : 0,
                                '',
                                true,
                            ),
                            borderBottomLeftRadius: StyleParseToIntFuncContext(
                                sectionproperties.image_borderBottomLeftRadius != null && sectionproperties.image_borderBottomLeftRadius != undefined
                                    ? sectionproperties.image_borderBottomLeftRadius
                                    : 0,
                                '',
                                true,
                            ),
                            borderBottomRightRadius: StyleParseToIntFuncContext(
                                sectionproperties.image_borderBottomRightRadius != null && sectionproperties.image_borderBottomRightRadius != undefined
                                    ? sectionproperties.image_borderBottomRightRadius
                                    : 0,
                                '',
                                true,
                            ),
                            marginBottom: StyleParseToIntFuncContext(sectionproperties.image_mb != null && sectionproperties.image_mb != undefined ? sectionproperties.image_mb : 0),
                            backgroundColor: sectionproperties.image_bgcolor,
                        }}
                    >
                        <ImageComponent
                            path={
                                bgimagearrayofobjs.length != 0
                                    ? langdetect == 'en'
                                        ? '/tr:w-' + sectionproperties.imagetr_w + ',h-' + sectionproperties.imagetr_h + '/' + bgimagearrayofobjs[index].imageen
                                        : '/tr:w-' + sectionproperties.imagetr_w + ',h-' + sectionproperties.imagetr_h + '/' + bgimagearrayofobjs[index].imagear
                                    : ''
                            }
                            resizeMode={sectionproperties.bgcovercontain == 'Contain' ? 'contain' : 'cover'}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderTopLeftRadius: StyleParseToIntFuncContext(
                                    sectionproperties.image_bordertopleftradius != null && sectionproperties.image_bordertopleftradius != undefined ? sectionproperties.image_bordertopleftradius : 0,
                                    '',
                                    true,
                                ),
                                borderTopRightRadius: StyleParseToIntFuncContext(
                                    sectionproperties.image_bordertoprightradius != null && sectionproperties.image_bordertoprightradius != undefined
                                        ? sectionproperties.image_bordertoprightradius
                                        : 0,
                                    '',
                                    true,
                                ),
                                borderBottomLeftRadius: StyleParseToIntFuncContext(
                                    sectionproperties.image_borderBottomLeftRadius != null && sectionproperties.image_borderBottomLeftRadius != undefined
                                        ? sectionproperties.image_borderBottomLeftRadius
                                        : 0,
                                    '',
                                    true,
                                ),
                                borderBottomRightRadius: StyleParseToIntFuncContext(
                                    sectionproperties.image_borderBottomRightRadius != null && sectionproperties.image_borderBottomRightRadius != undefined
                                        ? sectionproperties.image_borderBottomRightRadius
                                        : 0,
                                    '',
                                    true,
                                ),
                            }}
                        />
                    </View>
                )}
                {item.linkclicked == false && item.linktype != 'Image' && item.linktype != 'Image With External Link' && (
                    <TouchableOpacity
                        style={{
                            width: '100%',
                            height:
                                sectionproperties.sectionbgstyle == 'Text above image'
                                    ? SIZES.width > 1024
                                        ? StyleParseToIntFuncContext(sectionproperties.image_height) + 100
                                        : SIZES.width > 768
                                        ? StyleParseToIntFuncContext(sectionproperties.image_height) + 50
                                        : StyleParseToIntFuncContext(sectionproperties.image_height)
                                    : '100%',
                            borderTopLeftRadius: StyleParseToIntFuncContext(
                                sectionproperties.image_bordertopleftradius != null && sectionproperties.image_bordertopleftradius != undefined ? sectionproperties.image_bordertopleftradius : 0,
                                '',
                                true,
                            ),
                            borderTopRightRadius: StyleParseToIntFuncContext(
                                sectionproperties.image_bordertoprightradius != null && sectionproperties.image_bordertoprightradius != undefined ? sectionproperties.image_bordertoprightradius : 0,
                                '',
                                true,
                            ),
                            borderBottomLeftRadius: StyleParseToIntFuncContext(
                                sectionproperties.image_borderBottomLeftRadius != null && sectionproperties.image_borderBottomLeftRadius != undefined
                                    ? sectionproperties.image_borderBottomLeftRadius
                                    : 0,
                                '',
                                true,
                            ),
                            borderBottomRightRadius: StyleParseToIntFuncContext(
                                sectionproperties.image_borderBottomRightRadius != null && sectionproperties.image_borderBottomRightRadius != undefined
                                    ? sectionproperties.image_borderBottomRightRadius
                                    : 0,
                                '',
                                true,
                            ),
                            marginBottom: StyleParseToIntFuncContext(sectionproperties.image_mb != null && sectionproperties.image_mb != undefined ? sectionproperties.image_mb : 0),
                            backgroundColor: sectionproperties.image_bgcolor,
                        }}
                        onPress={() => {
                            var temparr = [...bgimagearrayofobjs];
                            temparr[index].linkclicked = true;
                            setbgimagearrayofobjs([...temparr]);
                        }}
                    >
                        <ImageComponent
                            path={
                                bgimagearrayofobjs.length != 0
                                    ? langdetect == 'en'
                                        ? '/tr:w-' + sectionproperties.imagetr_w + ',h-' + sectionproperties.imagetr_h + '/' + bgimagearrayofobjs[index].imageen
                                        : '/tr:w-' + sectionproperties.imagetr_w + ',h-' + sectionproperties.imagetr_h + '/' + bgimagearrayofobjs[index].imagear
                                    : ''
                            }
                            resizeMode={sectionproperties.bgcovercontain == 'Contain' ? 'contain' : 'cover'}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderTopLeftRadius: StyleParseToIntFuncContext(
                                    sectionproperties.image_bordertopleftradius != null && sectionproperties.image_bordertopleftradius != undefined ? sectionproperties.image_bordertopleftradius : 0,
                                    '',
                                    true,
                                ),
                                borderTopRightRadius: StyleParseToIntFuncContext(
                                    sectionproperties.image_bordertoprightradius != null && sectionproperties.image_bordertoprightradius != undefined
                                        ? sectionproperties.image_bordertoprightradius
                                        : 0,
                                    '',
                                    true,
                                ),
                                borderBottomLeftRadius: StyleParseToIntFuncContext(
                                    sectionproperties.image_borderBottomLeftRadius != null && sectionproperties.image_borderBottomLeftRadius != undefined
                                        ? sectionproperties.image_borderBottomLeftRadius
                                        : 0,
                                    '',
                                    true,
                                ),
                                borderBottomRightRadius: StyleParseToIntFuncContext(
                                    sectionproperties.image_borderBottomRightRadius != null && sectionproperties.image_borderBottomRightRadius != undefined
                                        ? sectionproperties.image_borderBottomRightRadius
                                        : 0,
                                    '',
                                    true,
                                ),
                            }}
                        />
                    </TouchableOpacity>
                )}
                {item.linkclicked == true && item.linktype != 'Image' && item.linktype != 'Image With External Link' && (
                    <View
                        style={{
                            width: '100%',
                            height:
                                sectionproperties.sectionbgstyle == 'Text above image'
                                    ? SIZES.width > 1024
                                        ? StyleParseToIntFuncContext(sectionproperties.image_height) + 100
                                        : SIZES.width > 768
                                        ? StyleParseToIntFuncContext(sectionproperties.image_height) + 50
                                        : StyleParseToIntFuncContext(sectionproperties.image_height)
                                    : '100%',
                            marginBottom: StyleParseToIntFuncContext(sectionproperties.image_mb != null && sectionproperties.image_mb != undefined ? sectionproperties.image_mb : 0),
                        }}
                    >
                        {item.linktype == 'Platform Link' && (
                            <WebView
                                style={{ width: '100%', height: '100%' }}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                source={{ uri: item.linkurl }}
                                allowsFullscreenVideo={true}
                                allowfullscreen="allowfullscreen"
                                scalesPageToFit={true}
                            />
                        )}
                        {item.linktype == 'Video Link' && (
                            <Video
                                ref={video}
                                style={{ width: '100%', height: '100%' }}
                                source={{
                                    uri: item.linkurl,
                                }}
                                useNativeControls
                                resizeMode="contain"
                                isLooping
                                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                            />
                        )}
                    </View>
                )}
            </View>
        );
    };
    const cardsrender = React.useMemo(() => {
        return (
            <View
                style={{
                    marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom != null && sectionproperties.marginBottom != undefined ? sectionproperties.marginBottom : 0),
                    marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop != null && sectionproperties.marginTop != undefined ? sectionproperties.marginTop : 0),
                    marginLeft: StyleParseToIntFuncContext(sectionproperties.card_marginLeft != null && sectionproperties.card_marginLeft != undefined ? sectionproperties.card_marginLeft : 0),
                    marginRight: StyleParseToIntFuncContext(sectionproperties.card_marginRight != null && sectionproperties.card_marginRight != undefined ? sectionproperties.card_marginRight : 0),
                    backgroundColor: sectionproperties.backgroundColor,
                    borderBottomLeftRadius: StyleParseToIntFuncContext(
                        sectionproperties.borderBottomLeftRadius != null && sectionproperties.borderBottomLeftRadius != undefined ? sectionproperties.borderBottomLeftRadius : 0,
                        '',
                        true,
                    ),
                    borderBottomRightRadius: StyleParseToIntFuncContext(
                        sectionproperties.borderBottomRightRadius != null && sectionproperties.borderBottomRightRadius != undefined ? sectionproperties.borderBottomRightRadius : 0,
                        '',
                        true,
                    ),
                    borderTopLeftRadius: StyleParseToIntFuncContext(
                        sectionproperties.borderTopLeftRadius != null && sectionproperties.borderTopLeftRadius != undefined ? sectionproperties.borderTopLeftRadius : 0,
                        '',
                        true,
                    ),
                    borderTopRightRadius: StyleParseToIntFuncContext(
                        sectionproperties.borderTopRightRadius != null && sectionproperties.borderTopRightRadius != undefined ? sectionproperties.borderTopRightRadius : 0,
                        '',
                        true,
                    ),
                    width: '100%',
                    // borderLeftWidth: 5,
                    // borderRightWidth: 5,
                    // borderColor: '#0b1b3d',
                    borderLeftWidth: StyleParseToIntFuncContext(sectionproperties.borderhorizontalwidth, '', true),
                    borderRightWidth: StyleParseToIntFuncContext(sectionproperties.borderhorizontalwidth, '', true),
                    borderTopWidth: StyleParseToIntFuncContext(sectionproperties.borderverticalwidth, '', true),
                    borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.borderverticalwidth, '', true),
                    borderColor: sectionproperties.sectioncardbordercolor,
                }}
            >
                {maincontainerarrayofobjs.length != 0 && (
                    <ImageComponent
                        path={maincontainerarrayofobjs[0].back_bgimage}
                        resizeMode="cover"
                        style={[
                            {
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                width: '100%',
                                height: '100%',
                            },
                        ]}
                    />
                )}
                {Object.keys(sectionproperties).length != 0 && (
                    <View
                        style={[
                            generalstyles.allcentered,
                            {
                                width: '100%',
                                paddingStart: StyleParseToIntFuncContext(sectionproperties.paddingLeft != null && sectionproperties.paddingLeft != undefined ? sectionproperties.paddingLeft : 0),
                                paddingEnd: StyleParseToIntFuncContext(sectionproperties.paddingRight != null && sectionproperties.paddingRight != undefined ? sectionproperties.paddingRight : 0),
                                paddingTop: StyleParseToIntFuncContext(sectionproperties.paddingTop != null && sectionproperties.paddingTop != undefined ? sectionproperties.paddingTop : 0),
                                paddingBottom: StyleParseToIntFuncContext(
                                    sectionproperties.paddingBottom != null && sectionproperties.paddingBottom != undefined ? sectionproperties.paddingBottom : 0,
                                ),
                            },
                        ]}
                    >
                        <View style={[generalstyles.flexColumn, generalstyles.allcentered, { width: '100%' }]}>
                            {sectionproperties.sectiontitleshow == 'Show' && (
                                <View
                                    style={[
                                        generalstyles.container,
                                        generalstyles.allcentered,
                                        {
                                            flex: 1,
                                            paddingTop: 0,
                                            display: 'flex',
                                            marginBottom: StyleParseToIntFuncContext(
                                                sectionproperties.sectionTitleMarginBottom != null && sectionproperties.sectionTitleMarginBottom != undefined
                                                    ? sectionproperties.sectionTitleMarginBottom
                                                    : 0,
                                            ),
                                            paddingLeft: StyleParseToIntFuncContext(
                                                sectionproperties.sectionTitleMarginLeft != null && sectionproperties.sectionTitleMarginLeft != undefined
                                                    ? sectionproperties.sectionTitleMarginLeft
                                                    : 0,
                                            ),
                                            paddingRight: StyleParseToIntFuncContext(
                                                sectionproperties.sectionTitleMarginRight != null && sectionproperties.sectionTitleMarginRight != undefined
                                                    ? sectionproperties.sectionTitleMarginRight
                                                    : 0,
                                            ),
                                        },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            color: sectionproperties.sectionTitleColor,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
                                            textAlign: 'left',
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
                                                    : sectionproperties.sectiontitlefontfamily == 'Playfair'
                                                    ? 'PlayfairDisplay'
                                                    : 'Poppins-Medium',
                                        }}
                                    >
                                        {langdetect == 'en' ? sectionproperties.sectionTitleContent : sectionproperties.sectionTitleContent_ar}
                                    </Text>
                                </View>
                            )}
                            {sectionproperties.prodCatShow == 'Show' && (
                                <View
                                    style={[
                                        generalstyles.allcentered,
                                        {
                                            paddingLeft: StyleParseToIntFuncContext(
                                                sectionproperties.sectionTitleMarginLeft != null && sectionproperties.sectionTitleMarginLeft != undefined
                                                    ? sectionproperties.sectionTitleMarginLeft
                                                    : 0,
                                            ),
                                            paddingRight: StyleParseToIntFuncContext(
                                                sectionproperties.sectionTitleMarginRight != null && sectionproperties.sectionTitleMarginRight != undefined
                                                    ? sectionproperties.sectionTitleMarginRight
                                                    : 0,
                                            ),
                                            marginBottom: StyleParseToIntFuncContext(
                                                sectionproperties.descriptionMarginBottom != null && sectionproperties.descriptionMarginBottom != undefined
                                                    ? sectionproperties.descriptionMarginBottom
                                                    : 0,
                                            ),
                                        },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            fontSize: StyleParseToIntFuncContext(
                                                sectionproperties.prodCatFontSize != null && sectionproperties.prodCatFontSize != undefined ? sectionproperties.prodCatFontSize : 0,
                                            ),
                                            color: sectionproperties.prodCatColor,
                                            fontFamily:
                                                sectionproperties.descFontFamily == 'Poppins'
                                                    ? sectionproperties.descFontFamily == 300
                                                        ? 'Poppins-Thin'
                                                        : sectionproperties.descFontFamily == 400
                                                        ? 'Poppins-Light'
                                                        : sectionproperties.descFontFamily == 500
                                                        ? 'Poppins-Regular'
                                                        : sectionproperties.descFontFamily == 600
                                                        ? 'Poppins-Medium'
                                                        : sectionproperties.descFontFamily == 700
                                                        ? 'Poppins-Semibold'
                                                        : 'Poppins-Bold'
                                                    : sectionproperties.descFontFamily == 'Pacifico'
                                                    ? 'Pacifico-Regular'
                                                    : sectionproperties.descFontFamily == 'Great Vibes'
                                                    ? 'GreatVibes-Regular'
                                                    : sectionproperties.descFontFamily == 'Playfair'
                                                    ? 'PlayfairDisplay'
                                                    : 'Poppins-Medium',
                                        }}
                                    >
                                        {langdetect == 'en' ? sectionproperties.descriptionContentEn : sectionproperties.descriptionContentAr}
                                    </Text>
                                </View>
                            )}
                            <View style={[generalstyles.allcentered, { width: '100%' }]}>
                                <FlatList
                                    data={bgimagearrayofobjs}
                                    scrollEnabled={false}
                                    vertical
                                    numColumns={sectionproperties.sectionbgstyle == 'Text above image' ? 1 : Math.ceil(bgimagearrayofobjs.length)}
                                    key={sectionproperties.sectionbgstyle == 'Text above image' ? 1 : Math.ceil(bgimagearrayofobjs.length)}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <View
                                                style={[
                                                    generalstyles.allcentered,
                                                    {
                                                        width: sectionproperties.sectionbgstyle == 'Text above image' ? SIZES.width : SIZES.width / bgimagearrayofobjs.length,
                                                        paddingLeft: StyleParseToIntFuncContext(
                                                            sectionproperties.image_marginleft != null &&
                                                                sectionproperties.image_marginleft != undefined &&
                                                                sectionproperties.image_marginright != null &&
                                                                sectionproperties.image_marginright != undefined
                                                                ? langdetect == 'en'
                                                                    ? sectionproperties.image_marginleft
                                                                    : sectionproperties.image_marginright
                                                                : 5,
                                                        ),
                                                        paddingRight: StyleParseToIntFuncContext(
                                                            sectionproperties.image_marginright != null &&
                                                                sectionproperties.image_marginright != undefined &&
                                                                sectionproperties.image_marginleft != null &&
                                                                sectionproperties.image_marginleft != undefined
                                                                ? langdetect == 'en'
                                                                    ? sectionproperties.image_marginright
                                                                    : sectionproperties.image_marginleft
                                                                : 5,
                                                        ),
                                                        height:
                                                            sectionproperties.sectionbgstyle == 'Text above image'
                                                                ? 'auto'
                                                                : SIZES.width > 1024
                                                                ? StyleParseToIntFuncContext(
                                                                      sectionproperties.image_height != null && sectionproperties.image_height != undefined ? sectionproperties.image_height : 0,
                                                                  ) + 100
                                                                : SIZES.width > 768
                                                                ? StyleParseToIntFuncContext(
                                                                      sectionproperties.image_height != null && sectionproperties.image_height != undefined ? sectionproperties.image_height : 0,
                                                                  ) + 50
                                                                : StyleParseToIntFuncContext(
                                                                      sectionproperties.image_height != null && sectionproperties.image_height != undefined ? sectionproperties.image_height : 0,
                                                                  ),
                                                    },
                                                ]}
                                            >
                                                {item.IsClickableimg == 'Yes' && (
                                                    <TouchableOpacity
                                                        style={{ width: '100%' }}
                                                        // onPress={() => {
                                                        //     if (item.IsClickableimg == 'Yes') {
                                                        //         if (item?.clickableimg_page_route && item?.clickableimg_page_route.length != 0) {
                                                        //             routingcountext(item?.clickableimg_page_route, false, '');
                                                        //         } else {
                                                        //             navigation.navigate('TemplateDraftRouter', {
                                                        //                 screen: StaticPagesLinksContext?.GeneralProductsComponent,
                                                        //                 params: {
                                                        //                     genprodcompstinfo: {
                                                        //                         collectionid: item?.Clickableimg_getcoection,
                                                        //                         srcfrom: 'GeneralProductsComponent',
                                                        //                         fetchingtype: 'products',
                                                        //                     },
                                                        //                 },
                                                        //             });
                                                        //         }
                                                        //     }
                                                        // }}
                                                        onPress={() => {
                                                            if (item.IsClickableimg == 'Yes') {
                                                                if (item?.clickableimg_page_route != '' && item?.clickableimg_page_route != undefined) {
                                                                    routingcountext(item?.clickableimg_page_route, false, '');
                                                                } else {
                                                                    if (item?.onclicktype == 'Parent Collections') {
                                                                        navigation.navigate('TemplateDraftRouter', {
                                                                            screen: StaticPagesLinksContext?.GeneralProductsComponent,
                                                                            params: {
                                                                                genprodcompstinfo: {
                                                                                    collectionid: item?.Clickableimg_getparentcoection,
                                                                                    srcfrom: 'GeneralProductsComponent',
                                                                                    fetchingtype: 'products',
                                                                                    parenttype: 'Parent Collections',
                                                                                },
                                                                            },
                                                                        });
                                                                    } else if (item.linktype == 'Image With External Link') {
                                                                        Linking.openURL(item.linkurl);
                                                                    } else {
                                                                        navigation.navigate('TemplateDraftRouter', {
                                                                            screen: StaticPagesLinksContext?.GeneralProductsComponent,
                                                                            params: {
                                                                                genprodcompstinfo: {
                                                                                    collectionid: item?.Clickableimg_getcoection,
                                                                                    srcfrom: 'GeneralProductsComponent',
                                                                                    fetchingtype: 'products',
                                                                                },
                                                                            },
                                                                        });
                                                                    }
                                                                    // routingcountext(StaticPagesLinksContext.GeneralProductsComponent, true, item.Clickableimg_getcoection);
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        {BackgroundImageContainer(item, index)}
                                                    </TouchableOpacity>
                                                )}
                                                {item.IsClickableimg == 'No' && BackgroundImageContainer(item, index)}
                                            </View>
                                        );
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                )}
            </View>
        );
    }, [sectionproperties, maincontainerarrayofobjs, bgimagearrayofobjs]);
    return cardsrender;
};

export default Backgroundimage;
