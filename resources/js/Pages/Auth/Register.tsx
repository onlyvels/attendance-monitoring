import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import {FormEventHandler} from 'react';
import {Button} from "@/Components/UI/Button";
import {Input} from "@/Components/UI/Input";
import {Label} from "@/Components/UI/label";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export default function Register() {
    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
        email: '',
        rollno: '',
        password: '',
        password_confirmation: '',
        'h-captcha-response': '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register"></Head>

            <form onSubmit={submit}>
                <div>
                    <Label htmlFor="name">Name</Label>

                    <Input
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        autoFocus={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        placeholder="Raja Gasanan"
                    />

                    <InputError message={errors.name} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <Label htmlFor="rollno">Roll No</Label>

                    <Input
                        id="rollno"
                        type="text"
                        name="rollno"
                        value={data.rollno}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('rollno', e.target.value)}
                        required
                        placeholder="22103001"
                    />

                    <InputError message={errors.rollno} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <Label htmlFor="email">Email</Label>

                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        placeholder="email@email.com"
                    />

                    <InputError message={errors.email} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <Label htmlFor="password">Password</Label>

                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        placeholder="Your ERP password"
                    />

                    <InputError message={errors.password} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <Label htmlFor="password_confirmation">Confirm Password</Label>

                    <Input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                        placeholder="Confirm Your ERP password"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="my-4">
                    <HCaptcha
                        sitekey="d6aa25f6-76b8-4efc-a9d0-5086bef85556"
                        onVerify={(token, ekey) => setData('h-captcha-response', token)}
                    />
                    <InputError
                        message={errors["h-captcha-response"]}
                        className="mt-2"
                    />
                </div>

                <div className="space-y-2">
                    <Button disabled={processing} className="w-full">
                        Register
                    </Button>

                    <Link
                        href={route('login')}
                        className="underline underline-offset-4 text-center block"
                    >
                        Already registered?
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
