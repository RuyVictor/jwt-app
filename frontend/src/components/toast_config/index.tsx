import React from 'react';
import Toast, { BaseToastProps } from 'react-native-toast-message';
import { styles } from './styles';
import { View } from 'react-native';
import { Card, Icon, Text } from 'react-native-elements';

interface CustomToastProps extends BaseToastProps {
    props: any;
}

export const toastConfig = {
    success: ({ text1, props, ...rest }: CustomToastProps) => (
        <Card containerStyle={styles.container} wrapperStyle={styles.horizontal_container}>
            <View style={styles.horizontal_container}>
                <Icon
                    iconStyle={styles.warning_icon}
                    type="ionicon"
                    name="checkmark-circle"
                    size={24}
                />

                <Text style={styles.text1}>{text1}</Text>
            </View>

            <Icon
                iconStyle={styles.close_icon}
                type="ionicon"
                name="close"
                size={25}
                onPress={() => Toast.hide()}
            />
        </Card>
    ),
    error: () => {},
    info: () => {},
};
