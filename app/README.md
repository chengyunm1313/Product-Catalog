# Brand — 產品型錄與品牌形象網站

以 **Next.js App Router** + **Firebase** 打造的產品型錄、部落格、企業形象網站，提供前台展示與後台 CMS 管理功能。

## 技術棧

| 類別   | 技術                                  |
| ------ | ------------------------------------- |
| 框架   | Next.js 16 (App Router, TypeScript)   |
| 後端   | Firebase (Auth / Firestore / Storage) |
| 編輯器 | Tiptap (免費核心功能)                 |
| 圖示   | Lucide React                          |
| 樣式   | CSS Modules + CSS Variables           |

## 設計風格

- **瑞士現代主義／極簡風格** — 高對比、專業、乾淨
- **字型** — Poppins（標題）＋ Open Sans（內文）
- **配色** — 深藍黑 `#0F172A`、信任藍 `#0369A1`、淺灰白 `#F8FAFC`

## 專案結構

```
src/
├── app/
│   ├── (frontend)/        # 前台頁面（含 Navbar + Footer）
│   │   ├── page.tsx       # 首頁
│   │   ├── products/      # 產品列表 + 詳情
│   │   ├── blog/          # 部落格列表 + 文章
│   │   └── about/         # 關於我們
│   ├── admin/             # 後台 CMS
│   │   ├── page.tsx       # 儀表板
│   │   ├── products/      # 產品管理
│   │   └── posts/         # 文章管理
│   ├── api/               # API 路由
│   │   ├── products/
│   │   └── posts/
│   ├── layout.tsx         # Root Layout
│   └── globals.css        # 全域樣式與設計系統
├── components/
│   ├── layout/            # Navbar, Footer
│   ├── blocks/            # Block 系統（Hero, ProductGrid, BlogList 等）
│   └── editor/            # Tiptap 編輯器 + 渲染器
├── lib/
│   ├── firebase/          # Client / Admin SDK
│   ├── firestore/         # CRUD 操作（posts, products, pages, media）
│   └── auth/              # 中介層 + Session 管理
└── types/                 # TypeScript 型別定義
```

## 快速開始

### 1. 安裝相依套件

```bash
npm install
```

### 2. 設定環境變數

複製範本並填入 Firebase 專案的金鑰：

```bash
cp .env.local.example .env.local
```

需要填寫的變數：

| 變數                                       | 說明                    |
| ------------------------------------------ | ----------------------- |
| `NEXT_PUBLIC_FIREBASE_API_KEY`             | Firebase 客戶端 API Key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`         | Auth 網域               |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`          | 專案 ID                 |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`      | Storage Bucket          |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Messaging Sender ID     |
| `NEXT_PUBLIC_FIREBASE_APP_ID`              | App ID                  |
| `FIREBASE_ADMIN_PROJECT_ID`                | Admin SDK 專案 ID       |
| `FIREBASE_ADMIN_CLIENT_EMAIL`              | Service Account Email   |
| `FIREBASE_ADMIN_PRIVATE_KEY`               | Service Account 私鑰    |

### 3. 啟動開發伺服器

```bash
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000) 即可預覽。

### 4. 建置正式版

```bash
npm run build
npm start
```

## 路由總覽

| 路由               | 類型 | 說明                |
| ------------------ | ---- | ------------------- |
| `/`                | 靜態 | 首頁（Block-Based） |
| `/products`        | 靜態 | 產品列表            |
| `/products/[slug]` | 動態 | 產品詳情            |
| `/blog`            | 靜態 | 部落格列表          |
| `/blog/[slug]`     | 動態 | 文章詳情            |
| `/about`           | 靜態 | 關於我們            |
| `/admin`           | 靜態 | 後台儀表板          |
| `/admin/products`  | 靜態 | 產品管理            |
| `/admin/posts`     | 靜態 | 文章管理            |
| `/api/products`    | API  | 產品 CRUD           |
| `/api/posts`       | API  | 文章 CRUD           |

## 授權

私有專案，未經授權禁止使用。
