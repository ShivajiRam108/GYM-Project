import axios from 'axios';
const getMonthlyJoined = async ()=>{
    try{
        const response = await axios.get("http://localhost:3002/members/monthly-member", {withCredentials:true})
        console.log(response);
        return response.data
    }catch(error){
        console.error("Error Fetcing data", error);
        throw error
        
    }
}

const threeDaysExpire = async ()=>{
    try{
        const response = await axios.get("http://localhost:3002/members/within-3-days-expiring", {withCredentials:true})
        return response.data;
    }catch(error){
        console.error("Error Fetcing data", error);
        throw error
        
    }
}

const fourToSevenDaysExpire = async ()=>{
    try{
        const response = await axios.get("http://localhost:3002/members/within-4-to-7-days-expiring",{withCredentials:true})
        return response.data;
    }catch(error){
        console.error("Error Fetcing data", error);
        throw error
}
}

const expiredData = async ()=>{
    try{
        const response = await axios.get("http://localhost:3002/members/expired-members",{withCredentials:true})
        return response.data;
    }catch(error){
        console.error("Error Fetcing data", error);
        throw error
}
}

const inactiveMembers = async()=>{
    try{
    const response = await axios.get("http://localhost:3002/members/inactive-members",{withCredentials:true})
    return response.data;
    }catch(error){
        console.log("Eroor Fetching data.", error)
        throw error
    }
}
export{getMonthlyJoined, threeDaysExpire, fourToSevenDaysExpire, expiredData, inactiveMembers};