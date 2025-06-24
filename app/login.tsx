import { Colors } from "@/constants/Colors";
import { width } from "@/constants/Styles";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Button from "./components/Button";
import Container from "./components/Container";
import CustomTextInput from "./components/CustomTextInput";

const Login = () => {
  const [secure, setSecure] = useState<boolean>(false);

  return (
    <Container>
      <Image
        source={require("../assets/images/bg.png")}
        style={styles.headerimage}
      />
      <View style={styles.container}>
        <Text style={styles.headertext}>Masuk</Text>
        <Text style={styles.greetingstext}>Selamat datang kembali!</Text>
        <View style={styles.inputsection}>
          <CustomTextInput placeholder="E-mail" />
          <CustomTextInput
            placeholder="Kata Sandi"
            secureText
            onPress={() => setSecure(!secure)}
            secure={secure}
          />
          <TouchableOpacity activeOpacity={0.5} style={styles.forgotpassbtn}>
            <Text style={styles.forgotpasstext}>Lupa Kata Sandi?</Text>
          </TouchableOpacity>
        </View>
        <Button title="Masuk" onPress={() => {}} />
      </View>
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginTop: width * 0.5,
    marginHorizontal: width * 0.05,
  },
  headerimage: {
    position: "absolute",
    right: 0,
    width: width * 0.45,
    height: width * 0.4,
    resizeMode: "contain",
    top: -17,
  },
  headertext: {
    fontFamily: "ComicBook",
    fontSize: RFValue(20),
  },
  greetingstext: {
    fontFamily: "InterMedium",
    color: Colors.light.softGrey,
    fontSize: RFValue(14),
    marginTop: width * 0.03,
  },
  inputsection: {
    marginTop: width * 0.07,
  },
  forgotpassbtn: {
    alignSelf: "flex-end",
  },
  forgotpasstext: {
    fontFamily: "InterMedium",
    fontSize: RFValue(10),
    color: Colors.light.leafGreen,
  },
});
