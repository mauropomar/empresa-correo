<?php

namespace App;
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Causas extends ApModel
{
    protected $table = 'causas';

    protected $fillable = ['id','nombre', 'descripcion', 'activo',  'creado_por', 'modificado_por', 'creado', 'modificado'];

}
