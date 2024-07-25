import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, Linking } from 'react-native';
import { LanguageContext } from '../../../../LanguageContext/LanguageContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import Carousel from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { urlEndpoint } from '../../../../../config/imagekit';
import { ImageComponent } from '../../../../ImageComponent';

const UsersCard = (props) => {
    const [sectionproperties, setsectionproperties] = useState('');
    const { langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const [StatePageProperties, setStatePageProperties] = useState({});
    const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
    function wp(percentage) {
        const value = (percentage * viewportWidth) / 100;
        return Math.round(value);
    }
    const slideWidth = wp(70);
    const itemHorizontalMargin = wp(1);
    const sliderWidth = viewportWidth;
    const itemWidth = slideWidth;
    useEffect(() => {
        StatePageProperties11.pages.forEach(function (item, index) {
            if (CurrentPageIdContext == item.pageid) {
                var pageobj = item.pageobj;

                setStatePageProperties(pageobj);
            }
        });
    }, []);
    useEffect(() => {
        var secpropobj = {};
        if (Object.keys(StatePageProperties).length != 0) {
            StatePageProperties.pageobj.sections.forEach(function (sectionitem, sectionindex) {
                if (sectionitem.sectionid == props.sectionidprops) {
                    sectionitem.sectionproperties.forEach(function (sectionpropertiesobj, sectionpropertiesindex) {
                        secpropobj[sectionpropertiesobj.property_css_name] = sectionpropertiesobj.property_value;
                    });
                }
            });
            setsectionproperties({ ...secpropobj });
        }
    }, [StatePageProperties]);

    const [usersarray, setusersarray] = useState([]);
    useEffect(() => {
        if (sectionproperties.length != 0 && sectionproperties.customUserCardsArray != undefined) {
            var customUserCardsArrayparsed = JSON.parse(sectionproperties.customUserCardsArray);
            if (Array.isArray(customUserCardsArrayparsed)) {
                setusersarray([...customUserCardsArrayparsed]);
            }
        }
    }, [sectionproperties]);

    return (
        <View
            style={{
                marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop),
                marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom),
                paddingTop: StyleParseToIntFuncContext(sectionproperties.paddingTop),
                paddingBottom: StyleParseToIntFuncContext(sectionproperties.paddingBottom),
                paddingLeft: StyleParseToIntFuncContext(sectionproperties.paddingLeft),
                paddingRight: StyleParseToIntFuncContext(sectionproperties.paddingRight),
                backgroundColor: sectionproperties.backgroundColor,
            }}
        >
            {/* Section Title */}
            {sectionproperties.sectiontitleshow == 'Show' && (
                <Text
                    style={{
                        textAlign: 'center',
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.sectionTitleMarginBottom),
                        color: sectionproperties.sectionTitleColor,
                        fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
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
            )}

            {/* Section Description */}
            {sectionproperties.prodCatShow == 'Show' && (
                <Text
                    style={{
                        textAlign: 'center',
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.descriptionMarginBottom),
                        color: sectionproperties.prodCatColor,
                        fontSize: StyleParseToIntFuncContext(sectionproperties.prodCatFontSize),
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
                                : 'Poppins-Medium',
                    }}
                >
                    {langdetect == 'en' ? sectionproperties.descriptionContentEn : sectionproperties.descriptionContentAr}
                </Text>
            )}

            {/* <Carousel
                data={usersarray}
                useScrollView={true}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                renderItem={({ item, index }) => {
                    return (
                        <View
                            style={{
                                alignItems: 'center',
                                // marginHorizontal: 10,
                                marginLeft: StyleParseToIntFuncContext(sectionproperties.reservation_padding_left),
                                marginRight: StyleParseToIntFuncContext(sectionproperties.reservation_padding_right),
                                backgroundColor: sectionproperties.reservation_bgcolor,
                                borderRadius: StyleParseToIntFuncContext(sectionproperties.reservation_borderradius),
                            }}
                        >
                            <View
                                style={{
                                    width: StyleParseToIntFuncContext(sectionproperties.image_width),
                                    height: StyleParseToIntFuncContext(sectionproperties.image_height),
                                    marginBottom: StyleParseToIntFuncContext(sectionproperties.image_mb),
                                    position: 'relative',
                                }}
                            >
                                <ImageComponent
                                    path={item.customUserCardsArray_img}
                                    resizeMode="cover"
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius),
                                        backgroundColor: sectionproperties.image_bgtransparent == 'Transparent' ? 'transparent' : sectionproperties.image_bgcolor,
                                    }}
                                />

                    
                                <View
                                    style={{
                                        bottom: 5,
                                        width: '100%',
                                        position: 'absolute',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}
                                >
              
                                    {sectionproperties.fbbtn_show == 'Show' && item.customUserCardsArray_fbLink != null && (
                                        <TouchableOpacity
                                            onPress={() => Linking.openURL(item.customUserCardsArray_fbLink)}
                                            style={{
                                                marginEnd: 5,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: StyleParseToIntFuncContext(sectionproperties.facebkbtnnWidth),
                                                height: StyleParseToIntFuncContext(sectionproperties.facebkbtnnHeight),
                                                borderRadius: StyleParseToIntFuncContext(sectionproperties.facebkbtnn_borderRadius),
                                                borderStyle: 'solid',
                                                borderWidth: StyleParseToIntFuncContext(sectionproperties.facebkbtnnborderwidth),
                                                borderColor: sectionproperties.facebkbtnnbordercolor,
                                                backgroundColor: sectionproperties.facebkbtnn_bgtransparent == 'Transparent' ? 'transparent' : sectionproperties.facebkbtnnbgColor,
                                            }}
                                        >
                                            <FontAwesome
                                                name="facebook-f"
                                                size={StyleParseToIntFuncContext(sectionproperties.facebkbtnniconfontsize)}
                                                style={{
                                                    color: sectionproperties.facebkbtnnTextcolor,
                                                }}
                                            />
                                        </TouchableOpacity>
                                    )}

                
                                    {sectionproperties.instbtn_show == 'Show' && item.customUserCardsArray_instLink != null && (
                                        <TouchableOpacity
                                            onPress={() => Linking.openURL(item.customUserCardsArray_instLink)}
                                            style={{
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: StyleParseToIntFuncContext(sectionproperties.instgrambtnWidth),
                                                height: StyleParseToIntFuncContext(sectionproperties.instgrambtnHeight),
                                                borderRadius: StyleParseToIntFuncContext(sectionproperties.instgrambtn_borderRadius),
                                                borderStyle: 'solid',
                                                borderWidth: StyleParseToIntFuncContext(sectionproperties.instgrambtnborderwidth),
                                                borderColor: sectionproperties.instgrambtnbordercolor,
                                                backgroundColor: sectionproperties.instgrambtn_bgtransparent == 'Transparent' ? 'transparent' : sectionproperties.instgrambtnbgColor,
                                            }}
                                        >
                                            <AntDesign
                                                name="instagram"
                                                size={StyleParseToIntFuncContext(sectionproperties.instgrambtniconfontsize)}
                                                style={{
                                                    color: sectionproperties.instgrambtnTextcolor,
                                                }}
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>


                            {sectionproperties.slideshowtext1_show == 'Show' && (
                                <Text
                                    style={{
                                        marginBottom: StyleParseToIntFuncContext(sectionproperties.slideshowText1Content_marginBottom),
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
                                    }}
                                >
                                    {langdetect == 'en' ? item.customUserCardsArray_descripen : item.customUserCardsArray_descripar}
                                </Text>
                            )}


                            <Text
                                style={{
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
                                }}
                            >
                                {langdetect == 'en' ? item.customUserCardsArray_titleen : item.customUserCardsArray_titlear}
                            </Text>
                        </View>
                    );
                }}
            /> */}
        </View>
    );
};

export default UsersCard;
