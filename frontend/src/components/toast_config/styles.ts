import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

const { primary, secondary } = theme.colors;
const { main } = theme.fonts;

export const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 60,
        paddingHorizontal: 15,
        backgroundColor: primary,
        borderRadius: 20,
        elevation: 15,
    },
    horizontal_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    warning_icon: {
        color: '#228c22',
        marginRight: 14,
    },
    close_icon: {
        color: secondary,
    },
    text1: {
        fontSize: 18,
        fontFamily: main,
        color: secondary,
        textAlign: 'justify',
    },
});
