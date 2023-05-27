import { Fragment, useEffect, useState } from 'react'
// import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { getFilteredEvents } from '../../helpers/api-util'
import EventList from '@/app/component/events/event-list'
import Button from '@/app/component/ui/button'
import ErrorAlert from '@/app/component/ui/error-alert'
import ResultsTitle from '@/app/component/events/result-title'
import { Metadata } from 'next'

// export const metadata: Metadata = {
//     title: 'filtered events',
//     description: 'find a lot of great events that allow you to evolve...',
// }

export async function generateMetadata({ params }) {
    const filteredYear = params.slug[0]
    const filteredMonth = params.slug[1]
    const numYear = +filteredYear
    const numMonth = +filteredMonth
    return {
        title: `filtered events: ${numYear}-${numMonth}`,
        description: `activity: ${numYear}-${numMonth}`,
    };
}


async function getEvents() {
    const res = await fetch(process.env.NEXT_PUBLIC_FIREBASE_URL || "");
    const data = await res.json();
    const events: any = [];
    for (const key in data) {
        events.push({
            id: key,
            ...data[key],
        });
    }
    return events;
}



const FilteredEventPage = async ({ params }) => {

    const loadedEvents = await getEvents();
    // const [loadedEvents, setLoadedEvent] = useState<any>()

    // const { data, error } = useSWR(
    //     process.env.FIREBASE_URL || ""
    // )

    // useEffect(() => {

    //     if (data) {
    //         const events = []

    //         for (const key in data) {
    //             events.push({
    //                 id: key,
    //                 ...data[key],
    //             })
    //         }
    //         setLoadedEvent(events)
    //     }
    // }, [data])

    if (!loadedEvents) {
        return (
            <Fragment>
                <p className='center'>Loading...</p>
            </Fragment>
        )
    }
    //处理捕获的路由参数
    const filteredYear = params.slug[0]
    const filteredMonth = params.slug[1]

    const numYear = +filteredYear
    const numMonth = +filteredMonth

    //    const pageHeadData = (
    //         <Head>
    //             <title>activity</title>
    //             <meta
    //                 name='description'
    //                 content={`activity: ${numYear}-${numMonth}`}
    //             ></meta>
    //         </Head>
    //     )


    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2022 ||
        numYear < 2021 ||
        numMonth > 12 ||
        numMonth < 1
    ) {
        return (
            <Fragment>
                {/* {pageHeadData} */}
                <ErrorAlert>
                    <p>invaild</p>
                </ErrorAlert>

                <div className='center'>
                    <Button link='/events'>check all</Button>
                </div>
            </Fragment>
        )
    }

    const filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date)
        return (
            eventDate.getFullYear() === numYear &&
            eventDate.getMonth() === numMonth - 1
        )
    })

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                {/* {pageHeadData} */}
                <ErrorAlert>
                    <p>can not find any activity</p>
                </ErrorAlert>

                <div className='center'>
                    <Button link='/events'>check all</Button>
                </div>
            </Fragment>
        )
    }


    const date = new Date(numYear, numMonth - 1)
    return (
        <div>
            {/* {pageHeadData} */}
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </div>
    )
}

export default FilteredEventPage
