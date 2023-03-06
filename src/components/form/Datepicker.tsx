import React, {useState} from 'react';
import {
  useController,
  UseControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import {TouchableOpacity, View} from 'react-native';
import {
  HelperText,
  TextInput as PaperTextInput,
  TextInputProps,
} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import {format} from 'date-fns';

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
      <TouchableOpacity onPress={setModalOpen}>
        <PaperTextInput
          label={label}
          value={isDateChoose ? format(value, 'dd/MM/yyyy') : 'DD/MM/YYYY'}
          mode={mode}
          right={<PaperTextInput.Icon icon="calendar-range" />}
          error={invalid}
          editable={false}
          {...rest}
        />
      </TouchableOpacity>
      <HelperText type="error" visible={invalid}>
        {error?.message}
      </HelperText>
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
