import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000'
});

class ChatHelper{
    async createRoom(number1, number2){
        const createUrl = `/chatapi/create-room/`
        try {
            const room = await api.post(createUrl,{
                'user1': number1,
                'user2': number2
            })            
            return room.data;
            
        } catch (error) {
            throw error.response;            
        }
    }
}

export default new ChatHelper