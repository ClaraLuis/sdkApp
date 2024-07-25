import React, { useState, useContext, useEffect } from 'react';
// import { SliderBox } from 'react-native-image-slider-box';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { SIZES } from '../../../GeneralFiles/constants';
import { WebsiteDesignWorkPlaceContext } from '../../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import generalstyles from '../../../GeneralFiles/Stylesheet/Stylesheet';
import { urlEndpoint } from '../../../../../config/imagekit';
import { LanguageContext } from '../../../../LanguageContext/LanguageContext';
import { useSelector } from 'react-redux';
import { TemplateRoutingContext } from '../../../../TemplateRoutingContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { FetchingContext } from '../../../../FetchingContext/FetchingContext';
import Carousel from 'react-native-reanimated-carousel';
import { ImageComponent } from '../../../../ImageComponent';
import { WebView } from 'react-native-webview';
import { Audio } from 'expo-av';

const Slideshow1 = (props) => {
    const navigation = useNavigation();
    const { lang, langdetect } = useContext(LanguageContext);
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const { StyleParseToIntFuncContext, CurrentPageIdContext, imageurlendpointcontext } = useContext(WebsiteDesignWorkPlaceContext);
    const { routingcountext, routingtemp, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [imagesarray_ar, setimagesarray_ar] = useState([]);
    const [imagesarray, setimagesarray] = useState([]);
    const [imagesarrayfullarray, setimagesarrayfullarray] = useState([]);
    const [imageindex, setimageindex] = useState('');
    const { cardonclickfunctionContext } = useContext(FetchingContext);
    // useEffect(() => {
    //     const playAudioStream = async () => {
    //         try {
    //             const { sound } = await Audio.Sound.createAsync({ uri: 'http://radio.hvips.com:8056/stream' }, { shouldPlay: true });

    //             await Audio.setAudioModeAsync({
    //                 allowsRecordingIOS: false,
    //                 interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
    //                 playsInSilentModeIOS: true,
    //                 interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    //                 shouldDuckAndroid: true,
    //                 staysActiveInBackground: true,
    //             });
    //         } catch (error) {
    //             console.error('Error playing audio:', error);
    //         }
    //     };

    //     playAudioStream();

    //     // Clean up audio resources when component unmounts
    //     return () => {
    //         Audio.setAudioModeAsync({
    //             staysActiveInBackground: false,
    //         });
    //     };
    // }, []);
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
                if (Array.isArray(slideshowstylesarrayofobjsparsed)) {
                    slideshowstylesarrayofobjsparsed.forEach(function (arrayitem) {
                        // 1200,533
                        temparr.push(arrayitem.bgsection_image);
                        temparr_ar.push(arrayitem.bgsection_image_ar);
                    });
                    setimagesarray_ar([...temparr_ar]);
                    setimagesarray([...temparr]);
                    setimagesarrayfullarray([...slideshowstylesarrayofobjsparsed]);
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
                        backgroundColor: sectionproperties.backgroundColortransparent == 'Transparent' ? 'transparent' : sectionproperties.backgroundColor,
                        paddingBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom != null && sectionproperties.marginBottom != undefined ? sectionproperties.marginBottom : 0),
                        paddingTop: StyleParseToIntFuncContext(sectionproperties.marginTop != null && sectionproperties.marginTop != undefined ? sectionproperties.marginTop : 0),
                        width: SIZES.width,
                    },
                ]}
            >
                {/* <WebView
                    source={{
                        uri: 'http://radio.hvips.com:8056/stream',
                    }}
                /> */}
                {/* <WebView
                    source={{ uri: 'http://radio.hvips.com:8056/stream' }}
                    javaScriptEnabled={true}
                    mediaPlaybackRequiresUserAction={false}
                    allowsFullscreenVideo={false} // Adjust based on your use case
                    domStorageEnabled={true}
                    startInLoadingState={true}

                    // onLoad={() => alert('WebView loaded successfully')}
                /> */}

                {Object.keys(sectionproperties).length != 0 && (
                    <View
                        style={[
                            {
                                // height: 194,
                                width: '100%',
                                borderRadius: StyleParseToIntFuncContext(sectionproperties.imageborderradius, '', true),
                                // borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true),
                                // borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true),
                                // borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true),
                                // borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true),
                                width: Platform.OS === 'ios' ? StyleParseToIntFuncContext(sectionproperties.width) + '%' : StyleParseToIntFuncContext(sectionproperties.width) + 1 + '%',
                                overflow: 'hidden',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                        ]}
                    >
                        <View
                            style={[
                                {
                                    height: 300,
                                },
                            ]}
                        >
                            <Carousel
                                loop={imagesarrayfullarray.length > 1 ? true : false}
                                width={SIZES.width}
                                height={'100%'}
                                autoPlay={true}
                                data={langdetect == 'en' ? imagesarray : imagesarray_ar}
                                scrollAnimationDuration={1500}
                                renderItem={({ index, item }) => (
                                    <TouchableOpacity
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        onPress={() => {
                                            if (
                                                imagesarrayfullarray[index]?.IsClickableimg == 'Yes' &&
                                                imagesarrayfullarray[index].clickableimg_page_route == undefined &&
                                                imagesarrayfullarray[index]?.appproductid == undefined
                                            ) {
                                                setimageindex(index);
                                                navigation.navigate('TemplateDraftRouter', {
                                                    screen: StaticPagesLinksContext?.GeneralProductsComponent,
                                                    params: {
                                                        genprodcompstinfo: {
                                                            collectionid: imagesarrayfullarray[index]?.Clickableimg_getcoection,
                                                            srcfrom: 'GeneralProductsComponent',
                                                            fetchingtype: 'products',
                                                        },
                                                    },
                                                });
                                            } else if (
                                                imagesarrayfullarray[index]?.IsClickableimg == 'Yes' &&
                                                imagesarrayfullarray[index]?.appproductid != null &&
                                                imagesarrayfullarray[index]?.appproductid != '' &&
                                                imagesarrayfullarray[index]?.appproductid != undefined
                                            ) {
                                                cardonclickfunctionContext('productinfo', imagesarrayfullarray[index]?.appproductid, null, null);
                                            } else if (
                                                imagesarrayfullarray[index]?.IsClickableimg == 'Yes' &&
                                                imagesarrayfullarray[index].clickableimg_page_route != '' &&
                                                imagesarrayfullarray[index].clickableimg_page_route != undefined
                                            ) {
                                                routingtemp(imagesarrayfullarray[index].clickableimg_page_route);
                                            } else {
                                            }
                                        }}
                                    >
                                        <ImageComponent
                                            key={index}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                            resizeMode="contain"
                                            path={'/tr:w-' + sectionproperties.imagetr_w + ',h-' + sectionproperties.imagetr_h + '/' + item}
                                        />
                                    </TouchableOpacity>
                                )}
                            />
                            {/* <SliderBox
                                images={langdetect == 'en' ? imagesarray : imagesarray_ar}
                                sliderBoxHeight={'100%'}
                                // sliderBoxHeight={SIZES.width > 1024 ? StyleParseToIntFuncContext(sectionproperties.image_height) + 220 : StyleParseToIntFuncContext(sectionproperties.image_height)}
                                dotColor={sectionproperties.activedotcolor}
                                inactiveDotColor={sectionproperties.inactivedotcolor}
                                autoplay
                                circleLoop
                                imageLoadingColor="#ccc"
                                resizeMode={sectionproperties.bgcovercontain == 'Cover' ? 'contain' : 'contain'}
                                ImageComponentStyle={{
                                    width: '100%',
                                }}
                                dotStyle={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 100,
                                }}
                                removeClippedSubviews={false}
                                disableOnPress={false}
                                onCurrentImagePressed={(index) => {
                                    if (
                                        imagesarrayfullarray[index]?.IsClickableimg == 'Yes' &&
                                        imagesarrayfullarray[index].clickableimg_page_route == undefined &&
                                        imagesarrayfullarray[index]?.appproductid == undefined
                                    ) {
                                        setimageindex(index);
                                        navigation.navigate('TemplateDraftRouter', {
                                            screen: StaticPagesLinksContext?.GeneralProductsComponent,
                                            params: {
                                                genprodcompstinfo: {
                                                    collectionid: imagesarrayfullarray[index]?.Clickableimg_getcoection,
                                                    srcfrom: 'GeneralProductsComponent',
                                                    fetchingtype: 'products',
                                                },
                                            },
                                        });
                                    } else if (
                                        imagesarrayfullarray[index]?.IsClickableimg == 'Yes' &&
                                        imagesarrayfullarray[index]?.appproductid != null &&
                                        imagesarrayfullarray[index]?.appproductid != '' &&
                                        imagesarrayfullarray[index]?.appproductid != undefined
                                    ) {
                                        cardonclickfunctionContext('productinfo', imagesarrayfullarray[index]?.appproductid, null, null);
                                    } else if (
                                        imagesarrayfullarray[index]?.IsClickableimg == 'Yes' &&
                                        imagesarrayfullarray[index].clickableimg_page_route != '' &&
                                        imagesarrayfullarray[index].clickableimg_page_route != undefined
                                    ) {
                                        routingtemp(imagesarrayfullarray[index].clickableimg_page_route);
                                    } else {
                                    }
                                }}
                                currentImageEmitter={(index) => {
                                    var temp = { ...imageindex };
                                    temp = index;
                                    setimageindex({ ...temp });
                                }}
                                // all
                            /> */}
                        </View>
                        {sectionproperties.showinnersection == 'Show' && (
                            <View
                                style={[
                                    generalstyles.flexRow,
                                    {
                                        width: '100%',
                                        backgroundColor: sectionproperties.reservation_bgcolor,
                                        paddingHorizontal: StyleParseToIntFuncContext(sectionproperties.innersectionpaddinghorizontal),
                                        paddingVertical: StyleParseToIntFuncContext(sectionproperties.innersectionpaddingvertical),
                                    },
                                ]}
                            >
                                <View
                                    style={[
                                        generalstyles.flexColumn,
                                        {
                                            flex: 1,
                                        },
                                    ]}
                                >
                                    <Text
                                        style={{
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
                                        }}
                                    >
                                        {langdetect == 'en' ? sectionproperties.slideshowText1Content : sectionproperties.slideshowText1Content_ar}
                                    </Text>
                                    <Text
                                        style={{
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
                                            fontSize: StyleParseToIntFuncContext(
                                                sectionproperties.slideshowText2ContentFontSize != null && sectionproperties.slideshowText2ContentFontSize != undefined
                                                    ? sectionproperties.slideshowText2ContentFontSize
                                                    : 15,
                                            ),
                                            color: sectionproperties.slideshowText2ContentColor,
                                            textAlign: sectionproperties.text2centered == 'Centered' ? 'center' : 'left',
                                        }}
                                    >
                                        {langdetect == 'en' ? sectionproperties.slideshowText2Content : sectionproperties.slideshowText2Content_Ar}
                                    </Text>
                                </View>
                                {sectionproperties.generalbtn_show == 'Show' && (
                                    <TouchableOpacity
                                        style={[
                                            generalstyles.allcentered,

                                            {
                                                width: StyleParseToIntFuncContext(sectionproperties.generalbtn_width),
                                                height: StyleParseToIntFuncContext(sectionproperties.generalbtn_height),
                                                borderWidth: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderwidth, '', true),
                                                borderColor: sectionproperties.generalbtn_bordercolor,
                                                borderRadius: StyleParseToIntFuncContext(sectionproperties.generalbtnborderradius, '', true),
                                                backgroundColor: sectionproperties.generalbtn_bgColor,
                                            },
                                        ]}
                                        onPress={() => {
                                            if (imagesarrayfullarray[imageindex]?.IsClickableimg == 'Yes') {
                                                navigation.navigate('TemplateDraftRouter', {
                                                    screen: StaticPagesLinksContext?.GeneralProductsComponent,
                                                    params: {
                                                        genprodcompstinfo: {
                                                            collectionid: imagesarrayfullarray[imageindex]?.Clickableimg_getcoection,
                                                            srcfrom: 'GeneralProductsComponent',
                                                            fetchingtype: 'products',
                                                        },
                                                    },
                                                });
                                            }
                                        }}
                                    >
                                        <Text
                                            style={[
                                                generalstyles.allcentered,
                                                {
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
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.generalbtn_fontsize),
                                                    color: sectionproperties.generalbtn_textColor,
                                                },
                                            ]}
                                        >
                                            {langdetect == 'en' ? sectionproperties.generalbtn_content : sectionproperties.slideshow_btn_text_ar}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}
                    </View>
                )}
            </View>
        );
    }, [sectionproperties, imagesarray, imagesarray_ar]);
    return cardsrender;
};

const styles = StyleSheet.create({});

export default Slideshow1;
