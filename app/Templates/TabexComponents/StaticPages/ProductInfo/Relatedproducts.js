// import React, { useState, useContext, useEffect } from 'react';
// import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Image, useWindowDimensions, FlatList } from 'react-native';
// import { SIZES, icons } from '../../GeneralFiles/constants';
// import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
// import { MaterialCommunityIcons, SimpleLineIcons, Feather, AntDesign, FontAwesome5 } from 'react-native-vector-icons';
// import { FetchingContext } from '../../../FetchingContext/FetchingContext';
// import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
// import API from '../../../API/API';
// import { useQuery, useQueryClient } from 'react-query';
// import { SliderBox } from 'react-native-image-slider-box';
// import { LanguageContext } from '../../../LanguageContext/LanguageContext';
// import RenderHtml from 'react-native-render-html';
// import SpinnerButton from 'react-native-spinner-button';
// import { urlEndpoint } from '../../../../config/imagekit';
// import { useNavigation } from '@react-navigation/native';
// import ViewMoreText from 'react-native-view-more-text';
// import { TemplateRoutingContext } from '../../../TemplateRoutingContext';

// import clip from 'text-clipper';
// const Relatedproducts = (props) => {
//     const { routingcountext, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
//     const navigation = useNavigation();
//     const queryClient = useQueryClient();
//     const { fetchProductInfo_API, FetchRelatedProducts_API } = API();
//     const { lang, langdetect } = useContext(LanguageContext);
//     const [productimagesarray, setproductimagesarray] = useState([]);
//     const [RelatedProductsTagid, setRelatedProductsTagid] = useState('');
//     const [StatePageProperties, setStatePageProperties] = useState(props.StatePageProperties);
//     const [IsFavItem, setIsFavItem] = useState(false);
//     const [latestarrivalsarray, setlatestarrivalsarray] = useState([
//         {
//             id: 10,
//             name: 'Cozy Pullovers',
//             image: 'https://cdn.pixabay.com/photo/2016/11/19/15/40/clothes-1839935_960_720.jpg',
//             color: '#000',
//         },
//         {
//             id: 11,
//             name: 'Your Favorite Sweatshirts',
//             image: 'https://cdn.pixabay.com/photo/2016/11/19/15/40/clothes-1839935_960_720.jpg',
//             color: '#16aaff',
//         },
//         {
//             id: 12,
//             name: 'Shirts',
//             image: 'https://cdn.pixabay.com/photo/2016/11/19/15/40/clothes-1839935_960_720.jpg',
//             color: '#0071b3',
//         },
//         {
//             id: 13,
//             name: 'Trending Jeans',
//             image: 'https://cdn.pixabay.com/photo/2014/08/26/21/49/jeans-428614_960_720.jpg',
//             color: '#ff1a75',
//         },
//     ]);
//     const [addtocardpayloadobj, setaddtocardpayloadobj] = useState({
//         functype: 'add',
//         productid: '',
//         variantid: '',
//         quantity: 1,
//     });
//     const [variantindexcompleted, setvariantindexcompleted] = useState('');
//     const { ProjectOpenrcTypeContext, INSTAPIKEYCONTEXT, StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
//     const { fetchAuthorizationQueryContext, showUpTopNotificationBarContext, ProductInfoIdContext, AddtoCartMutationContext, addtofavoritescontext, favoriteprojectscountContext } =
//         useContext(FetchingContext);
//     const [sectionproperties, setsectionproperties] = useState('');
//     useEffect(() => {
//         if (props.sectionpropertiesprops != undefined) {
//             setsectionproperties({ ...props.sectionpropertiesprops });
//         }
//     }, [props.sectionpropertiesprops]);
//     const fetchProductInfoQuery = useQuery(['fetchProductInfo_API' + ProductInfoIdContext], () => fetchProductInfo_API({ instapikey: INSTAPIKEYCONTEXT, productid: ProductInfoIdContext }), {
//         keepPreviousData: true,
//         staleTime: Infinity,
//         enabled: INSTAPIKEYCONTEXT.length != 0 && ProductInfoIdContext?.length != 0 ? true : false,
//     });
//     const FetchRelatedProductsQuery = useQuery([' FetchRelatedProducts_API' + RelatedProductsTagid], () => FetchRelatedProducts_API({ tagid: RelatedProductsTagid, productid: '' }), {
//         keepPreviousData: true,
//         staleTime: Infinity,
//         enabled: fetchProductInfoQuery.productid != undefined && fetchProductInfoQuery.productid.length != 0 && RelatedProductsTagid.length != 0 ? true : false,
//     });

