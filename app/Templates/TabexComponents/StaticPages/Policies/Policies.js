import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import SpinnerButton from 'react-native-spinner-button';
import RenderHtml from 'react-native-render-html';
import { useSelector } from 'react-redux';

const Policies = (props) => {
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const { lang, langdetect } = useContext(LanguageContext);
    const { CurrentPageIdContext, StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { fetchInstitutePoliciesQueryContext, FetchQueriesEngineContext, setFetchQueriesEngineContext } = useContext(FetchingContext);
    const [tabindex, settabindex] = useState(0);
    const [sectionproperties, setsectionproperties] = useState('');
    const [policiesarray, setpoliciesarray] = useState([]);
    const [policiesarrayTrans, setpoliciesarrayTrans] = useState([]);
    const [StatePageProperties, setStatePageProperties] = useState({});
    useEffect(() => {
        StatePageProperties11.pages.forEach(function (item, index) {
            if (CurrentPageIdContext == item.pageid) {
                setStatePageProperties(item.pageobj);
            }
        });
    }, [StatePageProperties11]);
    useEffect(() => {
        var temppoliciesarray = [...policiesarray];
        var temppoliciesarrayTrans = [...policiesarrayTrans];
        if (!fetchInstitutePoliciesQueryContext.isFetching && fetchInstitutePoliciesQueryContext.isSuccess) {
            fetchInstitutePoliciesQueryContext.data.data.policies.forEach(function (item, index) {
                temppoliciesarray.push(item.policypagename_en);
                temppoliciesarrayTrans.push(item.policypagename_ar);
            });
            setpoliciesarray([...temppoliciesarray]);
            setpoliciesarrayTrans([...temppoliciesarrayTrans]);
        }
    }, []);
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
        var tempFetchQueriesEngineContext = { ...FetchQueriesEngineContext };
        tempFetchQueriesEngineContext.fetchinstitutepolicy = true;
        setFetchQueriesEngineContext({ ...tempFetchQueriesEngineContext });
    }, []);
    return (
        <View style={[generalstyles.container, { marginBottom: 20 }]}>
            {fetchInstitutePoliciesQueryContext.isFetching && (
                <View style={{ height: 400 }}>
                    <SpinnerButton buttonStyle={{ width: 50, height: 50 }} isLoading={true} indicatorCount={10} spinnerType={'MaterialIndicator'} spinnerColor={'#000'}></SpinnerButton>
                </View>
            )}
            {!fetchInstitutePoliciesQueryContext.isFetching && fetchInstitutePoliciesQueryContext.isSuccess && (
                <View style={{}}>
                    <SegmentedControlTab
                        values={langdetect == 'en' ? policiesarray : policiesarrayTrans}
                        selectedIndex={tabindex}
                        onTabPress={(index) => {
                            settabindex(index);
                        }}
                        borderRadius={0}
                        tabsContainerStyle={{ height: 35, backgroundColor: 'transparent' }}
                        tabStyle={{ backgroundColor: 'transparent', borderWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderRightColor: 'transparent', borderLeftColor: 'transparent' }}
                        activeTabStyle={{
                            backgroundColor: 'transparent',
                            borderLeftWidth: 0,
                            borderRightWidth: 0,
                            borderRightColor: 'transparent',
                            borderLeftColor: 'transparent',
                            borderBottomWidth: 2,
                            borderBottomColor: sectionproperties.activetabbordercolor,
                            marginTop: 2,
                            borderWidth: 0,
                        }}
                        tabTextStyle={{ color: sectionproperties.tabtextcolor, fontSize: StyleParseToIntFuncContext(sectionproperties.tabtextfontsize), fontFamily: 'Poppins-Light' }}
                        activeTabTextStyle={{ color: sectionproperties.tabtextactivecolor, fontFamily: 'Poppins-Medium' }}
                    />
                    <View
                        style={{
                            paddingTop: 5,
                            paddingBottom: 5,
                            paddingLeft: 20,
                            paddingRight: 20,
                            backgroundColor: sectionproperties.backgroundColor,
                            borderTopLeftRadius: StyleParseToIntFuncContext(sectionproperties.borderTopLeftRadius, '', true),
                            borderTopRightRadius: StyleParseToIntFuncContext(sectionproperties.borderTopRightRadius, '', true),
                            borderBottomLeftRadius: StyleParseToIntFuncContext(sectionproperties.borderBottomLeftRadius, '', true),
                            borderBottomRightRadius: StyleParseToIntFuncContext(sectionproperties.borderBottomRightRadius, '', true),
                            marginTop: 10,
                        }}
                    >
                        <RenderHtml
                            source={{
                                html:
                                    langdetect == 'en'
                                        ? fetchInstitutePoliciesQueryContext?.data?.data?.policies[tabindex]?.policycontent_en
                                        : fetchInstitutePoliciesQueryContext?.data?.data?.policies[tabindex]?.policycontent_ar,
                            }}
                            flexDirection={''}
                            tagsStyles={{
                                body: {
                                    direction: langdetect == 'en' ? 'ltr' : 'ltr',
                                },
                            }}
                            style={{ textAlign: langdetect == 'en' ? 'right' : 'left' }}
                            contentWidth={800}
                        />
                        {/* <Text>{fetchInstitutePoliciesQueryContext.data.data.policies[tabindex].policycontent_en}</Text> */}
                    </View>
                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({});

export default Policies;
