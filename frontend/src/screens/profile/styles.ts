import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

const { primary, secondary } = theme.colors;
const { main, bold } = theme.fonts;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primary,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
    },
    horizontal_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    user_information_container: {
        color: secondary,
        marginLeft: 15,
    },
    profile_user_title: {
        color: secondary,
        fontSize: 27,
        fontFamily: bold
    },
    profile_user_description: {
        color: secondary,
        fontSize: 18,
        fontFamily: main
    },
    version_label: {
        color: secondary,
        fontSize: 12,
    },
    logout_label: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: main
    },
    logout_button: {
        borderRadius: 100,
        backgroundColor: secondary,
    },
    logout_button_container: {
        alignSelf: 'center',
        width: 200,
        borderRadius: 100,
        elevation: 8
    },
    logout_button_icon: {
        color: primary,
    },
    modal_container: {
        backgroundColor: secondary,
        padding: 20,
        borderRadius: 6,
    },
    modal_title: {
        color: primary,
        fontSize: 30,
        fontFamily: main
    },
    modal_label: {
        color: primary,
        marginVertical: 20,
        fontSize: 17,
        fontFamily: main
    },
    modal_logout_button: {
        borderRadius: 100,
        backgroundColor: secondary,
    },
    modal_logout_button_container: {
        alignSelf: 'center',
        width: '46%',
        borderRadius: 100,
        elevation: 10
    },
    divider: {
        alignSelf: 'center',
        marginVertical: 5,
        width: 40,
    }
});