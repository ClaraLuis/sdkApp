import React, { useEffect, useState, useContext } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { SIZES, COLORS } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { urlEndpoint } from '../../../../config/imagekit';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { useSelector } from 'react-redux';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { ImageComponent } from '../../../ImageComponent';
// import StarRating from 'react-native-star-rating';
import { Entypo, Feather, FontAwesome } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import Stars from 'react-native-stars';

const HorizontalCategoryCard = (props) => {
    const { lang, langdetect } = useContext(LanguageContext);
    const { routingcountext, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
    const { cardonclickfunctionContext, fetchAuthorizationQueryContext } = useContext(FetchingContext);
    const { CurrentPageIdContext, StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [item, setitem] = useState(props.cardinfoitemprops);
    const [index, setindex] = useState(props.cardinfoindexprops);

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
        if (props.cardinfoitemprops != undefined) {
            setitem(props.cardinfoitemprops);
        }
    }, [props.cardinfoitemprops]);
    const imageurlgrouper = () => {
        var imageurl = '/tr:w-' + sectionproperties.imagetr_w + ',h-' + sectionproperties.imagetr_h;
        if (sectionproperties.cm_pad_resize == 'Yes') {
            imageurl = imageurl + ',cm-pad_resize';
        }
        imageurl = imageurl + '/' + item.image;
        return imageurl;
    };

    const cardsrender = React.useMemo(() => {
        return (
            <TouchableOpacity
                onPress={() => {
                    cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                }}
                style={[
                    styles.categoriesCard,
                    generalstyles.flexColumn,

                    {
                        backgroundColor: sectionproperties.backgroundColor,
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom != null && sectionproperties.marginBottom != undefined ? sectionproperties.marginBottom : 0),
                        marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop != null && sectionproperties.marginTop != undefined ? sectionproperties.marginTop : 0),
                        borderColor: sectionproperties.sectioncardbordercolor,
                        borderWidth: StyleParseToIntFuncContext(sectionproperties.sectioncardborderwidth),
                        borderTopLeftRadius:
                            langdetect == 'en'
                                ? StyleParseToIntFuncContext(sectionproperties.borderTopLeftRadius, '', true)
                                : StyleParseToIntFuncContext(sectionproperties.borderTopRightRadius, '', true),
                        borderTopRightRadius:
                            langdetect == 'en'
                                ? StyleParseToIntFuncContext(sectionproperties.borderTopRightRadius, '', true)
                                : StyleParseToIntFuncContext(sectionproperties.borderTopLeftRadius, '', true),
                        borderBottomLeftRadius:
                            langdetect == 'en'
                                ? StyleParseToIntFuncContext(sectionproperties.borderBottomLeftRadius, '', true)
                                : StyleParseToIntFuncContext(sectionproperties.borderBottomRightRadius, '', true),
                        borderBottomRightRadius:
                            langdetect == 'en'
                                ? StyleParseToIntFuncContext(sectionproperties.borderBottomRightRadius, '', true)
                                : StyleParseToIntFuncContext(sectionproperties.borderBottomLeftRadius, '', true),
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom, '', true),
                        marginLeft:
                            langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.card_marginLeft, '', true) : StyleParseToIntFuncContext(sectionproperties.card_marginRight, '', true),
                        marginRight:
                            langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.card_marginRight, '', true) : StyleParseToIntFuncContext(sectionproperties.card_marginLeft, '', true),
                        width:
                            SIZES.width > 1024
                                ? SIZES.width / 5
                                : SIZES.width > 768
                                ? SIZES.width / 3 - StyleParseToIntFuncContext(sectionproperties.card_marginRight) - StyleParseToIntFuncContext(sectionproperties.card_marginLeft)
                                : props.sectiondirection != 'slider'
                                ? SIZES.width / props.numberOfColsvertical -
                                  StyleParseToIntFuncContext(sectionproperties.card_marginRight) -
                                  StyleParseToIntFuncContext(sectionproperties.card_marginLeft)
                                : SIZES.width - 1800,
                        justifyContent: 'flex-start',
                        paddingHorizontal: StyleParseToIntFuncContext(sectionproperties.cardpaddinghorizontal),
                        paddingVertical: StyleParseToIntFuncContext(sectionproperties.cardpaddingvertical),
                        overflow: 'hidden',
                    },
                ]}
            >
                <View style={[generalstyles.flexRow]}>
                    <View
                        style={[
                            styles.categoriesCardImageCont,
                            generalstyles.allcentered,
                            {
                                // backgroundColor: sectionproperties.image_bgcolor,
                                marginEnd: 5,
                                width: StyleParseToIntFuncContext(sectionproperties.image_width),
                                height: StyleParseToIntFuncContext(sectionproperties.image_height),
                                borderWidth: StyleParseToIntFuncContext(sectionproperties.image_borderwidth),
                                borderColor: sectionproperties.image_bordercolor,
                                borderTopLeftRadius:
                                    langdetect == 'en'
                                        ? StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true)
                                        : StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true),
                                borderTopRightRadius:
                                    langdetect == 'en'
                                        ? StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true)
                                        : StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true),
                                borderBottomLeftRadius:
                                    langdetect == 'en'
                                        ? StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true)
                                        : StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true),
                                borderBottomRightRadius:
                                    langdetect == 'en'
                                        ? StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true)
                                        : StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true),
                                overflow: 'hidden',
                            },
                        ]}
                    >
                        <ImageComponent
                            resizeMethod="resize"
                            // path={item.image}
                            path={imageurlgrouper()}
                            resizeMode={sectionproperties.bgcovercontain == 'Cover' ? 'cover' : 'contain'}
                            style={[
                                styles.categoriesCardImage,
                                generalstyles.allcentered,
                                {
                                    width: StyleParseToIntFuncContext(sectionproperties.imageInnerWidth_Height) + '%',
                                    height: StyleParseToIntFuncContext(sectionproperties.imageInnerWidth_Height) + '%',
                                },
                            ]}
                        />
                        {props.fetchingtypeprops == 'vendors' && item.status == 'Closed' && (
                            <View
                                style={{
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    position: 'absolute',
                                    top: 0,
                                    bottom: 0,
                                    width: StyleParseToIntFuncContext(sectionproperties.image_width),
                                    height: StyleParseToIntFuncContext(sectionproperties.image_height),
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.image_borderwidth),
                                    borderColor: sectionproperties.image_bordercolor,
                                    borderTopLeftRadius:
                                        langdetect == 'en'
                                            ? StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true)
                                            : StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true),
                                    borderTopRightRadius:
                                        langdetect == 'en'
                                            ? StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true)
                                            : StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true),
                                    borderBottomLeftRadius:
                                        langdetect == 'en'
                                            ? StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true)
                                            : StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true),
                                    borderBottomRightRadius:
                                        langdetect == 'en'
                                            ? StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true)
                                            : StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true),
                                    overflow: 'hidden',
                                }}
                            ></View>
                        )}
                        {props.fetchingtypeprops == 'vendors' && item.status == 'Busy' && (
                            <View
                                style={{
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    position: 'absolute',
                                    top: 0,
                                    bottom: 0,
                                    width: StyleParseToIntFuncContext(sectionproperties.image_width),
                                    height: StyleParseToIntFuncContext(sectionproperties.image_height),
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.image_borderwidth),
                                    borderColor: sectionproperties.image_bordercolor,
                                    borderTopLeftRadius:
                                        langdetect == 'en'
                                            ? StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true)
                                            : StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true),
                                    borderTopRightRadius:
                                        langdetect == 'en'
                                            ? StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true)
                                            : StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true),
                                    borderBottomLeftRadius:
                                        langdetect == 'en'
                                            ? StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true)
                                            : StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true),
                                    borderBottomRightRadius:
                                        langdetect == 'en'
                                            ? StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true)
                                            : StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true),
                                    overflow: 'hidden',
                                }}
                            ></View>
                        )}
                        {props.fetchingtypeprops == 'vendors' && (
                            <View style={{ position: 'absolute' }}>
                                {item.status == 'Closed' && (
                                    <Text
                                        style={[
                                            generalstyles.poppinsMedium,
                                            {
                                                color: '#fff',
                                                fontSize: 14,
                                            },
                                        ]}
                                    >
                                        {langdetect == 'en' ? 'Closed' : 'مغلق'}
                                    </Text>
                                )}
                                {item.status == 'Busy' && (
                                    <Text
                                        style={[
                                            generalstyles.poppinsMedium,
                                            {
                                                color: '#fff',
                                                fontSize: 14,
                                            },
                                        ]}
                                    >
                                        {langdetect == 'en' ? 'Busy' : 'مشغول'}
                                    </Text>
                                )}
                            </View>
                        )}
                    </View>
                    <View
                        style={[
                            generalstyles.flexColumn,
                            {
                                // width: '100%',
                                overflow: 'hidden',
                                flex: 1,
                                alignItems: 'flex-start',
                                paddingStart: 5,
                                paddingEnd: 5,
                            },
                        ]}
                    >
                        <View style={[generalstyles.flexRow, { flex: 1 }]}>
                            <View style={[generalstyles.flexColumn, { flex: 1 }]}>
                                <View style={[generalstyles.flexRow]}>
                                    <Text
                                        ellipsizeMode="tail"
                                        numberOfLines={1}
                                        style={[
                                            generalstyles.poppinsMedium,
                                            generalstyles.textcapitalize,
                                            {
                                                flex: 1,
                                                // flexShrink: 1,
                                                paddingEnd: 2,
                                                marginTop: 5,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                                color: sectionproperties.generaltext_fontColor,
                                                textTransform:
                                                    sectionproperties.generaltext_textTransform == 'Uppercase'
                                                        ? 'uppercase'
                                                        : sectionproperties.generaltext_textTransform == 'Capitalize'
                                                        ? 'capitalize'
                                                        : 'lowercase',
                                                textAlign: 'left',
                                            },
                                        ]}
                                    >
                                        {item.name}
                                    </Text>
                                    {props.fetchingtypeprops == 'vendors' && sectionproperties.showrating == 'Show' && (
                                        <View style={{ marginTop: 5 }}>
                                            <Stars
                                                disabled={true}
                                                display={parseInt(item.vendorratings)}
                                                spacing={1}
                                                count={5}
                                                half={true}
                                                fullStar={<FontAwesome name={'star'} size={14} color="#FAB400" />}
                                                emptyStar={<FontAwesome name={'star-o'} size={14} color="#FAB400" />}
                                                halfStar={<FontAwesome name={'star-half-empty'} size={14} color="#FAB400" />}
                                            />
                                            {/* <StarRating disabled={true} maxStars={5} rating={parseInt(item.vendorratings)} starSize={17} fullStarColor="#FAB400" emptyStarColor="#FAB400" /> */}
                                        </View>
                                    )}
                                </View>
                                {props.fetchingtypeprops == 'vendors' && item.estimateddeliverytime != null && (
                                    <Text
                                        ellipsizeMode="tail"
                                        numberOfLines={1}
                                        style={[
                                            generalstyles.poppinsMedium,
                                            generalstyles.textcapitalize,
                                            {
                                                marginBottom: 5,
                                                fontSize: 13,
                                                color: '#000',
                                                opacity: 0.8,
                                                textAlign: 'left',
                                            },
                                        ]}
                                    >
                                        {langdetect == 'en' ? 'Delivery Time' : 'مدة التوصيل'}: {item.estimateddeliverytime}
                                    </Text>
                                )}
                            </View>
                            {/* {props.fetchingtypeprops == 'vendors' && item.status == 'Active' && (
                            <View
                                style={[
                                    generalstyles.allcentered,
                                    generalstyles.flexRow,
                                    {
                                        marginEnd: 10,
                                    },
                                ]}
                            >
                                <View
                                    style={{
                                        width: 10,
                                        height: 10,
                                        backgroundColor: COLORS.success,
                                        borderRadius: 100,
                                        marginEnd: 5,
                                    }}
                                />
                                <Text
                                    style={[
                                        generalstyles.poppinsMedium,
                                        {
                                            color: COLORS.success,
                                            fontSize: 14,
                                        },
                                    ]}
                                >
                                    {langdetect == 'en' ? 'Open' : 'متاح'}
                                </Text>
                            </View>
                        )} */}
                            {/* {props.fetchingtypeprops == 'vendors' && item.status == 'Closed' && (
                            <View
                                style={[
                                    generalstyles.allcentered,
                                    generalstyles.flexRow,
                                    {
                                        marginEnd: 10,
                                    },
                                ]}
                            >
                                <View
                                    style={{
                                        width: 10,
                                        height: 10,
                                        backgroundColor: COLORS.danger,
                                        borderRadius: 100,
                                        marginEnd: 5,
                                    }}
                                />
                                <Text
                                    style={[
                                        generalstyles.poppinsMedium,
                                        {
                                            color: COLORS.danger,
                                            fontSize: 14,
                                        },
                                    ]}
                                >
                                    {langdetect == 'en' ? 'Closed' : 'مغلق'}
                                </Text>
                            </View>
                        )}
                        {props.fetchingtypeprops == 'vendors' && item.status == 'Busy' && (
                            <View
                                style={[
                                    generalstyles.allcentered,
                                    generalstyles.flexRow,
                                    {
                                        marginEnd: 10,
                                    },
                                ]}
                            >
                                <View
                                    style={{
                                        width: 10,
                                        height: 10,
                                        backgroundColor: COLORS.warning,
                                        borderRadius: 100,
                                        marginEnd: 5,
                                    }}
                                />
                                <Text
                                    style={[
                                        generalstyles.poppinsMedium,
                                        {
                                            color: COLORS.warning,
                                            fontSize: 14,
                                        },
                                    ]}
                                >
                                    {langdetect == 'en' ? 'Busy' : 'مشغول'}
                                </Text>
                            </View>
                        )} */}
                        </View>
                        {/* its an array of promo codes inside in promoinfo */}
                        {/* if promoinfo is null dont show it */}
                        {/* <Text>asd{JSON.stringify(item.promocodes)}</Text> */}
                        {item?.promocodes != undefined && item?.promocodes != null && item?.promocodes.length != 0 && (
                            <FlatList
                                horizontal
                                data={item?.promocodes}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View
                                            style={[
                                                {
                                                    marginTop: 2,
                                                    flexDirection: 'column',
                                                    flex: 1,
                                                    marginEnd: 10,
                                                    // borderWidth: 1,
                                                    borderColor: COLORS.success,
                                                    borderRadius: 7,
                                                    paddingHorizontal: 7,
                                                    justifyContent: 'flex-start',
                                                    backgroundColor: '#ffe6f0',
                                                    paddingVertical: 5,
                                                },
                                            ]}
                                            onPress={() => {
                                                // copyToClipboard();
                                                // showUpTopNotificationBarContext(langdetect == 'en' ? 'Copied to your clipboard!' : 'تم النسخ', 'green');
                                            }}
                                        >
                                            <View style={[generalstyles.flexRow]}>
                                                <Text
                                                    style={{
                                                        fontFamily: 'Poppins-Medium',
                                                        color: '#000',
                                                        textAlign: 'left',
                                                        fontSize: 12,
                                                        marginEnd: 5,
                                                    }}
                                                    numberOfLines={1}
                                                    ellipsizeMode="tail"
                                                >
                                                    {langdetect == 'en' ? 'Use Promocode:' : 'إستخدم الكود:'}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontFamily: 'Poppins-Medium',
                                                        color: COLORS.danger,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.timeline_text_fontsize),
                                                        textAlign: 'left',
                                                        fontSize: 13,
                                                    }}
                                                    numberOfLines={1}
                                                    ellipsizeMode="tail"
                                                >
                                                    {item.promoinfo.couponname}{' '}
                                                </Text>
                                            </View>
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins-Medium',
                                                    color: COLORS.success,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.timeline_text_fontsize),
                                                    textAlign: 'left',
                                                    fontSize: 13,
                                                }}
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                            >
                                                {langdetect == 'en' ? 'Minimum:' : 'الحد الادنى:'} {item.promoinfo.mincartsize}{' '}
                                                {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                            </Text>
                                        </View>
                                    );
                                }}
                            />
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }, [sectionproperties, item, item.productid, item.quantity]);
    return cardsrender;
};
export default HorizontalCategoryCard;
const styles = StyleSheet.create({
    // Categories
    categoriesCard: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoriesCardImageCont: {
        // backgroundColor: 'transparent',
        // borderRadius: 25,
        backgroundColor: COLORS.lightGray4,
    },
    categoriesCardImage: {
        width: '100%',
        height: '100%',
    },
});
