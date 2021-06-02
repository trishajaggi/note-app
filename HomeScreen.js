import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';


class HomeScreen extends React.Component{
  constructor(props){
    super(props)
    
    this.state = {
      notes: []
    }
    
  }
  onAddItem = (txt) => {

  }
  render(){
    return(
    <View style = {{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
      <Button
        title = "New Note"
        onPress = {() => this.props.navigation.navigate('NewNote')}
      />
      </View>
    );
  }
}
  