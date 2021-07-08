import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

const { primary, secondary } = theme.colors;

export const styles = StyleSheet.create({
    button: {
        borderRadius: 100,
        backgroundColor: secondary,
    },
    button_container: {
        alignSelf: 'center',
        width: '92%',
        borderRadius: 100,
        elevation: 8
    },
    icon: {
        color: primary,
    },
});