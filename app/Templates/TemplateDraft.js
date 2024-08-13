import React, { useEffect, useState, useContext, useMemo } from 'react';
import { View, Text, ScrollView, RefreshControl, StyleSheet, Pressable, Platform, Dimensions, I18nManager, Modal } from 'react-native';
import { WebsiteDesignWorkPlaceContext } from '../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { FetchingContext } from './FetchingContext/FetchingContext';
import { TemplateRoutingContext } from './TemplateRoutingContext';
import BottomTabs from './TabexComponents/StaticPages/BottomTabs/BottomTabs';
import generalstyles from './TabexComponents/GeneralFiles/Stylesheet/Stylesheet';
import { ProductsCardsSectionContext_Provider } from './TabexComponents/Sections/Cards/ProductsCardsSectionContext';
import { Page_Template_Fetch_API } from '../General_API';
import { useQuery } from 'react-query';
import SpinnerButton from 'react-native-spinner-button';
import { SIZES } from './TabexComponents/GeneralFiles/constants';
import { useIsFocused, useRoute, useNavigation } from '@react-navigation/native';
import { SwipeablePanel } from 'rn-swipeable-panel';
import WebBrowser from './WebBrowser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Iosstatusbar from '../Iosstatusbar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { setpageobj } from '../Slices/ReduxSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LanguageContext } from './LanguageContext/LanguageContext';
import { urlEndpoint1 } from '../config/imagekit1';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useQueryClient } from 'react-query';
const windowHeight = Dimensions.get('window').height;
// const windowHeight = Dimensions.get('window').height;
const MemoItem = React.memo((prevProps, nextProps) => {
    const { TabexSectionsComponentsContext } = useContext(WebsiteDesignWorkPlaceContext);
    // if (prevProps.show === nextProps.show) {
    //   return true;
    // }
    // return false;
    if (prevProps.type == 'normalsection') {
        // console.log(prevProps.sectionobj.sectionproperties);
        return (
            <View style={{ width: '100%' }} key={prevProps.arrayindex}>
                {React.createElement(TabexSectionsComponentsContext[prevProps.sectionobj.tabexsectioninfo.sectioncompname], {
                    sectionidprops: prevProps.sectionobj.sectionid,

                    dynamicformid: prevProps.sectionobj.dynamicformid,
                    sectionpropertiesProps: prevProps.sectionobj.sectionproperties,
                    sectionindexprops: prevProps.arrayindex,
                })}
            </View>
        );
    } else if (prevProps.type == 'cardsection') {
        return (
            <View style={{ width: '100%' }} key={prevProps.arrayindex}>
                <ProductsCardsSectionContext_Provider>
                    {React.createElement(TabexSectionsComponentsContext[prevProps.sectionobj.tabexsectioninfo.sectioncompname], {
                        sectionidprops: prevProps.sectionobj.sectionid,
                        sectionindexprops: prevProps.arrayindex,
                        scrollviewtoend: prevProps.scrollviewtoend,

                        StatePagePropertiesprops: prevProps.StatePageProperties,
                        srcfromprops: prevProps.GeneralProductsCompStaticInfo?.srcfrom,
                        collectionidprops: prevProps.GeneralProductsCompStaticInfo?.collectionid,
                    })}
                </ProductsCardsSectionContext_Provider>
            </View>
        );
    } else if (prevProps.type == 'staticpage') {
        var staticpageinfocomp = prevProps.StatePageProperties.pageobj.tabexstaticpageinfo.pagecomponentname;

        if (staticpageinfocomp == 'GeneralProductsComponent' || staticpageinfocomp == 'InnerCategory' || staticpageinfocomp == 'InnerParentCollection' || staticpageinfocomp == 'Innervendor') {
            staticpageinfocomp = 'GeneralProductsComponent';
        }
        if (staticpageinfocomp == 'VendorPage') {
            staticpageinfocomp = 'GeneralVendorComponent';
        }
        return React.createElement(TabexSectionsComponentsContext[staticpageinfocomp], {
            // StatePageProperties: StatePageProperties,
            StatePagePropertiesprops: prevProps.StatePageProperties,

            scrollviewtoend: prevProps.scrollviewtoend,
        });
    }
});

