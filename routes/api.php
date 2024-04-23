<?php

use App\Http\Controllers\ModuleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

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
    Route::post('/modules/{id}', [ModuleController::class, 'update']);
    Route::post('/generate/{id}', [ModuleController::class, 'generate']);
    Route::resource('modules', ModuleController::class);
    Route::get('/check', [AuthController::class, 'check']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
