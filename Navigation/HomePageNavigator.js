import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from "react-navigation";
import { HomePage } from '../screens/HomePage';
import { SignUp } from '../screens/SignUp';
import { LogIn } from '../screens/LogIn';
import List from '../components/List';


const HomePageNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            headerTitle: 'I have eyes in my back'
        }
    },
    SignUp: SignUp,
    LogIn: LogIn ,
    List: List,
});

export default createAppContainer(HomePageNavigator)