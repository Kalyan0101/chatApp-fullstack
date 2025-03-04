import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faBellSlash, faThumbtack } from '@fortawesome/free-solid-svg-icons'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



function ChatCard() {
    return (
        <Card className="hover:bg-[#363636]">
            <CardHeader className="flex flex-row justify-start items-center gap-3">
                {/* icon */}
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {/* detail chat */}
                <div className="w-full">
                    <CardTitle>Card Title</CardTitle>
                    <div className="w-full flex text-xs justify-between items-center gap-2">
                        <FontAwesomeIcon icon={faCheck} />
                        {/* <CardDescription className="text-start">Card Description</CardDescription> */}
                        <p className='mr-auto'>CardDescription</p>
                        <div className="flex items-center justify-end gap-2 ml-1">
                            <FontAwesomeIcon icon={faBellSlash} />
                            <FontAwesomeIcon icon={faThumbtack} />
                            <div className="dark:text-black bg-[#1DAA61] rounded-lg px-1 font-semibold">261</div>
                        </div>
                    </div>
                </div>

            </CardHeader>
        </Card>

    )
}

export default ChatCard