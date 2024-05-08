"use client";
import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { forwardRef } from "react";
import { HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi2";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="z-10 sticky top-0 py-4 flex justify-between items-center w-full">
      <div className="w-full text-center">
        <h1 className="text-lg font-bold text-primary">SYNES</h1>
      </div>
      <NavigationMenu className="w-full">
        <NavigationMenuList className="">
          <NavigationMenuItem className="text-right">
            <NavigationMenuTrigger>Collection</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[550px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/collection"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Nouveauté
                      </div>
                      <p className="text-sm leading-tight text-white/80">
                        Découvrez la dernière collection.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem
                  href="/docs"
                  title="J’ai peint l’ciel couleur lavande"
                >
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="text-left">
            <NavigationMenuTrigger>Produits</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[550px] lg:grid-cols-[.75fr_1fr]">
                <ListItem href="/docs" title="Hoodies">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="/docs" title="Tees">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="/docs" title="Pants">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="/docs" title="Accessoires">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="space-x-3 w-full text-center">
        <Link href="/cart" className={cn(buttonVariants({ variant: "link" }))}>
          <HiOutlineShoppingBag size={30} color="white" />
        </Link>
        <Link
          href="/account"
          className={cn(buttonVariants({ variant: "link" }))}
        >
          <HiOutlineUser size={30} color="white" />
        </Link>
        {/*
        <Link
          href="https://github.com/duncantilliole"
          className={cn(buttonVariants({ variant: "link" }))}
        >
          <GithubIcon size={20} className="text-foreground" />
        </Link>
        */}
      </div>
    </header>
  );
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground text-white/80">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
