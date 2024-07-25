// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, TextInput, Linking, I18nManager } from 'react-native';
// import { icons, SIZES, COLORS, images } from '../../GeneralFiles/constants';
// import Feather from 'react-native-vector-icons/Feather';
// import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
// import { FetchingContext } from '../../../FetchingContext/FetchingContext';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
// import { LanguageContext } from '../../../LanguageContext/LanguageContext';
// import { MaterialIcons, FontAwesome, FontAwesome5, EvilIcons, Ionicons } from '@expo/vector-icons';
// // import { Restart } from 'fiction-expo-restart';
// import { SwipeablePanel } from 'rn-swipeable-panel';
// import ModalSelector from 'react-native-modal-selector';
// import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
// import { currentOTAversion } from '../../../../Env_Variables';
// import { useDispatch, useSelector } from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import * as Updates from 'expo-updates';

// const AppMenu = (props) => {
//     const StatePageProperties11 = useSelector((state) => state.page.value);
//     const { lang, langdetect, setlang } = useContext(LanguageContext);
//     const { ProjectOpenrcTypeContext, StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
//     const {
//         logoutfuncContext,
//         fetchorderhistoryQueryContext,
//         fetchAuthorizationQueryContext,
//         LogoutMutationContext,
//         FetchQueriesEngineContext,
//         setFetchQueriesEngineContext,
//         fetchFavoriteProductsQueryContext,
//         setcurrencyfunccontext,
//         templateproperties_context,
//     } = useContext(FetchingContext);
//     const { routingcountext, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
//     const [sectionproperties, setsectionproperties] = useState('');
//     const [swipeablePanelActive, setswipeablePanelActive] = useState(false);
//     const [StatePageProperties, setStatePageProperties] = useState({});
//     useEffect(() => {
//         StatePageProperties11.pages.forEach(function (item, index) {
//             if (CurrentPageIdContext == item.pageid) {
//                 setStatePageProperties(item.pageobj);
//             }
//         });
//     }, [StatePageProperties11]);
//     useEffect(() => {
//         var secpropobj = {};

//         if (StatePageProperties.pageobj != undefined && StatePageProperties.pageobj.pageproperties != undefined) {
//             StatePageProperties.pageobj.pageproperties.forEach(function (sectionitem, sectionindex) {
//                 secpropobj[sectionitem.property_css_name] = sectionitem.property_value;
//             });
//         }
//         setsectionproperties({ ...secpropobj });
//     }, [StatePageProperties]);

//     const changelang = async (lang) => {
//         await AsyncStorage.setItem('lang', lang);
//         if (lang == 'ar') {
//             I18nManager.allowRTL(true);
//             I18nManager.forceRTL(true);
//             // setlangdetect('ar');
//         } else {
//             I18nManager.allowRTL(false);
//             I18nManager.forceRTL(false);
//             // setlangdetect('en');
//         }
//         // setlang(lang);
//         // setswipeablePanelActive(false);
//         // Restart();
//         // Updates.reloadAsync();
//         await Updates.reloadAsync();
//     };
//     const openlangPanel = () => {
//         setswipeablePanelActive(true);
//     };
//     const closePanel = () => {
//         setswipeablePanelActive(false);
//     };
//     useEffect(() => {
//         if (fetchAuthorizationQueryContext.isSuccess) {
//             if (fetchAuthorizationQueryContext?.data?.data?.loggedin == true) {
//                 var tempFetchQueriesEngineContext = { ...FetchQueriesEngineContext };
//                 tempFetchQueriesEngineContext.orderhistory = true;
//                 tempFetchQueriesEngineContext.fetchfavoriteproducts = true;
//                 setFetchQueriesEngineContext({ ...tempFetchQueriesEngineContext });
//             } else {
//                 // routingcountext('');
//             }
//         }
//     }, [fetchAuthorizationQueryContext.isSuccess, fetchAuthorizationQueryContext.data]);

//     return (
//         <View style={{ height: SIZES.height }}>
//             {Object.keys(sectionproperties).length != 0 && (
//                 <View
//                     style={[
//                         generalstyles.container,
//                         {
//                             width: '100%',
//                             flexDirection: 'column',
//                             display: 'flex',
//                             alignItems: 'center',
//                             paddingLeft: 0,
//                             paddingRight: 0,
//                             paddingTop: StyleParseToIntFuncContext(sectionproperties.marginTop != null && sectionproperties.marginTop != undefined ? sectionproperties.marginTop : 0),
//                         },
//                     ]}
//                 >
//                     {/* Is subscribed property */}

//                     {/* <Text>asd{fetchAuthorizationQueryContext?.data?.data?.customerinfo?.subscriptionuser?.isusersubscribed?.toString()}</Text> */}
//                     {sectionproperties.showsection == 'Show' && fetchAuthorizationQueryContext?.data?.data?.loggedin && (
//                         <View
//                             style={{
//                                 width: '100%',
//                             }}
//                         >
//                             <View
//                                 style={[
//                                     styles.settingscard,
//                                     {
//                                         width: '100%',
//                                         marginBottom: 10,
//                                         paddingTop: 15,
//                                         paddingBottom: 15,
//                                         backgroundColor: sectionproperties.userinfo_sectionbgcolor,
//                                         borderRadius: StyleParseToIntFuncContext(sectionproperties.userinfo_borderradius, '', true),
//                                         borderWidth: StyleParseToIntFuncContext(sectionproperties.userinfo_borderwidth, '', true),
//                                         borderColor: sectionproperties.usserinfo_sectionbordercolor,
//                                     },
//                                 ]}
//                             >
//                                 <View style={[generalstyles.flexRow, { display: 'flex', alignItems: 'center', marginBottom: 5 }]}>
//                                     <Text
//                                         style={[
//                                             generalstyles.poppinsMedium,
//                                             generalstyles.textcapitalize,
//                                             {
//                                                 display: 'flex',
//                                                 alignItems: 'center',
//                                                 color: sectionproperties.text_secondarycolor,
//                                                 fontSize: StyleParseToIntFuncContext(sectionproperties.userinfo_titlefontsize),
//                                                 marginEnd: 5,
//                                                 fontFamily:
//                                                     sectionproperties.userinfo_titlefontweight == 300
//                                                         ? 'Poppins-Thin'
//                                                         : sectionproperties.userinfo_titlefontweight == 400
//                                                         ? 'Poppins-Light'
//                                                         : sectionproperties.userinfo_titlefontweight == 500
//                                                         ? 'Poppins-Regular'
//                                                         : sectionproperties.userinfo_titlefontweight == 600
//                                                         ? 'Poppins-Medium'
//                                                         : sectionproperties.userinfo_titlefontweight == 700
//                                                         ? 'Poppins-Semibold'
//                                                         : 'Poppins-Bold',
//                                             },
//                                         ]}
//                                     >
//                                         {lang.hello},{' '}
//                                         {fetchAuthorizationQueryContext?.data?.data?.loggedin && (
//                                             <Text
//                                                 style={[
//                                                     {
//                                                         fontSize: StyleParseToIntFuncContext(sectionproperties.userinfo_titlefontsize),
//                                                         color: sectionproperties.userinfo_color,
//                                                         fontFamily:
//                                                             sectionproperties.userinfo_titlefontweight == 300
//                                                                 ? 'Poppins-Thin'
//                                                                 : sectionproperties.userinfo_titlefontweight == 400
//                                                                 ? 'Poppins-Light'
//                                                                 : sectionproperties.userinfo_titlefontweight == 500
//                                                                 ? 'Poppins-Regular'
//                                                                 : sectionproperties.userinfo_titlefontweight == 600
//                                                                 ? 'Poppins-Medium'
//                                                                 : sectionproperties.userinfo_titlefontweight == 700
//                                                                 ? 'Poppins-Semibold'
//                                                                 : 'Poppins-Bold',
//                                                     },
//                                                 ]}
//                                             >
//                                                 {fetchAuthorizationQueryContext?.data?.data?.customerinfo?.name}
//                                             </Text>
//                                         )}
//                                     </Text>
//                                     <View style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                                         <Image source={icons.handwave} style={{ width: '100%', height: '100%' }} />
//                                     </View>
//                                 </View>
//                                 {fetchAuthorizationQueryContext?.data?.data?.customerinfo != undefined && (
//                                     <View style={[generalstyles.flexColumn]}>
//                                         <Text
//                                             style={{
//                                                 textAlign: 'left',
//                                                 fontSize: StyleParseToIntFuncContext(sectionproperties.userinfo_fontsize),
//                                                 color: sectionproperties.userinfo_color,
//                                                 fontFamily:
//                                                     sectionproperties.userinfo_fontweight == 300
//                                                         ? 'Poppins-Thin'
//                                                         : sectionproperties.userinfo_fontweight == 400
//                                                         ? 'Poppins-Light'
//                                                         : sectionproperties.userinfo_fontweight == 500
//                                                         ? 'Poppins-Regular'
//                                                         : sectionproperties.userinfo_fontweight == 600
//                                                         ? 'Poppins-Medium'
//                                                         : sectionproperties.userinfo_fontweight == 700
//                                                         ? 'Poppins-Semibold'
//                                                         : 'Poppins-Bold',
//                                             }}
//                                         >
//                                             {fetchAuthorizationQueryContext?.data?.data?.customerinfo?.email}
//                                         </Text>
//                                         {sectionproperties.showsubscription == 'Show' && (
//                                             <Text
//                                                 style={{
//                                                     textAlign: 'left',
//                                                     fontSize: StyleParseToIntFuncContext(sectionproperties.userinfo_fontsize),
//                                                     color: sectionproperties.userinfo_color,
//                                                     fontFamily:
//                                                         sectionproperties.userinfo_fontweight == 300
//                                                             ? 'Poppins-Thin'
//                                                             : sectionproperties.userinfo_fontweight == 400
//                                                             ? 'Poppins-Light'
//                                                             : sectionproperties.userinfo_fontweight == 500
//                                                             ? 'Poppins-Regular'
//                                                             : sectionproperties.userinfo_fontweight == 600
//                                                             ? 'Poppins-Medium'
//                                                             : sectionproperties.userinfo_fontweight == 700
//                                                             ? 'Poppins-Semibold'
//                                                             : 'Poppins-Bold',
//                                                 }}
//                                             >
//                                                 {langdetect == 'en' ? 'Subscribed in' : 'مشترك فى'}:{fetchAuthorizationQueryContext?.data?.data?.customerinfo?.subscription_name}
//                                             </Text>
//                                         )}
//                                         {sectionproperties.showsubscription == 'Show' && (
//                                             <Text
//                                                 style={{
//                                                     textAlign: 'left',
//                                                     fontSize: StyleParseToIntFuncContext(sectionproperties.userinfo_fontsize),
//                                                     color: sectionproperties.userinfo_color,
//                                                     fontFamily:
//                                                         sectionproperties.userinfo_fontweight == 300
//                                                             ? 'Poppins-Thin'
//                                                             : sectionproperties.userinfo_fontweight == 400
//                                                             ? 'Poppins-Light'
//                                                             : sectionproperties.userinfo_fontweight == 500
//                                                             ? 'Poppins-Regular'
//                                                             : sectionproperties.userinfo_fontweight == 600
//                                                             ? 'Poppins-Medium'
//                                                             : sectionproperties.userinfo_fontweight == 700
//                                                             ? 'Poppins-Semibold'
//                                                             : 'Poppins-Bold',
//                                                 }}
//                                             >
//                                                 {langdetect == 'en' ? 'Expires at' : 'ينتهى فى'}: {fetchAuthorizationQueryContext?.data?.data?.customerinfo?.subscrption_enddate}
//                                             </Text>
//                                         )}
//                                     </View>
//                                 )}
//                                 {fetchAuthorizationQueryContext?.data?.data?.customerinfo != undefined &&
//                                     fetchAuthorizationQueryContext?.data?.data?.customerinfo?.cancustomerviewwallet == 1 &&
//                                     templateproperties_context.showwallet == 'Show' && (
//                                         <View style={[generalstyles.flexRow, { width: '100%', marginTop: 5 }]}>
//                                             <Ionicons name="wallet-outline" size={20} style={{ marginEnd: 5 }} />
//                                             <Text
//                                                 style={{
//                                                     color: templateproperties_context.walletcolor,
//                                                     fontSize: StyleParseToIntFuncContext(templateproperties_context.walletfontize),
//                                                     fontFamily: 'Poppins-Light',
//                                                 }}
//                                             >
//                                                 {langdetect == 'en' ? templateproperties_context.walletcontent_en : templateproperties_context.walletcontent_ar}
//                                             </Text>
//                                             <Text
//                                                 style={{
//                                                     color: templateproperties_context.walletsecondarycolor,
//                                                     fontSize: 15,
//                                                     fontFamily: 'Poppins-Medium',
//                                                 }}
//                                             >
//                                                 {fetchAuthorizationQueryContext?.data?.data?.customerinfo?.walletpoints}{' '}
//                                             </Text>
//                                         </View>
//                                     )}
//                             </View>
//                         </View>
//                     )}
//                     {fetchAuthorizationQueryContext?.data?.data?.loggedin && (
//                         <>
//                             <View style={[styles.titlecont, { marginTop: 5 }]}>
//                                 <Text
//                                     style={{
//                                         textAlign: 'left',
//                                         fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
//                                         color: sectionproperties.sectionTitleColor,
//                                         textTransform:
//                                             sectionproperties.sectionTitleTextTransform == 'Uppercase'
//                                                 ? 'uppercase'
//                                                 : sectionproperties.sectionTitleTextTransform == 'Capitalize' || sectionproperties.sectionTitleTextTransform == 'capitalize'
//                                                 ? 'capitalize'
//                                                 : sectionproperties.sectionTitleTextTransform == 'None' || sectionproperties.sectionTitleTextTransform == 'none'
//                                                 ? 'none'
//                                                 : 'lowercase',
//                                         fontFamily:
//                                             sectionproperties.sectionTitleFontWeight == 300
//                                                 ? 'Poppins-Thin'
//                                                 : sectionproperties.sectionTitleFontWeight == 400
//                                                 ? 'Poppins-Light'
//                                                 : sectionproperties.sectionTitleFontWeight == 500
//                                                 ? 'Poppins-Regular'
//                                                 : sectionproperties.sectionTitleFontWeight == 600
//                                                 ? 'Poppins-Medium'
//                                                 : sectionproperties.sectionTitleFontWeight == 700
//                                                 ? 'Poppins-Semibold'
//                                                 : 'Poppins-Bold',
//                                     }}
//                                 >
//                                     {lang.myaccount}
//                                 </Text>
//                             </View>

