import Container from "@/components/Container";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { convertDate, getWords } from "@/constants/Function";
import { width } from "@/constants/Styles";
import { useArticleDetail } from "@/hooks/useArticleDetail";
import { BASE_URL } from "@/lib/api";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const DetailNews = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, error } = useArticleDetail(id!);
  const string = data?.title ?? "";
  const imgurl = `${BASE_URL}/${data?.image}`;

  return (
    <Container>
      <Header
        onPressLeft={() => router.back()}
        leftIcon
        title={string.length > 24 ? `${getWords(string, 2)}...` : string}
      />
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={Colors.light.leafGreen}
          style={{ marginTop: width * 0.05 }}
        />
      ) : (
        <ScrollView>
          <Image style={styles.imgbanner} source={{ uri: imgurl }} />
          <View style={styles.container}>
            <Text style={styles.titletext}>{data?.title}</Text>
            <Text style={styles.date}>{convertDate(data?.date || "")}</Text>
            <Text style={styles.contenttext}>{data?.body}</Text>
          </View>
        </ScrollView>
      )}
    </Container>
  );
};

export default DetailNews;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: width * 0.05,
    paddingBottom: width * 0.08,
    marginTop: width * 0.05,
  },
  imgbanner: {
    height: width * 0.7,
  },
  titletext: {
    fontFamily: "InterBold",
    fontSize: RFValue(14),
    marginTop: width * 0.03,
  },
  contenttext: {
    fontFamily: "InterRegular",
    color: Colors.light.softGrey,
    fontSize: RFValue(12),
    marginTop: width * 0.03,
  },
  date: {
    fontFamily: "InterMedium",
    fontSize: RFValue(13),
    color: Colors.light.softGrey,
    marginVertical: width * 0.02,
  },
});
