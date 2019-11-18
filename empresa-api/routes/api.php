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
Route::group(['middleware' => 'cors'], function() {
    Route::post('cargos/crear', [\App\Http\Controllers\CargosController::class, 'crear']);
    Route::put('cargos/editar/{id}', [\App\Http\Controllers\CargosController::class, 'editar']);
    Route::get('cargos/obtener/{id}', [\App\Http\Controllers\CargosController::class, 'obtener']);
    Route::get('cargos/obtenerTodas/{activo}', [\App\Http\Controllers\CargosController::class, 'obtenerTodas']);
    Route::delete('cargos/eliminar/{id}', [\App\Http\Controllers\CargosController::class, 'eliminar']);
    Route::post('cargos/eliminarVarios', [\App\Http\Controllers\CargosController::class, 'eliminarVarios']);
//--------------------------------------actividades------------------------------------------------//
    Route::post('actividades/crear', [\App\Http\Controllers\ActividadesController::class, 'crear']);
    Route::put('actividades/editar/{id}', [\App\Http\Controllers\ActividadesController::class, 'editar']);
    Route::get('actividades/obtener/{id}', [\App\Http\Controllers\ActividadesController::class, 'obtener']);
    Route::get('actividades/obtenerTodas', [\App\Http\Controllers\ActividadesController::class, 'obtenerTodas']);
    Route::delete('actividades/eliminar/{id}', [\App\Http\Controllers\ActividadesController::class, 'eliminar']);
    Route::post('actividades/eliminarVarios', [\App\Http\Controllers\ActividadesController::class, 'eliminarVarios']);
//--------------------------------------trabajadores------------------------------------------------//
    Route::post('trabajadores/crear', [\App\Http\Controllers\TrabajadoresController::class, 'crear']);
    Route::put('trabajadores/editar/{id}', [\App\Http\Controllers\TrabajadoresController::class, 'editar']);
    Route::get('trabajadores/obtener/{id}', [\App\Http\Controllers\TrabajadoresController::class, 'obtener']);
    Route::get('trabajadores/obtenerTodas', [\App\Http\Controllers\TrabajadoresController::class, 'obtenerTodas']);
    Route::delete('trabajadores/eliminar/{id}', [\App\Http\Controllers\TrabajadoresController::class, 'eliminar']);
    Route::post('trabajadores/eliminarVarios', [\App\Http\Controllers\TrabajadoresController::class, 'eliminarVarios']);

});
