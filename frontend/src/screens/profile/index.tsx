import React from 'react';
import { styles } from './styles';
import { View } from 'react-native';
import { Avatar, Icon, Overlay, Button, Text, Divider } from 'react-native-elements';
import SecundaryButton from '../../components/secundary_button';
import MainHeader from '../../components/main_header';

// Contexts
import AuthContext from '../../contexts/AuthContext';

export default function Profile({ navigation }) {
    const { signOut, getUserData } = React.useContext(AuthContext);

    const [visible, setVisible] = React.useState(false);

    const handleLogout = () => {
        setVisible(!visible);
        signOut();
    };

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    return (
        <>
            <MainHeader
                iconLeft={{
                    type: 'ionicon',
                    name: 'arrow-back',
                    onPress: () => navigation.goBack(),
                }}
                headerTitle="Perfil"
            />

            <View style={styles.container}>
                <View style={{ width: '90%' }}>
                    <View style={{ ...styles.horizontal_container }}>
                        <View style={styles.horizontal_container}>
                            <Avatar
                                containerStyle={styles.avatar_container}
                                rounded
                                size={70}
                                source={{
                                    uri: getUserData.user?.avatar,
                                }}
                            />

                            <View style={styles.user_information_container}>
                                <Text style={styles.profile_user_title}>
                                    {getUserData.user?.user_name}
                                </Text>

                                <Text style={styles.profile_user_description}>
                                    {getUserData.user?.email /*Description...*/}
                                </Text>
                            </View>
                        </View>

                        <Icon
                            underlayColor="white"
                            type="feather"
                            name="edit"
                            size={27}
                            onPress={() => navigation.navigate('EditProfile')}
                        />
                    </View>

                    <Divider style={{ marginVertical: 13 }} />

                    <SecundaryButton
                        title="Mensagens"
                        icon={{
                            name: 'arrow-forward-ios',
                            size: 23,
                            position: 'right',
                        }}
                        onPress={() => undefined}
                    />

                    <SecundaryButton
                        title="Informações de contato"
                        icon={{
                            name: 'arrow-forward-ios',
                            size: 23,
                            position: 'right',
                        }}
                        onPress={() => navigation.navigate('EditContactInformation')}
                    />

                    <SecundaryButton
                        title="Trocar minha senha"
                        icon={{
                            name: 'arrow-forward-ios',
                            size: 23,
                            position: 'right',
                        }}
                        onPress={() => navigation.navigate('ChangePassword')}
                    />

                    <SecundaryButton
                        title="Configurações"
                        icon={{
                            name: 'arrow-forward-ios',
                            size: 23,
                            position: 'right',
                        }}
                        onPress={() => undefined}
                    />

                    <SecundaryButton
                        title="Suporte"
                        icon={{
                            name: 'arrow-forward-ios',
                            size: 23,
                            position: 'right',
                        }}
                        onPress={() => undefined}
                    />
                </View>

                <View>
                    <Text style={styles.logout_label}>Sair do aplicativo</Text>

                    <Divider style={styles.divider} inset={true} insetType="middle" width={1} />

                    <Button
                        buttonStyle={styles.logout_button}
                        containerStyle={styles.logout_button_container}
                        title="SAIR  "
                        icon={
                            <Icon
                                iconStyle={styles.logout_button_icon}
                                type="material-community"
                                name="logout-variant"
                                size={18}
                            />
                        }
                        iconRight
                        onPress={toggleOverlay}
                    />
                </View>

                <Overlay
                    isVisible={visible}
                    onBackdropPress={toggleOverlay}
                    overlayStyle={styles.modal_container}
                >
                    <Text style={styles.modal_title}>Sair da conta</Text>

                    <Text style={styles.modal_label}>Tem certeza que deseja sair da conta?</Text>

                    <View style={{ ...styles.horizontal_container, marginTop: 10 }}>
                        <Button
                            buttonStyle={{
                                ...styles.modal_logout_button,
                                backgroundColor: '#4AA96C',
                            }}
                            containerStyle={styles.modal_logout_button_container}
                            title="SIM"
                            onPress={handleLogout}
                        />

                        <Button
                            buttonStyle={{
                                ...styles.modal_logout_button,
                                backgroundColor: '#ff1925',
                            }}
                            containerStyle={styles.modal_logout_button_container}
                            title="CANCELAR"
                            onPress={toggleOverlay}
                        />
                    </View>
                </Overlay>
            </View>
        </>
    );
}
