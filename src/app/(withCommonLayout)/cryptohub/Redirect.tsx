"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Redirect = () => {
    const router = useRouter();

    useEffect(() => {
        router.replace("/cryptohub/feed");
    }, [router]);

    return null;
}

export default Redirect;
