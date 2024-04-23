<?php

namespace App\Http\Controllers;

use App\Helpers\ZipSave;
use App\Models\Project;
use Illuminate\Http\Request;
use ZipArchive;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class TestController extends Controller
{
    public function test()
    {

        $zip = new ZipSave();
        
        $yellow = $zip->getPossibleKeys('project');
        $red = $zip->getPossibleKeys('pole slab');
        // $possibleKeys = array_combine(
        //     $zip->getPossibleKeys('project'),
        //     $zip->getPossibleKeys('pole slab'),
        // );
        print_r($yellow);
        print_r($red);
        
    }
}