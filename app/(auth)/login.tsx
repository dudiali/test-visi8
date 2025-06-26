import Button from "@/components/Button";
import Container from "@/components/Container";
import CustomTextInput from "@/components/CustomTextInput";
import { Colors } from "@/constants/Colors";
import { width } from "@/constants/Styles";
import { useAuth } from "@/hooks/useAuth";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const Login = () => {
  const {
    signIn,
    isLoading,
    error,
    setError,
    email,
    setEmail,
    password,
    setPassword,
    secure,
    setSecure,
  } = useAuth();

  return (
    <Container>
      <Image
        source={require("../../assets/images/bg.png")}
        style={styles.headerimage}
      />
      <View style={styles.container}>
        <Text style={styles.headertext}>Masuk</Text>
        <Text style={styles.greetingstext}>Selamat datang kembali!</Text>
        <View style={styles.inputsection}>
          <CustomTextInput
            placeholder="E-mail"
            onError={error}
            onChangeText={(e: string) => {
              setEmail(e);
              setError("");
            }}
            value={email}
          />
          <CustomTextInput
            placeholder="Kata Sandi"
            secureText
            onPress={() => setSecure(!secure)}
            secure={secure}
            onError={error}
            onChangeText={(e: string) => {
              setPassword(e);
              setError("");
            }}
            value={password}
          />
          <TouchableOpacity activeOpacity={0.5} style={styles.forgotpassbtn}>
            <Text style={styles.forgotpasstext}>Lupa Kata Sandi?</Text>
          </TouchableOpacity>
        </View>
        <Button loading={isLoading} title="Masuk" onPress={() => signIn()} />
        <View style={styles.acctextsection}>
          <Text style={styles.confirmationtext}>Belum punya akun? </Text>
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={styles.createacctext}>Buat Akun</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowsection}>
          <View style={styles.line} />
          <Text style={styles.rowtext}>atau</Text>
          <View style={styles.line} />
        </View>
        <Button paddingVertical={width * 0.033} onPress={() => {}} outline>
          <View style={styles.btnregister}>
            <Image
              style={styles.googleicon}
              source={require("../../assets/images/google_icon.png")}
            />
            <Text style={styles.googletext}>Google</Text>
          </View>
        </Button>
        <TouchableOpacity style={styles.bottomtextbtn} activeOpacity={0.5}>
          <Text style={styles.bottomtext}>
            Lewati, langsung lihat daftar komik
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginTop: width * 0.5,
    marginHorizontal: width * 0.05,
    flex: 1,
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
  acctextsection: {
    flexDirection: "row",
    alignSelf: "center",
  },
  confirmationtext: {
    fontFamily: "InterRegular",
    fontSize: RFValue(12),
    color: Colors.light.softGrey,
  },
  createacctext: {
    fontFamily: "InterRegular",
    fontSize: RFValue(12),
    color: Colors.light.leafGreen,
  },
  line: {
    backgroundColor: Colors.light.gray,
    height: width * 0.001,
    flex: 1,
  },
  rowsection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: width * 0.05,
    marginBottom: width * 0.01,
  },
  rowtext: {
    fontFamily: "InterRegular",
    fontSize: RFValue(12),
    color: Colors.light.softGrey,
    marginHorizontal: width * 0.03,
  },
  googleicon: {
    width: width * 0.06,
    height: width * 0.06,
  },
  btnregister: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  googletext: {
    color: Colors.light.text,
    fontFamily: "InterBold",
    fontSize: RFValue(13),
    marginLeft: width * 0.02,
  },
  bottomtext: {
    fontFamily: "InterBold",
    color: Colors.light.leafGreen,
    fontSize: RFValue(12),
  },
  bottomtextbtn: {
    alignSelf: "center",
    bottom: Platform.OS === "ios" ? 0 : width * 0.13,
    position: "absolute",
    borderBottomWidth: 1,
    borderColor: Colors.light.leafGreen,
    borderStyle: "solid",
  },
});
