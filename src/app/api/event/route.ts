import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyToken } from "@/lib/auth"


export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("auth-token")?.value
        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const events = await prisma.event.findMany({
            orderBy: { eventDate: "asc" },
            select: {
                id: true,
                title: true,
                description: true,
                eventDate: true,
                eventTime: true,
                location: true,
                eventType: true,
                createdAt: true,
            },
        })

        return NextResponse.json(events)
    } catch (error) {
        console.error("Error fetching events:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}


export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get("auth-token")?.value
        const user = verifyToken(token || "")
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { title, description, date, time, location, type } = await request.json()

        if (!title || !date || !time) {
            return NextResponse.json({ error: "Title, date, and time are required" }, { status: 400 })
        }

        const fullDateTime = new Date(`${date}T${time}:00`);

        if (isNaN(fullDateTime.getTime())) {
            return NextResponse.json({ error: "Invalid date or time format" }, { status: 400 });
        }

        const event = await prisma.event.create({
            data: {
                title,
                description: description || null,
                eventDate: new Date(date),      
                eventTime: fullDateTime,        
                location: location || null,
                eventType: type || "Service",
                createdById: user.id,
            },
        })

        return NextResponse.json(event, { status: 201 })
    } catch (error) {
        console.error("Error creating event:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}