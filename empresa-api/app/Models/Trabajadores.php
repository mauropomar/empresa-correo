<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trabajadores extends ApModel
{
    protected $table = 'trabajadores';

    protected $fillable = ['id', 'codigo', 'nombre', 'apellidos', 'sexo', 'edad', 'activo',  'creado_por', 'modificado_por', 'creado', 'modificado'];

}
