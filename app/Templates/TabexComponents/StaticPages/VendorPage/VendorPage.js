import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { icons, COLORS, images, SIZES } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { ImageComponent } from '../../../ImageComponent';
// import StarRating from 'react-native-star-rating';
import { ScrollView } from 'react-native-gesture-handler';
// import * as Clipboard from 'expo-clipboard';
import Stars from 'react-native-stars';
import { FontAwesome } from '@expo/vector-icons';
const VendorPage = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const navigation = useNavigation();
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { showUpTopNotificationBarContext, FetchQueriesEngineContext, setFetchQueriesEngineContext } = useContext(FetchingContext);
    const [StatePageProperties, setStatePageProperties] = useState({});
    const [sectionproperties, setsectionproperties] = useState('');
    const [collections, setcollections] = useState([
        {
            title_en: 'collection',
            title_ar: 'collection',
        },
        {
            title_en: 'collection',
            title_ar: 'collection',
        },
        {
            title_en: 'collection',
            title_ar: 'collection',
        },
        {
            title_en: 'collection',
            title_ar: 'collection',
        },
        {
            title_en: 'collection',
            title_ar: 'collection',
        },
        {
            title_en: 'collection',
            title_ar: 'collection',
        },
    ]);

    useEffect(() => {
        var tempFetchQueriesEngineContext = { ...FetchQueriesEngineContext };
        tempFetchQueriesEngineContext.fetchfavoriteproducts = true;
        setFetchQueriesEngineContext({ ...tempFetchQueriesEngineContext });
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
    // const [copiedText, setCopiedText] = React.useState('');

    // const copyToClipboard = async () => {
    //     await Clipboard.setStringAsync('hello world');
    // };

    // const fetchCopiedText = async () => {
    //     const text = await Clipboard.getStringAsync();
    //     setCopiedText(text);
    // };

    return (
        <View
            style={[
                generalstyles.container,
                {
                    height: SIZES.height,
                    flex: 1,
                    paddingTop: 0,
                    backgroundColor: '#f8f8f9',
                },
            ]}
        >
            {Object.keys(sectionproperties).length != 0 && (
                <View
                    style={{
                        width: '100%',
                        paddingTop: 15,
                    }}
                >
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
                                }}
                            >
                                {/* vendor logo */}
                                <View
                                    style={{
                                        width: 90,
                                        height: 90,
                                        borderRadius: 10,
                                        overflow: 'hidden',
                                    }}
                                >
                                    <ImageComponent
                                        path={'/tr:w-500,h-500/' + 'storage/institutes/65563913f2e55/generalimages/gallery/6556464b31bb9generalimage.png?ik-sdk-version=react-1.1.1'}
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
                                        justifyContent: 'center',
                                    }}
                                >
                                    {/* vendor name */}

                                    <Text
                                        style={[
                                            generalstyles.poppinsMedium,
                                            {
                                                fontSize: 15,
                                                color: '#000',
                                                marginBottom: 5,
                                                textAlign: 'left',
                                            },
                                        ]}
                                    >
                                        asdasd
                                    </Text>
                                    {/* vendor rating */}

                                    <View style={[generalstyles.flexRow]}>
                                        {/* <StarRating disabled={true} maxStars={5} rating={5} starSize={17} fullStarColor="#FAB400" emptyStarColor="#FAB400" /> */}
                                        <Text
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
                                        </Text>
                                    </View>
                                    <View
                                        style={[
                                            generalstyles.flexRow,
                                            {
                                                marginTop: 5,
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
                                </View>
                            </View>
                            <View
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
                                    <Text style={{ fontFamily: 'Poppins-Medium', color: '#eac435', fontSize: 14 }}>100 {langdetect == 'en' ? 'EGP' : 'ج.م'}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* promocodes */}
                    <View
                        style={{
                            marginTop: 20,
                            paddingStart: 15,
                        }}
                    >
                        <FlatList
                            horizontal
                            data={collections}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
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
                                        // title="Click here to copy to Clipboard"
                                        // onPress={() => {
                                        //     copyToClipboard();
                                        //     showUpTopNotificationBarContext(langdetect == 'en' ? 'Copied to your clipboard!' : 'تم النسخ', 'green');
                                        // }}
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
                                            elorder20 {langdetect == 'en' ? 'at checkout' : 'عند الدفع'}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                    <View
                        style={{
                            marginTop: 20,
                            marginBottom: 20,
                            paddingStart: 11,
                        }}
                    >
                        <FlatList
                            horizontal
                            data={collections}
                            renderItem={({ item, index }) => {
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
                                            var temp = [...collections];
                                            temp.map((arrayitem, arrayindex) => {
                                                arrayitem.isselected = false;
                                            });
                                            temp[index].isselected = true;
                                            setcollections([...temp]);
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
                                                color: item.isselected == true ? sectionproperties.activecat_color : sectionproperties.timeline_text_color,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.timeline_text_fontsize),
                                                textAlign: 'left',
                                            }}
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >
                                            {langdetect == 'en' ? item.title_en : item.title_ar}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                    <View
                        style={{
                            marginTop: 15,
                            paddingHorizontal: 11,
                        }}
                    >
                        <FlatList
                            scrollEnabled={false}
                            vertical
                            numColumns={1}
                            data={collections}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        style={[
                                            generalstyles.allcentered,
                                            {
                                                width: '100%',
                                                flexDirection: 'column',
                                                alignContent: 'center',
                                                alignItems: 'center',
                                            },
                                        ]}
                                        onPress={() => {}}
                                    >
                                        <View
                                            style={{
                                                width: '100%',
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: '100%',
                                                    flexDirection: 'row',
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        width: 90,
                                                        height: 90,
                                                        borderRadius: 10,
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    <ImageComponent
                                                        path={'/tr:w-500,h-500/' + 'storage/institutes/65563913f2e55/generalimages/gallery/6556464b31bb9generalimage.png?ik-sdk-version=react-1.1.1'}
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
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Text
                                                        style={[
                                                            generalstyles.poppinsMedium,
                                                            {
                                                                fontSize: 15,
                                                                color: '#000',
                                                                marginBottom: 2,
                                                            },
                                                        ]}
                                                    >
                                                        Product name
                                                    </Text>
                                                    <View
                                                        style={[
                                                            generalstyles.flexRow,
                                                            {
                                                                marginBottom: 5,
                                                            },
                                                        ]}
                                                    >
                                                        {/* <StarRating disabled={true} maxStars={5} rating={5} starSize={14} fullStarColor="#FAB400" emptyStarColor="#FAB400" /> */}
                                                    </View>
                                                    <Text
                                                        style={[
                                                            generalstyles.poppinsMedium,
                                                            {
                                                                fontSize: 15,
                                                                color: '#000',
                                                            },
                                                        ]}
                                                    >
                                                        100 EGP
                                                    </Text>
                                                    <Text
                                                        style={[
                                                            // generalstyles.poppinsMedium,
                                                            {
                                                                fontSize: 13,
                                                                color: 'red',
                                                                marginBottom: 5,
                                                                textDecorationLine: 'line-through',
                                                                textDecorationStyle: 'solid',
                                                                fontFamily: 'Poppins-Light',
                                                            },
                                                        ]}
                                                    >
                                                        100 EGP
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View
                                            style={{
                                                width: '100%',
                                                backgroundColor: '#ccc',
                                                height: 1,
                                                marginVertical: 20,
                                            }}
                                        />
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({});

export default VendorPage;
