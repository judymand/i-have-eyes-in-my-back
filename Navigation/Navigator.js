import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Alert, TouchableOpacity, Text} from 'react-native';


// import all pages of the app

//homePage + registration
import { HomePage } from '../screens/HomePage';
import { SignUpByEmail } from '../screens/registration/SignUpByEmail';
import { SignUp } from '../screens/registration/SignUp';
import { LogIn } from '../screens/registration/LogIn';

import { LogOut } from '../screens/LogOut';


// admin screens
import { AdminPanel } from '../screens/adminScreens/AdminPanel';
import { AddClass } from '../screens/adminScreens/AddClass';
import { AddProfession } from '../screens/adminScreens/AddProfession';
import { AddUser } from '../screens/adminScreens/AddUser';
import { BelongsProfessionClass } from '../screens/adminScreens/BelongsProfessionClass';
import { BelongsStudentClass } from '../screens/adminScreens/BelongsStudentClass';
import { DeleteClass } from '../screens/adminScreens/DeleteClass';
import { DeleteTeacher } from '../screens/adminScreens/DeleteTeacher';
import { DeleteProfession } from '../screens/adminScreens/DeleteProfession';
import { RemoveStudentClass } from '../screens/adminScreens/RemoveStudentClass';


// teacher screens
import { classSelection } from '../screens/teacherScreens/classSelection'
import { ProfessionsSelection } from '../screens/teacherScreens/ProfessionsSelection'
import { StudentSelection } from '../screens/teacherScreens/StudentSelection'
import { RemoveProfessionClass } from '../screens/adminScreens/RemoveProfessionClass'

import { Settings } from '../screens/Settings';


// import * as authActions from '../store/actions/auth';


const HomePageNavigator = createStackNavigator({

    HomePage: {
        screen: HomePage,
        navigationOptions: {
            headerTitle: 'I have eyes in my back',
            backgroundColor: '#4E6D4E'
        }
    },
    SignUpByEmail: SignUpByEmail,
    SignUp: SignUp,
    LogIn: LogIn 

}
    // navigationOptions: {
    //     headerStyle: {
    //         backgroundColor: '#4E6D4E'
    //     },
    // }

);

const AdminNavigator = createStackNavigator({
    
    HomePage: AdminPanel,
    AddUser: AddUser,
    AddClass: AddClass,
    DeleteClass: DeleteClass,
    DeleteProfession: DeleteProfession,
    DeleteTeacher: DeleteTeacher,
    AddProfession: AddProfession,
    BelongsProfessionClass: BelongsProfessionClass,
    RemoveProfessionClass, RemoveProfessionClass,
    BelongsStudentClass: BelongsStudentClass,
    RemoveStudentClass: RemoveStudentClass,
    Settings: {
        screen: Settings,
        navigationOptions: {
            headerTitle: 'שינוי פרטי פרופיל'
        },
    },
},
{
    defaultNavigationOptions : ({navigation}) => ({
        headerStyle: {
        //   backgroundColor: '#29434e',
          shadowColor: 'transparent',
          elevation: 2
        },
        headerRight: () => 
            <TouchableOpacity activeOpacity={0.6}>
                <Entypo name="log-out" size={24} coloe="black" 
                onPress={ () => {
                    navigation.navigate('LogOut')
                }
                }/>
            </TouchableOpacity>
                
        ,
      })
});

const TeacherNavigator = createStackNavigator({ 
    
    HomePage: classSelection,
    ProfessionsSelection: ProfessionsSelection,
    StudentSelection: StudentSelection,
    LogOut: LogOut,
    Settings: {
        screen: Settings,
        navigationOptions: {
            headerTitle: 'שינוי פרטי פרופיל'
        },
    },

 

},
{
    defaultNavigationOptions : ({navigation}) => ({
        headerStyle: {
        //   backgroundColor: '#29434e',
        //   shadowColor: 'transparent',
          elevation: 2
        },
        headerRight: () => 
            <TouchableOpacity activeOpacity={0.6}>
                <Entypo name="log-out" size={24} coloe="black" 
                onPress={ () => {
                    navigation.navigate('LogOut')
                }
                }/>
            </TouchableOpacity>
                
        ,
      })
}
);


const TabNavigatorAdmin = createBottomTabNavigator({
    homePage: {
        screen: AdminNavigator,
        navigationOptions: {
            tabBarLabel: 'עמוד בית',
            tabBarIcon: (tabInfo) => {
                return(
                    <Ionicons name="ios-home-outline" size={24} color="black" />
                )
            },
        },
    },
    Settings:  {
        screen: Settings,
        navigationOptions: {
            tabBarLabel: 'הגדרות',
            tabBarIcon: (tabInfo) => {
                return(
                    <Ionicons name="settings-outline" size={24} color={tabInfo.tintColor} />
                )
            },
        },
    },
   
        
}, {
    tabBarOptions: {
        activeTintColor: '#4E6D4E'
    }
})



const TabNavigatorTeacher = createBottomTabNavigator({
    homePage: {
        screen: TeacherNavigator,
        navigationOptions: {
            tabBarLabel: 'עמוד בית',
            tabBarIcon: (tabInfo) => {
                return(
                    <Ionicons name="ios-home-outline" size={24} color="black" />
                )
            },
        },
    },
    // logoff: {
    //     screen: LogOut,
    //     navigationOptions: {
    //         tabBarLabel: 'התנתק',
    //         tabBarIcon: (tabInfo) => {
    //             return(
    //                 <Entypo name="log-out" size={24} color={tabInfo.tintColor} />
    //             )
    //         },
    //     },
    // },
    
    Settings:  {
        screen: Settings,
        navigationOptions: {
            tabBarLabel: 'הגדרות',
            tabBarIcon: (tabInfo) => {
                return(
                    <Ionicons name="settings-outline" size={24} color={tabInfo.tintColor} />
                )
            },
        },
    },
   
        
}, {
    tabBarOptions: {
        activeTintColor: '#4E6D4E'
    }
})

const mainNavigator = createSwitchNavigator({
    HomePageNavigator: HomePageNavigator,
    AdminNavigator: TabNavigatorAdmin,
    TeacherNavigator: TabNavigatorTeacher
    
})

export default createAppContainer(mainNavigator)


