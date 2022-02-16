/* Libraries */
import { useState } from 'react';
import { 
    makeStyles, 
    createStyles 
} from '@material-ui/core/styles';

/* Application files */
import AddQuote from './components/AddQuote';
import DrawQuote from './components/DrawQuote';
import QuotesDrawer from './components/QuotesDrawer';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(() =>
    createStyles({
        app: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '90vh',
            width: '100vw',
        },
        drawerButton: {
            width: 'fit-content',
            borderRadius: '0 25px 25px 0',
            alignSelf: 'flex-start',
            marginLeft: '0',    
        },
        title: {
            fontSize: '300%',
            color: 'rgb(99, 99, 99)',
            textAlign: 'center',
        },
    })
);

export function App() {

    const classes = useStyles();

    const [ drawerOpen, setDrawerOpen ] = useState(false);

    function toggleMenu () {
        setDrawerOpen(!drawerOpen);
    }

    return (
        <div className={classes.app}>
            <h1 className={classes.title}>
                Feel Good
            </h1>
            <AddQuote />
            <DrawQuote />
            <QuotesDrawer 
                show={drawerOpen}
                toggleShow={toggleMenu}
            />
            <Button className={classes.drawerButton}
                variant='contained' 
                color='primary'
                onClick={toggleMenu}>
                {'>'}
            </Button>
        </div>
    );
}

export default App;
