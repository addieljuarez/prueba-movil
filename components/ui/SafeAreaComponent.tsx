import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { stylesSafeArea } from "./SafeAreaComponent.styles";

import React, { PropsWithChildren } from "react";

export default function SafeAreaComponent({ children }: PropsWithChildren<object>) {
    return(
        <>
            <SafeAreaProvider>
                <SafeAreaView style={stylesSafeArea.safeAreaview}>
                    {children}
                </SafeAreaView>
            </SafeAreaProvider>
        </>
    )
}

