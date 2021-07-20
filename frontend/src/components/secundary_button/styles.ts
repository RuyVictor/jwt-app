import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

const { bold } = theme.fonts;
const { secondary, tertiary } = theme.colors;

export const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
        backgroundColor: tertiary,
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingLeft: 6,
        paddingRight: 16,
    },
    button_container: {
        marginBottom: 10,
        borderRadius: 6,
        width: '100%',
    },
    button_title: {
        color: secondary,
        fontFamily: bold,
        fontSize: 20,
    },
    icon: {
        color: secondary,
        opacity: 0.7,
    },
});
