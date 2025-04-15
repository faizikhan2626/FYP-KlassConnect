import React from "react";
import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";

const colors = ["#4d62d9", "crimson"];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const OrderAnalytics = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetOrdersAnalyticsQuery({});

  //dummy Data for Testing
  //   const analyticsData = [
  //     { name: "Jun, 2024", uv: 30 },
  //     { name: "Jul, 2024", uv: 52 },
  //     { name: "Aug, 2024", uv: 34 },
  //     { name: "Sep, 2024", uv: 65 },
  //     { name: "Oct, 2024", uv: 97 },
  //     { name: "Nov, 2024", uv: 88 },
  //     { name: "Dec, 2024", uv: 77 },
  //     { name: "Jan, 2025", uv: 56 },
  //     { name: "Feb, 2025", uv: 65 },
  //     { name: "Mar, 2025", uv: 47 },
  //   ];

  const analyticsData: any = [];
  data?.Orders?.last12Months?.forEach((item: any) => {
    analyticsData.push({ name: item.name, uv: item.count });
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            !isDashboard
              ? "mt-[50px] "
              : "mt-[50px] dark:bg-[#111C43] bg-white shadow-sm pb-5 rounded-s"
          }`}>
          <div className={`${isDashboard ? "!ml-8 mb-5 " : ""}`}>
            <h1
              className={`${styles.title} ${
                isDashboard && "!text-[20px]"
              } px-5 text-center font-bold`}>
              Orders Analytics
            </h1>
          </div>
          <div
            className={`w-full ${
              isDashboard ? "h-[30vh]" : "h-screen"
            } items-center justify-center`}>
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={!isDashboard ? "50%" : "100%"}>
              <BarChart
                data={analyticsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar
                  dataKey="uv"
                  fill="#8884d8"
                  shape={<TriangleBar />}
                  label={{ position: "top" }}>
                  {analyticsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            {!isDashboard && (
              <p className={`${styles.label} pt-5 text-center`}>
                Last 12 months analytics data
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderAnalytics;
