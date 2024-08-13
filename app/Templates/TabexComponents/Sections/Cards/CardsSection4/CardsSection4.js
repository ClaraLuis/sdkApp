// All take sectionidprops & sectionindexprops
import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, RefreshControl } from 'react-native';
import { serverbaselink } from '../../../../../Env_Variables';
import { LanguageContext } from '../../../../LanguageContext/LanguageContext';
import { FetchingContext } from '../../../../FetchingContext/FetchingContext';
import { WebsiteDesignWorkPlaceContext } from '../../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { ProductsCardsSectionContext } from '../ProductsCardsSectionContext';
import { useQuery, useQueryClient, useMutation, useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { icons, images, SIZES, COLORS, FONTS } from '../../../GeneralFiles/constants';
// import { scrollInterpolators, animatedStyles } from '../../../GeneralFiles/Utils/animations';
// const screenWidth = Dimensions.get('window').width;
// import Carousel from 'react-native-snap-carousel';
import generalstyles from '../../../GeneralFiles/Stylesheet/Stylesheet';
import { urlEndpoint } from '../../../../../config/imagekit';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ImageComponent } from '../../../../ImageComponent';

const CardsSection4 = (props) => {
    const { ref, inView } = useInView();
    const { lang, langdetect } = useContext(LanguageContext);
    const queryClient = useQueryClient();
    const { fetch_inst_tabex_websitetemplatesQueryContext, sectionindexcontext, pageindexcontext, INSTAPIKEYCONTEXT, TabexSectionsComponentsContext, StatePagePropertiesContext } =
        useContext(WebsiteDesignWorkPlaceContext);
    const { fetchcollectionsQueryContext, FetchQueriesEngineContext, setFetchQueriesEngineContext, SearchHeaderMutationContext, favoriteprojectscountContext } = useContext(FetchingContext);
    const { ProductFilterObjContext, setProductFilterObjContext } = useContext(ProductsCardsSectionContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [imagesarray, setimagesarray] = useState([]);
    const [cardsarray, setcardsarray] = useState([]);
    const [fetchingtype, setfetchingtype] = useState('');
    const [searchinput, setsearchinput] = useState('');
    const FetchProductsAxios = (axiosdatatemp) => {
        var tempProductFilterObjContext = { ...ProductFilterObjContext };
        tempProductFilterObjContext.page = axiosdatatemp;
        // setProductFilterObjContext({ ...tempProductFilterObjContext });
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
        StatePagePropertiesContext?.pageobj?.sections.forEach(function (sectionitem, sectionindex) {
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
    }, [StatePagePropertiesContext]);
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
            var tempFetchQueriesEngineContext = FetchQueriesEngineContext;

            if (fetchingtype == 'collections') {
                tempFetchQueriesEngineContext.collections = true;
            }
            if (fetchingtype == 'products') {
                var tempfetchproductsfilerobjcontext = ProductFilterObjContext;
                tempfetchproductsfilerobjcontext.ProductFetchingType = ProductsFetchingTypeSectionObj.productfetchingtype;
                tempfetchproductsfilerobjcontext.collections.push(ProductsFetchingTypeSectionObj.collectionid);

                setProductFilterObjContext({ ...tempfetchproductsfilerobjcontext });
            }

            setFetchQueriesEngineContext({ ...tempFetchQueriesEngineContext });
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
            <View>
                <Text>Loading...</Text>
            </View>
        );
    };
    const loadMore = () => {
        if (fetchProductsQuery.hasNextPage) {
            fetchProductsQuery.fetchNextPage();
        }
    };
    const cardsrender = () => {
        return (
            <>
                {StatePagePropertiesContext?.pageobj?.sections[props.sectionindexprops].childsections.map((item, index) => {
                    if (item.tabexsectioninfo != null) {
                        if (item.sectionstructype == 'child') {
                            var sectioncomp = TabexSectionsComponentsContext[item.tabexsectioninfo.sectioncompname];
                            return (
                                <View>
                                    {sectionproperties.sectiontitleshow == 'Show' && (
                                        <Text
                                            style={{
                                                color: sectionproperties.sectionTitleColor,
                                                fontSize: sectionproperties.sectionTitleFontSize + 'px',
                                                fontWeight: sectionproperties.sectionTitleFontWeight,
                                                textTransform:
                                                    sectionproperties.sectionTitleTextTransform == 'Uppercase'
                                                        ? 'uppercase'
                                                        : sectionproperties.sectionTitleTextTransform == 'Capitalize'
                                                        ? 'capitalize'
                                                        : 'lowercase',
                                                fontFamily: 'Poppins-Medium',
                                                paddingLeft: 15,
                                                paddingRight: 15,
                                            }}
                                        >
                                            {langdetect == 'en' ? sectionproperties.sectionTitleContent : sectionproperties.sectionTitleContent_ar}
                                        </Text>
                                    )}
                                    <View style={[generalstyles.allcentered]}>
                                        {/* <Carousel
                                            // scrollInterpolator={scrollInterpolators.scrollInterpolator4}
                                            // slideInterpolatedStyle={animatedStyles.animatedStyles4}
                                            layout={'default'}
                                            // useScrollView={true}
                                            data={cardsarray}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <View
                                                        style={[
                                                            styles.categorycard_carousel,
                                                            {
                                                                // width: SIZES.width - 200,
                                                                // height: 300,
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
                                            sliderWidth={SIZES.width - 50}
                                            itemWidth={SIZES.width - 160}
                                        /> */}
                                    </View>
                                </View>
                            );
                        }
                    }
                })}
            </>
        );
    };
    return <View>{cardsrender()}</View>;
};
const styles = StyleSheet.create({
    categorycard_carousel: {
        alignItems: 'center',
    },
    categorycard_carouselImageCont: {
        width: '100%',
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
    categorycard_carouseltextcont: {
        position: 'absolute',
        top: 30,
        left: 15,
        paddingRight: 10,
        width: '90%',
        textAlign: 'left',
    },
});
export default CardsSection4;
