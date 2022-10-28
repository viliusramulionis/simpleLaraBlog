<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostsController as Posts;
use App\Http\Controllers\UsersController as Users;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/login', [Users::class, 'login']);
Route::get('/logout', [Users::class, 'logout'])->middleware('auth:api');
Route::get('/check-auth', [Users::class, 'checkAuth'])->middleware('auth:api');

Route::get('/posts', [Posts::class, 'index']);
Route::get('/posts/{id}', [Posts::class, 'single']);

Route::post('/posts', [Posts::class, 'create'])->middleware('auth:api');
Route::put('/posts/{id}', [Posts::class, 'update'])->middleware('auth:api');
Route::delete('/posts/{id}', [Posts::class, 'delete'])->middleware('auth:api');
