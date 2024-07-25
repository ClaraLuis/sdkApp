import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
// import { Contexthandlerscontext } from '../../Contexthandlerscontext.js';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';

import { FontAwesome, Feather, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Badge, Icon } from 'react-native-elements';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
const Bottomnavigation = (props) => {
    const navigation = useNavigation();
    const { lang, langdetect } = React.useContext(LanguageContext);
    const { fetchAuthorizationQueryContext, fetchcustomercartQueryContext, FetchWebsiteTempatInfoQueryContext } = React.useContext(FetchingContext);
    const [COLORS, setasd] = useState({ primary: 'orange' });
    return (
        <View style={{ width: '100%' }}>
            <View style={[generalstyles.flexRow]}>
                {/* {FetchWebsiteTempatInfoQueryContext.data.data.websitepages.map(function (item, index) {
                    if (item.isinbottomnav == 1) {
                        return (
                            <TouchableOpacity style={[generalstyles.allcentered, { flex: 1, marginTop: 'auto', marginBottom: 'auto' }]} onPress={() => navigation.navigate(item.routename)}>
                                <Feather
                                    name="home"
                                    color={props.currentroutenameprops == item.routename ? COLORS.primary : '#898989'}
                                    size={Platform.OS === 'ios' ? 22 : 19}
                                    style={{ marginBottom: 5 }}
                                />
                                <Text
                                    style={[
                                        generalstyles.primaryLight,
                                        { color: props.currentroutenameprops == item.routename ? COLORS.primary : '#898989', fontSize: Platform.OS === 'ios' ? 15 : 12 },
                                    ]}
                                >
                                    {langdetect == 'en' ? item.pagename_en : item.pagename_ar}
                                </Text>
                            </TouchableOpacity>
                        );
                    }
                })} */}
                <TouchableOpacity style={[generalstyles.allcentered, { flex: 1, marginTop: 'auto', marginBottom: 'auto' }]} onPress={() => navigation.navigate('Collectionscats')}>
                    <MaterialIcons
                        name="dashboard-customize"
                        color={props.currentroutenameprops == 'Collectionscats' ? COLORS.primary : '#898989'}
                        size={Platform.OS === 'ios' ? 22 : 19}
                        style={{ marginBottom: 5 }}
                    />
                    <Text style={[generalstyles.primaryLight, { color: props.currentroutenameprops == 'Collectionscats' ? COLORS.primary : '#898989', fontSize: Platform.OS === 'ios' ? 15 : 12 }]}>
                        {lang.collections}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[generalstyles.allcentered, { flex: 1, marginTop: 'auto', marginBottom: 'auto' }]} onPress={() => navigation.navigate('Wholesalers')}>
                    <MaterialIcons
                        name="inventory"
                        color={props.currentroutenameprops == 'Wholesalers' ? COLORS.primary : '#898989'}
                        size={Platform.OS === 'ios' ? 22 : 19}
                        style={{ marginBottom: 5 }}
                    />
                    <Text style={[generalstyles.primaryLight, { color: props.currentroutenameprops == 'Wholesalers' ? COLORS.primary : '#898989', fontSize: Platform.OS === 'ios' ? 15 : 12 }]}>
                        {lang.wholesalers}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[generalstyles.allcentered, { flex: 1, marginTop: 'auto', marginBottom: 'auto' }]}
                    onPress={() => {
                        navigation.navigate('Checkout');
                    }}
                >
                    <AntDesign name="shoppingcart" color={props.currentroutenameprops == 'Viewcart' ? COLORS.primary : '#898989'} size={Platform.OS === 'ios' ? 22 : 19} style={{ marginBottom: 5 }} />
                    <Text style={[generalstyles.primaryLight, { color: props.currentroutenameprops == 'Viewcart' ? COLORS.primary : '#898989', fontSize: Platform.OS === 'ios' ? 15 : 12 }]}>
                        {lang.mycart}
                    </Text>
                    {langdetect == 'en' && (
                        <Badge
                            value={fetchcustomercartQueryContext.data.data.customercart?.cartitems.length}
                            status="warning"
                            containerStyle={{ position: 'absolute', top: -2, right: 10 }}
                            badgeStyle={{
                                backgroundColor: fetchcustomercartQueryContext.data.data.customercart?.cartitems.length == 0 ? 'grey' : COLORS.secondary,
                                borderWidth: 0,
                                width: 10,
                                height: 15,
                                borderRadius: 100,
                            }}
                            textStyle={{
                                fontSize: 10,
                            }}
                        />
                    )}
                    {langdetect == 'ar' && (
                        <Badge
                            value={fetchcustomercartQueryContext.data.data.customercart?.cartitems.length}
                            status="warning"
                            containerStyle={{ position: 'absolute', top: -5, left: Platform.OS === 'ios' ? 25 : 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            badgeStyle={{
                                backgroundColor: fetchcustomercartQueryContext.data.data.customercart?.cartitems.length == 0 ? 'grey' : COLORS.secondary,
                                borderWidth: 0,
                                width: 10,
                                height: 15,
                                borderRadius: 100,
                            }}
                            textStyle={{
                                fontSize: 10,
                            }}
                        />
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={[generalstyles.allcentered, { flex: 1, marginTop: 'auto', marginBottom: 'auto' }]} onPress={() => navigation.navigate('Appmenu')}>
                    <Feather name="menu" color={props.currentroutenameprops == 'Appmenu' ? COLORS.primary : '#898989'} size={Platform.OS === 'ios' ? 22 : 19} style={{ marginBottom: 5 }} />
                    <Text style={[generalstyles.primaryLight, { color: props.currentroutenameprops == 'Appmenu' ? COLORS.primary : '#898989', fontSize: Platform.OS === 'ios' ? 15 : 12 }]}>
                        {lang.menu}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default Bottomnavigation;
