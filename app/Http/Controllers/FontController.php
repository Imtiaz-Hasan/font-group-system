<?php

namespace App\Http\Controllers;

use App\Models\Font;
use App\Services\FontService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Routing\Controller;

class FontController extends Controller
{
    private FontService $fontService;

    public function __construct(FontService $fontService)
    {
        $this->fontService = $fontService;
    }

    public function index(): JsonResponse
    {
        try {
            $fonts = $this->fontService->getAllFonts();
            return response()->json(['fonts' => $fonts]);
        } catch (\Exception $e) {
            Log::error('Error fetching fonts: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching fonts'
            ], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'font_file' => 'required|file|max:10240'
        ], [
            'font_file.required' => 'Please select a font file.',
            'font_file.file' => 'The uploaded file is not valid.',
            'font_file.max' => 'The font file must not be larger than 10MB.'
        ]);

        // Custom validation for TTF files
        $file = $request->file('font_file');
        $extension = strtolower($file->getClientOriginalExtension());
        
        if ($extension !== 'ttf') {
            return response()->json([
                'success' => false,
                'message' => 'Only TTF files are allowed.',
                'errors' => [
                    'font_file' => ['Only TTF files are allowed.']
                ]
            ], 422);
        }

        // Check for duplicate font name
        $fontName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $existingFont = Font::where('name', $fontName)->first();
        
        if ($existingFont) {
            return response()->json([
                'success' => false,
                'message' => 'A font with this name already exists.',
                'errors' => [
                    'font_file' => ['A font with this name already exists.']
                ]
            ], 422);
        }

        try {
            $font = $this->fontService->uploadFont($request->file('font_file'));
            return response()->json([
                'success' => true,
                'font' => $font,
                'message' => 'Font uploaded successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error uploading font: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            $this->fontService->deleteFont($id);
            return response()->json([
                'success' => true,
                'message' => 'Font deleted successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error deleting font: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }
} 