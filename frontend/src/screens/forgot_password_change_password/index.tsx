import React from 'react';
import { styles } from './styles';
import { View } from 'react-native';
import { Icon, Divider } from 'react-native-elements';
import MainHeader from '../../components/main_header';
import RequestWarning from '../../components/request_warning';
import MainButton from '../../components/main_button';
import MainInput from '../../components/main_input';
import Toast from 'react-native-toast-message';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Contexts
import { useAuth } from '../../hooks/useAuth';

interface IRouteParams {
    email: string;
    code: string;
}

interface IFormInputs {
    userPwd: string;
    userPwdConfirmation: string;
}

const schema = yup.object().shape({
    userPwd: yup
        .string()
        .min(6, 'No mínimo 6 caracteres!')
        .required('Por favor adicione sua senha!'),
    userPwdConfirmation: yup
        .string()
        .test('passwords-match', 'Senhas não conferem!', function (value) {
            return this.parent.userPwd === value;
        }),
});

export default function ForgotPasswordChangePassword({ route, navigation }) {
    const { email, code } = route.params as IRouteParams;

    const { forgotPasswordVerify } = useAuth();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        mode: 'onSubmit',
    });

    // WARNINGS
    const [authError, setAuthError] = React.useState('');

    const handleGetNewPassword = async (data: IFormInputs) => {
        setAuthError('');
        console.log(data);
        const { status, message } = await forgotPasswordVerify(email, code, data.userPwd);
        if (status === 201) {
            Toast.show({ text1: 'Senha trocada com sucesso!', type: 'success' });
            navigation.navigate('SignIn');
        } else if (status === 406 && message === 'Code is not equal!') {
            setAuthError('Código não confere!');
        } else if (status === 406 && message === 'Token expired!') {
            setAuthError('Este código não existe ou já foi expirado!');
        } else if (status === 503) {
            setAuthError('Não foi possível se conectar ao servidor!');
        } else if (status === 500) {
            setAuthError('Ocorreu um erro interno!');
        }
    };

    const [showPassword, setShowPassword] = React.useState(false);

    function handleShowPassword() {
        setShowPassword(!showPassword);
    }

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
                <Controller
                    name="userPwd"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <MainInput
                            {...field}
                            label="Nova senha"
                            hasError={errors?.userPwd}
                            errorMessage={errors.userPwd?.message}
                            secureTextEntry={!showPassword}
                            leftIcon={
                                <Icon
                                    iconStyle={styles.icon}
                                    name="lock-closed-sharp"
                                    type="ionicon"
                                    size={18}
                                />
                            }
                            rightIcon={
                                <Icon
                                    iconStyle={styles.icon}
                                    type="ionicon"
                                    size={20}
                                    onPress={handleShowPassword}
                                    name={showPassword ? 'eye' : 'eye-off'}
                                />
                            }
                            placeholder="Digite sua nova senha"
                            onChangeText={field.onChange}
                            renderErrorMessage={false}
                        />
                    )}
                />

                <Controller
                    name="userPwdConfirmation"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <MainInput
                            {...field}
                            label="Confirmar senha"
                            hasError={errors?.userPwdConfirmation}
                            errorMessage={errors.userPwdConfirmation?.message}
                            secureTextEntry={true}
                            leftIcon={
                                <Icon
                                    iconStyle={styles.icon}
                                    name="lock-closed-sharp"
                                    type="ionicon"
                                    size={18}
                                />
                            }
                            placeholder="Redigite sua nova senha"
                            onChangeText={field.onChange}
                            renderErrorMessage={false}
                        />
                    )}
                />

                {authError !== '' && <RequestWarning warning={authError} />}

                <Divider style={styles.divider} inset={true} insetType="middle" width={1} />

                <MainButton title="CONFIRMAR" onPress={handleSubmit(handleGetNewPassword)} />
            </View>
        </View>
    );
}