//                             <View
//                                 style={{
//                                     width: '100%',
//                                 }}
//                             >
//                                 <View
//                                     style={[
//                                         styles.settingscard,
//                                         {
//                                             marginBottom: 10,
//                                             backgroundColor: sectionproperties.backgroundColor,
//                                         },
//                                     ]}
//                                 >
//                                     <TouchableOpacity
//                                         style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}
//                                         onPress={() => {
//                                             routingcountext(StaticPagesLinksContext.accountinfo);
//                                         }}
//                                     >
//                                         <View style={[styles.settingsiconcont]}>
//                                             <AntDesign
//                                                 name="user"
//                                                 size={16}
//                                                 style={{
//                                                     color: sectionproperties.iconcontainercolor,
//                                                 }}
//                                             />
//                                         </View>
//                                         <Text
//                                             style={{
//                                                 textAlign: 'left',
//                                                 flex: 1,
//                                                 fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
//                                                 color: sectionproperties.generaltext_fontColor,
//                                                 textTransform:
//                                                     sectionproperties.generaltext_textTransform == 'Uppercase'
//                                                         ? 'uppercase'
//                                                         : sectionproperties.generaltext_textTransform == 'Capitalize'
//                                                         ? 'capitalize'
//                                                         : 'lowercase',
//                                                 fontFamily:
//                                                     sectionproperties.generaltext_fontWeight == 300
//                                                         ? 'Poppins-Thin'
//                                                         : sectionproperties.generaltext_fontWeight == 400
//                                                         ? 'Poppins-Light'
//                                                         : sectionproperties.generaltext_fontWeight == 500
//                                                         ? 'Poppins-Regular'
//                                                         : sectionproperties.generaltext_fontWeight == 600
//                                                         ? 'Poppins-Medium'
//                                                         : sectionproperties.generaltext_fontWeight == 700
//                                                         ? 'Poppins-Semibold'
//                                                         : 'Poppins-Bold',
//                                             }}
//                                         >
//                                             {lang.userprofile}
//                                         </Text>
//                                         <MaterialIcons
//                                             name={langdetect == 'en' ? 'keyboard-arrow-right' : 'keyboard-arrow-left'}
//                                             size={20}
//                                             style={{
//                                                 color: sectionproperties.iconcontainercolor,
//                                             }}
//                                         />
//                                     </TouchableOpacity>
//                                     <View style={{ width: '100%', height: 1, backgroundColor: '#eee', marginBottom: 10, marginTop: 10 }}></View>
//                                     <TouchableOpacity
//                                         style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}
//                                         onPress={() => {
//                                             routingcountext(StaticPagesLinksContext.Wishlist);
//                                         }}
//                                     >
//                                         <View style={[styles.settingsiconcont]}>
//                                             <AntDesign
//                                                 name="hearto"
//                                                 size={15}
//                                                 style={{
//                                                     color: sectionproperties.iconcontainercolor,
//                                                     // opacity: sectionproperties.icon_opacity,
//                                                 }}
//                                             />
//                                         </View>
//                                         <Text
//                                             style={{
//                                                 flex: 1,
//                                                 fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
//                                                 color: sectionproperties.generaltext_fontColor,
//                                                 textTransform:
//                                                     sectionproperties.generaltext_textTransform == 'Uppercase'
//                                                         ? 'uppercase'
//                                                         : sectionproperties.generaltext_textTransform == 'Capitalize'
//                                                         ? 'capitalize'
//                                                         : 'lowercase',
//                                                 fontFamily:
//                                                     sectionproperties.generaltext_fontWeight == 300
//                                                         ? 'Poppins-Thin'
//                                                         : sectionproperties.generaltext_fontWeight == 400
//                                                         ? 'Poppins-Light'
//                                                         : sectionproperties.generaltext_fontWeight == 500
//                                                         ? 'Poppins-Regular'
//                                                         : sectionproperties.generaltext_fontWeight == 600
//                                                         ? 'Poppins-Medium'
//                                                         : sectionproperties.generaltext_fontWeight == 700
//                                                         ? 'Poppins-Semibold'
//                                                         : 'Poppins-Bold',
//                                                 textAlign: 'left',
//                                             }}
//                                         >
//                                             {lang.mywishlist}
//                                         </Text>
//                                         {!fetchFavoriteProductsQueryContext.isFetching && fetchFavoriteProductsQueryContext.isSuccess && (
//                                             <View
//                                                 style={{
//                                                     marginTop: 'auto',
//                                                     marginBottom: 'auto',
//                                                     width: 20,
//                                                     height: 20,
//                                                     display: 'flex',
//                                                     alignItems: 'center',
//                                                     justifyContent: 'center',
//                                                     backgroundColor: sectionproperties.badge_bgcolor,
//                                                     borderRadius: StyleParseToIntFuncContext(sectionproperties.badge_borderradius, '', true),
//                                                 }}
//                                             >
//                                                 <Text
//                                                     style={{
//                                                         textTransform: 'capitalize',
//                                                         fontFamily: 'Poppins-Medium',
//                                                         fontSize: StyleParseToIntFuncContext(sectionproperties.badge_fontsize),
//                                                         color: sectionproperties.badge_color,
//                                                         paddingStart: Platform.OS == 'ios' ? (langdetect == 'en' ? 1 : 0) : 0,
//                                                         paddingEnd: Platform.OS == 'ios' ? (langdetect == 'en' ? 0 : 1) : 0,
//                                                     }}
//                                                 >
//                                                     {fetchFavoriteProductsQueryContext?.data?.data?.products.length == 0 ? 0 : fetchFavoriteProductsQueryContext?.data?.data?.products?.length}
//                                                 </Text>
//                                             </View>
//                                         )}
//                                     </TouchableOpacity>
//                                     {sectionproperties.showpreviousinfo == 'Show' && <View style={{ width: '100%', height: 1, backgroundColor: '#eee', marginBottom: 10, marginTop: 10 }}></View>}

