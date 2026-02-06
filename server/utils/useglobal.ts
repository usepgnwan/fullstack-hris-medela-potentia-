import  { IResponse,IResponsePaginate } from "interface"

export const useGlobal = () => {
    const response  =  <T>({success,error,data}:IResponse) =>{
        return {success, error, data}
    }
    const responsepaginate  =  <T>({success,error,data,meta}:IResponsePaginate) =>{
        return {success, error, data, meta}
    }
    return {response,responsepaginate}
}