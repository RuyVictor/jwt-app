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
        justifyContent: 'center'
    },
    token_container: {
        width: 200,
    },
    header_container: {
        backgroundColor: secondary,
        height: 90,
        paddingHorizontal: 14,
    },
    header_title: {
        color: primary,
        fontSize: 24,
        fontFamily: main
    },
    header_icon: {
        color: primary,
    },
    token_title: {
        color: secondary,
        fontSize: 24,
        fontFamily: main
    },
});