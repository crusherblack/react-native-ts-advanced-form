import React, {useState} from 'react';
import {
  useController,
  UseControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import {View} from 'react-native';
import {
  HelperText,
  TextInput as PaperTextInput,
  TextInputProps,
} from 'react-native-paper';

type TProps = {
  label: string;
  isPassword?: boolean;
};

const TextInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  mode = 'outlined',
  isPassword,
  ...rest
}: UseControllerProps<TFieldValues, TName> & TProps & TextInputProps) => {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(isPassword);

  const {
    field: {value, onBlur, onChange},
    fieldState: {error, invalid, isTouched},
  } = useController({
    name,
    control,
  });

  const toggleSecurePassword = () => setIsSecureTextEntry(prev => !prev);

  return (
    <View>
      <PaperTextInput
        label={label}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        mode={mode}
        {...rest}
        right={
          isPassword && (
            <PaperTextInput.Icon icon="eye" onPress={toggleSecurePassword} />
          )
        }
        secureTextEntry={isSecureTextEntry}
      />
      <HelperText type="error" visible={invalid && isTouched}>
        {error?.message}
      </HelperText>
    </View>
  );
};

export default TextInput;