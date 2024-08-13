import React, { useState, useContext, useEffect, useRef } from 'react';
import { Platform, View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { COLORS } from '../../GeneralFiles/constants';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import PhoneInput from 'react-native-phone-number-input';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';

const CustomerPersonalInformation = (props) => {
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [payloadobj, setpayloadobj] = useState(props.payloadobj);
    const [temppayloadobj, settemppayloadobj] = useState(props.payloadobj);
    const ref_input1 = useRef();
    const ref_input2 = useRef();
    const ref_input3 = useRef();

    useEffect(() => {
        setsectionproperties({ ...props.sectionproperties });
    }, [props.sectionproperties]);
    useEffect(() => {
        setpayloadobj({ ...props.payloadobj });
    }, [props.payloadobj]);

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
                        {/* email */}
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
                                {lang.email} <Text style={{ color: COLORS.danger }}>*</Text>
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
                                        borderWidth: sectionproperties.inputfieldbordertype == 'All' ? StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) : 0,
                                        borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                        borderColor: sectionproperties.inputfieldborderColor,
                                    },
                                ]}
                                value={temppayloadobj.email}
                                onChangeText={(value) => {
                                    settemppayloadobj({ ...temppayloadobj, email: value });
                                    props.setpayloadobj({ ...payloadobj, email: value });
                                }}
                                onEndEditing={(value) => {
                                    // props.setpayloadobj({ ...payloadobj, email: value.nativeEvent.text });
                                }}
                                editable={!props?.validateemailpayload?.isvalidated}
                                // returnKeyType="next"
                                // ref={ref_input1}
                                // onSubmitEditing={() => ref_input2.current.focus()}
                            />
                        </View>

                        {/* name */}
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
                                {lang.name} <Text style={{ color: COLORS.danger }}>*</Text>
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
                                        borderWidth: sectionproperties.inputfieldbordertype == 'All' ? StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) : 0,
                                        borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                        borderColor: sectionproperties.inputfieldborderColor,
                                    },
                                ]}
                                value={temppayloadobj.name}
                                onChangeText={(value) => {
                                    settemppayloadobj({ ...temppayloadobj, name: value });
                                    props.setpayloadobj({ ...payloadobj, name: value });
                                }}
                                onEndEditing={(value) => {
                                    // props.setpayloadobj({ ...payloadobj, name: value.nativeEvent.text });
                                }}
                                // returnKeyType="next"
                                // onSubmitEditing={() => ref_input2.current.focus()}
                                // ref={ref_input2}
                            />
                        </View>
                        {sectionproperties.replacemobilenumber == 'Yes' && (
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
                                    {langdetect == 'en' ? sectionproperties.replacemobfieldinen : sectionproperties.replacemobfieldinar} <Text style={{ color: COLORS.danger }}>*</Text>
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
                                            borderWidth: sectionproperties.inputfieldbordertype == 'All' ? StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) : 0,
                                            borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                            borderColor: sectionproperties.inputfieldborderColor,
                                        },
                                    ]}
                                    value={temppayloadobj.mobile}
                                    onChangeText={(value) => {
                                        settemppayloadobj({ ...temppayloadobj, mobile: value });
                                        props.setpayloadobj({ ...payloadobj, mobile: value });
                                    }}
                                    onEndEditing={(value) => {
                                        // props.setpayloadobj({ ...payloadobj, mobile: value.nativeEvent.text });
                                    }}
                                />
                            </View>
                        )}

                        {/* phone */}
                        {sectionproperties.replacemobilenumber == 'No' && (
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
                                    {lang.phone} <Text style={{ color: COLORS.danger }}>*</Text>
                                </Text>
                                <PhoneInput
                                    defaultValue={temppayloadobj.mobile}
                                    placeholder=""
                                    dir="ltr"
                                    direction="ltr"
                                    onChangeFormattedText={(text) => {
                                        var text2 = text.substring(1);
                                        settemppayloadobj({ ...temppayloadobj, mobile: text2 });
                                        props.setpayloadobj({ ...payloadobj, mobile: text2 });
                                    }}
                                    // defaultCode="YE"
                                    defaultCode={sectionproperties.countrycode}
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
                                        direction: 'ltr',
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
                                            color: sectionproperties.inputfieldcolor,
                                            alignSelf: 'flex-start',
                                            fontSize: Platform.OS === 'ios' ? 16 : 13,
                                            width: 10,
                                            height: 35,
                                        },
                                    ]}
                                    codeTextStyle={[
                                        {
                                            color: sectionproperties.inputfieldcolor,
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
                                {/* <TextInput
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
                                        borderWidth: sectionproperties.inputfieldbordertype == 'All' ? StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) : 0,
                                        borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                        borderColor: sectionproperties.inputfieldborderColor,
                                    },
                                ]}
                                keyboardType="numeric"
                                value={temppayloadobj.mobile}
                                onChangeText={(value) => {
                                    settemppayloadobj({ ...temppayloadobj, mobile: value });
                                }}
                                onEndEditing={(value) => {
                                    props.setpayloadobj({ ...payloadobj, mobile: value.nativeEvent.text });
                                }}
                                ref={ref_input3}
                            /> */}
                            </View>
                        )}
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

export default CustomerPersonalInformation;
