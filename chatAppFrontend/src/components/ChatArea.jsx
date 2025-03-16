import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faMicrophone, faPaperclip, faFaceSmile, faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Info, Message } from './index'
import chatHelper from '@/server/chatHelper'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'


function ChatArea({ currentChatUser }) {    

    const [chatMsg, setChatMsg] = useState('');
    const [isTextEmpty, setIsTextEmpty] = useState(true);
    const [isUserEmpty, setIsUserEmpty] = useState(true);
    const [chatRoom, setChatRoom] = useState('');
    const [ws, setWs] = useState('');
    const [getMsg, setGetMsg] = useState([])
    const [chatHistory, setChatHistory] = useState([])


    const loginUser = useSelector(state => state.userData);  
    
    // toggel between arrow and mic and update setMsg
    const sendArrow = (e) => {
        const value = e.target.value;
        if(value === ""){
            setIsTextEmpty(true);
        }else{
            setIsTextEmpty(false);
        }
        setChatMsg(value);
    }

    // check if user is empty or not
    useEffect(() => {
        if(Object.keys(currentChatUser).length !== 0){
            setIsUserEmpty(false);
            return 
        }
        setIsUserEmpty(true);
    }, [currentChatUser])
    
    // getting chat room
    useEffect(() => {
        if(isUserEmpty ) return
        
        chatHelper.createRoom(loginUser.phonenumber, currentChatUser.phonenumber)
        .then((data) => {            
            setChatRoom(data.name)
            setIsUserEmpty(false);
        })
        .catch((err) => {
            Swal.fire({
                text: err.data?.message,
                icon: "error",
                width: 'fit-content',
                heightAuto: false,
                padding: '10px',
              });
            setIsUserEmpty(true);
        })
    }, [isUserEmpty, currentChatUser])

    useEffect(() => {

        if(chatRoom == '') return

        const socket = new WebSocket(`ws://localhost:8000/ws/chat/${chatRoom}/`)
    
        socket.onopen = (e) => {
            // console.log(e?.data, "open");
            // console.log(e);
            setWs(socket);
        }    
        socket.onmessage = (e) => {
            const data = JSON.parse(e.data);

            if(Array.isArray(data.message)){
                console.log(data.message);
                setChatHistory(data.message)
                
            }            
            else if(data.message.length !== 0){
                setGetMsg((pre) => [...pre, data])
            }
            
        };
        socket.onclose = (e) => {
        }    
        return () => {
          socket.close();
        };
      }, [chatRoom])

    const sendMsg = () => {
        if(ws && ws.readyState === WebSocket.OPEN){
            ws.send(JSON.stringify({
                'message': chatMsg,
                'number': loginUser.phonenumber,
                'time': new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})
            }));
            setChatMsg('')            
        }
    }   

    return !isUserEmpty ? (
        <>
            <section  className='h-full flex flex-col justify-between'>
                {/* header */}
                <header className='dark:bg-[#2C2C2C]'>
                    <Card>
                        <CardHeader className="w-full flex flex-row justify-between items-center gap-5 px-5">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

                            <div className="w-full">
                                <CardTitle>{currentChatUser.username}</CardTitle>
                                <CardDescription>{currentChatUser.phonenumber}</CardDescription>
                            </div>
                            <FontAwesomeIcon icon={faMagnifyingGlass}
                                className='scale-x-[-1] text-xs'
                            />
                        </CardHeader>
                    </Card>

                </header>

                {/* main body */}
                <main className='bg-[#2C2C2C] w-full h-[80%] pt-1 flex-1'>
                    <ScrollArea className="h-full rounded-md border px-7">
                        {chatHistory.map((item, index) => <div key={index}>
                            <Message 
                                message={item.content}
                                number={item.phonenumber.phonenumber}
                                time={item.time}
                            /> 
                        </div>)}
                        {getMsg.map((item, index) => <div key={index}>
                            <Message 
                                message={item.message}
                                number={item.number}
                                time={item.time}
                            /> 
                        </div>)}
                    </ScrollArea>
                </main>

                {/* footer */}
                <footer>
                    <div className="flex justify-between items-center gap-6 px-4 dark:bg-[#2c2c2c]">
                        <FontAwesomeIcon icon={faFaceSmile} />
                        <FontAwesomeIcon icon={faPaperclip} />
                        <div className="w-full hover:bg-[#413f3f]">
                            <input
                                type="text"
                                value={chatMsg}
                                onChange={ sendArrow }
                                placeholder='Type a message'
                                className='w-full p-3 dark:bg-transparent outline-none placeholder:text-white placeholder:text-sm'
                            />
                        </div>
                        {isTextEmpty ? 
                            <FontAwesomeIcon icon={faMicrophone} />
                            :
                            <FontAwesomeIcon 
                            className='rotate-[45deg]' 
                            icon={faLocationArrow} 
                            onClick={ sendMsg }
                            />
                        }
                    </div>
                </footer>
            </section>
        </>
    )
    :
    <Info />
}

export default ChatArea