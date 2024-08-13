import * as React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View, Text } from 'react-native';
import Constants from 'expo-constants';
import { SIZES } from './TabexComponents/GeneralFiles/constants';
import { FetchingContext } from './FetchingContext/FetchingContext';
import { TemplateRoutingContext } from './TemplateRoutingContext';
import { LanguageContext } from './LanguageContext/LanguageContext';

export default function WebBrowser() {
    const webviewref = React.useRef();
    const { showUpTopNotificationBarContext, fetchorderhistoryQueryContext, fetchcustomercartQueryContext, ObjectPaymentOnlineModalContext, setSwipPanelObjContext, SwipPanelObjContext } =
        React.useContext(FetchingContext);
    const { StaticPagesLinksContext, routingcountext, routingCustomPagecountext } = React.useContext(TemplateRoutingContext);
    const { lang } = React.useContext(LanguageContext);
    const handleWebViewNavigationStateChange = (newNavState) => {
        // newNavState looks something like this:
        // {
        //   url?: string;
        //   title?: string;
        //   loading?: boolean;
        //   canGoBack?: boolean;
        //   canGoForward?: boolean;
        // }
        const { url } = newNavState;
        if (!url) {
            return;
        } else {
            if (url.includes('?status=1') || url.includes('?status=true')) {
                alert('success');
                setSwipPanelObjContext({ ...SwipPanelObjContext, open: false });
                fetchorderhistoryQueryContext.refetch();
                fetchcustomercartQueryContext.refetch();
                routingcountext(StaticPagesLinksContext.Ordersuccess, { status: 'true', reason: '' });
                showUpTopNotificationBarContext(lang.orderaddedsuccess, 'green');
            } else if (url.includes('?status=')) {
                alert('error in payment');
                setSwipPanelObjContext({ ...SwipPanelObjContext, open: false });
                // maybe close this view?
            }
        }
    };

    return (
        <View style={{ width: '100%', height: '100%' }}>
            {ObjectPaymentOnlineModalContext.paymentOnlinemethod == 'Paymob - Card' && (
                <WebView
                    ref={webviewref}
                    style={styles.container}
                    source={{
                        uri: 'https://accept.paymob.com/api/acceptance/iframes/' + ObjectPaymentOnlineModalContext?.iframepublickey + '?payment_token=' + ObjectPaymentOnlineModalContext?.paymentkey,
                        // uri: 'https://www.iubitoeg.net/ordersuccess?status=&reason=',
                    }}
                    onNavigationStateChange={handleWebViewNavigationStateChange}
                />
            )}
            {ObjectPaymentOnlineModalContext.paymentOnlinemethod == 'Paymob - ValU' && (
                <WebView
                    ref={webviewref}
                    style={styles.container}
                    source={{
                        uri: 'https://accept.paymob.com/api/acceptance/iframes/' + ObjectPaymentOnlineModalContext?.iframepublickey + '?payment_token=' + ObjectPaymentOnlineModalContext?.paymentkey,
                    }}
                    onNavigationStateChange={handleWebViewNavigationStateChange}
                />
            )}
            {ObjectPaymentOnlineModalContext.paymentOnlinemethod == 'Tap - Card' && (
                <WebView
                    ref={webviewref}
                    style={styles.container}
                    source={{
                        uri: 'https://tabex-co.com/tappayments/' + ObjectPaymentOnlineModalContext?.paymentorderid,

                        // uri: 'https://www.iubitoeg.net/ordersuccess?status=&reason=',
                    }}
                    onNavigationStateChange={handleWebViewNavigationStateChange}
                />
            )}
            {ObjectPaymentOnlineModalContext.paymentOnlinemethod == 'Payzaty - Card' && (
                <WebView
                    ref={webviewref}
                    style={styles.container}
                    source={{
                        uri: ObjectPaymentOnlineModalContext?.checkout_url,

                        // uri: 'https://www.iubitoeg.net/ordersuccess?status=&reason=',
                    }}
                    onNavigationStateChange={handleWebViewNavigationStateChange}
                />
            )}
            {ObjectPaymentOnlineModalContext.paymentOnlinemethod == 'Paymob - Mobile Wallet' && (
                <WebView
                    ref={webviewref}
                    style={styles.container}
                    source={{
                        uri: ObjectPaymentOnlineModalContext?.MobileWalletPaymentPaymobResp?.redirect_url,
                    }}
                    onNavigationStateChange={handleWebViewNavigationStateChange}
                />
            )}
            {ObjectPaymentOnlineModalContext.paymentOnlinemethod == 'Fawry - Pay At Fawry' && (
                <WebView
                    ref={webviewref}
                    style={styles.container}
                    source={{
                        uri: ObjectPaymentOnlineModalContext?.checkout_url,
                    }}
                    onNavigationStateChange={handleWebViewNavigationStateChange}
                />
            )}
            {ObjectPaymentOnlineModalContext.paymentOnlinemethod == 'Paymob - Aman' && (
                <WebView
                    ref={webviewref}
                    style={styles.container}
                    source={{
                        uri: 'https://accept.paymob.com/api/acceptance/iframes/' + ObjectPaymentOnlineModalContext?.iframepublickey + '?payment_token=' + ObjectPaymentOnlineModalContext?.paymentkey,
                    }}
                    onNavigationStateChange={handleWebViewNavigationStateChange}
                />
            )}
            {ObjectPaymentOnlineModalContext.paymentOnlinemethod == 'Paymob - Forsa' && (
                <WebView
                    ref={webviewref}
                    style={styles.container}
                    source={{
                        uri: 'https://accept.paymob.com/api/acceptance/iframes/' + ObjectPaymentOnlineModalContext?.iframepublickey + '?payment_token=' + ObjectPaymentOnlineModalContext?.paymentkey,
                    }}
                    onNavigationStateChange={handleWebViewNavigationStateChange}
                />
            )}
            {ObjectPaymentOnlineModalContext.paymentOnlinemethod == 'Paymob - Card V2' && (
                <WebView
                    ref={webviewref}
                    style={styles.container}
                    source={{
                        uri: ObjectPaymentOnlineModalContext?.checkout_url,
                    }}
                    onNavigationStateChange={handleWebViewNavigationStateChange}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: SIZES.height,
        width: '100%',
    },
});
