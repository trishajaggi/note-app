import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RouteParamList ={
    Home: undefined,
    Note: {item: string, index: number} | undefined,
};

export type NoteScreenNavigationProp = StackNavigationProp<
  RouteParamList,
  'Note'
>;

export type HomeScreenNavigationProp = StackNavigationProp<
  RouteParamList,
  'Home'
>;

export type NoteScreenRouteProp = RouteProp<RouteParamList, 'Note'>;





