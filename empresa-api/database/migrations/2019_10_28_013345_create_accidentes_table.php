<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAccidentesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accidentes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('codigo')->nullable();
            $table->timestamp('fecha');
            $table->integer('id_trabajador');
            $table->integer('id_tipo_accidente');
            $table->integer('id_causa');
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
        Schema::dropIfExists('accidentes');
    }
}
