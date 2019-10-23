<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//--------------------------------------cargos------------------------------------------------//
Route::post('cargos/crear', [\App\Http\Controllers\CargosController::class, 'crear']);
Route::put('cargos/editar/{id}', [\App\Http\Controllers\CargosController::class, 'editar']);
Route::get('cargos/obtener/{id}', [\App\Http\Controllers\CargosController::class, 'obtener']);
Route::get('cargos/obtenerTodas', [\App\Http\Controllers\CargosController::class, 'obtenerTodas']);
Route::delete('cargos/eliminar/{id}', [\App\Http\Controllers\CargosController::class, 'eliminar']);
Route::post('cargos/eliminarVarios', [\App\Http\Controllers\CargosController::class, 'eliminarVarios']);
