import Container from "@/components/Container";
import Header from "@/components/Header";
import MarkdownDisplay from "@/components/MarkdownDisplay";
import { Colors } from "@/constants/Colors";
import { convertDate, getWords } from "@/constants/Function";
import { width } from "@/constants/Styles";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useArticleDetail } from "@/hooks/useArticleDetail";
import { BASE_URL } from "@/services/api";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
interface PaginationCardProps {
  image: string;
  title: string;
  date: string;
  onPress?: () => void;
}

const PaginationCard: React.FC<PaginationCardProps> = ({
  image,
  title,
  date,
}) => {
  return (
    <View>
      <Image
        style={styles.imgscroll}
        source={{ uri: `${BASE_URL}/${image}` }}
      />
      <Text style={styles.titlecontent}>{title}</Text>
      <Text style={styles.textdate}>{convertDate(date)}</Text>
    </View>
  );
};

const DetailNews = () => {
  const paginationData = useAppSelector((state) => state.session.data);
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
        <View>
          <ScrollView contentContainerStyle={styles.scrollview}>
            <Image style={styles.imgbanner} source={{ uri: imgurl }} />
            <View style={styles.container}>
              <Text style={styles.titletext}>{data?.title}</Text>
              <Text style={styles.date}>{convertDate(data?.date || "")}</Text>
              <MarkdownDisplay>{data?.body}</MarkdownDisplay>
            </View>
            <View style={styles.line} />
            <View style={styles.container}>
              <Text style={styles.titlecontentscroll}>Other Events</Text>
              <FlatList
                data={paginationData?.filter((l) => l?.id !== id)}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                horizontal
                bounces={false}
                renderItem={({ item }) => (
                  <PaginationCard
                    title={item.title}
                    image={item.banner_url}
                    date={item.date}
                  />
                )}
              />
            </View>
          </ScrollView>
        </View>
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
  line: {
    backgroundColor: "#F4F5F5",
    height: width * 0.03,
    width: width,
  },
  scrollview: {
    paddingBottom: width * 0.08,
  },
  imgscroll: {
    height: width * 0.3,
    width: width * 0.48,
    marginRight: width * 0.03,
    borderRadius: 6,
  },
  titlecontentscroll: {
    fontFamily: "InterBold",
    fontSize: RFValue(16),
    marginBottom: width * 0.03,
  },
  titlecontent: {
    fontFamily: "InterMedium",
    fontSize: RFValue(12),
    marginTop: width * 0.03,
  },
  textdate: {
    fontFamily: "InterMedium",
    color: Colors.light.softGrey,
    fontSize: RFValue(11),
  },
});
