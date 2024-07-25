import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { useDispatch, useSelector } from 'react-redux';
import { ImageComponent } from '../../../ImageComponent';
// import StarRating from 'react-native-star-rating';
import { SIZES } from '../../GeneralFiles/constants';
import { AntDesign } from '@expo/vector-icons';
import SpinnerButton from 'react-native-spinner-button';
import Stars from 'react-native-stars';
import { FontAwesome } from '@expo/vector-icons';
const AddReview = (props) => {
    const route = useRoute();
    const navigation = useNavigation();
    const { GeneralAPIMutationContext, showUpTopNotificationBarContext } = useContext(FetchingContext);
    const { lang, langdetect, setlang } = useContext(LanguageContext);
    const [reviewpayloadobj, setreviewpayloadobj] = useState({
        reviewtitle: '',
        reviewbody: '',
        reviewrate: 0,
        reviewname: '',
        hasreview: 0,
    });
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const [StatePageProperties, setStatePageProperties] = useState({});
    const { StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const fetchProductInfoQuery = route?.params?.fetchProductInfoQuery;

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

    // useEffect(() => {
    //     if (route?.params?.itemobj?.hasreview == 1) {
    //         setreviewpayloadobj({
    //             reviewtitle: route?.params?.reviewpayloadobj?.reviewtitle,
    //             reviewbody: route?.params?.reviewpayloadobj?.reviewbody,
    //             reviewrate: route?.params?.reviewpayloadobj?.reviewrate,
    //             reviewname: route?.params?.reviewpayloadobj?.reviewname,
    //         });
    //     }
    // }, []);

    return (
        <View
            style={[
                {
                    height: SIZES.height,
                    width: '100%',
                    flex: 1,
                    backgroundColor: 'white',
                },
            ]}
        >
            <View
                style={{
                    paddingHorizontal: 15,
                }}
            >
                <View style={[generalstyles.allcentered, generalstyles.flexRow, { marginTop: 20, textAlign: 'left', justifyContent: 'flex-start' }]}>
                    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                        <TouchableOpacity
                            style={{
                                marginEnd: 'auto',
                            }}
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <AntDesign
                                name={langdetect == 'en' ? 'arrowleft' : 'arrowright'}
                                size={20}
                                style={{
                                    color: sectionproperties.sectionTitleColor,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[generalstyles.allcentered, { flex: 1 }]}>
                        <Text style={[generalstyles.poppinsMedium, { fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize), color: sectionproperties.sectionTitleColor }]}>
                            {langdetect == 'en' ? sectionproperties.sectionTitleContent : sectionproperties.sectionTitleContent_ar}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
                <View
                    style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: '#eee',
                        marginBottom: 15,
                        marginTop: 20,
                    }}
                />
                <View style={[generalstyles.flexRow, { width: '100%', marginBottom: 30 }]}>
                    <View style={{}}>
                        <View style={{ width: 100, height: 100, marginEnd: 5 }}>
                            <ImageComponent path={fetchProductInfoQuery?.data?.data?.productinfo?.productmainimage} resizeMode="contain" style={{ width: '100%', height: '100%' }} />
                        </View>
                    </View>
                    <View style={[generalstyles.flexColumn, { width: '70%' }]}>
                        <Text
                            numberOfLines={3}
                            ellipsizeMode="tail"
                            style={{
                                textAlign: 'left',
                                marginBottom: 5,
                                fontSize: StyleParseToIntFuncContext(sectionproperties.prodNameFontSize),
                                textTransform:
                                    sectionproperties.prodNameTextTranform == 'Capitalize'
                                        ? 'capitalize'
                                        : sectionproperties.prodNameTextTranform == 'Lowercase'
                                        ? 'lowercase'
                                        : sectionproperties.prodNameTextTranform == 'Uppercase'
                                        ? 'uppercase'
                                        : 'none',
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
                                color: sectionproperties.prodNameColor,
                            }}
                        >
                            {langdetect == 'en' ? fetchProductInfoQuery?.data?.data?.productinfo?.name_en : fetchProductInfoQuery?.data?.data?.productinfo?.name_ar}
                        </Text>
                        <View
                            style={{
                                width: '30%',
                            }}
                        >
                            {/* <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={fetchProductInfoQuery?.data?.data?.productinfo?.productoverallrate}
                                starSize={18}
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
                    </View>
                </View>
                <View style={[styles.inputscontainer, { marginBottom: 30 }]}>
                    <Text
                        style={[
                            generalstyles.poppinsMedium,
                            {
                                textAlign: 'left',
                                color: sectionproperties.form_labelcolor,
                                marginBottom: 10,
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
                                fontSize: StyleParseToIntFuncContext(sectionproperties.form_labelfontsize),
                            },
                        ]}
                    >
                        {langdetect == 'en' ? 'Your Rating' : 'التقييم'}
                    </Text>
                    <View
                        style={{
                            width: '30%',
                        }}
                    >
                        {/* <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={reviewpayloadobj.reviewrate}
                            starSize={25}
                            fullStarColor="#FAB400"
                            emptyStarColor="#FAB400"
                            selectedStar={(value) => {
                                setreviewpayloadobj({ ...reviewpayloadobj, reviewrate: value });
                            }}
                        /> */}
                        <Stars
                            display={reviewpayloadobj.reviewrate}
                            spacing={1}
                            count={5}
                            half={true}
                            fullStar={<FontAwesome name={'star'} size={14} color="#FAB400" />}
                            emptyStar={<FontAwesome name={'star-o'} size={14} color="#FAB400" />}
                            halfStar={<FontAwesome name={'star-half-empty'} size={14} color="#FAB400" />}
                            update={(val) => {
                                setreviewpayloadobj({ ...reviewpayloadobj, reviewrate: val });
                            }}
                        />
                    </View>
                </View>
                <View style={[styles.inputscontainer, { marginBottom: 30 }]}>
                    <Text
                        style={[
                            {
                                textAlign: 'left',
                                color: sectionproperties.form_labelcolor,
                                marginBottom: 10,
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
                                fontSize: StyleParseToIntFuncContext(sectionproperties.form_labelfontsize),
                            },
                        ]}
                    >
                        {langdetect == 'en' ? 'Your Name' : 'اسمك'}
                    </Text>
                    <TextInput
                        style={[
                            {
                                paddingHorizontal: 10,
                                fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                backgroundColor: 'white',
                                borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
                                color: sectionproperties.inputfieldcolor,
                                borderWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                borderColor: sectionproperties.inputfieldborderColor,
                                height: StyleParseToIntFuncContext(sectionproperties.inputfieldheight),
                            },
                        ]}
                        value={reviewpayloadobj.reviewname}
                        onChangeText={(event) => {
                            var tempreviewpayloadobj = { ...reviewpayloadobj };
                            tempreviewpayloadobj.reviewname = event;
                            setreviewpayloadobj({ ...tempreviewpayloadobj });
                        }}
                    />
                </View>
                <View style={[styles.inputscontainer, { marginBottom: 30 }]}>
                    <Text
                        style={[
                            generalstyles.poppinsMedium,
                            {
                                textAlign: 'left',
                                color: sectionproperties.form_labelcolor,
                                marginBottom: 10,
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
                                fontSize: StyleParseToIntFuncContext(sectionproperties.form_labelfontsize),
                            },
                        ]}
                    >
                        {langdetect == 'en' ? 'Review title' : 'عنوان التقييم'}
                    </Text>
                    <TextInput
                        style={[
                            {
                                paddingHorizontal: 10,
                                fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                backgroundColor: 'white',
                                borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
                                color: sectionproperties.inputfieldcolor,
                                borderWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                borderColor: sectionproperties.inputfieldborderColor,
                                height: StyleParseToIntFuncContext(sectionproperties.inputfieldheight),
                            },
                        ]}
                        value={reviewpayloadobj.reviewtitle}
                        onChangeText={(event) => {
                            var tempreviewpayloadobj = { ...reviewpayloadobj };
                            tempreviewpayloadobj.reviewtitle = event;
                            setreviewpayloadobj({ ...tempreviewpayloadobj });
                        }}
                    />
                </View>
                <View style={[styles.inputscontainer, { marginBottom: 30 }]}>
                    <Text
                        style={[
                            generalstyles.poppinsMedium,
                            {
                                textAlign: 'left',
                                color: sectionproperties.form_labelcolor,
                                marginBottom: 10,
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
                                fontSize: StyleParseToIntFuncContext(sectionproperties.form_labelfontsize),
                            },
                        ]}
                    >
                        {langdetect == 'en' ? 'Your Review' : 'تقييمك'}
                    </Text>
                    <TextInput
                        style={[
                            {
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                backgroundColor: 'white',
                                borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
                                color: sectionproperties.inputfieldcolor,
                                borderWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                borderColor: sectionproperties.inputfieldborderColor,
                                minHeight: StyleParseToIntFuncContext(sectionproperties.inputfieldheight),
                            },
                        ]}
                        value={reviewpayloadobj.reviewbody}
                        onChangeText={(event) => {
                            var tempreviewpayloadobj = { ...reviewpayloadobj };
                            tempreviewpayloadobj.reviewbody = event;
                            setreviewpayloadobj({ ...tempreviewpayloadobj });
                        }}
                        multiline
                    />
                </View>

                {/* <View style={[styles.inputscontainer, { marginBottom: 30 }]}>
                    <Text style={[generalstyles.poppinsMedium, { textAlign: 'left' }]}>Rate</Text>
                    <TextInput
                        style={[
                            {
                                color: 'black',
                                fontSize: 10,
                                shadowColor: 'black',
                                shadowOpacity: 0.1,

                                backgroundColor: 'white',
                            },
                        ]}
                        value={reviewpayloadobj?.reviewrate?.toString()}
                        keyboardType={'numeric'}
                        onChangeText={(event) => {
                            var tempreviewpayloadobj = { ...reviewpayloadobj };
                            tempreviewpayloadobj.reviewrate = event;
                            setreviewpayloadobj({ ...tempreviewpayloadobj });
                        }}
                    />
                </View> */}

                {/* {route?.params?.itemobj?.hasreview == 0 && ( */}
                <View style={[generalstyles.allcentered, { marginTop: 20 }]}>
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
                        disabled={GeneralAPIMutationContext.isLoading}
                        onPress={() => {
                            if (
                                reviewpayloadobj.reviewtitle.length != 0 &&
                                reviewpayloadobj.reviewbody.length != 0 &&
                                reviewpayloadobj.reviewrate.length != 0 &&
                                parseInt(reviewpayloadobj.reviewrate) > 0 &&
                                reviewpayloadobj.reviewname.length != 0
                            ) {
                                var tempreviewpayloadobj = reviewpayloadobj;
                                tempreviewpayloadobj.endpointurl = '/addproductreview';
                                tempreviewpayloadobj.productid = fetchProductInfoQuery?.data?.data?.productinfo?.productid;
                                GeneralAPIMutationContext.mutate({
                                    endpointurl: '/addproductreview',
                                    productid: fetchProductInfoQuery?.data?.data?.productinfo?.productid,
                                    reviewpayloadobj: reviewpayloadobj,

                                    mutateSuccesscallback: (data, variables) => {
                                        if (data.data.status) {
                                            showUpTopNotificationBarContext(langdetect == 'en' ? 'Review Added' : 'تم ', 'green');
                                            fetchProductInfoQuery.refetch();
                                            route?.params?.getreviewsassignermutationfunc();
                                            navigation.goBack();
                                        } else {
                                            alert(data.data.reason);
                                        }
                                    },
                                });
                            } else {
                                showUpTopNotificationBarContext(langdetect == 'en' ? 'Please complete the missing fields' : 'من فضلك اكمل باقى البيانات', 'orange');
                            }
                        }}
                    >
                        {!GeneralAPIMutationContext.isLoading && (
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
                        )}
                        {GeneralAPIMutationContext.isLoading && (
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
                </View>
                {/* )} */}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({});

export default AddReview;
