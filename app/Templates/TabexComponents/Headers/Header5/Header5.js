import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Platform, Linking } from 'react-native';
import { icons, images, SIZES, COLORS, FONTS } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { AntDesign, Feather, SimpleLineIcons, FontAwesome5, MaterialCommunityIcons } from 'react-native-vector-icons';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { useDispatch, useSelector } from 'react-redux';
import { urlEndpoint } from '../../../../config/imagekit';
import { ImageComponent } from '../../../ImageComponent';
import { Ionicons } from '@expo/vector-icons';

const Header5 = (props) => {
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { fetchcustomercartQueryContext, templateproperties_context, fetchAuthorizationQueryContext, favoriteprojectscountContext } = useContext(FetchingContext);
    const { routingcountext, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
    const [sectionproperties, setsectionproperties] = useState('');
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
    const cardsrender = React.useMemo(() => {
        return (
            <View
                style={[
                    {
                        width: '100%',
                        // display:CurrentPageIdContext=='6478a08ce0476'
                    },
                ]}
            >
                {Object.keys(sectionproperties).length != 0 && (
                    <View style={[generalstyles.flexColumn, { width: '100%' }]}>
                        <View
                            style={[
                                styles.headercont,
                                {
                                    backgroundColor: sectionproperties.header_backgroundColor,
                                    borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.headerborderbottomradius, '', true),
                                    borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.headerborderbottomradius, '', true),
                                    borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.headerbordertopradius, '', true),
                                    borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.headerbordertopradius, '', true),
                                    paddingBottom: StyleParseToIntFuncContext(sectionproperties.header_paddingBottom),
                                    paddingTop: StyleParseToIntFuncContext(sectionproperties.header_paddingTop),
                                },
                            ]}
                        >
                            <View style={[generalstyles.flexRow, { paddingLeft: 15, paddingRight: 15 }]}>
                                <View style={[generalstyles.flexRow, { flex: 1, justifyContent: 'flex-start' }]}>
                                    {sectionproperties.favBtnShow == 'Show' && (
                                        <TouchableOpacity
                                            onPress={() => {
                                                routingcountext(StaticPagesLinksContext.Wishlist);
                                            }}
                                            style={[
                                                generalstyles.allcentered,
                                                {
                                                    width: StyleParseToIntFuncContext(
                                                        sectionproperties.favBtnWidth != null && sectionproperties.favBtnWidth != undefined ? sectionproperties.favBtnWidth : 45,
                                                    ),
                                                    height: StyleParseToIntFuncContext(
                                                        sectionproperties.favBtnHeight != null && sectionproperties.favBtnHeight != undefined ? sectionproperties.favBtnHeight : 45,
                                                    ),
                                                    backgroundColor: sectionproperties.favBtnbgColor,
                                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.fav_btn_borderBottomLeftRadius, '', true),
                                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.favbtnborderwidth, '', true),
                                                    borderColor: sectionproperties.favbtnbordercolor,
                                                },
                                            ]}
                                        >
                                            {sectionproperties.faviconshape == 'Star Shape' && (
                                                <AntDesign
                                                    name="staro"
                                                    size={StyleParseToIntFuncContext(sectionproperties.favBtnIconfontsize)}
                                                    style={{
                                                        color: sectionproperties.favBtniconcolor,
                                                    }}
                                                />
                                            )}
                                            {sectionproperties.faviconshape == 'Heart Shape' && (
                                                <AntDesign
                                                    name="hearto"
                                                    size={StyleParseToIntFuncContext(sectionproperties.favBtnIconfontsize)}
                                                    style={{
                                                        color: sectionproperties.favBtniconcolor,
                                                    }}
                                                />
                                            )}
                                            {fetchcustomercartQueryContext.isSuccess && fetchcustomercartQueryContext?.data?.data?.customercart != null && (
                                                <View
                                                    style={[
                                                        generalstyles.allcentered,
                                                        {
                                                            position: 'absolute',
                                                            top: StyleParseToIntFuncContext(sectionproperties.badge_top, '', true),
                                                            right: StyleParseToIntFuncContext(sectionproperties.badge_right, '', true),
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
                                                                fontFamily: 'Poppins-Medium',
                                                                color: sectionproperties.badge_color,
                                                                fontSize: StyleParseToIntFuncContext(sectionproperties.badge_fontsize),
                                                                paddingLeft: langdetect == 'en' ? (Platform.OS === 'ios' ? 1 : 0) : 0,
                                                                paddingright: langdetect != 'en' ? (Platform.OS === 'ios' ? 1 : 0) : 0,
                                                            }}
                                                        >
                                                            {favoriteprojectscountContext?.length}
                                                        </Text>
                                                    )}
                                                </View>
                                            )}
                                        </TouchableOpacity>
                                    )}
                                </View>
                                <View style={[generalstyles.flexRow, generalstyles.allcentered, { flex: 1, justifyContent: 'center' }]}>
                                    {sectionproperties.removeonclick != 'Remove' && (
                                        <TouchableOpacity
                                            style={[
                                                {
                                                    width: StyleParseToIntFuncContext(
                                                        templateproperties_context.logo_width != null && templateproperties_context.logo_width != undefined
                                                            ? templateproperties_context.logo_width
                                                            : 120,
                                                    ),
                                                    height: StyleParseToIntFuncContext(
                                                        templateproperties_context.logo_height != null && templateproperties_context.logo_height != undefined
                                                            ? templateproperties_context.logo_height
                                                            : 70,
                                                    ),
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
                                    )}
                                    {sectionproperties.removeonclick == 'Remove' && (
                                        <View
                                            style={[
                                                {
                                                    width: StyleParseToIntFuncContext(
                                                        templateproperties_context.logo_width != null && templateproperties_context.logo_width != undefined
                                                            ? templateproperties_context.logo_width
                                                            : 120,
                                                    ),
                                                    height: StyleParseToIntFuncContext(
                                                        templateproperties_context.logo_height != null && templateproperties_context.logo_height != undefined
                                                            ? templateproperties_context.logo_height
                                                            : 70,
                                                    ),
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
                                        </View>
                                    )}
                                </View>
                                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1 }}>
                                    {sectionproperties.cartBtnShow == 'Show' && (
                                        <TouchableOpacity
                                            onPress={() => {
                                                routingcountext(StaticPagesLinksContext.viewcart);
                                            }}
                                            style={[
                                                generalstyles.allcentered,
                                                {
                                                    width: StyleParseToIntFuncContext(
                                                        sectionproperties.cartBtnWidth != null && sectionproperties.cartBtnWidth != undefined ? sectionproperties.cartBtnWidth : 50,
                                                    ),
                                                    height: StyleParseToIntFuncContext(
                                                        sectionproperties.cartBtnHeight != null && sectionproperties.cartBtnHeight != undefined ? sectionproperties.cartBtnHeight : 50,
                                                    ),
                                                    backgroundColor: sectionproperties.cartBtnbgColor,
                                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth, '', true),
                                                    borderColor: sectionproperties.cartbtnbordercolor,
                                                    backgroundColor: sectionproperties.cartBtnbgColor,
                                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius, '', true),
                                                },
                                            ]}
                                        >
                                            {sectionproperties.carticonstyle == 'Shopping cart 1' && (
                                                <MaterialCommunityIcons
                                                    name="cart-outline"
                                                    size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                                    style={{
                                                        color: sectionproperties.cart_iconcolor,
                                                    }}
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
                                                    }}
                                                />
                                            )}
                                            {sectionproperties.carticonstyle == 'Shopping bag 2' && (
                                                <SimpleLineIcons
                                                    name="handbag"
                                                    size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                                    style={{
                                                        color: sectionproperties.cart_iconcolor,
                                                    }}
                                                />
                                            )}
                                            {sectionproperties.carticonstyle == 'Shopping bag 3' && (
                                                <FontAwesome5
                                                    name="shopping-bag"
                                                    size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                                    style={{
                                                        color: sectionproperties.cart_iconcolor,
                                                    }}
                                                />
                                            )}
                                            {sectionproperties.carticonstyle == 'Shopping bag 4' && (
                                                <SimpleLineIcons
                                                    name="bag"
                                                    size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                                    style={{
                                                        color: sectionproperties.cart_iconcolor,
                                                    }}
                                                />
                                            )}
                                            {sectionproperties.carticonstyle == 'Calendar 1' && (
                                                <AntDesign
                                                    name="calendar"
                                                    size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                                    style={{
                                                        color: sectionproperties.cart_iconcolor,
                                                    }}
                                                />
                                            )}
                                            {fetchcustomercartQueryContext.isSuccess && fetchcustomercartQueryContext?.data?.data?.customercart != null && (
                                                <View
                                                    style={[
                                                        generalstyles.allcentered,
                                                        {
                                                            position: 'absolute',
                                                            top: StyleParseToIntFuncContext(sectionproperties.badge_top, '', true),
                                                            right: StyleParseToIntFuncContext(sectionproperties.badge_right, '', true),
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
                                                                fontFamily: 'Poppins-Medium',
                                                                color: sectionproperties.badge_color,
                                                                fontSize: StyleParseToIntFuncContext(sectionproperties.badge_fontsize),
                                                                paddingLeft: langdetect == 'en' ? (Platform.OS === 'ios' ? 1 : 0) : 0,
                                                                paddingright: langdetect != 'en' ? (Platform.OS === 'ios' ? 1 : 0) : 0,
                                                            }}
                                                        >
                                                            {fetchcustomercartQueryContext?.data?.data?.customercart.cartitems.length}
                                                        </Text>
                                                    )}
                                                </View>
                                            )}
                                        </TouchableOpacity>
                                    )}
                                    {sectionproperties.callbtn_show == 'Show' && (
                                        <TouchableOpacity
                                            onPress={() => {
                                                Linking.openURL('tel:' + fetchAuthorizationQueryContext?.data?.data?.CuContactphonenumber);
                                            }}
                                            style={[
                                                generalstyles.allcentered,
                                                {
                                                    width: StyleParseToIntFuncContext(
                                                        sectionproperties.callbtnwidth != null && sectionproperties.callbtnwidth != undefined ? sectionproperties.callbtnwidth : 50,
                                                    ),
                                                    height: StyleParseToIntFuncContext(
                                                        sectionproperties.callbtnheight != null && sectionproperties.callbtnheight != undefined ? sectionproperties.callbtnheight : 50,
                                                    ),
                                                    backgroundColor: sectionproperties.callbtnbgColor,
                                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.callbtnborderradius, '', true),
                                                },
                                            ]}
                                        >
                                            <Ionicons
                                                name="call-outline"
                                                size={StyleParseToIntFuncContext(sectionproperties.callbtniconfontsize)}
                                                style={{
                                                    color: sectionproperties.callbtnTextcolor,
                                                }}
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                            {sectionproperties.searchbar_show == 'Show' && sectionproperties.showlowerheadersection == 'Hide' && (
                                <View
                                    style={{
                                        paddingLeft: 15,
                                        paddingRight: 15,
                                    }}
                                >
                                    <View style={[generalstyles.flexRow, { paddingLeft: 10, paddingRight: 10, marginTop: StyleParseToIntFuncContext(sectionproperties.searchbarcont_marginTop) }]}>
                                        <TouchableOpacity
                                            style={[
                                                {
                                                    width: '100%',
                                                    padding: 10,
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                    flexDirection: 'row',
                                                    backgroundColor: sectionproperties.searchbarcont_bgcolor,
                                                    height: StyleParseToIntFuncContext(
                                                        sectionproperties.searchbarcont_height != null && sectionproperties.searchbarcont_height != undefined
                                                            ? sectionproperties.searchbarcont_height
                                                            : 50,
                                                    ),
                                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.searchbarcont_borderBottomLeftRadius, '', true),
                                                    borderColor: sectionproperties.searchbarcontinput_bordercolor,
                                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.searchbarcontinput_borderwidth, '', true),
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                },
                                            ]}
                                            onPress={() => {
                                                routingcountext(StaticPagesLinksContext.Search);
                                            }}
                                        >
                                            <Feather
                                                name="search"
                                                style={{
                                                    color: sectionproperties.searchbaricon_color,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.searchbaricon_fontsize),
                                                    marginEnd: 3,
                                                }}
                                            />
                                            <TextInput
                                                underlineColorAndroid="transparent"
                                                placeholder={lang.search}
                                                placeholderTextColor={'#ccc'}
                                                editable={false}
                                                style={[generalstyles.poppinsMedium, { paddingLeft: 5 }]}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </View>
                        {sectionproperties.searchbar_show == 'Show' &&
                            sectionproperties.showlowerheadersection == 'Show' &&
                            CurrentPageIdContext != '646b6b548179d' &&
                            CurrentPageIdContext != '6478a08d39da1' &&
                            CurrentPageIdContext != '65c1923798126' &&
                            CurrentPageIdContext != '65c19c6d1099d' && (
                                <View
                                    style={{
                                        paddingLeft: 15,
                                        paddingRight: 15,
                                        backgroundColor: sectionproperties.lowersection_backgroundColor,
                                        paddingBottom: 10,
                                    }}
                                >
                                    <View style={[generalstyles.flexRow, { paddingLeft: 10, paddingRight: 10, marginTop: StyleParseToIntFuncContext(sectionproperties.searchbarcont_marginTop) }]}>
                                        <TouchableOpacity
                                            style={[
                                                {
                                                    width: '100%',
                                                    padding: Platform.OS === 'ios' ? 10 : 5,
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                    flexDirection: 'row',
                                                    backgroundColor: sectionproperties.searchbarcont_bgcolor,
                                                    height: StyleParseToIntFuncContext(
                                                        sectionproperties.searchbarcont_height != null && sectionproperties.searchbarcont_height != undefined
                                                            ? sectionproperties.searchbarcont_height
                                                            : 50,
                                                    ),
                                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.searchbarcont_borderBottomLeftRadius, '', true),
                                                    borderColor: sectionproperties.searchbarcontinput_bordercolor,
                                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.searchbarcontinput_borderwidth, '', true),
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    shadowColor: sectionproperties.searchbarcontinputshadowcolor,
                                                    shadowOpacity: StyleParseToIntFuncContext(sectionproperties.searchbarcontinput_borderwidth, '', true) == 0 ? 0.1 : 0,
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: StyleParseToIntFuncContext(sectionproperties.searchbarcontinput_borderwidth, '', true) == 0 ? 3 : 0,
                                                    },
                                                    shadowRadius: StyleParseToIntFuncContext(sectionproperties.searchbarcontinput_borderwidth, '', true) == 0 ? 3 : 0,
                                                    elevation: StyleParseToIntFuncContext(sectionproperties.searchbarcontinput_borderwidth, '', true) == 0 ? 1 : 0,
                                                },
                                            ]}
                                            onPress={() => {
                                                routingcountext(StaticPagesLinksContext.Search);
                                            }}
                                        >
                                            <Feather
                                                name="search"
                                                style={{
                                                    color: sectionproperties.searchbaricon_color,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.searchbaricon_fontsize),
                                                    marginEnd: 3,
                                                }}
                                            />
                                            <TextInput
                                                underlineColorAndroid="transparent"
                                                placeholder={lang.search}
                                                placeholderTextColor={'#ccc'}
                                                editable={false}
                                                style={[generalstyles.poppinsMedium, { paddingLeft: 5, height: '100%' }]}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}

                        {fetchAuthorizationQueryContext?.data?.data?.loggedin &&
                            fetchAuthorizationQueryContext?.data?.data?.customerinfo != undefined &&
                            fetchAuthorizationQueryContext?.data?.data?.customerinfo.subscriptionuser.isusersubscribed == true &&
                            sectionproperties.showsubscription == 'Show' && (
                                <View
                                    style={[
                                        generalstyles.flexColumn,
                                        {
                                            width: '100%',
                                            paddingHorizontal: 15,
                                            width: '100%',
                                            marginBottom: 10,
                                            paddingTop: 15,
                                            paddingBottom: 15,
                                            backgroundColor: 'white',
                                        },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'left',
                                            fontSize: 14,
                                            color: '#000',
                                            fontFamily: 'Poppins-Medium',
                                        }}
                                    >
                                        {langdetect == 'en' ? 'Subscribed in' : 'مشترك فى'}: {fetchAuthorizationQueryContext?.data?.data?.customerinfo?.subscription_name}
                                    </Text>
                                </View>
                            )}
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

export default Header5;
