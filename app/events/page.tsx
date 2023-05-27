'use client';
import { getAllEvents } from '../helpers/api-util'
import { useRouter } from 'next/navigation';
import Head from 'next/head'

import { Fragment } from 'react'
import EventList from '../component/events/event-list'
import EventsSearch from '../component/comment/events-search'

async function AllEventsPage(props) {

  const router = useRouter()

  const events = await getAllEvents()

  function findEventsHandler(year: any, month: any) {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath)
  }

  return (
    <Fragment>
      <Head>
        <title>ALL</title>
        <meta
          name='description'
          content='find a lot of great events that allow you to evolve...'
        ></meta>
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  )
}

export default AllEventsPage

// export async function getStaticProps() {
//   const events = await getAllEvents()

//   return {
//     props: {
//       events: events,
//     },
//     revalidate: 60,
//   }
// }
