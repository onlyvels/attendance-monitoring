import {CartesianGrid, Line, LineChart, Text, TextProps, XAxis, YAxis} from "recharts"

import {Card, CardContent, CardHeader, CardTitle} from "@/Components/UI/Card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from "@/Components/UI/Chart"
import {Scrape, SubjectFilter} from "@/Pages/Dashboard";
import {Badge} from "@/Components/UI/Badge";
import React from "react";

interface CustomizedAxisTickProps {
    x: number;
    y: number;
    payload: any;
    index: number;
    visibleTicksCount: number;
}

const CustomizedAxisTick: React.FC<CustomizedAxisTickProps> = (props) => {
    console.log(props);
    const {x, y, payload, index, visibleTicksCount} = props;

    const tickProps: TextProps = {
        textAnchor: "middle",
        verticalAnchor: "start",
        orientation: "bottom",
        stroke: 'none',
        fill: "#666"
    };

    if (index === visibleTicksCount - 1)
        tickProps.textAnchor = "start";

    if (index === 0)
        tickProps.textAnchor = "end";

    return (
        <Text className="recharts-cartesian-axis-tick-value" x={x} y={y} {...tickProps}
        >
            {payload.value}
        </Text>
    );
}

const CustomizedYAxisTick: React.FC<CustomizedAxisTickProps> = (props) => {
    const {x, y, payload, index} = props;

    const tickProps: TextProps = {
        textAnchor: "end",
        verticalAnchor: "middle",
        orientation: "bottom",
        stroke: 'none',
        fill: "#666"
    };

    if (index === 0)
        tickProps.verticalAnchor = "end";

    return (
        <Text className="recharts-cartesian-axis-tick-value" x={x} y={y} {...tickProps}
        >
            {payload.value + "%"}
        </Text>
    );
}

export default function SubjectAttendanceChart({subject_filters, scrapes}: {
    subject_filters: SubjectFilter[],
    scrapes: Scrape[]
}) {
    // Every row -> Every subject attendance group by date
    const chartData = scrapes.map((sub_attendance, i) => {
        const subject_percents = sub_attendance.subject_attendances.reduce((acc, a, i) => ({
            ...acc,
            [subject_filters[i].subject.subject_code]: a.percent
        }), {});

        return {
            "date": sub_attendance.date,
            "percent": sub_attendance.attendance.percent,
            ...subject_percents,
        };
    });

    const chartConfig = subject_filters.reduce((acc, subject, i) => (
        {
            ...acc,
            [subject.subject.subject_code]: {
                label: subject.subject.name,
                color: `hsl(${i * 36}, 70%, 50%)`
            }
        }
    ), {}) satisfies ChartConfig;

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-lg font-bold flex gap-2 text-center justify-center items-center">Subject Wise
                    Attendance <Badge variant="outline">7 Days</Badge></CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[50vh] min-h-[200px] w-full">
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{left: 0}}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.3}/>
                        <XAxis
                            dataKey="date"
                            axisLine={{stroke: "#d3d3d3"}}
                            tickLine={{stroke: "#d3d3d3"}}
                            tick={(props) => <CustomizedAxisTick {...props} />}
                            reversed={true}
                            interval={0}
                        />
                        <YAxis
                            axisLine={{stroke: "#d3d3d3"}}
                            tickLine={{stroke: "#d3d3d3"}}
                            domain={[0, 100]}
                            width={40}
                            tick={(props) => <CustomizedYAxisTick {...props} />}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent className="hidden lg:grid"
                                                     labelFormatter={(label, payload) => `${label} - ${payload[0].payload.percent}%`}
                                                     labelClassName="font-semibold text-center"
                                />
                            }
                        />
                        <ChartLegend
                            content={<ChartLegendContent className="hidden lg:flex"/>}
                        />

                        {subject_filters.map((subject) => (
                            <Line
                                key={subject.subject.id}
                                dataKey={subject.subject.subject_code}
                                type="linear"
                                stroke={`var(--color-${subject.subject.subject_code})`}
                                dot={false}
                            />
                        ))}
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
