import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { View, TextField, Text, Button } from 'react-native-ui-lib';

// Contexts
import AuthContext from '../contexts/AuthContext';

export default function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [usernameWarningText, setUsernameWarningText] = React.useState('');
    const [passwordWarningText, setPasswordWarningText] = React.useState('');

    const [authError, setAuthError] = React.useState('');

    const { signIn } = React.useContext(AuthContext);

    const handleLogin = async () => {
        setAuthError('');

        if (username !== '') {
            setUsernameWarningText('');
        } else {
            setUsernameWarningText('Adicione um usuário válido!');
        }

        if (password !== '') {
            setPasswordWarningText('');
        } else {
            setPasswordWarningText('Adicione uma senha válida!');
        }

        if (username !== '' && password !== '') {
            const result = await signIn({ username, password });
            setUsername('');
            setPassword('');

            if (result == 'conectionError') {
                setAuthError('Não foi possível se conectar ao servidor');
            } else if (result == 'invalidUserData') {
                setAuthError('Usuário ou senha inválida');
            }
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <Text color="#000" text40>
                Teste JWT
            </Text>

            <TextField
                text70
                style={styles.textfield}
                placeholder="Usuário..."
                onChangeText={(value) => setUsername(value)}
                error={usernameWarningText}
                dark10
            />

            <TextField
                text70
                style={styles.textfield}
                placeholder="Senha..."
                onChangeText={(value) => setPassword(value)}
                error={passwordWarningText}
                dark10
            />

            <Text color="#000" text70>
                {authError}
            </Text>

            <Button style={styles.loginButton} text70 white onPress={handleLogin} label="Entrar" />
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
    textfield: {
        marginTop: 10,
        width: 200,
    },
    loginButton: {
        marginTop: 20,
        width: 200,
    },
});
