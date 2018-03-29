import { Reducer } from 'redux';

interface State {}

const initialState: State = {};

const reducers: Reducer<State> = (state = initialState, action) => state;

export { State };
export default reducers;