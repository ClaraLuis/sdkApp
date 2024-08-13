import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { LanguageContext } from '../LanguageContext/LanguageContext';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { TemplateRoutingContext } from '../TemplateRoutingContext';
import { WebsiteDesignWorkPlaceContext } from '../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import API from '../API/API';
// import { Restart } from 'fiction-expo-restart';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import * as Updates from 'expo-updates';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FetchingContext = React.createContext();
export const FetchingContext_provider = (props) => {
    const queryClient = useQueryClient();
    const {
        Fetchinstitutetemplate_API,
        SocialLoginMutation_API,
        ViewersAdderReport_API,
        fetchProductFeatures_API,
        SearcHeader_API,
        fetchAuthorization_API,
        fetchproducts_API,
        fetchcollections_API,
        fetchorderhistory_API,
        fetchinstitutecustomerinfosignup_API,
        fetchProductInfo_API,
        AddtoCart_API,
        fetchcustomercart_API,
        ApplyPromoCode_API,
        fetchTabexCountriesStates_API,
        ChooseState_Country_API,
        fetchFavoriteProducts_API,
        fetchInstitutePolicies_API,
        fetchCategories_API,
        AddOrder_API,
        Logout_API,
        General_API,
        FetchCustomerStatus_API,
        deleteorder_API,
        ExpoPushNotifregister_API,
        Forgotpassword_API,
        fetchdynamicformfeilds_API,
        DeleteAccount_API,
    } = API();

    const { lang } = useContext(LanguageContext);
    const { StaticPagesLinksContext, routingcountext, routingCustomPagecountext } = React.useContext(TemplateRoutingContext);
    const { INSTAPIKEYCONTEXT, fetch_inst_tabex_websitetemplatesQueryContext, setINSTAPIKEYCONTEXT } = React.useContext(WebsiteDesignWorkPlaceContext);
    const [canbrowseApplicationContext, setcanbrowseApplicationContext] = useState(true);
    const [CurrentSrcTypeContext, setCurrentSrcTypeContext] = useState('');
    const [ProductInfoIdContext, setProductInfoIdContext] = useState('');
    const [sidecartnavshowcontext, setsidecartnavshowcontext] = useState(false);
    const [ShowProductInfoModalContext, setShowProductInfoModalContext] = useState(false);
    const [SearchHeaderInputContext, setSearchHeaderInputContext] = useState('');
    const [ProductIdProdutInfoModalContext, setProductIdProdutInfoModalContext] = useState('');
    const [UpTopNotificationBarObjContext, setUpTopNotificationBarObjContext] = useState({
        text: '',
        color: '',
        show: false,
    });
    const [SwipPanelObjContext, setSwipPanelObjContext] = useState({
        open: false,
        type: '',
    });
    const [VendorsArrgeneralFilterContext, setVendorsArrgeneralFilterContext] = useState([]);

    const [favoriteprojectscountContext, setfavoriteprojectscountContext] = useState([]);
    const [orderindex, setorderindex] = useState('');
    const [templateproperties_context, settemplateproperties_context] = useState('');
    const [orderid, setorderid] = useState('');
    const [expopushtokencontext, setexpopushtokencontext] = useState('');

    const [FetchQueriesEngineContext, setFetchQueriesEngineContext] = useState({
        institutetemplate: true,
        authorization: true,
        fetchcustomercart: true,
        products: false,
        collections: false,
        categories: true,
        orderhistory: false,
        institutecustomerinfosignup: false,
        fetchproductinfo: false,
        fetchtabexcountries: false,
        fetchtabexstates: false,
        fetchfavoriteproducts: false,
        fetchdynamicforms: false,
        fetchinstitutepolicy: false,
        fetchCustomerStatus: false,
    });
    const [fetchproductsfilerobjcontext, setfetchproductsfilerobjcontext] = useState({
        page: 0,
        Isfiltercollections: 0,
        isfilter: 0,
        ProductFetchingType: '',
        collections: [],
        FilterOptions: [],
    });
    const [FetchTabexStatesPayloadobjContext, setFetchTabexStatesPayloadobjContext] = useState({
        country_id: '',
        state_id: '',
    });

    const [fetchproductinfoObjContext, setfetchproductinfoObjContext] = useState({
        productid: '',
    });
    const [FetchProductArrayFetchTypes, setFetchProductArrayFetchTypes] = useState([]);
    const [ObjectPaymentOnlineModalContext, setObjectPaymentOnlineModalContext] = useState({});

    const [AuthorizaionTokenContext, setAuthorizaionTokenContext] = useState('');
    const [isAddtoCartMutationContextDone, setisAddtoCartMutationContextDone] = useState(false);

    useEffect(() => {
        // AsyncStorage.getItem('token').then((token) => {
        // axios.interceptors.request.use(function (config) {
        //     var defaultheaders = config.headers;
        //     // var token = cookies.get('token');
        //     // if (token != undefined) {
        //     //     defaultheaders.Authorization = 'Bearer ' + token;
        //     // }
        //     // console.log('sss' + token);

        //     if (token != undefined && token != null) {
        //         defaultheaders.Authorization = 'Bearer ' + token;
        //     }
        //     config.headers = defaultheaders;
        //     return config;
        // });
        // });
        const fetchData = async () => {
            var token = await AsyncStorage.getItem('token');
            axios.interceptors.request.use(function (config) {
                var defaultheaders = config.headers;
                // var token = cookies.get('token');
                // if (token != undefined) {
                //     defaultheaders.Authorization = 'Bearer ' + token;
                // }
                // console.log('sss' + token);

                if (token != undefined && token != null) {
                    setAuthorizaionTokenContext(token);
                    // defaultheaders.Authorization = 'Bearer ' + token;
                } else {
                    setAuthorizaionTokenContext('notoken');
                }
                config.headers = defaultheaders;
                return config;
            });
        };
        fetchData();
    }, []);

    useEffect(() => {
        SearchHeaderMutationContext.reset();
        const delayDebounceFn = setTimeout(() => {
            if (SearchHeaderInputContext.length != 0) {
                SearchHeaderMutationContext.mutate({
                    SearchHeaderValue: SearchHeaderInputContext,
                });
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [SearchHeaderInputContext]);
    useEffect(() => {
        favproductsgetter();
    }, []);
    useEffect(() => {
        if (fetch_inst_tabex_websitetemplatesQueryContext.isSuccess) {
            if (fetch_inst_tabex_websitetemplatesQueryContext?.data?.data?.template?.instid == 'tabex') {
                // setINSTAPIKEYCONTEXT('tabex');
            }
        }
    }, [fetch_inst_tabex_websitetemplatesQueryContext.isSuccess]);
    const favproductsgetter = async () => {
        try {
            var value = await AsyncStorage.getItem('favoriteitems');
            if (value !== null) {
                value = JSON.parse(value);
                setfavoriteprojectscountContext(value.products);
            } else {
                setfavoriteprojectscountContext([]);
            }
        } catch (e) {}
    };
    const routingintemplatecontext = (route) => {
        var t = window.location.pathname.toString();
        var newResult = t.substring(0, t.lastIndexOf('/'));
        history.push(newResult + route);
    };

    const fetchAuthorizationQueryContext = useQuery(['fetchAuthorization_API' + INSTAPIKEYCONTEXT], () => fetchAuthorization_API({ instapikey: INSTAPIKEYCONTEXT, fromsrcview: 'mobapp' }), {
        keepPreviousData: true,
        staleTime: Infinity,
        enabled: AuthorizaionTokenContext.length != 0 && INSTAPIKEYCONTEXT.length != 0 && FetchQueriesEngineContext.authorization ? true : false,
    });
    const fetchCategoriesQueryContext = useQuery(['fetchCategories_API'], () => fetchCategories_API({ instapikey: INSTAPIKEYCONTEXT }), {
        keepPreviousData: true,
        staleTime: Infinity,
        enabled: INSTAPIKEYCONTEXT.length != 0 && FetchQueriesEngineContext.categories ? true : false,
    });
    const fetchProductFeaturesQueryContext = useQuery(['fetchProductFeatures_API'], () => fetchProductFeatures_API({ instapikey: INSTAPIKEYCONTEXT }), {
        keepPreviousData: true,
        staleTime: Infinity,
        enabled: INSTAPIKEYCONTEXT.length != 0 ? true : false,
    });
    const fetchProductsQueryContext = useQuery(['fetchproducts_API' + JSON.stringify(fetchproductsfilerobjcontext)], () => fetchproducts_API(fetchproductsfilerobjcontext), {
        keepPreviousData: true,
        staleTime: Infinity,
        enabled:
            INSTAPIKEYCONTEXT.length != 0 &&
            FetchQueriesEngineContext.products &&
            fetchproductsfilerobjcontext.ProductFetchingType != undefined &&
            fetchproductsfilerobjcontext.ProductFetchingType.length != 0
                ? true
                : false,
    });

    const fetchcustomercartQueryContext = useQuery(['fetchcustomercart_API'], () => fetchcustomercart_API({ instapikey: INSTAPIKEYCONTEXT }), {
        keepPreviousData: true,
        staleTime: Infinity,
        enabled: AuthorizaionTokenContext.length != 0 && INSTAPIKEYCONTEXT.length != 0 && FetchQueriesEngineContext.fetchcustomercart ? true : false,
    });
    const fetchdynamicformfeildsQueryContext = useQuery(['fetchdynamicformfeilds_API'], () => fetchdynamicformfeilds_API({ instapikey: INSTAPIKEYCONTEXT }), {
        keepPreviousData: true,
        staleTime: Infinity,
        enabled:
            INSTAPIKEYCONTEXT.length != 0 &&
            // FetchQueriesEngineContext.fetchdynamicforms &&
            fetchAuthorizationQueryContext.isSuccess &&
            fetchcustomercartQueryContext.isSuccess &&
            fetchAuthorizationQueryContext?.data?.data != undefined &&
            fetchAuthorizationQueryContext?.data?.data?.instinfo != undefined &&
            fetchAuthorizationQueryContext?.data?.data?.instinfo?.dynamicformcount != 0
                ? true
                : false,
    });
    // const ChangeCartItemQuantityContext = (cartitemobj, newquantity) => {
    //     var payloadobj = {
    //         functype: 'ChangeCartItemQuantity',
    //         custcaritemid: cartitemobj.custcaritemid,
    //         newquantity: newquantity,
    //     };
    //     AddtoCartMutationContext.mutate(payloadobj);
    // };
    const fetchcollectionsQueryContext = useQuery(['fetchcollections_API'], () => fetchcollections_API({}), {
        keepPreviousData: true,
        staleTime: Infinity,
        enabled: INSTAPIKEYCONTEXT.length != 0 && FetchQueriesEngineContext.collections ? true : false,
    });
    const fetchFavoriteProductsQueryContext = useQuery(
        ['fetchFavoriteProducts_API' + JSON.stringify(favoriteprojectscountContext)],
        () => fetchFavoriteProducts_API({ instapikey: INSTAPIKEYCONTEXT, favoriteproductids: favoriteprojectscountContext }),
        {
            keepPreviousData: true,
            staleTime: Infinity,
            enabled: INSTAPIKEYCONTEXT.length != 0 && FetchQueriesEngineContext.fetchfavoriteproducts ? true : false,
        },
    );
    const fetchorderhistoryQueryContext = useQuery(['fetchorderhistory_API'], () => fetchorderhistory_API({ instapikey: INSTAPIKEYCONTEXT }), {
        keepPreviousData: true,
        staleTime: Infinity,
        enabled: INSTAPIKEYCONTEXT.length != 0 && FetchQueriesEngineContext.orderhistory ? true : false,
    });
    const fetchinstitutecustomerinfosignupQueryContext = useQuery(['fetchinstitutecustomerinfosignup_API'], () => fetchinstitutecustomerinfosignup_API({ instapikey: INSTAPIKEYCONTEXT }), {
        keepPreviousData: true,
        staleTime: Infinity,
        enabled: INSTAPIKEYCONTEXT.length != 0 && FetchQueriesEngineContext.institutecustomerinfosignup ? true : false,
    });
    const fetchInstitutePoliciesQueryContext = useQuery(['fetchInstitutePolicies_API'], () => fetchInstitutePolicies_API({ instapikey: INSTAPIKEYCONTEXT }), {
        keepPreviousData: true,
        staleTime: Infinity,
        enabled: INSTAPIKEYCONTEXT.length != 0 && FetchQueriesEngineContext.fetchinstitutepolicy ? true : false,
    });
    const fetchTabexCountriesQueryContext = useQuery(['fetchTabexCountries_API'], () => fetchTabexCountriesStates_API({ instapikey: INSTAPIKEYCONTEXT, functype: 'countries' }), {
        keepPreviousData: true,
        staleTime: Infinity,
        enabled: FetchQueriesEngineContext.fetchtabexcountries ? true : false,
    });
    const fetchCustomerStatusContext = useQuery(['FetchCustomerStatus_API'], () => FetchCustomerStatus_API({ instapikey: INSTAPIKEYCONTEXT }), {
        keepPreviousData: true,
        staleTime: Infinity,
        enabled: FetchQueriesEngineContext.fetchCustomerStatus ? true : false,
    });
    const fetchTabexStatesQueryContext = useQuery(
        ['fetchTabexCountriesStates_API' + FetchTabexStatesPayloadobjContext.country_id],
        () => fetchTabexCountriesStates_API({ instapikey: INSTAPIKEYCONTEXT, functype: 'states', country_id: FetchTabexStatesPayloadobjContext.country_id }),
        {
            keepPreviousData: true,
            staleTime: Infinity,
            enabled: FetchTabexStatesPayloadobjContext.country_id.length != 0 ? true : false,
        },
    );
    const fetchTabexCitiesQueryContext = useQuery(
        ['fetchTabexCitiesStates_API' + FetchTabexStatesPayloadobjContext.state_id],
        () => fetchTabexCountriesStates_API({ instapikey: INSTAPIKEYCONTEXT, functype: 'cities', state_id: FetchTabexStatesPayloadobjContext.state_id }),
        {
            keepPreviousData: true,
            staleTime: Infinity,
            enabled: FetchTabexStatesPayloadobjContext.state_id.length != 0 ? true : false,
        },
    );
    // useEffect(() => {
    //     if (Device.isDevice) {
    //         setexpopushtokencontext('notaccepted');
    //         registerForPushNotificationsAsync().then((token) => {
    //             if (token == undefined) {
    //                 setexpopushtokencontext('notaccepted');
    //             } else {
    //                 setexpopushtokencontext(token);
    //             }
    //         });
    //     } else {
    //         setexpopushtokencontext('simulator-notaccepted');
    //     }
    // }, []);
    // async function registerForPushNotificationsAsync() {
    async function registerForPushNotificationsAsyncContext() {
        let token;

        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            setexpopushtokencontext('notoken');

            console.log('Failed to get push token for push notification!');
            return;
        }

        token = (await Notifications.getExpoPushTokenAsync()).data;

        console.log(token);

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
                priority: 'max',
            });
        }
        return token;
    }

    useEffect(() => {
        if (expopushtokencontext.length != 0) {
            if (expopushtokencontext != 'notoken' && expopushtokencontext != 'simulator-notaccepted' && expopushtokencontext != 'notaccepted' && AuthorizaionTokenContext.length != 0) {
                // ExpoPushNotifregisterMutation.mutate({ expopushtoken: expopushtokencontext });
                ExpoPushNotifregisterMutation.mutate({ expopushtoken: expopushtokencontext, appslug: Constants?.expoConfig?.slug });
            } else {
            }
        }
    }, [expopushtokencontext, AuthorizaionTokenContext]);
    useEffect(() => {
        if (fetchcustomercartQueryContext.isSuccess) {
            // const cookies = new Cookies();

            // cookies.set('cdata', fetchcustomercartQueryContext.data.data._datecustomercart, { path: '/' });
            AsyncStorage.setItem('cdata', fetchcustomercartQueryContext.data.data._datecustomercart);
        }
    }, [fetchcustomercartQueryContext.isSuccess, fetchcustomercartQueryContext.data]);

    const ExpoPushNotifregisterMutation = useMutation('ExpoPushNotifregister_API', {
        mutationFn: ExpoPushNotifregister_API,
        onMutate: (variables) => {},
        onError: (error, variables, context) => {
            // alert('error');
        },
        onSuccess: (data, variables, context) => {
            if (data.data.status) {
                // alert('done');
            } else {
                // alert('warning');
            }
        },
    });
    const logoutfuncContext = () => {
        AsyncStorage.removeItem('token');
        LogoutMutationContext.mutate();
        fetchAuthorizationQueryContext.refetch();
        fetchcustomercartQueryContext.refetch();
    };
    const LogoutMutationContext = useMutation('Logout_API', {
        mutationFn: Logout_API,
        onMutate: (variables) => {},
        onError: (error, variables, context) => {
            // showUpTopNotificationBarContext('Error In Logging Out', 'red');
        },
        onSuccess: (data, variables, context) => {
            AsyncStorage.removeItem('token');
            axios.interceptors.request.use(function (config) {
                var defaultheaders = config.headers;

                defaultheaders.Authorization = 'Bearer ';

                config.headers = defaultheaders;
                return config;
            });
            fetchcustomercartQueryContext.refetch();
            fetchAuthorizationQueryContext.refetch();
            routingcountext('Home');
            showUpTopNotificationBarContext('Logged Out Successfully', 'green');
            // routingCustomPagecountext('Home');
            if (fetchAuthorizationQueryContext.data.data.instinfo.is_to_institute == 1) {
                Updates.reloadAsync();
            }
            if (data.data.status) {
            } else {
                // showUpTopNotificationBarContext(data.data.reason, 'orange');
            }
        },
    });
    const DeleteAccountMutationContext = useMutation('deleteaccount_API', {
        mutationFn: DeleteAccount_API,
        onMutate: (variables) => {},
        onError: (error, variables, context) => {
            // showUpTopNotificationBarContext('Error In Logging Out', 'red');
        },
        onSuccess: (data, variables, context) => {
            if (data.data.status) {
                AsyncStorage.removeItem('token');

                fetchAuthorizationQueryContext.refetch();
                fetchcustomercartQueryContext.refetch();
                showUpTopNotificationBarContext('Account Deleted Successfully', 'green');
                // routingCustomPagecountext('Home');
                routingcountext('Home');
            } else {
                // showUpTopNotificationBarContext(data.data.reason, 'orange');
            }
        },
    });
    // const SocialLoginMutationContext = useMutation('SocialLoginMutation_API', {
    //     mutationFn: SocialLoginMutation_API,
    //     onMutate: (variables) => {},
    //     onError: (error, variables, context) => {
    //         showUpTopNotificationBarContext(lang.errorloggingin, 'red');
    //     },
    //     onSuccess: (data, variables, context) => {
    //         if (data.data.status) {
    //             fetchAuthorizationQueryContext.refetch();
    //             fetchcustomercartQueryContext.refetch();
    //             showUpTopNotificationBarContext(lang.loggedinsuccess, 'green');
    //             routingCustomPagecountext('Home');
    //         } else {
    //             showUpTopNotificationBarContext('', data.data.reason);
    //         }
    //     },
    // });
    const SocialLoginMutationContext = useMutation('SocialLoginMutation_API', {
        mutationFn: SocialLoginMutation_API,
        onMutate: (variables) => {},
        onError: (error, variables, context) => {
            showUpTopNotificationBarContext(lang.errorloggingin, 'red');
        },
        onSuccess: (data, variables, context) => {
            // if (data.data.status) {
            //     fetchAuthorizationQueryContext.refetch();
            //     fetchcustomercartQueryContext.refetch();
            //     showUpTopNotificationBarContext(lang.loggedinsuccess, 'green');
            //     routingCustomPagecountext('Home');
            // } else {
            //     showUpTopNotificationBarContext('', data.data.reason);
            // }

            if (data.data.status) {
                AsyncStorage.setItem('token', data.data.token);
                AsyncStorage.removeItem('cdata');

                fetchcustomercartQueryContext.refetch();
                fetchAuthorizationQueryContext.refetch();
                setcanbrowseApplicationContext(true);
                routingcountext('Home');

                showUpTopNotificationBarContext(lang.loggedinsuccess, 'green');
            } else {
                setisloggingin(false);
                showUpTopNotificationBarContext(lang.invalidemailpassword, 'orange');
            }
        },
    });
    const SearchHeaderMutationContext = useMutation('SearcHeader_API', {
        mutationFn: SearcHeader_API,
        onMutate: (variables) => {},
        onError: (error, variables, context) => {
            // NotificationManager.error('', 'Error In Searching.');
        },
        onSuccess: (data, variables, context) => {
            if (data.data.status) {
            } else {
                // NotificationManager.warning('', data.data.reason);
            }
        },
    });
    const ApplyPromoCodeMutationContext = useMutation('ApplyPromoCode_API', {
        mutationFn: ApplyPromoCode_API,
        onMutate: (variables) => {},
        onError: (error, variables, context) => {
            NotificationManager.error('', 'Error In Applying Promo Code.');
        },
        onSuccess: (data, variables, context) => {
            if (data.data.status) {
                var cartarr = queryClient.getQueryData('fetchcustomercart_API');
                cartarr.data = data.data.cartresponse;
                queryClient.setQueryData('fetchcustomercart_API', cartarr);
                if (variables.functype == 'add') {
                    showUpTopNotificationBarContext('Promo code applied', 'green');
                } else {
                    showUpTopNotificationBarContext('Promo code removed', 'green');
                }
                if (data.data.cdata != null) {
                    AsyncStorage.setItem('cdata', data.data.cdata);
                }
            } else {
                showUpTopNotificationBarContext(data.data.reason, 'orange');
            }
        },
    });
    const ChooseState_CountryMutationContext = useMutation('ChooseState_Country_API', {
        mutationFn: ChooseState_Country_API,
        onMutate: (variables) => {},
        onError: (error, variables, context) => {
            // NotificationManager.error('', 'Error In Changing Country And State.');
        },
        onSuccess: (data, variables, context) => {
            if (data.data.status) {
                var cartarr = queryClient.getQueryData('fetchcustomercart_API');
                cartarr.data = data.data.cartresponse;
                queryClient.setQueryData('fetchcustomercart_API', cartarr);
                // NotificationManager.success('', 'Country And State Updated Successfully.');
                if (data.data.cdata != null) {
                    AsyncStorage.setItem('cdata', data.data.cdata);
                }
                showUpTopNotificationBarContext('Information Updated', 'green');
            } else {
                showUpTopNotificationBarContext(data.data.reason, 'orange');
            }
        },
    });
    const DeleteOrderMutationContext = useMutation('deleteorder_API', {
        mutationFn: deleteorder_API,
        onMutate: (variables) => {},
        onError: (error, variables, context) => {
            showUpTopNotificationBarContext('Error in deleting Order', 'red');

            // NotificationManager.error('', 'Error In Changing Country And State.');
        },
        onSuccess: (data, variables, context) => {
            if (data.data.status) {
                fetchorderhistoryQueryContext.refetch();
                fetchAuthorizationQueryContext.refetch();
                routingcountext(StaticPagesLinksContext.Ordershistory);
                showUpTopNotificationBarContext('Order Deleted', 'green');
            } else {
                showUpTopNotificationBarContext(data.data.reason, 'orange');
            }
        },
    });
    const AddOrderMutationContext = useMutation('AddOrder_API', {
        mutationFn: AddOrder_API,
        onMutate: (variables) => {},
        onError: (error, variables, context) => {
            showUpTopNotificationBarContext(lang.erroraddingorder, 'red');
        },
        onSuccess: (data, variables, context) => {
            if (data.data.status) {
                AsyncStorage.removeItem('cdata');
                if (data.data.paymentmethod == 'OnlinePayment') {
                    var temmpSwipPanelObjContext = { ...SwipPanelObjContext };
                    temmpSwipPanelObjContext.open = true;
                    temmpSwipPanelObjContext.type = 'webbrowser';
                    setSwipPanelObjContext({ ...temmpSwipPanelObjContext });
                    setObjectPaymentOnlineModalContext(data.data);
                } else {
                    fetchorderhistoryQueryContext.refetch();
                    fetchcustomercartQueryContext.refetch();
                    routingcountext(StaticPagesLinksContext.Ordersuccess, { status: 'true', reason: '' });
                    showUpTopNotificationBarContext(lang.orderaddedsuccess, 'green');
                }
            } else {
                showUpTopNotificationBarContext(data.data.reason, 'orange');
            }
        },
    });
    const deletecartitemContext = (cartitemobj) => {
        var payloadobj = {
            functype: 'delete',
            custcaritemid: cartitemobj.custcaritemid,
            cartitemobj: cartitemobj,
        };
        AddtoCartMutationContext.mutate(payloadobj);
    };
    const ChangeCartItemQuantityContext = (cartitemobj, newquantity) => {
        var payloadobj = {
            functype: 'ChangeCartItemQuantity',
            custcaritemid: cartitemobj.custcaritemid,
            newquantity: newquantity,
            cartitemobj: cartitemobj,
        };

        AddtoCartMutationContext.mutate(payloadobj);
    };

    const AddtoCartMutationContext = useMutation('AddtoCart_API', {
        mutationFn: AddtoCart_API,
        onMutate: (variables) => {},
        onError: (error, variables, context) => {
            // alert(error);
            showUpTopNotificationBarContext('Error In Adding To Cart', 'red');
        },
        onSuccess: (data, variables, context) => {
            if (data.data.status) {
                var cartarr = queryClient.getQueryData('fetchcustomercart_API');

                if (cartarr != undefined) {
                    cartarr.data = data.data.cartresponse;
                    queryClient.setQueryData('fetchcustomercart_API', cartarr);
                }
                if (data.data.cdata != null) {
                    // alert('f');
                    AsyncStorage.setItem('cdata', data.data.cdata);
                }
                // showUpTopNotificationBarContext(lang.addedtocart, 'green');
                showUpTopNotificationBarContext('Done', 'green');
                if (data.data.status == true) {
                    setisAddtoCartMutationContextDone(true);
                } else {
                    setisAddtoCartMutationContextDone(false);
                }
                // alert();
            } else {
                showUpTopNotificationBarContext(data.data.reason, 'orange');
            }
        },
    });

    const AddtoCartContext = (addtocardpayloadobj) => {
        AddtoCartMutationContext.mutate(addtocardpayloadobj);
    };
    const addtofavoritescontext = async (productid) => {
        try {
            var value = await AsyncStorage.getItem('favoriteitems');
            if (value !== null) {
                var addproductchecker = true;
                var parsedfavproducts = JSON.parse(value);
                parsedfavproducts.products.forEach(function (arrayItem, arrayindex) {
                    if (arrayItem == productid) {
                        parsedfavproducts.products.splice(arrayindex, 1);
                        addproductchecker = false;
                    }
                });
                if (addproductchecker) {
                    parsedfavproducts.products.push(productid);
                    showUpTopNotificationBarContext(lang.addedtowishlist, 'green');
                } else {
                    showUpTopNotificationBarContext(lang.removedfromwishlist, 'green');
                }
                setfavoriteprojectscountContext(parsedfavproducts.products);
                var jsonfavproducts = JSON.stringify(parsedfavproducts);
                try {
                    await AsyncStorage.setItem('favoriteitems', jsonfavproducts);
                } catch (e) {
                    showUpTopNotificationBarContext('Failed To Add To Wish List', 'red');
                }
            } else {
                try {
                    var productsarr = [];
                    productsarr.push(productid);
                    var obj = { products: productsarr };
                    const jsonobj = JSON.stringify(obj);
                    await AsyncStorage.setItem('favoriteitems', jsonobj);
                    setfavoriteprojectscountContext(productsarr);

                    showUpTopNotificationBarContext(lang.addedtowishlist, 'green');
                } catch (e) {
                    alert(console.log(e));
                    showUpTopNotificationBarContext('Failed To Add To Wish List', 'red');
                }
            }
        } catch (e) {
            showUpTopNotificationBarContext('Failed To Add To Wish List', 'red');
        }
    };

    const setCollectionFilterFuncContext = (collectionid, ClearPastCollections) => {
        var tempFetchQueriesEngineContext = { ...FetchQueriesEngineContext };
        tempFetchQueriesEngineContext.products = true;
        setFetchQueriesEngineContext({ ...tempFetchQueriesEngineContext });

        var tempfetchproductsfilerobjcontext = { ...fetchproductsfilerobjcontext };

        tempfetchproductsfilerobjcontext.Isfiltercollections = 1;
        var pastcollections = [...tempfetchproductsfilerobjcontext.collections];
        // if (ClearPastCollections == false) {

        //     var checkIndex = pastcollections.findIndex((el) => el == collectionid);

        //     if (checkIndex > -1) {
        //         pastcollections.splice(checkIndex, 1);
        //     } else {
        //         pastcollections.push(collectionid);
        //     }
        // } else {
        //     pastcollections.push(collectionid);
        // }
        // alert(JSON.stringify(pastcollections));

        pastcollections.push(collectionid);
        tempfetchproductsfilerobjcontext.collections = pastcollections;
        alert(JSON.stringify(tempfetchproductsfilerobjcontext.collections));
        setfetchproductsfilerobjcontext({ ...tempfetchproductsfilerobjcontext });
    };
    const showUpTopNotificationBarContext = (text, color) => {
        var tempUpTopNotificationBarObjContext = { ...UpTopNotificationBarObjContext };
        tempUpTopNotificationBarObjContext.text = text;
        tempUpTopNotificationBarObjContext.color = color;
        tempUpTopNotificationBarObjContext.show = true;
        setUpTopNotificationBarObjContext({ ...tempUpTopNotificationBarObjContext });
        setTimeout(function () {
            tempUpTopNotificationBarObjContext.show = false;
            setUpTopNotificationBarObjContext({ ...tempUpTopNotificationBarObjContext });
        }, 2000);
    };
    const GeneralAPIMutationContext = useMutation('General_API', {
        mutationFn: General_API,
        onMutate: (variables) => {},
        onError: (error, variables, context) => {
            showUpTopNotificationBarContext('Error', 'red');
        },
        onSuccess: (data, variables, context) => {
            if (data.data.status) {
                variables.mutateSuccesscallback(data, variables, context);
                // NotificationManager.success('', lang.loggedoutsuccess);
            } else {
                showUpTopNotificationBarContext(data.data.reason, 'orange');
            }
        },
    });
    const ForgetpasswordMutationContext = useMutation('Forgetpassword_API', {
        mutationFn: Forgotpassword_API,
        onMutate: (variables) => {},
        onError: (error, variables, context) => {
            NotificationManager.error('', 'Error in reseting password');
        },
        onSuccess: (data, variables, context) => {
            if (data.data.status) {
                // NotificationManager.success('',);
            } else {
                showUpTopNotificationBarContext(data.data.reason, 'orange');
            }
        },
    });
    const productspageredirectorcontext = (pagetype, fetchingtypeprops, collectionid) => {
        var pagepathstatic = StaticPagesLinksContext.GeneralProductsComponent;
        if (pagetype == 'InnerGroups') {
            pagepathstatic = StaticPagesLinksContext.InnerGroups;
        } else if (pagetype == 'generalproduct') {
            pagepathstatic = StaticPagesLinksContext.GeneralProductsComponent;
        }

        if (fetchingtypeprops == 'collections' || fetchingtypeprops == 'innerparentcollections') {
            routingcountext(StaticPagesLinksContext.GeneralProductsComponent, { genprodcompstinfo: { collectionid: collectionid } });
        } else if (fetchingtypeprops == 'parentcollections' || fetchingtypeprops == 'innercategories') {
            if (pagetype == 'generalproduct') {
                routingcountext(StaticPagesLinksContext.GeneralProductsComponent, {
                    genprodcompstinfo: { collectionid: collectionid, srcfrom: 'GeneralProductsComponent', grouptypeprops: 'parentcollections' },
                });
            } else if (pagetype == 'InnerGroups') {
                routingcountext(StaticPagesLinksContext.InnerParentCollection, {
                    genprodcompstinfo: { collectionid: collectionid, srcfrom: 'InnerParentCollection', fetchingtype: 'innerparentcollections' },
                });
            }
        } else if (fetchingtypeprops == 'categories') {
            if (pagetype == 'generalproduct') {
                routingcountext(StaticPagesLinksContext.GeneralProductsComponent, {
                    genprodcompstinfo: { collectionid: collectionid, srcfrom: 'GeneralProductsComponent', grouptypeprops: 'categories' },
                });
            } else if (pagetype == 'InnerGroups') {
                routingcountext(StaticPagesLinksContext.InnerCategory, { genprodcompstinfo: { collectionid: collectionid, srcfrom: 'InnerCategory', fetchingtype: 'innercategories' } });
            }
        } else if (fetchingtypeprops == 'vendors') {
            routingcountext(StaticPagesLinksContext.GeneralProductsComponent, { genprodcompstinfo: { vendorsarr: [collectionid] } });
        } else {
            routingcountext(StaticPagesLinksContext.GeneralProductsComponent, { genprodcompstinfo: { collectionid: collectionid } });
        }
    };
    const cardonclickfunctionContext = (onClickRoute, productid, fetchingtypeprops, collectionid) => {
        if (fetchingtypeprops == 'vendors') {
            // onClickRoute = 'Vendor Page';
            // onClickRoute = '';
            // routingcountext(StaticPagesLinksContext.GeneralProductsComponent, true, encodeURIComponent(JSON.stringify({ vendorsarr: [collectionid] })));
            if (onClickRoute == 'Collections') {
                // alert(StaticPagesLinksContext.InnerParentCollection);

                routingcountext(StaticPagesLinksContext.InnerParentCollection, {
                    genprodcompstinfo: { vendorsarr: collectionid, srcfrom: 'collections', fetchingtype: 'collections' },
                });
                // alert(collectionid);
                // productspageredirectorcontext('InnerGroups', 'collections', collectionid);
            } else if (onClickRoute == 'Vendor Page') {
                // alert(StaticPagesLinksContext.InnerParentCollection);

                routingcountext(StaticPagesLinksContext.VendorPage, {
                    genprodcompstinfo: { vendorsarr: collectionid, srcfrom: 'collections', fetchingtype: 'collections' },
                });
                // alert(collectionid);
                // productspageredirectorcontext('InnerGroups', 'collections', collectionid);
            } else {
                productspageredirectorcontext('generalproduct', fetchingtypeprops, collectionid);
            }
            // alert(onClickRoute);
        } else if (onClickRoute == undefined || onClickRoute == null || onClickRoute == '' || onClickRoute.length == 0 || onClickRoute == 'Product Information') {
            setProductInfoIdContext(productid);
            routingcountext(StaticPagesLinksContext.ProductInfo);
        } else if (onClickRoute == 'Products' || onClickRoute == 'products') {
            productspageredirectorcontext('generalproduct', fetchingtypeprops, collectionid);
        } else if (onClickRoute == 'Inner Groups') {
            productspageredirectorcontext('InnerGroups', fetchingtypeprops, collectionid);
        } else if (onClickRoute == 'Vendors') {
            // alert(fetchingtypeprops);
            // productspageredirectorcontext('generalproduct', 'vendors', collectionid);
            routingcountext(StaticPagesLinksContext.Innervendor, {
                genprodcompstinfo: { collectionid: collectionid, srcfrom: 'innervendors', grouptypeprops: 'vendors' },
            });
        } else {
            setProductInfoIdContext(productid);
            routingcountext(StaticPagesLinksContext.ProductInfo);
        }
    };
    const setcurrencyfunccontext = async (currencyobj) => {
        await AsyncStorage.setItem('currency', currencyobj.currencyid.toString());
        // Restart();
        Updates.reloadAsync();
    };
    const clearcartfuncContext = () => {
        AsyncStorage.removeItem('cdata');
        AddtoCartMutationContext.mutate({ functype: 'clearcart', reloadpage: false });
    };
    const iscrossvendorfunccontext = (addtocardpayloadobj) => {
        var isinstdisallowcrossvendor = false;
        var iscrossvendordetected = false;

        if (fetchAuthorizationQueryContext?.data?.data?.instinfo?.allowcrossvendororder == 0) {
            isinstdisallowcrossvendor = true;
            fetchcustomercartQueryContext?.data?.data?.customercart?.cartitems?.map((item) => {
                if (item?.productinfo?.vendorproviderid != addtocardpayloadobj?.vendorid) {
                    iscrossvendordetected = true;
                }
            });
        }
        return { isinstdisallowcrossvendor: isinstdisallowcrossvendor, iscrossvendordetected: iscrossvendordetected };
    };
    return (
        <FetchingContext.Provider
            value={{
                logoutfuncContext,
                GeneralAPIMutationContext,
                FetchQueriesEngineContext,
                setFetchQueriesEngineContext,
                fetchproductsfilerobjcontext,
                setfetchproductsfilerobjcontext,
                fetchAuthorizationQueryContext,
                fetchProductsQueryContext,
                fetchcollectionsQueryContext,
                fetchCategoriesQueryContext,
                fetchinstitutecustomerinfosignupQueryContext,
                fetchorderhistoryQueryContext,
                LogoutMutationContext,
                DeleteAccountMutationContext,
                fetchproductinfoObjContext,
                setfetchproductinfoObjContext,
                setCollectionFilterFuncContext,
                AddOrderMutationContext,
                AddtoCartMutationContext,
                fetchcustomercartQueryContext,
                ApplyPromoCodeMutationContext,
                fetchTabexCountriesQueryContext,
                fetchTabexStatesQueryContext,
                fetchTabexCitiesQueryContext,
                FetchTabexStatesPayloadobjContext,
                fetchFavoriteProductsQueryContext,
                fetchInstitutePoliciesQueryContext,
                routingintemplatecontext,
                setFetchTabexStatesPayloadobjContext,
                ChooseState_CountryMutationContext,
                addtofavoritescontext,
                deletecartitemContext,
                favoriteprojectscountContext,
                setfavoriteprojectscountContext,
                sidecartnavshowcontext,
                setsidecartnavshowcontext,
                ShowProductInfoModalContext,
                setShowProductInfoModalContext,
                ProductIdProdutInfoModalContext,
                setProductIdProdutInfoModalContext,
                FetchProductArrayFetchTypes,
                setFetchProductArrayFetchTypes,
                CurrentSrcTypeContext,
                SearchHeaderInputContext,
                setSearchHeaderInputContext,
                SearchHeaderMutationContext,
                showUpTopNotificationBarContext,
                UpTopNotificationBarObjContext,
                setProductInfoIdContext,
                ProductInfoIdContext,
                ChangeCartItemQuantityContext,
                orderindex,
                setorderindex,
                orderid,
                setorderid,
                INSTAPIKEYCONTEXT,
                templateproperties_context,
                settemplateproperties_context,
                SwipPanelObjContext,
                setSwipPanelObjContext,
                fetchdynamicformfeildsQueryContext,
                ObjectPaymentOnlineModalContext,
                setObjectPaymentOnlineModalContext,
                SocialLoginMutationContext,
                cardonclickfunctionContext,
                fetchCustomerStatusContext,
                DeleteOrderMutationContext,
                ForgetpasswordMutationContext,
                fetchProductFeaturesQueryContext,
                setcurrencyfunccontext,
                canbrowseApplicationContext,
                setcanbrowseApplicationContext,
                registerForPushNotificationsAsyncContext,
                setexpopushtokencontext,
                VendorsArrgeneralFilterContext,
                setVendorsArrgeneralFilterContext,
                isAddtoCartMutationContextDone,
                setisAddtoCartMutationContextDone,
                clearcartfuncContext,
                iscrossvendorfunccontext,
            }}
        >
            {props.children}
        </FetchingContext.Provider>
    );
};
