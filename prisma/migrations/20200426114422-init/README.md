# Migration `20200426114422-init`

This migration has been generated at 4/26/2020, 11:44:22 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Task" (
    "content" text  NOT NULL DEFAULT '',
    "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "createdBy" text  NOT NULL DEFAULT '',
    "dueDate" text  NOT NULL DEFAULT '',
    "id" text  NOT NULL ,
    "priority" text  NOT NULL DEFAULT '',
    "tags" text  NOT NULL DEFAULT '',
    "title" text  NOT NULL DEFAULT '',
    "updatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."User" (
    "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "email" text  NOT NULL DEFAULT '',
    "id" text  NOT NULL ,
    "lives" text  NOT NULL DEFAULT '',
    "name" text  NOT NULL DEFAULT '',
    "updatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    PRIMARY KEY ("id")
) 
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200426114422-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,29 @@
+datasource db {
+  provider = "postgresql"
+  url      = "postgresql://postgres:docker@localhost:5432/pg-docker?schema=public"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Task {
+  id             String   @default(cuid()) @id
+  createdAt      DateTime @default(now())
+  updatedAt      DateTime @updatedAt
+  title          String
+  content        String
+  dueDate        String
+  priority       String
+  tags           String
+  createdBy		 String
+}
+
+model User {
+  id             String   @default(cuid()) @id
+  createdAt      DateTime @default(now())
+  updatedAt      DateTime @updatedAt
+  name			 String
+  email			 String
+  lives			 String
+}
```


