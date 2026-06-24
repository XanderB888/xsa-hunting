## Auth screens
- SignupPage (stateful) — renders the signup form and holds the email/username/password field values until submit.
- LoginPage (stateful) — renders the login form and holds email/password input until submit.

## Shared
- NavBar (presentational) — Side bar shown on all logged-in screens; displays logo, search, New Post, and Logout. Receives handlers as props; holds no data of its own. (Search could make it lightly stateful later — for MVP presentational.)

## Feed
- Feed (stateful — page) — fetches and holds the list of all posts, renders a PostCard for each.
- PostCard (presentational) — displays one post summary (image, username, caption, species, comment count); receives one post object as props.

## Post detail
- PostDetail (stateful — page) — fetches and holds one full post (by id from the URL), renders its sub-sections and the comments.
- ShotPlacementPanel (presentational) — displays the animal image with the red dot stored x/y, plus read-only time of hunt, wind, and weather; receives shot data as props.
- FirearmInfo (presentational) — displays read-only brand, caliber, ammo type, grain; receives firearm data as props.
- CommentList (presentational) — receives the array of comments and renders a CommentItem for each.
- CommentItem (presentational) — displays one comment (username + text); receives one comment as props.
- CommentForm (stateful) — holds the new-comment input text and submits it.

## Create post
- CreatePostForm (stateful — page) — holds all the new-post field values (photo, caption, location, species, sex, distance, firearm fields, conditions) and submits the post.
- ShotPlacementSelector (stateful) — the cascade: holds the chosen species → chosen view image → the x/y red-dot coordinate the user clicks. Its own component because it's the most complex interaction in the app.