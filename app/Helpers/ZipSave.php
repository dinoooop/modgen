<?php

namespace App\Helpers;

use App\Models\Project;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;

class ZipSave extends ZipSaveAce
{
    public function __construct()
    {

    }

    public function save($title, $file)
    {

        $newDir = 'projects/' . Str::slug($title);
        $zipFile = Storage::path('uploads/' . $file);

        $this->createDirIfNotExist($newDir);

        $extractedPath = Storage::path($newDir);

        $zip = new \ZipArchive();

        if ($zip->open($zipFile) === TRUE) {
            $zip->extractTo($extractedPath);
            for ($i = 0; $i < $zip->numFiles; $i++) {
                $filename = $zip->getNameIndex($i);
                $zip->extractTo($extractedPath, [$filename]);
            }
            $zip->close();

            if (file_exists($zipFile)) {
                unlink($zipFile);
            }

            return $newDir;
        }


        return false;

    }

    public function replace($id, $red)
    {
        $project = Project::find($id);
        $modify = 'modify/' . Str::slug($red);

        $this->createDirIfNotExist($modify);

        $source = Storage::path($project->dir);
        $directory = Storage::path($modify);
        File::copyDirectory($source, $directory);
        $files = glob($directory . '/*');

        $possibleKeys = array_combine(
            $this->getPossibleKeys($project->yellow),
            $this->getPossibleKeys($red),
        );

        foreach ($files as $file) {
            if (is_file($file)) {
                foreach ($possibleKeys as $key => $value) {
                    $contents = file_get_contents($file);
                    $newContents = str_replace($key, $value, $contents);
                    file_put_contents($file, $newContents);
                }
            }
        }

        foreach ($files as $file) {
            if (is_file($file)) {
                foreach ($possibleKeys as $find => $replace) {
                    $basename = basename($file);
                    if (strpos($basename, $find) !== false) {
                        $dirName = dirname($file);
                        $newFIle = $dirName . '/' . str_replace($find, $replace, $basename);
                        rename($file, $newFIle);
                    }
                }
            }
        }

    }

    public function zipit($dir)
    {

        $dir = Str::slug($dir);

        $sourceDir = Storage::path('modify/' . $dir);
        $this->createDirIfNotExist('public/downloads');
        $zipFilePath = Storage::path('public/downloads/' . $dir . '.zip');

        $zip = new \ZipArchive();

        if ($zip->open($zipFilePath, \ZipArchive::CREATE | \ZipArchive::OVERWRITE) === true) {

            $files = new \RecursiveIteratorIterator(
                new \RecursiveDirectoryIterator($sourceDir),
                \RecursiveIteratorIterator::LEAVES_ONLY
            );

            foreach ($files as $name => $file) {
                if (!$file->isDir()) {
                    $filePath = $file->getRealPath();
                    $relativePath = substr($filePath, strlen($sourceDir) + 1);
                    $zip->addFile($filePath, $relativePath);
                }
            }

            $zip->close();

            return $zipFilePath;
        } else {
            return "Failed to create zip file.";
        }

    }
}
