import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { WebsiteDesignWorkPlaceContext } from '../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = () => {
    const { INSTAPIKEYCONTEXT } = React.useContext(WebsiteDesignWorkPlaceContext);
    const axiosheaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
    const serverbaselinkfunc = () => {
        var serverbaselinktemp = 'https://tabex-co.com/customerapi';
        return serverbaselinktemp;
    };
    const Fetchinstitutetemplate_API = async (axiosdata) => {
        var tempheaders = { ...axiosheaders };
        var authtoken = await AsyncStorage.getItem('token');
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        var tempaxiosdata = { ...axiosdata };
        tempaxiosdata.atoken = authtoken;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/fetchinstitutetemplate',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    const fetchAuthorization_API = async (axiosdata) => {
        axios.defaults.withCredentials = true;
        var tempheaders = { ...axiosheaders };
        var tempaxiosdata = { ...axiosdata };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/fetchAuthorization',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    const fetchproducts_API = async (axiosdata) => {
        var tempheaders = { ...axiosheaders };
        var tempaxiosdata = { ...axiosdata };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        var value = await AsyncStorage.getItem('cdata');
        tempaxiosdata.cdata = value;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/fetchproducts',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    const fetchProductInfo_API = async (axiosdata) => {
        var tempheaders = { ...axiosheaders };
        var tempaxiosdata = { ...axiosdata };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/fetchproductinfo',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    const fetchvendors_API = async (axiosdata) => {
        var tempheaders = { ...axiosheaders };
        var tempaxiosdata = { ...axiosdata };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        tempaxiosdata.instapikey = INSTAPIKEYCONTEXT;

        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/fetchvendors',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    const fetchcustomercart_API = async (axiosdata) => {
        var tempaxiosdata = { ...axiosdata };
        var tempheaders = { ...axiosheaders };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        tempaxiosdata.instapikey = INSTAPIKEYCONTEXT;
        var value = await AsyncStorage.getItem('cdata');
        tempaxiosdata.cdata = value;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/fetchcustomercart',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    const ExpoPushNotifregister_API = async (axiosdata) => {
        var tempaxiosdata = { ...axiosdata };
        var tempheaders = { ...axiosheaders };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        tempaxiosdata.instapikey = INSTAPIKEYCONTEXT;
        var value = await AsyncStorage.getItem('cdata');
        tempaxiosdata.cdata = value;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/expopushnotifregister',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    const deleteorder_API = async (axiosdata) => {
        var tempaxiosdata = { ...axiosdata };
        var tempheaders = { ...axiosheaders };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        tempaxiosdata.instapikey = INSTAPIKEYCONTEXT;
        var value = await AsyncStorage.getItem('cdata');
        tempaxiosdata.cdata = value;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/deleteorder',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    const DeleteAccount_API = async (axiosdata) => {
        var tempaxiosdata = { ...axiosdata };
        var tempheaders = { ...axiosheaders };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        tempaxiosdata.instapikey = INSTAPIKEYCONTEXT;
        var value = await AsyncStorage.getItem('cdata');
        tempaxiosdata.cdata = value;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/deleteaccount',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    // const General_API = (axiosdata) => {
    //     axios.defaults.withCredentials = true;
    //     var axiosdatatemp = { ...axiosdata };
    //     axiosdatatemp.instapikey = INSTAPIKEYCONTEXT;
    //     const axiosfetch = axios({
    //         method: 'post',
    //         url: serverbaselinkfunc() + '/customer/webapp' + axiosdatatemp.endpointurl,
    //         headers: tempaxiosdata,
    //         data: axiosdatatemp,
    //     });
    //     return axiosfetch;
    // };
    const General_API = async (axiosdata) => {
        var tempaxiosdata = { ...axiosdata };
        var tempheaders = { ...axiosheaders };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        tempaxiosdata.instapikey = INSTAPIKEYCONTEXT;
        var value = await AsyncStorage.getItem('cdata');
        tempaxiosdata.cdata = value;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp' + tempaxiosdata.endpointurl,
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    const AddtoCart_API = async (axiosdata) => {
        var tempaxiosdata = { ...axiosdata };
        var tempheaders = { ...axiosheaders };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        tempaxiosdata.instapikey = INSTAPIKEYCONTEXT;
        var value = await AsyncStorage.getItem('cdata');
        tempaxiosdata.cdata = value;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/addtocart',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    const fetchFavoriteProducts_API = async (axiosdata) => {
        var tempaxiosdata = { ...axiosdata };
        var tempheaders = { ...axiosheaders };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        tempaxiosdata.instapikey = INSTAPIKEYCONTEXT;
        var value = await AsyncStorage.getItem('cdata');
        tempaxiosdata.cdata = value;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/fetchfavoriteproducts',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    const ApplyPromoCode_API = async (axiosdata) => {
        var tempaxiosdata = { ...axiosdata };
        var tempheaders = { ...axiosheaders };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        tempaxiosdata.instapikey = INSTAPIKEYCONTEXT;
        var value = await AsyncStorage.getItem('cdata');
        tempaxiosdata.cdata = value;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/applypromocode',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    const fetchTabexCountriesStates_API = async (axiosdata) => {
        var tempaxiosdata = { ...axiosdata };
        var tempheaders = { ...axiosheaders };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/fetchTabexCountriesStates',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    const ChooseState_Country_API = async (axiosdata) => {
        var tempaxiosdata = { ...axiosdata };
        var tempheaders = { ...axiosheaders };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        tempaxiosdata.instapikey = INSTAPIKEYCONTEXT;
        var value = await AsyncStorage.getItem('cdata');
        tempaxiosdata.cdata = value;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/ChooseState_Country',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    const AddOrder_API = async (axiosdata) => {
        var tempaxiosdata = { ...axiosdata };
        var tempheaders = { ...axiosheaders };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        tempaxiosdata.instapikey = INSTAPIKEYCONTEXT;
        var value = await AsyncStorage.getItem('cdata');
        tempaxiosdata.cdata = value;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/AddOrderRouting',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    const fetchProductFeatures_API = async (axiosdata) => {
        var tempaxiosdata = { ...axiosdata };
        var tempheaders = { ...axiosheaders };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        tempaxiosdata.instapikey = INSTAPIKEYCONTEXT;
        var value = await AsyncStorage.getItem('cdata');
        tempaxiosdata.cdata = value;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/fetchproductfeatures',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    const fetchdynamicformfeilds_API = async (axiosdata) => {
        var tempaxiosdata = { ...axiosdata };
        var tempheaders = { ...axiosheaders };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        tempaxiosdata.instapikey = INSTAPIKEYCONTEXT;
        var value = await AsyncStorage.getItem('cdata');
        tempaxiosdata.cdata = value;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/fetchdynamicforms',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };

    const fetchcollections_API = async (axiosdata) => {
        var tempaxiosdata = { ...axiosdata };
        var tempheaders = { ...axiosheaders };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        tempaxiosdata.instapikey = INSTAPIKEYCONTEXT;
        var value = await AsyncStorage.getItem('cdata');
        tempaxiosdata.cdata = value;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/fetchcollections',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    const fetchCategories_API = async (axiosdata) => {
        var tempaxiosdata = { ...axiosdata };
        var tempheaders = { ...axiosheaders };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        tempaxiosdata.instapikey = INSTAPIKEYCONTEXT;
        var value = await AsyncStorage.getItem('cdata');
        tempaxiosdata.cdata = value;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/fetchcategories',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };

    const fetchorderhistory_API = async (axiosdata) => {
        var tempheaders = { ...axiosheaders };
        var tempaxiosdata = { ...axiosdata };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/fetchorderhistory',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };

    const fetchinstitutecustomerinfosignup_API = async (axiosdata) => {
        var tempheaders = { ...axiosheaders };
        var tempaxiosdata = { ...axiosdata };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/fetchinstitutecustomerinfosignup',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    const fetchInstitutePolicies_API = async (axiosdata) => {
        var tempheaders = { ...axiosheaders };
        var tempaxiosdata = { ...axiosdata };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/fetchInstitutePolicies',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    const CustomerSignUp_API = async (axiosdata) => {
        var tempheaders = { ...axiosheaders };
        var tempaxiosdata = { ...axiosdata };
        var value = await AsyncStorage.getItem('cdata');
        tempaxiosdata.cdata = value;
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/signup',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    const Login_API = async (axiosdata) => {
        var tempheaders = { ...axiosheaders };
        var tempaxiosdata = { ...axiosdata };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        var value = await AsyncStorage.getItem('cdata');
        tempaxiosdata.cdata = value;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        axios.defaults.withCredentials = true;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/login',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    // const SocialLoginMutation_API = async (axiosdata) => {
    //     axios.defaults.withCredentials = true;
    //     var tempaxiosdata = { instapikey: INSTAPIKEYCONTEXT };
    //     var tempheaders = { ...axiosheaders };
    //     var authtoken = await AsyncStorage.getItem('token');
    //     tempaxiosdata.atoken = authtoken;
    //     var valueCurrency = await AsyncStorage.getItem('currency');
    //     tempaxiosdata.currencyid = valueCurrency;
    //     var langValue = await AsyncStorage.getItem('lang');
    //     tempaxiosdata.lang = langValue;
    //     const axiosfetch = axios({
    //         method: 'post',
    //         url: serverbaselinkfunc() + '/customer/webapp/SocialLogin',
    //         headers: tempheaders,
    //         data: tempaxiosdata,
    //     });
    //     return axiosfetch;
    // };
    const SocialLoginMutation_API = async (axiosdata) => {
        axios.defaults.withCredentials = true;
        var tempaxiosdata = { ...axiosdata };
        tempaxiosdata.instapikey = INSTAPIKEYCONTEXT;
        var tempheaders = { ...axiosheaders };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        var value = await AsyncStorage.getItem('cdata');
        tempaxiosdata.cdata = value;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/SocialLogin',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };

    const Logout_API = async (axiosdata) => {
        axios.defaults.withCredentials = true;
        var tempaxiosdata = { instapikey: INSTAPIKEYCONTEXT };
        var tempheaders = { ...axiosheaders };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/logout',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    // const ViewersAdderReport_API = async (axiosdata) => {
    //     // axios.defaults.withCredentials = true;
    //     var axiosda = { instapikey: INSTAPIKEYCONTEXT, fromsrcview: 'mobapp' };
    //     var valueCurrency = await AsyncStorage.getItem('currency');
    //     tempaxiosdata.currencyid = valueCurrency;
    //     var langValue = await AsyncStorage.getItem('lang');
    //     tempaxiosdata.lang = langValue;
    //     const axiosfetch = axios({
    //         method: 'post',
    //         url: serverbaselinkfunc() + '/customer/webapp/ViewersAdderReport',
    //         headers: tempaxiosdata,
    //         data: axiosda,
    //     });
    //     return axiosfetch;
    // };
    const SearcHeader_API = async (axiosdata) => {
        var tempaxiosdata = { ...axiosdata };
        var tempheaders = { ...axiosheaders };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        tempaxiosdata.instapikey = INSTAPIKEYCONTEXT;
        var value = await AsyncStorage.getItem('cdata');
        tempaxiosdata.cdata = value;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/SearcHeader',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    const FetchRelatedProducts_API = async (axiosdata) => {
        var tempaxiosdata = { ...axiosdata };
        var tempheaders = { ...axiosheaders };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        tempaxiosdata.instapikey = INSTAPIKEYCONTEXT;
        var value = await AsyncStorage.getItem('cdata');
        tempaxiosdata.cdata = value;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'get',
            url: serverbaselinkfunc() + '/customer/webapp/FetchRelatedProducts',
            headers: tempheaders,
            params: tempaxiosdata,
        });
        return axiosfetch;
    };
    const FetchCustomerStatus_API = async (axiosdata) => {
        var tempaxiosdata = { ...axiosdata };
        var tempheaders = { ...axiosheaders };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        tempaxiosdata.instapikey = INSTAPIKEYCONTEXT;
        var value = await AsyncStorage.getItem('cdata');
        tempaxiosdata.cdata = value;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/fetchinstitutecustomerorderstatus',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    const Forgotpassword_API = async (axiosdata) => {
        axios.defaults.withCredentials = true;
        var tempaxiosdata = { ...axiosdata };
        var tempheaders = { ...axiosheaders };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        tempaxiosdata.instapikey = INSTAPIKEYCONTEXT;
        var value = await AsyncStorage.getItem('cdata');
        tempaxiosdata.cdata = value;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/forgetpassword',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    const fetchvendorinfo_API = async (axiosdata) => {
        axios.defaults.withCredentials = true;
        var tempaxiosdata = { ...axiosdata };
        var tempheaders = { ...axiosheaders };
        var authtoken = await AsyncStorage.getItem('token');
        tempaxiosdata.atoken = authtoken;
        tempaxiosdata.instapikey = INSTAPIKEYCONTEXT;
        var value = await AsyncStorage.getItem('cdata');
        tempaxiosdata.cdata = value;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempaxiosdata.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempaxiosdata.lang = langValue;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinkfunc() + '/customer/webapp/fetchvendorinfo',
            headers: tempheaders,
            data: tempaxiosdata,
        });
        return axiosfetch;
    };
    return {
        General_API,
        Fetchinstitutetemplate_API,
        SearcHeader_API,
        fetchAuthorization_API,
        fetchproducts_API,
        fetchcollections_API,
        fetchorderhistory_API,
        fetchinstitutecustomerinfosignup_API,
        fetchProductInfo_API,
        fetchvendors_API,
        AddtoCart_API,
        fetchcustomercart_API,
        ApplyPromoCode_API,
        fetchTabexCountriesStates_API,
        ChooseState_Country_API,
        fetchFavoriteProducts_API,
        fetchInstitutePolicies_API,
        fetchCategories_API,
        AddOrder_API,
        Login_API,
        CustomerSignUp_API,
        fetchdynamicformfeilds_API,
        Logout_API,
        SocialLoginMutation_API,
        FetchCustomerStatus_API,
        deleteorder_API,
        fetchProductFeatures_API,
        ExpoPushNotifregister_API,
        Forgotpassword_API,
        DeleteAccount_API,
        fetchvendorinfo_API,
    };
};
export default API;
