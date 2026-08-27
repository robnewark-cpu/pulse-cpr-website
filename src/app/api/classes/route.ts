import { NextResponse } from "next/server"
import { listPublicClasses } from "@/lib/tms/queries"

export async function GET() {
  try {
    const classes = await listPublicClasses()
    return NextResponse.json({ classes })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load classes" },
      { status: 500 }
    )
  }
}
