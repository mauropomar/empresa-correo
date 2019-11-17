<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class TrabajadoresCargos extends ApModel
{
    protected $table = 'trabajadores_cargos';

    protected $fillable = ['id','id_trabajador', 'id_cargo', 'id_actividad', 'activo',  'creado_por', 'modificado_por', 'creado', 'modificado'];

}
