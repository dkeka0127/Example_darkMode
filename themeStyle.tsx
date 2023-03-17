import {DefaultTheme, type Theme} from '@react-navigation/native';
import {ImageSourcePropType} from 'react-native';
import {Source} from 'react-native-fast-image';

interface ExtendedTheme extends Theme {
  theme: string;
  colors: Theme['colors'] & {
    primary: string;
  };
  loginScreen: {
    loginImage: ImageSourcePropType;
    waveImage: ImageSourcePropType;
  };
  mypageScreen: {
    infoImg: ImageSourcePropType | number;
    settingImg: ImageSourcePropType;
  };
  accessPermissionPopup: {
    pointBGColor: string;
    BGColor: string;
  };
}

export const lightTheme: ExtendedTheme = {
  ...DefaultTheme,
  theme: 'light',
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
    text: '#222222',
  },
  loginScreen: {
    loginImage: require('assets/images/img/img_mylogin.png'),
    waveImage: require('assets/images/img/img_mylogin_wave.png'),
  },
  mypageScreen: {
    infoImg: require('assets/images/icons/ic_myinfo.png'),
    settingImg: require('assets/images/button/btn_setting_learn.png'),
  },
  accessPermissionPopup: {
    pointBGColor: '#f6f7f9',
    BGColor: '#fff',
  },
};

export const darkTheme: ExtendedTheme = {
  ...DefaultTheme,
  theme: 'dark',
  colors: {
    ...DefaultTheme.colors,
    background: '#111111',
    text: '#ffffff',
  },
  loginScreen: {
    loginImage: require('assets/images/img/img_mylogin_dark.png'),
    waveImage: require('assets/images/img/img_mylogin_wave_dark.png'),
  },
  mypageScreen: {
    infoImg: require('assets/images/icons/ic_myinfo_dark.png'),
    settingImg: require('assets/images/button/btn_setting_learn_white.png'),
  },
  accessPermissionPopup: {
    pointBGColor: '#333',
    BGColor: '#555',
  },
};

declare module '@react-navigation/native' {
  export function useTheme(): ExtendedTheme;
}

export const darkModeStyle = {};
