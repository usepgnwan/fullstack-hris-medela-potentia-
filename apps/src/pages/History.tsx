import React, { useEffect, useState } from "react"; 
import Platform from "../layouts/Platform";
import { Button } from "antd";
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

    const getAbsenToday = async (page:number) =>{ 
    const id = user.id;
       const data = await api.get(`/absensi?limit=5&page=${page}`, {
                params: {
                    karyawanID: id 
                },
        });
        if(page == 1){
            setdata((prev:any) => [  ...data.data.data ]);
       }else{
           setdata((prev:any) => [...prev, ...data.data.data ]);
       } 
       setHasMore(data.data.data.length>0)
    }
    useEffect(()=>{
        (async()=>{
            setloading(true)
            await getAbsenToday(1).then((v)=>{
              
                setloading(false)
            }).finally(()=>{
                setloading(false);
            })
        })()
    },[])
    const loadMore =async () => {
        const nextPage = Number(page) + 1;
        setPage(nextPage);
        await getAbsenToday(nextPage);
    };
    return (
        <React.Fragment> 
            <Platform>
                <div className="p-5 space-y-5">
                
                    <div>
                        <h4 className="text-lg font-semibold">History Absensi</h4>
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