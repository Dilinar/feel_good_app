/* Libraries */
import { useState } from 'react';
import { 
    makeStyles, 
    Theme 
} from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

/* Application files */ 
import { addQuote } from '../actions/quotes';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) => ({
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    textField: {
        '& label.Mui-focused': {
            color: 'rgb(7, 104, 4)',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'rgb(7, 104, 4)',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'rgb(160, 160, 160)',
            },
            '&:hover fieldset': {
                borderColor: 'black',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'rgb(7, 104, 4)',
            },
        },
        marginBottom: '15px',
    },
    submitButton: {
        display: 'block',
        margin: '5px auto 10px'
    }
}));

export function AddQuote()  {

    const classes = useStyles();
    
    const dispatch = useDispatch();
    const [ form, setForm ] = useState({
        quote: '',
        author: '',
        place: '',
    });

    function handleInputChange(name: string) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setForm({
                ...form,
                [name]: e.target.value
            });
        };
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();  

        dispatch(addQuote({quote:form.quote, author:form.author, place:form.place}));
        setForm({
            quote: '',
            author: '', 
            place: '',
        });
    }

    return (
        <div className='addQuote'>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField className={classes.textField}
                    id='outlined-basic' 
                    label='quote' 
                    variant='outlined' 
                    type='text' 
                    value={form.quote} 
                    onChange={handleInputChange('quote')}
                />
    
                <TextField className={classes.textField}
                    id='outlined-basic' 
                    label='author' 
                    variant='outlined' 
                    type='text' 
                    value={form.author} 
                    onChange={handleInputChange('author')}
                />

                <TextField className={classes.textField}
                    id='outlined-basic' 
                    label='place' 
                    variant='outlined' 
                    type='text' 
                    value={form.place} 
                    onChange={handleInputChange('place')}
                />
                {!form.quote ?
                    <Button className={classes.submitButton}
                        disabled
                        variant='contained' 
                        color='primary'>
                        Add quote
                    </Button> :
                    <Button className={classes.submitButton}
                        variant='contained' 
                        color='primary'
                        type='submit'>
                        Add quote
                    </Button>
                }
            </form>
        </div>
    );
}

export default AddQuote;
