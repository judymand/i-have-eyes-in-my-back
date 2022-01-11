import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import React from 'react';
import { HomePage } from '../screens/HomePage';
import { SignUp } from '../screens/SignUp';
import { LogIn } from '../screens/LogIn';
import { ClassList } from '../screens/ClassList';
import { StudentList } from '../screens/StudentList';
import { AddTeacher } from '../screens/adminScreens/AddTeacher';
import { AddClass } from '../screens/adminScreens/AddClass';
import { Addstudent } from '../screens/adminScreens/Addstudent';
import { AdminPanel } from '../screens/adminScreens/AdminPanel';
import { AddProfession } from '../screens/adminScreens/AddProfession';
import { ProfessionList } from '../screens/ProfessionList';
import { Settings } from '../screens/Settings';


const HomePageNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            headerTitle: 'I have eyes in my back'
        }
    },
    SignUp: SignUp,
    LogIn: LogIn ,
    StudentList: StudentList,
    AdminPanel: AdminPanel,
    AddTeacher: AddTeacher,
    AddClass: AddClass,
    ClassList: ClassList,
    Addstudent: Addstudent,
    Settings: {
        screen: Settings,
        navigationOptions: {
            headerTitle: 'שינוי פרטי פרופיל'
        },
    },
});

const AdminNavigator = createStackNavigator({
    
    AdminPanel: AdminPanel,
    ClassList: ClassList,
    ProfessionList: ProfessionList,
    StudentList: StudentList,
    AddTeacher: AddTeacher,
    AddClass: AddClass,
    AddProfession: AddProfession,
    Addstudent: Addstudent,
    Settings: {
        screen: Settings,
        navigationOptions: {
            headerTitle: 'שינוי פרטי פרופיל'
        },
    },
});

const TeacherNavigator = createStackNavigator({   
    ClassList: ClassList,
    ProfessionList: ProfessionList,
    StudentList: StudentList,
    Addstudent: Addstudent,
    Settings: {
        screen: Settings,
        navigationOptions: {
            headerTitle: 'שינוי פרטי פרופיל'
        },
    },
});


const TabNavigator = createBottomTabNavigator({
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
    logoff: {
        screen: HomePageNavigator,
        navigationOptions: {
            tabBarLabel: 'יציאה',
            tabBarIcon: (tabInfo) => {
                return(
                    <Entypo name="log-out" size={24} color={tabInfo.tintColor} />
                )
            },
        },
    }
        
}, {
    tabBarOptions: {
        activeTintColor: '#4E6D4E'
    }
})

export default createAppContainer(TabNavigator)