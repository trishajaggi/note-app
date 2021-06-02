import * as React from 'react';
import {useState, useCallback, useEffect} from 'react';
import { Text, View, Button, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer, NavigationEvents, useFocusEffect, NavigationActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';

let globalNotes = []

function HomeScreen ({navigation}) {
  const [notes, setNotes] = useState(globalNotes)
  useFocusEffect(
    useCallback(() => {
      setNotes(globalNotes);
    }, [])
  );

  return (
    <View style = {{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
    <FlatList
         //contentContainerStyle = {{backgroundColor: 'red'}}
         data = {globalNotes}
         renderItem={({ item, index }) => (
         <TouchableOpacity onPress = {() => navigation.navigate('Note Screen', {item, index})} style = {{flex:1}}>
            <Text>
              {item}
            </Text>
         </TouchableOpacity>
        )}
    />
    <Button
      title = "New Note"
      onPress = {() => navigation.navigate('Note Screen')}
      />

    </View>
  );
}



function NoteScreen({route, navigation}){
    var val = "Default"
    if(typeof route.params === 'undefined'){
        val = "Default";
    }else{
        val = route.params.item;
    }
    console.log(val)

    const [text, setText] = useState(val);

    const saveNote = useCallback(() => {
        globalNotes[route.params.index] = text;
        globalNotes = [...globalNotes];
        navigation.goBack();
        console.log(globalNotes)
    }, [text])

    const onAddNotePress = useCallback(() => {
      navigation.navigate('Home');
      globalNotes = globalNotes.concat([text]);
      alert(globalNotes);
    }, [text]);

    return(

    <View style = {{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <TextInput style = {{height: 40}} value = {text} onChangeText = {setText} />
        <Button
            title = "Save"
            onPress = {saveNote}
        />
         <Button
             title = "Add Note"
             onPress = {onAddNotePress}
         />
    </View>
    );
}

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="Note Screen" component={NoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
