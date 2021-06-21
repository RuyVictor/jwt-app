import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { styles } from "./styles";
import { StyleSheet, View, BackHandler } from 'react-native';
import { Header, Icon, Button, Text, Input, Divider } from 'react-native-elements'

import AuthContext from '../../contexts/AuthContext';

export default function Home({ navigation }) {
    const { getUserData } = React.useContext(AuthContext);

    function handlePreventBack() {
        navigation.navigate('Home');
        return true
    }
    React.useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', handlePreventBack)
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', handlePreventBack)
    }, [])
    // Mostra o token salvo no aplicativo.

    return (
        <>
            <Header
                containerStyle={styles.header_container}
                leftComponent={
                    <Icon
                    iconStyle={styles.header_icon}
                    underlayColor='white'
                    type='feather'
                    name='menu'
                    size={30}
                    onPress={() => undefined}
                    />
                }
                centerComponent={
                    <Text style={styles.header_title}>
                        {getUserData.user?.name}
                    </Text>
                }
                rightComponent={
                    <Icon
                    iconStyle={styles.header_icon}
                    underlayColor='white'
                    type='octicon'
                    name='gear'
                    size={28}
                    onPress={() => navigation.push('Config')}
                    />
                }
            />
            <View style={styles.container}>

                <StatusBar backgroundColor={styles.status_bar.backgroundColor} />

                <View style={styles.token_container}>
                    <Text style={styles.token_title}>
                        Token atual:
                    </Text>
                    <Text>
                        {getUserData?.token}
                    </Text>
                </View>
            </View>
        </>
    );
}
