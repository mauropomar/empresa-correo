<?php

namespace App\Http\Controllers;

use App\Clases\Estado;
use App\Models\Actividades;
use Illuminate\Http\Request;

class ActividadesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Obtener Actividades
     *
     * @param string $id identificador del cargo a obtener
     *
     * @return \Illuminate\Http\JsonResponse contiene los datos y estado de la respuesta;
     */
    public function obtener($id)
    {
        $actividades = Actividades::findOrFail($id, ['nombre', 'id', 'descripcion', 'activo']);
        return $this->json(true, $actividades, "", Estado::OK);
    }

    public function obtenerTodas(Request $peticion)
    {
        $activo = $peticion->get('activo');
        $idcargo =  $peticion->get('idcargo');
        $actividades = Actividades::where('id_cargo', $idcargo)->activos($activo , 200);
        return $this->json(true, $actividades->toArray());
    }

    public function verificar(Request $peticion, $id){
        $nombre = $peticion->get('nombre');
        if($id === null) {
            $result = Actividades::where('nombre', $nombre)->first();
        }else{
            $result = Actividades::where('nombre', $nombre)->where('id', '<>', $id )->first();
        }
        if(!is_null($result)){
            return true;
        }
        return false;
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function crear(Request $peticion)
    {
        $result = $this->verificar($peticion, null);
        if($result){
            $mensaje = __('Ya existe una actividad con ese nombre.');
            return $this->json(false, array(), $mensaje, Estado::CREADO);
        }
        $actividad = Actividades::create($peticion->all());
        $mensaje = __('La actividad ha sido creada satisfactoriamente');
        return $this->json(true, $actividad, $mensaje, Estado::CREADO);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Actividades  $actividades
     * @return \Illuminate\Http\Response
     */
    public function editar(Request $peticion, $id)
    {
        $result = $this->verificar($peticion, $id);
        if($result){
            $mensaje = __('Ya existe una actividad con ese nombre.');
            return $this->json(false, array(), $mensaje, Estado::CREADO);
        }
        $this->validate($peticion, ['nombre' => 'required']);
        Actividades::findOrFail($id)->update($peticion->all());
        $datos = $peticion->all();
        $datos['id'] = $id;
        $mensaje = __('La actividad ha sido modificada satisfactoriamente');
        return $this->json(true, $datos, $mensaje, Estado::MODIFICADO);
    }

    public function eliminar($id)
    {
        $actividad = Actividades::find($id);
        if($actividad) {
            $actividad->activo = false;
            $actividad->save();
        }
        $mensaje = __('La actividad ha sido borrada satisfactoriamente');
        return $this->json(true, [], $mensaje, Estado::OK);
    }
}
