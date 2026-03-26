(1) Vector Icons Or Usage Of Icons In React Native CLI Project
-----------------------------------------------------------------
==> npm i react-native-vector-icons
==> cd ios
==> pod install
==> Add Fonts to 'Info.plist' Inside 'dict'

    <key>UIAppFonts</key>
    <array>
        <string>FontAwesome.ttf</string>
        <string>FontAwesome5_Brands.ttf</string>
        <string>FontAwesome5_Regular.ttf</string>
        <string>FontAwesome5_Solid.ttf</string>
		<string>AntDesign.ttf</string>
		<string>Feather.ttf</string>
    </array>

==> Restart The Local Server And Run [npm run ios]


(2) Usage
-----------

    import Icon from 'react-native-vector-icons/FontAwesome';

    <Icon name="home" size={50} color="red" />


(3) When Add Fonts And Have Any Problem Follow These
-------------------------------------------------------

rm -rf node_modules
rm -rf ios/build
rm -rf ios/Pods
rm -rf ios/Podfile.lock
rm -rf ~/Library/Developer/Xcode/DerivedData
npm install

cd ios
pod install --repo-update
cd ..
npm run ios