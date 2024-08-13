import React, { useState, useContext, useEffect, useRef } from 'react';
import { Image, View, Text, TouchableOpacity, FlatList, Share } from 'react-native';
import { SIZES, icons } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import RenderHtml from 'react-native-render-html';
import { useSelector } from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { MaterialCommunityIcons, SimpleLineIcons, Feather, AntDesign, FontAwesome5 } from 'react-native-vector-icons';
import SpinnerButton from 'react-native-spinner-button';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
// import Carousel, { Pagination } from 'react-native-snap-carousel';
import { urlEndpoint } from '../../../../config/imagekit';
import { useNavigation } from '@react-navigation/native';

const Service_itemtype = (props) => {
    const carouselRef = useRef();
    const navigation = useNavigation();
    const { showUpTopNotificationBarContext, fetchAuthorizationQueryContext } = useContext(FetchingContext);
    const { lang, langdetect } = useContext(LanguageContext);
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const [StatePageProperties, setStatePageProperties] = useState({});
    const [sectionproperties, setsectionproperties] = useState('');
    const { StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const [IsFavItemProps, setIsFavItemProps] = useState(props.Service_itemtypeprops.IsFavItemProps);
    const [fetchProductInfoQuery, setfetchProductInfoQuery] = useState(props.Service_itemtypeprops.fetchProductInfoQuery);
    const [addtocardpayloadobj, setaddtocardpayloadobj] = useState({
        functype: 'add',
        item_type: 'product',
        productid: fetchProductInfoQuery?.data?.data?.productinfo?.productid,
        variantid: '',
        quantity: 1,
        date: '',
        time: '',
        from: '',
        to: '',
    });
    const AddtoCartMutationContext = props.Service_itemtypeprops.AddtoCartMutationContext;
    const addtofavoritescontext = props.Service_itemtypeprops.addtofavoritescontext;
    const ProductInfoIdContext = props.Service_itemtypeprops.ProductInfoIdContext;
    const GeneralAPIMutationContext = props.Service_itemtypeprops.GeneralAPIMutationContext;
    const [currentmutatestate, setcurrentmutatestate] = useState('');
    const [slots, setslots] = useState([]);
    const [showopencalendar, setshowopencalendar] = useState(false);
    const choosedateopencalendar = () => {
        setshowopencalendar(true);
    };
    const [timepicked, settimepicked] = useState(lang.choosetime);
    const [fromDate, setfromDate] = useState(lang.choosetime);
    const [showFromCalendar, setshowFromCalendar] = useState(false);
    const [toDate, settoDate] = useState(lang.choosetime);
    const [showToCalendar, setshowToCalendar] = useState(false);

    const [indexSelected, setIndexSelected] = useState(0);

    const onSelect = (indexSelected) => {
        setIndexSelected(indexSelected);
    };
    const onTouchThumbnail = (touched) => {
        if (touched === indexSelected) return;

        // carouselRef?.current?.snapToItem(touched);
    };
    const [shareUrl, setshareUrl] = useState('');
    const [title, settitle] = useState('');
    const [item, setitem] = useState(props?.Product_itemtypeprops?.fetchProductInfoQuery);
    useEffect(() => {
        var itemobj = fetchProductInfoQuery?.data?.data?.productinfo;
        if (stringIsEnglish(itemobj.name_en)) {
            itemobj.titlelang = 'en';
        } else {
            itemobj.titlelang = 'ar';
        }
        if (stringIsEnglish(itemobj.description_en)) {
            itemobj.decriptionlang = 'en';
        } else {
            itemobj.decriptionlang = 'ar';
        }
        setitem(itemobj);
        settitle(fetchProductInfoQuery?.data?.data?.productinfo?.name_en);
        setshareUrl('https://' + fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcred?.instexternaldomain + '/productinform/' + fetchProductInfoQuery?.data?.data?.productinfo?.productid);
    }, [props.itemprops]);
    function stringIsEnglish(str) {
        var titlelang = 'English';
        var arabic = /[\u0600-\u06FF]/;
        if (!arabic.test(str)) {
            titlelang = true;
        } else {
            titlelang = false;
        }
        return titlelang;
    }
    const onShare = async () => {
        try {
            const result = await Share.share(
                {
                    title: fetchProductInfoQuery?.data?.data?.productinfo?.name_en,
                    message: fetchProductInfoQuery?.data?.data?.productinfo?.name_en,
                    url: 'https://' + fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcred?.instexternaldomain + '/productinfo/' + fetchProductInfoQuery?.data?.data?.productinfo?.productid,
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
    useEffect(() => {
        setaddtocardpayloadobj({ ...addtocardpayloadobj, item_type: 'service' });
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
    const addtocartfunc = () => {
        var runfunc = false;
        if (addtocardpayloadobj.productid.length != 0 && addtocardpayloadobj.quantity > 0) {
            if (fetchProductInfoQuery.data.data.productinfo.hasvariants == 1) {
                if (addtocardpayloadobj.variantid.length != 0) {
                    runfunc = true;
                } else {
                    showUpTopNotificationBarContext('Please Choose Product Options', 'orange');
                }
            } else {
                runfunc = true;
            }
        } else {
            showUpTopNotificationBarContext(lang.choosequantity, 'orange');
        }

        if (runfunc == true) {
            AddtoCartMutationContext.mutate(addtocardpayloadobj);
        }
    };
    const source = {
        html:
            langdetect == 'en'
                ? fetchProductInfoQuery?.data?.data?.productinfo?.description_en?.length > 500
                    ? '<p><span style="font-size: 15px">' + fetchProductInfoQuery?.data?.data?.productinfo?.description_en?.slice(0, 500) + '...</span> </p>'
                    : '<p><span style="font-size: 15px">' + fetchProductInfoQuery?.data?.data?.productinfo?.description_en + '</span> </p>'
                : fetchProductInfoQuery?.data?.data?.productinfo?.description_ar?.length > 500
                ? '<p><span style="font-size: 15px">' + fetchProductInfoQuery?.data?.data?.productinfo?.description_ar?.slice(0, 450) + +'...</span> </p>'
                : '<p><span style="font-size: 15px">' + fetchProductInfoQuery?.data?.data?.productinfo?.description_ar + '</span> </p>',
    };

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
                        {sectionproperties.showShareButton == 'Show' && (
                            <TouchableOpacity
                                style={[
                                    generalstyles.allcentered,
                                    {
                                        width: 40,
                                        height: 40,
                                        backgroundColor: sectionproperties.sharebtn_bg,
                                        borderRadius: StyleParseToIntFuncContext(sectionproperties.sharebtn_borderradius),
                                        marginTop: 5,
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
                        }}
                    >
                        {/* <Carousel
                            layout="default"
                            data={props.Service_itemtypeprops.productimagesarrayy}
                            sliderWidth={SIZES.width}
                            itemWidth={SIZES.width}
                            renderItem={({ item, index }) => (
                                <Image
                                    key={index}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomLeftRadius, '', true),
                                        borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.image_borderBottomRightRadius, '', true),
                                        borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertopleftradius, '', true),
                                        borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.image_bordertoprightradius, '', true),
                                    }}
                                    resizeMode="contain"
                                    source={{ uri: urlEndpoint + '/tr:w-800,h-800/' + item.path }}
                                />
                            )}
                            onSnapToItem={(index) => onSelect(index)}
                            ref={carouselRef}
                        /> */}
                        <View style={{ position: 'absolute', bottom: -20, left: 0, right: 0 }}>
                            {/* <Pagination
                                // inactiveDotColor={sectionproperties.inactivedotcolor}
                                // dotColor={sectionproperties.activedotcolor}
                                activeDotIndex={indexSelected}
                                dotsLength={props.Service_itemtypeprops.productimagesarrayy.length}
                                animatedDuration={150}
                                inactiveDotScale={1}
                            /> */}
                        </View>
                        {sectionproperties.showpill == 'Show' && (
                            <View
                                style={{
                                    marginVertical: 20,
                                    paddingHorizontal: 10,
                                    alignSelf: 'flex-end',
                                    position: 'absolute',
                                    bottom: -10,
                                    right: 0,
                                }}
                            >
                                <Text
                                    style={[
                                        generalstyles.poppinsMedium,
                                        {
                                            color: sectionproperties.pillcolor,
                                            fontSize: 13,
                                        },
                                    ]}
                                >
                                    {indexSelected + 1}/{props.Service_itemtypeprops.productimagesarrayy.length}
                                </Text>
                            </View>
                        )}
                    </View>
                    <FlatList
                        horizontal={true}
                        data={props.Service_itemtypeprops.productimagesarrayy}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 10,
                        }}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity activeOpacity={0.9} onPress={() => onTouchThumbnail(index)}>
                                <Image
                                    source={{ uri: urlEndpoint + '/tr:w-100,h-100/' + item.path }}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        marginRight: 10,
                                        borderRadius: 10,
                                        borderWidth: index === indexSelected ? 4 : 0.75,
                                        borderColor: index === indexSelected ? sectionproperties.activedotcolor : 'white',
                                    }}
                                    resizeMode={'cover'}
                                />
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <View
                    style={{
                        display: 'flex',
                        marginTop: 10,
                        paddingLeft: 20,
                        paddingRight: 20,
                        flexDirection: 'row',
                    }}
                >
                    <View style={{ flex: 1, flexDirection: 'column', paddingEnd: 10 }}>
                        <Text
                            style={[
                                {
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
                                },
                            ]}
                        >
                            {langdetect == 'en' ? fetchProductInfoQuery?.data?.data?.productinfo.name_en : fetchProductInfoQuery?.data?.data?.productinfo.name_ar}
                        </Text>
                        {langdetect == 'en' &&
                            fetchProductInfoQuery?.data?.data?.productinfo?.description_en != null &&
                            fetchProductInfoQuery?.data?.data?.productinfo?.description_en != undefined && (
                                <View style={[generalstyles.flexColumn, { width: '100%' }]}>
                                    <Text
                                        style={[
                                            {
                                                marginTop: 5,
                                                color: sectionproperties.generaltext_fontColor,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                                textAlign: 'left',
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
                                                textTransform:
                                                    sectionproperties.generaltext_textTransform == 'Uppercase'
                                                        ? 'uppercase'
                                                        : sectionproperties.generaltext_textTransform == 'Capitalize'
                                                        ? 'capitalize'
                                                        : sectionproperties.generaltext_textTransform == 'None'
                                                        ? 'none'
                                                        : 'lowercase',
                                            },
                                        ]}
                                    >
                                        {lang.productdetails}
                                    </Text>

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
                                </View>
                            )}
                        {langdetect == 'ar' &&
                            fetchProductInfoQuery?.data?.data?.productinfo?.description_ar != null &&
                            fetchProductInfoQuery?.data?.data?.productinfo?.description_ar != undefined && (
                                <View style={[generalstyles.flexColumn, { width: '100%' }]}>
                                    <Text
                                        style={[
                                            {
                                                marginTop: 5,
                                                color: sectionproperties.generaltext_fontColor,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.generaltext_fontSize),
                                                textAlign: 'left',
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
                                                textTransform:
                                                    sectionproperties.generaltext_textTransform == 'Uppercase'
                                                        ? 'uppercase'
                                                        : sectionproperties.generaltext_textTransform == 'Capitalize'
                                                        ? 'capitalize'
                                                        : sectionproperties.generaltext_textTransform == 'None'
                                                        ? 'none'
                                                        : 'lowercase',
                                            },
                                        ]}
                                    >
                                        {lang.productdetails}
                                    </Text>

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
                                </View>
                            )}
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View style={{ width: '100%' }}>
            {renderProductInfo()}
            {fetchProductInfoQuery?.data?.data?.productinfo?.serviceinfo?.scheduletype == 'days' && (
                <View style={[generalstyles.flexColumn, { width: '100%', paddingHorizontal: 20 }]}>
                    <View style={{ marginBottom: 25, marginTop: 25 }}>
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
                                    borderRadius: sectionproperties.inputfieldborderradius,
                                    backgroundColor: sectionproperties.input_bgcolor,
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth),
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
                                    borderRadius: sectionproperties.inputfieldborderradius,
                                    backgroundColor: sectionproperties.input_bgcolor,
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth),
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
                            {lang.quantity}: {addtocardpayloadobj.quantity}
                        </Text>
                    </View>
                </View>
            )}
            {fetchProductInfoQuery?.data?.data?.productinfo?.serviceinfo?.scheduletype == 'minutes' && (
                <View style={[generalstyles.flexColumn]}>
                    <View style={{ marginBottom: 25, marginTop: 25, marginHorizontal: 20 }}>
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
                                    borderRadius: sectionproperties.inputfieldborderradius,
                                    backgroundColor: sectionproperties.input_bgcolor,
                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth),
                                },
                            ]}
                            onPress={choosedateopencalendar}
                        >
                            <Text
                                style={[generalstyles.poppinsMedium, generalstyles.allcentered, { width: '100%', textAlign: 'center' }]}
                                underlineColorAndroid="transparent"
                                placeholder="dd/mm/yyyy"
                                placeholderTextColor="black"
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
                        <View style={{ marginBottom: 15, marginHorizontal: 20 }}>
                            <Text
                                style={[
                                    {
                                        fontSize: StyleParseToIntFuncContext(sectionproperties.time_labelFontsize),
                                        color: sectionproperties.time_laelColor,
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
                                style={{ marginStart: 10 }}
                                data={slots}
                                contentContainerStyle={{ paddingBottom: SIZES.padding * 0.8 }}
                                numColumns={3}
                                scrollEnabled={false}
                                renderItem={({ item, index }) => {
                                    var ischoosed = false;
                                    if (item.slot == addtocardpayloadobj.time) {
                                        ischoosed = true;
                                    }
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
                                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.time_borderwidth),
                                                    borderColor: ischoosed ? sectionproperties.time_timeactiveColor : sectionproperties.time_borderColor,
                                                    borderRadius: sectionproperties.time_borderRadius,
                                                    marginEnd: 10,
                                                    marginBottom: 10,
                                                    width: SIZES.width - 300,
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
                                                    {item.slot}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }}
                            />
                        </View>
                    )}
                </View>
            )}
            {sectionproperties.productInformationType == 'Product/Service Information' && (
                <View
                    style={{
                        flexDirection: 'row',
                        width: '90%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        borderRadius: 20,
                        padding: 10,
                        // marginTop: 20,
                        backgroundColor: sectionproperties.pricesection_bgcolor,
                        borderWidth: StyleParseToIntFuncContext(sectionproperties.pricesection_borderwidth),
                        borderColor: sectionproperties.pricesection_bordercolor,
                        borderRadius: StyleParseToIntFuncContext(sectionproperties.pricesection_borderBottomLeftRadius),
                        display: sectionproperties.cartBtnShow == 'Hide' && sectionproperties.showpricesection == 'Hide' ? 'none' : 'flex',
                    }}
                >
                    {sectionproperties.showpricesection == 'Show' && (
                        <View style={[generalstyles.flexRow, { flex: 1 }]}>
                            <View style={[generalstyles.flexColumn]}>
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
                                    {langdetect == 'en' ? 'EGP' : ''}{' '}
                                    {fetchProductInfoQuery.data.data.productinfo.hassale == 0
                                        ? fetchProductInfoQuery.data.data.productinfo.defaultprice
                                        : fetchProductInfoQuery.data.data.productinfo.defaultsaleprice}{' '}
                                    {langdetect == 'en' ? '' : 'ج.م'}
                                </Text>
                                {fetchProductInfoQuery.data.data.productinfo.hassale == 1 && (
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
                                        {langdetect == 'en' ? 'EGP' : ''} {fetchProductInfoQuery.data.data.productinfo.defaultprice} {langdetect == 'en' ? '' : 'ج.م'}
                                    </Text>
                                )}
                            </View>
                        </View>
                    )}
                    {sectionproperties.cartBtnShow == 'Show' && (
                        <TouchableOpacity
                            style={{
                                width: 200,
                                backgroundColor: sectionproperties.cartBtnbgColor,
                                alignItems: 'center',
                                height: 45,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                borderRadius: StyleParseToIntFuncContext(sectionproperties.cart_btn_borderBottomLeftRadius),
                                borderWidth: StyleParseToIntFuncContext(sectionproperties.cartbtnborderwidth),
                                borderColor: sectionproperties.cartbtnbordercolor,
                            }}
                            onPress={() => {
                                // alert(addtocardpayloadobj.time);
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
                                    {sectionproperties.carticonstyle == 'Shopping cart 1' && (
                                        <MaterialCommunityIcons
                                            name="cart-outline"
                                            size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                            style={{
                                                color: sectionproperties.cart_iconcolor,
                                            }}
                                        />
                                    )}
                                    {sectionproperties.carticonstyle == 'Shopping cart 2' && (
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
                                    {sectionproperties.carticonstyle == 'Shopping bag 1' && (
                                        <Feather
                                            name="shopping-bag"
                                            size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                            style={{
                                                color: sectionproperties.cart_iconcolor,
                                            }}
                                        />
                                    )}
                                    {sectionproperties.carticonstyle == 'Shopping bag 2' && (
                                        <SimpleLineIcons
                                            name="handbag"
                                            size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                            style={{
                                                color: sectionproperties.cart_iconcolor,
                                            }}
                                        />
                                    )}
                                    {sectionproperties.carticonstyle == 'Shopping bag 3' && (
                                        <FontAwesome5
                                            name="shopping-bag"
                                            size={StyleParseToIntFuncContext(sectionproperties.cartBtn_iconFontSize)}
                                            style={{
                                                color: sectionproperties.cart_iconcolor,
                                            }}
                                        />
                                    )}
                                    {sectionproperties.carticonstyle == 'Shopping bag 4' && (
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
                                        {langdetect == 'en' ? sectionproperties.cartBtnContentenglish : sectionproperties.cartBtnContentarabic}
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
                                        spinnerColor={sectionproperties.login_btn_color}
                                    ></SpinnerButton>
                                </View>
                            )}
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
};

export default Service_itemtype;
