import { Mail, Search, UserPlus, Users, Lock } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

const CustomerRow = ({
  name,
  email,
  avatarSrc,
}: {
  name: string;
  email: string;
  avatarSrc: string;
}) => (
  <div className="flex items-center gap-3">
    <Image
      src={avatarSrc}
      alt={name}
      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
      width={100}
      height={100}
    />
    <div className="flex-1 min-w-0">
      <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate">
        {name}
      </h3>
      <p className="text-xs sm:text-sm text-gray-500 truncate">{email}</p>
    </div>
  </div>
);

export const RecentCustomers = () => {
  return (
    <Card className="border border-gray-200 rounded-lg shadow-sm w-full relative overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-medium mb-2">
          Recent Customers
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">
          Lorem ipsum dolor sit ametis.
        </p>

        {/* Blurred Customer List */}
        <div className="relative">
          <div className="blur-sm opacity-25 pointer-events-none space-y-4 sm:space-y-6">
            <CustomerRow
              name="Jenny Wilson"
              email="w.lawson@example.com"
              avatarSrc="/api/placeholder/40/40"
            />
            <CustomerRow
              name="Devon Lane"
              email="devon@example.com"
              avatarSrc="/api/placeholder/40/40"
            />
            <CustomerRow
              name="Sarah Chen"
              email="sarah@example.com"
              avatarSrc="/api/placeholder/40/40"
            />
            <CustomerRow
              name="Mike Rodriguez"
              email="mike@example.com"
              avatarSrc="/api/placeholder/40/40"
            />
          </div>

          {/* Coming Soon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-95 backdrop-blur-sm">
            <div className="text-center max-w-xs mx-auto p-4 sm:p-6">
              <div className="relative mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-blue-600 rounded-full flex items-center justify-center">
                  <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                Coming Soon
              </h3>
              <p className="text-gray-600 mb-4 sm:mb-5 text-xs sm:text-sm leading-relaxed">
                Advanced customer management with profiles, activity tracking,
                and engagement insights.
              </p>

              <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs text-gray-500 mb-4 sm:mb-5">
                <div className="flex items-center gap-1">
                  <UserPlus className="w-3 h-3" />
                  <span className="hidden sm:inline">Profiles</span>
                  <span className="sm:hidden">Prof</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  <span className="hidden sm:inline">Contact</span>
                  <span className="sm:hidden">Mail</span>
                </div>
                <div className="flex items-center gap-1">
                  <Search className="w-3 h-3" />
                  <span className="hidden sm:inline">Search</span>
                  <span className="sm:hidden">Find</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
