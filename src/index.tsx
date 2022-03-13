/* Librareis */
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { 
    createStore, 
    Store
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { 
    ThemeProvider, 
    createTheme 
} from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

/* Types */
import { ReduxState } from './types/Redux';

/* Application files */
import App from './components/App';
import reducers from './reducers';

const composer = composeWithDevTools({});
const store: Store<ReduxState> = createStore(reducers, {}, composer());

const theme = createTheme({
    palette: {
        primary: {
            main: deepPurple[400],
        }
    },
    typography: {
        button: {
            margin: '15px 5px',
        }
    }
});

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>,
  
    document.getElementById('root')
);
