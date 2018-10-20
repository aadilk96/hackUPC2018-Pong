import React, { Component } from "react";
import { ActivityIndicator, FlatList, Text, View, ScrollView } from "react-native";
import { List, ListItem } from "react-native-elements";
import PopupDialog from 'react-native-popup-dialog';

export default class FP extends React.Component {

 state = {
   data: [],
   page: 0,
   loading: false
 };

 componentWillMount() {
   this.fetchData();
 }

 fetchData = async () => {
   this.setState({ loading: true });
   const response = await fetch(
     `https://randomuser.me/api?results=15&seed=hi&page=${this.state.page}`
   );
   const json = await response.json();
   this.setState(state => ({
     data: [...state.data, ...json.results],
     loading: false
   }));
 };

 handleEnd = () => {
   this.setState(state => ({ page: state.page + 1 }), () => this.fetchData());
 };

 render() {
   return (
     <View>
       <List>
         <FlatList
           data={this.state.data}
           keyExtractor={(x, i) => i}
           onEndReached={() => this.handleEnd()}
           onEndReachedThreshold={0}
           ListFooterComponent={() =>
             this.state.loading
               ? null
               : <ActivityIndicator size="large" animating />}
           renderItem={({ item }) =>
             <ListItem
               roundAvatar
               avatar={{ uri: item.picture.thumbnail }}
               title={`${item.name.first} ${item.name.last}`}
               onPress={() => {
               this.popupDialog.show();
             }}
             />}
         />
       </List>
       <PopupDialog
         ref={(popupDialog) => { this.popupDialog = popupDialog; }}
         >
         <View styles={{alignItems: 'center'}}>
         <Text>'lol'</Text>
         </View>
       </PopupDialog>
     </View>

   );
 }
}