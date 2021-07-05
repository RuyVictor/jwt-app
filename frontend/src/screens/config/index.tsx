import React from 'react';
import { styles } from "./styles";
import { View } from 'react-native';
import { Icon, Overlay, Button, Text, Divider } from 'react-native-elements';
import MainHeader from '../../components/main_header';

// Contexts
import AuthContext from '../../contexts/AuthContext';

export default function Config({ navigation }) {

    const { signOut } = React.useContext(AuthContext);

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
                iconLeft={{type: 'ionicon', name: 'arrow-back', onPress: () => navigation.goBack()}}
                headerTitle="Configurações"
            />

            <View style={styles.container}>

                <View style={{width: '90%'}}>

                    <Button
                        buttonStyle={styles.option_button}
                        containerStyle={styles.option_button_container}
                        title="PERFIL"
                        onPress={() => undefined}
                    />

                    <Button
                        buttonStyle={styles.option_button}
                        containerStyle={styles.option_button_container}
                        title="CONFIGURAÇÕES DO APLICATIVO"
                        onPress={() => undefined}
                    />

                    <Button
                        buttonStyle={styles.option_button}
                        containerStyle={styles.option_button_container}
                        title="SOBRE"
                        onPress={() => undefined}
                    />

                    <Button
                        buttonStyle={styles.option_button}
                        containerStyle={styles.option_button_container}
                        title="SUPORTE"
                        onPress={() => undefined}
                    />
                </View>

                <Text style={styles.version_label}>
                    Versão do aplicativo: 1.0.0
                </Text>

                <View>
                    <Text style={styles.logout_label}>
                        Sair do aplicativo
                    </Text>

                    <Divider
                        style={styles.divider}
                        inset={true} insetType="middle"
                        width={2}
                    />

                    <Button
                        buttonStyle={styles.logout_button}
                        containerStyle={styles.logout_button_container}
                        title="SAIR  "
                        icon={
                            <Icon
                            iconStyle={styles.logout_button_icon}
                            type='material-community'
                            name='logout-variant'
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
                overlayStyle={styles.modal_container}>

                    <Text style={styles.modal_title}>
                        Sair da conta
                    </Text>

                    <Text style={styles.modal_label}>
                        Tem certeza que deseja sair da conta?
                    </Text>
                    
                    <View style={{...styles.horizontal_container, marginTop: 10}}>
                        <Button
                            buttonStyle={{...styles.modal_logout_button, backgroundColor: '#4AA96C'}}
                            containerStyle={styles.modal_logout_button_container}
                            title="SIM"
                            onPress={handleLogout}
                        />

                        <Button
                            buttonStyle={{...styles.modal_logout_button, backgroundColor: '#ff1925'}}
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