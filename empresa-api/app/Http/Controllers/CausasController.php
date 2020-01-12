<?php

namespace App\Http\Controllers;

use App\Models\Causas;
use Illuminate\Http\Request;

class CausasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function obtenerTodas()
    {
        $activo = 1;
        $causas = Causas::activos($activo , 10);
        return $this->json(true, $causas->toArray());
    }
}
