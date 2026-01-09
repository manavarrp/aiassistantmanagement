import { Card, CardContent } from "@/components/ui/card";

interface CardWrappedProps {
  children: React.ReactNode;
}

const CardWrapped = ({ children }: CardWrappedProps) => {
  return (
    <Card className="
        w-full
        transition-all
        duration-300
        ease-in-out
        hover:shadow-lg
        hover:-translate-y-1
        cursor-pointer
      ">
      <CardContent className="px-5 py-1">
        {children}
      </CardContent>
    </Card>
  );
};

export default CardWrapped;
