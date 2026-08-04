"use client";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { mockOrders } from "@/lib/mock-data"; // adjust the path

export const description = "A linear line chart";

const chartData = mockOrders.reduce(
  (acc, order) => {
    const day = new Date(order.createdAt).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    });

    const existing = acc.find((item) => item.day === day);

    if (existing) {
      existing.revenue += order.total;
    } else {
      acc.push({
        day,
        revenue: order.total,
      });
    }

    return acc;
  },
  [] as { day: string; revenue: number }[],
);
const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

function ProviderChart() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue</CardTitle>

          <CardDescription>
            Revenue generated from customer orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />

              <Line
                dataKey="orders"
                type="linear"
                stroke="var(--color-orders)"
                strokeWidth={2}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="revenue"
                type="linear"
                stroke="var(--color-revenue)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ProviderChart;