//                                     {sectionproperties.showpreviousinfo == 'Show' && (
//                                         <TouchableOpacity
//                                             style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}
//                                             onPress={() => {
//                                                 routingcountext(StaticPagesLinksContext.Ordershistory);
//                                             }}
//                                         >
//                                             <View style={[styles.settingsiconcont]}>
//                                                 <MaterialCommunityIcons
//                                                     name="history"
//                                                     size={17}
//                                                     style={{
//                                                         color: sectionproperties.iconcontainercolor,
//                                                         // opacity: sectionproperties.icon_opacity,
//                                                     }}
//                                                 />
//                                             </View>
//                                             <Text
//                                                 style={{
//                                                     flex: 1,
//                                                     textAlign: 'left',
//                                                     fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
//                                                     color: sectionproperties.generaltext_fontColor,
//                                                     textTransform:
//                                                         sectionproperties.generaltext_textTransform == 'Uppercase'
//                                                             ? 'uppercase'
//                                                             : sectionproperties.generaltext_textTransform == 'Capitalize'
//                                                             ? 'capitalize'
//                                                             : 'lowercase',
//                                                     fontFamily:
//                                                         sectionproperties.generaltext_fontWeight == 300
//                                                             ? 'Poppins-Thin'
//                                                             : sectionproperties.generaltext_fontWeight == 400
//                                                             ? 'Poppins-Light'
//                                                             : sectionproperties.generaltext_fontWeight == 500
//                                                             ? 'Poppins-Regular'
//                                                             : sectionproperties.generaltext_fontWeight == 600
//                                                             ? 'Poppins-Medium'
//                                                             : sectionproperties.generaltext_fontWeight == 700
//                                                             ? 'Poppins-Semibold'
//                                                             : 'Poppins-Bold',
//                                                 }}
//                                             >
//                                                 {langdetect == 'en' ? sectionproperties.previousorders_titleen : sectionproperties.previousorders_titlear}
//                                                 {/* {lang.previousorders} */}
//                                             </Text>
//                                             {!fetchorderhistoryQueryContext.isFetching && fetchorderhistoryQueryContext.isSuccess && (
//                                                 <View
//                                                     style={{
//                                                         marginTop: 'auto',
//                                                         marginBottom: 'auto',
//                                                         width: 20,
//                                                         height: 20,
//                                                         display: 'flex',
//                                                         alignItems: 'center',
//                                                         justifyContent: 'center',
//                                                         backgroundColor: sectionproperties.badge_bgcolor,
//                                                         borderRadius: StyleParseToIntFuncContext(sectionproperties.badge_borderradius, '', true),
//                                                     }}
//                                                 >
//                                                     <Text
//                                                         style={{
//                                                             paddingTop: Platform.OS == 'ios' ? 0 : 1,
//                                                             paddingStart: Platform.OS == 'ios' ? (langdetect == 'en' ? 1 : 0) : 0,
//                                                             paddingEnd: Platform.OS == 'ios' ? (langdetect == 'en' ? 0 : 1) : 0,
//                                                             fontFamily: 'Poppins-Medium',
//                                                             fontSize: StyleParseToIntFuncContext(sectionproperties.badge_fontsize),
//                                                             color: sectionproperties.badge_color,
//                                                         }}
//                                                     >
//                                                         {fetchorderhistoryQueryContext?.data?.data?.ordershistory?.length}
//                                                     </Text>
//                                                 </View>
//                                             )}
//                                         </TouchableOpacity>
//                                     )}
//                                 </View>
//                             </View>
//                         </>
//                     )}
//                     <View style={[styles.titlecont, { marginTop: fetchAuthorizationQueryContext?.data?.data?.loggedin == true ? 5 : 10 }]}>
//                         <Text
//                             style={{
//                                 textAlign: 'left',
//                                 fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
//                                 color: sectionproperties.sectionTitleColor,
//                                 textTransform:
//                                     sectionproperties.sectionTitleTextTransform == 'Uppercase'
//                                         ? 'uppercase'
//                                         : sectionproperties.sectionTitleTextTransform == 'Capitalize' || sectionproperties.sectionTitleTextTransform == 'capitalize'
//                                         ? 'capitalize'
//                                         : 'lowercase',
//                                 fontFamily:
//                                     sectionproperties.sectionTitleFontWeight == 300
//                                         ? 'Poppins-Thin'
//                                         : sectionproperties.sectionTitleFontWeight == 400
//                                         ? 'Poppins-Light'
//                                         : sectionproperties.sectionTitleFontWeight == 500
//                                         ? 'Poppins-Regular'
//                                         : sectionproperties.sectionTitleFontWeight == 600
//                                         ? 'Poppins-Medium'
//                                         : sectionproperties.sectionTitleFontWeight == 700
//                                         ? 'Poppins-Semibold'
//                                         : 'Poppins-Bold',
//                             }}
//                         >
//                             {lang.settings}
//                         </Text>
//                     </View>
//                     <View
//                         style={{
//                             width: '100%',
//                         }}
//                     >
//                         <View
//                             style={[
//                                 styles.settingscard,
//                                 {
//                                     marginBottom: 10,
//                                     backgroundColor: sectionproperties.backgroundColor,
//                                 },
//                             ]}
//                         >
//                             <View
//                                 style={{
//                                     marginBottom: 10,
//                                     marginTop: 10,
//                                 }}
//                             >
//                                 <ModalSelector
//                                     data={[
//                                         { label: 'English', key: 'en' },
//                                         { label: 'لغة عربية', key: 'ar' },
//                                     ]}
//                                     initValue="Select"
//                                     supportedOrientations={['portrait']}
//                                     accessible={true}
//                                     scrollViewAccessibilityLabel={'Scrollable options'}
//                                     cancelButtonAccessibilityLabel={'Cancel Button'}
//                                     onChange={(event) => {
//                                         changelang(event.key);
//                                     }}
//                                     optionTextStyle={{
//                                         color: 'black',
//                                         fontFamily: 'Poppins-Medium',
//                                         textTransform: 'capitalize',
//                                     }}
//                                     selectTextStyle={{
//                                         color: 'orange',
//                                         fontFamily: 'Poppins-Medium',
//                                         textTransform: 'capitalize',
//                                     }}
//                                     cancelTextStyle={{
//                                         color: 'black',
//                                         fontFamily: 'Poppins-Medium',
//                                         textTransform: 'capitalize',
//                                     }}
//                                 >
//                                     <View style={[generalstyles.flexRow]}>
//                                         <View style={[generalstyles.flexRow, { flex: 1 }]}>
//                                             <View style={[styles.settingsiconcont]}>
//                                                 <Feather
//                                                     name="globe"
//                                                     size={15}
//                                                     style={{
//                                                         color: sectionproperties.iconcontainercolor,
//                                                     }}
//                                                 />
//                                             </View>
//                                             <TextInput
//                                                 style={{
//                                                     fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
//                                                     color: sectionproperties.generaltext_fontColor,
//                                                     textTransform:
//                                                         sectionproperties.generaltext_textTransform == 'Uppercase'
//                                                             ? 'uppercase'
//                                                             : sectionproperties.generaltext_textTransform == 'Capitalize'
//                                                             ? 'capitalize'
//                                                             : 'lowercase',
//                                                     fontFamily:
//                                                         sectionproperties.generaltext_fontWeight == 300
//                                                             ? 'Poppins-Thin'
//                                                             : sectionproperties.generaltext_fontWeight == 400
//                                                             ? 'Poppins-Light'
//                                                             : sectionproperties.generaltext_fontWeight == 500
//                                                             ? 'Poppins-Regular'
//                                                             : sectionproperties.generaltext_fontWeight == 600
//                                                             ? 'Poppins-Medium'
//                                                             : sectionproperties.generaltext_fontWeight == 700
//                                                             ? 'Poppins-Semibold'
//                                                             : 'Poppins-Bold',
//                                                 }}
//                                                 editable={false}
//                                                 value={lang.language}
//                                                 // placeholder="Language"
//                                             />
//                                         </View>
//                                         <Feather
//                                             name="globe"
//                                             size={20}
//                                             style={{
//                                                 color: sectionproperties.iconcontainercolor,
//                                             }}
//                                         />
//                                     </View>
//                                 </ModalSelector>
//                             </View>
//                             {sectionproperties.showcurrencies == 'Show' && <View style={{ width: '100%', height: 1, backgroundColor: '#eee', marginBottom: 10, marginTop: 10 }}></View>}
//                             {fetchAuthorizationQueryContext != undefined &&
//                                 fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcurrencies?.length > 1 &&
//                                 sectionproperties.showcurrencies == 'Show' && (
//                                     <View style={{ marginVertical: 10 }}>
//                                         <ModalSelector
//                                             data={fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcurrencies}
//                                             initValue="Select"
//                                             supportedOrientations={['portrait']}
//                                             accessible={true}
//                                             scrollViewAccessibilityLabel={'Scrollable options'}
//                                             cancelButtonAccessibilityLabel={'Cancel Button'}
//                                             keyExtractor={(item) => item.currencyid}
//                                             labelExtractor={(item) => (langdetect == 'en' ? item.currencyname_en : item.currencyname_ar)}
//                                             onChange={(item) => {
//                                                 setcurrencyfunccontext(item);
//                                             }}
//                                             optionTextStyle={{
//                                                 color: 'black',
//                                                 fontFamily: 'Poppins-Medium',
//                                                 textTransform: 'capitalize',
//                                             }}
//                                             selectTextStyle={{
//                                                 color: 'orange',
//                                                 fontFamily: 'Poppins-Medium',
//                                                 textTransform: 'capitalize',
//                                             }}
//                                             cancelTextStyle={{
//                                                 color: 'black',
//                                                 fontFamily: 'Poppins-Medium',
//                                                 textTransform: 'capitalize',
//                                             }}
//                                         >
//                                             <View style={[generalstyles.flexRow]}>
//                                                 <View style={[generalstyles.flexRow, { flex: 1 }]}>
//                                                     <View style={[styles.settingsiconcont]}>
//                                                         <FontAwesome5
//                                                             name="money-bill-wave"
//                                                             size={15}
//                                                             style={{
//                                                                 color: sectionproperties.iconcontainercolor,
//                                                             }}
//                                                         />
//                                                     </View>
//                                                     <TextInput
//                                                         style={{
//                                                             fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
//                                                             color: sectionproperties.generaltext_fontColor,
//                                                             textTransform:
//                                                                 sectionproperties.generaltext_textTransform == 'Uppercase'
//                                                                     ? 'uppercase'
//                                                                     : sectionproperties.generaltext_textTransform == 'Capitalize'
//                                                                     ? 'capitalize'
//                                                                     : 'lowercase',
//                                                             fontFamily:
//                                                                 sectionproperties.generaltext_fontWeight == 300
//                                                                     ? 'Poppins-Thin'
//                                                                     : sectionproperties.generaltext_fontWeight == 400
//                                                                     ? 'Poppins-Light'
//                                                                     : sectionproperties.generaltext_fontWeight == 500
//                                                                     ? 'Poppins-Regular'
//                                                                     : sectionproperties.generaltext_fontWeight == 600
//                                                                     ? 'Poppins-Medium'
//                                                                     : sectionproperties.generaltext_fontWeight == 700
//                                                                     ? 'Poppins-Semibold'
//                                                                     : 'Poppins-Bold',
//                                                         }}
//                                                         editable={false}
//                                                         value={lang.currency}
//                                                     />
//                                                 </View>
//                                                 <Text style={[generalstyles.poppinsMedium]}>
//                                                     {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
//                                                 </Text>
//                                             </View>
//                                         </ModalSelector>
//                                     </View>
//                                 )}
//                             {fetchAuthorizationQueryContext != undefined &&
//                                 fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcurrencies?.length == 1 &&
//                                 sectionproperties.showcurrencies == 'Show' && (
//                                     <View style={{ marginVertical: 10 }}>
//                                         <View style={[generalstyles.flexRow]}>
//                                             <View style={[generalstyles.flexRow, { flex: 1 }]}>
//                                                 <View style={[styles.settingsiconcont]}>
//                                                     <FontAwesome5
//                                                         name="money-bill-wave"
//                                                         size={15}
//                                                         style={{
//                                                             color: sectionproperties.iconcontainercolor,
//                                                         }}
//                                                     />
//                                                 </View>
//                                                 <TextInput
//                                                     style={{
//                                                         fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
//                                                         color: sectionproperties.generaltext_fontColor,
//                                                         textTransform:
//                                                             sectionproperties.generaltext_textTransform == 'Uppercase'
//                                                                 ? 'uppercase'
//                                                                 : sectionproperties.generaltext_textTransform == 'Capitalize'
//                                                                 ? 'capitalize'
//                                                                 : 'lowercase',
//                                                         fontFamily:
//                                                             sectionproperties.generaltext_fontWeight == 300
//                                                                 ? 'Poppins-Thin'
//                                                                 : sectionproperties.generaltext_fontWeight == 400
//                                                                 ? 'Poppins-Light'
//                                                                 : sectionproperties.generaltext_fontWeight == 500
//                                                                 ? 'Poppins-Regular'
//                                                                 : sectionproperties.generaltext_fontWeight == 600
//                                                                 ? 'Poppins-Medium'
//                                                                 : sectionproperties.generaltext_fontWeight == 700
//                                                                 ? 'Poppins-Semibold'
//                                                                 : 'Poppins-Bold',
//                                                     }}
//                                                     editable={false}
//                                                     value={lang.currency}
//                                                 />
//                                             </View>
//                                             <Text style={[generalstyles.poppinsMedium]}>
//                                                 {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
//                                             </Text>
//                                         </View>
//                                     </View>
//                                 )}
//                             {sectionproperties.showPolicy == 'Show' && <View style={{ width: '100%', height: 1, backgroundColor: '#eee', marginBottom: 10, marginTop: 10 }}></View>}
//                             {sectionproperties.showPolicy == 'Show' && (
//                                 <View
//                                     style={{
//                                         marginBottom: 10,
//                                         marginTop: 10,
//                                     }}
//                                 >
//                                     <TouchableOpacity
//                                         style={[generalstyles.flexRow]}
//                                         onPress={() => {
//                                             Linking.openURL('https://' + fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcred?.instexternaldomain + '/policies');
//                                         }}
//                                     >
//                                         <View style={[generalstyles.flexRow, { flex: 1 }]}>
//                                             <View style={[styles.settingsiconcont]}>
//                                                 <MaterialIcons
//                                                     name="policy"
//                                                     size={17}
//                                                     style={{
//                                                         color: sectionproperties.iconcontainercolor,
//                                                     }}
//                                                 />
//                                             </View>
//                                             <Text
//                                                 style={{
//                                                     fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
//                                                     color: sectionproperties.generaltext_fontColor,
//                                                     textTransform:
//                                                         sectionproperties.generaltext_textTransform == 'Uppercase'
//                                                             ? 'uppercase'
//                                                             : sectionproperties.generaltext_textTransform == 'Capitalize'
//                                                             ? 'capitalize'
//                                                             : 'lowercase',
//                                                     fontFamily:
//                                                         sectionproperties.generaltext_fontWeight == 300
//                                                             ? 'Poppins-Thin'
//                                                             : sectionproperties.generaltext_fontWeight == 400
//                                                             ? 'Poppins-Light'
//                                                             : sectionproperties.generaltext_fontWeight == 500
//                                                             ? 'Poppins-Regular'
//                                                             : sectionproperties.generaltext_fontWeight == 600
//                                                             ? 'Poppins-Medium'
//                                                             : sectionproperties.generaltext_fontWeight == 700
//                                                             ? 'Poppins-Semibold'
//                                                             : 'Poppins-Bold',
//                                                 }}
//                                             >
//                                                 {lang.policies}
//                                             </Text>
//                                         </View>
//                                         <MaterialIcons
//                                             name={langdetect == 'en' ? 'keyboard-arrow-right' : 'keyboard-arrow-left'}
//                                             size={20}
//                                             style={{
//                                                 color: sectionproperties.iconcontainercolor,
//                                             }}
//                                         />
//                                     </TouchableOpacity>
//                                 </View>
//                             )}
//                             {fetchAuthorizationQueryContext?.data?.data?.CuContactphonenumber != null && sectionproperties.showfooterphonenumber == 'Show' && (
//                                 <View style={{ width: '100%', height: 1, backgroundColor: '#eee', marginBottom: 10, marginTop: 10 }}></View>
//                             )}
//                             {fetchAuthorizationQueryContext?.data?.data?.CuContactphonenumber != null && sectionproperties.showfooterphonenumber == 'Show' && (
//                                 <View
//                                     style={{
//                                         marginBottom: 10,
//                                         marginTop: 10,
//                                     }}
//                                 >
//                                     <TouchableOpacity
//                                         style={[generalstyles.flexRow]}
//                                         onPress={() => {
//                                             Linking.openURL('tel:' + fetchAuthorizationQueryContext?.data?.data?.CuContactphonenumber);
//                                         }}
//                                     >
//                                         <View style={[generalstyles.flexRow, { flex: 1 }]}>
//                                             <View style={[styles.settingsiconcont]}>
//                                                 <Feather
//                                                     name="phone"
//                                                     size={15}
//                                                     style={{
//                                                         color: sectionproperties.iconcontainercolor,
//                                                     }}
//                                                 />
//                                             </View>
//                                             <Text
//                                                 style={{
//                                                     fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
//                                                     color: sectionproperties.generaltext_fontColor,
//                                                     textTransform:
//                                                         sectionproperties.generaltext_textTransform == 'Uppercase'
//                                                             ? 'uppercase'
//                                                             : sectionproperties.generaltext_textTransform == 'Capitalize'
//                                                             ? 'capitalize'
//                                                             : 'lowercase',
//                                                     fontFamily:
//                                                         sectionproperties.generaltext_fontWeight == 300
//                                                             ? 'Poppins-Thin'
//                                                             : sectionproperties.generaltext_fontWeight == 400
//                                                             ? 'Poppins-Light'
//                                                             : sectionproperties.generaltext_fontWeight == 500
//                                                             ? 'Poppins-Regular'
//                                                             : sectionproperties.generaltext_fontWeight == 600
//                                                             ? 'Poppins-Medium'
//                                                             : sectionproperties.generaltext_fontWeight == 700
//                                                             ? 'Poppins-Semibold'
//                                                             : 'Poppins-Bold',
//                                                 }}
//                                             >
//                                                 {langdetect == 'en' ? 'Call us' : 'إتصل بنا'}
//                                             </Text>
//                                         </View>
//                                         <MaterialIcons
//                                             name={langdetect == 'en' ? 'keyboard-arrow-right' : 'keyboard-arrow-left'}
//                                             size={20}
//                                             style={{
//                                                 color: sectionproperties.iconcontainercolor,
//                                             }}
//                                         />
//                                     </TouchableOpacity>
//                                 </View>
//                             )}
//                             {sectionproperties.showfooteraddress == 'Show' && <View style={{ width: '100%', height: 1, backgroundColor: '#eee', marginBottom: 10, marginTop: 10 }}></View>}
//                             {sectionproperties.showfooteraddress == 'Show' && fetchAuthorizationQueryContext?.data?.data?.instinfo?.googlemapslink && (
//                                 <View
//                                     style={{
//                                         marginBottom: 10,
//                                         marginTop: 10,
//                                     }}
//                                 >
//                                     <TouchableOpacity
//                                         style={[generalstyles.flexRow]}
//                                         onPress={() => {
//                                             Linking.openURL(fetchAuthorizationQueryContext?.data?.data?.instinfo?.googlemapslink + '');
//                                         }}
//                                     >
//                                         <View style={[generalstyles.flexRow, { flex: 1 }]}>
//                                             <View style={[styles.settingsiconcont]}>
//                                                 <FontAwesome5
//                                                     name="location-arrow"
//                                                     size={15}
//                                                     style={{
//                                                         color: sectionproperties.iconcontainercolor,
//                                                     }}
//                                                 />
//                                             </View>
//                                             <Text
//                                                 style={{
//                                                     fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
//                                                     color: sectionproperties.generaltext_fontColor,
//                                                     textTransform:
//                                                         sectionproperties.generaltext_textTransform == 'Uppercase'
//                                                             ? 'uppercase'
//                                                             : sectionproperties.generaltext_textTransform == 'Capitalize'
//                                                             ? 'capitalize'
//                                                             : 'lowercase',
//                                                     fontFamily:
//                                                         sectionproperties.generaltext_fontWeight == 300
//                                                             ? 'Poppins-Thin'
//                                                             : sectionproperties.generaltext_fontWeight == 400
//                                                             ? 'Poppins-Light'
//                                                             : sectionproperties.generaltext_fontWeight == 500
//                                                             ? 'Poppins-Regular'
//                                                             : sectionproperties.generaltext_fontWeight == 600
//                                                             ? 'Poppins-Medium'
//                                                             : sectionproperties.generaltext_fontWeight == 700
//                                                             ? 'Poppins-Semibold'
//                                                             : 'Poppins-Bold',
//                                                 }}
//                                             >
//                                                 {langdetect == 'en' ? 'Location' : 'الموقع'}
//                                             </Text>
//                                         </View>
//                                         <MaterialIcons
//                                             name={langdetect == 'en' ? 'keyboard-arrow-right' : 'keyboard-arrow-left'}
//                                             size={20}
//                                             style={{
//                                                 color: sectionproperties.iconcontainercolor,
//                                             }}
//                                         />
//                                     </TouchableOpacity>
//                                 </View>
//                             )}
//                         </View>
//                     </View>

