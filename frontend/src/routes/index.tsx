import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// SCREENS
import SplashScreen from '../screens/splash_screen';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

// CONTEXT
import { useAuth } from '../hooks/useAuth';

const Routes: React.FC = () => {
    const { validateToken, getUserData } = useAuth();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function validation() {
            try {
                const data = await validateToken();
                if (data) {
                    setLoading(data.isLoading);
                }
            } catch (e) {
                console.log(e);
            }
        }
        validation();
    }, []);

    if (loading) {
        // Esperando a validação do token.
        return <SplashScreen />;
    }

    return (
        <NavigationContainer>
            {Object.keys(getUserData).length !== 0 ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    );
};

export default Routes;
