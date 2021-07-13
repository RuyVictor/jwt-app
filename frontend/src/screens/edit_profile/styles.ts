import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

const { primary, secondary, warningColor } = theme.colors;
const { main } = theme.fonts;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primary,
        alignItems: 'center',
    },
    edit_container: {
        width: 280,
    },
    horizontal_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar_container: {
        elevation: 5
    },
    avatar_icon: {
        color: primary,
    },
    avatar_icon_container: {
        backgroundColor: secondary,
        elevation: 5
    },
    title: {
        fontSize: 40,
        fontFamily: main
    },
    warning_icon: {
        color: warningColor,
        marginRight: 4
    },
    auth_warning: {
        fontSize: 14,
        fontFamily: main,
        color: warningColor,
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
    divider: {
        alignSelf: 'center',
        marginVertical: 10,
        width: '60%'
    }
});