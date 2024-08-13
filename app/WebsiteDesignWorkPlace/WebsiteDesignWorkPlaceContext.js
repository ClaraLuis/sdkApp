import React, { Component, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { fetch_template_items_API, Page_Template_Fetch_API } from '../General_API';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Header1 from '../Templates/TabexComponents/Headers/Header1/Header1';
import Header3 from '../Templates/TabexComponents/Headers/Header3/Header3';
import Header5 from '../Templates/TabexComponents/Headers/Header5/Header5';
import Header6 from '../Templates/TabexComponents/Headers/Header6/Header6';
import SearchbarWithFilter from '../Templates/TabexComponents/Sections/Slideshow/SearchbarWithFilter/SearchbarWithFilter';
import SearchbarWithFiltericon from '../Templates/TabexComponents/Sections/Slideshow/SearchbarWithFiltericon/SearchbarWithFiltericon';
import Slideshow1 from '../Templates/TabexComponents/Sections/Slideshow/Slideshow1/Slideshow1';
import Slideshow2 from '../Templates/TabexComponents/Sections/Slideshow/Slideshow2/Slideshow2';
import VideosSection from '../Templates/TabexComponents/Sections/Slideshow/VideosSection/VideosSection';
import ServiceSection from '../Templates/TabexComponents/Sections/Slideshow/ServiceSection/ServiceSection';
import DynamicForm from '../Templates/TabexComponents/Sections/Slideshow/DynamicForm/DynamicForm';
import FreeTextSection from '../Templates/TabexComponents/Sections/Slideshow/FreeTextSection/FreeTextSection';
import SocialMediaSection from '../Templates/TabexComponents/Sections/Slideshow/SocialMediaSection/SocialMediaSection';
import FreeTextSectionWithButton from '../Templates/TabexComponents/Sections/Slideshow/FreeTextSectionWithButton/FreeTextSectionWithButton';
import SlideshowWithCoolTransition from '../Templates/TabexComponents/Sections/Slideshow/SlideshowWithCoolTransition/SlideshowWithCoolTransition';
import FilterSection from '../Templates/TabexComponents/Sections/Slideshow/FilterSection/FilterSection';
import Dynamicfilterssection from '../Templates/TabexComponents/Sections/Slideshow/Dynamicfilterssection/Dynamicfilterssection';
import CardsSection from '../Templates/TabexComponents/Sections/Cards/CardsSection/CardsSection';
import CardsSectionSlideshow from '../Templates/TabexComponents/Sections/Cards/CardsSectionSlideshow/CardsSectionSlideshow';
import UsersCard from '../Templates/TabexComponents/Sections/Cards/UsersCard/UsersCard';
import Categoriescards_slider_with_bottom_button from '../Templates/TabexComponents/Sections/Cards/Categoriescards_slider_with_bottom_button/Categoriescards_slider_with_bottom_button';
import CardsSection3 from '../Templates/TabexComponents/Sections/Cards/CardsSection3/CardsSection3';
import CardsSection4 from '../Templates/TabexComponents/Sections/Cards/CardsSection4/CardsSection4';
import Backgroundimage from '../Templates/TabexComponents/Sections/BackgroundImages/Backgroundimage/Backgroundimage';
import Popup from '../Templates/TabexComponents/Sections/BackgroundImages/Popup/Popup';
import Elegantcard_cartbtninbottomofimage from '../Templates/TabexComponents/Cards/Elegantcard_cartbtninbottomofimage/Elegantcard_cartbtninbottomofimage';
import Card3 from '../Templates/TabexComponents/Cards/Card3/Card3';
import StylishCard from '../Templates/TabexComponents/Cards/StylishCard/StylishCard';
import ClassicCategoryCard from '../Templates/TabexComponents/Cards/ClassicCategoryCard/ClassicCategoryCard';
import Modernproductcardwithquantitybutton from '../Templates/TabexComponents/Cards/Modernproductcardwithquantitybutton/Modernproductcardwithquantitybutton';
import ClassicHorizontalProductCard from '../Templates/TabexComponents/Cards/ClassicHorizontalProductCard/ClassicHorizontalProductCard';
import CardWithImageOnTop from '../Templates/TabexComponents/Cards/CardWithImageOnTop/CardWithImageOnTop';
import Cardwithbuttonsontopleft from '../Templates/TabexComponents/Cards/Cardwithbuttonsontopleft/Cardwithbuttonsontopleft';
import Card6 from '../Templates/TabexComponents/Cards/Card6/Card6';
import Card8 from '../Templates/TabexComponents/Cards/Card8/Card8';
import HorizontalProductCardWithQuantityButton from '../Templates/TabexComponents/Cards/HorizontalProductCardWithQuantityButton/HorizontalProductCardWithQuantityButton';
import CardWithClosedQuantityButton from '../Templates/TabexComponents/Cards/CardWithClosedQuantityButton/CardWithClosedQuantityButton';
import Cardwithblureffect from '../Templates/TabexComponents/Cards/Cardwithblureffect/Cardwithblureffect';
import Singlecard from '../Templates/TabexComponents/Cards/Singlecard/Singlecard';
import CardWithImageOnTop_moderncard from '../Templates/TabexComponents/Cards/CardWithImageOnTop_moderncard/CardWithImageOnTop_moderncard';
import Productcard_withroundedbg from '../Templates/TabexComponents/Cards/Productcard_withroundedbg/Productcard_withroundedbg';
import ProductCardWithBlurEffect from '../Templates/TabexComponents/Cards/ProductCardWithBlurEffect/ProductCardWithBlurEffect';
import ChiqueCard from '../Templates/TabexComponents/Cards/ChiqueCard/ChiqueCard';
import SimpleCategoryCard from '../Templates/TabexComponents/Cards/SimpleCategoryCard/SimpleCategoryCard';
import HorizontalCategoryCard from '../Templates/TabexComponents/Cards/HorizontalCategoryCard/HorizontalCategoryCard';
import CollectionCardWithBottomTextContainer from '../Templates/TabexComponents/Cards/CollectionCardWithBottomTextContainer/CollectionCardWithBottomTextContainer';
import HorizontalProductCard from '../Templates/TabexComponents/Cards/HorizontalProductCard/HorizontalProductCard';
import CTAProductCard from '../Templates/TabexComponents/Cards/CTAProductCard/CTAProductCard';
import Moderncategorycard from '../Templates/TabexComponents/Cards/Moderncategorycard/Moderncategorycard';
import Login from '../Templates/TabexComponents/StaticPages/Login/Login';
import Signup from '../Templates/TabexComponents/StaticPages/Signup/Signup';
import Viewcart from '../Templates/TabexComponents/StaticPages/Viewcart/Viewcart';
import Checkout from '../Templates/TabexComponents/StaticPages/Checkout/Checkout';
import AppMenu from '../Templates/TabexComponents/StaticPages/AppMenu/AppMenu';
import ProductInfo from '../Templates/TabexComponents/StaticPages/ProductInfo/ProductInfo';
import Orderhistory from '../Templates/TabexComponents/StaticPages/Orderhistory/Orderhistory';
import OrderDetails from '../Templates/TabexComponents/StaticPages/Orderhistory/OrderDetails';
import Wishlist from '../Templates/TabexComponents/StaticPages/Wishlist/Wishlist';
import VendorPage from '../Templates/TabexComponents/StaticPages/VendorPage/VendorPage';
import AccountInformation from '../Templates/TabexComponents/StaticPages/AccountInformation/AccountInformation';
import Policies from '../Templates/TabexComponents/StaticPages/Policies/Policies';
import Search from '../Templates/TabexComponents/StaticPages/Search/Search';
import CategoriesCollections from '../Templates/TabexComponents/StaticPages/CategoriesCollections/CategoriesCollections';
import Filter from '../Templates/TabexComponents/StaticPages/Filter/Filter';
import Ordersuccess from '../Templates/TabexComponents/StaticPages/Ordersuccess/Ordersuccess';
import GeneralProductsComponent from '../Templates/TabexComponents/StaticPages/GeneralProductsComponent/GeneralProductsComponent';
import GeneralVendorComponent from '../Templates/TabexComponents/StaticPages/GeneralVendorComponent/GeneralVendorComponent';
import AddReview from '../Templates/TabexComponents/StaticPages/AddReview/AddReview';
import Afiiliatesignup from '../Templates/TabexComponents/StaticPages/Afiiliatesignup/Afiiliatesignup';
import SearchFocusedHeader from '../Templates/TabexComponents/Headers/SearchFocusedHeader/SearchFocusedHeader';
import { EnvGeneralContext } from '../EnvGeneralContext';
import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import base64 from 'react-native-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { increment, setpageobj, setpageobjasync, getPageobjectfromasync } from '../Slices/ReduxSlice';

export const WebsiteDesignWorkPlaceContext = React.createContext();

export const WebsiteDesignWorkPlaceContext_provider = (props) => {
    const dispatch = useDispatch();
    const StatePageProperties11 = useSelector((state) => state.page.value);

    const queryClient = useQueryClient();
    const [TabexSectionsComponentsContext, setTabexSectionsComponentsContext] = useState({
        Header1: Header1,
        Header3: Header3,
        Header5: Header5,
        Header6: Header6,
        SearchbarWithFilter: SearchbarWithFilter,
        SearchbarWithFiltericon: SearchbarWithFiltericon,
        Slideshow1: Slideshow1,
        Slideshow2: Slideshow2,
        VideosSection: VideosSection,
        ServiceSection: ServiceSection,
        DynamicForm: DynamicForm,
        FreeTextSection: FreeTextSection,
        SocialMediaSection: SocialMediaSection,
        FreeTextSectionWithButton: FreeTextSectionWithButton,
        SlideshowWithCoolTransition: SlideshowWithCoolTransition,
        FilterSection: FilterSection,
        Dynamicfilterssection: Dynamicfilterssection,
        CardsSection: CardsSection,
        CardsSectionSlideshow: CardsSectionSlideshow,
        UsersCard: UsersCard,
        CTAProductCard: CTAProductCard,
        Moderncategorycard: Moderncategorycard,
        Categoriescards_slider_with_bottom_button: Categoriescards_slider_with_bottom_button,
        CardsSection3: CardsSection3,
        CardsSection4: CardsSection4,
        Elegantcard_cartbtninbottomofimage: Elegantcard_cartbtninbottomofimage,
        Card3: Card3,
        HorizontalProductCardWithQuantityButton: HorizontalProductCardWithQuantityButton,
        StylishCard: StylishCard,
        ClassicCategoryCard: ClassicCategoryCard,
        Modernproductcardwithquantitybutton: Modernproductcardwithquantitybutton,
        ClassicHorizontalProductCard: ClassicHorizontalProductCard,
        CardWithImageOnTop: CardWithImageOnTop,
        Cardwithbuttonsontopleft: Cardwithbuttonsontopleft,
        Card6: Card6,
        SearchFocusedHeader: SearchFocusedHeader,
        Card8: Card8,
        CardWithClosedQuantityButton: CardWithClosedQuantityButton,
        Cardwithblureffect: Cardwithblureffect,
        Singlecard: Singlecard,
        CardWithImageOnTop_moderncard: CardWithImageOnTop_moderncard,
        Productcard_withroundedbg: Productcard_withroundedbg,
        ProductCardWithBlurEffect: ProductCardWithBlurEffect,
        ChiqueCard: ChiqueCard,
        SimpleCategoryCard: SimpleCategoryCard,
        HorizontalCategoryCard: HorizontalCategoryCard,
        CollectionCardWithBottomTextContainer: CollectionCardWithBottomTextContainer,
        HorizontalProductCard: HorizontalProductCard,
        Backgroundimage: Backgroundimage,
        Popup: Popup,
        Login: Login,
        Signup: Signup,
        Viewcart: Viewcart,
        AppMenu: AppMenu,
        ProductInfo: ProductInfo,
        Checkout: Checkout,
        Orderhistory: Orderhistory,
        OrderDetails: OrderDetails,
        Wishlist: Wishlist,
        VendorPage: VendorPage,
        AccountInformation: AccountInformation,
        Policies: Policies,
        Search: Search,
        CategoriesCollections: CategoriesCollections,
        Filter: Filter,
        GeneralProductsComponent: GeneralProductsComponent,
        GeneralVendorComponent: GeneralVendorComponent,
        Ordersuccess: Ordersuccess,
        AddReview: AddReview,
        Afiiliatesignup: Afiiliatesignup,
    });
    const { GeneralProjectOpenrcTypeContext, GeneralINSTAPIKEYCONTEXT } = useContext(EnvGeneralContext);
    const [ProjectOpenrcTypeContext, setProjectOpenrcTypeContext] = useState(GeneralProjectOpenrcTypeContext);
    const [INSTAPIKEYCONTEXT, setINSTAPIKEYCONTEXT] = useState(GeneralINSTAPIKEYCONTEXT);
    const [showpopupContext, setshowpopupContext] = useState(true);
    const [imageurlendpointcontext, setimageurlendpointcontext] = useState('');
    const [TemplateIdContext, setTemplateIdContext] = useState('');
    const [CurrentPageIdContext, setCurrentPageIdContext] = useState('');
    const [showeditorcontext, setshoweditorcontext] = useState(true);
    const [isScreenLoadedContext, setisScreenLoadedContext] = useState(false);
    const [StatePagePropertiesContext, setStatePagePropertiesContext] = useState({});
    const [CachepageidexitsContext, setCachepageidexitsContext] = useState('none');
    const [CachedPageObjContext, setCachedPageObjContext] = useState('none');
    const [PageIdtoLoadTosaveinfile, setPageIdtoLoadTosaveinfile] = useState('');
    const [LoadpageContext, setLoadpageContext] = useState(false);
    const [StatePageProperties, setStatePageProperties] = useState({});
    const [countertemppagesloadingback, setcountertemppagesloadingback] = useState([]);
    const fetch_inst_tabex_websitetemplatesQueryContext = useQuery(
        ['fetch_template_items_API' + TemplateIdContext],
        () => fetch_template_items_API({ INSTAPIKEYCONTEXT: INSTAPIKEYCONTEXT, srctypefrom: ProjectOpenrcTypeContext, WebAppOrMobApp: 'mobapp', templateid: TemplateIdContext }),
        {
            keepPreviousData: true,
            staleTime: Infinity,
            cacheTime: Infinity,
            enabled: ProjectOpenrcTypeContext == 'subdomain' ? true : TemplateIdContext.length != 0 ? true : false,
        },
    );
    const PageTemplateFetcherQueryContext = useQuery(
        ['FetchPages_API' + PageIdtoLoadTosaveinfile],
        () =>
            Page_Template_Fetch_API({
                INSTAPIKEYCONTEXT: INSTAPIKEYCONTEXT,
                srctypefrom: ProjectOpenrcTypeContext,
                pageid: PageIdtoLoadTosaveinfile,
                WebAppOrMobApp: 'mobapp',
                templateid: TemplateIdContext,
            }),
        {
            keepPreviousData: true,
            staleTime: Infinity,
            cacheTime: Infinity,

            enabled: LoadpageContext && PageIdtoLoadTosaveinfile.length != 0 ? true : false,
        },
    );
    const getpagedata = (pageid) => {
        // alert(pageid);

        const axiosheaders = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        var payload = {
            INSTAPIKEYCONTEXT: INSTAPIKEYCONTEXT,
            srctypefrom: ProjectOpenrcTypeContext,
            pageid: pageid,
            WebAppOrMobApp: 'mobapp',
            templateid: TemplateIdContext,
        };
        axios({
            method: 'get',
            url: 'https://tabex-co.com/instowner/Page_Template_Fetch',
            headers: axiosheaders,
            params: payload,
        })
            .then(function (response) {
                StorePagedataToDBContext(response.data.pageobj.pageid, response.data.cacheid, response.data);
            })

            .catch(function (error) {
                // alert('error');
                console.log(error);
            });
    };
    useEffect(() => {
        if (fetch_inst_tabex_websitetemplatesQueryContext.isSuccess) {
            if (fetch_inst_tabex_websitetemplatesQueryContext?.data?.data?.instinfo?.ikieu == undefined || fetch_inst_tabex_websitetemplatesQueryContext?.data?.data?.instinfo?.ikieu == null) {
                // setimageurlendpointcontext('https://ik.imagekit.io/ppcqtfrxp');
                // tabex design image kit
                setimageurlendpointcontext('https://ik.imagekit.io/t3stqpebw');
            } else {
                setimageurlendpointcontext(fetch_inst_tabex_websitetemplatesQueryContext?.data?.data?.instinfo?.ikieu);
            }

            if (fetch_inst_tabex_websitetemplatesQueryContext.data.data.template.instid == 'tabex') {
                // setINSTAPIKEYCONTEXT('tabex');
            }
            if (ProjectOpenrcTypeContext == 'subdomain') {
                startloadingpagesinbackground();
            }
        }
    }, [fetch_inst_tabex_websitetemplatesQueryContext.isSuccess]);
    useEffect(() => {
        //cacheid, pageobj.pageid
        if (PageTemplateFetcherQueryContext.isSuccess) {
            setLoadpageContext(false);
            StorePagedataToDBContext(PageTemplateFetcherQueryContext.data.data.pageobj.pageid, PageTemplateFetcherQueryContext.data.data.cacheid, PageTemplateFetcherQueryContext.data.data);
        }
    }, [PageTemplateFetcherQueryContext.isSuccess]);
    useEffect(() => {
        if (PageIdtoLoadTosaveinfile != null && PageIdtoLoadTosaveinfile.length != 0) {
            Signlepagechecker(PageIdtoLoadTosaveinfile, true);
        }
    }, [PageIdtoLoadTosaveinfile]);
    const startloadingpagesinbackground = async () => {
        //pagecacheid, pageid
        var arr = [];

        if (fetch_inst_tabex_websitetemplatesQueryContext.isSuccess) {
            // for (var pageitem in fetch_inst_tabex_websitetemplatesQueryContext.data.data.template.pages) {
            for (const pageitem of fetch_inst_tabex_websitetemplatesQueryContext.data.data.template.pages) {
                var loadpage = true;
                StatePageProperties11.pages.forEach(function (item, index) {
                    if (pageitem.pageid == item.pageid) {
                        if (pageitem.pagecacheid == item.cacheid) {
                            loadpage = false;
                        }
                    }
                });
                if (loadpage) {
                    getpagedata(pageitem.pageid);
                    arr.push('s');
                }
            }
            setcountertemppagesloadingback(arr);
        }
    };
    const startloadingpagesinbackground11 = async () => {
        //pagecacheid, pageid
        var arr = [];

        if (fetch_inst_tabex_websitetemplatesQueryContext.isSuccess) {
            // for (var pageitem in fetch_inst_tabex_websitetemplatesQueryContext.data.data.template.pages) {
            for (const pageitem of fetch_inst_tabex_websitetemplatesQueryContext.data.data.template.pages) {
                try {
                    const value = await AsyncStorage.getItem('cacheid' + pageitem.pagecacheid);

                    if (value !== null) {
                    } else {
                        arr.push('s');
                        getpagedata(pageitem.pageid);
                        // setPageIdtoLoadTosaveinfile(pageitem.pageid);
                        // setLoadpageContext(true);
                    }
                } catch (e) {
                    arr.push(pageid);
                    getpagedata(pageitem.pageid);
                    // setPageIdtoLoadTosaveinfile(pageitem.pageid);
                    // setLoadpageContext(true);
                    alert('error');
                    // error reading value
                }
            }
            setcountertemppagesloadingback(arr);
        }
    };

    const Signlepagechecker = async (pageid, isloadpage) => {
        // FileSystem.readAsStringAsync(FileSystem.documentDirectory + pageid + '.json', { encoding: FileSystem.EncodingType.UTF8, type: 'json' })
        //     .then((data) => {
        //         setCachedPageObjContext(JSON.parse(data));
        //         alert('page found');
        //     })
        //     .catch((err) => {
        //         setLoadpageContext(true);
        //         alert('page not found');
        //         console.log(err.message);
        //     });
        // setLoadpageContext(true);
        // try {
        //     const value = await AsyncStorage.getItem(pageid);
        //     if (value !== null) {
        //         if (isloadpage) {
        //             var parsevalue = JSON.parse(value);
        //             alert(JSON.stringify(parsevalue.pageobj.pageid));
        //             setCachedPageObjContext(JSON.parse(value));
        //         }
        //         // value previously stored
        //     } else {
        //         setLoadpageContext(true);
        //     }
        // } catch (e) {
        //     setLoadpageContext(true);
        //     alert('error');
        //     // error reading value
        // }
    };
    const StyleParseToIntFuncContext = (value, defaultvalue, androidrespmodif) => {
        var transvalue = value;
        if (transvalue == undefined || transvalue == null) {
            if (defaultvalue == null || defaultvalue == undefined || defaultvalue?.length == 0) {
                transvalue = 0;
            } else {
                transvalue = defaultvalue;
            }
        } else {
            transvalue = parseInt(transvalue);
            if (Platform.OS != 'ios') {
                if (androidrespmodif == true) {
                } else {
                    transvalue = transvalue - 1;
                    if (transvalue < 0) {
                        transvalue = 0;
                    }
                }
            }
        }
        return transvalue;
    };

    // const StorePagedataToDBContext = (pageid, pageobj) => {
    //     if (pageid != null && pageid.length != 0) {
    //         // alert(pageobj);
    //         const db = SQLite.openDatabase('db.db');
    //         // alert(pageobj);
    //         // alert('s');
    //         db.transaction((tx) => {
    //             // tx.executeSql('drop table pages;');
    //             var createtablesql = 'create table if not exists pages (id integer primary key not null, done int, pageid text, pageobj text);';
    //             tx.executeSql(createtablesql);

    //             tx.executeSql('delete from pages where pageid = ?', [pageid]);
    //             tx.executeSql('insert into pages (done, pageid, pageobj) values (0, ?, ?)', [pageid, pageobj.pageobj.pageid]);
    //         });
    //     }
    // };

    const StorePagedataToDBContext = async (pageid, cacheid, pageobj) => {
        dispatch(setpageobj({ pageid: pageid, pageobj: pageobj, cacheid: cacheid }));
    };
    const StorePagedataToDBContext11 = async (pageid, cacheid, pageobj) => {
        // const { status } = Permissions.askAsync(Permissions.CAMERA_ROLL);
        // if (status === 'granted') {
        var json = JSON.stringify(pageobj);
        // let CachefileUri = FileSystem.documentDirectory + cacheid + '.json';
        // await FileSystem.writeAsStringAsync(CachefileUri, { cacheid: 'cacheid' }, { encoding: FileSystem.EncodingType.UTF8 });
        // let fileUri = FileSystem.documentDirectory + pageid + '.json';
        // await FileSystem.deleteAsync(fileUri);
        // await FileSystem.writeAsStringAsync(fileUri, json, { encoding: FileSystem.EncodingType.UTF8 });
        // // const asset = await MediaLibrary.createAssetAsync(fileUri)
        // // await MediaLibrary.createAlbumAsync("Download", asset, false)
        // alert('page saved: ' + pageid);
        // // }
        try {
            await AsyncStorage.removeItem(pageid);

            await AsyncStorage.setItem('cacheid' + cacheid, 'cached here');
            await AsyncStorage.setItem(pageid, json);
            // alert('paged saaved');
        } catch (e) {
            // saving error
            alert('error');
        }
    };
    // const StorePagedataToDBContext = async (pageid, cacheid, pageobj) => {
    //     // const { status } = Permissions.askAsync(Permissions.CAMERA_ROLL);
    //     // if (status === 'granted') {
    //     var json = JSON.stringify(pageobj);
    //     let CachefileUri = FileSystem.documentDirectory + cacheid + '.json';
    //     await FileSystem.writeAsStringAsync(CachefileUri, { cacheid: 'cacheid' }, { encoding: FileSystem.EncodingType.UTF8 });
    //     let fileUri = FileSystem.documentDirectory + pageid + '.json';
    //     await FileSystem.deleteAsync(fileUri);
    //     await FileSystem.writeAsStringAsync(fileUri, json, { encoding: FileSystem.EncodingType.UTF8 });
    //     // const asset = await MediaLibrary.createAssetAsync(fileUri)
    //     // await MediaLibrary.createAlbumAsync("Download", asset, false)
    //     alert('page saved: ' + pageid);
    //     // }
    // };

    return (
        <WebsiteDesignWorkPlaceContext.Provider
            value={{
                fetch_inst_tabex_websitetemplatesQueryContext,
                CurrentPageIdContext,
                setCurrentPageIdContext,
                StatePagePropertiesContext,
                setStatePagePropertiesContext,
                TabexSectionsComponentsContext,
                setTabexSectionsComponentsContext,
                isScreenLoadedContext,
                setisScreenLoadedContext,
                ProjectOpenrcTypeContext,
                setProjectOpenrcTypeContext,
                INSTAPIKEYCONTEXT,
                setINSTAPIKEYCONTEXT,
                setTemplateIdContext,
                TemplateIdContext,
                StyleParseToIntFuncContext,
                setPageIdtoLoadTosaveinfile,

                CachepageidexitsContext,
                setCachepageidexitsContext,
                StorePagedataToDBContext,
                StatePageProperties,
                setStatePageProperties,
                CachedPageObjContext,
                setCachedPageObjContext,
                countertemppagesloadingback,
                imageurlendpointcontext,
                setimageurlendpointcontext,
                setshowpopupContext,
                showpopupContext,
            }}
        >
            {props.children}
        </WebsiteDesignWorkPlaceContext.Provider>
    );
};
