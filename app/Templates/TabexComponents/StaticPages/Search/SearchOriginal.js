import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, SafeAreaView, FlatList } from 'react-native';
import { icons, SIZES, COLORS, images } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SpinnerButton from 'react-native-spinner-button';
import { urlEndpoint } from '../../../../config/imagekit';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ImageComponent } from '../../../ImageComponent';

const Search = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const navigation = useNavigation();
    const { lang, langdetect } = useContext(LanguageContext);
    const { CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { SearchHeaderInputContext, SearchHeaderMutationContext, setSearchHeaderInputContext, setProductInfoIdContext, fetchAuthorizationQueryContext } = useContext(FetchingContext);
    const { StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { routingcountext, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [StatePageProperties, setStatePageProperties] = useState({});
    useEffect(() => {
        StatePageProperties11.pages.forEach(function (item, index) {
            if (CurrentPageIdContext == item.pageid) {
                setStatePageProperties(item.pageobj);
            }
        });
    }, [StatePageProperties11]);
    useEffect(() => {
        var secpropobj = {};
        if (StatePageProperties != undefined && StatePageProperties.pageobj != undefined && StatePageProperties.pageobj.pageproperties != undefined) {
            StatePageProperties.pageobj.pageproperties.forEach(function (sectionitem, sectionindex) {
                secpropobj[sectionitem.property_css_name] = sectionitem.property_value;
            });
        }
        setsectionproperties({ ...secpropobj });
    }, [StatePageProperties]);

    return (
        <View style={[generalstyles.containerInner, { height: SIZES.height }]}>
            <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false} style={{ height: '100%' }}>
                {Object.keys(sectionproperties).length != 0 && (
                    <SafeAreaView
                        style={{
                            marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop, '', true),
                        }}
                    >
                        <View style={[generalstyles.flexRow]}>
                            <TouchableOpacity
                                style={{
                                    width: 35,
                                    height: 35,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: sectionproperties.generalbtn_bgColor,
                                    borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertopleftradius, '', true),
                                    borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertoprightradius, '', true),
                                    borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomleftradius, '', true),
                                    borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomrightradius, '', true),
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderwidth, '', true),
                                    borderColor: sectionproperties.generalbtn_bordercolor,
                                    marginEnd: 10,
                                }}
                                onPress={() => {
                                    navigation.goBack();
                                }}
                            >
                                <MaterialIcons
                                    name={langdetect == 'en' ? 'keyboard-arrow-left' : 'keyboard-arrow-right'}
                                    size={StyleParseToIntFuncContext(sectionproperties.generalbtn_fontsize)}
                                    style={{ color: sectionproperties.generalbtn_textColor }}
                                />
                            </TouchableOpacity>
                            <View
                                style={[
                                    generalstyles.flexRow,
                                    {
                                        flex: 1,
                                        width: '100%',
                                        paddingStart: 10,
                                        paddingEnd: 10,
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        // padding: 10,
                                        backgroundColor: sectionproperties.searchbarcont_bgcolor,
                                        fontSize: 17,
                                        height: StyleParseToIntFuncContext(
                                            sectionproperties.searchbarcont_height != null && sectionproperties.searchbarcont_height != undefined ? sectionproperties.searchbarcont_height : 40,
                                        ),
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.searchbarcont_borderBottomLeftRadius, '', true),
                                        borderColor: sectionproperties.searchbarcontinput_bordercolor,
                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.searchbarcontinput_borderwidth, '', true),
                                    },
                                ]}
                            >
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
                                    value={SearchHeaderInputContext}
                                    onChangeText={(value) => {
                                        setSearchHeaderInputContext(value);
                                    }}
                                    placeholderTextColor={'#ccc'}
                                    style={[
                                        {
                                            paddingLeft: 5,
                                            paddingRight: 5,
                                            color: sectionproperties.searchbarcontinput_color,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.searchbarcontinput_fontsize),
                                            width: '100%',
                                            fontFamily:
                                                sectionproperties.searchbarcont_inputfontweight == 300
                                                    ? 'Poppins-Thin'
                                                    : sectionproperties.searchbarcont_inputfontweight == 400
                                                    ? 'Poppins-Light'
                                                    : sectionproperties.searchbarcont_inputfontweight == 500
                                                    ? 'Poppins-Regular'
                                                    : sectionproperties.searchbarcont_inputfontweight == 600
                                                    ? 'Poppins-Medium'
                                                    : sectionproperties.searchbarcont_inputfontweight == 700
                                                    ? 'Poppins-Semibold'
                                                    : 'Poppins-Bold',
                                            textAlign: langdetect == 'en' ? 'left' : 'right',
                                            flex: 1,
                                        },
                                    ]}
                                />
                            </View>
                        </View>
                        {SearchHeaderMutationContext.isLoading && (
                            <View style={[generalstyles.allcentered, { width: '100%', height: 400 }]}>
                                <SpinnerButton buttonStyle={{ width: 50, height: 50 }} isLoading={true} indicatorCount={10} spinnerType={'MaterialIndicator'} spinnerColor={'#000'}></SpinnerButton>
                            </View>
                        )}
                        {!SearchHeaderMutationContext.isLoading && SearchHeaderMutationContext.isSuccess && (
                            <View style={{ paddingTop: 15 }}>
                                {SearchHeaderMutationContext.data.data.products.length == 0 && (
                                    <View style={[generalstyles.allcentered, { height: 400 }]}>
                                        <Feather name="layers" size={30} style={{ color: '#ccc', marginBottom: 10 }} />
                                        <Text style={[generalstyles.poppinsMedium, { color: '#ccc', fontSize: 18 }]}>{lang.couldnotfindproduct}</Text>
                                    </View>
                                )}
                                {SearchHeaderMutationContext.data.data.products.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setProductInfoIdContext(item.productid);
                                                routingcountext(StaticPagesLinksContext.ProductInfo);
                                            }}
                                        >
                                            <View style={[generalstyles.flexRow, { marginBottom: 15 }]}>
                                                <View
                                                    style={{
                                                        width: StyleParseToIntFuncContext(sectionproperties.searchlist_prodimage_borderradius) == '100' ? 55 : 70,
                                                        height: StyleParseToIntFuncContext(sectionproperties.searchlist_prodimage_borderradius) == '100' ? 55 : 70,
                                                        backgroundColor: sectionproperties.searchlist_prodimage_bgcolor,
                                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.searchlist_prodimage_borderradius, '', true),
                                                        marginEnd: 7,
                                                    }}
                                                >
                                                    <ImageComponent
                                                        path={'/tr:w-' + sectionproperties.searchlistimagetr_w + ',h-' + sectionproperties.searchlistimagetr_h + '/' + item.defaultimagepath}
                                                        resizeMode="cover"
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.searchlist_prodimage_borderradius, '', true),
                                                        }}
                                                    />
                                                </View>
                                                <View style={{ marginBottom: 'auto', marginTop: sectionproperties.showpricesection == 'Hide' ? 'auto' : 0 }}>
                                                    <Text
                                                        ellipsizeMode="tail"
                                                        numberOfLines={3}
                                                        style={[
                                                            {
                                                                color: sectionproperties.searchlist_prodNameColor,
                                                                fontSize: StyleParseToIntFuncContext(sectionproperties.searchlist_prodNameFontSize),
                                                                fontFamily:
                                                                    sectionproperties.searchlist_prodNameFontWeight == 300
                                                                        ? 'Poppins-Thin'
                                                                        : sectionproperties.searchlist_prodNameFontWeight == 400
                                                                        ? 'Poppins-Light'
                                                                        : sectionproperties.searchlist_prodNameFontWeight == 500
                                                                        ? 'Poppins-Regular'
                                                                        : sectionproperties.searchlist_prodNameFontWeight == 600
                                                                        ? 'Poppins-Medium'
                                                                        : sectionproperties.searchlist_prodNameFontWeight == 700
                                                                        ? 'Poppins-Semibold'
                                                                        : 'Poppins-Bold',
                                                                textTransform:
                                                                    sectionproperties.searchlist_prodNameTextTranform == 'Uppercase'
                                                                        ? 'uppercase'
                                                                        : sectionproperties.searchlist_prodNameTextTranform == 'Capitalize'
                                                                        ? 'capitalize'
                                                                        : 'lowercase',
                                                            },
                                                        ]}
                                                    >
                                                        {langdetect == 'en' ? item.name_en : item.name_ar}
                                                    </Text>
                                                    {sectionproperties.showpricesection == 'Show' && (
                                                        <View style={[generalstyles.flexRow, { alignItems: 'center' }]}>
                                                            <Text
                                                                style={[
                                                                    {
                                                                        color: sectionproperties.searchlist_prodPriceColor,
                                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.searchlist_prodpriceFontSize),
                                                                        fontFamily:
                                                                            sectionproperties.searchlist_prodPriceFontWeight == 300
                                                                                ? 'Poppins-Thin'
                                                                                : sectionproperties.searchlist_prodPriceFontWeight == 400
                                                                                ? 'Poppins-Light'
                                                                                : sectionproperties.searchlist_prodPriceFontWeight == 500
                                                                                ? 'Poppins-Regular'
                                                                                : sectionproperties.searchlist_prodPriceFontWeight == 600
                                                                                ? 'Poppins-Medium'
                                                                                : sectionproperties.searchlist_prodPriceFontWeight == 700
                                                                                ? 'Poppins-Semibold'
                                                                                : 'Poppins-Bold',
                                                                    },
                                                                ]}
                                                            >
                                                                {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''}{' '}
                                                                {item.hassale == 1 ? item.defaultsaleprice : item.defaultprice}{' '}
                                                                {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                                                            </Text>
                                                            {item.hassale == 1 && (
                                                                <Text
                                                                    style={[
                                                                        {
                                                                            color: sectionproperties.searchlist_prodsalePriceColor,
                                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.searchlist_prodsalepriceFontSize),
                                                                            fontFamily:
                                                                                sectionproperties.searchlist_prodsalePriceFontWeight == 300
                                                                                    ? 'Poppins-Thin'
                                                                                    : sectionproperties.searchlist_prodsalePriceFontWeight == 400
                                                                                    ? 'Poppins-Light'
                                                                                    : sectionproperties.searchlist_prodsalePriceFontWeight == 500
                                                                                    ? 'Poppins-Regular'
                                                                                    : sectionproperties.searchlist_prodsalePriceFontWeight == 600
                                                                                    ? 'Poppins-Medium'
                                                                                    : sectionproperties.searchlist_prodsalePriceFontWeight == 700
                                                                                    ? 'Poppins-Semibold'
                                                                                    : 'Poppins-Bold',
                                                                            textDecorationLine: 'line-through',
                                                                            textDecorationStyle: 'solid',
                                                                        },
                                                                    ]}
                                                                >
                                                                    {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''} {item.defaultprice}{' '}
                                                                    {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                                                                </Text>
                                                            )}
                                                        </View>
                                                    )}
                                                </View>
                                            </View>
                                            <View style={{ backgroundColor: '#ccc', width: '100%', height: 0.5, marginBottom: 10 }}></View>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        )}
                    </SafeAreaView>
                )}
            </KeyboardAwareScrollView>
        </View>
    );
};
const styles = StyleSheet.create({});

export default Search;
