<?php

namespace App\Http\Controllers;

use App\Helpers\ZipSave;
use App\Models\Module;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class ModuleController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('index', Module::class); 

        $query = Module::query();
        $query->where('user_id', gcuid());

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

    public function show(Request $request, Module $module)
    {
        $this->authorize('show', $module);
        return response()->json($module);
    }

    public function store(Request $request)
    {
        $this->authorize('index', Module::class);

        $validated = $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'yellow' => 'required|string',
            'zip' => 'required|mimes:zip',
        ]);

        $validated['user_id'] = auth()->user()->id;

        if ($request->hasFile('zip') && $request->file('zip')->isValid()) {
            $zipFile = $request->file('zip');
            $fileName = time() . '_' . $zipFile->getClientOriginalName();
            $zipFile->storeAs('uploads/', $fileName, 'local');
            $zipSave = new ZipSave();
            $validated['dir'] = $zipSave->save($validated['title'], $fileName);
        }

        $data = Module::create($validated);

        return response()->json($data);
    }

    public function update(Request $request, $id)
    {

        $module = Module::findOrFail($id);
        $this->authorize('update', $module);

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

        $module->update($validated);
        return response()->json($module);

    }

    public function destroy(Request $request, Module $module)
    {
        $this->authorize('destroy', $module);
        $data = $module->delete();
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
