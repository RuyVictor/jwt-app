import React from 'react';
import { FieldError } from "react-hook-form";
import { styles } from "./styles";
import { Input, InputProps } from 'react-native-elements';

interface CustomInputProps extends InputProps {
    hasError: FieldError | undefined;
}

const MainInput: React.FC<CustomInputProps> = React.forwardRef(({hasError, ...rest}, ref) =>
    <Input
        {...rest}
        ref={ref}
        labelStyle={styles.textfield_title}
        inputContainerStyle={{...styles.textfield, borderColor: hasError && 'red'}}
        inputStyle={styles.input_text}
        leftIconContainerStyle={styles.left_icon_container}
        renderErrorMessage={false}
    />
)

export default MainInput;