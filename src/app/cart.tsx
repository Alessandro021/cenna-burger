import { Header } from "@/components/header"
import { Alert, FlatList, Text, View } from "react-native"
import { Product } from "@/components/product"
import { ProductCartProps, useCartStore } from "@/stores/cart-store"
import { useCallback } from "react"
import { formatCurrency } from "@/utils/functions/format-currency"
import { Input } from "@/components/input"
import { Button } from "@/components/button"
import { Feather } from "@expo/vector-icons"
import { LinkButton } from "@/components/link-button"

const Cart = () => {

    const {products, remove} = useCartStore()

    const total = formatCurrency(products.reduce((acc, product) => {
        const preco = product.price * product.quantity
        acc = acc + preco
        return acc 
    }, 0))

    const handleProductRemove = (product: ProductCartProps) => {
        Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
            {text: "Cancela"},
            {
                text: "Remover",
                onPress: () => remove(product.id)
            }
        ])
    }

    const renderItem = useCallback( ({item}: any) => <Product data={item} onPress={() => handleProductRemove(item)} /> ,[products])
    return (
        <View  className="flex-1 pt-8">
          <Header title="Seu carrinho" />
  
            <View className="m-5 flex-1 border-b border-slate-700">
                <FlatList 
                    data={products}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<Text className="font-body text-slate-400 text-base text-center my-8 flex-1">Seu carrinho esta vazio.</Text>}
                />
          </View>

          {/* { products?.length === 0 && (
             <Text className="font-body text-slate-400 text-base text-center my-8 flex-1">Seu carrinho esta vazio.</Text>
          )} */}

         <View className="p-5">
            <View className="flex-row gap-2 items-center mb-4">
                <Text className="text-white text-xl font-subtitle">Total: </Text>
                <Text className="text-lime-400 text-2xl font-heading">{total}</Text>
            </View>

            <Input placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..." />
         </View>

         <View className="p-5 gap-5">
            <Button>
                <Button.Text>Enviar pedido</Button.Text>
                <Button.Icon>
                    <Feather name="arrow-right-circle" size={20} />
                </Button.Icon>
            </Button>
         </View>

         <LinkButton title="Voltar ao cardápio" href="/"/>
         
        </View>
    )
}

export default Cart