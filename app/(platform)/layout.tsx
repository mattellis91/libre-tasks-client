import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const PlatformLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div>{children}</div>
    )
};


export default PlatformLayout;