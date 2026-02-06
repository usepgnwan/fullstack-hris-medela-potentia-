import React, { useEffect, useState } from "react"; 
import Platform from "../layouts/Platform";
import { Button } from "antd";
import { LogoutOutlined,ClockCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import api from "../utils/api";
import { authService } from "../services/authService";
import NotReady from "../components/NotReady";
import CardAbsensi from "../components/CardAbsensi";

export default function History(){

    
    const user = authService.getCurrentUser();
    const getAbsenToday = async () =>{
        const date = dayjs().format("YYYY-MM-DD");
        const id = user.id;
       const data = await api.get('/absensi', {
                params: {
                    date: date,
                    karyawanID: id,
                },
        });
        return data;
    }
    const [loading, setloading] = useState(false);
    const [data, setdata] = useState([]);
    useEffect(()=>{
        (async()=>{
            setloading(true)
            await getAbsenToday().then((v)=>{
                console.log(v)
                setdata(v.data.data ?? [])
                setloading(false)
            }).finally(()=>{
                setloading(false);
            })
        })()
    },[])
    return (
        <React.Fragment> 
            <Platform>
                <div className="p-5 space-y-5">
                    {/* <div className="flex items-center gap-3 rounded-full border p-2"> 
                        <div className="flex flex-col leading-tight px-4">
                            <p className="font-medium">History Absensi</p> 
                        </div>
                    </div>  */}
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
            </Platform>
        </React.Fragment>
    )
}