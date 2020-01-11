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
    Route::get('actividades/obtenerPorTrabajador', [\App\Http\Controllers\TrabajadoresController::class, 'obtenerPorTrabajador']);
    Route::delete('actividades/eliminar/{id}', [\App\Http\Controllers\ActividadesController::class, 'eliminar']);
    Route::post('actividades/eliminarVarios', [\App\Http\Controllers\ActividadesController::class, 'eliminarVarios']);
//--------------------------------------trabajadores------------------------------------------------//
    Route::post('trabajadores/crear', [\App\Http\Controllers\TrabajadoresController::class, 'crear']);
    Route::put('trabajadores/editar/{id}', [\App\Http\Controllers\TrabajadoresController::class, 'editar']);
    Route::get('trabajadores/obtener/{id}', [\App\Http\Controllers\TrabajadoresController::class, 'obtener']);
    Route::get('trabajadores/buscar/{texto}', [\App\Http\Controllers\TrabajadoresController::class, 'buscar']);

    Route::get('trabajadores/obtenerTodas/{activo}', [\App\Http\Controllers\TrabajadoresController::class, 'obtenerTodas']);
    Route::delete('trabajadores/eliminar/{id}', [\App\Http\Controllers\TrabajadoresController::class, 'eliminar']);
    Route::post('trabajadores/eliminarVarios', [\App\Http\Controllers\TrabajadoresController::class, 'eliminarVarios']);
    //--------------------------------------accidentes------------------------------------------------//
    Route::post('accidentes/crear', [\App\Http\Controllers\AccidentesController::class, 'crear']);
    Route::put('accidentes/editar/{id}', [\App\Http\Controllers\AccidentesController::class, 'editar']);
    Route::get('accidentes/obtener/{id}', [\App\Http\Controllers\AccidentesController::class, 'obtener']);
    Route::get('accidentes/buscar/{texto}', [\App\Http\Controllers\AccidentesController::class, 'buscar']);
    Route::get('accidentes/obtenerTodas', [\App\Http\Controllers\AccidentesController::class, 'obtenerTodas']);
    Route::delete('accidentes/eliminar/{id}', [\App\Http\Controllers\AccidentesController::class, 'eliminar']);
    Route::post('accidentes/eliminarVarios', [\App\Http\Controllers\AccidentesController::class, 'eliminarVarios']);

    //--------------------------------------Tipos Accidentes-------------------------------------------------------//
    Route::get('tipos_accidentes/obtenerTodas', [\App\Http\Controllers\TiposAccidentesController::class, 'obtenerTodas']);
    //--------------------------------------Causas-------------------------------------------------------//
    Route::get('causas/obtenerTodas', [\App\Http\Controllers\CausasController::class, 'obtenerTodas']);
});
