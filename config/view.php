<?php

return [

    /*
    |--------------------------------------------------------------------------
    | View Storage Paths
    |--------------------------------------------------------------------------
    |
    | Most templating systems load templates from disk. Here you may specify
    | an array of paths that should be checked for your views. Of course
    | the usual Laravel view path has already been registered for you.
    |
    */

    'paths' => [
        resource_path('views'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Compiled View Path
    |--------------------------------------------------------------------------
    |
    | This option determines where all the compiled Blade templates will be
    | stored for your application. Typically, this is within the storage
    | directory. However, as usual, you are free to change this value.
    |
    */

    'compiled' => env(
        'VIEW_COMPILED_PATH',
        realpath(storage_path('framework/views'))
    ),

    /*
    |--------------------------------------------------------------------------
    | View Debug Mode
    |--------------------------------------------------------------------------
    |
    | When view debug mode is enabled, the application will throw an exception
    | if a view is not found. This is useful for debugging view-related
    | issues. When disabled, the application will return null for missing
    | views, which is the default behavior.
    |
    */

    'debug' => env('VIEW_DEBUG', false),

    /*
    |--------------------------------------------------------------------------
    | View Namespaces
    |--------------------------------------------------------------------------
    |
    | Blade has an underutilized feature under the `@` directive that allows
    | you to reference other views. The `@each` and `@include` directives
    | may reference a view in a different namespace. These namespaces are
    | configured below. You can change the key of the namespace array to
    | change the namespace itself. You can also add more namespaces.
    |
    | The array key is the namespace alias, and the array value is the
    | full namespace path to the views in that namespace.
    |
    | 'namespaces' => [
    |     'admin' => resource_path('views/admin'),
    |     'auth' => resource_path('views/auth'),
    | ],
    |
    */

    'namespaces' => [
        //
    ],

]; 