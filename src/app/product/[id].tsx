import { Image, Text, View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Button } from "@/components/button";
import {Feather} from "@expo/vector-icons"
import { LinkButton } from "@/components/link-button";

import { useCartStore } from "@/stores/cart-store";


const Product = () => {
    const cartStore = useCartStore()
    const {id} = useLocalSearchParams()
    const navigate = useNavigation()

    const product = PRODUCTS.filter(item => item.id === id)[0]

    const handleAddToCart = () => {
        cartStore.add(product)
        navigate.goBack()
    }

    return (
        <View className="flex-1">
          <Image 
                className="w-full h-60"
                source={product?.cover}
                resizeMode="cover"
           />

           <View className="p-5 mt-8 flex-1">
                <Text className="text-lime-400 text-2xl font-heading my-2">{formatCurrency(product?.price ?? 0)}</Text>
                <Text className="text-slate-400 font-body text-base leading-6 mb-6">{product?.description}</Text>

                {
                    product?.ingredients.map(((ingredient, index) =>(
                        <Text className="text-slate-400 font-body text-base leading-6" key={index} >{"\u2022"} {ingredient}</Text>
                    )))
                }
           </View>

           <View className="p-5 pb-8 gap-5">
               <Button onPress={handleAddToCart}>
                    <Button.Icon>
                        <Feather name="plus-circle" size={20 } />
                    </Button.Icon>
                    <Button.Text> Adicior ao pedido</Button.Text>
               </Button>
               <LinkButton title="Voltar ao cardápio" href="/"/>
           </View>
        </View>
    )
} 

export default Product;
 