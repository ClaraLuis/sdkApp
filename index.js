import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { EnvGeneralContext_Provider } from './app/EnvGeneralContext';
import { LanguageProvider } from './app/Templates/LanguageContext/LanguageContext';
import App from './app/App';
import { QueryClient, QueryClientProvider } from 'react-query';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
const queryClient = new QueryClient();
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
const AppTobeRenedered = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <LanguageProvider>
                <EnvGeneralContext_Provider>
                    <App />
                </EnvGeneralContext_Provider>
            </LanguageProvider>
        </QueryClientProvider>
    );
};
registerRootComponent(AppTobeRenedered);
