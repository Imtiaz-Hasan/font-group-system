# Font Group System

A modern web application for managing font groups with drag-and-drop upload functionality, built with Laravel (PHP) backend and React (JavaScript) frontend.

## 🎯 Features

### Font Management
- **TTF-only upload**: Drag and drop or click to upload TTF font files
- **Font preview**: See uploaded fonts rendered as "Example Style" text
- **Font deletion**: Remove individual fonts from the system
- **File validation**: Ensures only TTF files are accepted

### Font Group Management
- **Dynamic group creation**: Add multiple fonts to groups with validation
- **Minimum 2 fonts**: Enforces selection of at least 2 fonts per group
- **Group editing**: Modify existing font groups
- **Group deletion**: Remove entire font groups
- **Real-time updates**: All changes happen without page reload

### Technical Features
- **Single Page Application**: No page refreshes during operations
- **SOLID Principles**: Clean architecture with service layer pattern
- **Modern UI**: Built with Tailwind CSS for responsive design
- **RESTful API**: Laravel backend with proper error handling
- **Real-time feedback**: Loading states and error messages

## 🏗️ Architecture

### Backend (Laravel 10)
- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic layer following SOLID principles
- **Models**: Eloquent ORM with proper relationships
- **Migrations**: Database schema management
- **API Routes**: RESTful endpoints for frontend communication

### Frontend (React 18)
- **Components**: Modular, reusable UI components
- **Services**: API communication layer
- **State Management**: React hooks for local state
- **Error Handling**: Comprehensive error handling and user feedback

## 📋 Requirements

- PHP 8.1+
- Composer
- Node.js 16+
- MySQL/PostgreSQL/SQLite
- Web server (Apache/Nginx) or Laravel's built-in server

## 🚀 Quick Setup

### Option 1: Automated Setup (Windows)
```bash
# Run the automated setup script
setup.bat
```

### Option 2: Automated Setup (Linux/Mac)
```bash
# Make the script executable
chmod +x setup.sh

# Run the automated setup script
./setup.sh
```

### Option 3: Manual Setup

#### Backend Setup
```bash
# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env file
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=font_group_system
# DB_USERNAME=your_username
# DB_PASSWORD=your_password

# Run database migrations
php artisan migrate

# Create storage link for font files
php artisan storage:link
```

#### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install

# Build the application
npm run build
```

## 🏃‍♂️ Running the Application

### Development Mode

#### Start Laravel Backend
```bash
# From the root directory
php artisan serve
```
The API will be available at `http://localhost:8000`

#### Start React Frontend
```bash
# From the frontend directory
cd frontend
npm start
```
The application will be available at `http://localhost:3000`

### Production Mode
```bash
# Build the frontend for production
cd frontend
npm run build

# The built files will be served by Laravel
# Access the application at your Laravel URL
```

## 📁 Project Structure

```
font-group-system/
├── app/
│   ├── Http/Controllers/     # API Controllers
│   ├── Models/              # Eloquent Models
│   └── Services/            # Business Logic Layer
├── database/migrations/     # Database Schema
├── frontend/
│   ├── src/
│   │   ├── components/      # React Components
│   │   └── services/        # API Services
│   └── public/             # Static Assets
├── routes/api.php          # API Routes
└── storage/app/public/     # Font File Storage
```

## 🔧 API Endpoints

### Font Management
- `GET /api/fonts` - Get all fonts
- `POST /api/fonts` - Upload a new font
- `DELETE /api/fonts/{id}` - Delete a font

### Font Group Management
- `GET /api/font-groups` - Get all font groups
- `POST /api/font-groups` - Create a new font group
- `GET /api/font-groups/{id}` - Get a specific font group
- `PUT /api/font-groups/{id}` - Update a font group
- `DELETE /api/font-groups/{id}` - Delete a font group

## 🎨 UI Components

### FontUpload
- Drag and drop interface for TTF files
- File type validation
- Upload progress indication
- Error handling and user feedback

### FontList
- Table display of uploaded fonts
- Font preview using loaded fonts
- Delete functionality with confirmation
- Loading states for font rendering

### FontGroupCreator
- Dynamic row addition for multiple fonts
- Font selection dropdown
- Validation for minimum 2 fonts
- Group name input with validation

### FontGroupList
- Table display of all font groups
- Edit modal with font selection
- Delete functionality with confirmation
- Font count display

## 🔒 Security Features

- **File Validation**: Only TTF files accepted
- **File Size Limits**: 10MB maximum file size
- **CORS Configuration**: Proper cross-origin settings
- **Input Validation**: Comprehensive server-side validation
- **Error Handling**: Secure error messages without exposing internals

## 🧪 Testing

### Backend Testing
```bash
# Run PHPUnit tests
php artisan test
```

### Frontend Testing
```bash
# Run React tests
cd frontend
npm test
```

## 🐛 Troubleshooting

### Common Issues

1. **Font preview not working**
   - Ensure storage link is created: `php artisan storage:link`
   - Check file permissions on storage directory
   - Verify font files are accessible via `/storage/` URL

2. **API connection issues**
   - Check CORS configuration in `config/cors.php`
   - Verify Laravel server is running on correct port
   - Check browser console for network errors

3. **Database connection issues**
   - Verify database configuration in `.env` file
   - Ensure database server is running
   - Run migrations: `php artisan migrate`

4. **Frontend build issues**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility
   - Verify all dependencies are installed

## 📝 Development Guidelines

### Code Style
- Follow PSR-12 for PHP code
- Use ESLint for JavaScript/React code
- Maintain consistent naming conventions

### Architecture Principles
- Follow SOLID principles
- Use dependency injection
- Implement proper error handling
- Write clean, readable code

### Git Workflow
- Use descriptive commit messages
- Create feature branches for new functionality
- Test thoroughly before merging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open-sourced software licensed under the [MIT license](LICENSE).

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check browser console for errors
4. Review Laravel logs in `storage/logs/`

---

**Built with ❤️ using Laravel and React** 