import React, { useEffect } from 'react';
import { styles, CELL_SIZE, CELL_BORDER_RADIUS } from './styles';
import { View, TouchableOpacity, Animated } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import MainHeader from '../../components/main_header';
import RequestWarning from '../../components/request_warning';
import Toast from 'react-native-toast-message';

import { theme } from '../../global/styles/theme';
const { primary, secondary } = theme.colors;

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
    RenderCellOptions,
} from 'react-native-confirmation-code-field';

// Contexts
import AuthContext from '../../contexts/AuthContext';

interface IRouteParams {
    email: string;
}

export default function ForgotPasswordCode({ route, navigation }) {
    const { email } = route.params as IRouteParams;

    const { forgotPassword, forgotPasswordVerify } = React.useContext(AuthContext);

    // WARNINGS
    const [authError, setAuthError] = React.useState('');

    const handleVerifyCode = async () => {
        setAuthError('');
        const { status, message } = await forgotPasswordVerify(email, codeValue);
        if (status === 201) {
            navigation.navigate('ForgotPasswordChangePassword', { email, code: codeValue });
        } else if (status === 406 && message === 'Code is not equal!') {
            setAuthError('O código não confere!');
            setCodeValue('');
        } else if (status === 406 && message === 'Token expired!') {
            setAuthError('Este código não existe ou já foi expirado!');
            setCodeValue('');
        } else if (status === 503) {
            setAuthError('Não foi possível se conectar ao servidor!');
            setCodeValue('');
        } else if (status === 500) {
            setAuthError('Ocorreu um erro interno!');
            setCodeValue('');
        }
    };

    const handleSendCodeAgain = async () => {
        setAuthError('');
        const status = await forgotPassword(email);
        if (status === 201) {
            Toast.show({ text1: 'O código foi enviado ao seu email!', type: 'success' });
        } else if (status === 404) {
            setAuthError('Usuário não encontrado!');
        } else if (status === 503) {
            setAuthError('Não foi possível se conectar ao servidor!');
        } else if (status === 500) {
            setAuthError('Ocorreu um erro interno!');
        }
    };

    const CELL_COUNT = 5;
    const [codeValue, setCodeValue] = React.useState('');

    //Automatically activates code verification
    useEffect(() => {
        async function handleAutomaticSubmit() {
            if (codeValue.length === CELL_COUNT) {
                handleVerifyCode();
            }
        }
        handleAutomaticSubmit();
    }, [codeValue]);

    const animationsColor = [...new Array(CELL_COUNT)].map(() => new Animated.Value(0));
    const animationsScale = [...new Array(CELL_COUNT)].map(() => new Animated.Value(1));
    const animateCell = ({ symbol, index, isFocused }: RenderCellOptions) => {
        const hasValue = Boolean(symbol);
        Animated.parallel([
            Animated.timing(animationsColor[index], {
                useNativeDriver: false,
                toValue: isFocused ? 1 : 0,
                duration: 320,
            }),
            Animated.spring(animationsScale[index], {
                useNativeDriver: false,
                toValue: hasValue ? 0 : 1,
                velocity: hasValue ? 10 : 2, // ANIMAÇÃO ANTERIOR E POSTERIOR DE CAMPO PREENCHIDO / OU NÃO
            }),
        ]).start();
    };

    const ref = useBlurOnFulfill({ value: codeValue, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: codeValue,
        setValue: setCodeValue,
    });

    const renderCell = ({ index, symbol, isFocused }: RenderCellOptions) => {
        const hasValue = Boolean(symbol);
        const animatedCellStyle = {
            backgroundColor: hasValue
                ? animationsScale[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [secondary, secondary],
                  })
                : animationsColor[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [primary, secondary],
                  }),
            borderRadius: animationsScale[index].interpolate({
                inputRange: [0, 1],
                outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
            }),
            transform: [
                {
                    scale: animationsScale[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.6, 1],
                    }),
                },
            ],
        };

        setTimeout(() => {
            animateCell({ symbol, index, isFocused });
        }, 0);

        return (
            <Animated.Text
                key={index}
                style={[styles.cell, animatedCellStyle]}
                onLayout={getCellOnLayoutHandler(index)}
            >
                {symbol || (isFocused ? <Cursor /> : null)}
            </Animated.Text>
        );
    };

    return (
        <View style={styles.container}>
            <MainHeader
                iconLeft={{
                    type: 'ionicon',
                    name: 'arrow-back',
                    onPress: () => navigation.goBack(),
                }}
                headerTitle="Recuperar senha"
            />

            <View style={styles.recover_container}>
                <CodeField
                    ref={ref}
                    {...props}
                    value={codeValue}
                    onChangeText={setCodeValue}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFiledRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={renderCell}
                />

                {authError !== '' && <RequestWarning warning={authError} />}

                <Divider style={styles.divider} inset={true} insetType="middle" width={1} />

                <TouchableOpacity onPress={handleSendCodeAgain}>
                    <View style={{ marginTop: 10, alignItems: 'center' }}>
                        <Text style={styles.link}>O código não chegou no seu email?</Text>

                        <Text style={styles.link_bold}>Clique aqui para reenviar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
