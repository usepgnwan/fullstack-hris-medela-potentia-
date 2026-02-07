import React, { useEffect, useState } from "react"; 
import Platform from "../layouts/Platform";
import { Button, Tabs } from "antd";
import { LogoutOutlined,ClockCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import api from "../utils/api";
import { authService } from "../services/authService";
import NotReady from "../components/NotReady";
import CardAbsensi from "../components/CardAbsensi";
import { Absensi } from "../../../server/interface";

export default function History(){
    
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState<Number>(1);
    const user = authService.getCurrentUser(); 
    const [loading, setloading] = useState(false);
    const [data, setdata] = useState<Absensi[]>([]); 
    const getAbsenToday = async (page:number, tab?:number ) =>{ 
        const id = user.id;
        let params = {} 
        if (tab == 1){
             params = {
                        params: {
                            karyawanID: id 
                        }
                    }
        }else{
            params = {}
        }
        const data = await api.get(`/absensi?limit=5&page=${page}`,params);
        if(page == 1){
            setdata((prev:any) => [  ...data.data.data ]);
       }else{
           setdata((prev:any) => [...prev, ...data.data.data ]);
       } 
       setHasMore(data.data.data.length>0)
    }
    
    const [activetab, setactivetab] = useState<string>("1")
    useEffect(()=>{
        (async()=>{
            setloading(true)
            await getAbsenToday(1,Number(activetab)).then((v)=>{
              
                setloading(false)
            }).finally(()=>{
                setloading(false);
            })
        })()
    },[activetab])
    const loadMore =async () => {
        const nextPage = Number(page) + 1;
        setPage(nextPage);
        await getAbsenToday(nextPage, Number(activetab));
    };

 
    
    const TabsFilter = ({setTab} : {setTab?: (payload:any) => void}) => {
      
           const onChange =async (key: string) => {  
                setTab?.(key) 
            };
        return (
             <Tabs  activeKey={activetab} items={
                            [
                                {
                                key: '1',
                                label: 'Absensi saya'
                                },
                                {
                                key: '2',
                                label: 'Absensi Karayawan'
                                }
                            ]
                            } onChange={async(v)=> await onChange(v)} />
        )
    }
    return (
        <React.Fragment> 
            <Platform>
                <div className="p-5 space-y-5">
                
                    <div>
                        <h4 className="text-lg font-semibold">History Absensi</h4>
                        {user.role == "HR" && ( 
                           <TabsFilter setTab={setactivetab} />
                        )}
                        <div>
                            {!loading && data.length <= 0 ?(
                                <NotReady />
                            ):(
                                <React.Fragment>
                                    {loading ?(
                                        <div className="h-48 text-center flex items-center justify-center text-xl font-bold">
                                            <p>loading </p>
                                        </div>
                                    ):(
                                    <React.Fragment> 
                                        <CardAbsensi data={data} />
                                    </React.Fragment>
                                    )}
                                </React.Fragment>
                            )}
    
                        </div>
                    </div>
                </div>
                  {!loading && hasMore && (
                        <div className="mt-4 flex items-center justify-center">
                        <Button onClick={loadMore}>more</Button>
                    </div>
                    )}
            </Platform>
        </React.Fragment>
    )
}