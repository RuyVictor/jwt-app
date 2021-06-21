import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

const { primary, secondary } = theme.colors;
const { main, bold } = theme.fonts;

export const styles = StyleSheet.create({
    status_bar: {
        backgroundColor: primary
    },
    container: {
        flex: 1,
        backgroundColor: primary,
        alignItems: 'center'
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
    recover_container: {
        flex: 1,
        width: 280,
        justifyContent: 'center'
    },
    horizontal_container: {
        flexDirection: 'row',
        alignItems: 'center',
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
        color: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input_text: {
        color: primary,
    },
    tips_card: {
        borderRadius: 4,
        margin: 10
    },
    tips_text: {
        marginLeft: 15,
        fontSize: 17,
        fontFamily: main,
        color: secondary,
    },
    warning_icon: {
        color: '#ff8c00',
    },
    auth_warning: {
        fontSize: 14,
        fontFamily: main,
        color: '#ff8c00',
        textAlign: 'center',
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