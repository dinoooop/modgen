<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class GeneralController extends Controller
{
    public function flush()
    {
        $ids = User::whereNotIn('id', [1, 2])->pluck('id')->toArray();
        $count = count($ids);
        if ($count) {
            foreach ($ids as $key => $id) {
                User::find($id)->delete();
            }
            return response()->json(['message' => "Flushed {$count} users"]);
        }


        return response()->json(['message' => "No users to flush"], 422);



    }

    public function stock()
    {
        $data = [
            'status' => status(),
            'user_status' => status(null, 'user'),
            'module_status' => status(null, 'module'),
            'gender' => gender(),
            'roles' => role(),
            'weekdays' => weekday(),
            'months' => month(),
        ];

        return response()->json($data);

    }
}