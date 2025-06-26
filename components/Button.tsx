import { Colors } from "@/constants/Colors";
import { width } from "@/constants/Styles";
import { ReactNode } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface ButtonProps {
  title?: string;
  onPress: () => void;
  children?: ReactNode;
  outline?: boolean;
  paddingVertical?: number;
  loading?: boolean;
  spinnerColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  title = "title",
  onPress,
  children,
  outline = false,
  paddingVertical = width * 0.043,
  loading = false,
  spinnerColor = "white",
}) => {
  const styleButton = outline
    ? [styles.buttonoutline, { paddingVertical: paddingVertical }]
    : styles.button;
  const styleButtonText = outline
    ? styles.buttontextoutline
    : styles.buttontext;
  return (
    <TouchableOpacity activeOpacity={0.5} style={styleButton} onPress={onPress}>
      {loading ? (
        <ActivityIndicator size={"small"} color={spinnerColor} />
      ) : (
        <View>
          {children ? children : <Text style={styleButtonText}>{title}</Text>}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    fontSize: RFValue(12),
    paddingVertical: width * 0.043,
    borderRadius: 100,
    fontFamily: "InterRegular",
    marginBottom: width * 0.04,
    backgroundColor: "#60B558",
    marginVertical: width * 0.04,
  },
  buttonoutline: {
    fontSize: RFValue(12),
    paddingVertical: width * 0.043,
    borderRadius: 100,
    fontFamily: "InterRegular",
    marginBottom: width * 0.04,
    backgroundColor: "white",
    marginVertical: width * 0.04,
    borderWidth: 1,
    borderColor: "#EAE9E9",
  },
  buttontext: {
    alignSelf: "center",
    color: "white",
    fontFamily: "InterMedium",
    fontSize: RFValue(12),
  },
  buttontextoutline: {
    alignSelf: "center",
    color: Colors.light.text,
    fontFamily: "InterMedium",
    fontSize: RFValue(12),
  },
});
