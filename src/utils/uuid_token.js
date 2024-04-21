import { v4 as uuidv4 } from 'uuid'
export const getUUID = ()=>{
    let uuid_token = localStorage.getItem("uuidtoken")
    if(!uuid_token){
        uuid_token = uuidv4()
        localStorage.setItem("uuidtoken",uuid_token)
    }
    return uuid_token
}