(1) backgroundImage Element
---------------------------------
==> Used To Set backgroundImage For Specific Elements


    import { StatusBar } from 'expo-status-bar';
    import { StyleSheet, ImageBackground , View} from 'react-native';


    export default function App() {

        return (
            
            <ImageBackground style={styles.container} source={require('./assets/splash-icon.png')}>

                <View style={{
                        width: 200,
                        height: 200,
                        backgroundColor: 'red',
                        borderRadius: '50%'
                }
                }> </View>
                
                <StatusBar style="auto" />

            </ImageBackground>
        
        );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
    });


(2) Can Use External Image For Background
-------------------------------------------

    <ImageBackground style={ styles.container } source = {{ uri: 'https://images.pexels.com/photos/1226302/pexels-photo-1226302.jpeg' }}>
