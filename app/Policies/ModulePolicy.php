<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Module;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Log;

class ModulePolicy
{
    use HandlesAuthorization;

    public function index(User $user)
    {
        // return $user->hasAnyRole(['admin']);
        Log::info($user);
        return true;
    }

    public function show(User $user, Module $module)
    {
        Log::info("User");
        Log::info($user);
        Log::info($module);
        return $user->hasAnyRole(['admin']) || $user->id == $module->user_id;
    }

    public function store(User $user)
    {
        return true;
    }

    public function update(User $user, Module $module)
    {
        return $user->hasAnyRole(['admin']) || $user->id == $module->user_id;
    }

    public function destroy(User $user, Module $module)
    {
        return $user->hasAnyRole(['admin']) || $user->id == $module->user_id;
    }

}
