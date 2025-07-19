<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('font_group_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('font_group_id')->constrained()->onDelete('cascade');
            $table->foreignId('font_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('font_group_items');
    }
}; 