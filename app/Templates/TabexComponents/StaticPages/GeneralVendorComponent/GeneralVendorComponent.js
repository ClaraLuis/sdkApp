import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Modal, Image, TouchableOpacity, TextInput, SafeAreaView, FlatList, Platform } from 'react-native';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { ProductsCardsSectionContext_Provider } from '../../Sections/Cards/ProductsCardsSectionContext';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import API from '../../../API/API';
import { ImageComponent } from '../../../ImageComponent';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
// import StarRating from 'react-native-star-rating';
import { icons, COLORS, images, SIZES } from '../../GeneralFiles/constants';
import { AntDesign, Feather, Ionicons, FontAwesome } from '@expo/vector-icons';
import Stars from 'react-native-stars';

const GeneralVendorComponent = (props) => {
    const route = useRoute();
    const { fetchvendorinfo_API } = API();
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const { lang, langdetect } = useContext(LanguageContext);
    const { StaticPagesLinksContext, routingcountext, routingCustomPagecountext } = React.useContext(TemplateRoutingContext);
    const [openpricemodal, setopenpricemodal] = useState(false);
    const [opensearch, setopensearch] = useState(false);
    const [StatePageProperties, setStatePageProperties] = useState({});
    const { StyleParseToIntFuncContext, TabexSectionsComponentsContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const [vendorsarrpassed, setvendorsarrpassed] = useState(route?.params?.genprodcompstinfo?.vendorsarr);
    const [Countryidpassed, setCountryidpassed] = useState(route?.params?.genprodcompstinfo?.countryid);
    const [Stateidpassed, setStateidpassed] = useState(route?.params?.genprodcompstinfo?.stateid);
    const [Cityidpassed, setCityidpassed] = useState(route?.params?.genprodcompstinfo?.cityid);
    const [pricerange, setpricerange] = useState({ min: 0, max: 100000 });
    const [price_minpassed, setprice_minpassed] = useState(0);
    const [price_maxpassed, setprice_maxpassed] = useState(100000000);
    const [Collectionidpassed, setCollectionidpassed] = useState(route?.params?.genprodcompstinfo?.collectionid);
    const [fetchingtypepassed, setfetchingtypepassed] = useState(route?.params?.genprodcompstinfo?.fetchingtype);
    const [srcfrompassed, setsrcfrompassed] = useState(route?.params?.genprodcompstinfo?.srcfrom);
    const [collectionidparams, setcollectionidparams] = useState([]);
    const [grouptypeparams, setgrouptypeparams] = useState(route?.params?.genprodcompstinfo?.grouptypeprops);
    const [prod_featruesarpassed, setprod_featruesarpassed] = useState(route?.params?.genprodcompstinfo?.prod_featruesar);
    const [sectionproperties, setsectionproperties] = useState('');
    const [vendorinfo, setvendorinfo] = useState(null);
    const [parenttype, setparenttype] = useState(route?.params?.genprodcompstinfo?.parenttype);
    useEffect(() => {
        StatePageProperties11.pages.forEach(function (item, index) {
            if (CurrentPageIdContext == item.pageid) {
                setStatePageProperties(item.pageobj);
            }
        });
        // alert(route?.params?.genprodcompstinfo?.parenttype);
    }, [StatePageProperties11]);
    useEffect(() => {
        var secpropobj = {};
        if (Object.keys(StatePageProperties).length != 0 && StatePageProperties != undefined) {
            if (StatePageProperties.pageobj != undefined && StatePageProperties.pageobj.pageproperties != undefined) {
                StatePageProperties.pageobj.pageproperties.forEach(function (sectionitem, sectionindex) {
                    secpropobj[sectionitem.property_css_name] = sectionitem.property_value;
                });
            }
            setsectionproperties({ ...secpropobj });
        }
    }, [StatePageProperties]);
    useEffect(() => {
        // GeneralProductsComponent
        // if (srcfrompassed == undefined || srcfrompassed == null || srcfrompassed.length == 0) {
        //     setsrcfrompassed('GeneralProductsComponent');
        // }
    }, []);
    // const copyToClipboard = async () => {
    //     await Clipboard.setStringAsync('hello world');
    // };
    const FetchVendorinfoQuery = useQuery(
        ['fetchvendorinfo_API' + route?.params?.genprodcompstinfo?.vendorsarr],
        () => fetchvendorinfo_API({ vendorid: route?.params?.genprodcompstinfo?.vendorsarr }),
        {
            keepPreviousData: true,
            staleTime: Infinity,
            enabled: route?.params?.genprodcompstinfo?.vendorsarr?.length != 0 ? true : false,
        },
    );
    useEffect(() => {
        if (FetchVendorinfoQuery.isSuccess) {
            setvendorinfo(FetchVendorinfoQuery.data.data.vendorinfo);
        }
    }, [FetchVendorinfoQuery.isSuccess, FetchVendorinfoQuery.data]);
    return (
        <View style={{ width: '100%', height: '100%' }}>
            {/* <Text>ASDASDSADSAD{JSON.stringify(FetchVendorinfoQuery?.data?.data?.vendorinfo)}</Text> */}
            {vendorinfo != null && srcfrompassed != undefined && srcfrompassed.length != 0 && Object.keys(StatePageProperties).length != 0 && StatePageProperties != undefined && (
                <View style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <View
                        style={{
                            width: '90%',
                            marginStart: 'auto',
                            marginEnd: 'auto',
                            // borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 10,
                            backgroundColor: 'white',
                            shadowColor: '#000',
                            shadowOpacity: 0.1,
                            shadowOffset: {
                                width: 0,
                                height: 3,
                            },
                            shadowRadius: 3,
                            elevation: 4,
                            marginTop: 15,
                        }}
                    >
                        <View
                            style={{
                                width: '100%',
                                flexDirection: 'column',
                                padding: 15,
                            }}
                        >
                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    alignItems: sectionproperties.showrating == 'Hide' && sectionproperties.showdeliverytime == 'Hide' ? 'center' : 'flex-start',
                                }}
                            >
                                {/* vendor logo */}
                                <View
                                    style={{
                                        width: sectionproperties.showrating == 'Hide' && sectionproperties.showdeliverytime == 'Hide' ? 70 : 90,
                                        height: sectionproperties.showrating == 'Hide' && sectionproperties.showdeliverytime == 'Hide' ? 70 : 90,
                                        borderRadius: 10,
                                        overflow: 'hidden',
                                    }}
                                >
                                    <ImageComponent
                                        path={'/tr:w-500,h-500' + vendorinfo.vendorlogourl}
                                        resizeMode={'contain'}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                </View>
                                <View
                                    style={{
                                        marginStart: 10,
                                        // justifyContent: 'center',
                                        flex: 1,
                                    }}
                                >
                                    {/* vendor name */}
                                    <View
                                        style={[
                                            generalstyles.flexRow,
                                            {
                                                width: '100%',
                                            },
                                        ]}
                                    >
                                        <View style={[generalstyles.flexColumn, { flex: 1 }]}>
                                            <Text
                                                style={[
                                                    generalstyles.poppinsMedium,
                                                    {
                                                        fontSize: 15,
                                                        color: '#000',
                                                        marginBottom: 5,
                                                        textAlign: 'left',
                                                        flex: 1,
                                                    },
                                                ]}
                                            >
                                                {vendorinfo.vendorname}
                                            </Text>
                                            {sectionproperties.showrating == 'Show' && (
                                                <View style={[generalstyles.flexRow]}>
                                                    {/* <StarRating
                                                        disabled={true}
                                                        maxStars={5}
                                                        rating={parseInt(vendorinfo.vendorratings)}
                                                        starSize={17}
                                                        fullStarColor="#FAB400"
                                                        emptyStarColor="#FAB400"
                                                    /> */}
                                                    <Stars
                                                        disabled={true}
                                                        display={parseInt(vendorinfo.vendorratings)}
                                                        spacing={1}
                                                        count={5}
                                                        half={true}
                                                        fullStar={<FontAwesome name={'star'} size={14} color="#FAB400" />}
                                                        emptyStar={<FontAwesome name={'star-o'} size={14} color="#FAB400" />}
                                                        halfStar={<FontAwesome name={'star-half-empty'} size={14} color="#FAB400" />}
                                                    />
                                                    {/* <Text
                                            style={[
                                                generalstyles.poppinsMedium,
                                                {
                                                    color: '#8c8c8c',
                                                    marginStart: 10,
                                                    fontSize: 12,
                                                },
                                            ]}
                                        >
                                            (1000 {langdetect == 'en' ? 'Ratings' : 'تقييمات'})
                                        </Text> */}
                                                </View>
                                            )}
                                            {sectionproperties.showdeliverytime == 'Show' && (
                                                <Text
                                                    ellipsizeMode="tail"
                                                    numberOfLines={1}
                                                    style={[
                                                        generalstyles.poppinsMedium,
                                                        generalstyles.textcapitalize,
                                                        {
                                                            marginTop: 5,
                                                            fontSize: 13,
                                                            color: '#000',
                                                            opacity: 0.8,
                                                            textAlign: 'left',
                                                        },
                                                    ]}
                                                >
                                                    {langdetect == 'en' ? 'Delivery Time' : 'مدة التوصيل'}: {vendorinfo.estimateddeliverytime}
                                                </Text>
                                            )}
                                        </View>
                                        <View
                                            style={[
                                                generalstyles.flexRow,
                                                {
                                                    marginTop: 5,
                                                    marginBottom: 'auto',
                                                },
                                            ]}
                                        >
                                            {vendorinfo.status == 'Active' && (
                                                <View
                                                    style={[
                                                        generalstyles.allcentered,
                                                        {
                                                            height: 40,
                                                            backgroundColor: '#d8f3e5',
                                                            borderRadius: 100,
                                                            width: 90,
                                                        },
                                                    ]}
                                                >
                                                    <Text
                                                        style={[
                                                            generalstyles.poppinsMedium,
                                                            {
                                                                color: COLORS.success,

                                                                fontSize: 12,
                                                            },
                                                        ]}
                                                    >
                                                        {langdetect == 'en' ? 'Open' : 'متاح'}
                                                    </Text>
                                                </View>
                                            )}
                                            {vendorinfo.status == 'Closed' && (
                                                <View
                                                    style={[
                                                        generalstyles.allcentered,
                                                        {
                                                            height: 40,
                                                            backgroundColor: '#f8d3dc',
                                                            borderRadius: 100,
                                                            width: 90,
                                                        },
                                                    ]}
                                                >
                                                    <Text
                                                        style={[
                                                            generalstyles.poppinsMedium,
                                                            {
                                                                color: COLORS.danger,

                                                                fontSize: 12,
                                                            },
                                                        ]}
                                                    >
                                                        {langdetect == 'en' ? 'Closed' : 'مغلق'}
                                                    </Text>
                                                </View>
                                            )}
                                            {vendorinfo.status == 'Busy' && (
                                                <View
                                                    style={[
                                                        generalstyles.allcentered,
                                                        {
                                                            height: 40,
                                                            backgroundColor: '#fdefce',
                                                            borderRadius: 100,
                                                            width: 90,
                                                        },
                                                    ]}
                                                >
                                                    <Text
                                                        style={[
                                                            generalstyles.poppinsMedium,
                                                            {
                                                                color: COLORS.warning,

                                                                fontSize: 12,
                                                            },
                                                        ]}
                                                    >
                                                        {langdetect == 'en' ? 'Busy' : 'مشغول'}
                                                    </Text>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                    {/* vendor rating */}
                                </View>
                            </View>
                            {/* <View
                                style={[
                                    generalstyles.flexRow,
                                    {
                                        marginTop: 15,
                                    },
                                ]}
                            >
                                <View style={[generalstyles.allcentered, { flex: 1 }]}>
                                    <Text style={[{ fontFamily: 'Poppins-Light', color: '#000', fontSize: 14 }]}>{langdetect == 'en' ? 'Delivery Fee' : 'مصلريف التوصيل'}</Text>
                                    <Text style={{ fontFamily: 'Poppins-Medium', color: '#eac435', fontSize: 14 }}>100 {langdetect == 'en' ? 'EGP' : 'ج.م'}</Text>
                                </View> 
                                <View
                                    style={{
                                        height: '100%',
                                        width: 1,
                                        backgroundColor: '#ccc',
                                    }}
                                />
                                <View style={[generalstyles.allcentered, { flex: 1 }]}>
                                    <Text style={[{ fontFamily: 'Poppins-Light', color: '#000', fontSize: 14 }]}>{langdetect == 'en' ? 'Delivery Time' : 'وقت التوصيل'}</Text>
                                    <Text style={{ fontFamily: 'Poppins-Medium', color: '#eac435', fontSize: 14 }}>{vendorinfo.estimateddeliverytime}</Text>
                                </View>
                            </View> */}
                        </View>
                    </View>
                    {/* <View
                        style={{
                            paddingHorizontal: 20,
                            marginTop: 15,
                            backgroundColor: 'white',
                            paddingVertical: 5,
                            position: 'relative',
                        }}
                    >
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: '#ccc',
                                borderRadius: 10,
                            }}
                        >
                            <TextInput
                                // value={'asd'}
                                onChangeText={(value) => {
                                    // setpricerange({ ...pricerange, min: value });
                                }}
                                style={[
                                    generalstyles.poppinsMedium,
                                    {
                                        width: '90%',
                                        height: 40,
                                        paddingHorizontal: 10,
                                        textAlign: langdetect == 'en' ? 'left' : 'right',
                                        fontSize: 13,
                                        color: '#000',
                                    },
                                ]}
                                placeholder={langdetect == 'en' ? 'Search' : 'ابحث'}
                                placeholderTextColor={'#000'}
                            />
                            <AntDesign
                                name="search1"
                                color={'#000'}
                                size={18}
                                style={{
                                    position: 'absolute',
                                    right: 15,
                                    top: 10,
                                }}
                            />
                        </View>
                    </View> */}
                    {/* promocodes */}
                    {/* <Text>{JSON.stringify(vendorinfo.promocode)}</Text> */}
                    {vendorinfo.promocode.length != 0 && (
                        <View
                            style={[
                                generalstyles.flexRow,
                                {
                                    marginTop: 20,
                                    paddingStart: 15,
                                },
                            ]}
                        >
                            {/* <View
                                style={{
                                    width: '90%',
                                }}
                            > */}
                            <FlatList
                                horizontal
                                data={vendorinfo.promocode}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View
                                            style={[
                                                {
                                                    flexDirection: 'column',
                                                    flex: 1,
                                                    marginEnd: 10,
                                                    // borderWidth: 1,
                                                    borderColor: COLORS.success,
                                                    borderRadius: 7,
                                                    paddingHorizontal: 15,
                                                    justifyContent: 'center',
                                                    backgroundColor: '#ffe6f0',
                                                    paddingVertical: 5,
                                                },
                                            ]}
                                            title="Click here to copy to Clipboard"
                                            onPress={() => {
                                                // copyToClipboard();
                                                // showUpTopNotificationBarContext(langdetect == 'en' ? 'Copied to your clipboard!' : 'تم النسخ', 'green');
                                            }}
                                        >
                                            <View
                                                style={[
                                                    generalstyles.flexRow,
                                                    {
                                                        width: '100%',
                                                    },
                                                ]}
                                            >
                                                <Feather name="copy" />
                                                <Text
                                                    style={{
                                                        fontFamily: 'Poppins-Medium',
                                                        color: '#000',
                                                        textAlign: 'left',
                                                        fontSize: 12,
                                                        marginStart: 5,
                                                    }}
                                                    numberOfLines={1}
                                                    ellipsizeMode="tail"
                                                >
                                                    {langdetect == 'en' ? 'Use Promocode:' : 'إستخدم الكود:'}
                                                </Text>
                                            </View>
                                            <Text
                                                style={{
                                                    fontFamily: 'Poppins-Medium',
                                                    color: COLORS.danger,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.timeline_text_fontsize),
                                                    textAlign: 'left',
                                                    fontSize: 13,
                                                }}
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                            >
                                                {item.couponname} {langdetect == 'en' ? 'at checkout' : 'عند الدفع'}
                                            </Text>
                                        </View>
                                    );
                                }}
                            />
                            {/* </View> */}
                            {/* <View style={{ marginStart: 'auto', marginEnd: 10 }}>
                                <TouchableOpacity
                                    style={[
                                        generalstyles.allcentered,
                                        {
                                            width: 45,
                                            height: 45,
                                            borderWidth: 1,
                                            borderColor: '#000',
                                            borderRadius: 100,
                                        },
                                    ]}
                                    onPress={() => {
                                        if (opensearch == false) {
                                            // setprice_maxpassed('');
                                            // setprice_minpassed('');
                                            setopensearch(!opensearch);
                                        } else {
                                            setopensearch(!opensearch);
                                        }
                                    }}
                                >
                                    {opensearch == false && <AntDesign name="search1" color={'#000'} size={15} />}
                                    {opensearch == true && <AntDesign name="close" color={'#000'} size={15} />}
                                </TouchableOpacity>
                            </View> */}
                        </View>
                    )}
                    {vendorinfo?.vendorcollections.length != 0 && (
                        <View
                            style={[
                                generalstyles.flexRow,
                                {
                                    marginTop: 20,
                                    marginBottom: 20,
                                    paddingStart: 11,
                                    backgroundColor: 'white',
                                    paddingVertical: 10,
                                },
                            ]}
                        >
                            <View
                                style={{
                                    width: sectionproperties.showpricerangefilter == 'Show' ? '82%' : '100%',
                                }}
                            >
                                <FlatList
                                    horizontal
                                    data={vendorinfo?.vendorcollections}
                                    renderItem={({ item, index }) => {
                                        if (item.isinftiler == 1 && item.isshowntocustomers == 1) {
                                            return (
                                                <TouchableOpacity
                                                    style={[
                                                        generalstyles.allcentered,
                                                        {
                                                            flexDirection: 'row',
                                                            alignContent: 'center',
                                                            alignItems: 'center',
                                                            flex: 1,
                                                            marginEnd: 10,
                                                            borderWidth: 1,
                                                            borderColor: item.isselected == true ? '#000' : '#ccc',
                                                            borderRadius: 100,
                                                            height: 45,
                                                            paddingHorizontal: 15,
                                                        },
                                                    ]}
                                                    onPress={() => {
                                                        // var temp = [...collections];
                                                        // temp.map((arrayitem, arrayindex) => {
                                                        //     arrayitem.isselected = false;
                                                        // });
                                                        // temp[index].isselected = true;
                                                        // setcollections([...temp]);
                                                        // routingcountext(StaticPagesLinksContext.VendorPage, {
                                                        //     genprodcompstinfo: {
                                                        //         vendorsarr: route?.params?.genprodcompstinfo?.vendorsarr,
                                                        //         collectionid: [item.collectionid],
                                                        //         srcfrom: 'collections',
                                                        //         fetchingtype: 'collections',
                                                        //     },
                                                        // });
                                                        var tempvendor = { ...vendorinfo };
                                                        // tempvendor.vendorcollections.forEach(function(itemloc){

                                                        // })
                                                        if (item.isselected) {
                                                            tempvendor.vendorcollections[index].isselected = false;
                                                        } else {
                                                            tempvendor.vendorcollections[index].isselected = true;
                                                        }
                                                        var tempcolidsarr = [];
                                                        tempvendor.vendorcollections?.forEach(function (locitem) {
                                                            if (locitem.isselected) {
                                                                tempcolidsarr.push(locitem.collectionid);
                                                            }
                                                        });
                                                        setcollectionidparams(tempcolidsarr);
                                                        setvendorinfo({ ...vendorinfo });
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontFamily:
                                                                sectionproperties.timeline_text_fontweight == 300
                                                                    ? 'Poppins-Thin'
                                                                    : sectionproperties.timeline_text_fontweight == 400
                                                                    ? 'Poppins-Light'
                                                                    : sectionproperties.timeline_text_fontweight == 500
                                                                    ? 'Poppins-Regular'
                                                                    : sectionproperties.timeline_text_fontweight == 600
                                                                    ? 'Poppins-Medium'
                                                                    : sectionproperties.timeline_text_fontweight == 700
                                                                    ? 'Poppins-Semibold'
                                                                    : 'Poppins-Bold',
                                                            fontFamily: 'Poppins-Medium',
                                                            color: item.isselected == true ? '#000' : '#000',
                                                            opacity: item.isselected == true ? 1 : 0.7,
                                                            fontSize: 13,
                                                            textAlign: 'left',
                                                        }}
                                                        numberOfLines={1}
                                                        ellipsizeMode="tail"
                                                    >
                                                        {langdetect == 'en' ? item.title_en : item.title_ar}
                                                    </Text>
                                                </TouchableOpacity>
                                            );
                                        }
                                    }}
                                />
                            </View>
                            {sectionproperties.showpricerangefilter == 'Show' && (
                                <View style={{ marginStart: 'auto', marginEnd: 10 }}>
                                    <TouchableOpacity
                                        style={[
                                            generalstyles.allcentered,
                                            {
                                                width: 45,
                                                height: 45,
                                                borderWidth: 1,
                                                borderColor: '#000',
                                                borderRadius: 100,
                                            },
                                        ]}
                                        onPress={() => {
                                            if (openpricemodal == false) {
                                                // setprice_maxpassed('');
                                                // setprice_minpassed('');
                                                setopenpricemodal(!openpricemodal);
                                            } else {
                                                setopenpricemodal(!openpricemodal);
                                            }
                                        }}
                                    >
                                        {openpricemodal == false && <Feather name="sliders" color={'#000'} size={15} />}
                                        {openpricemodal == true && <AntDesign name="close" color={'#000'} size={15} />}
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    )}
                    {openpricemodal == true && (
                        <View
                            style={{
                                width: '100%',
                                backgroundColor: 'white',
                            }}
                        >
                            <View
                                style={[
                                    generalstyles.flexRow,
                                    {
                                        width: '100%',
                                        backgroundColor: 'white',
                                        paddingVertical: 15,
                                    },
                                ]}
                            >
                                <View style={{ flex: 1, marginHorizontal: 10 }}>
                                    <View
                                        style={{
                                            backgroundColor: '#ffffff',
                                            position: 'absolute',
                                            top: -10,
                                            zIndex: 100,
                                            left: Platform.OS === 'ios' ? 20 : 5,
                                        }}
                                    >
                                        <Text
                                            style={[
                                                generalstyles.poppinsMedium,
                                                {
                                                    color: '#000',
                                                    paddingHorizontal: 10,
                                                    fontSize: Platform.OS === 'ios' ? 13 : 11,
                                                },
                                            ]}
                                        >
                                            {langdetect == 'en' ? 'Minimum Price' : 'الحد الادنى'}
                                        </Text>
                                    </View>
                                    <TextInput
                                        value={pricerange.min}
                                        onChangeText={(value) => {
                                            setpricerange({ ...pricerange, min: value });
                                        }}
                                        style={[
                                            generalstyles.poppinsMedium,
                                            {
                                                width: '100%',
                                                borderWidth: 1,
                                                borderColor: '#ccc',
                                                height: 40,
                                                borderRadius: 10,
                                                paddingHorizontal: 10,
                                                fontSize: 13,
                                                color: '#000',
                                            },
                                        ]}
                                        keyboardType="numeric"
                                    />
                                </View>
                                <View style={{ flex: 1, marginHorizontal: 10 }}>
                                    <View
                                        style={{
                                            backgroundColor: '#ffffff',
                                            position: 'absolute',
                                            top: -10,
                                            zIndex: 100,
                                            left: Platform.OS === 'ios' ? 20 : 5,
                                        }}
                                    >
                                        <Text
                                            style={[
                                                generalstyles.poppinsMedium,
                                                {
                                                    color: '#000',
                                                    paddingHorizontal: 10,
                                                    fontSize: Platform.OS === 'ios' ? 13 : 11,
                                                },
                                            ]}
                                        >
                                            {langdetect == 'en' ? 'Maximum Price' : 'الحد الاقصى'}
                                        </Text>
                                    </View>
                                    <TextInput
                                        value={pricerange.max}
                                        onChangeText={(value) => {
                                            setpricerange({ ...pricerange, max: value });
                                        }}
                                        style={[
                                            generalstyles.poppinsMedium,
                                            {
                                                width: '100%',
                                                borderWidth: 1,
                                                borderColor: '#ccc',
                                                height: 40,
                                                borderRadius: 10,
                                                paddingHorizontal: 10,
                                                fontSize: 13,
                                                color: '#000',
                                            },
                                        ]}
                                        keyboardType="numeric"
                                    />
                                </View>
                                <View style={[generalstyles.allcentered, {}]}>
                                    <TouchableOpacity
                                        style={[generalstyles.allcentered, { marginHorizontal: 10, width: 45, height: 45, backgroundColor: COLORS.success, borderRadius: 100 }]}
                                        onPress={() => {
                                            setprice_maxpassed(pricerange.max);
                                            setprice_minpassed(pricerange.min);
                                        }}
                                    >
                                        <Text
                                            style={[
                                                generalstyles.poppinsMedium,
                                                {
                                                    color: '#fff',
                                                    fontSize: 12,
                                                    // textDecorationLine: 'underline',
                                                },
                                            ]}
                                        >
                                            {langdetect == 'en' ? 'Filter' : 'فلترة'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                    {/* <Text>{JSON.stringify(vendorinfo.vendorcollections)}</Text> */}
                    {/* price */}

                    {StatePageProperties?.pageobj?.sections?.map((item, index) => {
                        if (item.tabexsectioninfo != null && TabexSectionsComponentsContext[item.tabexsectioninfo.sectioncompname] != undefined && item.componenttype == 'section') {
                            var sectioncomp = TabexSectionsComponentsContext[item.tabexsectioninfo.sectioncompname];
                            return (
                                <View>
                                    {item.tabexsectioninfo.sectiontype == 'Cards' && (
                                        <ProductsCardsSectionContext_Provider>
                                            {React.createElement(sectioncomp, {
                                                sectionidprops: item.sectionid,
                                                sectionindexprops: index,
                                                srcfromprops: 'GeneralVendorComponent',
                                                scrollviewtoend: props.scrollviewtoend,
                                                vendorsarrpassed: [route?.params?.genprodcompstinfo?.vendorsarr],
                                                Countryidpassed: Countryidpassed?.length != 0 ? Countryidpassed : '',
                                                Stateidpassed: Stateidpassed?.length != 0 ? Stateidpassed : '',
                                                Cityidpassed: Cityidpassed?.length != 0 ? Cityidpassed : '',
                                                price_minpassed: price_minpassed?.length != 0 ? price_minpassed : '',
                                                price_maxpassed: price_maxpassed?.length != 0 ? price_maxpassed : '',
                                                // collectionidprops: route?.params?.genprodcompstinfo?.collectionid?.length != 0 ? route?.params?.genprodcompstinfo?.collectionid : '',
                                                collectionidprops: collectionidparams.length != 0 ? collectionidparams : '',
                                                fetchingtypepassedprops: fetchingtypepassed?.length != 0 ? fetchingtypepassed : '',
                                                prod_featruesarpassed: prod_featruesarpassed?.length != 0 ? prod_featruesarpassed : [],

                                                grouptypeprops: grouptypeparams,
                                                grouptyperefidprops: collectionidparams,
                                                StatePagePropertiesprops: props.StatePagePropertiesprops,
                                                parenttype: parenttype,
                                            })}
                                        </ProductsCardsSectionContext_Provider>
                                    )}
                                    {item.tabexsectioninfo.sectiontype != 'Cards' &&
                                        React.createElement(sectioncomp, { sectionidprops: item.sectionid, sectionindexprops: index, StatePageProperties: StatePageProperties })}
                                </View>
                            );
                        }
                    })}
                </View>
            )}
        </View>
    );
};
export default React.memo(GeneralVendorComponent);
