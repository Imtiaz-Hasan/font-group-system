<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return 'Laravel is working!';
});

Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
}); 