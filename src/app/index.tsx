import { Header } from "@/components/header";
import {View, Text} from "react-native"

const Home = () => {
return(
    <View className="bg-slate-900 flex-1">
       <Header cartQuantityItems={1000} title="Faça seu pedido" />
    </View>
)
}

export default Home;