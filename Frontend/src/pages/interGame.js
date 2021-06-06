import React from 'react'
import InterGameDiv from '../containers/interGameDiv'



const InterGame = () => {
    return(
        <div className="ant-layout-content" style={{ height: '1000px'}}>
            <div className="site-layout-content" style={{ padding: '0 50px'}}>
                <InterGameDiv />
            </div>
        </div>
    )
}


export default InterGame