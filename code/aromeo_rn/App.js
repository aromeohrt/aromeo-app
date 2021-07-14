import React, { useEffect } from 'react';
import { StyleSheet, View, Text, StatusBar, YellowBox } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Amplify, { Auth } from 'aws-amplify';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { PersistGate } from 'redux-persist/integration/react';
// import Spinner from 'react-native-loading-spinner-overlay';
import { persistStore } from 'redux-persist';
import sagas from './src/segas';
import reducer from './src/reducers';
import { createStore, applyMiddleware } from 'redux';
import SplashScreen from 'react-native-splash-screen';



Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: 'eu-central-1',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'eu-central-1_ZQucC5j0b',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '4jbvjg4135irr7h2fts2djf0vl'
  }
});

YellowBox.ignoreWarnings(['componentWillReciveProps']);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);
sagaMiddleware.run(sagas);

const App = (props) => {
  useEffect(()=>{  setTimeout(() => { SplashScreen.hide() }, 100)},[])
  return (
    <NavigationContainer>
      <StatusBar hidden={false} barStyle="light-content" backgroundColor="transparent" translucent/>
      {/* <SafeAreaView style={[styles.container,{backgroundColor:'#11111180'}]}> */}
      <SafeAreaProvider>
        <View style={styles.container}>
          <Provider store={store}>
            {/* <PersistGate loading={<Spinner visible />} persistor={persistor}> */}
              <Routes {...props} />
            {/* </PersistGate> */}
          </Provider>
        </View>
      </SafeAreaProvider>
      {/* </SafeAreaView> */}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
