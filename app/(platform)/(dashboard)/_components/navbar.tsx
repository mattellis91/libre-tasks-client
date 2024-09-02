import { Plus } from "lucide-react"

import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
    return (
        <nav className="fixed z-50 top-0 w-full h-14 border-b shadow-sm bg-white flex items-center px-4">
            <MobileSidebar />
            <div className="flex items-center gap-x-4">
                <div className="hidden md:flex">
                    <Logo />
                </div>
                <Button size="sm" variant="primary" className="rounded-sm hidden md:block h-auto py-1.5 px-2">Create</Button>
                <Button size="sm" variant="primary" className="rounded-sm block md:hidden">
                    <Plus className="h-4 w-4"/>
                </Button>
            </div>
        </nav>
    );
};