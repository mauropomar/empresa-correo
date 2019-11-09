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
        $cargos = Cargos::findOrFail($id, ['nombre', 'id', 'descripcion', 'activo']);
        return $this->json(true, $cargos, "", Estado::OK);
    }

    /**
     * Devuelve todas las Cargos
     *
     * @param Request $peticion contiene los parametros de la peticion
     *
     * @return \Illuminate\Http\JsonResponse contiene los datos y estado de la respuesta
     */

    public function obtenerTodas($activo)
    {
        $cargos = Cargos::activos($activo , 200);
        return $this->json(true, $cargos->toArray());
    }

    public function verificar(Request $peticion, $id){
        $nombre = $peticion->get('nombre');
        if(!$id) {
            $result = Cargos::where('nombre', $nombre)->first();
        }else{
            $result = Cargos::where('nombre', $nombre)->where('id', '<>', $id )->first();
        }
        if(!is_null($result)){
          return true;
        }
        return false;
    }

    public function crear(Request $peticion)
    {
        $result = $this->verificar($peticion);
        if($result){
            $mensaje = __('Ya existe un cargo con ese nombre.');
            return $this->json(false, array(), $mensaje, Estado::CREADO);
        }
        $cargo = Cargos::create($peticion->all());
        $mensaje = __('El cargo ha sido creado satisfactoriamente');
        return $this->json(true, $cargo, $mensaje, Estado::CREADO);
    }

    public function editar(Request $peticion, $id)
    {
        $result = $this->verificar($peticion, $id);
        if($result){
            $mensaje = __('Ya existe un usuario con ese nombre.');
            return $this->json(false, array(), $mensaje, Estado::CREADO);
        }
        $this->validate($peticion, ['nombre' => 'required']);
        Cargos::findOrFail($id)->update($peticion->all());
        $datos = $peticion->all();
        $datos['id'] = $id;
        $mensaje = __('El cargo ha sido modificado satisfactoriamente');
        return $this->json(true, $datos, $mensaje, Estado::MODIFICADO);
    }

    public function eliminar($id)
    {
        $cargo = Cargos::find($id);
        if($cargo) {
            $cargo->activo = false;
            $cargo->save();
        }
        $mensaje = __('El cargo ha sido borrado satisfactoriamente');
        return $this->json(true, [], $mensaje, Estado::OK);
    }

}