const TemplateDraft = (props) => {
    const dispatch = useDispatch();
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const navigation = useNavigation();
    const StatePageProperties11 = useSelector((state) => state.page.value);

    const isFocused = useIsFocused();
    const route = useRoute();
    const { langdetect } = useContext(LanguageContext);
    const { routingcountext, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
    const {
        fetch_inst_tabex_websitetemplatesQueryContext,
        TabexSectionsComponentsContext,
        CurrentPageIdContext,
        setCurrentPageIdContext,

        setisScreenLoadedContext,
        ProjectOpenrcTypeContext,
        TemplateIdContext,
        INSTAPIKEYCONTEXT,
        countertemppagesloadingback,
        StyleParseToIntFuncContext,
    } = useContext(WebsiteDesignWorkPlaceContext);
    const {
        SwipPanelObjContext,
        setSwipPanelObjContext,
        UpTopNotificationBarObjContext,
        fetchAuthorizationQueryContext,
        fetchcustomercartQueryContext,
        templateproperties_context,
        settemplateproperties_context,
        canbrowseApplicationContext,
        setcanbrowseApplicationContext,
        registerForPushNotificationsAsyncContext,
        setexpopushtokencontext,
        setVendorsArrgeneralFilterContext,
        VendorsArrgeneralFilterContext,
    } = useContext(FetchingContext);
    const [dd, asdd] = useState('');
    const [asynckeys, setasynckeys] = useState([]);

    const [scrollviewtoend, setscrollviewtoend] = useState(false);
    const [LocalPageid, setLocalPageid] = useState('');
    const [LoadPage, setLoadPage] = useState(false);
    const [GeneralProductsCompStaticInfo, setGeneralProductsCompStaticInfo] = useState(route.params?.genprodcompstinfo);
    const [StatePageProperties, setStatePageProperties] = useState({});
    const PageTemplateFetcherQueryContext = useQuery(
        ['FetchPages_API' + props.pageprops.pageid],
        () =>
            Page_Template_Fetch_API({
                INSTAPIKEYCONTEXT: INSTAPIKEYCONTEXT,
                srctypefrom: ProjectOpenrcTypeContext,
                pageid: props.pageprops.pageid,
                WebAppOrMobApp: 'mobapp',
                templateid: TemplateIdContext,
            }),
        {
            keepPreviousData: true,
            staleTime: Infinity,
            cacheTime: Infinity,

            enabled: LoadPage && props.pageprops.pageid != undefined && props.pageprops.pageid.length != 0 ? (TemplateIdContext.length != 0 ? true : false) : false,
        },
    );
    // useEffect(async () => {
    //     try {
    //         const keys = await AsyncStorage.getAllKeys();
    //         setasynckeys(keys);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }, []);
    useEffect(() => {
        if (Constants?.expoConfig?.extra?.hastrackingpermissions != undefined && Constants?.expoConfig?.extra?.hastrackingpermissions == 'yes') {
            (async () => {
                const { status } = await requestTrackingPermissionsAsync();
                if (status === 'granted') {
                    console.log('Yay! I have user permission to track data');
                }
            })();
        }
        if (Device.isDevice) {
            setexpopushtokencontext('notaccepted');
            registerForPushNotificationsAsyncContext().then((token) => {
                if (token == undefined) {
                    setexpopushtokencontext('notaccepted');
                } else {
                    setexpopushtokencontext(token);
                }
            });
        } else {
            setexpopushtokencontext('simulator-notaccepted');
        }
    }, []);

    useEffect(() => {
        var isforcedtologin = false;
        if (
            StaticPagesLinksContext.Login != undefined &&
            StaticPagesLinksContext.Login != null &&
            fetchAuthorizationQueryContext.isSuccess &&
            fetchAuthorizationQueryContext.data.data.instinfo != undefined &&
            fetchAuthorizationQueryContext.data.data.instinfo.ismobileappmustlogin != undefined
        ) {
            if (fetchAuthorizationQueryContext.data.data.loggedin == true) {
                isforcedtologin = false;
            } else {
                if (fetchAuthorizationQueryContext.data.data?.instinfo?.ismobileappmustlogin == 1) {
                    isforcedtologin = true;
                }
            }
            if (isforcedtologin == true) {
                // signup web,signup mobile,login web, login mobile
                if (
                    props.pageprops.staticpageid != '6218bccb7f4f7' &&
                    props.pageprops.staticpageid != '6249f2af9a886' &&
                    props.pageprops.staticpageid != '6218bccb77283' &&
                    props.pageprops.staticpageid != '62419e7e80f07'
                ) {
                    setcanbrowseApplicationContext(false);
                    navigation.replace(StaticPagesLinksContext.Login);
                }
            } else {
            }
        }
    }, [fetchAuthorizationQueryContext.isSuccess, StaticPagesLinksContext, fetchAuthorizationQueryContext.data]);
    useEffect(() => {
        if (props.pageprops.pageid != null && props.pageprops.pageid != undefined && props?.pageprops?.pageid?.length != 0) {
            setLocalPageid(props.pageprops.pageid);
            setCurrentPageIdContext(props.pageprops.pageid);

            // setisScreenLoadedContext(true);
        }
    }, [props, isFocused, props.pageprops]);
    useEffect(() => {
        if (ProjectOpenrcTypeContext == 'workplace') {
            var pagename = '';
            var pageobj = fetch_inst_tabex_websitetemplatesQueryContext.data.data.template.pages.find((element) => {
                return element.pageid === CurrentPageIdContext;
            });
            if (pageobj != undefined && pageobj != null && Object.keys(pageobj).length != 0) {
                pagename = pageobj.pagename;
            }
            if (pagename.length != 0) {
                routingcountext(pagename);
            }
        }
    }, [CurrentPageIdContext]);
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1000;
    };

    useEffect(() => {
        const fetchData = async () => {
            // if (fetch_inst_tabex_websitetemplatesQueryContext.isSuccess && LocalPageid != undefined && LocalPageid != null && LocalPageid.length != 0) {
            // var pagecacheid = await AsyncStorage.getItem(LocalPageid + 'cacheidpage');
            // if (pagecacheid !== null) {
            // fetch_inst_tabex_websitetemplatesQueryContext.data.data.template.pages.forEach(function (arrayItem, arrayindex) {
            // if (arrayItem.pageid == LocalPageid) {
            // if (pagecacheid == arrayItem.pagecacheid) {
            try {
                AsyncStorage.getItem(LocalPageid).then((pageobj) => {
                    if (pageobj != null) {
                        pageobj = JSON.parse(pageobj);
                        // dispatch(setpageobj(pageobj));
                        // setStatePageProperties(pageobj);
                        // setStatePageProperties({ pageobj: { sections: [] } });
                        setisScreenLoadedContext(true);
                    } else {
                        alert('s');
                        setLoadPage(true);
                    }
                });
            } catch (e) {
                alert('error 2');
                setLoadPage(true);
            }
            // alert('cached');
            // console.log(LocalPageid + props.pageprops.pagename);
            // console.log('cached');
            // } else {
            //     console.log('Not Cached');
            //     // alert('not cached');
            //     setLoadPage(true);
            // }
        };
        // });
        // } else {
        //     setLoadPage(true);
        // }
        // }

        // call the function
        if (LocalPageid != undefined && LocalPageid != null && LocalPageid.length != 0) {
            // fetchData()
            //     // make sure to catch any error
            //     .catch(() => {
            //         alert('error');
            //         // setLoadPage(true);
            //     });
            // dispatch(getPageobjectfromasync(LocalPageid));
            var pagefound = false;
            StatePageProperties11.pages.forEach(function (item, index) {
                if (LocalPageid == item.pageid) {
                    pagefound = true;
                    setStatePageProperties(item.pageobj);
                }
            });

            if (pagefound == false) {
                setLoadPage(true);
            }
            // setCurrentPageIdContext(LocalPageid);

            setisScreenLoadedContext(true);
            // alert('s');
        }

        // setisScreenLoadedContext(true);
        // addpageToDbContext(LocalPageid);
    }, [isFocused, LocalPageid, StatePageProperties11]);
    useEffect(() => {
        if (isFocused) {
            if (PageTemplateFetcherQueryContext.isSuccess) {
                if (PageTemplateFetcherQueryContext.data != undefined) {
                    // storeData();
                    // setStatePageProperties({ ...PageTemplateFetcherQueryContext.data.data });
                    // dispatch(setpageobjasync(pageobj));
                    var resp = PageTemplateFetcherQueryContext.data.data;

                    // alert('cacheid' + resp.pageobj.cacheid);
                    // alert(JSON.stringify(resp.pageobj.sections[0].sectionproperties[2]));

                    if (resp != undefined) {
                        dispatch(setpageobj({ pageid: resp.pageobj.pageid, pageobj: resp, cacheid: resp.cacheid }));

                        setLoadPage(false);
                    }
                }
            }
        }
    }, [PageTemplateFetcherQueryContext.isSuccess, PageTemplateFetcherQueryContext.data, PageTemplateFetcherQueryContext.dataUpdatedAt]);
    useEffect(() => {
        if (fetch_inst_tabex_websitetemplatesQueryContext.data.data.template != undefined && fetch_inst_tabex_websitetemplatesQueryContext.data.data.template.templateproperties != undefined) {
            var secpropobj = {};
            fetch_inst_tabex_websitetemplatesQueryContext.data.data.template.templateproperties.forEach(function (sectionpropertiesobj, sectionpropertiesindex) {
                secpropobj[sectionpropertiesobj.property_css_name] = sectionpropertiesobj.property_value;
            });
            settemplateproperties_context({ ...secpropobj });
        }
    }, [StatePageProperties]);

    const onrefresh = () => {
        if (ProjectOpenrcTypeContext == 'workplace') {
            PageTemplateFetcherQueryContext.refetch();
        }
    };
    // const productFromUseMemo = useMemo(() => {
    const productFromUseMemo = () => {
        if (Object.keys(StatePageProperties).length != 0) {
            if (StatePageProperties.pageobj.isstaticpage == 1) {
                return <MemoItem type={'staticpage'} StatePageProperties={StatePageProperties} scrollviewtoend={scrollviewtoend} />;
            }
            return StatePageProperties?.pageobj?.sections?.map(function (arrayItem, arrayindex) {
                if (arrayItem.componenttype == 'section' && arrayItem.isactive == 1) {
                    var sectionobj = arrayItem;
                    var statepageobjspecified = { pageobj: { sections: [sectionobj] } };

                    if (TabexSectionsComponentsContext[sectionobj.tabexsectioninfo.sectioncompname] !== undefined) {
                        if (sectionobj.tabexsectioninfo.sectiontype == 'Cards') {
                            var rendercardssection = false;
                            // var statepageobjspecified = {};

                            if (StatePageProperties.pageobj.isstaticpage == 1) {
                                if (StatePageProperties.pageobj.staticpageid == '625aeb2b4d2e5') {
                                } else {
                                    rendercardssection = true;
                                }
                            } else {
                                rendercardssection = true;
                            }
                            if (rendercardssection == true) {
                                return (
                                    <MemoItem
                                        scrollviewtoend={scrollviewtoend}
                                        key={arrayindex}
                                        StatePageProperties={StatePageProperties}
                                        // sectionpropertiesProps={arrayItem.sectionproperties}
                                        sectionobj={sectionobj}
                                        arrayindex={arrayindex}
                                        type={'cardsection'}
                                        GeneralProductsCompStaticInfo={GeneralProductsCompStaticInfo}
                                    />
                                );
                            }
                        } else {
                            if (StatePageProperties.pageobj.staticpageid != '625aeb2b4d2e5') {
                                return <MemoItem scrollviewtoend={scrollviewtoend} key={arrayindex} sectionobj={sectionobj} ff={'ddd'} arrayindex={arrayindex} type={'normalsection'} />;
                            }
                        }
                    }
                }
            });
        }
        // });
    };
    const headermemo = useMemo(() => {
        // const headermemo = () => {
        if (Object.keys(StatePageProperties).length != 0) {
            return (
                <View style={{ width: SIZES.width }}>
                    {StatePageProperties.pageobj.sections.map(function (arrayItem, arrayindex) {
                        if (arrayItem.componenttype == 'header' && arrayItem.ispageheadermain == 1 && arrayItem.isactive == 1) {
                            var headerobj = arrayItem;
                            if (TabexSectionsComponentsContext[headerobj.tabexsectioninfo.sectioncompname] !== undefined) {
                                var statepageobjspecified = {};
                                // StatePageProperties.pageobj.sections.forEach(function (statepageobjspecifieditem) {
                                // if (statepageobjspecifieditem.sectionid == headerobj.sectionid) {
                                statepageobjspecified = { pageobj: { sections: [headerobj] } };
                                // }
                                // });

                                return (
                                    <View style={{ width: SIZES.width }}>
                                        {React.createElement(TabexSectionsComponentsContext[headerobj.tabexsectioninfo.sectioncompname], {
                                            sectionidprops: headerobj.sectionid,
                                            // StatePageProperties: statepageobjspecified,
                                            sectionpropertiesProps: arrayItem.sectionproperties,
                                        })}
                                    </View>
                                );
                            }
                        }
                    })}
                </View>
            );
        }
    }, [StatePageProperties]);
    const queryClient = useQueryClient();
    return (
        // F8F8F9
        // <SafeAreaView>
        <View style={[{ width: '100%', height: '100%', paddingTop: 0, backgroundColor: '#f8f8f9' }]}>
            {ProjectOpenrcTypeContext == 'subdomain' && (
                <Iosstatusbar
                    styles={{
                        lightbgcolor: templateproperties_context.statusbarlightbgcolor,
                        darkbgcolor: templateproperties_context.statusbardarkbgcolor,
                    }}
                />
            )}
            {UpTopNotificationBarObjContext.show && (
                <View
                    style={[
                        generalstyles.allcentered,
                        {
                            backgroundColor: UpTopNotificationBarObjContext.color,
                            width: '100%',
                            height: ProjectOpenrcTypeContext == 'subdomain' ? (Platform.OS == 'ios' ? '8%' : '5%') : '5%',
                            paddingTop: ProjectOpenrcTypeContext == 'subdomain' ? (Platform.OS == 'ios' ? 30 : 0) : 0,
                            alignContent: 'center',
                            alignSelf: 'center',
                            position: Platform.OS == 'ios' ? 'absolute' : 'relative',
                            zIndex: 99999,
                        },
                    ]}
                >
                    <Text style={[generalstyles.poppinsMedium, { alignContent: 'center', alignSelf: 'center', textAlignVertical: 'center', textAlign: 'center', color: 'white' }]}>
                        {UpTopNotificationBarObjContext.text}
                    </Text>
                </View>
            )}

            {StatePageProperties != undefined && StatePageProperties != null && Object.keys(StatePageProperties).length == 0 && (
                <View style={[generalstyles.allcentered, { width: '100%', display: 'flex', height: '100%' }]}>
                    <SpinnerButton buttonStyle={{ width: 50, height: 50 }} isLoading={true} indicatorCount={10} spinnerType={'MaterialIndicator'} spinnerColor={'#ccc'}></SpinnerButton>
                </View>
            )}
            <View
                style={{
                    height: '100%',
                    width: SIZES.width,
                    backgroundColor: templateproperties_context.template_backgroundcolor == null ? '#f8f8f9' : templateproperties_context.template_backgroundcolor,
                }}
            >
                {/*  */}
                {fetch_inst_tabex_websitetemplatesQueryContext.isSuccess && fetch_inst_tabex_websitetemplatesQueryContext.data.data.status && Object.keys(StatePageProperties).length != 0 && (
                    <View
                        style={{
                            width: SIZES.width,
                            borderLeftWidth: StyleParseToIntFuncContext(templateproperties_context.templateborderhorizontalwidth),
                            borderRightWidth: StyleParseToIntFuncContext(templateproperties_context.templateborderhorizontalwidth),
                            borderColor: templateproperties_context.templatebordercolor,
                        }}
                    >
                        <View style={{ width: SIZES.width }}>{headermemo}</View>
                        {VendorsArrgeneralFilterContext?.length != 0 && templateproperties_context.showvendormodewarning == 'Show' && (
                            <TouchableOpacity
                                onPress={() => {
                                    setVendorsArrgeneralFilterContext([]);
                                }}
                            >
                                <Text>Close View Vendor</Text>
                            </TouchableOpacity>
                        )}
                        {/* {StatePageProperties.pageobj.staticpageid != '62431b31f0865' && ( */}
                        <ScrollView
                            // 200
                            contentContainerStyle={{ paddingBottom: 200 }}
                            refreshControl={<>{ProjectOpenrcTypeContext == 'workplace' && <RefreshControl refreshing={PageTemplateFetcherQueryContext.isFetching} onRefresh={onrefresh} />}</>}
                            onScroll={({ nativeEvent }) => {
                                if (isCloseToBottom(nativeEvent)) {
                                    if (scrollviewtoend == false) {
                                        setscrollviewtoend(true);
                                        console.log('end');
                                    }
                                } else {
                                    if (scrollviewtoend == true) {
                                        setscrollviewtoend(false);
                                        console.log('notend');
                                    }
                                }
                            }}
                            scrollEventThrottle={400}
                        >
                            {Object.keys(StatePageProperties).length != 0 && (
                                <View style={{ width: SIZES.width, height: '100%' }}>
                                    <View style={{ width: SIZES.width }}>{productFromUseMemo()}</View>
                                </View>
                            )}
                        </ScrollView>
                        {/* )} */}
                        {/* {StatePageProperties.pageobj.staticpageid == '62431b31f0865' && Object.keys(StatePageProperties).length != 0 && (
                            <View style={{ width: SIZES.width, height: '100%' }}>{productFromUseMemo()}</View>
                        )} */}
                    </View>
                )}

                {fetch_inst_tabex_websitetemplatesQueryContext.isSuccess && !fetch_inst_tabex_websitetemplatesQueryContext.data.data.status && (
                    <View>
                        <Text>Error Found</Text>
                    </View>
                )}
            </View>
            {/* )} */}
            {/* <SwipeablePanel
                style={{ flex: 1 }}
                {...{
                    fullWidth: true,
                    openLarge: true,
                    showCloseButton: true,
                    noBackgroundOpacity: false,

                    // smallPanelHeight: '100%',
                    onClose: () => {
                        var temmpSwipPanelObjContext = { ...SwipPanelObjContext };
                        temmpSwipPanelObjContext.open = false;
                        setSwipPanelObjContext({ ...temmpSwipPanelObjContext });
                    },
                    onPressCloseButton: () => {
                        var temmpSwipPanelObjContext = { ...SwipPanelObjContext };
                        temmpSwipPanelObjContext.open = false;
                        setSwipPanelObjContext({ ...temmpSwipPanelObjContext });
                    },
                    // scrollViewProps: {
                    //     style: { height: SIZES.height, flex: 1 },
                    // },
                }}
                isActive={SwipPanelObjContext.open}
                showCloseButton={false}
            >
                {SwipPanelObjContext.type == 'webbrowser' && <WebBrowser />}
            </SwipeablePanel> */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={SwipPanelObjContext.open}
                onRequestClose={() => {
                    var temmpSwipPanelObjContext = { ...SwipPanelObjContext };
                    temmpSwipPanelObjContext.open = false;
                    setSwipPanelObjContext({ ...temmpSwipPanelObjContext });
                }}
            >
                <View style={Modalstyles.centeredView}>
                    <View style={Modalstyles.modalView}>
                        <Pressable
                            style={[Modalstyles.button, Modalstyles.buttonClose, { backgroundColor: 'black' }]}
                            onPress={() => {
                                var temmpSwipPanelObjContext = { ...SwipPanelObjContext };
                                temmpSwipPanelObjContext.open = false;
                                setSwipPanelObjContext({ ...temmpSwipPanelObjContext });
                            }}
                        >
                            <Text style={Modalstyles.textStyle}>{langdetect == 'en' ? 'Close' : 'اغلاق'}</Text>
                        </Pressable>
                        {SwipPanelObjContext.type == 'webbrowser' && <WebBrowser />}
                    </View>
                </View>
            </Modal>
        </View>
        // </SafeAreaView>
    );
};

export default TemplateDraft;
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
