import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Inputs from './inputs.js'
import List from './list.js'

const Routes = () => (
   <Router navigationBarStyle={styles.container}>
      <Scene key = "root">
         <Scene key = "list" component = {List} title = "List"  hideNavBar={true} />
         <Scene key = "inputs" component = {Inputs} title = "Inputs" initial = {true} hideNavBar={true} />
      </Scene>
   </Router>
)
export default Routes

const styles = StyleSheet.create ({
   container: {

      backgroundColor: 'blue',

   },
   text: {
      color: '#4f603c'
   }
})
