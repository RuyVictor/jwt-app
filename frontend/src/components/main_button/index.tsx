import React from 'react';
import { styles } from './styles';
import { Icon, Button, ButtonProps } from 'react-native-elements';

interface CustomButtonProps extends ButtonProps {
    icon?: { type?: string; name: string; size: number; position: 'right' | 'left' };
}

const marginBetweenTitleAndIcon = 10;

const positionTranslator: { [key: string]: object } = {
    right: { ...styles.icon, marginLeft: marginBetweenTitleAndIcon },
    left: { ...styles.icon, marginRight: marginBetweenTitleAndIcon },
};

const MainButton: React.FC<CustomButtonProps> = ({ icon, ...rest }) => (
    <Button
        {...rest}
        buttonStyle={styles.button}
        containerStyle={styles.button_container}
        icon={
            icon && (
                <Icon
                    iconStyle={positionTranslator[icon.position]}
                    name={icon.name}
                    size={icon.size}
                />
            )
        }
        iconPosition={icon && icon.position}
    />
);

export default MainButton;
