## Functional Requirements (FRs)

- [x] It must be possible to sign up
- [x] It must be possible to authenticate
- [x] It must be possible to retrieve the profile of a logged-in user
- [x] It must be possible to search for users by name

## Business Rules (BRs)

- [x] A user must not be able to sign up with a duplicate email
- [x] A user must not be able to sign up with a duplicate phone number
- [x] A user's profile must only be visible to authorized users

## Non-Functional Requirements (NFRs)

- [x] A user's password must be encrypted
- [x] The application's data must be persisted in a PostgreSQL database
- [x] A user must be identified by a JWT (Json Web Token)