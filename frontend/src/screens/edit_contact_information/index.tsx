import React from 'react';
import { styles } from './styles';
import { View } from 'react-native';
import { Icon, Divider } from 'react-native-elements';

// CUSTOM COMPONENTS
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

interface IFormInputs {
    userEmail: string;
    userPwd: string;
}

const schema = yup.object().shape({
    userEmail: yup
        .string()
        .email('Por favor adicione um email válido!')
        .required('Por favor adicione um email válido!'),

    userPwd: yup
        .string()
        .min(6, 'No mínimo 6 caracteres!')
        .required('Por favor adicione sua senha!'),
});

export default function EditContactInformation({ navigation }) {
    const { updateUser, getUserData, reloadUserData } = useAuth();

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

    const handleUpdateUser = async (data: IFormInputs) => {
        setAuthError('');

        if (data.userEmail === getUserData.user?.email) {
            return setAuthError('O email digitado é igual ao email atual!');
        }

        const status = await updateUser({
            email: data.userEmail,
            password: data.userPwd,
        });
        if (status === 200) {
            Toast.show({ text1: 'Dados atualizados com sucesso!', type: 'success' });
            //Após a atualização dos dados, atualizar em tela via api call.
            await reloadUserData();
            navigation.navigate('Profile');
        } else if (status === 404 || status === 503) {
            setAuthError('Não foi possível se conectar ao servidor!');
        } else if (status === 401) {
            setAuthError('A senha digitada não corresponde com a sua senha atual!');
        } else if (status === 409) {
            setAuthError('O email digitado já existe em nosso sistema!');
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
                headerTitle="Editar informações de contato"
                headerTitleSize={21}
            />

            <View style={styles.edit_container}>
                <Controller
                    name="userEmail"
                    control={control}
                    defaultValue={getUserData.user?.email}
                    render={({ field }) => (
                        <MainInput
                            {...field}
                            label="Email"
                            hasError={errors?.userEmail}
                            errorMessage={errors.userEmail?.message}
                            leftIcon={<Icon iconStyle={styles.icon} name="email" size={18} />}
                            keyboardType="email-address"
                            placeholder="Digite seu email"
                            onChangeText={field.onChange}
                        />
                    )}
                />

                <Controller
                    name="userPwd"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <MainInput
                            {...field}
                            label="Senha para confirmação"
                            hasError={errors?.userPwd}
                            errorMessage={errors.userPwd?.message}
                            secureTextEntry={true}
                            leftIcon={
                                <Icon
                                    iconStyle={styles.icon}
                                    name="lock-closed-sharp"
                                    type="ionicon"
                                    size={18}
                                />
                            }
                            placeholder="Digite sua senha"
                            onChangeText={field.onChange}
                        />
                    )}
                />

                {authError !== '' && <RequestWarning warning={authError} />}

                <Divider style={styles.divider} inset={true} insetType="middle" width={1} />

                <MainButton
                    title="ATUALIZAR DADOS"
                    icon={{
                        type: 'material',
                        name: 'arrow-forward-ios',
                        position: 'right',
                        size: 11,
                    }}
                    onPress={handleSubmit(handleUpdateUser)}
                />
            </View>
        </View>
    );
}
