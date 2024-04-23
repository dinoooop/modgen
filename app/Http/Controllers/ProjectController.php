<?php

namespace App\Http\Controllers;

use App\Helpers\ZipSave;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::query();

        if ($request->filled('search')) {
            $query->where('title', 'like', "%{$request->search}%");
        }

        if ($request->filled('so')) {
            $data = $query->orderBy($request->sb, $request->so)->paginate();
        } else {
            $data = $query->orderBy('id', 'desc')->paginate();
        }
        return response()->json($data);
    }

    public function show(Request $request, $id)
    {
        $data = Project::findOrFail($id);
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'yellow' => 'required|string',
            'zip' => 'required|mimes:zip',
        ]);

        if ($request->hasFile('zip') && $request->file('zip')->isValid()) {
            $zipFile = $request->file('zip');
            $fileName = time() . '_' . $zipFile->getClientOriginalName();
            $zipFile->storeAs('uploads/', $fileName, 'local');
            $zipSave = new ZipSave();
            $validated['dir'] = $zipSave->save($validated['title'], $fileName);
        }

        $data = Project::create($validated);
        return response()->json($data);
    }

    public function update(Request $request, $id)
    {

        $validated = $request->validate([
            'title' => 'sometimes|required|string',
            'content' => 'sometimes|required|string',
            'yellow' => 'sometimes|required|string',
            'zip' => 'sometimes|mimes:zip',
        ]);

        if ($request->hasFile('zip') && $request->file('zip')->isValid()) {
            $zipFile = $request->file('zip');
            $fileName = time() . '_' . $zipFile->getClientOriginalName();
            $zipFile->storeAs('uploads/', $fileName, 'local');
            $zipSave = new ZipSave();
            $validated['dir'] = $zipSave->save($validated['title'], $fileName);
        }

        $data = Project::findOrFail($id)->update($validated);
        return response()->json($data);

    }

    public function destroy(Request $request, $id)
    {
        $data = Project::findOrFail($id)->delete();
        return response()->json($data);
    }

    /***
     * 
     * 
     * yellow: contain in ideal file, find it
     * red: the given keyword to generate new files 
     * yellow replaced with red
     */
    public function generate(Request $request, $id)
    {
        $validated = $request->validate([
            'red' => 'sometimes|required|string',
        ]);

        $zip = new ZipSave();
        $zip->replace($id, $validated['red']);
        $filePath = $zip->zipit($validated['red']);

        return response()->download($filePath);
    }
}
