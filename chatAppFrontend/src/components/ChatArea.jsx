import React, { use, useState } from 'react'
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


function ChatArea({ user }) {    

    const [chatMsg, setChatMsg] = useState('');
    const [isTextEmpty, setIsTextEmpty] = useState(true);

    const sendArrow = (e) => {
        const value = e.target.value;

        if(value === ""){
            setIsTextEmpty(true);
        }else{
            setIsTextEmpty(false);
        }
        setChatMsg(value);
    }

    return Object.keys(user).length !== 0 ? (
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
                                <CardTitle>{user.username}</CardTitle>
                                <CardDescription>Card Description</CardDescription>
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
                        <Message side={"left"} />
                        <Message />
                        <Message />
                        <Message side={"left"} />
                        <Message />
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
                        {
                            isTextEmpty ? 
                            <FontAwesomeIcon icon={faMicrophone} />
                            :
                            <FontAwesomeIcon className='rotate-[45deg]' icon={faLocationArrow} />
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