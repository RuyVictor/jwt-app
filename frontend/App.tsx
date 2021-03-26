import React from 'react';
import axios from 'axios';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';

// backend connection
import BACKEND_HOST_IP from './config/config';

// Pages
import Login from './pages/Login';
import Home from './pages/Home';
import SplashScreen from './pages/SplashScreen';

//Contexts
import AuthContext from './contexts/AuthContext';

export default function App() {
    const Stack = createStackNavigator();

    async function saveToken(key, token) {
        try {
            await SecureStore.setItemAsync(key, token);
            console.log('Saved token: ' + token);
        } catch (e) {
            console.log(e);
        }
    }

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        },
    );

    React.useEffect(() => {
        //Após validado, irá para a página Home
        const searchToken = async () => {
            let userToken;
            let response;

            try {
                userToken = await SecureStore.getItemAsync('userToken');
                response = await axios.get(BACKEND_HOST_IP + 'api/home', {
                    headers: { 'x-access-token': userToken },
                });

                // Resposta do middleware de autenticação
                if (response) {
                    // Se o token for válido
                    if (response.status == 200) {
                        return dispatch({ type: 'RESTORE_TOKEN', token: userToken });
                    }
                }
            } catch (e) {
                //Se o token for inválido
                return dispatch({ type: 'RESTORE_TOKEN', token: null });
            }
        };

        searchToken();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (data) => {
                console.log(data);

                let response;
                try {
                    response = await axios.post(BACKEND_HOST_IP + 'api/login', {
                        username: data.username,
                        password: data.password,
                    });
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        if (e.response.status == 500) {
                            return 'invalidUserData';
                        }
                    } else {
                        return 'conectionError';
                    }
                }

                if (response) {
                    if (response.status == 200) {
                        dispatch({ type: 'SIGN_IN', token: response.data.token });
                        saveToken('userToken', response.data.token); // Salva um token válido
                    }
                }
            },

            signOut: () => dispatch({ type: 'SIGN_OUT' }),

            // signUp descartado já que a aplicação está relacionada a teste de autenticação
            signUp: async (data) => {
                dispatch({ type: 'SIGN_IN', token: response.data.token });
            },
        }),
        [],
    );

    if (state.isLoading) {
        // Esperando a validação do token.
        return <SplashScreen />;
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    {state.userToken == null ? (
                        <>
                            <Stack.Screen name="Login" component={Login} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="Home" component={Home} />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
