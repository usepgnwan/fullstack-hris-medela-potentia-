import { Button, DatePicker, Form, Input, Modal } from "antd";
import Platform from "../layouts/Platform"; 
import { toast } from "react-toastify";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import CameraCapture from "../components/CameraCapture";
import { CameraOutlined } from "@ant-design/icons";
import Maps from "../components/Maps";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { authService } from "../services/authService";

export default function Clockin(){
     const user = authService.getCurrentUser();
    const type = localStorage.getItem("clockin");
    const [file, setFile] = useState("");
    const [form] = Form.useForm(); 


    const [initialValues, setinitialValues] = useState({
        lat: 0,
        lng: 0,
        file:"",
        catatan:"", 
        address: ""
    });
    const [proccesmap, setprocessmap] = useState(true)
    useEffect(() => {
                setprocessmap(true)
                if (!navigator.geolocation) {
                    console.log("Geolocation tidak didukung browser");
                    return;
                } 
                navigator.geolocation.getCurrentPosition(
                async (position) => { 
                    await getAddress(position.coords.latitude,position.coords.longitude).then((address)=>{ 
                        form.setFieldsValue({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            address: address?.display_name ?? "",
                        });
                        setprocessmap(false)
                    })
 
                    
                    // form.setFieldsValue({ address: address?.display_name ?? "" });
                },
                (error) => {
                    toast.error("Gagal ambil lokasi:"+ error.message)
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
                );
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false); 

    useEffect(() => {
    if (file) {
        form.setFieldsValue({ file });
        form.validateFields(['file']);  
    }
    }, [file]);

    const getAddress  = async (lat: number, lng: number) => {
        const res = await fetch(   `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`);
        const data = await res.json();
        return data;
    };

    const navigate = useNavigate()
    const [loading, setloading] = useState(false);
    const onFinish =async (values: any) => {   
        const time  =localStorage.getItem("time") ;
        const newValues = {
            ...values,
            file:file,
            time:time,
            type:type,
            karyawan_id:user.id,
            date: values.date.format('YYYY-MM-DD')
        }
        setloading(true)
        await api.post("/absensi",JSON.stringify(newValues)).then(()=>{ 
            toast.success("Success clockin")
              setloading(false)
            return navigate("/")
        }).catch(()=>{
              setloading(false)
            toast.success("Error clockin")
        })
    };
    useEffect(()=>{
        if(localStorage.getItem("clockin") == undefined){
            navigate("/") 
        }
    },[])

 
 

    return (
        <Platform> 
                <div className="p-5 space-y-5 ">
                    <h5>{type == 'clockin' ?  ("Clockin"):("Clockout")}</h5>
                    
                    <Form 
                        form={form}
                        initialValues={initialValues}
                        name="login"
                        className="!w-full !text-left " 
                        onFinish={onFinish}
                        > 
                        <div className="min-h-36 overflow-hidden mb-5"> 
                            {!proccesmap && form.getFieldValue("lat") !== undefined ?(
                                 <Maps lang={form.getFieldValue("lng")} lat={form.getFieldValue("lat")} address={form.getFieldValue("address")}/>
                            ):(
                                <p>Loading map</p>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-3"> 

                            <Form.Item name="lat" rules={[{ required: true, message: 'lat wajib' }]}  >
                                <Input placeholder="lat" readOnly />
                            </Form.Item>  
                            <Form.Item name="lng" rules={[{ required: true, message: 'lng wajib' }]}  >
                                <Input placeholder="lat" readOnly />
                            </Form.Item>  
                        </div>
                        <Form.Item name="date" initialValue={dayjs()}  >
                            <DatePicker
                                format="YYYY-MM-DD"
                                inputReadOnly
                                open={false}    
                                allowClear={false}
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                        <Form.Item name="file"  rules={[{ required: true, message: 'Foto wajib' }]}  >
                            {file && (
                                <>
                                    <div className="w-full mb-4">
                                        <img
                                                src={file}
                                                alt="capture"
                                                className="rounded-lg  "
                                            />
                                    </div>
                                </>
                            )}
                            
                             <Button className="w-full" onClick={()=>setIsModalOpen(true)}>
                                <CameraOutlined />
                                Ambil Foto
                            </Button>
                        </Form.Item>  
                        <Form.Item name="address" rules={[{ required: true, message: 'Alamat wajib' }]}  >
                            <TextArea placeholder="alamat"  />
                        </Form.Item>  
                        <Form.Item name="catatan">
                            <TextArea placeholder="catatan" className="!h-44"/>
                        </Form.Item>  
                        
                       <div  className="fixed -bottom-2 left-1/2 -translate-x-1/2 w-full max-w-md bg-white p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                             <Form.Item>
                                <Button disabled={loading} block type="primary" htmlType="submit" className="!w-full">  Submit </Button> 
                            </Form.Item>
                       </div>
                    </Form>
                </div>

                <Modal
                    title="Ambil Foto"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalOpen} 
                    footer={null}
                    onCancel={()=>setIsModalOpen(false)}
                >
                    <CameraCapture setOpen={setIsModalOpen} setFile={setFile} open={isModalOpen}/>
                </Modal>
        </Platform> 
    )
}