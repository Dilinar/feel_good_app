/* Libraries */
import { useState } from 'react';
import { 
    useSelector as reduxUseSelector, 
    TypedUseSelectorHook,
    RootStateOrAny,
    useDispatch
} from 'react-redux';
import { 
    makeStyles, 
    createStyles 
} from '@material-ui/core/styles';

/* Types */
import { ReduxState } from '../types/Redux';

/* Application files */
import Quote from './Quote';
import { deleteQuote } from '../actions/quotes';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: 'fit-content',
            margin: '15px auto',
            minHeight: '500px',
            textAlign: 'center',
        },
    })
);

const useSelector = reduxUseSelector as TypedUseSelectorHook<ReduxState>;
  
export function DrawQuote() {
  
    const classes = useStyles();
    
    const dispatch = useDispatch();
    const quotes = useSelector((state: RootStateOrAny) => state.quotes);
    const [ displayId, setDisplayId ] = useState(null);
    const displayQuote = quotes.find((quote: { id: string; }) => quote.id === displayId);

    if(displayId && !displayQuote) {
        setDisplayId(null);
    }

    function handleGenerate() {
        const index = (Math.floor(Math.random() * quotes.length));
        const display = quotes.find((quote: string | string[]) => quotes.indexOf(quote) === index);
        const id = display.id;
        setDisplayId(id);
        if(id === displayId) {
            handleGenerate();
        }
    }

    function handleDelete() {
        dispatch(deleteQuote(displayId));
        setDisplayId(null);
    }
    
    return (
        <div className={classes.root}>
            {quotes.length === 1 && displayId || quotes.length === 0 && !displayId ?
                <Button 
                    disabled
                    variant='contained' 
                    color='primary'>
                    Draw a quote
                </Button> :  
                <Button 
                    variant='contained' 
                    color='primary'
                    onClick={handleGenerate}>
                    Draw a quote
                </Button>
            }

            {!displayId ? 
                <Button 
                    disabled
                    variant='contained' 
                    color='primary'>
                    Delete quote
                </Button> :
                <Button 
                    variant='contained' 
                    color='primary'
                    onClick={handleDelete}>
                    Delete quote
                </Button>
            }
            {quotes.length > 0 && displayId !== null && <Quote quote={displayQuote} />}
            {quotes.length > 0 && displayId === null && <p>No quote drawn</p>}
            {quotes.length === 0 && <p>There are no quotes to display</p>}
        </div>
    );
}

export default DrawQuote;
