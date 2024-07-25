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

const CategoriesCollections = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const { lang, langdetect } = useContext(LanguageContext);
    const navigation = useNavigation();
    const { ProjectOpenrcTypeContext, StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { StaticPagesLinksContext, routingcountext } = useContext(TemplateRoutingContext);
    const { FetchQueriesEngineContext, setFetchQueriesEngineContext, fetchCategoriesQueryContext } = useContext(FetchingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [StatePageProperties, setStatePageProperties] = useState({});
    const [Choosenindex, setChoosenindex] = useState(0);
    useEffect(() => {
        var tempFetchQueriesEngineContext = FetchQueriesEngineContext;
        tempFetchQueriesEngineContext.categories = true;
        setFetchQueriesEngineContext({ ...tempFetchQueriesEngineContext });
        fetchCategoriesQueryContext.data.data.categories.forEach(function (item, index) {
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
    const [bgimagearrayofobjs, setbgimagearrayofobjs] = useState([]);
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

    return (
        <SafeAreaView>
            <View style={[generalstyles.flexColumn, generalstyles.containerInner, { paddingEnd: 0 }]}>
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default CategoriesCollections;
