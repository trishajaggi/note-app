import * as React from 'react';
import {useState, useCallback} from 'react';
import { Text, View, Button, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import { HomeScreenNavigationProp, NoteScreenNavigationProp, NoteScreenRouteProp, RouteParamList } from './RouteParamList';
import AsyncStorage from '@react-native-async-storage/async-storage';

let globalNotes: string[] = []


function HomeScreen ({ navigation }: { navigation: HomeScreenNavigationProp}) {
  const [notes, setNotes] = useState(globalNotes)
  
  const getInput = async () => {
    const result = await AsyncStorage.getItem('input');
    
    if(result !== null){ 
      const parsed = JSON.parse(result);
      //setNotes(globalNotes.concat([parsed.text]))
      console.log("text", parsed)
      globalNotes = [...globalNotes, parsed.text]
      setNotes(globalNotes)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getInput()
      console.log(globalNotes)
      //setNotes(globalNotes)
    }, [])
  );
  
  // const getInput = async() => {
  //   const inp = await AsyncStorage.getItem('input');
  //   const prevNote = JSON.parse(inp !);

  //   setNotes([...globalNotes, prevNote])

  // }
 

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
    let val = "Default"
    if(!route.params){
        val = "Default";
    }else{
        val = route.params.item;
    }

    const [text, setText] = useState(val);

    const handleSave = async() => {
      const input = {text: text}
      await AsyncStorage.setItem('input', JSON.stringify(input))
     
    };
    
    const saveNote = useCallback(() => {
      if(!route.params){
        onAddNotePress()
      }else{
        globalNotes[route.params.index] = text;
      }
        handleSave();
        
        globalNotes = [...globalNotes];
        navigation.navigate('Home');

    }, [text])

    const onAddNotePress = useCallback(() => {
      navigation.navigate('Home');
      //globalNotes = globalNotes.concat([text]);
    }, [text]);

    // const deleteNote = useCallback(() => {
    //   if(!route.params){
    //     globalNotes = globalNotes;
    //   }else{
    //     globalNotes.splice(route.params.index, 1);
    //   }
    //   navigation.navigate('Home');

    // },[])

    return(

    <View style = {{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <TextInput style = {{height: 40}} value = {text} onChangeText = {setText} />
        <Button
            title = "Save"
            onPress = {saveNote}
        />
        {/* <Button
            title = "Delete"
            onPress = {deleteNote}
          /> */}
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


