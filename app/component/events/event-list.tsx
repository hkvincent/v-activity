import EventItem from './event-item'
import classes from './event-list.module.css'

function EventList(props: { items: any; }) {
  const { items } = props
  return (
    <ul className={classes.list}>
      {items.map((event: { id: any; title: any; location: any; date: any; image: any }) => 
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          location={event.location}
          date={event.date}
          image={event.image}
        />
      )}
    </ul>
  )
}

export default EventList
