# CSS Class Refactoring Guide - Auto-Update Instructions

## Quick Reference: Find & Replace Patterns

### FOR ADMIN PAGES (qtv_*)

#### qtv_quan_ly_can_bo.js & qtv_quan_ly_can_bo.css
```
quan_ly_container → qtv__quan_ly_can_bo
form_container → qtv__quan_ly_can_bo--form_container
form_group → qtv__quan_ly_can_bo--form_group
form_buttons → qtv__quan_ly_can_bo--form_buttons
table_wrapper → qtv__quan_ly_can_bo--table_wrapper
data_table → qtv__quan_ly_can_bo--data_table
action_cell → qtv__quan_ly_can_bo--action_cell
btn-link → qtv__quan_ly_can_bo--btn_link
```

#### qtv_quan_ly_sinh_vien.js & qtv_quan_ly_sinh_vien.css
```
quan_ly_container → qtv__quan_ly_sinh_vien
form_container → qtv__quan_ly_sinh_vien--form_container
form_group → qtv__quan_ly_sinh_vien--form_group
form_buttons → qtv__quan_ly_sinh_vien--form_buttons
table_wrapper → qtv__quan_ly_sinh_vien--table_wrapper
data_table → qtv__quan_ly_sinh_vien--data_table
action_cell → qtv__quan_ly_sinh_vien--action_cell
btn-link → qtv__quan_ly_sinh_vien--btn_link
```

#### qtv_thong_tin.js & qtv_thong_tin.css
```
thong_tin_container → qtv__thong_tin
thong_tin_content → qtv__thong_tin--thong_tin_content
thong_tin_section → qtv__thong_tin--thong_tin_section
info_group → qtv__thong_tin--info_group
info_row → qtv__thong_tin--info_row
form_group → qtv__thong_tin--form_group
form_item → qtv__thong_tin--form_item
button_group → qtv__thong_tin--button_group
```

### FOR MANAGER PAGES (cbql_*)

#### cbql_quan_ly_don_vi.js & cbql_quan_ly_don_vi.css
```
danh_sach_container → cbql__quan_ly_don_vi
filter_section → cbql__quan_ly_don_vi--filter_section
filter_row → cbql__quan_ly_don_vi--filter_row
action_bar → cbql__quan_ly_don_vi--action_bar
them-donvi-btn → cbql__quan_ly_don_vi--them-donvi-btn
view_toggle → cbql__quan_ly_don_vi--view_toggle
view-btn → cbql__quan_ly_don_vi--view-btn
don_vi_cards → cbql__quan_ly_don_vi--don_vi_cards
don_vi_card → cbql__quan_ly_don_vi--don_vi_card
card_image → cbql__quan_ly_don_vi--card_image
card_content → cbql__quan_ly_don_vi--card_content
card_address → cbql__quan_ly_don_vi--card_address
card_description → cbql__quan_ly_don_vi--card_description
card_buttons → cbql__quan_ly_don_vi--card_buttons
btn-modern → cbql__quan_ly_don_vi--btn-modern
don_vi_table_wrapper → cbql__quan_ly_don_vi--don_vi_table_wrapper
don_vi_table → cbql__quan_ly_don_vi--don_vi_table
action_cell → cbql__quan_ly_don_vi--action_cell
```

#### cbql_them_don_vi.js & cbql_them_don_vi.css
```
form_container → cbql__them_don_vi
error-message → cbql__them_don_vi--error-message
success-message → cbql__them_don_vi--success-message
form_grid → cbql__them_don_vi--form_grid
half → cbql__them_don_vi--half
full → cbql__them_don_vi--full
form_group → cbql__them_don_vi--form_group
image_upload_grid → cbql__them_don_vi--image_upload_grid
image_input → cbql__them_don_vi--image_input
image_preview → cbql__them_don_vi--image_preview
form_actions → cbql__them_don_vi--form_actions
cancel_btn → cbql__them_don_vi--cancel_btn
```

#### cbql_sua_don_vi.js & cbql_sua_don_vi.css
```
sua_don_vi_container → cbql__sua_don_vi
error-message → cbql__sua_don_vi--error-message
sua_don_vi_form → cbql__sua_don_vi--sua_don_vi_form
form_group → cbql__sua_don_vi--form_group
image_preview → cbql__sua_don_vi--image_preview
form_buttons → cbql__sua_don_vi--form_buttons
btn-success → cbql__sua_don_vi--btn-success
btn-secondary → cbql__sua_don_vi--btn-secondary
```

#### cbql_them_can_bo.js & cbql_them_can_bo.css
```
form_container → cbql__them_can_bo
error-message → cbql__them_can_bo--error-message
success-message → cbql__them_can_bo--success-message
form_grid → cbql__them_can_bo--form_grid
donvi_grid → cbql__them_can_bo--donvi_grid
input_search_donvi → cbql__them_can_bo--input_search_donvi
select_donvi → cbql__them_can_bo--select_donvi
donvi_dropdown → cbql__them_can_bo--donvi_dropdown
donvi_item → cbql__them_can_bo--donvi_item
donvi_noresult → cbql__them_can_bo--donvi_noresult
form_actions → cbql__them_can_bo--form_actions
cancel_btn → cbql__them_can_bo--cancel_btn
```

