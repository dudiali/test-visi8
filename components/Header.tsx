import { width } from "@/constants/Styles";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface HeaderProps {
  title?: string;
  icon?: ReactNode;
  leftIcon?: ReactNode;
  onPressLeft?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title = "title",
  icon,
  leftIcon,
  onPressLeft,
}) => {
  return (
    <View style={styles.container}>
      {icon ? (
        <View style={styles.row}>
          <Text style={styles.title}>{title}</Text>
          <MaterialCommunityIcons name="line-scan" size={20} color="#121A26" />
        </View>
      ) : leftIcon ? (
        <View style={styles.rowleft}>
          <TouchableOpacity onPress={onPressLeft} activeOpacity={0.5}>
            <Entypo
              name="chevron-thin-left"
              size={25}
              color="#121A26"
              style={{ marginRight: width * 0.03 }}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
        </View>
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingVertical: width * 0.04,
    backgroundColor: "white",
    paddingHorizontal: width * 0.04,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
  },
  title: {
    fontFamily: "ComicBook",
    fontSize: RFValue(20),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowleft: {
    flexDirection: "row",
    alignItems: "center",
  },
});
