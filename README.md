# How to Setting DarkMode ?
> [다크모드] 도입을 위한 코드입니다.

## 🛠️ 기술 스택
- JavaScript
- React Native 
- TypeScript
- ESLint / Prettier

## 📃 Code

• App.tsx
``` javascript
function App() {
  const themeType = useColorScheme(); // [light/dark] 디바이스 설정값
  const {isTheme, isThemeF} = useSettingTheme(); // zustand 사용하여 값 저장

  const setThemeValue = async () => {
    try {
      // ① 기존 디바이스 내에 저장된 라이트/다크/시스템 설정값 불러옴
      const theme = await AsyncStorage.getItem('Theme'); 

      // ②-1 기존에 진입 내역 없음 (null) || 시스템모드일 경우 [테마 > 시스템 모드]로 설정
      if (theme === null || theme === 'system') {
        isThemeF(themeType);
        AsyncStorage.setItem('Theme', 'system');
      }
      // ②-2 기존에 진입 내역 존재 (light/dark/system) 일 경우 [테마 > '기존 선택' 모드]로 설정
      else {
        isThemeF(theme);
        AsyncStorage.setItem('Theme', theme);
      }
    } catch (e) {}
  };

  useEffect(() => {
    setThemeValue();
  }, [isTheme, isThemeF, themeType]);

  return (
    <NavigationContainer
      theme={isTheme === 'light' ? lightTheme : darkTheme}>
        <RootStackNavigator />
      </NavigationContainer>
  );
}

export default App;
```


• useSettingTheme.tsx [zustand 설정 화면]
``` javascript
import create from 'zustand';

interface SettingThemeState {
  isTheme: string;
  isThemeF: (isTheme: string) => void;
}

const useSettingTheme = create<SettingThemeState>()((set) => ({
  isTheme: 'light',

  isThemeF(isTheme) {
    set(() => ({isTheme: isTheme}));
  },
}));

export default useSettingTheme;
```


• ThemeSettingsScreen.tsx [테마 설정 화면]
``` javascript
function ThemeSettingsScreen() {
  const themeType = useColorScheme();
  const {isTheme, isThemeF} = useSettingTheme(); // zustand로 저장된 테마
  const [themeTypes, setThemeType] = useState(isTheme); // 화면에 노출되는 테마 변수

  // ①-2 AsyncStorage에 저장된 [light/dark/system] 중 이전 설정값 저장
  const setThemeValue = async () => {
    try {
      const theme = await AsyncStorage.getItem('Theme');
      setThemeType(theme);
    } catch (e) {}
  };

  useEffect(() => {
    setThemeValue(); // ①-1 이전 설정값 불러옴
  }, []);

  return (
    <SafeAreaView>

      // 라이트모드

      <Pressable
        onPress={() => {
          isThemeF('light'); // zustand 값 변경
          setThemeType('light'); // 선택된 테마 설정 [light : ON] 
          AsyncStorage.setItem('Theme', 'light'); // AsyncStorage에 저장
        }}
       />

      // 다크모드

      <Pressable
        onPress={() => {
          isThemeF('dark'); // zustand 값 변경
          setThemeType('dark'); // 선택된 테마 설정 [dark : ON] 
          AsyncStorage.setItem('Theme', 'dark'); // AsyncStorage에 저장
        }}
       />

      // 시스템설정모드

      <Pressable
        onPress={() => {
          isThemeF(themeType); // zustand 값 변경
          setThemeType('system'); // 선택된 테마 설정 [system : ON] 
          AsyncStorage.setItem('Theme', 'system'); // AsyncStorage에 저장
        }}
       />
    </SafeAreaView>
  );
}

export default ThemeSettingsScreen;
```

## 🎁 Result

https://user-images.githubusercontent.com/39721950/225787906-7cb485ad-1db2-4cb0-8ab5-8ea711952845.mov




