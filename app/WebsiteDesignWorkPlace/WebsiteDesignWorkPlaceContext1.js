import React, { Component, useState, useEffect, useContext } from 'react';
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
import SlideshowWithCoolTransition from '../Templates/TabexComponents/Sections/Slideshow/SlideshowWithCoolTransition/SlideshowWithCoolTransition';
import CardsSection from '../Templates/TabexComponents/Sections/Cards/CardsSection/CardsSection';
import Categoriescards_slider_with_bottom_button from '../Templates/TabexComponents/Sections/Cards/Categoriescards_slider_with_bottom_button/Categoriescards_slider_with_bottom_button';
import CardsSection3 from '../Templates/TabexComponents/Sections/Cards/CardsSection3/CardsSection3';
import CardsSection4 from '../Templates/TabexComponents/Sections/Cards/CardsSection4/CardsSection4';
import Backgroundimage from '../Templates/TabexComponents/Sections/BackgroundImages/Backgroundimage/Backgroundimage';
import Elegantcard_cartbtninbottomofimage from '../Templates/TabexComponents/Cards/Elegantcard_cartbtninbottomofimage/Elegantcard_cartbtninbottomofimage';
import Card3 from '../Templates/TabexComponents/Cards/Card3/Card3';
import StylishCard from '../Templates/TabexComponents/Cards/StylishCard/StylishCard';
import ClassicHorizontalProductCard from '../Templates/TabexComponents/Cards/ClassicHorizontalProductCard/ClassicHorizontalProductCard';
import CardWithImageOnTop from '../Templates/TabexComponents/Cards/CardWithImageOnTop/CardWithImageOnTop';
import Cardwithbuttonsontopleft from '../Templates/TabexComponents/Cards/Cardwithbuttonsontopleft/Cardwithbuttonsontopleft';
import Card6 from '../Templates/TabexComponents/Cards/Card6/Card6';
import Card8 from '../Templates/TabexComponents/Cards/Card8/Card8';
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
import GeneralProductsComponent from '../Templates/TabexComponents/StaticPages/GeneralProductsComponent/GeneralProductsComponent';
import { EnvGeneralContext } from '../EnvGeneralContext';
import { Platform } from 'react-native';
export const WebsiteDesignWorkPlaceContext = React.createContext();

export const WebsiteDesignWorkPlaceContext_provider = (props) => {
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
        SlideshowWithCoolTransition: SlideshowWithCoolTransition,
        CardsSection: CardsSection,
        Categoriescards_slider_with_bottom_button: Categoriescards_slider_with_bottom_button,
        CardsSection3: CardsSection3,
        CardsSection4: CardsSection4,
        Elegantcard_cartbtninbottomofimage: Elegantcard_cartbtninbottomofimage,
        Card3: Card3,
        StylishCard: StylishCard,
        ClassicHorizontalProductCard: ClassicHorizontalProductCard,
        CardWithImageOnTop: CardWithImageOnTop,
        Cardwithbuttonsontopleft: Cardwithbuttonsontopleft,
        Card6: Card6,
        Card8: Card8,
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
    });
    const { GeneralProjectOpenrcTypeContext, GeneralINSTAPIKEYCONTEXT } = useContext(EnvGeneralContext);
    const [ProjectOpenrcTypeContext, setProjectOpenrcTypeContext] = useState(GeneralProjectOpenrcTypeContext);
    const [INSTAPIKEYCONTEXT, setINSTAPIKEYCONTEXT] = useState(GeneralINSTAPIKEYCONTEXT);
    const [TemplateIdContext, setTemplateIdContext] = useState('');
    const [CurrentPageIdContext, setCurrentPageIdContext] = useState('');
    const [showeditorcontext, setshoweditorcontext] = useState(true);
    const [isScreenLoadedContext, setisScreenLoadedContext] = useState(false);
    const [StatePagePropertiesContext, setStatePagePropertiesContext] = useState({});

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

    useEffect(() => {
        if (fetch_inst_tabex_websitetemplatesQueryContext.isSuccess) {
            if (fetch_inst_tabex_websitetemplatesQueryContext.data.data.template.instid == 'tabex') {
                // setINSTAPIKEYCONTEXT('tabex');
            }
        }
    }, [fetch_inst_tabex_websitetemplatesQueryContext.isSuccess]);
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
            }}
        >
            {props.children}
        </WebsiteDesignWorkPlaceContext.Provider>
    );
};
