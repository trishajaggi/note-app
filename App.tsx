import * as React from 'react';
import {useState, useCallback} from 'react';
import { Text, View, Button, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import { HomeScreenNavigationProp, NoteScreenNavigationProp, NoteScreenRouteProp, RouteParamList } from './RouteParamList';


let globalNotes: string[] = []

function HomeScreen ({ navigation }: { navigation: HomeScreenNavigationProp}) {
  const [notes, setNotes] = useState(globalNotes)
  useFocusEffect(
    useCallback(() => {
      setNotes(globalNotes);
    }, [])
  );

  return (
    <View style = {{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
    <FlatList
         data = {globalNotes}
         renderItem={({ item, index }) => (
         <TouchableOpacity onPress = {() => navigation.navigate('Note', {item, index})} style = {{flex:1}}>
            <Text>
              {item}
            </Text> 
         </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
    />
    <Button
      title = "New Note"
      onPress = {() => navigation.navigate('Note')}
      />

    </View>
  );
}



function NoteScreen({route, navigation}: {route: NoteScreenRouteProp, navigation: NoteScreenNavigationProp}){
    var val = "Default"
    if(!route.params){
        val = "Default";
    }else{
        val = route.params.item;
    }


    const [text, setText] = useState(val);

    const saveNote = useCallback(() => {
      if(!route.params){
        onAddNotePress()
      }else{
        globalNotes[route.params.index] = text;
      } 
        globalNotes = [...globalNotes];
        navigation.navigate('Home');
        console.log(globalNotes)
    }, [text])

    const onAddNotePress = useCallback(() => {
      navigation.navigate('Home');
      globalNotes = globalNotes.concat([text]);
    }, [text]);

    return(

    <View style = {{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <TextInput style = {{height: 40}} value = {text} onChangeText = {setText} />
        <Button
            title = "Save"
            onPress = {saveNote}
        />
  
    </View>
    );
}

const Stack = createStackNavigator<RouteParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Note" component={NoteScreen} />
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
