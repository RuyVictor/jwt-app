import React from 'react';
import { styles } from './styles';
import { View, BackHandler } from 'react-native';
import { Icon, Button, Text, Input, Divider } from 'react-native-elements';
import MainHeader from '../../components/main_header';

import { useAuth } from '../../hooks/useAuth';

export default function Home({ navigation }) {
    const { getUserData } = useAuth();

    function handlePreventBack() {
        navigation.navigate('Home');
        return true;
    }
    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handlePreventBack);
        return () => BackHandler.removeEventListener('hardwareBackPress', handlePreventBack);
    }, []);
    // Mostra o token salvo no aplicativo.

    return (
        <>
            <MainHeader
                iconLeft={{
                    type: 'ionicon',
                    name: 'arrow-back',
                    onPress: () => navigation.goBack(),
                }}
                iconRight={{
                    type: 'feather',
                    name: 'user',
                    onPress: () => navigation.push('Profile'),
                }}
                headerTitle="Home"
            />

            <View style={styles.container}>
                <View style={styles.token_container}>
                    <Text style={styles.token_title}>Token atual:</Text>
                    <Text>{getUserData?.token}</Text>
                </View>
            </View>
        </>
    );
}
