# Database Schema for Corporate Travel Request System

## Overview
This schema supports a complete corporate travel management system including travel requests, budget tracking, expense management, and user profiles.

---

## Tables

### 1. **users**
Stores employee/user information and authentication details.

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  corporate_id VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(200),
  title VARCHAR(100),
  department VARCHAR(100),
  office_location VARCHAR(100),
  manager_id INT,
  avatar_url VARCHAR(500),
  status ENUM('Active', 'On Leave', 'Inactive') DEFAULT 'Active',
  profile_tag VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (manager_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_corporate_id ON users(corporate_id);
CREATE INDEX idx_users_manager ON users(manager_id);
```

---

### 2. **user_tags**
Stores tags/skills associated with users (many-to-many relationship).

```sql
CREATE TABLE user_tags (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  tag_name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_tag (user_id, tag_name)
);

CREATE INDEX idx_user_tags_user ON user_tags(user_id);
```

---

### 3. **travel_requests**
Main table for travel requests with all essential information.

```sql
CREATE TABLE travel_requests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  request_number VARCHAR(50) UNIQUE NOT NULL,
  user_id INT NOT NULL,
  destination VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  purpose ENUM('client', 'conference', 'internal', 'other') NOT NULL,
  purpose_description TEXT,
  notes TEXT,
  status ENUM('Draft', 'Submitted', 'Manager Approved', 'Finance Approved', 'Rejected', 'Completed') DEFAULT 'Draft',
  total_budget DECIMAL(10, 2) DEFAULT 0.00,
  contingency DECIMAL(10, 2) DEFAULT 0.00,
  final_budget DECIMAL(10, 2) DEFAULT 0.00,
  submitted_at TIMESTAMP NULL,
  manager_approved_at TIMESTAMP NULL,
  finance_approved_at TIMESTAMP NULL,
  rejected_at TIMESTAMP NULL,
  rejection_reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_travel_requests_user ON travel_requests(user_id);
CREATE INDEX idx_travel_requests_status ON travel_requests(status);
CREATE INDEX idx_travel_requests_dates ON travel_requests(start_date, end_date);
CREATE INDEX idx_travel_requests_number ON travel_requests(request_number);
```

---

### 4. **budget_items**
Breakdown of budget categories for each travel request.

```sql
CREATE TABLE budget_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  travel_request_id INT NOT NULL,
  category ENUM('flights', 'accommodation', 'transport', 'meals', 'other') NOT NULL,
  amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (travel_request_id) REFERENCES travel_requests(id) ON DELETE CASCADE
);

