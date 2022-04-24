import axios from 'axios'

const setAuthToken = token =>{
    if(token){
        console.log("Setting Auth token ------")
        axios.defaults.headers.common['Authorization'] = token
    }else{
        delete axios.defaults.headers.common['Authorization']
    }
}

export default setAuthToken