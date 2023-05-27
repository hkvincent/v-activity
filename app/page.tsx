import Image from 'next/image'
import MainHeader from './main-header'
import NewsletterRegistration from './component/user/newsletter-registration'
import EventList from './component/events/event-list'
import { getFeaturedEvents } from './helpers/api-util'


export const metadata = {
  title: 'V Home',
  description: 'Home activity',
}


export default async function Home() {

  const featuredEvents = await getFeaturedEvents()
  return (
    <div >
      <NewsletterRegistration />
      <EventList items={featuredEvents} />
    </div>

  )
}
