import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <Text color="#000" text30>
                SplashScreen
            </Text>
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
});
