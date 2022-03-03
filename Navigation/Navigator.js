import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import React from 'react';

// import all pages of the app
import { HomePage } from '../screens/HomePage';
import { SignUpByEmail } from '../screens/registration/SignUpByEmail';
import { SignUp } from '../screens/registration/SignUp';
import { LogIn } from '../screens/registration/LogIn';
import { StudentList } from '../screens/StudentList';
import { AddClass } from '../screens/adminScreens/AddClass';
import { AdminPanel } from '../screens/adminScreens/AdminPanel';
import { AddProfession } from '../screens/adminScreens/AddProfession';
import { Settings } from '../screens/Settings';
import { AddUser } from '../screens/adminScreens/AddUser';
import { BelongsProfessionClass } from '../screens/adminScreens/BelongsProfessionClass';
import { BelongsStudentClass } from '../screens/adminScreens/BelongsStudentClass';
import { DeleteClass } from '../screens/adminScreens/DeleteClass';
import { DeleteTeacher } from '../screens/adminScreens/DeleteTeacher';
import { DeleteProfession } from '../screens/adminScreens/DeleteProfession';
import { RemoveStudentClass } from '../screens/adminScreens/RemoveStudentClass';
import { classSelection } from '../screens/teacherScreens/classSelection'
import { ProfessionsSelection } from '../screens/teacherScreens/ProfessionsSelection'
import { StudentSelection } from '../screens/teacherScreens/StudentSelection'

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
    
    AdminPanel: AdminPanel,
    AddUser: AddUser,
    AddClass: AddClass,
    DeleteClass: DeleteClass,
    DeleteProfession: DeleteProfession,
    DeleteTeacher: DeleteTeacher,
    AddProfession: AddProfession,
    BelongsProfessionClass: BelongsProfessionClass,
    Settings: {
        screen: Settings,
        navigationOptions: {
            headerTitle: 'שינוי פרטי פרופיל'
        },
    },
});

const TeacherNavigator = createStackNavigator({ 
    
    classSelection: classSelection,
    ProfessionsSelection: ProfessionsSelection,
    StudentSelection: StudentSelection,

    
    Settings: {
        screen: Settings,
        navigationOptions: {
            headerTitle: 'שינוי פרטי פרופיל'
        },
    },
});


const TabNavigator = createBottomTabNavigator({
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

const mainNavigator = createSwitchNavigator({
    HomePageNavigator: HomePageNavigator,
    AdminNavigator: AdminNavigator,
    TeacherNavigator: TeacherNavigator
    
})

export default createAppContainer(mainNavigator)