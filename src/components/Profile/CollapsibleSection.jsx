import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Collapsible from "react-native-collapsible";

// Collapsible section component
const CollapsibleSection = ({
  title,
  count,
  isCollapsed,
  onPress,
  children,
}) => (
  <View style={styles.sectionContainer}>
    <Pressable onPress={onPress}>
      <View style={styles.headerContainer}>
        <Text style={styles.dataHeader}>
          {title} ({count})
        </Text>
        <Icon
          size={18}
          name={isCollapsed ? "chevron-down" : "chevron-up"}
          color="#6F3E37"
        />
      </View>
    </Pressable>
    <Collapsible collapsed={isCollapsed}>{children}</Collapsible>
  </View>
);

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#F4ECE3",
  },
  dataHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6F3E37",
    marginBottom: 10,
  },
});

export default CollapsibleSection;
