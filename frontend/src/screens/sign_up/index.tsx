import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { styles } from "./styles";
import { View, ScrollView } from 'react-native';
import { Header, Icon, Button, Text, Input, Divider } from 'react-native-elements'
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

    userPwd: yup.string().required("Por favor adicione sua senha!"),

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
            Toast.show({ text1: 'Cadastrado com sucesso!' })
            navigation.navigate('SignIn')
        } else if (status === 404 || status === 503) {
          setAuthError("Não foi possível se conectar ao servidor!");
        } else if (status === 409) {
          setAuthError("Este usuário já está cadastrado!");
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
                        Cadastrar
                    </Text>
                }
            />

            <ScrollView contentContainerStyle={styles.signup_container}>

            <StatusBar backgroundColor={styles.status_bar.backgroundColor} />
                <Controller
                name="userName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Input
                        {...field}
                        label="Nome"
                        labelStyle={styles.textfield_title}
                        inputContainerStyle={{...styles.textfield,
                            borderColor: errors?.userName && 'red'
                        }}
                        inputStyle={styles.input_text}
                        leftIconContainerStyle={styles.left_icon_container}
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
                        renderErrorMessage={false}
                        errorMessage={errors.userName?.message}
                    />
                )}/>

                <Controller
                name="userEmail"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Input
                        {...field}
                        label="Email"
                        labelStyle={styles.textfield_title}
                        inputContainerStyle={{...styles.textfield,
                            borderColor: errors?.userEmail && 'red'
                        }}
                        inputStyle={styles.input_text}
                        leftIconContainerStyle={styles.left_icon_container}
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
                        renderErrorMessage={false}
                        errorMessage={errors.userEmail?.message}
                    />
                )}/>

                <Controller
                name="userPwd"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Input
                        {...field}
                        label="Senha"
                        labelStyle={styles.textfield_title}
                        inputContainerStyle={{...styles.textfield,
                            borderColor: errors?.userPwd && 'red'
                        }}
                        inputStyle={styles.input_text}
                        leftIconContainerStyle={styles.left_icon_container}
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
                        renderErrorMessage={false}
                        errorMessage={errors.userPwd?.message}
                    />
                )}/>

                <Controller
                name="userPwdConfirmation"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Input
                        {...field}
                        label="Confirmar senha"
                        labelStyle={styles.textfield_title}
                        inputContainerStyle={{...styles.textfield,
                            borderColor: errors?.userPwdConfirmation && 'red'
                        }}
                        inputStyle={styles.input_text}
                        leftIconContainerStyle={styles.left_icon_container}
                        secureTextEntry={true}
                        leftIcon={
                            <Icon
                                iconStyle={styles.icon}
                                name='lock-closed-sharp'
                                type='ionicon'
                                size={18}
                            />
                        }
                        placeholder="Digite a mesma senha"
                        onChangeText={field.onChange}
                        renderErrorMessage={false}
                        errorMessage={errors.userPwdConfirmation?.message}
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
                    title="CADASTRAR  "
                    icon={
                        <Icon
                        iconStyle={styles.arrow_icon}
                        type='material'
                        name='arrow-forward-ios'
                        size={11}
                        />
                    }
                    iconRight
                    onPress={handleSubmit(handleSignUp)}
                />
            </ScrollView>
        </View>
    );
}