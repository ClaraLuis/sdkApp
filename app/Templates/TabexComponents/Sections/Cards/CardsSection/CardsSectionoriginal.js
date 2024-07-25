// import React, { useEffect, useState, useContext, useMemo } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, Platform } from 'react-native';
// import { LanguageContext } from '../../../../LanguageContext/LanguageContext';
// import { FetchingContext } from '../../../../FetchingContext/FetchingContext';
// import { WebsiteDesignWorkPlaceContext } from '../../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
// import { ProductsCardsSectionContext } from '../ProductsCardsSectionContext';
// import { useInfiniteQuery, useQuery } from 'react-query';
// import { useInView } from 'react-intersection-observer';
// import axios from 'axios';
// import generalstyles from '../../../GeneralFiles/Stylesheet/Stylesheet';
// import SpinnerButton from 'react-native-spinner-button';
// import { icons, SIZES } from '../../../GeneralFiles/constants';
// import { TemplateRoutingContext } from '../../../../TemplateRoutingContext';
// import { useNavigation } from '@react-navigation/native';
// import API from '../../../../API/API';
// import { AntDesign, Ionicons } from '@expo/vector-icons';
// // import RecyclerViewComp from '../RecyclerViewComp';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useIsFocused } from '@react-navigation/native';
// import FilterHorizontal from '../../../StaticPages/Filter/FilterHorizontal';

// const CardsSection = (props) => {
//     const isFocused = useIsFocused();
//     const { fetchcollections_API, fetchvendors_API } = API();
//     const navigation = useNavigation();
//     const { ref, inView } = useInView();
//     const { lang, langdetect } = useContext(LanguageContext);
//     const { StyleParseToIntFuncContext, INSTAPIKEYCONTEXT, TabexSectionsComponentsContext } = useContext(WebsiteDesignWorkPlaceContext);
//     const {
//         VendorsArrgeneralFilterContext,
//         setVendorsArrgeneralFilterContext,
//         fetchAuthorizationQueryContext,
//         fetchcustomercartQueryContext,
//         FetchQueriesEngineContext,
//         SearchHeaderMutationContext,
//         favoriteprojectscountContext,
//     } = useContext(FetchingContext);
//     const { ProductFilterObjContext, setProductFilterObjContext } = useContext(ProductsCardsSectionContext);
//     const { StaticPagesLinksContext, routingcountext } = useContext(TemplateRoutingContext);
//     const [sectionproperties, setsectionproperties] = useState('');
//     const [isproductsfetching, setisproductsfetching] = useState(false);
//     const [cardsarray, setcardsarray] = useState([]);
//     const [fetchingtype, setfetchingtype] = useState('');
//     const [sectionitem, setsectionitem] = useState('');
//     const [VendorsarrcollectionqueryArr, setVendorsarrcollectionqueryArr] = useState('');
//     const [StatePageProperties, setStatePageProperties] = useState({});
//     const [ParentCollectionsForCollectionQueryArr, setParentCollectionsForCollectionQueryArr] = useState('');
//     const fetchcollectionsQueryContext = useQuery(
//         ['fetchcollections_API' + JSON.stringify(ParentCollectionsForCollectionQueryArr) + JSON.stringify(VendorsarrcollectionqueryArr)],
//         () => fetchcollections_API({ parentcollectionid: ParentCollectionsForCollectionQueryArr, vendorsarr: VendorsarrcollectionqueryArr }),
//         {
//             keepPreviousData: true,
//             staleTime: Infinity,
//             enabled: INSTAPIKEYCONTEXT.length != 0 && ParentCollectionsForCollectionQueryArr.length != 0 ? true : false,
//         },
//     );
//     const FetchProductsAxios = async (axiosdatatemp) => {
//         var tempProductFilterObjContext = { ...ProductFilterObjContext };
//         tempProductFilterObjContext.page = axiosdatatemp;
//         // setProductFilterObjContext({ ...tempProductFilterObjContext });
//         tempProductFilterObjContext.instapikey = INSTAPIKEYCONTEXT;

//         var serverbaselinktemp = 'https://tabex-co.com/customerapi';
//         var authtoken = await AsyncStorage.getItem('token');
//         tempProductFilterObjContext.atoken = authtoken;
//         var valueCurrency = await AsyncStorage.getItem('currency');
//         tempProductFilterObjContext.currencyid = valueCurrency;
//         var langValue = await AsyncStorage.getItem('lang');
//         tempProductFilterObjContext.lang = langValue;
//         var value = await AsyncStorage.getItem('cdata');
//         tempProductFilterObjContext.cdata = value;
//         const axiosfetch = axios({
//             method: 'post',
//             url: serverbaselinktemp + '/customer/webapp/fetchproducts',
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             data: tempProductFilterObjContext,
//         });
//         return axiosfetch;
//     };
//     const fetchProductsQuery = useInfiniteQuery(['fetchproducts_API' + JSON.stringify(ProductFilterObjContext)], ({ pageParam = 0 }) => FetchProductsAxios(pageParam), {
//         keepPreviousData: true,
//         staleTime: Infinity,
//         enabled:
//             INSTAPIKEYCONTEXT.length != 0 && fetchingtype == 'products' && ProductFilterObjContext.ProductFetchingType != undefined && ProductFilterObjContext.ProductFetchingType.length != 0
//                 ? true
//                 : false,
//         initialPageParam: 0,
//         getNextPageParam: (lastPage, allPages) => {
//             var currentpagefrombackend = lastPage.data.page;

//             if (currentpagefrombackend == 'full') {
//                 return undefined;
//             } else {
//                 var nextpage = parseInt(currentpagefrombackend) + 1;
//                 return nextpage;
//             }
//         },

//         getPreviousPageParam: (firstPage, allPages) => firstPage.data.page - 1,
//     });
//     // const FetchVendorsQuery = useQuery(['FetchVendors_API' + props.collectionidprops], () => fetchvendors_API({ collections: [props.collectionidprops] }), {
//     const FetchVendorsQuery = useQuery(['FetchVendors_API' + JSON.stringify(ProductFilterObjContext)], () => fetchvendors_API(ProductFilterObjContext), {
//         keepPreviousData: true,
//         staleTime: Infinity,
//         enabled: INSTAPIKEYCONTEXT.length != 0 && fetchingtype == 'vendors' ? true : false,
//     });
//     React.useEffect(() => {
//         if (inView) {
//             fetchProductsQuery.fetchNextPage();
//         }
//     }, [inView]);
//     const [ProductsFetchingTypeSectionObj, setProductsFetchingTypeSectionObj] = useState({ productfetchingtype: 'Random', collectionid: '', grouptype: '', grouptyperefid: '' });
//     useEffect(() => {
//         // if (sectionproperties != undefined) {
//         // if (sectionproperties.view_as_slider_vertical == 'Slider (Horizontal)') {
//         // setVendorsArrgeneralFilterContext([]);
//         // } else {
//         if (props.vendorsarrpassed != undefined && props.vendorsarrpassed != null) {
//             if (Array.isArray(props.vendorsarrpassed)) {
//                 setVendorsArrgeneralFilterContext(props.vendorsarrpassed);
//             } else {
//                 setVendorsArrgeneralFilterContext([props.vendorsarrpassed]);
//             }
//         }
//     }, [props.vendorsarrpassed]);
//     useEffect(() => {
//         if (VendorsArrgeneralFilterContext != undefined && VendorsArrgeneralFilterContext != null) {
//             setVendorsarrcollectionqueryArr(VendorsArrgeneralFilterContext);
//         } else {
//             setVendorsarrcollectionqueryArr([]);
//         }
//     }, [VendorsArrgeneralFilterContext]);
//     useEffect(() => {
//         if (VendorsarrcollectionqueryArr != undefined) {
//             // alert(VendorsarrcollectionqueryArr);
//             if (Array.isArray(VendorsarrcollectionqueryArr)) {
//                 setProductFilterObjContext({ ...ProductFilterObjContext, vendorsarr: VendorsarrcollectionqueryArr });
//             } else {
//                 setProductFilterObjContext({ ...ProductFilterObjContext, vendorsarr: [VendorsarrcollectionqueryArr] });
//             }
//         } else {
//             setProductFilterObjContext({ ...ProductFilterObjContext, vendorsarr: [] });
//         }
//     }, [VendorsarrcollectionqueryArr]);
//     useEffect(() => {
//         if (props.StatePagePropertiesprops != undefined) {
//             setStatePageProperties(props.StatePagePropertiesprops);
//         }
//     }, [props.StatePagePropertiesprops]);
//     useEffect(() => {
//         if (Object.keys(StatePageProperties).length != 0) {
//             StatePageProperties?.pageobj?.sections?.forEach(function (sectionitem, sectionindex) {
//                 if (sectionitem.sectionid == props.sectionidprops) {
//                     setsectionitem(sectionitem);
//                     var secpropobj = {};
//                     sectionitem.sectionproperties.forEach(function (sectionpropertiesobj, sectionpropertiesindex) {
//                         secpropobj[sectionpropertiesobj.property_css_name] = sectionpropertiesobj.property_value;
//                     });
//                     setsectionproperties({ ...secpropobj });
//                     if (props.srcfromprops == 'GeneralProductsComponent') {
//                         setfetchingtype('products');
//                         var lcproductfetchingtype = 'Random';
//                         if (props?.fetchingtypepassedprops != undefined && props?.fetchingtypepassedprops != null && props?.fetchingtypepassedprops.length != 0) {
//                             lcproductfetchingtype = props?.fetchingtypepassedprops;
//                         }
//                         if (props.parenttype == 'Parent Collections') {
//                             setProductsFetchingTypeSectionObj({
//                                 // productfetchingtype: 'Parent Collection',
//                                 // collectionid: '64afd7fe76979',

//                                 productfetchingtype: 'Parent Collection',
//                                 collectionid: props.collectionidprops,
//                                 grouptype: props.grouptypeprops,
//                                 grouptyperefid: props.grouptyperefidprops,
//                             });
//                         } else {
//                             setProductsFetchingTypeSectionObj({
//                                 // productfetchingtype: 'Parent Collection',
//                                 // collectionid: '64afd7fe76979',
//                                 //Aya
//                                 // productfetchingtype: 'Random',
//                                 productfetchingtype: lcproductfetchingtype,
//                                 collectionid: props.collectionidprops,
//                                 grouptype: props.grouptypeprops,
//                                 grouptyperefid: props.grouptyperefidprops,
//                             });
//                         }
//                     } else if (props.srcfromprops == 'InnerGroups' || props.srcfromprops == 'InnerCategory' || props.srcfromprops == 'InnerParentCollection') {
//                         setfetchingtype(props.fetchingtypepassedprops);
//                     } else if (props.srcfromprops == 'innervendors') {
//                         var tempProductFilterObjContext = { ...ProductFilterObjContext };
//                         if (props.collectionidprops != undefined && props.collectionidprops != null) {
//                             tempProductFilterObjContext.collections.push(props.collectionidprops);
//                         }
//                         if (props.Countryidpassed != undefined && props.Countryidpassed != null && props?.Countryidpassed?.length != 0) {
//                             tempProductFilterObjContext.countryid = props.Countryidpassed;
//                         }
//                         if (props.Stateidpassed != undefined && props.Stateidpassed != null && props?.Stateidpassed?.length != 0) {
//                             tempProductFilterObjContext.stateid = props.Stateidpassed;
//                         }
//                         if (props.Cityidpassed != undefined && props.Cityidpassed != null && props?.Cityidpassed?.length != 0) {
//                             tempProductFilterObjContext.cityid = props.Cityidpassed;
//                         }
//                         setProductFilterObjContext({ ...tempProductFilterObjContext });
//                         setfetchingtype('vendors');
//                     } else {
//                         setfetchingtype(sectionitem.fetchingtype);
//                         setProductsFetchingTypeSectionObj({
//                             productfetchingtype: sectionitem.productsfetchingtype,
//                             collectionid: sectionitem.productsfetchingtypeCollectioncollectionid,
//                             grouptype: props.grouptypeprops,
//                             grouptyperefid: props.grouptyperefidprops,
//                         });
//                     }
//                 }
//             });
//         }
//     }, [StatePageProperties]);
//     useEffect(() => {
//         if (sectionproperties.length != 0) {
//             if (cardsarray.length == 0) {
//                 if (fetchingtype == 'collections') {
//                     if (fetchcollectionsQueryContext != undefined && fetchcollectionsQueryContext.isSuccess) {
//                         cardobjassigner(fetchcollectionsQueryContext.data.data.collections);
//                     }
//                 } else if (fetchingtype == 'products') {
//                     if (fetchProductsQuery.isSuccess) {
//                         var allpagesarr = [];
//                         fetchProductsQuery.data.pages.forEach((page) => {
//                             page.data.products.forEach((productobj) => {
//                                 allpagesarr.push(productobj);
//                             });
//                         });
//                         cardobjassigner(allpagesarr);
//                     }
//                 } else if (fetchingtype == 'categories') {
//                     if (fetchAuthorizationQueryContext?.isSuccess) {
//                         var categories = fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcategories;
//                         cardobjassigner(categories);
//                     }
//                 } else if (fetchingtype == 'parentcollections' || fetchingtype == 'innercategories') {
//                     if (fetchAuthorizationQueryContext?.isSuccess) {
//                         var categories = fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcategories;
//                         var parentcollections = [];
//                         categories?.forEach(function (catitem, catindex) {
//                             catitem?.parentcolletions.forEach(function (parentcolitem) {
//                                 parentcolitem.categoryid = catitem.categoryid;
//                                 parentcollections.push(parentcolitem);
//                             });
//                         });
//                         if (fetchingtype == 'parentcollections') {
//                             if (
//                                 sectionitem?.productsfetchingtypeparentcollectioncategoryid != null &&
//                                 sectionitem?.productsfetchingtypeparentcollectioncategoryid != undefined &&
//                                 sectionitem?.productsfetchingtypeparentcollectioncategoryid != 'all'
//                             ) {
//                                 var arrafterfilter = [];
//                                 parentcollections.forEach(function (parentcolitem, parcolindex) {
//                                     if (parentcolitem.categoryid == sectionitem?.productsfetchingtypeparentcollectioncategoryid) {
//                                         arrafterfilter.push(parentcolitem);
//                                     }
//                                 });
//                                 parentcollections = arrafterfilter;
//                             }
//                         }
//                         if (fetchingtype == 'innercategories') {
//                             if (props.collectionidprops != undefined && props.collectionidprops != null && props.collectionidprops != '' && props.collectionidprops?.length != 0) {
//                                 var arrafterfilter = [];
//                                 parentcollections.forEach(function (parentcolitem, parcolindex) {
//                                     if (parentcolitem.categoryid == props.collectionidprops) {
//                                         arrafterfilter.push(parentcolitem);
//                                     }
//                                 });
//                                 parentcollections = arrafterfilter;
//                             }
//                         }

