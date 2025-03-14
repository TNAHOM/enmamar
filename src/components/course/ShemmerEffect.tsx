import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function ShemmerEffect() {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md ">
      <div className="aspect-video relative overflow-hidden">
        <div className="bg-gray-300 animate-pulse w-full h-full"></div>
      </div>
      <CardHeader className="p-4">
        <div className="space-y-1">
          <div className="bg-gray-300 animate-pulse h-6 w-3/4"></div>
          <div className="bg-gray-300 animate-pulse h-4 w-1/2"></div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="bg-gray-300 animate-pulse h-4 w-full mb-2"></div>
        <div className="bg-gray-300 animate-pulse h-4 w-5/6 mb-2"></div>
        <div className="bg-gray-300 animate-pulse h-4 w-4/6"></div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-300 animate-pulse h-4 w-4 mr-1"
              ></div>
            ))}
          </div>
          <div className="bg-gray-300 animate-pulse h-4 w-8 ml-1"></div>
        </div>
        <Button
          size="default"
          className="bg-gray-300 animate-pulse w-24 h-8"
        ></Button>
      </CardFooter>
    </Card>
  );
}
