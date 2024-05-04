export const getEmpleados = async (token, user) => {
    try {
        const response = await fetch(`http://localhost:3000/empleados`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "user": `Bearer ${user}`
            },
        });

        const data = await response.json();
        return { data, status: response.status };
    } catch (e) {
        return { data: [], status: 500 };
    }
}

export const createEmpleado = async (token, datos) => {
    try {
        const response = await fetch(`http://localhost:3000/empleados`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(datos)
        });

        const data = await response.json();
        return { data, status: response.status };
    } catch (e) {
        return { data: [], status: 500 };
    }

}

