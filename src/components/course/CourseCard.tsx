import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  description: string;
  price: string;
  image: string;
  rating: number;
}

export default function CourseCard({
  id,
  title,
  instructor,
  description,
  price,
  image,
  rating,
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md ">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={image || "/Images/thumbnail.webp"}
          alt={title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        <div className="absolute bottom-2 right-2">
          <Badge variant="secondary" className="bg-white/90 text-purple-600">
            {price}
          </Badge>
        </div>
      </div>
      <CardHeader className="p-4">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
          <p className="text-sm text-muted-foreground">
            Instructor: {instructor}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={i < Math.floor(rating) ? "#9333ea" : "none"}
                stroke={i < Math.floor(rating) ? "#9333ea" : "currentColor"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            ))}
          </div>
          <span className="text-sm ml-1">{rating.toFixed(1)}</span>
        </div>
        <Button size="default" className="bg-purple-600 hover:bg-purple-700">
          <Link href={`/course/${id}`}>See more</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
