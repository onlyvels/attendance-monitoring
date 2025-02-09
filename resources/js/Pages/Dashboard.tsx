import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head} from '@inertiajs/react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/Components/UI/Table";
import SubjectAttendanceChart from "@/Pages/Dashboard/SubjectAttendanceChart";
import {Alert, AlertDescription, AlertTitle,} from "@/Components/UI/alert";
import {InfoIcon} from "lucide-react";
import {Badge} from "@/Components/UI/Badge";

export interface SubjectFilter {
    id: number
    user_id: number
    subject_id: number
    created_at: string
    updated_at: string
    subject: Subject
}

export interface Subject {
    id: number
    subject_code: string
    name: string
    created_at: string
    updated_at: string
}

export interface Scrape {
    id: number
    user_id: number
    date: string
    subject_attendances: SubjectAttendance[]
    attendance: Attendance
}

export interface SubjectAttendance {
    id: number
    percent: number
    user_id: number
    subject_id: number
    scrape_id: number
}

export interface Attendance {
    user_id: number
    last_updated: string
    percent: number
}

export default function Dashboard({subject_filters, scrapes}: {
    subject_filters: SubjectFilter[],
    scrapes: Scrape[],
}) {
    if (scrapes.length === 0)
        return (
            <Authenticated
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Dashboard
                    </h2>
                }
            >
                <Head title="Dashboard"/>

                <div className="py-12 mx-auto max-w-7xl px-4 lg:px-8">
                    <Alert>
                        <InfoIcon className="h-4 w-4"/>
                        <AlertTitle>Nothing to show yet</AlertTitle>
                        <AlertDescription>
                            Our systems update daily at 7:00 PM with new data. Check back then to explore your
                            attendance.
                        </AlertDescription>
                    </Alert>
                </div>
            </Authenticated>
        )

    return (
        <Authenticated
            header={
                <h2 className="font-bold text-lg leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <SubjectAttendanceChart scrapes={scrapes.slice(0, 7)}
                                            subject_filters={subject_filters}/>

                    <h2 className="font-bold pb-6 text-lg flex gap-2 items-center justify-center">Attendance
                        Details <Badge variant="outline">Semester</Badge></h2>
                    <Table className="w-screen min-w-[2000px]">
                        <TableHeader>
                            <TableRow className="bg-gray-200">
                                <TableHead className="text-center font-semibold py-6 bg-inherit">RAN AT</TableHead>
                                <TableHead className="text-center font-semibold py-6 bg-inherit">ERP
                                    UPDATED</TableHead>
                                <TableHead className="text-center font-semibold py-6 bg-inherit">PERCENT</TableHead>
                                {subject_filters.map(subject => (
                                    <TableHead className="text-center font-semibold py-6 bg-inherit"
                                               key={subject.subject.id}>{subject.subject.name}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {scrapes.map(scrape => (
                                <TableRow key={scrape.id} className="bg-white">
                                    <TableCell className="text-center p-3">{scrape.date}</TableCell>
                                    <TableCell
                                        className="text-center p-3">{scrape.attendance.last_updated}</TableCell>
                                    <TableCell
                                        className="text-center p-3">{scrape.attendance.percent}%</TableCell>
                                    {scrape.subject_attendances.map(attendance => (
                                        <TableCell
                                            key={attendance.id}
                                            className="text-center p-3">{attendance.percent}%</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </Authenticated>
    )
}
