// // All take sectionidprops & sectionindexprops
// import React, { useEffect, useState, useContext, useMemo } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
// import { LanguageContext } from '../../../../LanguageContext/LanguageContext';
// import { FetchingContext } from '../../../../FetchingContext/FetchingContext';
// import { WebsiteDesignWorkPlaceContext } from '../../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
// import { ProductsCardsSectionContext } from '../ProductsCardsSectionContext';
// import { useInfiniteQuery, useQuery } from 'react-query';
// import { useInView } from 'react-intersection-observer';
// import generalstyles from '../../../GeneralFiles/Stylesheet/Stylesheet';
// import SpinnerButton from 'react-native-spinner-button';
// import { TemplateRoutingContext } from '../../../../TemplateRoutingContext';
// import { useNavigation } from '@react-navigation/native';
// import API from '../../../../API/API';
// import Carousel from 'react-native-snap-carousel';
// import { BlurView } from 'expo-blur';
// import { urlEndpoint } from '../../../../../config/imagekit';
// import { AntDesign } from '@expo/vector-icons';
// import { SIZES } from '../../../GeneralFiles/constants';

// const Categoriescards_slider_with_bottom_button = (props) => {
//     const { fetchcollections_API, fetchvendors_API } = API();
//     const navigation = useNavigation();
//     const { ref, inView } = useInView();
//     const { lang, langdetect } = useContext(LanguageContext);
//     const { StyleParseToIntFuncContext, INSTAPIKEYCONTEXT } = useContext(WebsiteDesignWorkPlaceContext);
//     const { fetchAuthorizationQueryContext, FetchQueriesEngineContext } = useContext(FetchingContext);
//     const { StaticPagesLinksContext, routingcountext } = useContext(TemplateRoutingContext);
//     const [sectionproperties, setsectionproperties] = useState('');
//     const [isproductsfetching, setisproductsfetching] = useState(false);
//     const [cardsarray, setcardsarray] = useState([]);
//     const [fetchingtype, setfetchingtype] = useState('');
//     const [sectionitem, setsectionitem] = useState('');
//     const [StatePageProperties, setStatePageProperties] = useState({});
//     const [ParentCollectionsForCollectionQueryArr, setParentCollectionsForCollectionQueryArr] = useState('');
//     const [ProductsFetchingTypeSectionObj, setProductsFetchingTypeSectionObj] = useState({ productfetchingtype: 'Random', collectionid: '', grouptype: '', grouptyperefid: '' });
//     const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
//     function wp(percentage) {
//         const value = (percentage * viewportWidth) / 100;
//         return Math.round(value);
//     }
//     const slideWidth = wp(70);
//     const sliderWidth = viewportWidth;
//     const itemWidth = slideWidth;
//     const fetchcollectionsQueryContext = useQuery(
//         ['fetchcollections_API' + JSON.stringify(ParentCollectionsForCollectionQueryArr)],
//         () => fetchcollections_API({ parentcollectionid: ParentCollectionsForCollectionQueryArr }),
//         {
//             keepPreviousData: true,
//             staleTime: Infinity,
//             enabled: INSTAPIKEYCONTEXT.length != 0 && ParentCollectionsForCollectionQueryArr.length != 0 ? true : false,
//         },
//     );
//     const FetchVendorsQuery = useQuery(['FetchVendors_API'], () => fetchvendors_API(), {
//         keepPreviousData: true,
//         staleTime: Infinity,
//         enabled: INSTAPIKEYCONTEXT.length != 0 && fetchingtype == 'vendors' ? true : false,
//     });

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

