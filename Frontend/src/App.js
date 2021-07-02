import React from 'react';
import { PagesProvider } from './hooks/usePages';
import Temp from './containers/temp';

function App(){

    return(
        <React.Fragment>
            <PagesProvider> 
                <Temp/>
            </PagesProvider>       
        </React.Fragment>
    );
};

export default App;


