import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SIZES } from '../../../GeneralFiles/constants';
import { WebsiteDesignWorkPlaceContext } from '../../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { urlEndpoint } from '../../../../../config/imagekit';
import generalstyles from '../../../GeneralFiles/Stylesheet/Stylesheet';
import { LanguageContext } from '../../../../LanguageContext/LanguageContext';
import { TemplateRoutingContext } from '../../../../TemplateRoutingContext';
import { Video } from 'expo-av';
import { WebView } from 'react-native-webview';

const VideosSection = (props) => {
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { StaticPagesLinksContext, routingcountext } = useContext(TemplateRoutingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [videosarrayofobjs, setvideosarrayofobjs] = useState([]);
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
        if (sectionproperties.length != 0 && sectionproperties.videosarrayofobjs != undefined) {
            var videosarrayofobjsparsed = JSON.parse(sectionproperties.videosarrayofobjs);
            if (Array.isArray(videosarrayofobjsparsed)) {
                var temparr = [...videosarrayofobjsparsed];
                temparr.forEach(function (item) {
                    item.linkclicked = false;
                });
                setvideosarrayofobjs([...temparr]);
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
                    },
                ]}
            >
                <View style={[generalstyles.flexColumn, { width: '100%' }]}>
                    <Text
                        style={[
                            {
                                position: 'relative',
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
                                fontSize: StyleParseToIntFuncContext(
                                    sectionproperties.slideshowText1ContentFontSize != null && sectionproperties.slideshowText1ContentFontSize != undefined
                                        ? sectionproperties.slideshowText1ContentFontSize
                                        : 15,
                                ),
                                color: sectionproperties.slideshowText1ContentColor,
                                textAlign: sectionproperties.text1centered == 'Centered' ? 'center' : 'left',
                            },
                        ]}
                    >
                        {langdetect == 'en' ? videosarrayofobjs[index].title_en : videosarrayofobjs[index].title_ar}
                    </Text>
                    <Text
                        style={[
                            {
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
                                position: 'relative',
                                color: sectionproperties.slideshowText2ContentColor,
                                fontSize: StyleParseToIntFuncContext(
                                    sectionproperties.slideshowText2ContentFontSize != null && sectionproperties.slideshowText2ContentFontSize != undefined
                                        ? sectionproperties.slideshowText2ContentFontSize
                                        : 15,
                                ),
                                textAlign: sectionproperties.text1centered == 'Centered' ? 'center' : 'left',
                                marginBottom: 10,
                            },
                        ]}
                    >
                        {langdetect == 'en' ? videosarrayofobjs[index].description_en : videosarrayofobjs[index].description_ar}
                    </Text>
                </View>
                {/* item.linktype != 'Image' && */}
                {item.linkclicked == false && (
                    <TouchableOpacity
                        onPress={() => {
                            // if (videosarrayofobjs[index].linktype == 'Media Fire' || videosarrayofobjs[index].linktype == 'External Link') {
                            var temparr = [...videosarrayofobjs];
                            temparr[index].linkclicked = true;
                            setvideosarrayofobjs([...temparr]);
                            // }
                        }}
                        style={{
                            width: '100%',
                            height:
                                SIZES.width > 1024
                                    ? StyleParseToIntFuncContext(sectionproperties.image_height) + 100
                                    : SIZES.width > 768
                                    ? StyleParseToIntFuncContext(sectionproperties.image_height) + 50
                                    : StyleParseToIntFuncContext(sectionproperties.image_height),
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
                        }}
                    >
                        <Image
                            source={{
                                uri: videosarrayofobjs.length != 0 ? urlEndpoint + videosarrayofobjs[index].image : '',
                            }}
                            resizeMode={sectionproperties.bgcovercontain == 'Contain' ? 'contain' : 'cover'}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    </TouchableOpacity>
                )}
                {item.linkclicked == true && (
                    <View
                        style={{
                            width: '100%',
                            height:
                                SIZES.width > 1024
                                    ? StyleParseToIntFuncContext(sectionproperties.image_height) + 100
                                    : SIZES.width > 768
                                    ? StyleParseToIntFuncContext(sectionproperties.image_height) + 50
                                    : StyleParseToIntFuncContext(sectionproperties.image_height),
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
                        {/* {item.linktype == 'Video Link' && ( */}
                        <Video
                            ref={video}
                            style={{ width: '100%', height: '100%' }}
                            source={{
                                uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                            }}
                            useNativeControls
                            resizeMode="contain"
                            isLooping
                            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                        />
                        {/* )} */}
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
                    width: '100%',
                }}
            >
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
                                    data={videosarrayofobjs}
                                    scrollEnabled={false}
                                    vertical
                                    numColumns={1}
                                    key={1}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <View
                                                style={[
                                                    generalstyles.allcentered,
                                                    {
                                                        width: SIZES.width,
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
                                                    },
                                                ]}
                                            >
                                                {BackgroundImageContainer(item, index)}
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
    }, [sectionproperties]);
    return cardsrender;
};

export default VideosSection;
