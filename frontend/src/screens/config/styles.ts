import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

const { primary, secondary } = theme.colors;
const { main } = theme.fonts;

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
    option_button: {
        borderRadius: 4,
        backgroundColor: secondary,
        marginBottom: 10,
        padding: 18
    },
    option_button_container: {
        width: '100%',
        borderRadius: 100,
    },
    version_label: {
        color: secondary,
        marginTop: 20,
        fontSize: 15,
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
    },
    divider: {
        alignSelf: 'center',
        marginVertical: 8,
        width: 170,
    }
});