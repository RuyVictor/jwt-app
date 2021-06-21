import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { styles } from "./styles";
import { View } from 'react-native';
import { Header, Icon, Button, Text, Input, Divider } from 'react-native-elements'
import Toast from 'react-native-toast-message';

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Contexts
import AuthContext from '../../contexts/AuthContext';

interface IRouteParams {
  email: string
}

interface IFormInputs {
  userEmail: string
}

const schema = yup.object().shape({
  userEmail: yup
    .string()
    .email("Por favor adicione um email válido!")
    .required("Por favor adicione um email válido!")
});

export default function ForgotPasswordConfirmation({route, navigation}) {

    const { email } = route.params as IRouteParams;

    const { recoverPassword } = React.useContext(AuthContext);

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
    
    const handleRecoverPasswordConfirmation = async (data: IFormInputs) => {
        setAuthError('');
        console.log(data)
        const status = await signIn({email: email, code: data.userCode})
        if (status === 200) {
            Toast.show({ text1: 'Senha trocada com sucesso!' })
            navigation.navigate('SignIn')
        } else if (status === 404 || status === 503) {
            setAuthError('Não foi possível se conectar ao servidor!');
        } else if (status === 500) {
            setAuthError('Ocorreu um erro interno!');
        }
    };

    return (
        <View style={styles.container}>

            <Header
                containerStyle={styles.header_container}
                leftComponent={
                    <Icon
                    iconStyle={styles.header_icon}
                    underlayColor='white'
                    type='ionicon'
                    name='arrow-back'
                    size={30}
                    onPress={() => navigation.goBack()}
                    />
                }
                centerComponent={
                    <Text style={styles.header_title}>
                        Recuperar senha
                    </Text>
                }
            />

            <View style={styles.recover_container}>

                <StatusBar backgroundColor={styles.status_bar.backgroundColor} />

                <Controller
                name="userCode"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Input
                        {...field}
                        label="Código"
                        labelStyle={styles.textfield_title}
                        inputContainerStyle={{...styles.textfield,
                            borderColor: errors?.userCode && 'red'
                        }}
                        inputStyle={styles.input_text}
                        leftIconContainerStyle={styles.left_icon_container}
                        leftIcon={
                            <Icon
                                iconStyle={styles.icon}
                                type='material-community'
                                name='code-json'
                                size={18}
                            />
                        }
                        placeholder="Digite o código"
                        onChangeText={field.onChange}
                        renderErrorMessage={false}
                        errorMessage={errors.userCode?.message}
                    />
                )}/>

                {authError !== "" &&

                    <View style={{...styles.horizontal_container, marginTop: 10}}>
                        <Icon
                            iconStyle={styles.warning_icon}
                            type='font-awesome'
                            name='warning'
                            size={11}
                        />
                        <Text style={styles.auth_warning}>
                            {authError}
                        </Text>
                    </View>
                }

                <Divider
                    style={styles.divider}
                    inset={true} insetType="middle"
                    width={2}
                />

                <Button
                    buttonStyle={styles.login_button}
                    containerStyle={styles.login_button_container}
                    title="CONFIRMAR"
                    iconRight
                    onPress={handleSubmit(handleRecoverPasswordConfirmation)}
                />
            </View>
        </View>
    );
}