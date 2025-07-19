<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FontController;
use App\Http\Controllers\FontGroupController;

// Test route
Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Font routes
Route::get('/fonts', [FontController::class, 'index']);
Route::post('/fonts', [FontController::class, 'store']);
Route::delete('/fonts/{id}', [FontController::class, 'destroy']);

// Font Group routes
Route::get('/font-groups', [FontGroupController::class, 'index']);
Route::post('/font-groups', [FontGroupController::class, 'store']);
Route::get('/font-groups/{id}', [FontGroupController::class, 'show']);
Route::put('/font-groups/{id}', [FontGroupController::class, 'update']);
Route::delete('/font-groups/{id}', [FontGroupController::class, 'destroy']); 