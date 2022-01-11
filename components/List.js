import React, { useState } from 'react';
import { FlatList, View, StatusBar, StyleSheet} from 'react-native';
import style from '../styles/GlobalStyle'
import { MainButton } from './MainButton'


  export const List = (props) => {
    const [selectedId, setSelectedId] = useState(null);
    // const Data = props.navigation.getParam('DATA')
    const Data = props.Data
    const type = props.type

    const Item = ({ item }) => {
      if(type == 'className' ){
        return(
          <View style={style.list}>
              <MainButton style={style.smallButton} >
                {item.className}
            </MainButton>
          </View>
        );
      }
      else if(type == 'studenName'){
        return(
          <View style={style.list}>
              <MainButton>
                {item.studenName}
            </MainButton>
          </View>
        );
      }
      else if(type == 'title'){
        return(
          <View style={style.title}>
              <MainButton style={props.styleButton}>
                {item.title}
            </MainButton>
          </View>
        );
      }
      else{

      }
    }
    
  
  
    const renderItem = ({ item }) => {
      const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
      const color = item.id === selectedId ? 'white' : 'black';
  
      return (
        <Item
          item={item}
          onPress={props.onPress}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      );
    };
  
    return (
      <View style={styles.container}>
        <FlatList
          data={Data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          numColumns={props.num}
          extraData={selectedId}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      alignItems: 'center',
      justifyContent: 'center', 
      paddingTop: 20,
    },
    item: {
      // padding: 20,
      // marginVertical: 8,
      // marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });
  
 
  export default List