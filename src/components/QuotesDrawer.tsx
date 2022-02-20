/* Librareis */
import { 
    useSelector as reduxUseSelector, 
    TypedUseSelectorHook, 
    RootStateOrAny 
} from 'react-redux';
import { 
    makeStyles, 
    createStyles 
} from '@material-ui/core/styles';

/* Types */
import { ReduxState } from '../types/Redux';
import { QuoteData } from '../types/quoteData';

/* Application files */
import Quote from './Quote';
import Drawer from '@material-ui/core/Drawer';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles(() =>
    createStyles({
        drawer: {
            width: 'fit-content',
        },
        drawerBackdrop: {
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 20,
        },
    })
);

type Props = {
    show: boolean;
    toggleShow: () => void;
};

const useSelector = reduxUseSelector as TypedUseSelectorHook<ReduxState>;

export function QuotesDrawer({ show, toggleShow }: Props) {

    const classes = useStyles();
    
    const quotes = useSelector((state: RootStateOrAny) => state.quotes);
    const quoteList = quotes.map((quote: QuoteData) => <Quote key={quote.id} quote={quote} showDeleteButton={true} />);

    function preventClose (e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.stopPropagation();
    }

    return (
        <div className={classes.drawer}>
            <Backdrop open={show} onClick={toggleShow} className={classes.drawerBackdrop}>
                <Drawer variant='persistent' anchor='left' open={show} onClick={preventClose}>    
                    {quoteList.length <= 0 ? 'There are no quotes to display' : quoteList}
                </Drawer>   
            </Backdrop>     
        </div>
    );
}

export default QuotesDrawer;
