import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyToken } from "@/lib/auth"


function isPrismaError(error: unknown): error is { code: string } {
  return typeof error === "object" && error !== null && "code" in error
}


export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }


    const registrations = await prisma.registrationRequest.findMany({
      orderBy: {
        submittedAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        age: true,
        gender: true,
        address: true,
        ministryInterest: true,
        hearAbout: true,
        status: true,
        submittedAt: true,
      },
    })

    return NextResponse.json(registrations)
  } catch (error) {
    console.error("Error fetching registrations:", error)

    if (isPrismaError(error)) {
      if (error.code === "P2025") {
        return NextResponse.json({ error: "Registrations not found" }, { status: 404 })
      }
      if (error.code === "P2003") {
        return NextResponse.json({ error: "Foreign key constraint failed" }, { status:400 })
      }
      if (error.code === "P2002") {
        return NextResponse.json({ error: "Unique constraint failed" }, { status: 400 })
      }
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      email,
      phone,
      age,
      gender,
      address,
      ministry,
      hearAbout,
    }: {
      name: string
      email: string
      phone: string
      age?: number | null
      gender?: string | null
      address?: string | null
      ministry?: string | null
      hearAbout?: string | null
    } = await request.json()

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      )
    }

    const registration = await prisma.registrationRequest.create({
      data: {
        name,
        email,
        phone,
        age: age || null,
        gender: gender || null,
        address: address || null,
        ministryInterest: ministry || null,
        hearAbout: hearAbout || null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        age: true,
        gender: true,
        address: true,
        ministryInterest: true,
        hearAbout: true,
        status: true,
        submittedAt: true,
      },
    })

    return NextResponse.json(registration, { status: 201 })
  } catch (error) {
    console.error("Error creating registration:", error)

    if (isPrismaError(error)) {
      if (error.code === "P2002") {
        return NextResponse.json({ error: "Email or phone already exists" }, { status: 400 })
      }
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}