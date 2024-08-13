import React, { Component } from 'react';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LanguageContext = React.createContext();
export class LanguageProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: {
                en: {
                    reservationdate: 'Reservation Date',
                    quantity: 'Quantity',
                    from: 'From',
                    to: 'To',
                    price: 'Price',
                    dates: 'Dates',
                    deleteorder: 'Delete Order',
                    chooseanotherdate: 'Please choose another date',
                    nocollectionsfound: 'No collections found',
                    sale: 'Sale',
                    productdetails: 'Product details',
                    vieworder: 'View order',
                    items: 'Items',
                    chooseoptions: 'Choose options',
                    previousorders: 'Previous orders',
                    orderid: 'Order Number',
                    numberofproducts: 'Number of products',
                    inprogress: 'In Progress',
                    viewmore: 'View more',
                    emptyshoppingcart: 'Your shopping cart is empty',
                    mycart: 'My cart',
                    userprofile: 'User profile',
                    mywishlist: 'Favourites',
                    settings: 'Settings',
                    policies: 'Policies',
                    language: 'Language',
                    logout: 'Logout',
                    loading: 'Loading...',
                    myaccount: 'My account',
                    deliverto: 'Deliver to',
                    login: 'Login',
                    signup: 'Sign up',
                    update: 'Update',
                    email: 'Email',
                    password: 'Password',
                    forgotpassword: 'Forgot your password?',
                    createnewaccount: 'Create new account',
                    loggedinsuccess: 'Logged in successfully',
                    invalidemailpassword: 'Invalid email or password',
                    apply: 'Apply',
                    subtotal: 'Sub total',
                    discount: 'Discount',
                    total: 'Total',
                    excludingdelivery: 'Excluding delivery',
                    proceedtocheckout: 'Proceed to checkout',
                    doyouhavepromocode: 'Do you have a promo code?',
                    delivery: 'Delivery',
                    payment: 'Payment',
                    proceedtopayment: 'Proceed to payment',
                    addressdetails: 'Address details',
                    cardondelivery: 'Credit Card On Delivery',
                    address: 'Address',
                    personalinformation: 'Personal information',
                    change: 'Change',
                    country: 'Country',
                    state: 'State',
                    city: 'City',
                    phone: 'Phone number',
                    cashondelivery: 'Cash on delivery',
                    onlinepayment: 'Online payment',
                    cardnumber: 'Card number',
                    year: 'Year',
                    month: 'Month',
                    cvv: 'CVV',
                    nameoncard: 'Name on card',
                    confirmorder: 'Confirm order',
                    name: 'Name',
                    alreadyhaveanaccount: 'Already have an account?',
                    remove: 'Remove',
                    pleasewritepromocode: 'Please write promo code first',
                    nopreviousorders: 'You have no previous orders',
                    paymentmethod: 'Payment method',
                    shippingfees: 'Shipping fees',
                    shipping: 'Shipping',
                    subtotalafterdiscount: 'Sub total after discount',
                    shippingaddress: 'Shipping address',
                    confirmpassword: 'Confirm password',
                    choosecountry: 'Choose country',
                    choosestate: 'Choose state',
                    search: 'Search...',
                    donthaveanaccount: "Don't have an account?",
                    pleasecompletethemissingfields: 'Please complete the missing fields',
                    passwordsdontmatch: 'Passwords do not match',
                    wishlistisempty: 'You have no favorite products',
                    devicenumber: 'Device Number',
                    errorloggingin: 'Error Logging In. Please try again later ',
                    hello: 'hello',
                    outofzone: 'Out of zone',
                    addtocart: 'Add to cart',
                    select: 'Select',
                    youmayalsolike: 'You may also like',
                    chooseoption: 'Please choose product options',
                    choosequantity: 'Please choose quantity',
                    selectpaymentmethod: 'Select payment method',
                    paymentcardinfo: 'Payment card information',
                    chooseanoption: 'Choose an option',
                    couldnotfindproduct: "Sorry, We couldn't find this product",
                    nocollections: 'No collections found',
                    collections: 'collections',
                    size: 'Size',
                    filter: 'Filter',
                    clear: 'Clear',
                    color: 'Color',
                    // Notifications
                    addedtowishlist: 'Added to your wishlist',
                    removedfromwishlist: 'Removed from your wishlist',
                    addedtocart: 'Product is added to your shopping cart',
                    errorcreatingaccount: 'Error in creating your account. Please try again later',
                    errorupdatingaccount: 'Error in updating your account. Please try again later',
                    accountcreatedsuccess: 'Your account is created successfully',
                    accountupdatedsuccess: 'Your account is edited successfully',
                    erroraddingorder: 'Error in adding order, Please try again later',
                    orderaddedsuccess: 'Order is added successfully',
                    choosedate: 'Choose Date',
                    choosetime: 'Choose Time',
                    showmore: 'Show more',
                    showless: 'Show less',
                    pleaselogintocheckout: 'Please login in order to checkout',
                    loadmore: 'Load More',
                    recent: 'Recent',
                    oldest: 'Oldest',
                    pricehightolow: 'High to low',
                    pricelowtohigh: 'Low to High',
                    emailorphonenumber: 'Email or phone number',
                    currency: 'Currency',
                    installingupdates: 'Installing updates',
                },
                ar: {
                    havequestion: 'هل لديك اسئلة؟',
                    price: 'السعر',
                    dates: 'التاريخ',
                    loadmore: 'المزيد',
                    recent: 'الاحدث',
                    oldest: 'الاقدم',
                    pricehightolow: 'السعر من الاعلي الي الاقل',
                    pricelowtohigh: ' السعر من الاقل الي الاعلي ',
                    pleaselogintocheckout: 'قم بتسجيل دخول لاستكمال طلبك',
                    deleteorder: 'الغاء الطلب',
                    reservationdate: 'تاريخ الحجز',
                    quantity: 'الكمية',
                    from: 'من',
                    to: 'الى',
                    chooseanotherdate: 'من فضلك اختر تاريخ اخر',
                    nocollectionsfound: 'لا توجد مجموعات',
                    sale: 'خصم',
                    productdetails: 'مواصفات المنتج',
                    vieworder: 'عرض الطلب',
                    items: 'المنتجات',
                    previousorders: 'الطلبات السابقة',
                    orderid: 'رقم الطلب',
                    numberofproducts: 'عدد المنتجات',
                    inprogress: 'جارى',
                    viewmore: 'عرض المزيد',
                    emptyshoppingcart: 'حقيبة التسوق فارغة',
                    mycart: 'حقيبة التسوق',
                    userprofile: 'الملف الشخصى',
                    mywishlist: 'مفضلاتى',
                    settings: 'الإعدادات',
                    policies: 'السياسات',
                    language: 'اللغة',
                    logout: 'خروج',
                    loading: 'تحميل...',
                    myaccount: 'ملفى الشخصى',
                    deliverto: 'التوصيل إلى',
                    login: 'تسجيل الدخول',
                    signup: 'إنشاء حساب جديد',
                    update: 'تحديث',
                    email: 'البريد الإلكترونى',
                    emailorphonenumber: 'البريد الإلكترونى او رقم الهاتف',
                    password: 'كلمة السر',
                    forgotpassword: 'هل نسيت كلمة السر؟',
                    createnewaccount: 'إنشاء حساب جديد',
                    loggedinsuccess: 'تم تسجيل الدخول',
                    invalidemailpassword: 'البريد الإلكترونى او كلمة السر غير صحيحة',
                    apply: 'تطبيق',
                    subtotal: 'المبلغ الجزئى',
                    discount: 'الخصم',
                    total: 'المبلغ الكلى',
                    excludingdelivery: 'غير شامل سعر الشحن',
                    proceedtocheckout: 'الدفع',
                    doyouhavepromocode: 'هل لديك كود خصم؟',
                    delivery: 'التوصيل',
                    payment: 'الدفع',
                    proceedtopayment: 'الدفع',
                    addressdetails: 'العنوان',
                    cardondelivery: 'الدفع بالطاقة الائتمانية عند الإستلام',

                    address: 'العنوان',
                    personalinformation: 'البيانات الشخصية',
                    change: 'تغيير',
                    country: 'البلد',
                    state: 'المحافظة',
                    city: 'المدينة',
                    phone: 'رقم الهاتف ',
                    cashondelivery: 'الدفع عند الإستلام',
                    onlinepayment: 'الدفع الإلكترونى',
                    cardnumber: 'رقم الكارت',
                    year: 'السنة',
                    month: 'الشهر',
                    cvv: 'رقم البطاقة',
                    nameoncard: 'الإسم على البطاقة',
                    confirmorder: 'تأكيد الطلب',
                    name: 'الإسم',
                    alreadyhaveanaccount: 'هل لديك حساب؟',
                    remove: 'حذف',
                    pleasewritepromocode: 'من فضلك اكتب كود الخصم',
                    nopreviousorders: 'لا يوجد طلبات سابقة',
                    paymentmethod: 'طريقة الدفع',
                    shippingfees: 'مصاريف الشحن',
                    shipping: 'الشحن',
                    subtotalafterdiscount: 'المبلغ الكلى بمصاريف الشحن',
                    shippingaddress: 'عنوان الشحن',
                    confirmpassword: 'تأكيد كلمة السر',
                    choosecountry: 'إختر البلد',
                    choosestate: 'إختر المحافظة',
                    search: 'البحث...',
                    donthaveanaccount: 'ليس لديك حساب؟',
                    pleasecompletethemissingfields: 'من فضلك اكمل باقى البيانات',
                    passwordsdontmatch: 'كلمات السر لا تتطابق',
                    wishlistisempty: 'لا يوجد منتجات مفضلة',
                    devicenumber: 'رقم الجهاز',
                    errorloggingin: 'خطأ فى الدخول. من فضلك حاول فى وقت لاحق.',
                    hello: 'اهلا',
                    outofzone: 'خارج نطاق الشحن',
                    addtocart: 'اضف لعربة التسوق',
                    select: 'إختر',
                    youmayalsolike: 'قد يعجبك ايضا',
                    chooseoption: 'من فضلك اختر الخيارات',
                    choosequantity: 'من فضلك اختر الكمية',
                    selectpaymentmethod: 'اختر طريقة الدفع',
                    paymentcardinfo: 'بيانات البطاقة',
                    chooseanoption: 'إختر',
                    couldnotfindproduct: 'نأسف، لا يوجد هذا المنتج',
                    nocollections: 'لا يوجد مجموعات',
                    collections: 'المجموعات',
                    size: 'المقاس',
                    filter: 'فلترة',
                    clear: 'حذف',
                    color: 'اللون',
                    // Notifications
                    addedtowishlist: 'تم الإضافة لقائمتك المفضلة',
                    removedfromwishlist: 'تم الحذف من قائمنك المفضلة',
                    addedtocart: 'تم إضافة المنتج لعربة التسوق',
                    errorcreatingaccount: 'خطأ فى إنشاء الحساب. من فضلك حاول فى وقت لاحق.',
                    errorupdatingaccount: 'خطأ فى تعديل الحساب. من فضلك حاول فى وقت لاحق.',
                    accountcreatedsuccess: 'تم إنشاء الحساب',
                    accountupdatedsuccess: 'تم تعديل الحساب',
                    erroraddingorder: 'خطأ فى إضافة الطلب. من فضلك حاول فى وقت لاحق.',
                    orderaddedsuccess: 'تم إضافة الطلب',
                    choosedate: 'إختر التاريخ',
                    choosetime: 'إختر الميعاد',
                    showmore: 'عرض المزيد',
                    showless: 'عرض اقل',
                    currency: 'العملة',
                    installingupdates: 'تحديثات',
                },
            },
            langdetect: 'en',
            setlang: this.setlang,
            setdefaultlang: this.setdefaultlang,
        };
    }

    setdefaultlang = (key) => {
        this.setState({
            langdetect: key,
        });
        if (key == 'ar') {
            I18nManager.allowRTL(true);
            I18nManager.forceRTL(true);
        } else {
            I18nManager.allowRTL(false);
            I18nManager.forceRTL(false);
        }
    };
    setlang = (key) => {
        this.setState({
            langdetect: key,
        });
    };

    componentDidMount() {
        // AsyncStorage.multiGet(['lang'], (err, items) => {
        //     var asynclang = items[0][1];
        //     if (asynclang == null) {
        //     } else {
        //         this.setState({
        //             langdetect: asynclang,
        //         });
        //     }
        // });
        const setdefaultlangusef = async () => {
            var langValue = await AsyncStorage.getItem('lang');
            alert(langValue);
            if (langValue == undefined || langValue == null) {
                this.setState({
                    langdetect: langValue,
                });
            }
        };
        setdefaultlangusef();
    }

    render() {
        var lang = '';
        var langdetect = this.state.langdetect;
        if (this.state.langdetect == 'en') {
            lang = this.state.lang.en;
            I18nManager.forceRTL(false);
            I18nManager.allowRTL(false);
        } else if (this.state.langdetect == 'ar') {
            lang = this.state.lang.ar;
            I18nManager.allowRTL(true);
            I18nManager.forceRTL(true);
        } else {
            lang = this.state.lang.en;
            I18nManager.forceRTL(false);
            I18nManager.allowRTL(false);
        }

        var setlang = this.state.setlang;
        var setdefaultlang = this.state.setdefaultlang;
        return <LanguageContext.Provider value={{ lang, setlang, langdetect, setdefaultlang }}>{this.props.children}</LanguageContext.Provider>;
    }
}

export const LanguageContextConsumer = LanguageContext.Consumer;
