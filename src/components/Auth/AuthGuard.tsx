"use client"
import { useGetUserByIdQuery } from '@/redux/features/api/authApi';
import { useAppSelector } from '@/redux/hooks';
import { ReactNode } from 'react';
import { IUser } from '../Cryptohub/Types';

interface AuthGuardProps {
    children: ReactNode;
    fallback?: ReactNode;
    requireAuth?: boolean;
}

const AuthGuard = ({ children, fallback, requireAuth = false }: AuthGuardProps) => {
    // If authentication is not required, render children
    if (!requireAuth) {
        return <>{children}</>;
    }

    // For protected routes, show fallback or children
    return fallback ? <>{fallback}</> : <>{children}</>;
};

export default AuthGuard;



// "use client";
// import { useGetUserByIdQuery } from '@/redux/features/api/authApi';
// import { useAppSelector } from '@/redux/hooks';
// import { useRouter } from 'next/navigation';
// import { ReactNode, useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
// import { IUser } from '../Cryptohub/Types';

// const AuthGuard = ({ children }: { children: ReactNode }) => {
//     const router = useRouter();
//     const user: IUser | null = useAppSelector((state) => state.auth.user);
//     const { data: userFromDb, isLoading: userFromDbLoading, refetch } = useGetUserByIdQuery(user?.id || '', { skip: !user?.id });
//     const [ hasRedirected, setHasRedirected ] = useState(false);

//     useEffect(() => {
//         if (!user && !userFromDbLoading && !hasRedirected) {
//             toast.error("Please Login First!");
//             setHasRedirected(true);
//             router.push("/auth/login");
//         } else if (user?.id && !userFromDbLoading) {
//             refetch();
//         }
//     }, [ user, userFromDb, userFromDbLoading, hasRedirected, router, refetch ]);

//     // Prevent the component from rendering children until loading is complete or redirection is handled
//     if (userFromDbLoading || !userFromDb || (!user && !userFromDb)) return null;

//     return <div>{children}</div>;
// };

// export default AuthGuard;

