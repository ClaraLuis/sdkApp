import React, { useState, useContext, useEffect, Fragment } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, SafeAreaView, FlatList } from 'react-native';
import { icons, SIZES, COLORS, images } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import Entypo from 'react-native-vector-icons/Entypo';
import { AntDesign } from '@expo/vector-icons';
import CheckBox from 'react-native-check-box';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import SpinnerButton from 'react-native-spinner-button';
import { urlEndpoint } from '../../../../config/imagekit';
import CustomerAddressInformation from '../Signup/CustomerAddressInformation';
import CustomerPersonalInformation from '../Signup/CustomerPersonalInformation';
import { useDispatch, useSelector } from 'react-redux';
import { ImageComponent } from '../../../ImageComponent';
import RenderHtml from 'react-native-render-html';

const Checkout = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const { lang, langdetect } = useContext(LanguageContext);
    const queryClient = useQueryClient();
    const { StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { showUpTopNotificationBarContext, fetchcustomercartQueryContext, fetchAuthorizationQueryContext, AddOrderMutationContext, ChooseState_CountryMutationContext, GeneralAPIMutationContext } =
        useContext(FetchingContext);
    const { StaticPagesLinksContext, routingcountext } = useContext(TemplateRoutingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [IsLoaded, setIsLoaded] = useState(false);
    const [tabindex, settabindex] = useState(0);
    const [insthasaffiliate, setinsthasaffiliate] = useState(0);
    const [addressinfopayloadobj, setaddressinfopayloadobj] = useState({ ...fetchcustomercartQueryContext.data.data.customercart });
    const [StatePageProperties, setStatePageProperties] = useState({});
    useEffect(() => {
        StatePageProperties11.pages.forEach(function (item, index) {
            if (CurrentPageIdContext == item.pageid) {
                setStatePageProperties(item.pageobj);
            }
        });
    }, [StatePageProperties11]);

    useEffect(() => {
        // cartinfoupdater(addressinfopayloadobj);
        if (addressinfopayloadobj?.aff_code != undefined) {
            setaff_code(addressinfopayloadobj?.aff_code);
        }
        if (addressinfopayloadobj?.notes != undefined) {
            setnotes(addressinfopayloadobj?.notes);
        }
    }, [addressinfopayloadobj]);
    useEffect(() => {
        var secpropobj = {};
        if (StatePageProperties.pageobj != undefined && StatePageProperties.pageobj.pageproperties != undefined) {
            StatePageProperties.pageobj.pageproperties.forEach(function (sectionitem, sectionindex) {
                secpropobj[sectionitem.property_css_name] = sectionitem.property_value;
            });
        }
        setsectionproperties({ ...secpropobj });
    }, [StatePageProperties]);

    useEffect(() => {
        setIsLoaded(true);
        var Canorder = false;
        if (
            fetchAuthorizationQueryContext.isSuccess &&
            fetchAuthorizationQueryContext?.data?.data?.instinfo != undefined &&
            fetchAuthorizationQueryContext?.data?.data?.instinfo.cancustomerguestorder != undefined
        ) {
            if (fetchAuthorizationQueryContext?.data?.data?.instinfo?.hasaffiliate != undefined) {
                setinsthasaffiliate(fetchAuthorizationQueryContext?.data?.data?.instinfo?.hasaffiliate);
            }
            if (fetchAuthorizationQueryContext?.data?.data?.loggedin == true) {
                Canorder = true;
            } else {
                if (fetchAuthorizationQueryContext.data.data?.instinfo?.cancustomerguestorder == 1) {
                    Canorder = true;
                }
            }
            if (Canorder == true) {
            } else {
                showUpTopNotificationBarContext(lang.pleaselogintocheckout, 'orange');
                routingcountext(StaticPagesLinksContext.Login);
            }
        }
    }, [fetchAuthorizationQueryContext.isSuccess]);
    const usewalletpoints = () => {
        GeneralAPIMutationContext.mutate({
            endpointurl: '/usewalletpoints',

            mutateSuccesscallback: (data, variables) => {
                if (data.data.status) {
                    showUpTopNotificationBarContext('Success', 'green');

                    fetchcustomercartQueryContext.refetch();
                } else {
                    showUpTopNotificationBarContext(data.data.reason, 'orange');
                }
            },
        });
    };
    const cartinfoupdater = (addressinfopayloadobj) => {
        var cartarr = queryClient.getQueryData('fetchcustomercart_API');
        cartarr.data.customercart = addressinfopayloadobj;
        queryClient.setQueryData('fetchcustomercart_API', cartarr);
        // if (IsLoaded) {
        ChooseState_CountryMutationContext.mutate(addressinfopayloadobj);
        // }
    };
    const [aff_code, setaff_code] = useState('');
    const [notes, setnotes] = useState('');
    const source = {
        html:
            langdetect == 'en'
                ? `<p><span style="font-size: 15px">` + sectionproperties.text1editortexten + `</span> </p>`
                : `<p><span style="font-size: 15px">` + sectionproperties.text1editortextar + `</span> </p>`,
    };
    const isconfirmorderbuttonloading = () => {
        var isloading = false;
        if (AddOrderMutationContext.isLoading || ChooseState_CountryMutationContext.isLoading) {
            isloading = true;
        }
        return isloading;
    };
    const updatepaymentmethod = (value) => {
        var tempaddressinfopayloadobj = { ...addressinfopayloadobj };
        tempaddressinfopayloadobj.paymentmethod = value;
        setaddressinfopayloadobj({ ...tempaddressinfopayloadobj });
        cartinfoupdater(tempaddressinfopayloadobj);
    };
    return (
        <View
            style={[
                generalstyles.container,
                { paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 10, backgroundColor: sectionproperties.sectionbgcolor != null ? sectionproperties.sectionbgcolor : '' },
            ]}
        >
            {/* <SegmentedControlTab
                values={
                    sectionproperties.showpayemntsection == 'Show'
                        ? [langdetect == 'en' ? sectionproperties.delievery_text_en : sectionproperties.delievery_text_ar, lang.payment]
                        : [langdetect == 'en' ? sectionproperties.delievery_text_en : sectionproperties.delievery_text_ar]
                }
                selectedIndex={tabindex}
                onTabPress={(index) => {
                    settabindex(index);
                }}
                borderRadius={0}
                tabsContainerStyle={{ height: 35, backgroundColor: 'transparent', borderWidth: 0 }}
                tabStyle={{ backgroundColor: 'transparent', borderWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderRightColor: 'red', borderLeftColor: 'red' }}
                activeTabStyle={{
                    backgroundColor: 'transparent',
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderRightColor: 'transparent',
                    borderLeftColor: 'transparent',
                    borderBottomWidth: 2,
                    borderBottomColor: sectionproperties.activetabbordercolor,
                    marginTop: 2,
                    borderWidth: 0,
                }}
                firstTabStyle={{ borderLeftWidth: 0, borderRightWidth: 0 }}
                lastTabStyle={{ borderLeftWidth: 0, borderRightWidth: 0 }}
                tabTextStyle={{ color: sectionproperties.tabtextcolor, fontSize: StyleParseToIntFuncContext(sectionproperties.tabtextfontsize), fontFamily: 'Poppins-Light' }}
                activeTabTextStyle={{ color: sectionproperties.tabtextactivecolor, fontFamily: 'Poppins-Medium' }}
            /> */}
            {!fetchcustomercartQueryContext.isFetching && fetchcustomercartQueryContext.isSuccess && (
                <View
                    style={[
                        generalstyles.container,
                        { paddingLeft: 0, paddingRight: 0, marginTop: 10, backgroundColor: sectionproperties.sectionbgcolor != null ? sectionproperties.sectionbgcolor : '' },
                    ]}
                >
                    {tabindex === 0 && (
                        <View style={{ marginTop: 0 }}>
                            {/* Personal Information */}
                            <View style={{ marginBottom: 0 }}>
                                <View
                                    style={[
                                        generalstyles.containerInner,
                                        {
                                            paddingTop: 0,
                                            marginBottom: StyleParseToIntFuncContext(sectionproperties.sectionTitleMarginBottom),
                                            marginTop: StyleParseToIntFuncContext(sectionproperties.sectionTitleMarginTop),
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        },
                                    ]}
                                >
                                    <Text
                                        style={{
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
                                            textTransform:
                                                sectionproperties.sectionTitleTextTransform == 'Uppercase'
                                                    ? 'uppercase'
                                                    : sectionproperties.sectionTitleTextTransform == 'capitalize'
                                                    ? 'capitalize'
                                                    : sectionproperties.sectionTitleTextTransform == 'none'
                                                    ? 'none'
                                                    : 'lowercase',
                                            color: sectionproperties.sectionTitleColor,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
                                            textAlign: 'left',
                                            flex: 1,
                                        }}
                                    >
                                        {lang.personalinformation}
                                    </Text>
                                </View>
                                {/* {fetchAuthorizationQueryContext?.data?.data?.loggedin && ( */}
                                <View
                                    style={[
                                        styles.generalcard,
                                        {
                                            backgroundColor: sectionproperties.reservation_bgcolor,
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.userinfo_borderradius, '', true),
                                            borderWidth: StyleParseToIntFuncContext(sectionproperties.userinfo_borderwidth, '', true),
                                            borderColor: sectionproperties.usserinfo_sectionbordercolor,
                                            paddingTop: StyleParseToIntFuncContext(sectionproperties.paddingTop),
                                            paddingBottom: StyleParseToIntFuncContext(sectionproperties.paddingBottom),
                                            marginBottom: 15,
                                        },
                                    ]}
                                >
                                    <CustomerPersonalInformation payloadobj={addressinfopayloadobj} setpayloadobj={setaddressinfopayloadobj} sectionproperties={sectionproperties} />
                                </View>
                                {/*  )} */}
                                {/* {fetchAuthorizationQueryContext?.data?.data?.loggedin && (
                                    <View
                                        style={[
                                            styles.generalcard,
                                            {
                                                marginBottom: 10,
                                                backgroundColor: sectionproperties.backgroundColor,
                                                borderRadius: StyleParseToIntFuncContext(sectionproperties.userinfo_borderradius, '', true),
                                                borderWidth: StyleParseToIntFuncContext(sectionproperties.userinfo_borderwidth, '', true),
                                                borderColor: sectionproperties.usserinfo_sectionbordercolor,
                                                paddingTop: StyleParseToIntFuncContext(sectionproperties.paddingTop),
                                                paddingBottom: StyleParseToIntFuncContext(sectionproperties.paddingBottom),
                                            },
                                        ]}
                                    >
                                        <View style={styles.generalcardinner}>
                                            <View style={[styles.iconcont]}>
                                                <AntDesign name="user" size={15} color={sectionproperties.userinfo_iconcolor} />
                                            </View>
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        sectionproperties.userinfo_fontweight == 300
                                                            ? 'Poppins-Thin'
                                                            : sectionproperties.userinfo_fontweight == 400
                                                            ? 'Poppins-Light'
                                                            : sectionproperties.userinfo_fontweight == 500
                                                            ? 'Poppins-Regular'
                                                            : sectionproperties.userinfo_fontweight == 600
                                                            ? 'Poppins-Medium'
                                                            : sectionproperties.userinfo_fontweight == 700
                                                            ? 'Poppins-Semibold'
                                                            : 'Poppins-Bold',

                                                    marginStart: 10,
                                                    textTransform: 'capitalize',
                                                    color: sectionproperties.userinfo_color,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.userinfo_fontsize),
                                                }}
                                            >
                                                {fetchAuthorizationQueryContext?.data?.data?.customerinfo?.name}
                                            </Text>
                                        </View>
                                        <View style={styles.generalcardinner}>
                                            <View style={[styles.iconcont]}>
                                                <Entypo name="phone" size={15} color={sectionproperties.userinfo_iconcolor}></Entypo>
                                            </View>
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        sectionproperties.userinfo_fontweight == 300
                                                            ? 'Poppins-Thin'
                                                            : sectionproperties.userinfo_fontweight == 400
                                                            ? 'Poppins-Light'
                                                            : sectionproperties.userinfo_fontweight == 500
                                                            ? 'Poppins-Regular'
                                                            : sectionproperties.userinfo_fontweight == 600
                                                            ? 'Poppins-Medium'
                                                            : sectionproperties.userinfo_fontweight == 700
                                                            ? 'Poppins-Semibold'
                                                            : 'Poppins-Bold',

                                                    marginStart: 10,
                                                    color: sectionproperties.userinfo_color,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.userinfo_fontsize),
                                                }}
                                            >
                                                {fetchAuthorizationQueryContext?.data?.data?.customerinfo?.mobile}
                                            </Text>
                                        </View>
                                        <View style={styles.generalcardinner}>
                                            <View style={[styles.iconcont]}>
                                                <Entypo name="email" size={16} color={sectionproperties.userinfo_iconcolor}></Entypo>
                                            </View>
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        sectionproperties.userinfo_fontweight == 300
                                                            ? 'Poppins-Thin'
                                                            : sectionproperties.userinfo_fontweight == 400
                                                            ? 'Poppins-Light'
                                                            : sectionproperties.userinfo_fontweight == 500
                                                            ? 'Poppins-Regular'
                                                            : sectionproperties.userinfo_fontweight == 600
                                                            ? 'Poppins-Medium'
                                                            : sectionproperties.userinfo_fontweight == 700
                                                            ? 'Poppins-Semibold'
                                                            : 'Poppins-Bold',

                                                    marginStart: 10,
                                                    color: sectionproperties.userinfo_color,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.userinfo_fontsize),
                                                }}
                                            >
                                                {fetchAuthorizationQueryContext?.data?.data?.customerinfo?.email}
                                            </Text>
                                        </View>
                                    </View>
                                )} */}
                            </View>
                            {/* Address */}
                            {sectionproperties.hideshipping == 'Show' && (
                                <View
                                    style={[
                                        generalstyles.containerInner,
                                        {
                                            marginBottom: StyleParseToIntFuncContext(sectionproperties.sectionTitleMarginBottom),
                                            width: SIZES.width,
                                            marginTop: StyleParseToIntFuncContext(sectionproperties.sectionTitleMarginTop),
                                        },
                                    ]}
                                >
                                    <Text
                                        style={{
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
                                            textTransform:
                                                sectionproperties.sectionTitleTextTransform == 'Uppercase'
                                                    ? 'uppercase'
                                                    : sectionproperties.sectionTitleTextTransform == 'capitalize'
                                                    ? 'capitalize'
                                                    : sectionproperties.sectionTitleTextTransform == 'none'
                                                    ? 'none'
                                                    : 'lowercase',
                                            color: sectionproperties.sectionTitleColor,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
                                            textAlign: 'left',
                                        }}
                                    >
                                        {lang.addressdetails}
                                    </Text>
                                </View>
                            )}
                            {/* {sectionproperties.hideshipping == 'Show' && ( */}
                            <View
                                style={[
                                    styles.generalcard,
                                    {
                                        display: sectionproperties.hidecountrystatecity == 'Hide' && sectionproperties.hideaddress == 'Hide' ? 'none' : 'flex',
                                        marginBottom: sectionproperties.shownotes == 'Show' ? 0 : 10,
                                        backgroundColor: sectionproperties.reservation_bgcolor,
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.userinfo_borderradius, '', true),
                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.userinfo_borderwidth, '', true),
                                        borderColor: sectionproperties.usserinfo_sectionbordercolor,
                                        paddingTop: StyleParseToIntFuncContext(sectionproperties.paddingTop),
                                        paddingBottom: sectionproperties.shownotes == 'Show' ? 0 : StyleParseToIntFuncContext(sectionproperties.paddingBottom),
                                    },
                                ]}
                            >
                                <CustomerAddressInformation
                                    cartinfoupdater={cartinfoupdater}
                                    payloadobj={addressinfopayloadobj}
                                    setpayloadobj={setaddressinfopayloadobj}
                                    sectionproperties={sectionproperties}
                                    srcfromprops={'checkout'}
                                />
                            </View>
                            {/* )} */}
                            {sectionproperties.shownotes == 'Show' && (
                                <View
                                    style={[
                                        styles.inputscontainer,
                                        styles.generalcard,
                                        {
                                            marginBottom: 10,
                                            backgroundColor: sectionproperties.reservation_bgcolor,
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.userinfo_borderradius, '', true),
                                            borderWidth: StyleParseToIntFuncContext(sectionproperties.userinfo_borderwidth, '', true),
                                            borderColor: sectionproperties.usserinfo_sectionbordercolor,
                                            paddingBottom: StyleParseToIntFuncContext(sectionproperties.paddingBottom),
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
                                        {langdetect == 'en' ? sectionproperties.notesinen : sectionproperties.notesinar}
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
                                                // shadowOpacity: 0.1,
                                                shadowOpacity: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 0.1 : 0,
                                                // shadowOpacity: sectionproperties.inputshadowopacity,
                                                backgroundColor: sectionproperties.input_bgcolor,
                                                borderWidth: sectionproperties.inputfieldbordertype == 'All' ? StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) : 0,
                                                borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                                borderColor: sectionproperties.inputfieldborderColor,
                                                height: 100,
                                            },
                                        ]}
                                        multiline={true}
                                        numberOfLines={5}
                                        value={notes}
                                        onChangeText={(value) => {
                                            setnotes(value);
                                            var temppayloadobj = { ...addressinfopayloadobj };
                                            if (props.srcfrom == 'customerinformationform') {
                                                temppayloadobj.notes = value;
                                            } else {
                                                temppayloadobj.notes = value;
                                            }
                                            setaddressinfopayloadobj({ ...temppayloadobj });
                                        }}
                                        onEndEditing={(value) => {
                                            // var temppayloadobj = { ...addressinfopayloadobj };
                                            // if (props.srcfrom == 'customerinformationform') {
                                            //     temppayloadobj.notes = value.nativeEvent.text;
                                            // } else {
                                            //     temppayloadobj.notes = value.nativeEvent.text;
                                            // }
                                            // setaddressinfopayloadobj({ ...temppayloadobj });
                                        }}
                                    />
                                </View>
                            )}
                            {insthasaffiliate == 1 && (
                                <View
                                    style={[
                                        styles.inputscontainer,
                                        styles.generalcard,
                                        {
                                            marginBottom: 10,
                                            backgroundColor: sectionproperties.backgroundColor,
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.userinfo_borderradius, '', true),
                                            borderWidth: StyleParseToIntFuncContext(sectionproperties.userinfo_borderwidth, '', true),
                                            borderColor: sectionproperties.usserinfo_sectionbordercolor,
                                            paddingBottom: StyleParseToIntFuncContext(sectionproperties.paddingBottom),
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
                                        {langdetect == 'en' ? 'Affiliate code' : 'رمز المسوق'}
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
                                                // shadowOpacity: 0.1,
                                                shadowOpacity: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 0.1 : 0,
                                                // shadowOpacity: sectionproperties.inputshadowopacity,
                                                backgroundColor: sectionproperties.input_bgcolor,
                                                borderWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                                borderColor: sectionproperties.inputfieldborderColor,
                                            },
                                        ]}
                                        keyboardType={'numeric'}
                                        value={aff_code}
                                        onChangeText={(value) => {
                                            setaff_code(value);
                                        }}
                                        onEndEditing={(value) => {
                                            var temppayloadobj = { ...addressinfopayloadobj };
                                            if (props.srcfrom == 'customerinformationform') {
                                                temppayloadobj.aff_code = value.nativeEvent.text;
                                            } else {
                                                temppayloadobj.aff_code = value.nativeEvent.text;
                                            }
                                            setaddressinfopayloadobj({ ...temppayloadobj });
                                        }}
                                    />
                                </View>
                            )}
                            {/* My Cart */}
                            <View style={{ marginBottom: 8 }}>
                                <View
                                    style={[
                                        generalstyles.containerInner,
                                        { paddingTop: 0, marginBottom: StyleParseToIntFuncContext(sectionproperties.sectionTitleMarginBottom), flexDirection: 'row', alignItems: 'center' },
                                    ]}
                                >
                                    <Text
                                        style={{
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
                                            textTransform:
                                                sectionproperties.sectionTitleTextTransform == 'Uppercase'
                                                    ? 'uppercase'
                                                    : sectionproperties.sectionTitleTextTransform == 'capitalize'
                                                    ? 'capitalize'
                                                    : sectionproperties.sectionTitleTextTransform == 'none'
                                                    ? 'none'
                                                    : 'lowercase',
                                            color: sectionproperties.sectionTitleColor,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
                                        }}
                                    >
                                        {langdetect == 'en' ? sectionproperties.cartTitlte_en : sectionproperties.cartTitlte_ar}
                                    </Text>
                                </View>
                                {fetchcustomercartQueryContext?.data?.data?.customercart?.cartitems.map((item, index) => {
                                    return (
                                        <View
                                            style={[
                                                generalstyles.allcentered,
                                                {
                                                    marginBottom: 15,
                                                    padding: 10,
                                                    paddingBottom: 8,
                                                    backgroundColor: sectionproperties.reservation_bgcolor,
                                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.userinfo_borderradius, '', true),
                                                },
                                            ]}
                                        >
                                            <View style={[generalstyles.flexRow, { marginBottom: 5 }]}>
                                                <View
                                                    style={[
                                                        {
                                                            width: 80,
                                                            height: 80,
                                                            marginEnd: 10,
                                                            backgroundColor: sectionproperties.image_bgcolor,
                                                            borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true),
                                                            borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true),
                                                            borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true),
                                                            borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true),
                                                            marginBottom: 'auto',
                                                        },
                                                    ]}
                                                >
                                                    <ImageComponent
                                                        path={
                                                            item.productinfo.hasvariants == 0
                                                                ? '/tr:w-' + sectionproperties.imagetr_w + ',h-' + sectionproperties.imagetr_h + '/' + item.productinfo.productmainimage
                                                                : '/tr:w-' + sectionproperties.imagetr_w + ',h-' + sectionproperties.imagetr_h + '/' + item.productinfo.variantinfo.variantimageurl
                                                        }
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true),
                                                            borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true),
                                                            borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true),
                                                            borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true),
                                                        }}
                                                        resizeMode="contain"
                                                    />
                                                </View>
                                                <View
                                                    style={{
                                                        display: 'flex',
                                                        flex: 1,
                                                        marginBottom: 'auto',
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            color: sectionproperties.prodNameColor,
                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.prodNameFontSize),
                                                            textAlign: 'left',
                                                            //textTransform: 'capitalize',
                                                            marginBottom: 2,
                                                            //fontFamily: 'Poppins-Medium',
                                                            fontFamily:
                                                                sectionproperties.prodNameFontWeight == 300
                                                                    ? 'Poppins-Thin'
                                                                    : sectionproperties.prodNameFontWeight == 400
                                                                    ? 'Poppins-Light'
                                                                    : sectionproperties.prodNameFontWeight == 500
                                                                    ? 'Poppins-Regular'
                                                                    : sectionproperties.prodNameFontWeight == 600
                                                                    ? 'Poppins-Medium'
                                                                    : sectionproperties.prodNameFontWeight == 700
                                                                    ? 'Poppins-Semibold'
                                                                    : 'Poppins-Bold',
                                                            textTransform:
                                                                sectionproperties.prodNameTextTranform == 'Uppercase'
                                                                    ? 'uppercase'
                                                                    : sectionproperties.prodNameTextTranform == 'Capitalize'
                                                                    ? 'capitalize'
                                                                    : sectionproperties.prodNameTextTranform == 'None'
                                                                    ? 'none'
                                                                    : 'lowercase',
                                                        }}
                                                    >
                                                        {langdetect == 'en' ? item.productinfo.name_en : item.productinfo.name_ar}
                                                    </Text>
                                                    {item.productinfo.hasvariants == 1 &&
                                                        item.productinfo.variantinfo.variantoptions.map((variantitem, variantindex) => {
                                                            return (
                                                                <View style={{ flexDirection: 'row', direction: 'ltr' }}>
                                                                    <Text
                                                                        style={{
                                                                            //fontFamily: 'Poppins-Light',
                                                                            color: sectionproperties.varianttitle_color,
                                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.varianttitle_fontSize),
                                                                            //textTransform: 'capitalize',
                                                                            textAlign: 'left',
                                                                            marginEnd: 5,
                                                                            fontFamily:
                                                                                sectionproperties.varianttitle_fontweight == 300
                                                                                    ? 'Poppins-Thin'
                                                                                    : sectionproperties.varianttitle_fontweight == 400
                                                                                    ? 'Poppins-Light'
                                                                                    : sectionproperties.varianttitle_fontweight == 500
                                                                                    ? 'Poppins-Regular'
                                                                                    : sectionproperties.varianttitle_fontweight == 600
                                                                                    ? 'Poppins-Medium'
                                                                                    : sectionproperties.varianttitle_fontweight == 700
                                                                                    ? 'Poppins-Semibold'
                                                                                    : 'Poppins-Bold',
                                                                            textTransform:
                                                                                sectionproperties.varianttitle_texttransform == 'Uppercase'
                                                                                    ? 'uppercase'
                                                                                    : sectionproperties.varianttitle_texttransform == 'Capitalize'
                                                                                    ? 'capitalize'
                                                                                    : sectionproperties.varianttitle_texttransform == 'None'
                                                                                    ? 'none'
                                                                                    : 'lowercase',
                                                                        }}
                                                                    >
                                                                        {variantitem.optionname}:
                                                                    </Text>
                                                                    <Text
                                                                        style={{
                                                                            textAlign: 'left',
                                                                            //fontFamily: 'Poppins-Medium',
                                                                            color: sectionproperties.varianttext_color,
                                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.varianttext_fontSize),
                                                                            fontFamily:
                                                                                sectionproperties.varianttext_fontweight == 300
                                                                                    ? 'Poppins-Thin'
                                                                                    : sectionproperties.varianttext_fontweight == 400
                                                                                    ? 'Poppins-Light'
                                                                                    : sectionproperties.varianttext_fontweight == 500
                                                                                    ? 'Poppins-Regular'
                                                                                    : sectionproperties.varianttext_fontweight == 600
                                                                                    ? 'Poppins-Medium'
                                                                                    : sectionproperties.varianttext_fontweight == 700
                                                                                    ? 'Poppins-Semibold'
                                                                                    : 'Poppins-Bold',
                                                                        }}
                                                                    >
                                                                        {variantitem.optionvalue}
                                                                    </Text>
                                                                </View>
                                                            );
                                                        })}
                                                    {item.productinfo.hasvariants == 0 && sectionproperties.prodPriceshow == 'Show' && (
                                                        <View>
                                                            {item.productinfo.hassale == 0 && (
                                                                <Text
                                                                    style={{
                                                                        textAlign: 'left',
                                                                        color: sectionproperties.prodPriceColor,
                                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.prodpriceFontSize),
                                                                        fontFamily:
                                                                            sectionproperties.prodPriceFontWeight == 300
                                                                                ? 'Poppins-Thin'
                                                                                : sectionproperties.prodPriceFontWeight == 400
                                                                                ? 'Poppins-Light'
                                                                                : sectionproperties.prodPriceFontWeight == 500
                                                                                ? 'Poppins-Regular'
                                                                                : sectionproperties.prodPriceFontWeight == 600
                                                                                ? 'Poppins-Medium'
                                                                                : sectionproperties.prodPriceFontWeight == 700
                                                                                ? 'Poppins-Semibold'
                                                                                : 'Poppins-Bold',
                                                                    }}
                                                                >
                                                                    {item.quantity} x {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : ''} {item.finalprice}{' '}
                                                                    {langdetect == 'en' ? '' : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                                                </Text>
                                                            )}
                                                            {item.productinfo.hassale == 1 && (
                                                                <View style={[generalstyles.flexRow]}>
                                                                    <Text
                                                                        style={{
                                                                            textAlign: 'left',
                                                                            color: sectionproperties.prodPriceColor,
                                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.prodpriceFontSize),
                                                                            fontFamily:
                                                                                sectionproperties.prodPriceFontWeight == 300
                                                                                    ? 'Poppins-Thin'
                                                                                    : sectionproperties.prodPriceFontWeight == 400
                                                                                    ? 'Poppins-Light'
                                                                                    : sectionproperties.prodPriceFontWeight == 500
                                                                                    ? 'Poppins-Regular'
                                                                                    : sectionproperties.prodPriceFontWeight == 600
                                                                                    ? 'Poppins-Medium'
                                                                                    : sectionproperties.prodPriceFontWeight == 700
                                                                                    ? 'Poppins-Semibold'
                                                                                    : 'Poppins-Bold',
                                                                        }}
                                                                    >
                                                                        {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : ''} {item.finalprice}{' '}
                                                                        {langdetect == 'en' ? '' : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                                                    </Text>
                                                                    <Text
                                                                        style={{
                                                                            textAlign: 'left',
                                                                            fontFamily: 'Poppins-Light',
                                                                            color: sectionproperties.prodsalePriceColor,
                                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.prodsalepriceFontSize),
                                                                            textDecorationLine: 'line-through',
                                                                            textDecorationStyle: 'solid',
                                                                            fontFamily:
                                                                                sectionproperties.prodsalePriceFontWeight == 300
                                                                                    ? 'Poppins-Thin'
                                                                                    : sectionproperties.prodsalePriceFontWeight == 400
                                                                                    ? 'Poppins-Light'
                                                                                    : sectionproperties.prodsalePriceFontWeight == 500
                                                                                    ? 'Poppins-Regular'
                                                                                    : sectionproperties.prodsalePriceFontWeight == 600
                                                                                    ? 'Poppins-Medium'
                                                                                    : sectionproperties.prodsalePriceFontWeight == 700
                                                                                    ? 'Poppins-Semibold'
                                                                                    : 'Poppins-Bold',
                                                                        }}
                                                                    >
                                                                        {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : ''} {item.productinfo.defaultprice}{' '}
                                                                        {langdetect == 'en' ? '' : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                                                    </Text>
                                                                </View>
                                                            )}
                                                        </View>
                                                    )}
                                                    {item.productinfo.hasvariants == 1 && sectionproperties.prodPriceshow == 'Show' && (
                                                        <View>
                                                            <Text
                                                                style={{
                                                                    textAlign: 'left',
                                                                    color: sectionproperties.prodPriceColor,
                                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.prodpriceFontSize),
                                                                    fontFamily:
                                                                        sectionproperties.prodPriceFontWeight == 300
                                                                            ? 'Poppins-Thin'
                                                                            : sectionproperties.prodPriceFontWeight == 400
                                                                            ? 'Poppins-Light'
                                                                            : sectionproperties.prodPriceFontWeight == 500
                                                                            ? 'Poppins-Regular'
                                                                            : sectionproperties.prodPriceFontWeight == 600
                                                                            ? 'Poppins-Medium'
                                                                            : sectionproperties.prodPriceFontWeight == 700
                                                                            ? 'Poppins-Semibold'
                                                                            : 'Poppins-Bold',
                                                                }}
                                                            >
                                                                {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : ''}{' '}
                                                                {item.productinfo.variantinfo.hassale == 0 ? item.productinfo.variantinfo.variantprice : item.productinfo.variantinfo.variantsaleprice}{' '}
                                                                {langdetect == 'en' ? '' : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                                            </Text>

                                                            {item.productinfo.variantinfo.hassale == 1 && (
                                                                <Text
                                                                    style={{
                                                                        textAlign: 'left',
                                                                        //fontFamily: 'Poppins-Light',
                                                                        color: sectionproperties.prodsalePriceColor,
                                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.prodsalepriceFontSize),
                                                                        textDecorationLine: 'line-through',
                                                                        textDecorationStyle: 'solid',
                                                                        fontFamily:
                                                                            sectionproperties.prodsalePriceFontWeight == 300
                                                                                ? 'Poppins-Thin'
                                                                                : sectionproperties.prodsalePriceFontWeight == 400
                                                                                ? 'Poppins-Light'
                                                                                : sectionproperties.prodsalePriceFontWeight == 500
                                                                                ? 'Poppins-Regular'
                                                                                : sectionproperties.prodsalePriceFontWeight == 600
                                                                                ? 'Poppins-Medium'
                                                                                : sectionproperties.prodsalePriceFontWeight == 700
                                                                                ? 'Poppins-Semibold'
                                                                                : 'Poppins-Bold',
                                                                    }}
                                                                >
                                                                    {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : ''} {item.productinfo.variantinfo.variantprice}{' '}
                                                                    {langdetect == 'en' ? '' : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                                                </Text>
                                                            )}
                                                        </View>
                                                    )}
                                                </View>
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                            {sectionproperties.showSummarySection == 'Show' && (
                                <View
                                    style={[
                                        styles.generalcard,
                                        {
                                            backgroundColor: sectionproperties.summary_sectionbgcolor,
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.summary_sectionborderbottomleftradius, '', true),
                                            borderWidth: StyleParseToIntFuncContext(sectionproperties.userinfo_borderwidth, '', true),
                                            borderColor: sectionproperties.usserinfo_sectionbordercolor,
                                            paddingTop: StyleParseToIntFuncContext(sectionproperties.paddingTop),
                                            paddingBottom: StyleParseToIntFuncContext(sectionproperties.paddingBottom),
                                        },
                                    ]}
                                >
                                    {fetchcustomercartQueryContext?.data?.data?.customercart?.availablewalletbalance > 0 && sectionproperties.showwallet == 'Show' && (
                                        <>
                                            <View style={[generalstyles.flexRow, { marginBottom: 5 }]}>
                                                <Text
                                                    style={{
                                                        color: sectionproperties.walletcolor,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.summary_fontsize),
                                                        fontFamily:
                                                            sectionproperties.summary_textfontweight == 300
                                                                ? 'Poppins-Thin'
                                                                : sectionproperties.summary_textfontweight == 400
                                                                ? 'Poppins-Light'
                                                                : sectionproperties.summary_textfontweight == 500
                                                                ? 'Poppins-Regular'
                                                                : sectionproperties.summary_textfontweight == 600
                                                                ? 'Poppins-Medium'
                                                                : sectionproperties.summary_textfontweight == 700
                                                                ? 'Poppins-Semibold'
                                                                : 'Poppins-Bold',
                                                        textTransform:
                                                            sectionproperties.summary_texttransform == 'Uppercase'
                                                                ? 'uppercase'
                                                                : sectionproperties.summary_texttransform == 'Capitalize'
                                                                ? 'capitalize'
                                                                : sectionproperties.summary_texttransform == 'None'
                                                                ? 'none'
                                                                : 'lowercase',
                                                    }}
                                                >
                                                    {langdetect == 'en' ? sectionproperties.walletcontent_en : sectionproperties.walletcontent_ar}
                                                </Text>
                                                <Text
                                                    style={{
                                                        marginStart: 'auto',
                                                        color: sectionproperties.walletcolor,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.summary_fontsize),
                                                        fontFamily:
                                                            sectionproperties.summary_textfontweight == 300
                                                                ? 'Poppins-Thin'
                                                                : sectionproperties.summary_textfontweight == 400
                                                                ? 'Poppins-Light'
                                                                : sectionproperties.summary_textfontweight == 500
                                                                ? 'Poppins-Regular'
                                                                : sectionproperties.summary_textfontweight == 600
                                                                ? 'Poppins-Medium'
                                                                : sectionproperties.summary_textfontweight == 700
                                                                ? 'Poppins-Semibold'
                                                                : 'Poppins-Bold',
                                                    }}
                                                >
                                                    {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : ''}{' '}
                                                    {fetchcustomercartQueryContext?.data?.data?.customercart?.availablewalletbalance}
                                                    {langdetect == 'en' ? '' : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                                </Text>
                                            </View>
                                            {fetchcustomercartQueryContext?.data?.data?.customercart?.usewalletpoints == 0 && (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        usewalletpoints();
                                                    }}
                                                    style={{ marginVertical: 5 }}
                                                >
                                                    {/* TO BE PROPERTY DO NOT FORGET YA AYA */}
                                                    <Text style={[generalstyles.poppinsMedium, { color: sectionproperties.usepointscolor, textAlign: 'center', textDecorationLine: 'underline' }]}>
                                                        {langdetect == 'en' ? sectionproperties.usepoints_en : sectionproperties.usepoints_ar}
                                                    </Text>
                                                </TouchableOpacity>
                                            )}
                                            {fetchcustomercartQueryContext?.data?.data?.customercart?.usewalletpoints == 1 && (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        usewalletpoints();
                                                    }}
                                                    style={{ marginVertical: 5 }}
                                                >
                                                    {/* TO BE PROPERTY DO NOT FORGET YA AYA */}
                                                    <Text style={[generalstyles.poppinsMedium, { color: sectionproperties.removepointscolor, textAlign: 'center', textDecorationLine: 'underline' }]}>
                                                        {langdetect == 'en' ? sectionproperties.removepoints_en : sectionproperties.removepoints_ar}
                                                    </Text>
                                                </TouchableOpacity>
                                            )}
                                        </>
                                    )}

                                    <View style={[generalstyles.flexRow, { marginBottom: 5 }]}>
                                        <Text
                                            style={{
                                                //fontFamily: 'Poppins-Medium',
                                                color: sectionproperties.summary_textcolor,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.summary_fontsize),
                                                fontFamily:
                                                    sectionproperties.summary_textfontweight == 300
                                                        ? 'Poppins-Thin'
                                                        : sectionproperties.summary_textfontweight == 400
                                                        ? 'Poppins-Light'
                                                        : sectionproperties.summary_textfontweight == 500
                                                        ? 'Poppins-Regular'
                                                        : sectionproperties.summary_textfontweight == 600
                                                        ? 'Poppins-Medium'
                                                        : sectionproperties.summary_textfontweight == 700
                                                        ? 'Poppins-Semibold'
                                                        : 'Poppins-Bold',
                                                textTransform:
                                                    sectionproperties.summary_texttransform == 'Uppercase'
                                                        ? 'uppercase'
                                                        : sectionproperties.summary_texttransform == 'Capitalize'
                                                        ? 'capitalize'
                                                        : sectionproperties.summary_texttransform == 'None'
                                                        ? 'none'
                                                        : 'lowercase',
                                            }}
                                        >
                                            {lang.subtotal}
                                        </Text>
                                        <Text
                                            style={{
                                                marginStart: 'auto',
                                                color: sectionproperties.summary_textcolor,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.summary_fontsize),
                                                fontFamily:
                                                    sectionproperties.summary_textfontweight == 300
                                                        ? 'Poppins-Thin'
                                                        : sectionproperties.summary_textfontweight == 400
                                                        ? 'Poppins-Light'
                                                        : sectionproperties.summary_textfontweight == 500
                                                        ? 'Poppins-Regular'
                                                        : sectionproperties.summary_textfontweight == 600
                                                        ? 'Poppins-Medium'
                                                        : sectionproperties.summary_textfontweight == 700
                                                        ? 'Poppins-Semibold'
                                                        : 'Poppins-Bold',
                                            }}
                                        >
                                            {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : ''}{' '}
                                            {parseFloat(fetchcustomercartQueryContext.data.data.customercart.totalprice).toFixed(2)}{' '}
                                            {/* {fetchcustomercartQueryContext.data.data.customercart.totalprice}{' '} */}
                                            {langdetect == 'en' ? '' : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                        </Text>
                                    </View>
                                    {fetchcustomercartQueryContext?.data?.data?.customercart?.usewalletpoints == 1 && sectionproperties.showwallet == 'Show' && (
                                        <View style={[generalstyles.flexRow, { marginBottom: 5 }]}>
                                            <Text
                                                style={{
                                                    //fontFamily: 'Poppins-Medium',
                                                    color: sectionproperties.walletpointsused_color,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.summary_fontsize),
                                                    fontFamily:
                                                        sectionproperties.summary_textfontweight == 300
                                                            ? 'Poppins-Thin'
                                                            : sectionproperties.summary_textfontweight == 400
                                                            ? 'Poppins-Light'
                                                            : sectionproperties.summary_textfontweight == 500
                                                            ? 'Poppins-Regular'
                                                            : sectionproperties.summary_textfontweight == 600
                                                            ? 'Poppins-Medium'
                                                            : sectionproperties.summary_textfontweight == 700
                                                            ? 'Poppins-Semibold'
                                                            : 'Poppins-Bold',
                                                    textTransform:
                                                        sectionproperties.summary_texttransform == 'Uppercase'
                                                            ? 'uppercase'
                                                            : sectionproperties.summary_texttransform == 'Capitalize'
                                                            ? 'capitalize'
                                                            : sectionproperties.summary_texttransform == 'None'
                                                            ? 'none'
                                                            : 'lowercase',
                                                }}
                                            >
                                                {/* TO BE PROPERTY DO NOT FORGET YA AYA */}
                                                {langdetect == 'en' ? sectionproperties.walletpointsused_en : sectionproperties.walletpointsused_ar}
                                            </Text>
                                            <Text
                                                style={{
                                                    marginStart: 'auto',
                                                    color: sectionproperties.walletpointsused_color,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.summary_fontsize),
                                                    fontFamily:
                                                        sectionproperties.summary_textfontweight == 300
                                                            ? 'Poppins-Thin'
                                                            : sectionproperties.summary_textfontweight == 400
                                                            ? 'Poppins-Light'
                                                            : sectionproperties.summary_textfontweight == 500
                                                            ? 'Poppins-Regular'
                                                            : sectionproperties.summary_textfontweight == 600
                                                            ? 'Poppins-Medium'
                                                            : sectionproperties.summary_textfontweight == 700
                                                            ? 'Poppins-Semibold'
                                                            : 'Poppins-Bold',
                                                }}
                                            >
                                                {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : ''}{' '}
                                                {parseFloat(fetchcustomercartQueryContext?.data?.data?.customercart?.walletpointsused)}{' '}
                                                {langdetect == 'en' ? '' : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                            </Text>
                                        </View>
                                    )}
                                    {fetchcustomercartQueryContext.data.data.customercart.couponexists && fetchcustomercartQueryContext.data.data.customercart.discountprice != 0 && (
                                        <View style={[generalstyles.flexRow, { marginBottom: 5 }]}>
                                            <Text
                                                style={{
                                                    //fontFamily: 'Poppins-Medium',
                                                    color: sectionproperties.prodsalePriceColor,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.summary_fontsize),
                                                    fontFamily:
                                                        sectionproperties.prodsalePriceFontWeight == 300
                                                            ? 'Poppins-Thin'
                                                            : sectionproperties.prodsalePriceFontWeight == 400
                                                            ? 'Poppins-Light'
                                                            : sectionproperties.prodsalePriceFontWeight == 500
                                                            ? 'Poppins-Regular'
                                                            : sectionproperties.prodsalePriceFontWeight == 600
                                                            ? 'Poppins-Medium'
                                                            : sectionproperties.prodsalePriceFontWeight == 700
                                                            ? 'Poppins-Semibold'
                                                            : 'Poppins-Bold',
                                                }}
                                            >
                                                {lang.discount}
                                            </Text>
                                            {fetchcustomercartQueryContext.data.data.customercart.discountprice != 0 && (
                                                <Text
                                                    style={{
                                                        marginStart: 'auto',
                                                        //fontFamily: 'Poppins-Medium',
                                                        color: sectionproperties.prodsalePriceColor,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.summary_fontsize),
                                                        fontFamily:
                                                            sectionproperties.prodsalePriceFontWeight == 300
                                                                ? 'Poppins-Thin'
                                                                : sectionproperties.prodsalePriceFontWeight == 400
                                                                ? 'Poppins-Light'
                                                                : sectionproperties.prodsalePriceFontWeight == 500
                                                                ? 'Poppins-Regular'
                                                                : sectionproperties.prodsalePriceFontWeight == 600
                                                                ? 'Poppins-Medium'
                                                                : sectionproperties.prodsalePriceFontWeight == 700
                                                                ? 'Poppins-Semibold'
                                                                : 'Poppins-Bold',
                                                    }}
                                                >
                                                    - {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : ''}{' '}
                                                    {/* {fetchcustomercartQueryContext.data.data.customercart.discountprice}{' '} */}
                                                    {parseFloat(fetchcustomercartQueryContext.data.data.customercart.discountprice).toFixed(2)}{' '}
                                                    {langdetect == 'en' ? '' : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                                </Text>
                                            )}
                                            {fetchcustomercartQueryContext.data.data.customercart.discountprice == 0 && (
                                                <Text
                                                    style={{
                                                        marginStart: 'auto',
                                                        //fontFamily: 'Poppins-Medium',
                                                        color: sectionproperties.prodsalePriceColor,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.summary_fontsize),
                                                        fontFamily:
                                                            sectionproperties.prodsalePriceFontWeight == 300
                                                                ? 'Poppins-Thin'
                                                                : sectionproperties.prodsalePriceFontWeight == 400
                                                                ? 'Poppins-Light'
                                                                : sectionproperties.prodsalePriceFontWeight == 500
                                                                ? 'Poppins-Regular'
                                                                : sectionproperties.prodsalePriceFontWeight == 600
                                                                ? 'Poppins-Medium'
                                                                : sectionproperties.prodsalePriceFontWeight == 700
                                                                ? 'Poppins-Semibold'
                                                                : 'Poppins-Bold',
                                                    }}
                                                >
                                                    0
                                                </Text>
                                            )}
                                        </View>
                                    )}
                                    {fetchcustomercartQueryContext?.data?.data?.customercart?.genpayments?.length != 0 &&
                                        fetchcustomercartQueryContext?.data?.data?.customercart?.genpayments?.map((item, index) => {
                                            return (
                                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                                    <Text
                                                        style={[
                                                            {
                                                                fontSize: StyleParseToIntFuncContext(sectionproperties.summary_fontsize),
                                                                color: item.addsubtype == 'subtract' ? COLORS.danger : COLORS.success,
                                                                fontFamily:
                                                                    sectionproperties.summary_textfontweight == 300
                                                                        ? 'Poppins-Thin'
                                                                        : sectionproperties.summary_textfontweight == 400
                                                                        ? 'Poppins-Light'
                                                                        : sectionproperties.summary_textfontweight == 500
                                                                        ? 'Poppins-Regular'
                                                                        : sectionproperties.summary_textfontweight == 600
                                                                        ? 'Poppins-Medium'
                                                                        : sectionproperties.summary_textfontweight == 700
                                                                        ? 'Poppins-Semibold'
                                                                        : 'Poppins-Bold',
                                                                textTransform:
                                                                    sectionproperties.summary_texttransform == 'Uppercase'
                                                                        ? 'uppercase'
                                                                        : sectionproperties.summary_texttransform == 'Capitalize'
                                                                        ? 'capitalize'
                                                                        : sectionproperties.summary_texttransform == 'None'
                                                                        ? 'none'
                                                                        : 'lowercase',
                                                            },
                                                        ]}
                                                    >
                                                        {langdetect == 'en' ? item.title_en : item.title_ar}:
                                                    </Text>
                                                    <Text
                                                        style={[
                                                            {
                                                                marginStart: 'auto',
                                                                fontSize: StyleParseToIntFuncContext(sectionproperties.summary_fontsize),
                                                                fontFamily:
                                                                    sectionproperties.summary_textfontweight == 300
                                                                        ? 'Poppins-Thin'
                                                                        : sectionproperties.summary_textfontweight == 400
                                                                        ? 'Poppins-Light'
                                                                        : sectionproperties.summary_textfontweight == 500
                                                                        ? 'Poppins-Regular'
                                                                        : sectionproperties.summary_textfontweight == 600
                                                                        ? 'Poppins-Medium'
                                                                        : sectionproperties.summary_textfontweight == 700
                                                                        ? 'Poppins-Semibold'
                                                                        : 'Poppins-Bold',
                                                                color: item.addsubtype == 'subtract' ? COLORS.danger : COLORS.success,
                                                            },
                                                        ]}
                                                    >
                                                        {item.addsubtype == 'subtract' && <Text>- </Text>}
                                                        {item.valuetype == 'value' && (
                                                            <Text>
                                                                {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : ''} {item.value}{' '}
                                                                {langdetect == 'en' ? '' : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                                            </Text>
                                                        )}
                                                        {item.valuetype == 'percentage' && <Text>{item.value}%</Text>}
                                                    </Text>
                                                </View>
                                            );
                                        })}
                                    {sectionproperties.hideshipping == 'Show' && (
                                        <View style={[generalstyles.flexRow]}>
                                            <Text
                                                style={{
                                                    //fontFamily: 'Poppins-Medium',
                                                    color: sectionproperties.summary_textcolor,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.summary_fontsize),
                                                    fontFamily:
                                                        sectionproperties.summary_textfontweight == 300
                                                            ? 'Poppins-Thin'
                                                            : sectionproperties.summary_textfontweight == 400
                                                            ? 'Poppins-Light'
                                                            : sectionproperties.summary_textfontweight == 500
                                                            ? 'Poppins-Regular'
                                                            : sectionproperties.summary_textfontweight == 600
                                                            ? 'Poppins-Medium'
                                                            : sectionproperties.summary_textfontweight == 700
                                                            ? 'Poppins-Semibold'
                                                            : 'Poppins-Bold',
                                                    textTransform:
                                                        sectionproperties.summary_texttransform == 'Uppercase'
                                                            ? 'uppercase'
                                                            : sectionproperties.summary_texttransform == 'Capitalize'
                                                            ? 'capitalize'
                                                            : sectionproperties.summary_texttransform == 'None'
                                                            ? 'none'
                                                            : 'lowercase',
                                                }}
                                            >
                                                {langdetect == 'en' ? sectionproperties.shippingfeestitle_en : sectionproperties.shippingfeestitle_ar}

                                                {/* {lang.shippingfees} */}
                                            </Text>
                                            {fetchcustomercartQueryContext.data.data.customercart.zoneexists && (
                                                <Text
                                                    style={{
                                                        marginStart: 'auto',
                                                        //fontFamily: 'Poppins-Medium',
                                                        color: sectionproperties.summary_textcolor,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.summary_fontsize),
                                                        fontFamily:
                                                            sectionproperties.summary_textfontweight == 300
                                                                ? 'Poppins-Thin'
                                                                : sectionproperties.summary_textfontweight == 400
                                                                ? 'Poppins-Light'
                                                                : sectionproperties.summary_textfontweight == 500
                                                                ? 'Poppins-Regular'
                                                                : sectionproperties.summary_textfontweight == 600
                                                                ? 'Poppins-Medium'
                                                                : sectionproperties.summary_textfontweight == 700
                                                                ? 'Poppins-Semibold'
                                                                : 'Poppins-Bold',
                                                    }}
                                                >
                                                    {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : ''}{' '}
                                                    {fetchcustomercartQueryContext.data.data.customercart.zoneprice}{' '}
                                                    {langdetect == 'en' ? '' : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                                </Text>
                                            )}
                                            {!fetchcustomercartQueryContext.data.data.customercart.zoneexists && (
                                                <Text
                                                    style={{
                                                        marginStart: 'auto',
                                                        fontFamily: 'Poppins-Medium',
                                                        color: COLORS.danger,
                                                        fontSize: 15,
                                                    }}
                                                >
                                                    {lang.outofzone}
                                                </Text>
                                            )}
                                        </View>
                                    )}

                                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#e6e6e6', marginTop: 10, marginBottom: 10 }}></View>
                                    <View style={[generalstyles.flexRow]}>
                                        <Text
                                            style={{
                                                //fontFamily: 'Poppins-Medium',
                                                color: sectionproperties.total_color,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.total_fontsize),
                                                textTransform: 'uppercase',
                                                fontFamily:
                                                    sectionproperties.total_fontweight == 300
                                                        ? 'Poppins-Thin'
                                                        : sectionproperties.total_fontweight == 400
                                                        ? 'Poppins-Light'
                                                        : sectionproperties.total_fontweight == 500
                                                        ? 'Poppins-Regular'
                                                        : sectionproperties.total_fontweight == 600
                                                        ? 'Poppins-Medium'
                                                        : sectionproperties.total_fontweight == 700
                                                        ? 'Poppins-Semibold'
                                                        : 'Poppins-Bold',
                                                textTransform:
                                                    sectionproperties.total_texttransform == 'Uppercase'
                                                        ? 'uppercase'
                                                        : sectionproperties.total_texttransform == 'Capitalize'
                                                        ? 'capitalize'
                                                        : sectionproperties.total_texttransform == 'None'
                                                        ? 'none'
                                                        : 'lowercase',
                                            }}
                                        >
                                            {lang.total}
                                        </Text>
                                        <Text
                                            style={{
                                                marginStart: 'auto',
                                                color: sectionproperties.total_color,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.total_fontsize),
                                                fontFamily:
                                                    sectionproperties.total_fontweight == 300
                                                        ? 'Poppins-Thin'
                                                        : sectionproperties.total_fontweight == 400
                                                        ? 'Poppins-Light'
                                                        : sectionproperties.total_fontweight == 500
                                                        ? 'Poppins-Regular'
                                                        : sectionproperties.total_fontweight == 600
                                                        ? 'Poppins-Medium'
                                                        : sectionproperties.total_fontweight == 700
                                                        ? 'Poppins-Semibold'
                                                        : 'Poppins-Bold',
                                            }}
                                        >
                                            {/* {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : ''}{' '}
                                             {langdetect == 'en' ? '' : 'ج.م'} */}
                                            {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : ''}{' '}
                                            {/* {fetchcustomercartQueryContext.data.data.customercart.totalpriceafterdiscount}{' '} */}
                                            {parseFloat(fetchcustomercartQueryContext.data.data.customercart.totalpriceafterdiscount).toFixed(2)}{' '}
                                            {langdetect == 'en' ? '' : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                        </Text>
                                    </View>
                                </View>
                            )}

                            {sectionproperties.slideshowtext1_show == 'Show' && (
                                <View
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginVertical: 5,
                                        backgroundColor: '#fff',
                                        borderRadius: 10,
                                        paddingVertical: 10,
                                        paddingHorizontal: 15,
                                    }}
                                >
                                    <RenderHtml
                                        source={source}
                                        tagsStyles={{
                                            body: {
                                                direction: langdetect == 'en' ? 'ltr' : 'rtl',
                                                textAlign: 'left',
                                            },
                                            span: {
                                                direction: langdetect == 'en' ? 'ltr' : 'rtl',
                                                textAlign: 'left',
                                            },
                                        }}
                                    />
                                </View>
                            )}
                            {sectionproperties.showpayemntsection == 'Show' && (
                                <View
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            width: StyleParseToIntFuncContext(
                                                sectionproperties.checkoutBtnWidth != null && sectionproperties.checkoutBtnWidth != undefined ? sectionproperties.checkoutBtnWidth : 0,
                                            ),
                                            height: StyleParseToIntFuncContext(
                                                sectionproperties.checkoutBtnHeight != null && sectionproperties.checkoutBtnHeight != undefined ? sectionproperties.checkoutBtnHeight : 0,
                                            ),
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.checkout_borderBottomLeftRadius, '', true),
                                            backgroundColor: sectionproperties.checkoutBtnbgColor,
                                            borderColor: sectionproperties.checkout_bordercolor,
                                            borderWidth: StyleParseToIntFuncContext(sectionproperties.checkout_borderWidth, '', true),
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginTop: 10,
                                        }}
                                        disabled={ChooseState_CountryMutationContext.isLoading}
                                        onPress={() => {
                                            cartinfoupdater(addressinfopayloadobj);
                                            settabindex(1);
                                            // alert(JSON.stringify(addressinfopayloadobj));
                                            // ChooseState_CountryMutationContext.mutate(addressinfopayloadobj);
                                        }}
                                    >
                                        {ChooseState_CountryMutationContext.isLoading && (
                                            <SpinnerButton
                                                buttonStyle={{ width: 30, height: 30 }}
                                                isLoading={true}
                                                indicatorCount={10}
                                                spinnerType={'MaterialIndicator'}
                                                spinnerColor={sectionproperties.checkoutBtnTextcolor}
                                            ></SpinnerButton>
                                        )}
                                        {!ChooseState_CountryMutationContext.isLoading && (
                                            <Text
                                                style={{
                                                    //fontFamily: 'Poppins-Medium',

                                                    color: sectionproperties.checkoutBtnTextcolor,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.checkoutBtnTextfontsize),
                                                    fontFamily:
                                                        sectionproperties.checkoutBtnTextfontweight == 300
                                                            ? 'Poppins-Thin'
                                                            : sectionproperties.checkoutBtnTextfontweight == 400
                                                            ? 'Poppins-Light'
                                                            : sectionproperties.checkoutBtnTextfontweight == 500
                                                            ? 'Poppins-Regular'
                                                            : sectionproperties.checkoutBtnTextfontweight == 600
                                                            ? 'Poppins-Medium'
                                                            : sectionproperties.checkoutBtnTextfontweight == 700
                                                            ? 'Poppins-Semibold'
                                                            : 'Poppins-Bold',
                                                    textTransform:
                                                        sectionproperties.checkoutBtnTexttransform == 'Uppercase'
                                                            ? 'uppercase'
                                                            : sectionproperties.checkoutBtnTexttransform == 'Capitalize'
                                                            ? 'capitalize'
                                                            : sectionproperties.checkoutBtnTexttransform == 'None'
                                                            ? 'none'
                                                            : 'lowercase',
                                                }}
                                            >
                                                {langdetect == 'en' ? sectionproperties.checkoutButtonContenten : sectionproperties.checkoutButtonContentar}
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            )}
                            {sectionproperties.showpayemntsection == 'Hide' && (
                                <View
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            width: 250,
                                            height: 45,
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.checkout_borderBottomLeftRadius, '', true),
                                            backgroundColor: sectionproperties.checkoutBtnbgColor,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginTop: 10,
                                        }}
                                        onPress={() => {
                                            var payloadobj = {};
                                            // routingcountext(StaticPagesLinksContext.Ordersuccess, { status: 'true', reason: '' });
                                            // setaddressinfopayloadobj({ ...addressinfopayloadobj, paymentmethod: 'cod' });
                                            updatepaymentmethod('cod');
                                            AddOrderMutationContext.mutate(payloadobj);
                                        }}
                                        disabled={AddOrderMutationContext.isLoading ? true : false}
                                    >
                                        {AddOrderMutationContext.isLoading && (
                                            <View style={{}}>
                                                <SpinnerButton
                                                    buttonStyle={{ width: 30, height: 30 }}
                                                    isLoading={true}
                                                    indicatorCount={10}
                                                    spinnerType={'MaterialIndicator'}
                                                    spinnerColor={sectionproperties.checkoutBtnTextcolor}
                                                ></SpinnerButton>
                                            </View>
                                        )}
                                        {!AddOrderMutationContext.isLoading && (
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins-Medium',
                                                    color: sectionproperties.checkoutBtnTextcolor,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.checkoutBtnTextfontsize),
                                                }}
                                            >
                                                {langdetect == 'en' ? sectionproperties.checkoutbtn_content2en : sectionproperties.checkoutbtn_content2ar}
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    )}
                    {tabindex === 1 && (
                        <View stye={[generalstyles.container, { paddingLeft: 0, paddingRight: 0, backgroundColor: sectionproperties.sectionbgcolor != null ? sectionproperties.sectionbgcolor : '' }]}>
                            <TouchableOpacity
                                style={[
                                    generalstyles.containerInner,
                                    generalstyles.flexRow,
                                    { marginBottom: 10, backgroundColor: sectionproperties.sectionbgcolor != null ? sectionproperties.sectionbgcolor : '' },
                                ]}
                                onPress={() => {
                                    settabindex(0);
                                }}
                            >
                                <View
                                    style={{
                                        marginEnd: 10,
                                    }}
                                >
                                    <AntDesign
                                        name={langdetect == 'en' ? 'arrowleft' : 'arrowright'}
                                        size={18}
                                        style={{
                                            color: sectionproperties.sectionTitleColor,
                                        }}
                                    />
                                </View>
                                <Text
                                    style={{
                                        textAlign: 'left',
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
                                        textTransform:
                                            sectionproperties.sectionTitleTextTransform == 'Uppercase'
                                                ? 'uppercase'
                                                : sectionproperties.sectionTitleTextTransform == 'capitalize'
                                                ? 'capitalize'
                                                : sectionproperties.sectionTitleTextTransform == 'none'
                                                ? 'none'
                                                : 'lowercase',
                                        color: sectionproperties.sectionTitleColor,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
                                    }}
                                >
                                    {lang.selectpaymentmethod}
                                </Text>
                            </TouchableOpacity>
                            <View
                                style={[
                                    styles.generalcard,
                                    {
                                        backgroundColor: sectionproperties.reservation_bgcolor,
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.payment_borderradius, '', true),
                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.payment_borderwidth, '', true),
                                        borderColor: sectionproperties.payment_sectionbordercolor,
                                    },
                                ]}
                            >
                                {fetchAuthorizationQueryContext?.data?.data?.instinfo?.acceptCOD == 1 && sectionproperties.hidecod == 'Show' && (
                                    <>
                                        <TouchableOpacity
                                            style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}
                                            onPress={() => {
                                                // setaddressinfopayloadobj({ ...addressinfopayloadobj, paymentmethod: 'cod' });
                                                updatepaymentmethod('cod');
                                            }}
                                        >
                                            <CheckBox
                                                disabled={false}
                                                checkBoxColor={sectionproperties.checkbox_color}
                                                checkedCheckBoxColor={sectionproperties.checkbox_checkedcolor}
                                                style={{}}
                                                boxType="circle"
                                                onClick={() => {
                                                    // setaddressinfopayloadobj({ ...addressinfopayloadobj, paymentmethod: 'cod' });
                                                    updatepaymentmethod('cod');
                                                }}
                                                isChecked={fetchcustomercartQueryContext.data.data.customercart.paymentmethod == 'cod' ? true : false}
                                            />
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins-Medium',
                                                    marginStart: 5,
                                                    color: sectionproperties.checkbox_color,
                                                    fontSize: 14,
                                                }}
                                            >
                                                {langdetect == 'en' ? sectionproperties.cod_text_en : sectionproperties.cod_text_ar}
                                                {/* {lang.cashondelivery} */}
                                            </Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                                {fetchAuthorizationQueryContext?.data?.data?.instinfo?.acceptCardOnDelivery == 1 && (
                                    <>
                                        <View style={{ backgroundColor: '#eee', width: '100%', height: 1, marginTop: 10, marginBottom: 10 }}></View>
                                        <TouchableOpacity
                                            style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}
                                            onPress={() => {
                                                // setaddressinfopayloadobj({ ...addressinfopayloadobj, paymentmethod: 'cardondelivery' });
                                                updatepaymentmethod('cardondelivery');
                                            }}
                                        >
                                            <CheckBox
                                                disabled={false}
                                                checkBoxColor={sectionproperties.checkbox_color}
                                                checkedCheckBoxColor={sectionproperties.checkbox_checkedcolor}
                                                style={{}}
                                                boxType="circle"
                                                onClick={() => {
                                                    // setaddressinfopayloadobj({ ...addressinfopayloadobj, paymentmethod: 'cardondelivery' });
                                                    updatepaymentmethod('cardondelivery');
                                                }}
                                                isChecked={fetchcustomercartQueryContext.data.data.customercart.paymentmethod == 'cardondelivery' ? true : false}
                                            />
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins-Medium',
                                                    marginStart: 5,
                                                    color: sectionproperties.checkbox_color,
                                                    fontSize: 14,
                                                }}
                                            >
                                                {lang.cardondelivery}
                                            </Text>
                                        </TouchableOpacity>
                                    </>
                                )}

                                {fetchAuthorizationQueryContext?.data?.data?.instinfo?.acceptOnlineCardPayment == 0 && (
                                    <>
                                        {sectionproperties.hidecod == 'Show' && <View style={{ backgroundColor: '#eee', width: '100%', height: 1, marginTop: 10, marginBottom: 10 }}></View>}
                                        <TouchableOpacity
                                            style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}
                                            onPress={() => {
                                                // setaddressinfopayloadobj({ ...addressinfopayloadobj, paymentmethod: 'onlinepayment' });
                                                updatepaymentmethod('onlinepayment');
                                            }}
                                        >
                                            <CheckBox
                                                disabled={false}
                                                checkBoxColor={sectionproperties.checkbox_color}
                                                checkedCheckBoxColor={sectionproperties.checkbox_checkedcolor}
                                                style={{}}
                                                boxType="circle"
                                                isChecked={fetchcustomercartQueryContext.data.data.customercart.paymentmethod == 'onlinepayment' ? true : false}
                                                onClick={() => {
                                                    // setaddressinfopayloadobj({ ...addressinfopayloadobj, paymentmethod: 'onlinepayment' });
                                                    updatepaymentmethod('onlinepayment');
                                                }}
                                            />
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins-Medium',
                                                    marginStart: 5,
                                                    color: sectionproperties.checkbox_color,
                                                    fontSize: 14,
                                                }}
                                            >
                                                {lang.onlinepayment}
                                            </Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                                {fetchAuthorizationQueryContext?.data?.data?.instinfo?.acceptmobilewalletpayment == 1 && (
                                    <>
                                        <View style={{ backgroundColor: '#eee', width: '100%', height: 1, marginTop: 10, marginBottom: 10 }}></View>

                                        <TouchableOpacity
                                            style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}
                                            onPress={() => {
                                                // setaddressinfopayloadobj({ ...addressinfopayloadobj, paymentmethod: 'onlinepayment' });
                                                updatepaymentmethod('mobilewallet');
                                            }}
                                        >
                                            <CheckBox
                                                disabled={false}
                                                checkBoxColor={sectionproperties.checkbox_color}
                                                checkedCheckBoxColor={sectionproperties.checkbox_checkedcolor}
                                                style={{}}
                                                boxType="circle"
                                                isChecked={fetchcustomercartQueryContext.data.data.customercart.paymentmethod == 'mobilewallet' ? true : false}
                                                onClick={() => {
                                                    // setaddressinfopayloadobj({ ...addressinfopayloadobj, paymentmethod: 'onlinepayment' });
                                                    updatepaymentmethod('mobilewallet');
                                                }}
                                            />
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins-Medium',
                                                    marginStart: 5,
                                                    color: sectionproperties.checkbox_color,
                                                    fontSize: 14,
                                                }}
                                            >
                                                {langdetect == 'en' ? 'Mobile Wallet' : 'المحفظة الإلكترونية '}
                                            </Text>
                                        </TouchableOpacity>
                                        <View style={{ backgroundColor: '#eee', width: '100%', height: 1, marginTop: 10, marginBottom: 10 }}></View>
                                    </>
                                )}
                                {fetchAuthorizationQueryContext?.data?.data?.instinfo?.acceptAmanCard == 1 && (
                                    <>
                                        <View style={{ backgroundColor: '#eee', width: '100%', height: 1, marginTop: 10, marginBottom: 10 }}></View>
                                        <TouchableOpacity
                                            style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}
                                            onPress={() => {
                                                updatepaymentmethod('Aman');
                                            }}
                                        >
                                            <CheckBox
                                                disabled={false}
                                                checkBoxColor={sectionproperties.checkbox_color}
                                                checkedCheckBoxColor={sectionproperties.checkbox_checkedcolor}
                                                style={{}}
                                                boxType="circle"
                                                isChecked={fetchcustomercartQueryContext.data.data.customercart.paymentmethod == 'Aman' ? true : false}
                                                onClick={() => {
                                                    updatepaymentmethod('Aman');
                                                }}
                                            />
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins-Medium',
                                                    marginStart: 5,
                                                    color: sectionproperties.checkbox_color,
                                                    fontSize: 14,
                                                }}
                                            >
                                                {langdetect == 'en' ? 'Aman' : 'Aman'}
                                            </Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                                {/* valu */}
                                {fetchAuthorizationQueryContext?.data?.data?.instinfo?.acceptValuCard == 1 && (
                                    <>
                                        <View style={{ backgroundColor: '#eee', width: '100%', height: 1, marginTop: 10, marginBottom: 10 }}></View>
                                        <TouchableOpacity
                                            style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}
                                            onPress={() => {
                                                // setaddressinfopayloadobj({ ...addressinfopayloadobj, paymentmethod: 'onlinepayment' });
                                                updatepaymentmethod('valU');
                                            }}
                                        >
                                            <CheckBox
                                                disabled={false}
                                                checkBoxColor={sectionproperties.checkbox_color}
                                                checkedCheckBoxColor={sectionproperties.checkbox_checkedcolor}
                                                style={{}}
                                                boxType="circle"
                                                isChecked={fetchcustomercartQueryContext.data.data.customercart.paymentmethod == 'valU' ? true : false}
                                                onClick={() => {
                                                    // setaddressinfopayloadobj({ ...addressinfopayloadobj, paymentmethod: 'onlinepayment' });
                                                    updatepaymentmethod('valU');
                                                }}
                                            />
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins-Medium',
                                                    marginStart: 5,
                                                    color: sectionproperties.checkbox_color,
                                                    fontSize: 14,
                                                }}
                                            >
                                                {sectionproperties.valuorfawryname}
                                            </Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                                {fetchAuthorizationQueryContext?.data?.data?.instinfo?.acceptForsaCard == 1 && (
                                    <>
                                        <View style={{ backgroundColor: '#eee', width: '100%', height: 1, marginTop: 10, marginBottom: 10 }}></View>
                                        <TouchableOpacity
                                            style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}
                                            onPress={() => {
                                                updatepaymentmethod('forsa');
                                            }}
                                        >
                                            <CheckBox
                                                disabled={false}
                                                checkBoxColor={sectionproperties.checkbox_color}
                                                checkedCheckBoxColor={sectionproperties.checkbox_checkedcolor}
                                                style={{}}
                                                boxType="circle"
                                                isChecked={fetchcustomercartQueryContext.data.data.customercart.paymentmethod == 'forsa' ? true : false}
                                                onClick={() => {
                                                    updatepaymentmethod('forsa');
                                                }}
                                            />
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins-Medium',
                                                    marginStart: 5,
                                                    color: sectionproperties.checkbox_color,
                                                    fontSize: 14,
                                                }}
                                            >
                                                {langdetect == 'en' ? 'Forsa' : 'Forsa'}
                                            </Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                            {fetchcustomercartQueryContext.data.data.customercart.paymentmethod == 'onlinepayment1' && (
                                <View>
                                    <View style={[generalstyles.containerInner, { paddingTop: 0, marginTop: 10, marginBottom: 10 }]}>
                                        <Text
                                            style={{
                                                fontFamily: 'Poppins-Medium',
                                                color: sectionproperties.userinfo_titlecolor,
                                                fontSize: 15,
                                            }}
                                        >
                                            {lang.paymentcardinfo}
                                        </Text>
                                    </View>
                                    <View
                                        style={[
                                            styles.generalcard,
                                            {
                                                backgroundColor: sectionproperties.payment_sectionbgcolor,
                                                borderRadius: StyleParseToIntFuncContext(sectionproperties.payment_borderradius, '', true),
                                                borderWidth: StyleParseToIntFuncContext(sectionproperties.payment_borderwidth, '', true),
                                                borderColor: sectionproperties.payment_sectionbordercolor,
                                            },
                                        ]}
                                    >
                                        <View style={[styles.inputscontainer]}>
                                            <Text
                                                style={[generalstyles.poppinsMedium, { color: sectionproperties.form_labelcolor, fontSize: sectionproperties.form_labelfontsize, textAlign: 'left' }]}
                                            >
                                                {lang.cardnumber}
                                            </Text>
                                            <TextInput
                                                style={[
                                                    styles.textinput,
                                                    {
                                                        color: sectionproperties.inputfieldcolor,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                                        shadowColor: sectionproperties.inputshadowcolor,
                                                        shadowOpacity: 0.1,
                                                        // shadowOpacity: sectionproperties.inputshadowopacity,
                                                        backgroundColor: sectionproperties.input_bgcolor,
                                                    },
                                                ]}
                                            />
                                        </View>
                                        <View style={[styles.inputscontainer]}>
                                            <Text
                                                style={[generalstyles.poppinsMedium, { color: sectionproperties.form_labelcolor, fontSize: sectionproperties.form_labelfontsize, textAlign: 'left' }]}
                                            >
                                                {lang.year}
                                            </Text>
                                            <TextInput
                                                style={[
                                                    styles.textinput,
                                                    {
                                                        color: sectionproperties.inputfieldcolor,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                                        shadowColor: sectionproperties.inputshadowcolor,
                                                        // shadowOpacity: sectionproperties.inputshadowopacity,
                                                        shadowOpacity: 0.1,
                                                        backgroundColor: sectionproperties.input_bgcolor,
                                                    },
                                                ]}
                                            />
                                        </View>
                                        <View style={[styles.inputscontainer]}>
                                            <Text
                                                style={[generalstyles.poppinsMedium, { color: sectionproperties.form_labelcolor, fontSize: sectionproperties.form_labelfontsize, textAlign: 'left' }]}
                                            >
                                                {lang.month}
                                            </Text>
                                            <TextInput
                                                style={[
                                                    styles.textinput,
                                                    {
                                                        color: sectionproperties.inputfieldcolor,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                                        shadowColor: sectionproperties.inputshadowcolor,
                                                        // shadowOpacity: sectionproperties.inputshadowopacity,
                                                        shadowOpacity: 0.1,
                                                        backgroundColor: sectionproperties.input_bgcolor,
                                                    },
                                                ]}
                                            />
                                        </View>
                                        <View style={[styles.inputscontainer]}>
                                            <Text
                                                style={[
                                                    generalstyles.poppinsMedium,
                                                    { color: sectionproperties.form_labelcolor, fontSize: StyleParseToIntFuncContext(sectionproperties.form_labelfontsize), textAlign: 'left' },
                                                ]}
                                            >
                                                {lang.cvv}
                                            </Text>
                                            <TextInput
                                                style={[
                                                    styles.textinput,
                                                    {
                                                        color: sectionproperties.inputfieldcolor,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                                        shadowColor: sectionproperties.inputshadowcolor,
                                                        shadowOpacity: 0.1,
                                                        // shadowOpacity: sectionproperties.inputshadowopacity,
                                                        backgroundColor: sectionproperties.input_bgcolor,
                                                    },
                                                ]}
                                            />
                                        </View>
                                        <View style={[styles.inputscontainer]}>
                                            <Text
                                                style={[
                                                    generalstyles.poppinsMedium,
                                                    { color: sectionproperties.form_labelcolor, fontSize: StyleParseToIntFuncContext(sectionproperties.form_labelfontsize), textAlign: 'left' },
                                                ]}
                                            >
                                                {lang.nameoncard}
                                            </Text>
                                            <TextInput
                                                style={[
                                                    styles.textinput,
                                                    {
                                                        color: sectionproperties.inputfieldcolor,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                                        shadowColor: sectionproperties.inputshadowcolor,
                                                        shadowOpacity: 0.1,
                                                        // shadowOpacity: sectionproperties.inputshadowopacity,
                                                        backgroundColor: sectionproperties.input_bgcolor,
                                                    },
                                                ]}
                                            />
                                        </View>
                                    </View>
                                </View>
                            )}
                            <View
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        width: 250,
                                        height: 45,
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.checkout_borderBottomLeftRadius, '', true),
                                        backgroundColor: sectionproperties.checkoutBtnbgColor,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginTop: 10,
                                    }}
                                    onPress={() => {
                                        var payloadobj = {};
                                        // routingcountext(StaticPagesLinksContext.Ordersuccess, { status: 'true', reason: '' });

                                        AddOrderMutationContext.mutate(payloadobj);
                                    }}
                                    disabled={isconfirmorderbuttonloading()}
                                >
                                    {isconfirmorderbuttonloading() && (
                                        <View style={{}}>
                                            <SpinnerButton
                                                buttonStyle={{ width: 30, height: 30 }}
                                                isLoading={true}
                                                indicatorCount={10}
                                                spinnerType={'MaterialIndicator'}
                                                spinnerColor={sectionproperties.checkoutBtnTextcolor}
                                            ></SpinnerButton>
                                        </View>
                                    )}
                                    {!isconfirmorderbuttonloading() && (
                                        <Text
                                            style={{
                                                fontFamily: 'Poppins-Medium',
                                                color: sectionproperties.checkoutBtnTextcolor,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.checkoutBtnTextfontsize),
                                            }}
                                        >
                                            {langdetect == 'en' ? sectionproperties.checkoutbtn_content2en : sectionproperties.checkoutbtn_content2ar}
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            )}
            {fetchcustomercartQueryContext.isLoading && (
                <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 500 }}>
                    <SpinnerButton buttonStyle={{ width: 50, height: 50 }} isLoading={true} indicatorCount={10} spinnerType={'MaterialIndicator'} spinnerColor={'#000'}></SpinnerButton>
                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    generalcard: {
        width: '100%',
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 5,
    },
    generalcardinner: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    iconcont: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
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
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 3,
        elevation: 1,
        borderRadius: 10,
        marginTop: 10,
    },
});

export default Checkout;
