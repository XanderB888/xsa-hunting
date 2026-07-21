# XSA Hunting

A full-stack social platform where South African hunters share their hunts — photos, trophy details, firearm data, and a distinctive **shot-placement system** that lets hunters mark exactly where a shot landed on an anatomical diagram of the animal.

## Live demo: [xsa-hunting-frontend.onrender.com](https://xsa-hunting-frontend.onrender.com)

Built as a full-stack capstone project.

---

## Screenshots

**Feed**
![Feed](./docs/screenshots/feed.png)

**Post detail — with shot-placement diagram**
![Post detail](./docs/screenshots/post-detail.png)

**Create post — click-to-place shot marker**
![Create post](./docs/screenshots/create-post.png)

**Login**
![Login](./docs/screenshots/login.png)

---

## The problem it solves

Hunters routinely discuss shot placement — it's central to ethical hunting and to learning the craft — but existing platforms only let you post a photo and a caption. There's no way to communicate *where* the shot landed, under *what* conditions, with *what* equipment.

XSA Hunting makes that data first-class: every post captures the animal, the shot's exact position on an anatomical diagram, the environmental conditions, and the full firearm setup.

---

## Key features

### 🎯 Percentage-based shot placement (the core feature)
Users select a species and a view (left/right profile), then **click directly on the animal diagram** to mark where the shot landed. The click position is converted to **percentage coordinates** and stored — meaning the marker renders at the correct anatomical position regardless of what size the diagram displays at (thumbnail, full detail view, or mobile).

The capture math: on click, the position is calculated relative to the image's bounding box (`getBoundingClientRect()`), divided by its dimensions, and stored as a 0–100 percentage. Rendering reverses it — an absolutely-positioned marker at `left: x%, top: y%` inside a relatively-positioned container.

Currently supports 9 South African species (Impala, Kudu, Warthog, Bushpig, Zebra, Blue Wildebeest, Blesbuck, Springbuck and Oryx) with left and right profile views.

### JWT authentication
- Passwords hashed with **bcrypt** (never stored in plain text, never returned in responses)
- **JSON Web Tokens** issued on login/register, verified by middleware on every protected request
- Token stored client-side and attached automatically via an **axios request interceptor**
- Login failures return a deliberately vague "Invalid credentials" for both wrong-email and wrong-password cases, preventing user enumeration

### Server-side authorization
The frontend hides the delete button for non-owners — but that's **not security**. The server independently verifies that the authenticated user's ID matches the post's `user_id` before allowing deletion, returning `403 Forbidden` otherwise. The API can be called directly, so ownership is enforced where it counts.

### Per-user likes (many-to-many)
Likes are modelled properly with a **join table** (`post_likes`) and a `UNIQUE (user_id, post_id)` database constraint — so a user can like a post exactly once, enforced at the database level. The like endpoint toggles: it checks for an existing row and either inserts or deletes. Each user sees their own like state, and the count reflects all users.

### 📸 Image upload
Real photo upload via **Cloudinary's unsigned upload widget** — users pick a file from their device, it's uploaded and hosted, and the resulting URL is stored. No URL-pasting required.

### 💬 Comments, feed, and full CRUD
Post creation with photo, caption ("Journal"), location, species, sex, shot distance, firearm details (brand, caliber, ammo, grain), and conditions (time of day, wind, weather). Comments on posts. Owner-only deletion.

---

## Tech stack

**Frontend**
- React 19 (Vite)
- React Router v7 (with protected routes)
- React Context (global auth state)
- Axios (with request interceptor for token injection)
- Plain CSS (custom design system, CSS variables, responsive)

**Backend**
- Node.js + Express
- PostgreSQL (`pg` with connection pooling)
- JWT (`jsonwebtoken`) + bcrypt
- Parameterized queries throughout (SQL-injection safe)

**Testing**
- Backend: Jest + Supertest (API endpoint tests)
- Frontend: Vitest + React Testing Library (component tests)

**Infrastructure**
- Deployed on Render (static site + web service + managed PostgreSQL)
- Cloudinary for user image hosting

---

## Architecture

```
xsa-hunting/
├── client/                    # React frontend
│   ├── public/
│   │   └── shots/             # Animal diagram assets
│   └── src/
│       ├── api/               # Axios instance + token interceptor
│       ├── components/
│       │   ├── auth/          # Login, Signup
│       │   ├── comments/      # CommentList, CommentItem, CommentForm
│       │   ├── createPost/    # CreatePostForm, ShotPlacementSelector
│       │   ├── feed/          # Feed, PostCard
│       │   ├── post/          # PostDetail, ShotPlacementPanel, FirearmInfo
│       │   ├── NavBar/
│       │   └── routes/        # ProtectedRoute
│       ├── context/           # AuthContext
│       └── gallery/           # Species → diagram image map
└── server/                    # Express backend
    ├── db/                    # Pool + schema.sql
    ├── middleware/            # JWT authentication
    ├── routes/                # posts, auth
    └── __tests__/             # Jest + Supertest
```

### Database schema

