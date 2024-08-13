import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Pressable, FlatList } from 'react-native';
import { WebsiteDesignWorkPlaceContext } from '../../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { LanguageContext } from '../../../../LanguageContext/LanguageContext';
import { TemplateRoutingContext } from '../../../../TemplateRoutingContext';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import RangeSlider from 'rn-range-slider';
import CustomerAddressInformation from '../../../StaticPages/Signup/CustomerAddressInformation';
import generalstyles from '../../../GeneralFiles/Stylesheet/Stylesheet';
import { FetchingContext } from '../../../../FetchingContext/FetchingContext';
import PickerModal from 'react-native-picker-modal-view';
import { Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Dynamicfilterssection = (props) => {
    const { lang, langdetect } = useContext(LanguageContext);
    const { fetchAuthorizationQueryContext, fetchcollectionsQueryContext, FetchQueriesEngineContext, fetchProductFeaturesQueryContext } = useContext(FetchingContext);
    const { routingcountext, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
    const { StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [openModal, setopenModal] = useState(false);
    const [Low, setLow] = useState('');
    const [High, setHigh] = useState('');
    const [minValue, setminValue] = useState('');
    const [maxValue, setmaxValue] = useState('');
    const [productfeatuesarr, setproductfeatuesarr] = useState([]);
    const [instproductfeatuesarr, setinstproductfeatuesarr] = useState([]);

    useEffect(() => {
        if (props?.sectionpropertiesProps != undefined) {
            var secpropobj = {};
            props?.sectionpropertiesProps?.forEach(function (sectionpropertiesobj, sectionpropertiesindex) {
                secpropobj[sectionpropertiesobj.property_css_name] = sectionpropertiesobj.property_value;
            });
            setsectionproperties({ ...secpropobj });
        }
    }, [props.sectionpropertiesProps]);
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
    const handleValueChange = useCallback((low, high, item, index) => {
        setLow(low);
        setminValue(low);
        setHigh(high);
        setmaxValue(high);

        // alert(high);
    }, []);
    const renderfeatures = (item, index) => {
        if (item.type == 'Selectbox') {
            var selectboxarr = [];
            item?.featuresselectbovalue?.forEach(function (slecitem) {
                var itemlabel = '';
                if (langdetect == 'en') {
                    itemlabel = slecitem.value_en;
                } else {
                    itemlabel = slecitem.value_ar;
                }
                selectboxarr.push({ Id: slecitem.value_en, Name: itemlabel });
            });
            return (
                <View>
                    <View style={[styles.inputscontainer, { marginBottom: 30 }]}>
                        <Text
                            style={[
                                {
                                    color: '#000',
                                    fontSize: 15,
                                    textAlign: 'left',
                                    fontFamily: 'Poppins-Medium',
                                    marginBottom: 10,
                                    textTransform: 'capitalize',
                                },
                            ]}
                        >
                            {langdetect == 'en' ? item.name_en : item.name_ar}
                        </Text>

                        <PickerModal
                            renderSelectView={(disabled, selected, showModal) => (
                                <TouchableOpacity
                                    style={[
                                        styles.textinput,
                                        {
                                            borderRadius: 10,
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            shadowColor: sectionproperties.inputshadowcolor,
                                            shadowOpacity: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 0.1 : 0,
                                            shadowOffset: {
                                                width: 0,
                                                height: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                            },
                                            shadowRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                            elevation: Platform.OS === 'ios' ? (StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 1 : 0) : 0,
                                            backgroundColor: sectionproperties.input_bgcolor,
                                            borderWidth: 1,
                                            borderBottomWidth: 1,
                                            borderColor: '#ccc',
                                            height: 40,
                                        },
                                    ]}
                                    onPress={showModal}
                                >
                                    <Text
                                        disabled={disabled}
                                        style={[
                                            generalstyles.poppinsMedium,
                                            {
                                                color: '#000',
                                                fontSize: 15,
                                                textAlign: 'center',
                                                width: '100%',
                                            },
                                        ]}
                                    >
                                        {item?.valuechoosen}
                                    </Text>
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
                    </View>
                </View>
            );
        } else if (item.type == 'NumberRange') {
            var minrange = 0;
            var maxrange = 0;
            if (item.minNumberRange <= 0) {
                minrange = 0;
            } else {
                minrange = item.minNumberRange;
            }
            if (item.maxNumberRange <= 0) {
                maxrange = 1000;
            } else {
                maxrange = item.maxNumberRange;
            }
            return (
                <View style={{ flexDirection: 'column', marginBottom: 20 }}>
                    <Text
                        style={[
                            {
                                color: '#000',
                                fontSize: 15,
                                textAlign: 'left',
                                fontFamily: 'Poppins-Medium',
                                marginBottom: 10,
                                textTransform: 'capitalize',
                            },
                        ]}
                    >
                        {langdetect == 'en' ? item.name_en : item.name_ar}
                    </Text>
                    <View style={{ width: '100%' }}>
                        <RangeSlider
                            style={styles.slider}
                            min={minrange}
                            max={maxrange}
                            step={item.stepnumberrange}
                            floatingLabel
                            renderThumb={renderThumb}
                            renderRail={renderRail}
                            renderRailSelected={renderRailSelected}
                            renderLabel={renderLabel}
                            renderNotch={renderNotch}
                            onValueChanged={handleValueChange}
                            onSliderTouchEnd={(low, high) => {
                                if (instproductfeatuesarr?.length != 0) {
                                    var tempinstproductfeatuesarr = [...instproductfeatuesarr];
                                    tempinstproductfeatuesarr[index].lownumberrange = low;
                                    tempinstproductfeatuesarr[index].highnumberrange = high;
                                    setinstproductfeatuesarr([...tempinstproductfeatuesarr]);
                                    var isattrexists = false;
                                    var tempproductfeatuesarr = [...productfeatuesarr];
                                    tempproductfeatuesarr?.forEach(function (attritem, attrindex) {
                                        if (attritem.id == item.id) {
                                            tempproductfeatuesarr[attrindex].value = low;
                                            tempproductfeatuesarr[attrindex].valueminnumberrange = low;
                                            tempproductfeatuesarr[attrindex].valuemaxnumberrange = high;
                                            isattrexists = true;
                                        }
                                    });
                                    if (isattrexists == false) {
                                        tempproductfeatuesarr.push({
                                            id: item.id,
                                            value: low,
                                            valueminnumberrange: low,
                                            valuemaxnumberrange: high,
                                        });
                                    }
                                    setproductfeatuesarr([...tempproductfeatuesarr]);
                                }
                            }}
                            allowLabelOverflow={false}
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
            );
        } else if (item.type == 'Number') {
            return (
                <View style={{ flexDirection: 'column', marginBottom: 20 }}>
                    <Text
                        style={[
                            {
                                color: '#000',
                                fontSize: 15,
                                textAlign: 'left',
                                fontFamily: 'Poppins-Medium',
                                marginBottom: 10,
                                textTransform: 'capitalize',
                            },
                        ]}
                    >
                        {langdetect == 'en' ? item.name_en : item.name_ar}
                    </Text>
                    <TextInput
                        style={[
                            // styles.textinput,
                            {
                                borderRadius: 10,
                                width: '100%',
                                shadowColor: sectionproperties.inputshadowcolor,
                                shadowOpacity: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 0.1 : 0,
                                shadowOffset: {
                                    width: 0,
                                    height: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                },
                                shadowRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                elevation: Platform.OS === 'ios' ? (StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 1 : 0) : 0,
                                backgroundColor: sectionproperties.input_bgcolor,
                                borderWidth: 1,
                                borderBottomWidth: 1,
                                borderColor: '#ccc',
                                height: 40,
                                textAlign: langdetect == 'en' ? 'left' : 'right',
                                // backgroundColor: 'red',
                                paddingHorizontal: 15,
                            },
                        ]}
                        keyboardType="numeric"
                    />
                </View>
            );
        }
    };
    return (
        <View style={{ width: '100%' }}>
            {/* Bakcground Color */}
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    width: '100%',
                    backgroundColor: sectionproperties.backgroundColor,
                }}
            />

            <View
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop),
                    marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom),
                    paddingTop: StyleParseToIntFuncContext(sectionproperties.paddingTop),
                    paddingBottom: StyleParseToIntFuncContext(sectionproperties.paddingBottom),
                    paddingRight: StyleParseToIntFuncContext(sectionproperties.paddingRight),
                    paddingLeft: StyleParseToIntFuncContext(sectionproperties.paddingLeft),
                }}
            >
                <View
                    style={{
                        alignItems: sectionproperties.sectiontitleposition == 'Centered' ? 'center' : 'flex-start',
                    }}
                >
                    {/* {sectionproperties.sectiontitleshow == 'Show' && ( */}
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
                            textAlign: 'left',
                            marginBottom: StyleParseToIntFuncContext(sectionproperties.sectionTitleMarginBottom),
                            marginTop: 20,
                            fontSize: 18,
                            marginBottom: 20,
                        }}
                    >
                        What're you looking for?
                        {/* {langdetect == 'en' ? sectionproperties.sectionTitleContent : sectionproperties.sectionTitleContent_ar} */}
                    </Text>
                    {/* )} */}
                    {/* {sectionproperties.prodCatShow == 'Show' && (
                        <Text
                            style={{
                                color: sectionproperties.prodCatColor,
                                fontSize: StyleParseToIntFuncContext(sectionproperties.prodCatFontSize),
                                fontFamily:
                                    sectionproperties.prodCatFontWeight == 300
                                        ? 'Poppins-Thin'
                                        : sectionproperties.prodCatFontWeight == 400
                                        ? 'Poppins-Light'
                                        : sectionproperties.prodCatFontWeight == 500
                                        ? 'Poppins-Regular'
                                        : sectionproperties.prodCatFontWeight == 600
                                        ? 'Poppins-Medium'
                                        : sectionproperties.prodCatFontWeight == 700
                                        ? 'Poppins-Semibold'
                                        : 'Poppins-Bold',
                                textAlign: 'left',
                                marginBottom: StyleParseToIntFuncContext(sectionproperties.descriptionMarginBottom),
                            }}
                        >
                            {langdetect == 'en' ? sectionproperties.descriptionContentEn : sectionproperties.descriptionContentAr}
                        </Text>
                    )} */}
                </View>
                <View
                    style={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: sectionproperties.reservation_bgcolor,
                        // paddingLeft: StyleParseToIntFuncContext(sectionproperties.reservation_padding_left),
                        // paddingRight: StyleParseToIntFuncContext(sectionproperties.reservation_padding_right),
                        // paddingTop: StyleParseToIntFuncContext(sectionproperties.reservation_padding_top),
                        // paddingBottom: StyleParseToIntFuncContext(sectionproperties.reservation_padding_bottom),
                        borderRadius: StyleParseToIntFuncContext(sectionproperties.reservation_borderradius),
                        width: '90%',
                        backgroundColor: 'white',
                        borderRadius: 20,
                        marginHorizontal: 'auto',
                        padding: 20,
                    }}
                >
                    {fetchProductFeaturesQueryContext?.isSuccess && (
                        <FlatList
                            data={instproductfeatuesarr}
                            renderItem={({ item, index }) => {
                                return <View>{renderfeatures(item, index)}</View>;
                            }}
                        />
                    )}

                    {/* Flight Button */}

                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            style={{
                                // position: 'absolute',
                                // bottom: 5,
                                padding: 8,
                                borderRadius: 100,
                            }}
                            onPress={() => {
                                // routingcountext(StaticPagesLinksContext.GeneralProductsComponent);
                                routingcountext(StaticPagesLinksContext.GeneralProductsComponent, {
                                    genprodcompstinfo: { prod_featruesar: productfeatuesarr },
                                });
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: '#000',
                                    borderRadius: 100,
                                    width: 50,
                                    height: 50,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <AntDesign name="search1" size={18} color={'#fff'} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
        backgroundColor: 'white',
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
        width: '100%',
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
const Modalstyles = StyleSheet.create({
    logocontainer: {
        width: 120,
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputscontainer: {
        marginBottom: 30,
        width: '100%',
        position: 'relative',
        flexDirection: 'column',
    },
    textinput: {
        position: 'relative',
        height: 45,
        paddingStart: 10,
        paddingEnd: 10,
        width: '100%',
        fontFamily: 'Poppins-Medium',
        marginTop: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        width: '100%',
        height: '100%',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 5,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
export default Dynamicfilterssection;
