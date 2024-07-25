import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { COLORS } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import PickerModal from 'react-native-picker-modal-view';
import SpinnerButton from 'react-native-spinner-button';
const CustomerAddressInformation = (props) => {
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [dataloaded, setdataloaded] = useState(true);
    const [payloadobj, setpayloadobj] = useState(props.payloadobj);
    const [address, setaddress] = useState(props.srcfrom == 'customerinformationform' ? props.payloadobj?.shippingaddress : props.payloadobj?.address);
    const [countriesarray, setcountriesarray] = useState([]);
    const [statesarray, setstatesarray] = useState([]);
    const [citiesarray, setcitiesarray] = useState([]);
    const [countryname, setcountryname] = useState(langdetect == 'en' ? 'Choose Country' : 'إختر البلد');
    const [statename, setstatename] = useState(langdetect == 'en' ? 'Choose State' : 'إختر المحافظة');
    const [cityname, setcityname] = useState(langdetect == 'en' ? 'Choose City' : 'إختر المدينة');
    const [notes, setnotes] = useState('');
    const localInputRef = useRef();
    const keyboardDidHideCallback = () => {
        if (payloadobj.address != null && payloadobj.address != '' && payloadobj.address != undefined) {
            localInputRef.current.blur?.();
        }
    };

    useEffect(() => {
        if (props.srcfromprops == 'checkout' && sectionproperties.hideaddress == 'Show') {
            const keyboardDidHideSubscription = Keyboard.addListener('keyboardDidHide', keyboardDidHideCallback);
            return () => {
                keyboardDidHideSubscription?.remove();
            };
        }
    }, []);

    useEffect(() => {
        setsectionproperties({ ...props.sectionproperties });
    }, [props.sectionproperties]);
    useEffect(() => {
        setpayloadobj({ ...props.payloadobj });
    }, [props.payloadobj]);
    const {
        FetchQueriesEngineContext,
        setFetchQueriesEngineContext,
        setFetchTabexStatesPayloadobjContext,
        FetchTabexStatesPayloadobjContext,
        fetchTabexCountriesQueryContext,
        fetchTabexStatesQueryContext,
        fetchTabexCitiesQueryContext,
        fetchAuthorizationQueryContext,
    } = useContext(FetchingContext);
    useEffect(() => {
        var tempFetchQueriesEngineContext = { ...FetchQueriesEngineContext };
        tempFetchQueriesEngineContext.fetchtabexcountries = true;
        setFetchQueriesEngineContext({ ...tempFetchQueriesEngineContext });
        var tempFetchTabexStatesPayloadobjContext = { ...FetchTabexStatesPayloadobjContext };
        if (props.payloadobj.countryid != null) {
            tempFetchTabexStatesPayloadobjContext.country_id = props.payloadobj.countryid;
        }
        if (props.payloadobj.stateid != null) {
            tempFetchTabexStatesPayloadobjContext.state_id = props.payloadobj.stateid;
        }
        setFetchTabexStatesPayloadobjContext({ ...tempFetchTabexStatesPayloadobjContext });
    }, [props.payloadobj]);
    useEffect(() => {
        if (!fetchTabexCountriesQueryContext.isFetching && fetchTabexCountriesQueryContext.isSuccess && dataloaded) {
            var tempcountriesarray = [];
            fetchTabexCountriesQueryContext.data.data.countries.forEach(function (arrayItem, arrayindex) {
                if (arrayItem.id == payloadobj.countryid) {
                    setcountryname(arrayItem.name);
                }
                var crname = '';
                if (langdetect == 'en') {
                    crname = arrayItem.name;
                } else if (langdetect == 'ar') {
                    if (arrayItem.name_ar != null) {
                        crname = arrayItem.name_ar;
                    } else {
                        crname = arrayItem.name;
                    }
                }
                var tempcountrieobj = {
                    Id: arrayItem.id,
                    Name: crname,
                };
                tempcountriesarray.push({ ...tempcountrieobj });
            });
            setcountriesarray([...tempcountriesarray]);
            // if (fetchTabexCountriesQueryContext?.data?.data?.countries?.length == 1) {
            //     var tempcountryname = '';
            //     if (langdetect == 'en') {
            //         tempcountryname = fetchTabexCountriesQueryContext?.data?.data?.countries[0]?.name;
            //     } else if (langdetect == 'ar') {
            //         tempcountryname = fetchTabexCountriesQueryContext?.data?.data?.countries[0]?.name_ar;
            //     }
            //     selectcountryfunc(fetchTabexCountriesQueryContext?.data?.data?.countries[0]?.id, tempcountryname);
            // }
        }
    }, [fetchTabexCountriesQueryContext.isSuccess, dataloaded]);
    useEffect(() => {
        if (!fetchTabexStatesQueryContext.isFetching && fetchTabexStatesQueryContext.isSuccess && dataloaded) {
            var tempstatesarray = [];

            fetchTabexStatesQueryContext.data.data.states.forEach(function (arrayItem, arrayindex) {
                if (arrayItem.id == payloadobj.stateid) {
                    setstatename(arrayItem.name);
                }
                var crname = '';
                if (langdetect == 'en') {
                    crname = arrayItem.name;
                } else if (langdetect == 'ar') {
                    if (arrayItem.name_ar != null) {
                        crname = arrayItem.name_ar;
                    } else {
                        crname = arrayItem.name;
                    }
                }
                var tempstateobj = {
                    Id: arrayItem.id,
                    Name: crname,
                };
                tempstatesarray.push({ ...tempstateobj });
            });

            setstatesarray([...tempstatesarray]);

            // if (fetchTabexStatesQueryContext?.data?.data?.states?.length == 1) {
            //     var tempcityname = '';
            //     if (langdetect == 'en') {
            //         tempcityname = fetchTabexStatesQueryContext?.data?.data?.states[0]?.name;
            //     } else if (langdetect == 'ar') {
            //         tempcityname = fetchTabexStatesQueryContext?.data?.data?.states[0]?.name_ar;
            //     }
            //     selectstatefunc(fetchTabexStatesQueryContext?.data?.data?.states[0]?.id, tempcityname);
            // }
        }
    }, [fetchTabexStatesQueryContext.isSuccess, fetchTabexStatesQueryContext.data, dataloaded]);
    useEffect(() => {
        if (!fetchTabexCitiesQueryContext.isFetching && fetchTabexCitiesQueryContext.isSuccess && dataloaded) {
            var tempcitiesarray = [];
            fetchTabexCitiesQueryContext.data.data.cities.forEach(function (arrayItem, arrayindex) {
                if (arrayItem.id == payloadobj.cityid) {
                    setcityname(arrayItem.name);
                }
                var crname = '';
                if (langdetect == 'en') {
                    crname = arrayItem.name;
                } else if (langdetect == 'ar') {
                    if (arrayItem.name_ar != null) {
                        crname = arrayItem.name_ar;
                    } else {
                        crname = arrayItem.name;
                    }
                }
                var tempcityobj = {
                    Id: arrayItem.id,
                    Name: crname,
                };
                tempcitiesarray.push({ ...tempcityobj });
            });
            setcitiesarray([...tempcitiesarray]);
        }
    }, [fetchTabexCitiesQueryContext.isSuccess, fetchTabexCitiesQueryContext.data, dataloaded]);
    const selectcountryfunc = (countryid, countryname) => {
        var tempFetchTabexStatesPayloadobjContext = { ...FetchTabexStatesPayloadobjContext };
        tempFetchTabexStatesPayloadobjContext.functype = 'states';
        tempFetchTabexStatesPayloadobjContext.country_id = countryid;
        setFetchTabexStatesPayloadobjContext({ ...tempFetchTabexStatesPayloadobjContext });

        var temppayloadobj = { ...payloadobj };
        temppayloadobj.countryid = countryid;
        temppayloadobj.country_ids = [countryid];

        props.setpayloadobj({ ...temppayloadobj });
        if (props.srcfrom == 'filter') {
            props.setpayloadobj2({ ...temppayloadobj });
        }
        if (props.srcfromprops == 'checkout') {
            props.cartinfoupdater(temppayloadobj);
        }
        setcountryname(countryname);
    };
    const selectstatefunc = (stateid, statename) => {
        var tempFetchTabexStatesPayloadobjContext = { ...FetchTabexStatesPayloadobjContext };
        tempFetchTabexStatesPayloadobjContext.functype = 'cities';
        tempFetchTabexStatesPayloadobjContext.state_id = stateid;
        setFetchTabexStatesPayloadobjContext({ ...tempFetchTabexStatesPayloadobjContext });

        var temppayloadobj = { ...payloadobj };
        temppayloadobj.stateid = stateid;
        temppayloadobj.state_ids = [stateid];

        props.setpayloadobj({ ...temppayloadobj });
        if (props.srcfrom == 'filter') {
            props.setpayloadobj2({ ...temppayloadobj });
        }
        if (props.srcfromprops == 'checkout') {
            props.cartinfoupdater(temppayloadobj);
        }
        setstatename(statename);
    };
    return (
        <View style={{ width: '100%' }}>
            {Object.keys(sectionproperties).length != 0 && (
                <View style={{ width: '100%' }}>
                    <View
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',

                            width: '100%',
                        }}
                    >
                        <View style={{ flexDirection: 'column', width: '100%' }}>
                            {/* country */}
                            {sectionproperties.hidecountrystatecity == 'Show' && (
                                <View
                                    style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                        display: sectionproperties.hidecountrystatecity == 'Hide' ? (sectionproperties.customerAddressrequiered == 1 ? 'flex' : 'none') : 'flex',
                                    }}
                                >
                                    <View style={[styles.inputscontainer, { flex: 1, marginHorizontal: 1 }]}>
                                        <Text
                                            style={[
                                                {
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
                                            {lang.country} {props?.customeraddressrequierd == 1 && <Text style={{ color: COLORS.danger }}>*</Text>}
                                        </Text>
                                        <PickerModal
                                            renderSelectView={(disabled, selected, showModal) => (
                                                <TouchableOpacity
                                                    style={[
                                                        styles.textinput,
                                                        {
                                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
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
                                                            elevation: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 1 : 0,
                                                            backgroundColor: sectionproperties.input_bgcolor,
                                                            borderWidth:
                                                                sectionproperties.inputfieldbordertype == 'All' ? StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) : 0,
                                                            borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                                            borderColor: sectionproperties.inputfieldborderColor,
                                                            height: StyleParseToIntFuncContext(sectionproperties.inputfieldheight),
                                                        },
                                                    ]}
                                                    onPress={showModal}
                                                >
                                                    {fetchTabexCountriesQueryContext.isFetching && (
                                                        <View style={[{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 25 }]}>
                                                            <SpinnerButton
                                                                buttonStyle={{ width: 25, height: 25 }}
                                                                isLoading={true}
                                                                indicatorCount={10}
                                                                spinnerType={'MaterialIndicator'}
                                                                spinnerColor={sectionproperties.inputfieldcolor}
                                                            ></SpinnerButton>
                                                        </View>
                                                    )}
                                                    {!fetchTabexCountriesQueryContext.isFetching && fetchTabexCountriesQueryContext.isSuccess && (
                                                        <Text
                                                            disabled={disabled}
                                                            style={[
                                                                generalstyles.poppinsMedium,
                                                                {
                                                                    color: sectionproperties.inputfieldcolor,
                                                                    fontSize: sectionproperties.inputfieldfontsize == null ? 13 : StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                                                    textAlign: 'left',
                                                                },
                                                            ]}
                                                        >
                                                            {countryname}
                                                        </Text>
                                                    )}
                                                </TouchableOpacity>
                                            )}
                                            onSelected={(selected) => {
                                                // if (Object.keys(selected).length != 0) {
                                                //     var tempFetchTabexStatesPayloadobjContext = { ...FetchTabexStatesPayloadobjContext };
                                                //     tempFetchTabexStatesPayloadobjContext.functype = 'states';
                                                //     tempFetchTabexStatesPayloadobjContext.country_id = selected.Id;
                                                //     setFetchTabexStatesPayloadobjContext({ ...tempFetchTabexStatesPayloadobjContext });

                                                //     var temppayloadobj = { ...payloadobj };
                                                //     temppayloadobj.countryid = selected.Id;

                                                //     props.setpayloadobj({ ...temppayloadobj });
                                                //     if (props.srcfrom == 'filter') {
                                                //         props.setpayloadobj2({ ...temppayloadobj });
                                                //     }
                                                //     setcountryname(selected.Name);
                                                // }
                                                if (Object.keys(selected).length != 0) {
                                                    selectcountryfunc(selected.Id, selected.Name);
                                                }
                                            }}
                                            items={countriesarray}
                                            sortingLanguage={'tr'}
                                            showToTopButton={true}
                                            selectPlaceholderText={lang.choosecountry}
                                            searchPlaceholderText={lang.search}
                                            requireSelection={false}
                                            autoSort={false}
                                            searchInputTextColor={sectionproperties.inputfieldcolor}
                                        />
                                    </View>
                                    {/* State */}
                                    <View style={[styles.inputscontainer, { flex: 1, marginHorizontal: 1 }]}>
                                        <Text
                                            style={[
                                                {
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
                                            {lang.state} {props?.customeraddressrequierd == 1 && <Text style={{ color: COLORS.danger }}>*</Text>}
                                        </Text>
                                        <PickerModal
                                            renderSelectView={(disabled, selected, showModal) => (
                                                <TouchableOpacity
                                                    style={[
                                                        styles.textinput,
                                                        {
                                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
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
                                                            elevation: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 1 : 0,
                                                            backgroundColor: sectionproperties.input_bgcolor,
                                                            borderWidth:
                                                                sectionproperties.inputfieldbordertype == 'All' ? StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) : 0,
                                                            borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                                            borderColor: sectionproperties.inputfieldborderColor,
                                                            height: StyleParseToIntFuncContext(sectionproperties.inputfieldheight),
                                                        },
                                                    ]}
                                                    onPress={showModal}
                                                >
                                                    {fetchTabexStatesQueryContext.isFetching && (
                                                        <View style={[{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 25 }]}>
                                                            <SpinnerButton
                                                                buttonStyle={{ width: 25, height: 25 }}
                                                                isLoading={true}
                                                                indicatorCount={10}
                                                                spinnerType={'MaterialIndicator'}
                                                                spinnerColor={sectionproperties.inputfieldcolor}
                                                            ></SpinnerButton>
                                                        </View>
                                                    )}
                                                    {!fetchTabexStatesQueryContext.isFetching && fetchTabexStatesQueryContext.isSuccess && (
                                                        <Text
                                                            disabled={disabled}
                                                            title={'Show me!'}
                                                            style={[
                                                                generalstyles.poppinsMedium,
                                                                {
                                                                    color: sectionproperties.inputfieldcolor,
                                                                    // fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                                                    fontSize: sectionproperties.inputfieldfontsize == null ? 13 : StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                                                    textAlign: 'left',
                                                                },
                                                            ]}
                                                        >
                                                            {statename}
                                                        </Text>
                                                    )}
                                                </TouchableOpacity>
                                            )}
                                            onSelected={(selected) => {
                                                // if (Object.keys(selected).length != 0) {
                                                // var tempFetchTabexStatesPayloadobjContext = { ...FetchTabexStatesPayloadobjContext };
                                                // tempFetchTabexStatesPayloadobjContext.functype = 'cities';
                                                // tempFetchTabexStatesPayloadobjContext.state_id = selected.Id;
                                                // setFetchTabexStatesPayloadobjContext({ ...tempFetchTabexStatesPayloadobjContext });

                                                // var temppayloadobj = { ...payloadobj };
                                                // temppayloadobj.stateid = selected.Id;

                                                // props.setpayloadobj({ ...temppayloadobj });
                                                // if (props.srcfrom == 'filter') {
                                                //     props.setpayloadobj2({ ...temppayloadobj });
                                                // }
                                                // setstatename(selected.Name);
                                                // }
                                                if (Object.keys(selected).length != 0) {
                                                    selectstatefunc(selected.Id, selected.Name);
                                                }
                                            }}
                                            items={statesarray}
                                            sortingLanguage={'tr'}
                                            showToTopButton={true}
                                            selectPlaceholderText={lang.choosestate}
                                            searchPlaceholderText={lang.search}
                                            requireSelection={false}
                                            autoSort={false}
                                            searchInputTextColor={sectionproperties.inputfieldcolor}
                                        />
                                    </View>
                                    {/* City */}
                                    <View style={[styles.inputscontainer, { flex: 1, marginHorizontal: 1 }]}>
                                        <Text
                                            style={[
                                                {
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
                                            {langdetect == 'en' ? 'Area' : 'المنطقة'} {props?.customeraddressrequierd == 1 && <Text style={{ color: COLORS.danger }}>*</Text>}
                                        </Text>
                                        <PickerModal
                                            renderSelectView={(disabled, selected, showModal) => (
                                                <TouchableOpacity
                                                    style={[
                                                        styles.textinput,
                                                        {
                                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
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
                                                            elevation: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 1 : 0,
                                                            backgroundColor: sectionproperties.input_bgcolor,
                                                            borderWidth:
                                                                sectionproperties.inputfieldbordertype == 'All' ? StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) : 0,
                                                            borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                                            borderColor: sectionproperties.inputfieldborderColor,
                                                            height: StyleParseToIntFuncContext(sectionproperties.inputfieldheight),
                                                        },
                                                    ]}
                                                    onPress={showModal}
                                                >
                                                    {fetchTabexCitiesQueryContext.isFetching && (
                                                        <View style={[{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 25 }]}>
                                                            <SpinnerButton
                                                                buttonStyle={{ width: 25, height: 25 }}
                                                                isLoading={true}
                                                                indicatorCount={10}
                                                                spinnerType={'MaterialIndicator'}
                                                                spinnerColor={sectionproperties.inputfieldcolor}
                                                            ></SpinnerButton>
                                                        </View>
                                                    )}
                                                    {!fetchTabexCitiesQueryContext.isFetching && fetchTabexCitiesQueryContext.isSuccess && (
                                                        <Text
                                                            disabled={disabled}
                                                            title={'Show me!'}
                                                            style={[
                                                                generalstyles.poppinsMedium,
                                                                {
                                                                    color: sectionproperties.inputfieldcolor,
                                                                    // fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                                                    fontSize: sectionproperties.inputfieldfontsize == null ? 13 : StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                                                    textAlign: 'left',
                                                                },
                                                            ]}
                                                        >
                                                            {cityname}
                                                        </Text>
                                                    )}
                                                </TouchableOpacity>
                                            )}
                                            onSelected={(selected) => {
                                                if (Object.keys(selected).length != 0) {
                                                    var temppayloadobj = { ...payloadobj };
                                                    temppayloadobj.cityid = selected.Id;
                                                    temppayloadobj.city_ids = [selected.Id];
                                                    props.setpayloadobj({ ...temppayloadobj });

                                                    if (props.srcfrom == 'filter') {
                                                        props.setpayloadobj2({ ...temppayloadobj });
                                                    }
                                                    if (props.srcfromprops == 'checkout') {
                                                        props.cartinfoupdater(temppayloadobj);
                                                    }
                                                    setcityname(selected.Name);
                                                }
                                            }}
                                            items={citiesarray}
                                            sortingLanguage={'tr'}
                                            showToTopButton={true}
                                            selectPlaceholderText={lang.choosestate}
                                            searchPlaceholderText={lang.search}
                                            requireSelection={false}
                                            autoSort={false}
                                            searchInputTextColor={sectionproperties.inputfieldcolor}
                                        />
                                    </View>
                                </View>
                            )}
                            {/* shipping address */}
                            {props.srcfrom != 'filter' && sectionproperties.hideaddress == 'Show' && (
                                <View
                                    style={[
                                        styles.inputscontainer,
                                        {
                                            display:
                                                sectionproperties.hideaddress == 'Hide'
                                                    ? fetchAuthorizationQueryContext?.data?.data?.instinfo?.customerAddressrequiered == '1'
                                                        ? 'flex'
                                                        : 'none'
                                                    : 'flex',
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            {
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
                                        {langdetect == 'en' ? sectionproperties.shippingaddressen : sectionproperties.shippingaddressar}
                                        {props?.customeraddressrequierd == 1 && <Text style={{ color: COLORS.danger }}> *</Text>}
                                    </Text>
                                    <TextInput
                                        style={[
                                            styles.textinput,
                                            generalstyles.poppinsMedium,
                                            {
                                                borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
                                                color: sectionproperties.inputfieldcolor,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.form_labelfontsize),
                                                shadowColor: sectionproperties.inputshadowcolor,
                                                shadowOpacity: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 0.1 : 0,
                                                shadowOffset: {
                                                    width: 0,
                                                    height: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                                },
                                                shadowRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                                elevation: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 1 : 0,
                                                backgroundColor: sectionproperties.input_bgcolor,
                                                borderWidth: sectionproperties.inputfieldbordertype == 'All' ? StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) : 0,
                                                borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                                borderColor: sectionproperties.inputfieldborderColor,
                                                height: 100,
                                            },
                                        ]}
                                        multiline={true}
                                        numberOfLines={5}
                                        value={address}
                                        onChangeText={(value) => {
                                            setaddress(value);
                                            var temppayloadobj = { ...payloadobj };
                                            if (props.srcfrom == 'customerinformationform') {
                                                temppayloadobj.shippingaddress = value;
                                            } else {
                                                temppayloadobj.address = value;
                                            }
                                            props.setpayloadobj({ ...temppayloadobj });
                                        }}
                                        ref={localInputRef}
                                        onEndEditing={(value) => {
                                            // var temppayloadobj = { ...payloadobj };
                                            // if (props.srcfrom == 'customerinformationform') {
                                            //     temppayloadobj.shippingaddress = value.nativeEvent.text;
                                            // } else {
                                            //     temppayloadobj.address = value.nativeEvent.text;
                                            // }
                                            // props.setpayloadobj({ ...temppayloadobj });
                                        }}
                                    />
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    inputscontainer: {
        marginBottom: 20,
        width: '100%',
        position: 'relative',
        flexDirection: 'column',
    },
    textinput: {
        height: 45,
        paddingStart: 10,
        paddingEnd: 10,
        width: '100%',
        fontFamily: 'Poppins-Medium',
        marginTop: 5,
    },
});

export default CustomerAddressInformation;
