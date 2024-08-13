import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Modal, TextInput, View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { ProductsCardsSectionContext } from '../../Sections/Cards/ProductsCardsSectionContext';
import PickerModal from 'react-native-picker-modal-view';
import { SIZES } from '../../GeneralFiles/constants';
import RangeSlider from 'rn-range-slider';
import { Entypo, AntDesign } from '@expo/vector-icons';

const FilterHorizontal = (props) => {
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { fetchAuthorizationQueryContext, fetchProductFeaturesQueryContext } = useContext(FetchingContext);
    const { ProductFilterObjContext, setProductFilterObjContext } = useContext(ProductsCardsSectionContext);
    const sectionproperties = props.sectionproperties;
    const [instcollections, setinstcollections] = useState([]);
    const [instparentcollection, setinstparentcollection] = useState([]);
    // const [instcollections, setinstcollections] = useState([...fetchAuthorizationQueryContext.data.data.instinfo.instcollections]);

    const [openpricemodal, setopenpricemodal] = useState(false);
    const [Low, setLow] = useState('');
    const [High, setHigh] = useState('');
    const [minValue, setminValue] = useState('');
    const [maxValue, setmaxValue] = useState('');
    const [productfeatuesarr, setproductfeatuesarr] = useState([]);
    const [instproductfeatuesarr, setinstproductfeatuesarr] = useState([]);

    const renderThumb = useCallback((value) => <View style={styles.root}>{/* <Text>{JSON.stringify(value)}</Text> */}</View>, []);
    const renderRail = useCallback(() => <View style={styles.rail}></View>, []);
    const renderRailSelected = useCallback(() => <View style={styles.railSelected}></View>, []);
    const renderLabel = useCallback(
        (value) => (
            <View style={styles.label}>
                <Text style={styles.labeltext}>{value} EGP</Text>
            </View>
        ),
        [],
    );
    const renderNotch = useCallback(() => <View style={styles.notch} {...props} />, []);
    useEffect(() => {
        if (sectionproperties.length != 0) {
            var temp = { ...minValue };
            temp = sectionproperties.filterpriceminvalue;
            setminValue(temp);

            var temp2 = { ...minValue };
            temp2 = sectionproperties.filterpricemaxvalue;
            setmaxValue(temp2);
        }
    }, [sectionproperties]);
    useEffect(() => {
        if (fetchProductFeaturesQueryContext.isSuccess) {
            setinstproductfeatuesarr(fetchProductFeaturesQueryContext?.data?.data?.productfeatues);
        }
    }, [fetchProductFeaturesQueryContext.isSuccess]);
    useEffect(() => {
        var tempcoll = [...instcollections];
        if (fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcollections?.length != 0) {
            fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcollections.forEach(function (coll, index) {
                if (coll.isinftiler == 1 && coll.isshowntocustomers == 1) {
                    tempcoll.push(coll);
                }
                setinstcollections([...tempcoll]);
            });
        }
        var tempcat = [];
        if (sectionproperties.showcollectionfilter == 'Show') {
            if (fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcategories?.length != 0) {
                fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcategories.forEach(function (cat, catindex) {
                    cat?.parentcolletions.forEach(function (parent, parentindex) {
                        var parentobjtobepushed = parent;
                        if (parent.isinftiler == 1 && parent.isshowntocustomers == 1) {
                            var collectiontobeinsideparent = [];
                            if (parent?.collections?.length != 0) {
                                parent?.collections?.forEach(function (collection, collectionindex) {
                                    // console.log(collection);

                                    // if (collection.isinftiler == 1 && collection.isshowntocustomers == 1) {
                                    if (langdetect == 'en' && collection.title_en != undefined) {
                                        collectiontobeinsideparent.push({ Id: collection.collectionid, Name: langdetect == 'en' ? collection.title_en : collection.title_ar });
                                    } else if (langdetect == 'ar' && collection.title_ar != undefined) {
                                        collectiontobeinsideparent.push({ Id: collection.collectionid, Name: langdetect == 'en' ? collection.title_en : collection.title_ar });
                                    }
                                    if (collection.Name != undefined) {
                                        collectiontobeinsideparent.push({ Id: collection.Id, Name: collection.Name });
                                    }
                                    // }
                                });
                                if (collectiontobeinsideparent.length >= 0) {
                                    if (collectiontobeinsideparent[0]?.Name != 'All' || collectiontobeinsideparent[0]?.Name != 'الكل') {
                                        collectiontobeinsideparent.unshift({ Id: props.collid, Name: langdetect == 'en' ? 'All' : 'الكل' });
                                    }
                                }
                                // console.log(collectiontobeinsideparent);
                            }
                            parentobjtobepushed.collections = collectiontobeinsideparent;
                            tempcat.push(parentobjtobepushed);
                        }
                    });
                });
                setinstparentcollection([...tempcat]);
            }
        }
    }, [fetchAuthorizationQueryContext.isSuccess]);

    useEffect(() => {
        setdynamicfilterupdater(productfeatuesarr);
    }, [productfeatuesarr]);
    const handleValueChange = useCallback((low, high) => {
        setLow(low);
        setminValue(low);
        setHigh(high);
        setmaxValue(high);
        // alert(high);
    }, []);

    const setCollectionFilterFunc = (collectionid) => {
        var tempfetchproductsfilerobjcontext = { ...ProductFilterObjContext };
        if (ProductFilterObjContext.ProductFetchingType == 'Parent Collection') {
            tempfetchproductsfilerobjcontext.ProductFetchingType = 'Random';
            tempfetchproductsfilerobjcontext.collections = [];
        }

        var CollectionExists = false;
        if (sectionproperties.enableremovefilter == 'Enable') {
            tempfetchproductsfilerobjcontext.collections.forEach(function (filteritem, filterindex) {
                if (filteritem == collectionid) {
                    CollectionExists = true;
                    tempfetchproductsfilerobjcontext.collections.splice(filterindex, 1);
                }
            });
        }

        if (!CollectionExists) {
            tempfetchproductsfilerobjcontext.collections = [];
            tempfetchproductsfilerobjcontext.collections.push(collectionid);
        }
        if (ProductFilterObjContext.ProductFetchingType == 'Parent Collection') {
            setProductFilterObjContext({ ...tempfetchproductsfilerobjcontext });
        }
        setProductFilterObjContext({ ...tempfetchproductsfilerobjcontext });

        // setProductFilterObjContextTEMP({ ...tempfetchproductsfilerobjcontext });
    };
    const setdynamicfilterupdater = () => {
        var tempfetchproductsfilerobjcontext = { ...ProductFilterObjContext };
        tempfetchproductsfilerobjcontext.prod_featruesar = productfeatuesarr;
        setProductFilterObjContext({ ...tempfetchproductsfilerobjcontext });

        // setProductFilterObjContextTEMP({ ...tempfetchproductsfilerobjcontext });
    };

    return (
        <View
            style={[
                {
                    // paddingHorizontal: 10,
                    backgroundColor: sectionproperties.filter_backgroundcolor,
                    paddingVertical: StyleParseToIntFuncContext(sectionproperties.filtersectionpaddingvertical),
                    paddingStart: 10,
                },
            ]}
        >
            {sectionproperties.showcollectionfilter == 'Show' && (
                <SafeAreaView>
                    {/* <Text>{props.collid}</Text> */}
                    {sectionproperties.filterretrievetype == 'Parent Collections' && instparentcollection.length != 0 && (
                        <FlatList
                            horizontal
                            data={instparentcollection}
                            renderItem={({ item, index }) => {
                                return (
                                    <View
                                        style={[
                                            styles.inputscontainer,
                                            {
                                                // width: Platform.OS === 'ios' ? SIZES.width - 320 : SIZES.width - 250,
                                                width: Platform.OS === 'ios' ? SIZES.width - 280 : SIZES.width - 220,
                                                // width: Platform.OS === 'ios' ? SIZES.width - 250 : SIZES.width - 250,
                                                marginEnd: 15,
                                            },
                                        ]}
                                    >
                                        {item.collections != undefined && item.collections != null && item.collections.length != 0 && (
                                            <PickerModal
                                                renderSelectView={(disabled, selected, showModal) => (
                                                    <TouchableOpacity
                                                        style={[
                                                            styles.textinput,
                                                            {
                                                                width: '100%',
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'flex-start',
                                                                borderWidth: StyleParseToIntFuncContext(sectionproperties.filter_optionborderwidth, '', true),
                                                                borderColor: sectionproperties.filter_optionbordercolor,
                                                                borderRadius: 10,
                                                                height: sectionproperties.filter_optionborderwidth != 0 ? 35 : 'auto',
                                                                paddingHorizontal: sectionproperties.filter_optionborderwidth != 0 ? 10 : 0,
                                                                paddingEnd: 5,
                                                            },
                                                        ]}
                                                        onPress={showModal}
                                                    >
                                                        <View style={[generalstyles.flexRow]}>
                                                            <Text
                                                                disabled={disabled}
                                                                style={[
                                                                    generalstyles.poppinsMedium,
                                                                    {
                                                                        color: sectionproperties.timeline_text_color,
                                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.timeline_text_fontsize),
                                                                        textAlign: 'left',
                                                                        width: '100%',
                                                                        flex: 1,
                                                                        textTransform: 'capitalize',
                                                                    },
                                                                ]}
                                                            >
                                                                {item.valuechoosen != undefined ? item.valuechoosen : langdetect == 'en' ? item.title_en : item.title_ar}
                                                            </Text>
                                                            <Entypo
                                                                name="chevron-small-down"
                                                                style={{
                                                                    color: '#000',
                                                                    fontSize: 17,
                                                                    opacity: 0.5,
                                                                    marginStart: 'auto',
                                                                }}
                                                            />
                                                        </View>
                                                    </TouchableOpacity>
                                                )}
                                                onSelected={(selected) => {
                                                    // alert(selected.Id);
                                                    if (selected.Id != undefined && selected.Id.length != 0) {
                                                        setCollectionFilterFunc(selected.Id);
                                                    } else {
                                                    }
                                                    var tempinstproductfeatuesarr = [...instparentcollection];
                                                    tempinstproductfeatuesarr[index].valuechoosen = selected.Name;
                                                    setinstparentcollection([...tempinstproductfeatuesarr]);
                                                    // props.collid
                                                }}
                                                items={item.collections}
                                                sortingLanguage={'tr'}
                                                showToTopButton={true}
                                                selectPlaceholderText={lang.choosecountry}
                                                searchPlaceholderText={lang.search}
                                                requireSelection={false}
                                                autoSort={false}
                                                searchInputTextColor={sectionproperties.inputfieldcolor}
                                            />
                                        )}
                                    </View>
                                );
                            }}
                        />
                    )}

                    {sectionproperties.filterretrievetype == 'Collections' && instcollections.length != 0 && (
                        <FlatList
                            horizontal
                            data={instcollections}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        style={[
                                            generalstyles.allcentered,
                                            {
                                                flexDirection: 'row',
                                                alignContent: 'center',
                                                alignItems: 'center',
                                                flex: 1,
                                                marginEnd: 15,
                                                borderWidth: StyleParseToIntFuncContext(sectionproperties.filter_optionborderwidth, '', true),
                                                borderColor: item.isselected == true ? sectionproperties.activecat_color : sectionproperties.filter_optionbordercolor,
                                                borderRadius: 100,
                                                height: sectionproperties.filter_optionborderwidth != 0 ? 45 : 'auto',
                                                paddingHorizontal: sectionproperties.filter_optionborderwidth != 0 ? 15 : 0,
                                            },
                                        ]}
                                        onPress={() => {
                                            setCollectionFilterFunc(item.collectionid);
                                            var temp = [...instcollections];
                                            temp.map((arrayitem, arrayindex) => {
                                                arrayitem.isselected = false;
                                            });
                                            temp[index].isselected = true;
                                            setinstcollections([...temp]);
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily:
                                                    sectionproperties.timeline_text_fontweight == 300
                                                        ? 'Poppins-Thin'
                                                        : sectionproperties.timeline_text_fontweight == 400
                                                        ? 'Poppins-Light'
                                                        : sectionproperties.timeline_text_fontweight == 500
                                                        ? 'Poppins-Regular'
                                                        : sectionproperties.timeline_text_fontweight == 600
                                                        ? 'Poppins-Medium'
                                                        : sectionproperties.timeline_text_fontweight == 700
                                                        ? 'Poppins-Semibold'
                                                        : 'Poppins-Bold',
                                                color: item.isselected == true ? sectionproperties.activecat_color : sectionproperties.timeline_text_color,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.timeline_text_fontsize),
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
                        />
                    )}
                </SafeAreaView>
            )}

            {sectionproperties.showdynamicfilter == 'Show' && (
                <SafeAreaView>
                    <FlatList
                        horizontal
                        data={instproductfeatuesarr}
                        renderItem={({ item, index }) => {
                            var selectboxarr = [];
                            if (item.type == 'Selectbox') {
                                item?.featuresselectbovalue?.forEach(function (slecitem) {
                                    var itemlabel = '';
                                    if (langdetect == 'en') {
                                        itemlabel = slecitem.value_en;
                                    } else {
                                        itemlabel = slecitem.value_ar;
                                    }
                                    selectboxarr.push({ Id: slecitem.value_en, Name: itemlabel });
                                });
                            }
                            return (
                                <View
                                    style={[
                                        styles.inputscontainer,
                                        {
                                            // width: Platform.OS === 'ios' ? SIZES.width - 320 : SIZES.width - 250,
                                            // width: Platform.OS === 'ios' ? SIZES.width - 250 : SIZES.width - 250,
                                            marginEnd: 15,
                                        },
                                    ]}
                                >
                                    {item.type == 'Selectbox' && (
                                        <PickerModal
                                            renderSelectView={(disabled, selected, showModal) => (
                                                <TouchableOpacity
                                                    style={[
                                                        styles.textinput,
                                                        {
                                                            width: '100%',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'flex-start',
                                                            borderWidth: StyleParseToIntFuncContext(sectionproperties.filter_optionborderwidth, '', true),
                                                            borderColor: sectionproperties.filter_optionbordercolor,
                                                            borderRadius: 10,
                                                            height: sectionproperties.filter_optionborderwidth != 0 ? 35 : 'auto',
                                                            paddingHorizontal: sectionproperties.filter_optionborderwidth != 0 ? 10 : 0,
                                                            paddingEnd: 5,
                                                        },
                                                    ]}
                                                    onPress={showModal}
                                                >
                                                    <View style={[generalstyles.flexRow, {}]}>
                                                        <Text
                                                            disabled={disabled}
                                                            style={[
                                                                generalstyles.poppinsMedium,
                                                                {
                                                                    color: '#000',
                                                                    fontSize: 13,
                                                                    textAlign: 'left',
                                                                    width: '100%',
                                                                    opacity: 0.5,
                                                                    flex: 1,
                                                                    marginEnd: 15,
                                                                    textTransform: 'capitalize',
                                                                },
                                                            ]}
                                                        >
                                                            {item.valuechoosen != undefined ? item.valuechoosen : langdetect == 'en' ? item.name_en : item.name_ar}
                                                            {/* {item.valuechoosen == '' || item.valuechoosen == null ? (langdetect == 'en' ? item.name_en : item.name_ar) : item.valuechoosen} */}
                                                        </Text>
                                                        <Entypo
                                                            name="chevron-small-down"
                                                            style={{
                                                                color: '#000',
                                                                fontSize: 17,
                                                                opacity: 0.5,
                                                                marginStart: 'auto',
                                                            }}
                                                        />
                                                    </View>
                                                </TouchableOpacity>
                                            )}
                                            onSelected={(selected) => {
                                                var tempinstproductfeatuesarr = [...instproductfeatuesarr];
                                                tempinstproductfeatuesarr[index].valuechoosen = selected.Id;
                                                setinstproductfeatuesarr([...tempinstproductfeatuesarr]);
                                                var isattrexists = false;
                                                var tempproductfeatuesarr = [...productfeatuesarr];
                                                tempproductfeatuesarr?.forEach(function (attritem, attrindex) {
                                                    if (attritem.id == item.id) {
                                                        tempproductfeatuesarr[attrindex].value = selected.Id;
                                                        isattrexists = true;
                                                    }
                                                });
                                                if (isattrexists == false) {
                                                    tempproductfeatuesarr.push({
                                                        id: item.id,
                                                        value: selected.Id,
                                                    });
                                                }
                                                setproductfeatuesarr([...tempproductfeatuesarr]);
                                            }}
                                            items={selectboxarr}
                                            sortingLanguage={'tr'}
                                            showToTopButton={true}
                                            selectPlaceholderText={lang.choosecountry}
                                            searchPlaceholderText={lang.search}
                                            requireSelection={false}
                                            autoSort={false}
                                            searchInputTextColor={sectionproperties.inputfieldcolor}
                                        />
                                    )}
                                    {item.type == 'Number' && (
                                        <View
                                            style={[
                                                styles.textinput,
                                                {
                                                    width: '100%',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'flex-start',
                                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.filter_optionborderwidth, '', true),
                                                    borderColor: sectionproperties.filter_optionbordercolor,
                                                    borderRadius: 10,
                                                    height: sectionproperties.filter_optionborderwidth != 0 ? 35 : 'auto',
                                                    paddingHorizontal: sectionproperties.filter_optionborderwidth != 0 ? 10 : 0,
                                                    paddingEnd: 5,
                                                },
                                            ]}
                                        >
                                            <View style={[generalstyles.flexRow]}>
                                                <TextInput
                                                    style={{
                                                        width: '100%',
                                                        color: '#000',
                                                        fontSize: 13,
                                                        textAlign: langdetect == 'en' ? 'left' : 'right',
                                                        width: '100%',
                                                        opacity: 0.5,
                                                        fontFamily: 'Poppins-Medium',
                                                    }}
                                                    placeholder={langdetect == 'en' ? item.name_en : item.name_ar}
                                                    placeholderTextColor={'#000'}
                                                    keyboardType="numeric"
                                                />
                                            </View>
                                        </View>
                                    )}
                                    {/* {item.type != 'NumberRange' && (
                                        <View style={{ width: '100%' }}>
                                            <TouchableOpacity
                                                style={[
                                                    styles.textinput,
                                                    {
                                                        width: '100%',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'flex-start',
                                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.filter_optionborderwidth, '', true),
                                                        borderColor: sectionproperties.filter_optionbordercolor,
                                                        borderRadius: 10,
                                                        height: sectionproperties.filter_optionborderwidth != 0 ? 35 : 'auto',
                                                        paddingHorizontal: sectionproperties.filter_optionborderwidth != 0 ? 10 : 0,
                                                        paddingEnd: 5,
                                                    },
                                                ]}
                                                onPress={() => {
                                                    setopenpricemodal(!openpricemodal);
                                                }}
                                            >
                                                <View style={[generalstyles.flexRow]}>
                                                    <Text
                                                        style={[
                                                            generalstyles.poppinsMedium,
                                                            {
                                                                color: '#000',
                                                                fontSize: 13,
                                                                textAlign: 'left',
                                                                width: '100%',
                                                                opacity: 0.5,
                                                                flex: 1,
                                                            },
                                                        ]}
                                                    >
                                                        {item.selectedvalue == '' || item.selectedvalue == null ? (langdetect == 'en' ? item.name_en : item.name_ar) : item.selectedvalue}
                                                    </Text>
                                                    <Entypo
                                                        name="chevron-small-down"
                                                        style={{
                                                            color: '#000',
                                                            fontSize: 17,
                                                            opacity: 0.5,
                                                            marginStart: 'auto',
                                                        }}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )} */}
                                </View>
                            );
                        }}
                    />
                    {openpricemodal == true && (
                        <View
                            style={{
                                width: '100%',
                                marginTop: 20,
                            }}
                        >
                            {/* <View style={[generalstyles.flexRow]}>
                                <View style={[generalstyles.allcentered, { flex: 1, marginHorizontal: 10, borderWidth: 1, borderColor: '#eee', borderRadius: 10, height: 40 }]}>
                                    <Text>{minValue}</Text>
                                </View>
                                <View style={[generalstyles.allcentered, { flex: 1, marginHorizontal: 10, borderWidth: 1, borderColor: '#eee', borderRadius: 10, height: 40 }]}>
                                    <Text>{maxValue}</Text>
                                </View>
                            </View> */}
                            <View style={{ width: '100%', marginTop: 10, paddingHorizontal: 10 }}>
                                <RangeSlider
                                    style={styles.slider}
                                    min={1000000}
                                    max={100000000}
                                    step={500000}
                                    floatingLabel
                                    renderThumb={renderThumb}
                                    renderRail={renderRail}
                                    renderRailSelected={renderRailSelected}
                                    renderLabel={renderLabel}
                                    renderNotch={renderNotch}
                                    onValueChanged={handleValueChange}
                                    allowLabelOverflow={true}
                                />
                                <View style={[generalstyles.flexRow, { marginTop: 10, direction: 'ltr' }]}>
                                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                        <Text style={[generalstyles.primaryMedium]}>
                                            {minValue} {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <Text style={[generalstyles.primaryMedium]}>
                                            {maxValue} {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                </SafeAreaView>
            )}
            {/* <Modal
                presentationStyle={'pageSheet'}
                animationType="slide"
                visible={openpricemodal}
                onRequestClose={() => {
                    setopenpricemodal(false);
                }}
                transparent={true}
            >
                <View
                    style={{
                        width: '100%',
                        height: 300,
                        marginTop: 'auto',
                        backgroundColor: 'white',
                        borderTopEndRadius: 50,
                        borderTopStartRadius: 50,
                        zIndex: 10000000,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            setopenpricemodal(false);
                        }}
                        style={{
                            width: 40,
                            height: 40,
                            position: 'absolute',
                            top: 25,
                            right: 20,
                            // right: langdetect == 'en' ? 10 : '10%',
                            zIndex: 1000,
                        }}
                    >
                        <AntDesign name="close" size={20} color={'#000'} />
                    </TouchableOpacity>
                    <View style={{ width: '100%', marginTop: 50, paddingHorizontal: 25 }}>
                        <Text
                            style={[
                                generalstyles.poppinsMedium,
                                {
                                    textAlign: 'left',
                                },
                            ]}
                        >
                            {langdetect == 'en' ? 'Price Range' : 'السعر'}
                        </Text>
                        <View style={{ width: '100%', marginTop: 20, paddingHorizontal: 25 }}>
                            <RangeSlider
                                style={styles.slider}
                                min={1000000}
                                max={100000000}
                                step={500000}
                                floatingLabel
                                renderThumb={renderThumb}
                                renderRail={renderRail}
                                renderRailSelected={renderRailSelected}
                                renderLabel={renderLabel}
                                renderNotch={renderNotch}
                                onValueChanged={handleValueChange}
                                allowLabelOverflow={true}
                            />
                            <View style={[generalstyles.flexRow, { marginTop: 10, direction: 'ltr' }]}>
                                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                    <Text style={[generalstyles.primaryMedium]}>
                                        {minValue} {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                    </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Text style={[generalstyles.primaryMedium]}>
                                        {maxValue} {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal> */}
        </View>
    );
};
const styles = StyleSheet.create({
    modal: {
        height: SIZES.height,
        width: SIZES.width,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    root: {
        width: 12 * 2,
        height: 12 * 2,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ccc',
        backgroundColor: 'white',
        zIndex: 100000000000,
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
        backgroundColor: '#000',
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
    inputscontainer: {
        // width: '100%',
        position: 'relative',
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    textinput: {
        paddingHorizontal: 110,
        fontFamily: 'Poppins-Medium',
    },
});
export default FilterHorizontal;
