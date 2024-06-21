import { colors } from "@/assets/styles";
import { View, Text, StyleSheet } from "react-native";

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }) => {
  return (
    <View className={containerStyles}>
      <Text style={styles.textTitle}>
        {title}
      </Text>
      <Text style={styles.textSubtitle}>
        {subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    color: colors.White,
    textAlign: 'center',
    fontWeight: 400,
  },
   textSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.Gray,
    textAlign: 'center',
   }
})
export default InfoBox;