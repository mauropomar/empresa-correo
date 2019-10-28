<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTiposAccidentesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tipos_accidentes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre', 50 );
            $table->longText('descripcion')->nullable();
            $table->timestamp('creado')->nullable();
            $table->timestamp('modificado')->nullable();
            $table->integer('creado_por')->nullable();
            $table->integer('modificado_por')->nullable();
            $table->boolean('activo')->default(true);
        });
        DB::table('tipos_accidentes')->insert(array(
            'nombre'=> 'Simple',
            'descripcion'=> 'Simple',
            'creado'=> date('Y-m-d H:m:s'),
            'modificado'=> date('Y-m-d H:m:s'),
            'creado_por'=> 1,
            'modificado_por'=> 1,
            'activo'=> true
        ));
        DB::table('tipos_accidentes')->insert(array(
            'nombre'=> 'Mortal',
            'descripcion'=> 'Mortal',
            'creado'=> date('Y-m-d H:m:s'),
            'modificado'=> date('Y-m-d H:m:s'),
            'creado_por'=> 1,
            'modificado_por'=> 1,
            'activo'=> true
        ));
        DB::table('tipos_accidentes')->insert(array(
            'nombre'=> 'Múltiple',
            'descripcion'=> 'Múltiple',
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
        Schema::dropIfExists('tipos_accidentes');
    }
}