//                         cardobjassigner(parentcollections);
//                     }
//                 } else if (fetchingtype == 'innerparentcollections') {
//                     if (fetchAuthorizationQueryContext?.isSuccess) {
//                         var categories = fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcategories;
//                         var collections = [];
//                         categories?.forEach(function (catitem, catindex) {
//                             catitem?.parentcolletions.forEach(function (parentcolitem) {
//                                 parentcolitem.categoryid = catitem.categoryid;
//                                 parentcolitem?.collections?.forEach(function (collitem, colindex) {
//                                     collitem.parentcollectionid = parentcolitem.parentcollectionid;
//                                     collections.push(collitem);
//                                 });
//                             });
//                         });
//                         if (fetchingtype == 'innerparentcollections') {
//                             var collectionsafterfilter = [];
//                             collections.forEach(function (colitem, colindex) {
//                                 if (colitem.parentcollectionid == props.collectionidprops) {
//                                     var iscollexists = false;
//                                     collectionsafterfilter.forEach(function (existcolitem) {
//                                         if (colitem.collectionid == existcolitem.collectionid) {
//                                             iscollexists = true;
//                                         }
//                                     });
//                                     if (iscollexists == false) {
//                                         collectionsafterfilter.push(colitem);
//                                     }
//                                 }
//                             });
//                             collections = collectionsafterfilter;
//                         }
//                         cardobjassigner(collections);
//                     }
//                 } else if (fetchingtype == 'vendors') {
//                     if (FetchVendorsQuery.isSuccess) {
//                         cardobjassigner(FetchVendorsQuery?.data?.data?.vendors);
//                     }
//                 }
//             }
//         }
//     }, [sectionproperties, fetchcollectionsQueryContext.isSuccess, fetchAuthorizationQueryContext.isSuccess]);
//     useEffect(() => {
//         if (fetchingtype.length != 0) {
//             if (fetchingtype == 'collections') {
//                 var tempFetchQueriesEngineContext = FetchQueriesEngineContext;
//                 if (ProductsFetchingTypeSectionObj.collectionid == 'all' || ProductsFetchingTypeSectionObj.collectionid == null || ProductsFetchingTypeSectionObj.collectionid == undefined) {
//                     setParentCollectionsForCollectionQueryArr('all');
//                 } else {
//                     setParentCollectionsForCollectionQueryArr([ProductsFetchingTypeSectionObj.collectionid]);
//                 }
//             }
//             if (fetchingtype == 'products') {
//                 var tempfetchproductsfilerobjcontext = ProductFilterObjContext;
//                 tempfetchproductsfilerobjcontext.ProductFetchingType = ProductsFetchingTypeSectionObj.productfetchingtype;
//                 // tempfetchproductsfilerobjcontext.collections.push(ProductsFetchingTypeSectionObj.collectionid);
//                 if (
//                     ProductsFetchingTypeSectionObj.grouptype == 'collections' ||
//                     ProductsFetchingTypeSectionObj.grouptype == 'categories' ||
//                     ProductsFetchingTypeSectionObj.grouptype == 'parentcollections'
//                 ) {
//                 } else {
//                     tempfetchproductsfilerobjcontext.collections.push(ProductsFetchingTypeSectionObj.collectionid);
//                 }
//                 if (props.vendorsarrpassed != undefined) {
//                     tempfetchproductsfilerobjcontext.vendorsarr = props.vendorsarrpassed;
//                 }
//                 tempfetchproductsfilerobjcontext.grouptype = ProductsFetchingTypeSectionObj.grouptype;
//                 tempfetchproductsfilerobjcontext.grouptyperefid = ProductsFetchingTypeSectionObj.grouptyperefid;
//                 if (props.Countryidpassed != undefined && props.Countryidpassed != null && props?.Countryidpassed?.length != 0) {
//                     tempfetchproductsfilerobjcontext.country_ids = [props.Countryidpassed];
//                 }
//                 if (props.Stateidpassed != undefined && props.Stateidpassed != null && props?.Stateidpassed?.length != 0) {
//                     tempfetchproductsfilerobjcontext.state_ids = [props.Stateidpassed];
//                 }
//                 if (props.Cityidpassed != undefined && props.Cityidpassed != null && props?.Cityidpassed?.length != 0) {
//                     tempfetchproductsfilerobjcontext.city_ids = [props.Cityidpassed];
//                 }
//                 if (props.price_minpassed != undefined && props.price_minpassed != null && props?.price_minpassed?.length != 0) {
//                     tempfetchproductsfilerobjcontext.price_min = props?.price_minpassed;
//                 }
//                 if (props.price_maxpassed != undefined && props.price_maxpassed != null && props?.price_maxpassed?.length != 0) {
//                     tempfetchproductsfilerobjcontext.price_max = props?.price_maxpassed;
//                 }
//                 setProductFilterObjContext({ ...tempfetchproductsfilerobjcontext });
//             }
//         }
//     }, [fetchingtype, ProductsFetchingTypeSectionObj]);
//     useEffect(() => {
//         if (fetchProductsQuery.isFetching) {
//             setisproductsfetching(true);
//         } else {
//             setisproductsfetching(false);
//         }
//     }, [fetchProductsQuery.isFetching]);
//     useEffect(() => {
//         if (fetchcollectionsQueryContext.isFetching) {
//             setisproductsfetching(true);
//         } else {
//             setisproductsfetching(false);
//         }
//     }, [fetchcollectionsQueryContext.isFetching]);
//     useEffect(() => {
//         if (fetchingtype == 'products') {
//             if (fetchProductsQuery.isSuccess) {
//                 var allpagesarr = [];
//                 fetchProductsQuery.data.pages.forEach((page) => {
//                     page.data.products.forEach((productobj) => {
//                         allpagesarr.push(productobj);
//                     });
//                 });

//                 cardobjassigner(allpagesarr);
//             }
//         }
//     }, [fetchProductsQuery.isSuccess, fetchProductsQuery.dataUpdatedAt, fetchProductsQuery.data, favoriteprojectscountContext]);
//     useEffect(() => {
//         if (fetchingtype == 'vendors') {
//             if (FetchVendorsQuery.isSuccess) {
//                 if (FetchVendorsQuery.data.data.vendors != undefined) {
//                     cardobjassigner(FetchVendorsQuery?.data?.data?.vendors);
//                 }
//             }
//         }
//     }, [FetchVendorsQuery.isSuccess, FetchVendorsQuery.data, FetchVendorsQuery.dataUpdatedAt]);
//     useEffect(() => {
//         if (fetchingtype == 'collections') {
//             if (fetchcollectionsQueryContext.isSuccess) {
//                 cardobjassigner(fetchcollectionsQueryContext.data.data.collections);
//             }
//         }
//     }, [fetchcollectionsQueryContext.isSuccess]);
//     useEffect(() => {
//         favassigner();
//     }, [favoriteprojectscountContext]);
//     useEffect(() => {
//         if (props.scrollviewtoend) {
//             if (sectionproperties?.view_as_slider_vertical != 'Slider (Horizontal)') {
//                 loadMore();
//             }
//         }
//     }, [props.scrollviewtoend]);
//     const favassigner = () => {
//         if (fetchingtype == 'products') {
//             if (cardsarray.length != 0) {
//                 if (favoriteprojectscountContext != undefined && Array.isArray(favoriteprojectscountContext)) {
//                     var tempcardsarray = [...cardsarray];
//                     tempcardsarray.forEach(function (arrayItem, arrayindex) {
//                         arrayItem.IsFavExists = false;
//                     });
//                     tempcardsarray.forEach(function (arrayItem, arrayindex) {
//                         favoriteprojectscountContext.forEach(function (favitem, favindex) {
//                             if (arrayItem.productid == favitem) {
//                                 arrayItem.IsFavExists = true;
//                             }
//                         });
//                     });
//                     setcardsarray([...tempcardsarray]);
//                 }
//             }
//         }
//     };
//     const cardobjassigner = (fetchedarray) => {
//         var temparray = [];
//         fetchedarray?.forEach(function (arrayItem, arrayindex) {
//             var cardobj = {
//                 name: '',
//                 image: '',
//             };
//             if (fetchingtype == 'products') {
//                 var itemquantity = 0;
//                 if (langdetect == 'en') {
//                     cardobj.name = arrayItem.productinfo.name_en;
//                 } else {
//                     cardobj.name = arrayItem.productinfo.name_ar;
//                 }
//                 if (arrayItem.productinfo.hasvariants == 0) {
//                     fetchcustomercartQueryContext?.data?.data?.customercart?.cartitems?.forEach(function (cartitem, cartindex) {
//                         if (cartitem.productid == arrayItem.productinfo.productid) {
//                             itemquantity = cartitem.quantity;
//                         }
//                     });
//                 }
//                 cardobj.image = arrayItem.productinfo.productmainimage;
//                 cardobj.productid = arrayItem.productinfo.productid;
//                 cardobj.description_en = arrayItem.productinfo.description_en;
//                 cardobj.description_ar = arrayItem.productinfo.description_ar;
//                 cardobj.defaultprice = arrayItem.productinfo.defaultprice;
//                 cardobj.defaultsaleprice = arrayItem.productinfo.defaultsaleprice;
//                 cardobj.productimages = arrayItem.productinfo.productimages;
//                 cardobj.timestamp = arrayItem.productinfo.timestamp;
//                 cardobj.hassale = arrayItem.productinfo.hassale;
//                 cardobj.quantity = itemquantity;
//                 cardobj.hasvariants = arrayItem.productinfo.hasvariants;
//                 cardobj.productoverallrate = arrayItem.productinfo.productoverallrate;
//                 cardobj.productcanrate = arrayItem.productinfo.productcanrate;
//                 cardobj.productquantity = arrayItem.productinfo.productquantity;
//                 cardobj.quantavailtype = arrayItem.productinfo.quantavailtype;
//                 cardobj.isproducttobesold = arrayItem.productinfo.isproducttobesold;
//                 cardobj.maximumproductquant = arrayItem.productinfo.maximumproductquant;
//                 cardobj.minimumproductquant = arrayItem.productinfo.minimumproductquant;
//                 cardobj.prodaffpercentprofit = arrayItem.productinfo.prodaffpercentprofit;
//                 cardobj.productcashbackvalue = arrayItem.productinfo.productcashbackvalue;
//                 cardobj.currentquantity = arrayItem.productinfo.currentquantity;
//                 cardobj.measurmentunit = arrayItem.productinfo.measurmentunit;
//                 cardobj.product_phonenumber = arrayItem.productinfo.product_phonenumber;

//                 if (langdetect == 'en') {
//                     cardobj.currencyname = fetchAuthorizationQueryContext?.data?.data?.currencyname_en;
//                 } else {
//                     cardobj.currencyname = fetchAuthorizationQueryContext?.data?.data?.currencyname_ar;
//                 }

//                 if (favoriteprojectscountContext != undefined && favoriteprojectscountContext.length != 0) {
//                     favoriteprojectscountContext.forEach(function (favitem, favindex) {
//                         if (arrayItem.productinfo.productid == favitem) {
//                             cardobj.IsFavExists = true;
//                         }
//                     });
//                 }
//             } else if (fetchingtype == 'collections' || fetchingtype == 'innerparentcollections') {
//                 cardobj.collectionid = arrayItem.collectionid;
//                 if (langdetect == 'en') {
//                     cardobj.name = arrayItem.title_en;
//                 } else {
//                     cardobj.name = arrayItem.title_ar;
//                 }
//                 cardobj.description_en = arrayItem.description_en;
//                 cardobj.description_ar = arrayItem.description_ar;
//                 cardobj.image = arrayItem.collectionlogo;
//             } else if (fetchingtype == 'categories') {
//                 cardobj.collectionid = arrayItem.categoryid;
//                 if (langdetect == 'en') {
//                     cardobj.name = arrayItem.title_en;
//                     cardobj.description = arrayItem.description_en;
//                 } else if (langdetect == 'ar') {
//                     cardobj.name = arrayItem.title_ar;
//                     cardobj.description = arrayItem.description_ar;
//                 }
//                 cardobj.image = arrayItem.categorylogo;
//             } else if (fetchingtype == 'parentcollections' || fetchingtype == 'innercategories') {
//                 cardobj.collectionid = arrayItem.parentcollectionid;
//                 if (langdetect == 'en') {
//                     cardobj.name = arrayItem.title_en;
//                     cardobj.description = arrayItem.description_en;
//                 } else if (langdetect == 'ar') {
//                     cardobj.name = arrayItem.title_ar;
//                     cardobj.description = arrayItem.description_ar;
//                 }
//                 cardobj.image = arrayItem.parentcollectionlogo;
//             } else if (fetchingtype == 'custom') {
//             } else if (fetchingtype == 'vendors') {
//                 cardobj.name = arrayItem.vendorname;
//                 cardobj.collectionid = arrayItem.vendorid;
//                 cardobj.image = arrayItem.vendorlogourl;
//             }
//             temparray.push(cardobj);
//         });