CREATE INDEX idx_budget_items_request ON budget_items(travel_request_id);
CREATE INDEX idx_budget_items_category ON budget_items(category);
```

---

### 5. **expenses**
Individual expense entries for completed or in-progress trips.

```sql
CREATE TABLE expenses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  travel_request_id INT NOT NULL,
  user_id INT NOT NULL,
  category ENUM('travel', 'food', 'hotel', 'misc', 'other') NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  description TEXT,
  expense_date DATE NOT NULL,
  receipt_required BOOLEAN DEFAULT TRUE,
  status ENUM('Pending', 'Submitted', 'Approved', 'Rejected') DEFAULT 'Pending',
  submitted_at TIMESTAMP NULL,
  approved_at TIMESTAMP NULL,
  rejected_at TIMESTAMP NULL,
  rejection_reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (travel_request_id) REFERENCES travel_requests(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_expenses_request ON expenses(travel_request_id);
CREATE INDEX idx_expenses_user ON expenses(user_id);
CREATE INDEX idx_expenses_status ON expenses(status);
CREATE INDEX idx_expenses_date ON expenses(expense_date);
```

---

### 6. **documents**
Uploaded files/documents for budget documentation and receipts.

```sql
CREATE TABLE documents (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  related_entity_type ENUM('travel_request', 'expense', 'user') NOT NULL,
  related_entity_id INT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_type VARCHAR(50),
  file_size INT,
  document_type ENUM('budget_doc', 'receipt', 'policy', 'other') DEFAULT 'other',
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_documents_user ON documents(user_id);
CREATE INDEX idx_documents_entity ON documents(related_entity_type, related_entity_id);
CREATE INDEX idx_documents_type ON documents(document_type);
```

---

### 7. **approval_workflow**
Tracks approval stages for travel requests.

```sql
CREATE TABLE approval_workflow (
  id INT PRIMARY KEY AUTO_INCREMENT,
  travel_request_id INT NOT NULL,
  approver_id INT,
  approver_type ENUM('Manager', 'Finance', 'Executive') NOT NULL,
  status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
  comments TEXT,
  approved_at TIMESTAMP NULL,
  rejected_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (travel_request_id) REFERENCES travel_requests(id) ON DELETE CASCADE,
  FOREIGN KEY (approver_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX idx_approval_request ON approval_workflow(travel_request_id);
CREATE INDEX idx_approval_approver ON approval_workflow(approver_id);
CREATE INDEX idx_approval_status ON approval_workflow(status);
```

---

### 8. **reimbursements**
Tracks reimbursement status for submitted expenses.

```sql
CREATE TABLE reimbursements (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  travel_request_id INT,
  total_amount DECIMAL(10, 2) NOT NULL,
  status ENUM('Processing', 'Approved', 'Paid', 'Rejected') DEFAULT 'Processing',
  progress_percentage INT DEFAULT 0,
  estimated_completion_date DATE,
  payment_method VARCHAR(50),
  payment_reference VARCHAR(100),
  notes TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  approved_at TIMESTAMP NULL,
  paid_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (travel_request_id) REFERENCES travel_requests(id) ON DELETE SET NULL
);

CREATE INDEX idx_reimbursements_user ON reimbursements(user_id);
CREATE INDEX idx_reimbursements_request ON reimbursements(travel_request_id);
CREATE INDEX idx_reimbursements_status ON reimbursements(status);
```

---

### 9. **notifications**
System notifications for users about approvals, rejections, etc.

```sql
CREATE TABLE notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type ENUM('info', 'warning', 'success', 'error') DEFAULT 'info',
  related_entity_type ENUM('travel_request', 'expense', 'reimbursement') NULL,
  related_entity_id INT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_created ON notifications(created_at);
```

---

### 10. **audit_log**
Tracks all important actions in the system for compliance.

```sql
CREATE TABLE audit_log (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id INT NOT NULL,
  old_values JSON,
  new_values JSON,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_user ON audit_log(user_id);
CREATE INDEX idx_audit_entity ON audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_created ON audit_log(created_at);
```

---

## Relationships Summary

```
users (1) -----> (many) travel_requests
users (1) -----> (many) expenses
users (1) -----> (many) documents
users (1) -----> (many) reimbursements
users (1) -----> (1) users [manager relationship]
users (1) -----> (many) user_tags

travel_requests (1) -----> (many) budget_items
travel_requests (1) -----> (many) expenses
travel_requests (1) -----> (many) documents
travel_requests (1) -----> (many) approval_workflow
travel_requests (1) -----> (many) reimbursements

expenses (1) -----> (many) documents

approval_workflow (many) -----> (1) users [approver]
```

---

## Key Features Supported

✅ User management with manager hierarchy  
✅ Travel request creation with draft functionality  
✅ Multi-step budget breakdown  
✅ Expense tracking and submission  
✅ Document/receipt uploads  
✅ Multi-level approval workflow (Manager → Finance)  
✅ Reimbursement tracking with progress  
✅ Audit logging for compliance  
✅ Notification system  
✅ Status transitions (Draft → Submitted → Approved → Completed)

---

## Sample Data Queries

### Get all travel requests for a user:
```sql
SELECT * FROM travel_requests 
WHERE user_id = ? 
ORDER BY created_at DESC;
```

### Get pending expenses for a trip:
```sql
SELECT * FROM expenses 
WHERE travel_request_id = ? AND status = 'Pending';
```

### Get approval workflow for a request:
```sql
SELECT aw.*, u.full_name as approver_name 
FROM approval_workflow aw
LEFT JOIN users u ON aw.approver_id = u.id
WHERE aw.travel_request_id = ?
ORDER BY aw.created_at;
```

### Get user with manager info:
```sql
SELECT u.*, m.full_name as manager_name, m.title as manager_title, m.avatar_url as manager_avatar
FROM users u
LEFT JOIN users m ON u.manager_id = m.id
WHERE u.id = ?;
```

---

## Notes

- All monetary values use DECIMAL(10,2) for precision
- Timestamps track creation and updates for audit purposes
- Soft deletes can be implemented by adding `deleted_at` columns if needed
- Indexes are added on frequently queried columns for performance
- Foreign key constraints ensure referential integrity
- ENUM types provide data validation at database level
