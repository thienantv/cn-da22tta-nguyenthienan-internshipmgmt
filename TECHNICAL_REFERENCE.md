# 🔧 TECHNICAL REFERENCE - API & Database

## Database Schema

### Table: `yeu_thich_don_vi`

```sql
CREATE TABLE IF NOT EXISTS yeu_thich_don_vi (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sinh_vien_id INT NOT NULL,
  ma_don_vi VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_favorite (sinh_vien_id, ma_don_vi),
  FOREIGN KEY (sinh_vien_id) REFERENCES sinh_vien(id) ON DELETE CASCADE,
  FOREIGN KEY (ma_don_vi) REFERENCES don_vi(ma_don_vi) ON DELETE CASCADE
);
```

**Relationships:**
- `sinh_vien.id` ← One-to-Many → `yeu_thich_don_vi.sinh_vien_id`
- `don_vi.ma_don_vi` ← One-to-Many → `yeu_thich_don_vi.ma_don_vi`
- **Type:** Many-to-Many (Junction Table)

**Indexes:**
- Primary Key: `id`
- Unique Constraint: `(sinh_vien_id, ma_don_vi)` - Ensures one like per student per unit
- Foreign Keys: Automatic CASCADE delete

---

## API Documentation

### Base URL
```
http://localhost:5000/api/yeu_thich
```

### Authentication
**Required:** Bearer token in Authorization header
```
Authorization: Bearer <token>
```

**Role:** `sinh_vien` (Student only)

---

### Endpoint 1: Toggle Favorite

```http
POST /api/yeu_thich/toggle
Content-Type: application/json

{
  "ma_don_vi": "DV001"
}
```

**Response (Success):**
```json
{
  "isFavorited": true,
  "message": "Yêu thích đơn vị thành công"
}
```

**Response (When Unlike):**
```json
{
  "isFavorited": false,
  "message": "Bỏ yêu thích đơn vị thành công"
}
```

**Error Responses:**
- `400`: Missing `ma_don_vi`
- `404`: Đơn vị không tồn tại
- `401`: Unauthorized
- `500`: Server error

---

### Endpoint 2: Check Favorite Status

```http
GET /api/yeu_thich/check/DV001
Authorization: Bearer <token>
```

**Response:**
```json
{
  "isFavorited": true
}
```

**Status Codes:**
- `200`: OK
- `400`: Missing ma_don_vi
- `401`: Unauthorized
- `500`: Server error

---

### Endpoint 3: Get Favorite List

```http
GET /api/yeu_thich/danh-sach
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "ma_don_vi": "DV001",
    "ten_don_vi": "Phòng Truyền thông và Quảng bá",
    "dia_chi": "126 Nguyễn Thiện Thành, K4, P5, TP Trà Vinh",
    "so_dien_thoai": null,
    "email_don_vi": "tttt@tvu.edu.vn",
    "gioi_thieu": "Đơn vị trực thuộc Trường Đại học Trà Vinh...",
    "dieu_kien_thuc_tap": "Sinh viên năm 3 trở lên...",
    "hinh_anh": null,
    "created_at": "2024-12-01T10:00:00.000Z",
    "updated_at": "2024-12-01T10:00:00.000Z",
    "favorited_at": "2024-12-22T14:30:45.000Z"
  }
]
```

**Sorting:** By `favorited_at` DESC (newest first)

**Status Codes:**
- `200`: OK
- `401`: Unauthorized
- `500`: Server error

---

### Endpoint 4: Batch Check Favorites

```http
POST /api/yeu_thich/batch-check
Content-Type: application/json
Authorization: Bearer <token>

{
  "donViList": ["DV001", "DV002", "DV003"]
}
```

**Response:**
```json
{
  "favoriteIds": ["DV001", "DV003"]
}
```

**Usage:** For performance optimization. Instead of calling `/check` 50 times, call this once with all IDs.

**Status Codes:**
- `200`: OK
- `400`: Invalid donViList
- `401`: Unauthorized
- `500`: Server error

---

### Endpoint 5: Get Favorite Count

```http
GET /api/yeu_thich/count/DV001
Authorization: Bearer <token>
```

**Response:**
```json
{
  "count": 42
}
```

**Use Case:** Display how many students favorited this unit.

**Status Codes:**
- `200`: OK
- `400`: Missing ma_don_vi
- `401`: Unauthorized
- `500`: Server error

---

## Code Structure

### Backend Layers

#### 1. Routes (`YeuThichRoutes.js`)
```javascript
// Defines endpoints and applies middleware
router.post('/toggle', toggleFavorite);
router.get('/check/:ma_don_vi', checkFavorite);
router.get('/danh-sach', getFavoriteList);
router.post('/batch-check', batchCheckFavorites);
router.get('/count/:ma_don_vi', getFavoriteCount);
```

#### 2. Controller (`YeuThichController.js`)
```javascript
// Business logic
toggleFavorite(req, res)      // Like/Unlike logic
checkFavorite(req, res)       // Get status
getFavoriteList(req, res)     // Get all favorites
batchCheckFavorites(req, res) // Check multiple
getFavoriteCount(req, res)    // Get count
```

#### 3. Database Queries
```sql
-- Example: Toggle favorite
SELECT id FROM yeu_thich_don_vi WHERE sinh_vien_id = ? AND ma_don_vi = ?
INSERT INTO yeu_thich_don_vi (sinh_vien_id, ma_don_vi) VALUES (?, ?)
DELETE FROM yeu_thich_don_vi WHERE sinh_vien_id = ? AND ma_don_vi = ?
```

