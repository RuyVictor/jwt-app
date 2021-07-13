import React from 'react';
import { styles } from "./styles";
import { View, ScrollView } from 'react-native';
import { Icon, Text, Divider } from 'react-native-elements';
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
  userName: string;
  userEmail: string;
  userPwd: string;
  userPwdConfirmation: string;
}

const schema = yup.object().shape({
    userName: yup
    .string()
    .required("Por favor adicione seu nome!")
    .matches(/^[A-zÀ-ú\s]+$/, "Apenas caracteres alfabéticos!"),

    userEmail: yup
    .string()
    .email("Por favor adicione um email válido!")
    .required("Por favor adicione um email válido!"),

    userPwd: yup.string()
    .min(6, 'No mínimo 6 caracteres!')
    .required("Por favor adicione sua senha!"),

    userPwdConfirmation: yup
    .string()
    .test("passwords-match", "Senhas não conferem!", function (value) {
      return this.parent.userPwd === value;
    }),
});

export default function SignUp({navigation}) {

    const { signUp } = React.useContext(AuthContext);

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
    
    // ACTIONS

    const [showPassword, setShowPassword] = React.useState(false);

    function handleShowPassword() {
        setShowPassword(!showPassword);
    }


    const handleSignUp = async (data: IFormInputs) => {
        setAuthError('');
        console.log(data)
        const status = await signUp({
            user_name: data.userName,
            email: data.userEmail,
            password: data.userPwd
        })
        if (status === 201) {
            Toast.show({ text1: 'Cadastrado(a) com sucesso!', type: 'success'})
            navigation.navigate('SignIn')
        } else if (status === 404 || status === 503) {
          setAuthError("Não foi possível se conectar ao servidor!");
        } else if (status === 409) {
          setAuthError("Este usuário já está cadastrado!");
        }
    };

    return (
        <View style={styles.container}>

            <MainHeader
                iconLeft={{type: 'ionicon', name: 'arrow-back', onPress: () => navigation.goBack()}}
                headerTitle="Cadastrar"
            />

            <ScrollView contentContainerStyle={styles.signup_container}>

                <Controller
                name="userName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <MainInput
                        {...field}
                        label="Nome"
                        hasError={errors?.userName}
                        maxLength={20}
                        errorMessage={errors.userName?.message}
                        leftIcon={
                            <Icon
                                iconStyle={styles.icon}
                                name='user'
                                type='font-awesome'
                                size={18}
                            />
                        }
                        placeholder="Digite seu nome"
                        onChangeText={field.onChange}
                    />
                )}/>

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

                <Controller
                name="userPwd"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <MainInput
                        {...field}
                        label="Senha"
                        hasError={errors?.userPwd}
                        maxLength={20}
                        errorMessage={errors.userPwd?.message}
                        secureTextEntry={!showPassword}
                        leftIcon={
                            <Icon
                                iconStyle={styles.icon}
                                name='lock-closed-sharp'
                                type='ionicon'
                                size={18}
                            />
                        }

                        rightIcon={
                            <Icon
                            iconStyle={styles.icon}
                            type='ionicon'
                            size={20}
                            onPress={handleShowPassword}
                            name={showPassword ? 'eye' : 'eye-off'}/>
                        }
                        placeholder="Digite sua senha"
                        onChangeText={field.onChange}
                    />
                )}/>

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
                                name='lock-closed-sharp'
                                type='ionicon'
                                size={18}
                            />
                        }
                        placeholder="Redigite a mesma senha"
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
                    title="CADASTRAR"
                    icon={{
                        type: 'material',
                        name: 'arrow-forward-ios',
                        position: 'right',
                        size: 11
                    }}
                    onPress={handleSubmit(handleSignUp)}
                />
            </ScrollView>
        </View>
    );
}