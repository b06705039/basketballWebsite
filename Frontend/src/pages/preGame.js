
import React from 'react'
import PreGameDiv from '../containers/preGameDiv'
import PreGameProvider from '../hooks/usePreGame'

const PreGame = () => {
    
    return(
        <PreGameProvider>
            <PreGameDiv />
        </PreGameProvider>
    )
}


export default PreGame