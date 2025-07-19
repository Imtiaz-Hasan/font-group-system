<?php

namespace App\Services;

use App\Models\FontGroup;
use App\Models\FontGroupItem;
use Illuminate\Support\Facades\DB;

class FontGroupService
{
    public function getAllFontGroups(): array
    {
        $fontGroups = FontGroup::with('fontGroupItems.font')->get();
        
        return $fontGroups->map(function ($fontGroup) {
            $fonts = $fontGroup->fontGroupItems->map(function ($item) {
                return [
                    'id' => $item->font->id,
                    'name' => $item->font->name,
                    'font_id' => $item->font_id
                ];
            })->toArray();
            
            return [
                'id' => $fontGroup->id,
                'name' => $fontGroup->name,
                'fonts' => $fonts,
                'count' => count($fonts),
                'created_at' => $fontGroup->created_at
            ];
        })->toArray();
    }

    public function getFontGroup(int $id): array
    {
        $fontGroup = FontGroup::with('fontGroupItems.font')->findOrFail($id);
        
        $fonts = $fontGroup->fontGroupItems->map(function ($item) {
            return [
                'id' => $item->font->id,
                'name' => $item->font->name,
                'font_id' => $item->font_id
            ];
        })->toArray();
        
        return [
            'id' => $fontGroup->id,
            'name' => $fontGroup->name,
            'fonts' => $fonts
        ];
    }

    public function createFontGroup(array $data): array
    {
        return DB::transaction(function () use ($data) {
            $fontGroup = FontGroup::create([
                'name' => $data['name']
            ]);

            foreach ($data['fonts'] as $fontData) {
                FontGroupItem::create([
                    'font_group_id' => $fontGroup->id,
                    'font_id' => $fontData['font_id']
                ]);
            }

            // Return complete font group data with count
            $fontGroup = FontGroup::with('fontGroupItems.font')->find($fontGroup->id);
            $fonts = $fontGroup->fontGroupItems->map(function ($item) {
                return [
                    'id' => $item->font->id,
                    'name' => $item->font->name,
                    'font_id' => $item->font_id
                ];
            })->toArray();
            
            return [
                'id' => $fontGroup->id,
                'name' => $fontGroup->name,
                'fonts' => $fonts,
                'count' => count($fonts),
                'created_at' => $fontGroup->created_at
            ];
        });
    }

    public function updateFontGroup(int $id, array $data): array
    {
        return DB::transaction(function () use ($id, $data) {
            $fontGroup = FontGroup::findOrFail($id);
            $fontGroup->update(['name' => $data['name']]);

            // Delete existing font group items
            $fontGroup->fontGroupItems()->delete();

            // Create new font group items
            foreach ($data['fonts'] as $fontData) {
                FontGroupItem::create([
                    'font_group_id' => $fontGroup->id,
                    'font_id' => $fontData['font_id']
                ]);
            }

            // Return complete font group data with count
            $fontGroup = FontGroup::with('fontGroupItems.font')->find($id);
            $fonts = $fontGroup->fontGroupItems->map(function ($item) {
                return [
                    'id' => $item->font->id,
                    'name' => $item->font->name,
                    'font_id' => $item->font_id
                ];
            })->toArray();
            
            return [
                'id' => $fontGroup->id,
                'name' => $fontGroup->name,
                'fonts' => $fonts,
                'count' => count($fonts),
                'created_at' => $fontGroup->created_at
            ];
        });
    }

    public function deleteFontGroup(int $id): void
    {
        $fontGroup = FontGroup::findOrFail($id);
        $fontGroup->fontGroupItems()->delete();
        $fontGroup->delete();
    }
} 