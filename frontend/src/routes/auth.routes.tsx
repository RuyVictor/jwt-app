import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// SCREENS
import SignIn from '../screens/sign_in';
import SignUp from '../screens/sign_up';
import ForgotPassword from '../screens/forgot_password';
import ForgotPasswordCode from '../screens/forgot_password_code';
import ForgotPasswordChangePassword from '../screens/forgot_password_change_password';

const Stack = createStackNavigator();

const AuthRoutes: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="ForgotPasswordCode" component={ForgotPasswordCode} />
                <Stack.Screen name="ForgotPasswordChangePassword" component={ForgotPasswordChangePassword} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AuthRoutes;