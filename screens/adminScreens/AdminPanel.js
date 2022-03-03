import React from 'react';
import style from '../../styles/GlobalStyle'
import { List } from '../../components/List'
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width

export const AdminPanel = (props) => {

  const data = [
      {_id: 0, title: 'הוספת כיתה' , pageName: 'AddClass'},
      {_id: 1, title: 'מחיקת כיתה' , pageName: 'DeleteClass'},
      {_id: 2, title: 'הוספת מורה למערכת' , pageName: 'AddUser', admin: false},
      {_id: 3, title: 'מחיקת מורה' , pageName: 'DeleteTeacher'},
      {_id: 4, title: 'שייך תלמיד לכיתה' , pageName: 'BelongsStudentClass'},
      {_id: 5, title: 'הסר תלמיד מכיתה' , pageName: 'RemoveStudentClass'},
      {_id: 6, title: 'הוסף מקצוע', pageName: 'AddProfession' },
      {_id: 7, title: 'הסר מקצוע', pageName: 'DeleteProfession' },
      {_id: 8, title: 'שייך מקצוע לכיתה', pageName: 'BelongsProfessionClass' },
      {_id: 9, title: 'הוסף אדמין', pageName: 'AddUser' , admin: true },
  ]

 
  return (
    
    <List 
    Data={data} 
    type='title' 
    num={1}
    MultipleSelection={false}
    onPress={ (item) => {
      if(item){
        let nextPage = data.filter(obj => {return obj.title === item})
        if(nextPage){
          if(nextPage[0].pageName == 'AddUser' ){
            props.navigation.navigate(nextPage[0].pageName,{admin: nextPage[0].admin})
          }
          else{
            props.navigation.navigate(nextPage[0].pageName)
          }
        }

         
      }
   
    } } 
    styleButton={style.adminButtons}/>
       
  );
}
  export default AdminPanel