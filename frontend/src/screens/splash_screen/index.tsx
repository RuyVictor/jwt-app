import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { styles } from './styles';
import { View, Text } from 'react-native';

const SplashScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <Text style={styles.title}>JWT App</Text>
        </View>
    );
};

export default SplashScreen;
