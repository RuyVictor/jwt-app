import React from 'react';
import { styles } from './styles';
import { Icon, Button, ButtonProps } from 'react-native-elements';

interface CustomButtonProps extends ButtonProps {
    icon?: { type?: string; name: string; size: number; position: 'right' | 'left' };
}

const SecundaryButton: React.FC<CustomButtonProps> = ({ icon, ...rest }) => (
    <Button
        {...rest}
        buttonStyle={styles.button}
        containerStyle={styles.button_container}
        titleStyle={styles.button_title}
        icon={icon && <Icon iconStyle={styles.icon} name={icon.name} size={icon.size} />}
        iconPosition={icon && icon.position}
    />
);

export default SecundaryButton;
