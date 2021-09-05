import React, { useState, useMemo, createContext, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api';

interface IUserRequest {
    user?: IUser;
    token?: string;
}

interface IUser {
    id: string;
    user_name: string;
    email: string;
    password: string;
    avatar: string;
    verified: string;
}

interface AuthContextProps {
    signIn: (email: string, password: string) => Promise<number | undefined>,
    signUp: (data: IUser) => Promise<number | undefined>,
    signOut: () => void,
    reloadUserData: () => Promise<number | undefined>,
    updateUser: (data: IUser) => Promise<number | undefined>,
    validateToken: () => Promise<{ isLoading: boolean } | undefined>,
    confirmEmail: (email: string, code: string) => Promise<number | undefined>,
    forgotPasswordNotification: (email: string) => Promise<number | undefined>,
    forgotPasswordVerify: (email: string, code: string, password?: string) => Promise<{status: number, message?: string} | undefined>,
    changePassword: (password: string, newPassword: string) => Promise<{status: number, message?: string} | undefined>,
    getUserData: IUserRequest,
}

interface AuthContextProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider (props: AuthContextProviderProps) {
    
    const [currentUserData, setCurrentUserData] = useState<IUserRequest>({});

    async function saveUserData(data: IUserRequest) {
        try {
            await SecureStore.setItemAsync('user_data', JSON.stringify(data));
        } catch (e) {
            console.log(e);
        }
    }

    const authActions = useMemo(
        () => ({
            signIn: async (email: string, password: string): Promise<number | undefined> => {
                let response;
                try {
                    response = await api.post<IUserRequest>('/auth/signin', {
                        email,
                        password,
                    });

                    if (response.status === 201) {
                        saveUserData(response.data); // Salva o usuário no secure storage
                        setCurrentUserData(response.data);
                        api.defaults.headers.common['Authorization'] = 'Bearer '.concat(
                            response.data.token!,
                        );
                    }
                } catch (e: any) {
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
                } catch (e: any) {
                    console.log(e);
                    if (e.response) {
                        return e.response.status;
                    } else {
                        return 503;
                    }
                }
            },

            signOut: async () => {
                await SecureStore.deleteItemAsync('user_data');
                setCurrentUserData({});
            },

            reloadUserData: async (): Promise<number | undefined> => {
                let response;
                try {
                    response = await api.get<IUser>(`/users/findOne/${currentUserData.user?.id}`);

                    if (response.status === 200) {
                        const updatedUser = {
                            user: { ...currentUserData.user, ...response.data },
                            token: currentUserData.token,
                        };
                        saveUserData(updatedUser); // Salva o usuário no secure storage
                        setCurrentUserData(updatedUser);
                    }
                } catch (e: any) {
                    console.log(e);
                    if (e.response) {
                        return e.response.status;
                    } else {
                        return 503;
                    }
                }
            },

            updateUser: async (data: IUser): Promise<number | undefined> => {
                let response;
                try {
                    response = await api.patch(`/users/update/${currentUserData.user?.id}`, {
                        user_name: data.user_name,
                        email: data.email,
                        password: data.password,
                    });

                    if (response.status === 200) {
                        return response.status;
                    }
                } catch (e: any) {
                    console.log(e);
                    if (e.response) {
                        console.log(e.response.data);
                        return e.response.status;
                    } else {
                        return 503;
                    }
                }
            },

            validateToken: async (): Promise<{ isLoading: boolean } | undefined> => {
                let response;

                try {
                    const userData: IUserRequest = JSON.parse(
                        (await SecureStore.getItemAsync('user_data')) as string,
                    );

                    if (!userData) {
                        return { isLoading: false };
                    }

                    api.defaults.headers.common['Authorization'] = 'Bearer '.concat(
                        userData.token!,
                    );

                    response = await api.get('/auth/validate');

                    if (response.status === 200) {
                        setCurrentUserData(userData); // Salva apenas as informações do usuário.
                        return { isLoading: false };
                    }
                } catch (e: any) {
                    //Se o token for inválido
                    console.log(e);
                    if (e.response) {
                        if (e.response.status === 401) {
                            await SecureStore.deleteItemAsync('user_data');
                            return { isLoading: false };
                        }
                    } else {
                        return { isLoading: false }; //Caso não for possível a conexão com o servidor.
                        //Retornará a página de login
                    }
                }
            },

            confirmEmail: async (email: string, code: string): Promise<number | undefined> => {
                let response;
                try {
                    response = await api.post('/mail/confirm-email', {
                        email,
                        code,
                    });

                    if (response.status === 201) {
                        return response.status;
                    }
                } catch (e: any) {
                    console.log(e);
                    if (e.response) {
                        return e.response.status;
                    } else {
                        return 503;
                    }
                }
            },

            forgotPasswordNotification: async (email: string): Promise<number | undefined> => {
                let response;
                try {
                    response = await api.post('/mail/forgot-password-notification', {
                        email,
                    });

                    if (response.status === 201) {
                        return response.status;
                    }
                } catch (e: any) {
                    console.log(e);
                    if (e.response) {
                        return e.response.status;
                    } else {
                        return 503;
                    }
                }
            },

            forgotPasswordVerify:
            async (email: string, code: string, password?: string):
            Promise<{status: number, message?: string} | undefined> => {
                let response;
                try {
                    response = await api.post('/mail/forgot-password-verify', {
                        email,
                        code,
                        password,
                    });

                    if (response.status === 201) {
                        return { status: response.status };
                    }
                } catch (e: any) {
                    console.log(e);
                    if (e.response) {
                        return { status: e.response.status, message: e.response.data.message };
                    } else {
                        return { status: 503 };
                    }
                }
            },

            changePassword:
            async (password: string, newPassword: string):
            Promise<{status: number, message?: string} | undefined> => {
                let response;
                try {
                    response = await api.patch(
                        `/users/update/${currentUserData.user?.id}`,
                        {
                            password,
                            newPassword,
                        },
                    );

                    if (response.status === 200) {
                        return { status: response.status };
                    }
                } catch (e: any) {
                    if (e.response) {
                        console.log(e.response.data);
                        return { status: e.response.status, message: e.response.data.message };
                    } else {
                        return { status: 503 };
                    }
                }
            },

            getUserData: currentUserData,
        }),
        [currentUserData],
    );
    
    return (
        <AuthContext.Provider value={authActions}>
            {props.children}
        </AuthContext.Provider>
    )
}
