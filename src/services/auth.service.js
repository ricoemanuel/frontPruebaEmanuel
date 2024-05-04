const url = process.env.url

export const login = async (correo, contrasena) => {
    const response = await fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ correo, contrasena })
    })

    const data = await response.json();
    return data;
}

export const signUp = async (payload) => {
    const response = await fetch(`http://localhost:3000/empleados`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    const data = response.status;
    return data;
}