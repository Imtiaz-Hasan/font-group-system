<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FontGroupItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'font_group_id',
        'font_id'
    ];

    public function fontGroup(): BelongsTo
    {
        return $this->belongsTo(FontGroup::class);
    }

    public function font(): BelongsTo
    {
        return $this->belongsTo(Font::class);
    }
} 