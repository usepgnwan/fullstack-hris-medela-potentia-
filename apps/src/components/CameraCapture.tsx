import { CameraOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const CameraCapture = ({setFile,setOpen , open} : { setFile?: (payload:any) => void, setOpen?: (payload:any) => void, open:boolean}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    startCamera("user"); 
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async (mode: string | "user" | "environment") => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: mode } },  
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      toast.error("Gagal buka kamera:" + err);
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0);

    const base64 = canvas.toDataURL("image/jpeg", 0.8);  
    setImageBase64(base64);
  
  };
  const clearPhoto =async ()=>{
    setImageBase64("")
    await startCamera("user");
  }
  useEffect(()=>{ 
    if(!open){
        stopCamera();
    }
  },[open])

  const sendPhoto = () =>{
    setFile?.(imageBase64 ?? "")
    setOpen?.(false)
    stopCamera();
  }
  const [type, settype] = useState<string>("user")
  const changeCamera = async () => {
    stopCamera();
    if (type == "user") {
      settype("environment")
    }else{
      settype("user") 
    }
    await startCamera(type)
  }
  return (
    <div className="flex flex-col items-center gap-4">
      {open}
      
      <canvas ref={canvasRef} className="hidden" />

      {imageBase64 ? (
        <div className="mt-4"> 
          <img
            src={imageBase64}
            alt="capture"
            className="rounded-lg max-w-md"
          />
        </div>
      ) : (
        <video
            ref={videoRef}
            autoPlay
            playsInline
            className="rounded-lg w-full max-w-md"
          />

      )}

      
      <div className="flex space-x-3">
         <Button  onClick={changeCamera}  >
          <CameraOutlined />
            Ganti Kamera {type === 'user' ? 'belakang' : 'depan'}
          </Button>
          {imageBase64 ? (
              <>
                <Button  onClick={clearPhoto}  >
                  Ulangi foto
                </Button>
                <Button type="primary" onClick={sendPhoto}> Simpan Foto</Button>
              </>
          ):( 
            <Button
            type="primary"
              onClick={capturePhoto} 
            >
              Ambil Foto
            </Button>
          )} 
 
      </div>

    </div>
  );
};

export default CameraCapture;
