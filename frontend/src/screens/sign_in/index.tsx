import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { styles } from "./styles";
import { View, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Icon, Button, Text, Input, Divider } from 'react-native-elements'

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Contexts
import AuthContext from '../../contexts/AuthContext';

interface IFormInputs {
  userEmail: string,
  userPwd: string
}

const schema = yup.object().shape({
  userEmail: yup
    .string()
    .email("Por favor adicione um email válido!")
    .required("Por favor adicione um email válido!"),
  userPwd: yup.string().required("Por favor adicione sua senha!"),
});

export default function SignIn({navigation}) {


    const { signIn } = React.useContext(AuthContext);

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

    const handleSignIn = async (data: IFormInputs) => {
        setAuthError('');
        console.log(data)
        const status = await signIn({email: data.userEmail, password: data.userPwd})
        if (status === 404 || status === 503) {
            setAuthError('Não foi possível se conectar ao servidor!');
        } else if (status === 401) {
            setAuthError('Usuário ou senha inválida!');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

                <KeyboardAvoidingView
                behavior="height"
                keyboardVerticalOffset={-70}
                >

                <View style={styles.signin_container}>

                <Text style={styles.title}>
                    JWT App
                </Text>

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
                        title="ENTRAR  "
                        icon={
                            <Icon
                            iconStyle={styles.arrow_icon}
                            name='arrow-forward-ios'
                            size={11}
                            />
                        }
                        iconRight
                        onPress={handleSubmit(handleSignIn)}
                    />

                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text
                            style={{...styles.link, marginTop: 10}}
                        >
                            Esqueceu a senha?
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <View style={{...styles.horizontal_container, marginTop: 10}}>
                            <Text
                            style={styles.link}
                            >
                                Não possui uma conta?
                            </Text>

                            <Text
                            style={styles.link_bold}
                            >
                                Cadastre-se
                            </Text>
                        </View>
                    </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
        </View>
    );
}