import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

const { primary } = theme.colors;
const { main } = theme.fonts;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 50,
        fontFamily: main,
    },
});
