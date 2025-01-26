'use client';

// translations

// react
import { useEffect, useRef, useState } from 'react';

// hooks & utils

// components ui
import { ThemeModeToggle } from '@/Components/Theme/theme-mode-toggle';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/Components/shadcn/ui/navigation-menu';
import { ScrollArea } from '@/Components/shadcn/ui/scroll-area';
import { Separator } from '@/Components/shadcn/ui/separator';
import { ButtonNav } from '@/Components/ui/button/ButtonNav';
import CartSheet from '@/Pages/Cart/CartSheet';
import { Link, usePage } from '@inertiajs/react';

interface NavbarProps {
    className?: string;
}

export function Navbar({ className }: NavbarProps) {
    const { auth } = usePage().props;

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [isButtonNavChecked, setIsButtonNavChecked] = useState(false);

    const navbarRef = useRef<HTMLDivElement>(null);

    const menuItems = [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
    ];

    const authMenuItems = auth.user
        ? [
              {
                  label: 'Dashboard',
                  href: route(`${auth.user.role}.dashboard`),
              },
              {
                  label: 'Cart',
                  component: (
                      <CartSheet
                          trigger={
                              <img
                                  className="w-6"
                                  src="/icons/cart.svg"
                                  alt="Cart Icon"
                              />
                          }
                      />
                  ),
              },
          ]
        : [
              { label: 'Log in', href: route('login') },
              { label: 'Register', href: route('register') },
          ];

    const toggleNavbar = () => {
        setIsNavbarOpen((prev) => !prev);
        setIsButtonNavChecked((prev) => !prev);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            navbarRef.current &&
            !navbarRef.current.contains(event.target as Node)
        ) {
            setIsNavbarOpen(false);
            setIsButtonNavChecked(false);
        }
    };

    useEffect(() => {
        if (isNavbarOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isNavbarOpen]);

    return (
        <>
            <div className={`${className} hidden sm:block`} ref={navbarRef}>
                <div className="flex justify-between">
                    <NavigationMenu>
                        <NavigationMenuList className="space-x-8">
                            {menuItems.map((item) => (
                                <NavigationMenuItem
                                    className="cursor-pointer"
                                    key={item.label}
                                >
                                    <Link
                                        className={`text-xl dark:text-white ${navigationMenuTriggerStyle()}`}
                                        href={item.href}
                                    >
                                        {item.label}
                                    </Link>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                    <NavigationMenu>
                        <NavigationMenuList className="flex flex-row items-center justify-center space-x-4 cursor-pointer">
                            {authMenuItems.map((item) => (
                                <NavigationMenuItem key={item.label}>
                                    {item.component ? (
                                        <div>{item.component}</div>
                                    ) : (
                                        <Link
                                            className={`text-xl dark:text-white ${navigationMenuTriggerStyle()}`}
                                            href={item.href}
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </NavigationMenuItem>
                            ))}

                            <NavigationMenuItem className="pl-2">
                                <ThemeModeToggle />
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>

            <div
                className={`${className} flex flex-col justify-between sm:hidden`}
                ref={navbarRef}
            >
                <div className="flex justify-between">
                    <div className="p-1">
                        <ButtonNav
                            onClick={toggleNavbar}
                            checked={isButtonNavChecked}
                        />
                    </div>
                    <div className="flex flex-row space-x-4">
                        {authMenuItems.map((item) => (
                            <div
                                className="flex flex-col items-center justify-center cursor-pointer"
                                key={item.label}
                            >
                                {item.component ? (
                                    <div>{item.component}</div>
                                ) : (
                                    <Link
                                        className={`text-md dark:text-white ${navigationMenuTriggerStyle()}`}
                                        href={item.href}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <div className="pl-2">
                            <ThemeModeToggle />
                        </div>
                    </div>
                </div>

                {isNavbarOpen && (
                    <div>
                        <Separator className="my-4" />
                        <ScrollArea className="flex h-[120px] w-full rounded-md">
                            <div className="px-1 space-y-1 text-start">
                                {menuItems.map((item) => (
                                    <NavigationMenuItem
                                        className="cursor-pointer"
                                        key={item.label}
                                    >
                                        <Link
                                            className={`text-xl dark:text-white ${navigationMenuTriggerStyle()}`}
                                            href={item.href}
                                        >
                                            {item.label}
                                        </Link>
                                    </NavigationMenuItem>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                )}
            </div>
        </>
    );
}
