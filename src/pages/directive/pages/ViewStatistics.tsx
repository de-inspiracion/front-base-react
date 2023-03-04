import React,{useEffect,useState} from 'react'
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import http from '../../../services/http';
import { Button } from "antd";
import { message } from 'antd';
import * as XLSX from 'xlsx';
import { useSelector } from "react-redux";
import { EyeOutlined } from '@ant-design/icons';

const ViewStatistics = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [columns,setColumns] = useState<any>([])
    const [rows,setRows] = useState<any>([])
    const [disableDownloadStatistics,setDisableDownloadStatistics] = useState(false)
    const userInfo = useSelector((state: any) => state.userInfo);
    const directives = userInfo.profile === 'directiva' ? [userInfo.directive.name] : []
    const [showCourses,setShowCourses] = useState(false)

    useEffect( () => {
        const getData = async ()=>{
            const data = await http.getGeneralStatistics(directives)
            const row_ = []
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                element['key'] = (i+1).toString()
                row_.push(element)
            }
            setRows(row_)
            const cols = Object.keys(data[0])
            const columns:any = []
            for (let i = 0; i < cols.length; i++) {
                const element = cols[i];
                let $:any = {
                        title:element,
                        dataIndex: element,
                        key: element,
                        
                    }
                if (element === 'coursesNames') {
                    $.title = <div
                        style={{display:'flex',gap:20}}
                        onClick={()=>{
                            setShowCourses(prev => !prev)
                            messageApi.open({
                                type: 'loading',
                                content: 'Cargando ...',
                                duration: 0,
                              });
                            setTimeout(messageApi.destroy, 1000);
                            }}>
                        {element} 
                        <EyeOutlined style = {{fontSize:20}}/>
                    </div>,
                    $.render = (i_:any,{coursesNames}:any)=>{
                        return (
                        <>
                        {!showCourses && coursesNames.length > 0 &&
                            <Tag  key={''}>
                                ...
                            </Tag>
                        }
                        {showCourses &&
                        <div style = {{display:'flex',flexDirection:'column',gap:5}}>
                            {coursesNames.map((name:string) => {
                            return (
                                <Tag color={'green'} key={i_}>
                                    {name}
                                </Tag>
                            );
                            })}
                        </div>
                        }

                        </>
                        )
                    }
                }
                columns.push($)
            }
            console.log(columns)
            setColumns(columns)
        }
        getData()
        
    }, [showCourses])
    
    const generateStatisticsFile = async ()=>{
        setDisableDownloadStatistics(true)
        messageApi.open({
          type: 'loading',
          content: 'Generando Archivo ...',
          duration: 0,
        });
        const data = await http.getGeneralStatistics(directives)
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const fileName = "generalStatistics"
        const sheet = XLSX.utils.json_to_sheet(data);
        const sheets_names = ['data']
        const wb = { Sheets: {'data':sheet} , SheetNames: sheets_names };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data_ = new Blob([excelBuffer], {type: fileType});
        let csvURL = window.URL.createObjectURL(data_);
        let tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', `${fileName}${fileExtension}`);
        tempLink.click();
        setTimeout(messageApi.destroy, 0);
        setDisableDownloadStatistics(false)
      }

    return (
        
    <div style = {{marginTop:20,display:'flex',gap:10,flexDirection:'column',margin:20}}>
        {contextHolder}
        <Button 
            style={{width:'fit-content'}}
            disabled = {disableDownloadStatistics}
            onClick={generateStatisticsFile}>
          Descargar Estadísticas
        </Button>
        
        <Table style={{lineBreak:'auto',whiteSpace:'normal'}} columns={columns} dataSource={rows} />
    </div>
    )
}

export default ViewStatistics