import React from 'react';
import {View} from 'react-native';

const Usage = () => {
  const {theme, colors} = useTheme();

  return (
    <View style={{backgroundColor: colors.background}}>  // How to Use
      {/* ... */}
    </View>
  );
};

export default Usage;
