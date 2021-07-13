import React, { useEffect, useState } from 'react';

// SCREENS
import SplashScreen from '../screens/splash_screen';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

// CONTEXT
import AuthContext from '../contexts/AuthContext';

const Routes: React.FC = () => {
    const { validateToken, getUserData } = React.useContext(AuthContext);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function validation() {
            try {
                let data = await validateToken()
                if (data) {
                    setLoading(data.isLoading)
                }
            } catch (e) {
                console.log(e)
            }
        }
        validation()
    }, []);

    if (loading) {
        // Esperando a validação do token.
        return <SplashScreen/>;
    }

    return Object.keys(getUserData).length !== 0 ? <AppRoutes /> : <AuthRoutes />
};

export default Routes;