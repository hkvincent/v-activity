import Button from '../ui/button'
import classes from './results-title.module.css'

function ResultsTitle(props) {
    const { date } = props

    const humanReadableDate = new Date(date).toLocaleDateString('en', {
        month: 'long',
        year: 'numeric',
    })

    return (
        <section className={classes.title}>
            <h1>List Of {humanReadableDate} </h1>
            <Button link='/events'>Check ALL</Button>
        </section>
    )
}

export default ResultsTitle
