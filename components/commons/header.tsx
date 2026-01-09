import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

interface HeaderProps {
  title: string;
  icon: React.ReactElement | undefined;
}
const Header = ({ title, icon }: HeaderProps) => {
  return (
    <section>
      <header
        className="md:hidden w-[100%] text-md font-semibold  flex justify-end items-center
         h-12 border-neutral-200 dark:border-neutral-800 border-b-1
          transition fixed top-0 z-50 bg-neutral-200/20 dark:bg-zinc-700/40"
      >
        {" "}
      </header>

      <div className="flex mt-20 ml-4 gap-4">
        {icon}
        <p className="text-blue-900 text-4xl mb-8 font-bold flex dark:text-zinc-400">
          {title}
        </p>
      </div>
    </section>
  );
};

export default Header;

