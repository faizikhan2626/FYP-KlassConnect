import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import React from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  AreaChart,
  Tooltip,
  Area,
} from "recharts";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";

type Props = {
  isDashboard?: boolean;
};

const CourseAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery({});

  //   const analyticsData = [
  //     { name: "Jun, 2024", count: 30 },
  //     { name: "Jul, 2024", count: 52 },
  //     { name: "Aug, 2024", count: 34 },
  //     { name: "Sep, 2024", count: 65 },
  //     { name: "Oct, 2024", count: 97 },
  //     { name: "Nov, 2024", count: 88 },
  //     { name: "Dec, 2024", count: 77 },
  //     { name: "Jan, 2025", count: 56 },
  //     { name: "Feb, 2025", count: 65 },
  //     { name: "Mar, 2025", count: 47 },
  //   ];

  const analyticsData: any = [];
  data?.users?.last12Months?.forEach((item: any) => {
    analyticsData.push({ name: item.month, count: item.count });
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            !isDashboard
              ? "mt-[50px]"
              : "mt-[50px]  dark:bg-[#111C43] shadow-sm pb-5 rounded-s"
          }`}>
          <div className={`${isDashboard ? "!ml-8 mb-5" : ""}`}>
            <h1
              className={`${styles.title} ${
                isDashboard && "!text-[20px]"
              } px-5 text-center font-bold`}>
              Users Analytics
            </h1>
          </div>
          <div
            className={`w-full ${
              isDashboard ? "h-[30vh]" : "h-screen"
            } items-center justify-center`}>
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={!isDashboard ? "50%" : "100%"}>
              <AreaChart
                data={analyticsData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#4d62d9"
                  fill="#4d62d9"
                />
              </AreaChart>
            </ResponsiveContainer>
            {!isDashboard && (
              <p className={`${styles.label} pt-5 text-center`}>
                Last 12 months analytics data{""}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
