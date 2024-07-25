import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Image, FlatList, ScrollView, TextInput, TextArea } from 'react-native';
import { icons, SIZES, COLORS } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import Feather from 'react-native-vector-icons/Feather';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { urlEndpoint } from '../../../../config/imagekit';
import { useNavigation } from '@react-navigation/native';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { ImageComponent } from '../../../ImageComponent';
const CategoriesCollections = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const { lang, langdetect } = useContext(LanguageContext);
    const navigation = useNavigation();
    const { ProjectOpenrcTypeContext, StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { StaticPagesLinksContext, routingcountext } = useContext(TemplateRoutingContext);
    const { FetchQueriesEngineContext, setFetchQueriesEngineContext, fetchCategoriesQueryContext, fetchAuthorizationQueryContext } = useContext(FetchingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [StatePageProperties, setStatePageProperties] = useState({});
    const [Choosenindex, setChoosenindex] = useState(0);
    const [pcollarray, setpcollarray] = useState([]);
    const [bgimagearrayofobjs, setbgimagearrayofobjs] = useState([]);

    useEffect(() => {
        var tempFetchQueriesEngineContext = FetchQueriesEngineContext;
        tempFetchQueriesEngineContext.categories = true;
        setFetchQueriesEngineContext({ ...tempFetchQueriesEngineContext });
        fetchCategoriesQueryContext?.data?.data?.categories?.forEach(function (item, index) {
            item.isChecked = false;
        });
        fetchCategoriesQueryContext.data.data.categories[0].isChecked = true;
    }, []);
    useEffect(() => {
        StatePageProperties11.pages.forEach(function (item, index) {
            if (CurrentPageIdContext == item.pageid) {
                setStatePageProperties(item.pageobj);
            }
        });
    }, [StatePageProperties11]);
    useEffect(() => {
        var secpropobj = {};
        if (Object.keys(StatePageProperties).length != 0) {
            if (StatePageProperties?.pageobj != undefined && StatePageProperties?.pageobj?.pageproperties != undefined) {
                StatePageProperties?.pageobj?.pageproperties?.forEach(function (sectionitem, sectionindex) {
                    secpropobj[sectionitem.property_css_name] = sectionitem.property_value;
                });
            }
            setsectionproperties({ ...secpropobj });
        }
    }, [StatePageProperties]);
    useEffect(() => {
        if (sectionproperties.length != 0 && sectionproperties.arrayofobjectimagesonly != undefined && sectionproperties.arrayofobjectimagesonly.length != 0) {
            var arrayofobjectimagesonlyparsed = JSON.parse(sectionproperties.arrayofobjectimagesonly);
            if (Array.isArray(arrayofobjectimagesonlyparsed)) {
                setbgimagearrayofobjs([...arrayofobjectimagesonlyparsed]);
            }
        }
    }, [sectionproperties]);
    const generalproductsnavigation = () => {
        navigation.navigate(StaticPagesLinksContext.GeneralProductsComponent);
    };
    useEffect(() => {
        var temppcollarray = [...pcollarray];
        // fetchCategoriesQueryContext?.data?.data?.categories?.forEach(function (arrayItem) {
        fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcategories?.forEach(function (arrayItem) {
            arrayItem?.parentcolletions?.forEach(function (item, index) {
                if (item.isinftiler == 1 && item.isshowntocustomers == 1) {
                    temppcollarray.push(item);
                }
            });
        });
        setpcollarray([...temppcollarray]);
    }, [fetchAuthorizationQueryContext.isSuccess]);
    return (
        <SafeAreaView style={{ backgroundColor: sectionproperties.backgroundColor }}>
            <View style={[generalstyles.flexColumn, { paddingStart: 15, paddingEnd: sectionproperties.cardstyletype == 'Style 2' ? 15 : 0 }]}>
                <View
                    style={{
                        width: '100%',
                        marginTop: StyleParseToIntFuncContext(sectionproperties.sectionTitleMarginTop),
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.sectionTitleMarginBottom),
                        justifyContent: sectionproperties.sectiontitleposition == 'Centered' ? 'center' : 'flex-start',
                        alignItems: sectionproperties.sectiontitleposition == 'Centered' ? 'center' : 'flex-start',
                    }}
                >
                    <Text
                        style={{
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
                                    : sectionproperties.sectiontitlefontfamily == 'ASUL'
                                    ? sectionproperties.sectionTitleFontWeight == 300
                                        ? 'Asul-Regular'
                                        : sectionproperties.sectionTitleFontWeight == 400
                                        ? 'Asul-Regular'
                                        : sectionproperties.sectionTitleFontWeight == 500
                                        ? 'Asul-Regular'
                                        : sectionproperties.sectionTitleFontWeight == 600
                                        ? 'Asul-Bold'
                                        : sectionproperties.sectionTitleFontWeight == 700
                                        ? 'Asul-Bold'
                                        : 'Poppins-Medium'
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
                </View>
                {sectionproperties.cardstyletype == 'Style 2' && (
                    <View style={{ width: '100%', paddingTop: 20 }}>
                        {sectionproperties.fetchparenttype == 'Categories' &&
                            fetchCategoriesQueryContext?.data?.data?.categories.length != 0 &&
                            fetchCategoriesQueryContext?.data?.data?.categories?.map(function (catitem, catindex) {
                                if (catitem.isshowntocustomers == 1 && catitem.isinftiler == 1) {
                                    return (
                                        <View
                                            style={[
                                                generalstyles.flexColumn,
                                                {
                                                    marginBottom: 10,
                                                    backgroundColor: sectionproperties.reservation_bgcolor,
                                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.reservation_borderradius),
                                                    paddingTop: StyleParseToIntFuncContext(sectionproperties.reservation_padding_top),
                                                    paddingBottom: StyleParseToIntFuncContext(sectionproperties.reservation_padding_bottom),
                                                    paddingRight: StyleParseToIntFuncContext(sectionproperties.reservation_padding_right),
                                                    paddingLeft: StyleParseToIntFuncContext(sectionproperties.reservation_padding_left),
                                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.innersectionborderWidth, '', true),
                                                    borderColor: sectionproperties.innersectionborderColor,
                                                },
                                            ]}
                                        >
                                            <Collapse>
                                                <CollapseHeader>
                                                    <View style={[generalstyles.flexRow]}>
                                                        <View style={[generalstyles.flexRow, { flex: 1 }]}>
                                                            <View
                                                                style={[
                                                                    {
                                                                        width: 60,
                                                                        height: 60,
                                                                        marginEnd: 10,
                                                                        backgroundColor: sectionproperties.image_bgcolor,
                                                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.imageborderradius),
                                                                        overflow: 'hidden',
                                                                    },
                                                                ]}
                                                            >
                                                                <ImageComponent
                                                                    style={{
                                                                        width: '100%',
                                                                        height: '100%',
                                                                    }}
                                                                    resizeMode="contain"
                                                                    path={'/tr:w-' + sectionproperties.imagetr_w + ',h-' + sectionproperties.imagetr_h + '/' + catitem.categorylogo}
                                                                />
                                                            </View>
                                                            <Text
                                                                style={[
                                                                    {
                                                                        color: sectionproperties.subheader_categorytitle_fontColor,
                                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.subheader_categorytitle_fontSize),
                                                                        fontFamily:
                                                                            sectionproperties.subheader_categorytitle_textfontweight == 300
                                                                                ? 'Poppins-Thin'
                                                                                : sectionproperties.subheader_categorytitle_textfontweight == 400
                                                                                ? 'Poppins-Light'
                                                                                : sectionproperties.subheader_categorytitle_textfontweight == 500
                                                                                ? 'Poppins-Regular'
                                                                                : sectionproperties.subheader_categorytitle_textfontweight == 600
                                                                                ? 'Poppins-Medium'
                                                                                : sectionproperties.subheader_categorytitle_textfontweight == 700
                                                                                ? 'Poppins-Semibold'
                                                                                : 'Poppins-Bold',
                                                                        textTransform:
                                                                            sectionproperties.subheader_categorytitle_textTransform == 'Uppercase'
                                                                                ? 'uppercase'
                                                                                : sectionproperties.subheader_categorytitle_textTransform == 'Capitalize'
                                                                                ? 'capitalize'
                                                                                : sectionproperties.subheader_categorytitle_textTransform == 'None'
                                                                                ? 'none'
                                                                                : 'lowercase',
                                                                        textAlign: 'left',
                                                                    },
                                                                ]}
                                                            >
                                                                {langdetect == 'en' ? catitem.title_en : catitem.title_ar}
                                                            </Text>
                                                        </View>
                                                        <View
                                                            style={[
                                                                generalstyles.allcentered,
                                                                {
                                                                    width: StyleParseToIntFuncContext(sectionproperties.iconcontainerwidth),
                                                                    height: StyleParseToIntFuncContext(sectionproperties.iconcontainerheight),
                                                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.iconcontainerborderbl),
                                                                    backgroundColor: sectionproperties.iconcontainerbg,
                                                                },
                                                            ]}
                                                        >
                                                            <AntDesign
                                                                name="plus"
                                                                size={StyleParseToIntFuncContext(sectionproperties.iconcontainer_iconfontsize)}
                                                                color={sectionproperties.iconcontainercolor}
                                                            />
                                                        </View>
                                                    </View>
                                                </CollapseHeader>
                                                <CollapseBody>
                                                    <View style={[generalstyles.flexColumn, generalstyles.allcentered, { display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }]}>
                                                        <View style={{ height: 1, width: '100%', backgroundColor: '#eee', marginVertical: 10 }} />
                                                        <View style={{ width: '100%', paddingHorizontal: 10 }}>
                                                            {/* <TouchableOpacity
                                                        style={[
                                                            generalstyles.allcentered,
                                                            {
                                                                marginBottom: 5,
                                                                backgroundColor: sectionproperties.innersectiontitlebgcolor,
                                                                borderRadius: StyleParseToIntFuncContext(sectionproperties.innersectiontitleborderradius),
                                                                paddingHorizontal: 10,
                                                                paddingVertical: 10,
                                                                marginBottom: 15,
                                                            },
                                                        ]}
                                                        onPress={() => {
                                                            //here
                                                        }}
                                                    >
                                                        <Text
                                                            style={[
                                                                {
                                                                    color: sectionproperties.subheader_categorytitle_fontColor,
                                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.subheader_categorytitle_fontSize),
                                                                    fontFamily:
                                                                        sectionproperties.subheader_categorytitle_textfontweight == 300
                                                                            ? 'Poppins-Thin'
                                                                            : sectionproperties.subheader_categorytitle_textfontweight == 400
                                                                            ? 'Poppins-Light'
                                                                            : sectionproperties.subheader_categorytitle_textfontweight == 500
                                                                            ? 'Poppins-Regular'
                                                                            : sectionproperties.subheader_categorytitle_textfontweight == 600
                                                                            ? 'Poppins-Medium'
                                                                            : sectionproperties.subheader_categorytitle_textfontweight == 700
                                                                            ? 'Poppins-Semibold'
                                                                            : 'Poppins-Bold',
                                                                    textTransform:
                                                                        sectionproperties.subheader_categorytitle_textTransform == 'Uppercase'
                                                                            ? 'uppercase'
                                                                            : sectionproperties.subheader_categorytitle_textTransform == 'Capitalize'
                                                                            ? 'capitalize'
                                                                            : sectionproperties.subheader_categorytitle_textTransform == 'None'
                                                                            ? 'none'
                                                                            : 'lowercase',
                                                                    textAlign: 'left',
                                                                },
                                                            ]}
                                                        >
                                                            {langdetect == 'en' ? 'Shop All' : 'تسوق جميع'} {langdetect == 'en' ? catitem.title_en : catitem.title_ar}
                                                        </Text>
                                                    </TouchableOpacity> */}
                                                            <FlatList
                                                                data={catitem?.parentcolletions}
                                                                renderItem={({ item, index }) => {
                                                                    if (item.isshowntocustomers == 1 && item.isinftiler == 1) {
                                                                        return (
                                                                            <View style={[generalstyles.flexRow, { width: '100%', marginBottom: 15 }]}>
                                                                                <Collapse style={{ width: '100%' }}>
                                                                                    <CollapseHeader style={{ width: '100%' }}>
                                                                                        <View style={[generalstyles.flexRow, { width: '100%' }]}>
                                                                                            <View style={[generalstyles.flexRow, { flex: 1 }]}>
                                                                                                {sectionproperties.pcoleectionshowimages == 'Show' && (
                                                                                                    <View style={[{ width: 60, height: 60, marginEnd: 10, overflow: 'hidden', borderRadius: 15 }]}>
                                                                                                        <ImageComponent
                                                                                                            style={{
                                                                                                                width: '100%',
                                                                                                                height: '100%',
                                                                                                            }}
                                                                                                            resizeMode="contain"
                                                                                                            path={item.parentcollectionlogo}
                                                                                                        />
                                                                                                    </View>
                                                                                                )}
                                                                                                <Text
                                                                                                    style={[
                                                                                                        {
                                                                                                            color: sectionproperties.subheader_collectiontitle_fontColor,
                                                                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.subheader_collectiontitle_fontSize),
                                                                                                            fontFamily:
                                                                                                                sectionproperties.subheader_collectiontitle_textfontweight == 300
                                                                                                                    ? 'Poppins-Thin'
                                                                                                                    : sectionproperties.subheader_collectiontitle_textfontweight == 400
                                                                                                                    ? 'Poppins-Light'
                                                                                                                    : sectionproperties.subheader_collectiontitle_textfontweight == 500
                                                                                                                    ? 'Poppins-Regular'
                                                                                                                    : sectionproperties.subheader_collectiontitle_textfontweight == 600
                                                                                                                    ? 'Poppins-Medium'
                                                                                                                    : sectionproperties.subheader_collectiontitle_textfontweight == 700
                                                                                                                    ? 'Poppins-Semibold'
                                                                                                                    : 'Poppins-Bold',
                                                                                                            textTransform:
                                                                                                                sectionproperties.subheader_collectiontitle_textTransform == 'Uppercase'
                                                                                                                    ? 'uppercase'
                                                                                                                    : sectionproperties.subheader_collectiontitle_textTransform == 'Capitalize'
                                                                                                                    ? 'capitalize'
                                                                                                                    : sectionproperties.subheader_collectiontitle_textTransform == 'None'
                                                                                                                    ? 'none'
                                                                                                                    : 'lowercase',
                                                                                                            textAlign: 'left',
                                                                                                        },
                                                                                                    ]}
                                                                                                >
                                                                                                    {langdetect == 'en' ? item.title_en : item.title_ar}
                                                                                                </Text>
                                                                                            </View>
                                                                                            <View style={[generalstyles.allcentered]}>
                                                                                                <MaterialIcons name="keyboard-arrow-down" size={25} color={'#000'} />
                                                                                            </View>
                                                                                        </View>
                                                                                    </CollapseHeader>
                                                                                    <CollapseBody>
                                                                                        <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
                                                                                            {/* <TouchableOpacity
                                                                                    style={[
                                                                                        generalstyles.allcentered,
                                                                                        {
                                                                                            marginBottom: 5,
                                                                                            backgroundColor: sectionproperties.innersectiontitlebgcolor,
                                                                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.innersectiontitleborderradius),
                                                                                            paddingHorizontal: 10,
                                                                                            paddingVertical: 10,
                                                                                            marginBottom: 15,
                                                                                        },
                                                                                    ]}
                                                                                    onPress={() => {
                                                                                        //here
                                                                                    }}
                                                                                >
                                                                                    <Text
                                                                                        style={[
                                                                                            {
                                                                                                color: sectionproperties.subheader_collectiontitle_fontColor,
                                                                                                fontSize: StyleParseToIntFuncContext(sectionproperties.subheader_collectiontitle_fontSize),
                                                                                                fontFamily:
                                                                                                    sectionproperties.subheader_collectiontitle_textfontweight == 300
                                                                                                        ? 'Poppins-Thin'
                                                                                                        : sectionproperties.subheader_collectiontitle_textfontweight == 400
                                                                                                        ? 'Poppins-Light'
                                                                                                        : sectionproperties.subheader_collectiontitle_textfontweight == 500
                                                                                                        ? 'Poppins-Regular'
                                                                                                        : sectionproperties.subheader_collectiontitle_textfontweight == 600
                                                                                                        ? 'Poppins-Medium'
                                                                                                        : sectionproperties.subheader_collectiontitle_textfontweight == 700
                                                                                                        ? 'Poppins-Semibold'
                                                                                                        : 'Poppins-Bold',
                                                                                                textTransform:
                                                                                                    sectionproperties.subheader_collectiontitle_textTransform == 'Uppercase'
                                                                                                        ? 'uppercase'
                                                                                                        : sectionproperties.subheader_collectiontitle_textTransform == 'Capitalize'
                                                                                                        ? 'capitalize'
                                                                                                        : sectionproperties.subheader_collectiontitle_textTransform == 'None'
                                                                                                        ? 'none'
                                                                                                        : 'lowercase',
                                                                                                textAlign: 'left',
                                                                                            },
                                                                                        ]}
                                                                                    >
                                                                                        {langdetect == 'en' ? 'Shop All' : 'تسوق جميع'} {langdetect == 'en' ? item.title_en : item.title_ar}
                                                                                    </Text>
                                                                                </TouchableOpacity> */}
                                                                                            {item?.collections.map(function (collectionitem, collectionindex) {
                                                                                                return (
                                                                                                    <TouchableOpacity
                                                                                                        style={[generalstyles.flexRow, { width: '100%' }]}
                                                                                                        onPress={() => {
                                                                                                            navigation.navigate('TemplateDraftRouter', {
                                                                                                                screen: StaticPagesLinksContext.GeneralProductsComponent,
                                                                                                                params: {
                                                                                                                    genprodcompstinfo: {
                                                                                                                        collectionid: collectionitem.collectionid,
                                                                                                                        srcfrom: 'GeneralProductsComponent',
                                                                                                                        fetchingtype: 'collections',
                                                                                                                    },
                                                                                                                },
                                                                                                            });
                                                                                                        }}
                                                                                                    >
                                                                                                        <View style={[generalstyles.flexRow, { flex: 1 }]}>
                                                                                                            {sectionproperties.showcollectionimage == 'Show' && (
                                                                                                                <View style={[{ width: 60, height: 60, marginEnd: 10 }]}>
                                                                                                                    <ImageComponent
                                                                                                                        style={{
                                                                                                                            width: '100%',
                                                                                                                            height: '100%',
                                                                                                                            borderRadius: 15,
                                                                                                                        }}
                                                                                                                        resizeMode="contain"
                                                                                                                        path={collectionitem.collectionlogo}
                                                                                                                    />
                                                                                                                </View>
                                                                                                            )}
                                                                                                            <Text
                                                                                                                style={[
                                                                                                                    {
                                                                                                                        color: sectionproperties.collectionsectiontextcolor,
                                                                                                                        fontSize: StyleParseToIntFuncContext(
                                                                                                                            sectionproperties.collectionsectiontextfontsize,
                                                                                                                        ),
                                                                                                                        fontFamily:
                                                                                                                            sectionproperties.collectionsectiontextfontweight == 300
                                                                                                                                ? 'Poppins-Thin'
                                                                                                                                : sectionproperties.collectionsectiontextfontweight == 400
                                                                                                                                ? 'Poppins-Light'
                                                                                                                                : sectionproperties.collectionsectiontextfontweight == 500
                                                                                                                                ? 'Poppins-Regular'
                                                                                                                                : sectionproperties.collectionsectiontextfontweight == 600
                                                                                                                                ? 'Poppins-Medium'
                                                                                                                                : sectionproperties.collectionsectiontextfontweight == 700
                                                                                                                                ? 'Poppins-Semibold'
                                                                                                                                : 'Poppins-Bold',
                                                                                                                        textTransform:
                                                                                                                            sectionproperties.collectionsectiontexttransform == 'Uppercase'
                                                                                                                                ? 'uppercase'
                                                                                                                                : sectionproperties.collectionsectiontexttransform == 'Capitalize'
                                                                                                                                ? 'capitalize'
                                                                                                                                : sectionproperties.collectionsectiontexttransform == 'None'
                                                                                                                                ? 'none'
                                                                                                                                : 'lowercase',
                                                                                                                        textAlign: 'left',
                                                                                                                    },
                                                                                                                ]}
                                                                                                            >
                                                                                                                {langdetect == 'en' ? collectionitem.title_en : collectionitem.title_ar}
                                                                                                            </Text>
                                                                                                        </View>
                                                                                                    </TouchableOpacity>
                                                                                                );
                                                                                            })}
                                                                                        </View>
                                                                                    </CollapseBody>
                                                                                </Collapse>
                                                                            </View>
                                                                        );
                                                                    }
                                                                }}
                                                                numColumns={1}
                                                                vertical
                                                            />
                                                        </View>
                                                    </View>
                                                </CollapseBody>
                                            </Collapse>
                                        </View>
                                    );
                                }
                            })}
                        {/* <Text>{JSON.stringify()}</Text> */}
                        {sectionproperties.fetchparenttype == 'Parent Collections' &&
                            pcollarray?.map(function (catitem, catindex) {
                                if (catitem.isshowntocustomers == 1 && catitem.isinftiler == 1) {
                                    return (
                                        <View
                                            style={[
                                                generalstyles.flexColumn,
                                                {
                                                    marginBottom: 10,
                                                    backgroundColor: sectionproperties.reservation_bgcolor,
                                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.reservation_borderradius),
                                                    paddingTop: StyleParseToIntFuncContext(sectionproperties.reservation_padding_top),
                                                    paddingBottom: StyleParseToIntFuncContext(sectionproperties.reservation_padding_bottom),
                                                    paddingRight: StyleParseToIntFuncContext(sectionproperties.reservation_padding_right),
                                                    paddingLeft: StyleParseToIntFuncContext(sectionproperties.reservation_padding_left),
                                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.innersectionborderWidth, '', true),
                                                    borderColor: sectionproperties.innersectionborderColor,
                                                },
                                            ]}
                                        >
                                            <Collapse>
                                                <CollapseHeader>
                                                    <View style={[generalstyles.flexRow]}>
                                                        <View style={[generalstyles.flexRow, { flex: 1 }]}>
                                                            <View
                                                                style={[
                                                                    {
                                                                        width: 60,
                                                                        height: 60,
                                                                        marginEnd: 10,
                                                                        backgroundColor: sectionproperties.image_bgcolor,
                                                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.imageborderradius),
                                                                        overflow: 'hidden',
                                                                    },
                                                                ]}
                                                            >
                                                                <ImageComponent
                                                                    style={{
                                                                        width: '100%',
                                                                        height: '100%',
                                                                    }}
                                                                    resizeMode="contain"
                                                                    path={'/tr:w-' + sectionproperties.imagetr_w + ',h-' + sectionproperties.imagetr_h + '/' + catitem.parentcollectionlogo}
                                                                />
                                                            </View>
                                                            <Text
                                                                style={[
                                                                    {
                                                                        color: sectionproperties.subheader_categorytitle_fontColor,
                                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.subheader_categorytitle_fontSize),
                                                                        fontFamily:
                                                                            sectionproperties.subheader_categorytitle_textfontweight == 300
                                                                                ? 'Poppins-Thin'
                                                                                : sectionproperties.subheader_categorytitle_textfontweight == 400
                                                                                ? 'Poppins-Light'
                                                                                : sectionproperties.subheader_categorytitle_textfontweight == 500
                                                                                ? 'Poppins-Regular'
                                                                                : sectionproperties.subheader_categorytitle_textfontweight == 600
                                                                                ? 'Poppins-Medium'
                                                                                : sectionproperties.subheader_categorytitle_textfontweight == 700
                                                                                ? 'Poppins-Semibold'
                                                                                : 'Poppins-Bold',
                                                                        textTransform:
                                                                            sectionproperties.subheader_categorytitle_textTransform == 'Uppercase'
                                                                                ? 'uppercase'
                                                                                : sectionproperties.subheader_categorytitle_textTransform == 'Capitalize'
                                                                                ? 'capitalize'
                                                                                : sectionproperties.subheader_categorytitle_textTransform == 'Lowercase'
                                                                                ? 'lowercase'
                                                                                : 'none',
                                                                        textAlign: 'left',
                                                                    },
                                                                ]}
                                                            >
                                                                {langdetect == 'en' ? catitem.title_en : catitem.title_ar}
                                                            </Text>
                                                        </View>
                                                        {/* <View
                                                        style={[
                                                            generalstyles.allcentered,
                                                            {
                                                                width: StyleParseToIntFuncContext(sectionproperties.iconcontainerwidth),
                                                                height: StyleParseToIntFuncContext(sectionproperties.iconcontainerheight),
                                                                borderRadius: StyleParseToIntFuncContext(sectionproperties.iconcontainerborderbl),
                                                                backgroundColor: sectionproperties.iconcontainerbg,
                                                            },
                                                        ]}
                                                    >
                                                        <AntDesign
                                                            name="plus"
                                                            size={StyleParseToIntFuncContext(sectionproperties.iconcontainer_iconfontsize)}
                                                            color={sectionproperties.iconcontainercolor}
                                                        />
                                                    </View> */}
                                                    </View>
                                                </CollapseHeader>
                                                <CollapseBody>
                                                    <View style={[generalstyles.flexColumn, generalstyles.allcentered, { display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }]}>
                                                        <View style={{ height: 1, width: '100%', backgroundColor: '#eee', marginVertical: 10 }} />
                                                        <TouchableOpacity
                                                            style={[
                                                                generalstyles.allcentered,
                                                                {
                                                                    backgroundColor: sectionproperties.innersectiontitlebgcolor,
                                                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.innersectiontitleborderradius),
                                                                    paddingHorizontal: 10,
                                                                    paddingVertical: 10,
                                                                    marginTop: 10,
                                                                    marginBottom: 0,
                                                                    marginStart: 'auto',
                                                                },
                                                            ]}
                                                            onPress={() => {
                                                                //here
                                                                navigation.navigate('TemplateDraftRouter', {
                                                                    screen: StaticPagesLinksContext?.GeneralProductsComponent,
                                                                    params: {
                                                                        genprodcompstinfo: {
                                                                            collectionid: catitem?.parentcollectionid,
                                                                            srcfrom: 'GeneralProductsComponent',
                                                                            fetchingtype: 'products',
                                                                            parenttype: 'Parent Collections',
                                                                        },
                                                                    },
                                                                });
                                                            }}
                                                        >
                                                            <Text
                                                                style={[
                                                                    {
                                                                        color: sectionproperties.subheader_categorytitle_fontColor,
                                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.subheader_categorytitle_fontSize),
                                                                        fontFamily:
                                                                            sectionproperties.subheader_categorytitle_textfontweight == 300
                                                                                ? 'Poppins-Thin'
                                                                                : sectionproperties.subheader_categorytitle_textfontweight == 400
                                                                                ? 'Poppins-Light'
                                                                                : sectionproperties.subheader_categorytitle_textfontweight == 500
                                                                                ? 'Poppins-Regular'
                                                                                : sectionproperties.subheader_categorytitle_textfontweight == 600
                                                                                ? 'Poppins-Medium'
                                                                                : sectionproperties.subheader_categorytitle_textfontweight == 700
                                                                                ? 'Poppins-Semibold'
                                                                                : 'Poppins-Bold',
                                                                        textTransform:
                                                                            sectionproperties.subheader_categorytitle_textTransform == 'Uppercase'
                                                                                ? 'uppercase'
                                                                                : sectionproperties.subheader_categorytitle_textTransform == 'Capitalize'
                                                                                ? 'capitalize'
                                                                                : sectionproperties.subheader_categorytitle_textTransform == 'None'
                                                                                ? 'none'
                                                                                : 'lowercase',
                                                                        textAlign: 'left',
                                                                    },
                                                                ]}
                                                            >
                                                                {langdetect == 'en' ? 'Shop All' : 'تسوق جميع'} {langdetect == 'en' ? catitem.title_en : catitem.title_ar}
                                                            </Text>
                                                        </TouchableOpacity>
                                                        <View style={{ width: '100%', paddingHorizontal: 10 }}>
                                                            <FlatList
                                                                data={catitem?.collections}
                                                                renderItem={({ item, index }) => {
                                                                    if (item.isshowntocustomers == 1 && item.isinftiler == 1) {
                                                                        return (
                                                                            <TouchableOpacity
                                                                                style={[generalstyles.flexColumn, { width: '100%' }]}
                                                                                onPress={() => {
                                                                                    navigation.navigate('TemplateDraftRouter', {
                                                                                        screen: StaticPagesLinksContext.GeneralProductsComponent,
                                                                                        params: {
                                                                                            genprodcompstinfo: {
                                                                                                collectionid: item.collectionid,
                                                                                                srcfrom: 'GeneralProductsComponent',
                                                                                                fetchingtype: 'collections',
                                                                                            },
                                                                                        },
                                                                                    });
                                                                                }}
                                                                            >
                                                                                <View style={[generalstyles.flexRow, { flex: 1 }]}>
                                                                                    {sectionproperties.showcollectionimage == 'Show' && (
                                                                                        <View style={[{ width: 60, height: 60, marginEnd: 10 }]}>
                                                                                            <ImageComponent
                                                                                                style={{
                                                                                                    width: '100%',
                                                                                                    height: '100%',
                                                                                                    borderRadius: 15,
                                                                                                }}
                                                                                                resizeMode="contain"
                                                                                                path={item.collectionlogo}
                                                                                            />
                                                                                        </View>
                                                                                    )}
                                                                                    <Text
                                                                                        style={[
                                                                                            {
                                                                                                color: sectionproperties.collectionsectiontextcolor,
                                                                                                fontSize: StyleParseToIntFuncContext(sectionproperties.collectionsectiontextfontsize),
                                                                                                fontFamily:
                                                                                                    sectionproperties.collectionsectiontextfontweight == 300
                                                                                                        ? 'Poppins-Thin'
                                                                                                        : sectionproperties.collectionsectiontextfontweight == 400
                                                                                                        ? 'Poppins-Light'
                                                                                                        : sectionproperties.collectionsectiontextfontweight == 500
                                                                                                        ? 'Poppins-Regular'
                                                                                                        : sectionproperties.collectionsectiontextfontweight == 600
                                                                                                        ? 'Poppins-Medium'
                                                                                                        : sectionproperties.collectionsectiontextfontweight == 700
                                                                                                        ? 'Poppins-Semibold'
                                                                                                        : 'Poppins-Bold',
                                                                                                textTransform:
                                                                                                    sectionproperties.collectionsectiontexttransform == 'Uppercase'
                                                                                                        ? 'uppercase'
                                                                                                        : sectionproperties.collectionsectiontexttransform == 'Capitalize'
                                                                                                        ? 'capitalize'
                                                                                                        : sectionproperties.collectionsectiontexttransform == 'None'
                                                                                                        ? 'none'
                                                                                                        : 'lowercase',
                                                                                                textAlign: 'left',
                                                                                            },
                                                                                        ]}
                                                                                    >
                                                                                        {langdetect == 'en' ? item.title_en : item.title_ar}
                                                                                    </Text>
                                                                                </View>
                                                                                {index != catitem?.collections.length - 1 && (
                                                                                    <View
                                                                                        style={{
                                                                                            marginVertical: 10,
                                                                                            width: '100%',
                                                                                            height: 1,
                                                                                            backgroundColor: '#eee',
                                                                                        }}
                                                                                    />
                                                                                )}
                                                                            </TouchableOpacity>
                                                                        );
                                                                    }
                                                                }}
                                                                numColumns={1}
                                                                vertical
                                                            />
                                                        </View>
                                                    </View>
                                                </CollapseBody>
                                            </Collapse>
                                        </View>
                                    );
                                }
                            })}
                    </View>
                )}

                {sectionproperties.cardstyletype == 'Style 1' && (
                    <View style={[generalstyles.flexRow, generalstyles.allcentered, { display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }]}>
                        <Text
                            style={{
                                fontFamily: 'Poppins-Medium',
                                fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
                                marginBottom: 10,
                                marginBottom: StyleParseToIntFuncContext(
                                    sectionproperties.sectionTitleMarginBottom != null && sectionproperties.sectionTitleMarginBottom != undefined ? sectionproperties.sectionTitleMarginBottom : 10,
                                ),
                                color: sectionproperties.sectionTitleColor,
                                textTransform:
                                    sectionproperties.sectionTitleTextTransform == 'Uppercase'
                                        ? 'uppercase'
                                        : sectionproperties.sectionTitleTextTransform == 'Capitalize' || sectionproperties.sectionTitleTextTransform == 'capitalize'
                                        ? 'capitalize'
                                        : sectionproperties.sectionTitleTextTransform == 'None'
                                        ? 'none'
                                        : 'lowercase',
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
                            }}
                        >
                            {lang.categories}
                        </Text>
                        <View style={[generalstyles.flexRow]}>
                            <View style={{ width: '30%' }}>
                                <FlatList
                                    data={fetchCategoriesQueryContext.data.data.categories}
                                    vertical
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={(event) => {
                                                    setChoosenindex(index);
                                                    fetchCategoriesQueryContext.data.data.categories.forEach(function (item, index) {
                                                        item.isChecked = false;
                                                    });
                                                    fetchCategoriesQueryContext.data.data.categories[index].isChecked = true;
                                                }}
                                                style={[
                                                    generalstyles.flexColumn,
                                                    generalstyles.allcentered,
                                                    {
                                                        backgroundColor: item.isChecked == true ? sectionproperties.activetabbgcolor : sectionproperties.tabcontainerbgcolor,
                                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.tabcontainerborderradius, '', true),
                                                        marginBottom: 10,
                                                        flexShrink: 1,
                                                        marginEnd: 5,
                                                        paddingBottom: 7,
                                                        height: 50,
                                                        paddingStart: 10,
                                                        paddingEnd: 10,
                                                    },
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        {
                                                            marginTop: 5,
                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.tabtextfontsize),
                                                            color: item.isChecked == true ? sectionproperties.tabtextactivecolor : sectionproperties.tabtextcolor,
                                                            textTransform:
                                                                sectionproperties.tabtexttexttransform == 'Uppercase'
                                                                    ? 'uppercase'
                                                                    : sectionproperties.tabtexttexttransform == 'Capitalize'
                                                                    ? 'capitalize'
                                                                    : sectionproperties.tabtexttexttransform == 'None'
                                                                    ? 'none'
                                                                    : 'lowercase',
                                                            fontFamily:
                                                                sectionproperties.tabtextfontweight == 300
                                                                    ? 'Poppins-Thin'
                                                                    : sectionproperties.tabtextfontweight == 400
                                                                    ? 'Poppins-Light'
                                                                    : sectionproperties.tabtextfontweight == 500
                                                                    ? 'Poppins-Regular'
                                                                    : sectionproperties.tabtextfontweight == 600
                                                                    ? 'Poppins-Medium'
                                                                    : sectionproperties.tabtextfontweight == 700
                                                                    ? 'Poppins-Semibold'
                                                                    : 'Poppins-Bold',
                                                        },
                                                    ]}
                                                >
                                                    {langdetect == 'en' ? item.title_en : item.title_ar}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    }}
                                />
                            </View>
                            <View style={{ width: '70%', paddingStart: 10, paddingEnd: 10, height: SIZES.height }}>
                                {sectionproperties.showbgimage == 'Show' && (
                                    <View
                                        style={{
                                            height: StyleParseToIntFuncContext(sectionproperties.image_height),
                                            width: '100%',
                                            marginBottom: StyleParseToIntFuncContext(sectionproperties.image_mb),
                                        }}
                                    >
                                        <Image
                                            source={{
                                                uri: bgimagearrayofobjs != undefined && bgimagearrayofobjs.length != 0 ? urlEndpoint + bgimagearrayofobjs[0].bgsection_image : '',
                                            }}
                                            resizeMode={sectionproperties.bgcovercontain == 'Cover' ? 'cover' : 'contain'}
                                            style={[
                                                {
                                                    borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true),
                                                    borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true),
                                                    borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true),
                                                    borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true),
                                                    position: 'absolute',
                                                    top: 0,
                                                    bottom: 0,
                                                    left: 0,
                                                    right: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                },
                                            ]}
                                        />
                                    </View>
                                )}
                                <View style={[generalstyles.flexColumn, { marginTop: 20 }]}>
                                    {Choosenindex.length != 0 && fetchCategoriesQueryContext.data.data.categories[Choosenindex].parentcolletions.length != 0 && (
                                        <FlatList
                                            data={fetchCategoriesQueryContext.data.data.categories[Choosenindex].parentcolletions}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <TouchableOpacity
                                                        style={[
                                                            generalstyles.flexColumn,
                                                            {
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                marginBottom: 10,
                                                                marginHorizontal: 5,
                                                                width: 70,
                                                            },
                                                        ]}
                                                        onPress={() => {
                                                            generalproductsnavigation();
                                                        }}
                                                    >
                                                        <View style={[{ width: '100%', height: 60 }]}>
                                                            <Image
                                                                source={{ uri: urlEndpoint + item.parentcollectionlogo }}
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    borderRadius: 15,
                                                                }}
                                                                resizeMode="contain"
                                                            />
                                                        </View>
                                                        <View
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            }}
                                                        >
                                                            <Text
                                                                style={[
                                                                    {
                                                                        marginTop: 5,
                                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.collectionsectiontextfontsize),
                                                                        color: sectionproperties.collectionsectiontextcolor,
                                                                        fontFamily:
                                                                            sectionproperties.collectionsectiontextfontweight == 300
                                                                                ? 'Poppins-Thin'
                                                                                : sectionproperties.collectionsectiontextfontweight == 400
                                                                                ? 'Poppins-Light'
                                                                                : sectionproperties.collectionsectiontextfontweight == 500
                                                                                ? 'Poppins-Regular'
                                                                                : sectionproperties.collectionsectiontextfontweight == 600
                                                                                ? 'Poppins-Medium'
                                                                                : sectionproperties.collectionsectiontextfontweight == 700
                                                                                ? 'Poppins-Semibold'
                                                                                : 'Poppins-Bold',
                                                                        textTransform:
                                                                            sectionproperties.collectionsectiontexttransform == 'Uppercase'
                                                                                ? 'uppercase'
                                                                                : sectionproperties.collectionsectiontexttransform == 'Capitalize'
                                                                                ? 'capitalize'
                                                                                : sectionproperties.collectionsectiontexttransform == 'None'
                                                                                ? 'none'
                                                                                : 'lowercase',
                                                                    },
                                                                ]}
                                                            >
                                                                {langdetect == 'en' ? item.title_en : item.title_ar}
                                                            </Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                );
                                            }}
                                            numColumns={3}
                                            vertical
                                        />
                                    )}
                                    {Choosenindex.length != 0 && fetchCategoriesQueryContext.data.data.categories[Choosenindex].parentcolletions.length == 0 && (
                                        <View style={{ width: '100%', alignItems: 'center', marginTop: 40 }}>
                                            <Feather name={'layers'} size={20} color={'#b2b2b2'} />
                                            <Text style={[generalstyles.poppinsMedium, { fontSize: 15, marginTop: 5, color: '#b2b2b2' }]}>{lang.nocollectionsfound}</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default CategoriesCollections;
