import { Navbar } from '@/Components/NavBar';
// import { ThemeModeToggle } from '@/Components/Theme/theme-mode-toggle';
import { usePage } from '@inertiajs/react';

interface LayoutPageProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutPageProps) {
    const { auth } = usePage().props;
    // console.log(auth);

    return (
        <>
            <header className="fixed top-0 left-0 z-10 w-full shadow-md">
                <Navbar
                    className={`flex w-screen p-4 px-4 md:px-24 lg:px-48 bg-navbar`}
                />
            </header>

            <main className="relative flex flex-col pt-[70px] bg-background h-full">
                {children}
            </main>
        </>
    );
}
