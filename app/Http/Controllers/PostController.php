<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::query();

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
        $data = Post::findOrFail($id);
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'status' => 'required|boolean',
        ]);

        $data = Post::create($validated);
        return response()->json($data);
    }

    public function update(Request $request, Post $post)
    {

        $validated = $request->validate([
            'title' => 'sometimes|required|string',
            'content' => 'sometimes|required|string',
            'status' => 'sometimes|required|boolean',
        ]);

        $post->update($validated);
        return response()->json($post);

    }

    public function destroy(Request $request, $id)
    {
        $data = Post::findOrFail($id)->delete();
        return response()->json($data);
    }

}
