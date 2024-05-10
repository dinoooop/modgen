<?php

namespace App\Http\Controllers;

use App\Mail\ResetPasswordMail;
use App\Mail\VerifyMail;
use App\Models\Role;
use Illuminate\Http\Request;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request)
    {

        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            $user = User::where('email', $request->email)->with('roles')->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                throw new Exception("The provided credentials are incorrect.");
            }

            $data['user'] = $user;
            $data['token'] = $user->createToken($user->name)->plainTextToken;


            return response()->json($data);
        } catch (Exception $e) {
            // Code to handle the exception
            return response()->json(['message' => $e->getMessage()], 422);
        }
    }

    public function logout(Request $request)
    {
        $data = $request->user()->currentAccessToken()->delete();
        return response()->json($data);
    }

    public function register(Request $request)
    {

        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed'
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $role = Role::where('name', 'subscriber')->first();
        $user->roles()->attach($role->id);

        if (config('app.mail_send')) {
            $user->process_link = Str::random();
            Mail::to($user->email)->send(new VerifyMail($user));
        } else {
            $user->is_verified = true;
        }

        $user->save();
        
        $data['user'] = $user;
        $data['token'] = $user->createToken($user->name)->plainTextToken;
        return response()->json($data);
    }

    public function resendVerificationCode(Request $request)
    {
        try {
            $user = Auth::user();
            $user->verification_code = rand(1000, 9999);
            $user->save();
            if (config('app.mail_send')) {
                Mail::to($user->email)->send(new VerifyMail($user));
            }
            return response()->json(['message' => "Please check your inbox"]);
        } catch (Exception $e) {
            return response()->json(['message' => "Failed to resend"], 422);
        }
    }

    public function verify(Request $request)
    {
        $request->validate([
            'process_link' => 'required'
        ]);

        $user = User::where('process_link', $request->process_link)->first();
        sleep(2);

        if (isset($user->id)) {
            $user->is_verified = true;
            $user->save();
            $response['message'] = 'Your email verification completed successfully';
            return response()->json($response);
        } else {
            $response['message'] = 'Verification failed';
            return response()->json($response, 422);
        }
    }

    public function check(Request $request)
    {
        $data['user'] = Auth::user();
        return response()->json($data);
    }

    public function show(Request $request)
    {
        $user = Auth::user();
        return response()->json($user);
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        $validated = $request->validate([
            'name' => 'sometimes|required|string',
            'email' => 'sometimes|required|email|unique:users,email,' . $user->id
        ]);

        $user->update($validated);
        return response()->json(['message' => 'Data updated successfully']);

    }

    public function security(Request $request)
    {

        $validated = $request->validate([
            'old_password' => 'required',
            'password' => 'required|confirmed'
        ]);

        $user = Auth::user();

        if (!Hash::check($validated['old_password'], $user->password)) {
            return response()->json(['message' => 'Incorrect password'], 422);
        }

        $user = $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json(['message' => 'Password updated successfully']);
    }

    /**
     * 
     * 
     * Send reset password link
     */
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $response = [];

        $user = User::where('email', $request->email)->first();

        if (isset($user->id) && $user->is_verified) {

            $user->process_link = Str::random();
            $user->save();

            if (config('app.mail_send')) {
                Mail::to($user->email)->send(new ResetPasswordMail($user));
            }

            $response['message'] = 'Reset link have sent to this email';
            return response()->json($response);
        } else {
            $response['message'] = 'Email not found';
            return response()->json($response, 422);
        }
    }

    public function resetPassword(Request $request)
    {

        $request->validate([
            'email' => 'required|email',
            'password' => 'required|confirmed'
        ]);

        $response = [];
        $user = User::where('email', $request->email)->first();

        if (
            isset($request->reset_link) &&
            isset($user->process_link) &&
            $user->process_link == $request->reset_link
        ) {
            $user->process_link = null;
            $user->password = Hash::make($request->password);
            $user->save();
            $response['message'] = 'Password updated successfully';
            return response()->json($response);
        } else {
            $response['message'] = 'Password reset request not found';
            return response()->json($response, 404);
        }
    }
}
