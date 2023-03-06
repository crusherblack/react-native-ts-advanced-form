import React from 'react';
import {View} from 'react-native';

import {Switch as PaperSwitch, SwitchProps} from 'react-native-paper';
import {
  useController,
  UseControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

import Text from 'src/components/Text';

type TProps = {
  label: string;
};

const Switch = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
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
      <Text
        style={{
          marginBottom: 5,
        }}>
        {label}
      </Text>
      <PaperSwitch
        onChange={e => onChange(e.nativeEvent.value)}
        value={value}
        style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
        {...rest}
      />
    </View>
  );
};

export default Switch;
