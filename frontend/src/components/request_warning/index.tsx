import React from 'react';
import { styles } from "./styles";
import { View } from 'react-native';
import { Text, Icon } from 'react-native-elements';

interface CustomWarningProps {
    warning: string;
}

const RequestWarning: React.FC<CustomWarningProps> = ({warning}) => (
    <View style={styles.horizontal_container}
    >
        <Icon
            iconStyle={styles.warning_icon}
            type='font-awesome'
            name='warning'
            size={11}
        />
        <Text style={styles.warning_text}>
            {warning}
        </Text>
    </View>
)

export default RequestWarning;