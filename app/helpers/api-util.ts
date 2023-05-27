export async function getAllEvents() {
  const FIREBASE_URL = process.env.NEXT_PUBLIC_FIREBASE_URL;
  const response = await fetch(
    FIREBASE_URL!
  )

  const data = await response.json()

  const events: any = []

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    })
  }
  return events
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents()
  return allEvents.filter((event) => event.isFeatured)
}

export async function getEventById(id: any) {
  const allEvents = await getAllEvents()
  return allEvents.find((event) => event.id === id)
}

export async function getFilteredEvents(dateFilter: { year: any; month: any }) {
  const allEvents = await getAllEvents()
  const { year, month } = dateFilter

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    )
  })

  return filteredEvents
}
