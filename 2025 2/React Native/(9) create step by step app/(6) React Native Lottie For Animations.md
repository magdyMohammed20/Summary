(1) Install React Native Lottie For use animations
----------------------------------------------------
==> by default the lib installed when create the project but can install it using 'npx expo install lottie-react-native'

==> Then can search for 'react native lottie free animations' and select then download the json file for required animation 

==> then move the json file in your project and use it like following


        import LottieView from 'lottie-react-native';

            <LottieView
                autoPlay

                style={{
                    width: 250,
                    height: 250,
                }}
                source={require('../assets/cardvector.json')}
            />