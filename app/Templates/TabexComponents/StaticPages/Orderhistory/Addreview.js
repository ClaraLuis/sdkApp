import React, { useState, useContext, useEffect, Fragment } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, SafeAreaView, FlatList } from 'react-native';
import { icons, SIZES, COLORS, images } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { urlEndpoint } from '../../../../config/imagekit';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const Addreview = (props) => {
    const route = useRoute();
    const { GeneralAPIMutationContext } = useContext(FetchingContext);
    const [reviewpayloadobj, setreviewpayloadobj] = useState({
        reviewtitle: '',
        reviewbody: '',
        reviewrate: 0,
        reviewname: '',
    });
    useEffect(() => {
        if (route?.params?.itemobj?.hasreview == 1) {
            setreviewpayloadobj({
                reviewtitle: route?.params?.reviewpayloadobj?.reviewtitle,
                reviewbody: route?.params?.reviewpayloadobj?.reviewbody,
                reviewrate: route?.params?.reviewpayloadobj?.reviewrate,
                reviewname: route?.params?.reviewpayloadobj?.reviewname,
            });
        }
    }, []);
    return (
        <View
            style={[
                generalstyles.container,
                {
                    height: '100%',
                    paddingStart: 0,
                    paddingEnd: 0,
                    paddingTop: 100,
                    // paddingTop: StyleParseToIntFuncContext(sectionproperties.marginTop, '', true),
                    // paddingBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom, '', true),
                },
            ]}
        >
            {/* <Text> {JSON.stringify(route.params.itemobj)}</Text> */}
            <Text>add review</Text>

            <View style={[styles.inputscontainer]}>
                <Text style={[generalstyles.poppinsMedium, { textAlign: 'left' }]}>Title</Text>
                <TextInput
                    style={[
                        styles.textinput,
                        {
                            color: 'black',
                            fontSize: 10,
                            shadowColor: 'black',
                            shadowOpacity: 0.1,
                            // shadowOpacity: sectionproperties.inputshadowopacity,
                            backgroundColor: 'white',
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
            <View style={[styles.inputscontainer]}>
                <Text style={[generalstyles.poppinsMedium, { textAlign: 'left' }]}>Body</Text>
                <TextInput
                    style={[
                        styles.textinput,
                        {
                            color: 'black',
                            fontSize: 10,
                            shadowColor: 'black',
                            shadowOpacity: 0.1,
                            // shadowOpacity: sectionproperties.inputshadowopacity,
                            backgroundColor: 'white',
                        },
                    ]}
                    value={reviewpayloadobj.reviewbody}
                    onChangeText={(event) => {
                        var tempreviewpayloadobj = { ...reviewpayloadobj };
                        tempreviewpayloadobj.reviewbody = event;
                        setreviewpayloadobj({ ...tempreviewpayloadobj });
                    }}
                />
            </View>
            <View style={[styles.inputscontainer]}>
                <Text style={[generalstyles.poppinsMedium, { textAlign: 'left' }]}>Rate</Text>
                <TextInput
                    style={[
                        styles.textinput,
                        {
                            color: 'black',
                            fontSize: 10,
                            shadowColor: 'black',
                            shadowOpacity: 0.1,
                            // shadowOpacity: sectionproperties.inputshadowopacity,
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
            </View>
            <View style={[styles.inputscontainer]}>
                <Text style={[generalstyles.poppinsMedium, { textAlign: 'left' }]}>Name</Text>
                <TextInput
                    style={[
                        styles.textinput,
                        {
                            color: 'black',
                            fontSize: 10,
                            shadowColor: 'black',
                            shadowOpacity: 0.1,
                            // shadowOpacity: sectionproperties.inputshadowopacity,
                            backgroundColor: 'white',
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
            {route?.params?.itemobj?.hasreview == 0 && (
                <TouchableOpacity
                    style={{ marginTop: 20 }}
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
                            tempreviewpayloadobj.orderitemid = route.params.itemobj.orderitemid;
                            GeneralAPIMutationContext.mutate({
                                endpointurl: '/addproductreview',
                                orderitemid: route.params.itemobj.orderitemid,
                                reviewpayloadobj: reviewpayloadobj,

                                mutateSuccesscallback: (data, variables) => {
                                    if (data.data.status) {
                                        alert('ssucc');
                                    } else {
                                        alert(data.data.reason);
                                    }
                                },
                            });
                        } else {
                            alert('Please fill the missing fields');
                        }
                    }}
                >
                    <Text>Submit</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    wishlistCard: {
        width: SIZES.width - 160,
        height: 270,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        alignItems: 'center',
        marginEnd: 10,
        marginStart: 10,
        marginBottom: 30,
    },
    wishlistCardImageCont: {
        width: '100%',
        height: 220,
        borderRadius: 10,
        elevation: 1,
        borderColor: COLORS.white,
        borderWidth: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        position: 'relative',
    },
    wishlistCardImage: {
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
});

export default Addreview;
