import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

const { primary, secondary } = theme.colors;
const { main } = theme.fonts;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primary,
        alignItems: 'center',
    },
    signup_container: {
        width: 280,
        flexGrow: 1,
        justifyContent: 'center'
    },
    horizontal_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
        marginTop: 10,
        fontSize: 20,
        fontFamily: main,
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