/* Libraries */
import { useDispatch } from 'react-redux';
import { 
    makeStyles, 
    createStyles 
} from '@material-ui/core/styles';

/* Types */
import { QuoteData } from '../../types/quoteData';

/* Application files */
import { deleteQuote } from '../../actions/quotes';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(() =>
    createStyles({
        quote: {
            display: 'flex',    
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '50vw',
            padding: '15px',
            margin: '5px auto',  
            border: '2px solid rgb(160, 160, 160)',
            borderRadius: '25px',
        },
        placeAndAuthor: {
            textDecoration: 'underline',
            fontStyle: 'italic',
            color: 'rgb(99, 99, 99)',
            display: 'flex',
            justifyContent: 'flex-end',
            maxWidth: '25vw',
            marginRight: '25px',
            marginLeft: 'auto',
            marginTop: '15px',
        },
        quoteText: {
            fontSize: '150%',
            color: 'rgb(99, 99, 99)',
        },
        deleteButton: {
            alignSelf: 'center',
        },
    })
);

type Props = {
    quote: QuoteData;
    showDeleteButton?: boolean;
}

export function Quote(props: Props) {

    const classes = useStyles();
    
    const dispatch = useDispatch();
    const { id, quote, author, place} = props.quote;

    function handleDelete() {
        dispatch(deleteQuote(id));
    }

    return (
        <div className={classes.quote}>
            <p>
                <strong className={classes.quoteText}>{quote}</strong>
                <span className={classes.placeAndAuthor}>{author}</span>
                <span className={classes.placeAndAuthor}>{place}</span>
            </p>
            {props.showDeleteButton && (
                <Button className={classes.deleteButton}
                    variant='contained' 
                    color='primary'
                    onClick={handleDelete}>
                    Delete
                </Button>
            )} 
        </div>
    );
}

export default Quote;
