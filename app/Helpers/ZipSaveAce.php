<?php

namespace App\Helpers;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ZipSaveAce
{
    public function getPossibleKeys($keyword)
    {

        $plural = Str::plural($keyword);
        // input: note type (singluar)
        // 'NoteType', "noteType", 'note_type', "note-type", 
        return [
            Str::studly($plural),
            Str::camel($plural),
            Str::kebab($plural),
            Str::snake($plural),

            Str::studly($keyword),
            Str::camel($keyword),
            Str::kebab($keyword),
            Str::snake($keyword),
        ];
    }

    public function createDirIfNotExist($dir)
    {
        if (!Storage::exists($dir)) {
            Storage::makeDirectory($dir);
        }
    }
    public function deleteDirIfExist($dir)
    {
        if (Storage::exists($dir)) {
            Storage::deleteDirectory($dir);
        }
        
    }
}
