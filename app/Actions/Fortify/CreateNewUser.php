<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param array<string, string> $input
     */
    public function create(array $input): User
    {
        Log::info($input);
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'rollno' => ['required', 'string', 'min:8', 'max:8'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
            'h-captcha-response' => ['required', 'string'],
        ])->validate();

        $ip = request()->ip();
        $h_captcha_response = $input['h-captcha-response'];
        $response =
            Http::asForm()->post("https://api.hcaptcha.com/siteverify", [
                "secret" => config('hcaptcha.secret'),
                "response" => $h_captcha_response
            ]);
        $json = $response->json();

        if (!$json["success"]) {
            abort(403, "Captcha validation failed");
        }

        return User::create([
            'name' => $input['name'],
            'rollno' => $input['rollno'],
            'email' => $input['email'],
            'password' => $input['password'],
        ]);
    }
}
