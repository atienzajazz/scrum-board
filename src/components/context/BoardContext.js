import React, { useReducer, useContext } from 'react';
import { actions, initialState, reducer } from './boardReducer';

const boardContext = React.createContext({
    state: {},
    dispatch: () => { },
    actions: {}
});

const BoardContext = React.memo(({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    React.useEffect(() => {
        actions.initialize()(dispatch);
        actions.setDataState()(dispatch);
    }, []);
    return (
        <boardContext.Provider value={{
            state, dispatch, actions: actions
        }}
        >
            {children}
        </boardContext.Provider>
    );
});


export const useBoardContext = () => useContext(boardContext);
export default BoardContext;

// Reference for async Reucer + Context implementation
// https://davidlozzi.com/2021/02/08/enhancing-reducer-actions-in-react-context/