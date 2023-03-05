import React, {useState} from 'react';
import {Checkbox as PaperCheckbox} from 'react-native-paper';

const Checkbox = () => {
  const [checked, setChecked] = useState(false);

  return (
    <PaperCheckbox
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked(!checked);
      }}
    />
  );
};

export default Checkbox;
