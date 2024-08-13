// All take sectionidprops & sectionindexprops
import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, RefreshControl } from 'react-native';
import { serverbaselink } from '../../../../../Env_Variables';
import { LanguageContext } from '../../../../LanguageContext/LanguageContext';
import { FetchingContext } from '../../../../FetchingContext/FetchingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { ProductsCardsSectionContext } from '../ProductsCardsSectionContext';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { SIZES } from '../../../GeneralFiles/constants';
// import { scrollInterpolators, animatedStyles } from '../../../GeneralFiles/Utils/animations';
// import Carousel from 'react-native-snap-carousel';
import generalstyles from '../../../GeneralFiles/Stylesheet/Stylesheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { TemplateRoutingContext } from '../../../../TemplateRoutingContext';
import { urlEndpoint } from '../../../../../config/imagekit';
import { ImageComponent } from '../../../../ImageComponent';
const CardsSection3 = (props) => {
    const navigation = useNavigation();
    const { ref, inView } = useInView();
    const { lang, langdetect } = useContext(LanguageContext);
    const { ProjectOpenrcTypeContext, INSTAPIKEYCONTEXT, TabexSectionsComponentsContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { fetchcollectionsQueryContext, FetchQueriesEngineContext, SearchHeaderMutationContext, favoriteprojectscountContext } = useContext(FetchingContext);
    const { ProductFilterObjContext, setProductFilterObjContext } = useContext(ProductsCardsSectionContext);
    const { StaticPagesLinksContext, routingcountext } = useContext(TemplateRoutingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [cardsarray, setcardsarray] = useState([]);
    const [fetchingtype, setfetchingtype] = useState('');
    const [searchinput, setsearchinput] = useState('');
    const [StatePageProperties, setStatePageProperties] = useState(props.StatePageProperties);
    const [gridview, setgridview] = useState(false);
    const FetchProductsAxios = (axiosdatatemp) => {
        var tempProductFilterObjContext = { ...ProductFilterObjContext };
        tempProductFilterObjContext.page = axiosdatatemp;
        tempProductFilterObjContext.instapikey = INSTAPIKEYCONTEXT;
        var serverbaselinktemp = 'https://tabex-co.com/customerapi';
        const axiosfetch = axios({
            method: 'post',
            url: serverbaselinktemp + '/customer/webapp/fetchproducts',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: tempProductFilterObjContext,
        });
        return axiosfetch;
    };
    const fetchProductsQuery = useInfiniteQuery(['fetchproducts_API' + JSON.stringify(ProductFilterObjContext)], ({ pageParam = 0 }) => FetchProductsAxios(pageParam), {
        keepPreviousData: true,
        staleTime: Infinity,
        enabled:
            INSTAPIKEYCONTEXT.length != 0 && fetchingtype == 'products' && ProductFilterObjContext.ProductFetchingType != undefined && ProductFilterObjContext.ProductFetchingType.length != 0
                ? true
                : false,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            var currentpagefrombackend = lastPage.data.page;

            if (currentpagefrombackend == 'full') {
                return undefined;
            } else {
                var nextpage = parseInt(currentpagefrombackend) + 1;
                return nextpage;
            }
        },

        getPreviousPageParam: (firstPage, allPages) => firstPage.data.page - 1,
    });
    React.useEffect(() => {
        if (inView) {
            fetchProductsQuery.fetchNextPage();
        }
    }, [inView]);
    const [ProductsFetchingTypeSectionObj, setProductsFetchingTypeSectionObj] = useState({ productfetchingtype: 'Random', collectionid: '' });
    useEffect(() => {
        StatePageProperties.pageobj.sections.forEach(function (sectionitem, sectionindex) {
            if (sectionitem.sectionid == props.sectionidprops) {
                var secpropobj = {};
                sectionitem.sectionproperties.forEach(function (sectionpropertiesobj, sectionpropertiesindex) {
                    secpropobj[sectionpropertiesobj.property_css_name] = sectionpropertiesobj.property_value;
                });
                setsectionproperties({ ...secpropobj });

                if (props.srcfromprops == 'GeneralProductsComponent') {
                    setfetchingtype('products');
                    setProductsFetchingTypeSectionObj({
                        productfetchingtype: 'Random',
                        collectionid: props.collectionidprops,
                    });
                } else {
                    setfetchingtype(sectionitem.fetchingtype);
                    setProductsFetchingTypeSectionObj({
                        productfetchingtype: sectionitem.productsfetchingtype,
                        collectionid: sectionitem.productsfetchingtypeCollectioncollectionid,
                    });
                }
            }
        });
    }, [StatePageProperties]);
    useEffect(() => {
        if (ProjectOpenrcTypeContext == 'workplace') {
            setStatePageProperties({ ...props.StatePageProperties });
        }
    }, [props.StatePageProperties]);
    useEffect(() => {
        SearchHeaderMutationContext.reset();
        const delayDebounceFn = setTimeout(() => {
            if (searchinput.length != 0) {
                SearchHeaderMutationContext.mutate({
                    SearchHeaderValue: searchinput,
                });
            }
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [searchinput]);
    useEffect(() => {
        if (sectionproperties.length != 0) {
            if (cardsarray.length == 0) {
                if (fetchingtype == 'collections') {
                    if (fetchcollectionsQueryContext != undefined && fetchcollectionsQueryContext.isSuccess) {
                        cardobjassigner(fetchcollectionsQueryContext.data.data.collections);
                    }
                } else if (fetchingtype == 'products') {
                    if (fetchProductsQuery.isSuccess) {
                        var allpagesarr = [];
                        fetchProductsQuery.data.pages.forEach((page) => {
                            page.data.products.forEach((productobj) => {
                                allpagesarr.push(productobj);
                            });
                        });
                        cardobjassigner(allpagesarr);
                    }
                }
            }
        }
    }, [sectionproperties]);
    useEffect(() => {
        if (fetchingtype.length != 0) {
            if (fetchingtype == 'collections') {
                var tempFetchQueriesEngineContext = FetchQueriesEngineContext;
                tempFetchQueriesEngineContext.collections = true;
                // setFetchQueriesEngineContext({ ...tempFetchQueriesEngineContext });
            }
            if (fetchingtype == 'products') {
                var tempfetchproductsfilerobjcontext = ProductFilterObjContext;
                tempfetchproductsfilerobjcontext.ProductFetchingType = ProductsFetchingTypeSectionObj.productfetchingtype;
                tempfetchproductsfilerobjcontext.collections.push(ProductsFetchingTypeSectionObj.collectionid);

                setProductFilterObjContext({ ...tempfetchproductsfilerobjcontext });
            }
        }
    }, [fetchingtype, ProductsFetchingTypeSectionObj]);
    useEffect(() => {
        if (fetchingtype == 'products') {
            if (fetchProductsQuery.isSuccess) {
                var allpagesarr = [];
                fetchProductsQuery.data.pages.forEach((page) => {
                    page.data.products.forEach((productobj) => {
                        allpagesarr.push(productobj);
                    });
                });
                cardobjassigner(allpagesarr);
            }
        }
    }, [fetchProductsQuery.isSuccess, fetchProductsQuery.dataUpdatedAt, fetchProductsQuery.data]);
    useEffect(() => {
        if (fetchingtype == 'collections') {
            if (fetchcollectionsQueryContext.isSuccess) {
                cardobjassigner(fetchcollectionsQueryContext.data.data.collections);
            }
        }
    }, [fetchcollectionsQueryContext.isSuccess]);
    useEffect(() => {
        favassigner();
    }, [favoriteprojectscountContext]);
    const favassigner = () => {
        if (fetchingtype == 'products') {
            if (cardsarray.length != 0) {
                if (favoriteprojectscountContext != undefined && Array.isArray(favoriteprojectscountContext)) {
                    var tempcardsarray = [...cardsarray];
                    tempcardsarray.forEach(function (arrayItem, arrayindex) {
                        arrayItem.IsFavExists = false;
                    });
                    tempcardsarray.forEach(function (arrayItem, arrayindex) {
                        favoriteprojectscountContext.forEach(function (favitem, favindex) {
                            if (arrayItem.productid == favitem) {
                                arrayItem.IsFavExists = true;
                            }
                        });
                    });
                    setcardsarray([...tempcardsarray]);
                }
            }
        }
    };
    const cardobjassigner = (fetchedarray) => {
        var temparray = [];
        fetchedarray.forEach(function (arrayItem, arrayindex) {
            var cardobj = {
                name: '',
                image: '',
            };
            if (fetchingtype == 'products') {
                if (langdetect == 'en') {
                    cardobj.name = arrayItem.productinfo.name_en;
                } else {
                    cardobj.name = arrayItem.productinfo.name_ar;
                }
                cardobj.image = arrayItem.productinfo.productmainimage;
                cardobj.productid = arrayItem.productinfo.productid;
                cardobj.description_en = arrayItem.productinfo.description_en;
                cardobj.description_ar = arrayItem.productinfo.description_ar;
                cardobj.defaultprice = arrayItem.productinfo.defaultprice;
                cardobj.defaultsaleprice = arrayItem.productinfo.defaultsaleprice;
                cardobj.productimages = arrayItem.productinfo.productimages;
                cardobj.timestamp = arrayItem.productinfo.timestamp;

                if (favoriteprojectscountContext != undefined && favoriteprojectscountContext.length != 0) {
                    favoriteprojectscountContext.forEach(function (favitem, favindex) {
                        if (arrayItem.productinfo.productid == favitem) {
                            cardobj.IsFavExists = true;
                        }
                    });
                }
            } else if (fetchingtype == 'collections') {
                cardobj.collectionid = arrayItem.collectionid;
                cardobj.name = arrayItem.title_en;
                cardobj.image = arrayItem.collectionlogo;
            } else if (fetchingtype == 'custom') {
            }
            temparray.push(cardobj);
        });

        setcardsarray([...temparray]);
    };
    const renderSpinner = () => {
        return (
            <View style={[generalstyles.allcentered, { height: 100, marginLeft: 'auto', marginRight: 'auto' }]}>
                <SpinnerButton buttonStyle={{ width: 30, height: 30 }} isLoading={true} indicatorCount={10} spinnerType={'MaterialIndicator'} spinnerColor={'#000'}></SpinnerButton>
            </View>
        );
    };
    const loadMore = () => {
        if (fetchProductsQuery.hasNextPage) {
            fetchProductsQuery.fetchNextPage();
        }
    };
    const setProductFilterObjContextPassingparams = (newobj) => {
        setProductFilterObjContext({ ...newobj });
    };
    const generalproductsnavigation = () => {
        if (fetchingtype == 'products') {
            if (ProductsFetchingTypeSectionObj.productfetchingtype == 'Collection') {
                navigation.navigate('TemplateDraftRouter', {
                    screen: StaticPagesLinksContext.GeneralProductsComponent,
                    params: {
                        genprodcompstinfo: {
                            collectionid: ProductsFetchingTypeSectionObj.collectionid,
                            srcfrom: 'GeneralProductsComponent',
                        },
                    },
                });
            } else {
                navigation.navigate(StaticPagesLinksContext.GeneralProductsComponent);
            }
        } else {
            navigation.navigate(StaticPagesLinksContext.GeneralProductsComponent);
        }
    };
    const cardsrender = () => {
        return (
            <View>
                <View style={[generalstyles.allcentered, { backgroundColor: 'red' }]}>
                    {/* <Carousel
                        scrollInterpolator={scrollInterpolators.scrollInterpolator4}
                        slideInterpolatedStyle={animatedStyles.animatedStyles4}
                        useScrollView={true}
                        data={cardsarray}
                        layout={'default'}
                        renderItem={({ item, index }) => {
                            return (
                                <View
                                    style={[
                                        styles.categorycard_carousel,
                                        {
                                            width: SIZES.width - 100,
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                            height: parseInt(sectionproperties.height != null && sectionproperties.height != undefined ? sectionproperties.height : 500),
                                        },
                                    ]}
                                >
                                    <View style={[styles.categorycard_carouselImageCont, {}]}>
                                        <ImageComponent
                                            path={item.image}
                                            resizeMode="cover"
                                            style={[
                                                styles.categorycard_carouselImage,
                                                generalstyles.shadow,
                                                {
                                                    borderColor: sectionproperties.sectioncardbordercolor,
                                                    borderWidth: sectionproperties.sectioncardborderwidth,
                                                    backgroundColor: sectionproperties.backgroundColor,
                                                    borderTopLeftRadius: sectionproperties.borderTopLeftRadius,
                                                    borderTopRightRadius: sectionproperties.borderTopRightRadius,
                                                    borderBottomLeftRadius: sectionproperties.borderBottomLeftRadius,
                                                    borderBottomRightRadius: sectionproperties.borderBottomRightRadius,
                                                    shadowColor: sectionproperties.sectioncardshadowcolor,
                                                },
                                            ]}
                                        />
                                    </View>
                                    <TouchableOpacity
                                        style={[
                                            styles.categorycard_carouselarrowcont,
                                            {
                                                backgroundColor: sectionproperties.generalbtn_bgColor,
                                                top: parseInt(
                                                    sectionproperties.generalbtn_topposition != null && sectionproperties.generalbtn_topposition != undefined
                                                        ? sectionproperties.generalbtn_topposition
                                                        : 320,
                                                ),
                                            },
                                        ]}
                                    >
                                        <View
                                            style={{
                                                borderColor: 'white',
                                                borderWidth: 1,
                                                width: 40,
                                                height: 40,
                                                borderRadius: 40 / 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <AntDesign
                                                name={langdetect == 'en' ? 'arrowright' : 'arrowleft'}
                                                size={sectionproperties.generalbtn_fontsize}
                                                style={{
                                                    color: sectionproperties.generalbtn_textColor,
                                                    transform: [{ rotate: '-45deg' }],
                                                }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                    <View style={[styles.categorycard_carouseltextcont]}>
                                        <Text
                                            style={[
                                                generalstyles.poppinsMedium,
                                                generalstyles.textcapitalize,
                                                {
                                                    fontSize: sectionproperties.generaltext_fontSize,
                                                    color: sectionproperties.generaltext_fontColor,
                                                    textTransform:
                                                        sectionproperties.generaltext_textTransform == 'Uppercase'
                                                            ? 'uppercase'
                                                            : sectionproperties.generaltext_textTransform == 'Capitalize'
                                                            ? 'capitalize'
                                                            : 'lowercase',
                                                },
                                            ]}
                                        >
                                            {item.name}
                                        </Text>
                                    </View>
                                </View>
                            );
                        }}
                        sliderWidth={SIZES.width - 20}
                        itemWidth={SIZES.width - 20}
                    /> */}
                </View>
            </View>
        );
    };
    return <View>{cardsrender()}</View>;
};
const styles = StyleSheet.create({
    categorycard_carousel: {
        alignItems: 'center',
        marginEnd: 10,
        marginStart: 10,
    },
    categorycard_carouselImageCont: {
        width: '90%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    categorycard_carouselImage: {
        width: '100%',
        height: '100%',
        height: '90%',
    },
    categorycard_carouselarrowcont: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        position: 'absolute',
        bottom: 15,
        backgroundColor: '#000',
        borderRadius: 80 / 2,
    },
    categorycard_carouseltextcont: {
        position: 'absolute',
        top: 30,
        left: 35,
        paddingRight: 10,
        width: '90%',
        textAlign: 'left',
    },
});
export default CardsSection3;
