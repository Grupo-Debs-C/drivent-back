import axios from "axios";
import { Request, Response } from "express";
import httpStatus from "http-status";
import qs from 'qs'

export async function github(req: Request, res: Response) {
    const { code }= req.body;

    if (!code){
        return res.status(httpStatus.NOT_FOUND).send({});
    }

     const body ={
        code,
        grant_type:'authorization_code',
        redirect_uri: 'https://drivent-frontend-wheat.vercel.app/sign-in',
        client_id:'8b03db19625ccc7dad31',
        client_secret:"aef2208dd4cbf6099b9e3ff9d8763b85468ef532"
    }
try{
   
    const {data} = await axios.post("https://github.com/login/oauth/access_token",body,{
        headers:{
            'Content-Type': 'application/json'
        }
    })
   
    const parsedData = qs.parse(data)
    const token = parsedData.access_token;
    const fetchUser = await axios.get("https://api.github.com/user",{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    const user = fetchUser.data;
   
    return res.status(200).send(user)
}catch{
    return res.status(500)
}
   
}