#### cbql_chi_tiet_don_vi.js & cbql_chi_tiet_don_vi.css
```
chi_tiet_don_vi_container → cbql__chi_tiet_don_vi
back_btn → cbql__chi_tiet_don_vi--back_btn
chi_tiet_don_vi_content → cbql__chi_tiet_don_vi--chi_tiet_don_vi_content
chi_tiet_don_vi_header → cbql__chi_tiet_don_vi--chi_tiet_don_vi_header
chi_tiet_don_vi_body → cbql__chi_tiet_don_vi--chi_tiet_don_vi_body
chi_tiet_don_vi_section → cbql__chi_tiet_don_vi--chi_tiet_don_vi_section
info_row → cbql__chi_tiet_don_vi--info_row
can_bo_list → cbql__chi_tiet_don_vi--can_bo_list
can_bo_item → cbql__chi_tiet_don_vi--can_bo_item
chi_tiet_don_vi_footer → cbql__chi_tiet_don_vi--chi_tiet_don_vi_footer
btn-edit → cbql__chi_tiet_don_vi--btn-edit
btn-delete → cbql__chi_tiet_don_vi--btn-delete
```

#### cbql_chi_tiet_can_bo.js & cbql_chi_tiet_can_bo.css
```
detail_footer → cbql__chi_tiet_can_bo--detail_footer
chi_tiet_container → cbql__chi_tiet_can_bo--chi_tiet_container
chi_tiet_content → cbql__chi_tiet_can_bo--chi_tiet_content
chi_tiet_body → cbql__chi_tiet_can_bo--chi_tiet_body
chi_tiet_section → cbql__chi_tiet_can_bo--chi_tiet_section
info_row → cbql__chi_tiet_can_bo--info_row
```

#### cbql_trang_chu.js & cbql_trang_chu.css
```
trang_chu_container → cbql__trang_chu
welcome_section → cbql__trang_chu--welcome_section
thong_ke_container → cbql__trang_chu--thong_ke_container
thong_ke_grid → cbql__trang_chu--thong_ke_grid
thong_ke_item → cbql__trang_chu--thong_ke_item
thong_ke_number → cbql__trang_chu--thong_ke_number
link-quanly → cbql__trang_chu--link-quanly
action_container → cbql__trang_chu--action_container
action_buttons → cbql__trang_chu--action_buttons
info_section → cbql__trang_chu--info_section
```

#### cbql_thong_tin.js & cbql_thong_tin.css
```
thong_tin_container → cbql__thong_tin
thong_tin_content → cbql__thong_tin--thong_tin_content
thong_tin_section → cbql__thong_tin--thong_tin_section
info_group → cbql__thong_tin--info_group
info_row → cbql__thong_tin--info_row
form_group → cbql__thong_tin--form_group
form_item → cbql__thong_tin--form_item
button_group → cbql__thong_tin--button_group
```

### FOR STUDENT PAGES (sv_*)

#### sv_trang_chu.js & sv_trang_chu.css
```
trang_chu_container → sv__trang_chu
welcome_section → sv__trang_chu--welcome_section
action_container → sv__trang_chu--action_container
action_buttons → sv__trang_chu--action_buttons
info_section → sv__trang_chu--info_section
```

#### sv_danh_sach_don_vi.js & sv_danh_sach_don_vi.css
```
danh_sach_container → sv__danh_sach_don_vi
filter_section → sv__danh_sach_don_vi--filter_section
filter_grid → sv__danh_sach_don_vi--filter_grid
filter_item → sv__danh_sach_don_vi--filter_item
filter_buttons → sv__danh_sach_don_vi--filter_buttons
action_bar → sv__danh_sach_don_vi--action_bar
view_toggle → sv__danh_sach_don_vi--view_toggle
view-btn → sv__danh_sach_don_vi--view-btn
don_vi_cards → sv__danh_sach_don_vi--don_vi_cards
don_vi_card → sv__danh_sach_don_vi--don_vi_card
card_image → sv__danh_sach_don_vi--card_image
card_content → sv__danh_sach_don_vi--card_content
card_address → sv__danh_sach_don_vi--card_address
card_location → sv__danh_sach_don_vi--card_location
card_description → sv__danh_sach_don_vi--card_description
btn-small → sv__danh_sach_don_vi--btn-small
don_vi_table_wrapper → sv__danh_sach_don_vi--don_vi_table_wrapper
don_vi_table → sv__danh_sach_don_vi--don_vi_table
action_cell → sv__danh_sach_don_vi--action_cell
btn-link → sv__danh_sach_don_vi--btn-link
```