//         setcardsarray([...temparray]);
//     };
//     const renderSpinner = () => {
//         return (
//             <View style={[generalstyles.allcentered, { height: 100, marginLeft: 'auto', marginRight: 'auto' }]}>
//                 <SpinnerButton buttonStyle={{ width: 30, height: 30 }} isLoading={true} indicatorCount={10} spinnerType={'MaterialIndicator'} spinnerColor={'#000'}></SpinnerButton>
//             </View>
//         );
//     };
//     const loadMore = () => {
//         if (fetchProductsQuery.hasNextPage) {
//             fetchProductsQuery.fetchNextPage();
//         }
//     };
//     const setProductFilterObjContextPassingparams = (newobj) => {
//         setProductFilterObjContext({ ...newobj });
//     };
//     const generalproductsnavigation = () => {
//         if (fetchingtype == 'products') {
//             if (ProductsFetchingTypeSectionObj.productfetchingtype == 'Collection') {
//                 navigation.navigate('TemplateDraftRouter', {
//                     screen: StaticPagesLinksContext.GeneralProductsComponent,
//                     params: {
//                         genprodcompstinfo: {
//                             collectionid: ProductsFetchingTypeSectionObj.collectionid,
//                             srcfrom: 'GeneralProductsComponent',
//                             fetchingtype: sectionitem?.productsfetchingtype,
//                         },
//                     },
//                 });
//                 // routingcountext(StaticPagesLinksContext.GeneralProductsComponent, true, ProductsFetchingTypeSectionObj.collectionid);
//                 // alert(ProductsFetchingTypeSectionObj.collectionid);
//             } else {
//                 // navigation.navigate(StaticPagesLinksContext.GeneralProductsComponent);
//                 navigation.navigate('TemplateDraftRouter', {
//                     screen: StaticPagesLinksContext.GeneralProductsComponent,
//                     params: {
//                         genprodcompstinfo: {
//                             // collectionid: ProductsFetchingTypeSectionObj.collectionid,
//                             srcfrom: 'GeneralProductsComponent',
//                             fetchingtype: sectionitem?.productsfetchingtype,
//                         },
//                     },
//                 });
//             }
//         } else if (fetchingtype == 'parentcollections') {
//             routingcountext(StaticPagesLinksContext.InnerCategory, {
//                 genprodcompstinfo: { collectionid: sectionitem?.productsfetchingtypeparentcollectioncategoryid, srcfrom: 'InnerCategory', fetchingtype: 'innercategories' },
//             });
//         }
//         //  else if (fetchingtype == 'vendors') {
//         //     // routingcountext(StaticPagesLinksContext.InnerCategory, {
//         //     //     genprodcompstinfo: { collectionid: sectionitem?.productsfetchingtypeparentcollectioncategoryid, srcfrom: 'InnerCategory', fetchingtype: 'innercategories' },
//         //     // });
//         // }
//         else {
//             navigation.navigate(StaticPagesLinksContext.GeneralProductsComponent);
//         }
//     };
//     const doesfetchhasnextproducts = () => {
//         var fetchhasnextproduct = true;
//         if (fetchProductsQuery.isSuccess) {
//             if (fetchProductsQuery?.data?.pages[fetchProductsQuery?.data?.pages.length - 1]?.data?.products?.length < 12) {
//                 fetchhasnextproduct = false;
//             }
//         }
//         return fetchhasnextproduct;
//     };
//     const Viewmorebtn = () => {
//         return (
//             <TouchableOpacity
//                 style={[
//                     generalstyles.flexRow,
//                     generalstyles.allcentered,
//                     {
//                         backgroundColor: sectionproperties.viewmorebtn_bgColor,
//                         borderRadius: StyleParseToIntFuncContext(sectionproperties.viewmorebtn_borderBottomLeftRadius),
//                         width: sectionproperties.viewmorebtn_Width == 0 ? 'auto' : StyleParseToIntFuncContext(sectionproperties.viewmorebtn_Width),
//                         height: sectionproperties.viewmorebtn_Height == 0 ? 'auto' : StyleParseToIntFuncContext(sectionproperties.viewmorebtn_Height),
//                         // width: 'auto',
//                         // height: 'auto',
//                     },
//                 ]}
//                 onPress={() => {
//                     generalproductsnavigation();
//                 }}
//             >
//                 {sectionproperties.viewmorebtn_fontSize != 0 && (
//                     <Text
//                         style={[
//                             {
//                                 color: sectionproperties.viewmorebtn_Textcolor,
//                                 fontSize: StyleParseToIntFuncContext(sectionproperties.viewmorebtn_fontSize),
//                                 textAlign: 'left',
//                                 textDecorationLine:
//                                     sectionproperties.showIcon == 'Show'
//                                         ? 'none'
//                                         : sectionproperties.viewmorebtn_Width == 0 && sectionproperties.viewmorebtn_Height == 0 && sectionproperties.showtextdecoration == 'Show'
//                                         ? 'underline'
//                                         : 'none',
//                                 fontFamily:
//                                     sectionproperties.sectiontitlefontfamily == 'Poppins'
//                                         ? sectionproperties.viewmorebtn_fontWeight == 300
//                                             ? 'Poppins-Thin'
//                                             : sectionproperties.viewmorebtn_fontWeight == 400
//                                             ? 'Poppins-Light'
//                                             : sectionproperties.viewmorebtn_fontWeight == 500
//                                             ? 'Poppins-Regular'
//                                             : sectionproperties.viewmorebtn_fontWeight == 600
//                                             ? 'Poppins-Medium'
//                                             : sectionproperties.viewmorebtn_fontWeight == 700
//                                             ? 'Poppins-Semibold'
//                                             : 'Poppins-Bold'
//                                         : sectionproperties.sectiontitlefontfamily == 'ASUL'
//                                         ? sectionproperties.viewmorebtn_fontWeight == 300 ||
//                                           sectionproperties.viewmorebtn_fontWeight == 400 ||
//                                           sectionproperties.viewmorebtn_fontWeight == 500 ||
//                                           sectionproperties.viewmorebtn_fontWeight == 600
//                                             ? 'Asul-Regular'
//                                             : sectionproperties.viewmorebtn_fontWeight == 600 || sectionproperties.viewmorebtn_fontWeight == 800
//                                             ? 'Asul-Bold'
//                                             : 'Asul-Regular'
//                                         : 'Poppins-Medium',
//                             },
//                         ]}
//                     >
//                         {langdetect == 'en' ? sectionproperties.viewmorebtn_text : sectionproperties.viewmorebtn_text_ar}
//                     </Text>
//                 )}
//                 {sectionproperties.showIcon == 'Show' && (
//                     <Ionicons
//                         name={langdetect == 'en' ? 'md-arrow-forward-sharp' : 'md-arrow-back-sharp'}
//                         size={StyleParseToIntFuncContext(sectionproperties.viewmoreiconfontsize)}
//                         style={{
//                             color: sectionproperties.viewmorebtn_Textcolor,
//                             marginStart: 2,
//                         }}
//                     />
//                 )}
//             </TouchableOpacity>
//         );
//     };
//     const SectionTitleContent = () => {
//         return (
//             <Text
//                 style={{
//                     paddingHorizontal: sectionproperties.sectiontitlestyle == 'Line Before Text' ? 5 : 0,
//                     color: sectionproperties.sectionTitleColor,
//                     fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
//                     fontFamily:
//                         sectionproperties.sectiontitlefontfamily == 'Poppins'
//                             ? sectionproperties.sectionTitleFontWeight == 300
//                                 ? 'Poppins-Thin'
//                                 : sectionproperties.sectionTitleFontWeight == 400
//                                 ? 'Poppins-Light'
//                                 : sectionproperties.sectionTitleFontWeight == 500
//                                 ? 'Poppins-Regular'
//                                 : sectionproperties.sectionTitleFontWeight == 600
//                                 ? 'Poppins-Medium'
//                                 : sectionproperties.sectionTitleFontWeight == 700
//                                 ? 'Poppins-Semibold'
//                                 : 'Poppins-Bold'
//                             : sectionproperties.sectiontitlefontfamily == 'ASUL'
//                             ? sectionproperties.sectionTitleFontWeight == 300
//                                 ? 'Asul-Regular'
//                                 : sectionproperties.sectionTitleFontWeight == 400
//                                 ? 'Asul-Regular'
//                                 : sectionproperties.sectionTitleFontWeight == 500
//                                 ? 'Asul-Regular'
//                                 : sectionproperties.sectionTitleFontWeight == 600
//                                 ? 'Asul-Bold'
//                                 : sectionproperties.sectionTitleFontWeight == 700
//                                 ? 'Asul-Bold'
//                                 : 'Poppins-Medium'
//                             : sectionproperties.sectiontitlefontfamily == 'Pacifico'
//                             ? 'Pacifico-Regular'
//                             : sectionproperties.sectiontitlefontfamily == 'Great Vibes'
//                             ? 'GreatVibes-Regular'
//                             : sectionproperties.sectiontitlefontfamily == 'Playfair'
//                             ? 'PlayfairDisplay'
//                             : 'Poppins-Medium',
//                     textAlign: 'left',
//                 }}
//             >
//                 {langdetect == 'en' ? sectionproperties.sectionTitleContent : sectionproperties.sectionTitleContent_ar}
//             </Text>
//         );
//     };
//     const cardsrender = useMemo(() => {
//         return (
//             <View
//                 style={{
//                     backgroundColor: sectionproperties.backgroundColortransparent == 'Transparent' ? 'Transparent' : sectionproperties.backgroundColor,
//                     borderLeftWidth: StyleParseToIntFuncContext(sectionproperties.borderhorizontalwidth, '', true),
//                     borderRightWidth: StyleParseToIntFuncContext(sectionproperties.borderhorizontalwidth, '', true),
//                     borderTopWidth: StyleParseToIntFuncContext(sectionproperties.borderverticalwidth, '', true),
//                     borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.borderverticalwidth, '', true),
//                     borderColor: sectionproperties.sectioncardbordercolor,
//                     borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.borderBottomLeftRadius, '', true),
//                     borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.borderBottomRightRadius, '', true),
//                     borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.borderTopLeftRadius, '', true),
//                     borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.borderTopRightRadius, '', true),
//                     marginLeft: langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.card_marginLeft) : StyleParseToIntFuncContext(sectionproperties.card_marginRight),
//                     marginRight: langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.card_marginRight) : StyleParseToIntFuncContext(sectionproperties.card_marginLeft),
//                     borderColor: sectionproperties.sectioncardbordercolor,
//                     // shadowColor: sectionproperties.sectioncardshadow == 'Show' ? sectionproperties.sectioncardshadowcolor : 'transparent',
//                     // shadowOpacity: sectionproperties.sectioncardshadow == 'Show' ? 0.9 : 0,
//                     // shadowOffset: {
//                     //     width: 0,
//                     //     height: sectionproperties.sectioncardshadow == 'Show' ? 3 : 0,
//                     // },
//                     // shadowRadius: sectionproperties.sectioncardshadow == 'Show' ? 3 : 0,
//                     // elevation: sectionproperties.sectioncardshadow == 'Show' ? 1 : 0,
//                 }}
//             >
//                 {StatePageProperties?.pageobj?.sections[props.sectionindexprops]?.childsections?.map((item, index) => {
//                     if (item.tabexsectioninfo != null) {
//                         if (item.sectionstructype == 'child' && TabexSectionsComponentsContext[item.tabexsectioninfo.sectioncompname] != undefined) {
//                             var sectioncomp = TabexSectionsComponentsContext[item.tabexsectioninfo.sectioncompname];

//                             return (
//                                 <>
//                                     <View
//                                         onPress={() => {
//                                             if (props.fetchingtypeprops == 'collections') {
//                                                 routingcountext(StaticPagesLinksContext.GeneralProductsComponent, true, item.collectionid);
//                                             }
//                                         }}
//                                         style={[
//                                             {
//                                                 flexDirection:
//                                                     sectionproperties.viewmorebtnshow == 'Show' &&
//                                                     sectionproperties.sectiontitlestyle &&
//                                                     (sectionproperties.sectiontitleposition == 'Centered') == 'Line Under Text'
//                                                         ? 'column'
//                                                         : 'row',
//                                                 alignItems: 'center',
//                                                 marginBottom: StyleParseToIntFuncContext(
//                                                     sectionproperties.sectionTitleMarginBottom != null && sectionproperties.sectionTitleMarginBottom != undefined
//                                                         ? sectionproperties.sectionTitleMarginBottom
//                                                         : 0,
//                                                 ),
//                                                 marginTop: StyleParseToIntFuncContext(
//                                                     sectionproperties.sectionTitleMarginTop != null && sectionproperties.sectionTitleMarginTop != undefined
//                                                         ? sectionproperties.sectionTitleMarginTop
//                                                         : 0,
//                                                 ),
//                                                 paddingLeft: StyleParseToIntFuncContext(
//                                                     sectionproperties.sectionTitleMarginLeft != null && sectionproperties.sectionTitleMarginLeft != undefined
//                                                         ? sectionproperties.sectionTitleMarginLeft
//                                                         : 0,
//                                                 ),
//                                                 paddingRight: StyleParseToIntFuncContext(
//                                                     sectionproperties.sectionTitleMarginRight != null && sectionproperties.sectionTitleMarginRight != undefined
//                                                         ? sectionproperties.sectionTitleMarginRight
//                                                         : 0,
//                                                 ),
//                                             },
//                                         ]}
//                                     >
//                                         {sectionproperties.sectiontitlestyle == 'Line Before Text' && <View style={{ flex: 1, backgroundColor: sectionproperties.linebgcolor, height: 1 }}></View>}
//                                         {sectionproperties.sectiontitleshow == 'Show' && sectionproperties.showbackbtn == 'Hide' && (
//                                             <View
//                                                 style={[
//                                                     generalstyles.flexRow,
//                                                     {
//                                                         flex: sectionproperties.sectiontitlestyle == 'Line Before Text' ? 0 : 1,
//                                                         alignItems: sectionproperties.sectiontitleposition == 'Centered' ? 'center' : 'flex-start',
//                                                     },
//                                                 ]}
//                                             >
//                                                 {SectionTitleContent()}
//                                             </View>
//                                         )}
//                                         {sectionproperties.sectiontitleshow == 'Show' && sectionproperties.showbackbtn == 'Show' && (
//                                             <TouchableOpacity
//                                                 style={[
//                                                     generalstyles.flexRow,
//                                                     {
//                                                         flex: sectionproperties.sectiontitlestyle == 'Line Before Text' ? 0 : 1,
//                                                         alignItems: sectionproperties.sectiontitleposition == 'Centered' ? 'center' : 'flex-start',
//                                                     },
//                                                 ]}
//                                                 onPress={() => {
//                                                     navigation.goBack();
//                                                 }}
//                                             >
//                                                 <TouchableOpacity
//                                                     style={[
//                                                         generalstyles.allcentered,
//                                                         {
//                                                             marginTop: 'auto',
//                                                             marginBottom: 'auto',
//                                                             marginEnd: 5,
//                                                         },
//                                                     ]}
//                                                 >
//                                                     <AntDesign
//                                                         name={langdetect == 'en' ? 'arrowleft' : 'arrowright'}
//                                                         size={StyleParseToIntFuncContext(sectionproperties.backbtnfontSize)}
//                                                         style={{
//                                                             color: sectionproperties.backbtncolor,
//                                                         }}
//                                                     />
//                                                 </TouchableOpacity>
//                                                 {SectionTitleContent()}
//                                             </TouchableOpacity>
//                                         )}

