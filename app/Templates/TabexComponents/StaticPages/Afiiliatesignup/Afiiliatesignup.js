import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';
import { COLORS } from '../../GeneralFiles/constants';
import SpinnerButton from 'react-native-spinner-button';
import PhoneInput from 'react-native-phone-number-input';
import { AntDesign, Feather } from '@expo/vector-icons';

const Afiiliatesignup = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { templateproperties_context, GeneralAPIMutationContext, showUpTopNotificationBarContext } = useContext(FetchingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [StatePageProperties, setStatePageProperties] = useState({});
    const [issignupsuccess, setissignupsuccess] = useState(false);
    const [hidePassword, sethidePassword] = useState(true);
    const [hidePassword2, sethidePassword2] = useState(true);
    const [affsignuppayload, setaffsignuppayload] = useState({
        name: '',
        email: '',
        phonenumber: '',
        ssn: '',
        password: '',
        confirmpassword: '',
    });
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

    return (
        <View style={[{ height: '100%', paddingBottom: 40 }]}>
            <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false} style={{ height: '100%', paddingBottom: 60 }}>
                {Object.keys(sectionproperties).length != 0 && (
                    <View style={{ position: 'relative' }}>
                        {issignupsuccess == false && (
                            <View style={{ position: 'relative', paddingHorizontal: 10 }}>
                                <View style={[generalstyles.allcentered]}>
                                    <Text
                                        style={{
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
                                            color: sectionproperties.sectionTitleColor,
                                            marginTop: StyleParseToIntFuncContext(sectionproperties.sectionTitleMarginTop),
                                            marginBottom: StyleParseToIntFuncContext(sectionproperties.sectionTitleMarginBottom),
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
                                        {langdetect == 'en' ? sectionproperties.sectionTitleContent : sectionproperties.sectionTitleContent_ar}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        width: '100%',
                                        paddingHorizontal: 10,
                                    }}
                                >
                                    <View
                                        style={[
                                            styles.inputscontainer,
                                            {
                                                marginBottom: 20,
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
                                            {lang.name} <Text style={{ color: COLORS.danger }}>*</Text>
                                        </Text>
                                        <TextInput
                                            style={[
                                                styles.textinput,
                                                {
                                                    height: StyleParseToIntFuncContext(sectionproperties.inputfieldheight),
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
                                            value={affsignuppayload.name}
                                            onChangeText={(value) => {
                                                setaffsignuppayload({ ...affsignuppayload, name: value });
                                            }}
                                        />
                                    </View>
                                    <View
                                        style={[
                                            styles.inputscontainer,
                                            {
                                                marginBottom: 20,
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
                                            {lang.email} <Text style={{ color: COLORS.danger }}>*</Text>
                                        </Text>
                                        <TextInput
                                            style={[
                                                styles.textinput,
                                                {
                                                    height: StyleParseToIntFuncContext(sectionproperties.inputfieldheight),
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
                                            value={affsignuppayload.email}
                                            onChangeText={(value) => {
                                                setaffsignuppayload({ ...affsignuppayload, email: value });
                                            }}
                                        />
                                    </View>
                                    <View
                                        style={[
                                            styles.inputscontainer,
                                            {
                                                marginBottom: 20,
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
                                            {lang.phone} <Text style={{ color: COLORS.danger }}>*</Text>
                                        </Text>
                                        {/* <TextInput
                                            style={[
                                                styles.textinput,
                                                {
                                                    height: StyleParseToIntFuncContext(sectionproperties.inputfieldheight),
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
                                            value={affsignuppayload.phonenumber}
                                            onChangeText={(value) => {
                                                setaffsignuppayload({ ...affsignuppayload, phonenumber: value });
                                            }}
                                        /> */}
                                        <PhoneInput
                                            defaultValue={affsignuppayload.phonenumber}
                                            placeholder=""
                                            dir="ltr"
                                            direction="ltr"
                                            onChangeFormattedText={(text) => {
                                                var text2 = text.substring(1);
                                                // settemppayloadobj({ ...temppayloadobj, mobile: text2 });
                                                setaffsignuppayload({ ...affsignuppayload, phonenumber: text2 });
                                                // value={affsignuppayload.phonenumber}
                                                // setaffsignuppayload({ ...affsignuppayload, phonenumber: value });
                                            }}
                                            defaultCode="EG"
                                            layout="first"
                                            containerStyle={{
                                                width: '100%',
                                                backgroundColor: 'transparent',
                                                borderStyle: 'solid',
                                                marginTop: 5,
                                                height: 47,
                                                padding: 0,
                                                alignItems: 'center',
                                                flexDirection: 'row',
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
                                            }}
                                            textContainerStyle={{
                                                flexDirection: 'row',
                                                backgroundColor: 'transparent',
                                                alignItems: 'center',
                                                marginLeft: -1,
                                            }}
                                            textInputStyle={[
                                                generalstyles.poppinsMedium,
                                                {
                                                    flexDirection: 'row',
                                                    color: '#000',
                                                    alignSelf: 'flex-start',
                                                    fontSize: Platform.OS === 'ios' ? 16 : 13,
                                                    width: 10,
                                                    height: 35,
                                                },
                                            ]}
                                            codeTextStyle={[
                                                {
                                                    color: '#000',
                                                    alignSelf: 'flex-start',
                                                    fontSize: Platform.OS === 'ios' ? 16 : 13,
                                                    height: 25,
                                                    marginLeft: -18,
                                                    marginTop: Platform.OS === 'ios' ? 7 : 8,
                                                    flexDirection: 'row',
                                                },
                                            ]}
                                            flagButtonStyle={{
                                                flexDirection: 'row',
                                                color: '#000',
                                                marginLeft: Platform.OS === 'ios' ? -4 : -8,
                                                alignSelf: 'flex-start',
                                                marginTop: -1,
                                            }}
                                        />
                                    </View>
                                    <View
                                        style={[
                                            styles.inputscontainer,
                                            {
                                                marginBottom: 20,
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
                                                    marginBottom: 10,
                                                },
                                            ]}
                                        >
                                            {langdetect == 'en' ? 'SSN' : 'الرقم القومى'} <Text style={{ color: COLORS.danger }}>*</Text>
                                        </Text>
                                        <TextInput
                                            style={[
                                                styles.textinput,
                                                {
                                                    height: StyleParseToIntFuncContext(sectionproperties.inputfieldheight),
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
                                            value={affsignuppayload.ssn}
                                            onChangeText={(value) => {
                                                setaffsignuppayload({ ...affsignuppayload, ssn: value });
                                            }}
                                        />
                                    </View>
                                    <View
                                        style={[
                                            styles.inputscontainer,
                                            {
                                                marginBottom: 20,
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
                                                    marginBottom: 10,
                                                },
                                            ]}
                                        >
                                            {lang.password} <Text style={{ color: COLORS.danger }}>*</Text>
                                        </Text>
                                        <View
                                            style={[
                                                styles.textinput,
                                                generalstyles.flexRow,
                                                {
                                                    height: StyleParseToIntFuncContext(sectionproperties.inputfieldheight),
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
                                                    },
                                                ]}
                                                value={affsignuppayload.password}
                                                onChangeText={(value) => {
                                                    setaffsignuppayload({ ...affsignuppayload, password: value });
                                                }}
                                                secureTextEntry={hidePassword}
                                            />
                                            <Feather
                                                name={hidePassword == true ? 'eye' : 'eye-off'}
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
                                    <View
                                        style={[
                                            styles.inputscontainer,
                                            {
                                                marginBottom: 20,
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
                                                    marginBottom: 10,
                                                },
                                            ]}
                                        >
                                            {lang.confirmpassword} <Text style={{ color: COLORS.danger }}>*</Text>
                                        </Text>
                                        <View
                                            style={[
                                                styles.textinput,
                                                generalstyles.flexRow,
                                                {
                                                    height: StyleParseToIntFuncContext(sectionproperties.inputfieldheight),
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
                                                    },
                                                ]}
                                                value={affsignuppayload.confirmpassword}
                                                onChangeText={(value) => {
                                                    setaffsignuppayload({ ...affsignuppayload, confirmpassword: value });
                                                }}
                                                secureTextEntry={hidePassword2}
                                            />
                                            <Feather
                                                name={hidePassword2 == true ? 'eye' : 'eye-off'}
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
                                                    height: parseInt(
                                                        sectionproperties.signup_btn_height != null && sectionproperties.signup_btn_height != undefined ? sectionproperties.signup_btn_height : 45,
                                                    ),
                                                    backgroundColor: sectionproperties.signup_btnbgcolor,
                                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.signup_btn_borderBottomLeftRadius, '', true),
                                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.signup_btn_borderwidth, '', true),
                                                    borderColor: sectionproperties.signupbtn_bordercolor,
                                                },
                                            ]}
                                            onPress={() => {
                                                var tempreviewpayloadobj = affsignuppayload;
                                                tempreviewpayloadobj.endpointurl = '/affsignup';
                                                if (
                                                    tempreviewpayloadobj.name.length >= 3 &&
                                                    tempreviewpayloadobj.email.length >= 5 &&
                                                    tempreviewpayloadobj.phonenumber.length >= 5 &&
                                                    tempreviewpayloadobj.ssn.length >= 5 &&
                                                    tempreviewpayloadobj.password.length >= 5
                                                ) {
                                                    if (tempreviewpayloadobj.password == tempreviewpayloadobj.confirmpassword) {
                                                        GeneralAPIMutationContext.mutate({
                                                            endpointurl: '/affsignup',
                                                            email: tempreviewpayloadobj.email,
                                                            name: tempreviewpayloadobj.name,
                                                            phonenumber: tempreviewpayloadobj.phonenumber,
                                                            ssn: tempreviewpayloadobj.ssn,
                                                            password: tempreviewpayloadobj.password,
                                                            confirmpassword: tempreviewpayloadobj.confirmpassword,
                                                            mutateSuccesscallback: (data, variables) => {
                                                                if (data.data.status) {
                                                                    showUpTopNotificationBarContext(lang.accountcreatedsuccess, 'green');
                                                                    setissignupsuccess(true);
                                                                } else {
                                                                    showUpTopNotificationBarContext(data.data.reason, 'orange');
                                                                }
                                                            },
                                                        });
                                                    } else {
                                                        showUpTopNotificationBarContext(lang.passwordsdontmatch, 'orange');
                                                    }
                                                } else {
                                                    showUpTopNotificationBarContext(langdetect == 'en' ? 'Please complete the missing fields' : 'من فضلك اكمل باقى البيانات', 'orange');
                                                }
                                            }}
                                            disabled={GeneralAPIMutationContext.isLoading}
                                        >
                                            {!GeneralAPIMutationContext.isLoading && (
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
                                                        },
                                                    ]}
                                                >
                                                    {langdetect == 'en' ? sectionproperties.signupbtn_contenten : sectionproperties.signupbtn_contentar}
                                                </Text>
                                            )}
                                            {GeneralAPIMutationContext.isLoading && (
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
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                        {issignupsuccess == true && (
                            <View
                                style={[
                                    generalstyles.allcentered,
                                    {
                                        width: '100%',
                                        marginTop: 60,
                                        paddingHorizontal: 50,
                                    },
                                ]}
                            >
                                <AntDesign name="checkcircleo" size="40" style={{ marginBottom: 10 }} />
                                <Text
                                    style={[
                                        generalstyles.poppinsMedium,
                                        {
                                            textAlign: 'center',
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                            color: sectionproperties.generaltext_fontColor,
                                        },
                                    ]}
                                >
                                    {langdetect == 'en' ? sectionproperties.general_text_content : sectionproperties.general_text_content_ar}
                                </Text>
                            </View>
                        )}
                    </View>
                )}
            </KeyboardAwareScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    textinput: {
        paddingHorizontal: 10,
        fontFamily: 'Poppins-Medium',
    },
});

export default Afiiliatesignup;
