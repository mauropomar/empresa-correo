<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;


class Actividades extends ApModel
{
    protected $table = 'actividades';

    protected $fillable = ['id','nombre', 'descripcion', 'id_cargo', 'activo',  'creado_por', 'modificado_por', 'creado', 'modificado'];

}
