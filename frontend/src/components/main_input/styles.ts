import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

const { primary, secondary } = theme.colors;
const { main } = theme.fonts;

export const styles = StyleSheet.create({
    textfield_title: {
        marginVertical: 8,
        fontSize: 17,
        fontFamily: main,
        color: secondary,
    },
    textfield: {
        width: '100%',
        height: 45,
        paddingHorizontal: 10,
        borderWidth: 0,
        borderBottomWidth: 0,
        borderRadius: 5,
        borderColor: primary,
        backgroundColor: secondary,
    },
    input_text: {
        color: primary,
    },
    left_icon_container: {
        width: 25,
    },
});
