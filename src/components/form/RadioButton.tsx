import React, {useState} from 'react';
import {View} from 'react-native';

import {RadioButton as PaperRadioButton} from 'react-native-paper';

const RadioButton = () => {
  const [checked, setChecked] = useState('first');

  return (
    <View>
      <PaperRadioButton
        value="first"
        status={checked === 'first' ? 'checked' : 'unchecked'}
        onPress={() => setChecked('first')}
      />
      <PaperRadioButton
        value="second"
        status={checked === 'second' ? 'checked' : 'unchecked'}
        onPress={() => setChecked('second')}
      />
    </View>
  );
};

export default RadioButton;