//                     if (props.srcfromprops == 'InnerGroups' || props.srcfromprops == 'InnerCategory' || props.srcfromprops == 'InnerParentCollection') {
//                         setfetchingtype(props.fetchingtypepassedprops);
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
//                             var arrafterfilter = [];
//                             parentcollections.forEach(function (parentcolitem, parcolindex) {
//                                 if (parentcolitem.categoryid == props.collectionidprops) {
//                                     arrafterfilter.push(parentcolitem);
//                                 }
//                             });
//                             parentcollections = arrafterfilter;
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
//     }, [sectionproperties, fetchcollectionsQueryContext.isSuccess]);
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
//         }
//     }, [fetchingtype, ProductsFetchingTypeSectionObj]);
//     useEffect(() => {
//         if (fetchcollectionsQueryContext.isFetching) {
//             setisproductsfetching(true);
//         } else {
//             setisproductsfetching(false);
//         }
//     }, [fetchcollectionsQueryContext.isFetching]);
//     useEffect(() => {
//         if (fetchingtype == 'vendors') {
//             if (FetchVendorsQuery.isSuccess) {
//                 if (FetchVendorsQuery.data.data.vendors != undefined && FetchVendorsQuery.data.data.vendors.length != 0) {
//                     cardobjassigner(FetchVendorsQuery?.data?.data?.vendors);
//                 }
//             }
//         }
//     }, [FetchVendorsQuery.isSuccess]);
//     useEffect(() => {
//         if (fetchingtype == 'collections') {
//             if (fetchcollectionsQueryContext.isSuccess) {
//                 cardobjassigner(fetchcollectionsQueryContext.data.data.collections);
//             }
//         }
//     }, [fetchcollectionsQueryContext.isSuccess]);

//     const cardobjassigner = (fetchedarray) => {
//         var temparray = [];
//         fetchedarray?.forEach(function (arrayItem, arrayindex) {
//             var cardobj = {
//                 name: '',
//                 image: '',
//             };
//             if (fetchingtype == 'collections' || fetchingtype == 'innerparentcollections') {
//                 cardobj.collectionid = arrayItem.collectionid;
//                 if (langdetect == 'en') {
//                     cardobj.name = arrayItem.title_en;
//                 } else {
//                     cardobj.name = arrayItem.title_ar;
//                 }
//                 cardobj.image = arrayItem.collectionlogo;
//             } else if (fetchingtype == 'categories') {
//                 cardobj.collectionid = arrayItem.categoryid;
//                 if (langdetect == 'en') {
//                     cardobj.name = arrayItem.title_en;
//                 } else if (langdetect == 'ar') {
//                     cardobj.name = arrayItem.title_ar;
//                 }
//                 cardobj.image = arrayItem.categorylogo;
//             } else if (fetchingtype == 'parentcollections' || fetchingtype == 'innercategories') {
//                 cardobj.collectionid = arrayItem.parentcollectionid;
//                 if (langdetect == 'en') {
//                     cardobj.name = arrayItem.title_en;
//                 } else if (langdetect == 'ar') {
//                     cardobj.name = arrayItem.title_ar;
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

