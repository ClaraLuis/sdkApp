import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { Button, Image, View, Text, TouchableOpacity, FlatList, StyleSheet, Linking, Modal } from 'react-native';
import { SIZES, icons } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import RenderHtml from 'react-native-render-html';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { MaterialCommunityIcons, SimpleLineIcons, Feather, AntDesign, FontAwesome5 } from 'react-native-vector-icons';
import SpinnerButton from 'react-native-spinner-button';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
// import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import Variantoptions from './Variantoptions';
import ProductPricingHeader from './ProductPricingHeader';
import { ImageComponent } from '../../../ImageComponent';
// import StarRating from 'react-native-star-rating';
import ProductExtraFields from './ProductExtraFields';
import ImageViewer from 'react-native-image-zoom-viewer';
import OverallTotalSection from './OverallTotalSection';
import { WebView } from 'react-native-webview';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import YoutubePlayer from 'react-native-youtube-iframe';
import Stars from 'react-native-stars';

const Service_itemtype = (props) => {
    const carouselRef = useRef();
    const navigation = useNavigation();
    const returnpolicyobj = props.actions.returnpolicyobj;
    const getreviewsfeedbackview = props.actions.getreviewsfeedbackview;
    const { showUpTopNotificationBarContext, fetchAuthorizationQueryContext } = useContext(FetchingContext);
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const [IsFavItemProps, setIsFavItemProps] = useState(props.actions.IsFavItemProps);
    const [fetchProductInfoQuery, setfetchProductInfoQuery] = useState(props.actions.fetchProductInfoQuery);
    const [showMoredesc, setShowMoredesc] = useState(false);
    const AddtoCartMutationContext = props.actions.AddtoCartMutationContext;
    const addtofavoritescontext = props.actions.addtofavoritescontext;
    const ProductInfoIdContext = props.actions.ProductInfoIdContext;
    const GeneralAPIMutationContext = props.actions.GeneralAPIMutationContext;
    const productimagesarrayy = props.actions.productimagesarrayy;
    const productimagesarrayy_ar = props.actions.productimagesarrayy_ar;
    const setaddtocardpayloadobj = props.actions.setaddtocardpayloadobj;
    const addtocardpayloadobj = props.actions.addtocardpayloadobj;
    const getprice_discountpriceprops = props.actions.getprice_discountpriceprops;
    const getQuantityCondition = props.actions.getQuantityCondition;
    const renderStoreInfo = props.actions.renderStoreInfo;
    const onShare = props.actions.onShare;
    const addtocartfunc = props.actions.addtocartfunc;
    const sectionproperties = props.actions.sectionproperties;
    const [currentmutatestate, setcurrentmutatestate] = useState('');
    const [slots, setslots] = useState([]);
    const [showopencalendar, setshowopencalendar] = useState(false);
    const choosedateopencalendar = () => {
        setshowopencalendar(true);
    };
    const [timepicked, settimepicked] = useState(lang.choosetime);
    const [fromDate, setfromDate] = useState(lang.choosedate);
    const [showFromCalendar, setshowFromCalendar] = useState(false);
    const [toDate, settoDate] = useState(lang.choosedate);
    const [showToCalendar, setshowToCalendar] = useState(false);
    const [indexSelected, setIndexSelected] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [productVideos, setproductVideos] = useState([]);
    const onSelect = (indexSelected) => {
        setIndexSelected(indexSelected);
    };
    const onTouchThumbnail = (touched) => {
        if (touched === indexSelected) return;

        // carouselRef?.current?.snapToItem(touched);
    };
    const [tabindex, settabindex] = useState(0);
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === 'ended') {
            setPlaying(false);
            Alert.alert('video has finished playing!');
        }
    }, []);

    useEffect(() => {
        setaddtocardpayloadobj({ ...addtocardpayloadobj, item_type: 'service', productid: props.actions.ProductInfoIdContext });
    }, []);
    useEffect(() => {
        if (addtocardpayloadobj.from != undefined && addtocardpayloadobj.to != undefined) {
            var date1 = addtocardpayloadobj.from;
            var date1modified = date1.replace(/-/g, '/');
            var date2 = addtocardpayloadobj.to;
            var date2modified = date2.replace(/-/g, '/');
            const diffTime = Math.abs(new Date(date1modified) - new Date(date2modified));
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays.toString() != 'NaN') {
                if (date2 <= date1) {
                    showUpTopNotificationBarContext(lang.chooseanotherdate, 'orange');
                    setaddtocardpayloadobj({ ...addtocardpayloadobj, quantity: 0 });
                } else {
                    if (fetchProductInfoQuery.data.data.productinfo.maximumproductquant >= diffDays && fetchProductInfoQuery.data.data.productinfo.minimumproductquant <= diffDays) {
                        setaddtocardpayloadobj({ ...addtocardpayloadobj, quantity: diffDays });
                    } else {
                        setaddtocardpayloadobj({ ...addtocardpayloadobj, quantity: 0 });
                        showUpTopNotificationBarContext(
                            'Max: ' + fetchProductInfoQuery.data.data.productinfo.maximumproductquant + ', Min: ' + fetchProductInfoQuery.data.data.productinfo.minimumproductquant,
                            'orange',
                        );
                    }
                }
            }
        }
    }, [addtocardpayloadobj.from, addtocardpayloadobj.to]);
    useEffect(() => {
        if (fetchProductInfoQuery?.data?.data?.productinfo?.product_videos?.length != 0) {
            if (Array.isArray(fetchProductInfoQuery?.data?.data?.productinfo?.product_videos)) {
                var temparr = [...fetchProductInfoQuery?.data?.data?.productinfo?.product_videos];
                temparr.forEach(function (item) {
                    item.linkclicked = false;
                });
                setproductVideos([...temparr]);
            }
        }
    }, []);
    // const source = {
    //     html:
    //         langdetect == 'en'
    //             ? fetchProductInfoQuery?.data?.data?.productinfo?.description_en?.length > 500
    //                 ? '<p><span style="font-size: 15px">' + fetchProductInfoQuery?.data?.data?.productinfo?.description_en?.slice(0, 500) + '...</span> </p>'
    //                 : '<p><span style="font-size: 15px">' + fetchProductInfoQuery?.data?.data?.productinfo?.description_en + '</span> </p>'
    //             : fetchProductInfoQuery?.data?.data?.productinfo?.description_ar?.length > 500
    //             ? '<p><span style="font-size: 15px">' + fetchProductInfoQuery?.data?.data?.productinfo?.description_ar?.slice(0, 450) + +'...</span> </p>'
    //             : '<p><span style="font-size: 15px">' + fetchProductInfoQuery?.data?.data?.productinfo?.description_ar + '</span> </p>',
    // };
    const source = {
        html:
            langdetect == 'en'
                ? '<p><span style="font-size: 15px">' + fetchProductInfoQuery?.data?.data?.productinfo?.description_en + '</span> </p>'
                : '<p><span style="font-size: 15px">' + fetchProductInfoQuery?.data?.data?.productinfo?.description_ar + '</span> </p>',
    };
    function UpperPolicy() {
        return (
            <View
                style={{
                    backgroundColor: 'white',
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginTop: 20,
                }}
            >
                <Text
                    style={{
                        textAlign: 'left',
                        paddingStart: 15,
                        paddingEnd: 15,
                        color: sectionproperties.slideshowText1ContentColor,
                        fontFamily:
                            sectionproperties.slideshowText1ContentFontWeight == 300
                                ? 'Poppins-Thin'
                                : sectionproperties.slideshowText1ContentFontWeight == 400
                                ? 'Poppins-Light'
                                : sectionproperties.slideshowText1ContentFontWeight == 500
                                ? 'Poppins-Regular'
                                : sectionproperties.slideshowText1ContentFontWeight == 600
                                ? 'Poppins-Medium'
                                : sectionproperties.slideshowText1ContentFontWeight == 700
                                ? 'Poppins-Semibold'
                                : 'Poppins-Bold',
                        fontSize: StyleParseToIntFuncContext(sectionproperties.slideshowText1ContentFontSize),
                        textTransform:
                            sectionproperties.slideshowText1ContentTextTransform == 'Uppercase'
                                ? 'uppercase'
                                : sectionproperties.slideshowText1ContentTextTransform == 'Capitalize'
                                ? 'capitalize'
                                : sectionproperties.slideshowText1ContentTextTransform == 'None'
                                ? 'none'
                                : 'lowercase',
                    }}
                >
                    {langdetect == 'en' ? returnpolicyobj('Refund Policy')?.policypagename_en : returnpolicyobj('Refund Policy')?.policypagename_ar}
                </Text>
                <View
                    style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: '#eee',
                        marginTop: 10,
                        marginBottom: 0,
                    }}
                ></View>
                <View
                    style={{
                        paddingHorizontal: 20,
                    }}
                >
                    <Text
                        style={[
                            generalstyles.primaryRegular,
                            {
                                marginTop: 10,
                                width: '100%',
                                color: 'grey',
                                textAlign: 'left',
                                color: sectionproperties.slideshowText2ContentColor,
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
                                fontSize: StyleParseToIntFuncContext(sectionproperties.slideshowText2ContentFontSize),
                                textTransform:
                                    sectionproperties.slideshowText2ContentTextTransform == 'Uppercase'
                                        ? 'uppercase'
                                        : sectionproperties.slideshowText2ContentTextTransform == 'Capitalize'
                                        ? 'capitalize'
                                        : sectionproperties.slideshowText2ContentTextTransform == 'None'
                                        ? 'none'
                                        : 'lowercase',
                            },
                        ]}
                    >
                        {langdetect == 'en' ? returnpolicyobj('Refund Policy')?.policysummary_en : returnpolicyobj('Refund Policy')?.policysummary_ar}
                    </Text>
                    <View style={[generalstyles.allcentered, { width: '100%', marginTop: 15 }]}>
                        <Text
                            style={[generalstyles.poppinsMedium, { textDecorationLine: 'underline' }]}
                            onPress={() => {
                                Linking.openURL('https://' + fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcred?.instexternaldomain + '/policies');
                            }}
                        >
                            {lang.showmore}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
    function LowerPolicy() {
        return (
            <View
                style={{
                    backgroundColor: 'white',
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginTop: 20,
                }}
            >
                <Text
                    style={{
                        textAlign: 'left',
                        paddingStart: 15,
                        paddingEnd: 15,
                        color: sectionproperties.slideshowText1ContentColor,
                        fontFamily:
                            sectionproperties.slideshowText1ContentFontWeight == 300
                                ? 'Poppins-Thin'
                                : sectionproperties.slideshowText1ContentFontWeight == 400
                                ? 'Poppins-Light'
                                : sectionproperties.slideshowText1ContentFontWeight == 500
                                ? 'Poppins-Regular'
                                : sectionproperties.slideshowText1ContentFontWeight == 600
                                ? 'Poppins-Medium'
                                : sectionproperties.slideshowText1ContentFontWeight == 700
                                ? 'Poppins-Semibold'
                                : 'Poppins-Bold',
                        fontSize: StyleParseToIntFuncContext(sectionproperties.slideshowText1ContentFontSize),
                        textTransform:
                            sectionproperties.slideshowText1ContentTextTransform == 'Uppercase'
                                ? 'uppercase'
                                : sectionproperties.slideshowText1ContentTextTransform == 'Capitalize'
                                ? 'capitalize'
                                : sectionproperties.slideshowText1ContentTextTransform == 'None'
                                ? 'none'
                                : 'lowercase',
                    }}
                >
                    {langdetect == 'en' ? returnpolicyobj('Shipping Policy')?.policypagename_en : returnpolicyobj('Shipping Policy')?.policypagename_ar}
                </Text>
                <View
                    style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: '#eee',
                        marginTop: 10,
                        marginBottom: 0,
                    }}
                ></View>
                <View
                    style={{
                        paddingHorizontal: 20,
                    }}
                >
                    <Text
                        style={[
                            generalstyles.primaryRegular,
                            {
                                marginTop: 10,
                                color: 'grey',
                                textAlign: 'left',
                                color: sectionproperties.slideshowText2ContentColor,
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
                                fontSize: StyleParseToIntFuncContext(sectionproperties.slideshowText2ContentFontSize),
                                textTransform:
                                    sectionproperties.slideshowText2ContentTextTransform == 'Uppercase'
                                        ? 'uppercase'
                                        : sectionproperties.slideshowText2ContentTextTransform == 'Capitalize'
                                        ? 'capitalize'
                                        : sectionproperties.slideshowText2ContentTextTransform == 'None'
                                        ? 'none'
                                        : 'lowercase',
                            },
                        ]}
                    >
                        {langdetect == 'en' ? returnpolicyobj('Refund Policy')?.policysummary_en : returnpolicyobj('Refund Policy')?.policysummary_ar}
                    </Text>

                    <View style={[generalstyles.allcentered, { width: '100%', marginTop: 15 }]}>
                        <Text style={[generalstyles.poppinsMedium, { textDecorationLine: 'underline' }]}>{lang.showmore}</Text>
                    </View>
                </View>
            </View>
        );
    }
    function renderProductInfo() {
        return (
            <View style={{ width: '100%' }}>
                {sectionproperties.productnameposition == 'Top' && (
                    <View
                        style={{
                            display: 'flex',
                            marginTop: 10,
                            marginBottom: 10,
                            flexDirection: 'row',
                            flex: 1,
                            flexDirection: 'column',
                            padding: 10,
                            paddingHorizontal: 15,
                            backgroundColor: sectionproperties.reservation_bgcolor,
                        }}
                    >
                        {sectionproperties.showSKU == 'Show' && sectionproperties.skuposition == 'Top' && (
                            <View style={{ marginTop: 5, marginBottom: StyleParseToIntFuncContext(sectionproperties.skumarginbottom) }}>
                                <Text
                                    style={{
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.skuFontSize),
                                        color: sectionproperties.skuColor,
                                        fontFamily:
                                            sectionproperties.skuFontWeight == 300
                                                ? 'Poppins-Thin'
                                                : sectionproperties.skuFontWeight == 400
                                                ? 'Poppins-Light'
                                                : sectionproperties.skuFontWeight == 500
                                                ? 'Poppins-Regular'
                                                : sectionproperties.skuFontWeight == 600
                                                ? 'Poppins-Medium'
                                                : sectionproperties.skuFontWeight == 700
                                                ? 'Poppins-Semibold'
                                                : 'Poppins-Bold',
                                        textAlign: 'left',
                                    }}
                                >
                                    {langdetect == 'en' ? sectionproperties.skutitleEn : sectionproperties.skutitleAr}:{' '}
                                    <Text
                                        style={{
                                            fontFamily:
                                                sectionproperties.skuSecondaryFontWeight == 300
                                                    ? 'Poppins-Thin'
                                                    : sectionproperties.skuSecondaryFontWeight == 400
                                                    ? 'Poppins-Light'
                                                    : sectionproperties.skuSecondaryFontWeight == 500
                                                    ? 'Poppins-Regular'
                                                    : sectionproperties.skuSecondaryFontWeight == 600
                                                    ? 'Poppins-Medium'
                                                    : sectionproperties.skuSecondaryFontWeight == 700
                                                    ? 'Poppins-Semibold'
                                                    : 'Poppins-Bold',
                                        }}
                                    >
                                        {fetchProductInfoQuery?.data?.data?.productinfo?.sku}
                                    </Text>
                                </Text>
                            </View>
                        )}
                        <View style={[generalstyles.flexRow]}>
                            <Text
                                style={[
                                    {
                                        flex: 1,
                                        textTransform:
                                            sectionproperties.prodNameTextTranform == 'Uppercase'
                                                ? 'uppercase'
                                                : sectionproperties.prodNameTextTranform == 'Capitalize'
                                                ? 'capitalize'
                                                : sectionproperties.prodNameTextTranform == 'None'
                                                ? 'none'
                                                : 'lowercase',
                                        color: sectionproperties.prodNameColor,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.prodNameFontSize),
                                        textAlign: 'left',
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
                                        marginEnd: 10,
                                    },
                                ]}
                            >
                                {langdetect == 'en' ? fetchProductInfoQuery?.data?.data?.productinfo.name_en : fetchProductInfoQuery?.data?.data?.productinfo.name_ar}
                            </Text>
                            {sectionproperties.showShareButton == 'Show' && (
                                <TouchableOpacity
                                    style={[
                                        generalstyles.allcentered,
                                        {
                                            width: sectionproperties.sharebtn_bg == '#ffffff' ? 'auto' : 40,
                                            height: sectionproperties.sharebtn_bg == '#ffffff' ? 'auto' : 40,
                                            backgroundColor: sectionproperties.sharebtn_bg,
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.sharebtn_borderradius),
                                            marginBottom: 'auto',
                                        },
                                    ]}
                                    onPress={() => {
                                        onShare();
                                    }}
                                >
                                    <Feather name="share" color={sectionproperties.sharebtn_color} size={StyleParseToIntFuncContext(sectionproperties.sharebtn_fontSize)} />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                )}
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 10, position: 'absolute', zIndex: 1000, paddingLeft: 10, paddingRight: 10 }}>
                    {sectionproperties.showgallery == 'Show' && sectionproperties.productnameposition != 'Top' && (
                        <View
                            style={{
                                flex: 1,
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    width: 40,
                                    height: 40,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: sectionproperties.generalbtn_bgColor,
                                    borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertopleftradius, '', true),
                                    borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_bordertoprightradius, '', true),
                                    borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomleftradius, '', true),
                                    borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderbottomrightradius, '', true),
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.generalbtn_borderwidth, '', true),
                                    borderColor: sectionproperties.generalbtn_bordercolor,
                                }}
                                onPress={() => {
                                    navigation.goBack();
                                }}
                            >
                                <AntDesign
                                    name={langdetect == 'en' ? 'arrowleft' : 'arrowright'}
                                    size={StyleParseToIntFuncContext(sectionproperties.generalbtn_fontsize)}
                                    style={{ color: sectionproperties.generalbtn_textColor }}
                                />
                            </TouchableOpacity>
                        </View>
                    )}

                    <View
                        style={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                        }}
                    >
                        {sectionproperties.favBtnShow == 'Show' && sectionproperties.btnposition == 'Top' && (
                            <TouchableOpacity
                                style={{
                                    width: 40,
                                    height: 40,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: IsFavItemProps == true ? sectionproperties.activebgcolor : sectionproperties.favBtnbgColor,
                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.fav_btn_borderBottomLeftRadius, '', true),
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.favbtnborderwidth, '', true),
                                    borderColor: sectionproperties.favbtnbordercolor,
                                }}
                                onPress={() => {
                                    setIsFavItemProps(!IsFavItemProps);
                                    addtofavoritescontext(ProductInfoIdContext);
                                }}
                            >
                                {sectionproperties.faviconshape == 'Star Shape' && (
                                    <View>
                                        {!IsFavItemProps && (
                                            <AntDesign
                                                name="staro"
                                                size={StyleParseToIntFuncContext(sectionproperties.favBtnIconfontsize)}
                                                style={{
                                                    color: sectionproperties.favBtniconcolor,
                                                }}
                                            />
                                        )}
                                        {IsFavItemProps && (
                                            <AntDesign
                                                name="star"
                                                size={StyleParseToIntFuncContext(sectionproperties.favBtnIconfontsize)}
                                                style={{
                                                    color: sectionproperties.activefaviconcolor,
                                                }}
                                            />
                                        )}
                                    </View>
                                )}
                                {sectionproperties.faviconshape == 'Heart Shape' && (
                                    <View>
                                        {!IsFavItemProps && (
                                            <AntDesign
                                                name="hearto"
                                                size={StyleParseToIntFuncContext(sectionproperties.favBtnIconfontsize)}
                                                style={{
                                                    color: sectionproperties.favBtniconcolor,
                                                }}
                                            />
                                        )}
                                        {IsFavItemProps && (
                                            <AntDesign
                                                name="heart"
                                                size={StyleParseToIntFuncContext(sectionproperties.favBtnIconfontsize)}
                                                style={{
                                                    color: sectionproperties.activefaviconcolor,
                                                }}
                                            />
                                        )}
                                    </View>
                                )}
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                {/* <View
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <View
                        style={{
                            height: StyleParseToIntFuncContext(sectionproperties.image_height != null && sectionproperties.image_height != undefined ? sectionproperties.image_height : 0),
                            marginBottom: 10,
                            backgroundColor: sectionproperties.reservation_bgcolor,
                        }}
                    >
                        {/* <Carousel
                            layout="default"
                            data={Platform.OS == 'ios' ? productimagesarrayy : langdetect == 'en' ? productimagesarrayy : productimagesarrayy_ar}
                            sliderWidth={SIZES.width}
                            itemWidth={SIZES.width}
                            onSnapToItem={(index) => onSelect(index)}
                            ref={carouselRef}
                            useScrollView={langdetect == 'ar' ? true : false}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => setModalVisible(true)}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                >
                                    <ImageComponent
                                        key={index}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        resizeMode="contain"
                                        path={item.path}
                                    />
                                </TouchableOpacity>
                            )}
                            style={{
                                direction: 'ltr',
                                flexDirection: 'row-reverse',
                            }}
                    
                        {sectionproperties.hidecontrols == 'No' && (
                            <View style={[{ position: 'absolute', bottom: -20, left: 0, right: 0 }]}>
                            </View>
                        )}
                        {props.actions.productimagesarrayy.length != 0 && (
                            <View style={[generalstyles.flexRow, { justifyContent: 'flex-end', position: 'absolute', bottom: -10, width: '100%', paddingHorizontal: 15 }]}>
                                <View
                                    style={{
                                        marginVertical: 12,
                                        paddingHorizontal: 0,
                                        alignSelf: 'flex-end',
                                        right: 0,
                                    }}
                                >
                                    <Text
                                        style={[
                                            generalstyles.poppinsMedium,
                                            {
                                                color: '#000',
                                                fontSize: 13,
                                            },
                                        ]}
                                    >
                                        {indexSelected + 1}/{props.actions.productimagesarrayy.length}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>
                    {sectionproperties.hidecontrols == 'No' && (
                        <FlatList
                            horizontal={true}
                            data={props.actions.productimagesarrayy}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingHorizontal: 10,
                            }}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => onTouchThumbnail(index)}
                                    style={[
                                        generalstyles.allcentered,
                                        {
                                            borderRadius: 10,
                                            borderWidth: index === indexSelected ? 4 : 2,
                                            borderColor: index === indexSelected ? sectionproperties.activedotcolor : '#ccc',
                                            overflow: 'hidden',
                                            marginRight: 10,
                                        },
                                    ]}
                                >
                                    <ImageComponent
                                        path={item.path}
                                        style={{
                                            width: 60,
                                            height: 60,
                                            resizeMode: 'contain',
                                        }}
                                    />
                                </TouchableOpacity>
                            )}
                        />
                    )}
                </View> */}
                {sectionproperties.productnameposition == 'Bottom' && (
                    <View
                        style={{
                            display: 'flex',
                            marginTop: 10,
                            flexDirection: 'row',
                            flex: 1,
                            flexDirection: 'column',
                            padding: 10,
                            paddingHorizontal: 15,
                            backgroundColor: sectionproperties.reservation_bgcolor,
                        }}
                    >
                        <View style={[generalstyles.flexRow]}>
                            <Text
                                style={[
                                    {
                                        flex: 1,
                                        textTransform:
                                            sectionproperties.prodNameTextTranform == 'Uppercase'
                                                ? 'uppercase'
                                                : sectionproperties.prodNameTextTranform == 'Capitalize'
                                                ? 'capitalize'
                                                : sectionproperties.prodNameTextTranform == 'None'
                                                ? 'none'
                                                : 'lowercase',
                                        color: sectionproperties.prodNameColor,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.prodNameFontSize),
                                        textAlign: 'left',
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
                                        marginEnd: 10,
                                    },
                                ]}
                            >
                                {langdetect == 'en' ? fetchProductInfoQuery?.data?.data?.productinfo.name_en : fetchProductInfoQuery?.data?.data?.productinfo.name_ar}
                            </Text>
                            {sectionproperties.showShareButton == 'Show' && (
                                <TouchableOpacity
                                    style={[
                                        generalstyles.allcentered,
                                        {
                                            width: sectionproperties.sharebtn_bg == '#ffffff' ? 'auto' : 40,
                                            height: sectionproperties.sharebtn_bg == '#ffffff' ? 'auto' : 40,
                                            backgroundColor: sectionproperties.sharebtn_bg,
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.sharebtn_borderradius),
                                            marginBottom: 'auto',
                                        },
                                    ]}
                                    onPress={() => {
                                        onShare();
                                    }}
                                >
                                    <Feather name="share" color={sectionproperties.sharebtn_color} size={StyleParseToIntFuncContext(sectionproperties.sharebtn_fontSize)} />
                                </TouchableOpacity>
                            )}
                        </View>
                        {fetchProductInfoQuery?.data?.data?.productinfo?.productcanrate == 1 && (
                            <View
                                style={{
                                    width: '25%',
                                }}
                            >
                                {/* <StarRating
                                    disabled={true}
                                    maxStars={5}
                                    rating={fetchProductInfoQuery?.data?.data?.productinfo?.productoverallrate}
                                    starSize={17}
                                    fullStarColor="#FAB400"
                                    emptyStarColor="#FAB400"
                                /> */}
                                <Stars
                                    disabled={true}
                                    display={fetchProductInfoQuery?.data?.data?.productinfo?.productoverallrate}
                                    spacing={1}
                                    count={5}
                                    half={true}
                                    fullStar={<FontAwesome name={'star'} size={14} color="#FAB400" />}
                                    emptyStar={<FontAwesome name={'star-o'} size={14} color="#FAB400" />}
                                    halfStar={<FontAwesome name={'star-half-empty'} size={14} color="#FAB400" />}
                                />
                            </View>
                        )}

                        {sectionproperties.showSKU == 'Show' && (
                            <View style={{ marginTop: 5 }}>
                                <Text
                                    style={{
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.skuFontSize),
                                        color: sectionproperties.skuColor,
                                        fontFamily:
                                            sectionproperties.skuFontWeight == 300
                                                ? 'Poppins-Thin'
                                                : sectionproperties.skuFontWeight == 400
                                                ? 'Poppins-Light'
                                                : sectionproperties.skuFontWeight == 500
                                                ? 'Poppins-Regular'
                                                : sectionproperties.skuFontWeight == 600
                                                ? 'Poppins-Medium'
                                                : sectionproperties.skuFontWeight == 700
                                                ? 'Poppins-Semibold'
                                                : 'Poppins-Bold',
                                        textAlign: 'left',
                                    }}
                                >
                                    {langdetect == 'en' ? sectionproperties.skutitleEn : sectionproperties.skutitleAr}:{' '}
                                    <Text
                                        style={{
                                            fontFamily:
                                                sectionproperties.skuSecondaryFontWeight == 300
                                                    ? 'Poppins-Thin'
                                                    : sectionproperties.skuSecondaryFontWeight == 400
                                                    ? 'Poppins-Light'
                                                    : sectionproperties.skuSecondaryFontWeight == 500
                                                    ? 'Poppins-Regular'
                                                    : sectionproperties.skuSecondaryFontWeight == 600
                                                    ? 'Poppins-Medium'
                                                    : sectionproperties.skuSecondaryFontWeight == 700
                                                    ? 'Poppins-Semibold'
                                                    : 'Poppins-Bold',
                                        }}
                                    >
                                        {fetchProductInfoQuery.data.data.productinfo.sku}
                                    </Text>
                                </Text>
                            </View>
                        )}
                        {sectionproperties.prodPriceshow == 'Show' && fetchProductInfoQuery.data.data.productinfo.isproducttobesold == 1 && <ProductPricingHeader actions={props.actions} />}
                    </View>
                )}
                {sectionproperties.showpricesection == 'Show' && fetchProductInfoQuery.data.data.productinfo.isproducttobesold == 1 && (
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
                        <OverallTotalSection actions={props.actions} />

                        {/* <View style={[generalstyles.flexRow, { flex: 1 }]}>
                            <View style={[generalstyles.flexColumn]}>
                                <View style={[generalstyles.flexRow]}>
                                    <Text
                                        style={{
                                            color: sectionproperties.total_color,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.total_fontsize),
                                            fontFamily:
                                                sectionproperties.total_fontweight == 300
                                                    ? 'Poppins-Thin'
                                                    : sectionproperties.total_fontweight == 400
                                                    ? 'Poppins-Light'
                                                    : sectionproperties.total_fontweight == 500
                                                    ? 'Poppins-Regular'
                                                    : sectionproperties.total_fontweight == 600
                                                    ? 'Poppins-Medium'
                                                    : sectionproperties.total_fontweight == 700
                                                    ? 'Poppins-Semibold'
                                                    : 'Poppins-Bold',

                                            textTransform:
                                                sectionproperties.total_texttransform == 'Uppercase'
                                                    ? 'uppercase'
                                                    : sectionproperties.total_texttransform == 'Capitalize'
                                                    ? 'capitalize'
                                                    : sectionproperties.total_texttransform == 'None'
                                                    ? 'none'
                                                    : 'lowercase',
                                        }}
                                    >
                                        {lang.total}:{' '}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.prodpriceFontSize),
                                            color: sectionproperties.prodPriceColor,
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
                                            textAlign: 'left',
                                        }}
                                    >
                                        {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''}{' '}
                                        {fetchProductInfoQuery.data.data.productinfo.hassale == 0
                                            ? parseFloat(getprice_discountpriceprops('defaultprice', 1)).toFixed(2)
                                            : parseFloat(getprice_discountpriceprops('defaultsaleprice', 1)).toFixed(2)}{' '}
                                        {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                                    </Text>
                                </View>
                                {fetchProductInfoQuery.data.data.productinfo.hassale == 1 && (
                                    <View style={[generalstyles.flexRow]}>
                                        <Text
                                            style={{
                                                color: sectionproperties.total_color,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.total_fontsize),
                                                fontFamily:
                                                    sectionproperties.total_fontweight == 300
                                                        ? 'Poppins-Thin'
                                                        : sectionproperties.total_fontweight == 400
                                                        ? 'Poppins-Light'
                                                        : sectionproperties.total_fontweight == 500
                                                        ? 'Poppins-Regular'
                                                        : sectionproperties.total_fontweight == 600
                                                        ? 'Poppins-Medium'
                                                        : sectionproperties.total_fontweight == 700
                                                        ? 'Poppins-Semibold'
                                                        : 'Poppins-Bold',

                                                textTransform:
                                                    sectionproperties.total_texttransform == 'Uppercase'
                                                        ? 'uppercase'
                                                        : sectionproperties.total_texttransform == 'Capitalize'
                                                        ? 'capitalize'
                                                        : sectionproperties.total_texttransform == 'None'
                                                        ? 'none'
                                                        : 'lowercase',
                                            }}
                                        >
                                            {langdetect == 'en' ? 'Was' : 'قبل'}:{' '}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.prodsalepriceFontSize),
                                                color: sectionproperties.prodsalePriceColor,
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
                                                textAlign: 'left',
                                                textDecorationLine: 'line-through',
                                                textDecorationStyle: 'solid',
                                            }}
                                        >
                                            {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''} {parseFloat(getprice_discountpriceprops('defaultprice', 1)).toFixed(2)}{' '}
                                            {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View> */}
                    </View>
                )}
            </View>
        );
    }
    function ProductDescription() {
        return (
            <View
                style={{
                    width: '100%',
                    marginTop: 10,
                }}
            >
                {fetchProductInfoQuery?.data?.data?.productinfo?.product_videos?.length == 0 && (
                    <Text
                        style={[
                            {
                                marginTop: 5,
                                color: sectionproperties.prodCatColor,
                                fontSize: StyleParseToIntFuncContext(
                                    sectionproperties.prodCatFontSize != null && sectionproperties.prodCatFontSize != undefined ? sectionproperties.prodCatFontSize : 15,
                                ),
                                textAlign: 'left',
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
                            },
                        ]}
                    >
                        {langdetect == 'en' ? sectionproperties.descriptionContentEn : sectionproperties.descriptionContentAr}
                    </Text>
                )}
                {/* {showMoredesc == false && (
                    <RenderHtml
                        source={source}
                        tagsStyles={{
                            body: {
                                direction: langdetect == 'en' ? 'ltr' : 'rtl',
                                textAlign: 'left',
                            },
                            span: {
                                direction: langdetect == 'en' ? 'ltr' : 'rtl',
                                textAlign: 'left',
                            },
                        }}
                    />
                )} */}
                {/* {showMoredesc == true && ( */}
                <RenderHtml
                    source={source}
                    tagsStyles={{
                        body: {
                            direction: langdetect == 'en' ? 'ltr' : 'rtl',
                            textAlign: 'left',
                        },
                        span: {
                            direction: langdetect == 'en' ? 'ltr' : 'rtl',
                            textAlign: 'left',
                        },
                    }}
                />
                {/* )} */}
            </View>
        );
    }
    function renderProductDescription() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    paddingHorizontal: 15,
                    backgroundColor: sectionproperties.reservation_bgcolor,
                    marginTop: 15,
                }}
            >
                {fetchProductInfoQuery?.data?.data?.productinfo?.product_videos?.length != 0 && (
                    <SegmentedControlTab
                        values={[langdetect == 'en' ? sectionproperties.descriptionContentEn : sectionproperties.descriptionContentAr, langdetect == 'en' ? 'Videos' : 'سيب']}
                        selectedIndex={tabindex}
                        onTabPress={(index) => {
                            settabindex(index);
                        }}
                        borderRadius={0}
                        tabsContainerStyle={{ height: 35, backgroundColor: 'transparent', borderWidth: 0, marginBottom: 20 }}
                        tabStyle={{ backgroundColor: 'transparent', borderWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderRightColor: 'transparent', borderLeftColor: 'transparent' }}
                        activeTabStyle={{
                            backgroundColor: 'transparent',
                            borderLeftWidth: 0,
                            borderRightWidth: 0,
                            borderRightColor: 'transparent',
                            borderLeftColor: 'transparent',
                            borderBottomWidth: 2,
                            borderBottomColor: sectionproperties.prodCatColor,
                            marginTop: 2,
                            borderWidth: 0,
                        }}
                        firstTabStyle={{ borderLeftWidth: 0, borderRightWidth: 0 }}
                        lastTabStyle={{ borderLeftWidth: 0, borderRightWidth: 0 }}
                        tabTextStyle={{ color: '#000', fontSize: 13, fontFamily: 'Poppins-Light' }}
                        activeTabTextStyle={{ color: sectionproperties.prodCatColor, fontFamily: 'Poppins-Medium' }}
                    />
                )}
                {tabindex == 0 && (
                    <View>
                        {langdetect == 'en' &&
                            fetchProductInfoQuery?.data?.data?.productinfo?.description_en != null &&
                            fetchProductInfoQuery?.data?.data?.productinfo?.description_en?.length != 0 &&
                            ProductDescription()}
                        {langdetect == 'ar' &&
                            fetchProductInfoQuery?.data?.data?.productinfo?.description_ar != null &&
                            fetchProductInfoQuery?.data?.data?.productinfo?.description_ar?.length != 0 &&
                            ProductDescription()}
                        <View style={[generalstyles.allcentered, { width: '100%', marginBottom: 15 }]}>
                            {/* {langdetect == 'en'
                                ? fetchProductInfoQuery?.data?.data?.productinfo?.description_en?.length > 150 && (
                                      <Text style={[generalstyles.poppinsMedium, { textDecorationLine: 'underline' }]} onPress={() => setShowMoredesc(!showMoredesc)}>
                                          {showMoredesc ? lang.showless : lang.showmore}
                                      </Text>
                                  )
                                : fetchProductInfoQuery?.data?.data?.productinfo?.description_ar?.length > 150 && (
                                      <Text style={[generalstyles.poppinsMedium, { textDecorationLine: 'underline' }]} onPress={() => setShowMoredesc(!showMoredesc)}>
                                          {showMoredesc ? lang.showless : lang.showmore}
                                      </Text>
                                  )} */}
                        </View>
                    </View>
                )}
                {tabindex == 1 && (
                    <View style={[generalstyles.allcentered]}>
                        <FlatList
                            data={productVideos}
                            // numColumns={5}
                            vertical
                            scrollEnabled={false}
                            renderItem={({ item, index }) => {
                                const str = item?.videourl;
                                const vstr = item?.videourl;
                                const result = str.slice(str.indexOf('=') + 1);
                                const vresult = vstr.slice(str.indexOf('m/') + 2);
                                return (
                                    <View
                                        style={[
                                            {
                                                marginBottom: 10,
                                                padding: 2,
                                                position: 'relative',
                                                width: SIZES.width,
                                            },
                                        ]}
                                    >
                                        <TouchableOpacity
                                            style={[
                                                generalstyles.allcentered,
                                                generalstyles.shadow,
                                                {
                                                    width: 50,
                                                    height: 50,
                                                    backgroundColor: 'white',
                                                    borderRadius: 100,
                                                },
                                            ]}
                                            onPress={() => {
                                                var temparr = [...productVideos];
                                                temparr[index].linkclicked = true;
                                                setproductVideos([...temparr]);
                                            }}
                                        >
                                            {item.platform == 'youtube' && (
                                                <AntDesign
                                                    name="youtube"
                                                    size={19}
                                                    style={{
                                                        color: 'red',
                                                    }}
                                                />
                                            )}
                                            {item.platform == 'vimeo' && (
                                                <Entypo
                                                    name="vimeo"
                                                    size={19}
                                                    style={{
                                                        color: '#0caeef',
                                                    }}
                                                />
                                            )}
                                        </TouchableOpacity>
                                        {item.linkclicked == true && (
                                            <View
                                                style={[
                                                    // generalstyles.allcentered,
                                                    {
                                                        width: '100%',
                                                        height: 300,
                                                        marginTop: 20,
                                                    },
                                                ]}
                                            >
                                                {item.platform == 'youtube' && <YoutubePlayer height={300} play={playing} videoId={result} onChangeState={onStateChange} />}
                                                {item.platform == 'vimeo' && (
                                                    // <WebView
                                                    //     style={{ width: '100%', height: '100%' }}
                                                    //     javaScriptEnabled={true}
                                                    //     domStorageEnabled={false}
                                                    //     source={{ uri: item?.videourl }}
                                                    //     allowsFullscreenVideo={true}
                                                    //     allowfullscreen="allowfullscreen"
                                                    //     scalesPageToFit={true}
                                                    // />

                                                    <WebView
                                                        style={{ height: 530, width: '100%' }}
                                                        // onError={onError}
                                                        allowsFullscreenVideo
                                                        scrollEnabled={false}
                                                        automaticallyAdjustContentInsets
                                                        source={{
                                                            html: `
                                                        <html>
                                                          <body>
                                                            <iframe src="https://player.vimeo.com/video/${vresult}" width="100%" height="530px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                                                            <script src="https://player.vimeo.com/api/player.js"></script>
                                                          </body>
                                                        </html>
                                                      `,
                                                        }}
                                                    />
                                                )}
                                            </View>
                                        )}
                                    </View>
                                );
                            }}
                        />
                    </View>
                )}
            </View>
        );
    }
    function cartBtn() {
        return (
            <View
                style={[
                    generalstyles.allcentered,
                    {
                        width: '100%',
                        backgroundColor: sectionproperties.reservation_bgcolor,
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        marginTop: 15,
                        display: sectionproperties.cartBtnShow == 'Hide' && sectionproperties.quantitybtn_show == 'Hide' ? 'none' : 'flex',
                        flexDirection: sectionproperties.cartbtnalone == 'Besides Other Buttons' ? 'row' : 'column',
                    },
                ]}
            >
                {sectionproperties.quantitybtn_show == 'Show' && fetchProductInfoQuery?.data?.data?.productinfo?.isproducthasquantitychange == 1 && (
                    <View style={{ alignItems: 'flex-start', justifyContent: 'center', flex: 1 }}>
                        <Text
                            style={[
                                {
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.form_labelfontsize),
                                    color: sectionproperties.form_labelcolor,
                                    fontFamily:
                                        sectionproperties.form_labelfontweight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.form_labelfontweight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.form_labelfontweight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.form_labelfontweight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.form_labelfontweight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                    textAlign: 'left',
                                },
                            ]}
                        >
                            {langdetect == 'en' ? 'Number of days' : 'عدد الايام'}: {addtocardpayloadobj.quantity}
                        </Text>
                    </View>
                )}
                {sectionproperties.cartBtnShow == 'Show' && (
                    <TouchableOpacity
                        style={{
                            marginStart: 5,
                            width: StyleParseToIntFuncContext(sectionproperties.cartBtnWidth) + '%',
                            backgroundColor: sectionproperties.cartBtnbgColor,
                            alignItems: 'center',
                            height: 42,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            borderRadius: StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius),
                            borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth, '', true),
                            borderColor: sectionproperties.cartbtnbordercolor,
                        }}
                        onPress={() => {
                            // addtocartfunc();
                            var runfunc = false;
                            if (fetchProductInfoQuery?.data?.data?.productinfo?.serviceinfo?.scheduletype == 'days') {
                                if (addtocardpayloadobj.from.length == 0 || addtocardpayloadobj.to.length == 0 || addtocardpayloadobj.quantity == 0) {
                                    showUpTopNotificationBarContext('Please choose date(s)', 'orange');
                                } else {
                                    runfunc = true;
                                }
                            } else if (fetchProductInfoQuery?.data?.data?.productinfo?.serviceinfo?.scheduletype == 'minutes') {
                                if (addtocardpayloadobj.date.length == 0 || addtocardpayloadobj.time.length == 0) {
                                    showUpTopNotificationBarContext('Please choose time', 'orange');
                                } else {
                                    runfunc = true;
                                }
                            }
                            if (runfunc) {
                                addtocartfunc();
                            }
                        }}
                        disabled={AddtoCartMutationContext.isLoading ? true : false}
                    >
                        {!AddtoCartMutationContext.isLoading && (
                            <>
                                {sectionproperties.carticonstyle == 'Shopping cart 1' && sectionproperties.cartBtn_iconFontSize != 0 && (
                                    <MaterialCommunityIcons
                                        name="cart-outline"
                                        size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                        style={{
                                            color: sectionproperties.cart_iconcolor,
                                        }}
                                    />
                                )}
                                {sectionproperties.carticonstyle == 'Shopping cart 2' && sectionproperties.cartBtn_iconFontSize != 0 && (
                                    <Image
                                        source={icons.cart2}
                                        resizeMode="cover"
                                        style={{
                                            width: StyleParseToIntFuncContext(
                                                sectionproperties.cartBtn_iconFontSize != null && sectionproperties.cartBtn_iconFontSize != undefined ? sectionproperties.cartBtn_iconFontSize : 0,
                                            ),
                                            height: StyleParseToIntFuncContext(
                                                sectionproperties.cartBtn_iconFontSize != null && sectionproperties.cartBtn_iconFontSize != undefined ? sectionproperties.cartBtn_iconFontSize : 0,
                                            ),
                                            tintColor: sectionproperties.cart_iconcolor,
                                        }}
                                    />
                                )}
                                {sectionproperties.carticonstyle == 'Shopping bag 1' && sectionproperties.cartBtn_iconFontSize != 0 && (
                                    <Feather
                                        name="shopping-bag"
                                        size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                        style={{
                                            color: sectionproperties.cart_iconcolor,
                                        }}
                                    />
                                )}
                                {sectionproperties.carticonstyle == 'Shopping bag 2' && sectionproperties.cartBtn_iconFontSize != 0 && (
                                    <SimpleLineIcons
                                        name="handbag"
                                        size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                        style={{
                                            color: sectionproperties.cart_iconcolor,
                                        }}
                                    />
                                )}
                                {sectionproperties.carticonstyle == 'Shopping bag 3' && sectionproperties.cartBtn_iconFontSize != 0 && (
                                    <FontAwesome5
                                        name="shopping-bag"
                                        size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                        style={{
                                            color: sectionproperties.cart_iconcolor,
                                        }}
                                    />
                                )}
                                {sectionproperties.carticonstyle == 'Shopping bag 4' && sectionproperties.cartBtn_iconFontSize != 0 && (
                                    <SimpleLineIcons
                                        name="bag"
                                        size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                        style={{
                                            color: sectionproperties.cart_iconcolor,
                                        }}
                                    />
                                )}
                                {sectionproperties.carticonstyle == 'Calendar 1' && sectionproperties.cartBtn_iconFontSize != 0 && (
                                    <AntDesign
                                        name="calendar"
                                        size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                        style={{
                                            color: sectionproperties.cart_iconcolor,
                                        }}
                                    />
                                )}
                                <Text
                                    style={{
                                        marginStart: sectionproperties.cartBtn_iconFontSize != 0 ? 10 : 0,
                                        color: sectionproperties.cartBtnTextcolor,
                                        fontFamily:
                                            sectionproperties.cartBtnTextfontweight == 300
                                                ? 'Poppins-Thin'
                                                : sectionproperties.cartBtnTextfontweight == 400
                                                ? 'Poppins-Light'
                                                : sectionproperties.cartBtnTextfontweight == 500
                                                ? 'Poppins-Regular'
                                                : sectionproperties.cartBtnTextfontweight == 600
                                                ? 'Poppins-Medium'
                                                : sectionproperties.cartBtnTextfontweight == 700
                                                ? 'Poppins-Semibold'
                                                : 'Poppins-Bold',
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.cartBtnTextfontsize),
                                        textTransform:
                                            sectionproperties.cartBtnTexttransform == 'Uppercase'
                                                ? 'uppercase'
                                                : sectionproperties.cartBtnTexttransform == 'Capitalize'
                                                ? 'capitalize'
                                                : sectionproperties.cartBtnTexttransform == 'None'
                                                ? 'none'
                                                : 'lowercase',
                                    }}
                                >
                                    {langdetect == 'en'
                                        ? fetchProductInfoQuery?.data?.data?.productinfo?.productactionbuttontext_en
                                        : fetchProductInfoQuery?.data?.data?.productinfo?.productactionbuttontext_ar}
                                    {/* {langdetect == 'en' ? sectionproperties.cartBtnContentenglish : sectionproperties.cartBtnContentarabic} */}
                                </Text>
                            </>
                        )}
                        {AddtoCartMutationContext.isLoading && (
                            <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <SpinnerButton
                                    buttonStyle={{ width: 30, height: 30 }}
                                    isLoading={true}
                                    indicatorCount={10}
                                    spinnerType={'MaterialIndicator'}
                                    spinnerColor={sectionproperties.cartBtnTextcolor}
                                ></SpinnerButton>
                            </View>
                        )}
                    </TouchableOpacity>
                )}
                {sectionproperties.storeinfostyle == 'Style 2' && (
                    <TouchableOpacity
                        style={{
                            marginStart: 5,
                            width: StyleParseToIntFuncContext(sectionproperties.cartBtnWidth) + '%',
                            backgroundColor: sectionproperties.cartBtnbgColor,
                            alignItems: 'center',
                            height: 42,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            borderRadius: StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius),
                            borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth, '', true),
                            borderColor: sectionproperties.cartbtnbordercolor,
                            marginTop: 15,
                        }}
                        onPress={() => {
                            Linking.openURL('tel:' + fetchAuthorizationQueryContext?.data?.data?.CuContactphonenumber);
                        }}
                    >
                        <Text
                            style={{
                                marginStart: sectionproperties.cartBtn_iconFontSize != 0 ? 10 : 0,
                                color: sectionproperties.cartBtnTextcolor,
                                fontFamily:
                                    sectionproperties.cartBtnTextfontweight == 300
                                        ? 'Poppins-Thin'
                                        : sectionproperties.cartBtnTextfontweight == 400
                                        ? 'Poppins-Light'
                                        : sectionproperties.cartBtnTextfontweight == 500
                                        ? 'Poppins-Regular'
                                        : sectionproperties.cartBtnTextfontweight == 600
                                        ? 'Poppins-Medium'
                                        : sectionproperties.cartBtnTextfontweight == 700
                                        ? 'Poppins-Semibold'
                                        : 'Poppins-Bold',
                                fontSize: StyleParseToIntFuncContext(sectionproperties.cartBtnTextfontsize),
                                textTransform:
                                    sectionproperties.cartBtnTexttransform == 'Uppercase'
                                        ? 'uppercase'
                                        : sectionproperties.cartBtnTexttransform == 'Capitalize'
                                        ? 'capitalize'
                                        : sectionproperties.cartBtnTexttransform == 'None'
                                        ? 'none'
                                        : 'lowercase',
                            }}
                        >
                            {langdetect == 'en' ? sectionproperties.phonetitle_en : sectionproperties.phonetitle_ar}
                        </Text>
                    </TouchableOpacity>
                )}
                {sectionproperties.storeinfostyle == 'Style 2' && (
                    <TouchableOpacity
                        style={{
                            marginStart: 5,
                            width: StyleParseToIntFuncContext(sectionproperties.cartBtnWidth) + '%',
                            backgroundColor: sectionproperties.cartBtnbgColor,
                            alignItems: 'center',
                            height: 42,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            borderRadius: StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius),
                            borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth, '', true),
                            borderColor: sectionproperties.cartbtnbordercolor,
                            marginTop: 15,
                        }}
                        onPress={() => {
                            Linking.openURL('whatsapp://send?text=&phone=' + fetchAuthorizationQueryContext?.data?.data?.instinfo?.whatsappnumber);
                        }}
                    >
                        <Text
                            style={{
                                marginStart: sectionproperties.cartBtn_iconFontSize != 0 ? 10 : 0,
                                color: sectionproperties.cartBtnTextcolor,
                                fontFamily:
                                    sectionproperties.cartBtnTextfontweight == 300
                                        ? 'Poppins-Thin'
                                        : sectionproperties.cartBtnTextfontweight == 400
                                        ? 'Poppins-Light'
                                        : sectionproperties.cartBtnTextfontweight == 500
                                        ? 'Poppins-Regular'
                                        : sectionproperties.cartBtnTextfontweight == 600
                                        ? 'Poppins-Medium'
                                        : sectionproperties.cartBtnTextfontweight == 700
                                        ? 'Poppins-Semibold'
                                        : 'Poppins-Bold',
                                fontSize: StyleParseToIntFuncContext(sectionproperties.cartBtnTextfontsize),
                                textTransform:
                                    sectionproperties.cartBtnTexttransform == 'Uppercase'
                                        ? 'uppercase'
                                        : sectionproperties.cartBtnTexttransform == 'Capitalize'
                                        ? 'capitalize'
                                        : sectionproperties.cartBtnTexttransform == 'None'
                                        ? 'none'
                                        : 'lowercase',
                            }}
                        >
                            {langdetect == 'en' ? 'WhatsApp' : 'WhatsApp'}
                        </Text>
                    </TouchableOpacity>
                )}
                {sectionproperties.btnposition == 'Bottom' && (
                    <TouchableOpacity
                        style={{
                            marginStart: sectionproperties.cartbtnalone == 'Besides Other Buttons' ? 5 : 0,
                            width: StyleParseToIntFuncContext(sectionproperties.favBtnWidth) + '%',
                            alignItems: 'center',
                            height: StyleParseToIntFuncContext(sectionproperties.favBtnHeight),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            backgroundColor: IsFavItemProps == true ? sectionproperties.activebgcolor : sectionproperties.favBtnbgColor,
                            borderRadius: StyleParseToIntFuncContext(sectionproperties.fav_btn_borderBottomLeftRadius, '', true),
                            borderWidth: StyleParseToIntFuncContext(sectionproperties.favbtnborderwidth, '', true),
                            borderColor: sectionproperties.favbtnbordercolor,
                            marginVertical: sectionproperties.cartbtnalone == 'Besides Other Buttons' ? 0 : 15,
                        }}
                        onPress={() => {
                            setIsFavItemProps(!IsFavItemProps);
                            addtofavoritescontext(ProductInfoIdContext);
                        }}
                    >
                        <Text
                            style={{
                                marginStart: 10,
                                color: IsFavItemProps == false ? sectionproperties.favBtniconcolor : sectionproperties.activefaviconcolor,
                                fontFamily:
                                    sectionproperties.cartBtnTextfontweight == 300
                                        ? 'Poppins-Thin'
                                        : sectionproperties.cartBtnTextfontweight == 400
                                        ? 'Poppins-Light'
                                        : sectionproperties.cartBtnTextfontweight == 500
                                        ? 'Poppins-Regular'
                                        : sectionproperties.cartBtnTextfontweight == 600
                                        ? 'Poppins-Medium'
                                        : sectionproperties.cartBtnTextfontweight == 700
                                        ? 'Poppins-Semibold'
                                        : 'Poppins-Bold',
                                fontSize: StyleParseToIntFuncContext(sectionproperties.cartBtnTextfontsize),
                            }}
                        >
                            {IsFavItemProps == false
                                ? langdetect == 'en'
                                    ? sectionproperties.favbtncontent_en
                                    : sectionproperties.favbtncontent_ar
                                : langdetect == 'en'
                                ? sectionproperties.favbtnaddedcontent_en
                                : sectionproperties.favbtnaddedcontent_ar}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }
    return (
        <View style={{ width: '100%' }}>
            {renderProductInfo()}
            {sectionproperties.showpricinglist == 'Show' && getQuantityCondition()}
            {fetchProductInfoQuery.data.data.productinfo.hasvariants == 1 && <Variantoptions actions={props.actions} />}
            {sectionproperties.showextrafield == 'Show' && <ProductExtraFields actions={props.actions} />}

            {fetchProductInfoQuery?.data?.data?.productinfo?.serviceinfo?.scheduletype == 'days' && fetchProductInfoQuery.data.data.productinfo.isproducttobesold == 1 && (
                <View
                    style={[
                        generalstyles.flexColumn,
                        {
                            width: '100%',
                            display: 'flex',
                            marginTop: 15,
                            flexDirection: 'row',
                            flex: 1,
                            flexDirection: 'column',
                            padding: 10,
                            paddingHorizontal: 15,
                            backgroundColor: sectionproperties.reservation_bgcolor,
                        },
                    ]}
                >
                    <View style={{ marginBottom: 25 }}>
                        <Text
                            style={[
                                {
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.form_labelfontsize),
                                    color: sectionproperties.form_labelcolor,
                                    fontFamily:
                                        sectionproperties.form_labelfontweight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.form_labelfontweight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.form_labelfontweight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.form_labelfontweight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.form_labelfontweight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                    marginBottom: 10,

                                    textAlign: 'left',
                                },
                            ]}
                        >
                            {lang.from}
                        </Text>
                        <TouchableOpacity
                            style={[
                                generalstyles.allcentered,

                                {
                                    width: '90%',
                                    height: 40,
                                    marginEnd: 'auto',
                                    marginStart: 'auto',
                                    borderColor: sectionproperties.inputfieldborderColor,
                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius),
                                    backgroundColor: sectionproperties.input_bgcolor,
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                },
                            ]}
                            onPress={() => {
                                setshowFromCalendar(true);
                            }}
                        >
                            <Text
                                style={[generalstyles.poppinsMedium, generalstyles.allcentered, { width: '100%', textAlign: 'center' }]}
                                underlineColorAndroid="transparent"
                                placeholder="dd/mm/yyyy"
                                placeholderTextColor="black"
                                autoCapitalize="none"
                                editable={false}
                            >
                                {fromDate}
                            </Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={showFromCalendar}
                            mode="date"
                            minimumDate={new Date(fetchProductInfoQuery?.data?.data?.productinfo?.serviceinfo?.reservationstarts)}
                            maximumDate={new Date(fetchProductInfoQuery?.data?.data?.productinfo?.serviceinfo?.reservationends)}
                            onCancel={() => {
                                setshowFromCalendar(false);
                            }}
                            onConfirm={(date) => {
                                setshowopencalendar(false);
                                var myDate = date;
                                var day = myDate.getDate();
                                var month = myDate.getMonth();
                                var year = myDate.getFullYear();
                                month = month + 1;
                                var dateonly = year + '-' + month + '-' + day;
                                setaddtocardpayloadobj({ ...addtocardpayloadobj, from: dateonly });
                                setfromDate(dateonly);
                                setshowFromCalendar(false);
                            }}
                            pickerContainerStyleIOS={{
                                backgroundColor: 'white',
                            }}
                            textColor={'black'}
                        />
                    </View>
                    <View style={{ marginBottom: 25 }}>
                        <Text
                            style={[
                                {
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.form_labelfontsize),
                                    color: sectionproperties.form_labelcolor,
                                    fontFamily:
                                        sectionproperties.form_labelfontweight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.form_labelfontweight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.form_labelfontweight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.form_labelfontweight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.form_labelfontweight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                    marginBottom: 10,
                                    textAlign: 'left',
                                },
                            ]}
                        >
                            {lang.to}
                        </Text>
                        <TouchableOpacity
                            style={[
                                generalstyles.allcentered,

                                {
                                    width: '90%',
                                    height: 40,
                                    marginEnd: 'auto',
                                    marginStart: 'auto',
                                    borderColor: sectionproperties.inputfieldborderColor,
                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius),
                                    backgroundColor: sectionproperties.input_bgcolor,
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                },
                            ]}
                            onPress={() => {
                                setshowToCalendar(true);
                            }}
                        >
                            <Text
                                style={[generalstyles.poppinsMedium, generalstyles.allcentered, { width: '100%', textAlign: 'center' }]}
                                underlineColorAndroid="transparent"
                                placeholder="dd/mm/yyyy"
                                placeholderTextColor="black"
                                autoCapitalize="none"
                                editable={false}
                            >
                                {toDate}
                            </Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={showToCalendar}
                            mode="date"
                            minimumDate={new Date(fetchProductInfoQuery?.data?.data?.productinfo?.serviceinfo?.reservationstarts)}
                            maximumDate={new Date(fetchProductInfoQuery?.data?.data?.productinfo?.serviceinfo?.reservationends)}
                            onCancel={() => {
                                setshowToCalendar(false);
                            }}
                            onConfirm={(date) => {
                                setshowopencalendar(false);
                                var myDate = date;
                                var day = myDate.getDate();
                                var month = myDate.getMonth();
                                var year = myDate.getFullYear();
                                month = month + 1;
                                var dateonly = year + '-' + month + '-' + day;
                                setaddtocardpayloadobj({ ...addtocardpayloadobj, to: dateonly });
                                settoDate(dateonly);
                                setshowToCalendar(false);
                            }}
                            pickerContainerStyleIOS={{
                                backgroundColor: 'white',
                            }}
                            textColor={'black'}
                        />
                    </View>
                </View>
            )}
            {fetchProductInfoQuery?.data?.data?.productinfo?.serviceinfo?.scheduletype == 'minutes' && fetchProductInfoQuery.data.data.productinfo.isproducttobesold == 1 && (
                <View
                    style={{
                        display: 'flex',
                        marginTop: 10,
                        flexDirection: 'row',
                        flex: 1,
                        flexDirection: 'column',
                        padding: 10,
                        paddingHorizontal: 15,
                        backgroundColor: sectionproperties.reservation_bgcolor,
                    }}
                >
                    <View style={{ marginBottom: 25 }}>
                        <Text
                            style={[
                                {
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.form_labelfontsize),
                                    color: sectionproperties.form_labelcolor,
                                    fontFamily:
                                        sectionproperties.form_labelfontweight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.form_labelfontweight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.form_labelfontweight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.form_labelfontweight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.form_labelfontweight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                    marginBottom: 10,
                                    textAlign: 'left',
                                },
                            ]}
                        >
                            {lang.reservationdate}
                        </Text>
                        <TouchableOpacity
                            style={[
                                generalstyles.allcentered,

                                {
                                    width: '90%',
                                    height: 40,
                                    marginEnd: 'auto',
                                    marginStart: 'auto',
                                    borderColor: sectionproperties.inputfieldborderColor,
                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius),
                                    backgroundColor: sectionproperties.input_bgcolor,
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                },
                            ]}
                            onPress={choosedateopencalendar}
                        >
                            <Text
                                style={[generalstyles.poppinsMedium, generalstyles.allcentered, { width: '100%', textAlign: 'center', color: sectionproperties.inputfieldcolor }]}
                                underlineColorAndroid="transparent"
                                placeholder="dd/mm/yyyy"
                                placeholderTextColor={sectionproperties.inputfieldcolor}
                                autoCapitalize="none"
                                editable={false}
                            >
                                {timepicked}
                            </Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={showopencalendar}
                            mode="date"
                            value={addtocardpayloadobj.date?.toString()}
                            minimumDate={new Date(fetchProductInfoQuery.data.data.productinfo.serviceinfo.reservationstarts)}
                            maximumDate={new Date(fetchProductInfoQuery.data.data.productinfo.serviceinfo.reservationends)}
                            onCancel={() => {
                                setshowopencalendar(false);
                            }}
                            onConfirm={(date) => {
                                setshowopencalendar(false);
                                var myDate = date;
                                var day = myDate.getDate();
                                var month = myDate.getMonth();
                                var year = myDate.getFullYear();
                                month = month + 1;
                                var dateonly = year + '-' + month + '-' + day;
                                setaddtocardpayloadobj({ ...addtocardpayloadobj, date: dateonly });
                                setcurrentmutatestate('/fetchserviceslots');
                                GeneralAPIMutationContext.mutate({
                                    endpointurl: '/fetchserviceslots',
                                    productid: fetchProductInfoQuery.data.data.productinfo.productid,
                                    reqdate: dateonly,
                                    mutateSuccesscallback: (data, variables) => {
                                        setslots(data.data.slots);
                                    },
                                });
                                settimepicked(dateonly);
                            }}
                            pickerContainerStyleIOS={{
                                backgroundColor: 'white',
                            }}
                            textColor={'black'}
                        />
                    </View>
                    {GeneralAPIMutationContext.isLoading && GeneralAPIMutationContext.variables.endpointurl == '/fetchserviceslots' && (
                        <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <SpinnerButton buttonStyle={{ width: 30, height: 30 }} isLoading={true} indicatorCount={10} spinnerType={'MaterialIndicator'} spinnerColor={'#ccc'}></SpinnerButton>
                        </View>
                    )}
                    {slots.length != 0 && (
                        <View style={{ marginBottom: 15 }}>
                            <Text
                                style={[
                                    {
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.time_labelFontsize),
                                        color: sectionproperties.form_labelcolor,
                                        fontFamily:
                                            sectionproperties.time_labelFonweight == 300
                                                ? 'Poppins-Thin'
                                                : sectionproperties.time_labelFonweight == 400
                                                ? 'Poppins-Light'
                                                : sectionproperties.time_labelFonweight == 500
                                                ? 'Poppins-Regular'
                                                : sectionproperties.time_labelFonweight == 600
                                                ? 'Poppins-Medium'
                                                : sectionproperties.time_labelFonweight == 700
                                                ? 'Poppins-Semibold'
                                                : 'Poppins-Bold',

                                        marginBottom: 10,
                                        textAlign: 'left',
                                    },
                                ]}
                            >
                                {lang.choosetime}
                            </Text>
                            <FlatList
                                style={{ marginHorizontal: 5 }}
                                data={slots}
                                contentContainerStyle={{ paddingBottom: SIZES.padding * 0.8 }}
                                numColumns={3}
                                scrollEnabled={false}
                                renderItem={({ item, index }) => {
                                    var ischoosed = false;
                                    if (item.slot == addtocardpayloadobj.time) {
                                        ischoosed = true;
                                    }
                                    const str = item?.slot;
                                    const result = str.substring(0, 5);
                                    var slot12hr = item?.slot;
                                    const slotsubstr = slot12hr?.substring(0, 2);
                                    const slotsubstr2 = slot12hr?.substring(2, 5);
                                    if (slotsubstr == '13') {
                                        slot12hr = '01' + slotsubstr2 + ' PM';
                                    } else if (slotsubstr == '14') {
                                        slot12hr = '02' + slotsubstr2 + ' PM';
                                    } else if (slotsubstr == '15') {
                                        slot12hr = '03' + slotsubstr2 + ' PM';
                                    } else if (slotsubstr == '16') {
                                        slot12hr = '04' + slotsubstr2 + ' PM';
                                    } else if (slotsubstr == '17') {
                                        slot12hr = '05' + slotsubstr2 + ' PM';
                                    } else if (slotsubstr == '18') {
                                        slot12hr = '06' + slotsubstr2 + ' PM';
                                    } else if (slotsubstr == '19') {
                                        slot12hr = '07' + slotsubstr2 + ' PM';
                                    } else if (slotsubstr == '20') {
                                        slot12hr = '08' + slotsubstr2 + ' PM';
                                    } else if (slotsubstr == '21') {
                                        slot12hr = '09' + slotsubstr2 + ' PM';
                                    } else if (slotsubstr == '22') {
                                        slot12hr = '10' + slotsubstr2 + ' PM';
                                    } else if (slotsubstr == '23') {
                                        slot12hr = '11' + slotsubstr2 + ' PM';
                                    } else if (slotsubstr == '24') {
                                        slot12hr = '12' + slotsubstr2 + ' AM';
                                    } else if (slotsubstr == '00') {
                                        slot12hr = '12' + slotsubstr2 + ' AM';
                                    } else if (slotsubstr == '12') {
                                        slot12hr = '12' + slotsubstr2 + ' PM';
                                    } else {
                                        slot12hr = slotsubstr + slotsubstr2 + ' AM';
                                    }
                                    if (item.available) {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setaddtocardpayloadobj({ ...addtocardpayloadobj, time: item.slot });
                                                }}
                                                style={[
                                                    generalstyles.flexColumn,
                                                    generalstyles.allcentered,
                                                    {
                                                        backgroundColor: ischoosed ? sectionproperties.time_activebgcolor : sectionproperties.time_bgcolor,
                                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.time_borderwidth, '', true),
                                                        borderColor: ischoosed ? sectionproperties.time_timeactiveColor : sectionproperties.time_borderColor,
                                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.time_borderRadius),
                                                        marginEnd: 10,
                                                        marginBottom: 10,
                                                        width: SIZES.width / 3 - 20,
                                                        padding: 10,
                                                    },
                                                ]}
                                            >
                                                <View style={{ marginBottom: 'auto' }}>
                                                    <Text
                                                        style={[
                                                            {
                                                                color: ischoosed ? sectionproperties.time_timeactiveColor : sectionproperties.time_timeColor,
                                                                fontSize: StyleParseToIntFuncContext(sectionproperties.time_timeFontsize),
                                                                fontFamily:
                                                                    sectionproperties.time_timeFontweight == 300
                                                                        ? 'Poppins-Thin'
                                                                        : sectionproperties.time_timeFontweight == 400
                                                                        ? 'Poppins-Light'
                                                                        : sectionproperties.time_timeFontweight == 500
                                                                        ? 'Poppins-Regular'
                                                                        : sectionproperties.time_timeFontweight == 600
                                                                        ? 'Poppins-Medium'
                                                                        : sectionproperties.time_timeFontweight == 700
                                                                        ? 'Poppins-Semibold'
                                                                        : 'Poppins-Bold',
                                                            },
                                                        ]}
                                                    >
                                                        {sectionproperties.timeformat == '24 HOUR CLOCK' ? result : slot12hr}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    } else {
                                        return (
                                            <View
                                                onPress={() => {
                                                    setaddtocardpayloadobj({ ...addtocardpayloadobj, time: item.slot });
                                                }}
                                                style={[
                                                    generalstyles.flexColumn,
                                                    generalstyles.allcentered,
                                                    {
                                                        backgroundColor: '#ccc',
                                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.time_borderwidth, '', true),
                                                        borderColor: ischoosed ? sectionproperties.time_timeactiveColor : sectionproperties.time_borderColor,
                                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.time_borderRadius),
                                                        marginEnd: 10,
                                                        marginBottom: 10,
                                                        width: SIZES.width / 3 - 20,
                                                        padding: 10,
                                                    },
                                                ]}
                                            >
                                                <View style={{ marginBottom: 'auto' }}>
                                                    <Text
                                                        style={[
                                                            {
                                                                color: ischoosed ? sectionproperties.time_timeactiveColor : sectionproperties.time_timeColor,
                                                                fontSize: StyleParseToIntFuncContext(sectionproperties.time_timeFontsize),
                                                                fontFamily:
                                                                    sectionproperties.time_timeFontweight == 300
                                                                        ? 'Poppins-Thin'
                                                                        : sectionproperties.time_timeFontweight == 400
                                                                        ? 'Poppins-Light'
                                                                        : sectionproperties.time_timeFontweight == 500
                                                                        ? 'Poppins-Regular'
                                                                        : sectionproperties.time_timeFontweight == 600
                                                                        ? 'Poppins-Medium'
                                                                        : sectionproperties.time_timeFontweight == 700
                                                                        ? 'Poppins-Semibold'
                                                                        : 'Poppins-Bold',
                                                            },
                                                        ]}
                                                    >
                                                        {result}
                                                    </Text>
                                                </View>
                                            </View>
                                        );
                                    }
                                }}
                            />
                        </View>
                    )}
                </View>
            )}
            {sectionproperties.productInformationType == 'Product/Service Information' && fetchProductInfoQuery.data.data.productinfo.isproducttobesold == 1 && <>{cartBtn()}</>}

            {langdetect == 'en' &&
                fetchProductInfoQuery?.data?.data?.productinfo?.description_en != null &&
                fetchProductInfoQuery?.data?.data?.productinfo?.description_en?.length != 0 &&
                renderProductDescription()}
            {langdetect == 'ar' &&
                fetchProductInfoQuery?.data?.data?.productinfo?.description_ar != null &&
                fetchProductInfoQuery?.data?.data?.productinfo?.description_ar?.length != 0 &&
                renderProductDescription()}

            {getreviewsfeedbackview()}

            {sectionproperties.storeinfostyle == 'Style 1' && renderStoreInfo()}
            {sectionproperties.showPolicy == 'Show' && sectionproperties.productInformationType == 'Product/Service Information' && (
                <>
                    {returnpolicyobj('Refund Policy')?.policysummary_en != null && langdetect == 'en' && UpperPolicy()}
                    {returnpolicyobj('Refund Policy')?.policysummary_ar != null && langdetect == 'ar' && UpperPolicy()}
                    {returnpolicyobj('Shipping Policy')?.policysummary_en != null && langdetect == 'en' && LowerPolicy()}
                    {returnpolicyobj('Shipping Policy')?.policysummary_ar != null && langdetect == 'ar' && LowerPolicy()}
                </>
            )}
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <ImageViewer
                        imageUrls={props.actions.ImagesGallery}
                        footerContainerStyle={{ width: '100%', height: '10%' }}
                        renderHeader={() => {
                            return (
                                <TouchableOpacity
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                        position: 'absolute',
                                        top: 55,
                                        width: '100%',
                                        justifyContent: 'flex-end',
                                        zIndex: 10000,
                                        // left: 20,
                                    }}
                                    onPress={() => {
                                        // alert('sd');
                                        setModalVisible(false);
                                    }}
                                >
                                    <TouchableOpacity
                                        style={[
                                            generalstyles.allcentered,
                                            {
                                                marginStart: 'auto',
                                                margin: 10,
                                            },
                                        ]}
                                    >
                                        <AntDesign name="close" size={20} color={'white'} />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </Modal>
            </View>
        </View>
    );
};

export default Service_itemtype;

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        // borderRadius: 20,
        // padding: 35,
        width: SIZES.width,
        height: SIZES.height - 80,
    },
});
