import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CustomerRowProps {
  name: string;
  email: string;
  avatarSrc: string;
}

export function CustomerRow({ name, email, avatarSrc }: CustomerRowProps) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10 border border-gray-200">
        <AvatarImage src={avatarSrc} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-sm text-gray-500">{email}</div>
      </div>
    </div>
  );
}
