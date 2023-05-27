import { Fragment } from 'react'
import Head from 'next/head'
import { getEventById, getFeaturedEvents } from '../../helpers/api-util'
import Comments from '../../component/comment/comments'
import EventContent from '../../component/event-detail/event-content'
import EventSummary from '../../component/event-detail/event-summary'
import EventLogistics from '../../component/event-detail/event-logistics'

export async function generateStaticParams() {
    const events: any = await getFeaturedEvents();
    return events.map((event) => ({ eventId: event.id }));
}

async function getEvent(params) {
    const event = await getEventById(params.eventId);
    return event;
}

export default async function EventDetailPage({ params }) {
    const event: any = await getEvent(params);

    if (!event) {
        return (
            <div className='center'>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <Fragment>
            <Head>
                <title>{event.title}</title>
                <meta name='description' content={event.description}></meta>
            </Head>
            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
            <Comments eventId={event.id} />
        </Fragment>
    )
}