import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, TextInput, SafeAreaView, Modal } from 'react-native';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import API from '../../../API/API';
import { useMutation } from 'react-query';
import { FontAwesome, Feather } from 'react-native-vector-icons';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import SpinnerButton from 'react-native-spinner-button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GoogleSignin from './GoogleSignin';
// import FacebookSignin from './FacebookSignin';
import AppleSignin from './AppleSignin';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageComponent } from '../../../ImageComponent';
import { SIZES } from '../../GeneralFiles/constants';
import * as Updates from 'expo-updates';

const Login = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const { Login_API } = API();
    const ref_input2 = useRef();
    const { lang, langdetect } = useContext(LanguageContext);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const { INSTAPIKEYCONTEXT, ProjectOpenrcTypeContext, StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const {
        fetchAuthorizationQueryContext,
        showUpTopNotificationBarContext,
        fetchcustomercartQueryContext,
        templateproperties_context,
        ForgetpasswordMutationContext,
        setcanbrowseApplicationContext,
    } = useContext(FetchingContext);
    const { routingCustomPagecountext, StaticPagesLinksContext, routingcountext } = useContext(TemplateRoutingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [StatePageProperties, setStatePageProperties] = useState({});
    const [isloggingin, setisloggingin] = useState(false);
    const [forgetpasswordmodalVisible, setforgetpasswordmodalVisible] = useState(false);
    const [hidePassword, sethidePassword] = useState(true);
    const [forgotpasswordpayload, setforgotpasswordpayload] = useState({
        email: '',
        code: '',
        newpassword: '',
        confirmnewpassword: '',
    });
    const [forgetpasswordstage, setforgetpasswordstage] = useState('send');
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

        if (templateproperties_context?.logoarrayofobjects != undefined) {
            secpropobj.logoarrayofobjects = JSON.parse(templateproperties_context?.logoarrayofobjects);
        } else {
            secpropobj.logoarrayofobjects = {};
        }
        setsectionproperties({ ...secpropobj });
    }, [StatePageProperties]);
    const LoginMutation = useMutation('Login_API', {
        mutationFn: Login_API,
        onMutate: (variables) => {},
        onError: (error, variables, context) => {
            showUpTopNotificationBarContext(lang.errorloggingin, 'red');
            setisloggingin(false);
        },
        onSuccess: async (data, variables, context) => {
            if (data.data.status) {
                AsyncStorage.setItem('token', data.data.token);
                AsyncStorage.removeItem('cdata');
                // axios.interceptors.request.use(function (config) {
                //     var defaultheaders = config.headers;

                //     defaultheaders.Authorization = 'Bearer ' + data.data.token;

                //     config.headers = defaultheaders;
                //     return config;
                // });

                fetchcustomercartQueryContext.refetch();
                fetchAuthorizationQueryContext.refetch();
                // setcanbrowseApplicationContext(true);
                // routingcountext('Home');

                // showUpTopNotificationBarContext(lang.loggedinsuccess, 'green');
                if (fetchAuthorizationQueryContext.data.data.instinfo.is_to_institute == 1) {
                    await Updates.reloadAsync();
                }
            } else {
                setisloggingin(false);
                showUpTopNotificationBarContext(lang.invalidemailpassword, 'orange');
            }
        },
    });
    useEffect(() => {
        if (fetchAuthorizationQueryContext.isSuccess) {
            if (fetchAuthorizationQueryContext.data.data.status) {
                if (fetchAuthorizationQueryContext.data.data.loggedin == true) {
                    setcanbrowseApplicationContext(true);
                    routingcountext('Home');
                    showUpTopNotificationBarContext(lang.loggedinsuccess, 'green');
                }
            }
        }
    }, [fetchAuthorizationQueryContext.isSuccess, fetchAuthorizationQueryContext.data]);
    useEffect(() => {
        if (ForgetpasswordMutationContext.isSuccess) {
            if (ForgetpasswordMutationContext.data.data.status) {
                if (ForgetpasswordMutationContext.data.data.stage == 'send') {
                    setforgetpasswordstage('verify');
                } else if (ForgetpasswordMutationContext.data.data.stage == 'verify') {
                    setforgetpasswordstage('send');
                    setforgotpasswordpayload({
                        email: '',
                        code: '',
                        newpassword: '',
                        confirmnewpassword: '',
                    });
                    // setforgetpasswordmodal(false);
                    setforgetpasswordmodalVisible(false);
                    showUpTopNotificationBarContext('Password changed successfully', 'green');
                }
            }
        }
    }, [ForgetpasswordMutationContext.isSuccess]);
    const loginfunc = () => {
        if (email.length != 0 && password.length != 0) {
            LoginMutation.mutate({
                email: email,
                password: password,
                instapikey: INSTAPIKEYCONTEXT,
            });
        } else {
            setisloggingin(false);
            showUpTopNotificationBarContext(lang.pleasecompletethemissingfields, 'orange');
        }
    };

    const isloginbuttonloading = () => {
        var isloading = false;
        if (LoginMutation.isLoading || fetchAuthorizationQueryContext.isFetching) {
            isloading = true;
        }
        return isloading;
    };
    const LoginText1 = () => {
        return (
            <Text
                style={[
                    {
                        fontSize: StyleParseToIntFuncContext(sectionproperties.slideshowText1ContentFontSize),
                        color: sectionproperties.slideshowText1ContentColor,
                        fontFamily:
                            sectionproperties.slideshowText1ContentFontWeight == 300
                                ? 'Poppins-Thin'
                                : sectionproperties.slideshowText1ContentFontWeight == 400
                                ? 'Poppins-Light'
                                : sectionproperties.slideshowText1ContentFontWeight == 500
                                ? 'Poppins-Regular'
                                : sectionproperties.slideshowText1ContentFontWeight == 600
                                ? 'Poppins-Medium'
                                : sectionproperties.slideshowText1ContentFontWeight == 700
                                ? 'Poppins-Semibold'
                                : 'Poppins-Bold',
                        marginBottom: sectionproperties.slideshowtext2_show == 'Hide' ? 10 : 0,
                    },
                ]}
            >
                {langdetect == 'en' ? sectionproperties.slideshowText1Content : sectionproperties.slideshowText1Content_ar}
            </Text>
        );
    };
    const FormContent = () => {
        return (
            <View
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
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
                        {lang.emailorphonenumber}
                    </Text>
                    <View
                        style={[
                            styles.textinput,
                            {
                                borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
                                flexDirection: 'row',
                                alignItems: 'center',
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
                            },
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
                            onChangeText={(text) => {
                                setemail(text);
                            }}
                            returnKeyType="next"
                            onSubmitEditing={() => ref_input2.current.focus()}
                        />
                    </View>
                </View>
                <View style={[styles.inputscontainer, { marginBottom: 10 }]}>
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
                        {lang.password}
                    </Text>

                    <View
                        style={[
                            styles.textinput,
                            {
                                borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
                                flexDirection: 'row',
                                alignItems: 'center',
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
                            },
                        ]}
                    >
                        <FontAwesome
                            name="lock"
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
                                    width: '85%',
                                    height: '100%',
                                },
                            ]}
                            onChangeText={(text) => {
                                setpassword(text);
                            }}
                            // secureTextEntry={true}
                            secureTextEntry={hidePassword}
                            ref={ref_input2}
                            onSubmitEditing={() => {
                                loginfunc();
                            }}
                        ></TextInput>
                        <TouchableOpacity
                            style={[
                                generalstyles.allcentered,
                                {
                                    width: 50,
                                    height: '100%',
                                },
                            ]}
                            onPress={() => {
                                sethidePassword(!hidePassword);
                            }}
                        >
                            <Feather
                                name={hidePassword == true ? 'eye-off' : 'eye'}
                                size={18}
                                style={{
                                    color: sectionproperties.iconcontainercolor,
                                    opacity: 0.3,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        marginBottom: 10,
                        width: '100%',
                    }}
                    onPress={() => {
                        setforgetpasswordmodalVisible(true);
                    }}
                >
                    <Text
                        style={{
                            fontFamily:
                                sectionproperties.generaltext_fontWeight == 300
                                    ? 'Poppins-Thin'
                                    : sectionproperties.generaltext_fontWeight == 400
                                    ? 'Poppins-Light'
                                    : sectionproperties.generaltext_fontWeight == 500
                                    ? 'Poppins-Regular'
                                    : sectionproperties.generaltext_fontWeight == 600
                                    ? 'Poppins-Medium'
                                    : sectionproperties.generaltext_fontWeight == 700
                                    ? 'Poppins-Semibold'
                                    : 'Poppins-Bold',
                            color: sectionproperties.generaltext_fontColor,
                            fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                            textDecorationLine: 'underline',
                        }}
                    >
                        {lang.forgotpassword}
                    </Text>
                </TouchableOpacity>
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
                                width: '80%',
                                height: parseInt(sectionproperties.login_btn_height != null && sectionproperties.login_btn_height != undefined ? sectionproperties.login_btn_height : 45),
                                backgroundColor: sectionproperties.login_btn_background,
                                borderRadius: StyleParseToIntFuncContext(sectionproperties.login_btn_borderBottomLeftRadius, '', true),
                                fontSize: StyleParseToIntFuncContext(sectionproperties.login_btn_fontSize),
                                borderWidth: StyleParseToIntFuncContext(sectionproperties.login_btn_borderwidth, '', true),
                                borderColor: sectionproperties.login_btn_bordercolor,
                            },
                        ]}
                        onPress={() => {
                            setisloggingin(true);
                            loginfunc();
                        }}
                    >
                        {!isloginbuttonloading() && (
                            <Text
                                style={[
                                    {
                                        color: sectionproperties.login_btn_color,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.login_btn_fontSize),
                                        textTransform:
                                            sectionproperties.login_btn_texttransform == 'Uppercase'
                                                ? 'uppercase'
                                                : sectionproperties.login_btn_texttransform == 'Capitalize'
                                                ? 'capitalize'
                                                : 'lowercase',
                                        fontFamily:
                                            sectionproperties.login_btn_fontweight == 300
                                                ? 'Poppins-Thin'
                                                : sectionproperties.login_btn_fontweight == 400
                                                ? 'Poppins-Light'
                                                : sectionproperties.login_btn_fontweight == 500
                                                ? 'Poppins-Regular'
                                                : sectionproperties.login_btn_fontweight == 600
                                                ? 'Poppins-Medium'
                                                : sectionproperties.login_btn_fontweight == 700
                                                ? 'Poppins-Semibold'
                                                : 'Poppins-Bold',
                                    },
                                ]}
                            >
                                {lang.login}
                            </Text>
                        )}

                        {isloginbuttonloading() && (
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
                {sectionproperties.socialogindirection == 'Horizontal' && (
                    <View style={[generalstyles.flexRow, generalstyles.allcentered]}>
                        {sectionproperties.showgooglesocialloginbtn == 'Show' && <GoogleSignin StatePageProperties={StatePageProperties} />}
                        {/* {sectionproperties.showfshowfbsocialloginbtnbbtn == 'Show' && <FacebookSignin StatePageProperties={StatePageProperties} />} */}
                        {sectionproperties.showapplesocialloginbtn == 'Show' && <AppleSignin StatePageProperties={StatePageProperties} />}
                    </View>
                )}
                {sectionproperties.socialogindirection == 'Vertical' && (
                    <View style={[generalstyles.flexColumn, generalstyles.allcentered]}>
                        {sectionproperties.showgooglesocialloginbtn == 'Show' && <GoogleSignin StatePageProperties={StatePageProperties} />}
                        {/* {sectionproperties.showfshowfbsocialloginbtnbbtn == 'Show' && <FacebookSignin StatePageProperties={StatePageProperties} />} */}
                        {sectionproperties.showapplesocialloginbtn == 'Show' && <AppleSignin StatePageProperties={StatePageProperties} />}
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={{ height: '100%', backgroundColor: sectionproperties.outerbgcolor, height: SIZES.height, paddingTop: StyleParseToIntFuncContext(sectionproperties.paddingTop) }}>
            {/* <StatusBar backgroundColor="rgba(82, 36, 101, 1)" barStyle="dark-content" /> */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={forgetpasswordmodalVisible}
                onRequestClose={() => {
                    setforgetpasswordmodalVisible(!forgetpasswordmodalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable style={[styles.button, styles.buttonClose, { backgroundColor: 'black' }]} onPress={() => setforgetpasswordmodalVisible(!forgetpasswordmodalVisible)}>
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
                                            flexDirection: 'row',
                                            alignItems: 'center',
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
                                        },
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
                                        editable={forgetpasswordstage == 'verify' ? false : true}
                                        value={forgotpasswordpayload.email}
                                        onChangeText={(text) => {
                                            var temppayloadobj = { ...forgotpasswordpayload };
                                            temppayloadobj.email = text;
                                            setforgotpasswordpayload({ ...temppayloadobj });
                                        }}
                                    />
                                </View>
                            </View>
                            {forgetpasswordstage == 'verify' && (
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
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
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
                                                },
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
                                                value={forgotpasswordpayload.code}
                                                onChangeText={(text) => {
                                                    var temppayloadobj = { ...forgotpasswordpayload };
                                                    temppayloadobj.code = text;
                                                    setforgotpasswordpayload({ ...temppayloadobj });
                                                }}
                                            />
                                        </View>
                                    </View>
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
                                            {lang.password}
                                        </Text>
                                        <View
                                            style={[
                                                styles.textinput,
                                                {
                                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
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
                                                },
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
                                                value={forgotpasswordpayload.newpassword}
                                                onChangeText={(text) => {
                                                    var temppayloadobj = { ...forgotpasswordpayload };
                                                    temppayloadobj.newpassword = text;
                                                    setforgotpasswordpayload({ ...temppayloadobj });
                                                }}
                                            />
                                        </View>
                                    </View>
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
                                            {lang.confirmpassword}
                                        </Text>
                                        <View
                                            style={[
                                                styles.textinput,
                                                {
                                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
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
                                                },
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
                                                value={forgotpasswordpayload.confirmnewpassword}
                                                onChangeText={(text) => {
                                                    var temppayloadobj = { ...forgotpasswordpayload };
                                                    temppayloadobj.confirmnewpassword = text;
                                                    setforgotpasswordpayload({ ...temppayloadobj });
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
                                            width: '80%',
                                            height: parseInt(sectionproperties.login_btn_height != null && sectionproperties.login_btn_height != undefined ? sectionproperties.login_btn_height : 45),
                                            backgroundColor: sectionproperties.login_btn_background,
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.login_btn_borderBottomLeftRadius, '', true),
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.login_btn_fontSize),
                                            borderWidth: StyleParseToIntFuncContext(sectionproperties.login_btn_borderwidth, '', true),
                                            borderColor: sectionproperties.login_btn_bordercolor,
                                        },
                                    ]}
                                    onPress={() => {
                                        if (forgotpasswordpayload.email.length != 0) {
                                            var runfunc = false;
                                            var tempforgotpasswordpayload = { ...forgotpasswordpayload };
                                            tempforgotpasswordpayload.functype = forgetpasswordstage;
                                            if (forgetpasswordstage == 'verify') {
                                                if (tempforgotpasswordpayload.newpassword.length != 0 && tempforgotpasswordpayload.code.length != 0) {
                                                    if (tempforgotpasswordpayload.newpassword == tempforgotpasswordpayload.confirmnewpassword) {
                                                        runfunc = true;
                                                    } else {
                                                        showUpTopNotificationBarContext('Passwords do not match', 'orange');
                                                    }
                                                } else {
                                                    showUpTopNotificationBarContext('Please complete the missing fields', 'orange');
                                                }
                                            } else {
                                                runfunc = true;
                                            }
                                            if (runfunc) {
                                                ForgetpasswordMutationContext.mutate(tempforgotpasswordpayload);
                                            }
                                        } else {
                                            showUpTopNotificationBarContext('Please write your email', 'orange');
                                        }
                                    }}
                                    disabled={ForgetpasswordMutationContext.isLoading}
                                >
                                    {!ForgetpasswordMutationContext.isLoading && (
                                        <Text
                                            style={[
                                                {
                                                    color: sectionproperties.login_btn_color,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.login_btn_fontSize),
                                                    textTransform:
                                                        sectionproperties.login_btn_texttransform == 'Uppercase'
                                                            ? 'uppercase'
                                                            : sectionproperties.login_btn_texttransform == 'Capitalize'
                                                            ? 'capitalize'
                                                            : 'lowercase',
                                                    fontFamily:
                                                        sectionproperties.login_btn_fontweight == 300
                                                            ? 'Poppins-Thin'
                                                            : sectionproperties.login_btn_fontweight == 400
                                                            ? 'Poppins-Light'
                                                            : sectionproperties.login_btn_fontweight == 500
                                                            ? 'Poppins-Regular'
                                                            : sectionproperties.login_btn_fontweight == 600
                                                            ? 'Poppins-Medium'
                                                            : sectionproperties.login_btn_fontweight == 700
                                                            ? 'Poppins-Semibold'
                                                            : 'Poppins-Bold',
                                                },
                                            ]}
                                        >
                                            {forgetpasswordstage == 'verify'
                                                ? langdetect == 'en'
                                                    ? 'Reset password'
                                                    : 'إعادة تعيين كلمة المرور'
                                                : langdetect == 'en'
                                                ? 'Send verification code'
                                                : 'أرسل رمز التحقق'}
                                        </Text>
                                    )}
                                    {ForgetpasswordMutationContext.isLoading && (
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
            <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false}>
                {Object.keys(sectionproperties).length != 0 && (
                    <SafeAreaView style={{ height: '100%' }}>
                        {sectionproperties.cardstyletype == 'Style 1' && (
                            <View
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    width: '100%',
                                    height: '65%',
                                    backgroundColor: sectionproperties.primarycolor,
                                    zIndex: -100,
                                    borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.shapeborderbottomleftradius, '', true),
                                    borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.shapeborderbottomrightradius, '', true),
                                    borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.shapebordertopleftradius, '', true),
                                    borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.shapebordertoprightradius, '', true),
                                }}
                            ></View>
                        )}
                        <View
                            style={{
                                zIndex: 1000,
                                paddingTop: 20,
                            }}
                        >
                            {Array.isArray(sectionproperties?.logoarrayofobjects) && sectionproperties?.logoarrayofobjects?.length != 0 && sectionproperties.showlogo == 'Show' && (
                                <View
                                    style={[
                                        styles.logocontainer,
                                        generalstyles.flexColumn,
                                        {
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginBottom: 2,
                                            width: StyleParseToIntFuncContext(sectionproperties.logo_width != null && sectionproperties.logo_width != undefined ? sectionproperties.logo_width : 80),
                                            height: StyleParseToIntFuncContext(
                                                sectionproperties.logo_height != null && sectionproperties.logo_height != undefined ? sectionproperties.logo_height : 80,
                                            ),
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                        },
                                    ]}
                                >
                                    <ImageComponent
                                        path={langdetect == 'en' ? sectionproperties?.logoarrayofobjects[0]?.englishlogo : sectionproperties?.logoarrayofobjects[0]?.arabiclogo}
                                        resizeMode="contain"
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </View>
                            )}
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {sectionproperties.slideshowtext1_show == 'Show' && (
                                    <Text
                                        style={[
                                            {
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.slideshowText1ContentFontSize),
                                                color: sectionproperties.slideshowText1ContentColor,
                                                fontFamily:
                                                    sectionproperties.slideshowText1ContentFontWeight == 300
                                                        ? 'Poppins-Thin'
                                                        : sectionproperties.slideshowText1ContentFontWeight == 400
                                                        ? 'Poppins-Light'
                                                        : sectionproperties.slideshowText1ContentFontWeight == 500
                                                        ? 'Poppins-Regular'
                                                        : sectionproperties.slideshowText1ContentFontWeight == 600
                                                        ? 'Poppins-Medium'
                                                        : sectionproperties.slideshowText1ContentFontWeight == 700
                                                        ? 'Poppins-Semibold'
                                                        : 'Poppins-Bold',
                                                marginBottom: sectionproperties.slideshowtext2_show == 'Hide' ? 10 : 0,
                                            },
                                        ]}
                                    >
                                        {langdetect == 'en' ? sectionproperties.slideshowText1Content : sectionproperties.slideshowText1Content_ar}
                                    </Text>
                                )}
                                {sectionproperties.slideshowtext2_show == 'Show' && (
                                    <Text
                                        style={[
                                            {
                                                marginBottom: 15,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.slideshowText2ContentFontSize),
                                                color: sectionproperties.slideshowText2ContentColor,
                                                fontFamily:
                                                    sectionproperties.slideshowText2ContentFontWeight == 300
                                                        ? 'Poppins-Thin'
                                                        : sectionproperties.slideshowText2ContentFontWeight == 400
                                                        ? 'Poppins-Light'
                                                        : sectionproperties.slideshowText2ContentFontWeight == 500
                                                        ? 'Poppins-Regular'
                                                        : sectionproperties.slideshowText2ContentFontWeight == 600
                                                        ? 'Poppins-Medium'
                                                        : sectionproperties.slideshowText2ContentFontWeight == 700
                                                        ? 'Poppins-Semibold'
                                                        : 'Poppins-Bold',
                                            },
                                        ]}
                                    >
                                        {langdetect == 'en' ? sectionproperties.slideshowText2Content : sectionproperties.slideshowText2Content_Ar}
                                    </Text>
                                )}
                            </View>
                        </View>
                        {sectionproperties.cardstyletype == 'Style 1' && (
                            <View
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingStart: 20,
                                    paddingEnd: 20,
                                    paddingTop: 30,
                                    paddingBottom: 30,
                                    width: '85%',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
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
                                    shadowOpacity: 0.1,
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
                        <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Text
                                style={{
                                    marginTop: 20,
                                    color: sectionproperties.generaltext_fontColor,
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                    fontFamily:
                                        sectionproperties.generaltext_fontWeight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.generaltext_fontWeight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.generaltext_fontWeight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.generaltext_fontWeight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.generaltext_fontWeight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                }}
                            >
                                {lang.donthaveanaccount}
                            </Text>

                            <TouchableOpacity
                                style={[
                                    generalstyles.allcentered,
                                    {
                                        width: '70%',
                                        height: 45,
                                        marginTop: 10,
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.signup_btn_borderBottomLeftRadius, '', true),
                                        backgroundColor: sectionproperties.signup_btnbgcolor,
                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.signup_btn_borderwidth, '', true),
                                        borderColor: sectionproperties.signupbtn_bordercolor,
                                    },
                                ]}
                                onPress={() => {
                                    routingcountext(StaticPagesLinksContext.Signup);
                                }}
                            >
                                <Text
                                    style={[
                                        {
                                            color: sectionproperties.signup_btn_color,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.signup_btn_fontSize),
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
                                                    : sectionproperties.signup_btn_texttransform == 'None'
                                                    ? 'none'
                                                    : 'lowercase',
                                        },
                                    ]}
                                >
                                    {lang.createnewaccount}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                )}
            </KeyboardAwareScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
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

export default Login;
