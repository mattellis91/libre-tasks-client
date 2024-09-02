"use client"

import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts"; 

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";
import { NavItem } from "./nav-item";

interface SidebarProps {
    storageKey?: string;
}

export const Sidebar = ({
    storageKey = "t-sidebar-state"
}:SidebarProps) => {

    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {});

    const defaultAccordionValue: string[] = Object.keys(expanded).reduce((acc:string[], key:string) => {
        if(expanded[key]) {
            acc.push(key);
        }
        return acc;
    }, []);

    const onExpand = (id:string) => {
        setExpanded((curr) => ({
            ...curr,
            [id]: !expanded[id]
        }))
    };

    return (
        <>
            <div className="font-medium text-xs flex items-center mb-1">
                <span className="pl-4">
                    Workspaces
                </span>
                <Button asChild type="button" size="icon" variant="ghost" className="ml-auto">
                    <Link href="">
                        <Plus className="h-4 w-4"/>
                    </Link>
                </Button>
            </div>
            <Accordion type="multiple" defaultValue={defaultAccordionValue} className="space-y-2">
                <NavItem key="test1" isActive={true} isExpanded={false} organization={{
                    id:"test1",
                    slug:"test-1",
                    imageUrl:"https://avatar.iran.liara.run/public",
                    name: "Test 1"
                }} onExpand={onExpand}/>
                <NavItem key="test2" isActive={false} isExpanded={false} organization={{
                    id:"test2",
                    slug:"test-2",
                    imageUrl:"https://avatar.iran.liara.run/public",
                    name: "Test 2"
                }} onExpand={onExpand}/>
            </Accordion>
        </>
    )
}