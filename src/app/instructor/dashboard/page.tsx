"use client";
import InstructorLayout from "@/components/instructor/layout/InstructorLayout";
import InstructorCourseList from "@/components/instructor/course/InstructorCourseList";
import StatsGraph from "@/components/instructor/dashboard/StatsGraph";
import { useAuthStore } from "@/lib/store/auth-store";
import { useGetCourses } from "@/hooks/useGetCourses";
import {
  ChartDataItem,
  getCourseAnalytics,
} from "@/hooks/useInstructorAnalysis";
import { useEffect, useState } from "react";
import { useTimeFilter } from "@/hooks/useTimeFilter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, BarChart3, BookOpen, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ImprovedTimeFilter } from "@/components/admin/instructor/TimeFilterProps";

export default function InstructorDashboard() {
  const { user } = useAuthStore();
  const { filter, updateFilter, getQueryParam } = useTimeFilter();
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const { data, error, loading } = useGetCourses({
    apiRoute: `/api/instructors/${user?.id}?${getQueryParam()}`,
    type: "instructorCourse",
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const response = getCourseAnalytics(data) as ChartDataItem[];
      setChartData(response);
    } else {
      setChartData([]);
    }
  }, [data, getQueryParam]);

  const renderStatsCards = () => {
    if (!data || !Array.isArray(data) || data.length === 0) return null;

    const totalCourses = data.length;
    const totalRevenue = chartData.reduce(
      (sum, item) => sum + (item.revenue || 0),
      0
    );
    const totalEnrollments = chartData.reduce(
      (sum, item) => sum + (item.enrollment || 0),
      0
    );

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">
                  Total Courses
                </p>
                <p className="text-2xl font-bold text-green-900">
                  {totalCourses}
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-purple-900">
                  ${totalRevenue.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-800">
                  Total Enrollments
                </p>
                <p className="text-2xl font-bold text-orange-900">
                  {totalEnrollments.toLocaleString()}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderLoadingSkeleton = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    </div>
  );

  const renderErrorState = () => (
    <Card className="bg-red-50 border-red-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-center text-center py-8">
          <div className="space-y-3">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
            <p className="text-red-800 font-medium">
              Failed to load dashboard data
            </p>
            <p className="text-red-600 text-sm">
              Please try again later or contact support if the issue persists.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderEmptyState = () => (
    <Card className="bg-gray-50 border-gray-200">
      <CardContent className="p-6">
        <div className="text-center py-10">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium mb-2">No courses found</p>
          <p className="text-gray-500 text-sm">
            {
              "You haven't created any courses yet. Start by creating your first course!"
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <InstructorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Instructor Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Monitor your courses performance and analytics
            </p>
          </div>
          <Badge variant="outline" className="bg-white border-gray-300">
            Welcome back, {user?.first_name || "Instructor"}!
          </Badge>
        </div>

        {/* Time Filter */}
        <ImprovedTimeFilter
          filterType={filter.type}
          filterValue={filter.value}
          onFilterChange={updateFilter}
          isLoading={loading}
        />

        {/* Stats Overview */}
        {loading ? (
          renderLoadingSkeleton()
        ) : error ? (
          renderErrorState()
        ) : !data || !Array.isArray(data) || data.length === 0 ? (
          renderEmptyState()
        ) : (
          <>
            {renderStatsCards()}

            {/* Analytics Chart */}
            <div className="w-full">
              <StatsGraph data={chartData} />
            </div>
          </>
        )}

        {/* Courses Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Your Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <p className="text-red-600">
                  Failed to load courses. Please try again later.
                </p>
              </div>
            ) : !data || !Array.isArray(data) || data.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">
                  {"You haven't created any courses yet."}
                </p>
              </div>
            ) : (
              <InstructorCourseList data={data} />
            )}
          </CardContent>
        </Card>
      </div>
    </InstructorLayout>
  );
}
