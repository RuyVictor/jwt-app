import React, {useEffect, useState, useMemo} from 'react';
import api from "../services/api";
import * as SecureStore from 'expo-secure-store';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// SCREENS
import SplashScreen from '../screens/splash_screen';
import SignIn from '../screens/sign_in';
import SignUp from '../screens/sign_up';
import ForgotPassword from '../screens/forgot_password';
import ForgotPasswordCode from '../screens/forgot_password_code';
import ForgotPasswordChangePassword from '../screens/forgot_password_change_password';
import Home from '../screens/home';
import Config from '../screens/config';

// CONTEXT
import AuthContext from '../contexts/AuthContext';

const Stack = createStackNavigator();

interface IUserRequest {
    user: IUser
    token: string;
};

interface IUser {
    user_name?: string;
    email?: string;
    password?: string;
    avatar?: string;
    verified?: string;
}


const Routes: React.FC = () => {

	async function saveUserData(data: IUserRequest) {
        try {
            await SecureStore.setItemAsync('user_data', JSON.stringify(data));
        } catch (e) {
            console.log(e);
        }
    }

    const [loading, setLoading] = useState(true);

    const [currentUserData, setCurrentUserData] = useState<IUser>({});

    useEffect(() => {
        //Função de validação do usuário, irá para a tela Home
        const validateToken = async () => {
            let response;

            try {

                let userData: IUserRequest = JSON.parse(
                    await SecureStore.getItemAsync("user_data") as string
                );

                if (!userData) {

                    return setLoading(false)
                }

                api.defaults.headers.common["Authorization"] = userData.token as string;

                response = await api.get('/auth/validate');

                if (response.status === 200) {
                    setCurrentUserData(userData as IUser)
                    setLoading(false)
                }

            } catch (e) {
                //Se o token for inválido
                console.log(e)
                if (e.response) {
                    if (e.response.status === 401) {
                        await SecureStore.deleteItemAsync('user_data');
                        setLoading(false)
                    }
                } else {
                    setLoading(false) //Caso não for possível a conexão com o servidor.
                    //Retornará a página de login
                }
            }
        };

        validateToken();
    }, []);

    const authContext = useMemo(
        () => ({
            signIn: async (email: string, password: string): Promise<number | undefined> => {

                let response;
                try {
                    response = await api.post('/auth/signin', {
                        email,
                        password
                    });

                    if (response.status === 201) {
                        saveUserData(response.data); // Salva o usuário no secure storage
                        setCurrentUserData(response.data)
                    }
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        return e.response.status;
                    } else {
                        return 503;
                    }
                }
            },

            signUp: async (data: IUser): Promise<number | undefined> => {
                let response;
                try {
                    response = await api.post('/auth/signup', {
                        user_name: data.user_name,
                        email: data.email,
                        password: data.password,
                    });

                    if (response.status === 201) {
                        return response.status;
                    }
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        return e.response.status;
                    } else {
                        return 503;
                    }
                }
            },

            signOut: async () => {
                await SecureStore.deleteItemAsync('user_data')
                setCurrentUserData({})
            },

            confirmEmail: async (email: string, code: string) => {
                let response;
                try {
                    response = await api.post('/mail/confirm-email', {
                        email,
                        code
                    });

                    if (response.status === 201) {
                        return response.status;
                    }
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        return e.response.status;
                    } else {
                        return 503;
                    }
                }
            },

            forgotPassword: async (email: string) => {
                let response;
                try {
                    response = await api.post('/mail/forgot-password', {
                        email
                    });

                    if (response.status === 201) {
                        return response.status;
                    }
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        return e.response.status;
                    } else {
                        return 503;
                    }
                }
            },

            forgotPasswordCode: async (email: string, code: string) => {

                console.log(email + " " + code)
                let response;
                try {
                    response = await api.post('/mail/forgot-password-code', {
                        email,
                        code
                    });

                    if (response.status === 201) {
                        return response.status;
                    }
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        return e.response.status;
                    } else {
                        return 503;
                    }
                }
            },

            forgotPasswordChangePassword: async (email: string, code: string, password: string) => {
                let response;
                try {
                    response = await api.post('/mail/forgot-password-change-password', {
                        email,
                        password,
                        code
                    });

                    if (response.status === 201) {
                        return response.status;
                    }
                } catch (e) {
                    console.log(e);
                    if (e.response) {
                        return e.response.status;
                    } else {
                        return 503;
                    }
                }
            },

            getUserData: currentUserData

        }),[currentUserData],
    );

    if (loading) {
        // Esperando a validação do token.
        return <SplashScreen/>;
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    {Object.keys(currentUserData).length === 0 ? (
                        <>
                            <Stack.Screen name="SignIn" component={SignIn} />
                            <Stack.Screen name="SignUp" component={SignUp} />
                            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                            <Stack.Screen name="ForgotPasswordCode" component={ForgotPasswordCode} />
                            <Stack.Screen name="ForgotPasswordChangePassword" component={ForgotPasswordChangePassword} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="Home" component={Home} />
                            <Stack.Screen name="Config" component={Config} />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
};

export default Routes;