import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faFilter, faMagnifyingGlass, faXmark, faMicrophone, faPaperclip, faFaceSmile } from '@fortawesome/free-solid-svg-icons'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ChatCard from './ChatCard';
import { ScrollArea } from "@/components/ui/scroll-area"
import Message from './Message'



function HeroSection() {

    const [isFocus, setIsFocus] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [chatMsg, setChatMsg] = useState('');


    // ckeck for cross button
    const crossChange = (e) => {
        let value = e.target.value

        if (value === '') {       // value empty
            setIsEmpty(false);
        }
        else if (value !== '') {  // value not empty
            setIsEmpty(true);
        }
        setSearchInput(value);
    }



    return (
        <div className="h-full rounded-ss-xl overflow-hidden ml-[3.4rem]">
            <ResizablePanelGroup direction="horizontal">
                {/* left side */}
                <ResizablePanel className='h-[95vh] min-w-72 max-w-96 dark:bg-[#2C2C2C]'
                >
                    {/* main section */}
                    <main className="flex flex-col">
                        {/* header */}
                        <section className="flex flex-col justify-between items-center gap-5 px-6 pt-5 pb-3">
                            {/* chat */}
                            <div className="w-full flex justify-between items-center">
                                <h1 className='font-bold text-xl'>Chats</h1>
                                {/* icon */}
                                <div className="flex gap-7">
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                    <FontAwesomeIcon icon={faFilter} />
                                </div>
                            </div>
                            {/* search */}
                            <div
                                className={` px-3 py-1.5 rounded-md border-b-2 w-full flex justify-between items-center gap-3 cursor-text ${isFocus ? "border-green-500 bg-[#202020]" : "border-white dark:bg-[#383838]"}`}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                            >
                                <FontAwesomeIcon icon={faMagnifyingGlass}
                                    className='scale-x-[-1] text-xs'
                                />
                                <input
                                    type="text"
                                    placeholder='Search or start a new chat'
                                    className='bg-transparent w-full outline-none'
                                    value={searchInput}
                                    onChange={crossChange}
                                />
                                {isEmpty &&
                                    <button
                                        type='reset'
                                        onClick={() => setSearchInput('')}
                                    >
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                }
                            </div>
                        </section>

                        {/* chat section */}
                        <section className='h-screen'>
                            <ScrollArea className="h-[82%] rounded-md border p-1">
                                <ChatCard />
                                <ChatCard />
                                <ChatCard />
                                <ChatCard />
                                <ChatCard />
                                <ChatCard />
                            </ScrollArea>
                        </section>

                    </main>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel className='h-[95vh] min-w-[400px]' >
                    <main className='h-full flex flex-col justify-between'>
                        {/* header */}
                        <section className='dark:bg-[#2C2C2C]'>
                            <Card>
                                <CardHeader className="w-full flex flex-row justify-between items-center gap-5 px-5">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>

                                    <div className="w-full">
                                        <CardTitle>Card Title</CardTitle>
                                        <CardDescription>Card Description</CardDescription>
                                    </div>
                                    <FontAwesomeIcon icon={faMagnifyingGlass}
                                        className='scale-x-[-1] text-xs'
                                    />
                                </CardHeader>
                            </Card>

                        </section>
                        {/* main body */}
                        <section className='bg-[#2C2C2C] w-full h-[80%] pt-1 flex-1'>
                            <ScrollArea className="h-full rounded-md border px-7">
                                <Message side={"left"} />
                                <Message />
                                <Message />
                                <Message side={"left"} />
                                <Message />
                            </ScrollArea>
                        </section>
                        {/* footer */}
                        <section>
                            <div className="flex justify-between items-center gap-6 px-4 dark:bg-[#2c2c2c]">
                                <FontAwesomeIcon icon={faFaceSmile} />
                                <FontAwesomeIcon icon={faPaperclip} />
                                <div className="w-full hover:bg-[#413f3f]">
                                    <input
                                        type="text"
                                        value={chatMsg}
                                        onChange={(e) => setChatMsg(e.target.value)}
                                        placeholder='Type a message'
                                        className='w-full p-3 dark:bg-transparent outline-none placeholder:text-white placeholder:text-sm'
                                    />
                                </div>
                                <FontAwesomeIcon icon={faMicrophone} />
                            </div>
                        </section>
                    </main>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

export default HeroSection