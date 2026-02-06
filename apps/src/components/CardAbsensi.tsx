import { Drawer } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useState } from "react";
import Maps from "./Maps";

dayjs.extend(customParseFormat);
const Absensi = ({data, setOpen,setDetail}:{data:any, setOpen?: (payload:any) => void, setDetail?: (payload:any) => void}) =>{ 
    const showdetail = () => {
        setOpen?.(true)
        setDetail?.(data)
        console.log(data);
    }
    return (
        <div className="border rounded-2xl p-4 cursor-pointer" onClick={showdetail}>
            <div className="flex gap-4 items-center">
                <div className="rounded-full w-16 h-16 bg-slate-500 shrink-0">
                    <img src={data.file} className="w-16 h-16 bg-cover bg-center rounded-full" />
                </div> 
                <div className="flex-1 text-sm text-gray-700  ">
                    <div className="flex space-x-2 items-center">
                        <div className="rounded-2xl px-3 bg-blue-700 text-white">{data.type??""}</div>
                        {data.time > "08:00" && data.type == "clockin" &&( 
                            <div className="rounded-2xl px-3 bg-red-700 text-white w-12">Telat</div>
                        )}
                        <p className="text-lg font-semibold">{ dayjs(data.time, "HH:mm:ss").format("HH:mm") ?? "00:00"}</p>
                    </div>
                    <p className="line-clamp-2">{data.address??""}</p>
                    <div className="grid grid-cols-2 mt-2">
                        <p className="text-xs col-span-2">{data.date??""}</p>
                        <p className="text-xs">lat : {data.lat??""}</p>
                        <p className="text-xs">lang :{data.lng??""}</p>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default function CardAbsensi({ data }: { data: any[] }) {
    const [open,setOpen] = useState(false);
    type AbsensiDetail = {
        lat?: number;
        lng?: number;
        address?: string;
        time?: string;
        file?: string;
        date?: string;
        catatan?: string;
        [key: string]: any;  
    };

    const [detail, setDetail] = useState<AbsensiDetail>({});
    return (
        <>
        <div className="space-y-3">
        {data.map((v, i) => (
            <Absensi key={i} data={v} setOpen={setOpen} setDetail={setDetail}/>
        ))}
        </div>
        <div className="max-w-lg mx-auto">
            <Drawer
                title="Detail Absensi"
                placement="bottom"
                onClose={() => setOpen(false)}
                open={open}
                size="full"
                classNames={{
                body: "!p-0 !relative   relative",
                wrapper: "!rounded-t-2xl !h-full !mx-auto !max-w-lg md:w-lg !bg-black  ",
                }}
            >  
                <div className="p-4  space-y-5  ">
                    <div className="text-center font-bold text-3xl flex  justify-center flex-col px-4 rounded-2xl  border bg-green-500 text-white py-2">
                        <span>{detail.type}</span>
                        <span>{detail.date}</span>
                    <span>    { dayjs(detail.time, "HH:mm:ss").format("HH:mm") ?? "00:00" }</span>
                    </div>
                    {open && detail.lat  !== undefined && detail.lng !== undefined && ( 
                        <Maps lat={detail.lat??0} lang={detail.lng??0} address={detail?.address ?? ''} /> 
                    )} 
                    <img src={detail.file} className="w-full" />
                    <div >
                        {detail.address}
                    </div>
                    <div >
                        {detail.catatan}
                    </div>
                </div>
            </Drawer>
            </div>
        </>
    );
}