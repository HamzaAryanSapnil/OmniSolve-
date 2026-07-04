import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ROUTES from "@/constants/route";
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./Navlinks";

export default function MobileNavigation() {
  return (
    <Sheet>
      <SheetTrigger>
        <Image
          src={"/icons/hamburger.svg"}
          alt="hamburger"
          width={36}
          height={36}
          className="cursor-pointer invert-colors sm:hidden"
        />
      </SheetTrigger>

      <SheetContent
        side="left"
        className={"background-light900_dark200 border-none"}
      >
        <SheetTitle className={"hidden"}>Navigation</SheetTitle>
        <Link href={"/"} className="flex items-center gap-1">
          <Image
            src={"/images/site-logo.svg"}
            width={23}
            height={23}
            alt="Omnisolve logo"
          />
          <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
            Omni<span className="text-primary-500">solve</span>
          </p>
        </Link>
        <div className="no-scrollbar h-[calc(100vh-80px)] flex flex-col justify-between overflow-y-auto">
          <SheetClose>
            <section className="flex h-full flex-col gap-6 pt-16 px-4">
              <NavLinks isMobileNav />
            </section>
          </SheetClose>

          <div className="flex flex-col gap-3 px-4">
            <SheetClose>
              <Link href={ROUTES.SIGNIN}>
                <Button className="w-full small-medium btn-secondary min-h-10.25 rounded-lg px-4 py-3 shadow-none ">
                  <span className="primary-text-gradient"> Log In </span>
                </Button>
              </Link>
            </SheetClose>
            <SheetClose>
              <Link href={ROUTES.SIGNUP}>
                <Button className="w-full small-medium btn-tertiary light-border-2 text-dark400_light900 min-h-10.25 rounded-lg border px-4 py-3 shadow-none ">
                  Sign Up
                </Button>
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
