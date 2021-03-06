import React from 'react';
import 'react-native-gesture-handler';
import * as Font from 'expo-font';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/components/toast_config';
import Routes from './src/routes';
import SplashScreen from './src/screens/splash_screen';

// CONTEXTS
import { AuthContextProvider } from './src/contexts/AuthContext';

export default function App() {
    const [fontsLoaded, setFontsLoaded] = React.useState(false);

    React.useEffect(() => {
        async function loadFonts() {
            try {
                await Font.loadAsync({
                    'PT-Sans-Narrow-Regular': require('./src/assets/fonts/PTSansNarrow-Regular.ttf'),
                    'PT-Sans-Narrow-Bold': require('./src/assets/fonts/PTSansNarrow-Bold.ttf'),
                });
                setFontsLoaded(true);
            } catch (e) {
                console.log(e);
            }
        }
        loadFonts();
    }, []);

    if (fontsLoaded) {
        return (
            <AuthContextProvider>
                <Routes />
                <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
            </AuthContextProvider>
        );
    }
    return <SplashScreen />;
}
