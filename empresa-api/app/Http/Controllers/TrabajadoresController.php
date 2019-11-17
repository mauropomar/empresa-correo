<?php

namespace App\Http\Controllers;

use App\Models\Trabajadores;
use Illuminate\Http\Request;

class TrabajadoresController extends Controller
{

    public function obtener($id)
    {
        $trabajadores = Trabajadores::findOrFail($id, ['id', 'codigo', 'nombre', 'apellidos', 'sexo', 'edad', 'activo']);
        return $this->json(true, $trabajadores, "", Estado::OK);
    }


    public function obtenerTodas(Request $peticion)
    {
        $activo = $peticion->get('activo');
        $trabajadores = Trabajadores::activos($activo , 200);
        return $this->json(true, $trabajadores->toArray());
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
            $mensaje = __('Ya existe un trabajador con ese nombre.');
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
