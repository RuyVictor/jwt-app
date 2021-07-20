import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

const { warningColor } = theme.colors;
const { main } = theme.fonts;

export const styles = StyleSheet.create({
    horizontal_container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'center',
    },
    warning_icon: {
        color: warningColor,
        marginRight: 4,
    },
    warning_text: {
        fontSize: 14,
        fontFamily: main,
        color: warningColor,
        textAlign: 'center',
    },
});
