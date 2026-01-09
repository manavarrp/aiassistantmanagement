interface HeaderProps {
  title: string;
  icon: React.ReactNode;
}

export default function Header({ title, icon }: HeaderProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <div className="w-6 h-6 sm:w-10 sm:h-10 flex-shrink-0">{icon}</div>
      <p className="text-blue-900 text-2xl sm:text-4xl font-bold flex dark:text-zinc-400">
        {title}
      </p>
    </div>
  );
}
