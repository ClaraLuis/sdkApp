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
    const [price_minpassed, setprice_minpassed] = useState(route?.params?.genprodcompstinfo?.price_min);
    const [price_maxpassed, setprice_maxpassed] = useState(route?.params?.genprodcompstinfo?.price_max);
    const [Collectionidpassed, setCollectionidpassed] = useState(route?.params?.genprodcompstinfo?.collectionid);
    const [fetchingtypepassed, setfetchingtypepassed] = useState(route?.params?.genprodcompstinfo?.fetchingtype);
    const [srcfrompassed, setsrcfrompassed] = useState(route?.params?.genprodcompstinfo?.srcfrom);
    const [collectionidparams, setcollectionidparams] = useState(route?.params?.genprodcompstinfo?.collectionid);
    const [grouptypeparams, setgrouptypeparams] = useState(route?.params?.genprodcompstinfo?.grouptypeprops);
    const [prod_featruesarpassed, setprod_featruesarpassed] = useState(route?.params?.genprodcompstinfo?.prod_featruesar);
    const [sectionproperties, setsectionproperties] = useState('');
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
        if (srcfrompassed == undefined || srcfrompassed == null || srcfrompassed.length == 0) {
            setsrcfrompassed('GeneralProductsComponent');
        }
    }, []);
    useEffect(() => {
        // GeneralProductsComponent
        if (route != undefined && route != null) {
            if (route.params != undefined && route.params != null) {
                if (route.params.genprodcompstinfo != undefined && route.params.genprodcompstinfo != null) {
                    setcollectionidparams(route?.params?.genprodcompstinfo?.collectionid);
                    setCollectionidpassed(route?.params?.genprodcompstinfo?.collectionid);
                }
            }
        }
    }, [route]);

    return (
        <View style={{ width: '100%', height: '100%' }}>
            {srcfrompassed != undefined && srcfrompassed.length != 0 && Object.keys(StatePageProperties).length != 0 && StatePageProperties != undefined && (
                <View style={{ position: 'relative', width: '100%', height: '100%' }}>
                    {StatePageProperties?.pageobj?.sections?.map((item, index) => {
                        if (item.tabexsectioninfo != null && TabexSectionsComponentsContext[item.tabexsectioninfo.sectioncompname] != undefined && item.componenttype == 'section') {
                            var sectioncomp = TabexSectionsComponentsContext[item.tabexsectioninfo.sectioncompname];
                            return (
                                <View>
                                    {/* <Text>
                                        FF ss
                                        {collectionidparams}asd{JSON.stringify(route.params.genprodcompstinfo)}
                                    </Text> */}
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
                                                price_minpassed: price_minpassed?.length != 0 ? price_minpassed : '',
                                                price_maxpassed: price_maxpassed?.length != 0 ? price_maxpassed : '',
                                                collectionidprops: Collectionidpassed?.length != 0 ? Collectionidpassed : '',
                                                fetchingtypepassedprops: fetchingtypepassed?.length != 0 ? fetchingtypepassed : '',
                                                prod_featruesarpassed: prod_featruesarpassed?.length != 0 ? prod_featruesarpassed : [],
                                                collectionidprops: collectionidparams,
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
export default React.memo(GeneralProductsComponent);
