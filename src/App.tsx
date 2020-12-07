import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import {
  ActivityIndicator,
  StatusBar,
} from "react-native"
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, {persistor} from './store'

import TodoNavigator from './TodoNavigator'

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <NavigationContainer>
            <TodoNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
    )
  }

export default App;
