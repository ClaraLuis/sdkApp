import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { WebsiteDesignWorkPlaceContext } from '../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { useNavigation } from '@react-navigation/native';
export const TemplateRoutingContext = React.createContext();
export const TemplateRoutingContext_Provider = (props) => {
    const navigation = useNavigation();
    const { fetch_inst_tabex_websitetemplatesQueryContext, pageindexcontext, setisScreenLoadedContext, moduleIsAvailablecontext, CurrentPageIdContext, setCurrentPageIdContext } =
        React.useContext(WebsiteDesignWorkPlaceContext);
    const [StaticPagesLinksContext, setStaticPagesLinksContext] = useState({
        viewcart: '',
        accountinfo: '',
        Checkout: '',
        Ordershistory: '',
        ProductInfo: '',
        Wishlist: '',
        Policies: '',
        Signup: '',
        Login: '',
        GeneralProductsComponent: '',
        AppMenu: '',
        OrderDetails: '',
        AddressDetails: '',
        Filter: '',
        Search: '',
        InnerCategory: '',
        Ordersuccess: '',
        AddReview: '',
        Afiiliatesignup: '',
        Innervendor: '',
        VendorPage: '',
    });
    const routingcountext = (route, params) => {
        if (route != undefined && route.length != 0) {
            // setCurrentPageIdContext(route);
            setisScreenLoadedContext(false);
            var pageid = '';
            var pageobj = fetch_inst_tabex_websitetemplatesQueryContext.data.data.template.pages.find((element) => {
                return element.pagename === route;
            });
            if (pageobj != undefined && pageobj != null && pageobj.length != 0 && pageobj?.pageid?.length != 0) {
                setCurrentPageIdContext(pageobj.pageid);
            }

            navigation.navigate(route, params);
        }
    };

    const routingtemp = (pagename) => {
        setisScreenLoadedContext(false);
        navigation.navigate(pagename);
    };
    const routingtempinbottomnav = (pagename, params) => {
        setisScreenLoadedContext(false);
        navigation.navigate(pagename, params);
    };
    useEffect(() => {
        if (fetch_inst_tabex_websitetemplatesQueryContext.isSuccess && fetch_inst_tabex_websitetemplatesQueryContext.data.data.status) {
            var tempStaticPagesLinksContext = { ...StaticPagesLinksContext };
            fetch_inst_tabex_websitetemplatesQueryContext.data.data.template.pages.forEach(function (arrayItem, arrayindex) {
                if (arrayItem.isstaticpage == 1) {
                    if (arrayItem.tabexstaticpageinfo != null && arrayItem.tabexstaticpageinfo != undefined) {
                        var tempcomponentname = arrayItem.tabexstaticpageinfo.pagecomponentname;
                        var tempnavroute = arrayItem.pagename;

                        if (tempcomponentname == 'Viewcart') {
                            tempStaticPagesLinksContext.viewcart = tempnavroute;
                        } else if (tempcomponentname == 'AccountInformation') {
                            tempStaticPagesLinksContext.accountinfo = tempnavroute;
                        } else if (tempcomponentname == 'Checkout') {
                            tempStaticPagesLinksContext.Checkout = tempnavroute;
                        } else if (tempcomponentname == 'Orderhistory') {
                            tempStaticPagesLinksContext.Ordershistory = tempnavroute;
                        } else if (tempcomponentname == 'ProductInfo') {
                            tempStaticPagesLinksContext.ProductInfo = tempnavroute;
                        } else if (tempcomponentname == 'Signup') {
                            tempStaticPagesLinksContext.Signup = tempnavroute;
                        } else if (tempcomponentname == 'Login') {
                            tempStaticPagesLinksContext.Login = tempnavroute;
                        } else if (tempcomponentname == 'Wishlist') {
                            tempStaticPagesLinksContext.Wishlist = tempnavroute;
                        } else if (tempcomponentname == 'Policies') {
                            tempStaticPagesLinksContext.Policies = tempnavroute;
                        } else if (tempcomponentname == 'GeneralProductsComponent') {
                            tempStaticPagesLinksContext.GeneralProductsComponent = tempnavroute;
                        } else if (tempcomponentname == 'AppMenu') {
                            tempStaticPagesLinksContext.AppMenu = tempnavroute;
                        } else if (tempcomponentname == 'OrderDetails') {
                            tempStaticPagesLinksContext.OrderDetails = tempnavroute;
                        } else if (tempcomponentname == 'AddressDetails') {
                            tempStaticPagesLinksContext.AddressDetails = tempnavroute;
                        } else if (tempcomponentname == 'Filter') {
                            tempStaticPagesLinksContext.Filter = tempnavroute;
                        } else if (tempcomponentname == 'Search') {
                            tempStaticPagesLinksContext.Search = tempnavroute;
                        } else if (tempcomponentname == 'InnerCategory') {
                            tempStaticPagesLinksContext.InnerCategory = tempnavroute;
                        } else if (tempcomponentname == 'InnerParentCollection') {
                            tempStaticPagesLinksContext.InnerParentCollection = tempnavroute;
                        } else if (tempcomponentname == 'Ordersuccess') {
                            tempStaticPagesLinksContext.Ordersuccess = tempnavroute;
                        } else if (tempcomponentname == 'AddReview') {
                            tempStaticPagesLinksContext.AddReview = tempnavroute;
                        } else if (tempcomponentname == 'Afiiliatesignup') {
                            tempStaticPagesLinksContext.Afiiliatesignup = tempnavroute;
                        } else if (tempcomponentname == 'Innervendor') {
                            tempStaticPagesLinksContext.Innervendor = tempnavroute;
                        } else if (tempcomponentname == 'WaitingApprovalPage') {
                            tempStaticPagesLinksContext.WaitingApprovalPage = tempnavroute;
                        } else if (tempcomponentname == 'VendorPage') {
                            tempStaticPagesLinksContext.VendorPage = tempnavroute;
                        }
                    }
                }
            });

            setStaticPagesLinksContext({ ...tempStaticPagesLinksContext });
        }
    }, [fetch_inst_tabex_websitetemplatesQueryContext.isSuccess]);
    return (
        <TemplateRoutingContext.Provider
            value={{
                routingcountext,
                StaticPagesLinksContext,
                setStaticPagesLinksContext,
                routingtemp,
                routingtempinbottomnav,
            }}
        >
            {props.children}
        </TemplateRoutingContext.Provider>
    );
};