//                                         {sectionproperties.sectiontitlestyle == 'Line Before Text' && <View style={{ flex: 1, backgroundColor: sectionproperties.linebgcolor, height: 1 }}></View>}
//                                         {sectionproperties.viewmorebtnshow == 'Show' && sectionproperties.sectiontitleposition != 'Centered' && sectionproperties.prodCatShow != 'Show' && (
//                                             <View>{Viewmorebtn()}</View>
//                                         )}
//                                         {sectionproperties.showFilter == 'show' && sectionproperties.filterdirection == 'Vertical' && (
//                                             <TouchableOpacity
//                                                 style={[
//                                                     generalstyles.allcentered,
//                                                     {
//                                                         marginStart: 5,
//                                                         width: 40,
//                                                         height: 40,
//                                                         borderRadius: StyleParseToIntFuncContext(sectionproperties.filter_borderBottomLeftRadius, '', true),
//                                                         backgroundColor: sectionproperties.filter_backgroundcolor,
//                                                     },
//                                                 ]}
//                                                 onPress={() => {
//                                                     routingcountext(StaticPagesLinksContext.Filter, {
//                                                         ProductFilterObjContext: ProductFilterObjContext,
//                                                         setProductFilterObjContext: setProductFilterObjContext,
//                                                     });
//                                                 }}
//                                             >
//                                                 <Image source={icons.filter} resizeMode="cover" style={[{ width: '80%', height: '80%', tintColor: sectionproperties.iconColor }]} />
//                                             </TouchableOpacity>
//                                         )}
//                                     </View>
//                                     {sectionproperties.prodCatShow == 'Show' && (
//                                         <View
//                                             style={[
//                                                 generalstyles.flexRow,
//                                                 {
//                                                     paddingLeft: StyleParseToIntFuncContext(
//                                                         sectionproperties.sectionTitleMarginLeft != null && sectionproperties.sectionTitleMarginLeft != undefined
//                                                             ? sectionproperties.sectionTitleMarginLeft
//                                                             : 0,
//                                                     ),
//                                                     paddingRight: StyleParseToIntFuncContext(
//                                                         sectionproperties.sectionTitleMarginRight != null && sectionproperties.sectionTitleMarginRight != undefined
//                                                             ? sectionproperties.sectionTitleMarginRight
//                                                             : 0,
//                                                     ),
//                                                     marginBottom: StyleParseToIntFuncContext(
//                                                         sectionproperties.descriptionMarginBottom != null && sectionproperties.descriptionMarginBottom != undefined
//                                                             ? sectionproperties.descriptionMarginBottom
//                                                             : 0,
//                                                     ),
//                                                 },
//                                             ]}
//                                         >
//                                             <View
//                                                 style={{
//                                                     flex: 1,
//                                                 }}
//                                             >
//                                                 <Text
//                                                     style={{
//                                                         fontSize: StyleParseToIntFuncContext(sectionproperties.prodCatFontSize),
//                                                         color: sectionproperties.prodCatColor,
//                                                         fontFamily:
//                                                             sectionproperties.prodCatFontWeight == 300
//                                                                 ? 'Poppins-Thin'
//                                                                 : sectionproperties.prodCatFontWeight == 400
//                                                                 ? 'Poppins-Light'
//                                                                 : sectionproperties.prodCatFontWeight == 500
//                                                                 ? 'Poppins-Regular'
//                                                                 : sectionproperties.prodCatFontWeight == 600
//                                                                 ? 'Poppins-Medium'
//                                                                 : sectionproperties.prodCatFontWeight == 700
//                                                                 ? 'Poppins-Semibold'
//                                                                 : 'Poppins-Bold',
//                                                         textAlign: sectionproperties.descriptionCentered == 'Centered' ? 'center' : 'left',
//                                                     }}
//                                                 >
//                                                     {langdetect == 'en' ? sectionproperties.descriptionContentEn : sectionproperties.descriptionContentAr}
//                                                 </Text>
//                                             </View>
//                                             {sectionproperties.viewmorebtnshow == 'Show' && sectionproperties.sectiontitleposition != 'Centered' && sectionproperties.prodCatShow == 'Show' && (
//                                                 <View>{Viewmorebtn()}</View>
//                                             )}
//                                         </View>
//                                     )}
//                                     {sectionproperties.viewmorebtnshow == 'Show' && sectionproperties.sectiontitleposition == 'Centered' && (
//                                         <View style={[generalstyles.allcentered, { alignItems: 'center' }]}>{Viewmorebtn()}</View>
//                                     )}
// {sectionproperties.showFilter == 'show' && sectionproperties.filterdirection == 'Horizontal' && (
//     <View>
//         <FilterHorizontal
//             ProductFilterObjContext={ProductFilterObjContext}
//             setProductFilterObjContext={setProductFilterObjContext}
//             sectionproperties={sectionproperties}
//         />
//     </View>
// )}
//                                     <View
//                                         style={{
//                                             paddingLeft: StyleParseToIntFuncContext(
//                                                 sectionproperties.sectionTitleMarginLeft != null && sectionproperties.sectionTitleMarginLeft != undefined
//                                                     ? sectionproperties.sectionTitleMarginLeft
//                                                     : 0,
//                                             ),
//                                             paddingRight: StyleParseToIntFuncContext(
//                                                 sectionproperties.sectionTitleMarginRight != null && sectionproperties.sectionTitleMarginRight != undefined
//                                                     ? sectionproperties.sectionTitleMarginRight
//                                                     : 0,
//                                             ),
//                                         }}
//                                     >
//                                         {sectionproperties.sectiontitlestyle == 'Line Under Text' && sectionproperties.showseparator == 'Show' && (
//                                             <View
//                                                 style={{
//                                                     flex: 1,
//                                                     backgroundColor: sectionproperties.linebgcolor,
//                                                     height: 1,
//                                                     marginBottom: StyleParseToIntFuncContext(
//                                                         sectionproperties.sectionTitleMarginBottom != null && sectionproperties.sectionTitleMarginBottom != undefined
//                                                             ? sectionproperties.sectionTitleMarginBottom
//                                                             : 0,
//                                                     ),
//                                                 }}
//                                             ></View>
//                                         )}
//                                     </View>
//                                     {isproductsfetching && renderSpinner()}
//                                     {!isproductsfetching && cardsarray.length == 0 && (
//                                         <View style={[generalstyles.allcentered, { width: '100%', marginVertical: 150 }]}>
//                                             <Ionicons name="ios-sad-outline" size={StyleParseToIntFuncContext(sectionproperties.noprod_iconfontSize)} color={sectionproperties.noprod_iconcolor} />
//                                             <Text
//                                                 style={{
//                                                     fontFamily:
//                                                         sectionproperties.noprod_fontWeight == 300
//                                                             ? 'Poppins-Thin'
//                                                             : sectionproperties.noprod_fontWeight == 400
//                                                             ? 'Poppins-Light'
//                                                             : sectionproperties.noprod_fontWeight == 500
//                                                             ? 'Poppins-Regular'
//                                                             : sectionproperties.noprod_fontWeight == 600
//                                                             ? 'Poppins-Medium'
//                                                             : sectionproperties.noprod_fontWeight == 700
//                                                             ? 'Poppins-Semibold'
//                                                             : 'Poppins-Bold',
//                                                     color: sectionproperties.noprod_color,
//                                                     fontSize: StyleParseToIntFuncContext(sectionproperties.noprod_fontSize),
//                                                 }}
//                                             >
//                                                 {langdetect == 'en' ? sectionproperties.nocards_content_en : sectionproperties.nocards_content_ar}
//                                             </Text>
//                                         </View>
//                                     )}
//                                     <View
//                                         style={{
//                                             paddingStart: StyleParseToIntFuncContext(sectionproperties.paddingLeft),
//                                             paddingEnd: StyleParseToIntFuncContext(sectionproperties.paddingRight),
//                                             marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom),
//                                             marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop),
//                                         }}
//                                     >
//                                         {sectionproperties.view_as_slider_vertical == 'Slider (Horizontal)' && (
//                                             <View style={{ marginBottom: 0 }}>
//                                                 <FlatList
//                                                     data={cardsarray?.slice(0, 12)}
//                                                     horizontal
//                                                     showsHorizontalScrollIndicator={false}
//                                                     // onEndReached={loadMore}
//                                                     keyExtractor={(item, index) => index}
//                                                     onEndReachedThreshold={0.3}
//                                                     ListFooterComponent={fetchProductsQuery.isFetchingNextPage ? renderSpinner : null}
//                                                     renderItem={(data123) => {
//                                                         return (
//                                                             <View key={data123.index}>
//                                                                 {React.createElement(sectioncomp, {
//                                                                     sectionidprops: item.sectionid,
//                                                                     sectionindexprops: index,
//                                                                     cardinfoitemprops: data123.item,
//                                                                     cardinfoindexprops: data123.index,
//                                                                     fetchingtypeprops: fetchingtype,
//                                                                     sectiondirection: 'slider',
//                                                                     sectionpropertiesProps: item.sectionproperties,
//                                                                     StatePageProperties: StatePageProperties,
//                                                                     fontFamilyProps: sectionproperties.sectiontitlefontfamily == 'ASUL' ? 'ASUL' : 'Poppins',
//                                                                 })}
//                                                             </View>
//                                                         );
//                                                     }}
//                                                 />
//                                                 {/* <Text>{item.tabexsectioninfo.sectioncompname}ss</Text> */}
//                                                 {/* <RecyclerViewComp
//                                                     sectioncompname={item.tabexsectioninfo.sectioncompname}
//                                                     sectioncomp={sectioncomp}
//                                                     sectionindexprops={index}
//                                                     sectionidprops={item.sectionid}
//                                                     fetchingtypeprops={fetchingtype}
//                                                     sectiondirection={'slider'}
//                                                     fontFamilyProps={sectionproperties.sectiontitlefontfamily == 'ASUL' ? 'ASUL' : 'Poppins'}
//                                                     StatePageProperties={StatePageProperties}
//                                                     loadMore={loadMore}
//                                                     FetchingQuery={fetchProductsQuery}
//                                                     data={cardsarray}
//                                                 /> */}
//                                             </View>
//                                         )}
//                                         {sectionproperties.view_as_slider_vertical != 'Slider (Horizontal)' && (
//                                             <View
//                                                 style={{
//                                                     display: 'flex',
//                                                     flex: 1,
//                                                     alignItems: SIZES.width < 768 ? 'center' : fetchingtype != 'products' && SIZES.width > 768 ? 'center' : 'flex-start',
//                                                     width: '100%',
//                                                     // paddingHorizontal: SIZES.width > 1024 ? 10 : 0,
//                                                 }}
//                                             >
//                                                 {cardsarray.length != 0 && (
//                                                     <FlatList
//                                                         data={cardsarray}
//                                                         vertical
//                                                         keyExtractor={(item, index) => index}
//                                                         showsHorizontalScrollIndicator={false}
//                                                         // onEndReached={() => {
//                                                         //     console.log('LOAD MORE HERE');
//                                                         //     loadMore();
//                                                         // }}
//                                                         // onEndReachedThreshold={0.1}

//                                                         scrollEventThrottle={0}
//                                                         ListFooterComponent={fetchProductsQuery.isFetchingNextPage ? renderSpinner : null}
//                                                         renderItem={(data123, index) => {
//                                                             if (sectionproperties.overallnumberofcards == 0) {
//                                                                 return (
//                                                                     <View key={data123.index}>
//                                                                         {React.createElement(sectioncomp, {
//                                                                             sectionidprops: item.sectionid,
//                                                                             sectionindexprops: index,
//                                                                             cardinfoitemprops: data123.item,
//                                                                             cardinfoindexprops: data123.index,
//                                                                             fetchingtypeprops: fetchingtype,
//                                                                             sectiondirection: 'vertical',
//                                                                             sectionpropertiesProps: item.sectionproperties,
//                                                                             fontFamilyProps: sectionproperties.sectiontitlefontfamily == 'ASUL' ? 'ASUL' : 'Poppins',
//                                                                             // StatePageProperties: StatePageProperties,
//                                                                         })}
//                                                                     </View>
//                                                                 );
//                                                             } else if (sectionproperties.overallnumberofcards != 0) {
//                                                                 if (data123.index < sectionproperties.overallnumberofcards) {
//                                                                     return (
//                                                                         <View key={data123.index}>
//                                                                             {React.createElement(sectioncomp, {
//                                                                                 sectionidprops: item.sectionid,
//                                                                                 sectionindexprops: index,
//                                                                                 cardinfoitemprops: data123.item,
//                                                                                 cardinfoindexprops: data123.index,
//                                                                                 fetchingtypeprops: fetchingtype,
//                                                                                 sectiondirection: 'vertical',
//                                                                                 sectionpropertiesProps: item.sectionproperties,
//                                                                                 fontFamilyProps: sectionproperties.sectiontitlefontfamily == 'ASUL' ? 'ASUL' : 'Poppins',
//                                                                                 // StatePageProperties: StatePageProperties,
//                                                                             })}
//                                                                         </View>
//                                                                     );
//                                                                 }
//                                                             } else {
//                                                                 return (
//                                                                     <View key={data123.index}>
//                                                                         {React.createElement(sectioncomp, {
//                                                                             sectionidprops: item.sectionid,
//                                                                             sectionindexprops: index,
//                                                                             cardinfoitemprops: data123.item,
//                                                                             cardinfoindexprops: data123.index,
//                                                                             fetchingtypeprops: fetchingtype,
//                                                                             sectiondirection: 'vertical',
//                                                                             sectionpropertiesProps: item.sectionproperties,
//                                                                             fontFamilyProps: sectionproperties.sectiontitlefontfamily == 'ASUL' ? 'ASUL' : 'Poppins',
//                                                                             // StatePageProperties: StatePageProperties,
//                                                                         })}
//                                                                     </View>
//                                                                 );
//                                                             }
//                                                         }}
//                                                         key={
//                                                             SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'CTAProductCard'
//                                                                 ? 3
//                                                                 : SIZES.width > 700 && item.tabexsectioninfo.sectioncompname == 'SimpleCategoryCard'
//                                                                 ? 8
//                                                                 : SIZES.width > 1024 && item.tabexsectioninfo.sectioncompname == 'CardWithImageOnTop'
//                                                                 ? 4
//                                                                 : SIZES.width > 1024 && item.tabexsectioninfo.sectioncompname == 'StylishCard'
//                                                                 ? 4
//                                                                 : SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'StylishCard'
//                                                                 ? 4
//                                                                 : SIZES.width > 1024 && item.tabexsectioninfo.sectioncompname == 'HorizontalProductCard'
//                                                                 ? 2
//                                                                 : SIZES.width > 1024 && item.tabexsectioninfo.sectioncompname == 'ProductCardWithBlurEffect'
//                                                                 ? 4
//                                                                 : SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'ProductCardWithBlurEffect'
//                                                                 ? 3
//                                                                 : SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'ClassicHorizontalProductCard'
//                                                                 ? 2
//                                                                 : SIZES.width > 1024
//                                                                 ? 5
//                                                                 : SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'HorizontalProductCard'
//                                                                 ? 2
//                                                                 : SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'CardWithImageOnTop'
//                                                                 ? 3
//                                                                 : SIZES.width > 768
//                                                                 ? 4
//                                                                 : item.tabexsectioninfo.sectioncompname == 'CardWithImageOnTop' ||
//                                                                   item.tabexsectioninfo.sectioncompname == 'HorizontalProductCard' ||
//                                                                   item.tabexsectioninfo.sectioncompname == 'ClassicHorizontalProductCard' ||
//                                                                   item.tabexsectioninfo.sectioncompname == 'ProductCardWithBlurEffect' ||
//                                                                   item.tabexsectioninfo.sectioncompname == 'CTAProductCard'
//                                                                 ? 1
//                                                                 : item.tabexsectioninfo.sectioncompname == 'SimpleCategoryCard'
//                                                                 ? 4
//                                                                 : SIZES.width > 1024 && item.tabexsectioninfo.sectioncompname == 'ChiqueCard'
//                                                                 ? 4
//                                                                 : SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'ChiqueCard'
//                                                                 ? 3
//                                                                 : 2
//                                                         }
//                                                         numColumns={
//                                                             SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'CTAProductCard'
//                                                                 ? 3
//                                                                 : SIZES.width > 700 && item.tabexsectioninfo.sectioncompname == 'SimpleCategoryCard'
//                                                                 ? 8
//                                                                 : SIZES.width > 1024 && item.tabexsectioninfo.sectioncompname == 'CardWithImageOnTop'
//                                                                 ? 4
//                                                                 : SIZES.width > 1024 && item.tabexsectioninfo.sectioncompname == 'StylishCard'
//                                                                 ? 4
//                                                                 : SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'StylishCard'
//                                                                 ? 4
//                                                                 : SIZES.width > 1024 && item.tabexsectioninfo.sectioncompname == 'HorizontalProductCard'
//                                                                 ? 2
//                                                                 : SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'ProductCardWithBlurEffect'
//                                                                 ? 3
//                                                                 : SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'ClassicHorizontalProductCard'
//                                                                 ? 2
//                                                                 : SIZES.width > 1024
//                                                                 ? 5
//                                                                 : SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'HorizontalProductCard'
//                                                                 ? 2
//                                                                 : SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'CardWithImageOnTop'
//                                                                 ? 3
//                                                                 : SIZES.width > 1024 && item.tabexsectioninfo.sectioncompname == 'ChiqueCard'
//                                                                 ? 4
//                                                                 : SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'ChiqueCard'
//                                                                 ? 3
//                                                                 : SIZES.width > 768
//                                                                 ? 4
//                                                                 : item.tabexsectioninfo.sectioncompname == 'CardWithImageOnTop' ||
//                                                                   item.tabexsectioninfo.sectioncompname == 'HorizontalProductCard' ||
//                                                                   item.tabexsectioninfo.sectioncompname == 'ClassicHorizontalProductCard' ||
//                                                                   item.tabexsectioninfo.sectioncompname == 'ProductCardWithBlurEffect' ||
//                                                                   item.tabexsectioninfo.sectioncompname == 'CTAProductCard'
//                                                                 ? 1
//                                                                 : item.tabexsectioninfo.sectioncompname == 'SimpleCategoryCard'
//                                                                 ? 4
//                                                                 : 2
//                                                         }
//                                                     />
//                                                 )}
//                                                 {!fetchProductsQuery.isFetchingNextPage &&
//                                                     !isproductsfetching &&
//                                                     fetchingtype == 'products' &&
//                                                     doesfetchhasnextproducts() &&
//                                                     sectionproperties.showpagination == 'Show' && (
//                                                         <TouchableOpacity
//                                                             onPress={() => {
//                                                                 loadMore();
//                                                             }}
//                                                         >
//                                                             <Text>{fetchProductsQuery.isFetchingNextPage ? '' : lang.loadmore}</Text>
//                                                         </TouchableOpacity>
//                                                     )}
//                                             </View>
//                                         )}
//                                     </View>
//                                 </>
//                             );
//                         }
//                     }
//                 })}
//             </View>
//         );
//     }, [cardsarray, isproductsfetching, ProductFilterObjContext]);
//     return (
//         <View
//             style={{
//                 backgroundColor: sectionproperties.outerbgcolor,
//             }}
//         >
//             {/* <Text> sscol{fetchcollectionsQueryContext.isFetching.toString()}</Text> */}
//             {/* <Text> ss{fetchProductsQuery.isFetching.toString()}</Text> */}

