import { CategoryButton } from "@/components/category-button";
import { Header } from "@/components/header";
import {View, Text, FlatList, SectionList} from "react-native"
import {CATEGORIES, MENU} from "@/utils/data/products"
import { useCallback, useState, useRef } from "react";
import { Product, ProductDataProps } from "@/components/product";
import { Link } from "expo-router";
import { useCartStore } from "@/stores/cart-store";

interface ItemProps {
    item: string
}

const Home = () => {

  const cartStore = useCartStore()

  const [ category , setCategory ] = useState<string>(CATEGORIES[0])
  const sectionListRef = useRef<SectionList>(null)

  const cartQuantityItens = cartStore.products.reduce((acc, item) => { 
    acc = acc + item.quantity
    return acc
  }, 0)

  const renderItem = useCallback(({item}: ItemProps) => (
    <CategoryButton title={item} isSelected={item === category} onPress={() => handleCategorySelect(item)} />
  ),[category])

  const renderItemSectionList = useCallback(({item}: any) => (
    <Link href={`/product/${item.id}`} asChild>
      <Product data={item} />
    </Link>
  ),[])

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory)
    const sectionIndex = CATEGORIES.findIndex(category => category === selectedCategory)

    if(sectionListRef.current){
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex: sectionIndex,
        itemIndex: 0
      })
    }
  }
return(
    <View className="bg-slate-900 flex-1">
       <Header cartQuantityItems={cartQuantityItens} title="Faça seu pedido" />
      
    <FlatList
    className="max-h-10 mt-5"
        data={CATEGORIES}
        keyExtractor={item => item}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: 12, paddingHorizontal: 20}}
    />

    <SectionList
      className="flex-1 p-5"
      ref={sectionListRef}
      sections={MENU}
      keyExtractor={item => item.id}
      stickySectionHeadersEnabled={false}
      renderItem={renderItemSectionList}
      renderSectionHeader={({section : {title}}) => <Text className="text-xl text-white font-heading mt-8 mb-3">{title}</Text>}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 100}}
    />
    </View>
)
}

export default Home;