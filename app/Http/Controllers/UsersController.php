<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    public function login(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|max:18'
        ]);

        if ($validator->fails())
            return response('Incorect data filled in the form, please try again.', 500);

        if (!Auth::attempt($validator->validated()))
            return response('Unfortunately we couldn\'t match your account.', 401);

        $token = Auth::user()->createToken('authToken')->accessToken;

        return ['token' => $token, 'user' => Auth::user()];
    }

    public function logout()
    {
        Auth::user()->tokens->each(function ($token) {
            $token->delete();
        });

        return 'We\'ll wait for you to come back :(';
    }

    public function checkAuth() {
        return ['user' => Auth::user()];
    }
}
