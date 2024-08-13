import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SIZES } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { AntDesign, Feather } from '@expo/vector-icons';
import CustomerInformationForm, { CustomerInformation } from '../Signup/CustomerInformationForm';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AccountInformation = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const navigation = useNavigation();
    const { lang, langdetect } = useContext(LanguageContext);
    const { ProjectOpenrcTypeContext, INSTAPIKEYCONTEXT, StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { routingcountext } = useContext(TemplateRoutingContext);
    const {
        fetchcustomercartQueryContext,
        FetchQueriesEngineContext,
        setFetchQueriesEngineContext,
        fetchTabexCountriesQueryContext,
        fetchTabexStatesQueryContext,
        FetchTabexStatesPayloadobjContext,
        setFetchTabexStatesPayloadobjContext,
        fetchTabexCitiesQueryContext,
        fetchAuthorizationQueryContext,
        LogoutMutationContext,
        DeleteAccountMutationContext,
    } = useContext(FetchingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [countriesarray, setcountriesarray] = useState([]);
    const [statesarray, setstatesarray] = useState([]);
    const [selectedcountryname, setselectedcountryname] = useState('');
    const [selectedstatename, setselectedstatename] = useState('');
    const [selectedcityname, setselectedcityname] = useState('');
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

    useEffect(() => {
        if (fetchAuthorizationQueryContext.data.data.loggedin == true) {
            var tempFetchQueriesEngineContext = { ...FetchQueriesEngineContext };
            tempFetchQueriesEngineContext.fetchtabexcountries = true;
            setFetchQueriesEngineContext({ ...tempFetchQueriesEngineContext });
            var tempFetchTabexStatesPayloadobjContext = { ...FetchTabexStatesPayloadobjContext };
            if (
                !fetchcustomercartQueryContext.isFetching &&
                fetchcustomercartQueryContext.isSuccess &&
                fetchcustomercartQueryContext.data.data.customercart != undefined &&
                fetchcustomercartQueryContext.data.data.customercart.countryid != null &&
                fetchcustomercartQueryContext.data.data.customercart.countryid.length != 0
            ) {
                tempFetchTabexStatesPayloadobjContext.country_id = fetchcustomercartQueryContext.data.data.customercart.countryid;
            }
            if (
                !fetchcustomercartQueryContext.isFetching &&
                fetchcustomercartQueryContext.isSuccess &&
                fetchcustomercartQueryContext.data.data.customercart != undefined &&
                fetchcustomercartQueryContext.data.data.customercart.stateid != null &&
                fetchcustomercartQueryContext.data.data.customercart.stateid.length != 0
            ) {
                tempFetchTabexStatesPayloadobjContext.state_id = fetchcustomercartQueryContext.data.data.customercart.stateid;
            }
            setFetchTabexStatesPayloadobjContext({ ...tempFetchTabexStatesPayloadobjContext });
        } else {
            routingcountext('Home');
        }
    }, []);
    useEffect(() => {
        if (!fetchTabexCountriesQueryContext.isFetching && fetchTabexCountriesQueryContext.isSuccess) {
            var tempcountriesarray = [...countriesarray];
            fetchTabexCountriesQueryContext.data.data.countries.forEach(function (arrayItem, arrayindex) {
                if (arrayItem.id == fetchcustomercartQueryContext.data.data.customercart.countryid) {
                    setselectedcountryname(arrayItem.name);
                }
                var tempcountrieobj = {
                    Id: arrayItem.id,
                    Name: arrayItem.name,
                };
                tempcountriesarray.push({ ...tempcountrieobj });
            });
            setcountriesarray([...tempcountriesarray]);
        }
    }, [fetchTabexCountriesQueryContext.isSuccess]);
    useEffect(() => {
        if (!fetchTabexStatesQueryContext.isFetching && fetchTabexStatesQueryContext.isSuccess) {
            var tempstatesarray = [...statesarray];
            fetchTabexStatesQueryContext.data.data.states.forEach(function (arrayItem, arrayindex) {
                if (arrayItem.id == fetchcustomercartQueryContext.data.data.customercart.stateid) {
                    setselectedstatename(arrayItem.name);
                }
                var tempstateobj = {
                    Id: arrayItem.id,
                    Name: arrayItem.name,
                };
                tempstatesarray.push({ ...tempstateobj });
            });
            setstatesarray([...tempstatesarray]);
        }
    }, [fetchTabexStatesQueryContext.isSuccess]);
    useEffect(() => {
        if (!fetchTabexCitiesQueryContext.isFetching && fetchTabexCitiesQueryContext.isSuccess) {
            var tempcitiesarray = [...statesarray];
            fetchTabexCitiesQueryContext.data.data.cities.forEach(function (arrayItem, arrayindex) {
                if (arrayItem.id == fetchcustomercartQueryContext.data.data.customercart.cityid) {
                    setselectedcityname(arrayItem.name);
                }
                var tempcityobj = {
                    Id: arrayItem.id,
                    Name: arrayItem.name,
                };
                tempcitiesarray.push({ ...tempcityobj });
            });
            setstatesarray([...tempcitiesarray]);
        }
    }, [fetchTabexCitiesQueryContext.isSuccess]);
    return (
        <View
            style={[
                generalstyles.container,
                {
                    paddingLeft: 0,
                    paddingRight: 0,
                    marginBottom: StyleParseToIntFuncContext(sectionproperties.marginBottom),
                    marginTop: StyleParseToIntFuncContext(sectionproperties.marginTop),
                    backgroundColor: sectionproperties.sectionbgcolor != null ? sectionproperties.sectionbgcolor : '',
                },
            ]}
        >
            <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false} style={{ height: '100%' }}>
                <TouchableOpacity
                    style={[
                        generalstyles.flexRow,
                        generalstyles.containerInner,
                        {
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            marginTop: StyleParseToIntFuncContext(
                                sectionproperties.sectionTitleMarginTop != null && sectionproperties.sectionTitleMarginTop != undefined ? sectionproperties.sectionTitleMarginTop : 0,
                            ),
                            marginBottom: StyleParseToIntFuncContext(
                                sectionproperties.sectionTitleMarginBottom != null && sectionproperties.sectionTitleMarginBottom != undefined ? sectionproperties.sectionTitleMarginBottom : 0,
                            ),
                        },
                    ]}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <TouchableOpacity>
                        <AntDesign
                            name={langdetect == 'en' ? 'arrowleft' : 'arrowright'}
                            size={StyleParseToIntFuncContext(sectionproperties.icontextfontsize)}
                            style={{
                                color: sectionproperties.sectionTitleColor,
                                marginEnd: 5,
                            }}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            marginEnd: 5,
                            color: sectionproperties.sectionTitleColor,
                            fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
                            textTransform:
                                sectionproperties.sectionTitleTextTransform == 'Uppercase'
                                    ? 'uppercase'
                                    : sectionproperties.sectionTitleTextTransform == 'Capitalize' || sectionproperties.sectionTitleTextTransform == 'capitalize'
                                    ? 'capitalize'
                                    : sectionproperties.sectionTitleTextTransform == 'none'
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
                        {lang.personalinformation}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[generalstyles.allcentered, { marginBottom: 20 }]}
                    onPress={() => {
                        DeleteAccountMutationContext.mutate();
                    }}
                >
                    <Text style={{ color: 'red', alignSelf: 'center', fontFamily: 'Poppins-Medium', textDecorationLine: 'underline' }}>
                        <Feather name="trash-2" size={15} /> &nbsp;
                        {langdetect == 'en' ? 'Delete Account' : 'حذف الملف'}
                    </Text>
                </TouchableOpacity>
                <CustomerInformationForm formtype="edit" StatePageProperties={StatePageProperties} />
            </KeyboardAwareScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: { width: '100%', height: '100%', backgroundColor: 'transparent' },
});

export default AccountInformation;
