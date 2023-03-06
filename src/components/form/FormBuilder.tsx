import React from 'react';
import {View} from 'react-native';

import {Control, FieldValues} from 'react-hook-form';

import TextInput from 'src/components/form/TextInput';
import Switch from 'src/components/form/Switch';
import Datepicker from 'src/components/form/Datepicker';

export type TFormStructure = {
  name: any; // bad typing - will refactor it again later
  type: 'text' | 'toggle' | 'date';
  label: string;
  placeholder?: string;
  variant?: 'password' | 'number' | 'text';
  children?: TFormStructure[];
};

type TProps<T extends FieldValues> = {
  structures: TFormStructure[];
  control: Control<T, any>;
  isChildren?: boolean;
};

const FormBuilder = <T extends FieldValues>({
  structures,
  control,
  isChildren = false,
}: TProps<T>) => {
  return (
    <View
      style={
        isChildren
          ? {
              paddingLeft: 20,
            }
          : {}
      }>
      {structures.map(({type, name, label, variant, placeholder, children}) => {
        const isToggle = type === 'toggle';
        const isDate = type === 'date';

        const sharedProps = {
          name,
          key: name,
          control,
          label,
          placeholder,
        };

        return (
          <>
            {isToggle ? (
              <Switch {...sharedProps} />
            ) : isDate ? (
              <Datepicker {...sharedProps} />
            ) : (
              <TextInput {...sharedProps} variant={variant} />
            )}
            {children && (
              <FormBuilder<any>
                control={control}
                structures={children}
                isChildren
                key={'FormBuilder-' + sharedProps.key}
              />
            )}
          </>
        );
      })}
    </View>
  );
};

export default FormBuilder;
