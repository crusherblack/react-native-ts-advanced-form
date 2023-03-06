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

import Text from 'src/components/Text';

type TProps = {
  label: string;
  placeholder?: string;
  variant?: 'password' | 'number' | 'text';
};

const TextInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  mode = 'outlined',
  variant = 'text',
  placeholder,
  ...rest
}: UseControllerProps<TFieldValues, TName> & TProps & TextInputProps) => {
  const isPassword = variant === 'password';
  const isNumber = variant === 'number';
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(isPassword);

  const {
    field: {value, onBlur, onChange},
    fieldState: {error, invalid},
  } = useController({
    name,
    control,
  });

  const toggleSecurePassword = () => setIsSecureTextEntry(prev => !prev);

  return (
    <View>
      <Text>{label}</Text>
      <PaperTextInput
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        mode={mode}
        right={
          isPassword && (
            <PaperTextInput.Icon icon="eye" onPress={toggleSecurePassword} />
          )
        }
        secureTextEntry={isSecureTextEntry}
        error={invalid}
        placeholder={placeholder}
        placeholderTextColor="lightgray"
        keyboardType={isNumber ? 'numeric' : undefined}
        {...rest}
      />
      {invalid ? (
        <HelperText type="error" visible={invalid}>
          {error?.message}
        </HelperText>
      ) : (
        <View style={{marginBottom: 10}} />
      )}
    </View>
  );
};

export default TextInput;
