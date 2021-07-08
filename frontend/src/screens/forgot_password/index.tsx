import React from 'react';
import { styles } from "./styles";
import { View } from 'react-native';
import { Card, Icon, Text, Divider } from 'react-native-elements';
import MainHeader from '../../components/main_header';
import RequestWarning from '../../components/request_warning';
import MainButton from '../../components/main_button';
import MainInput from '../../components/main_input';
import Toast from 'react-native-toast-message';

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Contexts
import AuthContext from '../../contexts/AuthContext';

interface IFormInputs {
  userEmail: string
}

const schema = yup.object().shape({
  userEmail: yup
    .string()
    .email("Por favor adicione um email válido!")
    .required("Por favor adicione um email válido!")
});

export default function ForgotPassword({navigation}) {

    const { forgotPasswordNotification } = React.useContext(AuthContext);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
        mode: 'onSubmit'
    });

    // WARNINGS
    const [authError, setAuthError] = React.useState('');
    
    const handleRecoverPassword = async (data: IFormInputs) => {
        setAuthError('');
        console.log(data)
        const status = await forgotPasswordNotification(data.userEmail)
        if (status === 201) {
            Toast.show({ text1: 'O código foi enviado ao seu email!', type: 'success' })
            navigation.navigate('ForgotPasswordCode', {email: data.userEmail})
        } else if (status === 404) {
            setAuthError('Usuário não encontrado!');
        } else if (status === 503) {
            setAuthError('Não foi possível se conectar ao servidor!');
        } else if (status === 500) {
            setAuthError('Ocorreu um erro interno!');
        }
    };

    return (
        <View style={styles.container}>

            <MainHeader
                iconLeft={{type: 'ionicon', name: 'arrow-back', onPress: () => navigation.goBack()}}
                headerTitle="Recuperar senha"
            />

            <View style={styles.recover_container}>

                <Card
                containerStyle={styles.tips_card}
                wrapperStyle={styles.horizontal_container}>
                    <Icon
                        iconStyle={styles.warning_icon}
                        type='font-awesome'
                        name='warning'
                        size={14}
                    />
                    <Text style={styles.tips_text}>
                        Você pode recuperar a sua senha apartir do código
                        que será enviado ao seu email.
                    </Text>
                </Card>

                <Controller
                name="userEmail"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <MainInput
                        {...field}
                        label="Email"
                        hasError={errors?.userEmail}
                        errorMessage={errors.userEmail?.message}
                        leftIcon={
                            <Icon
                                iconStyle={styles.icon}
                                name='email'
                                size={18}
                            />
                        }
                        keyboardType="email-address"
                        placeholder="Digite seu email"
                        onChangeText={field.onChange}
                    />
                )}/>

                {authError !== "" && <RequestWarning warning={authError} />}

                <Divider
                    style={styles.divider}
                    inset={true} insetType="middle"
                    width={1}
                />

                <MainButton
                    title="RECUPERAR"
                    icon={{
                        type: "octicon",
                        name: 'reply',
                        position: 'right',
                        size: 11
                    }}
                    onPress={handleSubmit(handleRecoverPassword)}
                />
            </View>
        </View>
    );
}