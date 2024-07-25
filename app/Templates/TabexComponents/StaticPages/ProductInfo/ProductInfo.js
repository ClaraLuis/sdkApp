import React, { useState, useContext, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Image, View, Text, TouchableOpacity, Linking, Share } from 'react-native';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import API from '../../../API/API';
import { useQuery, useQueryClient } from 'react-query';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { urlEndpoint } from '../../../../config/imagekit';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Product_itemtype from './Product_itemtype';
import Service_itemtype from './Service_itemtype';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { AntDesign, Feather, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from 'react-native-vector-icons';
import SpinnerButton from 'react-native-spinner-button';
// import StarRating from 'react-native-star-rating';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { fonts } from 'react-native-elements/dist/config';
import { ImageComponent } from '../../../ImageComponent';
import { FontAwesome } from '@expo/vector-icons';
import Stars from 'react-native-stars';

const ProductInfo = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const navigation = useNavigation();
    const { routingcountext, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
    const carouselRef = useRef();
    const queryClient = useQueryClient();
    const { fetchProductInfo_API, FetchRelatedProducts_API } = API();
    const { lang, langdetect } = useContext(LanguageContext);
    const [productimagesarray, setproductimagesarray] = useState([]);
    const [productimagesarrayy, setproductimagesarrayy] = useState([]);
    const [RelatedProductsTagid, setRelatedProductsTagid] = useState('');
    const [Relatedproducts, setRelatedproducts] = useState([]);
    const [StatePageProperties, setStatePageProperties] = useState({});
    const [IsFavItem, setIsFavItem] = useState(false);
    const { INSTAPIKEYCONTEXT, StyleParseToIntFuncContext, CurrentPageIdContext, imageurlendpointcontext } = useContext(WebsiteDesignWorkPlaceContext);
    const [productimagesarrayy_ar, setproductimagesarrayy_ar] = useState([]);
    const [quantityconditionfoundobj, setquantityconditionfoundobj] = useState(null);
    const [filterproductreviews, setfilterproductreviews] = useState('all');
    const [productreviews, setproductreviews] = useState([]);
    const [canuserAddReview, setcanuserAddReview] = useState(false);
    const [variantindexcompleted, setvariantindexcompleted] = useState('');
    const [CarosalindexSelected, setCarosalindexSelected] = useState(0);

    const [addtocardpayloadobj, setaddtocardpayloadobj] = useState({
        functype: 'add',
        item_type: 'product',
        productid: '',
        variantid: '',
        quantity: 1,
        date: '',
        time: '',
        from: '',
        to: '',
    });
    const {
        showUpTopNotificationBarContext,
        fetchAuthorizationQueryContext,
        ProductInfoIdContext,
        AddtoCartMutationContext,
        addtofavoritescontext,
        favoriteprojectscountContext,
        GeneralAPIMutationContext,
        setProductInfoIdContext,
        isAddtoCartMutationContextDone,
        setisAddtoCartMutationContextDone,
        clearcartfuncContext,
        iscrossvendorfunccontext,
    } = useContext(FetchingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const fetchProductInfoQuery = useQuery(['fetchProductInfo_API' + ProductInfoIdContext], () => fetchProductInfo_API({ instapikey: INSTAPIKEYCONTEXT, productid: ProductInfoIdContext }), {
        keepPreviousData: true,
        staleTime: Infinity,
        enabled: INSTAPIKEYCONTEXT.length != 0 && ProductInfoIdContext?.length != 0 ? true : false,
    });
    // const FetchRelatedProductsQuery = useQuery([' FetchRelatedProducts_API' + RelatedProductsTagid], () => FetchRelatedProducts_API({ tagid: RelatedProductsTagid, productid: '' }), {
    //     keepPreviousData: true,
    //     staleTime: Infinity,
    //     enabled: fetchProductInfoQuery.productid != undefined && fetchProductInfoQuery.productid.length != 0 && RelatedProductsTagid.length != 0 ? true : false,
    // });
    useEffect(() => {
        StatePageProperties11.pages.forEach(function (item, index) {
            if (CurrentPageIdContext == item.pageid) {
                setStatePageProperties(item.pageobj);
            }
        });
    }, [StatePageProperties11]);
    useEffect(() => {
        var secpropobj = {};
        if (StatePageProperties != undefined && StatePageProperties.pageobj != undefined && StatePageProperties.pageobj.pageproperties != undefined) {
            StatePageProperties.pageobj.pageproperties.forEach(function (sectionitem, sectionindex) {
                secpropobj[sectionitem.property_css_name] = sectionitem.property_value;
            });
        }
        setsectionproperties({ ...secpropobj });
    }, [StatePageProperties]);
    const [ImagesGallery, setImagesGallery] = useState([]);
    useEffect(() => {
        if (!fetchProductInfoQuery.isFetching && fetchProductInfoQuery.isSuccess) {
            if (fetchProductInfoQuery?.data?.data?.productinfo != null) {
                var imagesgalleryarr = [];
                var imagesgalleryarr_ar = [...productimagesarrayy_ar];
                var tempproductimagesarray = [];
                if (Array.isArray(fetchProductInfoQuery?.data?.data?.productinfo?.productimages)) {
                    fetchProductInfoQuery?.data?.data?.productinfo?.productimages.forEach(function (arrayItem, arrayindex) {
                        tempproductimagesarray.push(imageurlendpointcontext + '/tr:w-800,h-800/' + arrayItem.path);
                        imagesgalleryarr.push({
                            url: imageurlendpointcontext + arrayItem.path,
                            id: arrayindex,
                        });
                        imagesgalleryarr_ar.unshift(arrayItem);
                    });
                    setImagesGallery([...imagesgalleryarr]);
                }
                setproductimagesarray([...tempproductimagesarray]);
                setproductimagesarrayy([...fetchProductInfoQuery?.data?.data?.productinfo?.productimages]);
                setproductimagesarrayy_ar([...imagesgalleryarr_ar]);
                setRelatedProductsTagid(fetchProductInfoQuery?.data?.data?.productinfo?.maintagid);
                if (fetchProductInfoQuery?.data?.data?.productinfo?.maintagid != null && fetchProductInfoQuery?.data?.data?.productinfo?.maintagid?.length != 0) {
                    GeneralAPIMutationContext.mutate({
                        endpointurl: '/FetchRelatedProducts',
                        tagid: fetchProductInfoQuery.data.data.productinfo.maintagid,
                        mutateSuccesscallback: (data, variables) => {
                            if (data.data.status) {
                                setRelatedproducts(data.data.productsrelated);
                            } else {
                                // NotificationManager.warning('', data.data.reason);
                            }
                        },
                    });
                }

                isthisproductfavchecker();
            }
        }
    }, [fetchProductInfoQuery.isSuccess, fetchProductInfoQuery.data]);
    useEffect(() => {
        isthisproductfavchecker();
    }, [favoriteprojectscountContext]);
    const onShare = async () => {
        try {
            var message = '';
            var url = 'https://' + fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcred?.instexternaldomain + '/productinform/' + fetchProductInfoQuery?.data?.data?.productinfo?.productid;
            if (Platform.OS == 'ios') {
                message = fetchProductInfoQuery?.data?.data?.productinfo?.name_en;
            } else {
                message = fetchProductInfoQuery?.data?.data?.productinfo?.name_en + ' - ' + url;
            }
            const result = await Share.share(
                {
                    title: fetchProductInfoQuery?.data?.data?.productinfo?.name_en,
                    message: message,
                    url: url,
                },
                {
                    dialogTitle: fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcred?.instname,
                    tintColor: 'black',
                },
            );

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    const validateextrafields = () => {
        var tempaddtocardpayloadobj = { ...addtocardpayloadobj };
        var status = false;
        var reason = '';
        var missingitemsfound = [];
        var extrafields = fetchProductInfoQuery?.data?.data?.productinfo?.productextrafields;
        if (extrafields?.length == 0) {
            status = true;
        } else {
            extrafields.forEach(function (item, index) {
                if (item.isrequired == 1) {
                    var itemfound = null;
                    tempaddtocardpayloadobj?.extrafields?.forEach(function (cchoosenitemvalue) {
                        if (cchoosenitemvalue.id == item.id) {
                            itemfound = cchoosenitemvalue;
                        }
                    });
                    if (itemfound == null) {
                        missingitemsfound.push(item);
                    } else {
                        if (itemfound?.value?.length == 0) {
                            missingitemsfound.push(item);
                        }
                    }
                }
            });
        }
        if (missingitemsfound.length == 0) {
            status = true;
        } else {
            status = false;
            reason = 'Missing items';
            missingitemsfound.forEach(function (missingitem) {
                var notftitle = langdetect == 'en' ? missingitem.title_en : missingitem.title_ar;
                showUpTopNotificationBarContext(langdetect == 'en' ? 'Please Choose ' + notftitle : ' من فضلك اختر' + notftitle, 'orange');
            });
        }
        return { status: status, reason: reason };
    };
    const addtocartfunc = (forcetocheckout) => {
        var iscrossvendordetected = false;
        var iscrossvendorfuncresp = iscrossvendorfunccontext(addtocardpayloadobj);
        if (iscrossvendorfuncresp.isinstdisallowcrossvendor) {
            if (iscrossvendorfuncresp.iscrossvendordetected) {
                iscrossvendordetected = true;
            }
        }
        if (iscrossvendordetected) {
            clearcartfuncContext();

            setTimeout(function () {
                addtocartfunc();
            }, 500);
        } else {
            var runfunc = false;
            var forcetocheckoutvalue = forcetocheckout;
            if (sectionproperties.productInformationType == 'Profile') {
                var variantid = '';
                if (fetchProductInfoQuery?.data?.data?.productinfo?.hasvariants == 1) {
                    variantid = fetchProductInfoQuery?.data?.data?.productinfo?.variants[0].variantid;
                }
                AddtoCartMutationContext.mutate({
                    functype: 'add',
                    item_type: 'product',
                    productid: addtocardpayloadobj.productid,
                    variantid: variantid,
                    quantity: 1,
                    date: '',
                    time: '',
                    from: '',
                    to: '',
                    hasvariants: 0,
                    isvariant: 0,
                });
            } else {
                if (addtocardpayloadobj.productid.length != 0 && addtocardpayloadobj.quantity > 0) {
                    if (fetchProductInfoQuery?.data?.data?.productinfo?.hasvariants == 1) {
                        if (addtocardpayloadobj.variantid.length != 0) {
                            runfunc = true;
                        } else {
                            showUpTopNotificationBarContext('Please choose product options', 'orange');
                        }
                    } else {
                        runfunc = true;
                    }
                } else {
                    showUpTopNotificationBarContext(lang.choosequantity, 'orange');
                }
                if (runfunc == true) {
                    var Extrafieldvalidationresponse = validateextrafields();
                    if (Extrafieldvalidationresponse.status) {
                        AddtoCartMutationContext.mutate(addtocardpayloadobj);
                        if (fetchProductInfoQuery?.data?.data?.productinfo?.isproductforcedtocheckout == 1) {
                            routingcountext(StaticPagesLinksContext.Checkout);
                        }
                        if (forcetocheckoutvalue != undefined) {
                            if (AddtoCartMutationContext.isLoading == false) {
                                setTimeout(function () {
                                    routingcountext(StaticPagesLinksContext.Checkout);
                                }, 2000);
                            }
                        }
                    }
                }
            }
        }
    };
    const isthisproductfavchecker = () => {
        var isprodfavfound = false;
        if (favoriteprojectscountContext != undefined && Array.isArray(favoriteprojectscountContext)) {
            favoriteprojectscountContext.forEach(function (favitem, favindex) {
                if (favitem == ProductInfoIdContext) {
                    isprodfavfound = true;
                }
            });
        }
        if (isprodfavfound) {
            setIsFavItem(true);
        } else {
            setIsFavItem(false);
        }
    };

    const returnpolicyobj = (policytype) => {
        var policyobj = {};
        fetchAuthorizationQueryContext?.data?.data?.instinfo?.instpolicies.forEach(function (item, index) {
            if (item.policytype == policytype) {
                policyobj = item;
            }
        });
        return policyobj;
    };
    const getprice_discountpriceprops = (type, withtotal, variantindexcompleted) => {
        var price = 0;
        var quantityconditions = [];
        var quantity = 0;
        if (addtocardpayloadobj.quantity != undefined && addtocardpayloadobj.quantity != null) {
            quantity = parseFloat(addtocardpayloadobj.quantity);
        }
        if (
            fetchProductInfoQuery?.data?.data?.productinfo?.productquantityoptions != undefined &&
            fetchProductInfoQuery?.data?.data?.productinfo?.productquantityoptions != null &&
            Array.isArray(fetchProductInfoQuery?.data?.data?.productinfo?.productquantityoptions) &&
            fetchProductInfoQuery?.data?.data?.productinfo?.productquantityoptions?.length != 0
        ) {
            quantityconditions = fetchProductInfoQuery?.data?.data?.productinfo?.productquantityoptions;
        }

        if (type == 'defaultprice') {
            price = fetchProductInfoQuery?.data?.data?.productinfo?.defaultprice;
            if (fetchProductInfoQuery?.data?.data?.productinfo?.hasvariants == 1) {
                if (variantindexcompleted != undefined) {
                    if (fetchProductInfoQuery?.data?.data?.productinfo?.variants[variantindexcompleted]?.variantprice != undefined) {
                        price = fetchProductInfoQuery?.data?.data?.productinfo?.variants[variantindexcompleted]?.variantprice;
                    }
                }
            }
        } else if (type == 'defaultsaleprice') {
            price = fetchProductInfoQuery?.data?.data?.productinfo?.defaultsaleprice;
            if (fetchProductInfoQuery?.data?.data?.productinfo?.hasvariants == 1) {
                if (variantindexcompleted != undefined) {
                    if (fetchProductInfoQuery?.data?.data?.productinfo?.variants[variantindexcompleted]?.variantsaleprice != undefined) {
                        price = fetchProductInfoQuery?.data?.data?.productinfo?.variants[variantindexcompleted]?.variantsaleprice;
                    }
                }
            }
        }

        var localquantityconditionobj = null;
        var temppriceinseidconditions = price;

        quantityconditions.forEach(function (item, index) {
            if (item.fromq <= quantity && item.toq >= quantity) {
                var discountprice = (item.value / 100) * price;

                if (item.type == 'add') {
                    temppriceinseidconditions = price + discountprice;
                } else if (item.type == 'subtract') {
                    temppriceinseidconditions = price - discountprice;
                }

                localquantityconditionobj = item;
            }
        });
        price = temppriceinseidconditions;

        setquantityconditionfoundobj(localquantityconditionobj);

        if (withtotal == true) {
            price = price * quantity;
        }
        return price;
    };
    function renderStoreInfo() {
        return (
            <View
                style={[
                    generalstyles.flexColumn,
                    {
                        flex: 1,
                        paddingHorizontal: 15,
                        paddingVertical: 15,
                        backgroundColor: sectionproperties.reservation_bgcolor,
                        marginTop: 15,
                        display:
                            sectionproperties.showstoreinfo1 == 'Hide' &&
                            sectionproperties.showstoreinfo2 == 'Hide' &&
                            sectionproperties.showfooterphonenumber == 'Hide' &&
                            sectionproperties.showfooteremail == 'Hide'
                                ? 'none'
                                : 'flex',
                    },
                ]}
            >
                {sectionproperties.showstoreinfo1 == 'Show' && (
                    <View style={[generalstyles.flexRow]}>
                        <View
                            style={[
                                generalstyles.allcentered,
                                {
                                    width: StyleParseToIntFuncContext(sectionproperties.iconcontainerwidth),
                                    height: StyleParseToIntFuncContext(sectionproperties.iconcontainerheight),
                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.iconcontainerborderbl, '', true),
                                    backgroundColor: sectionproperties.iconcontainerbg,
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.iconcontainer_borderWidth, '', true),
                                    borderColor: sectionproperties.iconcontainer_bordercolor,
                                },
                            ]}
                        >
                            <FontAwesome5
                                name="shipping-fast"
                                size={15}
                                style={{
                                    color: sectionproperties.iconcontainercolor,
                                }}
                            />
                        </View>
                        <View style={[generalstyles.flexColumn, { marginStart: 10 }]}>
                            <Text
                                style={{
                                    color: sectionproperties.footerinfotext_color,
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.footerinfotext_fontsize),
                                    fontFamily:
                                        sectionproperties.footerinfotext_fontweight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.footerinfotext_fontweight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.footerinfotext_fontweight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.footerinfotext_fontweight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.footerinfotext_fontweight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                    textAlign: 'left',
                                }}
                            >
                                {langdetect == 'en' ? sectionproperties.otherinfotitle1en : sectionproperties.otherinfotitle1ar}
                            </Text>
                            <Text
                                style={{
                                    color: sectionproperties.footerinfotext_secondarycolor,
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.footerinfotext_secondaryfontsize),
                                    fontFamily:
                                        sectionproperties.footerinfotext_secondaryfontweight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.footerinfotext_secondaryfontweight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.footerinfotext_secondaryfontweight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.footerinfotext_secondaryfontweight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.footerinfotext_secondaryfontweight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                }}
                            >
                                {langdetect == 'en' ? sectionproperties.otherinfodesc1en : sectionproperties.otherinfodesc1ar}
                            </Text>
                        </View>
                    </View>
                )}
                {sectionproperties.showstoreinfo1 == 'Show' && <View style={{ height: 1, width: '100%', backgroundColor: sectionproperties.vl_bg, marginVertical: 15 }} />}
                {sectionproperties.showstoreinfo2 == 'Show' && (
                    <View style={[generalstyles.flexRow]}>
                        <View
                            style={[
                                generalstyles.allcentered,
                                {
                                    width: StyleParseToIntFuncContext(sectionproperties.iconcontainerwidth),
                                    height: StyleParseToIntFuncContext(sectionproperties.iconcontainerheight),
                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.iconcontainerborderbl, '', true),
                                    backgroundColor: sectionproperties.iconcontainerbg,
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.iconcontainer_borderWidth, '', true),
                                    borderColor: sectionproperties.iconcontainer_bordercolor,
                                },
                            ]}
                        >
                            <MaterialIcons
                                name="payment"
                                size={20}
                                style={{
                                    color: sectionproperties.iconcontainercolor,
                                }}
                            />
                        </View>
                        <View style={[generalstyles.flexColumn, { marginStart: 10 }]}>
                            <Text
                                style={{
                                    color: sectionproperties.footerinfotext_color,
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.footerinfotext_fontsize),
                                    fontFamily:
                                        sectionproperties.footerinfotext_fontweight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.footerinfotext_fontweight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.footerinfotext_fontweight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.footerinfotext_fontweight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.footerinfotext_fontweight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                    textAlign: 'left',
                                }}
                            >
                                {langdetect == 'en' ? sectionproperties.otherinfotitle2en : sectionproperties.otherinfotitle2ar}
                            </Text>
                            <Text
                                style={{
                                    color: sectionproperties.footerinfotext_secondarycolor,
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.footerinfotext_secondaryfontsize),
                                    fontFamily:
                                        sectionproperties.footerinfotext_secondaryfontweight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.footerinfotext_secondaryfontweight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.footerinfotext_secondaryfontweight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.footerinfotext_secondaryfontweight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.footerinfotext_secondaryfontweight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                }}
                            >
                                {langdetect == 'en' ? sectionproperties.otherinfodesc2en : sectionproperties.otherinfodesc2ar}
                            </Text>
                        </View>
                    </View>
                )}
                {sectionproperties.showstoreinfo2 == 'Show' && <View style={{ height: 1, width: '100%', backgroundColor: sectionproperties.vl_bg, marginVertical: 15 }} />}
                {fetchAuthorizationQueryContext?.data?.data?.CuContactphonenumber != null && sectionproperties.showfooterphonenumber == 'Show' && (
                    <TouchableOpacity
                        style={[generalstyles.flexRow]}
                        onPress={() => {
                            Linking.openURL('tel:' + fetchAuthorizationQueryContext?.data?.data?.CuContactphonenumber);
                        }}
                    >
                        <View
                            style={[
                                generalstyles.allcentered,
                                {
                                    width: StyleParseToIntFuncContext(sectionproperties.iconcontainerwidth),
                                    height: StyleParseToIntFuncContext(sectionproperties.iconcontainerheight),
                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.iconcontainerborderbl, '', true),
                                    backgroundColor: sectionproperties.iconcontainerbg,
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.iconcontainer_borderWidth, '', true),
                                    borderColor: sectionproperties.iconcontainer_bordercolor,
                                },
                            ]}
                        >
                            <Feather
                                name="phone"
                                size={20}
                                style={{
                                    color: sectionproperties.iconcontainercolor,
                                }}
                            />
                        </View>
                        <View style={[generalstyles.flexColumn, { marginStart: 10 }]}>
                            <Text
                                style={{
                                    color: sectionproperties.footerinfotext_color,
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.footerinfotext_fontsize),
                                    fontFamily:
                                        sectionproperties.footerinfotext_fontweight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.footerinfotext_fontweight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.footerinfotext_fontweight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.footerinfotext_fontweight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.footerinfotext_fontweight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                    textAlign: 'left',
                                }}
                            >
                                {langdetect == 'en' ? sectionproperties.phonetitle_en : sectionproperties.phonetitle_ar}
                            </Text>
                            <Text
                                style={{
                                    color: sectionproperties.footerinfotext_secondarycolor,
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.footerinfotext_secondaryfontsize),
                                    fontFamily:
                                        sectionproperties.footerinfotext_secondaryfontweight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.footerinfotext_secondaryfontweight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.footerinfotext_secondaryfontweight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.footerinfotext_secondaryfontweight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.footerinfotext_secondaryfontweight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                }}
                            >
                                {fetchAuthorizationQueryContext?.data?.data?.CuContactphonenumber}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
                {fetchAuthorizationQueryContext?.data?.data?.CuContactphonenumber != null && sectionproperties.showfooterphonenumber == 'Show' && (
                    <View style={{ height: 1, width: '100%', backgroundColor: sectionproperties.vl_bg, marginVertical: 15 }} />
                )}
                {fetchAuthorizationQueryContext?.data?.data?.instinfo?.contactinfo?.email != null && sectionproperties.showfooteremail == 'Show' && (
                    <TouchableOpacity
                        style={[generalstyles.flexRow]}
                        onPress={() => {
                            Linking.openURL('mailto:' + fetchAuthorizationQueryContext?.data?.data?.instinfo?.contactinfo?.email);
                        }}
                    >
                        <View
                            style={[
                                generalstyles.allcentered,
                                {
                                    width: StyleParseToIntFuncContext(sectionproperties.iconcontainerwidth),
                                    height: StyleParseToIntFuncContext(sectionproperties.iconcontainerheight),
                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.iconcontainerborderbl, '', true),
                                    backgroundColor: sectionproperties.iconcontainerbg,
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.iconcontainer_borderWidth, '', true),
                                    borderColor: sectionproperties.iconcontainer_bordercolor,
                                },
                            ]}
                        >
                            <Feather
                                name="mail"
                                size={20}
                                style={{
                                    color: sectionproperties.iconcontainercolor,
                                }}
                            />
                        </View>
                        <View style={[generalstyles.flexColumn, { marginStart: 10 }]}>
                            <Text
                                style={{
                                    color: sectionproperties.footerinfotext_color,
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.footerinfotext_fontsize),
                                    fontFamily:
                                        sectionproperties.footerinfotext_fontweight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.footerinfotext_fontweight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.footerinfotext_fontweight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.footerinfotext_fontweight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.footerinfotext_fontweight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                    textAlign: 'left',
                                }}
                            >
                                {langdetect == 'en' ? sectionproperties.emailtitle_en : sectionproperties.emailtitle_ar}
                            </Text>
                            <Text
                                style={{
                                    color: sectionproperties.footerinfotext_secondarycolor,
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.footerinfotext_secondaryfontsize),
                                    fontFamily:
                                        sectionproperties.footerinfotext_secondaryfontweight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.footerinfotext_secondaryfontweight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.footerinfotext_secondaryfontweight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.footerinfotext_secondaryfontweight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.footerinfotext_secondaryfontweight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                }}
                            >
                                {fetchAuthorizationQueryContext?.data?.data?.instinfo?.contactinfo?.email}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        );
    }
    const relatedproductsView = () => {
        if (Relatedproducts.length != 0) {
            return (
                <View
                    style={{
                        paddingStart: 15,
                    }}
                >
                    <Text
                        style={[
                            generalstyles.poppinsMedium,
                            {
                                textAlign: 'left',
                                color: '#000',
                                fontSize: 20,
                                marginTop: 20,
                            },
                        ]}
                    >
                        {langdetect == 'en' ? 'You may also like' : 'منتجات مشابهة'}
                    </Text>
                    <ScrollView horizontal>
                        {Relatedproducts.map((item, index) => {
                            if (item.productinfo != null) {
                                if (item.productid != fetchProductInfoQuery.data.data.productinfo.productid) {
                                    return (
                                        <TouchableOpacity
                                            style={{ width: 200, marginHorizontal: 10 }}
                                            onPress={() => {
                                                setProductInfoIdContext(item.productid);
                                                routingcountext(StaticPagesLinksContext.ProductInfo);
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: '100%',
                                                    height: 250,
                                                }}
                                            >
                                                <ImageComponent
                                                    key={index}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                    }}
                                                    resizeMode="contain"
                                                    path={'/tr:w-300,h-300/' + item.productinfo.productmainimage}
                                                />
                                            </View>
                                            <View style={[generalstyles.flexColumn]}>
                                                <Text
                                                    style={[
                                                        generalstyles.poppinsMedium,
                                                        {
                                                            color: '#000',
                                                            textAlign: 'left',
                                                        },
                                                    ]}
                                                    numberOfLines={2}
                                                    ellipsizeMode="tail"
                                                >
                                                    {langdetect == 'en' ? item.productinfo.name_en : item.productinfo.name_ar}
                                                </Text>
                                                <Text
                                                    style={[
                                                        {
                                                            color: '#000',
                                                            textAlign: 'left',
                                                            fontFamily: 'Poppins-Bold',
                                                            marginTop: 10,
                                                            fontSize: 15,
                                                        },
                                                    ]}
                                                >
                                                    {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : ''}{' '}
                                                    {item.productinfo.hassale == 1 ? item.productinfo.defaultsaleprice : item.productinfo.defaultprice}{' '}
                                                    {langdetect == 'en' ? '' : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }
                            }
                        })}
                    </ScrollView>
                </View>
            );
        }
    };
    const getQuantityCondition = () => {
        if (fetchProductInfoQuery?.data?.data?.productinfo?.productquantityoptions?.length > 0) {
            return (
                <View
                    style={{
                        display: 'flex',
                        marginTop: 20,
                        flexDirection: 'row',
                        flex: 1,
                        flexDirection: 'column',
                        padding: 10,
                        paddingHorizontal: 15,
                        backgroundColor: 'white',
                    }}
                >
                    <View style={[generalstyles.flexColumn, generalstyles.allcentered, { marginBottom: 10 }]}>
                        <Text
                            style={{
                                color: sectionproperties.pricelisttitlecolor,
                                fontSize: sectionproperties.pricelisttitlefontSize + 'px',
                                fontFamily:
                                    sectionproperties.pricelisttitlefontWeight == 300
                                        ? 'Poppins-Thin'
                                        : sectionproperties.pricelisttitlefontWeight == 400
                                        ? 'Poppins-Light'
                                        : sectionproperties.pricelisttitlefontWeight == 500
                                        ? 'Poppins-Regular'
                                        : sectionproperties.pricelisttitlefontWeight == 600
                                        ? 'Poppins-Medium'
                                        : sectionproperties.pricelisttitlefontWeight == 700
                                        ? 'Poppins-Semibold'
                                        : 'Poppins-Bold',
                            }}
                        >
                            {langdetect == 'en' ? sectionproperties.pricelisttitle_en : sectionproperties.pricelisttitle_ar}
                        </Text>
                    </View>
                    {fetchProductInfoQuery?.data?.data?.productinfo?.productquantityoptions?.map((item, index) => {
                        return (
                            <View style={[generalstyles.flexRow]}>
                                <Text
                                    style={{
                                        color: sectionproperties.pricelistlabelcolor,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.pricelistlabelfontsize),
                                        fontFamily:
                                            sectionproperties.pricelistlabelfontweight == 300
                                                ? 'Poppins-Thin'
                                                : sectionproperties.pricelistlabelfontweight == 400
                                                ? 'Poppins-Light'
                                                : sectionproperties.pricelistlabelfontweight == 500
                                                ? 'Poppins-Regular'
                                                : sectionproperties.pricelistlabelfontweight == 600
                                                ? 'Poppins-Medium'
                                                : sectionproperties.pricelistlabelfontweight == 700
                                                ? 'Poppins-Semibold'
                                                : 'Poppins-Bold',
                                    }}
                                >
                                    {langdetect == 'en' ? 'From' : 'من'}: {item.fromq} - {item.toq}
                                </Text>
                                <View style={{ flex: 1, backgroundColor: '#eee', height: 1, marginHorizontal: 10 }} />
                                <Text
                                    style={{
                                        color: item.type == 'add' ? sectionproperties.valueaddcolor : sectionproperties.valueminuscolor,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.pricelistvaluefontsize),
                                        fontFamily:
                                            sectionproperties.pricelistvaluefontweight == 300
                                                ? 'Poppins-Thin'
                                                : sectionproperties.pricelistvaluefontweight == 400
                                                ? 'Poppins-Light'
                                                : sectionproperties.pricelistvaluefontweight == 500
                                                ? 'Poppins-Regular'
                                                : sectionproperties.pricelistvaluefontweight == 600
                                                ? 'Poppins-Medium'
                                                : sectionproperties.pricelistvaluefontweight == 700
                                                ? 'Poppins-Semibold'
                                                : 'Poppins-Bold',
                                    }}
                                >
                                    {item.type == 'subtract' ? '-' : '+'} {item.value}%
                                </Text>
                            </View>
                        );
                    })}
                </View>
            );
        }
    };
    useEffect(() => {
        if (fetchProductInfoQuery.isSuccess) {
            if (Array.isArray(productreviews) && productreviews.length == 0) {
                getreviewsassignermutationfunc();
            }
        }
    }, [fetchProductInfoQuery.isSuccess]);
    useEffect(() => {
        if (fetchProductInfoQuery.isSuccess) {
            getreviewsassignermutationfunc();
        }
    }, [filterproductreviews]);
    const getreviewsassignermutationfunc = () => {
        GeneralAPIMutationContext.mutate({
            endpointurl: '/fetchproductreviews',
            productid: fetchProductInfoQuery?.data?.data?.productinfo?.productid,
            filterproductreviews: filterproductreviews,
            mutateSuccesscallback: (data, variables) => {
                if (data.data.status) {
                    setproductreviews(data.data.productreviews);
                    setcanuserAddReview(data.data.canuserAddReview);
                } else {
                    // NotificationManager.warning('', data.data.reason);
                }
            },
        });
    };
    const getreviewsfeedbackview = () => {
        if (fetchProductInfoQuery?.data?.data?.productinfo?.productcanrate == 1) {
            return (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        paddingHorizontal: 15,
                        paddingVertical: 15,
                        backgroundColor: sectionproperties.reservation_bgcolor,
                        marginTop: 15,
                    }}
                >
                    <View style={[generalstyles.flexRow]}>
                        <View
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                flex: 1,
                                textAlign: 'left',
                            }}
                        >
                            <Text
                                style={[
                                    generalstyles.poppinsMedium,
                                    {
                                        textAlign: 'left',
                                        color: sectionproperties.slideshowText1ContentColor,
                                    },
                                ]}
                            >
                                {langdetect == 'en' ? 'Ratings' : 'التقييمات'}
                            </Text>
                            <View
                                style={[
                                    generalstyles.allcentered,
                                    {
                                        backgroundColor: sectionproperties.reviewbadgebgcolor,
                                        padding: 3,
                                        width: 45,
                                        borderRadius: 5,
                                        marginTop: 5,
                                    },
                                ]}
                            >
                                <Text style={[generalstyles.poppinsMedium, { fontSize: 13, color: sectionproperties.reviewbadgecolor }]}>
                                    {fetchProductInfoQuery?.data?.data?.productinfo?.productoverallrate}/5
                                </Text>
                            </View>
                        </View>
                        <View style={{ marginEnd: 'auto' }}>
                            {canuserAddReview && (
                                <TouchableOpacity
                                    style={[
                                        generalstyles.allcentered,
                                        {
                                            width: StyleParseToIntFuncContext(sectionproperties.reviewbtn_width),
                                            height: StyleParseToIntFuncContext(sectionproperties.reviewbtn_height),
                                            backgroundColor: sectionproperties.reviewbtn_bgcolor,
                                            color: sectionproperties.reviewbtn_color,
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.reviewbtn_borderradius),
                                            borderWidth: StyleParseToIntFuncContext(sectionproperties.reviewbtn_borderwidth, '', true),
                                            color: sectionproperties.reviewbtn_bordercolor,
                                        },
                                    ]}
                                    onPress={() => {
                                        routingcountext(StaticPagesLinksContext.AddReview, {
                                            fetchProductInfoQuery: fetchProductInfoQuery,
                                            source: 'productinfo',
                                            getreviewsassignermutationfunc: getreviewsassignermutationfunc,
                                        });
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.reviewbtn_fontsize),
                                            fontFamily:
                                                sectionproperties.reviewbtn_fontweight == 300
                                                    ? 'Poppins-Thin'
                                                    : sectionproperties.reviewbtn_fontweight == 400
                                                    ? 'Poppins-Light'
                                                    : sectionproperties.reviewbtn_fontweight == 500
                                                    ? 'Poppins-Regular'
                                                    : sectionproperties.reviewbtn_fontweight == 600
                                                    ? 'Poppins-Medium'
                                                    : sectionproperties.reviewbtn_fontweight == 700
                                                    ? 'Poppins-Semibold'
                                                    : 'Poppins-Bold',
                                            color: sectionproperties.reviewbtn_color,
                                        }}
                                    >
                                        {langdetect == 'en' ? sectionproperties.reviewbtn_contenten : sectionproperties.reviewbtn_contentar}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                    <View
                        style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: '#eee',
                            marginVertical: 10,
                        }}
                    />
                    {productreviews.map(function (reviewitem, reviewindex) {
                        return (
                            <View style={[generalstyles.flexColumn]}>
                                <View>
                                    <View
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: '20%',
                                                marginBottom: 10,
                                            }}
                                        >
                                            <Stars
                                                disabled={true}
                                                display={reviewitem.review_rating}
                                                spacing={1}
                                                count={5}
                                                half={true}
                                                fullStar={<FontAwesome name={'star'} size={14} color="#FAB400" />}
                                                emptyStar={<FontAwesome name={'star-o'} size={14} color="#FAB400" />}
                                                halfStar={<FontAwesome name={'star-half-empty'} size={14} color="#FAB400" />}
                                            />
                                            {/* <StarRating disabled={true} maxStars={5} rating={reviewitem.review_rating} starSize={17} fullStarColor="#FAB400" emptyStarColor="#FAB400" /> */}
                                        </View>
                                    </View>
                                    <Text style={[generalstyles.poppinsMedium, { marginBottom: 10, textAlign: 'left', color: sectionproperties.slideshowText1ContentColor }]}>
                                        {reviewitem.reviewtitle}
                                    </Text>
                                    <Text style={[generalstyles.poppinsMedium, { fontSize: 15, textAlign: 'left', color: sectionproperties.slideshowText1ContentColor }]}>{reviewitem.reviewbody}</Text>
                                    <View style={[generalstyles.flexRow]}>
                                        <Text style={[generalstyles.poppinsMedium, { flex: 1, textAlign: 'left', color: sectionproperties.slideshowText1ContentColor }]}>
                                            {langdetect == 'en' ? 'By' : 'بواسطة'}: {reviewitem.review_name}
                                        </Text>
                                        <Text style={[generalstyles.poppinsLight, { color: sectionproperties.slideshowText1ContentColor, flex: 1, textAlign: 'right', opacity: 0.5 }]}>
                                            {reviewitem.timestamp}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        width: '100%',
                                        height: 1,
                                        backgroundColor: '#eee',
                                        marginVertical: 10,
                                    }}
                                />
                            </View>
                        );
                    })}
                </View>
            );
        }
    };
    const clearchoosenvaluesbutkeepcurrentvalue = (optionindex, optionvaluesitem, optionvaluesindex) => {
        var productarr = queryClient.getQueryData('fetchProductInfo_API' + ProductInfoIdContext);
        productarr?.data?.productinfo?.productoptions?.forEach(function (item, index) {
            item.isselected = 0;
            item?.optionvalues?.forEach(function (valueitem, valueindex) {
                valueitem.isselected = 0;
            });
        });

        selectproductoptionvalue(optionindex, optionvaluesitem, optionvaluesindex, productarr);
    };
    const variantcompleting = () => {
        setvariantindexcompleted('');
        var tempaddtocardpayloadobj = { ...addtocardpayloadobj };
        tempaddtocardpayloadobj.variantid = '';
        setaddtocardpayloadobj({ ...tempaddtocardpayloadobj });
        var productarr = queryClient.getQueryData('fetchProductInfo_API' + ProductInfoIdContext);
        var selectedoptionsvalues = [];

        productarr.data.productinfo.productoptions.forEach(function (productoptionsitem, productoptionsindex) {
            productoptionsitem.optionvalues.forEach(function (ProductOptionValuesitem, ProductOptionValuesIndex) {
                if (ProductOptionValuesitem.isselected == 1) {
                    selectedoptionsvalues.push(ProductOptionValuesitem);
                }
            });
        });
        productarr.data.productinfo.variants.forEach(function (ProductVariantItem, ProductVariantIndex) {
            var isvariant = false;
            var variantnotmatch = [];
            if (selectedoptionsvalues.length == ProductVariantItem.variantoptions.length) {
                isvariant = true;
                ProductVariantItem.variantoptions.forEach(function (varinatoptionitem, variantoptionindex) {
                    selectedoptionsvalues.forEach(function (ProductOptionValuesitem, ProductOptionValuesIndex) {
                        if (ProductOptionValuesitem.optionid == varinatoptionitem.optionid) {
                            if (ProductOptionValuesitem.valueid == varinatoptionitem.valueid) {
                            } else {
                                variantnotmatch.push('s');
                            }
                        }
                    });
                });
            }
            if (variantnotmatch.length == 0 && isvariant == true) {
                var variantobj = fetchProductInfoQuery?.data?.data?.productinfo?.variants[ProductVariantIndex];
                var variantid = '';
                if (variantobj == undefined) {
                    showUpTopNotificationBarContext('Variant Not Found', 'orange');
                } else {
                    variantid = variantobj.variantid;
                    var tempaddtocardpayloadobj = { ...addtocardpayloadobj };
                    tempaddtocardpayloadobj.variantid = variantid;
                    productimagesarrayy?.forEach(function (tempimageitem, tempimageindex) {
                        if (tempimageitem.galleryid == variantobj.variantgalleryid) {
                            onTouchThumbnail(tempimageindex);
                        }
                    });
                    setaddtocardpayloadobj({ ...tempaddtocardpayloadobj });
                    setvariantindexcompleted(ProductVariantIndex);
                }
            }
        });
        queryClient.setQueryData('fetchProductInfo_API' + ProductInfoIdContext, productarr);
    };
    const variantchecker = () => {
        var productarr = queryClient.getQueryData('fetchProductInfo_API' + ProductInfoIdContext);

        if (productarr.data.productinfo.hasvariants == 1) {
            var selectedoptionsvalues = [];
            var variantsaccessible = [];
            productarr.data.productinfo.productoptions.forEach(function (productoptionsitem, productoptionsindex) {
                productoptionsitem.optionvalues.forEach(function (ProductOptionValuesitem, ProductOptionValuesIndex) {
                    if (ProductOptionValuesitem.isselected == 1) {
                        selectedoptionsvalues.push(ProductOptionValuesitem);
                    }
                });
            });
            if (selectedoptionsvalues.length == 0) {
                productarr.data.productinfo.variants.forEach(function (ProductVariantItem, ProductVariantIndex) {
                    ProductVariantItem.variantoptions.forEach(function (varinatoptionitem, variantoptionindex) {
                        productarr.data.productinfo.productoptions.forEach(function (productoptionsitem, productoptionsindex) {
                            productoptionsitem.optionvalues.forEach(function (ProductOptionValuesitem, ProductOptionValuesIndex) {
                                if (ProductOptionValuesitem.valueid == varinatoptionitem.valueid) {
                                    ProductOptionValuesitem.isenabled = 1;
                                }
                            });
                        });
                    });
                });
            } else {
                productarr.data.productinfo.productoptions.forEach(function (productoptionsitem, productoptionsindex) {
                    productoptionsitem.optionvalues.forEach(function (ProductOptionValuesitem, ProductOptionValuesIndex) {
                        ProductOptionValuesitem.isenabled = 0;
                    });
                });

                productarr.data.productinfo.variants.forEach(function (ProductVariantItem, ProductVariantIndex) {
                    var variantcommonvalues = [];
                    ProductVariantItem.variantoptions.forEach(function (varinatoptionitem, variantoptionindex) {
                        selectedoptionsvalues.forEach(function (ProductOptionValuesitem, ProductOptionValuesIndex) {
                            if (ProductOptionValuesitem.optionid == varinatoptionitem.optionid) {
                                variantcommonvalues.push(varinatoptionitem);
                            }
                        });
                    });

                    var addvariantcount = [];
                    var addvariant = false;
                    selectedoptionsvalues.forEach(function (ProductOptionValuesitem, ProductOptionValuesIndex) {
                        addvariant = false;
                        variantcommonvalues.forEach(function (varinatoptionitem, variantoptionindex) {
                            if (ProductOptionValuesitem.optionid == varinatoptionitem.optionid) {
                                if (ProductOptionValuesitem.valueid == varinatoptionitem.valueid) {
                                    addvariant = true;
                                } else {
                                    addvariantcount.push(varinatoptionitem);
                                }
                            }
                        });
                    });
                    if (addvariant && addvariantcount.length == 0) {
                        variantsaccessible.push(ProductVariantItem);
                    }
                });

                variantsaccessible.forEach(function (ProductVariantItem, ProductVariantIndex) {
                    ProductVariantItem.variantoptions.forEach(function (varinatoptionitem, variantoptionindex) {
                        productarr.data.productinfo.productoptions.forEach(function (productoptionsitem, productoptionsindex) {
                            productoptionsitem.optionvalues.forEach(function (ProductOptionValuesitem, ProductOptionValuesIndex) {
                                if (ProductOptionValuesitem.valueid == varinatoptionitem.valueid) {
                                    ProductOptionValuesitem.isenabled = 1;
                                }
                            });
                        });
                    });
                });
            }
            queryClient.setQueryData('fetchProductInfo_API' + ProductInfoIdContext, productarr);
        }
    };
    const selectproductoptionvalue = (optionindex, optionvaluesitem, optionvaluesindex) => {
        var productarr = queryClient.getQueryData('fetchProductInfo_API' + ProductInfoIdContext);

        var isselected = productarr.data.productinfo.productoptions[optionindex].optionvalues[optionvaluesindex].isselected;

        if (isselected == 1) {
            productarr.data.productinfo.productoptions[optionindex].optionvalues[optionvaluesindex].isselected = 0;
        } else {
            productarr.data.productinfo.productoptions[optionindex].optionvalues[optionvaluesindex].isselected = 1;
        }
        productarr.data.productinfo.productoptions[optionindex].optionvalues.forEach(function (arrayItem, arrayindex) {
            if (optionvaluesindex != arrayindex) {
                arrayItem.isselected = 0;
            }
        });
        variantchecker();
        variantcompleting();
        queryClient.setQueryData('fetchProductInfo_API' + ProductInfoIdContext, productarr);
    };
    const onSelectcarosal = (indexSelected) => {
        setCarosalindexSelected(indexSelected);
    };
    const onTouchThumbnail = (touched) => {
        if (touched === CarosalindexSelected) return;

        // carouselRef?.current?.snapToItem(touched);
    };
    return (
        <View
            style={{
                flex: 1,
                paddingBottom: 90,
            }}
        >
            {fetchProductInfoQuery.isFetching && (
                <View style={[generalstyles.allcentered, { height: 100, marginLeft: 'auto', marginRight: 'auto' }]}>
                    <SpinnerButton buttonStyle={{ width: 30, height: 30 }} isLoading={true} indicatorCount={10} spinnerType={'MaterialIndicator'} spinnerColor={'#000'}></SpinnerButton>
                </View>
            )}
            {Object.keys(StatePageProperties).length != 0 && fetchProductInfoQuery.isSuccess && !fetchProductInfoQuery.isFetching && (
                <View
                    style={{
                        height: '100%',
                        backgroundColor: sectionproperties?.backgroundColor?.length != 0 ? sectionproperties.backgroundColor : '#f8f8f9',
                    }}
                >
                    {fetchProductInfoQuery?.data?.data?.productinfo.item_type == 'product' && (
                        <Product_itemtype
                            Product_itemtypeprops={{
                                fetchProductInfoQuery: fetchProductInfoQuery,
                                IsFavItemProps: IsFavItem,
                                productimagesarray: productimagesarray,
                                productimagesarrayy: productimagesarrayy,
                                AddtoCartMutationContext: AddtoCartMutationContext,
                                setaddtocardpayloadobj: setaddtocardpayloadobj,
                                addtocardpayloadobj: addtocardpayloadobj,
                                returnpolicyobj: returnpolicyobj,
                                addtofavoritescontext: addtofavoritescontext,
                                ProductInfoIdContext: ProductInfoIdContext,
                                ImagesGallery: ImagesGallery,
                                productimagesarrayy_ar: productimagesarrayy_ar,
                                quantityconditionfoundobjprops: quantityconditionfoundobj,
                                getprice_discountpriceprops: getprice_discountpriceprops,
                                getQuantityCondition: getQuantityCondition,
                                renderStoreInfo: renderStoreInfo,
                                getreviewsfeedbackview: getreviewsfeedbackview,
                                variantcompleting: variantcompleting,
                                selectproductoptionvalue: selectproductoptionvalue,
                                variantchecker: variantchecker,
                                StatePageProperties: StatePageProperties,
                                sectionproperties: sectionproperties,
                                variantindexcompleted: variantindexcompleted,
                                clearchoosenvaluesbutkeepcurrentvalue: clearchoosenvaluesbutkeepcurrentvalue,
                                onShare: onShare,
                                addtocartfunc: addtocartfunc,
                                carouselRef: carouselRef,
                                onTouchThumbnail: onTouchThumbnail,
                                CarosalindexSelected: CarosalindexSelected,
                                setCarosalindexSelected: setCarosalindexSelected,
                                onSelectcarosal: onSelectcarosal,
                            }}
                        />
                    )}
                    {fetchProductInfoQuery?.data?.data?.productinfo.item_type == 'service' && (
                        <Service_itemtype
                            actions={{
                                fetchProductInfoQuery: fetchProductInfoQuery,
                                IsFavItemProps: IsFavItem,
                                returnpolicyobj: returnpolicyobj,
                                productimagesarray: productimagesarray,
                                setaddtocardpayloadobj: setaddtocardpayloadobj,
                                addtocardpayloadobj: addtocardpayloadobj,
                                AddtoCartMutationContext: AddtoCartMutationContext,
                                addtofavoritescontext: addtofavoritescontext,
                                ProductInfoIdContext: ProductInfoIdContext,
                                GeneralAPIMutationContext: GeneralAPIMutationContext,
                                productimagesarrayy: productimagesarrayy,
                                productimagesarrayy_ar: productimagesarrayy_ar,
                                quantityconditionfoundobjprops: quantityconditionfoundobj,
                                getprice_discountpriceprops: getprice_discountpriceprops,
                                getQuantityCondition: getQuantityCondition,
                                renderStoreInfo: renderStoreInfo,
                                getreviewsfeedbackview: getreviewsfeedbackview,
                                variantcompleting: variantcompleting,
                                selectproductoptionvalue: selectproductoptionvalue,
                                variantchecker: variantchecker,
                                StatePageProperties: StatePageProperties,
                                sectionproperties: sectionproperties,
                                variantindexcompleted: variantindexcompleted,
                                clearchoosenvaluesbutkeepcurrentvalue: clearchoosenvaluesbutkeepcurrentvalue,
                                onShare: onShare,
                                addtocartfunc: addtocartfunc,
                                ImagesGallery: ImagesGallery,
                            }}
                        />
                    )}

                    <View>{relatedproductsView()}</View>
                </View>
            )}
        </View>
        // <View style={{ flex: 1 }}>
        //     {Object.keys(StatePageProperties).length != 0 && fetchProductInfoQuery.isSuccess && (
        //         <View style={{ height: '100%' }}>
        //             <ScrollView style={{ height: '100%', flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
        //                 <View style={{ height: '100%', backgroundColor: sectionproperties?.backgroundColor?.length != 0 ? sectionproperties.backgroundColor : 'white' }}>
        //                     {fetchProductInfoQuery.data.data.productinfo.item_type == 'product' && (
        //                         <Product_itemtype
        //                             Product_itemtypeprops={{
        //                                 fetchProductInfoQuery: fetchProductInfoQuery,
        //                                 IsFavItemProps: IsFavItem,
        //                                 productimagesarray: productimagesarray,
        //                                 productimagesarrayy: productimagesarrayy,
        //                                 AddtoCartMutationContext: AddtoCartMutationContext,
        //                                 returnpolicyobj: returnpolicyobj,
        //                                 addtofavoritescontext: addtofavoritescontext,
        //                                 ProductInfoIdContext: ProductInfoIdContext,
        //                                 ImagesGallery: ImagesGallery,
        //                                 productimagesarrayy_ar: productimagesarrayy_ar,
        //                                 setproductimagesarrayy_ar: setproductimagesarrayy_ar,
        //                                 addtocardpayloadobj: addtocardpayloadobj,
        //                                 setaddtocardpayloadobj: setaddtocardpayloadobj,
        //                             }}
        //                         />
        //                     )}
        //                     {fetchProductInfoQuery.data.data.productinfo.item_type == 'service' && (
        //                         <Service_itemtype
        //                             Service_itemtypeprops={{
        //                                 fetchProductInfoQuery: fetchProductInfoQuery,
        //                                 IsFavItemProps: IsFavItem,
        //                                 productimagesarray: productimagesarray,
        //                                 AddtoCartMutationContext: AddtoCartMutationContext,
        //                                 addtofavoritescontext: addtofavoritescontext,
        //                                 ProductInfoIdContext: ProductInfoIdContext,
        //                                 GeneralAPIMutationContext: GeneralAPIMutationContext,
        //                                 productimagesarrayy: productimagesarrayy,
        //                             }}
        //                         />
        //                     )}
        //                 </View>
        //             </ScrollView>
        //             {sectionproperties.productInformationType == 'Product/Service Information' && sectionproperties.quantitybtn_show == 'Show' && (
        //                 <View
        //                     style={[
        //                         generalstyles.flexRow,
        //                         generalstyles.allcentered,
        //                         {
        //                             position: 'absolute',
        //                             bottom: 180,
        //                             width: '100%',
        //                             backgroundColor: 'white',
        //                             paddingHorizontal: 20,
        //                             paddingVertical: 5,
        //                             elevation: 1,
        //                             shadowOffset: {
        //                                 width: 0,
        //                                 height: 3,
        //                             },
        //                             shadowRadius: 10,
        //                             shadowColor: '#ccc',
        //                             shadowOpacity: 0.5,
        //                         },
        //                     ]}
        //                 >
        //                     <View
        //                         style={[
        //                             generalstyles.allcentered,
        //                             {
        //                                 backgroundColor: sectionproperties.quantitybtn_bgcolor,
        //                                 borderWidth: StyleParseToIntFuncContext(sectionproperties.quantitybtnborderwidth, '', true),
        //                                 borderColor: sectionproperties.quantitybtnbordercolor,
        //                                 flexDirection: 'row',
        //                                 borderRadius: StyleParseToIntFuncContext(sectionproperties.quantitybtn_borderradius, '', true),
        //                                 display: 'flex',
        //                                 height: 45,
        //                                 flex: 1,
        //                                 marginEnd: 5,
        //                                 zIndex: 1000,
        //                             },
        //                         ]}
        //                     >
        //                         <TouchableOpacity
        //                             style={{
        //                                 width: 40,
        //                                 height: 40,
        //                                 borderRadius: StyleParseToIntFuncContext(sectionproperties.add_quantitybtn_borderradius, '', true),
        //                                 backgroundColor: sectionproperties.add_quantitybtn_bgcolor,
        //                                 alignItems: 'center',
        //                                 justifyContent: 'center',
        //                             }}
        //                             onPress={() => {
        //                                 var tempaddtocardpayloadobj = { ...addtocardpayloadobj };
        //                                 tempaddtocardpayloadobj.quantity = tempaddtocardpayloadobj.quantity + 1;
        //                                 setaddtocardpayloadobj({ ...tempaddtocardpayloadobj });
        //                             }}
        //                         >
        //                             <AntDesign name="plus" size={StyleParseToIntFuncContext(sectionproperties.add_quantitybtn_textfontsize)} color={sectionproperties.add_quantitybtn_textcolor} />
        //                         </TouchableOpacity>
        //                         <View style={[generalstyles.allcentered, { flex: 1 }]}>
        //                             <Text
        //                                 style={[
        //                                     {
        //                                         fontFamily:
        //                                             sectionproperties.quantitybtn_textfontweight == 300
        //                                                 ? 'Poppins-Thin'
        //                                                 : sectionproperties.quantitybtn_textfontweight == 400
        //                                                 ? 'Poppins-Light'
        //                                                 : sectionproperties.quantitybtn_textfontweight == 500
        //                                                 ? 'Poppins-Regular'
        //                                                 : sectionproperties.quantitybtn_textfontweight == 600
        //                                                 ? 'Poppins-Medium'
        //                                                 : sectionproperties.quantitybtn_textfontweight == 700
        //                                                 ? 'Poppins-Semibold'
        //                                                 : 'Poppins-Bold',
        //                                         fontSize: StyleParseToIntFuncContext(sectionproperties.quantitybtn_textfontsize),
        //                                         color: sectionproperties.quantitybtn_textcolor,
        //                                     },
        //                                 ]}
        //                             >
        //                                 {addtocardpayloadobj.quantity}
        //                             </Text>
        //                         </View>
        //                         <TouchableOpacity
        //                             style={{
        //                                 width: 40,
        //                                 height: 40,
        //                                 borderRadius: StyleParseToIntFuncContext(sectionproperties.remove_quantitybtn_borderradius, '', true),
        //                                 backgroundColor: sectionproperties.remove_quantitybtn_bgcolor,
        //                                 alignItems: 'center',
        //                                 justifyContent: 'center',
        //                             }}
        //                             onPress={() => {
        //                                 var tempaddtocardpayloadobj = { ...addtocardpayloadobj };
        //                                 tempaddtocardpayloadobj.quantity = tempaddtocardpayloadobj.quantity - 1;
        //                                 if (tempaddtocardpayloadobj.quantity >= 0) {
        //                                     setaddtocardpayloadobj({ ...tempaddtocardpayloadobj });
        //                                 }
        //                             }}
        //                         >
        //                             <AntDesign
        //                                 name="minus"
        //                                 size={StyleParseToIntFuncContext(sectionproperties.remove_quantitybtn_textfontsize)}
        //                                 color={sectionproperties.remove_quantitybtn_textcolor}
        //                             />
        //                         </TouchableOpacity>
        //                     </View>
        //                     {sectionproperties.cartBtnShow == 'Show' && (
        //                         <TouchableOpacity
        //                             style={{
        //                                 marginStart: 5,
        //                                 width: 180,
        //                                 backgroundColor: sectionproperties.cartBtnbgColor,
        //                                 alignItems: 'center',
        //                                 height: 42,
        //                                 display: 'flex',
        //                                 alignItems: 'center',
        //                                 justifyContent: 'center',
        //                                 flexDirection: 'row',
        //                                 borderRadius: StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius),
        //                                 borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth),
        //                                 borderColor: sectionproperties.cartbtnbordercolor,
        //                             }}
        //                             onPress={() => {
        //                                 addtocartfunc();
        //                             }}
        //                             disabled={AddtoCartMutationContext.isLoading ? true : false}
        //                         >
        //                             {!AddtoCartMutationContext.isLoading && (
        //                                 <>
        //                                     {sectionproperties.carticonstyle == 'Shopping cart 1' && sectionproperties.cartBtn_iconFontSize != 0 && (
        //                                         <MaterialCommunityIcons
        //                                             name="cart-outline"
        //                                             size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
        //                                             style={{
        //                                                 color: sectionproperties.cart_iconcolor,
        //                                             }}
        //                                         />
        //                                     )}
        //                                     {sectionproperties.carticonstyle == 'Shopping cart 2' && sectionproperties.cartBtn_iconFontSize != 0 && (
        //                                         <Image
        //                                             source={icons.cart2}
        //                                             resizeMode="cover"
        //                                             style={{
        //                                                 width: StyleParseToIntFuncContext(
        //                                                     sectionproperties.cartBtn_iconFontSize != null && sectionproperties.cartBtn_iconFontSize != undefined
        //                                                         ? sectionproperties.cartBtn_iconFontSize
        //                                                         : 0,
        //                                                 ),
        //                                                 height: StyleParseToIntFuncContext(
        //                                                     sectionproperties.cartBtn_iconFontSize != null && sectionproperties.cartBtn_iconFontSize != undefined
        //                                                         ? sectionproperties.cartBtn_iconFontSize
        //                                                         : 0,
        //                                                 ),
        //                                                 tintColor: sectionproperties.cart_iconcolor,
        //                                             }}
        //                                         />
        //                                     )}
        //                                     {sectionproperties.carticonstyle == 'Shopping bag 1' && sectionproperties.cartBtn_iconFontSize != 0 && (
        //                                         <Feather
        //                                             name="shopping-bag"
        //                                             size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
        //                                             style={{
        //                                                 color: sectionproperties.cart_iconcolor,
        //                                             }}
        //                                         />
        //                                     )}
        //                                     {sectionproperties.carticonstyle == 'Shopping bag 2' && sectionproperties.cartBtn_iconFontSize != 0 && (
        //                                         <SimpleLineIcons
        //                                             name="handbag"
        //                                             size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
        //                                             style={{
        //                                                 color: sectionproperties.cart_iconcolor,
        //                                             }}
        //                                         />
        //                                     )}
        //                                     {sectionproperties.carticonstyle == 'Shopping bag 3' && sectionproperties.cartBtn_iconFontSize != 0 && (
        //                                         <FontAwesome5
        //                                             name="shopping-bag"
        //                                             size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
        //                                             style={{
        //                                                 color: sectionproperties.cart_iconcolor,
        //                                             }}
        //                                         />
        //                                     )}
        //                                     {sectionproperties.carticonstyle == 'Shopping bag 4' && sectionproperties.cartBtn_iconFontSize != 0 && (
        //                                         <SimpleLineIcons
        //                                             name="bag"
        //                                             size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
        //                                             style={{
        //                                                 color: sectionproperties.cart_iconcolor,
        //                                             }}
        //                                         />
        //                                     )}
        //                                     <Text
        //                                         style={{
        //                                             marginStart: 10,
        //                                             color: sectionproperties.cartBtnTextcolor,
        //                                             fontFamily:
        //                                                 sectionproperties.cartBtnTextfontweight == 300
        //                                                     ? 'Poppins-Thin'
        //                                                     : sectionproperties.cartBtnTextfontweight == 400
        //                                                     ? 'Poppins-Light'
        //                                                     : sectionproperties.cartBtnTextfontweight == 500
        //                                                     ? 'Poppins-Regular'
        //                                                     : sectionproperties.cartBtnTextfontweight == 600
        //                                                     ? 'Poppins-Medium'
        //                                                     : sectionproperties.cartBtnTextfontweight == 700
        //                                                     ? 'Poppins-Semibold'
        //                                                     : 'Poppins-Bold',
        //                                             fontSize: StyleParseToIntFuncContext(sectionproperties.cartBtnTextfontsize),
        //                                         }}
        //                                     >
        //                                         {langdetect == 'en' ? sectionproperties.cartBtnContentenglish : sectionproperties.cartBtnContentarabic}
        //                                     </Text>
        //                                 </>
        //                             )}
        //                             {AddtoCartMutationContext.isLoading && (
        //                                 <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        //                                     <SpinnerButton
        //                                         buttonStyle={{ width: 30, height: 30 }}
        //                                         isLoading={true}
        //                                         indicatorCount={10}
        //                                         spinnerType={'MaterialIndicator'}
        //                                         spinnerColor={sectionproperties.login_btn_color}
        //                                     ></SpinnerButton>
        //                                 </View>
        //                             )}
        //                         </TouchableOpacity>
        //                     )}
        //                 </View>
        //             )}
        //         </View>
        //     )}
        // </View>
    );
};

const styles = StyleSheet.create({
    variantContvertical: {
        borderRadius: 50,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        display: 'flex',
        alignItems: 'center',
    },
});

export default ProductInfo;
