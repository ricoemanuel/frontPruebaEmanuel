
export const getSolicitudes = async (token, user) => {
    try{
        const response = await fetch(`http://localhost:3000/solicitudes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
                "user": `Bearer ${user}`
            },
        });
    
        const data = await response.json();
        return {data,status:response.status};
    }catch(e){
        return {data:[],status:500};
    }
    
}

export const getSolicitudesByUser = async (token, user) => {
    try{
        const response = await fetch(`http://localhost:3000/solicitudesByUser/${user}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
                "user": `Bearer ${user}`
            },
        });
    
        const data = await response.json();
        return {data,status:response.status};
    }catch(e){
        return {data:[],status:500};
    }
    
}

export const createSolicitud = async (token, user, datos) => {
    try{
        const response = await fetch(`http://localhost:3000/solicitudes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
                "user": `Bearer ${user}`
            },
            body: JSON.stringify(datos)
        });
    
        const data = await response.json();
        return {data,status:response.status};
    }catch(e){
        return {data:[],status:500};
    }
    
}
export const deleteSolicitud = async (token, user, ID) => {
    try{
        const response = await fetch(`http://localhost:3000/solicitudes/${ID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
                "user": `Bearer ${user}`
            },
        });
    
        const data = await response.json();
        return {data,status:response.status};
    }catch(e){
        return {data:[],status:500};
    }
    
}