//                     {fetchAuthorizationQueryContext?.data?.data?.loggedin && (
//                         <TouchableOpacity
//                             style={[
//                                 generalstyles.allcentered,
//                                 {
//                                     flexDirection: 'row',
//                                     marginTop: 30,
//                                     marginBottom: 10,
//                                     marginLeft: 'auto',
//                                     marginRight: 'auto',
//                                     width: StyleParseToIntFuncContext(
//                                         sectionproperties.generalbtn_width != null && sectionproperties.generalbtn_width != undefined ? sectionproperties.generalbtn_width : 250,
//                                     ),
//                                     height: StyleParseToIntFuncContext(
//                                         sectionproperties.generalbtn_height != null && sectionproperties.generalbtn_height != undefined ? sectionproperties.generalbtn_height : 45,
//                                     ),
//                                     backgroundColor: sectionproperties.generalbtn_bgColor,
//                                     borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertopleftradius, '', true),
//                                     borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertoprightradius, '', true),
//                                     borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomleftradius, '', true),
//                                     borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomrightradius, '', true),
//                                     borderWidth: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderwidth, '', true),
//                                     borderColor: sectionproperties.generalbtn_bordercolor,
//                                 },
//                             ]}
//                             onPress={() => {
//                                 // LogoutMutationContext.mutate();
//                                 logoutfuncContext();
//                             }}
//                         >
//                             <View style={[styles.settingsiconcont]}>
//                                 <AntDesign
//                                     name="logout"
//                                     size={15}
//                                     style={{
//                                         color: sectionproperties.generalbtn_textColor,
//                                     }}
//                                 />
//                             </View>
//                             <Text
//                                 style={{
//                                     fontSize: StyleParseToIntFuncContext(sectionproperties.generalbtn_fontsize),
//                                     color: sectionproperties.generalbtn_textColor,
//                                     textTransform:
//                                         sectionproperties.generalbtn_texttransform == 'Uppercase'
//                                             ? 'uppercase'
//                                             : sectionproperties.generaltext_textTransform == 'Capitalize'
//                                             ? 'capitalize'
//                                             : 'lowercase',
//                                     fontFamily:
//                                         sectionproperties.generalbtn_fontweight == 300
//                                             ? 'Poppins-Thin'
//                                             : sectionproperties.generalbtn_fontweight == 400
//                                             ? 'Poppins-Light'
//                                             : sectionproperties.generalbtn_fontweight == 500
//                                             ? 'Poppins-Regular'
//                                             : sectionproperties.generalbtn_fontweight == 600
//                                             ? 'Poppins-Medium'
//                                             : sectionproperties.generalbtn_fontweight == 700
//                                             ? 'Poppins-Semibold'
//                                             : 'Poppins-Bold',
//                                 }}
//                             >
//                                 {!LogoutMutationContext.isLoading && lang.logout}
//                                 {LogoutMutationContext.isLoading && lang.loading}
//                             </Text>
//                         </TouchableOpacity>
//                     )}
//                     {!fetchAuthorizationQueryContext?.data?.data?.loggedin && (
//                         <View style={[styles.settingscard, generalstyles.allcentered, generalstyles.flexColumn, { backgroundColor: 'transparent', marginTop: 30 }]}>
//                             {sectionproperties.loginbtn_show == 'Show' && (
//                                 <TouchableOpacity
//                                     style={[
//                                         {
//                                             alignItems: 'center',
//                                             justifyContent: 'center',
//                                             backgroundColor: sectionproperties.login_btn_background,
//                                             borderRadius: StyleParseToIntFuncContext(sectionproperties.login_btn_borderBottomLeftRadius, '', true),
//                                             fontSize: StyleParseToIntFuncContext(sectionproperties.login_btn_fontSize),
//                                             width: StyleParseToIntFuncContext(
//                                                 sectionproperties.login_btn_width != null && sectionproperties.login_btn_width != undefined ? sectionproperties.login_btn_width : 300,
//                                             ),
//                                             height: StyleParseToIntFuncContext(
//                                                 sectionproperties.login_btn_height != null && sectionproperties.login_btn_height != undefined ? sectionproperties.login_btn_height : 45,
//                                             ),
//                                             borderWidth: StyleParseToIntFuncContext(sectionproperties.login_btn_borderwidth, '', true),
//                                             borderColor: sectionproperties.login_btn_bordercolor,
//                                         },
//                                     ]}
//                                     onPress={() => {
//                                         routingcountext(StaticPagesLinksContext.Login);
//                                     }}
//                                 >
//                                     <Text
//                                         style={{
//                                             fontFamily:
//                                                 sectionproperties.login_btn_fontweight == 300
//                                                     ? 'Poppins-Thin'
//                                                     : sectionproperties.login_btn_fontweight == 400
//                                                     ? 'Poppins-Light'
//                                                     : sectionproperties.login_btn_fontweight == 500
//                                                     ? 'Poppins-Regular'
//                                                     : sectionproperties.login_btn_fontweight == 600
//                                                     ? 'Poppins-Medium'
//                                                     : sectionproperties.login_btn_fontweight == 700
//                                                     ? 'Poppins-Semibold'
//                                                     : 'Poppins-Bold',
//                                             color: 'white',
//                                             fontSize: StyleParseToIntFuncContext(sectionproperties.login_btn_fontSize),
//                                             textTransform:
//                                                 sectionproperties.login_btn_texttransform == 'Uppercase'
//                                                     ? 'uppercase'
//                                                     : sectionproperties.login_btn_texttransform == 'Capitalize'
//                                                     ? 'capitalize'
//                                                     : 'lowercase',
//                                         }}
//                                     >
//                                         {lang.login}
//                                     </Text>
//                                 </TouchableOpacity>
//                             )}
//                             {sectionproperties.signupbtn_show == 'Show' && (
//                                 <TouchableOpacity
//                                     style={[generalstyles.flexRow, { alignItems: 'center', marginBottom: 10, marginTop: 20 }]}
//                                     onPress={() => {
//                                         routingcountext(StaticPagesLinksContext.Signup);
//                                     }}
//                                 >
//                                     <Text
//                                         style={{
//                                             marginEnd: 5,
//                                             fontFamily:
//                                                 sectionproperties.slideshowText2ContentFontWeight == 300
//                                                     ? 'Poppins-Thin'
//                                                     : sectionproperties.slideshowText2ContentFontWeight == 400
//                                                     ? 'Poppins-Light'
//                                                     : sectionproperties.slideshowText2ContentFontWeight == 500
//                                                     ? 'Poppins-Regular'
//                                                     : sectionproperties.slideshowText2ContentFontWeight == 600
//                                                     ? 'Poppins-Medium'
//                                                     : sectionproperties.slideshowText2ContentFontWeight == 700
//                                                     ? 'Poppins-Semibold'
//                                                     : 'Poppins-Bold',
//                                             color: sectionproperties.slideshowText2ContentColor,
//                                             fontSize: StyleParseToIntFuncContext(sectionproperties.slideshowText2ContentFontSize),
//                                             textTransform:
//                                                 sectionproperties.slideshowText2ContentTextTransform == 'Uppercase'
//                                                     ? 'uppercase'
//                                                     : sectionproperties.slideshowText2ContentTextTransform == 'Capitalize'
//                                                     ? 'capitalize'
//                                                     : sectionproperties.slideshowText2ContentTextTransform == 'none'
//                                                     ? 'none'
//                                                     : 'lowercase',
//                                         }}
//                                     >
//                                         {lang.alreadyhaveanaccount}
//                                     </Text>
//                                     <TouchableOpacity
//                                         style={[{ alignItems: 'center', justifyContent: 'center' }]}
//                                         onPress={() => {
//                                             routingcountext(StaticPagesLinksContext.Signup);
//                                         }}
//                                     >
//                                         <Text
//                                             style={{
//                                                 textDecorationLine: 'underline',
//                                                 fontFamily:
//                                                     sectionproperties.signup_btn_fontweight == 300
//                                                         ? 'Poppins-Thin'
//                                                         : sectionproperties.signup_btn_fontweight == 400
//                                                         ? 'Poppins-Light'
//                                                         : sectionproperties.signup_btn_fontweight == 500
//                                                         ? 'Poppins-Regular'
//                                                         : sectionproperties.signup_btn_fontweight == 600
//                                                         ? 'Poppins-Medium'
//                                                         : sectionproperties.signup_btn_fontweight == 700
//                                                         ? 'Poppins-Semibold'
//                                                         : 'Poppins-Bold',
//                                                 color: sectionproperties.signup_btn_color,
//                                                 fontSize: StyleParseToIntFuncContext(sectionproperties.signup_btn_fontSize),
//                                                 textTransform:
//                                                     sectionproperties.signup_btn_texttransform == 'Uppercase'
//                                                         ? 'uppercase'
//                                                         : sectionproperties.signup_btn_texttransform == 'Capitalize'
//                                                         ? 'capitalize'
//                                                         : sectionproperties.signup_btn_texttransform == 'None'
//                                                         ? 'none'
//                                                         : 'lowercase',
//                                             }}
//                                         >
//                                             {lang.signup}
//                                         </Text>
//                                     </TouchableOpacity>
//                                 </TouchableOpacity>
//                             )}
//                         </View>
//                     )}
//                     <View style={[generalstyles.allcentered, { flexDirection: 'column', marginTop: 5 }]}>
//                         {sectionproperties.showcontactinfo == 'Show' && (
//                             <Text style={[generalstyles.poppinsMedium, { fontSize: StyleParseToIntFuncContext(sectionproperties.contactTitleFontSize), color: sectionproperties.contactTitlteColor }]}>
//                                 {langdetect == 'en' ? sectionproperties.contactTitle_en : sectionproperties.contactTitle_ar}
//                             </Text>
//                         )}
//                         <View style={{ flexDirection: 'row', marginTop: 5 }}>
//                             {sectionproperties.fbbtn_show == 'Show' && fetchAuthorizationQueryContext?.data?.data?.instinfo?.facebooklink != null && (
//                                 <TouchableOpacity
//                                     style={{
//                                         flexDirection: 'row',
//                                         marginTop: 10,
//                                         margin: 10,
//                                         width: 50,
//                                         height: 50,
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'center',
//                                         backgroundColor: sectionproperties.facebkbtnnbgColor,
//                                         borderRadius: StyleParseToIntFuncContext(sectionproperties.facebkbtnn_borderRadius, '', true),
//                                         shadowColor: StyleParseToIntFuncContext(sectionproperties.facebkbtnnborderwidth, '', true) == 0 ? sectionproperties.facebkbtnn_shadowcolor : 'transparent',
//                                         shadowOffset: {
//                                             width: 0,
//                                             height: 3,
//                                         },
//                                         shadowOpacity: 0.1,
//                                         shadowRadius: 3,
//                                         elevation: StyleParseToIntFuncContext(sectionproperties.facebkbtnnborderwidth, '', true) == 0 ? 0 : 1,
//                                         borderWidth: StyleParseToIntFuncContext(sectionproperties.facebkbtnnborderwidth, '', true),
//                                         borderColor: sectionproperties.facebkbtnnbordercolor,
//                                     }}
//                                     onPress={() => {
//                                         Linking.openURL(fetchAuthorizationQueryContext?.data?.data?.instinfo?.facebooklink);
//                                     }}
//                                 >
//                                     <FontAwesome
//                                         name="facebook-f"
//                                         size={StyleParseToIntFuncContext(sectionproperties.facebkbtnniconfontsize)}
//                                         style={{
//                                             color: sectionproperties.facebkbtnnTextcolor,
//                                         }}
//                                     />
//                                 </TouchableOpacity>
//                             )}
//                             {sectionproperties.instbtn_show == 'Show' && fetchAuthorizationQueryContext?.data?.data?.instinfo?.instagramlink != null && (
//                                 <TouchableOpacity
//                                     style={{
//                                         flexDirection: 'row',
//                                         marginTop: 10,
//                                         margin: 10,
//                                         width: 50,
//                                         height: 50,
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'center',
//                                         backgroundColor: sectionproperties.instgrambtnbgColor,
//                                         borderRadius: StyleParseToIntFuncContext(sectionproperties.instgrambtn_borderRadius, '', true),
//                                         shadowColor: StyleParseToIntFuncContext(sectionproperties.instgrambtnborderwidth, '', true) == 0 ? sectionproperties.instbtnn_shadowcolor : 'transparent',
//                                         shadowOffset: {
//                                             width: 0,
//                                             height: 3,
//                                         },
//                                         shadowOpacity: 0.1,
//                                         shadowRadius: 3,
//                                         elevation: StyleParseToIntFuncContext(sectionproperties.instgrambtnborderwidth, '', true) == 0 ? 1 : 0,
//                                         borderWidth: StyleParseToIntFuncContext(sectionproperties.instgrambtnborderwidth, '', true),
//                                         borderColor: sectionproperties.instgrambtnbordercolor,
//                                     }}
//                                     onPress={() => {
//                                         Linking.openURL(fetchAuthorizationQueryContext?.data?.data?.instinfo?.instagramlink);
//                                     }}
//                                 >
//                                     <AntDesign
//                                         name="instagram"
//                                         size={StyleParseToIntFuncContext(sectionproperties.instgrambtniconfontsize)}
//                                         style={{
//                                             color: sectionproperties.instgrambtnTextcolor,
//                                         }}
//                                     />
//                                 </TouchableOpacity>
//                             )}
//                             {sectionproperties.youtbtn_show == 'Show' && fetchAuthorizationQueryContext?.data?.data?.instinfo?.whatsappnumber != null && (
//                                 <TouchableOpacity
//                                     style={{
//                                         flexDirection: 'row',
//                                         marginTop: 10,
//                                         margin: 10,
//                                         width: 50,
//                                         height: 50,
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'center',
//                                         backgroundColor: sectionproperties.youtubebtnbgColor,
//                                         borderRadius: StyleParseToIntFuncContext(sectionproperties.youtubebtn_borderRadius, '', true),
//                                         shadowColor: StyleParseToIntFuncContext(sectionproperties.youtubebtnborderwidth, '', true) == 0 ? sectionproperties.youtubebtn_shadowcolor : 'transparent',
//                                         shadowOffset: {
//                                             width: 0,
//                                             height: 3,
//                                         },
//                                         shadowOpacity: 0.1,
//                                         shadowRadius: 3,
//                                         elevation: StyleParseToIntFuncContext(sectionproperties.youtubebtnborderwidth, '', true) == 0 ? 1 : 0,
//                                         borderWidth: StyleParseToIntFuncContext(sectionproperties.youtubebtnborderwidth, '', true),
//                                         borderColor: sectionproperties.youtubebtnbordercolor,
//                                     }}
//                                     onPress={() => {
//                                         Linking.openURL('whatsapp://send?text=&phone=' + fetchAuthorizationQueryContext?.data?.data?.instinfo?.whatsappnumber);
//                                     }}
//                                 >
//                                     <FontAwesome
//                                         name="whatsapp"
//                                         size={StyleParseToIntFuncContext(sectionproperties.youtubebtniconfontsize)}
//                                         style={{
//                                             color: sectionproperties.youtubebtnTextcolor,
//                                         }}
//                                     />
//                                 </TouchableOpacity>
//                             )}
//                             {fetchAuthorizationQueryContext?.data?.data?.instinfo?.youtubelink != null && (
//                                 <TouchableOpacity
//                                     style={{
//                                         flexDirection: 'row',
//                                         marginTop: 10,
//                                         margin: 10,
//                                         width: 50,
//                                         height: 50,
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'center',
//                                         backgroundColor: sectionproperties.youtubebtnbgColor,
//                                         borderRadius: StyleParseToIntFuncContext(sectionproperties.youtubebtn_borderRadius, '', true),
//                                         shadowColor: StyleParseToIntFuncContext(sectionproperties.youtubebtnborderwidth, '', true) == 0 ? sectionproperties.youtubebtn_shadowcolor : 'transparent',
//                                         shadowOffset: {
//                                             width: 0,
//                                             height: 3,
//                                         },
//                                         shadowOpacity: 0.1,
//                                         shadowRadius: 3,
//                                         elevation: StyleParseToIntFuncContext(sectionproperties.youtubebtnborderwidth, '', true) == 0 ? 1 : 0,
//                                         borderWidth: StyleParseToIntFuncContext(sectionproperties.youtubebtnborderwidth, '', true),
//                                         borderColor: sectionproperties.youtubebtnbordercolor,
//                                     }}
//                                     onPress={() => {
//                                         Linking.openURL(fetchAuthorizationQueryContext?.data?.data?.instinfo?.youtubelink);
//                                     }}
//                                 >
//                                     <AntDesign
//                                         name="youtube"
//                                         size={StyleParseToIntFuncContext(sectionproperties.youtubebtniconfontsize)}
//                                         style={{
//                                             color: sectionproperties.youtubebtnTextcolor,
//                                         }}
//                                     />
//                                 </TouchableOpacity>
//                             )}
//                             {fetchAuthorizationQueryContext?.data?.data?.instinfo?.tiktoklink != null && (
//                                 <TouchableOpacity
//                                     style={{
//                                         flexDirection: 'row',
//                                         marginTop: 10,
//                                         margin: 10,
//                                         width: 50,
//                                         height: 50,
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'center',
//                                         backgroundColor: sectionproperties.youtubebtnbgColor,
//                                         borderRadius: StyleParseToIntFuncContext(sectionproperties.youtubebtn_borderRadius, '', true),
//                                         shadowColor: StyleParseToIntFuncContext(sectionproperties.youtubebtnborderwidth, '', true) == 0 ? sectionproperties.youtubebtn_shadowcolor : 'transparent',
//                                         shadowOffset: {
//                                             width: 0,
//                                             height: 3,
//                                         },
//                                         shadowOpacity: 0.1,
//                                         shadowRadius: 3,
//                                         elevation: StyleParseToIntFuncContext(sectionproperties.youtubebtnborderwidth, '', true) == 0 ? 1 : 0,
//                                         borderWidth: StyleParseToIntFuncContext(sectionproperties.youtubebtnborderwidth, '', true),
//                                         borderColor: sectionproperties.youtubebtnbordercolor,
//                                     }}
//                                     onPress={() => {
//                                         Linking.openURL(fetchAuthorizationQueryContext?.data?.data?.instinfo?.tiktoklink);
//                                     }}
//                                 >
//                                     <FontAwesome5
//                                         name="tiktok"
//                                         size={StyleParseToIntFuncContext(sectionproperties.youtubebtniconfontsize)}
//                                         style={{
//                                             color: sectionproperties.youtubebtnTextcolor,
//                                         }}
//                                     />
//                                 </TouchableOpacity>
//                             )}
//                             {sectionproperties.showtelegrambtn == 'Show' && fetchAuthorizationQueryContext?.data?.data?.instinfo?.telegramlink != null && (
//                                 <TouchableOpacity
//                                     style={{
//                                         flexDirection: 'row',
//                                         marginTop: 10,
//                                         margin: 10,
//                                         width: 50,
//                                         height: 50,
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'center',
//                                         backgroundColor: sectionproperties.facebkbtnnbgColor,
//                                         borderRadius: StyleParseToIntFuncContext(sectionproperties.facebkbtnn_borderRadius, '', true),
//                                         shadowColor: StyleParseToIntFuncContext(sectionproperties.facebkbtnnborderwidth, '', true) == 0 ? sectionproperties.facebkbtnn_shadowcolor : 'transparent',
//                                         shadowOffset: {
//                                             width: 0,
//                                             height: 3,
//                                         },
//                                         shadowOpacity: 0.1,
//                                         shadowRadius: 3,
//                                         elevation: StyleParseToIntFuncContext(sectionproperties.facebkbtnnborderwidth, '', true) == 0 ? 0 : 1,
//                                         borderWidth: StyleParseToIntFuncContext(sectionproperties.facebkbtnnborderwidth, '', true),
//                                         borderColor: sectionproperties.facebkbtnnbordercolor,
//                                     }}
//                                     onPress={() => {
//                                         Linking.openURL(fetchAuthorizationQueryContext?.data?.data?.instinfo?.telegramlink);
//                                     }}
//                                 >
//                                     <EvilIcons
//                                         name="sc-telegram"
//                                         size={StyleParseToIntFuncContext(sectionproperties.telegramfontsize)}
//                                         style={{
//                                             color: sectionproperties.facebkbtnnTextcolor,
//                                         }}
//                                     />
//                                 </TouchableOpacity>
//                             )}
//                         </View>
//                     </View>
//                     {/* <Text>{currentOTAversion}</Text> */}
//                 </View>
//             )}
//         </View>
//     );
// };
// const styles = StyleSheet.create({
//     settingscard: {
//         padding: 10,
//         paddingLeft: 20,
//         paddingRight: 20,
//     },
//     settingsiconcont: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginEnd: 10,
//     },
//     titlecont: {
//         paddingStart: 20,
//         paddingEnd: 20,
//         width: '100%',
//         marginBottom: 10,
//         textAlign: 'left',
//     },
// });

