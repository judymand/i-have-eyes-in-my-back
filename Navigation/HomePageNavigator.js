import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from "react-navigation";
import { HomePage } from '../screens/HomePage';
import { SignUp } from '../screens/SignUp';
import { LogIn } from '../screens/LogIn';


const HomePageNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
    },
    SignUp: SignUp,
    LogIn: LogIn ,
});

export default createAppContainer(HomePageNavigator)