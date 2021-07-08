import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

const { primary, secondary, warningColor } = theme.colors;
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
        color: warningColor,
        marginRight: 4
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