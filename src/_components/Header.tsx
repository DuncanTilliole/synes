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
import { AiOutlineShopping } from "react-icons/ai";
import GithubIcon from "./icons/GithubIcon";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="sticky top-0 py-4">
      <NavigationMenu className="max-w-full flex justify-center space-x-0">
        <NavigationMenuList className="max-w-full space-x-0">
          <NavigationMenuItem className="flex-1 w-64 text-center">
            <h1 className="text-lg font-bold text-primary">SYNES</h1>
          </NavigationMenuItem>
          <NavigationMenuItem>
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
                      <p className="text-sm leading-tight text-muted-foreground">
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
          <NavigationMenuItem>
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
          <NavigationMenuItem className="flex-1 w-64 text-center">
            <div className="space-x-3">
              <Link
                href="/panier"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "size-6 p-0"
                )}
              >
                <AiOutlineShopping size={30} />
              </Link>
              <Link
                href="/compte"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "size-6 p-0"
                )}
              >
                <GithubIcon size={30} className="text-foreground" />
              </Link>
            </div>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
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
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
