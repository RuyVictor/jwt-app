import React from 'react';
import { styles } from './styles';
import { View, ScrollView } from 'react-native';
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
import AuthContext from '../../contexts/AuthContext';

interface IFormInputs {
    userCurrentPwd: string;
    userNewPwd: string;
    userNewPwdConfirmation: string;
}

const schema = yup.object().shape({
    userCurrentPwd: yup
        .string()
        .min(6, 'No mínimo 6 caracteres!')
        .required('Por favor adicione sua senha atual!'),

    userNewPwd: yup
        .string()
        .min(6, 'No mínimo 6 caracteres!')
        .required('Por favor adicione sua nova senha!'),

    userNewPwdConfirmation: yup
        .string()
        .test('passwords-match', 'Senhas não conferem!', function (value) {
            return this.parent.userNewPwd === value;
        }),
});

export default function ChangePassword({ navigation }) {
    const { changePassword } = React.useContext(AuthContext);

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

    // ACTIONS

    const [showPassword, setShowPassword] = React.useState(false);

    function handleShowPassword() {
        setShowPassword(!showPassword);
    }

    const handleChangePassword = async (data: IFormInputs) => {
        setAuthError('');

        const status = await changePassword(data.userCurrentPwd, data.userNewPwd);
        if (status === 200) {
            Toast.show({ text1: 'Senha trocada com sucesso!', type: 'success' });
            navigation.navigate('Profile');
        } else if (status === 404 || status === 503) {
            setAuthError('Não foi possível se conectar ao servidor!');
        } else if (status === 401) {
            setAuthError('A senha digitada não corresponde com a sua senha atual!');
        }
    };

    return (
        <View style={styles.container}>
            <MainHeader
                iconLeft={{
                    type: 'ionicon',
                    name: 'arrow-back',
                    onPress: () => navigation.goBack(),
                }}
                headerTitle="Trocar de senha"
            />

            <ScrollView contentContainerStyle={styles.inputs_container}>
                <Controller
                    name="userCurrentPwd"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <MainInput
                            {...field}
                            label="Senha atual"
                            hasError={errors?.userCurrentPwd}
                            maxLength={20}
                            errorMessage={errors.userCurrentPwd?.message}
                            secureTextEntry={true}
                            leftIcon={
                                <Icon
                                    iconStyle={styles.icon}
                                    name="lock-closed-sharp"
                                    type="ionicon"
                                    size={18}
                                />
                            }
                            placeholder="Digite sua senha atual"
                            onChangeText={field.onChange}
                        />
                    )}
                />

                <Controller
                    name="userNewPwd"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <MainInput
                            {...field}
                            label="Nova senha"
                            hasError={errors?.userNewPwd}
                            maxLength={20}
                            errorMessage={errors.userNewPwd?.message}
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
                        />
                    )}
                />

                <Controller
                    name="userNewPwdConfirmation"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <MainInput
                            {...field}
                            label="Confirmar senha"
                            hasError={errors?.userNewPwdConfirmation}
                            errorMessage={errors.userNewPwdConfirmation?.message}
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
                        />
                    )}
                />

                {authError !== '' && <RequestWarning warning={authError} />}

                <Divider style={styles.divider} inset={true} insetType="middle" width={1} />

                <MainButton
                    title="TROCAR SENHA"
                    icon={{
                        type: 'material',
                        name: 'arrow-forward-ios',
                        position: 'right',
                        size: 11,
                    }}
                    onPress={handleSubmit(handleChangePassword)}
                />
            </ScrollView>
        </View>
    );
}
