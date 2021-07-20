import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';

// SCREENS
import Home from '../screens/home';
import Profile from '../screens/profile';
import EditProfile from '../screens/edit_profile';
import EditContactInformation from '../screens/edit_contact_information';
import ChangePassword from '../screens/change_password';

const Stack = createStackNavigator();

const AppRoutes: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="EditContactInformation" component={EditContactInformation} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
        </Stack.Navigator>
    );
};

export default AppRoutes;
