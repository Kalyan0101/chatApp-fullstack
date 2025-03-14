import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faFilter, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import ChatCard from './ChatCard';
import { ScrollArea } from "@/components/ui/scroll-area"
import ChatArea from './ChatArea'
import helper from '@/server/authHelper';
import { useSelector } from 'react-redux';

function HeroSection() {

    const [isFocus, setIsFocus] = useState(false);
    const [isTextEmpty, setIsTextEmpty] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [users, setUsers] = useState([])
    const [currentChatUser, setCurrentChatUser] = useState({})

    const loginUser = useSelector(state => state.userData)


    // ckeck for cross button
    const crossChange = (e) => {
        let value = e.target.value

        if (value === '') {       // value empty
            setIsTextEmpty(false);
        }
        else if (value !== '') {  // value not empty
            setIsTextEmpty(true);
        }
        setSearchInput(value);
    }

    // fetch all users
    useEffect(() => {
        helper.allUsers()
            .then((res) => {
                setUsers(res);            
            })
    }, [])


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
                                {isTextEmpty &&
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
                                {users?.filter((item) => item.id !== loginUser?.id).map((item) => (
                                    <div 
                                        key={item.id}
                                        onClick={() => setCurrentChatUser(item)}
                                    >
                                        <ChatCard {...item} />
                                    </div>))
                                }
                            </ScrollArea>
                        </section>

                    </main>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel className='h-[95vh] min-w-[400px]' >
                    <ChatArea currentChatUser = {currentChatUser} />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

export default HeroSection