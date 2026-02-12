# 📄 PRD：產品型錄 + 部落格 + 形象網站（Next + Firebase）

---

# 1️⃣ 專案目標

建立一個：

- 產品型錄網站（非電商結帳版）
- 部落格系統
- 形象官網頁面（例如：關於我們 / 服務介紹）
- 類 WordPress 後台 CMS
- 支援 SEO / SSR
- 可持續擴充

技術棧：

- Framework：Next.js (App Router)
- 資料庫：Firestore
- 身份驗證：Firebase Auth
- 媒體儲存：Firebase Storage
- 編輯器：Tiptap（存 JSON）
- 部署目標：Zeabur

---

# 2️⃣ 系統角色

### 角色

| 角色   | 權限                             |
| ------ | -------------------------------- |
| admin  | 所有操作                         |
| editor | 可編輯文章/頁面/產品，但不可刪除 |
| viewer | 只能檢視                         |

RBAC 透過 Firebase Custom Claims 實作。

---

# 3️⃣ 前台功能需求

---

## 3.1 首頁（Home）

首頁為「可自訂區塊組裝式頁面」，包含：

- Hero 區塊
  - 標題
  - 副標題
  - CTA 按鈕
  - 輪播圖（多張圖片）

- 產品精選區塊
- 最新文章區塊
- 自訂內容區塊（Rich Text）

首頁為 Block-Based 設計。

---

## 3.2 產品型錄

### 產品列表頁

- 支援分類
- 支援標籤
- 支援搜尋
- SEO 友善 URL（/products/[slug]）

### 產品詳細頁

- 標題
- 商品圖片（多圖）
- 商品描述（Tiptap JSON）
- 規格
- 相關產品

---

## 3.3 部落格

### 列表頁

- 分頁
- 標籤篩選
- SEO

### 詳細頁

- 標題
- 封面圖
- 內容（Tiptap JSON）
- 發布日期
- 作者
- SEO meta 欄位

---

## 3.4 形象頁面（Pages）

- 可新增任意頁面（如 about / services）
- URL slug 自訂
- 內容為 Block-based 或 Tiptap JSON
- SEO 欄位

---

# 4️⃣ 後台 CMS 功能

路由結構：

```
/admin
  /dashboard
  /posts
  /products
  /pages
  /media
  /users
```

---

## 4.1 文章管理

功能：

- 新增 / 編輯 / 刪除
- 草稿 / 發布
- 預覽模式
- SEO 欄位
- 封面圖
- Tiptap 編輯器

儲存格式：

```
posts {
  slug: string
  title: string
  status: draft | published
  contentJson: JSON
  seo: { title, description }
  coverImage: string
  createdAt
  updatedAt
}
```

---

## 4.2 產品管理

功能：

- 新增 / 編輯
- 圖片上傳（多圖）
- 分類
- 商品規格
- 相關產品
- SEO 欄位

Firestore 結構：

```
products {
  slug
  name
  descriptionJson
  price
  sku
  status
  images[]
  categoryIds[]
  createdAt
  updatedAt
}
```

---

## 4.3 頁面管理（類似 WordPress Page）

支援：

- 自訂 slug
- Hero 區塊設定
- Block-based 區塊編輯
- SEO 欄位

Firestore：

```
pages {
  slug
  title
  blocks: []
  status
  seo
}
```

---

## 4.4 Block 系統設計

Block Type：

- hero
- richText
- productGrid
- blogList
- imageGallery
- customCTA

每個 block 為 JSON 結構：

```
{
  type: "hero",
  data: {
    title,
    subtitle,
    images[],
    buttonText,
    buttonLink
  }
}
```

---

# 5️⃣ 編輯器規格

使用 Tiptap。

限制可用格式：

- heading (h1-h3)
- paragraph
- bold
- italic
- link
- image
- bullet list
- ordered list

儲存為 JSON，不儲存 HTML。

---

# 6️⃣ 媒體庫

功能：

- 圖片上傳
- 列表檢視
- 搜尋
- 插入編輯器

使用 Firebase Storage。

資料結構：

```
media {
  url
  path
  createdAt
  createdBy
}
```

---

# 7️⃣ SEO 需求

- 所有頁面支援 meta title
- meta description
- OG image
- 自動生成 sitemap
- 支援 ISR revalidation

---

# 8️⃣ 技術架構

## 前端

- Next.js App Router
- Server Components + Client Components
- SSR + ISR

## 後端

- Firebase Admin SDK
- Route Handlers 作為 API
- middleware 做權限控制

---

# 9️⃣ 非功能性需求

- SEO 友善
- 響應式設計
- Lighthouse 分數 > 90
- 權限必須 server-side 驗證
- 不允許前端直接寫入 Firestore（管理資料必須走 API）

---

# 🔟 UI 規範

- 後台使用乾淨簡潔 UI
- 左側 Sidebar
- 右側主內容
- 表格支援搜尋
- 編輯頁採用兩欄式（主編輯 + 設定）

---

# 1️⃣1️⃣ 未來可擴充

- 多語系
- 電商金流
- 會員系統
- 版本歷史（Revision）

---

# 1️⃣2️⃣ AI Coding 指示

請生成：

1. 完整 Next.js App Router 專案
2. Firebase 初始化（client + admin）
3. Firestore schema
4. Tiptap 編輯器元件
5. Admin CRUD 頁面
6. RBAC middleware
7. Media 上傳功能
8. Block-based 頁面系統
9. SEO metadata 設定
10. Sitemap 生成

專案需可直接啟動並連接 Firebase。

---

# 最後補一句策略建議

你這種專案：

👉 不要用 Markdown
👉 不要直接存 HTML
👉 一律 Tiptap JSON + Block 結構

這樣未來你才不會重構。
