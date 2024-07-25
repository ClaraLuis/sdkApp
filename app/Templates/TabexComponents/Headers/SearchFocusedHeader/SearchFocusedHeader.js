import React, { useState, useContext, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, TextInput } from 'react-native';
import { SIZES, icons } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { MaterialIcons, SimpleLineIcons, Feather, FontAwesome5, MaterialCommunityIcons, AntDesign } from 'react-native-vector-icons';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { urlEndpoint } from '../../../../config/imagekit';
import { ImageComponent } from '../../../ImageComponent';

const SearchFocusedHeader = (props) => {
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { fetchAuthorizationQueryContext, fetchcustomercartQueryContext, templateproperties_context } = useContext(FetchingContext);
    const { routingcountext, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [imagesarray, setimagesarray] = useState([]);
    useEffect(() => {
        if (props?.sectionpropertiesProps != undefined) {
            var secpropobj = {};
            props?.sectionpropertiesProps?.forEach(function (sectionpropertiesobj, sectionpropertiesindex) {
                secpropobj[sectionpropertiesobj.property_css_name] = sectionpropertiesobj.property_value;
            });
            if (templateproperties_context?.logoarrayofobjects != undefined && templateproperties_context?.logoarrayofobjects != null) {
                secpropobj.logoarrayofobjects = JSON.parse(templateproperties_context?.logoarrayofobjects);
            }
            setsectionproperties({ ...secpropobj });
        }
    }, [props.sectionpropertiesProps]);
    useEffect(() => {
        if (sectionproperties.length != 0 && sectionproperties.arrayofobjectimagesonly != undefined) {
            var arrayofobjectimagesonlyparsed = JSON.parse(sectionproperties.arrayofobjectimagesonly);
            if (Array.isArray(arrayofobjectimagesonlyparsed)) {
                setimagesarray([...arrayofobjectimagesonlyparsed]);
            }
        }
    }, [sectionproperties]);

    const cardsrender = React.useMemo(() => {
        return (
            <View
                style={[
                    styles.headercont,
                    {
                        marginBottom: StyleParseToIntFuncContext(
                            sectionproperties.header_marginBottom != null && sectionproperties.header_marginBottom != undefined ? sectionproperties.header_marginBottom : 0,
                        ),
                    },
                ]}
            >
                {Object.keys(sectionproperties).length != 0 && (
                    <View
                        style={[
                            generalstyles.flexColumn,
                            {
                                width: SIZES.width,
                                backgroundColor: sectionproperties.header_backgroundColor,
                            },
                        ]}
                    >
                        <View
                            style={{
                                paddingLeft: langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.header_paddingLeft) : StyleParseToIntFuncContext(sectionproperties.header_paddingRight),
                                paddingRight: langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.header_paddingRight) : StyleParseToIntFuncContext(sectionproperties.header_paddingLeft),
                                paddingTop: StyleParseToIntFuncContext(sectionproperties.header_paddingTop),
                                paddingBottom: StyleParseToIntFuncContext(sectionproperties.header_paddingBottom),
                            }}
                        >
                            <View style={[generalstyles.flexRow]}>
                                <View style={[generalstyles.flexRow, { justifyContent: 'flex-start', overflow: 'hidden' }]}>
                                    <TouchableOpacity
                                        style={[
                                            {
                                                width: StyleParseToIntFuncContext(templateproperties_context.logo_width),
                                                height: StyleParseToIntFuncContext(templateproperties_context.logo_height),
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                alignContent: 'center',
                                            },
                                        ]}
                                        onPress={() => {
                                            routingcountext(StaticPagesLinksContext.GeneralProductsComponent);
                                        }}
                                    >
                                        <ImageComponent
                                            path={langdetect == 'en' ? sectionproperties?.logoarrayofobjects[0]?.englishlogo : sectionproperties?.logoarrayofobjects[0]?.arabiclogo}
                                            resizeMode="contain"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={[generalstyles.flexRow, { justifyContent: 'center', flex: 1 }]}>
                                    <View
                                        style={{
                                            width: StyleParseToIntFuncContext(sectionproperties.searchbarcont_width) + '%',
                                            marginHorizontal: 10,
                                        }}
                                    >
                                        {sectionproperties.searchbar_show == 'Show' && (
                                            <TouchableOpacity
                                                style={[
                                                    {
                                                        width: '100%',
                                                        height: StyleParseToIntFuncContext(sectionproperties.searchbarcont_height),
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        flexDirection: 'row',
                                                        alignContent: 'center',
                                                        backgroundColor: sectionproperties.searchbarcont_bgcolor,
                                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.searchbarcont_borderBottomLeftRadius, '', true),
                                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.searchbarcontinput_borderwidth, '', true),
                                                        borderColor: sectionproperties.searchbarcontinput_bordercolor,
                                                    },
                                                ]}
                                                onPress={() => {
                                                    routingcountext(StaticPagesLinksContext.Search);
                                                }}
                                            >
                                                <TextInput
                                                    underlineColorAndroid="transparent"
                                                    placeholder={lang.search}
                                                    placeholderTextColor={'#ccc'}
                                                    editable={false}
                                                    style={[generalstyles.poppinsMedium, { paddingLeft: 5 }]}
                                                />
                                                <Feather
                                                    name="search"
                                                    style={{
                                                        color: sectionproperties.searchbarcont_color,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.searchbarcontfontsize),
                                                        marginEnd: 3,
                                                        marginStart: 'auto',
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    {sectionproperties.favBtnShow == 'Show' && (
                                        <TouchableOpacity
                                            onPress={() => {
                                                routingcountext(StaticPagesLinksContext.Wishlist);
                                            }}
                                            style={[
                                                generalstyles.allcentered,
                                                {
                                                    width:
                                                        StyleParseToIntFuncContext(sectionproperties.favBtnWidth) == 0
                                                            ? 'auto'
                                                            : StyleParseToIntFuncContext(
                                                                  sectionproperties.favBtnWidth != null && sectionproperties.favBtnWidth != undefined ? sectionproperties.favBtnWidth : 45,
                                                              ),
                                                    height:
                                                        StyleParseToIntFuncContext(sectionproperties.favBtnHeight) == 0
                                                            ? 'auto'
                                                            : StyleParseToIntFuncContext(
                                                                  sectionproperties.favBtnHeight != null && sectionproperties.favBtnHeight != undefined ? sectionproperties.favBtnHeight : 45,
                                                              ),
                                                    backgroundColor: sectionproperties.favBtnbgColor,
                                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.fav_btn_borderBottomLeftRadius, '', true),
                                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.favbtnborderwidth, '', true),
                                                    borderColor: sectionproperties.favbtnbordercolor,
                                                    marginHorizontal: 5,
                                                },
                                            ]}
                                        >
                                            {sectionproperties.faviconshape == 'Star Shape' && (
                                                <View>
                                                    <AntDesign
                                                        name="staro"
                                                        size={StyleParseToIntFuncContext(sectionproperties.favBtnIconfontsize)}
                                                        style={{
                                                            color: sectionproperties.favBtniconcolor,
                                                        }}
                                                    />
                                                </View>
                                            )}
                                            {sectionproperties.faviconshape == 'Heart Shape' && (
                                                <View>
                                                    <AntDesign
                                                        name="hearto"
                                                        size={StyleParseToIntFuncContext(sectionproperties.favBtnIconfontsize)}
                                                        style={{
                                                            color: sectionproperties.favBtniconcolor,
                                                        }}
                                                    />
                                                </View>
                                            )}
                                        </TouchableOpacity>
                                    )}
                                    {sectionproperties.cartBtnShow == 'Show' && (
                                        <TouchableOpacity
                                            style={[
                                                {
                                                    marginHorizontal: 5,
                                                    width: StyleParseToIntFuncContext(sectionproperties.cartBtnWidth) == 0 ? 'auto' : StyleParseToIntFuncContext(sectionproperties.cartBtnWidth),
                                                    height: StyleParseToIntFuncContext(sectionproperties.cartBtnHeight) == 0 ? 'auto' : StyleParseToIntFuncContext(sectionproperties.cartBtnHeight),
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    alignContent: 'center',
                                                    backgroundColor: sectionproperties.cartBtnbgColor,
                                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true),
                                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth, '', true),
                                                    borderColor: sectionproperties.cartbtnbordercolor,
                                                },
                                            ]}
                                            onPress={() => {
                                                routingcountext(StaticPagesLinksContext.viewcart);
                                            }}
                                        >
                                            {sectionproperties.carticonstyle == 'Shopping cart 1' && (
                                                <MaterialCommunityIcons
                                                    name="cart-outline"
                                                    size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                                    color={sectionproperties.cart_iconcolor}
                                                />
                                            )}
                                            {sectionproperties.carticonstyle == 'Shopping cart 2' && (
                                                <Image
                                                    source={icons.cart2}
                                                    resizeMode="cover"
                                                    style={{
                                                        width: StyleParseToIntFuncContext(
                                                            sectionproperties.cartBtn_iconFontSize != null && sectionproperties.cartBtn_iconFontSize != undefined
                                                                ? sectionproperties.cartBtn_iconFontSize
                                                                : 0,
                                                        ),
                                                        height: StyleParseToIntFuncContext(
                                                            sectionproperties.cartBtn_iconFontSize != null && sectionproperties.cartBtn_iconFontSize != undefined
                                                                ? sectionproperties.cartBtn_iconFontSize
                                                                : 0,
                                                        ),
                                                        tintColor: sectionproperties.cart_iconcolor,
                                                    }}
                                                />
                                            )}
                                            {sectionproperties.carticonstyle == 'Shopping bag 1' && (
                                                <Feather
                                                    name="shopping-bag"
                                                    size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                                    style={{
                                                        color: sectionproperties.cart_iconcolor,
                                                        paddingLeft: langdetect == 'en' ? (Platform.OS === 'ios' ? 1 : 0) : 0,
                                                        paddingRight: langdetect == 'ar' ? (Platform.OS === 'ios' ? 1 : 0) : 0,
                                                        paddingBottom: Platform.OS === 'ios' ? 1 : 0,
                                                    }}
                                                />
                                            )}
                                            {sectionproperties.carticonstyle == 'Shopping bag 2' && (
                                                <SimpleLineIcons
                                                    name="handbag"
                                                    size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                                    style={{
                                                        color: sectionproperties.cart_iconcolor,
                                                        paddingLeft: langdetect == 'en' ? (Platform.OS === 'ios' ? 1 : 0) : 0,
                                                        paddingRight: langdetect == 'ar' ? (Platform.OS === 'ios' ? 1 : 0) : 0,
                                                        paddingBottom: Platform.OS === 'ios' ? 1 : 0,
                                                    }}
                                                />
                                            )}
                                            {sectionproperties.carticonstyle == 'Shopping bag 3' && (
                                                <FontAwesome5
                                                    name="shopping-bag"
                                                    size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                                    style={{
                                                        color: sectionproperties.cart_iconcolor,
                                                        paddingLeft: langdetect == 'en' ? (Platform.OS === 'ios' ? 1 : 0) : 0,
                                                        paddingRight: langdetect == 'ar' ? (Platform.OS === 'ios' ? 1 : 0) : 0,
                                                        paddingBottom: Platform.OS === 'ios' ? 1 : 0,
                                                    }}
                                                />
                                            )}
                                            {sectionproperties.carticonstyle == 'Shopping bag 4' && (
                                                <SimpleLineIcons
                                                    name="bag"
                                                    size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                                    style={{
                                                        color: sectionproperties.cart_iconcolor,
                                                        paddingLeft: langdetect == 'en' ? (Platform.OS === 'ios' ? 1 : 0) : 0,
                                                        paddingRight: langdetect == 'ar' ? (Platform.OS === 'ios' ? 1 : 0) : 0,
                                                        paddingBottom: Platform.OS === 'ios' ? 1 : 0,
                                                    }}
                                                />
                                            )}
                                            {sectionproperties.carticonstyle == 'Calendar 1' && (
                                                <AntDesign
                                                    name="calendar"
                                                    size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                                    style={{
                                                        color: sectionproperties.cart_iconcolor,
                                                        paddingLeft: langdetect == 'en' ? (Platform.OS === 'ios' ? 1 : 0) : 0,
                                                        paddingRight: langdetect == 'ar' ? (Platform.OS === 'ios' ? 1 : 0) : 0,
                                                        paddingBottom: Platform.OS === 'ios' ? 1 : 0,
                                                    }}
                                                />
                                            )}
                                            {fetchcustomercartQueryContext.isSuccess && fetchcustomercartQueryContext?.data?.data?.customercart != null && (
                                                <View
                                                    style={[
                                                        generalstyles.allcentered,
                                                        {
                                                            position: 'absolute',
                                                            top: StyleParseToIntFuncContext(
                                                                sectionproperties.cartbadgetop != null && sectionproperties.cartbadgetop != undefined ? sectionproperties.cartbadgetop : 0,
                                                                '',
                                                                true,
                                                            ),
                                                            right: StyleParseToIntFuncContext(
                                                                sectionproperties.cartbadgeright != null && sectionproperties.cartbadgeright != undefined ? sectionproperties.cartbadgeright : 0,
                                                                '',
                                                                true,
                                                            ),
                                                            backgroundColor: sectionproperties.badge_bgcolor,
                                                            width: StyleParseToIntFuncContext(
                                                                sectionproperties.badge_width != null && sectionproperties.badge_width != undefined ? sectionproperties.badge_width : 20,
                                                            ),
                                                            height: StyleParseToIntFuncContext(
                                                                sectionproperties.badge_height != null && sectionproperties.badge_height != undefined ? sectionproperties.badge_height : 20,
                                                            ),
                                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.badge_borderradius, '', true),
                                                        },
                                                    ]}
                                                >
                                                    {fetchcustomercartQueryContext.isSuccess && fetchcustomercartQueryContext?.data?.data?.customercart != null && (
                                                        <Text
                                                            style={{
                                                                paddingLeft: langdetect == 'en' ? (Platform.OS == 'ios' ? 1 : 0) : 0,
                                                                paddingRight: langdetect == 'ar' ? (Platform.OS == 'ios' ? 1 : 0) : 0,
                                                                fontFamily: 'Poppins-Medium',
                                                                color: sectionproperties.badge_color,
                                                                fontSize: 11,
                                                            }}
                                                        >
                                                            {fetchcustomercartQueryContext?.data?.data?.customercart.cartitems.length}
                                                        </Text>
                                                    )}
                                                </View>
                                            )}
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                            {fetchAuthorizationQueryContext?.data?.data?.loggedin && sectionproperties.showsection == 'Show' && (
                                <View style={[generalstyles.flexColumn]}>
                                    <Text
                                        style={[
                                            {
                                                textAlign: 'left',
                                                fontFamily:
                                                    sectionproperties.userinfo_titlefontweight == 300
                                                        ? 'Poppins-Thin'
                                                        : sectionproperties.userinfo_titlefontweight == 400
                                                        ? 'Poppins-Light'
                                                        : sectionproperties.userinfo_titlefontweight == 500
                                                        ? 'Poppins-Regular'
                                                        : sectionproperties.userinfo_titlefontweight == 600
                                                        ? 'Poppins-Medium'
                                                        : sectionproperties.userinfo_titlefontweight == 700
                                                        ? 'Poppins-Semibold'
                                                        : 'Poppins-Bold',
                                                color: sectionproperties.userinfo_titlecolor,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.userinfo_titlefontsize),
                                            },
                                        ]}
                                    >
                                        {lang.deliverto}
                                    </Text>
                                    <TouchableOpacity style={[generalstyles.flexRow]}>
                                        <MaterialIcons
                                            name="location-pin"
                                            size={15}
                                            style={{
                                                color: sectionproperties.userinfo_iconcolor,
                                                marginEnd: 3,
                                            }}
                                        />
                                        <Text
                                            style={[
                                                generalstyles.allcentered,
                                                generalstyles.textcapitalize,
                                                {
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.userinfo_fontsize),
                                                    color: sectionproperties.userinfo_color,
                                                    fontFamily:
                                                        sectionproperties.userinfo_fontweight == 300
                                                            ? 'Poppins-Thin'
                                                            : sectionproperties.userinfo_fontweight == 400
                                                            ? 'Poppins-Light'
                                                            : sectionproperties.userinfo_fontweight == 500
                                                            ? 'Poppins-Regular'
                                                            : sectionproperties.userinfo_fontweight == 600
                                                            ? 'Poppins-Medium'
                                                            : sectionproperties.userinfo_fontweight == 700
                                                            ? 'Poppins-Semibold'
                                                            : 'Poppins-Bold',
                                                },
                                            ]}
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >
                                            {fetchAuthorizationQueryContext?.data?.data?.customerinfo.name}, {fetchAuthorizationQueryContext?.data?.data?.customerinfo.shippingaddress}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                )}
            </View>
        );
    }, [sectionproperties, fetchAuthorizationQueryContext, fetchcustomercartQueryContext]);
    return cardsrender;
};

const styles = StyleSheet.create({
    headercont: {
        width: SIZES.width,
        flexDirection: 'column',
        alignItems: 'center',
    },
});

export default SearchFocusedHeader;
