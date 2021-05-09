import React from 'react';
import {ContextProvider} from './data/context';
import Temp from './containers/temp';

function App(){

    return(
        <>
            <ContextProvider> 
                <Temp/>
            </ContextProvider>       
        </>
    );
};

export default App;


