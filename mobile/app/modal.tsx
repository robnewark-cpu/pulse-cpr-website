import { Image, ScrollView, StyleSheet, Text } from "react-native"

export default function InstructorModal() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Image
        source={require("../assets/images/christine-oldenburg.jpg")}
        style={styles.photo}
        resizeMode="cover"
      />
      <Text style={styles.title}>Christine Oldenburg, RN</Text>
      <Text style={styles.role}>Founder and Lead Instructor</Text>
      <Text style={styles.body}>
        Christine Oldenburg, RN, is the founder and lead instructor of Pulse CPR. With more than 24
        years of nursing experience and clinical work in emergency, critical care, telemetry, and
        hospital nursing, she teaches Heartsaver, Basic Life Support, AED, and First Aid as an
        American Heart Association Instructor.
      </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 20, gap: 10, paddingBottom: 40 },
  photo: { width: "100%", height: 360, borderRadius: 16 },
  title: { color: "#0B1F3A", fontSize: 24, fontWeight: "800" },
  role: { color: "#C8102E", fontWeight: "700" },
  body: { color: "#5B6B7C", fontSize: 16, lineHeight: 24 },
})
