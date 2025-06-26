import { Colors } from "@/constants/Colors";
import { width } from "@/constants/Styles";
import { Feather, Ionicons } from "@expo/vector-icons";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface TextInputProps {
  placeholder: string;
  secureText?: boolean;
  secure?: boolean;
  onPress?: () => void;
  onError?: string;
  onChangeText?: any;
  value?: string;
}

const CustomTextInput: React.FC<TextInputProps> = ({
  placeholder,
  secureText = false,
  secure = true,
  onPress,
  onError = "",
  onChangeText,
  value,
}) => {
  if (secureText) {
    return (
      <View>
        <View
          style={[
            styles.securetextinput,
            {
              paddingVertical:
                Platform.OS === "ios" ? width * 0.04 : width * 0.008,
              borderColor:
                onError !== "" ? "#DF1C4126" : Colors.light.lightGray,
              marginBottom: onError !== "" ? width * 0.02 : width * 0.04,
            },
            onError !== "" ? styles.shadow : null,
          ]}
        >
          <TextInput
            style={{ color: "black", flex: 1 }}
            secureTextEntry={secure}
            placeholder={placeholder}
            placeholderTextColor={Colors.light.softGrey}
            onChangeText={onChangeText}
            value={value}
          />
          <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
            <Ionicons
              name={!secure ? "eye-off-outline" : "eye-outline"}
              size={15}
              color="#121A26"
            />
          </TouchableOpacity>
        </View>

        {onError !== "" && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: width * 0.03,
              marginLeft: width * 0.02,
            }}
          >
            <Feather name="alert-circle" color={"#DF1C41"} />
            <Text style={styles.texterror}>{onError}</Text>
          </View>
        )}
      </View>
    );
  }
  return (
    <View>
      <View
        style={[
          styles.textinput,
          {
            borderColor: onError !== "" ? "#DF1C4126" : Colors.light.lightGray,
            marginBottom: onError !== "" ? width * 0.02 : width * 0.04,
            paddingVertical:
              Platform.OS === "ios" ? width * 0.04 : width * 0.008,
          },
          onError !== "" ? styles.shadow : null,
        ]}
      >
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={Colors.light.softGrey}
          onChangeText={onChangeText}
          value={value}
          style={{ color: "black" }}
        />
      </View>

      {onError !== "" && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: width * 0.03,
            marginLeft: width * 0.02,
          }}
        >
          <Feather name="alert-circle" color={"#DF1C41"} />
          <Text style={styles.texterror}>{onError}</Text>
        </View>
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  textinput: {
    fontSize: RFValue(12),
    borderWidth: 1,
    borderRadius: 100,
    paddingLeft: width * 0.05,
    fontFamily: "InterRegular",
    backgroundColor: "white",
  },
  securetextinput: {
    fontSize: RFValue(12),
    borderWidth: 1,
    borderRadius: 100,
    borderColor: Colors.light.lightGray,
    paddingHorizontal: width * 0.05,
    fontFamily: "InterRegular",
    marginBottom: width * 0.04,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  shadow: {
    shadowColor: "#EC778D",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  texterror: {
    fontFamily: "InterRegular",
    color: "#DF1C41",
    marginLeft: width * 0.01,
  },
});
