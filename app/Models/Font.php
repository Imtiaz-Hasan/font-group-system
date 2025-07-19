<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Font extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'filename',
        'file_path'
    ];

    public function fontGroupItems(): HasMany
    {
        return $this->hasMany(FontGroupItem::class);
    }
} 