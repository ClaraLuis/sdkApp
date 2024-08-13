import axios from 'axios';
const axiosheaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};
const serverbaselinkfunc = () => {
    var serverbaselinktemp = 'https://tabex-co.com';
    return serverbaselinktemp;
};
export const fetch_template_items_API = (axiosdata) => {
    const axiosfetch = axios({
        method: 'get',
        url: serverbaselinkfunc() + '/instowner/fetch_template_itemsPAGESTEMP',
        headers: axiosheaders,
        params: axiosdata,
    });
    return axiosfetch;
};
export const Page_Template_Fetch_API = (axiosdata) => {
    const axiosfetch = axios({
        method: 'get',
        url: serverbaselinkfunc() + '/instowner/Page_Template_Fetch',
        headers: axiosheaders,
        params: axiosdata,
    });
    return axiosfetch;
};
export const fetchGuestTabexTemplates_API = (axiosdata) => {
    const axiosfetch = axios({
        method: 'get',
        url: serverbaselinkfunc() + '/surfer/GuestfetchTabexTemplates',
        headers: axiosheaders,
        params: axiosdata,
    });
    return axiosfetch;
};
