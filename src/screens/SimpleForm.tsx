import React from 'react';
import {ScrollView} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import FormBuilder, {TFormStructure} from 'src/components/form/FormBuilder';

export type TForm = {
  email: string;
  password: string;
  rememberMe: boolean;
  dob: Date | null;
};

export type TSimpleFormStructure = TFormStructure[];

const formStructure: TSimpleFormStructure = [
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
    name: 'dob',
    label: 'Date of Birth',
    type: 'date',
  },
  {
    id: 4,
    name: 'rememberMe',
    label: 'Remember Me',
    type: 'toggle',
  },
];

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    dob: yup.mixed().required(),
  })
  .required();

const SimpleFormScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: {isDirty, isValid},
  } = useForm<TForm>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
      dob: null,
    },
  });

  const onSubmit = (val: TForm) => console.log(val);

  return (
    <ScrollView style={{flex: 1}}>
      <Card style={{paddingHorizontal: 10, paddingVertical: 10}}>
        <FormBuilder<TForm> control={control} structures={formStructure} />

        <Button
          onPress={handleSubmit(onSubmit)}
          mode="contained"
          disabled={!(isValid && isDirty)}>
          Login
        </Button>
      </Card>
    </ScrollView>
  );
};

export default SimpleFormScreen;
