<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Log;

class UserPolicy
{
    use HandlesAuthorization;

    public function index(User $user)
    {
        return $user->hasAnyRole(['admin']);
    }

    public function show(User $authUser, $user)
    {
        // Log::info("auth user: {$authUser->id} and current user : {$user->id}");
        return $user->hasAnyRole(['admin']) || $authUser->id == $user->id;
    }

    public function store(User $user)
    {
        return $user->hasAnyRole(['admin']);
    }

    public function update(User $authUser, $user)
    {
        return $user->hasAnyRole(['admin']) || $authUser->id == $user->id;
    }

    public function destroy(User $user)
    {
        return $user->hasAnyRole(['admin']);
    }

}
