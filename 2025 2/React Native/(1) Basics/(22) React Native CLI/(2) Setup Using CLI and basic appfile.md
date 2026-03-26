(1) Setup Using CLI
----------------------
==> brew install node (For Install Nodejs)
==> brew install watchman (For Install watchman)
==> sudo xcode-select --switch /Applications/Xcode.app
==> sudo xcodebuild -license
==> sudo gem install cocoapods
==> npx @react-native-community/cli init MyApp
==> npm install --save-dev @react-native-community/cli@latest
==> After Install Ensure 'package.json' includes

    "devDependencies": {
        "@react-native-community/cli": "latest"
    }

==> npx react-native start --reset-cache (Clear Caching)
==> For Android Run (npx react-native run-android) For ios Run (npm run ios)


(2) Basic App.tsx With Safe Area
-----------------------------------

    import { StatusBar, StyleSheet, Text, useColorScheme } from 'react-native';
    import {
        SafeAreaProvider,
        SafeAreaView,
    } from 'react-native-safe-area-context';

    function App() {
        const isDarkMode = useColorScheme() === 'dark';

        return (
            <SafeAreaProvider>
                <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
                    <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
                    <Text>Hellow</Text>
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }



    const styles = StyleSheet.create({
        container: {
            flex: 1
        },
    });

    export default App;
