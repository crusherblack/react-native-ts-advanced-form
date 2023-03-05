import React from 'react';
import {ScrollView} from 'react-native';
import {Button, Card} from 'react-native-paper';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import TextInput from 'src/components/form/TextInput';
import Switch from 'src/components/form/Switch';

type TForm = {
  email: string;
  password: string;
  rememberMe: boolean;
  date?: Date;
};

type TFormLoginStructur<T> = {
  id: number;
  name: T;
  type: 'text' | 'toggle' | 'date';
  label: string;
  variant?: string;
};

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  })
  .required();

const formStructure: TFormLoginStructur<keyof TForm>[] = [
  {
    id: 1,
    name: 'email',
    type: 'text',
    label: 'Email',
  },
  {
    id: 2,
    name: 'password',
    label: 'Password',
    type: 'text',
    variant: 'password',
  },
  {
    id: 3,
    name: 'rememberMe',
    label: 'Remember Me',
    type: 'toggle',
  },
];

const SimpleFormScreen: React.FC = () => {
  const {control, handleSubmit} = useForm<TForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = (val: TForm) => console.log(val);

  return (
    <ScrollView style={{flex: 1}}>
      <Card style={{paddingHorizontal: 10, paddingVertical: 10}}>
        {formStructure.map(({type, name, label, variant, id}) => {
          const isToggle = type === 'toggle';

          return isToggle ? (
            <Switch control={control} name="rememberMe" key={id} />
          ) : (
            <TextInput
              control={control}
              name={name}
              label={label}
              key={id}
              isPassword={variant === 'password'}
            />
          );
        })}

        <Button onPress={handleSubmit(onSubmit)} mode="contained">
          Login
        </Button>
      </Card>
    </ScrollView>
  );
};

export default SimpleFormScreen;
