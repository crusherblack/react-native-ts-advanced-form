import React from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Card, IconButton} from 'react-native-paper';
import {useFieldArray, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import TextInput from 'src/components/form/TextInput';
import Switch from 'src/components/form/Switch';
import Datepicker from 'src/components/form/Datepicker';
import Text from 'src/components/Text';

export type TForm = {
  email: string;
  password: string;
  rememberMe: boolean;
  dob: Date | null;
  experiences: {
    title: string;
    duration: number;
  }[];
};

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    dob: yup.mixed().required(),
    experiences: yup.array().of(
      yup.object().shape({
        title: yup.string().required('Title is required'),
        duration: yup.string().required('Duration is required'),
      }),
    ),
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
  });

  const {fields, append, prepend, remove, swap, move, insert} = useFieldArray({
    control,
    name: 'experiences',
  });

  const onSubmit = (val: TForm) => console.log(val);

  const handleAppendExperience = () => {
    append({
      title: '',
      duration: 0,
    });
  };

  const handleRemoveExperience = (index: number) => {
    remove(index);
  };

  return (
    <ScrollView style={{flex: 1}}>
      <Card style={{paddingHorizontal: 10, paddingVertical: 10}}>
        <TextInput
          control={control}
          name="email"
          label="Email"
          placeholder="Input Your Email"
        />
        <TextInput
          control={control}
          name="password"
          label="Password"
          placeholder="Input Your Password"
          variant="password"
        />
        <Datepicker control={control} name="dob" label="Date Of Birth" />

        <Switch control={control} name="rememberMe" label="Remember Me" />

        {fields.map((field, index) => (
          <View
            key={field.id}
            style={{
              justifyContent: 'space-between',
              position: 'relative',
              borderWidth: 1,
              borderColor: 'thistle',
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 10,
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                marginBottom: 10,
              }}>
              Experiences {index + 1}
            </Text>

            <TextInput
              control={control}
              name={`experiences.${index}.title`}
              label=" Title"
              placeholder="Input Your Experience"
              style={{
                width: '100%',
              }}
            />

            <TextInput
              control={control}
              name={`experiences.${index}.duration`}
              label="Year of Experience"
              placeholder="Year of Experience"
              variant="number"
              style={{
                width: '100%',
              }}
            />

            <IconButton
              icon="delete"
              iconColor="red"
              size={25}
              onPress={() => handleRemoveExperience(index)}
              style={{
                position: 'absolute',
                top: -5,
                right: -10,
              }}
            />
          </View>
        ))}

        <Button
          onPress={handleAppendExperience}
          mode="outlined"
          style={{
            marginTop: 20,
            marginBottom: 10,
          }}>
          Add Experience
        </Button>

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
