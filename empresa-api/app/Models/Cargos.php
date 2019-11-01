<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;


class Cargos extends ApModel
{
    protected $table = 'cargos';

    protected $fillable = ['id','nombre', 'descripcion', 'activo',  'creado_por', 'modificado_por', 'creado', 'modificado'];


 }
