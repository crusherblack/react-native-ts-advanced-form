import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

import {
  useController,
  UseControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import {
  HelperText,
  TextInput as PaperTextInput,
  TextInputProps,
} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import {format} from 'date-fns';

import Text from 'src/components/Text';

type TProps = {
  label: string;
};

const Datepicker = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  mode = 'outlined',
  ...rest
}: UseControllerProps<TFieldValues, TName> & TProps & TextInputProps) => {
  const [open, setOpen] = useState(false);
  const [isDateChoose, setIsDateChoose] = useState(false);

  const {
    field: {value, onBlur, onChange},
    fieldState: {error, invalid},
  } = useController({
    name,
    control,
  });

  const setModalOpen = () => setOpen(true);
  const setModalClose = () => {
    setOpen(false);
    onBlur();
  };
  const setConfirm = (date: Date) => {
    setModalClose();
    onChange(date);
    setIsDateChoose(true);
  };

  return (
    <View>
      <Text>{label}</Text>
      <TouchableOpacity onPress={setModalOpen}>
        <PaperTextInput
          value={isDateChoose ? format(value, 'dd/MM/yyyy') : 'DD/MM/YYYY'}
          mode={mode}
          right={<PaperTextInput.Icon icon="calendar-range" />}
          error={invalid}
          editable={false}
          {...rest}
        />
      </TouchableOpacity>
      {invalid ? (
        <HelperText type="error" visible={invalid}>
          {error?.message}
        </HelperText>
      ) : (
        <View style={{marginBottom: 10}} />
      )}
      <DatePicker
        modal
        open={open}
        date={value || new Date()}
        onConfirm={setConfirm}
        onCancel={setModalClose}
      />
    </View>
  );
};

export default Datepicker;