//     const cardsrender = useMemo(() => {
//         return (
//             <View
//                 style={[
//                     generalstyles.allcentered,
//                     {
//                         marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop),
//                         marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom),
//                     },
//                 ]}
//             >
//                 <View style={{ marginBottom: StyleParseToIntFuncContext(sectionproperties.sectionTitleMarginBottom), marginTop: StyleParseToIntFuncContext(sectionproperties.sectionTitleMarginTop) }}>
//                     <Text
//                         style={[
//                             generalstyles.allcentered,
//                             {
//                                 fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
//                                 color: sectionproperties.sectionTitleColor,
//                                 fontFamily:
//                                     sectionproperties.sectiontitlefontfamily == 'Poppins'
//                                         ? sectionproperties.sectionTitleFontWeight == 300
//                                             ? 'Poppins-Thin'
//                                             : sectionproperties.sectionTitleFontWeight == 400
//                                             ? 'Poppins-Light'
//                                             : sectionproperties.sectionTitleFontWeight == 500
//                                             ? 'Poppins-Regular'
//                                             : sectionproperties.sectionTitleFontWeight == 600
//                                             ? 'Poppins-Medium'
//                                             : sectionproperties.sectionTitleFontWeight == 700
//                                             ? 'Poppins-Semibold'
//                                             : 'Poppins-Bold'
//                                         : sectionproperties.sectiontitlefontfamily == 'ASUL'
//                                         ? sectionproperties.sectionTitleFontWeight == 300 ||
//                                           sectionproperties.sectionTitleFontWeight == 400 ||
//                                           sectionproperties.sectionTitleFontWeight == 500 ||
//                                           sectionproperties.sectionTitleFontWeight == 600
//                                             ? 'Asul-Regular'
//                                             : sectionproperties.sectionTitleFontWeight == 600 || sectionproperties.sectionTitleFontWeight == 800
//                                             ? 'Asul-Bold'
//                                             : 'Asul-Regular'
//                                         : 'Poppins-Medium',
//                             },
//                         ]}
//                     >
//                         {langdetect == 'en' ? sectionproperties.sectionTitleContent : sectionproperties.sectionTitleContent_ar}
//                     </Text>
//                 </View>
//                 {sectionproperties.prodCatShow == 'Show' && (
//                     <View style={{ marginBottom: StyleParseToIntFuncContext(sectionproperties.descriptionMarginBottom) }}>
//                         <Text
//                             style={[
//                                 generalstyles.allcentered,
//                                 {
//                                     fontSize: StyleParseToIntFuncContext(sectionproperties.prodCatFontSize),
//                                     color: sectionproperties.prodCatColor,
//                                     fontFamily:
//                                         sectionproperties.descFontFamily == 'Poppins'
//                                             ? sectionproperties.prodCatFontWeight == 300
//                                                 ? 'Poppins-Thin'
//                                                 : sectionproperties.prodCatFontWeight == 400
//                                                 ? 'Poppins-Light'
//                                                 : sectionproperties.prodCatFontWeight == 500
//                                                 ? 'Poppins-Regular'
//                                                 : sectionproperties.prodCatFontWeight == 600
//                                                 ? 'Poppins-Medium'
//                                                 : sectionproperties.prodCatFontWeight == 700
//                                                 ? 'Poppins-Semibold'
//                                                 : 'Poppins-Bold'
//                                             : sectionproperties.descFontFamily == 'ASUL'
//                                             ? sectionproperties.prodCatFontWeight == 300 ||
//                                               sectionproperties.prodCatFontWeight == 400 ||
//                                               sectionproperties.prodCatFontWeight == 500 ||
//                                               sectionproperties.prodCatFontWeight == 600
//                                                 ? 'Asul-Regular'
//                                                 : sectionproperties.prodCatFontWeight == 600 || sectionproperties.prodCatFontWeight == 800
//                                                 ? 'Asul-Bold'
//                                                 : 'Asul-Regular'
//                                             : 'Poppins-Medium',
//                                 },
//                             ]}
//                         >
//                             {langdetect == 'en' ? sectionproperties.descriptionContentEn : sectionproperties.descriptionContentAr}
//                         </Text>
//                     </View>
//                 )}
//                 {isproductsfetching && renderSpinner()}
//                 {!isproductsfetching && cardsarray.length != 0 && (
//                     <Carousel
//                         layout={'default'}
//                         useScrollView={true}
//                         data={cardsarray}
//                         renderItem={({ item, index }) => {
//                             return (
//                                 <TouchableOpacity
//                                     style={[
//                                         styles.categorycard_carousel,
//                                         {
//                                             height: 238,
//                                             // height: StyleParseToIntFuncContext(sectionproperties.image_height),
//                                             backgroundColor: 'green',
//                                         },
//                                     ]}
//                                     onPress={() => {
//                                         routingcountext(StaticPagesLinksContext.GeneralProductsComponent, { genprodcompstinfo: { collectionid: item.collectionid } });
//                                     }}
//                                 >
//                                     <View
//                                         style={[
//                                             styles.categorycard_carouselImageCont,
//                                             {
//                                                 height: sectionproperties.generalbtn_show == 'Show' ? '85%' : '100%',
//                                             },
//                                         ]}
//                                     >
//                                         <Image
//                                             source={{
//                                                 uri: urlEndpoint + '/tr:w-' + sectionproperties.imagetr_w + ',h-' + sectionproperties.imagetr_h + '/' + item.image,
//                                             }}
//                                             resizeMode={sectionproperties.bgcovercontain == 'Cover' ? 'cover' : 'contain'}
//                                             style={[
//                                                 styles.categorycard_carouselImage,
//                                                 {
//                                                     borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true),
//                                                     borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true),
//                                                     borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true),
//                                                     borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true),
//                                                 },
//                                             ]}
//                                         />
//                                     </View>
//                                     {sectionproperties.generalbtn_show == 'Show' && (
//                                         <TouchableOpacity
//                                             onPress={() => {
//                                                 routingcountext(StaticPagesLinksContext.GeneralProductsComponent, { genprodcompstinfo: { collectionid: item.collectionid } });
//                                             }}
//                                             style={[
//                                                 styles.categorycard_carouselarrowcont,
//                                                 {
//                                                     width: StyleParseToIntFuncContext(sectionproperties.generalbtn_width),
//                                                     height: StyleParseToIntFuncContext(sectionproperties.generalbtn_height),
//                                                     borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertopleftradius, '', true),
//                                                     borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertoprightradius, '', true),
//                                                     borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomleftradius, '', true),
//                                                     borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomrightradius, '', true),
//                                                     backgroundColor: sectionproperties.generalbtn_bgColor,
//                                                     bottom: StyleParseToIntFuncContext(sectionproperties.generalbtn_marginBottom),
//                                                 },
//                                             ]}
//                                         >
//                                             <View
//                                                 style={{
//                                                     borderColor: sectionproperties.generalbtn_bordercolor,
//                                                     borderWidth: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderwidth),
//                                                     width: 50,
//                                                     height: 50,
//                                                     borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertopleftradius, '', true),
//                                                     borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertoprightradius, '', true),
//                                                     borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomleftradius, '', true),
//                                                     borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomrightradius, '', true),
//                                                     display: 'flex',
//                                                     alignItems: 'center',
//                                                     justifyContent: 'center',
//                                                 }}
//                                             >
//                                                 <AntDesign
//                                                     name={langdetect == 'en' ? 'arrowright' : 'arrowleft'}
//                                                     size={StyleParseToIntFuncContext(sectionproperties.generalbtn_fontsize)}
//                                                     style={{
//                                                         color: sectionproperties.generalbtn_textColor,
//                                                         transform: [{ rotate: '-45deg' }],
//                                                     }}
//                                                 />
//                                             </View>
//                                         </TouchableOpacity>
//                                     )}
//                                     {sectionproperties.general_showtext == 'Show' && (
//                                         <View
//                                             style={[
//                                                 generalstyles.allcentered,
//                                                 {
//                                                     borderRadius: 10,
//                                                     overflow: 'hidden',
//                                                     position: 'absolute',
//                                                     bottom: sectionproperties.generalbtn_show == 'Show' ? 180 : '40%',
//                                                 },
//                                             ]}
//                                         >
//                                             <BlurView
//                                                 BlurTint="dark"
//                                                 intensity={200}
//                                                 style={{
//                                                     justifyContent: 'center',
//                                                     alignSelf: 'center',
//                                                     paddingStart: 15,
//                                                     paddingEnd: 15,
//                                                     paddingTop: 15,
//                                                     paddingBottom: 15,
//                                                     // borderRadius: 100,
//                                                     minWidth: 100,
//                                                     maxWidth: 200,
//                                                 }}
//                                             >
//                                                 <Text
//                                                     ellipsizeMode="tail"
//                                                     numberOfLines={2}
//                                                     style={[
//                                                         generalstyles.textcapitalize,
//                                                         {
//                                                             textAlign: 'center',
//                                                             fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
//                                                             color: sectionproperties.generaltext_fontColor,
//                                                             fontFamily:
//                                                                 sectionproperties.generaltext_fontFamily == 'Poppins'
//                                                                     ? sectionproperties.generaltext_fontWeight == 300
//                                                                         ? 'Poppins-Thin'
//                                                                         : sectionproperties.generaltext_fontWeight == 400
//                                                                         ? 'Poppins-Light'
//                                                                         : sectionproperties.generaltext_fontWeight == 500
//                                                                         ? 'Poppins-Regular'
//                                                                         : sectionproperties.generaltext_fontWeight == 600
//                                                                         ? 'Poppins-Medium'
//                                                                         : sectionproperties.generaltext_fontWeight == 700
//                                                                         ? 'Poppins-Semibold'
//                                                                         : 'Poppins-Bold'
//                                                                     : sectionproperties.generaltext_fontFamily == 'ASUL'
//                                                                     ? sectionproperties.generaltext_fontWeight == 300 ||
//                                                                       sectionproperties.generaltext_fontWeight == 400 ||
//                                                                       sectionproperties.generaltext_fontWeight == 500 ||
//                                                                       sectionproperties.generaltext_fontWeight == 600
//                                                                         ? 'Asul-Regular'
//                                                                         : sectionproperties.generaltext_fontWeight == 600 || sectionproperties.generaltext_fontWeight == 800
//                                                                         ? 'Asul-Bold'
//                                                                         : 'Asul-Regular'
//                                                                     : 'Poppins-Medium',
//                                                             textTransform:
//                                                                 sectionproperties.generaltext_textTransform == 'Uppercase'
//                                                                     ? 'uppercase'
//                                                                     : sectionproperties.generaltext_textTransform == 'Capitalize'
//                                                                     ? 'capitalize'
//                                                                     : sectionproperties.generaltext_textTransform == 'Lowercase'
//                                                                     ? 'lowercase'
//                                                                     : 'none',
//                                                         },
//                                                     ]}
//                                                 >
//                                                     {item.name}
//                                                 </Text>
//                                             </BlurView>
//                                         </View>
//                                     )}
//                                 </TouchableOpacity>
//                             );
//                         }}
//                         sliderWidth={sliderWidth}
//                         itemWidth={itemWidth}
//                     />
//                 )}
//             </View>
//         );
//     }, [cardsarray, isproductsfetching]);

