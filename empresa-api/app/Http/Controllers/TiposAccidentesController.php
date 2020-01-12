<?php

namespace App\Http\Controllers;

use App\Models\TiposAccidentes;
use Illuminate\Http\Request;

class TiposAccidentesController extends Controller
{
    public function obtenerTodas()
    {
        $activo = 1;
        $tipos = TiposAccidentes::activos($activo , 10);
        return $this->json(true, $tipos->toArray());
    }
}
