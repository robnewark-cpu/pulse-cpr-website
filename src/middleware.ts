import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAdmin = pathname.startsWith("/admin")
  const isAdminApi = pathname.startsWith("/api/admin")
  if (!isAdmin && !isAdminApi) {
    return NextResponse.next()
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    if (pathname === "/admin/login") return NextResponse.next()
    if (isAdminApi) {
      return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 })
    }
    const login = new URL("/admin/login", request.url)
    return NextResponse.redirect(login)
  }

  let response = NextResponse.next({ request })
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options)
        })
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (pathname === "/admin/login") {
    return response
  }

  if (!user) {
    if (isAdminApi) {
      return NextResponse.json({ error: "Sign in required" }, { status: 401 })
    }
    const login = new URL("/admin/login", request.url)
    login.searchParams.set("next", pathname)
    return NextResponse.redirect(login)
  }

  return response
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
