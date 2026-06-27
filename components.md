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

==================================================================================================================================================================================================================================================

## State

## Global (Context)
- AuthContext
- Holds:
    - current user
    - Login fn
    - Logout fn
- Components that consume it:
    - NavBar
    - PostDetail
    - CreatePostForm
    - router guard

## Page-level
- Feed owns:
    - posts array

- PostDetail owns:
    - the post
    - comments array

## Local
- SignupPage
- LoginPage
- CommentForm
    - in-progress comment text is local until submit
- CreatePostForm
    - all the fields are local to the form until submit
- ShotPlacementSelector
    - chosen species (local)
    - chosen view image (local)
    - red-dot x/y coordinate (local)

## Lifting results up
- CommentForm - calls an addComment function passed down from PostDetail
  PostDetail updates its comments array.
- ShotPlacementSelector - lifts its final result {image, x, y} up to
  CreatePostForm, so it submits with the rest of the post fields.