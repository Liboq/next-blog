import request from "../../service/request";
export const login = ()=>{
    return request('post','user/login',{name:'pikachu',password:'a123456'})
}