//     useEffect(() => {
//         if (ProjectOpenrcTypeContext == 'workplace') {
//             setStatePageProperties({ ...props.StatePageProperties });
//         }
//     }, [props.StatePageProperties]);
//     useEffect(() => {
//         if (!fetchProductInfoQuery.isFetching && fetchProductInfoQuery.isSuccess) {
//             if (fetchProductInfoQuery.data.data.productinfo != null) {
//                 var tempproductimagesarray = [];
//                 if (Array.isArray(fetchProductInfoQuery.data.data.productinfo.productimages)) {
//                     fetchProductInfoQuery.data.data.productinfo.productimages.forEach(function (arrayItem, arrayindex) {
//                         tempproductimagesarray.push(urlEndpoint + '/tr:w-800,h-800/' + arrayItem.path);
//                     });
//                 }
//                 setproductimagesarray([...tempproductimagesarray]);
//                 variantchecker();
//                 var tempaddtocardpayloadobj = { ...addtocardpayloadobj };
//                 tempaddtocardpayloadobj.productid = fetchProductInfoQuery.data.data.productinfo.productid;
//                 setaddtocardpayloadobj({ ...tempaddtocardpayloadobj });
//                 setRelatedProductsTagid(fetchProductInfoQuery.data.data.productinfo.maintagid);

//                 isthisproductfavchecker();
//             }
//         }
//     }, [fetchProductInfoQuery.isSuccess, fetchProductInfoQuery.data]);
//     useEffect(() => {
//         isthisproductfavchecker();
//     }, [favoriteprojectscountContext]);

//     const isthisproductfavchecker = () => {
//         var isprodfavfound = false;
//         if (favoriteprojectscountContext != undefined && Array.isArray(favoriteprojectscountContext)) {
//             favoriteprojectscountContext.forEach(function (favitem, favindex) {
//                 if (favitem == ProductInfoIdContext) {
//                     isprodfavfound = true;
//                 }
//             });
//         }
//         if (isprodfavfound) {
//             setIsFavItem(true);
//         } else {
//             setIsFavItem(false);
//         }
//     };
//     const selectproductoptionvalue = (optionindex, optionvaluesitem, optionvaluesindex) => {
//         var productarr = queryClient.getQueryData('fetchProductInfo_API' + ProductInfoIdContext);

//         var isselected = productarr.data.productinfo.productoptions[optionindex].optionvalues[optionvaluesindex].isselected;

//         if (isselected == 1) {
//             productarr.data.productinfo.productoptions[optionindex].optionvalues[optionvaluesindex].isselected = 0;
//         } else {
//             productarr.data.productinfo.productoptions[optionindex].optionvalues[optionvaluesindex].isselected = 1;
//         }
//         productarr.data.productinfo.productoptions[optionindex].optionvalues.forEach(function (arrayItem, arrayindex) {
//             if (optionvaluesindex != arrayindex) {
//                 arrayItem.isselected = 0;
//             }
//         });
//         variantchecker();
//         variantcompleting();
//         queryClient.setQueryData('fetchProductInfo_API' + ProductInfoIdContext, productarr);
//     };
//     const variantchecker = () => {
//         var productarr = queryClient.getQueryData('fetchProductInfo_API' + ProductInfoIdContext);

