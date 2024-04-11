<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function logout(Request $request)
    {
        $data = $request->user()->currentAccessToken()->delete();
        return response()->json($data);
    }

    public function login(Request $request)
    {

        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            $user = User::where('email', $request->email)->first();

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

        $data['user'] = $user;
        $data['token'] = $user->createToken($user->name)->plainTextToken;


        // $role = Role::where('name', 'user')->first(); 
        // $user->roles()->attach($role);
        return response()->json($data);
    }
}
