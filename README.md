# User Management API - Skill Test

Implementasi backend skill test menggunakan Node.js, Express, TypeScript, Prisma (MySQL), JWT, dan Joi untuk validasi.

## Tech Stack

- Node.js + Express
- TypeScript
- Prisma ORM (MySQL)
- JWT untuk autentikasi
- Joi untuk validasi
- bcrypt untuk hash password
- express-rate-limit untuk rate limiting

## Cara Menjalankan Aplikasi

### 1. Setup Environment

Salin `.env.example` ke `.env` dan sesuaikan:

```
DATABASE_URL="mysql://user:password@localhost:3306/skilltest"
PORT=3000
JWT_SECRET=supersecret
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

### 2. Install Dependencies

```
npm install
```

### 3. Setup Database

```
npx prisma migrate dev --name init
```

### 4. Jalankan Aplikasi

Development:

```
npm run dev
```

Production:

```
npm run build
npm start
```

### 5. Cek Koneksi

```
curl http://localhost:3000/
```

Respon: `{ "message": "User Management API" }`

### 6. Dengan Docker (Opsional)

Jika ingin menjalankan dengan Docker:

```
docker compose up -d
```

Ini akan menjalankan:

- MySQL database di port 3306
- Aplikasi di port 3000

Database akan tersimpan di Docker volume `db_data`.

## Dokumentasi API

### Struktur Respons

- Sukses: `{ "success": true, "data": {...} }`
- Auth: `{ "success": true, "message": "...", "token": "..." }`
- Delete: `{ "success": true, "message": "User deleted" }`
- Error: `{ "success": false, "message": "..." }`

### Autentikasi

Gunakan header: `Authorization: Bearer <token>`

### Endpoint Auth

- `POST /api/auth/register` - Register user baru

  - Body: `{ "email": "string", "password": "string" }`
  - Response: `{ "success": true, "message": "Registered successfully", "token": "jwt_token" }`

- `POST /api/auth/login` - Login user
  - Body: `{ "email": "string", "password": "string" }`
  - Response: `{ "success": true, "message": "Login successful", "token": "jwt_token" }`

### Endpoint Users (perlu JWT)

- `POST /api/users` - Buat user baru

  - Body: `{ "name": "string", "email": "string", "phone": "string", "department"?: "string", "isActive"?: boolean }`
  - Response: `{ "success": true, "data": { user_object } }`

- `GET /api/users` - Ambil semua user

  - Response: `{ "success": true, "data": [ user_array ] }`

- `PUT /api/users/:id` - Update user

  - Body: subset dari field user (minimal satu field)
  - Response: `{ "success": true, "data": { updated_user } }`

- `DELETE /api/users/:id` - Hapus user
  - Response: `{ "success": true, "message": "User deleted" }`

## Validasi

- Email: format valid dan unik
- Phone: hanya digit, minimal 10 karakter
- Name: wajib saat create user
- Password: minimal 6 karakter (register/login)

## Rate Limiting

- Konfigurasi via environment variables
- Default: 100 request per 15 menit per IP
- Respon limit: `{ "message": "Too many requests, please try again later." }`

## Testing dengan Postman

Import collection Postman untuk test semua endpoint:

[Postman collection](https://www.postman.com/ptsadbor/workspace/minilemon-skill-test/collection/30776351-9b1d4696-4136-4356-b595-5081d870e018?action=share&creator=30776351)

Collection ini berisi:

- Test auth (register/login)
- CRUD users dengan berbagai skenario
- Test error cases (validation, unauthorized, not found)

## Script NPM

- `npm run dev` - Development dengan hot reload
- `npm run build` - Compile TypeScript
- `npm start` - Jalankan production build
- `npm run lint` - Jalankan ESLint
