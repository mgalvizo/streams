// create and export browser history object, overriding the default of BrowserRouter creating the object itself,
// this is necessary to implement programmatic navigation from an action creator.
import { createBrowserHistory } from 'history';
export default createBrowserHistory();