//         if (productarr.data.productinfo.hasvariants == 1) {
//             var selectedoptionsvalues = [];
//             var variantsaccessible = [];
//             productarr.data.productinfo.productoptions.forEach(function (productoptionsitem, productoptionsindex) {
//                 productoptionsitem.optionvalues.forEach(function (ProductOptionValuesitem, ProductOptionValuesIndex) {
//                     if (ProductOptionValuesitem.isselected == 1) {
//                         selectedoptionsvalues.push(ProductOptionValuesitem);
//                     }
//                 });
//             });
//             if (selectedoptionsvalues.length == 0) {
//                 productarr.data.productinfo.variants.forEach(function (ProductVariantItem, ProductVariantIndex) {
//                     ProductVariantItem.variantoptions.forEach(function (varinatoptionitem, variantoptionindex) {
//                         productarr.data.productinfo.productoptions.forEach(function (productoptionsitem, productoptionsindex) {
//                             productoptionsitem.optionvalues.forEach(function (ProductOptionValuesitem, ProductOptionValuesIndex) {
//                                 if (ProductOptionValuesitem.valueid == varinatoptionitem.valueid) {
//                                     ProductOptionValuesitem.isenabled = 1;
//                                 }
//                             });
//                         });
//                     });
//                 });
//             } else {
//                 productarr.data.productinfo.productoptions.forEach(function (productoptionsitem, productoptionsindex) {
//                     productoptionsitem.optionvalues.forEach(function (ProductOptionValuesitem, ProductOptionValuesIndex) {
//                         ProductOptionValuesitem.isenabled = 0;
//                     });
//                 });

//                 productarr.data.productinfo.variants.forEach(function (ProductVariantItem, ProductVariantIndex) {
//                     var variantcommonvalues = [];
//                     ProductVariantItem.variantoptions.forEach(function (varinatoptionitem, variantoptionindex) {
//                         selectedoptionsvalues.forEach(function (ProductOptionValuesitem, ProductOptionValuesIndex) {
//                             if (ProductOptionValuesitem.optionid == varinatoptionitem.optionid) {
//                                 variantcommonvalues.push(varinatoptionitem);
//                             }
//                         });
//                     });

//                     var addvariantcount = [];
//                     var addvariant = false;
//                     selectedoptionsvalues.forEach(function (ProductOptionValuesitem, ProductOptionValuesIndex) {
//                         addvariant = false;
//                         variantcommonvalues.forEach(function (varinatoptionitem, variantoptionindex) {
//                             if (ProductOptionValuesitem.optionid == varinatoptionitem.optionid) {
//                                 if (ProductOptionValuesitem.valueid == varinatoptionitem.valueid) {
//                                     addvariant = true;
//                                 } else {
//                                     addvariantcount.push(varinatoptionitem);
//                                 }
//                             }
//                         });
//                     });
//                     if (addvariant && addvariantcount.length == 0) {
//                         variantsaccessible.push(ProductVariantItem);
//                     }
//                 });

//                 variantsaccessible.forEach(function (ProductVariantItem, ProductVariantIndex) {
//                     ProductVariantItem.variantoptions.forEach(function (varinatoptionitem, variantoptionindex) {
//                         productarr.data.productinfo.productoptions.forEach(function (productoptionsitem, productoptionsindex) {
//                             productoptionsitem.optionvalues.forEach(function (ProductOptionValuesitem, ProductOptionValuesIndex) {
//                                 if (ProductOptionValuesitem.valueid == varinatoptionitem.valueid) {
//                                     ProductOptionValuesitem.isenabled = 1;
//                                 }
//                             });
//                         });
//                     });
//                 });
//             }
//             queryClient.setQueryData('fetchProductInfo_API' + ProductInfoIdContext, productarr);
//         }
//     };
//     const variantcompleting = () => {
//         setvariantindexcompleted('');
//         var tempaddtocardpayloadobj = { ...addtocardpayloadobj };
//         tempaddtocardpayloadobj.variantid = '';
//         setaddtocardpayloadobj({ ...tempaddtocardpayloadobj });
//         var productarr = queryClient.getQueryData('fetchProductInfo_API' + ProductInfoIdContext);
//         var selectedoptionsvalues = [];

