# 📋 DEPLOYMENT CHECKLIST

## Pre-Deployment Verification

### 1. Database Preparation
- [ ] Backup database (`ql_thuctap`)
- [ ] Run SQL migration for `yeu_thich_don_vi` table
  ```bash
  # Copy SQL from ql_thuctap.sql lines for yeu_thich_don_vi
  ```
- [ ] Verify table created: `SHOW TABLES LIKE 'yeu_thich_don_vi';`
- [ ] Check constraints: `DESCRIBE yeu_thich_don_vi;`
- [ ] Test cascade delete:
  ```sql
  -- This should work
  DELETE FROM sinh_vien WHERE id = ?;
  -- Favorite records should auto-delete
  ```

### 2. Backend Verification
- [ ] File exists: `backend/controllers/YeuThichController.js`
- [ ] File exists: `backend/routes/YeuThichRoutes.js`
- [ ] File exists: `backend/utils/yeuThichSql.js`
- [ ] Check `backend/server.js`:
  ```javascript
  // Line should exist:
  const yeuThichRoutes = require('./routes/YeuThichRoutes');
  app.use('/api/yeu_thich', yeuThichRoutes);
  ```
- [ ] Test backend: `npm start` in backend folder
- [ ] Check console: "Server running" message
- [ ] Test endpoint: `curl http://localhost:5000/api/health`

### 3. Frontend Verification
- [ ] File exists: `frontend/src/components/FavoriteButton.js`
- [ ] File exists: `frontend/src/pages/sinhvien/sv_yeu_thich_don_vi.js`
- [ ] File exists: `frontend/src/styles/FavoriteButton.css`
- [ ] File exists: `frontend/src/styles/sinhvien/sv_yeu_thich_don_vi.css`
- [ ] Check imports in `frontend/src/App.js`:
  ```javascript
  // Should have:
  import SinhVienYeuThichDonVi from './pages/sinhvien/sv_yeu_thich_don_vi';
  ```
- [ ] Check routes in `frontend/src/App.js`:
  ```javascript
  // Should have route:
  <Route path="/sinh-vien/yeu-thich" element={...} />
  ```
- [ ] Check API service in `frontend/src/services/api.js`:
  ```javascript
  // Should have:
  export const yeuThichService = { ... }
  ```

### 4. API Testing

#### Test 1: Toggle Like
```bash
curl -X POST http://localhost:5000/api/yeu_thich/toggle \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"ma_don_vi": "DV001"}'
```
Expected: `{ "isFavorited": true, "message": "..." }`

#### Test 2: Check Status
```bash
curl http://localhost:5000/api/yeu_thich/check/DV001 \
  -H "Authorization: Bearer YOUR_TOKEN"
```
Expected: `{ "isFavorited": true }`

#### Test 3: Get List
```bash
curl http://localhost:5000/api/yeu_thich/danh-sach \
  -H "Authorization: Bearer YOUR_TOKEN"
```
Expected: Array of favorite units

#### Test 4: Batch Check
```bash
curl -X POST http://localhost:5000/api/yeu_thich/batch-check \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"donViList": ["DV001", "DV002"]}'
```
Expected: `{ "favoriteIds": ["DV001"] }`

#### Test 5: Get Count
```bash
curl http://localhost:5000/api/yeu_thich/count/DV001 \
  -H "Authorization: Bearer YOUR_TOKEN"
```
Expected: `{ "count": 42 }`

### 5. Frontend Testing

#### Test 1: Login
- [ ] Navigate to login page
- [ ] Login with student account
- [ ] Verify token in localStorage

#### Test 2: List View
- [ ] Navigate to `/sinh-vien/danh-sach-don-vi`
- [ ] Verify list loads
- [ ] Verify "♥ Yêu thích" button appears
- [ ] Verify count button appears

#### Test 3: Toggle Like
- [ ] Click "♥ Yêu thích" button
- [ ] Toast shows success message
- [ ] Button changes state to "Bỏ yêu thích"
- [ ] Count button updates

#### Test 4: Favorites Page
- [ ] Click count button "♥ Đã yêu thích (1)"
- [ ] Navigate to `/sinh-vien/yeu-thich`
- [ ] Verify favorited units display
- [ ] Verify "Bỏ yêu thích" works

