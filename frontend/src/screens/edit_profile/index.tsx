import React from 'react';
import { styles } from "./styles";
import { View, ScrollView, Platform } from 'react-native';
import { Avatar, Icon, Divider } from 'react-native-elements';

import * as ImagePicker from 'expo-image-picker';

// CUSTOM COMPONENTS
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
}

const schema = yup.object().shape({
    userName: yup
    .string()
    .required("Por favor adicione seu nome!")
    .matches(/^[A-zÀ-ú\s]+$/, "Apenas caracteres alfabéticos!"),
});

export default function EditProfile({navigation}) {

    const { updateUser, getUserData, reloadUserData } = React.useContext(AuthContext);

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

    const handleUpdateUser = async (data: IFormInputs) => {
        setAuthError('');
        console.log(data)
        const status = await updateUser({
            user_name: data.userName
        })
        if (status === 200) {
            Toast.show({ text1: 'Dados atualizados com sucesso!', type: 'success'})
            //Após a atualização dos dados, atualizar em tela via api call.
            await reloadUserData();
            navigation.navigate('Profile')
        } else if (status === 404 || status === 503) {
          setAuthError("Não foi possível se conectar ao servidor!");
        }
    };

    const [currentAvatarImage, setCurrentAvatarImage] = React.useState<string>(getUserData.user?.avatar);

    React.useEffect(() => {
        (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setCurrentAvatarImage(result.uri);
        }
    };

    return (
        <View style={styles.container}>

            <MainHeader
                iconLeft={{type: 'ionicon', name: 'arrow-back', onPress: () => navigation.goBack()}}
                headerTitle="Editar perfil"
            />

            <Avatar
                containerStyle={styles.avatar_container}
                rounded
                size={70}
                source={{uri: currentAvatarImage}}
                onPress={pickImage}
            >
                <Avatar.Accessory
                name="edit"
                size={20}
                style={styles.avatar_icon_container}
                iconStyle={styles.avatar_icon} />
            </Avatar>

            <View style={styles.edit_container}>

                <Controller
                name="userName"
                control={control}
                defaultValue={getUserData.user?.user_name}
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

                {authError !== "" && <RequestWarning warning={authError} />}

                <Divider
                    style={styles.divider}
                    inset={true} insetType="middle"
                    width={1}
                />

                <MainButton
                    title="ATUALIZAR DADOS"
                    icon={{
                        type: 'material',
                        name: 'arrow-forward-ios',
                        position: 'right',
                        size: 11
                    }}
                    onPress={handleSubmit(handleUpdateUser)}
                />
            </View>
        </View>
    );
}