import React from 'react';
import { PagesProvider } from './hooks/usePages';
import Temp from './containers/temp';

function App(){

    return(
        <>
            <PagesProvider> 
                <Temp/>
            </PagesProvider>       
        </>
    );
};

export default App;


