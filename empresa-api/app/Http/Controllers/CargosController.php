<?php

namespace App\Http\Controllers;

use App\Clases\Estado;
use App\Models\Cargos;
use Illuminate\Http\Request;

class CargosController extends Controller
{


    /**
     * Obtener cargos
     *
     * @param string $id identificador del cargo a obtener
     *
     * @return \Illuminate\Http\JsonResponse contiene los datos y estado de la respuesta;
     */
    public function obtener($id)
    {
        $cargos = Cargos::findOrFail($id, ['nombre', 'id', 'descripcion', 'activo', 'creado_por', 'modificado_por']);
        return $this->json(true, $cargos, "", Estado::OK);
    }

    /**
     * Devuelve todas las Cargos
     *
     * @param Request $peticion contiene los parametros de la peticion
     *
     * @return \Illuminate\Http\JsonResponse contiene los datos y estado de la respuesta
     */

    public function obtenerTodas(Request $peticion)
    {
        $cantElementos = $peticion->input('limit') ?? Controller::LIMITE_REGISTROS;
        $cargos = Cargos::paginate($cantElementos, ['nombre', 'id', 'descripcion', 'activo', 'creado_por', 'modificado_por']);
        return $this->json(true, $cargos->toArray());
    }

    public function crear(Request $peticion)
    {
        $this->validate($peticion, ['nombre' => 'required']);
        $cargo = Cargos::create($peticion->all());
        $mensaje = __('El cargo ha sido creado satisfactoriamente');
        return $this->json(true, $cargo, $mensaje, Estado::CREADO);
    }

    public function editar(Request $peticion, $id)
    {
        $this->validate($peticion, ['nombre' => 'required']);
        Cargos::findOrFail($id)->update($peticion->all());
        $datos = $peticion->all();
        $datos['id'] = $id;
        $mensaje = __('El cargo ha sido modificado satisfactoriamente');
        return $this->json(true, $datos, $mensaje, Estado::MODIFICADO);
    }

    public function eliminar($id)
    {
        $cargo = cargos::find($id);
        if($cargo) {
            $cargo->activo = false;
            $cargo->save();
        }
        $mensaje = __('El cargo ha sido borrado satisfactoriamente');
        return $this->json(true, [], $mensaje, Estado::OK);
    }

}
