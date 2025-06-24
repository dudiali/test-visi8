import { width } from "@/constants/Styles";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ title = "title", onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.buttontext}>{title}</Text>
    </TouchableOpacity>
  );
};

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
  buttontext: {
    alignSelf: "center",
    color: "white",
    fontFamily: "InterMedium",
    fontSize: RFValue(12),
  },
});

export default Button;
