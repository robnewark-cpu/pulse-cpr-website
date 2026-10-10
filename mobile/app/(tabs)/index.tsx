import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { Link, useRouter } from "expo-router"
import * as WebBrowser from "expo-web-browser"

import { classes, site } from "@/src/config"

export default function HomeScreen() {
  const router = useRouter()

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>{site.tagline}</Text>
      <Text style={styles.title}>Learn CPR. Save lives.</Text>
      <Text style={styles.body}>
        Heartsaver, Basic Life Support, AED, and First Aid classes in Edmond, Oklahoma, plus on-site
        training across the state. Taught by Christine Oldenburg, RN.
      </Text>
      <View style={styles.row}>
        <Pressable style={styles.primary} onPress={() => WebBrowser.openBrowserAsync(`${site.url}/book`)}>
          <Text style={styles.primaryText}>Book a class</Text>
        </Pressable>
        <Pressable style={styles.secondary} onPress={() => Linking.openURL(site.phoneHref)}>
          <Text style={styles.secondaryText}>Call {site.phone}</Text>
        </Pressable>
      </View>
      {classes.map((item) => (
        <Pressable key={item.title} style={styles.card} onPress={() => router.push("/classes")}>
          <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
          <View style={styles.cardCopy}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.price}>
              {item.price} · {item.duration}
            </Text>
          </View>
        </Pressable>
      ))}
      <Link href="/modal" asChild>
        <Pressable style={styles.instructor}>
          <Image
            source={require("../../assets/images/christine-oldenburg.jpg")}
            style={styles.portrait}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Meet your instructor</Text>
            <Text style={styles.body}>Christine Oldenburg, RN · American Heart Association Instructor</Text>
          </View>
        </Pressable>
      </Link>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F5F6F8" },
  content: { padding: 20, paddingBottom: 40, gap: 12 },
  kicker: { color: "#C8102E", fontWeight: "700", letterSpacing: 1, textTransform: "uppercase" },
  title: { color: "#0B1F3A", fontSize: 32, fontWeight: "800" },
  body: { color: "#5B6B7C", fontSize: 16, lineHeight: 24 },
  row: { gap: 10, marginVertical: 8 },
  primary: { backgroundColor: "#C8102E", borderRadius: 14, minHeight: 52, alignItems: "center", justifyContent: "center" },
  primaryText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  secondary: {
    backgroundColor: "#fff",
    borderRadius: 14,
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#0B1F3A22",
  },
  secondaryText: { color: "#0B1F3A", fontWeight: "700", fontSize: 16 },
  card: { backgroundColor: "#fff", borderRadius: 16, overflow: "hidden" },
  cardImage: { width: "100%", height: 160, backgroundColor: "#fff" },
  cardCopy: { padding: 14 },
  cardTitle: { color: "#0B1F3A", fontSize: 18, fontWeight: "700" },
  price: { color: "#C8102E", fontWeight: "700", marginTop: 4 },
  instructor: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  portrait: { width: 72, height: 96, borderRadius: 10 },
})
