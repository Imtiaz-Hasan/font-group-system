<?php

namespace App\Http\Controllers;

use App\Models\FontGroup;
use App\Services\FontGroupService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Routing\Controller;

class FontGroupController extends Controller
{
    private FontGroupService $fontGroupService;

    public function __construct(FontGroupService $fontGroupService)
    {
        $this->fontGroupService = $fontGroupService;
    }

    public function index(): JsonResponse
    {
        try {
            $fontGroups = $this->fontGroupService->getAllFontGroups();
            return response()->json(['fontGroups' => $fontGroups]);
        } catch (\Exception $e) {
            Log::error('Error fetching font groups: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error fetching font groups'
            ], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'fonts' => 'required|array|min:2',
            'fonts.*.font_id' => 'required|exists:fonts,id',
            'fonts.*.font_name' => 'required|string|max:255'
        ], [
            'name.required' => 'Please enter a group name.',
            'name.string' => 'Group name must be a string.',
            'name.max' => 'Group name must not exceed 255 characters.',
            'fonts.required' => 'Please select at least two fonts.',
            'fonts.array' => 'Fonts must be provided as an array.',
            'fonts.min' => 'Please select at least two fonts.',
            'fonts.*.font_id.required' => 'Font ID is required.',
            'fonts.*.font_id.exists' => 'Selected font does not exist.',
            'fonts.*.font_name.required' => 'Font name is required.',
            'fonts.*.font_name.string' => 'Font name must be a string.',
            'fonts.*.font_name.max' => 'Font name must not exceed 255 characters.'
        ]);

        try {
            $fontGroup = $this->fontGroupService->createFontGroup($request->all());
            return response()->json([
                'success' => true,
                'fontGroup' => $fontGroup,
                'message' => 'Font group created successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error creating font group: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function show(int $id): JsonResponse
    {
        try {
            $fontGroup = $this->fontGroupService->getFontGroup($id);
            return response()->json(['fontGroup' => $fontGroup]);
        } catch (\Exception $e) {
            Log::error('Error fetching font group: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 404);
        }
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'fonts' => 'required|array|min:2',
            'fonts.*.font_id' => 'required|exists:fonts,id',
            'fonts.*.font_name' => 'required|string|max:255'
        ], [
            'name.required' => 'Please enter a group name.',
            'name.string' => 'Group name must be a string.',
            'name.max' => 'Group name must not exceed 255 characters.',
            'fonts.required' => 'Please select at least two fonts.',
            'fonts.array' => 'Fonts must be provided as an array.',
            'fonts.min' => 'Please select at least two fonts.',
            'fonts.*.font_id.required' => 'Font ID is required.',
            'fonts.*.font_id.exists' => 'Selected font does not exist.',
            'fonts.*.font_name.required' => 'Font name is required.',
            'fonts.*.font_name.string' => 'Font name must be a string.',
            'fonts.*.font_name.max' => 'Font name must not exceed 255 characters.'
        ]);

        try {
            $fontGroup = $this->fontGroupService->updateFontGroup($id, $request->all());
            return response()->json([
                'success' => true,
                'fontGroup' => $fontGroup,
                'message' => 'Font group updated successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating font group: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            $this->fontGroupService->deleteFontGroup($id);
            return response()->json([
                'success' => true,
                'message' => 'Font group deleted successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Error deleting font group: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }
} 