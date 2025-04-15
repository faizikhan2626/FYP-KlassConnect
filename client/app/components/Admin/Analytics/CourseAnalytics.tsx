import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
} from "recharts";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";

type Props = {};

const CourseAnalytics = (props: Props) => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery({});

  //   const analyticsData = [
  //     { name: "June, 2024", uv: 3 },
  //     { name: "July, 2024", uv: 5 },
  //     { name: "August, 2024", uv: 1 },
  //     { name: "September, 2024", uv: 6 },
  //     { name: "November, 2024", uv: 9 },
  //   ];

  const analyticsData: any = [];
  data?.courses?.last12Months?.forEach((item: any) => {
    analyticsData.push({ name: item.month, uv: item.count });
  });

  const minValue = 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div className="mt-[50px]">
            <h1 className={`${styles.title} px-5 text-center font-bold`}>
              Courses Analytics
            </h1>
          </div>
          <div className="w-full h-[90%] items-center justify-center">
            <ResponsiveContainer width="90%" height="70%">
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minValue, "auto"]} />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className={`${styles.label} px-5 text-center`}>
              Last 12 months analytics data{" "}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