#### sv_danh_sach_can_bo.js & sv_danh_sach_can_bo.css
```
danh_sach_container → sv__danh_sach_can_bo
filter_section → sv__danh_sach_can_bo--filter_section
filter_grid → sv__danh_sach_can_bo--filter_grid
filter_item → sv__danh_sach_can_bo--filter_item
filter_buttons → sv__danh_sach_can_bo--filter_buttons
action_bar → sv__danh_sach_can_bo--action_bar
view_toggle → sv__danh_sach_can_bo--view_toggle
view-btn → sv__danh_sach_can_bo--view-btn
don_vi_cards → sv__danh_sach_can_bo--don_vi_cards
don_vi_card → sv__danh_sach_can_bo--don_vi_card
card_image → sv__danh_sach_can_bo--card_image
card_content → sv__danh_sach_can_bo--card_content
card_address → sv__danh_sach_can_bo--card_address
card_location → sv__danh_sach_can_bo--card_location
card_description → sv__danh_sach_can_bo--card_description
btn-small → sv__danh_sach_can_bo--btn-small
don_vi_table_wrapper → sv__danh_sach_can_bo--don_vi_table_wrapper
don_vi_table → sv__danh_sach_can_bo--don_vi_table
action_cell → sv__danh_sach_can_bo--action_cell
btn-link → sv__danh_sach_can_bo--btn-link
```

#### sv_chi_tiet_don_vi.js & sv_chi_tiet_don_vi.css
```
chi_tiet_container → sv__chi_tiet_don_vi
chi_tiet_content → sv__chi_tiet_don_vi--chi_tiet_content
chi_tiet_header → sv__chi_tiet_don_vi--chi_tiet_header
chi_tiet_image → sv__chi_tiet_don_vi--chi_tiet_image
chi_tiet_body → sv__chi_tiet_don_vi--chi_tiet_body
chi_tiet_section → sv__chi_tiet_don_vi--chi_tiet_section
info_row → sv__chi_tiet_don_vi--info_row
can_bo_list → sv__chi_tiet_don_vi--can_bo_list
can_bo_item → sv__chi_tiet_don_vi--can_bo_item
```

#### sv_chi_tiet_can_bo.js & sv_chi_tiet_can_bo.css
```
chi_tiet_container → sv__chi_tiet_can_bo
chi_tiet_content → sv__chi_tiet_can_bo--chi_tiet_content
chi_tiet_header → sv__chi_tiet_can_bo--chi_tiet_header
chi_tiet_image → sv__chi_tiet_can_bo--chi_tiet_image
chi_tiet_body → sv__chi_tiet_can_bo--chi_tiet_body
chi_tiet_section → sv__chi_tiet_can_bo--chi_tiet_section
info_row → sv__chi_tiet_can_bo--info_row
can_bo_list → sv__chi_tiet_can_bo--can_bo_list
can_bo_item → sv__chi_tiet_can_bo--can_bo_item
```

#### sv_thong_tin.js & sv_thong_tin.css
```
thong_tin_container → sv__thong_tin
thong_tin_content → sv__thong_tin--thong_tin_content
thong_tin_section → sv__thong_tin--thong_tin_section
info_group → sv__thong_tin--info_group
info_row → sv__thong_tin--info_row
form_group → sv__thong_tin--form_group
form_item → sv__thong_tin--form_item
button_group → sv__thong_tin--button_group
```

## How to Use This Guide

### Method 1: VS Code Find & Replace
1. Open each CSS file
2. Use Ctrl+H (Find & Replace)
3. Copy paste each "FROM → TO" pattern
4. Click "Replace All"
5. Repeat for corresponding .js files

### Method 2: Command Line (Advanced)
```bash
# For batch replacement in CSS files
find frontend/src/styles -name "*.css" -type f -exec sed -i 's/quan_ly_container/qtv__quan_ly_can_bo/g' {} \;

# This requires careful path-specific application
```

### Method 3: Manual File-by-File
Follow the priority order for maximum impact:

**PRIORITY 1 (Most Used):**
- cbql_quan_ly_don_vi (manager units list - complex page)
- sv_danh_sach_don_vi (student units list - heavily used)
- sv_danh_sach_can_bo (student mentors list - heavily used)

**PRIORITY 2 (Important):**
- All qtv_ files (admin pages)
- cbql_them_don_vi (manager add unit)
- cbql_them_can_bo (manager add mentor)

**PRIORITY 3 (Standard):**
- Remaining cbql_ files
- Remaining sv_ files

## Verification After Updates

For each file pair (CSS + JS):
```
1. Open browser developer tools (F12)
2. Go to Elements/Inspector tab
3. Search for the old class name - should find 0 results
4. Search for new class name - should find elements
5. Check no CSS error messages in Console tab
6. Verify styles are applied correctly
```

## Notes

- The pattern `__` separates role from page name
- The pattern `--` separates page name from component
- This prevents conflicts between roles
- All functionality remains unchanged - only styling isolation improved

## Complete - Ready to Deploy

Once all files are updated following this guide:
1. Run `npm start` in frontend folder
2. Test all pages load without CSS errors
3. Verify styles apply correctly to all pages
4. Commit changes to git

---

**Generated:** December 12, 2025
**Status:** Framework complete, awaiting systematic file updates
