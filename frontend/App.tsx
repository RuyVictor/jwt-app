import React from 'react';
import 'react-native-gesture-handler';
import * as Font from 'expo-font';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/components/toast_config'
import Routes from './src/routes';
import SplashScreen from './src/screens/splash_screen';

export default function App() {
	const [fontsLoaded, setFontsLoaded] = React.useState(false)

	React.useEffect(() => {

		async function loadFonts() {
		    await Font.loadAsync({
		      PTSansNarrowRegular: require('./src/assets/fonts/PTSansNarrow-Regular.ttf'),
		      PTSansNarrowBold: require('./src/assets/fonts/PTSansNarrow-Bold.ttf')
		    });
		   	setFontsLoaded(true);
		}

		loadFonts();
	}, [])

	if (fontsLoaded) {
	    return (
	    	<>
	    	<Routes/>
	    	<Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
	    	</>
	    )
    } else {
      	return <SplashScreen/>;
    }
}
