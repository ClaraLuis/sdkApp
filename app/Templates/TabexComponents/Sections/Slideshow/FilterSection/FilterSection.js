import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Pressable, FlatList, Platform } from 'react-native';
import { WebsiteDesignWorkPlaceContext } from '../../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { LanguageContext } from '../../../../LanguageContext/LanguageContext';
import { TemplateRoutingContext } from '../../../../TemplateRoutingContext';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import RangeSlider from 'rn-range-slider';
import CustomerAddressInformation from '../../../StaticPages/Signup/CustomerAddressInformation';
import generalstyles from '../../../GeneralFiles/Stylesheet/Stylesheet';
import { FetchingContext } from '../../../../FetchingContext/FetchingContext';

const FilterSection = (props) => {
    const { lang, langdetect } = useContext(LanguageContext);
    const { fetchAuthorizationQueryContext, fetchcollectionsQueryContext, FetchQueriesEngineContext, setFetchQueriesEngineContext } = useContext(FetchingContext);
    const { routingcountext, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
    const { StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [openModal, setopenModal] = useState(false);
    const [Low, setLow] = useState('');
    const [High, setHigh] = useState('');
    const [minValue, setminValue] = useState('');
    const [maxValue, setmaxValue] = useState('');
    const [collectionsarray, setcollectionsarray] = useState([]);
    const [collectionname, setcollectionname] = useState('');
    const [collectionid, setcollectionid] = useState('');
    const [addressinfopayloadobj, setaddressinfopayloadobj] = useState({ countryid: '', stateid: '', cityid: '', collectionid: '' });
    useEffect(() => {
        var tempFetchQueriesEngineContext = { ...FetchQueriesEngineContext };
        tempFetchQueriesEngineContext.collections = true;
        setFetchQueriesEngineContext({ ...tempFetchQueriesEngineContext });
        if (!fetchcollectionsQueryContext.isFetching && fetchcollectionsQueryContext.isSuccess) {
            var tempcountriesarray = [];
            fetchcollectionsQueryContext.data.data.collections.forEach(function (arrayItem, arrayindex) {
                tempcountriesarray.push({ ...arrayItem });
            });
            setcollectionsarray([...tempcountriesarray]);
        }
    }, [fetchcollectionsQueryContext.isSuccess]);
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
    const renderThumb = useCallback((value) => <View style={styles.root}>{/* <Text>{JSON.stringify(value)}</Text> */}</View>, []);
    const renderRail = useCallback(() => <View style={styles.rail}></View>, []);
    const renderRailSelected = useCallback(() => <View style={styles.railSelected}></View>, []);
    const renderLabel = useCallback(
        (value) => (
            <View
                style={[
                    styles.label,
                    {
                        display: sectionproperties.filterpricestyle == 'Style 1' ? 'flex' : 'none',
                    },
                ]}
            >
                <Text style={styles.labeltext}>{value} EGP</Text>
            </View>
        ),
        [],
    );
    const renderNotch = useCallback(
        () => (
            <View
                style={[
                    styles.notch,
                    {
                        display: sectionproperties.filterpricestyle == 'Style 1' ? 'flex' : 'none',
                    },
                ]}
                {...props}
            />
        ),
        [],
    );
    const handleValueChange = useCallback((low, high) => {
        setLow(low);
        setHigh(high);
        // alert(high);
    }, []);
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

            {/* Section/Card */}
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
                    {sectionproperties.sectiontitleshow == 'Show' && (
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
                            }}
                        >
                            {langdetect == 'en' ? sectionproperties.sectionTitleContent : sectionproperties.sectionTitleContent_ar}
                        </Text>
                    )}
                    {sectionproperties.prodCatShow == 'Show' && (
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
                    )}
                </View>
                <View
                    style={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: sectionproperties.reservation_bgcolor,
                        paddingLeft: StyleParseToIntFuncContext(sectionproperties.reservation_padding_left),
                        paddingRight: StyleParseToIntFuncContext(sectionproperties.reservation_padding_right),
                        paddingTop: StyleParseToIntFuncContext(sectionproperties.reservation_padding_top),
                        paddingBottom: StyleParseToIntFuncContext(sectionproperties.reservation_padding_bottom),
                        borderRadius: StyleParseToIntFuncContext(sectionproperties.reservation_borderradius),
                        width: '100%',
                    }}
                >
                    {sectionproperties.showcollectionsfilter == 'Show' && (
                        <View style={{ marginBottom: 15 }}>
                            <TouchableOpacity
                                style={{ marginBottom: 10, width: '100%' }}
                                onPress={() => {
                                    setopenModal(true);
                                }}
                            >
                                <Text
                                    style={[
                                        {
                                            fontFamily:
                                                sectionproperties.form_labelfontweight == 300
                                                    ? 'Poppins-Thin'
                                                    : sectionproperties.form_labelfontweight == 400
                                                    ? 'Poppins-Light'
                                                    : sectionproperties.form_labelfontweight == 500
                                                    ? 'Poppins-Regular'
                                                    : sectionproperties.form_labelfontweight == 600
                                                    ? 'Poppins-Medium'
                                                    : sectionproperties.form_labelfontweight == 700
                                                    ? 'Poppins-Semibold'
                                                    : 'Poppins-Bold',
                                            color: sectionproperties.form_labelcolor,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.form_labelfontsize),
                                            textAlign: 'left',
                                            textTransform:
                                                sectionproperties.form_labeltexttransform == 'Uppercase'
                                                    ? 'uppercase'
                                                    : sectionproperties.form_labeltexttransform == 'Capitalize'
                                                    ? 'capitalize'
                                                    : sectionproperties.form_labeltexttransform == 'None'
                                                    ? 'none'
                                                    : 'lowercase',
                                            marginBottom: 10,
                                        },
                                    ]}
                                >
                                    {langdetect == 'en' ? sectionproperties.collectionsfilternameen : sectionproperties.collectionsfilternamear}
                                </Text>
                                <View
                                    style={[
                                        styles.textinput,
                                        {
                                            paddingHorizontal: 10,
                                            width: '100%',
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                            height: 45,
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
                                            color: sectionproperties.inputfieldcolor,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                            shadowColor: sectionproperties.inputshadowcolor,
                                            shadowOpacity: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 0.1 : 0,
                                            shadowOffset: {
                                                width: 0,
                                                height: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                            },
                                            shadowRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                            elevation: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 1 : 0,
                                            backgroundColor: sectionproperties.input_bgcolor,
                                            borderWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                            borderColor: sectionproperties.inputfieldborderColor,
                                            justifyContent: 'center',
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            {
                                                color: sectionproperties.inputfieldcolor,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                                fontFamily: 'Poppins-Medium',
                                                justifyContent: 'center',
                                                textAlign: 'left',
                                            },
                                        ]}
                                    >
                                        {collectionname}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                    {sectionproperties.hidecountrystatecity == 'Show' && (
                        <CustomerAddressInformation
                            payloadobj={addressinfopayloadobj}
                            setpayloadobj={setaddressinfopayloadobj}
                            setpayloadobj2={setaddressinfopayloadobj}
                            sectionproperties={sectionproperties}
                            srcfrom={'filter'}
                        />
                    )}
                    {sectionproperties.showpricefilter == 'Show' && (
                        <View style={{ flexDirection: 'column', marginBottom: 20 }}>
                            {sectionproperties.form_labelfontsize != 0 && (
                                <Text
                                    style={[
                                        {
                                            marginBottom: 10,
                                            color: sectionproperties.form_labelcolor,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.form_labelfontsize),
                                            textAlign: 'left',
                                            fontFamily:
                                                sectionproperties.form_labelfontweight == 300
                                                    ? 'Poppins-Thin'
                                                    : sectionproperties.form_labelfontweight == 400
                                                    ? 'Poppins-Light'
                                                    : sectionproperties.form_labelfontweight == 500
                                                    ? 'Poppins-Regular'
                                                    : sectionproperties.form_labelfontweight == 600
                                                    ? 'Poppins-Medium'
                                                    : sectionproperties.form_labelfontweight == 700
                                                    ? 'Poppins-Semibold'
                                                    : 'Poppins-Bold',
                                            textTransform:
                                                sectionproperties.form_labeltexttransform == 'Uppercase'
                                                    ? 'uppercase'
                                                    : sectionproperties.form_labeltexttransform == 'Capitalize'
                                                    ? 'capitalize'
                                                    : sectionproperties.form_labeltexttransform == 'None'
                                                    ? 'none'
                                                    : 'lowercase',
                                        },
                                    ]}
                                >
                                    {langdetect == 'en' ? sectionproperties.pricetitleen : sectionproperties.pricetitlear}
                                </Text>
                            )}
                            <View style={{ width: '100%' }}>
                                {sectionproperties.filterpricestyle == 'Style 2' && (
                                    <View
                                        style={[
                                            generalstyles.flexRow,
                                            {
                                                marginBottom: 15,
                                            },
                                        ]}
                                    >
                                        <View style={[generalstyles.allcentered, { flex: 1, marginHorizontal: 10, height: 40, borderWidth: 1, borderColor: '#CCC', borderRadius: 5 }]}>
                                            <Text
                                                style={[
                                                    generalstyles.poppinsMedium,
                                                    {
                                                        color: sectionproperties.inputfieldcolor,
                                                    },
                                                ]}
                                            >
                                                {Low}
                                            </Text>
                                        </View>
                                        <View style={[generalstyles.allcentered, { flex: 1, marginHorizontal: 10, height: 40, borderWidth: 1, borderColor: '#CCC', borderRadius: 5 }]}>
                                            <Text
                                                style={[
                                                    generalstyles.poppinsMedium,
                                                    {
                                                        color: sectionproperties.inputfieldcolor,
                                                    },
                                                ]}
                                            >
                                                {High}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                                <RangeSlider
                                    style={styles.slider}
                                    min={minValue == '' ? 0 : parseInt(minValue)}
                                    max={maxValue == '' ? 1000 : parseInt(maxValue)}
                                    step={parseInt(sectionproperties.pricefilterstep)}
                                    floatingLabel
                                    renderThumb={renderThumb}
                                    renderRail={renderRail}
                                    renderRailSelected={renderRailSelected}
                                    renderLabel={renderLabel}
                                    renderNotch={renderNotch}
                                    onValueChanged={handleValueChange}
                                    allowLabelOverflow={false}
                                />
                                {sectionproperties.filterpricestyle == 'Style 1' && (
                                    <View style={[generalstyles.flexRow, { marginTop: 10, direction: 'ltr' }]}>
                                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                            <Text style={[generalstyles.primaryMedium]}>
                                                {minValue}{' '}
                                                {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                            </Text>
                                        </View>
                                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                            <Text style={[generalstyles.primaryMedium]}>
                                                {maxValue}{' '}
                                                {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </View>
                    )}

                    {/* Flight Button */}
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            style={{
                                // bottom: StyleParseToIntFuncContext(sectionproperties.generalbtn_marginBottom),
                                bottom: Platform.OS === 'ios' ? -30 : -40,
                                position: 'absolute',
                                backgroundColor: sectionproperties.reservation_bgcolor,
                                padding: 5,
                                borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomleftradius),
                                borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomrightradius),
                                borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertopleftradius),
                                borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertoprightradius),
                            }}
                            onPress={() => {
                                if (sectionproperties.generalbtnonclick == 'Vendors') {
                                    var tempaddressinfopayloadobj = { ...addressinfopayloadobj };
                                    tempaddressinfopayloadobj.srcfrom = 'innervendors';
                                    tempaddressinfopayloadobj.grouptypeprops = 'vendors';
                                    routingcountext(StaticPagesLinksContext.Innervendor, {
                                        genprodcompstinfo: tempaddressinfopayloadobj,
                                    });
                                } else if (sectionproperties.generalbtnonclick == 'Products') {
                                    var tempaddressinfopayloadobj = { ...addressinfopayloadobj };
                                    tempaddressinfopayloadobj.price_min = Low;
                                    tempaddressinfopayloadobj.price_max = High;
                                    tempaddressinfopayloadobj.collectionid = collectionid;
                                    routingcountext(StaticPagesLinksContext.GeneralProductsComponent, {
                                        genprodcompstinfo: tempaddressinfopayloadobj,
                                    });
                                }
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: sectionproperties.generalbtn_bgColor,
                                    borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomleftradius),
                                    borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomrightradius),
                                    borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertopleftradius),
                                    borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertoprightradius),
                                    width: StyleParseToIntFuncContext(sectionproperties.generalbtn_width),
                                    height: StyleParseToIntFuncContext(sectionproperties.generalbtn_height),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <AntDesign name="search1" size={StyleParseToIntFuncContext(sectionproperties.generalbtn_fontsize)} color={sectionproperties.generalbtn_textColor} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Modal
                animationType="slide"
                presentationStyle="formSheet"
                visible={openModal}
                onRequestClose={() => {
                    setopenModal(false);
                }}
            >
                <View style={Modalstyles.centeredView}>
                    <View style={Modalstyles.modalView}>
                        <View style={{ width: '100%', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <Pressable
                                style={[generalstyles.allcentered, { width: 40, height: 40, borderRadius: 100 }]}
                                onPress={() => {
                                    setopenModal(false);
                                }}
                            >
                                <AntDesign name="close" color={'#000'} size={22} />
                            </Pressable>
                        </View>

                        <View style={{ width: '100%', marginTop: 20 }}>
                            <FlatList
                                data={collectionsarray}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item, index }) => {
                                    if (item.isshowntocustomers == 1 && item.isinftiler == 1) {
                                        return (
                                            <TouchableOpacity
                                                activeOpacity={0.9}
                                                onPress={() => {
                                                    setcollectionname(langdetect == 'en' ? item?.title_en : item?.title_ar);
                                                    setopenModal(false);
                                                    setcollectionid(item.collectionid);
                                                }}
                                                style={[
                                                    {
                                                        overflow: 'hidden',
                                                        width: '100%',
                                                        paddingHorizontal: 5,
                                                        justifyContent: 'center',
                                                    },
                                                ]}
                                            >
                                                <Text style={[generalstyles.poppinsMedium, { color: '#000', fontSize: 14, textTransform: 'capitalize', textAlign: 'left' }]}>
                                                    {langdetect == 'en' ? item?.title_en : item?.title_ar}
                                                </Text>
                                                <View
                                                    style={{
                                                        width: '100%',
                                                        height: 1,
                                                        backgroundColor: '#eee',
                                                        marginVertical: 20,
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        );
                                    }
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        width: 15,
        height: 15,
        borderRadius: 12,
        // borderWidth: 2,
        // borderColor: '#ccc',
        backgroundColor: '#000',
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
export default FilterSection;
