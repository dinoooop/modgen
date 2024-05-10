<?php

namespace App\Http\Controllers;

use App\Helpers\ZipSave;
use App\Mail\VerifyMail;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use ZipArchive;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class TestController extends Controller
{
    public function test()
    {

        $user = User::find(2);
        $user->verification_code = "255";
        // $mailable = new VerifyMail($user);
        // $html = $mailable->render();

        // echo $html;
        Mail::to("dinoop.k@bizfab.com")->send(new VerifyMail($user));

    }
}