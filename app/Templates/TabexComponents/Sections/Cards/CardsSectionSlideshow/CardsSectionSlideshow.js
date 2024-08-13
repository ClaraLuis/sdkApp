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
import { Ionicons } from '@expo/vector-icons';
// import RecyclerViewComp from '../RecyclerViewComp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';
import { ImageComponent } from '../../../../ImageComponent';

const CardsSectionSlideshow = (props) => {
    const { fetchcollections_API, fetchvendors_API } = API();
    const navigation = useNavigation();
    const { ref, inView } = useInView();
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext, INSTAPIKEYCONTEXT, TabexSectionsComponentsContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { fetchAuthorizationQueryContext, fetchcustomercartQueryContext, FetchQueriesEngineContext, SearchHeaderMutationContext, favoriteprojectscountContext, cardonclickfunctionContext } =
        useContext(FetchingContext);
    const { ProductFilterObjContext, setProductFilterObjContext } = useContext(ProductsCardsSectionContext);
    const { StaticPagesLinksContext, routingcountext } = useContext(TemplateRoutingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [isproductsfetching, setisproductsfetching] = useState(false);
    const [cardsarray, setcardsarray] = useState([]);
    const [fetchingtype, setfetchingtype] = useState('');
    const [sectionitem, setsectionitem] = useState('');
    const [StatePageProperties, setStatePageProperties] = useState({});
    const [ParentCollectionsForCollectionQueryArr, setParentCollectionsForCollectionQueryArr] = useState('');
    const fetchcollectionsQueryContext = useQuery(
        ['fetchcollections_API' + JSON.stringify(ParentCollectionsForCollectionQueryArr)],
        () => fetchcollections_API({ parentcollectionid: ParentCollectionsForCollectionQueryArr }),
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
                        setProductsFetchingTypeSectionObj({
                            // productfetchingtype: 'Random',
                            productfetchingtype: lcproductfetchingtype,
                            collectionid: props.collectionidprops,
                            grouptype: props.grouptypeprops,
                            grouptyperefid: props.grouptyperefidprops,
                        });
                    } else if (props.srcfromprops == 'InnerGroups' || props.srcfromprops == 'InnerCategory' || props.srcfromprops == 'InnerParentCollection') {
                        setfetchingtype(props.fetchingtypepassedprops);
                    } else if (props.srcfromprops == 'innervendors') {
                        if (props.collectionidprops != undefined && props.collectionidprops != null) {
                            var tempProductFilterObjContext = { ...ProductFilterObjContext };
                            tempProductFilterObjContext.collections.push(props.collectionidprops);
                            setProductFilterObjContext({ ...tempProductFilterObjContext });
                        }
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
                            var arrafterfilter = [];
                            parentcollections.forEach(function (parentcolitem, parcolindex) {
                                if (parentcolitem.categoryid == props.collectionidprops) {
                                    arrafterfilter.push(parentcolitem);
                                }
                            });
                            parentcollections = arrafterfilter;
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
        } else {
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
                                    sectionproperties.showIcon == 'Show' ? 'none' : sectionproperties.viewmorebtn_Width == 0 && sectionproperties.viewmorebtn_Height == 0 ? 'underline' : 'none',
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
                    <Ionicons
                        name={langdetect == 'en' ? 'md-arrow-forward-sharp' : 'md-arrow-back-sharp'}
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
    const cardsrender = useMemo(() => {
        return (
            <View
                style={{
                    backgroundColor: sectionproperties.backgroundColor,
                }}
            >
                <View
                    onPress={() => {
                        if (props.fetchingtypeprops == 'collections') {
                            routingcountext(StaticPagesLinksContext.GeneralProductsComponent, true, item.collectionid);
                        }
                    }}
                    style={[
                        {
                            flexDirection:
                                sectionproperties.viewmorebtnshow == 'Show' && sectionproperties.sectiontitlestyle && (sectionproperties.sectiontitleposition == 'Centered') == 'Line Under Text'
                                    ? 'column'
                                    : 'row',
                            alignItems: 'center',
                            marginBottom: StyleParseToIntFuncContext(
                                sectionproperties.sectionTitleMarginBottom != null && sectionproperties.sectionTitleMarginBottom != undefined ? sectionproperties.sectionTitleMarginBottom : 0,
                            ),
                            marginTop: StyleParseToIntFuncContext(
                                sectionproperties.sectionTitleMarginTop != null && sectionproperties.sectionTitleMarginTop != undefined ? sectionproperties.sectionTitleMarginTop : 0,
                            ),
                            paddingLeft: StyleParseToIntFuncContext(
                                sectionproperties.sectionTitleMarginLeft != null && sectionproperties.sectionTitleMarginLeft != undefined ? sectionproperties.sectionTitleMarginLeft : 0,
                            ),
                            paddingRight: StyleParseToIntFuncContext(
                                sectionproperties.sectionTitleMarginRight != null && sectionproperties.sectionTitleMarginRight != undefined ? sectionproperties.sectionTitleMarginRight : 0,
                            ),
                        },
                    ]}
                >
                    <View
                        style={{
                            alignItems: sectionproperties.sectiontitleposition == 'Centered' ? 'center' : 'flex-start',
                            flex: 1,
                        }}
                    >
                        {sectionproperties.sectiontitleshow == 'Show' && (
                            <Text
                                style={{
                                    color: sectionproperties.sectionTitleColor,
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
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
                                    textAlign: 'left',
                                }}
                            >
                                {langdetect == 'en' ? sectionproperties.sectionTitleContent : sectionproperties.sectionTitleContent_ar}
                            </Text>
                        )}
                    </View>
                    {sectionproperties.viewmorebtnshow == 'Show' && sectionproperties.sectiontitleposition != 'Centered' && sectionproperties.prodCatShow != 'Show' && <View>{Viewmorebtn()}</View>}
                    {sectionproperties.showFilter == 'show' && (
                        <TouchableOpacity
                            style={[
                                generalstyles.allcentered,
                                {
                                    marginStart: 5,
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
                                    sectionproperties.sectionTitleMarginLeft != null && sectionproperties.sectionTitleMarginLeft != undefined ? sectionproperties.sectionTitleMarginLeft : 0,
                                ),
                                paddingRight: StyleParseToIntFuncContext(
                                    sectionproperties.sectionTitleMarginRight != null && sectionproperties.sectionTitleMarginRight != undefined ? sectionproperties.sectionTitleMarginRight : 0,
                                ),
                                marginBottom: StyleParseToIntFuncContext(
                                    sectionproperties.descriptionMarginBottom != null && sectionproperties.descriptionMarginBottom != undefined ? sectionproperties.descriptionMarginBottom : 0,
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
                        {sectionproperties.viewmorebtnshow == 'Show' && sectionproperties.sectiontitleposition != 'Centered' && sectionproperties.prodCatShow == 'Show' && <View>{Viewmorebtn()}</View>}
                    </View>
                )}
                {sectionproperties.viewmorebtnshow == 'Show' && sectionproperties.sectiontitleposition == 'Centered' && (
                    <View style={[generalstyles.allcentered, { alignItems: 'center' }]}>{Viewmorebtn()}</View>
                )}
                <View
                    style={{
                        paddingLeft: StyleParseToIntFuncContext(
                            sectionproperties.sectionTitleMarginLeft != null && sectionproperties.sectionTitleMarginLeft != undefined ? sectionproperties.sectionTitleMarginLeft : 0,
                        ),
                        paddingRight: StyleParseToIntFuncContext(
                            sectionproperties.sectionTitleMarginRight != null && sectionproperties.sectionTitleMarginRight != undefined ? sectionproperties.sectionTitleMarginRight : 0,
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
                                    sectionproperties.sectionTitleMarginBottom != null && sectionproperties.sectionTitleMarginBottom != undefined ? sectionproperties.sectionTitleMarginBottom : 0,
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
                <TouchableOpacity
                    style={{
                        paddingStart: StyleParseToIntFuncContext(sectionproperties.paddingLeft),
                        paddingEnd: StyleParseToIntFuncContext(sectionproperties.paddingRight),
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom),
                        marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop),
                    }}
                >
                    <Swiper
                        style={{ height: StyleParseToIntFuncContext(sectionproperties.image_height) }}
                        showsButtons={sectionproperties.showarrows == 'Show' ? true : false}
                        dotColor={sectionproperties.inactivedotcolor}
                        activeDotColor={sectionproperties.activedotcolor}
                        showsPagination={sectionproperties.showpagination == 'Show' ? true : false}
                        key={cardsarray.length}
                    >
                        {cardsarray.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    style={[
                                        {
                                            height: '100%',
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        },
                                    ]}
                                    onPress={() => {
                                        cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);

                                        // cardonclickfunctionContext('productinfo', item.productid, null, null);
                                    }}
                                >
                                    <View
                                        style={[
                                            generalstyles.flexColumn,
                                            {
                                                width: '100%',
                                                height: '100%',
                                            },
                                        ]}
                                    >
                                        <View
                                            style={{ width: '100%', height: '100%' }}
                                            // onPress={() => {
                                            //     cardonclickfunctionContext(sectionproperties.onClickRoute, item.productid, props.fetchingtypeprops, item.collectionid);
                                            // }}
                                        >
                                            <ImageComponent
                                                resizeMethod="resize"
                                                resizeMode={sectionproperties.bgcovercontain == 'Cover' ? 'cover' : 'contain'}
                                                path={'/tr:w-' + sectionproperties.imagetr_w + ',h-' + sectionproperties.imagetr_h + '/' + item.image}
                                                style={[
                                                    {
                                                        width: '100%',
                                                        height: '100%',
                                                        borderTopLeftRadius:
                                                            langdetect == 'en'
                                                                ? StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true)
                                                                : StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true),
                                                        borderTopRightRadius:
                                                            langdetect == 'en'
                                                                ? StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true)
                                                                : StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true),
                                                        borderBottomLeftRadius:
                                                            langdetect == 'en'
                                                                ? StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true)
                                                                : StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true),
                                                        borderBottomRightRadius:
                                                            langdetect == 'en'
                                                                ? StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true)
                                                                : StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true),
                                                    },
                                                ]}
                                            />
                                        </View>
                                        <View
                                            style={[
                                                generalstyles.allcentered,
                                                generalstyles.flexColumn,
                                                {
                                                    position: 'absolute',
                                                    bottom: 100,
                                                    width: '100%',
                                                },
                                            ]}
                                        >
                                            <Text
                                                ellipsizeMode="tail"
                                                numberOfLines={1}
                                                style={[
                                                    {
                                                        color: sectionproperties.prodNameColor,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.prodNameFontSize),
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
                                                        textAlign: 'center',
                                                    },
                                                ]}
                                            >
                                                {item.name}
                                            </Text>
                                            {sectionproperties.prodPriceShow == 'Show' && (
                                                <Text
                                                    style={{
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
                                                    {langdetect == 'en' ? item.currencyname : ''} {item.hassale == 1 ? item.defaultsaleprice : item.defaultprice}{' '}
                                                    {langdetect == 'en' ? '' : item.currencyname}
                                                </Text>
                                            )}
                                            {sectionproperties.prodsalePriceshow == 'Show' && item.hassale == 1 && (
                                                <Text
                                                    style={{
                                                        color: sectionproperties.prodsalePriceColor,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.prodsalepriceFontSize),
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
                                                        textDecorationLine: 'line-through',
                                                        textDecorationStyle: 'solid',
                                                    }}
                                                >
                                                    {langdetect == 'en' ? item.currencyname : ''} {item.defaultprice} {langdetect == 'en' ? '' : item.currencyname}
                                                </Text>
                                            )}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </Swiper>
                </TouchableOpacity>
            </View>
        );
    }, [cardsarray, isproductsfetching, ProductFilterObjContext]);
    return (
        <View>
            {/* <Text> sscol{fetchcollectionsQueryContext.isFetching.toString()}</Text> */}
            {/* <Text> ss{fetchProductsQuery.isFetching.toString()}</Text> */}

            {cardsrender}
        </View>
    );
};
const styles = StyleSheet.create({});

export default CardsSectionSlideshow;
