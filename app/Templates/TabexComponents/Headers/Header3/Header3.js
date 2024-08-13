import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Platform } from 'react-native';
import { icons, SIZES } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { MaterialIcons, SimpleLineIcons, Feather, FontAwesome5, MaterialCommunityIcons } from 'react-native-vector-icons';
import { useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { ImageComponent } from '../../../ImageComponent';

const Header3 = (props) => {
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { fetchAuthorizationQueryContext, fetchcustomercartQueryContext } = useContext(FetchingContext);
    const { routingcountext, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    useEffect(() => {
        if (props?.sectionpropertiesProps != undefined) {
            var secpropobj = {};
            props?.sectionpropertiesProps?.forEach(function (sectionpropertiesobj, sectionpropertiesindex) {
                secpropobj[sectionpropertiesobj.property_css_name] = sectionpropertiesobj.property_value;
            });
            setsectionproperties({ ...secpropobj });
        }
    }, [props.sectionpropertiesProps]);
    const ContactInfo = () => {
        return (
            <View style={[generalstyles.flexColumn, {}]}>
                <Text
                    style={[
                        {
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
                            textAlign: 'left',
                        },
                    ]}
                >
                    {lang.deliverto}
                </Text>
                <TouchableOpacity
                    style={[generalstyles.flexRow]}
                    onPress={() => {
                        routingcountext(StaticPagesLinksContext.accountinfo);
                    }}
                >
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
                    <MaterialIcons
                        name="keyboard-arrow-down"
                        size={19}
                        style={{
                            color: sectionproperties.userinfo_color,
                            marginStart: 'auto',
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    };
    const cardsrender = React.useMemo(() => {
        return (
            <View
                style={[
                    styles.headercont,
                    {
                        backgroundColor: sectionproperties.header_backgroundColor,
                        borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.header_borderBottomLeftRadius, '', true),
                        borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.header_BorderBottomRightRadius, '', true),
                        borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.header_borderTopLeftRadius, '', true),
                        borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.header_borderTopRightRadius, '', true),
                        paddingTop: StyleParseToIntFuncContext(sectionproperties.header_paddingTop),
                        paddingBottom: StyleParseToIntFuncContext(sectionproperties.header_paddingBottom),
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.header_marginBottom),
                    },
                ]}
            >
                {/* asghar w hello kaza */}
                {fetchAuthorizationQueryContext?.data?.data?.loggedin && (
                    <View
                        style={[
                            generalstyles.allcentered,
                            {
                                backgroundColor: sectionproperties.header_backgroundColor,
                                width: '100%',
                                paddingVertical: 20,
                            },
                        ]}
                    >
                        <View style={[generalstyles.flexRow, { width: '90%', backgroundColor: sectionproperties.userinfo_iconcolor, borderRadius: 5, paddingVertical: 10, paddingHorizontal: 15 }]}>
                            {fetchAuthorizationQueryContext?.data?.data?.loggedin && (
                                <View style={{ flex: 1 }}>
                                    <View style={[generalstyles.flexColumn, {}]}>
                                        <Text
                                            style={[
                                                {
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
                                                    textAlign: 'left',
                                                    textTransform: 'capitalize',
                                                },
                                            ]}
                                        >
                                            {lang.hello}: {fetchAuthorizationQueryContext?.data?.data?.customerinfo.name}
                                        </Text>
                                        <TouchableOpacity
                                            style={[generalstyles.flexRow]}
                                            onPress={() => {
                                                routingcountext(StaticPagesLinksContext.accountinfo);
                                            }}
                                        >
                                            <MaterialIcons
                                                name="location-pin"
                                                size={15}
                                                style={{
                                                    color: sectionproperties.userinfo_color,
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
                                                {fetchAuthorizationQueryContext?.data?.data?.customerinfo.shippingaddress}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}

                            <View style={[generalstyles.allcentered, { minWidth: 50, height: 30, backgroundColor: '#fff', borderRadius: 100, paddingHorizontal: 7, paddingVertical: 5 }]}>
                                <Text style={[generalstyles.poppinsMedium, { color: '#278695' }]}>{sectionproperties.headertimebadge}</Text>
                            </View>
                        </View>
                    </View>
                )}
                {/* {Object.keys(sectionproperties).length != 0 && (
                    <View style={[generalstyles.flexColumn, { width: '100%' }]}>
                        {fetchAuthorizationQueryContext?.data?.data?.loggedin && sectionproperties.sectionposition == 'Above' && sectionproperties.searchbar_show == 'Show' && (
                            <View style={{ backgroundColor: sectionproperties.userinfo_sectionbgcolor, paddingLeft: 15, paddingRight: 15, paddingBottom: 10, height: 50 }}>{ContactInfo()}</View>
                        )}
                        <View style={[generalstyles.flexRow, { paddingLeft: 15, paddingRight: 15 }]}>
                            {sectionproperties.searchbar_show == 'Show' && (
                                <TouchableOpacity
                                    style={[
                                        {
                                            flex: 1,
                                            paddingStart: 10,
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                            flexDirection: 'row',
                                            backgroundColor: sectionproperties.searchbarcont_bgcolor,
                                            fontSize: 17,
                                            height: Platform.OS === 'ios' ? 40 : 35,
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.searchbarcont_borderBottomLeftRadius, '', true),
                                            borderColor: sectionproperties.searchbarcontinput_bordercolor,
                                            borderWidth: StyleParseToIntFuncContext(sectionproperties.searchbarcontinput_borderwidth, '', true),
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginEnd: 15,
                                        },
                                    ]}
                                    onPress={() => {
                                        routingcountext(StaticPagesLinksContext.Search);
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Feather
                                            name="search"
                                            size={StyleParseToIntFuncContext(sectionproperties.searchbaricon_fontsize)}
                                            style={{
                                                color: sectionproperties.searchbaricon_color,
                                                marginEnd: 3,
                                            }}
                                        />
                                        <TextInput
                                            underlineColorAndroid="transparent"
                                            placeholder={lang.search}
                                            placeholderTextColor={'#ccc'}
                                            style={[
                                                generalstyles.poppinsMedium,
                                                {
                                                    paddingLeft: 5,
                                                    color: sectionproperties.searchbarcontinput_color,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.searchbarcontinput_fontsize),
                                                },
                                            ]}
                                        />
                                    </View>
                                </TouchableOpacity>
                            )}
                            {sectionproperties.searchbar_show == 'Hide' && (
                                <View style={{ flex: 1, paddingEnd: 10 }}>
                                    {fetchAuthorizationQueryContext?.data?.data?.loggedin && (
                                        <View style={{ backgroundColor: sectionproperties.userinfo_sectionbgcolor, width: '100%' }}>{ContactInfo()}</View>
                                    )}
                                </View>
                            )}

                            <TouchableOpacity
                                style={[
                                    {
                                        width: StyleParseToIntFuncContext(sectionproperties.cartBtnWidth),
                                        height: StyleParseToIntFuncContext(sectionproperties.cartBtnHeight),
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        alignContent: 'center',
                                        backgroundColor: sectionproperties.cartbtn_bgtransparent == 'Transparent' ? 'transparent' : sectionproperties.cartBtnbgColor,
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
                                        size={
                                            Platform.OS === 'ios'
                                                ? StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)
                                                : StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize) - 2
                                        }
                                        color={sectionproperties.cart_iconcolor}
                                    />
                                )}
                                {sectionproperties.carticonstyle == 'Shopping cart 2' && (
                                    <Image
                                        source={icons.cart2}
                                        resizeMode="cover"
                                        style={{
                                            width: StyleParseToIntFuncContext(
                                                sectionproperties.cartBtn_iconFontSize != null && sectionproperties.cartBtn_iconFontSize != undefined ? sectionproperties.cartBtn_iconFontSize : 0,
                                            ),
                                            height: StyleParseToIntFuncContext(
                                                sectionproperties.cartBtn_iconFontSize != null && sectionproperties.cartBtn_iconFontSize != undefined ? sectionproperties.cartBtn_iconFontSize : 0,
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
                                            paddingStart: Platform.OS === 'ios' ? 1 : 0,
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
                                            paddingStart: Platform.OS === 'ios' ? 1 : 0,
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
                                            paddingStart: Platform.OS === 'ios' ? 1 : 0,
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
                                            paddingStart: Platform.OS === 'ios' ? 1 : 0,
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
                                            paddingStart: Platform.OS === 'ios' ? 1 : 0,
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
                                                    sectionproperties.badge_top != null && sectionproperties.badge_top != undefined ? sectionproperties.badge_top : 0,
                                                    '',
                                                    true,
                                                ),
                                                right: StyleParseToIntFuncContext(
                                                    sectionproperties.badge_right != null && sectionproperties.badge_right != undefined ? sectionproperties.badge_right : 0,
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
                                                    paddingRight: langdetect == 'en' ? (Platform.OS == 'ios' ? 1 : 0) : 0,
                                                    paddingTop: Platform.OS === 'ios' ? 1 : 1,
                                                    fontFamily: 'Poppins-Medium',
                                                    color: sectionproperties.badge_color,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.badge_fontsize),
                                                }}
                                            >
                                                {fetchcustomercartQueryContext?.data?.data?.customercart.cartitems.length}
                                            </Text>
                                        )}
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                        {fetchAuthorizationQueryContext?.data?.data?.loggedin && sectionproperties.sectionposition == 'Below' && sectionproperties.searchbar_show == 'Show' && (
                            <View style={{ backgroundColor: sectionproperties.userinfo_sectionbgcolor, paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 10, height: 60 }}>
                                {ContactInfo()}
                            </View>
                        )}
                    </View>
                )} */}
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

export default Header3;
