import { Button, Text, View } from "react-native";

export default function TestWindowPage1() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Test Window Page</Text>
      <Button
        title="Go Back"
        onPress={() => {
          // Use the router to go back to the previous screen
        //   router.back();
        }}
      />
    </View>
  );
}