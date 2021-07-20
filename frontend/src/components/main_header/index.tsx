import React from 'react';
import { styles } from './styles';
import { Header, Icon, Text, HeaderProps } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

interface CustomHeaderProps extends HeaderProps {
    headerTitle: string;
    headerTitleSize?: number;
    iconLeft?: { type: string; name: string; onPress: Function };
    iconRight?: { type: string; name: string; onPress: Function };
}

const MainHeader: React.FC<CustomHeaderProps> = ({
    iconLeft,
    iconRight,
    headerTitle,
    headerTitleSize,
    ...rest
}) => {
    return (
        <>
            <Header
                {...rest}
                containerStyle={styles.header_container}
                centerContainerStyle={{ flex: 4, alignSelf: 'center' }}
                leftComponent={
                    iconLeft && (
                        <Icon
                            iconStyle={styles.header_icon}
                            underlayColor="white"
                            type={iconLeft.type}
                            name={iconLeft.name}
                            size={30}
                            onPress={() => iconLeft.onPress()}
                        />
                    )
                }
                centerComponent={{
                    text: headerTitle,
                    style: { ...styles.header_title, fontSize: headerTitleSize ?? 24 },
                }}
                rightComponent={
                    iconRight && (
                        <Icon
                            iconStyle={styles.header_icon}
                            underlayColor="white"
                            type={iconRight.type}
                            name={iconRight.name}
                            size={28}
                            onPress={() => iconRight.onPress()}
                        />
                    )
                }
            />

            <StatusBar backgroundColor={styles.status_bar.backgroundColor} />
        </>
    );
};

export default MainHeader;
