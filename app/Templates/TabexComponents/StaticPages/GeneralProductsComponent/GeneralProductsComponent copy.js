import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, SafeAreaView, FlatList } from 'react-native';
import { TemplateRoutingContext } from '../../../TemplateRoutingContext';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { ProductsCardsSectionContext_Provider } from '../../Sections/Cards/ProductsCardsSectionContext';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
const GeneralProductsComponent = (props) => {
    const route = useRoute();
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const { lang, langdetect } = useContext(LanguageContext);
    const [StatePageProperties, setStatePageProperties] = useState({});
    const { TabexSectionsComponentsContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const [vendorsarrpassed, setvendorsarrpassed] = useState(route?.params?.genprodcompstinfo?.vendorsarr);

    const [Countryidpassed, setCountryidpassed] = useState(route?.params?.genprodcompstinfo?.countryid);
    const [Stateidpassed, setStateidpassed] = useState(route?.params?.genprodcompstinfo?.stateid);
    const [Cityidpassed, setCityidpassed] = useState(route?.params?.genprodcompstinfo?.cityid);
    const [Collectionidpassed, setCollectionidpassed] = useState(route?.params?.genprodcompstinfo?.collectionid);
    const [fetchingtypepassed, setfetchingtypepassed] = useState(route?.params?.genprodcompstinfo?.fetchingtype);
    const [srcfrompassed, setsrcfrompassed] = useState(route?.params?.genprodcompstinfo?.srcfrom);
    const [collectionidparams, setcollectionidparams] = useState(route?.params?.genprodcompstinfo?.collectionid);
    const [grouptypeparams, setgrouptypeparams] = useState(route?.params?.genprodcompstinfo?.grouptypeprops);
    const [sectionproperties, setsectionproperties] = useState('');
    useEffect(() => {
        StatePageProperties11.pages.forEach(function (item, index) {
            if (CurrentPageIdContext == item.pageid) {
                setStatePageProperties(item.pageobj);
            }
        });
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
        if (srcfrompassed == undefined || srcfrompassed == null || srcfrompassed.length == 0) {
            setsrcfrompassed('GeneralProductsComponent');
        }
    }, []);

    return (
        <View style={{ width: '100%', height: '100%' }}>
            {srcfrompassed != undefined && srcfrompassed.length != 0 && Object.keys(StatePageProperties).length != 0 && StatePageProperties != undefined && (
                <View style={{ position: 'relative', width: '100%', height: '100%' }}>
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
                                                srcfromprops: srcfrompassed,
                                                scrollviewtoend: props.scrollviewtoend,
                                                vendorsarrpassed: vendorsarrpassed?.length != 0 ? vendorsarrpassed : '',
                                                Countryidpassed: Countryidpassed?.length != 0 ? Countryidpassed : '',
                                                Stateidpassed: Stateidpassed?.length != 0 ? Stateidpassed : '',
                                                Cityidpassed: Cityidpassed?.length != 0 ? Cityidpassed : '',
                                                collectionidprops: Collectionidpassed?.length != 0 ? Collectionidpassed : '',
                                                fetchingtypepassedprops: fetchingtypepassed?.length != 0 ? fetchingtypepassed : '',
                                                collectionidprops: collectionidparams,
                                                grouptypeprops: grouptypeparams,
                                                grouptyperefidprops: collectionidparams,
                                                StatePagePropertiesprops: props.StatePagePropertiesprops,
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
export default React.memo(GeneralProductsComponent);
