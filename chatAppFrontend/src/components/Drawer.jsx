import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCommentDots, faPhone, faCircleNotch, faCircleUser, faGear, faBoxArchive, faStar } from '@fortawesome/free-solid-svg-icons'
import whatsapp  from '@/assets/whatsapp.svg'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useDispatch, useSelector } from "react-redux";
import helper from "@/server/helper";
import { storeLogout } from "@/store/authSlice";
import { useNavigate } from "react-router";


const Drawer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [msgCount, setMsgCount] = useState(12);
    const [status, setStatus] = useState(true);

    const dispatch = useDispatch(null);
    const navigate = useNavigate();
    const user = useSelector(state => state.userData);

    const navItemTop = [
        {
            icon: faCommentDots,
            text: "Chats",
            status: true
        },
        {
            icon: faPhone,
            text: "Calls",
            status: false
        },
        {
            icon: faCircleNotch,
            text: "Status",
            status: true
        },
    ]
    const navItemDown = [
        {
            icon: faStar,
            text: "Starred messages"
        },
        {
            icon: faBoxArchive,
            text: "Archived chats"
        },
        {
            icon: faGear,
            text: "Settings"
        },
        {
            icon: faCircleUser,
            text: "Profile"
        },
    ]

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    
    
    const logout = () => {
        helper.logout(user.token)
        .then((res) => {
            dispatch(storeLogout());
            localStorage.removeItem("token");
            navigate('/intro')
            
        })
        // .catch((err) => ())
    
    }
    
    

    


    return (
        <div className="w-full">
            <div className="w-full h-10 dark:bg-[#202020] flex justify-start items-center pl-4 gap-3 text-xs">
                <img src={ whatsapp } alt="" className="w-6 h-6 bg-green-500" />
                <p>WhatsApp</p>
            </div>
            {/* sidebar */}
            <aside className={`bg-white  dark:bg-[#202020] absolute left-0 top-10 px-1 flex flex-col justify-between items-start z-50 ${isOpen ? "w-60" : "w-[55px]"} h-[95%]  `}>
                {/* top */}
                <div className="w-full flex flex-col items-start gap-2 pt-5">
                    <div className="p-2 hover:dark:bg-[#494949] rounded-md" onClick={toggleDrawer}>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><FontAwesomeIcon icon={faBars}
                                    className="border-l-4 border-green-500 pl-1 cursor-pointer"
                                /></TooltipTrigger>
                                <TooltipContent>
                                    <p>Open Navigation</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    {navItemTop.map((item, index) => (
                        <div key={index} className="w-full h-fit flex justify-between items-center px-3 py-1 cursor-pointer hover:dark:bg-[#494949] rounded-md">
                            <div className=" flex gap-3 items-center">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger><FontAwesomeIcon icon={item.icon} /></TooltipTrigger>
                                        <TooltipContent>
                                            <p>{item.text}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                {isOpen && (
                                    <p>{item.text}</p>
                                )}
                            </div>
                            {item.status && (
                                <div 
                                    className={`
                                        ${item.text == "Chats" && msgCount ? "w-5 h-4" : ""} ${item.text == "Status" && status ? "w-1.5 h-1.5" : ""} rounded-lg bg-green-500 text-xs text-white dark:text-black flex items-center justify-center
                                    `}>
                                    {item.text == "Chats" && msgCount != 0 &&
                                        <p>{msgCount}</p>
                                    }
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {/* bottom */}
                <div className=" flex flex-col justify-end gap-8 pb-5">
                    {navItemDown.map((item, index) => (
                        <div key={index} 
                            className="w-full h-fit flex items-center px-4 py-1 cursor-pointer gap-3"
                            onClick = {item.text == 'Profile' ? logout : null}
                            >
                            
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger><FontAwesomeIcon icon={item.icon} /></TooltipTrigger>
                                    <TooltipContent>
                                        <p>{item.text}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            {isOpen && (
                                <p>{item.text}</p>
                            )}
                        </div>
                    ))}
                </div>
            </aside>
        </div>
    );
};

export default Drawer;  
