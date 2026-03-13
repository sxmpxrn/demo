// src/middleware.ts
import { updateSession } from '@/utils/supabase/middleware'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // 1. อัปเดต Session และดึง Supabase Client
  const { supabase, response } = await updateSession(request)

  // 2. ดึงข้อมูล User (ดึงจาก Auth Session จะเร็วกว่า Query Table โดยตรง)
  const { data: { user } } = await supabase.auth.getUser()
  const { pathname } = request.nextUrl

  // --- ใส่ Logic การ Redirect (ด่านที่ 1-4) ของคุณตรงนี้ ---
  // ... (โค้ดเดิมของคุณ) ...

  return response
}

export const config = {
  matcher: [
    /* * รวมเฉพาะหน้าที่ต้องการเช็คสิทธิ์ 
     * ยกเว้นไฟล์ Static และ API ที่ไม่ต้องการ Middleware
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}