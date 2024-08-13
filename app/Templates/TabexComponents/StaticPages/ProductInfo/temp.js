import React, { useState, useContext, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Image, Linking, Share, Platform, Modal, FlatList } from 'react-native';
import { SIZES, icons, images } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { MaterialCommunityIcons, SimpleLineIcons, Feather, AntDesign, FontAwesome5 } from 'react-native-vector-icons';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import RenderHtml from 'react-native-render-html';
import SpinnerButton from 'react-native-spinner-button';
import { useSelector } from 'react-redux';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { useQueryClient } from 'react-query';
// import Carousel, { Pagination } from 'react-native-snap-carousel';
import { urlEndpoint } from '../../../../config/imagekit';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import ImageViewer from 'react-native-image-zoom-viewer';
import { MaterialIcons } from '@expo/vector-icons';
import ProductExtraFields from './ProductExtraFields';
import Variantoptions from './Variantoptions';
import ProductPricingHeader from './ProductPricingHeader';
import { ImageComponent } from '../../../ImageComponent';
// import StarRating from 'react-native-star-rating';

const Product_itemtype = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    // const carouselRef = useRef();
    const navigation = useNavigation();
    const queryClient = useQueryClient();
    const { lang, langdetect } = useContext(LanguageContext);
    const { showUpTopNotificationBarContext, fetchAuthorizationQueryContext } = useContext(FetchingContext);
    const { StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    // const [sectionproperties, setsectionproperties] = useState('');
    const [IsFavItemProps, setIsFavItemProps] = useState(props.Product_itemtypeprops.IsFavItemProps);
    const [fetchProductInfoQuery, setfetchProductInfoQuery] = useState(props.Product_itemtypeprops.fetchProductInfoQuery);
    // const [addtocardpayloadobj, setaddtocardpayloadobj] = useState(props.Product_itemtypeprops.addtocardpayloadobj);
    const StatePageProperties = props.Product_itemtypeprops.StatePageProperties;
    const sectionproperties = props.Product_itemtypeprops.sectionproperties;
    const addtocardpayloadobj = props.Product_itemtypeprops.addtocardpayloadobj;
    const setaddtocardpayloadobj = props.Product_itemtypeprops.setaddtocardpayloadobj;
    const getQuantityCondition = props.Product_itemtypeprops.getQuantityCondition;
    const AddtoCartMutationContext = props.Product_itemtypeprops.AddtoCartMutationContext;
    const returnpolicyobj = props.Product_itemtypeprops.returnpolicyobj;
    const addtofavoritescontext = props.Product_itemtypeprops.addtofavoritescontext;
    const ProductInfoIdContext = props.Product_itemtypeprops.ProductInfoIdContext;
    const productimagesarrayy = props.Product_itemtypeprops.productimagesarrayy;
    const setproductimagesarrayy = props.Product_itemtypeprops.setproductimagesarrayy;
    const productimagesarrayy_ar = props.Product_itemtypeprops.productimagesarrayy_ar;
    const setproductimagesarrayy_ar = props.Product_itemtypeprops.setproductimagesarrayy_ar;
    const getprice_discountpriceprops = props.Product_itemtypeprops.getprice_discountpriceprops;
    const quantityconditionfoundobjprops = props.Product_itemtypeprops.quantityconditionfoundobjprops;
    const renderStoreInfo = props.Product_itemtypeprops.renderStoreInfo;
    const getreviewsfeedbackview = props.Product_itemtypeprops.getreviewsfeedbackview;
    const variantcompleting = props.Product_itemtypeprops.variantcompleting;
    const selectproductoptionvalue = props.Product_itemtypeprops.selectproductoptionvalue;
    const variantchecker = props.Product_itemtypeprops.variantchecker;
    const variantindexcompleted = props.Product_itemtypeprops.variantindexcompleted;
    const onShare = props.Product_itemtypeprops.onShare;
    const addtocartfunc = props.Product_itemtypeprops.addtocartfunc;
    const carouselRef = props.Product_itemtypeprops.carouselRef;
    const onTouchThumbnail = props.Product_itemtypeprops.onTouchThumbnail;
    const onSelectcarosal = props.Product_itemtypeprops.onSelectcarosal;
    const CarosalindexSelected = props.Product_itemtypeprops.CarosalindexSelected;
    const setCarosalindexSelected = props.Product_itemtypeprops.setCarosalindexSelected;
    const [showMoredesc, setShowMoredesc] = useState(false);

    useEffect(() => {
        if (!fetchProductInfoQuery.isFetching && fetchProductInfoQuery.isSuccess) {
            if (fetchProductInfoQuery.data.data.productinfo != null) {
                variantchecker();
                var tempaddtocardpayloadobj = { ...addtocardpayloadobj };
                tempaddtocardpayloadobj.productid = fetchProductInfoQuery.data.data.productinfo.productid;
                setaddtocardpayloadobj({ ...tempaddtocardpayloadobj });
            }
        }
    }, [fetchProductInfoQuery.isSuccess, fetchProductInfoQuery.data]);

    const source = {
        html:
            langdetect == 'en'
                ? fetchProductInfoQuery?.data?.data?.productinfo?.description_en?.length > 200
                    ? showMoredesc == false
                        ? `<p><span style="font-size: 15px">` + fetchProductInfoQuery?.data?.data?.productinfo?.description_en.slice(0, 200) + `...</span> </p>`
                        : `<p><span style="font-size: 15px">` + fetchProductInfoQuery?.data?.data?.productinfo?.description_en + `</span> </p>`
                    : `<p><span style="font-size: 15px">` + fetchProductInfoQuery?.data?.data?.productinfo?.description_en + `</span> </p>`
                : fetchProductInfoQuery?.data?.data?.productinfo?.description_ar?.length > 200
                ? showMoredesc == false
                    ? `<p><span style="font-size: 15px">` + fetchProductInfoQuery?.data?.data?.productinfo?.description_ar.slice(0, 200) + `...` + `</span> </p>`
                    : `<p><span style="font-size: 15px">` + fetchProductInfoQuery?.data?.data?.productinfo?.description_ar + `</span> </p>`
                : `<p><span style="font-size: 15px">` + fetchProductInfoQuery?.data?.data?.productinfo?.description_ar + `</span> </p>`,
    };
    // const onSelect = (indexSelected) => {
    //     setCarosalindexSelected(indexSelected);
    // };
    // const onTouchThumbnail = (touched) => {
    //     if (touched === indexSelected) return;

    //     carouselRef?.current?.snapToItem(touched);
    // };
    function ProductDescription() {
        return (
            <View style={{ width: '100%', marginTop: 10 }}>
                <Text
                    style={[
                        {
                            marginTop: 5,
                            color: sectionproperties.prodCatColor,
                            fontSize: StyleParseToIntFuncContext(sectionproperties.prodCatFontSize != null && sectionproperties.prodCatFontSize != undefined ? sectionproperties.prodCatFontSize : 15),
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
                {showMoredesc == false && (
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
                )}
                {showMoredesc == true && (
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
                )}
            </View>
        );
    }
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
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 10, position: 'absolute', zIndex: 1000, paddingLeft: 10, paddingRight: 10 }}>
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
                                    width: StyleParseToIntFuncContext(sectionproperties.favBtnWidth),
                                    height: StyleParseToIntFuncContext(sectionproperties.favBtnHeight),
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
                <View
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
                            backgroundColor: 'white',
                        }}
                    >
                        {/* <Text>sadasd{productimagesarrayy_ar.length}</Text> */}
                        {/* <Carousel
                            layout="default"
                            data={Platform.OS == 'ios' ? productimagesarrayy : langdetect == 'en' ? productimagesarrayy : productimagesarrayy_ar}
                            sliderWidth={SIZES.width}
                            itemWidth={SIZES.width}
                            onSnapToItem={(index) => {
                                onSelectcarosal(index);
                            }}
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
                        /> */}
                        <View style={[{ position: 'absolute', bottom: -20, left: 0, right: 0 }]}>
                            {/* <Pagination activeDotIndex={CarosalindexSelected} dotsLength={props.Product_itemtypeprops.productimagesarrayy.length} animatedDuration={150} inactiveDotScale={1} /> */}
                        </View>
                        {props.Product_itemtypeprops.productimagesarrayy.length != 0 && (
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
                                        {CarosalindexSelected + 1}/{props.Product_itemtypeprops.productimagesarrayy.length}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </View>

                    <FlatList
                        horizontal={true}
                        data={props.Product_itemtypeprops.productimagesarrayy}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 10,
                        }}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => {
                                    onTouchThumbnail(index);
                                }}
                                style={[
                                    generalstyles.allcentered,
                                    {
                                        borderRadius: 10,
                                        borderWidth: index === CarosalindexSelected ? 4 : 2,
                                        borderColor: index === CarosalindexSelected ? sectionproperties.activedotcolor : '#ccc',
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
                </View>
                <View
                    style={{
                        display: 'flex',
                        marginTop: 10,
                        flexDirection: 'row',
                        flex: 1,
                        flexDirection: 'column',
                        padding: 10,
                        paddingHorizontal: 15,
                        backgroundColor: 'white',
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
                    {fetchProductInfoQuery?.data?.data?.productinfo?.productcanrate == 1 && sectionproperties.showrating == 'Show' && (
                        <View
                            style={{
                                width: '20%',
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

                    {sectionproperties.prodPriceshow == 'Show' && fetchProductInfoQuery.data.data.productinfo.isproducttobesold == 1 && <ProductPricingHeader actions={props.Product_itemtypeprops} />}

                    {sectionproperties.showcashbackcontainer == 'Show' && fetchProductInfoQuery?.data?.data?.productinfo?.productcashbackvalue > 0 && (
                        <View style={{ width: '100%', marginVertical: 10 }}>
                            <View
                                style={[
                                    generalstyles.allcentered,
                                    generalstyles.flexRow,
                                    {
                                        width: StyleParseToIntFuncContext(sectionproperties.cashbackcontainerwidth) + '%',
                                        height: StyleParseToIntFuncContext(sectionproperties.cashbackcontainerheight),
                                        background: sectionproperties.cashbackcontainerbgcolor,
                                        borderWidth: StyleParseToIntFuncContext(sectionproperties.cashbackcontainerborderwidth, '', true),
                                        borderStyle: sectionproperties.cashbackcontainerborderstyle,
                                        borderColor: sectionproperties.cashbackcontainerbordercolor,
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.cashbackcontainerborderradius, '', true),
                                    },
                                ]}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'Poppins-Light',
                                        color: sectionproperties.cashbackcontainercolor,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.cashbackcontainerfontsize),
                                    }}
                                >
                                    {langdetect == 'en' ? sectionproperties.cashbackcontainercontenten : sectionproperties.cashbackcontainercontentar}
                                </Text>
                                <Text
                                    style={{
                                        marginHorizontal: 5,
                                        fontFamily: 'Poppins-Medium',
                                        color: sectionproperties.cashbackcontainercolor,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.cashbackcontainerfontsize),
                                    }}
                                >
                                    {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''} {fetchProductInfoQuery?.data?.data?.productinfo?.productcashbackvalue}{' '}
                                    {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                                </Text>
                            </View>
                        </View>
                    )}
                    {sectionproperties.showprofitcontainer == 'Show' && (
                        <View style={{ width: '100%', marginTop: 5 }}>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    width: StyleParseToIntFuncContext(sectionproperties.profitcontainerwidth),
                                    height: StyleParseToIntFuncContext(sectionproperties.profitcontainerheight),
                                    backgroundColor: sectionproperties.profitcontainerbgcolor,
                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.profitcontainerborderradius),
                                    borderColor: sectionproperties.profitcontainerbordercolor,
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.profitcontainerborderwidth, '', true),
                                    borderStyle: 'dashed',
                                }}
                            >
                                <Text
                                    style={{
                                        color: sectionproperties.profitcontainercolor,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.profitcontainerfontsize),
                                        fontFamily:
                                            sectionproperties.profitcontainerfontweight == 300
                                                ? 'Poppins-Thin'
                                                : sectionproperties.profitcontainerfontweight == 400
                                                ? 'Poppins-Light'
                                                : sectionproperties.profitcontainerfontweight == 500
                                                ? 'Poppins-Regular'
                                                : sectionproperties.profitcontainerfontweight == 600
                                                ? 'Poppins-Medium'
                                                : sectionproperties.profitcontainerfontweight == 700
                                                ? 'Poppins-Semibold'
                                                : 'Poppins-Bold',
                                        textDecorationStyle: 'solid',
                                        textAlign: sectionproperties.productnamecentered == 'Centered' ? 'center' : 'left',
                                    }}
                                >
                                    {langdetect == 'en' ? sectionproperties.profitcontainercontenten : sectionproperties.profitcontainercontentar}:{' '}
                                </Text>
                                <Text
                                    style={{
                                        color: sectionproperties.profitcontainercolor,
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.profitcontainerfontsize),
                                        fontFamily:
                                            sectionproperties.profitcontainersecondaryfontweight == 300
                                                ? 'Poppins-Thin'
                                                : sectionproperties.profitcontainersecondaryfontweight == 400
                                                ? 'Poppins-Light'
                                                : sectionproperties.profitcontainersecondaryfontweight == 500
                                                ? 'Poppins-Regular'
                                                : sectionproperties.profitcontainersecondaryfontweight == 600
                                                ? 'Poppins-Medium'
                                                : sectionproperties.profitcontainersecondaryfontweight == 700
                                                ? 'Poppins-Semibold'
                                                : 'Poppins-Bold',
                                        textDecorationStyle: 'solid',
                                        textAlign: sectionproperties.productnamecentered == 'Centered' ? 'center' : 'left',
                                    }}
                                >
                                    {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''}{' '}
                                    {parseFloat(
                                        Math.round(
                                            parseInt(
                                                fetchProductInfoQuery?.data?.data?.productinfo.hassale == 1
                                                    ? fetchProductInfoQuery?.data?.data?.productinfo.defaultsaleprice
                                                    : fetchProductInfoQuery?.data?.data?.productinfo.defaultprice,
                                            ) *
                                                (fetchProductInfoQuery?.data?.data?.productinfo.prodaffpercentprofit / 100),
                                        ),
                                    ).toFixed(0)}{' '}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
                {sectionproperties.showpricesection == 'Show' && fetchProductInfoQuery.data.data.productinfo.isproducttobesold == 1 && (
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            paddingHorizontal: 15,
                            paddingVertical: 15,
                            backgroundColor: 'white',
                            marginTop: 15,
                        }}
                    >
                        <View style={[generalstyles.flexRow, { flex: 1 }]}>
                            {fetchProductInfoQuery.data.data.productinfo.hasvariants == 1 && variantindexcompleted.length == 0 && (
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
                                                ? parseFloat(getprice_discountpriceprops('defaultprice', 1, variantindexcompleted))
                                                : parseFloat(getprice_discountpriceprops('defaultsaleprice', 1, variantindexcompleted))}{' '}
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
                                                {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''}{' '}
                                                {parseFloat(getprice_discountpriceprops('defaultprice', 1, variantindexcompleted))}{' '}
                                                {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            )}
                            {fetchProductInfoQuery.data.data.productinfo.hasvariants == 1 && variantindexcompleted.length != 0 && (
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
                                            {fetchProductInfoQuery.data.data.productinfo.variants[variantindexcompleted].hassale == 1
                                                ? parseFloat(getprice_discountpriceprops('defaultsaleprice', 1, variantindexcompleted))
                                                : parseFloat(getprice_discountpriceprops('defaultprice', 1, variantindexcompleted))}{' '}
                                            {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                                        </Text>
                                    </View>
                                    {fetchProductInfoQuery.data.data.productinfo.variants[variantindexcompleted].hassale == 1 && (
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
                                                {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''}{' '}
                                                {parseFloat(getprice_discountpriceprops('defaultsaleprice', 0, variantindexcompleted))}{' '}
                                                {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            )}
                            {fetchProductInfoQuery.data.data.productinfo.hasvariants == 0 && (
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
                                                ? parseFloat(getprice_discountpriceprops('defaultprice', 1, variantindexcompleted))
                                                : parseFloat(getprice_discountpriceprops('defaultsaleprice', 1, variantindexcompleted))}{' '}
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
                                                {langdetect == 'en' ? fetchAuthorizationQueryContext.data.data.currencyname_en : ''}{' '}
                                                {parseFloat(getprice_discountpriceprops('defaultprice', 1, variantindexcompleted))}{' '}
                                                {langdetect == 'en' ? '' : fetchAuthorizationQueryContext.data.data.currencyname_ar}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>
                    </View>
                )}
            </View>
        );
    }
    function cartBtn() {
        return (
            <View
                style={[
                    // generalstyles.flexRow,
                    // generalstyles.allcentered,
                    {
                        width: '100%',
                        backgroundColor: 'white',
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        marginTop: 15,
                        display:
                            sectionproperties.cartBtnShow == 'Hide' && sectionproperties.quantitybtn_show == 'Hide'
                                ? 'none'
                                : sectionproperties.showoutofstock == 'Show' &&
                                  fetchProductInfoQuery?.data?.data?.productinfo?.quantavailtype == 'limit' &&
                                  fetchProductInfoQuery?.data?.data?.productinfo?.hasvariants == 0 &&
                                  fetchProductInfoQuery?.data?.data?.productinfo?.currentquantity < 1
                                ? 'none'
                                : 'flex',
                        flexDirection: sectionproperties.cartbtnalone == 'Besides Other Buttons' ? 'row' : 'column',
                        justifyContent: 'center',
                        alignItems: sectionproperties.cartbtnalone == 'Besides Other Buttons' ? 'center' : 'flex-start',
                    },
                ]}
            >
                <View
                    style={[
                        generalstyles.allcentered,
                        {
                            marginTop: sectionproperties.cartbtnalone == 'Besides Other Buttons' ? 0 : 10,
                            backgroundColor: sectionproperties.quantitybtn_bgcolor,
                            borderWidth: StyleParseToIntFuncContext(sectionproperties.quantitybtnborderwidth, '', true),
                            borderColor: sectionproperties.quantitybtnbordercolor,
                            flexDirection: 'row',
                            borderRadius: StyleParseToIntFuncContext(sectionproperties.quantitybtn_borderradius, '', true),
                            display: 'flex',
                            height: StyleParseToIntFuncContext(sectionproperties.quantitybtn_height),
                            // flex: 1,
                            width: StyleParseToIntFuncContext(sectionproperties.quantitybtn_width) + '%',
                            marginEnd: 5,
                            zIndex: 1000,
                            display:
                                fetchProductInfoQuery?.data?.data?.productinfo?.isproducttobesold == 1 && fetchProductInfoQuery?.data?.data?.productinfo?.isproducthasquantitychange == 1
                                    ? 'flex'
                                    : 'none',
                        },
                    ]}
                >
                    <TouchableOpacity
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: StyleParseToIntFuncContext(sectionproperties.remove_quantitybtn_borderradius, '', true),
                            backgroundColor: sectionproperties.remove_quantitybtn_bgcolor,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={() => {
                            var tempaddtocardpayloadobj = { ...addtocardpayloadobj };
                            tempaddtocardpayloadobj.quantity = tempaddtocardpayloadobj.quantity - 1;
                            if (tempaddtocardpayloadobj.quantity >= 0) {
                                setaddtocardpayloadobj({ ...tempaddtocardpayloadobj });
                            }
                        }}
                    >
                        <AntDesign name="minus" size={StyleParseToIntFuncContext(sectionproperties.remove_quantitybtn_textfontsize)} color={sectionproperties.remove_quantitybtn_textcolor} />
                    </TouchableOpacity>
                    <View style={[generalstyles.allcentered, { flex: 1 }]}>
                        <Text
                            style={[
                                {
                                    fontFamily:
                                        sectionproperties.quantitybtn_textfontweight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.quantitybtn_textfontweight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.quantitybtn_textfontweight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.quantitybtn_textfontweight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.quantitybtn_textfontweight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.quantitybtn_textfontsize),
                                    color: sectionproperties.quantitybtn_textcolor,
                                },
                            ]}
                        >
                            {addtocardpayloadobj.quantity}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: StyleParseToIntFuncContext(sectionproperties.add_quantitybtn_borderradius, '', true),
                            backgroundColor: sectionproperties.add_quantitybtn_bgcolor,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={() => {
                            var tempaddtocardpayloadobj = { ...addtocardpayloadobj };
                            tempaddtocardpayloadobj.quantity = tempaddtocardpayloadobj.quantity + 1;
                            setaddtocardpayloadobj({ ...tempaddtocardpayloadobj });
                        }}
                    >
                        <AntDesign name="plus" size={StyleParseToIntFuncContext(sectionproperties.add_quantitybtn_textfontsize)} color={sectionproperties.add_quantitybtn_textcolor} />
                    </TouchableOpacity>
                </View>
                {sectionproperties.cartBtnShow == 'Show' && (
                    <TouchableOpacity
                        style={{
                            marginStart: sectionproperties.cartbtnalone == 'Besides Other Buttons' ? 5 : 0,
                            width: StyleParseToIntFuncContext(sectionproperties.cartBtnWidth) + '%',
                            backgroundColor: sectionproperties.cartBtnbgColor,
                            alignItems: 'center',
                            height: StyleParseToIntFuncContext(sectionproperties.cartBtnHeight),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            borderRadius: StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius),
                            borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth),
                            borderColor: sectionproperties.cartbtnbordercolor,
                            marginTop: sectionproperties.cartbtnalone == 'Besides Other Buttons' ? 0 : 15,
                        }}
                        onPress={() => {
                            if (fetchProductInfoQuery?.data?.data?.productinfo?.product_calltoaction != 'Call') {
                                addtocartfunc();
                            } else {
                                Linking.openURL('tel:' + fetchProductInfoQuery?.data?.data?.productinfo?.product_phonenumber);
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
                                <Text
                                    style={{
                                        marginStart: 10,
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
                                    buttonStyle={{ width: 25, height: 25 }}
                                    isLoading={true}
                                    indicatorCount={10}
                                    spinnerType={'MaterialIndicator'}
                                    spinnerColor={sectionproperties.login_btn_color}
                                ></SpinnerButton>
                            </View>
                        )}
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
    function renderProductDescription() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    paddingHorizontal: 15,
                    backgroundColor: 'white',
                    marginTop: 15,
                }}
            >
                {langdetect == 'en' &&
                    fetchProductInfoQuery?.data?.data?.productinfo?.description_en != null &&
                    fetchProductInfoQuery?.data?.data?.productinfo?.description_en?.length != 0 &&
                    ProductDescription()}
                {langdetect == 'ar' &&
                    fetchProductInfoQuery?.data?.data?.productinfo?.description_ar != null &&
                    fetchProductInfoQuery?.data?.data?.productinfo?.description_ar?.length != 0 &&
                    ProductDescription()}
                <View style={[generalstyles.allcentered, { width: '100%', marginBottom: 15 }]}>
                    {langdetect == 'en'
                        ? fetchProductInfoQuery?.data?.data?.productinfo?.description_en?.length > 150 && (
                              <Text style={[generalstyles.poppinsMedium, { textDecorationLine: 'underline' }]} onPress={() => setShowMoredesc(!showMoredesc)}>
                                  {showMoredesc ? lang.showless : lang.showmore}
                              </Text>
                          )
                        : fetchProductInfoQuery?.data?.data?.productinfo?.description_ar?.length > 150 && (
                              <Text style={[generalstyles.poppinsMedium, { textDecorationLine: 'underline' }]} onPress={() => setShowMoredesc(!showMoredesc)}>
                                  {showMoredesc ? lang.showless : lang.showmore}
                              </Text>
                          )}
                </View>
            </View>
        );
    }

    return (
        <View style={{ height: '100%', flex: 1 }}>
            {Object.keys(StatePageProperties).length != 0 && (
                <View>
                    {renderProductInfo()}
                    {sectionproperties.deliverytimeshow == 'Show' && (
                        <View
                            style={[
                                generalstyles.flexRow,
                                {
                                    width: '100%',
                                    backgroundColor: 'white',
                                    paddingHorizontal: 20,
                                    paddingVertical: 15,
                                    marginTop: 15,
                                },
                            ]}
                        >
                            <Text
                                style={{
                                    textAlign: langdetect == 'en' ? 'left' : 'right',
                                    fontFamily: 'Poppins-Medium',
                                }}
                            >
                                {langdetect == 'en' ? 'Delivery Time' : 'مدة الشحن'}: {fetchProductInfoQuery.data.data.productinfo.deliverydatetext}{' '}
                            </Text>
                        </View>
                    )}
                    {sectionproperties.showpricinglist == 'Show' && getQuantityCondition()}
                    {fetchProductInfoQuery.data.data.productinfo.hasvariants == 1 && <Variantoptions actions={props.Product_itemtypeprops} />}
                    {sectionproperties.showextrafield == 'Show' && fetchProductInfoQuery?.data?.data?.productinfo?.productextrafields?.length != 0 && (
                        <ProductExtraFields actions={props.Product_itemtypeprops} />
                    )}
                    {sectionproperties.showoutofstock == 'Show' &&
                        fetchProductInfoQuery?.data?.data?.productinfo?.quantavailtype == 'limit' &&
                        fetchProductInfoQuery?.data?.data?.productinfo?.hasvariants == 0 &&
                        fetchProductInfoQuery?.data?.data?.productinfo?.currentquantity < 1 &&
                        fetchProductInfoQuery.data.data.productinfo.isproducttobesold == 1 && (
                            <View
                                style={[
                                    generalstyles.allcentered,
                                    {
                                        flex: 1,
                                        flexDirection: 'column',
                                        paddingHorizontal: 15,
                                        paddingVertical: 15,
                                        backgroundColor: 'white',
                                        marginTop: 15,
                                    },
                                ]}
                            >
                                <View
                                    style={[
                                        generalstyles.allcentered,
                                        generalstyles.flexRow,
                                        {
                                            width: StyleParseToIntFuncContext(sectionproperties.outstock_width),
                                            height: StyleParseToIntFuncContext(sectionproperties.outstock_height),
                                            backgroundColor: sectionproperties.outstock_bg,
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.outstock_borderradius, '', true),
                                        },
                                    ]}
                                >
                                    <View
                                        style={{
                                            width: 5,
                                            height: 5,
                                            backgroundColor: sectionproperties.outstock_color,
                                            borderRadius: 100,
                                            marginEnd: 10,
                                        }}
                                    />
                                    <Text
                                        style={[
                                            generalstyles.poppinsMedium,
                                            {
                                                color: sectionproperties.outstock_color,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.outstock_fontSize),
                                            },
                                        ]}
                                    >
                                        {langdetect == 'en' ? sectionproperties.outstock_contenten : sectionproperties.outstock_contentar}
                                    </Text>
                                </View>
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
                    {fetchProductInfoQuery?.data?.data?.productinfo?.productcanrate == 1 && sectionproperties.showrating == 'Show' && <View style={{ width: '100%' }}>{getreviewsfeedbackview()}</View>}
                    {renderStoreInfo()}
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
                                imageUrls={props.Product_itemtypeprops.ImagesGallery}
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
                                                top: 50,
                                                width: '100%',
                                                justifyContent: 'flex-end',
                                                zIndex: 10000,
                                            }}
                                            onPress={() => {
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
            )}
        </View>
    );
};

export default Product_itemtype;

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