//     return (
//         <View
//             style={{
//                 backgroundColor: sectionproperties.backgroundColor,
//             }}
//         >
//             {cardsrender}
//         </View>
//     );
// };
// const styles = StyleSheet.create({
//     categorycard_carousel: {
//         alignItems: 'center',
//         marginEnd: 10,
//         marginStart: 10,
//     },
//     categorycard_carouselImageCont: {
//         width: '100%',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         position: 'relative',
//         backgroundColor: 'red',
//     },
//     categorycard_carouselImage: {
//         width: '100%',
//         height: '100%',
//     },
//     categorycard_carouselarrowcont: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: 'absolute',
//         zIndex: 1000,
//     },
// });
// export default Categoriescards_slider_with_bottom_button;
// All take sectionidprops & sectionindexprops
import React, { useEffect, useState, useContext, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LanguageContext } from '../../../../LanguageContext/LanguageContext';
import { FetchingContext } from '../../../../FetchingContext/FetchingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { ProductsCardsSectionContext } from '../ProductsCardsSectionContext';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import generalstyles from '../../../GeneralFiles/Stylesheet/Stylesheet';
import SpinnerButton from 'react-native-spinner-button';
import { TemplateRoutingContext } from '../../../../TemplateRoutingContext';
import { useNavigation } from '@react-navigation/native';
import API from '../../../../API/API';
// import Carousel from 'react-native-snap-carousel';
import Carousel from 'react-native-reanimated-carousel';

