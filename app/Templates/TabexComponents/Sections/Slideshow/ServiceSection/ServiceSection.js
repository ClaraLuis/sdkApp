import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Linking } from 'react-native';
import { LanguageContext } from '../../../../LanguageContext/LanguageContext';
import { icons, images, SIZES, COLORS, FONTS } from '../../../GeneralFiles/constants';
import { WebsiteDesignWorkPlaceContext } from '../../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { useDispatch, useSelector } from 'react-redux';
import { urlEndpoint } from '../../../../../config/imagekit';
import generalstyles from '../../../GeneralFiles/Stylesheet/Stylesheet';
import { ImageComponent } from '../../../../ImageComponent';
import { useNavigation } from '@react-navigation/native';
import { TemplateRoutingContext } from '../../../../TemplateRoutingContext';

const ServiceSection = (props) => {
    const { lang, langdetect } = useContext(LanguageContext);
    const { CurrentPageIdContext, StyleParseToIntFuncContext, ProjectOpenrcTypeContext, INSTAPIKEYCONTEXT, TabexSectionsComponentsContext } = useContext(WebsiteDesignWorkPlaceContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [cardsarray, setcardsarray] = useState([]);
    const navigation = useNavigation();
    const { StaticPagesLinksContext, routingtemp } = useContext(TemplateRoutingContext);

    useEffect(() => {
        if (props?.sectionpropertiesProps != undefined) {
            var secpropobj = {};
            props?.sectionpropertiesProps?.forEach(function (sectionpropertiesobj, sectionpropertiesindex) {
                secpropobj[sectionpropertiesobj.property_css_name] = sectionpropertiesobj.property_value;
            });
            setsectionproperties({ ...secpropobj });
        }
    }, [props.sectionpropertiesProps]);

    // Card Information Array
    useEffect(() => {
        if (sectionproperties.length != 0 && sectionproperties.card_arrayofobjects != undefined) {
            var card_arrayofobjectsparsed = JSON.parse(sectionproperties.card_arrayofobjects);
            if (Array.isArray(card_arrayofobjectsparsed)) {
                setcardsarray([...card_arrayofobjectsparsed]);
            }
        }
    }, [sectionproperties]);

    const Content = (item) => {
        return (
            <View style={[generalstyles.flexColumn, generalstyles.allcentered, {}]}>
                <View
                    style={[
                        generalstyles.allcentered,
                        {
                            width: StyleParseToIntFuncContext(sectionproperties.image_width != null && sectionproperties.image_width != undefined ? sectionproperties.image_width : 35),
                            height: StyleParseToIntFuncContext(sectionproperties.image_height != null && sectionproperties.image_height != undefined ? sectionproperties.image_height : 35),
                            marginBottom: StyleParseToIntFuncContext(sectionproperties.image_mb),
                            borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius),
                            borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius),
                            borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius),
                            borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius),
                            backgroundColor: sectionproperties.image_bgtransparent == 'Transparent' ? 'transparent' : sectionproperties.image_bgcolor,
                            overflow: 'hidden',
                        },
                    ]}
                >
                    <ImageComponent
                        path={item.cardobj_img}
                        resizeMode="contain"
                        style={{
                            height: StyleParseToIntFuncContext(sectionproperties.imageInnerWidth_Height) + '%',
                            width: StyleParseToIntFuncContext(sectionproperties.imageInnerWidth_Height) + '%',
                        }}
                    />
                </View>
                {sectionproperties.slideshowtext1_show == 'Show' && (
                    <Text
                        style={{
                            fontSize: StyleParseToIntFuncContext(sectionproperties.slideshowText1ContentFontSize),
                            color: sectionproperties.slideshowText1ContentColor,
                            marginBottom: StyleParseToIntFuncContext(sectionproperties.slideshowText1Content_marginBottom),
                            marginStart: 'auto',
                            marginEnd: 'auto',
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
                            flex: 1,
                        }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {langdetect == 'en' ? item.cardobj_titleen : item.cardobj_titlear}
                    </Text>
                )}
                {sectionproperties.slideshowtext2_show == 'Show' && (
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
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {langdetect == 'en' ? item.cardobj_descripen : item.cardobj_descripar}
                    </Text>
                )}
            </View>
        );
    };
    const cardsrender = React.useMemo(() => {
        return (
            <View>
                {sectionproperties.sectiontitleshow == 'Show' && (
                    <View
                        style={{
                            alignItems: sectionproperties.sectiontitleposition == 'Centered' ? 'center' : 'flex-start',
                        }}
                    >
                        <Text
                            style={{
                                color: sectionproperties.sectionTitleColor,
                                fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
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
                                textAlign: 'left',
                                marginBottom: StyleParseToIntFuncContext(sectionproperties.sectionTitleMarginBottom),
                            }}
                        >
                            {langdetect == 'en' ? sectionproperties.sectionTitleContent : sectionproperties.sectionTitleContent_ar}
                        </Text>
                    </View>
                )}
                {sectionproperties.view_as_slider_vertical == 'Slider (Horizontal)' && (
                    <View
                        style={{
                            width: '100%',
                            alignItems: 'center',
                            marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop),
                            marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom),
                            paddingTop: StyleParseToIntFuncContext(sectionproperties.paddingTop),
                            paddingLeft: StyleParseToIntFuncContext(sectionproperties.paddingLeft),
                            paddingRight: StyleParseToIntFuncContext(sectionproperties.paddingRight),
                            paddingBottom: StyleParseToIntFuncContext(sectionproperties.paddingBottom),
                            borderWidth: StyleParseToIntFuncContext(sectionproperties.sectioncardborderwidth),
                            borderColor: sectionproperties.sectioncardbordercolor,
                            borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.borderTopLeftRadius, '', 'true'),
                            borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.borderTopRightRadius, '', 'true'),
                            borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.borderBottomLeftRadius, '', 'true'),
                            borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.borderBottomRightRadius, '', 'true'),
                            backgroundColor: sectionproperties.backgroundColortransparent == 'Transparent' ? 'transparent' : sectionproperties.backgroundColor,
                        }}
                    >
                        {cardsarray.length != 0 && (
                            <FlatList
                                data={cardsarray}
                                vertical
                                showsHorizontalScrollIndicator={false}
                                key={1}
                                numColumns={1}
                                renderItem={({ item, index }) => {
                                    if (item.iscardclickable == 'Yes') {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    if (item.btntype == 'App Page') {
                                                        routingtemp(item.btnlink);
                                                    }
                                                }}
                                                style={{
                                                    marginBottom: 15,
                                                    marginRight: StyleParseToIntFuncContext(sectionproperties.card_marginRight),
                                                    marginLeft: StyleParseToIntFuncContext(sectionproperties.card_marginLeft),
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-start',
                                                    width: SIZES.width,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        width: StyleParseToIntFuncContext(
                                                            sectionproperties.image_width != null && sectionproperties.image_width != undefined ? sectionproperties.image_width : 35,
                                                        ),
                                                        height: StyleParseToIntFuncContext(
                                                            sectionproperties.image_height != null && sectionproperties.image_height != undefined ? sectionproperties.image_height : 35,
                                                        ),
                                                        marginBottom: StyleParseToIntFuncContext(sectionproperties.image_mb),
                                                        borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius),
                                                        borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius),
                                                        borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius),
                                                        borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius),
                                                        backgroundColor: sectionproperties.image_bgtransparent == 'Transparent' ? 'transparent' : sectionproperties.image_bgcolor,
                                                    }}
                                                >
                                                    <ImageComponent
                                                        path={item.cardobj_img}
                                                        resizeMode="cover"
                                                        style={{
                                                            height: '100%',
                                                            width: '100%',
                                                        }}
                                                    />
                                                </View>

                                                <View style={{ marginStart: 8 }}>
                                                    {sectionproperties.slideshowtext1_show == 'Show' && (
                                                        <View
                                                            style={{
                                                                marginBottom: StyleParseToIntFuncContext(sectionproperties.text_styles_marginBottom),
                                                                marginTop: StyleParseToIntFuncContext(sectionproperties.text_styles_marginTop),
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.slideshowText1ContentFontSize),
                                                                    color: sectionproperties.slideshowText1ContentColor,
                                                                    marginBottom: StyleParseToIntFuncContext(sectionproperties.slideshowText1Content_marginBottom),
                                                                    marginEnd: 'auto',
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
                                                                    flex: 1,
                                                                }}
                                                                numberOfLines={1}
                                                                ellipsizeMode="tail"
                                                            >
                                                                {langdetect == 'en' ? item.cardobj_titleen : item.cardobj_titlear}
                                                            </Text>
                                                        </View>
                                                    )}

                                                    {sectionproperties.slideshowtext2_show == 'Show' && (
                                                        <Text
                                                            style={{
                                                                fontSize: StyleParseToIntFuncContext(sectionproperties.slideshowText2ContentFontSize),
                                                                color: sectionproperties.slideshowText2ContentColor,
                                                                marginEnd: 'auto',
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
                                                            numberOfLines={1}
                                                            ellipsizeMode="tail"
                                                        >
                                                            {langdetect == 'en' ? item.cardobj_descripen : item.cardobj_descripar}
                                                        </Text>
                                                    )}
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    } else {
                                        return (
                                            <View
                                                style={{
                                                    marginBottom: 15,
                                                    marginRight: StyleParseToIntFuncContext(sectionproperties.card_marginRight),
                                                    marginLeft: StyleParseToIntFuncContext(sectionproperties.card_marginLeft),
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-start',
                                                    width: SIZES.width,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        width: StyleParseToIntFuncContext(
                                                            sectionproperties.image_width != null && sectionproperties.image_width != undefined ? sectionproperties.image_width : 35,
                                                        ),
                                                        height: StyleParseToIntFuncContext(
                                                            sectionproperties.image_height != null && sectionproperties.image_height != undefined ? sectionproperties.image_height : 35,
                                                        ),
                                                        marginBottom: StyleParseToIntFuncContext(sectionproperties.image_mb),
                                                        borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius),
                                                        borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius),
                                                        borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius),
                                                        borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius),
                                                        backgroundColor: sectionproperties.image_bgtransparent == 'Transparent' ? 'transparent' : sectionproperties.image_bgcolor,
                                                    }}
                                                >
                                                    <ImageComponent
                                                        path={item.cardobj_img}
                                                        resizeMode="cover"
                                                        style={{
                                                            height: '100%',
                                                            width: '100%',
                                                        }}
                                                    />
                                                </View>

                                                <View style={{ marginStart: 8 }}>
                                                    {sectionproperties.slideshowtext1_show == 'Show' && (
                                                        <View
                                                            style={{
                                                                marginBottom: StyleParseToIntFuncContext(sectionproperties.text_styles_marginBottom),
                                                                marginTop: StyleParseToIntFuncContext(sectionproperties.text_styles_marginTop),
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.slideshowText1ContentFontSize),
                                                                    color: sectionproperties.slideshowText1ContentColor,
                                                                    marginBottom: StyleParseToIntFuncContext(sectionproperties.slideshowText1Content_marginBottom),
                                                                    marginEnd: 'auto',
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
                                                                    flex: 1,
                                                                }}
                                                                numberOfLines={1}
                                                                ellipsizeMode="tail"
                                                            >
                                                                {langdetect == 'en' ? item.cardobj_titleen : item.cardobj_titlear}
                                                            </Text>
                                                        </View>
                                                    )}

                                                    {sectionproperties.slideshowtext2_show == 'Show' && (
                                                        <Text
                                                            style={{
                                                                fontSize: StyleParseToIntFuncContext(sectionproperties.slideshowText2ContentFontSize),
                                                                color: sectionproperties.slideshowText2ContentColor,
                                                                marginEnd: 'auto',
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
                                                            numberOfLines={1}
                                                            ellipsizeMode="tail"
                                                        >
                                                            {langdetect == 'en' ? item.cardobj_descripen : item.cardobj_descripar}
                                                        </Text>
                                                    )}
                                                </View>
                                            </View>
                                        );
                                    }
                                }}
                            />
                        )}
                    </View>
                )}
                {sectionproperties.view_as_slider_vertical == 'Vertical' && (
                    <View
                        style={{
                            width: '100%',
                            alignItems: 'center',
                            marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop),
                            marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom),
                            paddingTop: StyleParseToIntFuncContext(sectionproperties.paddingTop),
                            paddingLeft: StyleParseToIntFuncContext(sectionproperties.paddingLeft),
                            paddingRight: StyleParseToIntFuncContext(sectionproperties.paddingRight),
                            paddingBottom: StyleParseToIntFuncContext(sectionproperties.paddingBottom),
                            borderWidth: StyleParseToIntFuncContext(sectionproperties.sectioncardborderwidth),
                            borderColor: sectionproperties.sectioncardbordercolor,
                            borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.borderTopLeftRadius, '', 'true'),
                            borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.borderTopRightRadius, '', 'true'),
                            borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.borderBottomLeftRadius, '', 'true'),
                            borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.borderBottomRightRadius, '', 'true'),
                            backgroundColor: sectionproperties.backgroundColortransparent == 'Transparent' ? 'transparent' : sectionproperties.backgroundColor,
                        }}
                    >
                        {cardsarray.length != 0 && (
                            <FlatList
                                data={cardsarray}
                                vertical
                                showsHorizontalScrollIndicator={false}
                                key={2}
                                numColumns={2}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View
                                            style={{
                                                marginBottom: 15,
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                width: SIZES.width / 2,
                                            }}
                                        >
                                            {item.iscardclickable == 'Yes' && (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        if (item.btntype == 'App Product Link') {
                                                            if (item.btnlink != undefined && item.btnlink != null && item.btnlink != '') {
                                                                cardonclickfunctionContext('productinfo', item.btnlink, null, null);
                                                            }
                                                        } else if (item.btntype == 'External Link') {
                                                            if (item.btnlink != undefined && item.btnlink != null && item.btnlink != '') {
                                                                Linking.openURL(item.btnlink);
                                                            }
                                                        } else if (item.btntype == 'All Products') {
                                                            navigation.navigate(StaticPagesLinksContext.GeneralProductsComponent);
                                                        } else {
                                                            routingtemp(item.btnlink);
                                                        }
                                                    }}
                                                >
                                                    {Content(item)}
                                                </TouchableOpacity>
                                            )}
                                            {item.iscardclickable == 'No' && (
                                                <View
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    {Content(item)}
                                                </View>
                                            )}
                                        </View>
                                    );
                                }}
                            />
                        )}
                    </View>
                )}
            </View>
        );
    }, [sectionproperties, cardsarray]);
    return cardsrender;
};
const styles = StyleSheet.create({});

export default ServiceSection;
