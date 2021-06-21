import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

const { primary, secondary } = theme.colors;
const { main } = theme.fonts;

export const styles = StyleSheet.create({
    status_bar: {
        backgroundColor: primary
    },
    container: {
        flex: 1,
        backgroundColor: primary,
        alignItems: 'center',
    },
    header_container: {
        backgroundColor: secondary,
        height: 90,
        paddingHorizontal: 14,
        zIndex: 1
    },
    header_icon: {
        color: primary,
    },
    header_title: {
        color: primary,
        fontSize: 24,
        fontFamily: main
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
    textfield_title: {
        marginVertical: 8,
        fontSize: 17,
        fontFamily: main,
        color: secondary
    },
    textfield: {
        width: '100%',
        height: 45,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: primary,
        backgroundColor: secondary,
    },
    input_text: {
        color: primary,
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
    left_icon_container: {
        width: 25,
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