<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Log;

class UserPolicy
{
    use HandlesAuthorization;

    public function index(User $authUser)
    {
        return $authUser->hasAnyRole(['admin']);
    }

    public function show(User $authUser, $user)
    {
        // Log::info("auth user: {$authUser->id} and current user : {$user->id}");
        return $authUser->hasAnyRole(['admin']) || $authUser->id == $user->id;
    }

    public function store(User $authUser)
    {
        return $authUser->hasAnyRole(['admin']);
    }

    public function update(User $authUser, $user)
    {
        return $authUser->hasAnyRole(['admin']) || $authUser->id == $user->id;
    }

    public function destroy(User $authUser)
    {
        return $authUser->hasAnyRole(['admin']);
    }

}
