import { useCallback, useEffect, useState } from "react"
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native"
import * as WebBrowser from "expo-web-browser"

import { site } from "@/src/config"
import { formatClassDate, formatPrice, formatTimeRange } from "@/src/format"

type ClassSession = {
  id: string
  name: string
  class_date: string
  start_time: string
  end_time: string
  location: string
  price: number
  seats_remaining: number
}

export default function ScheduleScreen() {
  const [sessions, setSessions] = useState<ClassSession[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    setError("")
    try {
      const response = await fetch(`${site.url}/api/classes`)
      const data = (await response.json()) as { classes?: ClassSession[]; error?: string }
      if (!response.ok) throw new Error(data.error || "Could not load classes")
      setSessions(data.classes ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load classes")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
    >
      <Text style={styles.intro}>
        Open seats from the Pulse CPR class calendar. Book from here or call {site.phone}.
      </Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {!loading && !error && sessions.length === 0 ? (
        <Text style={styles.muted}>
          No public dates are posted yet. Call {site.phone} or request a custom date.
        </Text>
      ) : null}
      {sessions.map((session) => (
        <View key={session.id} style={styles.card}>
          <Text style={styles.title}>{session.name}</Text>
          <Text style={styles.meta}>
            {formatClassDate(session.class_date)} · {formatTimeRange(session.start_time, session.end_time)}
          </Text>
          <Text style={styles.meta}>{session.location}</Text>
          <Text style={styles.price}>
            {formatPrice(session.price)} · {session.seats_remaining} seats left
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => WebBrowser.openBrowserAsync(`${site.url}/register/${session.id}`)}
          >
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
        </View>
      ))}
      <Pressable style={styles.ghost} onPress={() => WebBrowser.openBrowserAsync(`${site.url}/book`)}>
        <Text style={styles.ghostText}>Request a custom date</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F5F6F8" },
  content: { padding: 20, paddingBottom: 40, gap: 12 },
  intro: { color: "#5B6B7C", fontSize: 16, lineHeight: 24 },
  muted: { color: "#5B6B7C" },
  error: { color: "#C8102E" },
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 16, gap: 6 },
  title: { color: "#0B1F3A", fontSize: 18, fontWeight: "700" },
  meta: { color: "#5B6B7C" },
  price: { color: "#C8102E", fontWeight: "700" },
  button: {
    marginTop: 8,
    backgroundColor: "#C8102E",
    borderRadius: 12,
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700" },
  ghost: { minHeight: 48, alignItems: "center", justifyContent: "center" },
  ghostText: { color: "#0B1F3A", fontWeight: "700" },
})
