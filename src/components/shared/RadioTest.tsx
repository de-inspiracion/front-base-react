import React, {useState} from 'react'
import { Radio } from 'antd'

export default function RadioTest({value ,text,index,lock, mark}:any) {
    console.log(`Index: ${index} , Mark: ${mark}, Disable : ${lock}`)
    // const [marca, setMark] = useState(mark)
    return (
        <div>
            <input type='radio' id={index} defaultChecked={mark} disabled={lock === true } value={value} />
            <label style={{color:'white'}}>{text}</label>
        </div>
    )
}
