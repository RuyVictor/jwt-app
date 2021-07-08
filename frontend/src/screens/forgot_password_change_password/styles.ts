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
    left_icon_container: {
        width: 25,
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