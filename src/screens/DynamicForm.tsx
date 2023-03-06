import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {ActivityIndicator, Button, Card, Text} from 'react-native-paper';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import simpleFormJson from 'src/data/simpleForm.json';

import FormBuilder, {TFormStructure} from 'src/components/form/FormBuilder';

export type TForm = {
  email: string;
  password: string;
  rememberMe: boolean;
  dob: Date | null;
};

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    dob: yup.mixed().required(),
  })
  .required();

const DynamicForm: React.FC = () => {
  const [formStructure, setFormStructure] = useState<TFormStructure[]>([]);
  const [loadingForm, setLoadingForm] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {isDirty, isValid},
  } = useForm<TForm>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const handleFetchSimpleForm = async () => {
    try {
      setLoadingForm(true);
      setTimeout(() => {
        setFormStructure(simpleFormJson.data as TFormStructure[]);
        setLoadingForm(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchSimpleForm();
  }, []);

  const onSubmit = (val: TForm) => console.log(val);

  return (
    <ScrollView style={{flex: 1}}>
      <Card style={{paddingHorizontal: 10, paddingVertical: 10}}>
        {loadingForm ? (
          <ActivityIndicator
            animating
            color="red"
            style={{
              marginBottom: 10,
            }}
          />
        ) : (
          <FormBuilder<TForm> control={control} structures={formStructure} />
        )}

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

export default DynamicForm;
