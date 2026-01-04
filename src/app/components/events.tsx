"use client"
import EventCard from "./event-card"

interface EventsProps {
  setActiveSection: (section: string) => void
}

export interface Event {
  title: string
  description: string
  image: string
  date: string
  time: string
}

// kg dibolehin pake gambar gereja Pak 
export default function Events({ setActiveSection }: EventsProps) {
  const events: Event[] = [
    {
      title: "Ibadah Umum",
      description: "Join us for our weekly worship service with inspiring messages and uplifting music.",
      image: "img/umum.jpg",
      date: "Every Sunday",
      time: "09:00 AM",
    },
    {
      title: "Kids Of God",
      description: "Fun and engaging programs designed to teach children about God's love.",
      image: "img/kog.jpg",
      date: "Every Sunday",
      time: "09:00 AM",
    },
    {
      title: "Youth Care Community",
      description: "A vibrant community for young people to grow in faith and friendship.",
      image: "img/YCC.jpg",
      date: "Every Saturday",
      time: "06:30 PM",
    },
    {
      title: "Café Cell",
      description: "At Cafe Cell, every cup of coffee accompanies prayers that unite hearts in community.",
      image: "img/cafecell.jpg",
      date: "Monthly",
      time: "06:30 AM",
    },
    {
      title: "Persekutuan Doa",
      description: "Come together in prayer for our church, community, and world.",
      image: "img/doa.jpg",
      date: "Every Friday",
      time: "6:30 PM",
    },
    {
      title: "Big Events",
      description: "Fun and engaging programs designed to serving our local community.",
      image: "img/big.jpg",
      date: "Yearly",
      time: "10:00 AM",
    },
  ]

  return (
    <section id="events" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-blue-800">Church Events</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join us for our regular services and special events as we worship, learn, and grow together in faith.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard key={index} event={event} setActiveSection={setActiveSection} />
          ))}
        </div>
      </div>
    </section>
  )
}
