(1) Loaders
----------------

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';

export default function App() {
  return (
    <View >
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>


        <ActivityIndicator size={'small'} color={'green'}/>
      </ScrollView>
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
