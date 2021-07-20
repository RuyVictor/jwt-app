import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

const { primary, secondary, warningColor } = theme.colors;
const { main, bold } = theme.fonts;

export const CELL_SIZE = 40;
export const CELL_BORDER_RADIUS = 4;

export const styles = StyleSheet.create({
    status_bar: {
        backgroundColor: primary,
    },
    container: {
        flex: 1,
        backgroundColor: primary,
        alignItems: 'center',
    },
    header_container: {
        backgroundColor: secondary,
        height: 90,
        paddingHorizontal: 14,
        zIndex: 1,
    },
    header_icon: {
        color: primary,
    },
    header_title: {
        color: primary,
        fontSize: 24,
        fontFamily: main,
    },
    recover_container: {
        flex: 1,
        width: 280,
        justifyContent: 'center',
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
    codeFiledRoot: {
        height: CELL_SIZE,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    cell: {
        marginHorizontal: 8,
        height: CELL_SIZE,
        width: CELL_SIZE,
        lineHeight: CELL_SIZE - 3,
        fontSize: 28,
        textAlign: 'center',
        borderRadius: CELL_BORDER_RADIUS,
        color: primary, //TEXT COLOR
        elevation: 4,
    },
    left_icon_container: {
        width: 25,
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
        width: '60%',
    },
    link: {
        textAlign: 'center',
        fontSize: 18,
        marginRight: 4,
        fontFamily: main,
        color: secondary,
        opacity: 0.6,
    },
    link_bold: {
        fontSize: 18,
        fontFamily: bold,
        color: secondary,
        opacity: 0.6,
    },
});
