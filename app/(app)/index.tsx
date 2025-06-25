import Container from "@/components/Container";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { convertDate } from "@/constants/Function";
import { width } from "@/constants/Styles";
import { usePaginatedArticles } from "@/hooks/usePaginatedArticles";
import { BASE_URL } from "@/lib/api";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface CardProps {
  image: string;
  title: string;
  date: string;
  onPress?: () => void;
}

const ArticlesCard: React.FC<CardProps> = ({ image, title, date, onPress }) => {
  const img = image
    ? `${BASE_URL}/${image}`
    : "https://www.caspianpolicy.org/no-image.png";
  return (
    <View style={styles.bannersection}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.4}>
        <Image style={styles.imgbanner} source={{ uri: img }} />
      </TouchableOpacity>
      <Text style={styles.titletext}>{title}</Text>
      <Text style={styles.date}>{convertDate(date)}</Text>
    </View>
  );
};

const Home = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = usePaginatedArticles();
  const router = useRouter();
  const allArticles = data?.pages.flat() || [];

  return (
    <Container>
      <Header title="Home Of Events" icon />
      <View style={styles.container}>
        {isLoading && <Text style={styles.loadingtext}>Loading...</Text>}
        <FlatList
          data={allArticles}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ArticlesCard
              onPress={() =>
                router.push({
                  pathname: "/(app)/detail_news",
                  params: { id: item.id },
                })
              }
              image={item.banner_url}
              title={item.title}
              date={item.date}
            />
          )}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          ListFooterComponent={
            isFetchingNextPage ? (
              <Text style={styles.loadingtext}>Memuat lebih banyak...</Text>
            ) : null
          }
        />
      </View>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: width * 0.05,
    // flex: 1,
    // backgroundColor: "red",
    paddingBottom: width * 0.08,
  },
  imgbanner: {
    height: width * 0.6,
    borderRadius: 6,
  },
  titletext: {
    fontFamily: "InterBold",
    fontSize: RFValue(14),
    marginTop: width * 0.03,
  },
  date: {
    fontFamily: "InterMedium",
    fontSize: RFValue(12),
    color: Colors.light.softGrey,
    marginTop: width * 0.02,
  },
  bannersection: {
    marginVertical: width * 0.03,
  },
  loadingtext: {
    fontFamily: "InterMedium",
    fontSize: RFValue(12),
    textAlign: "center",
    // paddingVertical: 12,
    color: Colors.light.softGrey,
    marginTop: width * 0.05,
  },
});