### Frontend Architecture

#### 1. Services (`api.js`)
```javascript
yeuThichService.toggleFavorite(maDonVi)     // POST
yeuThichService.checkFavorite(maDonVi)      // GET
yeuThichService.getFavoriteList()           // GET
yeuThichService.batchCheckFavorites(list)   // POST
yeuThichService.getFavoriteCount(maDonVi)   // GET
```

#### 2. Components
```
FavoriteButton.js
  ├─ Props: maDonVi, initialState, onToggle, size, showLabel
  ├─ State: isFavorited, loading
  ├─ Effects: useEffect for initialState
  └─ Handler: handleToggleFavorite()
```

#### 3. Pages
```
sv_danh_sach_don_vi.js
  ├─ State: donVi[], favoriteStatuses{}, loading
  ├─ Effects: fetchDonVi(), batchCheckFavorites()
  └─ Renders: FavoriteButton for each unit

sv_yeu_thich_don_vi.js
  ├─ State: favorites[], loading
  ├─ Effects: getFavoriteList()
  ├─ Empty State: When no favorites
  └─ Renders: List of favorite units
```

---

## Error Handling

### Backend Error Patterns

```javascript
// Missing field
return res.status(400).json({ message: 'ma_don_vi là bắt buộc' });

// Not found
return res.status(404).json({ message: 'Đơn vị không tồn tại' });

// Forbidden (role check)
return res.status(403).json({ message: 'Bạn không có quyền...' });

// Server error
return res.status(500).json({ 
  message: 'Lỗi máy chủ', 
  error: error.message 
});
```

### Frontend Error Handling

```javascript
try {
  const response = await yeuThichService.toggleFavorite(maDonVi);
  setIsFavorited(response.data.isFavorited);
  showSuccess(response.data.message);
} catch (error) {
  showError(error.response?.data?.message || 'Lỗi');
}
```

---

## Performance Optimization

### 1. Batch Loading
Instead of:
```javascript
// ❌ BAD: N+1 requests
for (let dv of donViList) {
  const status = await checkFavorite(dv.ma_don_vi);
}
```

Use:
```javascript
// ✅ GOOD: 1 request
const { favoriteIds } = await batchCheckFavorites(donViList.map(d => d.ma_don_vi));
```

### 2. Database Optimization
```sql
-- ✅ Use UNIQUE constraint instead of checking
UNIQUE KEY unique_favorite (sinh_vien_id, ma_don_vi)

-- ✅ Use JOIN instead of separate queries
SELECT d.* FROM don_vi d
INNER JOIN yeu_thich_don_vi y ON y.ma_don_vi = d.ma_don_vi
WHERE y.sinh_vien_id = ?
```

### 3. Frontend Caching
```javascript
// Cache favorites in state
const [favoriteStatuses, setFavoriteStatuses] = useState({});

// Update optimistically
setFavoriteStatuses(prev => ({
  ...prev,
  [maDonVi]: !prev[maDonVi]
}));
```

---

## Security Considerations

### 1. Authentication
- All endpoints require valid JWT token
- Token verified via `verifyToken` middleware
- Token extracted from Authorization header

### 2. Authorization
- Role-based access control: `checkRole('sinh_vien')`
- Only students can access favorite endpoints
- User ID from decoded token ensures data isolation

### 3. Data Validation
- Input validation in controller
- UNIQUE constraint at database level
- Foreign key constraints prevent invalid references

### 4. SQL Injection Prevention
- All queries use prepared statements (?)
- No string concatenation in SQL
- Parameters sanitized by mysql2/promise

### 5. Rate Limiting (Optional Future Enhancement)
```javascript
// Could add:
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/yeu_thich', limiter);
```

---

## Testing Scenarios

### Happy Path
```
1. Student Login → JWT token
2. POST /toggle with DV001 → isFavorited: true
3. GET /check/DV001 → isFavorited: true
4. GET /danh-sach → Array contains DV001
5. POST /toggle with DV001 → isFavorited: false
6. GET /check/DV001 → isFavorited: false
```

### Error Cases
```
- No token → 401 Unauthorized
- Wrong role (admin) → 403 Forbidden
- Invalid ma_don_vi → 404 Not Found
- Missing body field → 400 Bad Request
- Database error → 500 Internal Server Error
```

### Edge Cases
```
- Like same unit twice → Second creates UNIQUE constraint error (handled)
- Unlike when not favorited → 0 rows affected (no error, works fine)
- Delete student → Cascades to delete favorites (referential integrity)
- Delete unit → Cascades to delete favorites (referential integrity)
```

---

## Deployment Checklist

- [ ] Database migration applied (table created)
- [ ] Backend server restarted
- [ ] Frontend built and deployed
- [ ] API URL correctly set in .env
- [ ] JWT token endpoint working
- [ ] CORS configured if needed
- [ ] SSL/HTTPS enabled in production
- [ ] Error logging configured
- [ ] Database backups scheduled
- [ ] Monitoring alerts set up

---

## Rollback Plan

If issues occur:

### Quick Rollback
1. Remove routes from server.js
2. Remove imports from App.js
3. Remove UI components
4. Database table remains (doesn't hurt)

### Full Rollback
1. Drop table: `DROP TABLE yeu_thich_don_vi;`
2. Revert all file changes via Git
3. Restart backend and frontend

### Partial Rollback
1. Keep database table
2. Disable endpoints via middleware
3. Hide UI components with feature flag

---

**Last Updated:** 2024-12-22

**Version:** 1.0.0

**Status:** Production Ready ✅
