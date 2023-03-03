import React, {useState} from 'react'
import { Radio } from 'antd'

export default function RadioTest({value,name ,text,index,lock, mark}:any) {
    // console.log(index,value,name)

    return (
        <div>
            <input type='radio' name={name} id={index} defaultChecked={mark} disabled={lock === true } value={value} />
            <label style={{color:'white'}}>{text}</label>
        </div>
    )
}
