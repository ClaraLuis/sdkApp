import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { WebsiteDesignWorkPlaceContext } from '../WebsiteDesignWorkPlaceContext';
// import { Contexthandlerscontext } from '../../../Contexthandlerscontext.js';
export const ProductsCardsSectionContext = React.createContext();
export const ProductsCardsSectionContext_Provider = (props) => {
    const [ProductFilterObjContext, setProductFilterObjContext] = useState({
        Isfiltercollections: 0,
        isfilter: 0,
        ProductFetchingType: '',
        collections: [],
        FilterOptions: [],
        grouptype: '',
        grouptyperefid: '',
        sortprice: '',
        sortdates: '',
        vendorsarr: [],
        searchvendorquery: '',
        countryid: 'all',
        stateid: 'all',
        cityid: 'all',
    });
    return (
        <ProductsCardsSectionContext.Provider
            value={{
                ProductFilterObjContext,
                setProductFilterObjContext,
            }}
        >
            {props.children}
        </ProductsCardsSectionContext.Provider>
    );
};
