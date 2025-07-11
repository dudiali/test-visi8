import { BASE_URL } from "@/services/api";
import React, { PropsWithChildren, useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import Markdown from "react-native-markdown-display";

const MarkdownDisplay = ({ children }: PropsWithChildren) => {
  const ProcessedContent = useMemo(() => {
    if (typeof children !== "string") return children;

    return children.replace(
      /!\[([^\]]*)\]\(\.\.\/images\/([^)]+)\)/g,
      `![$1](${BASE_URL}/images/$2)`
    );
  }, [children]);

  return (
    <ScrollView style={styles.page} contentInsetAdjustmentBehavior="automatic">
      <Markdown style={markdownStyles}>{ProcessedContent}</Markdown>
    </ScrollView>
  );
};

const markdownStyles = StyleSheet.create({
  heading1: {
    fontFamily: "InterBlack",
    color: "#212020",
    marginTop: 15,
    marginBottom: 10,

    lineHeight: 40,
  },
  heading2: {
    fontFamily: "InterBold",
    color: "#404040",

    marginTop: 10,
    marginBottom: 5,
    lineHeight: 30,
  },
  body: {
    fontSize: 16,
    // fontFamily: 'Inter',
    lineHeight: 24,
  },
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
    borderRadius: 10,
  },
});

export default MarkdownDisplay;