//         productarr.data.productinfo.productoptions.forEach(function (productoptionsitem, productoptionsindex) {
//             productoptionsitem.optionvalues.forEach(function (ProductOptionValuesitem, ProductOptionValuesIndex) {
//                 if (ProductOptionValuesitem.isselected == 1) {
//                     selectedoptionsvalues.push(ProductOptionValuesitem);
//                 }
//             });
//         });
//         productarr.data.productinfo.variants.forEach(function (ProductVariantItem, ProductVariantIndex) {
//             var isvariant = false;
//             var variantnotmatch = [];
//             if (selectedoptionsvalues.length == ProductVariantItem.variantoptions.length) {
//                 isvariant = true;
//                 ProductVariantItem.variantoptions.forEach(function (varinatoptionitem, variantoptionindex) {
//                     selectedoptionsvalues.forEach(function (ProductOptionValuesitem, ProductOptionValuesIndex) {
//                         if (ProductOptionValuesitem.optionid == varinatoptionitem.optionid) {
//                             if (ProductOptionValuesitem.valueid == varinatoptionitem.valueid) {
//                             } else {
//                                 variantnotmatch.push('s');
//                             }
//                         }
//                     });
//                 });
//             }
//             if (variantnotmatch.length == 0 && isvariant == true) {
//                 var variantobj = fetchProductInfoQuery.data.data.productinfo.variants[ProductVariantIndex];
//                 var variantid = '';
//                 if (variantobj == undefined) {
//                     showUpTopNotificationBarContext('Variant Not Found', 'orange');
//                 } else {
//                     variantid = variantobj.variantid;
//                     var tempaddtocardpayloadobj = { ...addtocardpayloadobj };
//                     tempaddtocardpayloadobj.variantid = variantid;
//                     setaddtocardpayloadobj({ ...tempaddtocardpayloadobj });
//                     setvariantindexcompleted(ProductVariantIndex);
//                 }
//             }
//         });
//         queryClient.setQueryData('fetchProductInfo_API' + ProductInfoIdContext, productarr);
//     };
//     return (
//         <SafeAreaView style={{ flex: 1 }}>

//                     <View style={{ paddingStart: 20, marginTop: 20, marginBottom: 40 }}>
//                         <Text
//                             style={[
//                                 {
//                                     fontSize: StyleParseToIntFuncContext(sectionproperties.relatedproductstitlefontsize),
//                                     color: sectionproperties.relatedproductstitlecolor,
//                                     fontFamily:
//                                         sectionproperties.relatedproductstitlefontweight == 300
//                                             ? 'Poppins-Thin'
//                                             : sectionproperties.relatedproductstitlefontweight == 400
//                                             ? 'Poppins-Light'
//                                             : sectionproperties.relatedproductstitlefontweight == 500
//                                             ? 'Poppins-Regular'
//                                             : sectionproperties.relatedproductstitlefontweight == 600
//                                             ? 'Poppins-Medium'
//                                             : sectionproperties.relatedproductstitlefontweight == 700
//                                             ? 'Poppins-Semibold'
//                                             : 'Poppins-Bold',
//                                     textTransform:
//                                         sectionproperties.relatedproductstitletextTransform == 'Uppercase'
//                                             ? 'uppercase'
//                                             : sectionproperties.relatedproductstitletextTransform == 'Capitalize'
//                                             ? 'capitalize'
//                                             : sectionproperties.relatedproductstitletextTransform == 'None'
//                                             ? 'none'
//                                             : 'lowercase',

