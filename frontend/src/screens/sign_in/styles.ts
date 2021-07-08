import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

const { primary, secondary, warningColor } = theme.colors;
const { main, bold } = theme.fonts;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primary,
        alignItems: 'center',
    },
    signin_container: {
        width: 280,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    horizontal_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    title: {
        fontSize: 40,
        fontFamily: main
    },
    link: {
        textAlign: 'center',
        fontSize: 18,
        marginRight: 4,
        fontFamily: main,
        color: secondary,
        opacity: 0.6
    },
    link_bold: {
        fontSize: 18,
        fontFamily: bold,
        color: secondary,
        opacity: 0.6
    },
    icon: {
        color: primary,
    },
    divider: {
        alignSelf: 'center',
        marginVertical: 10,
        width: '60%'
    }
});