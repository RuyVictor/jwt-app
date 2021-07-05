import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

const { primary, secondary } = theme.colors;
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
    login_button: {
        borderRadius: 100,
        backgroundColor: secondary,
    },
    login_button_container: {
        alignSelf: 'center',
        width: '92%',
        borderRadius: 100,
    },
    title: {
        fontSize: 40,
        fontFamily: main
    },
    warning_icon: {
        color: '#ff8c00',
        marginRight: 4
    },
    auth_warning: {
        fontSize: 14,
        fontFamily: main,
        color: '#ff8c00',
        textAlign: 'center',
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
    arrow_icon: {
        color: primary,
    },
    divider: {
        alignSelf: 'center',
        marginVertical: 10,
        width: '60%'
    }
});