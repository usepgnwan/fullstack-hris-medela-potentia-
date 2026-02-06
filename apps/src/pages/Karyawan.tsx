import React, { useEffect, useState } from "react"; 
import Platform from "../layouts/Platform";
import { Button, Drawer, Form, Input, Select } from "antd";
import { LogoutOutlined,ClockCircleOutlined, UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import api from "../utils/api";
import { authService } from "../services/authService";
import NotReady from "../components/NotReady";
import CardAbsensi from "../components/CardAbsensi";
import { toast } from "react-toastify";

export default function Karyawan(){

    
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState<Number>(1);
    const getdata = async (page:number) =>{  
       const data = await api.get(`/karyawan?limit=10&page=${page}`);
       if(page == 1){
            setdata((prev:any) => [  ...data.data.data ]);
       }else{
           setdata((prev:any) => [...prev, ...data.data.data ]);
       } 
       setHasMore(data.data.data.length>0)
    }

    const loadMore =async () => {
        const nextPage = Number(page) + 1;
        setPage(nextPage);
       await getdata(nextPage);
    };
    const [loading, setloading] = useState(false);
     type Karyawan = { 
        nama?: string;
        role?: string;
        id?: string;
        jabatan?: string;
        [key: string]: any;  
    };
 
    const [data, setdata] = useState<Karyawan>([]);
    useEffect(()=>{
        (async()=>{
            setloading(true)
            await getdata(1).then((v)=>{  
                setloading(false)
            }).finally(()=>{
                setloading(false);
            })
        })()
    },[])
    const [open, setopen] = useState(false)

    const onFinish =async (values: any) => {   

        console.log(values)
            await api.post('/karyawan',values).then(async(v)=>{  
                setloading(true)
                await getdata(1).then((v)=>{ 
                   
                    setloading(false)
                    setopen(false)
                }).finally(()=>{
                    setloading(false);
                })
                return toast.warning("karyawan baru berhasil di tambah")
            }).catch((e)=>{ 
                 
                if (e.response?.status === 409){  
                    return toast.warning(e.response?.data.error)
                }

                toast.warning("Failed")
            })
        };

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
                        <div className="justify-between flex mb-6">
                            <h4 className="text-lg font-semibold">Karyawan</h4>
                            <Button type="primary" onClick={()=>setopen(true)}>Tambah</Button>
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
                                    <div className="space-y-3"> 
                                        {data.map((v : Karyawan,k : number)=>{ 
                                          return  (
                                            <div className="flex items-center gap-3 rounded-full border p-2" key={k}>
                                                <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-white" >
                                                    <UserOutlined/>
                                                </div>
                                                <div className="flex flex-col leading-tight">
                                                    <p className="font-medium">{v.nama}</p> 
                                                    <p className="font-medium">{v.jabatan}</p> 
                                                </div>
                                            </div>
                                        )
                                        })}
                                    
                                    </div>
                                    )}
                                </React.Fragment>
                            )}
                           {!loading && hasMore && (
                             <div className="mt-4 flex items-center justify-center">
                                <Button onClick={loadMore}>more</Button>
                            </div>
                           )}
                        </div>
                    </div>
                </div>
                <Drawer
                title="Tambah Karyawan"
                placement="bottom"
                onClose={() => setopen(false)}
                open={open}
                size="full"
                classNames={{
                body: "!p-0 !relative   relative",
                wrapper: "!rounded-t-2xl !h-full !mx-auto !max-w-lg md:w-lg !bg-black  ",
                }}
            >  


                <div className="mt-9">
                    <Form
                            name="add-employe"
                            className="!w-full !text-left px-5" 
                            onFinish={onFinish}
                            >
                            <Form.Item
                                name="nama"
                                rules={[{ required: true, message: 'Please input your Nama!' }]}
                            >
                                <Input   placeholder="Nama Lengkap" />
                            </Form.Item>
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input   placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input   placeholder="password" />
                            </Form.Item>
                            <Form.Item
                                name="jabatan"
                                rules={[{ required: true, message: 'Please input your Jabatan!' }]}
                            >
                                <Input   placeholder="Jabatan" />
                            </Form.Item>
                            <Form.Item
                                name="role"
                                rules={[{ required: true, message: 'Please input your Role user!' }]}
                            >
                                <Select 
                                    placeholder="Select a role" 
                                    options={[
                                    {
                                        value: 'STAFF',
                                        label: 'STAFF',
                                    },
                                    {
                                        value: 'HR',
                                        label: 'HR',
                                    } 
                                    ]}
                                />
                            </Form.Item>
                            
                            

                            <Form.Item>
                                <Button block type="primary" htmlType="submit">  Submit</Button> 
                            </Form.Item>
                        </Form>
                </div>
                
            </Drawer>
            </Platform>
        </React.Fragment>
    )
}