import React, { useState } from 'react';
import { FlatList, View, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import style from '../styles/GlobalStyle'
import { MainButton } from './MainButton'

  const Item = ({ item }) => (
    <View style={style.list}>
        <MainButton>
          {item.title}
      </MainButton>
    </View>
  );
  
  const List = (props) => {
    const [selectedId, setSelectedId] = useState(null);
    const Data = props.navigation.getParam('DATA')
  
    const renderItem = ({ item }) => {
      const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
      const color = item.id === selectedId ? 'white' : 'black';
  
      return (
        <Item
          item={item}
          onPress={() => setSelectedId(item.id)}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      );
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={Data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          extraData={selectedId}
        />
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });
  
 
    export default List