import { Colors } from "@/constants/Colors";
import { width } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface TextInputProps {
  placeholder: string;
  secureText?: boolean;
  secure?: boolean;
  onPress?: () => void;
}

const CustomTextInput: React.FC<TextInputProps> = ({
  placeholder,
  secureText = false,
  secure = true,
  onPress,
}) => {
  if (secureText) {
    return (
      <View style={styles.securetextinput}>
        <TextInput
          style={{ flex: 1 }}
          secureTextEntry={secure}
          placeholder={placeholder}
          placeholderTextColor={Colors.light.softGrey}
        />
        <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
          <Ionicons
            name={!secure ? "eye-off-outline" : "eye-outline"}
            size={15}
            color="#121A26"
          />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <TextInput
      style={styles.textinput}
      placeholder={placeholder}
      placeholderTextColor={Colors.light.softGrey}
    />
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  textinput: {
    fontSize: RFValue(12),
    borderWidth: 1,
    paddingVertical: width * 0.04,
    borderRadius: 100,
    borderColor: Colors.light.lightGray,
    paddingLeft: width * 0.05,
    fontFamily: "InterRegular",
    marginBottom: width * 0.04,
  },
  securetextinput: {
    fontSize: RFValue(12),
    borderWidth: 1,
    paddingVertical: width * 0.04,
    borderRadius: 100,
    borderColor: Colors.light.lightGray,
    paddingHorizontal: width * 0.05,
    fontFamily: "InterRegular",
    marginBottom: width * 0.04,
    flexDirection: "row",
    alignItems: "center",
  },
});