```
users          posts                      comments        post_likes
─────          ─────                      ────────        ──────────
id             id                         id              id
username       user_id ──► users(id)      post_id ──►     user_id ──► users(id)
email          photo, caption, location   user_id ──►     post_id ──► posts(id)
password       species, sex, distance     text            UNIQUE(user_id, post_id)
created_at     shot_image, shot_x, shot_y created_at
               time_of_day, wind, weather
               firearm_brand, caliber,
               ammo, grain
               created_at
```

**Design notes:**
- One-to-one data (shot placement, firearm) is **flattened into the posts table** rather than split out — no join needed for data that always belongs to exactly one post
- One-to-many (comments) and many-to-many (likes) get their own tables with foreign keys
- `ON DELETE CASCADE` on comments and likes means deleting a post cleans up its dependents automatically
- Posts store `user_id`, not the username — the API **joins** to `users` to return the display name, avoiding data duplication

---

## API

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | — | Create account, returns `{ token, user }` |
| `POST` | `/api/auth/login` | — | Authenticate, returns `{ token, user }` |
| `GET` | `/api/posts` | ✓ | Feed — all posts with username, comment count, like count, and whether the current user liked it |
| `GET` | `/api/posts/:id` | ✓ | Single post with its comments bundled in |
| `POST` | `/api/posts` | ✓ | Create a post (author derived from token, not the request body) |
| `DELETE` | `/api/posts/:id` | ✓ + owner | Delete — server verifies ownership, `403` otherwise |
| `POST` | `/api/posts/:id/comments` | ✓ | Add a comment |
| `PATCH` | `/api/posts/:id/like` | ✓ | Toggle like for the current user |

---

## Running locally

**Prerequisites:** Node.js 22+, PostgreSQL, a Cloudinary account (free tier)

**1. Clone and install**
```bash
git clone https://github.com/XanderB888/xsa-hunting.git
cd xsa-hunting

cd client && npm install
cd ../server && npm install
```

**2. Set up the database**
```bash
psql -U postgres
CREATE DATABASE xsa_hunting;
\c xsa_hunting
\i db/schema.sql
```

**3. Configure environment variables**

`server/.env`:
```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/xsa_hunting
JWT_SECRET=your_long_random_secret_here
PORT=3000
```

`client/.env`:
```
VITE_API_URL=http://localhost:3000/api
```

Cloudinary: update the `cloudName` and `uploadPreset` in `client/src/components/createPost/CreatePostForm.jsx` with your own (create an **unsigned** upload preset in the Cloudinary dashboard).

**4. Run both servers** (two terminals)
```bash
cd server && npm run dev     # http://localhost:3000
cd client && npm run dev     # http://localhost:5173
```

**5. Run the tests**
```bash
cd server && npm test        # Jest + Supertest
cd client && npm test        # Vitest
```

---

## Engineering decisions worth calling out

**Mock data before the backend.** The entire frontend was built and verified against a mock data file shaped like the eventual API response. When the backend was ready, swapping mock arrays for `fetch` calls required almost no component changes — the UI was already proven.

**Percentage coordinates, not pixels.** Storing shot positions as percentages (rather than pixel offsets) means the marker stays anatomically correct at any render size. A pixel-based approach would break the moment the diagram displayed at a different width.

**Auth identity from the token, never the request body.** Early versions of the create-post and comment endpoints accepted `user_id` in the body. That's trivially spoofable. The middleware now derives the user from the verified JWT and attaches it to the request — clients can't lie about who they are.

**Loading states everywhere async happens.** Every form disables its submit button and shows in-progress text while a request is in flight, preventing double-submits (which, before the fix, could create duplicate posts on a slow connection).

---

## Next steps

- **Edit posts** — a `PUT /api/posts/:id` endpoint reusing the create form, pre-filled with existing values
- **Hunting packages marketplace** — let farm owners advertise available hunts, addressing the real difficulty of finding new places to hunt
- **Regional animal guide** — browse species by region with reference shot-placement anatomy
- **Expanded species and views** — more animals, plus front/rear/angled views
- **Global expansion** — the platform is South Africa–first by design, but the model generalises
- **Hunting Blog** — a space where hunters can share their hunting stories
- **Hunting tips** — share hunting tips with others
- **User 'Hunter' profiles** — profile pictures, bios, experience, favorite firearms, favorite animal hunted, hunting stories *ties to Blog*, origin, tips for others *ties to hunting tips*, longest ethical shot, species hunted *list to tick off per Region*, first animal ever hunted
- **Tighter CORS** — currently open; should be restricted to the deployed frontend origin
- **Per-user like optimisation** — the feed currently computes like state per post; could be batched
- **Gun shop marketplace** — allow businesses to advertise thier products such as firearms and ammunition on a merketplace section
- **Password reset** — email-based recovery flow (forgot-password page, secure time-limited reset tokens, and an email provider like Resend or SendGrid); currently accounts have no recovery option since passwords are one-way hashed

---

## Credits

Some animal diagram assets sourced from [Vecteezy.com](https://www.vecteezy.com) and modified (resized/flipped) for this project. 
Remaining diagrams are original work.

---

Built by **Xander** — [LinkedIn](https://www.linkedin.com/in/xander-botha-940905138) · [GitHub](https://github.com/XanderB888)