const Categoriescards_slider_with_bottom_button = (props) => {
    const { fetchcollections_API, fetchvendors_API } = API();
    const navigation = useNavigation();
    const { ref, inView } = useInView();
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext, INSTAPIKEYCONTEXT } = useContext(WebsiteDesignWorkPlaceContext);
    const { fetchAuthorizationQueryContext, FetchQueriesEngineContext } = useContext(FetchingContext);
    const { StaticPagesLinksContext, routingcountext } = useContext(TemplateRoutingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [isproductsfetching, setisproductsfetching] = useState(false);
    const [cardsarray, setcardsarray] = useState([]);
    const [fetchingtype, setfetchingtype] = useState('');
    const [sectionitem, setsectionitem] = useState('');
    const [StatePageProperties, setStatePageProperties] = useState({});
    const [ParentCollectionsForCollectionQueryArr, setParentCollectionsForCollectionQueryArr] = useState('');
    const [ProductsFetchingTypeSectionObj, setProductsFetchingTypeSectionObj] = useState({ productfetchingtype: 'Random', collectionid: '', grouptype: '', grouptyperefid: '' });
    const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
    function wp(percentage) {
        const value = (percentage * viewportWidth) / 100;
        return Math.round(value);
    }
    const slideWidth = wp(70);
    const sliderWidth = viewportWidth;
    const itemWidth = slideWidth;
    const fetchcollectionsQueryContext = useQuery(
        ['fetchcollections_API' + JSON.stringify(ParentCollectionsForCollectionQueryArr)],
        () => fetchcollections_API({ parentcollectionid: ParentCollectionsForCollectionQueryArr }),
        {
            keepPreviousData: true,
            staleTime: Infinity,
            enabled: INSTAPIKEYCONTEXT.length != 0 && ParentCollectionsForCollectionQueryArr.length != 0 ? true : false,
        },
    );
    const FetchVendorsQuery = useQuery(['FetchVendors_API'], () => fetchvendors_API(), {
        keepPreviousData: true,
        staleTime: Infinity,
        enabled: INSTAPIKEYCONTEXT.length != 0 && fetchingtype == 'vendors' ? true : false,
    });

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

                    if (props.srcfromprops == 'InnerGroups' || props.srcfromprops == 'InnerCategory' || props.srcfromprops == 'InnerParentCollection') {
                        setfetchingtype(props.fetchingtypepassedprops);
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
    }, [sectionproperties, fetchcollectionsQueryContext.isSuccess]);
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
        }
    }, [fetchingtype, ProductsFetchingTypeSectionObj]);
    useEffect(() => {
        if (fetchcollectionsQueryContext.isFetching) {
            setisproductsfetching(true);
        } else {
            setisproductsfetching(false);
        }
    }, [fetchcollectionsQueryContext.isFetching]);
    useEffect(() => {
        if (fetchingtype == 'vendors') {
            if (FetchVendorsQuery.isSuccess) {
                if (FetchVendorsQuery.data.data.vendors != undefined && FetchVendorsQuery.data.data.vendors.length != 0) {
                    cardobjassigner(FetchVendorsQuery?.data?.data?.vendors);
                }
            }
        }
    }, [FetchVendorsQuery.isSuccess]);
    useEffect(() => {
        if (fetchingtype == 'collections') {
            if (fetchcollectionsQueryContext.isSuccess) {
                cardobjassigner(fetchcollectionsQueryContext.data.data.collections);
            }
        }
    }, [fetchcollectionsQueryContext.isSuccess]);

    const cardobjassigner = (fetchedarray) => {
        var temparray = [];
        fetchedarray?.forEach(function (arrayItem, arrayindex) {
            var cardobj = {
                name: '',
                image: '',
            };
            if (fetchingtype == 'collections' || fetchingtype == 'innerparentcollections') {
                cardobj.collectionid = arrayItem.collectionid;
                if (langdetect == 'en') {
                    cardobj.name = arrayItem.title_en;
                } else {
                    cardobj.name = arrayItem.title_ar;
                }
                cardobj.image = arrayItem.collectionlogo;
            } else if (fetchingtype == 'categories') {
                cardobj.collectionid = arrayItem.categoryid;
                if (langdetect == 'en') {
                    cardobj.name = arrayItem.title_en;
                } else if (langdetect == 'ar') {
                    cardobj.name = arrayItem.title_ar;
                }
                cardobj.image = arrayItem.categorylogo;
            } else if (fetchingtype == 'parentcollections' || fetchingtype == 'innercategories') {
                cardobj.collectionid = arrayItem.parentcollectionid;
                if (langdetect == 'en') {
                    cardobj.name = arrayItem.title_en;
                } else if (langdetect == 'ar') {
                    cardobj.name = arrayItem.title_ar;
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

    const cardsrender = useMemo(() => {
        return (
            <View
                style={[
                    generalstyles.allcentered,
                    {
                        marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop),
                        marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom),
                    },
                ]}
            >
                {sectionproperties.sectionTitleFontSize != 0 && (
                    <View
                        style={{ marginBottom: StyleParseToIntFuncContext(sectionproperties.sectionTitleMarginBottom), marginTop: StyleParseToIntFuncContext(sectionproperties.sectionTitleMarginTop) }}
                    >
                        <Text
                            style={[
                                generalstyles.allcentered,
                                {
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
                                    color: sectionproperties.sectionTitleColor,
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
                                            ? sectionproperties.sectionTitleFontWeight == 300 ||
                                              sectionproperties.sectionTitleFontWeight == 400 ||
                                              sectionproperties.sectionTitleFontWeight == 500 ||
                                              sectionproperties.sectionTitleFontWeight == 600
                                                ? 'Asul-Regular'
                                                : sectionproperties.sectionTitleFontWeight == 600 || sectionproperties.sectionTitleFontWeight == 800
                                                ? 'Asul-Bold'
                                                : 'Asul-Regular'
                                            : 'Poppins-Medium',
                                },
                            ]}
                        >
                            {langdetect == 'en' ? sectionproperties.sectionTitleContent : sectionproperties.sectionTitleContent_ar}
                        </Text>
                    </View>
                )}
                {sectionproperties.prodCatShow == 'Show' && (
                    <View style={{ marginBottom: StyleParseToIntFuncContext(sectionproperties.descriptionMarginBottom) }}>
                        <Text
                            style={[
                                generalstyles.allcentered,
                                {
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.prodCatFontSize),
                                    color: sectionproperties.prodCatColor,
                                    fontFamily:
                                        sectionproperties.descFontFamily == 'Poppins'
                                            ? sectionproperties.prodCatFontWeight == 300
                                                ? 'Poppins-Thin'
                                                : sectionproperties.prodCatFontWeight == 400
                                                ? 'Poppins-Light'
                                                : sectionproperties.prodCatFontWeight == 500
                                                ? 'Poppins-Regular'
                                                : sectionproperties.prodCatFontWeight == 600
                                                ? 'Poppins-Medium'
                                                : sectionproperties.prodCatFontWeight == 700
                                                ? 'Poppins-Semibold'
                                                : 'Poppins-Bold'
                                            : sectionproperties.descFontFamily == 'ASUL'
                                            ? sectionproperties.prodCatFontWeight == 300 ||
                                              sectionproperties.prodCatFontWeight == 400 ||
                                              sectionproperties.prodCatFontWeight == 500 ||
                                              sectionproperties.prodCatFontWeight == 600
                                                ? 'Asul-Regular'
                                                : sectionproperties.prodCatFontWeight == 600 || sectionproperties.prodCatFontWeight == 800
                                                ? 'Asul-Bold'
                                                : 'Asul-Regular'
                                            : 'Poppins-Medium',
                                },
                            ]}
                        >
                            {langdetect == 'en' ? sectionproperties.descriptionContentEn : sectionproperties.descriptionContentAr}
                        </Text>
                    </View>
                )}
                {isproductsfetching && renderSpinner()}
                {/* {!isproductsfetching && cardsarray.length != 0 && (
                    <Carousel
                        layout={'default'}
                        useScrollView={true}
                        data={cardsarray}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    style={[
                                        styles.categorycard_carousel,
                                        {
                                            // height: 238,
                                            height: StyleParseToIntFuncContext(sectionproperties.image_height),
                                            overflow: 'hidden',
                                        },
                                    ]}
                                    onPress={() => {
                                        routingcountext(StaticPagesLinksContext.GeneralProductsComponent, { genprodcompstinfo: { collectionid: item.collectionid } });
                                    }}
                                >
                                    <View
                                        style={[
                                            styles.categorycard_carouselImageCont,
                                            {
                                                height: sectionproperties.generalbtn_show == 'Show' ? '85%' : '100%',
                                                borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true),
                                                borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true),
                                                borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true),
                                                borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true),
                                                overflow: 'hidden',
                                            },
                                        ]}
                                    >
                                        <ImageComponent
                                            path={'/tr:w-' + sectionproperties.imagetr_w + ',h-' + sectionproperties.imagetr_h + '/' + item.image}
                                            resizeMode={sectionproperties.bgcovercontain == 'Cover' ? 'cover' : 'contain'}
                                            style={[styles.categorycard_carouselImage, {}]}
                                        />
                                    </View>
                                    {sectionproperties.generalbtn_show == 'Show' && (
                                        <TouchableOpacity
                                            onPress={() => {
                                                routingcountext(StaticPagesLinksContext.GeneralProductsComponent, { genprodcompstinfo: { collectionid: item.collectionid } });
                                            }}
                                            style={[
                                                styles.categorycard_carouselarrowcont,
                                                {
                                                    width: StyleParseToIntFuncContext(sectionproperties.generalbtn_width),
                                                    height: StyleParseToIntFuncContext(sectionproperties.generalbtn_height),
                                                    borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertopleftradius, '', true),
                                                    borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertoprightradius, '', true),
                                                    borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomleftradius, '', true),
                                                    borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomrightradius, '', true),
                                                    backgroundColor: sectionproperties.generalbtn_bgColor,
                                                    bottom: StyleParseToIntFuncContext(sectionproperties.generalbtn_marginBottom),
                                                },
                                            ]}
                                        >
                                            <View
                                                style={{
                                                    borderColor: sectionproperties.generalbtn_bordercolor,
                                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderwidth),
                                                    width: 50,
                                                    height: 50,
                                                    borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertopleftradius, '', true),
                                                    borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertoprightradius, '', true),
                                                    borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomleftradius, '', true),
                                                    borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomrightradius, '', true),
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <AntDesign
                                                    name={langdetect == 'en' ? 'arrowright' : 'arrowleft'}
                                                    size={StyleParseToIntFuncContext(sectionproperties.generalbtn_fontsize)}
                                                    style={{
                                                        color: sectionproperties.generalbtn_textColor,
                                                        transform: [{ rotate: '-45deg' }],
                                                    }}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    {sectionproperties.general_showtext == 'Show' && (
                                        <View
                                            style={[
                                                generalstyles.allcentered,
                                                {
                                                    borderRadius: 10,
                                                    overflow: 'hidden',
                                                    position: 'absolute',
                                                    top: StyleParseToIntFuncContext(sectionproperties.generaltext_topposition) + '%',
                                                },
                                            ]}
                                        >
                                            <BlurView
                                                BlurTint="dark"
                                                intensity={200}
                                                style={{
                                                    justifyContent: 'center',
                                                    alignSelf: 'center',
                                                    paddingStart: 15,
                                                    paddingEnd: 15,
                                                    paddingTop: 15,
                                                    paddingBottom: 15,
                                                    // borderRadius: 100,
                                                    minWidth: 150,
                                                    maxWidth: 200,
                                                }}
                                            >
                                                <Text
                                                    ellipsizeMode="tail"
                                                    numberOfLines={2}
                                                    style={[
                                                        generalstyles.textcapitalize,
                                                        {
                                                            textAlign: 'center',
                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                                            color: sectionproperties.generaltext_fontColor,
                                                            fontFamily:
                                                                sectionproperties.generaltext_fontFamily == 'Poppins'
                                                                    ? sectionproperties.generaltext_fontWeight == 300
                                                                        ? 'Poppins-Thin'
                                                                        : sectionproperties.generaltext_fontWeight == 400
                                                                        ? 'Poppins-Light'
                                                                        : sectionproperties.generaltext_fontWeight == 500
                                                                        ? 'Poppins-Regular'
                                                                        : sectionproperties.generaltext_fontWeight == 600
                                                                        ? 'Poppins-Medium'
                                                                        : sectionproperties.generaltext_fontWeight == 700
                                                                        ? 'Poppins-Semibold'
                                                                        : 'Poppins-Bold'
                                                                    : sectionproperties.generaltext_fontFamily == 'ASUL'
                                                                    ? sectionproperties.generaltext_fontWeight == 300 ||
                                                                      sectionproperties.generaltext_fontWeight == 400 ||
                                                                      sectionproperties.generaltext_fontWeight == 500 ||
                                                                      sectionproperties.generaltext_fontWeight == 600
                                                                        ? 'Asul-Regular'
                                                                        : sectionproperties.generaltext_fontWeight == 600 || sectionproperties.generaltext_fontWeight == 800
                                                                        ? 'Asul-Bold'
                                                                        : 'Asul-Regular'
                                                                    : 'Poppins-Medium',
                                                            textTransform:
                                                                sectionproperties.generaltext_textTransform == 'Uppercase'
                                                                    ? 'uppercase'
                                                                    : sectionproperties.generaltext_textTransform == 'Capitalize'
                                                                    ? 'capitalize'
                                                                    : sectionproperties.generaltext_textTransform == 'Lowercase'
                                                                    ? 'lowercase'
                                                                    : 'none',
                                                        },
                                                    ]}
                                                >
                                                    {item.name}
                                                </Text>
                                            </BlurView>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            );
                        }}
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                    />
                )} */}
            </View>
        );
    }, [cardsarray, isproductsfetching]);

    return (
        <View
            style={{
                backgroundColor: sectionproperties.backgroundColor,
            }}
        >
            {cardsrender}
        </View>
    );
};
const styles = StyleSheet.create({
    categorycard_carousel: {
        alignItems: 'center',
        marginEnd: 10,
        marginStart: 10,
    },
    categorycard_carouselImageCont: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    categorycard_carouselImage: {
        width: '100%',
        height: '100%',
    },
    categorycard_carouselarrowcont: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1000,
    },
});
export default Categoriescards_slider_with_bottom_button;
