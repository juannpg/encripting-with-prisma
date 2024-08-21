# Encrypting in PrismaORM with `prisma-field-encryption`

## Description

This README provides a guide on how to use the `prisma-field-encryption` package to encrypt specific fields in a Prisma model and how to find those specific fields with  prisma's `find` functions.

## Package

- `prisma-field-encryption`

This package allows us to encrypt desired fields in the Prisma schema and add a `hash` field to identify the encrypted field with `prisma.find`.

## Backend Dependencies

Make sure you have the following dependencies installed in your project:

- `@prisma/client`
- `@types/cors`
- `@types/express`
- `@types/node`
- `cors`
- `express`
- `nodemon`
- `prisma`
- `prisma-field-encryption`
- `ts-node`
- `typescript`

## Implementation

### 1. Define the Model
To exemplify all this, we are going to assume that we were creating a **registration and login system** in which we are asked for a `username` and a `password`, a password which we are going to **encrypt**.

```typescript
model User {
  id            Int     @id @default(autoincrement())
  username      String  @unique
  password      String  @encrypted
  passwordHash  String  @unique /// @encryption:hash(password)
}
```

- The `/// @encrypted` property encrypts the input of the password when it is created.
- The `/// @encryption:hash(password)` property defines that this is the field for the hash (identifier) of the encrypted `password` field.
- The `passwordHash` field is marked as `null` so that it is not required when creating a user, as the hash is automatically generated with the extension.

### 2. Creating encrypted fields

```typescript
const user = await prisma.user.create({
  data: {
    username: username as string,
    password: password as string,
  },
});
```

- When creating a row with a username and password, **the provided password will be encrypted**.
- An **INVARIABLE Hash** will also be assigned to the password.

### 3. Finding encrypted fields
Thanks to the `passwordHash` field, we can find users if we insert the same password with which it was created. When using `findUnique`, the `where` clause will be rewritten to match the `passwordHash` field with the hash calculated from the plaintext input (similar to password verification).

```typescript
const user = await prisma.user.findUnique({
  where: {
    passwordHash: password as string,
    password: password as string,
  },
});
```
