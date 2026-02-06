import { ExclamationCircleFilled, HistoryOutlined, HomeOutlined, LogoutOutlined, UserAddOutlined } from "@ant-design/icons";
import { PropsWithChildren, useEffect } from "react";
import { authService } from "../services/authService";
import { Link, NavLink, useLocation, useNavigate, useRoutes } from "react-router-dom";
import { Modal } from "antd";
import { ToastContainer } from "react-toastify";

export default function Platform({ children }: PropsWithChildren) { 
    const user = authService.getCurrentUser();
    const location = useLocation();
    const path = location.pathname

    const navigate = useNavigate();
    const { confirm } = Modal;

    const logout = () => {
        confirm({
            title: 'Yakin Logout?',
            icon: <ExclamationCircleFilled />,
            content: 'klik ok jika ingin logout',
            onOk() {
                authService.logout();
                return  navigate("/")
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
 
    useEffect(()=>{
        if(path !== "/clockin"){
            // console.log(path)
            localStorage.removeItem("clockin")
        }
    },[]) 
    return (
            <> 
                <div className="mx-auto bg-white max-w-md min-h-screen pb-24">
                     <Link to="/" className="border-b  py-3 flex flex-col text-center">
                        <div className="flex justify-center">
                            <img src="logo.png" className="h-10"/>
                        </div>
                       <div className="font-semibold">  HRIS MANAGEMENT SYSTEM</div>
                    </Link>
                    <div className="p-4 "> 
                        {children}
                    </div>
                </div> 
                {path !== "/clockin"&& ( 
                    <div className="fixed min-h-16 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                        <div className={`grid grid-cols-3 ${user.role == "HR" ? 'grid-cols-4' : 'grid-cols-3'}`}>
                        <NavLink 
                                to="/home"
                                className={({ isActive }) =>
                                    `flex flex-col items-center justify-center text-center
                                    ${isActive ? "text-blue-600" : "text-black"}`
                                }
                                >
                                <HomeOutlined />
                                <p className="text-xs mt-1">Home</p>
                            </NavLink > 
                            <NavLink  to="/history"  
                                className={({ isActive }) =>
                                    `flex flex-col items-center justify-center text-center
                                    ${isActive ? "text-blue-600" : "text-black"}`
                                } >
                                <HistoryOutlined />
                                <p className="text-xs mt-1">History</p>
                            </NavLink > 
                            {user.role === "HR" && (
                                <NavLink  to="/karyawan"  
                                    className={({ isActive }) =>
                                        `flex flex-col items-center justify-center text-center
                                        ${isActive ? "text-blue-600" : "text-black"}`
                                    } >
                                    <UserAddOutlined />
                                    <p className="text-xs mt-1">Karyawan</p>
                                </NavLink > 
                            )}
                            
                            <div className="flex flex-col items-center justify-center text-center cursor-pointer" onClick={logout}>
                                <LogoutOutlined />
                                <p className="text-xs mt-1">Logout</p>
                            </div>
                        </div>

                    </div>
                )}
                
                <ToastContainer position="top-center" autoClose={3000} />
            </>
    )
}