// export default AppMenu;

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, TextInput, Linking, I18nManager, Modal } from 'react-native';
import { icons, SIZES, COLORS, images } from '../../GeneralFiles/constants';
import Feather from 'react-native-vector-icons/Feather';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { MaterialIcons, FontAwesome, FontAwesome5, EvilIcons, Ionicons } from '@expo/vector-icons';
// import { Restart } from 'fiction-expo-restart';
import { SwipeablePanel } from 'rn-swipeable-panel';
import ModalSelector from 'react-native-modal-selector';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { currentOTAversion } from '../../../../Env_Variables';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Updates from 'expo-updates';
import Notifications from './Notifications';
const AppMenu = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const { lang, langdetect, setlang } = useContext(LanguageContext);
    const { ProjectOpenrcTypeContext, StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const {
        logoutfuncContext,
        fetchorderhistoryQueryContext,
        fetchAuthorizationQueryContext,
        LogoutMutationContext,
        FetchQueriesEngineContext,
        setFetchQueriesEngineContext,
        fetchFavoriteProductsQueryContext,
        setcurrencyfunccontext,
        templateproperties_context,
    } = useContext(FetchingContext);
    const [shownotificationsmodal, setshownotificationsmodal] = useState(false);
    const { routingcountext, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [swipeablePanelActive, setswipeablePanelActive] = useState(false);
    const [StatePageProperties, setStatePageProperties] = useState({});
    useEffect(() => {
        StatePageProperties11.pages.forEach(function (item, index) {
            if (CurrentPageIdContext == item.pageid) {
                setStatePageProperties(item.pageobj);
            }
        });
    }, [StatePageProperties11]);
    useEffect(() => {
        var secpropobj = {};

        if (StatePageProperties.pageobj != undefined && StatePageProperties.pageobj.pageproperties != undefined) {
            StatePageProperties.pageobj.pageproperties.forEach(function (sectionitem, sectionindex) {
                secpropobj[sectionitem.property_css_name] = sectionitem.property_value;
            });
        }
        setsectionproperties({ ...secpropobj });
    }, [StatePageProperties]);

    const changelang = async (lang) => {
        await AsyncStorage.setItem('lang', lang);
        if (lang == 'ar') {
            I18nManager.allowRTL(true);
            I18nManager.forceRTL(true);
            // setlangdetect('ar');
        } else {
            I18nManager.allowRTL(false);
            I18nManager.forceRTL(false);
            // setlangdetect('en');
        }
        // setlang(lang);
        // setswipeablePanelActive(false);
        // Restart();
        // Updates.reloadAsync();
        await Updates.reloadAsync();
    };
    const openlangPanel = () => {
        setswipeablePanelActive(true);
    };
    const closePanel = () => {
        setswipeablePanelActive(false);
    };
    useEffect(() => {
        if (fetchAuthorizationQueryContext.isSuccess) {
            if (fetchAuthorizationQueryContext?.data?.data?.loggedin == true) {
                var tempFetchQueriesEngineContext = { ...FetchQueriesEngineContext };
                tempFetchQueriesEngineContext.orderhistory = true;
                tempFetchQueriesEngineContext.fetchfavoriteproducts = true;
                setFetchQueriesEngineContext({ ...tempFetchQueriesEngineContext });
            } else {
                // routingcountext('');
            }
        }
    }, [fetchAuthorizationQueryContext.isSuccess, fetchAuthorizationQueryContext.data]);

    useEffect(() => {
        var tempFetchQueriesEngineContext = { ...FetchQueriesEngineContext };
        tempFetchQueriesEngineContext.fetchfavoriteproducts = true;
        setFetchQueriesEngineContext({ ...tempFetchQueriesEngineContext });
    }, []);

    return (
        <View style={{ height: SIZES.height }}>
            {Object.keys(sectionproperties).length != 0 && (
                <View
                    style={[
                        generalstyles.container,
                        {
                            width: '100%',
                            flexDirection: 'column',
                            display: 'flex',
                            alignItems: 'center',
                            paddingLeft: 0,
                            paddingRight: 0,
                            paddingTop: StyleParseToIntFuncContext(sectionproperties.marginTop != null && sectionproperties.marginTop != undefined ? sectionproperties.marginTop : 0),
                            backgroundColor: templateproperties_context.template_backgroundcolor == null ? '#f8f8f9' : templateproperties_context.template_backgroundcolor,
                        },
                    ]}
                >
                    {/* Is subscribed property */}

                    {/* <Text>asd{fetchAuthorizationQueryContext?.data?.data?.customerinfo?.subscriptionuser?.isusersubscribed?.toString()}</Text> */}
                    {sectionproperties.showsection == 'Show' && fetchAuthorizationQueryContext?.data?.data?.loggedin && (
                        <View
                            style={{
                                width: '100%',
                            }}
                        >
                            <View
                                style={[
                                    styles.settingscard,
                                    {
                                        width: '100%',
                                        marginBottom: 10,
                                        paddingTop: 15,
                                        paddingBottom: 15,
                                        backgroundColor: sectionproperties.userinfo_sectionbgcolor,
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.userinfo_borderradius, '', true),
                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.userinfo_borderwidth, '', true),
                                        borderColor: sectionproperties.usserinfo_sectionbordercolor,
                                    },
                                ]}
                            >
                                <View style={[generalstyles.flexRow, { display: 'flex', alignItems: 'center', marginBottom: 5 }]}>
                                    <Text
                                        style={[
                                            generalstyles.poppinsMedium,
                                            generalstyles.textcapitalize,
                                            {
                                                display: 'flex',
                                                alignItems: 'center',
                                                color: sectionproperties.text_secondarycolor,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.userinfo_titlefontsize),
                                                marginEnd: 5,
                                                fontFamily:
                                                    sectionproperties.userinfo_titlefontweight == 300
                                                        ? 'Poppins-Thin'
                                                        : sectionproperties.userinfo_titlefontweight == 400
                                                        ? 'Poppins-Light'
                                                        : sectionproperties.userinfo_titlefontweight == 500
                                                        ? 'Poppins-Regular'
                                                        : sectionproperties.userinfo_titlefontweight == 600
                                                        ? 'Poppins-Medium'
                                                        : sectionproperties.userinfo_titlefontweight == 700
                                                        ? 'Poppins-Semibold'
                                                        : 'Poppins-Bold',
                                            },
                                        ]}
                                    >
                                        {lang.hello},{' '}
                                        {fetchAuthorizationQueryContext?.data?.data?.loggedin && (
                                            <Text
                                                style={[
                                                    {
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.userinfo_titlefontsize),
                                                        color: sectionproperties.userinfo_color,
                                                        fontFamily:
                                                            sectionproperties.userinfo_titlefontweight == 300
                                                                ? 'Poppins-Thin'
                                                                : sectionproperties.userinfo_titlefontweight == 400
                                                                ? 'Poppins-Light'
                                                                : sectionproperties.userinfo_titlefontweight == 500
                                                                ? 'Poppins-Regular'
                                                                : sectionproperties.userinfo_titlefontweight == 600
                                                                ? 'Poppins-Medium'
                                                                : sectionproperties.userinfo_titlefontweight == 700
                                                                ? 'Poppins-Semibold'
                                                                : 'Poppins-Bold',
                                                    },
                                                ]}
                                            >
                                                {fetchAuthorizationQueryContext?.data?.data?.customerinfo?.name}
                                            </Text>
                                        )}
                                    </Text>
                                    <View style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={icons.handwave} style={{ width: '100%', height: '100%' }} />
                                    </View>
                                </View>
                                {fetchAuthorizationQueryContext?.data?.data?.customerinfo != undefined && (
                                    <View style={[generalstyles.flexColumn]}>
                                        <Text
                                            style={{
                                                textAlign: 'left',
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.userinfo_fontsize),
                                                color: sectionproperties.userinfo_color,
                                                fontFamily:
                                                    sectionproperties.userinfo_fontweight == 300
                                                        ? 'Poppins-Thin'
                                                        : sectionproperties.userinfo_fontweight == 400
                                                        ? 'Poppins-Light'
                                                        : sectionproperties.userinfo_fontweight == 500
                                                        ? 'Poppins-Regular'
                                                        : sectionproperties.userinfo_fontweight == 600
                                                        ? 'Poppins-Medium'
                                                        : sectionproperties.userinfo_fontweight == 700
                                                        ? 'Poppins-Semibold'
                                                        : 'Poppins-Bold',
                                            }}
                                        >
                                            {fetchAuthorizationQueryContext?.data?.data?.customerinfo?.email}
                                        </Text>
                                        {sectionproperties.showsubscription == 'Show' && (
                                            <Text
                                                style={{
                                                    textAlign: 'left',
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.userinfo_fontsize),
                                                    color: sectionproperties.userinfo_color,
                                                    fontFamily:
                                                        sectionproperties.userinfo_fontweight == 300
                                                            ? 'Poppins-Thin'
                                                            : sectionproperties.userinfo_fontweight == 400
                                                            ? 'Poppins-Light'
                                                            : sectionproperties.userinfo_fontweight == 500
                                                            ? 'Poppins-Regular'
                                                            : sectionproperties.userinfo_fontweight == 600
                                                            ? 'Poppins-Medium'
                                                            : sectionproperties.userinfo_fontweight == 700
                                                            ? 'Poppins-Semibold'
                                                            : 'Poppins-Bold',
                                                }}
                                            >
                                                {langdetect == 'en' ? 'Subscribed in' : 'مشترك فى'}:{fetchAuthorizationQueryContext?.data?.data?.customerinfo?.subscription_name}
                                            </Text>
                                        )}
                                        {sectionproperties.showsubscription == 'Show' && (
                                            <Text
                                                style={{
                                                    textAlign: 'left',
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.userinfo_fontsize),
                                                    color: sectionproperties.userinfo_color,
                                                    fontFamily:
                                                        sectionproperties.userinfo_fontweight == 300
                                                            ? 'Poppins-Thin'
                                                            : sectionproperties.userinfo_fontweight == 400
                                                            ? 'Poppins-Light'
                                                            : sectionproperties.userinfo_fontweight == 500
                                                            ? 'Poppins-Regular'
                                                            : sectionproperties.userinfo_fontweight == 600
                                                            ? 'Poppins-Medium'
                                                            : sectionproperties.userinfo_fontweight == 700
                                                            ? 'Poppins-Semibold'
                                                            : 'Poppins-Bold',
                                                }}
                                            >
                                                {langdetect == 'en' ? 'Expires at' : 'ينتهى فى'}: {fetchAuthorizationQueryContext?.data?.data?.customerinfo?.subscrption_enddate}
                                            </Text>
                                        )}
                                    </View>
                                )}
                                {fetchAuthorizationQueryContext?.data?.data?.customerinfo != undefined &&
                                    fetchAuthorizationQueryContext?.data?.data?.customerinfo?.cancustomerviewwallet == 1 &&
                                    templateproperties_context.showwallet == 'Show' && (
                                        <View style={[generalstyles.flexRow, { width: '100%', marginTop: 5 }]}>
                                            <Ionicons name="wallet-outline" size={20} style={{ marginEnd: 5 }} />
                                            <Text
                                                style={{
                                                    color: templateproperties_context.walletcolor,
                                                    fontSize: StyleParseToIntFuncContext(templateproperties_context.walletfontize),
                                                    fontFamily: 'Poppins-Light',
                                                }}
                                            >
                                                {langdetect == 'en' ? templateproperties_context.walletcontent_en : templateproperties_context.walletcontent_ar}
                                            </Text>
                                            <Text
                                                style={{
                                                    color: templateproperties_context.walletsecondarycolor,
                                                    fontSize: 15,
                                                    fontFamily: 'Poppins-Medium',
                                                }}
                                            >
                                                {fetchAuthorizationQueryContext?.data?.data?.customerinfo?.walletpoints}{' '}
                                            </Text>
                                        </View>
                                    )}
                            </View>
                        </View>
                    )}

                    <View style={[styles.titlecont, { marginTop: 5 }]}>
                        <Text
                            style={{
                                textAlign: 'left',
                                fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
                                color: sectionproperties.sectionTitleColor,
                                textTransform:
                                    sectionproperties.sectionTitleTextTransform == 'Uppercase'
                                        ? 'uppercase'
                                        : sectionproperties.sectionTitleTextTransform == 'Capitalize' || sectionproperties.sectionTitleTextTransform == 'capitalize'
                                        ? 'capitalize'
                                        : sectionproperties.sectionTitleTextTransform == 'None' || sectionproperties.sectionTitleTextTransform == 'none'
                                        ? 'none'
                                        : 'lowercase',
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
                            }}
                        >
                            {lang.myaccount}
                        </Text>
                    </View>

                    <View
                        style={{
                            width: '100%',
                        }}
                    >
                        <View
                            style={[
                                styles.settingscard,
                                {
                                    marginBottom: 10,
                                    backgroundColor: sectionproperties.backgroundColor,
                                },
                            ]}
                        >
                            {sectionproperties.shownotifications == 'Show' && fetchAuthorizationQueryContext?.data?.data?.loggedin && (
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}
                                    onPress={() => {
                                        setshownotificationsmodal(true);
                                    }}
                                >
                                    <View style={[styles.settingsiconcont]}>
                                        <AntDesign
                                            name="notification"
                                            size={16}
                                            style={{
                                                color: sectionproperties.iconcontainercolor,
                                            }}
                                        />
                                    </View>
                                    <Text
                                        style={{
                                            textAlign: 'left',
                                            flex: 1,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                            color: sectionproperties.generaltext_fontColor,
                                            textTransform:
                                                sectionproperties.generaltext_textTransform == 'Uppercase'
                                                    ? 'uppercase'
                                                    : sectionproperties.generaltext_textTransform == 'Capitalize'
                                                    ? 'capitalize'
                                                    : 'lowercase',
                                            fontFamily:
                                                sectionproperties.generaltext_fontWeight == 300
                                                    ? 'Poppins-Thin'
                                                    : sectionproperties.generaltext_fontWeight == 400
                                                    ? 'Poppins-Light'
                                                    : sectionproperties.generaltext_fontWeight == 500
                                                    ? 'Poppins-Regular'
                                                    : sectionproperties.generaltext_fontWeight == 600
                                                    ? 'Poppins-Medium'
                                                    : sectionproperties.generaltext_fontWeight == 700
                                                    ? 'Poppins-Semibold'
                                                    : 'Poppins-Bold',
                                        }}
                                    >
                                        {langdetect == 'en' ? sectionproperties.notificationtitle_en : sectionproperties.notificationtitle_ar}
                                    </Text>
                                    <MaterialIcons
                                        name={langdetect == 'en' ? 'keyboard-arrow-right' : 'keyboard-arrow-left'}
                                        size={20}
                                        style={{
                                            color: sectionproperties.iconcontainercolor,
                                        }}
                                    />
                                </TouchableOpacity>
                            )}
                            {sectionproperties.shownotifications == 'Show' && fetchAuthorizationQueryContext?.data?.data?.loggedin && (
                                <View style={{ width: '100%', height: 1, backgroundColor: sectionproperties.upperseparatorsecondarybgcolor, marginBottom: 10, marginTop: 10 }}></View>
                            )}
                            {fetchAuthorizationQueryContext?.data?.data?.loggedin && (
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}
                                    onPress={() => {
                                        routingcountext(StaticPagesLinksContext.accountinfo);
                                    }}
                                >
                                    <View style={[styles.settingsiconcont]}>
                                        <AntDesign
                                            name="user"
                                            size={16}
                                            style={{
                                                color: sectionproperties.iconcontainercolor,
                                            }}
                                        />
                                    </View>
                                    <Text
                                        style={{
                                            textAlign: 'left',
                                            flex: 1,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                            color: sectionproperties.generaltext_fontColor,
                                            textTransform:
                                                sectionproperties.generaltext_textTransform == 'Uppercase'
                                                    ? 'uppercase'
                                                    : sectionproperties.generaltext_textTransform == 'Capitalize'
                                                    ? 'capitalize'
                                                    : 'lowercase',
                                            fontFamily:
                                                sectionproperties.generaltext_fontWeight == 300
                                                    ? 'Poppins-Thin'
                                                    : sectionproperties.generaltext_fontWeight == 400
                                                    ? 'Poppins-Light'
                                                    : sectionproperties.generaltext_fontWeight == 500
                                                    ? 'Poppins-Regular'
                                                    : sectionproperties.generaltext_fontWeight == 600
                                                    ? 'Poppins-Medium'
                                                    : sectionproperties.generaltext_fontWeight == 700
                                                    ? 'Poppins-Semibold'
                                                    : 'Poppins-Bold',
                                        }}
                                    >
                                        {lang.userprofile}
                                    </Text>
                                    <MaterialIcons
                                        name={langdetect == 'en' ? 'keyboard-arrow-right' : 'keyboard-arrow-left'}
                                        size={20}
                                        style={{
                                            color: sectionproperties.iconcontainercolor,
                                        }}
                                    />
                                </TouchableOpacity>
                            )}
                            {fetchAuthorizationQueryContext?.data?.data?.loggedin && (
                                <View style={{ width: '100%', height: 1, backgroundColor: sectionproperties.upperseparatorsecondarybgcolor, marginBottom: 10, marginTop: 10 }}></View>
                            )}

                            <TouchableOpacity
                                style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}
                                onPress={() => {
                                    routingcountext(StaticPagesLinksContext.Wishlist);
                                }}
                            >
                                <View style={[styles.settingsiconcont]}>
                                    {sectionproperties.faviconshape == 'Heart Shape' && (
                                        <AntDesign
                                            name="hearto"
                                            size={15}
                                            style={{
                                                color: sectionproperties.iconcontainercolor,
                                                // opacity: sectionproperties.icon_opacity,
                                            }}
                                        />
                                    )}
                                    {sectionproperties.faviconshape == 'Star Shape' && (
                                        <AntDesign
                                            name="staro"
                                            size={15}
                                            style={{
                                                color: sectionproperties.iconcontainercolor,
                                                // opacity: sectionproperties.icon_opacity,
                                            }}
                                        />
                                    )}
                                    {sectionproperties.faviconshape == 'Bookmark' && (
                                        <Feather
                                            name="bookmark"
                                            size={15}
                                            style={{
                                                color: sectionproperties.iconcontainercolor,
                                                // opacity: sectionproperties.icon_opacity,
                                            }}
                                        />
                                    )}
                                </View>
                                <Text
                                    style={{
                                        flex: 1,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                        color: sectionproperties.generaltext_fontColor,
                                        textTransform:
                                            sectionproperties.generaltext_textTransform == 'Uppercase'
                                                ? 'uppercase'
                                                : sectionproperties.generaltext_textTransform == 'Capitalize'
                                                ? 'capitalize'
                                                : 'lowercase',
                                        fontFamily:
                                            sectionproperties.generaltext_fontWeight == 300
                                                ? 'Poppins-Thin'
                                                : sectionproperties.generaltext_fontWeight == 400
                                                ? 'Poppins-Light'
                                                : sectionproperties.generaltext_fontWeight == 500
                                                ? 'Poppins-Regular'
                                                : sectionproperties.generaltext_fontWeight == 600
                                                ? 'Poppins-Medium'
                                                : sectionproperties.generaltext_fontWeight == 700
                                                ? 'Poppins-Semibold'
                                                : 'Poppins-Bold',
                                        textAlign: 'left',
                                    }}
                                >
                                    {langdetect == 'en' ? sectionproperties.wishlisttitle_en : sectionproperties.wishlisttitle_ar}
                                    {/* {lang.mywishlist} */}
                                </Text>
                                {!fetchFavoriteProductsQueryContext.isFetching && fetchFavoriteProductsQueryContext.isSuccess && (
                                    <View
                                        style={{
                                            marginTop: 'auto',
                                            marginBottom: 'auto',
                                            width: 20,
                                            height: 20,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: sectionproperties.badge_bgcolor,
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.badge_borderradius, '', true),
                                        }}
                                    >
                                        <Text
                                            style={{
                                                textTransform: 'capitalize',
                                                fontFamily: 'Poppins-Medium',
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.badge_fontsize),
                                                color: sectionproperties.badge_color,
                                                paddingStart: Platform.OS == 'ios' ? (langdetect == 'en' ? 1 : 0) : 0,
                                                paddingEnd: Platform.OS == 'ios' ? (langdetect == 'en' ? 0 : 1) : 0,
                                            }}
                                        >
                                            {fetchFavoriteProductsQueryContext?.data?.data?.products.length == 0 ? 0 : fetchFavoriteProductsQueryContext?.data?.data?.products?.length}
                                        </Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                            {sectionproperties.showprevorder == 'Show' && fetchAuthorizationQueryContext?.data?.data?.loggedin && (
                                <View style={{ width: '100%', height: 1, backgroundColor: sectionproperties.upperseparatorsecondarybgcolor, marginBottom: 10, marginTop: 10 }}></View>
                            )}

                            {sectionproperties.showprevorder == 'Show' && fetchAuthorizationQueryContext?.data?.data?.loggedin && (
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}
                                    onPress={() => {
                                        routingcountext(StaticPagesLinksContext.Ordershistory);
                                    }}
                                >
                                    <View style={[styles.settingsiconcont]}>
                                        <MaterialCommunityIcons
                                            name="history"
                                            size={17}
                                            style={{
                                                color: sectionproperties.iconcontainercolor,
                                                // opacity: sectionproperties.icon_opacity,
                                            }}
                                        />
                                    </View>
                                    <Text
                                        style={{
                                            flex: 1,
                                            textAlign: 'left',
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                            color: sectionproperties.generaltext_fontColor,
                                            textTransform:
                                                sectionproperties.generaltext_textTransform == 'Uppercase'
                                                    ? 'uppercase'
                                                    : sectionproperties.generaltext_textTransform == 'Capitalize'
                                                    ? 'capitalize'
                                                    : 'lowercase',
                                            fontFamily:
                                                sectionproperties.generaltext_fontWeight == 300
                                                    ? 'Poppins-Thin'
                                                    : sectionproperties.generaltext_fontWeight == 400
                                                    ? 'Poppins-Light'
                                                    : sectionproperties.generaltext_fontWeight == 500
                                                    ? 'Poppins-Regular'
                                                    : sectionproperties.generaltext_fontWeight == 600
                                                    ? 'Poppins-Medium'
                                                    : sectionproperties.generaltext_fontWeight == 700
                                                    ? 'Poppins-Semibold'
                                                    : 'Poppins-Bold',
                                        }}
                                    >
                                        {langdetect == 'en' ? sectionproperties.previousorders_titleen : sectionproperties.previousorders_titlear}
                                        {/* {lang.previousorders} */}
                                    </Text>
                                    {!fetchorderhistoryQueryContext.isFetching && fetchorderhistoryQueryContext.isSuccess && (
                                        <View
                                            style={{
                                                marginTop: 'auto',
                                                marginBottom: 'auto',
                                                width: 20,
                                                height: 20,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: sectionproperties.badge_bgcolor,
                                                borderRadius: StyleParseToIntFuncContext(sectionproperties.badge_borderradius, '', true),
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    paddingTop: Platform.OS == 'ios' ? 0 : 1,
                                                    paddingStart: Platform.OS == 'ios' ? (langdetect == 'en' ? 1 : 0) : 0,
                                                    paddingEnd: Platform.OS == 'ios' ? (langdetect == 'en' ? 0 : 1) : 0,
                                                    fontFamily: 'Poppins-Medium',
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.badge_fontsize),
                                                    color: sectionproperties.badge_color,
                                                }}
                                            >
                                                {fetchorderhistoryQueryContext?.data?.data?.ordershistory?.length}
                                            </Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    <View style={[styles.titlecont, { marginTop: fetchAuthorizationQueryContext?.data?.data?.loggedin == true ? 5 : 10 }]}>
                        <Text
                            style={{
                                textAlign: 'left',
                                fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
                                color: sectionproperties.sectionTitleColor,
                                textTransform:
                                    sectionproperties.sectionTitleTextTransform == 'Uppercase'
                                        ? 'uppercase'
                                        : sectionproperties.sectionTitleTextTransform == 'Capitalize' || sectionproperties.sectionTitleTextTransform == 'capitalize'
                                        ? 'capitalize'
                                        : 'lowercase',
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
                            }}
                        >
                            {lang.settings}
                        </Text>
                    </View>
                    <View
                        style={{
                            width: '100%',
                        }}
                    >
                        <View
                            style={[
                                styles.settingscard,
                                {
                                    marginBottom: 10,
                                    backgroundColor: sectionproperties.backgroundColor,
                                },
                            ]}
                        >
                            <View
                                style={{
                                    marginBottom: 10,
                                    marginTop: 10,
                                }}
                            >
                                <ModalSelector
                                    data={[
                                        { label: 'English', key: 'en' },
                                        { label: 'لغة عربية', key: 'ar' },
                                    ]}
                                    initValue="Select"
                                    supportedOrientations={['portrait']}
                                    accessible={true}
                                    scrollViewAccessibilityLabel={'Scrollable options'}
                                    cancelButtonAccessibilityLabel={'Cancel Button'}
                                    onChange={(event) => {
                                        changelang(event.key);
                                    }}
                                    optionTextStyle={{
                                        color: 'black',
                                        fontFamily: 'Poppins-Medium',
                                        textTransform: 'capitalize',
                                    }}
                                    selectTextStyle={{
                                        color: 'orange',
                                        fontFamily: 'Poppins-Medium',
                                        textTransform: 'capitalize',
                                    }}
                                    cancelTextStyle={{
                                        color: 'black',
                                        fontFamily: 'Poppins-Medium',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    <View style={[generalstyles.flexRow]}>
                                        <View style={[generalstyles.flexRow, { flex: 1 }]}>
                                            <View style={[styles.settingsiconcont]}>
                                                <Feather
                                                    name="globe"
                                                    size={15}
                                                    style={{
                                                        color: sectionproperties.iconcontainercolor,
                                                    }}
                                                />
                                            </View>
                                            <TextInput
                                                style={{
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                                    color: sectionproperties.generaltext_fontColor,
                                                    textTransform:
                                                        sectionproperties.generaltext_textTransform == 'Uppercase'
                                                            ? 'uppercase'
                                                            : sectionproperties.generaltext_textTransform == 'Capitalize'
                                                            ? 'capitalize'
                                                            : 'lowercase',
                                                    fontFamily:
                                                        sectionproperties.generaltext_fontWeight == 300
                                                            ? 'Poppins-Thin'
                                                            : sectionproperties.generaltext_fontWeight == 400
                                                            ? 'Poppins-Light'
                                                            : sectionproperties.generaltext_fontWeight == 500
                                                            ? 'Poppins-Regular'
                                                            : sectionproperties.generaltext_fontWeight == 600
                                                            ? 'Poppins-Medium'
                                                            : sectionproperties.generaltext_fontWeight == 700
                                                            ? 'Poppins-Semibold'
                                                            : 'Poppins-Bold',
                                                }}
                                                editable={false}
                                                value={lang.language}
                                                // placeholder="Language"
                                            />
                                        </View>
                                        <Feather
                                            name="globe"
                                            size={20}
                                            style={{
                                                color: sectionproperties.iconcontainercolor,
                                            }}
                                        />
                                    </View>
                                </ModalSelector>
                            </View>
                            {sectionproperties.showcurrencies == 'Show' && (
                                <View style={{ width: '100%', height: 1, backgroundColor: sectionproperties.upperseparatorsecondarybgcolor, marginBottom: 10, marginTop: 10 }}></View>
                            )}
                            {fetchAuthorizationQueryContext != undefined &&
                                fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcurrencies?.length > 1 &&
                                sectionproperties.showcurrencies == 'Show' && (
                                    <View style={{ marginVertical: 10 }}>
                                        <ModalSelector
                                            data={fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcurrencies}
                                            initValue="Select"
                                            supportedOrientations={['portrait']}
                                            accessible={true}
                                            scrollViewAccessibilityLabel={'Scrollable options'}
                                            cancelButtonAccessibilityLabel={'Cancel Button'}
                                            keyExtractor={(item) => item.currencyid}
                                            labelExtractor={(item) => (langdetect == 'en' ? item.currencyname_en : item.currencyname_ar)}
                                            onChange={(item) => {
                                                setcurrencyfunccontext(item);
                                            }}
                                            optionTextStyle={{
                                                color: 'black',
                                                fontFamily: 'Poppins-Medium',
                                                textTransform: 'capitalize',
                                            }}
                                            selectTextStyle={{
                                                color: 'orange',
                                                fontFamily: 'Poppins-Medium',
                                                textTransform: 'capitalize',
                                            }}
                                            cancelTextStyle={{
                                                color: 'black',
                                                fontFamily: 'Poppins-Medium',
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            <View style={[generalstyles.flexRow]}>
                                                <View style={[generalstyles.flexRow, { flex: 1 }]}>
                                                    <View style={[styles.settingsiconcont]}>
                                                        <FontAwesome5
                                                            name="money-bill-wave"
                                                            size={15}
                                                            style={{
                                                                color: sectionproperties.iconcontainercolor,
                                                            }}
                                                        />
                                                    </View>
                                                    <TextInput
                                                        style={{
                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                                            color: sectionproperties.generaltext_fontColor,
                                                            textTransform:
                                                                sectionproperties.generaltext_textTransform == 'Uppercase'
                                                                    ? 'uppercase'
                                                                    : sectionproperties.generaltext_textTransform == 'Capitalize'
                                                                    ? 'capitalize'
                                                                    : 'lowercase',
                                                            fontFamily:
                                                                sectionproperties.generaltext_fontWeight == 300
                                                                    ? 'Poppins-Thin'
                                                                    : sectionproperties.generaltext_fontWeight == 400
                                                                    ? 'Poppins-Light'
                                                                    : sectionproperties.generaltext_fontWeight == 500
                                                                    ? 'Poppins-Regular'
                                                                    : sectionproperties.generaltext_fontWeight == 600
                                                                    ? 'Poppins-Medium'
                                                                    : sectionproperties.generaltext_fontWeight == 700
                                                                    ? 'Poppins-Semibold'
                                                                    : 'Poppins-Bold',
                                                        }}
                                                        editable={false}
                                                        value={lang.currency}
                                                    />
                                                </View>
                                                <Text style={[generalstyles.poppinsMedium]}>
                                                    {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                                </Text>
                                            </View>
                                        </ModalSelector>
                                    </View>
                                )}
                            {fetchAuthorizationQueryContext != undefined &&
                                fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcurrencies?.length == 1 &&
                                sectionproperties.showcurrencies == 'Show' && (
                                    <View style={{ marginVertical: 10 }}>
                                        <View style={[generalstyles.flexRow]}>
                                            <View style={[generalstyles.flexRow, { flex: 1 }]}>
                                                <View style={[styles.settingsiconcont]}>
                                                    <FontAwesome5
                                                        name="money-bill-wave"
                                                        size={15}
                                                        style={{
                                                            color: sectionproperties.iconcontainercolor,
                                                        }}
                                                    />
                                                </View>
                                                <TextInput
                                                    style={{
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                                        color: sectionproperties.generaltext_fontColor,
                                                        textTransform:
                                                            sectionproperties.generaltext_textTransform == 'Uppercase'
                                                                ? 'uppercase'
                                                                : sectionproperties.generaltext_textTransform == 'Capitalize'
                                                                ? 'capitalize'
                                                                : 'lowercase',
                                                        fontFamily:
                                                            sectionproperties.generaltext_fontWeight == 300
                                                                ? 'Poppins-Thin'
                                                                : sectionproperties.generaltext_fontWeight == 400
                                                                ? 'Poppins-Light'
                                                                : sectionproperties.generaltext_fontWeight == 500
                                                                ? 'Poppins-Regular'
                                                                : sectionproperties.generaltext_fontWeight == 600
                                                                ? 'Poppins-Medium'
                                                                : sectionproperties.generaltext_fontWeight == 700
                                                                ? 'Poppins-Semibold'
                                                                : 'Poppins-Bold',
                                                    }}
                                                    editable={false}
                                                    value={lang.currency}
                                                />
                                            </View>
                                            <Text style={[generalstyles.poppinsMedium, { color: sectionproperties.iconcontainercolor }]}>
                                                {langdetect == 'en' ? fetchAuthorizationQueryContext?.data?.data?.currencyname_en : fetchAuthorizationQueryContext?.data?.data?.currencyname_ar}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                            {sectionproperties.showPolicy == 'Show' && (
                                <View style={{ width: '100%', height: 1, backgroundColor: sectionproperties.upperseparatorsecondarybgcolor, marginBottom: 10, marginTop: 10 }}></View>
                            )}
                            {sectionproperties.showPolicy == 'Show' && (
                                <View
                                    style={{
                                        marginBottom: 10,
                                        marginTop: 10,
                                    }}
                                >
                                    <TouchableOpacity
                                        style={[generalstyles.flexRow]}
                                        onPress={() => {
                                            Linking.openURL('https://' + fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcred?.instexternaldomain + '/policies');
                                        }}
                                    >
                                        <View style={[generalstyles.flexRow, { flex: 1 }]}>
                                            <View style={[styles.settingsiconcont]}>
                                                <MaterialIcons
                                                    name="policy"
                                                    size={17}
                                                    style={{
                                                        color: sectionproperties.iconcontainercolor,
                                                    }}
                                                />
                                            </View>
                                            <Text
                                                style={{
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                                    color: sectionproperties.generaltext_fontColor,
                                                    textTransform:
                                                        sectionproperties.generaltext_textTransform == 'Uppercase'
                                                            ? 'uppercase'
                                                            : sectionproperties.generaltext_textTransform == 'Capitalize'
                                                            ? 'capitalize'
                                                            : 'lowercase',
                                                    fontFamily:
                                                        sectionproperties.generaltext_fontWeight == 300
                                                            ? 'Poppins-Thin'
                                                            : sectionproperties.generaltext_fontWeight == 400
                                                            ? 'Poppins-Light'
                                                            : sectionproperties.generaltext_fontWeight == 500
                                                            ? 'Poppins-Regular'
                                                            : sectionproperties.generaltext_fontWeight == 600
                                                            ? 'Poppins-Medium'
                                                            : sectionproperties.generaltext_fontWeight == 700
                                                            ? 'Poppins-Semibold'
                                                            : 'Poppins-Bold',
                                                }}
                                            >
                                                {lang.policies}
                                            </Text>
                                        </View>
                                        <MaterialIcons
                                            name={langdetect == 'en' ? 'keyboard-arrow-right' : 'keyboard-arrow-left'}
                                            size={20}
                                            style={{
                                                color: sectionproperties.iconcontainercolor,
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                            {fetchAuthorizationQueryContext?.data?.data?.CuContactphonenumber != null && sectionproperties.showfooterphonenumber == 'Show' && (
                                <View style={{ width: '100%', height: 1, backgroundColor: sectionproperties.upperseparatorsecondarybgcolor, marginBottom: 10, marginTop: 10 }}></View>
                            )}
                            {fetchAuthorizationQueryContext?.data?.data?.CuContactphonenumber != null && sectionproperties.showfooterphonenumber == 'Show' && (
                                <View
                                    style={{
                                        marginBottom: 10,
                                        marginTop: 10,
                                    }}
                                >
                                    <TouchableOpacity
                                        style={[generalstyles.flexRow]}
                                        onPress={() => {
                                            Linking.openURL('tel:' + fetchAuthorizationQueryContext?.data?.data?.CuContactphonenumber);
                                        }}
                                    >
                                        <View style={[generalstyles.flexRow, { flex: 1 }]}>
                                            <View style={[styles.settingsiconcont]}>
                                                <Feather
                                                    name="phone"
                                                    size={15}
                                                    style={{
                                                        color: sectionproperties.iconcontainercolor,
                                                    }}
                                                />
                                            </View>
                                            <Text
                                                style={{
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                                    color: sectionproperties.generaltext_fontColor,
                                                    textTransform:
                                                        sectionproperties.generaltext_textTransform == 'Uppercase'
                                                            ? 'uppercase'
                                                            : sectionproperties.generaltext_textTransform == 'Capitalize'
                                                            ? 'capitalize'
                                                            : 'lowercase',
                                                    fontFamily:
                                                        sectionproperties.generaltext_fontWeight == 300
                                                            ? 'Poppins-Thin'
                                                            : sectionproperties.generaltext_fontWeight == 400
                                                            ? 'Poppins-Light'
                                                            : sectionproperties.generaltext_fontWeight == 500
                                                            ? 'Poppins-Regular'
                                                            : sectionproperties.generaltext_fontWeight == 600
                                                            ? 'Poppins-Medium'
                                                            : sectionproperties.generaltext_fontWeight == 700
                                                            ? 'Poppins-Semibold'
                                                            : 'Poppins-Bold',
                                                }}
                                            >
                                                {langdetect == 'en' ? 'Call us' : 'إتصل بنا'}
                                            </Text>
                                        </View>
                                        <MaterialIcons
                                            name={langdetect == 'en' ? 'keyboard-arrow-right' : 'keyboard-arrow-left'}
                                            size={20}
                                            style={{
                                                color: sectionproperties.iconcontainercolor,
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                            {sectionproperties.showfooteraddress == 'Show' && (
                                <View style={{ width: '100%', height: 1, backgroundColor: sectionproperties.upperseparatorsecondarybgcolor, marginBottom: 10, marginTop: 10 }}></View>
                            )}
                            {sectionproperties.showfooteraddress == 'Show' && fetchAuthorizationQueryContext?.data?.data?.instinfo?.googlemapslink && (
                                <View
                                    style={{
                                        marginBottom: 10,
                                        marginTop: 10,
                                    }}
                                >
                                    <TouchableOpacity
                                        style={[generalstyles.flexRow]}
                                        onPress={() => {
                                            Linking.openURL(fetchAuthorizationQueryContext?.data?.data?.instinfo?.googlemapslink + '');
                                        }}
                                    >
                                        <View style={[generalstyles.flexRow, { flex: 1 }]}>
                                            <View style={[styles.settingsiconcont]}>
                                                <FontAwesome5
                                                    name="location-arrow"
                                                    size={15}
                                                    style={{
                                                        color: sectionproperties.iconcontainercolor,
                                                    }}
                                                />
                                            </View>
                                            <Text
                                                style={{
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                                    color: sectionproperties.generaltext_fontColor,
                                                    textTransform:
                                                        sectionproperties.generaltext_textTransform == 'Uppercase'
                                                            ? 'uppercase'
                                                            : sectionproperties.generaltext_textTransform == 'Capitalize'
                                                            ? 'capitalize'
                                                            : 'lowercase',
                                                    fontFamily:
                                                        sectionproperties.generaltext_fontWeight == 300
                                                            ? 'Poppins-Thin'
                                                            : sectionproperties.generaltext_fontWeight == 400
                                                            ? 'Poppins-Light'
                                                            : sectionproperties.generaltext_fontWeight == 500
                                                            ? 'Poppins-Regular'
                                                            : sectionproperties.generaltext_fontWeight == 600
                                                            ? 'Poppins-Medium'
                                                            : sectionproperties.generaltext_fontWeight == 700
                                                            ? 'Poppins-Semibold'
                                                            : 'Poppins-Bold',
                                                }}
                                            >
                                                {langdetect == 'en' ? 'Location' : 'الموقع'}
                                            </Text>
                                        </View>
                                        <MaterialIcons
                                            name={langdetect == 'en' ? 'keyboard-arrow-right' : 'keyboard-arrow-left'}
                                            size={20}
                                            style={{
                                                color: sectionproperties.iconcontainercolor,
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>

                    {fetchAuthorizationQueryContext?.data?.data?.loggedin && (
                        <TouchableOpacity
                            style={[
                                generalstyles.allcentered,
                                {
                                    flexDirection: 'row',
                                    marginTop: 30,
                                    marginBottom: 10,
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    width: StyleParseToIntFuncContext(
                                        sectionproperties.generalbtn_width != null && sectionproperties.generalbtn_width != undefined ? sectionproperties.generalbtn_width : 250,
                                    ),
                                    height: StyleParseToIntFuncContext(
                                        sectionproperties.generalbtn_height != null && sectionproperties.generalbtn_height != undefined ? sectionproperties.generalbtn_height : 45,
                                    ),
                                    backgroundColor: sectionproperties.generalbtn_bgColor,
                                    borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertopleftradius, '', true),
                                    borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertoprightradius, '', true),
                                    borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomleftradius, '', true),
                                    borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomrightradius, '', true),
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderwidth, '', true),
                                    borderColor: sectionproperties.generalbtn_bordercolor,
                                },
                            ]}
                            onPress={() => {
                                // LogoutMutationContext.mutate();
                                logoutfuncContext();
                            }}
                        >
                            <View style={[styles.settingsiconcont]}>
                                <AntDesign
                                    name="logout"
                                    size={15}
                                    style={{
                                        color: sectionproperties.generalbtn_textColor,
                                    }}
                                />
                            </View>
                            <Text
                                style={{
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.generalbtn_fontsize),
                                    color: sectionproperties.generalbtn_textColor,
                                    textTransform:
                                        sectionproperties.generalbtn_texttransform == 'Uppercase'
                                            ? 'uppercase'
                                            : sectionproperties.generaltext_textTransform == 'Capitalize'
                                            ? 'capitalize'
                                            : 'lowercase',
                                    fontFamily:
                                        sectionproperties.generalbtn_fontweight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.generalbtn_fontweight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.generalbtn_fontweight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.generalbtn_fontweight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.generalbtn_fontweight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                }}
                            >
                                {!LogoutMutationContext.isLoading && lang.logout}
                                {LogoutMutationContext.isLoading && lang.loading}
                            </Text>
                        </TouchableOpacity>
                    )}
                    {!fetchAuthorizationQueryContext?.data?.data?.loggedin && (
                        <View style={[styles.settingscard, generalstyles.allcentered, generalstyles.flexColumn, { backgroundColor: 'transparent', marginTop: 30 }]}>
                            {sectionproperties.loginbtn_show == 'Show' && (
                                <TouchableOpacity
                                    style={[
                                        {
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: sectionproperties.login_btn_background,
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.login_btn_borderBottomLeftRadius, '', true),
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.login_btn_fontSize),
                                            width: StyleParseToIntFuncContext(
                                                sectionproperties.login_btn_width != null && sectionproperties.login_btn_width != undefined ? sectionproperties.login_btn_width : 300,
                                            ),
                                            height: StyleParseToIntFuncContext(
                                                sectionproperties.login_btn_height != null && sectionproperties.login_btn_height != undefined ? sectionproperties.login_btn_height : 45,
                                            ),
                                            borderWidth: StyleParseToIntFuncContext(sectionproperties.login_btn_borderwidth, '', true),
                                            borderColor: sectionproperties.login_btn_bordercolor,
                                        },
                                    ]}
                                    onPress={() => {
                                        routingcountext(StaticPagesLinksContext.Login);
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily:
                                                sectionproperties.login_btn_fontweight == 300
                                                    ? 'Poppins-Thin'
                                                    : sectionproperties.login_btn_fontweight == 400
                                                    ? 'Poppins-Light'
                                                    : sectionproperties.login_btn_fontweight == 500
                                                    ? 'Poppins-Regular'
                                                    : sectionproperties.login_btn_fontweight == 600
                                                    ? 'Poppins-Medium'
                                                    : sectionproperties.login_btn_fontweight == 700
                                                    ? 'Poppins-Semibold'
                                                    : 'Poppins-Bold',
                                            color: 'white',
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.login_btn_fontSize),
                                            textTransform:
                                                sectionproperties.login_btn_texttransform == 'Uppercase'
                                                    ? 'uppercase'
                                                    : sectionproperties.login_btn_texttransform == 'Capitalize'
                                                    ? 'capitalize'
                                                    : 'lowercase',
                                        }}
                                    >
                                        {lang.login}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            {sectionproperties.signupbtn_show == 'Show' && (
                                <TouchableOpacity
                                    style={[generalstyles.flexRow, { alignItems: 'center', marginBottom: 10, marginTop: 20 }]}
                                    onPress={() => {
                                        routingcountext(StaticPagesLinksContext.Signup);
                                    }}
                                >
                                    <Text
                                        style={{
                                            marginEnd: 5,
                                            fontFamily:
                                                sectionproperties.slideshowText2ContentFontWeight == 300
                                                    ? 'Poppins-Thin'
                                                    : sectionproperties.slideshowText2ContentFontWeight == 400
                                                    ? 'Poppins-Light'
                                                    : sectionproperties.slideshowText2ContentFontWeight == 500
                                                    ? 'Poppins-Regular'
                                                    : sectionproperties.slideshowText2ContentFontWeight == 600
                                                    ? 'Poppins-Medium'
                                                    : sectionproperties.slideshowText2ContentFontWeight == 700
                                                    ? 'Poppins-Semibold'
                                                    : 'Poppins-Bold',
                                            color: sectionproperties.slideshowText2ContentColor,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.slideshowText2ContentFontSize),
                                            textTransform:
                                                sectionproperties.slideshowText2ContentTextTransform == 'Uppercase'
                                                    ? 'uppercase'
                                                    : sectionproperties.slideshowText2ContentTextTransform == 'Capitalize'
                                                    ? 'capitalize'
                                                    : sectionproperties.slideshowText2ContentTextTransform == 'none'
                                                    ? 'none'
                                                    : 'lowercase',
                                        }}
                                    >
                                        {langdetect == 'en' ? "Don't have an account?" : 'ليس لديك حساب؟'}
                                    </Text>
                                    <TouchableOpacity
                                        style={[{ alignItems: 'center', justifyContent: 'center' }]}
                                        onPress={() => {
                                            routingcountext(StaticPagesLinksContext.Signup);
                                        }}
                                    >
                                        <Text
                                            style={{
                                                textDecorationLine: 'underline',
                                                fontFamily:
                                                    sectionproperties.signup_btn_fontweight == 300
                                                        ? 'Poppins-Thin'
                                                        : sectionproperties.signup_btn_fontweight == 400
                                                        ? 'Poppins-Light'
                                                        : sectionproperties.signup_btn_fontweight == 500
                                                        ? 'Poppins-Regular'
                                                        : sectionproperties.signup_btn_fontweight == 600
                                                        ? 'Poppins-Medium'
                                                        : sectionproperties.signup_btn_fontweight == 700
                                                        ? 'Poppins-Semibold'
                                                        : 'Poppins-Bold',
                                                color: sectionproperties.signup_btn_color,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.signup_btn_fontSize),
                                                textTransform:
                                                    sectionproperties.signup_btn_texttransform == 'Uppercase'
                                                        ? 'uppercase'
                                                        : sectionproperties.signup_btn_texttransform == 'Capitalize'
                                                        ? 'capitalize'
                                                        : sectionproperties.signup_btn_texttransform == 'None'
                                                        ? 'none'
                                                        : 'lowercase',
                                            }}
                                        >
                                            {lang.signup}
                                        </Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                    <View style={[generalstyles.allcentered, { flexDirection: 'column', marginTop: 5 }]}>
                        {sectionproperties.showcontactinfo == 'Show' && (
                            <Text style={[generalstyles.poppinsMedium, { fontSize: StyleParseToIntFuncContext(sectionproperties.contactTitleFontSize), color: sectionproperties.contactTitlteColor }]}>
                                {langdetect == 'en' ? sectionproperties.contactTitle_en : sectionproperties.contactTitle_ar}
                            </Text>
                        )}
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            {sectionproperties.fbbtn_show == 'Show' && fetchAuthorizationQueryContext?.data?.data?.instinfo?.facebooklink != null && (
                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                        margin: 10,
                                        width: 50,
                                        height: 50,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: sectionproperties.facebkbtnnbgColor,
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.facebkbtnn_borderRadius, '', true),
                                        shadowColor: StyleParseToIntFuncContext(sectionproperties.facebkbtnnborderwidth, '', true) == 0 ? sectionproperties.facebkbtnn_shadowcolor : 'transparent',
                                        shadowOffset: {
                                            width: 0,
                                            height: 3,
                                        },
                                        shadowOpacity: 0.1,
                                        shadowRadius: 3,
                                        elevation: StyleParseToIntFuncContext(sectionproperties.facebkbtnnborderwidth, '', true) == 0 ? 0 : 1,
                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.facebkbtnnborderwidth, '', true),
                                        borderColor: sectionproperties.facebkbtnnbordercolor,
                                    }}
                                    onPress={() => {
                                        Linking.openURL(fetchAuthorizationQueryContext?.data?.data?.instinfo?.facebooklink);
                                    }}
                                >
                                    <FontAwesome
                                        name="facebook-f"
                                        size={StyleParseToIntFuncContext(sectionproperties.facebkbtnniconfontsize)}
                                        style={{
                                            color: sectionproperties.facebkbtnnTextcolor,
                                        }}
                                    />
                                </TouchableOpacity>
                            )}
                            {sectionproperties.instbtn_show == 'Show' && fetchAuthorizationQueryContext?.data?.data?.instinfo?.instagramlink != null && (
                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                        margin: 10,
                                        width: 50,
                                        height: 50,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: sectionproperties.instgrambtnbgColor,
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.instgrambtn_borderRadius, '', true),
                                        shadowColor: StyleParseToIntFuncContext(sectionproperties.instgrambtnborderwidth, '', true) == 0 ? sectionproperties.instbtnn_shadowcolor : 'transparent',
                                        shadowOffset: {
                                            width: 0,
                                            height: 3,
                                        },
                                        shadowOpacity: 0.1,
                                        shadowRadius: 3,
                                        elevation: StyleParseToIntFuncContext(sectionproperties.instgrambtnborderwidth, '', true) == 0 ? 1 : 0,
                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.instgrambtnborderwidth, '', true),
                                        borderColor: sectionproperties.instgrambtnbordercolor,
                                    }}
                                    onPress={() => {
                                        Linking.openURL(fetchAuthorizationQueryContext?.data?.data?.instinfo?.instagramlink);
                                    }}
                                >
                                    <AntDesign
                                        name="instagram"
                                        size={StyleParseToIntFuncContext(sectionproperties.instgrambtniconfontsize)}
                                        style={{
                                            color: sectionproperties.instgrambtnTextcolor,
                                        }}
                                    />
                                </TouchableOpacity>
                            )}
                            {sectionproperties.youtbtn_show == 'Show' && fetchAuthorizationQueryContext?.data?.data?.instinfo?.whatsappnumber != null && (
                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                        margin: 10,
                                        width: 50,
                                        height: 50,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: sectionproperties.youtubebtnbgColor,
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.youtubebtn_borderRadius, '', true),
                                        shadowColor: StyleParseToIntFuncContext(sectionproperties.youtubebtnborderwidth, '', true) == 0 ? sectionproperties.youtubebtn_shadowcolor : 'transparent',
                                        shadowOffset: {
                                            width: 0,
                                            height: 3,
                                        },
                                        shadowOpacity: 0.1,
                                        shadowRadius: 3,
                                        elevation: StyleParseToIntFuncContext(sectionproperties.youtubebtnborderwidth, '', true) == 0 ? 1 : 0,
                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.youtubebtnborderwidth, '', true),
                                        borderColor: sectionproperties.youtubebtnbordercolor,
                                    }}
                                    onPress={() => {
                                        Linking.openURL('whatsapp://send?text=&phone=' + fetchAuthorizationQueryContext?.data?.data?.instinfo?.whatsappnumber);
                                    }}
                                >
                                    <FontAwesome
                                        name="whatsapp"
                                        size={StyleParseToIntFuncContext(sectionproperties.youtubebtniconfontsize)}
                                        style={{
                                            color: sectionproperties.youtubebtnTextcolor,
                                        }}
                                    />
                                </TouchableOpacity>
                            )}
                            {fetchAuthorizationQueryContext?.data?.data?.instinfo?.youtubelink != null && (
                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                        margin: 10,
                                        width: 50,
                                        height: 50,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: sectionproperties.youtubebtnbgColor,
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.youtubebtn_borderRadius, '', true),
                                        shadowColor: StyleParseToIntFuncContext(sectionproperties.youtubebtnborderwidth, '', true) == 0 ? sectionproperties.youtubebtn_shadowcolor : 'transparent',
                                        shadowOffset: {
                                            width: 0,
                                            height: 3,
                                        },
                                        shadowOpacity: 0.1,
                                        shadowRadius: 3,
                                        elevation: StyleParseToIntFuncContext(sectionproperties.youtubebtnborderwidth, '', true) == 0 ? 1 : 0,
                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.youtubebtnborderwidth, '', true),
                                        borderColor: sectionproperties.youtubebtnbordercolor,
                                    }}
                                    onPress={() => {
                                        Linking.openURL(fetchAuthorizationQueryContext?.data?.data?.instinfo?.youtubelink);
                                    }}
                                >
                                    <AntDesign
                                        name="youtube"
                                        size={StyleParseToIntFuncContext(sectionproperties.youtubebtniconfontsize)}
                                        style={{
                                            color: sectionproperties.youtubebtnTextcolor,
                                        }}
                                    />
                                </TouchableOpacity>
                            )}
                            {fetchAuthorizationQueryContext?.data?.data?.instinfo?.tiktoklink != null && (
                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                        margin: 10,
                                        width: 50,
                                        height: 50,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: sectionproperties.youtubebtnbgColor,
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.youtubebtn_borderRadius, '', true),
                                        shadowColor: StyleParseToIntFuncContext(sectionproperties.youtubebtnborderwidth, '', true) == 0 ? sectionproperties.youtubebtn_shadowcolor : 'transparent',
                                        shadowOffset: {
                                            width: 0,
                                            height: 3,
                                        },
                                        shadowOpacity: 0.1,
                                        shadowRadius: 3,
                                        elevation: StyleParseToIntFuncContext(sectionproperties.youtubebtnborderwidth, '', true) == 0 ? 1 : 0,
                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.youtubebtnborderwidth, '', true),
                                        borderColor: sectionproperties.youtubebtnbordercolor,
                                    }}
                                    onPress={() => {
                                        Linking.openURL(fetchAuthorizationQueryContext?.data?.data?.instinfo?.tiktoklink);
                                    }}
                                >
                                    <FontAwesome5
                                        name="tiktok"
                                        size={StyleParseToIntFuncContext(sectionproperties.youtubebtniconfontsize)}
                                        style={{
                                            color: sectionproperties.youtubebtnTextcolor,
                                        }}
                                    />
                                </TouchableOpacity>
                            )}
                            {sectionproperties.showtelegrambtn == 'Show' && fetchAuthorizationQueryContext?.data?.data?.instinfo?.telegramlink != null && (
                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                        margin: 10,
                                        width: 50,
                                        height: 50,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: sectionproperties.facebkbtnnbgColor,
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.facebkbtnn_borderRadius, '', true),
                                        shadowColor: StyleParseToIntFuncContext(sectionproperties.facebkbtnnborderwidth, '', true) == 0 ? sectionproperties.facebkbtnn_shadowcolor : 'transparent',
                                        shadowOffset: {
                                            width: 0,
                                            height: 3,
                                        },
                                        shadowOpacity: 0.1,
                                        shadowRadius: 3,
                                        elevation: StyleParseToIntFuncContext(sectionproperties.facebkbtnnborderwidth, '', true) == 0 ? 0 : 1,
                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.facebkbtnnborderwidth, '', true),
                                        borderColor: sectionproperties.facebkbtnnbordercolor,
                                    }}
                                    onPress={() => {
                                        Linking.openURL(fetchAuthorizationQueryContext?.data?.data?.instinfo?.telegramlink);
                                    }}
                                >
                                    <EvilIcons
                                        name="sc-telegram"
                                        size={StyleParseToIntFuncContext(sectionproperties.telegramfontsize)}
                                        style={{
                                            color: sectionproperties.facebkbtnnTextcolor,
                                        }}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    {/* <Text>{currentOTAversion}</Text> */}
                    <Modal
                        presentationStyle={'pageSheet'}
                        animationType="slide"
                        visible={shownotificationsmodal}
                        onRequestClose={() => {
                            setshownotificationsmodal(false);
                        }}
                    >
                        <View style={[generalstyles.allcentered, generalstyles.flexRow, { width: '100%', marginTop: 25, paddingHorizontal: 10 }]}>
                            <View style={{ flex: 1 }}>
                                <Text
                                    style={{
                                        textAlign: 'left',
                                        fontSize: 22,
                                        color: sectionproperties.generaltext_fontColor,
                                        textTransform:
                                            sectionproperties.generaltext_textTransform == 'Uppercase'
                                                ? 'uppercase'
                                                : sectionproperties.generaltext_textTransform == 'Capitalize'
                                                ? 'capitalize'
                                                : 'lowercase',
                                        fontFamily:
                                            sectionproperties.generaltext_fontWeight == 300
                                                ? 'Poppins-Thin'
                                                : sectionproperties.generaltext_fontWeight == 400
                                                ? 'Poppins-Light'
                                                : sectionproperties.generaltext_fontWeight == 500
                                                ? 'Poppins-Regular'
                                                : sectionproperties.generaltext_fontWeight == 600
                                                ? 'Poppins-Medium'
                                                : sectionproperties.generaltext_fontWeight == 700
                                                ? 'Poppins-Semibold'
                                                : 'Poppins-Bold',
                                    }}
                                >
                                    {langdetect == 'en' ? sectionproperties.notificationtitle_en : sectionproperties.notificationtitle_ar}
                                </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <TouchableOpacity
                                    style={[
                                        generalstyles.allcentered,
                                        {
                                            width: StyleParseToIntFuncContext(sectionproperties.closeSliderWidth),
                                            height: StyleParseToIntFuncContext(sectionproperties.closeSliderHeight),
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.closeSlider_borderBottomLeftRadius, '', true),
                                            backgroundColor: sectionproperties.closeSliderBgColor,
                                        },
                                    ]}
                                    onPress={() => setshownotificationsmodal(false)}
                                >
                                    <AntDesign
                                        name="close"
                                        style={{
                                            color: sectionproperties.closeSlider_color,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.closeSlider_fontSize),
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ width: '100%', height: 1, backgroundColor: sectionproperties.upperseparatorsecondarybgcolor, marginVertical: 25 }} />
                        <Notifications sectionproperties={sectionproperties} />
                    </Modal>
                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    settingscard: {
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    settingsiconcont: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginEnd: 10,
    },
    titlecont: {
        paddingStart: 20,
        paddingEnd: 20,
        width: '100%',
        marginBottom: 10,
        textAlign: 'left',
    },
});

export default AppMenu;
