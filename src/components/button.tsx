import { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
    children: ReactNode
}

interface ButtonTextProps {
    children: ReactNode
}

interface ButtonIconProps {
    children: ReactNode
}


const Button = ({children, ...rest}: ButtonProps) => {
    return (
        <TouchableOpacity className="h--12 bg-lime-400 rounded-md items-center justify-center flex-row p-2" {...rest} activeOpacity={0.7}>
            {children}
        </TouchableOpacity>
    )
}

const ButtonText = ({children}: ButtonTextProps) => {
    return (
        <Text className="text-black font-heading text-base mx-2">{children}</Text>
    )
}

const ButtonIcon = ({children}: ButtonIconProps) => {
    return children
}

Button.Text = ButtonText
Button.Icon = ButtonIcon



export {Button}