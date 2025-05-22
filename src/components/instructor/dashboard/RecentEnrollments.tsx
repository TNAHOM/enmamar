"use client";

import { Card } from "@/components/ui/card";
// import { RecentEnrollment } from "@/utilities/instructor";

// interface RecentEnrollmentsProps {
//   enrollments: RecentEnrollment[];
// }

const RecentEnrollments = () => {
  return (
    // <Card className="p-4">
    //   <h3 className="font-semibold mb-4">Recent Enrollments</h3>
    //   <div className="space-y-4">
    //     {enrollments.map((enrollment) => (
    //       <div
    //         key={enrollment.id}
    //         className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50"
    //       >
    //         <Avatar className="h-8 w-8">
    //           <AvatarImage src={enrollment.avatarUrl} alt={enrollment.studentName} />
    //           <AvatarFallback>{enrollment.studentName[0]}</AvatarFallback>
    //         </Avatar>
    //         <div className="flex-1 min-w-0">
    //           <p className="text-sm font-medium truncate">
    //             {enrollment.studentName}
    //           </p>
    //           <p className="text-sm text-muted-foreground truncate">
    //             {enrollment.courseName}
    //           </p>
    //         </div>
    //         <time className="text-sm text-muted-foreground">
    //           {new Date(enrollment.date).toLocaleDateString()}
    //         </time>
    //       </div>
    //     ))}
    //   </div>
    // </Card>

    <Card className="p-4">
      <h3 className="font-semibold mb-4">Recent Enrollments</h3>
      <div className="flex items-center justify-center h-32">
        <p className="text-muted-foreground">Coming Soon</p>
      </div>
    </Card>
  );
};

export default RecentEnrollments;
