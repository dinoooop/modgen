<?php

use App\Http\Controllers\GeneralController;
use App\Http\Controllers\ModuleController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

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

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);
Route::get('/general/stock', [GeneralController::class, 'stock']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/auth/security', [AuthController::class, 'security']);
    Route::get('/auth/check', [AuthController::class, 'check']);
    Route::post('/auth/verify', [AuthController::class, 'verify']);
    Route::get('/auth/resend-verify', [AuthController::class, 'resendVerify']);
    Route::get('/auth', [AuthController::class, 'show']);
    Route::post('/auth', [AuthController::class, 'update']);

    Route::resource('users', UserController::class);

    Route::post('/modules/{id}', [ModuleController::class, 'update']);
    Route::post('/generate/{id}', [ModuleController::class, 'generate']);
    Route::resource('modules', ModuleController::class);

    Route::post('/general/flush', [GeneralController::class, 'flush']);
    
});
