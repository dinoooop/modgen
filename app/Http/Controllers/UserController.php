<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    public function index(Request $request)
    {

        $this->authorize('index', User::class);

        $query = User::query();

        if ($request->filled('search')) {
            $query->where('name', 'like', "%{$request->search}%");
        }

        if ($request->filled('so')) {
            $data = $query->orderBy($request->sb, $request->so)->paginate();
        } else {
            $data = $query->orderBy('id', 'desc')->paginate();
        }
        return response()->json($data);
    }

    public function show(Request $request, User $user)
    {
        $this->authorize('show', $user);
        $user->load('roles');
        return response()->json($user);
    }

    public function store(Request $request)
    {
        $this->authorize('store', User::class);

        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'roles' => 'required|array|min:1',
            'status' => 'integer',
        ]);

        $user = User::create($validated);
        $user->roles()->attach($validated['roles']);
        return response()->json($user);
    }

    public function update(Request $request, User $user)
    {

        $this->authorize('update', $user);

        $validated = $request->validate([
            'name' => 'sometimes|required|string',
            'email' => 'sometimes|required|email|unique:users,email,' . $user->id,
            'password' => 'sometimes',
            'roles' => 'sometimes|required|array|min:1',
            'status' => 'integer',
        ]);

        if ($request->filled("password")) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);
        if ($request->filled("roles")) {
            $user->roles()->sync($validated['roles']);
        }
        return response()->json(['message' => 'Data updated successfully']);

    }

    public function destroy(Request $request, User $user)
    {
        $this->authorize('destroy', $user);
        $user->delete();
        return response()->json($user);
    }

}
