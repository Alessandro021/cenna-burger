import { CategoryButton } from "@/components/category-button";
import { Header } from "@/components/header";
import {View, Text, FlatList} from "react-native"
import {CATEGORIES} from "@/utils/data/products"
import { useCallback, useState } from "react";

interface ItemProps {
    item: string
}

const Home = () => {

  const [ category , setCategory ] = useState<string>(CATEGORIES[0])

  const renderItem = useCallback(({item}: ItemProps) => (
    <CategoryButton title={item} isSelected={item === category} onPress={() => handleCategorySelect(item)} />
  ),[category])

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory)
  }
return(
    <View className="bg-slate-900 flex-1">
       <Header cartQuantityItems={1000} title="Faça seu pedido" />
      
    <FlatList
    className="max-h-10 mt-5"
        data={CATEGORIES}
        keyExtractor={item => item}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: 12, paddingHorizontal: 20}}
    />
    </View>
)
}

export default Home;