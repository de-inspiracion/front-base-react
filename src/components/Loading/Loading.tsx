import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { Modal } from 'antd';

interface LoadingParams{
    text:string,
    open:boolean,
    indicator?:any
}

const Loading = (props:LoadingParams) => {
  return (
    <Modal title = {props.text} open={props.open} footer={null} closable = {false} zIndex={2000}>
        <Spin style={{ width: '100%' }} size="large"
        indicator={ props.indicator || <LoadingOutlined style={{ fontSize: 60 }} spin />}></Spin>
    </Modal>
  )
}

export default Loading