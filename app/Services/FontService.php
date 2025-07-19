<?php

namespace App\Services;

use App\Models\Font;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FontService
{
    public function getAllFonts(): array
    {
        $fonts = Font::all();
        return $fonts->map(function ($font) {
            return [
                'id' => $font->id,
                'name' => $font->name,
                'filename' => $font->filename,
                'file_path' => $font->file_path,
                'created_at' => $font->created_at
            ];
        })->toArray();
    }

    public function uploadFont(UploadedFile $file): array
    {
        $originalName = $file->getClientOriginalName();
        $filename = Str::random(40) . '.ttf';
        
        // Store file in storage/app/fonts directory
        $filePath = $file->storeAs('fonts', $filename, 'public');
        
        // Create font record
        $font = Font::create([
            'name' => pathinfo($originalName, PATHINFO_FILENAME),
            'filename' => $filename,
            'file_path' => $filePath
        ]);

        return [
            'id' => $font->id,
            'name' => $font->name,
            'filename' => $font->filename,
            'file_path' => $font->file_path,
            'created_at' => $font->created_at
        ];
    }

    public function deleteFont(int $id): void
    {
        $font = Font::findOrFail($id);
        
        // Delete file from storage
        if (Storage::disk('public')->exists($font->file_path)) {
            Storage::disk('public')->delete($font->file_path);
        }
        
        // Delete font group items first
        $font->fontGroupItems()->delete();
        
        // Delete font record
        $font->delete();
    }
} 