<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);



Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/projects/{id}', [ProjectController::class, 'update']);
    Route::resource('projects', ProjectController::class);
    Route::post('/generate/{id}', [ProjectController::class, 'generate']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
