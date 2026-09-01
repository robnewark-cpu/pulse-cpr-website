import { Linking, Platform, Pressable, ScrollView, StyleSheet, Text } from "react-native"
import * as WebBrowser from "expo-web-browser"

import { site } from "@/src/config"

export default function ContactScreen() {
  const maps = Platform.OS === "ios" ? site.mapsUrl : site.googleMapsUrl

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Edmond classroom</Text>
      <Text style={styles.body}>{site.address}</Text>
      {site.hours.map((item) => (
        <Text key={item.day} style={styles.body}>
          {item.day}: {item.time}
        </Text>
      ))}
      <Pressable style={styles.primary} onPress={() => Linking.openURL(site.phoneHref)}>
        <Text style={styles.primaryText}>Call {site.phone}</Text>
      </Pressable>
      <Pressable style={styles.secondary} onPress={() => Linking.openURL(`mailto:${site.email}`)}>
        <Text style={styles.secondaryText}>Email {site.email}</Text>
      </Pressable>
      <Pressable style={styles.secondary} onPress={() => Linking.openURL(maps)}>
        <Text style={styles.secondaryText}>Open maps</Text>
      </Pressable>
      <Pressable style={styles.secondary} onPress={() => WebBrowser.openBrowserAsync(`${site.url}/book`)}>
        <Text style={styles.secondaryText}>Book on PulseCPROK.com</Text>
      </Pressable>
      <Pressable style={styles.secondary} onPress={() => WebBrowser.openBrowserAsync(site.facebook)}>
        <Text style={styles.secondaryText}>Facebook reviews</Text>
      </Pressable>
      <Pressable style={styles.secondary} onPress={() => WebBrowser.openBrowserAsync(`${site.url}/privacy`)}>
        <Text style={styles.secondaryText}>Privacy policy</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F5F6F8" },
  content: { padding: 20, paddingBottom: 40, gap: 10 },
  title: { color: "#0B1F3A", fontSize: 28, fontWeight: "800" },
  body: { color: "#5B6B7C", fontSize: 16, lineHeight: 24 },
  primary: {
    marginTop: 8,
    backgroundColor: "#C8102E",
    borderRadius: 14,
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
  },
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
  secondaryText: { color: "#0B1F3A", fontWeight: "700" },
})
