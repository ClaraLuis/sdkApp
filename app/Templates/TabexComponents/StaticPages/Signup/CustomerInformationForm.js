import React, { useState, useContext, useEffect, useRef } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { COLORS, SIZES } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import API from '../../../API/API';
import { useMutation } from 'react-query';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import SpinnerButton from 'react-native-spinner-button';
import CheckBox from 'react-native-check-box';
import SelectDropdown from 'react-native-select-dropdown';
import CustomerAddressInformation from './CustomerAddressInformation';
import CustomerPersonalInformation from './CustomerPersonalInformation';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Feather } from '@expo/vector-icons';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Updates from 'expo-updates';

const CustomerInformationForm = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const { CustomerSignUp_API } = API();
    const { lang, langdetect } = useContext(LanguageContext);
    const { CurrentPageIdContext, ProjectOpenrcTypeContext, INSTAPIKEYCONTEXT, StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { routingcountext, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
    const {
        GeneralAPIMutationContext,
        FetchQueriesEngineContext,
        setFetchQueriesEngineContext,
        fetchinstitutecustomerinfosignupQueryContext,
        fetchAuthorizationQueryContext,
        fetchcustomercartQueryContext,
    } = useContext(FetchingContext);
    const { showUpTopNotificationBarContext } = useContext(FetchingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [StatePageProperties, setStatePageProperties] = useState({});
    const [customeraddressrequierd, setcustomeraddressrequierd] = useState(fetchAuthorizationQueryContext?.data?.data?.instinfo?.customerAddressrequiered);
    const [customervalidateemail, setcustomervalidateemail] = useState(fetchAuthorizationQueryContext?.data?.data?.instinfo?.customervalidateemail);
    const [customervalidatephonenumber, setcustomervalidatephonenumber] = useState(fetchAuthorizationQueryContext?.data?.data?.instinfo?.customervalidatephonenumber);

    const [validateemailmodal, setvalidateemailmodal] = useState(false);
    const [validatephonenumbermodal, setvalidatephonenumbermodal] = useState(false);
    const [validatephonenumberpayload, setvalidatephonenumberpayload] = useState({
        phonenumber: '',
        code: '',
        step: 'sendcode',
        isvalidated: false,
    });
    const [validateemailpayload, setvalidateemailpayload] = useState({
        email: '',
        code: '',
        step: 'sendcode',
        isvalidated: false,
    });
    const [dataloaded, setdataloaded] = useState(false);
    const [payloadobj, setpayloadobj] = useState({
        instapikey: '',
        name: '',
        email: '',
        mobile: '',
        password: '',
        password2: '',
        shippingaddress: '',
        addedsourcetype: 'Webapp',
        instsignupformvalues: [],
        countryid: '',
        stateid: '',
        cityid: '',
    });

    const [hidePassword, sethidePassword] = useState(true);
    const [hidePassword2, sethidePassword2] = useState(true);
    const [waitingpage, setwaitingpage] = useState(false);

    useEffect(() => {
        StatePageProperties11.pages.forEach(function (item, index) {
            if (CurrentPageIdContext == item.pageid) {
                setStatePageProperties(item.pageobj);
            }
        });
    }, [StatePageProperties11]);
    useEffect(() => {
        if (payloadobj?.email?.length == 0) {
            console.log('HERERERE EMAIL');
            fetchinstitutecustomerinfosignupQueryContext.refetch();
        }
    }, [payloadobj.email]);
    useEffect(() => {
        var tempFetchQueriesEngineContext = FetchQueriesEngineContext;
        tempFetchQueriesEngineContext.institutecustomerinfosignup = true;
        tempFetchQueriesEngineContext.fetchtabexcountries = true;
        setFetchQueriesEngineContext({ ...tempFetchQueriesEngineContext });
    }, []);
    useEffect(() => {
        var secpropobj = {};
        if (StatePageProperties != undefined && StatePageProperties.pageobj != undefined && StatePageProperties.pageobj.pageproperties != undefined) {
            StatePageProperties.pageobj.pageproperties.forEach(function (sectionitem, sectionindex) {
                secpropobj[sectionitem.property_css_name] = sectionitem.property_value;
            });
        }
        setsectionproperties({ ...secpropobj });
    }, [StatePageProperties]);

    useEffect(() => {
        if (fetchinstitutecustomerinfosignupQueryContext.isSuccess) {
            if (fetchAuthorizationQueryContext.data.data.loggedin == true) {
                var tempcustomerinfoobj = { ...fetchinstitutecustomerinfosignupQueryContext.data.data.customerinfo };
                setpayloadobj({ ...tempcustomerinfoobj });
                setdataloaded(true);
            } else {
                var tempcustomerinfoobj = { ...payloadobj };
                tempcustomerinfoobj.instsignupformvalues = [...fetchinstitutecustomerinfosignupQueryContext.data.data.instsignupformvalues];
                setpayloadobj({ ...tempcustomerinfoobj });
                setdataloaded(true);
            }
        }
    }, [fetchinstitutecustomerinfosignupQueryContext.isFetching, fetchinstitutecustomerinfosignupQueryContext.isSuccess, fetchinstitutecustomerinfosignupQueryContext.data]);
    useEffect(() => {
        if (fetchAuthorizationQueryContext.isSuccess) {
            setcustomeraddressrequierd(fetchAuthorizationQueryContext?.data?.data?.instinfo?.customerAddressrequiered);
            setcustomervalidateemail(fetchAuthorizationQueryContext?.data?.data?.instinfo?.customervalidateemail);
            setcustomervalidatephonenumber(fetchAuthorizationQueryContext?.data?.data?.instinfo?.customervalidatephonenumber);
        }
    }, [fetchAuthorizationQueryContext.isSuccess]);
    const payloadobjchange = (key, value) => {
        var temppayloadobj = { ...payloadobj };
        temppayloadobj[key] = value;
        setpayloadobj({ ...temppayloadobj });
    };
    const CustomerSignUpMutation = useMutation('CustomerSignUp_API', {
        mutationFn: CustomerSignUp_API,
        onMutate: (variables) => {},
        onError: (error, variables, context) => {
            if (variables.functype == 'add') {
                showUpTopNotificationBarContext(lang.errorcreatingaccount, 'red');
            } else {
                showUpTopNotificationBarContext(lang.errorupdatingaccount, 'red');
            }
        },
        onSuccess: (data, variables, context) => {
            if (data.data.status) {
                if (variables.functype == 'add') {
                    if (sectionproperties.redirectsaftersignup == 'Home') {
                        AsyncStorage.setItem('token', data.data.token);
                        axios.interceptors.request.use(function (config) {
                            var defaultheaders = config.headers;
                            defaultheaders.Authorization = 'Bearer ' + data.data.token;
                            config.headers = defaultheaders;
                            return config;
                        });
                        routingcountext('Home');
                    } else {
                        setwaitingpage(true);
                    }
                    showUpTopNotificationBarContext(lang.accountcreatedsuccess, 'green');
                    if (fetchAuthorizationQueryContext.data.data.instinfo.is_to_institute == 1) {
                        Updates.reloadAsync();
                    }
                } else {
                    showUpTopNotificationBarContext(lang.accountupdatedsuccess, 'green');
                }
                if (sectionproperties.redirectsaftersignup == 'Home') {
                    fetchAuthorizationQueryContext.refetch();
                    fetchcustomercartQueryContext.refetch();
                }
            } else {
                showUpTopNotificationBarContext(data.data.reason, 'orange');
            }
        },
    });
    const signupbuttonfunc = () => {
        if (verifypayload() == true) {
            var temppayloadobj = { ...payloadobj };
            if (fetchAuthorizationQueryContext.data.data.loggedin == true) {
                temppayloadobj.functype = 'edit';
            } else {
                temppayloadobj.functype = 'add';
            }
            temppayloadobj.addedsourcetype = 'Webapp';
            temppayloadobj.instapikey = INSTAPIKEYCONTEXT;
            CustomerSignUpMutation.mutate(temppayloadobj);
        }
    };
    const verifypayload = () => {
        var iscompleted = false;
        var isshippingaddresscompleted = false;
        var passwordvalidation = false;
        if (fetchAuthorizationQueryContext.data.data.loggedin == false) {
            if (fetchAuthorizationQueryContext.data.data.instinfo.ispasswordrequired_signup == 1) {
                if (payloadobj.password.length != 0) {
                    if (payloadobj.password == payloadobj.password2) {
                        passwordvalidation = true;
                    }
                }
            } else {
                passwordvalidation = true;
            }
        } else if (fetchAuthorizationQueryContext.data.data.loggedin == true) {
            // if (fetchAuthorizationQueryContext.data.data.instinfo.ispasswordrequired_signup == 1) {
            if (payloadobj.password.length != 0) {
                if (payloadobj.password == payloadobj.password2) {
                    passwordvalidation = true;
                }
            }
            // } else {
            //     passwordvalidation = true;
            // }
        }

        if (passwordvalidation == false) {
            showUpTopNotificationBarContext(lang.passwordsdontmatch, 'orange');
        }
        if (customeraddressrequierd == 1) {
            if (payloadobj?.countryid?.length != 0 && payloadobj?.stateid?.length != 0 && payloadobj?.cityid?.length != 0 && payloadobj?.shippingaddress?.length != 0) {
                isshippingaddresscompleted = true;
            }
        } else {
            isshippingaddresscompleted = true;
        }
        if (payloadobj?.email.length != 0 && payloadobj?.name.length != 0 && payloadobj?.mobile?.length != 0 && passwordvalidation == true) {
            if (isshippingaddresscompleted) {
                var signupformismissing = true;
                payloadobj?.instsignupformvalues.forEach(function (arrayItem) {
                    // if (arrayItem.optional == 0) {
                    if (arrayItem.optional == 1) {
                        if (arrayItem.customersignupvalue == undefined || arrayItem.customersignupvalue.length == 0) {
                            signupformismissing = false;
                        }
                    }
                });
                if (signupformismissing) {
                    iscompleted = true;
                } else {
                    showUpTopNotificationBarContext(lang.pleasecompletethemissingfields, 'orange');
                }
            } else {
                showUpTopNotificationBarContext(lang.pleasecompleteaddressmissingfields, 'orange');
            }
        } else {
            if (passwordvalidation == true) {
                showUpTopNotificationBarContext(lang.pleasecompletethemissingfields, 'orange');
            }
        }
        return iscompleted;
    };
    const FormContent = () => {
        return (
            <View style={{ width: '100%' }}>
                {!dataloaded && (
                    <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <SpinnerButton buttonStyle={{ width: 50, height: 50 }} isLoading={true} indicatorCount={10} spinnerType={'MaterialIndicator'} spinnerColor={'#ccc'}></SpinnerButton>
                    </View>
                )}

                {dataloaded && (
                    <View style={{ flexDirection: 'column', width: '100%' }}>
                        <CustomerPersonalInformation payloadobj={payloadobj} sectionproperties={sectionproperties} setpayloadobj={setpayloadobj} validateemailpayload={validateemailpayload} />
                        <CustomerAddressInformation
                            customeraddressrequierd={customeraddressrequierd}
                            payloadobj={payloadobj}
                            sectionproperties={sectionproperties}
                            setpayloadobj={setpayloadobj}
                            srcfrom={'customerinformationform'}
                        />
                        {payloadobj.instsignupformvalues?.length != 0 &&
                            payloadobj.instsignupformvalues?.map((item, index) => {
                                var selectboxarray = [];
                                var selectboxarraytranslated = [];
                                if (item.inputtype == 'selectbox') {
                                    JSON.parse(item.selectboxvalues).forEach(function (item, index) {
                                        selectboxarray.push(item.optionname_en);
                                        selectboxarraytranslated.push(item.optionname_ar);
                                    });
                                }
                                return (
                                    <View style={[styles.inputscontainer]}>
                                        {item.inputtype == 'input' && (
                                            <View>
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
                                                        },
                                                    ]}
                                                >
                                                    {langdetect == 'en' ? item.inputname_en : item.inputname_ar} <Text style={{ color: COLORS.danger }}>{item.optional == 1 ? '*' : ''}</Text>
                                                </Text>
                                                <TextInput
                                                    style={[
                                                        styles.textinput,
                                                        {
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
                                                            borderColor: sectionproperties.inputfieldborderColor,
                                                            borderWidth:
                                                                sectionproperties.inputfieldbordertype == 'All' ? StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) : 0,
                                                            borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                                        },
                                                    ]}
                                                    value={item.customersignupvalue}
                                                    multiline={item.inputtype == 'textarea' ? true : false}
                                                    onChangeText={(value) => {
                                                        var temppayloadobj = { ...payloadobj };
                                                        temppayloadobj.instsignupformvalues[index].customersignupvalue = value;
                                                        setpayloadobj({ ...temppayloadobj });
                                                    }}
                                                />
                                            </View>
                                        )}
                                        {item.inputtype == 'textarea' && (
                                            <View>
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
                                                        },
                                                    ]}
                                                >
                                                    {langdetect == 'en' ? item.inputname_en : item.inputname_ar} <Text style={{ color: COLORS.danger }}>{item.optional == 1 ? '*' : ''}</Text>
                                                </Text>
                                                <TextInput
                                                    style={[
                                                        {
                                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
                                                            color: sectionproperties.inputfieldcolor,
                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                                            shadowColor: sectionproperties.inputshadowcolor,
                                                            // shadowOpacity: 0.1,
                                                            shadowOpacity: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 0.1 : 0,
                                                            // shadowOpacity: sectionproperties.inputshadowopacity,
                                                            backgroundColor: sectionproperties.input_bgcolor,
                                                            borderWidth:
                                                                sectionproperties.inputfieldbordertype == 'All' ? StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) : 0,
                                                            borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                                            borderColor: sectionproperties.inputfieldborderColor,
                                                            paddingStart: 10,
                                                            paddingEnd: 10,
                                                            width: '100%',
                                                            fontFamily: 'Poppins-Medium',
                                                            shadowOffset: {
                                                                width: 0,
                                                                height: 3,
                                                            },
                                                            shadowRadius: 3,
                                                            elevation: 1,
                                                            marginTop: 10,
                                                            paddingTop: 15,
                                                            paddingBottom: 15,
                                                        },
                                                    ]}
                                                    value={item.customersignupvalue}
                                                    multiline={true}
                                                    numberOfLines={10}
                                                    onChangeText={(value) => {
                                                        var temppayloadobj = { ...payloadobj };
                                                        temppayloadobj.instsignupformvalues[index].customersignupvalue = value;
                                                        setpayloadobj({ ...temppayloadobj });
                                                    }}
                                                />
                                            </View>
                                        )}
                                        {item.inputtype == 'checkbox' && (
                                            <View
                                                style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}
                                                // onPress={() => {
                                                //     var temppayloadobj = { ...payloadobj };
                                                //     if (temppayloadobj.instsignupformvalues[index].customersignupvalue == 1) {
                                                //         temppayloadobj.instsignupformvalues[index].customersignupvalue = 0;
                                                //     } else {
                                                //         temppayloadobj.instsignupformvalues[index].customersignupvalue = 1;
                                                //     }

                                                //     setpayloadobj({ ...temppayloadobj });
                                                // }}
                                            >
                                                <CheckBox
                                                    disabled={false}
                                                    checkBoxColor={sectionproperties.checkbox_color}
                                                    checkedCheckBoxColor={sectionproperties.checkbox_checkedcolor}
                                                    boxType="circle"
                                                    onClick={() => {
                                                        var temppayloadobj = { ...payloadobj };
                                                        if (temppayloadobj.instsignupformvalues[index].customersignupvalue == 1) {
                                                            temppayloadobj.instsignupformvalues[index].customersignupvalue = 0;
                                                        } else {
                                                            temppayloadobj.instsignupformvalues[index].customersignupvalue = 1;
                                                        }
                                                        setpayloadobj({ ...temppayloadobj });
                                                    }}
                                                    isChecked={item.customersignupvalue == 1 ? true : false}
                                                />
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
                                                            color: sectionproperties.checkbox_color,
                                                            fontSize: 15,
                                                            textAlign: 'left',
                                                            textTransform:
                                                                sectionproperties.form_labeltexttransform == 'Uppercase'
                                                                    ? 'uppercase'
                                                                    : sectionproperties.form_labeltexttransform == 'Capitalize'
                                                                    ? 'capitalize'
                                                                    : sectionproperties.form_labeltexttransform == 'None'
                                                                    ? 'none'
                                                                    : 'lowercase',
                                                            marginStart: 5,
                                                        },
                                                    ]}
                                                >
                                                    {langdetect == 'en' ? item.inputname_en : item.inputname_ar} <Text style={{ color: COLORS.danger }}>{item.optional == 1 ? '*' : ''}</Text>
                                                </Text>
                                            </View>
                                        )}
                                        {item.inputtype == 'selectbox' && (
                                            <View>
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
                                                    {langdetect == 'en' ? item.inputname_en : item.inputname_ar} <Text style={{ color: COLORS.danger }}>{item.optional == 1 ? '*' : ''}</Text>
                                                </Text>
                                                <View
                                                    style={{
                                                        // backgroundColor: sectionproperties.input_bgcolor,
                                                        // shadowColor: sectionproperties.inputshadowcolor,
                                                        // shadowOpacity: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 0.1 : 0,
                                                        // shadowOffset: {
                                                        //     width: 0,
                                                        //     height: 3,
                                                        // },
                                                        // shadowRadius: 3,
                                                        // elevation: 1,
                                                        // borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
                                                        // borderWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                                        // borderColor: sectionproperties.inputfieldborderColor,
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
                                                        borderColor: sectionproperties.inputfieldborderColor,
                                                        borderWidth:
                                                            sectionproperties.inputfieldbordertype == 'All' ? StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) : 0,
                                                        borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                                    }}
                                                >
                                                    <SelectDropdown
                                                        defaultButtonText={lang.chooseanoption}
                                                        data={langdetect == 'en' ? selectboxarray : selectboxarraytranslated}
                                                        defaultValue={item.customersignupvalue}
                                                        onSelect={(selectedItem) => {
                                                            var temppayloadobj = { ...payloadobj };
                                                            temppayloadobj.instsignupformvalues[index].customersignupvalue = selectedItem;
                                                            setpayloadobj({ ...temppayloadobj });
                                                            // console.log(selectedItem, index);
                                                        }}
                                                        buttonTextAfterSelection={(selectedItem, index) => {
                                                            return selectedItem;
                                                        }}
                                                        rowTextForSelection={(item, index) => {
                                                            return item;
                                                        }}
                                                        buttonStyle={{
                                                            color: sectionproperties.inputfieldcolor,
                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                                            width: '100%',
                                                            height: 45,
                                                            backgroundColor: 'transparent',
                                                        }}
                                                        buttonTextStyle={{
                                                            textAlign: 'left',
                                                            fontFamily: 'Poppins-Light',
                                                            color: sectionproperties.form_labelcolor,
                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.form_labelfontsize),
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                        )}
                                    </View>
                                );
                            })}
                        {/* password */}
                        {sectionproperties.hidepassword == 'Show' && fetchAuthorizationQueryContext.data.data.instinfo.ispasswordrequired_signup == 1 && (
                            <View style={[styles.inputscontainer]}>
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
                                            marginBottom: 5,
                                        },
                                    ]}
                                >
                                    {lang.password} <Text style={{ color: COLORS.danger }}>*</Text>
                                </Text>
                                <View
                                    style={[
                                        generalstyles.flexRow,
                                        styles.textinput,
                                        {
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
                                            borderWidth: sectionproperties.inputfieldbordertype == 'All' ? StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) : 0,
                                            borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                            borderColor: sectionproperties.inputfieldborderColor,
                                        },
                                    ]}
                                >
                                    <TextInput
                                        style={[
                                            generalstyles.poppinsMedium,
                                            {
                                                height: '100%',
                                                width: '90%',
                                                color: sectionproperties.inputfieldcolor,
                                            },
                                        ]}
                                        value={payloadobj.password}
                                        onChangeText={(value) => {
                                            payloadobjchange('password', value);
                                        }}
                                        secureTextEntry={hidePassword2}
                                    />
                                    <Feather
                                        name={hidePassword2 == true ? 'eye-off' : 'eye'}
                                        size={18}
                                        style={{
                                            color: sectionproperties.iconcontainercolor,
                                            opacity: 0.3,
                                            marginStart: 'auto',
                                        }}
                                        onPress={() => {
                                            sethidePassword2(!hidePassword2);
                                        }}
                                    />
                                </View>
                            </View>
                        )}
                        {/* confirm password */}
                        {sectionproperties.hidepassword == 'Show' && fetchAuthorizationQueryContext.data.data.instinfo.ispasswordrequired_signup == 1 && (
                            <View style={[styles.inputscontainer]}>
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
                                            marginBottom: 5,
                                        },
                                    ]}
                                >
                                    {lang.confirmpassword} <Text style={{ color: COLORS.danger }}>*</Text>
                                </Text>
                                <View
                                    style={[
                                        generalstyles.flexRow,
                                        styles.textinput,
                                        {
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
                                            borderWidth: sectionproperties.inputfieldbordertype == 'All' ? StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) : 0,
                                            borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                            borderColor: sectionproperties.inputfieldborderColor,
                                        },
                                    ]}
                                >
                                    <TextInput
                                        style={[
                                            generalstyles.poppinsMedium,
                                            {
                                                height: '100%',
                                                width: '90%',
                                                color: sectionproperties.inputfieldcolor,
                                            },
                                        ]}
                                        value={payloadobj.password2}
                                        onChangeText={(value) => {
                                            payloadobjchange('password2', value);
                                        }}
                                        secureTextEntry={hidePassword}
                                    />
                                    <Feather
                                        name={hidePassword == true ? 'eye-off' : 'eye'}
                                        size={18}
                                        style={{
                                            color: sectionproperties.iconcontainercolor,
                                            opacity: 0.3,
                                            marginStart: 'auto',
                                        }}
                                        onPress={() => {
                                            sethidePassword(!hidePassword);
                                        }}
                                    />
                                </View>
                            </View>
                        )}
                        {sectionproperties.showpassworddisclaimer == 'Show' &&
                            sectionproperties.hidepassword == 'Show' &&
                            fetchAuthorizationQueryContext.data.data.instinfo.ispasswordrequired_signup == 1 && (
                                <View
                                    style={[
                                        generalstyles.flexRow,
                                        {
                                            width: '100%',
                                        },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            color: COLORS.danger,
                                        }}
                                    >
                                        *{' '}
                                    </Text>
                                    <Text
                                        style={{
                                            color: COLORS.danger,
                                            fontSize: 13,
                                            fontFamily: 'Poppins-Medium',
                                            textAlign: 'left',
                                        }}
                                    >
                                        {langdetect == 'en' ? " Password shouldn't be lessthan 8 characters" : 'الرقم السرى لا يقل عن 8 حروف او ارقام'}
                                    </Text>
                                </View>
                            )}
                    </View>
                )}
            </View>
        );
    };
    const SignUpBtn = () => {
        return (
            <TouchableOpacity
                style={[
                    generalstyles.allcentered,
                    {
                        width: '70%',
                        height: StyleParseToIntFuncContext(sectionproperties.signup_btn_height != null && sectionproperties.signup_btn_height != undefined ? sectionproperties.signup_btn_height : 0),
                        borderRadius: StyleParseToIntFuncContext(sectionproperties.signup_btn_borderBottomLeftRadius, '', true),
                        backgroundColor: sectionproperties.signup_btnbgcolor,
                        borderWidth: StyleParseToIntFuncContext(sectionproperties.signup_btn_borderwidth, '', true),
                        borderColor: sectionproperties.signupbtn_bordercolor,
                    },
                ]}
                onPress={() => {
                    if (verifypayload() == true) {
                        var isEmailOTP_Validated = false;
                        var isPhoneNumberOTP_Validated = false;
                        if (customervalidateemail == 1) {
                            if (validateemailpayload.isvalidated) {
                                isEmailOTP_Validated = true;
                            } else {
                                isEmailOTP_Validated = false;
                                setvalidateemailmodal(true);
                            }
                        } else {
                            isEmailOTP_Validated = true;
                        }
                        if (customervalidatephonenumber == 1) {
                            if (validatephonenumberpayload.isvalidated) {
                                isPhoneNumberOTP_Validated = true;
                            } else {
                                isPhoneNumberOTP_Validated = false;
                                setvalidatephonenumbermodal(true);
                            }
                        } else {
                            isPhoneNumberOTP_Validated = true;
                        }
                        if (isPhoneNumberOTP_Validated && isEmailOTP_Validated) {
                            signupbuttonfunc();
                        }
                    }
                }}
            >
                {CustomerSignUpMutation.isLoading && (
                    <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <SpinnerButton
                            buttonStyle={{ width: 30, height: 30 }}
                            isLoading={true}
                            indicatorCount={10}
                            spinnerType={'MaterialIndicator'}
                            spinnerColor={sectionproperties.signup_btn_color}
                        ></SpinnerButton>
                    </View>
                )}
                {!CustomerSignUpMutation.isLoading && (
                    <Text
                        style={[
                            {
                                color: sectionproperties.signup_btn_color,
                                fontSize: StyleParseToIntFuncContext(sectionproperties.signup_btn_fontSize),
                                // fontFamily: 'Poppins-Medium',
                                fontFamily:
                                    sectionproperties.signup_btn_fontweight == 300
                                        ? 'Poppins-Thin'
                                        : sectionproperties.signup_btn_fontweight == 400
                                        ? 'Poppins-Light'
                                        : sectionproperties.signup_btn_fontweight == 500
                                        ? 'Poppins-Regular'
                                        : sectionproperties.signup_btn_fontweight == 600
                                        ? 'Poppins-Medium'
                                        : sectionproperties.signup_btn_fontweight == 700
                                        ? 'Poppins-Semibold'
                                        : 'Poppins-Bold',
                                textTransform:
                                    sectionproperties.signup_btn_texttransform == 'Uppercase'
                                        ? 'uppercase'
                                        : sectionproperties.signup_btn_texttransform == 'Capitalize'
                                        ? 'capitalize'
                                        : sectionproperties.signup_btn_texttransform == 'None' || sectionproperties.signup_btn_texttransform == 'none'
                                        ? 'none'
                                        : 'lowercase',
                            },
                        ]}
                    >
                        {fetchAuthorizationQueryContext.data.data.loggedin != true && <Text>{lang.createnewaccount}</Text>}
                        {fetchAuthorizationQueryContext.data.data.loggedin == true && <Text>{lang.update}</Text>}
                    </Text>
                )}
            </TouchableOpacity>
        );
    };
    return (
        <View style={{ height: '100%', width: '100%' }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={validateemailmodal}
                onRequestClose={() => {
                    setvalidateemailmodal(!validateemailmodal);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable style={[styles.button, styles.buttonClose, { backgroundColor: 'black' }]} onPress={() => setvalidateemailmodal(!validateemailmodal)}>
                            <Text style={styles.textStyle}>{langdetect == 'en' ? 'Close' : 'اغلاق'}</Text>
                        </Pressable>
                        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true} style={{ padding: 15, paddingBottom: 200, height: '100%' }}>
                            <View style={[styles.inputscontainer]}>
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
                                    {lang.email}
                                </Text>
                                <View
                                    style={[
                                        styles.textinput,
                                        {
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
                                            color: sectionproperties.inputfieldcolor,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                            shadowColor: sectionproperties.inputshadowcolor,
                                            shadowOpacity: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 0.1 : 0,
                                            shadowOffset: {
                                                width: 0,
                                                height: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                            },
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            shadowRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                            elevation: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 1 : 0,
                                            backgroundColor: sectionproperties.input_bgcolor,
                                            borderWidth: sectionproperties.inputfieldbordertype == 'All' ? StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) : 0,
                                            borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                            borderColor: sectionproperties.inputfieldborderColor,
                                        },
                                        // styles.textinput,
                                        // {
                                        //     borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
                                        // flexDirection: 'row',
                                        // alignItems: 'center',
                                        //     color: sectionproperties.inputfieldcolor,
                                        //     fontSize: StyleParseToIntFuncContext(sectionproperties.form_labelfontsize),
                                        //     shadowColor: sectionproperties.inputshadowcolor,
                                        //     shadowOpacity: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 0.1 : 0,
                                        //     shadowOffset: {
                                        //         width: 0,
                                        //         height: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                        //     },
                                        //     shadowRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                        //     elevation: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 1 : 0,
                                        //     backgroundColor: sectionproperties.input_bgcolor,
                                        //     borderWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                        //     borderColor: sectionproperties.inputfieldborderColor,
                                        // },
                                    ]}
                                >
                                    <FontAwesome
                                        name="user"
                                        size={16}
                                        style={{
                                            color: sectionproperties.iconcontainercolor,
                                            opacity: 0.3,
                                        }}
                                    />
                                    <TextInput
                                        style={[
                                            generalstyles.poppinsMedium,
                                            {
                                                width: '100%',
                                                paddingLeft: 10,
                                                paddingRight: 10,
                                                color: sectionproperties.inputfieldcolor,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                            },
                                        ]}
                                        editable={false}
                                        value={payloadobj.email}
                                    />
                                </View>
                            </View>
                            {validateemailpayload.step == 'verifycode' && (
                                <>
                                    <View style={[styles.inputscontainer]}>
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
                                            {langdetect == 'en' ? 'Code' : ' كود البريد الاكتروني'}
                                        </Text>
                                        <View
                                            style={[
                                                styles.textinput,
                                                {
                                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
                                                    color: sectionproperties.inputfieldcolor,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                                    shadowColor: sectionproperties.inputshadowcolor,
                                                    shadowOpacity: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 0.1 : 0,
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                                    },
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    shadowRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                                    elevation: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 1 : 0,
                                                    backgroundColor: sectionproperties.input_bgcolor,
                                                    borderWidth: sectionproperties.inputfieldbordertype == 'All' ? StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) : 0,
                                                    borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                                    borderColor: sectionproperties.inputfieldborderColor,
                                                },
                                                // styles.textinput,
                                                // {
                                                //     borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
                                                //     flexDirection: 'row',
                                                //     alignItems: 'center',
                                                //     color: sectionproperties.inputfieldcolor,
                                                //     fontSize: StyleParseToIntFuncContext(sectionproperties.form_labelfontsize),
                                                //     shadowColor: sectionproperties.inputshadowcolor,
                                                //     shadowOpacity: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 0.1 : 0,
                                                //     shadowOffset: {
                                                //         width: 0,
                                                //         height: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                                //     },
                                                //     shadowRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                                //     elevation: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 1 : 0,
                                                //     backgroundColor: sectionproperties.input_bgcolor,
                                                //     borderWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                                //     borderColor: sectionproperties.inputfieldborderColor,
                                                // },
                                            ]}
                                        >
                                            <FontAwesome
                                                name="user"
                                                size={16}
                                                style={{
                                                    color: sectionproperties.iconcontainercolor,
                                                    opacity: 0.3,
                                                }}
                                            />
                                            <TextInput
                                                style={[
                                                    generalstyles.poppinsMedium,
                                                    {
                                                        width: '100%',
                                                        paddingLeft: 10,
                                                        paddingRight: 10,
                                                        color: sectionproperties.inputfieldcolor,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                                    },
                                                ]}
                                                value={validateemailpayload.code}
                                                onChangeText={(value) => {
                                                    setvalidateemailpayload({ ...validateemailpayload, code: value });
                                                }}
                                            />
                                        </View>
                                    </View>
                                </>
                            )}

                            <View
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 10,
                                    marginBottom: 30,
                                    width: '100%',
                                }}
                            >
                                <TouchableOpacity
                                    style={[
                                        generalstyles.allcentered,
                                        {
                                            width: StyleParseToIntFuncContext(sectionproperties.verifybtnwidth) + '%',
                                            height: StyleParseToIntFuncContext(sectionproperties.verifybtnheight),
                                            backgroundColor: sectionproperties.verifybtnbackground,
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.verifybtnborderradius, '', true),
                                        },
                                    ]}
                                    onPress={() => {
                                        if (payloadobj.email.length != 0) {
                                            if (validateemailpayload.isvalidated == true) {
                                                setvalidateemailmodal(false);
                                                if (customervalidatephonenumber == 1) {
                                                    if (validatephonenumberpayload.isvalidated) {
                                                        signupbuttonfunc();
                                                    } else {
                                                        setvalidatephonenumbermodal(true);
                                                    }
                                                } else {
                                                    signupbuttonfunc();
                                                }
                                            } else {
                                                GeneralAPIMutationContext.mutate({
                                                    endpointurl: '/validateemail',
                                                    functype: validateemailpayload.step,
                                                    code: validateemailpayload.code,
                                                    name: payloadobj.name,
                                                    email: payloadobj.email,

                                                    mutateSuccesscallback: (data, variables) => {
                                                        if (data.data.status) {
                                                            if (data.data.functype == 'sendcode') {
                                                                setvalidateemailpayload({ ...validateemailpayload, step: 'verifycode' });
                                                            }
                                                            if (data.data.functype == 'verifycode') {
                                                                setvalidateemailpayload({ ...validateemailpayload, isvalidated: true });
                                                                setvalidateemailmodal(false);
                                                                if (customervalidatephonenumber == 1) {
                                                                    if (validatephonenumberpayload.isvalidated) {
                                                                        signupbuttonfunc();
                                                                    } else {
                                                                        setvalidatephonenumbermodal(true);
                                                                    }
                                                                } else {
                                                                    signupbuttonfunc();
                                                                }
                                                            }
                                                        } else {
                                                            showUpTopNotificationBarContext(data.data.reason, 'orange');
                                                        }
                                                    },
                                                });
                                            }
                                        }
                                    }}
                                    disabled={GeneralAPIMutationContext.isLoading}
                                >
                                    {!GeneralAPIMutationContext.isLoading && (
                                        <Text
                                            style={[
                                                {
                                                    color: sectionproperties.verifybtncolor,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.verifybtnfontsize),

                                                    textTransform:
                                                        sectionproperties.verifybtntexttransform == 'Uppercase'
                                                            ? 'uppercase'
                                                            : sectionproperties.verifybtntexttransform == 'Capitalize'
                                                            ? 'capitalize'
                                                            : 'lowercase',
                                                    fontFamily:
                                                        sectionproperties.verifybtnfontweight == 300
                                                            ? 'Poppins-Thin'
                                                            : sectionproperties.verifybtnfontweight == 400
                                                            ? 'Poppins-Light'
                                                            : sectionproperties.verifybtnfontweight == 500
                                                            ? 'Poppins-Regular'
                                                            : sectionproperties.verifybtnfontweight == 600
                                                            ? 'Poppins-Medium'
                                                            : sectionproperties.verifybtnfontweight == 700
                                                            ? 'Poppins-Semibold'
                                                            : 'Poppins-Bold',
                                                },
                                            ]}
                                        >
                                            {validateemailpayload.step == 'verifycode' ? (langdetect == 'en' ? 'Verify' : 'تحقق') : langdetect == 'en' ? 'Send verification code' : 'أرسل رمز التحقق'}
                                        </Text>
                                    )}
                                    {GeneralAPIMutationContext.isLoading && (
                                        <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <SpinnerButton
                                                buttonStyle={{ width: 30, height: 30 }}
                                                isLoading={true}
                                                indicatorCount={10}
                                                spinnerType={'MaterialIndicator'}
                                                spinnerColor={sectionproperties.login_btn_color}
                                            ></SpinnerButton>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </KeyboardAwareScrollView>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={validatephonenumbermodal}
                onRequestClose={() => {
                    setvalidatephonenumbermodal(!validatephonenumbermodal);
                }}
            >
                <View style={[styles.centeredView]}>
                    <View style={[styles.modalView]}>
                        <Pressable style={[styles.button, styles.buttonClose, { backgroundColor: 'black' }]} onPress={() => setvalidatephonenumbermodal(!validatephonenumbermodal)}>
                            <Text style={styles.textStyle}>{langdetect == 'en' ? 'Close' : 'اغلاق'}</Text>
                        </Pressable>
                        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true} style={{ paddingBottom: 200, height: '100%' }}>
                            <View
                                style={[
                                    styles.inputscontainer,
                                    {
                                        width: '100%',
                                        flex: 1,
                                    },
                                ]}
                            >
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
                                    {lang.phone}
                                </Text>
                                <View
                                    style={[
                                        styles.textinput,
                                        {
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
                                            color: sectionproperties.inputfieldcolor,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                            shadowColor: sectionproperties.inputshadowcolor,
                                            shadowOpacity: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 0.1 : 0,
                                            shadowOffset: {
                                                width: 0,
                                                height: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                            },
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            shadowRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                            elevation: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 1 : 0,
                                            backgroundColor: sectionproperties.input_bgcolor,
                                            borderWidth: sectionproperties.inputfieldbordertype == 'All' ? StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) : 0,
                                            borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                            borderColor: sectionproperties.inputfieldborderColor,
                                            width: '100%',
                                        },
                                        // styles.textinput,
                                        // {
                                        //     borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
                                        // flexDirection: 'row',
                                        // alignItems: 'center',
                                        //     color: sectionproperties.inputfieldcolor,
                                        //     fontSize: StyleParseToIntFuncContext(sectionproperties.form_labelfontsize),
                                        //     shadowColor: sectionproperties.inputshadowcolor,
                                        //     shadowOpacity: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 0.1 : 0,
                                        //     shadowOffset: {
                                        //         width: 0,
                                        //         height: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                        //     },
                                        //     shadowRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                        //     elevation: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 1 : 0,
                                        //     backgroundColor: sectionproperties.input_bgcolor,
                                        //     borderWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                        //     borderColor: sectionproperties.inputfieldborderColor,
                                        // },
                                    ]}
                                >
                                    <TextInput
                                        style={[
                                            generalstyles.poppinsMedium,
                                            {
                                                width: '100%',
                                                paddingLeft: 10,
                                                paddingRight: 10,
                                                color: sectionproperties.inputfieldcolor,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                            },
                                        ]}
                                        editable={false}
                                        value={payloadobj.mobile}
                                    />
                                </View>
                            </View>
                            {validatephonenumberpayload.step == 'verifycode' && (
                                <>
                                    <View style={[styles.inputscontainer]}>
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
                                                    marginBottom: 10,
                                                },
                                            ]}
                                        >
                                            {langdetect == 'en' ? 'Code' : ' كود الهاتف'}
                                        </Text>
                                        <View
                                            style={[
                                                styles.textinput,
                                                {
                                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
                                                    color: sectionproperties.inputfieldcolor,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                                    shadowColor: sectionproperties.inputshadowcolor,
                                                    shadowOpacity: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 0.1 : 0,
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                                    },
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    shadowRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                                    elevation: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 1 : 0,
                                                    backgroundColor: sectionproperties.input_bgcolor,
                                                    borderWidth: sectionproperties.inputfieldbordertype == 'All' ? StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) : 0,
                                                    borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                                    borderColor: sectionproperties.inputfieldborderColor,
                                                },
                                                // styles.textinput,
                                                // {
                                                //     borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
                                                //     flexDirection: 'row',
                                                //     alignItems: 'center',
                                                //     color: sectionproperties.inputfieldcolor,
                                                //     fontSize: StyleParseToIntFuncContext(sectionproperties.form_labelfontsize),
                                                //     shadowColor: sectionproperties.inputshadowcolor,
                                                //     shadowOpacity: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 0.1 : 0,
                                                //     shadowOffset: {
                                                //         width: 0,
                                                //         height: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                                //     },
                                                //     shadowRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                                //     elevation: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 1 : 0,
                                                //     backgroundColor: sectionproperties.input_bgcolor,
                                                //     borderWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                                //     borderColor: sectionproperties.inputfieldborderColor,
                                                // },
                                            ]}
                                        >
                                            <TextInput
                                                style={[
                                                    generalstyles.poppinsMedium,
                                                    {
                                                        width: '100%',
                                                        paddingLeft: 10,
                                                        paddingRight: 10,
                                                        color: sectionproperties.inputfieldcolor,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                                    },
                                                ]}
                                                value={validatephonenumberpayload.code}
                                                onChangeText={(value) => {
                                                    setvalidatephonenumberpayload({ ...validatephonenumberpayload, code: value });
                                                }}
                                            />
                                        </View>
                                    </View>
                                </>
                            )}

                            <View
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 10,
                                    marginBottom: 30,
                                    width: '100%',
                                }}
                            >
                                <TouchableOpacity
                                    style={[
                                        generalstyles.allcentered,
                                        {
                                            width: StyleParseToIntFuncContext(sectionproperties.verifybtnwidth) + '%',
                                            height: StyleParseToIntFuncContext(sectionproperties.verifybtnheight),
                                            backgroundColor: sectionproperties.verifybtnbackground,
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.verifybtnborderradius, '', true),
                                        },
                                    ]}
                                    onPress={() => {
                                        if (payloadobj.mobile.length != 0) {
                                            if (validatephonenumberpayload.isvalidated == true) {
                                                setvalidatephonenumbermodal(false);
                                                if (customervalidateemail == 1) {
                                                    if (validateemailpayload.isvalidated) {
                                                        signupbuttonfunc();
                                                    } else {
                                                        setvalidateemailmodal(true);
                                                    }
                                                } else {
                                                    signupbuttonfunc();
                                                }
                                            } else {
                                                GeneralAPIMutationContext.mutate({
                                                    endpointurl: '/validatephonenumber',
                                                    functype: validatephonenumberpayload.step,
                                                    code: validatephonenumberpayload.code,
                                                    name: payloadobj.name,
                                                    phonenumber: payloadobj.mobile,

                                                    mutateSuccesscallback: (data, variables) => {
                                                        if (data.data.status) {
                                                            if (data.data.functype == 'sendcode') {
                                                                setvalidatephonenumberpayload({ ...validatephonenumberpayload, step: 'verifycode' });
                                                            }
                                                            if (data.data.functype == 'verifycode') {
                                                                setvalidatephonenumberpayload({ ...validatephonenumberpayload, isvalidated: true });
                                                                setvalidatephonenumbermodal(false);
                                                                if (customervalidateemail == 1) {
                                                                    if (validateemailpayload.isvalidated) {
                                                                        signupbuttonfunc();
                                                                    } else {
                                                                        setvalidateemailmodal(true);
                                                                    }
                                                                } else {
                                                                    signupbuttonfunc();
                                                                }
                                                            }
                                                        } else {
                                                            showUpTopNotificationBarContext(data.data.reason, 'orange');
                                                        }
                                                    },
                                                });
                                            }
                                        }
                                    }}
                                    disabled={GeneralAPIMutationContext.isLoading}
                                >
                                    {!GeneralAPIMutationContext.isLoading && (
                                        <Text
                                            style={[
                                                {
                                                    color: sectionproperties.verifybtncolor,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.verifybtnfontsize),

                                                    textTransform:
                                                        sectionproperties.verifybtntexttransform == 'Uppercase'
                                                            ? 'uppercase'
                                                            : sectionproperties.verifybtntexttransform == 'Capitalize'
                                                            ? 'capitalize'
                                                            : 'lowercase',
                                                    fontFamily:
                                                        sectionproperties.verifybtnfontweight == 300
                                                            ? 'Poppins-Thin'
                                                            : sectionproperties.verifybtnfontweight == 400
                                                            ? 'Poppins-Light'
                                                            : sectionproperties.verifybtnfontweight == 500
                                                            ? 'Poppins-Regular'
                                                            : sectionproperties.verifybtnfontweight == 600
                                                            ? 'Poppins-Medium'
                                                            : sectionproperties.verifybtnfontweight == 700
                                                            ? 'Poppins-Semibold'
                                                            : 'Poppins-Bold',
                                                },
                                            ]}
                                        >
                                            {validatephonenumberpayload.step == 'verifycode'
                                                ? langdetect == 'en'
                                                    ? 'Verify'
                                                    : 'تحقق'
                                                : langdetect == 'en'
                                                ? 'Send verification code'
                                                : 'أرسل رمز التحقق'}
                                        </Text>
                                    )}
                                    {GeneralAPIMutationContext.isLoading && (
                                        <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <SpinnerButton
                                                buttonStyle={{ width: 30, height: 30 }}
                                                isLoading={true}
                                                indicatorCount={10}
                                                spinnerType={'MaterialIndicator'}
                                                spinnerColor={sectionproperties.login_btn_color}
                                            ></SpinnerButton>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </KeyboardAwareScrollView>
                    </View>
                </View>
            </Modal>
            {waitingpage == false && (
                // <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} style={{ width: '100%' }}>
                <View style={{ width: '100%' }}>
                    {Object.keys(sectionproperties).length != 0 && (
                        <View style={{ width: '100%' }}>
                            {sectionproperties.cardstyletype == 'Style 1' && (
                                <View
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingStart: 20,
                                        paddingEnd: 20,
                                        paddingTop: 20,
                                        width: '88%',
                                        minHeight: 500,
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        marginBottom: 10,
                                        backgroundColor: sectionproperties.backgroundColor,
                                        borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.borderTopLeftRadius, '', true),
                                        borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.borderTopRightRadius, '', true),
                                        borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.borderBottomLeftRadius, '', true),
                                        borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.borderBottomRightRadius, '', true),
                                        borderColor: sectionproperties.sectioncardbordercolor,
                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.sectioncardborderwidth, '', true),
                                        shadowColor: sectionproperties.sectioncardshadowcolor,
                                        shadowOffset: {
                                            width: 0,
                                            height: 3,
                                        },
                                        shadowOpacity: 3,
                                        shadowRadius: 3,
                                        elevation: 1,
                                    }}
                                >
                                    {FormContent()}
                                </View>
                            )}
                            {sectionproperties.cardstyletype == 'Style 2' && (
                                <View
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingStart: 20,
                                        paddingEnd: 20,
                                        paddingTop: 30,
                                        paddingBottom: 30,
                                        width: '100%',
                                    }}
                                >
                                    {FormContent()}
                                </View>
                            )}
                            <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                                {fetchAuthorizationQueryContext.data.data.loggedin != true && SignUpBtn()}
                                {fetchAuthorizationQueryContext.data.data.loggedin == true && sectionproperties.showupdatebtn == 'Show' && SignUpBtn()}
                            </View>
                        </View>
                    )}
                </View>
            )}
            {waitingpage == true && (
                <View
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <View
                        style={[
                            generalstyles.allcentered,
                            generalstyles.flexColumn,
                            {
                                marginTop: 150,
                            },
                        ]}
                    >
                        <Text
                            style={{
                                color: sectionproperties.waitingapprovalcolor,
                                fontSize: StyleParseToIntFuncContext(sectionproperties.waitingapprovalfontsize),
                                fontFamily: 'Poppins-Medium',
                            }}
                        >
                            {langdetect == 'en' ? sectionproperties.waitingapprovaltest_en : sectionproperties.waitingapprovaltest_ar}
                        </Text>
                        <Text
                            style={{
                                color: sectionproperties.waitingapprovalcolor2,
                                fontSize: StyleParseToIntFuncContext(sectionproperties.waitingapprovalfontsize2),
                                fontFamily: 'Poppins-Medium',
                            }}
                        >
                            {langdetect == 'en' ? sectionproperties.waitingapprovaltest_en2 : sectionproperties.waitingapprovaltest_ar2}
                        </Text>
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
        height: '90%',
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

export default CustomerInformationForm;