#### Test 5: Unlike
- [ ] Click "Bỏ yêu thích" button
- [ ] Toast shows success message
- [ ] Unit removed from list
- [ ] Count updates

### 6. Permission Testing

#### Admin User
- [ ] Login as admin
- [ ] Navigate to `/sinh-vien/danh-sach-don-vi`
- [ ] Verify no "♥ Yêu thích" button
- [ ] Verify no `/sinh-vien/yeu-thich` link

#### Staff User (Cán bộ)
- [ ] Login as staff
- [ ] Verify no access to features

#### Student User
- [ ] Login as student
- [ ] All features should work

### 7. Responsive Testing

#### Desktop (1920x1080)
- [ ] Button layout correct
- [ ] Grid displays properly
- [ ] Animation smooth

#### Tablet (768x1024)
- [ ] Responsive grid works
- [ ] Buttons accessible
- [ ] No overflow

#### Mobile (375x667)
- [ ] Single column layout
- [ ] Buttons full width
- [ ] Touch friendly

### 8. Browser Compatibility
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### 9. Error Handling
- [ ] Delete all favorites → empty state shows
- [ ] Network error → error toast shows
- [ ] Invalid token → redirect to login
- [ ] Server error (500) → error message shows

### 10. Performance
- [ ] Page load time < 2s
- [ ] Like/Unlike response < 500ms
- [ ] No console errors
- [ ] No memory leaks

---

## Deployment Steps

### Step 1: Database
```bash
# Connect to MySQL
mysql -u root -p

# Use database
USE ql_thuctap;

# Create table (copy from ql_thuctap.sql)
CREATE TABLE IF NOT EXISTS yeu_thich_don_vi (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sinh_vien_id INT NOT NULL,
  ma_don_vi VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_favorite (sinh_vien_id, ma_don_vi),
  FOREIGN KEY (sinh_vien_id) REFERENCES sinh_vien(id) ON DELETE CASCADE,
  FOREIGN KEY (ma_don_vi) REFERENCES don_vi(ma_don_vi) ON DELETE CASCADE
);

# Verify
SHOW TABLES;
DESCRIBE yeu_thich_don_vi;
```

### Step 2: Backend
```bash
cd backend

# Install dependencies (if needed)
npm install

# Restart server
npm start
# or: npm run dev (if configured)

# Check logs
# Should see: "Server running at http://localhost:5000"
```

### Step 3: Frontend
```bash
cd frontend

# Install dependencies (if needed)
npm install

# Build for production
npm run build

# Or start development
npm start

# Check: http://localhost:3000
```

### Step 4: Verify Integration
- [ ] Backend and Frontend communicating
- [ ] API responses correct
- [ ] No CORS errors
- [ ] All features working

---

## Post-Deployment

### Monitoring
- [ ] Set up error logging
- [ ] Monitor API response times
- [ ] Check database performance
- [ ] Monitor user activity

### Documentation
- [ ] Update user manual
- [ ] Add feature to help docs
- [ ] Create tutorial video (optional)
- [ ] Notify users via email/announcement

### Maintenance
- [ ] Schedule database backups
- [ ] Monitor server logs
- [ ] Track error rates
- [ ] Plan future enhancements

---

## Rollback Plan

If critical issues discovered:

### Option 1: Disable Feature (Fast)
```javascript
// Comment in backend/server.js
// app.use('/api/yeu_thich', yeuThichRoutes);

// Remove from frontend/src/App.js routes
// <Route path="/sinh-vien/yeu-thich" ... />
```

### Option 2: Full Rollback
```bash
# Revert changes
git checkout HEAD -- backend/server.js frontend/src/App.js

# Delete new files
rm backend/controllers/YeuThichController.js
rm backend/routes/YeuThichRoutes.js
# ... etc

# Drop table
mysql -u root -p ql_thuctap
> DROP TABLE yeu_thich_don_vi;

# Restart services
npm start
```

---

## Sign-off

- [ ] All tests passed
- [ ] No breaking changes
- [ ] Documentation complete
- [ ] Team reviewed
- [ ] Ready for production
- [ ] Deployment approved

**Deployed by:** _______________  
**Date:** _______________  
**Time:** _______________  
**Status:** _______________

---

## Notes

```
_____________________________________________________________________

_____________________________________________________________________

_____________________________________________________________________
```

---

**Good luck with deployment! 🚀**
