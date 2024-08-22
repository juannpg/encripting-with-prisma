# Encrypting in PrismaORM with prisma-field-encryption

## Description

This README provides a guide on how to use the `prisma-field-encryption` package to encrypt specific fields in a Prisma model and how to find those specific fields with  prisma's `find` functions.
**🚨 DO NOT USE THIS TO ENCRYPT PASSWORDS WITHOUT ADDITIONAL SECURITY MEASURES 🚨**

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
To exemplify all this, we are going to assume that we were creating a **registration and login system** in which we are asked for a `username` and an `email`, email which we are going to **encrypt**.

```typescript
model User { 
   id            Int      @id         @default(autoincrement())
   username      String   @unique
   email         String               /// @encrypted
   emailHash     String   @unique     /// @encryption:hash(email)
}
```

- The `/// @encrypted` property encrypts the input of the password when it is created.
- The `/// @encryption:hash(email)` property defines that this is the field for the hash (identifier) of the encrypted `password` field.
- The `emailHash` field is marked as `null` so that it is not required when creating a user, as the hash is automatically generated with the extension.

### 2. Creating encrypted fields

```typescript
const user = await prisma.user.create({
  data: {
    username: username as string, // username and email have
    email: email as string,       // been previusly required to the body
  },
});
```

- When creating a row with a username and email, **the provided email will be encrypted**.
- An **INVARIABLE Hash** will also be assigned to the password.

### 3. Finding encrypted fields
Thanks to the `emailHash` field, we can find users if we insert the same password with which it was created. When using `findUnique`, internally, the where clause will be rewritten to match the emailHash field with the computed hash of the clear-text input (kind of like a password check). So even if you, as the developver, copy the passwordHash from a user and use it to log in their account, you won't be able, as your input will be rewritten into a different hash.

```typescript
const user = await prisma.user.findUnique({
   where: {
      username: username as string,
      email: email as string,
   },
});
```
