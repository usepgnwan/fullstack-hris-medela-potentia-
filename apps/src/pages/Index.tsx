 
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import api from "../utils/api";
import { toast, ToastContainer  } from "react-toastify"; 
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
export default function Index(){
  
    const navigate = useNavigate();
    const onFinish =async (values: any) => {   
        await api.post('/karyawan/login',values).then((v)=>{ 
            authService.setAuthData(v.data.data.token) 
            navigate("/home")
            return toast.warning("Login Sukses")
        }).catch((e)=>{ 
            if (e.response?.status === 401){ 
                return toast.warning("Username/password salah")
            }
            if (e.response?.status === 404){  
                return toast.warning(e.response?.data.error)
            }

            toast.warning("Failed")
        })
    };

  
    return (
        <section className="h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white shadow p-2 rounded-2xl text-center py-10 "> 
               <div className="flex flex-col space-y-2 items-center">
                    <img src="logo.png" className="w-24"/>
                    <div>
                        <h3 className="font-semibold text-2xl">Hris System Management</h3>
                        <p>Login menggunakan akun karyawan</p>
                    </div>
                    <Form
                        name="login"
                        className="!w-full !text-left px-5" 
                        onFinish={onFinish}
                        >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                        </Form.Item>
                        

                        <Form.Item>
                            <Button block type="primary" htmlType="submit">  Log in </Button> 
                        </Form.Item>
                    </Form>
               </div>
            </div>
            <ToastContainer position="top-center" autoClose={3000} />
        </section>
    )
}