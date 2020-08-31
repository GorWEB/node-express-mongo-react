import React from "react"
import {Link} from "react-router-dom";

export const LinkList = ({links}) => {
    if(!links.length){
        return <h2 className='center'>Список пока пуст</h2>
    }
    return (
        <table className="striped">
            <thead>
            <tr>
                <th>№</th>
                <th>Оригинальная ссылка</th>
                <th>Сокращенная ссылка</th>
                <th>Открыть</th>
            </tr>
            </thead>

            <tbody>
            {links.map((link,index)=>{
                return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td><Link to={`detail/${link._id}`}>Открыть</Link></td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}