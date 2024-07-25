'use client'

import { AlignJustify } from "lucide-react"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import { useToast } from "../ui/use-toast"

export default function Header({user,profileInfo}){
    const { toast } = useToast();
    const menuItems=[
        {
            label :'Home',
            path :'/',
            show :true
        },
        {
            label :'Login',
            path :'/sign-in',
            show :!user
        },
        {
            label:'Register',
            path:'/sign-up',
            show:!user
        },
        {
            label:'Jobs',
            path:'/jobs',
            show:user
        },
        {
            label:'Activity',
            path:'/activity',
            show:profileInfo?.role==='candidate'
        },
        {
            label:'Membership',
            path:'/',
            show:user
        },
        {
            label:'Account',
            path:'/Account',
            show:user
        } 
    ]
    return(
        <div>
            <header className=" flex h-16 w-full shrink-0 items-center">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="lg:hidden"><AlignJustify className="h-6 w-6"/>
                        <span className="sr-only">
                                Toggle navigation Menu
                        </span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                            <Link className="mr-6 hidden lg:flex" href={'#'}>
                            <h3>JOBSCO</h3>
                            </Link>
                            <div className="grid gap-2 py-6">
                                {
                                    menuItems.map(item=>
                                        item.show?
                                        <Link onClick={()=>{sessionStorage.removeItem("filterParams")
                                            if(item.label=='Membership'){
                                                toast({
                                                    title:'Coming Soon',
                                                    description:'Membership feature is coming soon',
                                                    status:'info',
                                                    duration:5000,
                                                    isClosable:true
                                                })
                                            }
                                        }} key={item.label} href={item.path} className="flex w-full items-center py-2 text-lg font-semibold">{item.label}
                                        </Link>
                                        :null
                                    )
                                }
                                <UserButton afterSignOutUrl="/"/>
                            </div>
                    </SheetContent>
                </Sheet>
                <Link className="hidden lg:flex mr-6" href={'/'}>JOBSCO</Link>
                <nav className="ml-auto hidden lg:flex gap-6">
                    {
                        menuItems.map(item=>
                            item.show?
                            <Link key={item.label} href={item.path} className="group inline-flex w-max rounded-md bg-white items-center px-4 py-2 text-sm font-medium">{item.label}</Link>
                            :null
                        )
                    }
                <UserButton afterSignOutUrl="/"/>
                </nav>
            </header>
        </div>
    )
}