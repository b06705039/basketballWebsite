import React, { useState } from 'react'

const PreGameData = [
    {
        key: '1',
        team: 'IM',
        session: '--'
    },
    {
        key: '2',
        team: 'Fin',
        session: '--'
    },
    {
        key: '3',
        team: 'ME',
        session: '--'
    },
];



const useData = () => {

    const [ preGameData, setPreGameData ] = useState(PreGameData)




    return {
        preGameData,
        setPreGameData
    }
}

  
  
export default useData