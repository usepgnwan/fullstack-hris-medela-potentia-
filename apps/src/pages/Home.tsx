import React, { useEffect, useState } from "react"; 
import Platform from "../layouts/Platform";
import { Button } from "antd";
import { LogoutOutlined,ClockCircleOutlined, UserOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import api from "../utils/api";
import NotReady from "../components/NotReady";
import CardAbsensi from "../components/CardAbsensi";
import { Absensi } from "../../../server/interface";

export default function Home(){
    const user = authService.getCurrentUser();
     
    const navigate = useNavigate()

    
     const startClockDayjs =(  setter: (value: string) => void ): number =>{
      const tick = () => setter(dayjs().format("HH:mm"));
      tick();
      return window.setInterval(tick, 1000);
    }
    
    const [time, setTime] = useState("00:00");
    
    useEffect(() => {
        const timer = startClockDayjs(setTime); 
        return () => {
            clearInterval(timer);  
        };
    }, []);
    
    const goCheckin = (type : string) =>{
        localStorage.setItem("clockin",type)
        localStorage.setItem("time",time)
        navigate("/clockin") 
    }

    const getAbsenToday =async () =>{
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
    const [data, setdata] = useState<Absensi[]>([]);
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
                    <div className="flex items-center gap-3 rounded-full border p-2">
                        <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-white" >
                            <UserOutlined/>
                        </div>
                        <div className="flex flex-col leading-tight">
                            <p className="font-medium">{user.name}</p>
                            <small className="text-gray-500">{user.jabatan ?? ""}</small>
                        </div>
                    </div>
                    <div className="border rounded-2xl p-4 space-y-3">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold mb-0">{time}</h1>
                            <p className="text-gray-400">{dayjs().format("YYYY-MM-DD")}</p>
                        </div>
                        <div className="flex justify-between space-x-2"> 
                            
                            {data.some(v=>v.type == 'clockin') ? (
                                <Button variant="solid" color="green" className="!w-full" >
                                    <CheckCircleOutlined />
                                    Sudah Clockin
                                </Button>
                            ):  (
                                 <Button variant="solid" color="green" className="!w-full" onClick={()=>goCheckin("clockin")}>
                                    <ClockCircleOutlined />
                                    Clockin
                                </Button>
                            )}
                            
                            {data.some(v=>v.type == 'clockout') ? (
                                <Button variant="solid"   className="!w-full" >
                                    <CheckCircleOutlined />
                                    Sudah Clockout
                                </Button>
                            ):  (
                                <Button className="!w-full" onClick={()=>goCheckin("clockout")}>
                                    <LogoutOutlined  /> Clockout
                                </Button>
                            )}
                            
                            
                           
                        </div>
                    </div>
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
                                    <h4 className="text-lg font-semibold">Absensi hari ini</h4>
                                    <CardAbsensi data={data}/>
                                </React.Fragment>
                                )}
                            </React.Fragment>
                        )}

                    </div>
                </div>
            </Platform>
        </React.Fragment>
    )
}