//                                     marginBottom: 5,
//                                     textAlign: 'left',
//                                 },
//                             ]}
//                         >
//                             {lang.youmayalsolike}
//                         </Text>
//                         <FlatList
//                             data={latestarrivalsarray}
//                             renderItem={({ item, index }) => {
//                                 return (
//                                     <View
//                                         style={[
//                                             generalstyles.flexColumn,
//                                             {
//                                                 backgroundColor: sectionproperties.relatedproductsbg,
//                                                 marginEnd: 20,
//                                                 width: SIZES.width - 245,
//                                                 borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.relatedproductsbgbtlr),
//                                                 borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.relatedproductsbgbtrr),
//                                                 borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.relatedproductsbgbblr),
//                                                 borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.relatedproductsbgbbrr),
//                                                 shadowColor: sectionproperties.relatedproductsshadowcolor,
//                                                 shadowOffset: {
//                                                     width: 0,
//                                                     height: 3,
//                                                 },
//                                                 shadowOpacity: 0.1,
//                                                 shadowRadius: 3,
//                                                 elevation: 1,
//                                                 padding: 10,
//                                             },
//                                         ]}
//                                     >
//                                         <View
//                                             style={{
//                                                 width: 150,
//                                                 height: 150,
//                                                 backgroundColor: sectionproperties.prodimage_bgcolor,
//                                                 borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.prodimage__borderTopLeftRadius),
//                                                 borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.prodimage__borderTopRightRadius),
//                                                 borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.prodimage__borderBottomLeftRadius),
//                                                 borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.prodimage__borderBottomRightRadius),
//                                                 marginEnd: 5,
//                                             }}
//                                         >
//                                             <Image
//                                                 source={item.image}
//                                                 resizeMode="cover"
//                                                 style={{
//                                                     width: '100%',
//                                                     height: '100%',
//                                                     borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.prodimage__borderTopLeftRadius),
//                                                     borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.prodimage__borderTopRightRadius),
//                                                     borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.prodimage__borderBottomLeftRadius),
//                                                     borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.prodimage__borderBottomRightRadius),
//                                                 }}
//                                             />
//                                         </View>
//                                         <View style={{ marginBottom: 'auto' }}>
//                                             <Text
//                                               ellipsizeMode="tail"
//                                               numberOfLines={1}
//                                                 style={[
//                                                     {

//                                                         marginTop:5,
//                                                         color: sectionproperties.relatedprodNameColor,
//                                                         fontSize: StyleParseToIntFuncContext(sectionproperties.relatedprodNameFontSize),
//                                                         fontFamily:
//                                                             sectionproperties.relatedprodnamefontWeight == 300
//                                                                 ? 'Poppins-Thin'
//                                                                 : sectionproperties.relatedprodnamefontWeight == 400
//                                                                 ? 'Poppins-Light'
//                                                                 : sectionproperties.relatedprodnamefontWeight == 500
//                                                                 ? 'Poppins-Regular'
//                                                                 : sectionproperties.relatedprodnamefontWeight == 600
//                                                                 ? 'Poppins-Medium'
//                                                                 : sectionproperties.relatedprodnamefontWeight == 700
//                                                                 ? 'Poppins-Semibold'
//                                                                 : 'Poppins-Bold',
//                                                         textTransform:
//                                                             sectionproperties.relatedprodNameTextTranform == 'Uppercase'
//                                                                 ? 'uppercase'
//                                                                 : sectionproperties.relatedprodNameTextTranform == 'Capitalize'
//                                                                 ? 'capitalize'
//                                                                 : sectionproperties.relatedprodNameTextTranform == 'None'
//                                                                 ? 'none'
//                                                                 : 'lowercase',
//                                                     },
//                                                 ]}
//                                             >
//                                                 {item.name}
//                                             </Text>
//                                             <View style={[

//                                                    generalstyles.flexRow,

