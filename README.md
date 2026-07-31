# Stockly
# Stockly

Stockly is a full-stack inventory management application built as a Moringa School Phase V capstone project. It allows a business to manage products, categories, and suppliers, with role-based access control for Admins and Employees, and a full audit trail of every change made to inventory.

There is no public self-registration. Accounts are created exclusively by an Admin, who issues each new employee a temporary password. This mirrors how real inventory/POS systems (e.g. Shopify POS, Square) typically work — the business owner or manager provisions accounts for staff rather than allowing open sign-up.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Repositories](#repositories)
- [User Roles](#user-roles)
- [Database Schema](#database-schema)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Key Design Decisions](#key-design-decisions)
- [Constraints & Validation](#constraints--validation)
- [License](#license)

---

## Tech Stack

**Frontend**
- React 19 (Vite)
- MUI v9
- React Router v6

**Backend**
- Flask (application factory pattern)
- Flask-SQLAlchemy (ORM)
- Flask-Migrate (Alembic migrations)
- Flask-JWT-Extended (authentication)
- Flask-CORS
- Flask-Marshmallow + marshmallow-sqlalchemy (serialization)
- Gunicorn (production WSGI server)

**Database**
- SQLite (local development)
- PostgreSQL (production)

**Deployment**
- Render (backend + PostgreSQL)
- Vercel (frontend)

---

## Repositories

Stockly is split across two separate repositories, each independently deployable:

- **Frontend:** `Stockly-front-end`
- **Backend:** `stockly-full-stack-back-end`

The two communicate purely over HTTP — the frontend calls the backend's REST API using a base URL configured via an environment variable. There is no shared code or shared repository between them.

---

## User Roles

| Role | Description |
|---|---|
| **Visitor** | Unauthenticated. Can only access the login page. |
| **User (Employee)** | Created by an Admin. Can view products, add/edit products, and view their own activity history. Cannot delete products or manage suppliers, categories, or other users. |
| **Admin** | Full system access. Can manage products, categories, suppliers, employee accounts, and view the full system-wide activity log. |

New employee accounts are created by an Admin with a randomly generated temporary password. The employee must set their own password on first login before accessing the rest of the app.

---

## Database Schema

**Models**

| Model | Description |
|---|---|
| `User` | System accounts (Admin or User role) |
| `Category` | Product categories |
| `Supplier` | Product suppliers |
| `Product` | Inventory items |
| `ActivityLog` | Audit trail of create/update/delete actions |
| `ProductSupplier` | Join table linking Products and Suppliers, with a supplier-specific `cost_price` |

**Relationships**

- `Category` → `Product` — one-to-many (a category has many products)
- `User` → `ActivityLog` — one-to-many (a user generates many log entries)
- `Product` → `ActivityLog` — one-to-many (a product can have many log entries)
- `Product` ↔ `Supplier` — many-to-many, via `ProductSupplier` (a product can be sourced from multiple suppliers, and a supplier can supply multiple products)

---

## Backend Setup

**Prerequisites:** Python 3.10+, pip

```bash
# Clone the backend repo
git clone <backend-repo-url>
cd stockly-full-stack-back-end

# Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Create your .env file (see Environment Variables section below)

# Run database migrations
flask db upgrade

# Seed the first Admin account
python seed.py

# Run the development server
python wsgi.py
```

The API will be available at `http://127.0.0.1:5000`.

**Default seeded admin login** (change immediately on first login):
- Email: `admin@stockly.com`
- Password: set in `seed.py`

---

## Frontend Setup

**Prerequisites:** Node.js 18+, npm

```bash
# Clone the frontend repo
git clone <frontend-repo-url>
cd Stockly-front-end

# Install dependencies
npm install

# Create your .env file (see Environment Variables section below)

# Run the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Environment Variables

**Backend (`.env`)**

| Variable | Description | Example |
|---|---|---|
| `SECRET_KEY` | Flask session secret | random string |
| `JWT_SECRET_KEY` | Secret used to sign JWTs | random string |
| `DATABASE_URL` | Database connection string | `sqlite:///stockly.db` (local) / `postgresql://...` (production) |
| `FRONTEND_ORIGIN` | Allowed CORS origin | `http://localhost:5173` (local) / deployed frontend URL (production) |

Generate secure random values for `SECRET_KEY` and `JWT_SECRET_KEY` with:
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

**Frontend (`.env`)**

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Base URL of the backend API | `http://127.0.0.1:5000` (local) / deployed backend URL (production) |

---

## API Endpoints

All endpoints are prefixed as shown. Endpoints marked 🔒 require a valid JWT. Endpoints marked 🔒👑 require a valid JWT **and** the `admin` role.

**Auth**
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/login` | Log in, returns JWT + user object |
| POST | `/auth/set-password` | Change password (used for forced first-login reset) |

**Products**
| Method | Endpoint | Access |
|---|---|---|
| GET | `/products` | 🔒 |
| GET | `/products/:id` | 🔒 |
| POST | `/products` | 🔒 |
| PUT | `/products/:id` | 🔒 |
| DELETE | `/products/:id` | 🔒👑 |

**Categories**
| Method | Endpoint | Access |
|---|---|---|
| GET | `/categories` | 🔒 |
| GET | `/categories/:id` | 🔒 |
| POST | `/categories` | 🔒👑 |
| PUT | `/categories/:id` | 🔒👑 |
| DELETE | `/categories/:id` | 🔒👑 |

**Suppliers**
| Method | Endpoint | Access |
|---|---|---|
| GET | `/suppliers` | 🔒 |
| GET | `/suppliers/:id` | 🔒 |
| POST | `/suppliers` | 🔒👑 |
| PUT | `/suppliers/:id` | 🔒👑 |
| DELETE | `/suppliers/:id` | 🔒👑 |

**Admin — Users**
| Method | Endpoint | Access |
|---|---|---|
| GET | `/admin/users` | 🔒👑 |
| POST | `/admin/users` | 🔒👑 |
| PUT | `/admin/users/:id` | 🔒👑 |

**Activity Log**
| Method | Endpoint | Access |
|---|---|---|
| GET | `/my-activity` | 🔒 (returns only the logged-in user's own entries) |
| GET | `/admin/activity-log` | 🔒👑 (returns every user's entries) |

---

## Deployment

**Backend (Render)**
1. Create a PostgreSQL instance on Render
2. Create a Web Service pointing at the backend repo
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn wsgi:app`
3. Set the environment variables listed above, using the Postgres instance's connection string for `DATABASE_URL`
4. Run `flask db upgrade` and `python seed.py` against the production database once deployed

**Frontend (Vercel)**
1. Import the frontend repo
2. Framework preset: Vite (auto-detected)
3. Set `VITE_API_URL` to the deployed backend URL
4. A `vercel.json` rewrite rule is included to correctly serve React Router's client-side routes on direct navigation/refresh:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```

After both are deployed, update the backend's `FRONTEND_ORIGIN` environment variable to match the live frontend URL so CORS allows requests from it.

---

## Key Design Decisions

**Two separate repositories instead of a monorepo.** The frontend and backend are fully independent applications communicating only over HTTP, deployed to separate platforms (Vercel and Render respectively). Keeping them in separate repositories keeps each deployment pipeline simple and avoids one service's build config interfering with the other's.

**Flask Blueprints to modularize routes.** Rather than defining every route in a single file, each resource (auth, products, categories, suppliers, admin users, activity log) has its own Blueprint with its own `url_prefix`. This keeps route files focused and readable as the API grows, and mirrors how most production Flask applications are structured.

**The application factory pattern (`create_app()`).** The Flask app instance is built inside a function rather than as a bare module-level object. This avoids circular imports between models, routes, and extensions, since every module can import the *uninitialized* extension objects (`db`, `jwt`, etc.) safely without needing the running `app` instance itself.

**Flask-Marshmallow's `SQLAlchemyAutoSchema` for serialization.** Rather than hand-writing a dictionary-building function for every model, each schema is auto-generated directly from its corresponding SQLAlchemy model. This keeps serializer definitions to a few lines per model and ensures the API response shape stays in sync with the database schema without manual duplication. Sensitive fields (e.g. `password_hash` on `User`) are explicitly excluded via `Meta.exclude` so they can never accidentally leak into an API response.

**`secrets.token_urlsafe()` for temporary passwords.** When an Admin creates a new employee account, the backend generates a temporary password using Python's `secrets` module — specifically chosen over the general-purpose `random` module, since `secrets` is designed for cryptographically secure random generation. The employee is required to set their own permanent password on first login (`must_reset_password` flag), so the temporary password is never long-lived.

**Users are deactivated, never deleted.** Deleting a `User` row would orphan or destroy that user's associated `ActivityLog` history, undermining the audit trail's entire purpose. Instead, an `is_active` boolean flag controls login access: an Admin can deactivate an account (blocking login immediately) without erasing the historical record of what that user did while active.

**`ActivityLog.product_id` is nullable.** If a `Product` is deleted, its associated log entries are preserved rather than deleted or blocked — but since the product itself no longer exists, `product_id` is set to `NULL` rather than pointing at a non-existent row. The log's `details` text field captures the product's name and SKU at the time of the action, so the entry remains meaningful even after the product is gone.

**`ProductSupplier` cascades on Product deletion.** Unlike `ActivityLog`, the join table linking Products and Suppliers carries no historical value once a product is deleted — a "which suppliers sell this now-deleted product, and at what price" record has no ongoing purpose. `Product.product_suppliers` is configured with `cascade='all, delete-orphan'`, so these rows are automatically cleaned up when a product is deleted.

**Category and Supplier deletion is blocked, not cascaded, when products are attached.** Deleting a `Category` or `Supplier` that still has products assigned to it is rejected with a `400` error rather than silently deleting or orphaning those products. This forces an intentional reassignment step rather than allowing accidental data loss.

**Category names are looked up on the frontend, not nested in the Product API response.** `GET /products` returns each product's `category_id` (a foreign key) rather than a nested category object. The frontend fetches the category list separately and maps IDs to names client-side. This keeps the Product API response lean and avoids duplicating category data across every product in the response.

---

## Constraints & Validation

**User**
- `email` — unique, required
- `password_hash` — required (never exposes the raw password; set via `set_password()`, verified via `check_password()`)
- `role` — required, defaults to `'user'`
- `is_active` — defaults to `True`
- `must_reset_password` — defaults to `True` for every newly created account

**Category**
- `name` — unique, required
- Cannot be deleted while products are still assigned to it

**Supplier**
- `name` — required
- Cannot be deleted while linked to products via `ProductSupplier`

**Product**
- `name` — required
- `sku` — unique, required
- `category_id` — required (every product must belong to a category)
- `stock_quantity` — defaults to `0`
- `image_url` — optional (products may be created without an image)

**ProductSupplier**
- Composite primary key: (`product_id`, `supplier_id`) — a given product/supplier pairing is unique by definition
- `cost_price` — optional, supplier-specific pricing for the same product

**ActivityLog**
- `user_id` — required (every log entry has an actor)
- `product_id` — optional (nulled if the referenced product is later deleted)
- `action` — required (e.g. `created`, `updated`, `deleted`)

---

## License

MIT License. See `LICENSE` for details.