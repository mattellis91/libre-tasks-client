import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="flex items-center justify-center flex-col align-middle h-full -mt-10">{children}</div>
    )
};

export default AuthLayout;