import {PageProps} from '@/types';
import {Head, Link} from '@inertiajs/react';
import {Button} from "@/Components/UI/Button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/Components/UI/Card";

export default function Welcome({
                                    auth,
                                    laravelVersion,
                                    phpVersion,
                                }: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    return (
        <>
            <Head title="Attendance"/>

            <main>
                <section className="max-w-screen-xl mx-auto py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
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
                                <Button size="lg">
                                    <Link href={route("register")}>Get Started</Link>
                                </Button>
                                <Button variant="outline" size="lg">
                                    <Link href={route("login")}>Login</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="pricing"
                         className="py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
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