//             {cardsrender}
//         </View>
//     );
// };
// const styles = StyleSheet.create({});

// export default CardsSection;

import React, { useEffect, useState, useContext, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, Platform } from 'react-native';
import { LanguageContext } from '../../../../LanguageContext/LanguageContext';
import { FetchingContext } from '../../../../FetchingContext/FetchingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { ProductsCardsSectionContext } from '../ProductsCardsSectionContext';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import generalstyles from '../../../GeneralFiles/Stylesheet/Stylesheet';
import SpinnerButton from 'react-native-spinner-button';
import { icons, SIZES } from '../../../GeneralFiles/constants';
import { TemplateRoutingContext } from '../../../../TemplateRoutingContext';
import { useNavigation } from '@react-navigation/native';
import API from '../../../../API/API';
import { AntDesign, Ionicons } from '@expo/vector-icons';
// import RecyclerViewComp from '../RecyclerViewComp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import FilterHorizontal from '../../../StaticPages/Filter/FilterHorizontal';

const CardsSection = (props) => {
    const isFocused = useIsFocused();
    const { fetchcollections_API, fetchvendors_API } = API();
    const navigation = useNavigation();
    const { ref, inView } = useInView();
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext, INSTAPIKEYCONTEXT, TabexSectionsComponentsContext } = useContext(WebsiteDesignWorkPlaceContext);
    const {
        VendorsArrgeneralFilterContext,
        setVendorsArrgeneralFilterContext,
        fetchAuthorizationQueryContext,
        fetchcustomercartQueryContext,
        FetchQueriesEngineContext,
        SearchHeaderMutationContext,
        favoriteprojectscountContext,
    } = useContext(FetchingContext);
    const { ProductFilterObjContext, setProductFilterObjContext } = useContext(ProductsCardsSectionContext);
    const { StaticPagesLinksContext, routingcountext } = useContext(TemplateRoutingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [isproductsfetching, setisproductsfetching] = useState(false);
    const [cardsarray, setcardsarray] = useState([]);
    const [fetchingtype, setfetchingtype] = useState('');
    const [sectionitem, setsectionitem] = useState('');
    const [VendorsarrcollectionqueryArr, setVendorsarrcollectionqueryArr] = useState('');

    const [StatePageProperties, setStatePageProperties] = useState({});
    const [ParentCollectionsForCollectionQueryArr, setParentCollectionsForCollectionQueryArr] = useState('');
    const fetchcollectionsQueryContext = useQuery(
        ['fetchcollections_API' + JSON.stringify(ParentCollectionsForCollectionQueryArr) + JSON.stringify(VendorsarrcollectionqueryArr)],
        () => fetchcollections_API({ parentcollectionid: ParentCollectionsForCollectionQueryArr, vendorsarr: VendorsarrcollectionqueryArr }),
        {
            keepPreviousData: true,
            staleTime: Infinity,
            enabled: INSTAPIKEYCONTEXT.length != 0 && ParentCollectionsForCollectionQueryArr.length != 0 ? true : false,
        },
    );
    const FetchProductsAxios = async (axiosdatatemp) => {
        var tempProductFilterObjContext = { ...ProductFilterObjContext };
        tempProductFilterObjContext.page = axiosdatatemp;
        // setProductFilterObjContext({ ...tempProductFilterObjContext });
        tempProductFilterObjContext.instapikey = INSTAPIKEYCONTEXT;

        var serverbaselinktemp = 'https://tabex-co.com/customerapi';
        var authtoken = await AsyncStorage.getItem('token');
        tempProductFilterObjContext.atoken = authtoken;
        var valueCurrency = await AsyncStorage.getItem('currency');
        tempProductFilterObjContext.currencyid = valueCurrency;
        var langValue = await AsyncStorage.getItem('lang');
        tempProductFilterObjContext.lang = langValue;
        var value = await AsyncStorage.getItem('cdata');
        tempProductFilterObjContext.cdata = value;
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinktemp + '/customer/webapp/fetchproducts',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: tempProductFilterObjContext,
        });
        return axiosfetch;
    };
    const fetchProductsQuery = useInfiniteQuery(['fetchproducts_API' + JSON.stringify(ProductFilterObjContext)], ({ pageParam = 0 }) => FetchProductsAxios(pageParam), {
        keepPreviousData: true,
        staleTime: Infinity,
        enabled:
            INSTAPIKEYCONTEXT.length != 0 && fetchingtype == 'products' && ProductFilterObjContext.ProductFetchingType != undefined && ProductFilterObjContext.ProductFetchingType.length != 0
                ? true
                : false,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            var currentpagefrombackend = lastPage.data.page;

            if (currentpagefrombackend == 'full') {
                return undefined;
            } else {
                var nextpage = parseInt(currentpagefrombackend) + 1;
                return nextpage;
            }
        },

        getPreviousPageParam: (firstPage, allPages) => firstPage.data.page - 1,
    });
    // const FetchVendorsQuery = useQuery(['FetchVendors_API' + props.collectionidprops], () => fetchvendors_API({ collections: [props.collectionidprops] }), {
    const FetchVendorsQuery = useQuery(['FetchVendors_API' + JSON.stringify(ProductFilterObjContext)], () => fetchvendors_API(ProductFilterObjContext), {
        keepPreviousData: true,
        staleTime: Infinity,
        enabled: INSTAPIKEYCONTEXT.length != 0 && fetchingtype == 'vendors' ? true : false,
    });
    React.useEffect(() => {
        if (inView) {
            fetchProductsQuery.fetchNextPage();
        }
    }, [inView]);
    const [ProductsFetchingTypeSectionObj, setProductsFetchingTypeSectionObj] = useState({ productfetchingtype: 'Random', collectionid: '', grouptype: '', grouptyperefid: '' });
    useEffect(() => {
        // if (sectionproperties != undefined) {
        // if (sectionproperties.view_as_slider_vertical == 'Slider (Horizontal)') {
        // setVendorsArrgeneralFilterContext([]);
        // } else {

        if (props.vendorsarrpassed != undefined && props.vendorsarrpassed != null) {
            if (Array.isArray(props.vendorsarrpassed)) {
                setVendorsArrgeneralFilterContext(props.vendorsarrpassed);
            } else {
                setVendorsArrgeneralFilterContext([props.vendorsarrpassed]);
            }
            // }
            // }
        }
    }, [props.vendorsarrpassed]);
    useEffect(() => {
        if (VendorsArrgeneralFilterContext != undefined && VendorsArrgeneralFilterContext != null) {
            setVendorsarrcollectionqueryArr(VendorsArrgeneralFilterContext);
        } else {
            setVendorsarrcollectionqueryArr([]);
        }
    }, [VendorsArrgeneralFilterContext]);
    useEffect(() => {
        if (VendorsarrcollectionqueryArr != undefined) {
            // alert(VendorsarrcollectionqueryArr);
            if (Array.isArray(VendorsarrcollectionqueryArr)) {
                setProductFilterObjContext({ ...ProductFilterObjContext, vendorsarr: VendorsarrcollectionqueryArr });
            } else {
                setProductFilterObjContext({ ...ProductFilterObjContext, vendorsarr: [VendorsarrcollectionqueryArr] });
            }
        } else {
            setProductFilterObjContext({ ...ProductFilterObjContext, vendorsarr: [] });
        }
    }, [VendorsarrcollectionqueryArr]);
    useEffect(() => {
        if (props.StatePagePropertiesprops != undefined) {
            setStatePageProperties(props.StatePagePropertiesprops);
        }
    }, [props.StatePagePropertiesprops]);
    useEffect(() => {
        if (Object.keys(StatePageProperties).length != 0) {
            StatePageProperties?.pageobj?.sections?.forEach(function (sectionitem, sectionindex) {
                if (sectionitem.sectionid == props.sectionidprops) {
                    setsectionitem(sectionitem);
                    var secpropobj = {};
                    sectionitem.sectionproperties.forEach(function (sectionpropertiesobj, sectionpropertiesindex) {
                        secpropobj[sectionpropertiesobj.property_css_name] = sectionpropertiesobj.property_value;
                    });
                    setsectionproperties({ ...secpropobj });

                    if (props.srcfromprops == 'GeneralProductsComponent') {
                        setfetchingtype('products');
                        var lcproductfetchingtype = 'Random';
                        if (props?.fetchingtypepassedprops != undefined && props?.fetchingtypepassedprops != null && props?.fetchingtypepassedprops.length != 0) {
                            lcproductfetchingtype = props?.fetchingtypepassedprops;
                        }
                        if (props.parenttype == 'Parent Collections') {
                            setProductsFetchingTypeSectionObj({
                                // productfetchingtype: 'Parent Collection',
                                // collectionid: '64afd7fe76979',

                                productfetchingtype: 'Parent Collection',
                                collectionid: props.collectionidprops,
                                grouptype: props.grouptypeprops,
                                grouptyperefid: props.grouptyperefidprops,
                            });
                        } else {
                            setProductsFetchingTypeSectionObj({
                                // productfetchingtype: 'Parent Collection',
                                // collectionid: '64afd7fe76979',
                                //Aya
                                // productfetchingtype: 'Random',
                                productfetchingtype: lcproductfetchingtype,
                                collectionid: props.collectionidprops,
                                grouptype: props.grouptypeprops,
                                grouptyperefid: props.grouptyperefidprops,
                            });
                        }
                    } else if (props.srcfromprops == 'InnerGroups' || props.srcfromprops == 'InnerCategory' || props.srcfromprops == 'InnerParentCollection') {
                        setfetchingtype(props.fetchingtypepassedprops);
                    } else if (props.srcfromprops == 'innervendors') {
                        var tempProductFilterObjContext = { ...ProductFilterObjContext };
                        if (props.collectionidprops != undefined && props.collectionidprops != null) {
                            tempProductFilterObjContext.collections.push(props.collectionidprops);
                        }
                        if (props.Countryidpassed != undefined && props.Countryidpassed != null && props?.Countryidpassed?.length != 0) {
                            tempProductFilterObjContext.countryid = props.Countryidpassed;
                        }
                        if (props.Stateidpassed != undefined && props.Stateidpassed != null && props?.Stateidpassed?.length != 0) {
                            tempProductFilterObjContext.stateid = props.Stateidpassed;
                        }
                        if (props.Cityidpassed != undefined && props.Cityidpassed != null && props?.Cityidpassed?.length != 0) {
                            tempProductFilterObjContext.cityid = props.Cityidpassed;
                        }
                        setProductFilterObjContext({ ...tempProductFilterObjContext });
                        setfetchingtype('vendors');
                    } else {
                        setfetchingtype(sectionitem.fetchingtype);
                        setProductsFetchingTypeSectionObj({
                            productfetchingtype: sectionitem.productsfetchingtype,
                            collectionid: sectionitem.productsfetchingtypeCollectioncollectionid,
                            grouptype: props.grouptypeprops,
                            grouptyperefid: props.grouptyperefidprops,
                        });
                    }
                }
            });
        }
    }, [StatePageProperties]);
    useEffect(() => {
        if (sectionproperties.length != 0) {
            if (cardsarray.length == 0) {
                if (fetchingtype == 'collections') {
                    if (fetchcollectionsQueryContext != undefined && fetchcollectionsQueryContext.isSuccess) {
                        cardobjassigner(fetchcollectionsQueryContext.data.data.collections);
                    }
                } else if (fetchingtype == 'products') {
                    if (fetchProductsQuery.isSuccess) {
                        var allpagesarr = [];
                        fetchProductsQuery.data.pages.forEach((page) => {
                            page.data.products.forEach((productobj) => {
                                allpagesarr.push(productobj);
                            });
                        });
                        cardobjassigner(allpagesarr);
                    }
                } else if (fetchingtype == 'categories') {
                    if (fetchAuthorizationQueryContext?.isSuccess) {
                        var categories = fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcategories;
                        cardobjassigner(categories);
                    }
                } else if (fetchingtype == 'parentcollections' || fetchingtype == 'innercategories') {
                    if (fetchAuthorizationQueryContext?.isSuccess) {
                        var categories = fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcategories;
                        var parentcollections = [];
                        categories?.forEach(function (catitem, catindex) {
                            catitem?.parentcolletions.forEach(function (parentcolitem) {
                                parentcolitem.categoryid = catitem.categoryid;
                                parentcollections.push(parentcolitem);
                            });
                        });
                        if (fetchingtype == 'parentcollections') {
                            if (
                                sectionitem?.productsfetchingtypeparentcollectioncategoryid != null &&
                                sectionitem?.productsfetchingtypeparentcollectioncategoryid != undefined &&
                                sectionitem?.productsfetchingtypeparentcollectioncategoryid != 'all'
                            ) {
                                var arrafterfilter = [];
                                parentcollections.forEach(function (parentcolitem, parcolindex) {
                                    if (parentcolitem.categoryid == sectionitem?.productsfetchingtypeparentcollectioncategoryid) {
                                        arrafterfilter.push(parentcolitem);
                                    }
                                });
                                parentcollections = arrafterfilter;
                            }
                        }
                        if (fetchingtype == 'innercategories') {
                            if (props.collectionidprops != undefined && props.collectionidprops != null && props.collectionidprops != '' && props.collectionidprops?.length != 0) {
                                var arrafterfilter = [];
                                parentcollections.forEach(function (parentcolitem, parcolindex) {
                                    if (parentcolitem.categoryid == props.collectionidprops) {
                                        arrafterfilter.push(parentcolitem);
                                    }
                                });
                                parentcollections = arrafterfilter;
                            }
                        }

                        cardobjassigner(parentcollections);
                    }
                } else if (fetchingtype == 'innerparentcollections') {
                    if (fetchAuthorizationQueryContext?.isSuccess) {
                        var categories = fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcategories;
                        var collections = [];
                        categories?.forEach(function (catitem, catindex) {
                            catitem?.parentcolletions.forEach(function (parentcolitem) {
                                parentcolitem.categoryid = catitem.categoryid;
                                parentcolitem?.collections?.forEach(function (collitem, colindex) {
                                    collitem.parentcollectionid = parentcolitem.parentcollectionid;
                                    collections.push(collitem);
                                });
                            });
                        });
                        if (fetchingtype == 'innerparentcollections') {
                            var collectionsafterfilter = [];
                            collections.forEach(function (colitem, colindex) {
                                if (colitem.parentcollectionid == props.collectionidprops) {
                                    var iscollexists = false;
                                    collectionsafterfilter.forEach(function (existcolitem) {
                                        if (colitem.collectionid == existcolitem.collectionid) {
                                            iscollexists = true;
                                        }
                                    });
                                    if (iscollexists == false) {
                                        collectionsafterfilter.push(colitem);
                                    }
                                }
                            });
                            collections = collectionsafterfilter;
                        }
                        cardobjassigner(collections);
                    }
                } else if (fetchingtype == 'vendors') {
                    if (FetchVendorsQuery.isSuccess) {
                        cardobjassigner(FetchVendorsQuery?.data?.data?.vendors);
                    }
                }
            }
        }
    }, [sectionproperties, fetchcollectionsQueryContext.isSuccess, fetchAuthorizationQueryContext.isSuccess]);
    useEffect(() => {
        if (fetchingtype.length != 0) {
            if (fetchingtype == 'collections') {
                var tempFetchQueriesEngineContext = FetchQueriesEngineContext;
                if (ProductsFetchingTypeSectionObj.collectionid == 'all' || ProductsFetchingTypeSectionObj.collectionid == null || ProductsFetchingTypeSectionObj.collectionid == undefined) {
                    setParentCollectionsForCollectionQueryArr('all');
                } else {
                    setParentCollectionsForCollectionQueryArr([ProductsFetchingTypeSectionObj.collectionid]);
                }
            }
            if (fetchingtype == 'products') {
                var tempfetchproductsfilerobjcontext = ProductFilterObjContext;
                tempfetchproductsfilerobjcontext.ProductFetchingType = ProductsFetchingTypeSectionObj.productfetchingtype;
                // tempfetchproductsfilerobjcontext.collections.push(ProductsFetchingTypeSectionObj.collectionid);
                if (
                    ProductsFetchingTypeSectionObj.grouptype == 'collections' ||
                    ProductsFetchingTypeSectionObj.grouptype == 'categories' ||
                    ProductsFetchingTypeSectionObj.grouptype == 'parentcollections'
                ) {
                } else {
                    tempfetchproductsfilerobjcontext.collections.push(ProductsFetchingTypeSectionObj.collectionid);
                }
                if (props.vendorsarrpassed != undefined) {
                    tempfetchproductsfilerobjcontext.vendorsarr = props.vendorsarrpassed;
                }
                tempfetchproductsfilerobjcontext.grouptype = ProductsFetchingTypeSectionObj.grouptype;
                tempfetchproductsfilerobjcontext.grouptyperefid = ProductsFetchingTypeSectionObj.grouptyperefid;
                if (props.Countryidpassed != undefined && props.Countryidpassed != null && props?.Countryidpassed?.length != 0) {
                    tempfetchproductsfilerobjcontext.country_ids = [props.Countryidpassed];
                }
                if (props.Stateidpassed != undefined && props.Stateidpassed != null && props?.Stateidpassed?.length != 0) {
                    tempfetchproductsfilerobjcontext.state_ids = [props.Stateidpassed];
                }
                if (props.Cityidpassed != undefined && props.Cityidpassed != null && props?.Cityidpassed?.length != 0) {
                    tempfetchproductsfilerobjcontext.city_ids = [props.Cityidpassed];
                }
                if (props.price_minpassed != undefined && props.price_minpassed != null && props?.price_minpassed?.length != 0) {
                    tempfetchproductsfilerobjcontext.price_min = props?.price_minpassed;
                }
                if (props.price_maxpassed != undefined && props.price_maxpassed != null && props?.price_maxpassed?.length != 0) {
                    tempfetchproductsfilerobjcontext.price_max = props?.price_maxpassed;
                }
                setProductFilterObjContext({ ...tempfetchproductsfilerobjcontext });
            }
        }
    }, [fetchingtype, ProductsFetchingTypeSectionObj]);
    useEffect(() => {
        if (fetchProductsQuery.isFetching) {
            setisproductsfetching(true);
        } else {
            setisproductsfetching(false);
        }
    }, [fetchProductsQuery.isFetching]);
    useEffect(() => {
        if (fetchcollectionsQueryContext.isFetching) {
            setisproductsfetching(true);
        } else {
            setisproductsfetching(false);
        }
    }, [fetchcollectionsQueryContext.isFetching]);
    useEffect(() => {
        if (fetchingtype == 'products') {
            if (fetchProductsQuery.isSuccess) {
                var allpagesarr = [];
                fetchProductsQuery.data.pages.forEach((page) => {
                    page.data.products.forEach((productobj) => {
                        allpagesarr.push(productobj);
                    });
                });

                cardobjassigner(allpagesarr);
            }
        }
    }, [fetchProductsQuery.isSuccess, fetchProductsQuery.dataUpdatedAt, fetchProductsQuery.data, favoriteprojectscountContext]);
    useEffect(() => {
        if (fetchingtype == 'vendors') {
            if (FetchVendorsQuery.isSuccess) {
                if (FetchVendorsQuery.data.data.vendors != undefined) {
                    cardobjassigner(FetchVendorsQuery?.data?.data?.vendors);
                }
            }
        }
    }, [FetchVendorsQuery.isSuccess, FetchVendorsQuery.data, FetchVendorsQuery.dataUpdatedAt]);
    useEffect(() => {
        if (fetchingtype == 'collections') {
            if (fetchcollectionsQueryContext.isSuccess) {
                cardobjassigner(fetchcollectionsQueryContext.data.data.collections);
            }
        }
    }, [fetchcollectionsQueryContext.isSuccess]);
    useEffect(() => {
        favassigner();
    }, [favoriteprojectscountContext]);
    useEffect(() => {
        if (props.scrollviewtoend) {
            if (sectionproperties?.view_as_slider_vertical != 'Slider (Horizontal)') {
                loadMore();
            }
        }
    }, [props.scrollviewtoend]);
    const favassigner = () => {
        if (fetchingtype == 'products') {
            if (cardsarray.length != 0) {
                if (favoriteprojectscountContext != undefined && Array.isArray(favoriteprojectscountContext)) {
                    var tempcardsarray = [...cardsarray];
                    tempcardsarray.forEach(function (arrayItem, arrayindex) {
                        arrayItem.IsFavExists = false;
                    });
                    tempcardsarray.forEach(function (arrayItem, arrayindex) {
                        favoriteprojectscountContext.forEach(function (favitem, favindex) {
                            if (arrayItem.productid == favitem) {
                                arrayItem.IsFavExists = true;
                            }
                        });
                    });
                    setcardsarray([...tempcardsarray]);
                }
            }
        }
    };
    const cardobjassigner = (fetchedarray) => {
        var temparray = [];
        fetchedarray?.forEach(function (arrayItem, arrayindex) {
            var cardobj = {
                name: '',
                image: '',
            };
            if (fetchingtype == 'products') {
                var itemquantity = 0;
                if (langdetect == 'en') {
                    cardobj.name = arrayItem.productinfo.name_en;
                } else {
                    cardobj.name = arrayItem.productinfo.name_ar;
                }
                if (arrayItem.productinfo.hasvariants == 0) {
                    fetchcustomercartQueryContext?.data?.data?.customercart?.cartitems?.forEach(function (cartitem, cartindex) {
                        if (cartitem.productid == arrayItem.productinfo.productid) {
                            itemquantity = cartitem.quantity;
                        }
                    });
                }
                cardobj.image = arrayItem.productinfo.productmainimage;
                cardobj.productid = arrayItem.productinfo.productid;
                cardobj.description_en = arrayItem.productinfo.description_en;
                cardobj.description_ar = arrayItem.productinfo.description_ar;
                cardobj.defaultprice = arrayItem.productinfo.defaultprice;
                cardobj.defaultsaleprice = arrayItem.productinfo.defaultsaleprice;
                cardobj.productimages = arrayItem.productinfo.productimages;
                cardobj.timestamp = arrayItem.productinfo.timestamp;
                cardobj.hassale = arrayItem.productinfo.hassale;
                cardobj.quantity = itemquantity;
                cardobj.hasvariants = arrayItem.productinfo.hasvariants;
                cardobj.productoverallrate = arrayItem.productinfo.productoverallrate;
                cardobj.productcanrate = arrayItem.productinfo.productcanrate;
                cardobj.productquantity = arrayItem.productinfo.productquantity;
                cardobj.quantavailtype = arrayItem.productinfo.quantavailtype;
                cardobj.isproducttobesold = arrayItem.productinfo.isproducttobesold;
                cardobj.maximumproductquant = arrayItem.productinfo.maximumproductquant;
                cardobj.minimumproductquant = arrayItem.productinfo.minimumproductquant;
                cardobj.prodaffpercentprofit = arrayItem.productinfo.prodaffpercentprofit;
                cardobj.productcashbackvalue = arrayItem.productinfo.productcashbackvalue;
                cardobj.currentquantity = arrayItem.productinfo.currentquantity;
                cardobj.measurmentunit = arrayItem.productinfo.measurmentunit;
                cardobj.product_phonenumber = arrayItem.productinfo.product_phonenumber;

                if (langdetect == 'en') {
                    cardobj.currencyname = fetchAuthorizationQueryContext?.data?.data?.currencyname_en;
                } else {
                    cardobj.currencyname = fetchAuthorizationQueryContext?.data?.data?.currencyname_ar;
                }

                if (favoriteprojectscountContext != undefined && favoriteprojectscountContext.length != 0) {
                    favoriteprojectscountContext.forEach(function (favitem, favindex) {
                        if (arrayItem.productinfo.productid == favitem) {
                            cardobj.IsFavExists = true;
                        }
                    });
                }
            } else if (fetchingtype == 'collections' || fetchingtype == 'innerparentcollections') {
                cardobj.collectionid = arrayItem.collectionid;
                if (langdetect == 'en') {
                    cardobj.name = arrayItem.title_en;
                } else {
                    cardobj.name = arrayItem.title_ar;
                }
                cardobj.description_en = arrayItem.description_en;
                cardobj.description_ar = arrayItem.description_ar;
                cardobj.image = arrayItem.collectionlogo;
            } else if (fetchingtype == 'categories') {
                cardobj.collectionid = arrayItem.categoryid;
                if (langdetect == 'en') {
                    cardobj.name = arrayItem.title_en;
                    cardobj.description = arrayItem.description_en;
                } else if (langdetect == 'ar') {
                    cardobj.name = arrayItem.title_ar;
                    cardobj.description = arrayItem.description_ar;
                }
                cardobj.image = arrayItem.categorylogo;
            } else if (fetchingtype == 'parentcollections' || fetchingtype == 'innercategories') {
                cardobj.collectionid = arrayItem.parentcollectionid;
                if (langdetect == 'en') {
                    cardobj.name = arrayItem.title_en;
                    cardobj.description = arrayItem.description_en;
                } else if (langdetect == 'ar') {
                    cardobj.name = arrayItem.title_ar;
                    cardobj.description = arrayItem.description_ar;
                }
                cardobj.image = arrayItem.parentcollectionlogo;
            } else if (fetchingtype == 'custom') {
            } else if (fetchingtype == 'vendors') {
                cardobj.name = arrayItem.vendorname;
                cardobj.collectionid = arrayItem.vendorid;
                cardobj.image = arrayItem.vendorlogourl;
            }
            temparray.push(cardobj);
        });

        setcardsarray([...temparray]);
    };
    const renderSpinner = () => {
        return (
            <View style={[generalstyles.allcentered, { height: 100, marginLeft: 'auto', marginRight: 'auto' }]}>
                <SpinnerButton buttonStyle={{ width: 30, height: 30 }} isLoading={true} indicatorCount={10} spinnerType={'MaterialIndicator'} spinnerColor={'#000'}></SpinnerButton>
            </View>
        );
    };
    const loadMore = () => {
        if (fetchProductsQuery.hasNextPage) {
            fetchProductsQuery.fetchNextPage();
        }
    };
    const setProductFilterObjContextPassingparams = (newobj) => {
        setProductFilterObjContext({ ...newobj });
    };
    const generalproductsnavigation = () => {
        if (fetchingtype == 'products') {
            if (ProductsFetchingTypeSectionObj.productfetchingtype == 'Collection') {
                navigation.navigate('TemplateDraftRouter', {
                    screen: StaticPagesLinksContext.GeneralProductsComponent,
                    params: {
                        genprodcompstinfo: {
                            collectionid: ProductsFetchingTypeSectionObj.collectionid,
                            srcfrom: 'GeneralProductsComponent',
                            fetchingtype: sectionitem?.productsfetchingtype,
                        },
                    },
                });
                // routingcountext(StaticPagesLinksContext.GeneralProductsComponent, true, ProductsFetchingTypeSectionObj.collectionid);
                // alert(ProductsFetchingTypeSectionObj.collectionid);
            } else {
                // navigation.navigate(StaticPagesLinksContext.GeneralProductsComponent);
                navigation.navigate('TemplateDraftRouter', {
                    screen: StaticPagesLinksContext.GeneralProductsComponent,
                    params: {
                        genprodcompstinfo: {
                            // collectionid: ProductsFetchingTypeSectionObj.collectionid,
                            srcfrom: 'GeneralProductsComponent',
                            fetchingtype: sectionitem?.productsfetchingtype,
                        },
                    },
                });
            }
        } else if (fetchingtype == 'parentcollections') {
            routingcountext(StaticPagesLinksContext.InnerCategory, {
                genprodcompstinfo: { collectionid: sectionitem?.productsfetchingtypeparentcollectioncategoryid, srcfrom: 'InnerCategory', fetchingtype: 'innercategories' },
            });
        }
        //  else if (fetchingtype == 'vendors') {
        //     // routingcountext(StaticPagesLinksContext.InnerCategory, {
        //     //     genprodcompstinfo: { collectionid: sectionitem?.productsfetchingtypeparentcollectioncategoryid, srcfrom: 'InnerCategory', fetchingtype: 'innercategories' },
        //     // });
        // }
        else {
            navigation.navigate(StaticPagesLinksContext.GeneralProductsComponent);
        }
    };
    const doesfetchhasnextproducts = () => {
        var fetchhasnextproduct = true;
        if (fetchProductsQuery.isSuccess) {
            if (fetchProductsQuery?.data?.pages[fetchProductsQuery?.data?.pages.length - 1]?.data?.products?.length < 12) {
                fetchhasnextproduct = false;
            }
        }
        return fetchhasnextproduct;
    };
    const Viewmorebtn = () => {
        return (
            <TouchableOpacity
                style={[
                    generalstyles.flexRow,
                    generalstyles.allcentered,
                    {
                        backgroundColor: sectionproperties.viewmorebtn_bgColor,
                        borderRadius: StyleParseToIntFuncContext(sectionproperties.viewmorebtn_borderBottomLeftRadius),
                        width: sectionproperties.viewmorebtn_Width == 0 ? 'auto' : StyleParseToIntFuncContext(sectionproperties.viewmorebtn_Width),
                        height: sectionproperties.viewmorebtn_Height == 0 ? 'auto' : StyleParseToIntFuncContext(sectionproperties.viewmorebtn_Height),
                        // width: 'auto',
                        // height: 'auto',
                    },
                ]}
                onPress={() => {
                    generalproductsnavigation();
                }}
            >
                {sectionproperties.viewmorebtn_fontSize != 0 && (
                    <Text
                        style={[
                            {
                                color: sectionproperties.viewmorebtn_Textcolor,
                                fontSize: StyleParseToIntFuncContext(sectionproperties.viewmorebtn_fontSize),
                                textAlign: 'left',
                                textDecorationLine:
                                    sectionproperties.showIcon == 'Show'
                                        ? 'none'
                                        : sectionproperties.viewmorebtn_Width == 0 && sectionproperties.viewmorebtn_Height == 0 && sectionproperties.showtextdecoration == 'Show'
                                        ? 'underline'
                                        : 'none',
                                fontFamily:
                                    sectionproperties.sectiontitlefontfamily == 'Poppins'
                                        ? sectionproperties.viewmorebtn_fontWeight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.viewmorebtn_fontWeight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.viewmorebtn_fontWeight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.viewmorebtn_fontWeight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.viewmorebtn_fontWeight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold'
                                        : sectionproperties.sectiontitlefontfamily == 'ASUL'
                                        ? sectionproperties.viewmorebtn_fontWeight == 300 ||
                                          sectionproperties.viewmorebtn_fontWeight == 400 ||
                                          sectionproperties.viewmorebtn_fontWeight == 500 ||
                                          sectionproperties.viewmorebtn_fontWeight == 600
                                            ? 'Asul-Regular'
                                            : sectionproperties.viewmorebtn_fontWeight == 600 || sectionproperties.viewmorebtn_fontWeight == 800
                                            ? 'Asul-Bold'
                                            : 'Asul-Regular'
                                        : 'Poppins-Medium',
                            },
                        ]}
                    >
                        {langdetect == 'en' ? sectionproperties.viewmorebtn_text : sectionproperties.viewmorebtn_text_ar}
                    </Text>
                )}
                {sectionproperties.showIcon == 'Show' && (
                    <AntDesign
                        name={langdetect == 'en' ? 'arrowright' : 'arrowleft'}
                        size={StyleParseToIntFuncContext(sectionproperties.viewmoreiconfontsize)}
                        style={{
                            color: sectionproperties.viewmorebtn_Textcolor,
                            marginStart: 2,
                        }}
                    />
                )}
            </TouchableOpacity>
        );
    };
    const SectionTitleContent = () => {
        return (
            <Text
                style={{
                    paddingHorizontal: sectionproperties.sectiontitlestyle == 'Line Before Text' ? 5 : 0,
                    color: sectionproperties.sectionTitleColor,
                    fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
                    fontFamily:
                        sectionproperties.sectiontitlefontfamily == 'Poppins'
                            ? sectionproperties.sectionTitleFontWeight == 300
                                ? 'Poppins-Thin'
                                : sectionproperties.sectionTitleFontWeight == 400
                                ? 'Poppins-Light'
                                : sectionproperties.sectionTitleFontWeight == 500
                                ? 'Poppins-Regular'
                                : sectionproperties.sectionTitleFontWeight == 600
                                ? 'Poppins-Medium'
                                : sectionproperties.sectionTitleFontWeight == 700
                                ? 'Poppins-Semibold'
                                : 'Poppins-Bold'
                            : sectionproperties.sectiontitlefontfamily == 'ASUL'
                            ? sectionproperties.sectionTitleFontWeight == 300
                                ? 'Asul-Regular'
                                : sectionproperties.sectionTitleFontWeight == 400
                                ? 'Asul-Regular'
                                : sectionproperties.sectionTitleFontWeight == 500
                                ? 'Asul-Regular'
                                : sectionproperties.sectionTitleFontWeight == 600
                                ? 'Asul-Bold'
                                : sectionproperties.sectionTitleFontWeight == 700
                                ? 'Asul-Bold'
                                : 'Poppins-Medium'
                            : sectionproperties.sectiontitlefontfamily == 'Pacifico'
                            ? 'Pacifico-Regular'
                            : sectionproperties.sectiontitlefontfamily == 'Great Vibes'
                            ? 'GreatVibes-Regular'
                            : sectionproperties.sectiontitlefontfamily == 'Playfair'
                            ? 'PlayfairDisplay'
                            : 'Poppins-Medium',
                    textAlign: 'left',
                }}
            >
                {langdetect == 'en' ? sectionproperties.sectionTitleContent : sectionproperties.sectionTitleContent_ar}
            </Text>
        );
    };
    const cardsrender = useMemo(() => {
        return (
            <View
                style={{
                    backgroundColor: sectionproperties.backgroundColortransparent == 'Transparent' ? 'Transparent' : sectionproperties.backgroundColor,
                    borderLeftWidth: StyleParseToIntFuncContext(sectionproperties.borderhorizontalwidth, '', true),
                    borderRightWidth: StyleParseToIntFuncContext(sectionproperties.borderhorizontalwidth, '', true),
                    borderTopWidth: StyleParseToIntFuncContext(sectionproperties.borderverticalwidth, '', true),
                    borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.borderverticalwidth, '', true),
                    borderColor: sectionproperties.sectioncardbordercolor,
                    borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.borderBottomLeftRadius, '', true),
                    borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.borderBottomRightRadius, '', true),
                    borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.borderTopLeftRadius, '', true),
                    borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.borderTopRightRadius, '', true),
                    marginLeft: langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.card_marginLeft) : StyleParseToIntFuncContext(sectionproperties.card_marginRight),
                    marginRight: langdetect == 'en' ? StyleParseToIntFuncContext(sectionproperties.card_marginRight) : StyleParseToIntFuncContext(sectionproperties.card_marginLeft),
                    borderColor: sectionproperties.sectioncardbordercolor,
                    // shadowColor: sectionproperties.sectioncardshadow == 'Show' ? sectionproperties.sectioncardshadowcolor : 'transparent',
                    // shadowOpacity: sectionproperties.sectioncardshadow == 'Show' ? 0.9 : 0,
                    // shadowOffset: {
                    //     width: 0,
                    //     height: sectionproperties.sectioncardshadow == 'Show' ? 3 : 0,
                    // },
                    // shadowRadius: sectionproperties.sectioncardshadow == 'Show' ? 3 : 0,
                    // elevation: sectionproperties.sectioncardshadow == 'Show' ? 1 : 0,
                }}
            >
                {StatePageProperties?.pageobj?.sections[props.sectionindexprops]?.childsections?.map((item, index) => {
                    if (item.tabexsectioninfo != null) {
                        if (item.sectionstructype == 'child' && TabexSectionsComponentsContext[item.tabexsectioninfo.sectioncompname] != undefined) {
                            var sectioncomp = TabexSectionsComponentsContext[item.tabexsectioninfo.sectioncompname];

                            return (
                                <>
                                    <View
                                        onPress={() => {
                                            if (props.fetchingtypeprops == 'collections') {
                                                routingcountext(StaticPagesLinksContext.GeneralProductsComponent, true, item.collectionid);
                                            }
                                        }}
                                        style={[
                                            {
                                                flexDirection:
                                                    sectionproperties.viewmorebtnshow == 'Show' &&
                                                    sectionproperties.sectiontitlestyle &&
                                                    (sectionproperties.sectiontitleposition == 'Centered') == 'Line Under Text'
                                                        ? 'column'
                                                        : 'row',
                                                alignItems: 'center',
                                                marginBottom: StyleParseToIntFuncContext(
                                                    sectionproperties.sectionTitleMarginBottom != null && sectionproperties.sectionTitleMarginBottom != undefined
                                                        ? sectionproperties.sectionTitleMarginBottom
                                                        : 0,
                                                ),
                                                marginTop: StyleParseToIntFuncContext(
                                                    sectionproperties.sectionTitleMarginTop != null && sectionproperties.sectionTitleMarginTop != undefined
                                                        ? sectionproperties.sectionTitleMarginTop
                                                        : 0,
                                                ),
                                                paddingLeft: StyleParseToIntFuncContext(
                                                    sectionproperties.sectionTitleMarginLeft != null && sectionproperties.sectionTitleMarginLeft != undefined
                                                        ? sectionproperties.sectionTitleMarginLeft
                                                        : 0,
                                                ),
                                                paddingRight: StyleParseToIntFuncContext(
                                                    sectionproperties.sectionTitleMarginRight != null && sectionproperties.sectionTitleMarginRight != undefined
                                                        ? sectionproperties.sectionTitleMarginRight
                                                        : 0,
                                                ),
                                            },
                                        ]}
                                    >
                                        {sectionproperties.sectiontitlestyle == 'Line Before Text' && <View style={{ flex: 1, backgroundColor: sectionproperties.linebgcolor, height: 1 }}></View>}
                                        {sectionproperties.sectiontitleshow == 'Show' && sectionproperties.showbackbtn == 'Hide' && (
                                            <View
                                                style={[
                                                    generalstyles.flexRow,
                                                    {
                                                        flex: sectionproperties.sectiontitlestyle == 'Line Before Text' ? 0 : 1,
                                                        justifyContent: sectionproperties.sectiontitleposition == 'Centered' ? 'center' : 'flex-start',
                                                    },
                                                ]}
                                            >
                                                {SectionTitleContent()}
                                            </View>
                                        )}
                                        {sectionproperties.sectiontitleshow == 'Show' && sectionproperties.showbackbtn == 'Show' && (
                                            <TouchableOpacity
                                                style={[
                                                    generalstyles.flexRow,
                                                    {
                                                        flex: sectionproperties.sectiontitlestyle == 'Line Before Text' ? 0 : 1,
                                                        alignItems: sectionproperties.sectiontitleposition == 'Centered' ? 'center' : 'flex-start',
                                                    },
                                                ]}
                                                onPress={() => {
                                                    navigation.goBack();
                                                }}
                                            >
                                                <TouchableOpacity
                                                    style={[
                                                        generalstyles.allcentered,
                                                        {
                                                            marginTop: 'auto',
                                                            marginBottom: 'auto',
                                                            marginEnd: 5,
                                                        },
                                                    ]}
                                                >
                                                    <AntDesign
                                                        name={langdetect == 'en' ? 'arrowleft' : 'arrowright'}
                                                        size={StyleParseToIntFuncContext(sectionproperties.backbtnfontSize)}
                                                        style={{
                                                            color: sectionproperties.backbtncolor,
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                                {SectionTitleContent()}
                                            </TouchableOpacity>
                                        )}
                                        {sectionproperties.sectiontitlestyle == 'Line Before Text' && <View style={{ flex: 1, backgroundColor: sectionproperties.linebgcolor, height: 1 }}></View>}
                                        {sectionproperties.viewmorebtnshow == 'Show' && sectionproperties.sectiontitleposition != 'Centered' && sectionproperties.prodCatShow != 'Show' && (
                                            <View>{Viewmorebtn()}</View>
                                        )}
                                        {sectionproperties.showFilter == 'show' && sectionproperties.filterdirection == 'Vertical' && (
                                            <TouchableOpacity
                                                style={[
                                                    generalstyles.allcentered,
                                                    {
                                                        marginStart: 'auto',
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.filter_borderBottomLeftRadius, '', true),
                                                        backgroundColor: sectionproperties.filter_backgroundcolor,
                                                    },
                                                ]}
                                                onPress={() => {
                                                    routingcountext(StaticPagesLinksContext.Filter, {
                                                        ProductFilterObjContext: ProductFilterObjContext,
                                                        setProductFilterObjContext: setProductFilterObjContext,
                                                    });
                                                }}
                                            >
                                                <Image source={icons.filter} resizeMode="cover" style={[{ width: '80%', height: '80%', tintColor: sectionproperties.iconColor }]} />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    {sectionproperties.prodCatShow == 'Show' && (
                                        <View
                                            style={[
                                                generalstyles.flexRow,
                                                {
                                                    paddingLeft: StyleParseToIntFuncContext(
                                                        sectionproperties.sectionTitleMarginLeft != null && sectionproperties.sectionTitleMarginLeft != undefined
                                                            ? sectionproperties.sectionTitleMarginLeft
                                                            : 0,
                                                    ),
                                                    paddingRight: StyleParseToIntFuncContext(
                                                        sectionproperties.sectionTitleMarginRight != null && sectionproperties.sectionTitleMarginRight != undefined
                                                            ? sectionproperties.sectionTitleMarginRight
                                                            : 0,
                                                    ),
                                                    marginBottom: StyleParseToIntFuncContext(
                                                        sectionproperties.descriptionMarginBottom != null && sectionproperties.descriptionMarginBottom != undefined
                                                            ? sectionproperties.descriptionMarginBottom
                                                            : 0,
                                                    ),
                                                },
                                            ]}
                                        >
                                            <View
                                                style={{
                                                    flex: 1,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.prodCatFontSize),
                                                        color: sectionproperties.prodCatColor,
                                                        fontFamily:
                                                            sectionproperties.prodCatFontWeight == 300
                                                                ? 'Poppins-Thin'
                                                                : sectionproperties.prodCatFontWeight == 400
                                                                ? 'Poppins-Light'
                                                                : sectionproperties.prodCatFontWeight == 500
                                                                ? 'Poppins-Regular'
                                                                : sectionproperties.prodCatFontWeight == 600
                                                                ? 'Poppins-Medium'
                                                                : sectionproperties.prodCatFontWeight == 700
                                                                ? 'Poppins-Semibold'
                                                                : 'Poppins-Bold',
                                                        textAlign: sectionproperties.descriptionCentered == 'Centered' ? 'center' : 'left',
                                                    }}
                                                >
                                                    {langdetect == 'en' ? sectionproperties.descriptionContentEn : sectionproperties.descriptionContentAr}
                                                </Text>
                                            </View>
                                            {sectionproperties.viewmorebtnshow == 'Show' && sectionproperties.sectiontitleposition != 'Centered' && sectionproperties.prodCatShow == 'Show' && (
                                                <View>{Viewmorebtn()}</View>
                                            )}
                                        </View>
                                    )}
                                    {sectionproperties.viewmorebtnshow == 'Show' && sectionproperties.sectiontitleposition == 'Centered' && (
                                        <View style={[generalstyles.allcentered, { alignItems: 'center' }]}>{Viewmorebtn()}</View>
                                    )}
                                    {sectionproperties.showFilter == 'show' && sectionproperties.filterdirection == 'Horizontal' && (
                                        <View>
                                            <FilterHorizontal
                                                ProductFilterObjContext={ProductFilterObjContext}
                                                setProductFilterObjContext={setProductFilterObjContext}
                                                sectionproperties={sectionproperties}
                                            />
                                        </View>
                                    )}
                                    <View
                                        style={{
                                            paddingLeft: StyleParseToIntFuncContext(
                                                sectionproperties.sectionTitleMarginLeft != null && sectionproperties.sectionTitleMarginLeft != undefined
                                                    ? sectionproperties.sectionTitleMarginLeft
                                                    : 0,
                                            ),
                                            paddingRight: StyleParseToIntFuncContext(
                                                sectionproperties.sectionTitleMarginRight != null && sectionproperties.sectionTitleMarginRight != undefined
                                                    ? sectionproperties.sectionTitleMarginRight
                                                    : 0,
                                            ),
                                        }}
                                    >
                                        {sectionproperties.sectiontitlestyle == 'Line Under Text' && sectionproperties.showseparator == 'Show' && (
                                            <View
                                                style={{
                                                    flex: 1,
                                                    backgroundColor: sectionproperties.linebgcolor,
                                                    height: 1,
                                                    marginBottom: StyleParseToIntFuncContext(
                                                        sectionproperties.sectionTitleMarginBottom != null && sectionproperties.sectionTitleMarginBottom != undefined
                                                            ? sectionproperties.sectionTitleMarginBottom
                                                            : 0,
                                                    ),
                                                }}
                                            ></View>
                                        )}
                                    </View>
                                    {isproductsfetching && renderSpinner()}
                                    {!isproductsfetching && cardsarray.length == 0 && (
                                        <View style={[generalstyles.allcentered, { width: '100%', marginVertical: 150 }]}>
                                            <Ionicons name="ios-sad-outline" size={StyleParseToIntFuncContext(sectionproperties.noprod_iconfontSize)} color={sectionproperties.noprod_iconcolor} />
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        sectionproperties.noprod_fontWeight == 300
                                                            ? 'Poppins-Thin'
                                                            : sectionproperties.noprod_fontWeight == 400
                                                            ? 'Poppins-Light'
                                                            : sectionproperties.noprod_fontWeight == 500
                                                            ? 'Poppins-Regular'
                                                            : sectionproperties.noprod_fontWeight == 600
                                                            ? 'Poppins-Medium'
                                                            : sectionproperties.noprod_fontWeight == 700
                                                            ? 'Poppins-Semibold'
                                                            : 'Poppins-Bold',
                                                    color: sectionproperties.noprod_color,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.noprod_fontSize),
                                                }}
                                            >
                                                {langdetect == 'en' ? sectionproperties.nocards_content_en : sectionproperties.nocards_content_ar}
                                            </Text>
                                        </View>
                                    )}
                                    <View
                                        style={{
                                            paddingStart: StyleParseToIntFuncContext(sectionproperties.paddingLeft),
                                            paddingEnd: StyleParseToIntFuncContext(sectionproperties.paddingRight),
                                            marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom),
                                            marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop),
                                        }}
                                    >
                                        {sectionproperties.view_as_slider_vertical == 'Slider (Horizontal)' && (
                                            <View style={{ marginBottom: 0 }}>
                                                <FlatList
                                                    data={cardsarray?.slice(0, 12)}
                                                    horizontal
                                                    showsHorizontalScrollIndicator={false}
                                                    // onEndReached={loadMore}
                                                    keyExtractor={(item, index) => index}
                                                    onEndReachedThreshold={0.3}
                                                    ListFooterComponent={fetchProductsQuery.isFetchingNextPage ? renderSpinner : null}
                                                    renderItem={(data123) => {
                                                        return (
                                                            <View key={data123.index}>
                                                                {React.createElement(sectioncomp, {
                                                                    sectionidprops: item.sectionid,
                                                                    sectionindexprops: index,
                                                                    cardinfoitemprops: data123.item,
                                                                    cardinfoindexprops: data123.index,
                                                                    fetchingtypeprops: fetchingtype,
                                                                    sectiondirection: 'slider',
                                                                    sectionpropertiesProps: item.sectionproperties,
                                                                    StatePageProperties: StatePageProperties,
                                                                    fontFamilyProps: sectionproperties.sectiontitlefontfamily == 'ASUL' ? 'ASUL' : 'Poppins',
                                                                })}
                                                            </View>
                                                        );
                                                    }}
                                                />
                                                {/* <Text>{item.tabexsectioninfo.sectioncompname}ss</Text> */}
                                                {/* <RecyclerViewComp
                                                    sectioncompname={item.tabexsectioninfo.sectioncompname}
                                                    sectioncomp={sectioncomp}
                                                    sectionindexprops={index}
                                                    sectionidprops={item.sectionid}
                                                    fetchingtypeprops={fetchingtype}
                                                    sectiondirection={'slider'}
                                                    fontFamilyProps={sectionproperties.sectiontitlefontfamily == 'ASUL' ? 'ASUL' : 'Poppins'}
                                                    StatePageProperties={StatePageProperties}
                                                    loadMore={loadMore}
                                                    FetchingQuery={fetchProductsQuery}
                                                    data={cardsarray}
                                                /> */}
                                            </View>
                                        )}
                                        {sectionproperties.view_as_slider_vertical != 'Slider (Horizontal)' && (
                                            <View
                                                style={{
                                                    display: 'flex',
                                                    flex: 1,
                                                    alignItems: SIZES.width < 768 ? 'center' : fetchingtype != 'products' && SIZES.width > 768 ? 'center' : 'flex-start',
                                                    width: '100%',
                                                    // paddingHorizontal: SIZES.width > 1024 ? 10 : 0,
                                                }}
                                            >
                                                {cardsarray.length != 0 && (
                                                    <FlatList
                                                        data={cardsarray}
                                                        vertical
                                                        keyExtractor={(item, index) => index}
                                                        showsHorizontalScrollIndicator={false}
                                                        // onEndReached={() => {
                                                        //     console.log('LOAD MORE HERE');
                                                        //     loadMore();
                                                        // }}
                                                        // onEndReachedThreshold={0.1}

                                                        scrollEventThrottle={0}
                                                        ListFooterComponent={fetchProductsQuery.isFetchingNextPage ? renderSpinner : null}
                                                        renderItem={(data123, index) => {
                                                            if (sectionproperties.overallnumberofcards == 0) {
                                                                return (
                                                                    <View key={data123.index}>
                                                                        {React.createElement(sectioncomp, {
                                                                            sectionidprops: item.sectionid,
                                                                            sectionindexprops: index,
                                                                            cardinfoitemprops: data123.item,
                                                                            cardinfoindexprops: data123.index,
                                                                            fetchingtypeprops: fetchingtype,
                                                                            sectiondirection: 'vertical',
                                                                            sectionpropertiesProps: item.sectionproperties,
                                                                            fontFamilyProps: sectionproperties.sectiontitlefontfamily == 'ASUL' ? 'ASUL' : 'Poppins',
                                                                            // StatePageProperties: StatePageProperties,
                                                                        })}
                                                                    </View>
                                                                );
                                                            } else if (sectionproperties.overallnumberofcards != 0) {
                                                                if (data123.index < sectionproperties.overallnumberofcards) {
                                                                    return (
                                                                        <View key={data123.index}>
                                                                            {React.createElement(sectioncomp, {
                                                                                sectionidprops: item.sectionid,
                                                                                sectionindexprops: index,
                                                                                cardinfoitemprops: data123.item,
                                                                                cardinfoindexprops: data123.index,
                                                                                fetchingtypeprops: fetchingtype,
                                                                                sectiondirection: 'vertical',
                                                                                sectionpropertiesProps: item.sectionproperties,
                                                                                fontFamilyProps: sectionproperties.sectiontitlefontfamily == 'ASUL' ? 'ASUL' : 'Poppins',
                                                                                // StatePageProperties: StatePageProperties,
                                                                            })}
                                                                        </View>
                                                                    );
                                                                }
                                                            } else {
                                                                return (
                                                                    <View key={data123.index}>
                                                                        {React.createElement(sectioncomp, {
                                                                            sectionidprops: item.sectionid,
                                                                            sectionindexprops: index,
                                                                            cardinfoitemprops: data123.item,
                                                                            cardinfoindexprops: data123.index,
                                                                            fetchingtypeprops: fetchingtype,
                                                                            sectiondirection: 'vertical',
                                                                            sectionpropertiesProps: item.sectionproperties,
                                                                            fontFamilyProps: sectionproperties.sectiontitlefontfamily == 'ASUL' ? 'ASUL' : 'Poppins',
                                                                            // StatePageProperties: StatePageProperties,
                                                                        })}
                                                                    </View>
                                                                );
                                                            }
                                                        }}
                                                        key={
                                                            SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'CTAProductCard'
                                                                ? 3
                                                                : SIZES.width > 700 && item.tabexsectioninfo.sectioncompname == 'SimpleCategoryCard'
                                                                ? 8
                                                                : SIZES.width > 1024 && item.tabexsectioninfo.sectioncompname == 'CardWithImageOnTop'
                                                                ? 4
                                                                : SIZES.width > 1024 && item.tabexsectioninfo.sectioncompname == 'StylishCard'
                                                                ? 4
                                                                : SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'StylishCard'
                                                                ? 4
                                                                : SIZES.width > 1024 && item.tabexsectioninfo.sectioncompname == 'HorizontalProductCard'
                                                                ? 2
                                                                : SIZES.width > 1024 && item.tabexsectioninfo.sectioncompname == 'ProductCardWithBlurEffect'
                                                                ? 4
                                                                : SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'ProductCardWithBlurEffect'
                                                                ? 3
                                                                : SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'ClassicHorizontalProductCard'
                                                                ? 2
                                                                : SIZES.width > 1024
                                                                ? 5
                                                                : SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'HorizontalProductCard'
                                                                ? 2
                                                                : SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'CardWithImageOnTop'
                                                                ? 3
                                                                : SIZES.width > 768
                                                                ? 4
                                                                : item.tabexsectioninfo.sectioncompname == 'CardWithImageOnTop' ||
                                                                  item.tabexsectioninfo.sectioncompname == 'HorizontalProductCard' ||
                                                                  item.tabexsectioninfo.sectioncompname == 'ClassicHorizontalProductCard' ||
                                                                  item.tabexsectioninfo.sectioncompname == 'ProductCardWithBlurEffect' ||
                                                                  item.tabexsectioninfo.sectioncompname == 'CTAProductCard'
                                                                ? 1
                                                                : item.tabexsectioninfo.sectioncompname == 'SimpleCategoryCard'
                                                                ? 4
                                                                : SIZES.width > 1024 && item.tabexsectioninfo.sectioncompname == 'ChiqueCard'
                                                                ? 4
                                                                : SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'ChiqueCard'
                                                                ? 3
                                                                : 2
                                                        }
                                                        numColumns={
                                                            SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'CTAProductCard'
                                                                ? 3
                                                                : SIZES.width > 700 && item.tabexsectioninfo.sectioncompname == 'SimpleCategoryCard'
                                                                ? 8
                                                                : SIZES.width > 1024 && item.tabexsectioninfo.sectioncompname == 'CardWithImageOnTop'
                                                                ? 4
                                                                : SIZES.width > 1024 && item.tabexsectioninfo.sectioncompname == 'StylishCard'
                                                                ? 4
                                                                : SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'StylishCard'
                                                                ? 4
                                                                : SIZES.width > 1024 && item.tabexsectioninfo.sectioncompname == 'HorizontalProductCard'
                                                                ? 2
                                                                : SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'ProductCardWithBlurEffect'
                                                                ? 3
                                                                : SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'ClassicHorizontalProductCard'
                                                                ? 2
                                                                : SIZES.width > 1024
                                                                ? 5
                                                                : SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'HorizontalProductCard'
                                                                ? 2
                                                                : SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'CardWithImageOnTop'
                                                                ? 3
                                                                : SIZES.width > 1024 && item.tabexsectioninfo.sectioncompname == 'ChiqueCard'
                                                                ? 4
                                                                : SIZES.width > 768 && item.tabexsectioninfo.sectioncompname == 'ChiqueCard'
                                                                ? 3
                                                                : SIZES.width > 768
                                                                ? 4
                                                                : item.tabexsectioninfo.sectioncompname == 'CardWithImageOnTop' ||
                                                                  item.tabexsectioninfo.sectioncompname == 'HorizontalProductCard' ||
                                                                  item.tabexsectioninfo.sectioncompname == 'ClassicHorizontalProductCard' ||
                                                                  item.tabexsectioninfo.sectioncompname == 'ProductCardWithBlurEffect' ||
                                                                  item.tabexsectioninfo.sectioncompname == 'CTAProductCard'
                                                                ? 1
                                                                : item.tabexsectioninfo.sectioncompname == 'SimpleCategoryCard'
                                                                ? 4
                                                                : 2
                                                        }
                                                    />
                                                )}
                                                {!fetchProductsQuery.isFetchingNextPage &&
                                                    !isproductsfetching &&
                                                    fetchingtype == 'products' &&
                                                    doesfetchhasnextproducts() &&
                                                    sectionproperties.showpagination == 'Show' && (
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                loadMore();
                                                            }}
                                                        >
                                                            <Text>{fetchProductsQuery.isFetchingNextPage ? '' : lang.loadmore}</Text>
                                                        </TouchableOpacity>
                                                    )}
                                            </View>
                                        )}
                                    </View>
                                </>
                            );
                        }
                    }
                })}
            </View>
        );
    }, [cardsarray, isproductsfetching, ProductFilterObjContext]);
    return (
        <View
            style={{
                backgroundColor: sectionproperties.outerbgcolor,
            }}
        >
            {/* <Text> sscol{fetchcollectionsQueryContext.isFetching.toString()}</Text> */}
            {/* <Text> ss{fetchProductsQuery.isFetching.toString()}</Text> */}

            {cardsrender}
        </View>
    );
};
const styles = StyleSheet.create({});

export default CardsSection;
