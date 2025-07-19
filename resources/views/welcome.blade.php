<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Font Group System - API</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 class="text-3xl font-bold text-center text-gray-800 mb-4">
            Font Group System
        </h1>
        <p class="text-gray-600 text-center mb-6">
            API is running successfully!
        </p>
        <div class="space-y-2 text-sm text-gray-500">
            <p>• Font Upload: POST /api/fonts</p>
            <p>• Get Fonts: GET /api/fonts</p>
            <p>• Delete Font: DELETE /api/fonts/{id}</p>
            <p>• Create Group: POST /api/font-groups</p>
            <p>• Get Groups: GET /api/font-groups</p>
            <p>• Update Group: PUT /api/font-groups/{id}</p>
            <p>• Delete Group: DELETE /api/font-groups/{id}</p>
        </div>
        <div class="mt-6 text-center">
            <a href="http://localhost:3000" class="text-blue-600 hover:text-blue-800">
                Go to React Frontend →
            </a>
        </div>
    </div>
</body>
</html> 