

import { legacy_createStore as createStore} from 'redux'
import { Store } from 'redux';
import reducer from './reducer';

const store: Store = createStore(reducer);

export default store;


