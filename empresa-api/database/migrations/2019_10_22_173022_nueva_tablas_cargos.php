<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class NuevaTablasCargos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cargos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre', 50 );
            $table->longText('descripcion')->nullable();
            $table->timestamp('creado')->nullable();
            $table->timestamp('modificado')->nullable();
            $table->integer('creado_por')->nullable();
            $table->integer('modificado_por')->nullable();
            $table->boolean('activo')->default(true);
        });
        DB::table('cargos')->insert(array(
            'nombre'=> 'Directora de Recursos Humanos',
            'descripcion'=> 'Directora de Recursos Humanos',
            'creado'=> date('Y-m-d H:m:s'),
            'modificado'=> date('Y-m-d H:m:s'),
            'creado_por'=> 1,
            'modificado_por'=> 1,
            'activo'=> true
        ));
        DB::table('cargos')->insert(array(
            'nombre'=> 'Jefe de Departamento',
            'descripcion'=> 'Jefe de Departamento',
            'creado'=> date('Y-m-d H:m:s'),
            'modificado'=> date('Y-m-d H:m:s'),
            'creado_por'=> 1,
            'modificado_por'=> 1,
            'activo'=> true
        ));
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
