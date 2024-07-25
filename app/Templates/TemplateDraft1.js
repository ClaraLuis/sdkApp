import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, RefreshControl, Platform, Dimensions } from 'react-native';
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
import { useIsFocused, useRoute } from '@react-navigation/native';
import { SwipeablePanel } from 'rn-swipeable-panel';
import WebBrowser from './WebBrowser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Iosstatusbar from '../Iosstatusbar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
const windowHeight = Dimensions.get('window').height;

const TemplateDraft = (props) => {
    const isFocused = useIsFocused();
    const route = useRoute();
    const { routingcountext } = useContext(TemplateRoutingContext);
    const {
        fetch_inst_tabex_websitetemplatesQueryContext,
        TabexSectionsComponentsContext,
        CurrentPageIdContext,
        setisScreenLoadedContext,
        ProjectOpenrcTypeContext,
        TemplateIdContext,
        INSTAPIKEYCONTEXT,
    } = useContext(WebsiteDesignWorkPlaceContext);
    const {
        SwipPanelObjContext,
        setSwipPanelObjContext,
        UpTopNotificationBarObjContext,
        fetchAuthorizationQueryContext,
        fetchcustomercartQueryContext,
        templateproperties_context,
        settemplateproperties_context,
    } = useContext(FetchingContext);
    const [dd, asdd] = useState('');
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

            enabled:
                LoadPage && props.pageprops.pageid != undefined && props.pageprops.pageid.length != 0
                    ? ProjectOpenrcTypeContext == 'subdomain'
                        ? true
                        : TemplateIdContext.length != 0
                        ? true
                        : false
                    : false,
        },
    );
    useEffect(() => {
        if (props.pageprops.pageid != null && props.pageprops.pageid != undefined && props?.pageprops?.pageid?.length != 0) {
            setLocalPageid(props.pageprops.pageid);
            setisScreenLoadedContext(true);
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

    useEffect(() => {
        const fetchData = async () => {
            if (fetch_inst_tabex_websitetemplatesQueryContext.isSuccess && LocalPageid != undefined && LocalPageid != null && LocalPageid.length != 0) {
                var pagecacheid = await AsyncStorage.getItem(LocalPageid + 'cacheidpage');
                if (pagecacheid !== null) {
                    fetch_inst_tabex_websitetemplatesQueryContext.data.data.template.pages.forEach(function (arrayItem, arrayindex) {
                        if (arrayItem.pageid == LocalPageid) {
                            if (pagecacheid == arrayItem.pagecacheid) {
                                try {
                                    AsyncStorage.getItem(LocalPageid + 'page').then((pageobj) => {
                                        if (pageobj != null) {
                                            pageobj = JSON.parse(pageobj);
                                            setStatePageProperties({ ...pageobj });
                                        } else {
                                            setLoadPage(true);
                                        }
                                    });
                                } catch (e) {
                                    alert('error 2');
                                    setLoadPage(true);
                                }
                                // alert('cached');
                                console.log(LocalPageid + props.pageprops.pagename);
                                console.log('cached');
                            } else {
                                console.log('Not Cached');
                                // alert('not cached');
                                setLoadPage(true);
                            }
                        }
                    });
                } else {
                    setLoadPage(true);
                }
            }
        };

        // call the function
        fetchData()
            // make sure to catch any error
            .catch(() => {
                alert('error');
                setLoadPage(true);
            });

        setisScreenLoadedContext(true);
    }, [isFocused, LocalPageid]);
    useEffect(() => {
        if (isFocused) {
            if (PageTemplateFetcherQueryContext.isSuccess) {
                if (PageTemplateFetcherQueryContext.data != undefined) {
                    storeData();
                    setStatePageProperties({ ...PageTemplateFetcherQueryContext.data.data });
                    setLoadPage(false);
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
    const storeData = async () => {
        try {
            await AsyncStorage.setItem(LocalPageid + 'page', JSON.stringify(PageTemplateFetcherQueryContext.data.data));
            await AsyncStorage.setItem(LocalPageid + 'cacheidpage', PageTemplateFetcherQueryContext.data.data.cacheid);
        } catch (e) {
            AsyncStorage.clear();
        }
    };
    const onrefresh = () => {
        if (ProjectOpenrcTypeContext == 'workplace') {
            PageTemplateFetcherQueryContext.refetch();
        }
    };
    return (
        // F8F8F9
        // <SafeAreaView>
        <View style={[{ width: '100%', height: '100%', paddingTop: 0, backgroundColor: '#f8f8f9' }]}>
            {ProjectOpenrcTypeContext == 'subdomain' && <Iosstatusbar />}
            {UpTopNotificationBarObjContext.show && (
                <View
                    style={[
                        generalstyles.allcentered,
                        {
                            backgroundColor: UpTopNotificationBarObjContext.color,
                            width: '100%',
                            height: Platform.OS == 'ios' ? '8%' : '5%',
                            paddingTop: Platform.OS == 'ios' ? 20 : 0,
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
            {Object.keys(StatePageProperties).length == 0 && (
                <View style={[generalstyles.allcentered, { width: '100%', display: 'flex', height: '100%' }]}>
                    <SpinnerButton buttonStyle={{ width: 50, height: 50 }} isLoading={true} indicatorCount={10} spinnerType={'MaterialIndicator'} spinnerColor={'#ccc'}></SpinnerButton>
                </View>
            )}
            {fetchAuthorizationQueryContext.isSuccess && fetchcustomercartQueryContext.isSuccess && (
                <View style={{ height: '100%', width: SIZES.width, backgroundColor: '#f8f8f9' }}>
                    {/* templateproperties_context.template_backgroundcolor */}
                    {fetch_inst_tabex_websitetemplatesQueryContext.isSuccess && fetch_inst_tabex_websitetemplatesQueryContext.data.data.status && Object.keys(StatePageProperties).length != 0 && (
                        <View
                            style={{ width: SIZES.width, height: SIZES.width > 768 ? SIZES.height - 40 : Platform.OS === 'ios' ? SIZES.height - 115 : SIZES.height - 50, backgroundColor: '#f8f8f9' }}
                        >
                            {/* Platform.OS === 'ios' ? SIZES.height - 85 : SIZES.height - 95 */}
                            {Object.keys(StatePageProperties).length != 0 && (
                                <View style={{ width: SIZES.width }}>
                                    {StatePageProperties.pageobj.sections.map(function (arrayItem, arrayindex) {
                                        if (arrayItem.componenttype == 'header' && arrayItem.ispageheadermain == 1 && arrayItem.isactive == 1) {
                                            var headerobj = arrayItem;
                                            if (TabexSectionsComponentsContext[headerobj.tabexsectioninfo.sectioncompname] !== undefined) {
                                                return (
                                                    <View style={{ width: SIZES.width }}>
                                                        {React.createElement(TabexSectionsComponentsContext[headerobj.tabexsectioninfo.sectioncompname], {
                                                            sectionidprops: headerobj.sectionid,
                                                            StatePageProperties: StatePageProperties,
                                                        })}
                                                    </View>
                                                );
                                            }
                                        }
                                    })}
                                </View>
                            )}
                            <ScrollView
                                contentContainerStyle={{ paddingBottom: 60 }}
                                refreshControl={<>{ProjectOpenrcTypeContext == 'workplace' && <RefreshControl refreshing={PageTemplateFetcherQueryContext.isFetching} onRefresh={onrefresh} />}</>}
                            >
                                {Object.keys(StatePageProperties).length != 0 && (
                                    <View style={{ width: SIZES.width, height: '100%' }}>
                                        {StatePageProperties.pageobj.isstaticpage == 1 &&
                                            StatePageProperties.pageobj.tabexstaticpageinfo != null &&
                                            TabexSectionsComponentsContext[StatePageProperties.pageobj.tabexstaticpageinfo.pagecomponentname] !== undefined && (
                                                <View style={{ width: SIZES.width }}>
                                                    {React.createElement(TabexSectionsComponentsContext[StatePageProperties.pageobj.tabexstaticpageinfo.pagecomponentname], {
                                                        StatePageProperties: StatePageProperties,
                                                    })}
                                                </View>
                                            )}
                                        <View style={{ width: SIZES.width }}>
                                            {StatePageProperties.pageobj.sections.map(function (arrayItem, arrayindex) {
                                                if (arrayItem.componenttype == 'section' && arrayItem.isactive == 1) {
                                                    var sectionobj = arrayItem;

                                                    if (TabexSectionsComponentsContext[sectionobj.tabexsectioninfo.sectioncompname] !== undefined) {
                                                        if (sectionobj.tabexsectioninfo.sectiontype == 'Cards') {
                                                            var rendercardssection = false;
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
                                                                    <View style={{ width: '100%' }}>
                                                                        <ProductsCardsSectionContext_Provider>
                                                                            {React.createElement(TabexSectionsComponentsContext[sectionobj.tabexsectioninfo.sectioncompname], {
                                                                                sectionidprops: arrayItem.sectionid,
                                                                                sectionindexprops: arrayindex,
                                                                                StatePageProperties: StatePageProperties,
                                                                                srcfromprops: GeneralProductsCompStaticInfo?.srcfrom,
                                                                                collectionidprops: GeneralProductsCompStaticInfo?.collectionid,
                                                                            })}
                                                                        </ProductsCardsSectionContext_Provider>
                                                                    </View>
                                                                );
                                                            }
                                                        } else {
                                                            return (
                                                                <View style={{ width: '100%' }}>
                                                                    {React.createElement(TabexSectionsComponentsContext[sectionobj.tabexsectioninfo.sectioncompname], {
                                                                        sectionidprops: sectionobj.sectionid,
                                                                        StatePageProperties: StatePageProperties,
                                                                    })}
                                                                </View>
                                                            );
                                                        }
                                                    }
                                                }
                                            })}
                                        </View>
                                    </View>
                                )}
                            </ScrollView>
                        </View>
                    )}
                    {templateproperties_context.show_hide_bottomnav == 'Show' && (
                        <View
                            style={{
                                width: '100%',
                                // position: 'absolute',
                                // bottom: SIZES.width > 1024 ? 40 : SIZES.width > 768 ? 35 : 0,
                                // bottom: SIZES.width > 1024 ? 40 : SIZES.width > 768 ? 40 : ProjectOpenrcTypeContext == 'subdomain' ? (Platform.OS === 'ios' ? 20 : -15) : -10,

                                // height: Platform.OS === 'ios' ? 40 : 95,
                                borderTopWidth: 1,
                                borderTopColor: 'transparent',
                                // width: '100%',
                                // height: '90%',
                                // bottom: windowHeight / 90,
                            }}
                        >
                            <BottomTabs currentpageprops={props.pageprops} />
                        </View>
                    )}
                    {fetch_inst_tabex_websitetemplatesQueryContext.isSuccess && !fetch_inst_tabex_websitetemplatesQueryContext.data.data.status && (
                        <View>
                            <Text>Error Found</Text>
                        </View>
                    )}
                </View>
            )}
            <SwipeablePanel
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
            </SwipeablePanel>
        </View>
        // </SafeAreaView>
    );
};

export default TemplateDraft;