//                                                ]}>
//                                             <Text
//                                                 style={[
//                                                     generalstyles.poppinsMedium,
//                                                     {
//                                                         color: sectionproperties.relatedprodPriceColor,
//                                                         fontSize: StyleParseToIntFuncContext(sectionproperties.relatedprodpriceFontSize),
//                                                         fontFamily:
//                                                             sectionproperties.relatedprodPriceFontWeight == 300
//                                                                 ? 'Poppins-Thin'
//                                                                 : sectionproperties.relatedprodPriceFontWeight == 400
//                                                                 ? 'Poppins-Light'
//                                                                 : sectionproperties.relatedprodPriceFontWeight == 500
//                                                                 ? 'Poppins-Regular'
//                                                                 : sectionproperties.relatedprodPriceFontWeight == 600
//                                                                 ? 'Poppins-Medium'
//                                                                 : sectionproperties.relatedprodPriceFontWeight == 700
//                                                                 ? 'Poppins-Semibold'
//                                                                 : 'Poppins-Bold',
//                                                     },
//                                                 ]}
//                                             >
//                                                 {langdetect == 'en' ? 'EGP' : ''} 234 {langdetect == 'en' ? '' : 'ج.م'}
//                                             </Text>
//                                             <Text
//                                                 style={[
//                                                     generalstyles.poppinsMedium,
//                                                     {
//                                                         paddingStart:5,
//                                                         color: sectionproperties.relatedprodslaePriceColor,
//                                                         fontSize: StyleParseToIntFuncContext(sectionproperties.relatedprodsalepriceFontSize),
//                                                         textDecorationLine: 'line-through',
//                                                         textDecorationStyle: 'solid',
//                                                         fontFamily:
//                                                         sectionproperties.relatedprodsalePriceFontWeight == 300
//                                                             ? 'Poppins-Thin'
//                                                             : sectionproperties.relatedprodsalePriceFontWeight == 400
//                                                             ? 'Poppins-Light'
//                                                             : sectionproperties.relatedprodsalePriceFontWeight == 500
//                                                             ? 'Poppins-Regular'
//                                                             : sectionproperties.relatedprodsalePriceFontWeight == 600
//                                                             ? 'Poppins-Medium'
//                                                             : sectionproperties.relatedprodsalePriceFontWeight == 700
//                                                             ? 'Poppins-Semibold'
//                                                             : 'Poppins-Bold',
//                                                     },
//                                                 ]}
//                                             >
//                                                 {langdetect == 'en' ? 'EGP' : ''} 234 {langdetect == 'en' ? '' : 'ج.م'}
//                                             </Text>
//                                             </View>
//                                         </View>
//                                     </View>
//                                 );
//                             }}
//                             contentContainerStyle={{ paddingBottom: SIZES.padding * 0.8 }}
//                             numColumns={1}
//                             horizontal
//                         />
//                     </View>

//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     variantContvertical: {
//         borderRadius: 50,
//         paddingRight: 10,
//         paddingLeft: 10,
//         paddingTop: 10,
//         paddingBottom: 10,
//         display: 'flex',
//         alignItems: 'center',
//     },
// });

// export default Relatedproducts;

