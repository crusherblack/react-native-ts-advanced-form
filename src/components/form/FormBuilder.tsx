import React from 'react';

import TextInput from 'src/components/form/TextInput';
import Switch from 'src/components/form/Switch';
import {Control, FieldValues, Path} from 'react-hook-form';
import Datepicker from 'src/components/form/Datepicker';

export type TFormStructure = {
  id: number;
  name: any; //masih belum fix
  type: 'text' | 'toggle' | 'date';
  label: string;
  variant?: string;
};

type TProps<T extends FieldValues> = {
  structures: TFormStructure[];
  control: Control<T, any>;
};

const FormBuilder = <T extends FieldValues>({
  structures,
  control,
}: TProps<T>) => {
  return (
    <>
      {structures.map(({type, name, label, variant, id}) => {
        const isToggle = type === 'toggle';
        const isDate = type === 'date';

        const sharedProps = {
          name,
          key: id,
          control,
          label,
        };

        return isToggle ? (
          <Switch {...sharedProps} />
        ) : isDate ? (
          <Datepicker {...sharedProps} />
        ) : (
          <TextInput {...sharedProps} isPassword={variant === 'password'} />
        );
      })}
    </>
  );
};

export default FormBuilder;
