import React from 'react';
import {View} from 'react-native';
import {Switch as PaperSwitch, SwitchProps} from 'react-native-paper';
import {
  useController,
  UseControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

type TProps = {
  isPassword?: boolean;
};

const Switch = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  isPassword,
  ...rest
}: UseControllerProps<TFieldValues, TName> & TProps & SwitchProps) => {
  const {
    field: {value, onChange},
  } = useController({
    name,
    control,
  });

  return (
    <View
      style={{
        marginTop: -5,
        marginBottom: 10,
        alignItems: 'flex-start',
      }}>
      <PaperSwitch
        onChange={e => onChange(e.nativeEvent.value)}
        value={value}
        {...rest}
      />
    </View>
  );
};

export default Switch;
