import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

const { main } = theme.fonts;
const { primary, secondary } = theme.colors;

export const styles = StyleSheet.create({
    status_bar: {
        backgroundColor: primary
    },
    header_container: {
        backgroundColor: secondary,
        height: 90,
        paddingHorizontal: 14,
        zIndex: 1
    },
    header_title: {
        color: primary,
        fontSize: 24,
        fontFamily: main
    },
    header_icon: {
        color: primary,
    }
});