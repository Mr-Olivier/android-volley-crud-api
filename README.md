# 🎬 Studio Film Website

<div align="center">

![Studio Film Website](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

**A modern, full-stack film streaming platform built with Next.js 14, TypeScript, and Prisma ORM**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Architecture](#-architecture) • [Getting Started](#-getting-started) • [Deployment](#-deployment)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Database Schema](#-database-schema)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Video Processing Pipeline](#-video-processing-pipeline)
- [API Routes](#-api-routes)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)

---

## 🎯 Overview

A professional film studio platform that enables content creators to upload, manage, and stream films with adaptive quality streaming. Built with enterprise-grade architecture using Next.js 14 App Router, featuring role-based access control, multi-quality video processing, and secure content delivery.

### 🎭 User Roles

#### 👨‍💼 Admin Capabilities

- 📤 **Content Management**: Upload films, series, posters, trailers, and multi-part videos
- 🗂️ **Organization**: Categorize content by genre, region, and tags
- 👥 **User Administration**: Manage users, assign roles, and monitor activity
- 📊 **Analytics Dashboard**: Track views, engagement metrics, and platform statistics
- 🎞️ **Media Library**: Browse and reuse previously uploaded assets
- ⚙️ **Quality Control**: Configure video quality settings (SD to 8K)

#### 👤 User Experience

- 🔍 **Discovery**: Browse and search films by category, region, or title
- 📺 **Streaming**: Watch films with adaptive quality streaming
- 📥 **Downloads**: Download content with secure, time-limited URLs
- ⭐ **Personalization**: Manage favorites and viewing history
- 🔐 **Account Security**: Secure authentication with email verification

---

## ✨ Features

### 🎥 Video Management

- **Multi-Part Films**: Support for episodic content and film series
- **Adaptive Streaming**: HLS-based streaming with multiple quality levels (360p-1080p+)
- **Auto-Processing**: Automated FFmpeg video transcoding pipeline
- **Thumbnail Generation**: Automatic poster and thumbnail creation
- **Quality Options**: SD, HD, FHD, UHD, 4K, and 8K support

### 🔐 Authentication & Security

- **JWT-Based Auth**: Secure token-based authentication
- **Role-Based Access Control**: USER and ADMIN roles with granular permissions
- **Email Verification**: OTP-based email verification system
- **Password Reset**: Secure password recovery flow
- **Protected Routes**: Middleware-based route protection

### 📧 Email System

- **Development**: Mailtrap for testing email flows
- **Production**: SendGrid for reliable email delivery
- **Templates**: Transactional emails for verification and notifications

### 🎨 User Interface

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode**: Built-in theme switching capability
- **Modern Components**: Reusable UI component library
- **Smooth Animations**: Optimized transitions and loading states

### 📊 Content Organization

- **Categories**: Genre-based film categorization with custom icons
- **Regions**: Geographic content organization with flag support
- **Tags**: Flexible tagging system using JSON

---

## 🛠 Tech Stack

### Frontend

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript 5.0+
- **Styling**: Tailwind CSS 3.x
- **UI Components**: Custom component library
- **State Management**: React Hooks & Context API

### Backend

- **Runtime**: Node.js
- **API**: Next.js API Routes (REST)
- **ORM**: Prisma 5.x
- **Database**: MySQL 8.0+
- **Video Processing**: FFmpeg
- **File Storage**: Local filesystem / Cloud storage ready

### DevOps & Tools

- **Email (Dev)**: Mailtrap
- **Email (Prod)**: SendGrid
- **Authentication**: JWT with httpOnly cookies
- **Validation**: Zod / Yup schemas
- **Code Quality**: ESLint, Prettier

---

## 🏗 Architecture

```
film-studio-website/
├── 📁 src/
│   ├── 📁 app/                        # Next.js 14+ App Router
│   │   ├── 📁 (auth)/                 # Auth routes group
│   │   │   ├── 📁 login/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 register/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 verify-email/
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📄 layout.tsx
│   │   │
│   │   ├── 📁 (admin)/                # Admin routes group
│   │   │   ├── 📁 admin/
│   │   │   │   ├── 📁 dashboard/
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   ├── 📁 films/
│   │   │   │   │   ├── 📄 page.tsx
│   │   │   │   │   ├── 📁 new/
│   │   │   │   │   │   └── 📄 page.tsx
│   │   │   │   │   └── 📁 [id]/
│   │   │   │   │       └── 📁 edit/
│   │   │   │   │           └── 📄 page.tsx
│   │   │   │   ├── 📁 series/
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   ├── 📁 users/
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   ├── 📁 categories/
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   ├── 📁 media/
│   │   │   │   │   └── 📄 page.tsx
│   │   │   │   └── 📄 layout.tsx
│   │   │   └── 📄 layout.tsx
│   │   │
│   │   ├── 📁 (user)/                 # User routes group
│   │   │   ├── 📁 films/
│   │   │   │   ├── 📄 page.tsx
│   │   │   │   └── 📁 [slug]/
│   │   │   │       └── 📄 page.tsx
│   │   │   ├── 📁 series/
│   │   │   │   ├── 📄 page.tsx
│   │   │   │   └── 📁 [slug]/
│   │   │   │       └── 📄 page.tsx
│   │   │   ├── 📁 watch/
│   │   │   │   └── 📁 [id]/
│   │   │   │       └── 📄 page.tsx
│   │   │   ├── 📁 categories/
│   │   │   │   └── 📁 [slug]/
│   │   │   │       └── 📄 page.tsx
│   │   │   ├── 📁 profile/
│   │   │   │   └── 📄 page.tsx
│   │   │   └── 📄 layout.tsx
│   │   │
│   │   ├── 📁 api/                    # API routes
│   │   │   ├── 📁 auth/
│   │   │   │   ├── 📁 login/
│   │   │   │   │   └── 📄 route.ts
│   │   │   │   ├── 📁 register/
│   │   │   │   │   └── 📄 route.ts
│   │   │   │   ├── 📁 verify-email/
│   │   │   │   │   └── 📄 route.ts
│   │   │   │   ├── 📁 forgot-password/
│   │   │   │   │   └── 📄 route.ts
│   │   │   │   └── 📁 logout/
│   │   │   │       └── 📄 route.ts
│   │   │   ├── 📁 films/
│   │   │   │   ├── 📄 route.ts
│   │   │   │   └── 📁 [id]/
│   │   │   │       └── 📄 route.ts
│   │   │   ├── 📁 series/
│   │   │   │   ├── 📄 route.ts
│   │   │   │   └── 📁 [id]/
│   │   │   │       └── 📄 route.ts
│   │   │   ├── 📁 categories/
│   │   │   │   └── 📄 route.ts
│   │   │   ├── 📁 upload/
│   │   │   │   ├── 📁 video/
│   │   │   │   │   └── 📄 route.ts
│   │   │   │   ├── 📁 poster/
│   │   │   │   │   └── 📄 route.ts
│   │   │   │   └── 📁 trailer/
│   │   │   │       └── 📄 route.ts
│   │   │   └── 📁 stream/
│   │   │       └── 📁 [id]/
│   │   │           └── 📄 route.ts
│   │   │
│   │   ├── 📄 layout.tsx              # Root layout
│   │   ├── 📄 page.tsx                # Home page
│   │   ├── 📄 globals.css             # Global styles
│   │   └── 📄 not-found.tsx           # 404 page
│   │
│   ├── 📁 components/
│   │   ├── 📁 ui/                     # Reusable UI components
│   │   │   ├── 📄 Button.tsx
│   │   │   ├── 📄 Card.tsx
│   │   │   ├── 📄 Input.tsx
│   │   │   ├── 📄 Modal.tsx
│   │   │   ├── 📄 Select.tsx
│   │   │   ├── 📄 ThemeToggle.tsx
│   │   │   └── 📄 VideoPlayer.tsx
│   │   │
│   │   ├── 📁 layout/
│   │   │   ├── 📄 Header.tsx
│   │   │   ├── 📄 Footer.tsx
│   │   │   ├── 📄 Sidebar.tsx
│   │   │   └── 📄 AdminSidebar.tsx
│   │   │
│   │   ├── 📁 film/
│   │   │   ├── 📄 FilmCard.tsx
│   │   │   ├── 📄 FilmGrid.tsx
│   │   │   ├── 📄 FilmPlayer.tsx
│   │   │   ├── 📄 FilmDetails.tsx
│   │   │   └── 📄 FilmUploadForm.tsx
│   │   │
│   │   ├── 📁 series/
│   │   │   ├── 📄 SeriesCard.tsx
│   │   │   ├── 📄 SeasonList.tsx
│   │   │   └── 📄 EpisodePlayer.tsx
│   │   │
│   │   └── 📁 providers/
│   │       ├── 📄 ThemeProvider.tsx
│   │       └── 📄 AuthProvider.tsx
│   │
│   ├── 📁 lib/
│   │   ├── 📄 prisma.ts               # Prisma client instance
│   │   ├── 📄 auth.ts                 # Auth utilities & JWT
│   │   ├── 📄 upload.ts               # File upload utilities
│   │   ├── 📄 streaming.ts            # Video processing (FFmpeg)
│   │   ├── 📄 email.ts                # Email service (Mailtrap/SendGrid)
│   │   └── 📄 s3.ts                   # Cloud storage (optional)
│   │
│   ├── 📁 hooks/
│   │   ├── 📄 useAuth.ts
│   │   ├── 📄 useTheme.ts
│   │   ├── 📄 useFilms.ts
│   │   └── 📄 useDebounce.ts
│   │
│   ├── 📁 types/
│   │   ├── 📄 film.ts
│   │   ├── 📄 series.ts
│   │   ├── 📄 user.ts
│   │   └── 📄 api.ts
│   │
│   ├── 📁 middleware/
│   │   ├── 📄 auth.ts                 # Auth middleware
│   │   └── 📄 admin.ts                # Admin role check
│   │
│   └── 📁 utils/
│       ├── 📄 constants.ts
│       ├── 📄 helpers.ts
│       ├── 📄 validators.ts
│       └── 📄 slugify.ts
│
├── 📁 prisma/
│   ├── 📄 schema.prisma               # Database schema
│   ├── 📄 seed.ts                     # Database seeding
│   └── 📁 migrations/                 # Migration files
│
├── 📁 public/
│   ├── 📁 uploads/                    # Uploaded files (gitignored)
│   │   ├── 📁 videos/
│   │   ├── 📁 posters/
│   │   ├── 📁 thumbnails/
│   │   └── 📁 trailers/
│   └── 📁 assets/                     # Static assets
│       ├── 📁 images/
│       └── 📁 icons/
│
├── 📄 .env.local                      # Environment variables
├── 📄 .env.example
├── 📄 .gitignore
├── 📄 next.config.js
├── 📄 tailwind.config.ts
├── 📄 tsconfig.json
├── 📄 package.json
├── 📄 postcss.config.js
└── 📄 README.md
```

---

## 💾 Database Schema

### Core Entities

#### 👤 Users

- Unique username and email
- Role-based access (USER/ADMIN)
- Email verification system
- Password hashing with bcrypt

#### 🎬 Films & Series

- Comprehensive metadata (title, description, year, rating)
- Multi-quality video support (SD to 8K)
- Category and region organization
- Multi-part film support
- View tracking

#### 📂 Categories & Regions

- Slug-based URLs
- Icon/flag support
- Many-to-many relationships

#### 🔐 OTP System

- Email verification
- Password reset
- Time-based expiration
- Single-use tokens

### Entity Relationships

```
User (1) ─────< (Many) Film
User (1) ─────< (Many) Series
User (1) ─────< (Many) OTP

Category (1) ─────< (Many) Film
Category (1) ─────< (Many) Series

Region (1) ─────< (Many) Film
Region (1) ─────< (Many) Series

Film (1) ─────< (Many) VideoPart

Series (1) ─────< (Many) Season
Season (1) ─────< (Many) Episode
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **MySQL**: v8.0 or higher
- **FFmpeg**: Latest version (for video processing)
- **npm/yarn/pnpm**: Latest version

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/studio-film-website.git
cd studio-film-website
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/film_studio"

# Authentication
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# Email (Development)
MAILTRAP_HOST="smtp.mailtrap.io"
MAILTRAP_PORT=2525
MAILTRAP_USER="your-mailtrap-user"
MAILTRAP_PASSWORD="your-mailtrap-password"

# Email (Production)
SENDGRID_API_KEY="your-sendgrid-api-key"
SENDGRID_FROM_EMAIL="noreply@yourdomain.com"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"

# Upload Configuration
MAX_FILE_SIZE=5368709120  # 5GB
UPLOAD_DIR="./public/uploads"
```

4. **Set up the database**

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed the database (optional)
npx prisma db seed
```

5. **Start the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

---

## 🔧 Environment Variables

### Required Variables

| Variable              | Description               | Example                               |
| --------------------- | ------------------------- | ------------------------------------- |
| `DATABASE_URL`        | MySQL connection string   | `mysql://user:pass@localhost:3306/db` |
| `JWT_SECRET`          | Secret key for JWT tokens | `your-secret-key-min-32-chars`        |
| `NEXT_PUBLIC_APP_URL` | Application base URL      | `http://localhost:3000`               |

### Email Configuration

**Development (Mailtrap)**

```env
MAILTRAP_HOST=smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your_username
MAILTRAP_PASSWORD=your_password
```

**Production (SendGrid)**

```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
```

### Optional Variables

| Variable         | Description              | Default            |
| ---------------- | ------------------------ | ------------------ |
| `MAX_FILE_SIZE`  | Max upload size in bytes | `5368709120` (5GB) |
| `UPLOAD_DIR`     | Upload directory path    | `./public/uploads` |
| `JWT_EXPIRES_IN` | JWT expiration time      | `7d`               |

---

## 🎞️ Video Processing Pipeline

### Upload Flow

```
1. Admin uploads video file
        ↓
2. File saved to temporary storage
        ↓
3. Validation (format, size, duration)
        ↓
4. FFmpeg processing initiated
        ↓
5. Transcoding to multiple qualities
   • 360p (SD)
   • 480p (SD)
   • 720p (HD)
   • 1080p (FHD)
        ↓
6. HLS playlist generation
        ↓
7. Thumbnail & poster extraction
        ↓
8. Database record update
        ↓
9. Video ready for streaming
```

### FFmpeg Commands

**Video Transcoding**

```bash
ffmpeg -i input.mp4 \
  -c:v libx264 -crf 23 -preset medium \
  -c:a aac -b:a 128k \
  -vf scale=-2:720 \
  -hls_time 10 -hls_list_size 0 \
  output_720p.m3u8
```

**Thumbnail Generation**

```bash
ffmpeg -i input.mp4 \
  -ss 00:00:05 \
  -vframes 1 \
  -vf scale=1280:720 \
  thumbnail.jpg
```

### Supported Formats

- **Input**: MP4, AVI, MOV, MKV, WEBM
- **Output**: HLS (M3U8 + TS segments)
- **Codecs**: H.264 (video), AAC (audio)

---

## 🔌 API Routes

### Authentication

| Method | Endpoint                    | Description             | Auth    |
| ------ | --------------------------- | ----------------------- | ------- |
| POST   | `/api/auth/register`        | User registration       | Public  |
| POST   | `/api/auth/login`           | User login              | Public  |
| POST   | `/api/auth/logout`          | User logout             | Private |
| POST   | `/api/auth/verify-email`    | Verify email with OTP   | Public  |
| POST   | `/api/auth/forgot-password` | Request password reset  | Public  |
| POST   | `/api/auth/reset-password`  | Reset password with OTP | Public  |

### Films

| Method | Endpoint          | Description      | Auth   |
| ------ | ----------------- | ---------------- | ------ |
| GET    | `/api/films`      | List all films   | Public |
| GET    | `/api/films/[id]` | Get film details | Public |
| POST   | `/api/films`      | Create new film  | Admin  |
| PUT    | `/api/films/[id]` | Update film      | Admin  |
| DELETE | `/api/films/[id]` | Delete film      | Admin  |

### Series

| Method | Endpoint           | Description        | Auth   |
| ------ | ------------------ | ------------------ | ------ |
| GET    | `/api/series`      | List all series    | Public |
| GET    | `/api/series/[id]` | Get series details | Public |
| POST   | `/api/series`      | Create new series  | Admin  |
| PUT    | `/api/series/[id]` | Update series      | Admin  |
| DELETE | `/api/series/[id]` | Delete series      | Admin  |

### Upload

| Method | Endpoint              | Description         | Auth  |
| ------ | --------------------- | ------------------- | ----- |
| POST   | `/api/upload/video`   | Upload video file   | Admin |
| POST   | `/api/upload/poster`  | Upload poster image | Admin |
| POST   | `/api/upload/trailer` | Upload trailer      | Admin |

### Streaming

| Method | Endpoint                    | Description    | Auth    |
| ------ | --------------------------- | -------------- | ------- |
| GET    | `/api/stream/[id]`          | Stream video   | Private |
| GET    | `/api/stream/[id]/download` | Download video | Private |

---

## 🌐 Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure production database
- [ ] Set up SendGrid email service
- [ ] Configure CDN for static assets
- [ ] Set up SSL/TLS certificates
- [ ] Configure cloud storage (AWS S3/Cloudflare R2)
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting
- [ ] Enable security headers

### Deployment Platforms

#### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

#### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

#### Traditional VPS

```bash
# Build application
npm run build

# Start with PM2
pm2 start npm --name "film-studio" -- start
```

---

## 🗺️ Roadmap

### ✅ Phase 1: MVP (Completed)

- [x] User authentication & authorization
- [x] Admin dashboard
- [x] Film upload & management
- [x] Video streaming with adaptive quality
- [x] Category & region organization
- [x] Email verification system

### 🚧 Phase 2: Enhanced Features (In Progress)

- [ ] Multi-part films & series support
- [ ] User favorites & watch history
- [ ] Advanced search with filters
- [ ] Download functionality with secure URLs
- [ ] View analytics & metrics
- [ ] Comment system

### 🔮 Phase 3: Advanced Features (Planned)

- [ ] AI-powered recommendations
- [ ] User ratings & reviews
- [ ] Subtitle support (multi-language)
- [ ] Watch party (synchronized viewing)
- [ ] Mobile apps (iOS/Android)
- [ ] Payment integration for premium content
- [ ] Content protection (DRM)
- [ ] Social sharing features
- [ ] Advanced analytics dashboard
- [ ] Email notifications & newsletters

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

For support, email support@yourdomain.com or join our Slack channel.

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma for the excellent ORM
- Vercel for hosting platform
- FFmpeg for video processing capabilities

---

<div align="center">

**Built with ❤️ using Next.js, TypeScript, and Prisma**

⭐ Star this repository if you find it helpful!

</div>
