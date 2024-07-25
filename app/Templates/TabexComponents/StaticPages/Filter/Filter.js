import React, { useCallback, useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, SafeAreaView, FlatList } from 'react-native';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import CheckBox from 'react-native-check-box';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { SIZES } from '../../GeneralFiles/constants';
import { useDispatch, useSelector } from 'react-redux';
import RangeSlider from 'rn-range-slider';

import CustomerAddressInformation from '../Signup/CustomerAddressInformation';
const Filter = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const navigation = useNavigation();
    const route = useRoute();
    const { lang, langdetect } = useContext(LanguageContext);
    const { ProjectOpenrcTypeContext, StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { fetchAuthorizationQueryContext, FetchQueriesEngineContext, setFetchQueriesEngineContext } = useContext(FetchingContext);
    const [StatePageProperties, setStatePageProperties] = useState({});
    const [ProductFilterObjContext, setProductFilterObjContextTEMP] = useState(route?.params?.ProductFilterObjContext);
    const setProductFilterObjContext = route?.params?.setProductFilterObjContext;
    const [sectionpageproperties, setsectionpageproperties] = useState('');
    const sectionpropertiesinherited = route?.params?.sectionproperties;

    const [instfilters, setinstfilters] = useState([...fetchAuthorizationQueryContext.data.data.instinfo.instfilters]);
    const [instcollections, setinstcollections] = useState([...fetchAuthorizationQueryContext.data.data.instinfo.instcollections]);
    const [otherfilters, setotherfilters] = useState([
        {
            payloadvalue: 'sortprice',
            name: lang.price,
            filterarray: [
                { name: lang.pricehightolow, value: 'hightolow', isfilterselected: false },
                { name: lang.pricelowtohigh, value: 'lowtohigh', isfilterselected: false },
            ],
        },
        {
            payloadvalue: 'sortdates',

            name: lang.dates,
            filterarray: [
                { name: lang.recent, value: 'recent', isfilterselected: false },
                { name: lang.oldest, value: 'old', isfilterselected: false },
            ],
        },
    ]);
    useEffect(() => {
        StatePageProperties11.pages.forEach(function (item, index) {
            if (CurrentPageIdContext == item.pageid) {
                setStatePageProperties(item.pageobj);
            }
        });
    }, [StatePageProperties11]);
    useEffect(() => {
        filterupdater();
    }, []);
    useEffect(() => {
        filterupdater();
    }, [ProductFilterObjContext]);
    const filterupdater = () => {
        if (instfilters.length != 0) {
            var tempinstfilters = [...instfilters];
            tempinstfilters.forEach(function (instfilteritem, instfilterindex) {
                instfilteritem.productvaluesfilter.forEach(function (valefilteritem, valefilteritemindex) {
                    valefilteritem.isfilterselected = false;
                });
            });
            if (ProductFilterObjContext != undefined) {
                ProductFilterObjContext.FilterOptions.forEach(function (filteritem, filterindex) {
                    tempinstfilters.forEach(function (instfilteritem, instfilterindex) {
                        instfilteritem.productvaluesfilter.forEach(function (valefilteritem, valefilteritemindex) {
                            if (filteritem.valueid == valefilteritem.valueid) {
                                valefilteritem.isfilterselected = true;
                            }
                        });
                    });
                });
            }
            setinstfilters([...tempinstfilters]);
        }
        if (instcollections.length != 0) {
            var isParentCollectionProductFilterObjContext_Grouptyperefid = false;
            var tempInstcollections = [];
            var instcategories = fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcategories;
            // if (ProductFilterObjContext.ProductFetchingType == 'Parent Collection') {
            instcategories?.forEach(function (catitem, catindex) {
                catitem?.parentcolletions?.forEach(function (parentcolitem, parentcolindex) {
                    if (ProductFilterObjContext?.grouptyperefid == parentcolitem?.parentcollectionid) {
                        isParentCollectionProductFilterObjContext_Grouptyperefid = true;
                        parentcolitem?.collections?.forEach(function (colitem, colindex) {
                            tempInstcollections.push(colitem);
                        });
                    }
                });
            });
            if (isParentCollectionProductFilterObjContext_Grouptyperefid == false) {
                var tempInstcollections = [...instcollections];
            }
            // } else {
            //     var tempInstcollections = [...instcollections];
            // }

            tempInstcollections.forEach(function (instfilteritem, valefilteritemindex) {
                instfilteritem.isfilterselected = false;
            });
            if (ProductFilterObjContext != undefined) {
                ProductFilterObjContext.collections.forEach(function (filteritem, filterindex) {
                    tempInstcollections.forEach(function (instfilteritem, instfilterindex) {
                        if (instfilteritem.collectionid == filteritem) {
                            instfilteritem.isfilterselected = true;
                        }
                    });
                });
            }

            setinstcollections([...tempInstcollections]);
        }
    };
    const setfilterfunc = (valueid, valueindex, mainparentindex, type) => {
        var tempfetchproductsfilerobjcontext = { ...ProductFilterObjContext };
        if (type == 'clearfilters') {
            tempfetchproductsfilerobjcontext.FilterOptions = [];
        } else {
            var FilterExists = false;
            tempfetchproductsfilerobjcontext.FilterOptions.forEach(function (filteritem, filterindex) {
                if (filteritem.valueid == valueid) {
                    FilterExists = true;
                    tempfetchproductsfilerobjcontext.FilterOptions.splice(filterindex, 1);
                }
            });
            if (!FilterExists) {
                tempfetchproductsfilerobjcontext.FilterOptions.push({ valueid: valueid });
            }
        }
        if (tempfetchproductsfilerobjcontext.FilterOptions.length == 0) {
            tempfetchproductsfilerobjcontext.isfilter = 0;
        } else {
            tempfetchproductsfilerobjcontext.isfilter = 1;
        }

        setProductFilterObjContextTEMP({ ...tempfetchproductsfilerobjcontext });
    };
    const setCollectionFilterFunc = (collectionid) => {
        var tempfetchproductsfilerobjcontext = { ...ProductFilterObjContext };
        if (ProductFilterObjContext.ProductFetchingType == 'Parent Collection') {
            tempfetchproductsfilerobjcontext.ProductFetchingType = 'Random';
            tempfetchproductsfilerobjcontext.collections = [];
        }

        var CollectionExists = false;

        tempfetchproductsfilerobjcontext.collections.forEach(function (filteritem, filterindex) {
            if (filteritem == collectionid) {
                CollectionExists = true;
                tempfetchproductsfilerobjcontext.collections.splice(filterindex, 1);
            }
        });
        if (!CollectionExists) {
            tempfetchproductsfilerobjcontext.collections.push(collectionid);
        }
        if (ProductFilterObjContext.ProductFetchingType == 'Parent Collection') {
            setProductFilterObjContext({ ...tempfetchproductsfilerobjcontext });
        }
        setProductFilterObjContextTEMP({ ...tempfetchproductsfilerobjcontext });
    };
    useEffect(() => {
        var secpropobj = {};
        if (StatePageProperties.pageobj != undefined && StatePageProperties.pageobj.pageproperties != undefined) {
            StatePageProperties.pageobj.pageproperties.forEach(function (sectionitem, sectionindex) {
                secpropobj[sectionitem.property_css_name] = sectionitem.property_value;
            });
        }
        setsectionpageproperties({ ...secpropobj });
    }, [StatePageProperties]);
    const setcountryfilterobj = () => {};
    return (
        <View
            style={[
                generalstyles.containerInner,
                { height: SIZES.height, backgroundColor: sectionpageproperties.backgroundColor, paddingTop: StyleParseToIntFuncContext(sectionpageproperties.paddingTop, '', true) },
            ]}
        >
            {Object.keys(sectionpageproperties).length != 0 && (
                <SafeAreaView>
                    <View style={[generalstyles.flexRow, { paddingTop: 4, paddingBottom: 10, marginBottom: 10 }]}>
                        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                            <TouchableOpacity
                                style={[
                                    {
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                    },
                                ]}
                                onPress={() => {
                                    navigation.goBack();
                                }}
                            >
                                <AntDesign
                                    name={langdetect == 'en' ? 'arrowleft' : 'arrowright'}
                                    size={StyleParseToIntFuncContext(sectionpageproperties.closeSlider_fontSize)}
                                    style={{
                                        color: sectionpageproperties.closeSlider_color,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={[generalstyles.allcentered, { flex: 1 }]}>
                            <Text
                                style={[
                                    {
                                        color: sectionpageproperties.sectionTitleColor,
                                        fontSize: StyleParseToIntFuncContext(sectionpageproperties.sectionTitleFontSize),
                                        fontFamily:
                                            sectionpageproperties.sectionTitleFontWeight == 300
                                                ? 'Poppins-Thin'
                                                : sectionpageproperties.sectionTitleFontWeight == 400
                                                ? 'Poppins-Light'
                                                : sectionpageproperties.sectionTitleFontWeight == 500
                                                ? 'Poppins-Regular'
                                                : sectionpageproperties.sectionTitleFontWeight == 600
                                                ? 'Poppins-Medium'
                                                : sectionpageproperties.sectionTitleFontWeight == 700
                                                ? 'Poppins-Semibold'
                                                : 'Poppins-Bold',
                                        textTransform:
                                            sectionpageproperties.sectionTitleTextTransform == 'Uppercase'
                                                ? 'uppercase'
                                                : sectionpageproperties.sectionTitleTextTransform == 'Capitalize' || sectionpageproperties.sectionTitleTextTransform == 'capitalize'
                                                ? 'capitalize'
                                                : sectionpageproperties.sectionTitleTextTransform == 'None'
                                                ? 'none'
                                                : 'lowercase',
                                    },
                                ]}
                            >
                                {lang.filter}
                            </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <TouchableOpacity
                                style={[generalstyles.allcentered]}
                                onPress={() => {
                                    var tempProductFilterObjContext = { ...ProductFilterObjContext };
                                    tempProductFilterObjContext.collections = [];
                                    tempProductFilterObjContext.FilterOptions = [];
                                    tempProductFilterObjContext.countryid = 'all';
                                    tempProductFilterObjContext.stateid = 'all';
                                    tempProductFilterObjContext.cityid = 'all';
                                    setProductFilterObjContext(tempProductFilterObjContext);
                                    setProductFilterObjContextTEMP(tempProductFilterObjContext);
                                }}
                            >
                                <Text
                                    style={[
                                        generalstyles.poppinsMedium,
                                        {
                                            color: sectionpageproperties.generalbtn_textColor,
                                            fontSize: StyleParseToIntFuncContext(sectionpageproperties.generalbtn_fontsize),
                                            textDecorationLine: 'underline',
                                        },
                                    ]}
                                >
                                    {lang.clear}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        {sectionpropertiesinherited.otherfilters == 'Show' &&
                            otherfilters.map(function (instfiltersitem, instfiltersindex) {
                                return (
                                    <View style={[generalstyles.flexColumn, { marginBottom: 10 }]}>
                                        <Collapse>
                                            <CollapseHeader>
                                                <View style={[generalstyles.flexRow]}>
                                                    <View style={{ flex: 1 }}>
                                                        <Text
                                                            style={[
                                                                generalstyles.poppinsMedium,
                                                                {
                                                                    marginBottom: 10,
                                                                    color: sectionpageproperties.filter_titlecolor,
                                                                    fontSize: StyleParseToIntFuncContext(sectionpageproperties.filter_titlefontsize),
                                                                    textTransform: 'capitalize',
                                                                    textAlign: 'left',
                                                                },
                                                            ]}
                                                        >
                                                            {instfiltersitem.name}
                                                        </Text>
                                                    </View>
                                                    <AntDesign name="plus" size={18} color={sectionpageproperties.filter_titlecolor} />
                                                </View>
                                            </CollapseHeader>
                                            <CollapseBody>
                                                <View style={[generalstyles.flexRow, generalstyles.allcentered, { display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }]}>
                                                    <FlatList
                                                        vertical
                                                        data={instfiltersitem.filterarray}
                                                        renderItem={({ item, index }) => {
                                                            var ischecked = false;
                                                            if (instfiltersitem.payloadvalue == 'sortprice') {
                                                                if (item.value == ProductFilterObjContext.sortprice) {
                                                                    ischecked = true;
                                                                }
                                                            } else if (instfiltersitem.payloadvalue == 'sortdates') {
                                                                if (item.value == ProductFilterObjContext.sortdates) {
                                                                    ischecked = true;
                                                                }
                                                            }
                                                            return (
                                                                <TouchableOpacity
                                                                    style={[
                                                                        generalstyles.allcentered,
                                                                        {
                                                                            minWidth: 80,
                                                                            height: 32,
                                                                            marginEnd: 2,
                                                                            marginStart: 2,
                                                                            backgroundColor: ischecked ? sectionpageproperties.activecat_color : sectionpageproperties.timeline_text_color,
                                                                            borderRadius: 10,
                                                                            display: 'flex',
                                                                            marginBottom: 5,
                                                                            paddingHorizontal: 10,
                                                                        },
                                                                    ]}
                                                                    onPress={() => {
                                                                        // setfilterfunc(valueitem.valueid, valueindex, index, 'assign');

                                                                        var tempfetchproductsfilerobjcontext = { ...ProductFilterObjContext };
                                                                        if (tempfetchproductsfilerobjcontext[instfiltersitem.payloadvalue] == item.value) {
                                                                            tempfetchproductsfilerobjcontext[instfiltersitem.payloadvalue] = '';
                                                                        } else {
                                                                            tempfetchproductsfilerobjcontext[instfiltersitem.payloadvalue] = item.value;
                                                                        }
                                                                        setProductFilterObjContext({ ...tempfetchproductsfilerobjcontext });
                                                                        setProductFilterObjContextTEMP({ ...tempfetchproductsfilerobjcontext });
                                                                    }}
                                                                >
                                                                    <Text style={[generalstyles.poppinsMedium, { color: 'white', fontSize: 11 }]}>{item.name}</Text>
                                                                </TouchableOpacity>
                                                            );
                                                        }}
                                                        numColumns={4}
                                                    />
                                                </View>
                                            </CollapseBody>
                                        </Collapse>
                                    </View>
                                );
                            })}

                        {sectionpropertiesinherited.showcollectionfilter == 'Show' && instcollections.length != 0 && (
                            <Collapse style={{ marginBottom: 15 }}>
                                <CollapseHeader>
                                    <View style={[generalstyles.flexRow, { marginBottom: 10 }]}>
                                        <View style={{ flex: 1 }}>
                                            <Text
                                                style={[
                                                    {
                                                        textAlign: 'left',
                                                        color: sectionpageproperties.filter_titlecolor,
                                                        fontSize: StyleParseToIntFuncContext(sectionpageproperties.filter_titlefontsize),
                                                        fontFamily:
                                                            sectionpageproperties.filter_titlefontweight == 300
                                                                ? 'Poppins-Thin'
                                                                : sectionpageproperties.filter_titlefontweight == 400
                                                                ? 'Poppins-Light'
                                                                : sectionpageproperties.filter_titlefontweight == 500
                                                                ? 'Poppins-Regular'
                                                                : sectionpageproperties.filter_titlefontweight == 600
                                                                ? 'Poppins-Medium'
                                                                : sectionpageproperties.filter_titlefontweight == 700
                                                                ? 'Poppins-Semibold'
                                                                : 'Poppins-Bold',
                                                        textTransform:
                                                            sectionpageproperties.filter_titletextransform == 'Uppercase'
                                                                ? 'uppercase'
                                                                : sectionpageproperties.filter_titletextransform == 'Capitalize' || sectionpageproperties.sectionTitleTextTransform == 'capitalize'
                                                                ? 'capitalize'
                                                                : sectionpageproperties.filter_titletextransform == 'None'
                                                                ? 'none'
                                                                : 'lowercase',
                                                    },
                                                ]}
                                            >
                                                {lang.collections}
                                            </Text>
                                        </View>
                                        <AntDesign name="plus" size={18} color={sectionpageproperties.filter_titlecolor} />
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                    <View style={[generalstyles.flexColumn, { marginBottom: 10, width: '100%' }]}>
                                        <FlatList
                                            vertical
                                            data={instcollections}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <TouchableOpacity
                                                        style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginBottom: 10, flex: 1, paddingEnd: 10 }}
                                                        onPress={() => {
                                                            setCollectionFilterFunc(item.collectionid);
                                                        }}
                                                    >
                                                        <CheckBox
                                                            disabled={false}
                                                            checkBoxColor={sectionpageproperties.checkbox_color}
                                                            checkedCheckBoxColor={sectionpageproperties.checkbox_checkedcolor}
                                                            style={{}}
                                                            onClick={() => {
                                                                setCollectionFilterFunc(item.collectionid);
                                                            }}
                                                            boxType="circle"
                                                            isChecked={item.isfilterselected}
                                                        />
                                                        <Text
                                                            style={{
                                                                fontFamily: 'Poppins-Medium',
                                                                marginStart: 10,
                                                                color: sectionpageproperties.timeline_text_color,
                                                                fontSize: StyleParseToIntFuncContext(sectionpageproperties.timeline_text_fontsize),
                                                                width: 100,
                                                                textAlign: 'left',
                                                            }}
                                                            numberOfLines={1}
                                                            ellipsizeMode="tail"
                                                        >
                                                            {langdetect == 'en' ? item.title_en : item.title_ar}
                                                        </Text>
                                                    </TouchableOpacity>
                                                );
                                            }}
                                            numColumns={2}
                                        />
                                    </View>
                                </CollapseBody>
                            </Collapse>
                        )}
                        {sectionpropertiesinherited.showvariantsfilter == 'Show' &&
                            instfilters.map(function (instfiltersitem, instfiltersindex) {
                                return (
                                    <View style={[generalstyles.flexColumn, { marginBottom: 15 }]}>
                                        <Collapse>
                                            <CollapseHeader>
                                                <View style={[generalstyles.flexRow, { marginBottom: 10 }]}>
                                                    <View style={{ flex: 1 }}>
                                                        <Text
                                                            style={[
                                                                generalstyles.poppinsMedium,
                                                                {
                                                                    color: sectionpageproperties.filter_titlecolor,
                                                                    fontSize: StyleParseToIntFuncContext(sectionpageproperties.filter_titlefontsize),
                                                                    textTransform: 'capitalize',
                                                                    textAlign: 'left',
                                                                },
                                                            ]}
                                                        >
                                                            {langdetect == 'en' ? instfiltersitem.optionname : instfiltersitem.optionname_ar}
                                                        </Text>
                                                    </View>
                                                    <AntDesign name="plus" size={18} color={sectionpageproperties.filter_titlecolor} />
                                                </View>
                                            </CollapseHeader>
                                            <CollapseBody>
                                                <View style={[generalstyles.flexRow, generalstyles.allcentered, { display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }]}>
                                                    <FlatList
                                                        vertical
                                                        data={instfiltersitem.productvaluesfilter}
                                                        renderItem={({ item, index }) => {
                                                            if (instfiltersitem.optionname.toLowerCase() == 'color') {
                                                                return (
                                                                    <TouchableOpacity
                                                                        style={[
                                                                            generalstyles.allcentered,

                                                                            {
                                                                                width: 30,
                                                                                height: 30,
                                                                                marginEnd: 2,
                                                                                marginStart: 2,
                                                                                borderWidth: item.isfilterselected ? 2 : 0,
                                                                                borderColor: item.color,
                                                                                borderRadius: 50,
                                                                                display: 'flex',
                                                                                marginBottom: 5,
                                                                            },
                                                                        ]}
                                                                        onPress={() => {
                                                                            setfilterfunc(item.valueid, index, instfiltersindex, 'assign');
                                                                        }}
                                                                    >
                                                                        <View
                                                                            style={[
                                                                                {
                                                                                    width: item.isfilterselected ? 20 : 30,
                                                                                    height: item.isfilterselected ? 20 : 30,
                                                                                    borderRadius: item.isfilterselected ? 50 : 10,
                                                                                    backgroundColor: item.valuename,
                                                                                },
                                                                            ]}
                                                                        ></View>
                                                                    </TouchableOpacity>
                                                                );
                                                            } else if (instfiltersitem.optionname.toLowerCase() == 'size') {
                                                                return (
                                                                    <TouchableOpacity
                                                                        style={[
                                                                            generalstyles.allcentered,
                                                                            {
                                                                                width: 32,
                                                                                height: 32,
                                                                                marginEnd: 2,
                                                                                marginStart: 2,
                                                                                backgroundColor: item.isfilterselected
                                                                                    ? sectionpageproperties.activecat_color
                                                                                    : sectionpageproperties.timeline_text_color,
                                                                                borderRadius: 50,
                                                                                display: 'flex',
                                                                                marginBottom: 5,
                                                                            },
                                                                        ]}
                                                                        onPress={() => {
                                                                            setfilterfunc(item.valueid, index, instfiltersindex, 'assign');
                                                                        }}
                                                                    >
                                                                        <Text style={[generalstyles.poppinsMedium, { color: 'white', fontSize: 11 }]}>
                                                                            {langdetect == 'en' ? item.valuename : item.valuename_ar}
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                );
                                                            } else {
                                                                return (
                                                                    <TouchableOpacity
                                                                        style={[
                                                                            generalstyles.allcentered,
                                                                            {
                                                                                minWidth: 80,
                                                                                height: 32,
                                                                                marginEnd: 2,
                                                                                marginStart: 2,
                                                                                backgroundColor: item.isfilterselected
                                                                                    ? sectionpageproperties.activecat_color
                                                                                    : sectionpageproperties.timeline_text_color,
                                                                                borderRadius: 10,
                                                                                display: 'flex',
                                                                                marginBottom: 5,
                                                                            },
                                                                        ]}
                                                                        onPress={() => {
                                                                            setfilterfunc(item.valueid, index, instfiltersindex, 'assign');
                                                                        }}
                                                                    >
                                                                        <Text style={[generalstyles.poppinsMedium, { color: 'white', fontSize: 11 }]}>
                                                                            {langdetect == 'en' ? item.valuename : item.valuename_ar}
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                );
                                                            }
                                                        }}
                                                        numColumns={instfiltersitem.optionname.toLowerCase() == 'color' || instfiltersitem.optionname.toLowerCase() == 'size' ? 10 : 4}
                                                    />
                                                </View>
                                            </CollapseBody>
                                        </Collapse>
                                    </View>
                                );
                            })}
                        {sectionpropertiesinherited.showcountriesfilter == 'Show' && (
                            <CustomerAddressInformation
                                payloadobj={ProductFilterObjContext}
                                setpayloadobj={setProductFilterObjContextTEMP}
                                setpayloadobj2={setProductFilterObjContext}
                                srcfrom={'filter'}
                                sectionproperties={sectionpageproperties}
                            />
                        )}
                    </View>
                    <TouchableOpacity
                        style={[
                            generalstyles.allcentered,
                            {
                                width: SIZES.width - 150,
                                height: StyleParseToIntFuncContext(
                                    sectionpageproperties.applybtn_height != null && sectionpageproperties.applybtn_height != undefined ? sectionpageproperties.applybtn_height : 45,
                                ),
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                marginTop: 20,
                                backgroundColor: sectionpageproperties.applybtn_bgColor,
                                borderRadius: StyleParseToIntFuncContext(sectionpageproperties.applybtn_borderBottomLeftRadius, '', true),
                                borderColor: sectionpageproperties.applybtnbordercolor,
                                borderWidth: StyleParseToIntFuncContext(sectionpageproperties.applybtnborderwidth, '', true),
                            },
                        ]}
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Text
                            style={[
                                generalstyles.poppinsMedium,
                                {
                                    color: sectionpageproperties.applybtn_textColor,
                                    fontSize: StyleParseToIntFuncContext(sectionpageproperties.applybtn_fontsize),
                                    textTransform:
                                        sectionpageproperties.applybtn_texttransform == 'Uppercase'
                                            ? 'uppercase'
                                            : sectionpageproperties.applybtn_texttransform == 'Capitalize'
                                            ? 'capitalize'
                                            : sectionpageproperties.applybtn_texttransform == 'None'
                                            ? 'none'
                                            : 'lowercase',
                                    fontFamily:
                                        sectionpageproperties.applybtn_Textfontweight == 300
                                            ? 'Poppins-Thin'
                                            : sectionpageproperties.applybtn_Textfontweight == 400
                                            ? 'Poppins-Light'
                                            : sectionpageproperties.applybtn_Textfontweight == 500
                                            ? 'Poppins-Regular'
                                            : sectionpageproperties.applybtn_Textfontweight == 600
                                            ? 'Poppins-Medium'
                                            : sectionpageproperties.applybtn_Textfontweight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                },
                            ]}
                        >
                            {lang.apply}
                        </Text>
                    </TouchableOpacity>
                </SafeAreaView>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    root: {
        width: 12 * 2,
        height: 12 * 2,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ccc',
        backgroundColor: '#ffffff',
    },
    notch: {
        width: 8,
        height: 8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#4499ff',
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderTopWidth: 8,
    },
    rail: {
        flex: 1,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#ccc',
    },
    railSelected: {
        height: 4,
        backgroundColor: 'blue',
        borderRadius: 2,
    },
    label: {
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#4499ff',
        borderRadius: 4,
    },
    labeltext: {
        fontSize: 16,
        color: '#fff',
    },
});

export default Filter;
