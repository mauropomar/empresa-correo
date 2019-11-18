<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTrabajadoresCargosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trabajadores_cargos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_trabajador');
            $table->integer('id_cargo');
            $table->integer('id_actividad');
            $table->timestamp('creado')->nullable();
            $table->timestamp('modificado')->nullable();
            $table->integer('creado_por')->nullable();
            $table->integer('modificado_por')->nullable();
            $table->boolean('activo')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('trabajadores_cargos');
    }
}
