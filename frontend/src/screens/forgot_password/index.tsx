import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { styles } from "./styles";
import { View } from 'react-native';
import { Header, Card, Icon, Button, Text, Input, Divider } from 'react-native-elements'

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

    const { forgotPassword } = React.useContext(AuthContext);

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
        const status = await forgotPassword(data.userEmail)
        if (status === 201) {
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

                {authError !== "" &&

                    <View style={
                        {...styles.horizontal_container,
                            marginTop: 10,
                            justifyContent: 'center'
                        }
                        }>
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
                    title="RECUPERAR  "
                    icon={
                        <Icon
                        iconStyle={styles.arrow_icon}
                        type="octicon"
                        name='reply'
                        size={11}
                        />
                    }
                    iconRight
                    onPress={handleSubmit(handleRecoverPassword)}
                />
            </View>
        </View>
    );
}