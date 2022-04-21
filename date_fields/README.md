Continue your work with User Management REST Api.
Add to user profile records tech fields: created_at, updated_at, deleted_at. This fields should not be exposed at REST.
Add every user profile add header Last-Modified with value from updated_at
Protect profile changes from update without knowledge about the last resource state by checking If-Unmodified-Since header
