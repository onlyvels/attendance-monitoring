import {Head, Link} from '@inertiajs/react';
import {Button} from "@/Components/UI/Button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/Components/UI/Card";
import {Bell, Clock, Database} from "lucide-react";

export default function Welcome() {
    return (
        <>
            <Head title="Attendance"/>

            <main>
                <section className="max-w-screen-xl mx-auto py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="flex flex-col gap-y-2 items-center">
                                <img src="https://static.rizexor.com/assets/ov.png" alt="OnlyVels" className="w-64"/>
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Monitor Attendance with Ease
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    Track, analyze, and improve student attendance across all subjects with our
                                    intuitive monitoring system.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Button size="lg" asChild>
                                    <Link href={route("register")}>Get Started</Link>
                                </Button>
                                <Button variant="outline" size="lg" asChild>
                                    <Link href={route("login")}>Login</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div className="container px-4 md:px-6 mx-auto">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                            How It Works
                        </h2>
                        <ol className="space-y-8 max-w-2xl mx-auto">
                            <li className="flex items-start">
                                <span
                                    className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-4 shrink-0">1</span>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 flex items-center">
                                        <Database className="w-6 h-6 mr-2 text-primary"/>
                                        Daily Data Scraping
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Our system automatically scrapes the official university's attendance page at 7
                                        PM daily, ensuring your data is always up-to-date.
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span
                                    className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-4 shrink-0">2</span>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 flex items-center">
                                        <Clock className="w-6 h-6 mr-2 text-primary"/>
                                        Timely Updates
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Your attendance data is refreshed every evening, allowing you to start each day
                                        with the most current information.
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span
                                    className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mr-4 shrink-0">3</span>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 flex items-center">
                                        <Bell className="w-6 h-6 mr-2 text-primary"/>
                                        Instant Notifications
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Receive real-time updates through the Ntfy app, keeping you informed about your
                                        attendance status without any hassle.
                                    </p>
                                </div>
                            </li>
                        </ol>
                    </div>
                </section>

                <section id="pricing"
                         className="py-12 md:py-24 lg:py-32">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                            Simple Pricing
                        </h2>
                        <div className="flex justify-center">
                            <Card className="w-128">
                                <CardHeader>
                                    <CardTitle className="text-2xl">Attendance Monitor</CardTitle>
                                    <CardDescription>Everything you need to track attendance</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center">
                                        <span className="text-5xl font-bold">₹2</span>
                                        <span className="text-gray-500 dark:text-gray-400">/month</span>
                                    </div>
                                    <ul className="mt-6 space-y-2">
                                        <li className="flex items-center">
                                            <svg
                                                className="w-4 h-4 mr-2 text-green-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Track multiple subjects
                                        </li>
                                        <li className="flex items-center">
                                            <svg
                                                className="w-4 h-4 mr-2 text-green-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Visual analytics
                                        </li>
                                        <li className="flex items-center">
                                            <svg
                                                className="w-4 h-4 mr-2 text-green-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Real-time updates
                                        </li>
                                    </ul>
                                    <Button className="w-full mt-6" asChild>
                                        <Link href={route("register")}>Get Started</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
