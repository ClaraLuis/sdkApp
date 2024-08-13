import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { icons, SIZES } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { Feather, SimpleLineIcons, FontAwesome5, AntDesign, MaterialCommunityIcons } from 'react-native-vector-icons';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { useDispatch, useSelector } from 'react-redux';
import { urlEndpoint } from '../../../../config/imagekit';
import { ImageComponent } from '../../../ImageComponent';
const Header6 = (props) => {
    const { lang, langdetect } = useContext(LanguageContext);
    const { CurrentPageIdContext, ProjectOpenrcTypeContext, StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { fetchcustomercartQueryContext, templateproperties_context, fetchAuthorizationQueryContext } = useContext(FetchingContext);
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
                    styles.headercont,
                    {
                        backgroundColor: sectionproperties.headerstyles_bgtransparent == 'Transparent' ? 'transparent' : sectionproperties.header_backgroundColor,
                        paddingBottom: StyleParseToIntFuncContext(
                            sectionproperties.header_paddingBottom != null && sectionproperties.header_paddingBottom != undefined ? sectionproperties.header_paddingBottom : 0,
                        ),
                        paddingTop: StyleParseToIntFuncContext(
                            sectionproperties.header_paddingTop != null && sectionproperties.header_paddingTop != undefined ? sectionproperties.header_paddingTop : 0,
                        ),
                        paddingLeft:
                            langdetect == 'en'
                                ? StyleParseToIntFuncContext(
                                      sectionproperties.header_paddingLeft != null && sectionproperties.header_paddingLeft != undefined ? sectionproperties.header_paddingLeft : 0,
                                  )
                                : StyleParseToIntFuncContext(
                                      sectionproperties.header_paddingRight != null && sectionproperties.header_paddingRight != undefined ? sectionproperties.header_paddingRight : 0,
                                  ),
                        paddingRight:
                            langdetect == 'en'
                                ? StyleParseToIntFuncContext(
                                      sectionproperties.header_paddingRight != null && sectionproperties.header_paddingRight != undefined ? sectionproperties.header_paddingRight : 0,
                                  )
                                : StyleParseToIntFuncContext(
                                      sectionproperties.header_paddingLeft != null && sectionproperties.header_paddingLeft != undefined ? sectionproperties.header_paddingLeft : 0,
                                  ),
                        marginBottom: StyleParseToIntFuncContext(
                            sectionproperties.header_marginBottom != null && sectionproperties.header_marginBottom != undefined ? sectionproperties.header_marginBottom : 0,
                        ),
                    },
                ]}
            >
                {Object.keys(sectionproperties).length != 0 && (
                    <View style={[generalstyles.flexColumn, { width: '100%' }]}>
                        <View style={[generalstyles.flexRow]}>
                            <TouchableOpacity
                                style={[
                                    generalstyles.allcentered,
                                    {
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        flexDirection: 'row',
                                        width: StyleParseToIntFuncContext(sectionproperties.searchbarcont_width),
                                        height: StyleParseToIntFuncContext(sectionproperties.searchbarcont_height),
                                        backgroundColor: sectionproperties.searchbarcont_bgcolortransparent == 'Transparent' ? 'transparent' : sectionproperties.searchbarcont_bgcolor,
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.searchbarcont_borderBottomLeftRadius, '', true),
                                        display: 'flex',
                                        alignItems: 'center',
                                        display:
                                            fetchAuthorizationQueryContext?.data?.data?.loggedin == true
                                                ? 'flex'
                                                : templateproperties_context?.hidebottomnavwhenlogin == 'Hide' && fetchAuthorizationQueryContext?.data?.data?.loggedin == false
                                                ? 'none'
                                                : 'flex',
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
                                    }}
                                />
                            </TouchableOpacity>
                            <View style={[generalstyles.flexRow, { flex: 1, justifyContent: 'center' }]}>
                                <View
                                    style={[
                                        {
                                            width: StyleParseToIntFuncContext(
                                                templateproperties_context.logo_width != null && templateproperties_context.logo_width != undefined ? templateproperties_context.logo_width : 120,
                                            ),
                                            height: StyleParseToIntFuncContext(
                                                templateproperties_context.logo_height != null && templateproperties_context.logo_height != undefined ? templateproperties_context.logo_height : 70,
                                            ),
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            alignContent: 'center',
                                        },
                                    ]}
                                    // onPress={() => {
                                    //     routingcountext(StaticPagesLinksContext.GeneralProductsComponent);
                                    // }}
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
                            </View>
                            <View
                                style={[
                                    generalstyles.flexRow,
                                    {
                                        display:
                                            fetchAuthorizationQueryContext?.data?.data?.loggedin == true
                                                ? 'flex'
                                                : templateproperties_context?.hidebottomnavwhenlogin == 'Hide' && fetchAuthorizationQueryContext?.data?.data?.loggedin == false
                                                ? 'none'
                                                : 'flex',
                                    },
                                ]}
                            >
                                {sectionproperties.favBtnShow == 'Show' && (
                                    <TouchableOpacity
                                        onPress={() => {
                                            routingcountext(StaticPagesLinksContext.Wishlist);
                                        }}
                                        style={[
                                            generalstyles.allcentered,
                                            {
                                                width: StyleParseToIntFuncContext(
                                                    sectionproperties.favBtnWidth != null && sectionproperties.favBtnWidth != undefined ? sectionproperties.favBtnWidth : 50,
                                                ),
                                                height: StyleParseToIntFuncContext(
                                                    sectionproperties.favBtnHeight != null && sectionproperties.favBtnHeight != undefined ? sectionproperties.favBtnHeight : 50,
                                                ),
                                                backgroundColor: sectionproperties.favbtn_bgtransparent == 'Transparent' ? 'transparent' : sectionproperties.favBtnbgColor,
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
                                    </TouchableOpacity>
                                )}
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
                                                backgroundColor: sectionproperties.cartbtn_bgtransparent == 'Transparent' ? 'transparent' : sectionproperties.cartBtnbgColor,
                                                borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth, '', true),
                                                borderColor: sectionproperties.cartbtnbordercolor,
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
                                                {fetchcustomercartQueryContext.isSuccess &&
                                                    fetchcustomercartQueryContext?.data?.data?.customercart != null &&
                                                    sectionproperties.badgeshowcounter == 'Show' && (
                                                        <Text
                                                            style={{
                                                                fontFamily: 'Poppins-Medium',
                                                                color: sectionproperties.badge_color,
                                                                fontSize: StyleParseToIntFuncContext(sectionproperties.badge_fontsize),
                                                                paddingLeft: langdetect == 'en' ? (Platform.OS === 'ios' ? 1 : 0) : 0,
                                                                paddingRight: langdetect != 'en' ? (Platform.OS === 'ios' ? 1 : 0) : 0,
                                                                paddingTop: 1,
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

export default Header6;
