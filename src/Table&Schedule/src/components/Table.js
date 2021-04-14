import React from "react";
export default ({ columns, object}) => (
    <table className="input-table">
        <tr>
            <td> </td>
            {columns.map(col => <td>{col}</td>)}
        </tr>
        {
            Object.keys(object).map(index =>
                <tr>
                    <td>{index}</td>
                    {object[index].map(cell => <td>{cell}</td>)}
                </tr>
            )
        }
    </table>
)
