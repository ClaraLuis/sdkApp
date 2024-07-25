import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, Platform, FlatList, I18nManager, ScrollView } from 'react-native';
import { WebsiteDesignWorkPlaceContext } from './WebsiteDesignWorkPlaceContext';
import { FetchingContext_provider } from '../Templates/FetchingContext/FetchingContext';
import { TemplateRoutingContext_Provider } from '../Templates/TemplateRoutingContext';
import TemplateDraftRouter from '../Templates/TemplateDraftRouter';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, get, child, set, off, remove } from 'firebase/database';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import generalstyles from '../Templates/TabexComponents/GeneralFiles/Stylesheet/Stylesheet';
import { icons, images, SIZES, COLORS, FONTS } from '../Templates/TabexComponents/GeneralFiles/constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { LanguageContext } from '../Templates/LanguageContext/LanguageContext';
import { Page_Template_Fetch_API, fetchGuestTabexTemplates_API } from '../General_API';
import Iosstatusbar from '../Iosstatusbar';
import ApplicationUpdates from '../ApplicationUpdates';
import { serverbaselink } from '../Env_Variables';
import { useDispatch, useSelector } from 'react-redux';
import { setpageobj } from '../Slices/ReduxSlice';

const WebsiteDesignWorkPlaceRouter = (props) => {
    const dispatch = useDispatch();
    const { lang, langdetect } = useContext(LanguageContext);
    const queryClient = useQueryClient();
    const {
        fetch_inst_tabex_websitetemplatesQueryContext,
        TemplateIdContext,
        setTemplateIdContext,
        setCurrentPageIdContext,
        CurrentPageIdContext,
        ProjectOpenrcTypeContext,
        INSTAPIKEYCONTEXT,
        setINSTAPIKEYCONTEXT,
    } = React.useContext(WebsiteDesignWorkPlaceContext);
    const [connectionnumberinput, setconnectionnumberinput] = useState('');
    const [linkurl, setlinkurl] = useState('');
    const [adminmode, setadminmode] = useState(false);
    const [connectiondetailsobj, setconnectiondetailsobj] = useState('');
    const [connectionrequestnumber, setconnectionrequestnumber] = useState(Math.floor(100000 + Math.random() * 900000));
    const [newobj, setnewobj] = useState('');
    const [FireBaseConnectionObject, setFireBaseConnectionObject] = useState('');
    const fetchGuestTabexTemplatesQuery = useQuery(['fetchGuestTabexTemplates_API'], () => fetchGuestTabexTemplates_API({ WebAppOrMobApp: 'mobapp' }), {
        keepPreviousData: true,
        staleTime: Infinity,
    });
    const PageTemplateFetcherQueryContext = useQuery(
        ['FetchPages_API' + CurrentPageIdContext],
        () =>
            Page_Template_Fetch_API({
                INSTAPIKEYCONTEXT: INSTAPIKEYCONTEXT,
                srctypefrom: ProjectOpenrcTypeContext,
                pageid: CurrentPageIdContext,
                WebAppOrMobApp: 'mobapp',
                templateid: TemplateIdContext,
            }),
        {
            keepPreviousData: true,
            staleTime: Infinity,

            enabled: CurrentPageIdContext.length != 0 ? (ProjectOpenrcTypeContext == 'subdomain' ? true : TemplateIdContext.length != 0 ? true : false) : false,
        },
    );

    const FireBaseapp = initializeApp({
        apiKey: 'AIzaSyBN2-Yozx3lcDMcjrQVrQPZbbt-u1GufQA',
        authDomain: 'tabex-series.firebaseapp.com',
        projectId: 'tabex-series',
        storageBucket: 'tabex-series.appspot.com',
        messagingSenderId: '208558048774',
        appId: '1:208558048774:web:1c4ed1db07c8d0243da587',
        measurementId: 'G-VYY6T20JWE',
    });
    const Firebasedb = getDatabase(FireBaseapp);
    const connectionfoundsendingrequest = (connectiondetails) => {
        if (connectiondetails != undefined) {
            setconnectiondetailsobj(connectiondetails);
            set(ref(Firebasedb, 'users/' + connectiondetails.userid + '/devices/' + connectionrequestnumber), {
                requestnumber: connectionrequestnumber,
                requestaccepted: 0,
            });
            const starCountRef = ref(Firebasedb, 'users/' + connectiondetails.userid + '/devices/' + connectionrequestnumber);
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                setFireBaseConnectionObject({ ...data });
            });
        }
    };
    useEffect(() => {
        if (FireBaseConnectionObject != undefined && FireBaseConnectionObject != null && FireBaseConnectionObject.length != 0) {
            const TemplateHookListener = ref(Firebasedb, 'users/' + connectiondetailsobj.userid + '/templateinfo');
            if (FireBaseConnectionObject.requestaccepted == 1) {
                onValue(TemplateHookListener, (snapshotTemplat) => {
                    var tempdata = snapshotTemplat.val();
                    if (tempdata != undefined && tempdata.templateid != undefined) {
                        setTemplateIdContext(tempdata.templateid);

                        setINSTAPIKEYCONTEXT(tempdata.INSTAPIKEY);
                        if (tempdata.currentpageid != undefined && tempdata.currentpageid != null && tempdata.currentpageid.length != 0) {
                            setCurrentPageIdContext(tempdata.currentpageid);
                        }
                        setnewobj({ ...tempdata });
                    }
                });
            } else {
                off(TemplateHookListener);
                setTemplateIdContext('');
            }
        }
    }, [FireBaseConnectionObject]);
    useEffect(() => {
        // var ss = Linking.createURL();
        // setlinkurl(ss);
        I18nManager.forceRTL(false);
    }, []);
    useEffect(() => {
        temprealtimeupdaterproperties(newobj.type, newobj.sectionindex, newobj.propertyindex, newobj.newpropertyvalue, newobj.currentpageid);
    }, [newobj, PageTemplateFetcherQueryContext.isSuccess]);

    const temprealtimeupdaterproperties = (type, sectionindex, propertyindex, newpropertyvalue, currentpageid) => {
        if (type == 'section' || type == 'page') {
            var PageSectionPropertiesTemp = queryClient.getQueryData('FetchPages_API' + currentpageid);
            var newVariable = {};
            if (PageSectionPropertiesTemp != undefined && PageSectionPropertiesTemp.data != undefined && PageSectionPropertiesTemp.data.pageobj != undefined) {
                Object.assign(newVariable, JSON.parse(JSON.stringify(PageSectionPropertiesTemp)));

                if (
                    type == 'section' &&
                    PageSectionPropertiesTemp.data.pageobj.sections[sectionindex] != undefined &&
                    PageSectionPropertiesTemp.data.pageobj.sections[sectionindex].sectionproperties != undefined
                ) {
                    if (
                        PageSectionPropertiesTemp.data.pageobj.sections[sectionindex].sectionproperties[propertyindex] != undefined &&
                        PageSectionPropertiesTemp.data.pageobj.sections[sectionindex].sectionproperties[propertyindex].property_value != undefined
                    ) {
                        newVariable.data.pageobj.sections[sectionindex].sectionproperties[propertyindex].property_value = newpropertyvalue;
                        // alert(newVariable.data.pageobj['sections'][sectionindex]['sectionproperties'][propertyindex]['property_value']);
                    }
                } else if (type == 'page' && PageSectionPropertiesTemp.data.pageobj.pageproperties != undefined) {
                    newVariable.data.pageobj.pageproperties[propertyindex].property_value = newpropertyvalue;
                }
            }
            if (Object.keys(newVariable).length != 0) {
                // alert(newVariable.data.pageobj.pageid);
                dispatch(
                    setpageobj({
                        pageid: newVariable.data.pageobj.pageid,
                        pageobj: newVariable.data,
                        cacheid: newVariable.data.cacheid,
                    }),
                );
            }

            queryClient.setQueryData('FetchPages_API' + currentpageid, newVariable);
        } else if (type == 'template') {
            var TemplatePropertiesTemp = queryClient.getQueryData('fetch_template_items_API' + TemplateIdContext);
            if (TemplatePropertiesTemp != undefined && TemplatePropertiesTemp.data.template != undefined && TemplatePropertiesTemp.data.template.templateproperties != undefined) {
                TemplatePropertiesTemp.data.template.templateproperties[propertyindex].property_value = newpropertyvalue;
                // queryClient.setQueryData('fetch_template_items_API' + TemplateIdContext, TemplatePropertiesTemp);
            }
        }
    };

    useEffect(() => {
        if (Object.keys(connectiondetailsobj).length != 0) {
            if (CurrentPageIdContext.length != 0) {
                // set(ref(Firebasedb, 'users/' + connectiondetailsobj.userid + '/templateinfo'), {
                // templateid: TemplateIdContext,
                // currentpageid: CurrentPageIdContext,
                // });
            }
        }
    }, [CurrentPageIdContext, connectiondetailsobj]);
    return (
        // SIZES.height
        <View style={{ width: '100%', height: '100%' }}>
            <ApplicationUpdates institute="tabex" />
            <Iosstatusbar />
            {TemplateIdContext.length == 0 && (
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }} scrollEnabled={TemplateIdContext.length == 0 ? true : false}>
                    <View style={{ paddingBottom: 0, backgroundColor: 'white' }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', paddingLeft: 10, paddingRight: 10 }}>
                            <View style={[generalstyles.flexRow, generalstyles.allcentered, styles.logoContainer, { marginTop: 0 }]}>
                                <Image source={images.tabexlogo} resizeMode="contain" style={styles.logoImg} />
                            </View>
                            <View style={[generalstyles.allcentered, { marginTop: 0, paddingVertical: Platform.OS === 'ios' ? 10 : 0, width: '100%' }]}>
                                <Text style={[generalstyles.poppinsMedium, { color: COLORS.info, fontSize: 25, letterSpacing: 1 }]}>Create it with </Text>
                                <Text style={[generalstyles.poppinsMedium, { color: COLORS.info, fontSize: 26, letterSpacing: 1 }]}>the creativity of </Text>
                                <Text style={[{ color: COLORS.secondary, fontSize: 26, letterSpacing: 1, fontFamily: 'Poppins-SemiBoldItalic' }]}>your own</Text>
                            </View>
                            {/* <Text>V1.0 {linkurl}</Text> */}
                        </View>
                        <View
                            style={{
                                paddingLeft: 15,
                                paddingRight: 15,
                                height: '100%',
                            }}
                        >
                            {TemplateIdContext.length == 0 && (
                                <View style={{ marginTop: 20 }}>
                                    <View style={[generalstyles.flexRow, generalstyles.allcentered]}>
                                        <Text
                                            style={[
                                                {
                                                    color: COLORS.primary,
                                                    textTransform: 'capitalize',
                                                    fontSize: Platform.OS === 'ios' ? 20 : 17,
                                                    marginEnd: 5,
                                                    fontFamily: 'Poppins-Regular',
                                                },
                                            ]}
                                        >
                                            {lang.devicenumber}:
                                        </Text>
                                        <Text
                                            style={[
                                                {
                                                    color: COLORS.secondary,
                                                    textTransform: 'capitalize',
                                                    fontSize: Platform.OS === 'ios' ? 20 : 17,
                                                    fontFamily: 'Poppins-Regular',
                                                },
                                            ]}
                                        >
                                            {connectionrequestnumber}
                                        </Text>
                                    </View>
                                    <View
                                        style={[
                                            generalstyles.searchtextInput,
                                            { width: '100%', marginBottom: 10, borderRadius: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', marginTop: Platform.OS === 'ios' ? 20 : 0 },
                                        ]}
                                    >
                                        <TextInput
                                            underlineColorAndroid="transparent"
                                            keyboardType="numeric"
                                            placeholder="Write Connection Number"
                                            placeholderTextColor={'#bfbfbf'}
                                            onChangeText={(text) => {
                                                setconnectionnumberinput(text);
                                            }}
                                            style={[generalstyles.poppinsLight, { fontSize: 20, width: '100%', letterSpacing: 2 }]}
                                        />
                                    </View>
                                    {FireBaseConnectionObject != undefined && FireBaseConnectionObject != null && (
                                        <View style={[generalstyles.flexRow, { justifyContent: 'flex-start', marginBottom: Platform.OS === 'ios' ? 30 : 15 }]}>
                                            {FireBaseConnectionObject.requestaccepted == 1 ? (
                                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                    <View
                                                        style={{
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: 100,
                                                            backgroundColor: COLORS.success,
                                                            marginEnd: 5,
                                                        }}
                                                    ></View>
                                                    <Text
                                                        style={{
                                                            fontSize: 13,
                                                            color: COLORS.success,
                                                            fontFamily: 'Poppins-Medium',
                                                        }}
                                                    >
                                                        <Feather name="check-circle" size={15} style={{ marginEnd: 10 }} /> Connected Successfully
                                                    </Text>
                                                </View>
                                            ) : FireBaseConnectionObject.requestaccepted == 0 ? (
                                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                    <View
                                                        style={{
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: 100,
                                                            backgroundColor: 'orange',
                                                            marginEnd: 5,
                                                        }}
                                                    ></View>
                                                    <Text
                                                        style={{
                                                            fontSize: 13,
                                                            color: 'orange',
                                                            fontFamily: 'Poppins-Medium',
                                                        }}
                                                    >
                                                        <FontAwesome name="spinner" size={13} style={{ marginEnd: 10 }} /> Pending
                                                    </Text>
                                                </View>
                                            ) : (
                                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                    <View
                                                        style={{
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: 100,
                                                            backgroundColor: COLORS.danger,
                                                            marginEnd: 5,
                                                        }}
                                                    ></View>
                                                    <Text
                                                        style={{
                                                            fontSize: 13,
                                                            color: COLORS.danger,
                                                            fontFamily: 'Poppins-Medium',
                                                        }}
                                                    >
                                                        No Connection Requested
                                                    </Text>
                                                </View>
                                            )}
                                        </View>
                                    )}
                                    <View style={[generalstyles.flexRow, { marginTop: 10, justifyContent: 'center' }]}>
                                        <TouchableOpacity
                                            style={{
                                                width: SIZES.width - 60,
                                                height: Platform.OS === 'ios' ? 50 : 45,
                                                borderRadius: 10,
                                                backgroundColor: COLORS.primary,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                            onPress={() => {
                                                if (connectionnumberinput.length != 0) {
                                                    const dbRef = ref(Firebasedb);
                                                    get(child(dbRef, `users/` + connectionnumberinput))
                                                        .then((snapshot) => {
                                                            if (snapshot.exists()) {
                                                                var data = snapshot.val();

                                                                connectionfoundsendingrequest(data);
                                                            } else {
                                                                alert('Connection Not Found');
                                                            }
                                                        })
                                                        .catch((error) => {
                                                            alert('Error In Connection');
                                                        });
                                                }
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    ...FONTS.p,
                                                    color: 'white',
                                                    textTransform: 'uppercase',
                                                    lineHeight: 18,
                                                    fontFamily: 'Poppins-Light',
                                                    letterSpacing: 2,
                                                }}
                                            >
                                                Connect
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[generalstyles.allcentered, generalstyles.flexRow, { marginTop: 20 }]}>
                                        <View style={{ flex: 1, height: 1, backgroundColor: COLORS.info, opacity: 0.2 }} />
                                        <Text style={[generalstyles.poppinsMedium, { fontSize: 16, fontFamily: 'Poppins-Medium', marginHorizontal: 5, color: COLORS.info }]}>
                                            Tabex Series templates
                                        </Text>
                                        <View style={{ flex: 1, height: 1, backgroundColor: COLORS.info, opacity: 0.2 }} />
                                    </View>
                                    <View style={{ width: '100%' }}>
                                        <FlatList
                                            data={fetchGuestTabexTemplatesQuery?.data?.data?.tabextemplates}
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            keyExtractor={(item, index) => index}
                                            onEndReachedThreshold={0.3}
                                            renderItem={(data123, index) => {
                                                return (
                                                    <TouchableOpacity
                                                        style={[
                                                            generalstyles.allcentered,
                                                            { marginBottom: 20, width: 200, height: Platform.OS === 'ios' ? 245 : 240, marginTop: Platform.OS === 'ios' ? 50 : 40 },
                                                        ]}
                                                        onPress={() => {
                                                            setTemplateIdContext(data123.item.templateid);
                                                        }}
                                                    >
                                                        <Image
                                                            source={{
                                                                uri: serverbaselink + data123.item.templatepreviewurl,
                                                            }}
                                                            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                                                        />
                                                        <Text style={[generalstyles.poppinsMedium, { marginTop: 10, color: COLORS.primary }]}>{data123.item.templatename}</Text>
                                                        <Text style={[generalstyles.poppinsMedium, { color: COLORS.light, textDecorationLine: 'underline' }]}>Click to view</Text>
                                                    </TouchableOpacity>
                                                );
                                            }}
                                        />
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                </ScrollView>
            )}
            {TemplateIdContext.length != 0 && (
                <View style={{ width: '100%', height: '100%', flex: 1 }}>
                    <TemplateRoutingContext_Provider>
                        <FetchingContext_provider>
                            <TemplateDraftRouter {...props} />
                        </FetchingContext_provider>
                    </TemplateRoutingContext_Provider>
                </View>
            )}
            {/* {TemplateIdContext.length != 0 && adminmode == false && (
                <View style={[generalstyles.flexRow, { alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: Platform.OS === 'ios' ? 65 : 35 }]}>
                    <View style={{ flex: 1 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', height: 50, width: 150, paddingLeft: 10 }}>
                            <Image source={images.tabexlogo} resizeMode="contain" style={{ height: '100%', width: '100%' }} />
                        </View>
                    </View>
                    <View style={{ alignItems: 'flex-end', flex: 1, right: 10, justifyContent: 'flex-end' }}>
                        <TouchableOpacity
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: 'auto',
                            }}
                            onPress={() => {
                                const TemplateHookListener = ref(Firebasedb, 'users/' + connectiondetailsobj.userid + '/templateinfo');
                                off(TemplateHookListener);
                                setTemplateIdContext('');
                                remove(ref(Firebasedb, 'users/' + connectiondetailsobj.userid + '/devices/' + connectionrequestnumber));
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.p,
                                    color: COLORS.danger,
                                    textTransform: 'uppercase',
                                    lineHeight: 20,
                                    fontSize: 12,
                                    textDecorationLine: 'underline',
                                }}
                            >
                                Back
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: 'auto',
                            }}
                            onPress={() => {
                                setadminmode(true);
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.p,
                                    color: COLORS.danger,
                                    textTransform: 'uppercase',
                                    lineHeight: 20,
                                    fontSize: 12,
                                    textDecorationLine: 'underline',
                                }}
                            >
                                Admin mode
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )} */}
        </View>
    );
};

export default WebsiteDesignWorkPlaceRouter;
const styles = StyleSheet.create({
    logoContainer: {
        width: Platform.OS === 'ios' ? 250 : 200,
        height: Platform.OS === 'ios' ? 70 : 60,
    },
    logoImg: {
        width: Platform.OS === 'ios' ? 250 : 200,
        height: Platform.OS === 'ios' ? 70 : 60,
    },
    triangle: {
        position: 'absolute',
        left: 30,
        bottom: 20,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 50,
        borderRightWidth: 50,
        borderBottomWidth: 50,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: COLORS.primary,
    },
    triangle1: {
        position: 'absolute',
        left: 140,
        bottom: 20,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#eac435',
        transform: [{ rotate: '315deg' }],
    },
    triangle2: {
        position: 'absolute',
        left: 150,
        bottom: 30,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#eac435',
        transform: [{ rotate: '315deg' }],
    },
    triangle3: {
        position: 'absolute',
        left: 50,
        bottom: 50,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 70,
        borderRightWidth: 70,
        borderBottomWidth: 70,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: COLORS.primary,
        transform: [{ rotate: '180deg' }],
    },
    triangle4: {
        position: 'absolute',
        left: 170,
        bottom: 10,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 60,
        borderRightWidth: 60,
        borderBottomWidth: 60,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#022648',
        transform: [{ rotate: '45deg' }],
    },
    triangle5: {
        position: 'absolute',
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 50,
        borderRightWidth: 50,
        borderBottomWidth: 50,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: COLORS.secondary,
        transform: [{ rotate: '-270deg' }],
    },
    circle: {
        position: 'absolute',
        left: 200,
        bottom: 80,
        width: 50,
        height: 50,
        borderRadius: 100 / 2,
        backgroundColor: COLORS.secondary,
    },
    square: {
        position: 'absolute',
        left: 260,
        bottom: 35,
        width: 80,
        height: 80,
        backgroundColor: '#eac435',
    },
    circle1: {
        position: 'absolute',
        left: 310,
        bottom: 80,
        width: 70,
        height: 70,
        borderRadius: 100 / 2,
        backgroundColor: '#022648',
    },
});
