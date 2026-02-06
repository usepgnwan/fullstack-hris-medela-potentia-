import React from "react"; 
import Platform from "../layouts/Platform";
import { Button } from "antd";
import { LogoutOutlined,ClockCircleOutlined } from "@ant-design/icons";

export default function History(){
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
                        <div className="space-y-3">
                            <div className="border rounded-2xl p-4">
                                <div className="flex gap-4 items-center">
                                    <div className="rounded-full w-16 h-16 bg-slate-500 shrink-0"></div> 
                                    <div className="flex-1 text-sm text-gray-700  ">
                                        <div className="flex space-x-2 items-center">
                                            <div className="rounded-2xl px-3 bg-blue-700 text-white">Clock In</div>
                                            <div className="rounded-2xl px-3 bg-red-700 text-white w-12">Telat</div>
                                            <p className="text-lg font-semibold">80:01</p>
                                        </div>
                                        <p className="line-clamp-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, enim! Quod blanditiis sequi voluptatem tempore distinctio aut, dolore neque labore dolorum nihil iusto natus non praesentium quia dolores, molestias fugiat.</p>
                                        <div className="grid grid-cols-3 mt-2">
                                            <p className="text-xs">2025-01-01</p>
                                            <p className="text-xs">lat : 12231</p>
                                            <p className="text-xs">lang :13232</p>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                            <div className="border rounded-2xl p-4">
                                <div className="flex gap-4 items-center">
                                    <div className="rounded-full w-16 h-16 bg-slate-500 shrink-0"></div> 
                                    <div className="flex-1 text-sm text-gray-700  ">
                                        <div className="flex space-x-2 items-center">
                                            <div className="rounded-2xl px-3 bg-blue-700 text-white">Clock In</div>
                                            <p className="text-lg font-semibold">80:01</p>
                                        </div>
                                        <p className="line-clamp-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, enim! Quod blanditiis sequi voluptatem tempore distinctio aut, dolore neque labore dolorum nihil iusto natus non praesentium quia dolores, molestias fugiat.</p>
                                        <div className="grid grid-cols-3 mt-2">
                                            <p className="text-xs">2025-01-01</p>
                                            <p className="text-xs">lat : 12231</p>
                                            <p className="text-xs">lang :13232</p>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Platform>
        </React.Fragment>
    )
}