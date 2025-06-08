"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { RecentEnrollment } from "@/utilities/instructor";

interface RecentEnrollmentsProps {
  enrollments: RecentEnrollment[] | undefined;
}

const RecentEnrollments = ({ enrollments }: RecentEnrollmentsProps) => {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Recent Enrollments</h3>
      <div className="space-y-4">
        {enrollments?.slice(0, 20).map((enrollment, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50"
          >
            <Avatar className="h-8 w-8">
              {/* <AvatarImage src={enrollment.avatarUrl} alt={enrollment.user.first_name} /> */}

              <AvatarFallback>{enrollment.user.first_name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {enrollment.user.first_name} {enrollment.user.last_name}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {enrollment.course.title}
              </p>
            </div>
            <time className="text-sm text-muted-foreground">
              {new Date(enrollment.enrolled_at).toLocaleDateString()}
            </time>
          </div>
        ))}
      </div>
    </Card>

    // <Card className="p-4">
    //   <h3 className="font-semibold mb-4">Recent Enrollments</h3>
    //   <div className="flex items-center justify-center h-32">
    //     <p className="text-muted-foreground">Coming Soon</p>
    //   </div>
    // </Card>
  );
};

export default RecentEnrollments;