{
    /* <View style={{ paddingStart: 20, marginTop: 20, marginBottom: 40 }}>
                        <Text
                            style={[
                                {
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.relatedproductstitlefontsize),
                                    color: sectionproperties.relatedproductstitlecolor,
                                    fontFamily:
                                        sectionproperties.relatedproductstitlefontweight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.relatedproductstitlefontweight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.relatedproductstitlefontweight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.relatedproductstitlefontweight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.relatedproductstitlefontweight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                    textTransform:
                                        sectionproperties.relatedproductstitletextTransform == 'Uppercase'
                                            ? 'uppercase'
                                            : sectionproperties.relatedproductstitletextTransform == 'Capitalize'
                                            ? 'capitalize'
                                            : sectionproperties.relatedproductstitletextTransform == 'None'
                                            ? 'none'
                                            : 'lowercase',

                                    marginBottom: 5,
                                    textAlign: 'left',
                                },
                            ]}
                        >
                            {lang.youmayalsolike}
                        </Text>
                        <FlatList
                            data={latestarrivalsarray}
                            renderItem={({ item, index }) => {
                                return (
                                    <View
                                        style={[
                                            generalstyles.flexRow,
                                            {
                                                backgroundColor: sectionproperties.relatedproductsbg,
                                                marginEnd: 20,
                                                width: SIZES.width - 100,
                                                borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.relatedproductsbgbtlr),
                                                borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.relatedproductsbgbtrr),
                                                borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.relatedproductsbgbblr),
                                                borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.relatedproductsbgbbrr),
                                                shadowColor: sectionproperties.relatedproductsshadowcolor,
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 3,
                                                },
                                                shadowOpacity: 0.1,
                                                shadowRadius: 3,
                                                elevation: 1,
                                                padding: 10,
                                            },
                                        ]}
                                    >
                                        <View
                                            style={{
                                                width: 70,
                                                height: 70,
                                                backgroundColor: sectionproperties.prodimage_bgcolor,
                                                borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.prodimage__borderTopLeftRadius),
                                                borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.prodimage__borderTopRightRadius),
                                                borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.prodimage__borderBottomLeftRadius),
                                                borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.prodimage__borderBottomRightRadius),
                                                marginEnd: 5,
                                            }}
                                        >
                                            <Image
                                                source={item.image}
                                                resizeMode="cover"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.prodimage__borderTopLeftRadius),
                                                    borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.prodimage__borderTopRightRadius),
                                                    borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.prodimage__borderBottomLeftRadius),
                                                    borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.prodimage__borderBottomRightRadius),
                                                }}
                                            />
                                        </View>
                                        <View style={{ marginBottom: 'auto' }}>
                                            <Text
                                                style={[
                                                    {
                                                        color: sectionproperties.relatedprodNameColor,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.relatedprodNameFontSize),
                                                        fontFamily:
                                                            sectionproperties.relatedprodnamefontWeight == 300
                                                                ? 'Poppins-Thin'
                                                                : sectionproperties.relatedprodnamefontWeight == 400
                                                                ? 'Poppins-Light'
                                                                : sectionproperties.relatedprodnamefontWeight == 500
                                                                ? 'Poppins-Regular'
                                                                : sectionproperties.relatedprodnamefontWeight == 600
                                                                ? 'Poppins-Medium'
                                                                : sectionproperties.relatedprodnamefontWeight == 700
                                                                ? 'Poppins-Semibold'
                                                                : 'Poppins-Bold',
                                                        textTransform:
                                                            sectionproperties.relatedprodNameTextTranform == 'Uppercase'
                                                                ? 'uppercase'
                                                                : sectionproperties.relatedprodNameTextTranform == 'Capitalize'
                                                                ? 'capitalize'
                                                                : sectionproperties.relatedprodNameTextTranform == 'None'
                                                                ? 'none'
                                                                : 'lowercase',
                                                    },
                                                ]}
                                            >
                                                {item.name}
                                            </Text>
                                            <Text
                                                style={[
                                                    generalstyles.poppinsMedium,
                                                    {
                                                        color: sectionproperties.relatedprodPriceColor,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.relatedprodpriceFontSize),
                                                        fontFamily:
                                                            sectionproperties.relatedprodPriceFontWeight == 300
                                                                ? 'Poppins-Thin'
                                                                : sectionproperties.relatedprodPriceFontWeight == 400
                                                                ? 'Poppins-Light'
                                                                : sectionproperties.relatedprodPriceFontWeight == 500
                                                                ? 'Poppins-Regular'
                                                                : sectionproperties.relatedprodPriceFontWeight == 600
                                                                ? 'Poppins-Medium'
                                                                : sectionproperties.relatedprodPriceFontWeight == 700
                                                                ? 'Poppins-Semibold'
                                                                : 'Poppins-Bold',
                                                    },
                                                ]}
                                            >
                                                {langdetect == 'en' ? 'EGP' : ''} 234 {langdetect == 'en' ? '' : 'ج.م'}
                                            </Text>
                                            <Text
                                                style={[
                                                    generalstyles.poppinsMedium,
                                                    {
                                                        color: sectionproperties.prodsalePriceColor,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.relatedprodpriceFontSize),
                                                        textDecorationLine: 'line-through',
                                                        textDecorationStyle: 'solid',
                                                    },
                                                ]}
                                            >
                                                {langdetect == 'en' ? 'EGP' : ''} 234 {langdetect == 'en' ? '' : 'ج.م'}
                                            </Text>
                                        </View>
                                    </View>
                                );
                            }}
                            contentContainerStyle={{ paddingBottom: SIZES.padding * 0.8 }}
                            numColumns={1}
                            horizontal
                        />
                    </View> */
}
