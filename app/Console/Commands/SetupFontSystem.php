<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class SetupFontSystem extends Command
{
    protected $signature = 'font-system:setup';
    protected $description = 'Setup the Font Group System';

    public function handle()
    {
        $this->info('🚀 Setting up Font Group System...');

        // Run migrations
        $this->info('📊 Running migrations...');
        Artisan::call('migrate', ['--force' => true]);
        $this->info('✅ Migrations completed');

        // Create storage link
        $this->info('🔗 Creating storage link...');
        Artisan::call('storage:link');
        $this->info('✅ Storage link created');

        // Create fonts directory
        $fontsDir = storage_path('app/public/fonts');
        if (!file_exists($fontsDir)) {
            mkdir($fontsDir, 0755, true);
            $this->info('✅ Fonts directory created');
        }

        $this->info('');
        $this->info('🎉 Font Group System setup completed!');
        $this->info('');
        $this->info('Next steps:');
        $this->info('1. Start Laravel server: php artisan serve');
        $this->info('2. Start React server: cd frontend && npm start');
        $this->info('');
        $this->info('The application will be available at:');
        $this->info('- Laravel API: http://localhost:8000');
        $this->info('- React App: http://localhost:3000');
    }
} 