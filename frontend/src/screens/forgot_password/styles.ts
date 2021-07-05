import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

const { primary, secondary } = theme.colors;
const { main } = theme.fonts;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primary,
        alignItems: 'center'
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
        marginRight: 4
    },
    auth_warning: {
        fontSize: 14,
        fontFamily: main,
        color: '#ff8c00',
        textAlign: 'center',
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