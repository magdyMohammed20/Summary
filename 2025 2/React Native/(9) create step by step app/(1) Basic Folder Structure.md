(1) Basic Folder Structure
---------------------------
==> In Root Folder create 'src' folder that will contains folders like 'assets' for images and 'screens' for main app screens and 'components' for main components

    Root
        - src 
            - assets
                - intro.png
            - screens
                - IntroScreen.tsx
            - components
                - UserAvatar.tsx


(2) 'svg' usage in react native
---------------------------------
==> For use 'svg' in our app must install 'npm i react-native-svg'
==> Then go to 'svg viewer' in browser then paste the svg code and select 'react native' from tabs so will generates the code for the svg which can copy and use it
==> In 'assets' folder create 'svg' as normal component and call it any way 

(3) SvgProps Type For 'Ts'
----------------------------

    import Svg, { SvgProps } from "react-native-svg";


    const AbsolutedSvg = (props: SvgProps) => (

        <Svg
            {...props }
        >

