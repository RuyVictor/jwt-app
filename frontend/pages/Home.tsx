import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { View, Text, Button } from 'react-native-ui-lib';
import * as SecureStore from 'expo-secure-store';

import AuthContext from '../contexts/AuthContext';

export default function Home() {
    const { signOut } = React.useContext(AuthContext);

    const handleLogout = () => {
        signOut();
    };

    const [token, setToken] = React.useState('');

    // Mostra o token salvo no aplicativo.
    React.useEffect(() => {
        const searchToken = async () => {
            let userToken;

            try {
                userToken = await SecureStore.getItemAsync('userToken');
            } catch (e) {
                console.log(e);
            }
            if (userToken) {
                console.log(userToken);
                setToken(userToken);
            }
        };

        searchToken();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <Text color="#000" text30>
                Home
            </Text>

            <View style={styles.tokenContainer}>
                <Text color="#000" text80>
                    Token atual: {'\n' + token}
                </Text>
            </View>

            <Button
                style={styles.logoutButton}
                text70
                white
                onPress={handleLogout}
                label="Deslogar"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tokenContainer: {
        width: 200,
    },
    logoutButton: {
        marginTop: 20,
        width: 200,
    },
});
