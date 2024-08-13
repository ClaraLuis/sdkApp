import React, { useState, useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TemplateDraftRouter from './Templates/TemplateDraftRouter';
import WebsiteDesignWorkPlaceRouter from './WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceRouter';
import { WebsiteDesignWorkPlaceContext_provider } from './WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { FetchingContext_provider } from './Templates/FetchingContext/FetchingContext';
import { TemplateRoutingContext_Provider } from './Templates/TemplateRoutingContext';
import { EnvGeneralContext } from './EnvGeneralContext';
import { View, Dimensions, Text, Platform } from 'react-native';
import Usefonts from './Usefonts';
import AppLoading from 'expo-app-loading';
import * as FileSystem from 'expo-file-system';
import { Provider } from 'react-redux';
import store from './Slices/Store';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import ApplicationUpdates from './ApplicationUpdates';

const Stack = createStackNavigator();
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function App(props) {
    const queryClient = new QueryClient();

    const { GeneralProjectOpenrcTypeContext } = useContext(EnvGeneralContext);
    const [IsReady, SetIsReady] = useState(false);
    const LoadFonts = async () => {
        await Usefonts();
    };
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    });
    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            priority: 'max',
        });
    }

    if (!IsReady) {
        return (
            <AppLoading
                startAsync={LoadFonts}
                onFinish={() => SetIsReady(true)}
                onError={() => {
                    // alert('ERROR');
                }}
            />
        );
    } else {
        return (
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <ApplicationUpdates institute="other" />
                    <View style={{ height: '100%', backgroundColor: '#f8f8f9' }}>
                        <NavigationContainer>
                            <Stack.Navigator
                                screenOptions={{
                                    headerShown: false,
                                }}
                                initialRouteName={GeneralProjectOpenrcTypeContext == 'subdomain' ? 'TemplateDraftRouter' : 'WebsiteDesignWorkPlaceRouter'}
                            >
                                {GeneralProjectOpenrcTypeContext == 'subdomain' && (
                                    <Stack.Screen name="TemplateDraftRouter">
                                        {(props) => (
                                            <WebsiteDesignWorkPlaceContext_provider>
                                                <TemplateRoutingContext_Provider>
                                                    <FetchingContext_provider>
                                                        <TemplateDraftRouter {...props} />
                                                    </FetchingContext_provider>
                                                </TemplateRoutingContext_Provider>
                                            </WebsiteDesignWorkPlaceContext_provider>
                                        )}
                                    </Stack.Screen>
                                )}
                                {GeneralProjectOpenrcTypeContext == 'workplace' && (
                                    <Stack.Screen name="WebsiteDesignWorkPlaceRouter">
                                        {(props) => (
                                            <WebsiteDesignWorkPlaceContext_provider>
                                                <WebsiteDesignWorkPlaceRouter {...props} />
                                            </WebsiteDesignWorkPlaceContext_provider>
                                        )}
                                    </Stack.Screen>
                                )}
                            </Stack.Navigator>
                        </NavigationContainer>
                    </View>
                </Provider>
            </QueryClientProvider>
        );
    }
}
export default App;
