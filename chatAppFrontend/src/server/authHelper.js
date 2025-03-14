const url = String(import.meta.env.VITE_SERVER_URL);

class AuthHelper {
    
    async login(ph_number) {
        
        const loginUrl = `${url}/authapi/login/`;
        
        try {
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phonenumber: ph_number
                })
            });
            const data = await response.json();
            if (response.ok) {
                return data
            }
            throw new Error(data)
            
        } catch (error) {
            throw error.message;
        }
    }

    async signup(ph_number, username) {
        
        const signupUrl = `${url}/authapi/signup/`
        try {
            const response = await fetch(signupUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phonenumber: ph_number,
                    username: username
                })
            })

            const data = await response.json()
            
            if (response.ok) {
                return data
            }
            throw new Error(data.phonenumber)
            
        } catch (error) {
            throw error.message;
        }
    }

    async validate(token){
        const validateUrl = `${url}/authapi/validate/`
        try {
            const response = await fetch(validateUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
            })
            const data = await response.json();
            if (response.ok) {
                return data
            }
            throw new Error(data)           
            
        } catch (error) {
            throw error.message;
        }
    }

    async allUsers(token){
        const allusersUrl = `${url}/authapi/allusers/`
        try {
            const response = await fetch(allusersUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `${token}`,
                },
            })
            const data = await response.json();
            if (response.ok) {
                return data
            }
            throw new Error(data)           
            
        } catch (error) {
            throw error.message;
        }
    }

    async logout(token){
        const logoutUrl = `${url}/authapi/logout/`
        try {
            const response = await fetch(logoutUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
            })            

            const data = await response.json()

            if (response.ok) {
                return data
            }

            throw new Error(data)
            
        } catch (error) {
            throw error.message;
        }
    }
}

export default new AuthHelper;