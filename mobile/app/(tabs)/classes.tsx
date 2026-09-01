import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import * as WebBrowser from "expo-web-browser"

import { classes, site } from "@/src/config"

export default function ClassesScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.intro}>
        Public classes meet in Edmond. On-site sessions are available for six or more students
        anywhere in Oklahoma.
      </Text>
      {classes.map((item) => (
        <View key={item.title} style={styles.card}>
          <Image source={item.image} style={styles.image} resizeMode="contain" />
          <View style={styles.copy}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>
              {item.price} · {item.duration} in Edmond, OK
            </Text>
            <Text style={styles.body}>{item.description}</Text>
            <Pressable
              style={styles.button}
              onPress={() => WebBrowser.openBrowserAsync(`${site.url}${item.href}`)}
            >
              <Text style={styles.buttonText}>View class details</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F5F6F8" },
  content: { padding: 20, paddingBottom: 40, gap: 16 },
  intro: { color: "#5B6B7C", fontSize: 16, lineHeight: 24 },
  card: { backgroundColor: "#fff", borderRadius: 16, overflow: "hidden" },
  image: { width: "100%", height: 180, backgroundColor: "#fff" },
  copy: { padding: 16, gap: 8 },
  title: { color: "#0B1F3A", fontSize: 22, fontWeight: "800" },
  price: { color: "#C8102E", fontWeight: "700" },
  body: { color: "#5B6B7C", lineHeight: 22 },
  button: {
    marginTop: 8,
    backgroundColor: "#0B1F3A",
    borderRadius: 12,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700" },
})
