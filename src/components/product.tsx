import { Image, Text, ImageProps, TouchableOpacity, TouchableOpacityProps, View} from "react-native"
import { forwardRef } from "react"
export interface ProductDataProps {
    title: string
    description: string
    thumbnail: ImageProps
}

type ProductProps = TouchableOpacityProps & {
    data: ProductDataProps
}

export const Product = forwardRef<TouchableOpacity, ProductProps>(({data, ...rest}, ref  ) => {
    return(
        <TouchableOpacity ref={ref} className=" w-full flex-row items-center pb-4" {...rest}>
            <Image
            className="w-20 h20 rounded-md"
            source={data.thumbnail}
            />

            <View className="flex-1 ml-3">
                <Text className="text-slate-100 font-subtitle text-base flex-1">{data.title}</Text>
                <Text className="text-slate-400 text-xs leading-5 mt-0.5">{data.description}</Text>
            </View>
        </TouchableOpacity>
    )
})