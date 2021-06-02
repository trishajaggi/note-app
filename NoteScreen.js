import * as React from 'react';
import {useState} from 'react';
import { Text, View, Button, StyleSheet, TextInput } from 'react-native';
import Constants from 'expo-constants';

class NoteScreen extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      body: 'type here'
      
    };
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick = (txt) => {
    this.setState(state =>({
      body: txt
    }));
  }

  render(){
    const [text, setText] = useState('');
    return(
       <View style = {{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <TextInput  
          style = {{height: 40}}
          placeholder = "Type here"
          onChangeText={text => setText(text)}
          defaultValue={text}
        />
        <Text style={{padding: 10, fontSize: 42}}>
        </Text>
        <View style = {{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
          <Button 
            title = "Save Note"
            onPress = {() => this.handleClick(text)}
            
          />
        </View>
        </View>
    );
  }
}
