import React, { useState, useContext, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, Linking, I18nManager, TextInput } from 'react-native';
import { SIZES, icons } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { MaterialIcons, SimpleLineIcons, Feather, FontAwesome5, MaterialCommunityIcons, AntDesign, Ionicons } from 'react-native-vector-icons';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { urlEndpoint } from '../../../../config/imagekit';
import { ImageComponent } from '../../../ImageComponent';
import ModalSelector from 'react-native-modal-selector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';

const Header1 = (props) => {
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
    const changelang = async (lang) => {
        await AsyncStorage.setItem('lang', lang);
        if (lang == 'ar') {
            I18nManager.allowRTL(true);
            I18nManager.forceRTL(true);
            // setlangdetect('ar');
        } else {
            I18nManager.allowRTL(false);
            I18nManager.forceRTL(false);
            // setlangdetect('en');
        }
        // setlang(lang);
        // setswipeablePanelActive(false);
        // Restart();
        // Updates.reloadAsync();
        await Updates.reloadAsync();
    };
    const cardsrender = React.useMemo(() => {
        return (
            <View
                style={[
                    styles.headercont,
                    {
                        // height: imagesarray.length != 0  ? StyleParseToIntFuncContext(sectionproperties.image_height) : StyleParseToIntFuncContext(sectionproperties.header_height),
                        // paddingBottom:!fetchAuthorizationQueryContext?.data?.data?.loggedin? StyleParseToIntFuncContext(sectionproperties.header_paddingTop) :'',
                        marginBottom: StyleParseToIntFuncContext(
                            sectionproperties.header_marginBottom != null && sectionproperties.header_marginBottom != undefined ? sectionproperties.header_marginBottom : 0,
                        ),
                        height:
                            fetchAuthorizationQueryContext?.data?.data?.loggedin == true
                                ? imagesarray.length != 0
                                    ? StyleParseToIntFuncContext(sectionproperties.image_height)
                                    : 'auto'
                                : imagesarray.length != 0
                                ? StyleParseToIntFuncContext(sectionproperties.header_height)
                                : 'auto',
                    },
                ]}
            >
                {Object.keys(sectionproperties).length != 0 && (
                    <>
                        <View
                            style={[
                                generalstyles.flexColumn,
                                {
                                    width: SIZES.width,
                                    backgroundColor: sectionproperties.headerstyles_bgtransparent == 'Transparent' ? 'transparent' : sectionproperties.header_backgroundColor,
                                    borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties?.header_borderBottomLeftRadius, '', true),
                                    borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties?.header_BorderBottomRightRadius, '', true),
                                    borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties?.header_borderTopLeftRadius, '', true),
                                    borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties?.header_borderTopRightRadius, '', true),
                                    borderLeftWidth: StyleParseToIntFuncContext(sectionproperties.borderleftwidth),
                                    borderRightWidth: StyleParseToIntFuncContext(sectionproperties.borderrightwidth),
                                    borderTopWidth: StyleParseToIntFuncContext(sectionproperties.headerborderverticalwidth, '', true),
                                    borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.headerborderverticalwidth, '', true),
                                    borderColor: sectionproperties.headerbordercolor,
                                },
                            ]}
                        >
                            <ImageComponent
                                path={imagesarray.length != 0 ? '/tr:w-400,h-70/' + (langdetect == 'en' ? imagesarray[0]?.bgsection_image : imagesarray[0]?.bgsection_image_ar) : ''}
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height:
                                        fetchAuthorizationQueryContext?.data?.data?.loggedin == true
                                            ? StyleParseToIntFuncContext(sectionproperties.image_height)
                                            : StyleParseToIntFuncContext(sectionproperties.header_height),
                                    borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties?.header_borderBottomLeftRadius, '', true),
                                    borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties?.header_BorderBottomRightRadius, '', true),
                                    borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties?.header_borderTopLeftRadius, '', true),
                                    borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties?.header_borderTopRightRadius, '', true),
                                    resizeMode: 'cover',
                                }}
                            />
                            {imagesarray.length != 0 && (
                                <View
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: fetchAuthorizationQueryContext?.data?.data?.loggedin
                                            ? StyleParseToIntFuncContext(sectionproperties.image_height)
                                            : StyleParseToIntFuncContext(sectionproperties.header_height),
                                        backgroundColor: sectionproperties.image_bgcolor,
                                        opacity: 0.6,
                                        borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties?.header_borderBottomLeftRadius, '', true),
                                        borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties?.header_BorderBottomRightRadius, '', true),
                                        borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties?.header_borderTopLeftRadius, '', true),
                                        borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties?.header_borderTopRightRadius, '', true),
                                    }}
                                />
                            )}
                            <View
                                style={{
                                    paddingLeft:
                                        langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.header_paddingLeft) : StyleParseToIntFuncContext(sectionproperties.header_paddingRight),
                                    paddingRight:
                                        langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.header_paddingRight) : StyleParseToIntFuncContext(sectionproperties.header_paddingLeft),
                                    paddingTop: StyleParseToIntFuncContext(sectionproperties.header_paddingTop),
                                    paddingBottom: fetchAuthorizationQueryContext?.data?.data?.loggedin
                                        ? StyleParseToIntFuncContext(sectionproperties.header_paddingBottom)
                                        : StyleParseToIntFuncContext(sectionproperties.header_paddingTop),
                                }}
                            >
                                <View style={[generalstyles.flexRow]}>
                                    <View style={[generalstyles.flexRow, { justifyContent: 'flex-start', flex: 1 }]}>
                                        {sectionproperties.removeonclick != 'Remove' && (
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
                                        )}
                                        {sectionproperties.removeonclick == 'Remove' && (
                                            <View
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
                                            </View>
                                        )}
                                    </View>
                                    <View style={[generalstyles.flexRow, { justifyContent: 'flex-end' }]}>
                                        {sectionproperties.searchbar_show == 'Show' && (
                                            <TouchableOpacity
                                                style={[
                                                    {
                                                        width: StyleParseToIntFuncContext(sectionproperties.searchbarcont_width),
                                                        height: StyleParseToIntFuncContext(sectionproperties.searchbarcont_height),
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        alignContent: 'center',
                                                        backgroundColor: sectionproperties.searchbarcont_bgcolortransparent == 'Transparent' ? 'transparent' : sectionproperties.searchbarcont_bgcolor,
                                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.searchbarcont_borderBottomLeftRadius, '', true),
                                                        marginHorizontal: 10,
                                                    },
                                                ]}
                                                onPress={() => {
                                                    routingcountext(StaticPagesLinksContext.Search);
                                                }}
                                            >
                                                <Feather
                                                    name="search"
                                                    size={
                                                        Platform.OS === 'ios'
                                                            ? StyleParseToIntFuncContext(sectionproperties.searchbaricon_fontsize)
                                                            : StyleParseToIntFuncContext(sectionproperties.searchbaricon_fontsize) - 2
                                                    }
                                                    style={{
                                                        color: sectionproperties.searchbaricon_color,
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        )}
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
                                                        backgroundColor: sectionproperties.favbtn_bgtransparent == 'Transparent' ? 'transparent' : sectionproperties.favBtnbgColor,
                                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.fav_btn_borderBottomLeftRadius, '', true),
                                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.favbtnborderwidth, '', true),
                                                        borderColor: sectionproperties.favbtnbordercolor,
                                                        marginHorizontal: sectionproperties.favbtn_bgtransparent == 'Transparent' ? 0 : 10,
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
                                                        width: StyleParseToIntFuncContext(sectionproperties.cartBtnWidth, 35),
                                                        height: StyleParseToIntFuncContext(sectionproperties.cartBtnHeight, 35),
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
                                                        {fetchcustomercartQueryContext.isSuccess &&
                                                            fetchcustomercartQueryContext?.data?.data?.customercart != null &&
                                                            sectionproperties.badge_fontsize != 0 && (
                                                                <Text
                                                                    style={{
                                                                        paddingLeft: langdetect == 'en' ? (Platform.OS == 'ios' ? 1 : 0) : 0,
                                                                        paddingRight: langdetect == 'ar' ? (Platform.OS == 'ios' ? 1 : 0) : 0,
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
                                                        transform: [{ rotateY: langdetect == 'en' ? '180deg' : '0deg' }],
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        )}
                                        {sectionproperties.showlanuagecontainer == 'Show' && (
                                            <View
                                                style={{
                                                    width: StyleParseToIntFuncContext(sectionproperties.cartBtnWidth, 35),
                                                    height: StyleParseToIntFuncContext(sectionproperties.cartBtnHeight, 35),
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    alignContent: 'center',
                                                }}
                                            >
                                                <ModalSelector
                                                    data={[
                                                        { label: 'English', key: 'en' },
                                                        { label: 'لغة عربية', key: 'ar' },
                                                    ]}
                                                    initValue="Select"
                                                    supportedOrientations={['portrait']}
                                                    accessible={true}
                                                    scrollViewAccessibilityLabel={'Scrollable options'}
                                                    cancelButtonAccessibilityLabel={'Cancel Button'}
                                                    onChange={(event) => {
                                                        changelang(event.key);
                                                    }}
                                                    optionTextStyle={{
                                                        color: 'black',
                                                        fontFamily: 'Poppins-Medium',
                                                        textTransform: 'capitalize',
                                                    }}
                                                    selectTextStyle={{
                                                        color: 'orange',
                                                        fontFamily: 'Poppins-Medium',
                                                        textTransform: 'capitalize',
                                                    }}
                                                    cancelTextStyle={{
                                                        color: 'black',
                                                        fontFamily: 'Poppins-Medium',
                                                        textTransform: 'capitalize',
                                                    }}
                                                >
                                                    <Feather name="globe" size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)} color={sectionproperties.cart_iconcolor} />
                                                </ModalSelector>
                                            </View>
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
                            {sectionproperties.showlowerheadersection == 'Show' && (
                                <View
                                    style={[
                                        generalstyles.flexColumn,
                                        {
                                            backgroundColor: sectionproperties.lowersection_bgcolortransparent == 'Transparent' ? 'transparent' : sectionproperties.lowersection_backgroundColor,
                                            // backgroundColor: 'red',
                                            borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties?.headerlowersection_borderBottomLeftRadius, '', true),
                                            borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties?.lowersection_BorderBottomRightRadius, '', true),
                                            borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties?.lowersection_borderTopLeftRadius, '', true),
                                            borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties?.lowersection_borderTopRightRadius, '', true),
                                            paddingTop: StyleParseToIntFuncContext(sectionproperties?.lowersection_paddingtop, '', true),
                                            paddingBottom: StyleParseToIntFuncContext(sectionproperties?.lowersection_paddingbottom, '', true),
                                        },
                                    ]}
                                ></View>
                            )}
                        </View>
                    </>
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

export default Header1;
