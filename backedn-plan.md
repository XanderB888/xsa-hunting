## Databse tables
    users
        id              SERIAL PRIMARY KEY
        username        VARCHAR UNIQUE NOT NULL
        email           VARCHAR UNIQUE NOT NULL
        password        VARCHAR NOT NULL (hashed)
        created_at      TIMESTAMP DEFAULT NOW()

    posts
        id                SERIAL PRIMARY KEY
        user_id           INTEGER REFERENCES users(id)     ← who posted it
        photo             VARCHAR
        caption           TEXT
        location          VARCHAR
        species           VARCHAR
        sex               VARCHAR
        distance          INTEGER
        shot_image        VARCHAR (from shotPlacement.image)
        shot_x            NUMERIC (from shotPlacement.x)
        shot_y            NUMERIC (from shotPlacement.y)
        time_of_day       VARCHAR
        wind              VARCHAR
        weather           VARCHAR
        firearm_brand     VARCHAR
        caliber           VARCHAR
        ammo              VARCHAR
        grain             INTEGER
        created_at        TIMESTAMP DEFAULT NOW()

    comments
        id            SERIAL PRIMARY KEY
        post_id       INTEGER REFERENCES posts(id)
        user_id       INTEGER REFERENCES users(id)
        text          TEXT NOT NULL
        created_at    TIMESTAMP DEFAULT NOW()

## API endpoints
    Feed fetches all posts                  
        GET /api/posts
        - Fetches a list of all posts
        - Returns { username, caption, species, comments.length}
        - Requires auth (for MVP kept it simple), user must be logged in to view posts
        - Returns: fetched posts in a list

    PostDetail fetches one post             
        GET /api/posts/:id
        - Fetches a single post
        - Returns { post id, user id, photo, caption, location, species, sex, distance, shot placement, time of day, wind, weather, firearm brand, caliber, ammo, grain, timestamp, comments section}
        - Requires auth, user must be logged in to view posts
        - Returns: single detailed post

    CreatePostForm submits a new post       
        POST /api/posts
        - Submits a new post by user
        - requires auth, user must be logged in to be able to post
        - Returns: confirmation of submission

    Delete button removes a post            
        DELETE /api/posts/:id
        - Removes a post from the database
        - Requires auth, user must be logged in & can only delete their own post
        - Returns: confirmation of successful deletion

    CommentForm adds a comment              
        POST /api/posts/:id/comments
        - Adds a comment to an existing post
        - Requires auth, user must be logged in to see and comment on any post
        - Returns: new comment and adds to the list of comments for the specific post

    LoginPage submits credentials                        
        POST /api/auth/login
        - Authenticates an existing user
        - Body: { email, password }
        - Compares password against the stored bcrypt hash
        - Returns: the logged-in user { id, username, email } (never the password)

    SignupPage creates an account                        
        POST /api/auth/register
        - Creates a new user account
        - Body: { username, email, password }
        - Hashes the password with bcrypt before storing
        - Returns: the created user { id, username, email } (never the password)

## Auth rules
    Public (no login required):
    - POST /api/auth/register
    - POST /api/auth/login

    Requires logged-in user:
    - GET /api/posts                (viewing feed — gated, matching front-end)
    - GET /api/posts/:id            (viewing a post)
    - POST /api/posts               (creating)
    - POST /api/posts/:id/comments  (commenting)

    Requires ownership (logged in AND the post's author):
    - DELETE /api/posts/:id     (only the user who created the post)

    Note: the front-end delete button only HIDES for non-owners — this is
    NOT security. The server MUST re-check that the logged-in user's id
    matches the post's user_id before deleting, because the API can be
    called directly. Ownership is enforced server-side.

## Decisions
    - Photo stored as a URL string (photo VARCHAR); real file upload deferred to next steps.
    - Single-post endpoint bundles comments (no separate comments GET).
    - DB columns are snake_case, JS is camelCase — mapped in the query layer.
    - Passwords hashed with bcrypt.