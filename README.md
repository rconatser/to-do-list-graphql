# To Do List using a GraphQL Server
App utliizing a GraphQL API server using Node and the Prisma Framework. Using the API, you can Create, Read, Update, and Delete (CRUD) both Tasks, and Users. The server implements:

- [x] Prisma as the data modeling tool
- [x] Docker-based PostgreSQL, MySQL, or MongoDB as the data store
- [x] At least 3 Query resolvers to get data from the server
- [x] At least 2 Mutation resolvers allowing users to create, update, or upsert an item.
- [x] At least 1 Mutation resolver allowing users to delete an item.
- [x] The datastore will contain at least 25 items
- [x] The app will be deployable locally using Docker and will have seed data entered into the datastore.
- [x] All of the source code will be properly uploaded to GitHub
- [x] The ReadMe file will accurately describe the server install and run process and how to use the APIs


## How to use

### 1. Download example & install dependencies

Clone this repository:

```
git clone https://github.com/rconatser/to-do-list_graphQL
```

Change into project's root directory and install:

```
npm install
```

Note that this also generates Prisma Client JS into `node_modules/@prisma/client` via a `postinstall` hook of the `@prisma/client` package from your `package.json`.

<Details><Summary><strong>Follow these steps to start/restart from scratch</strong></Summary>

If you have an existing Docker container running and want to restart from scratch, run the `nuke` npm script:

```
npm run nuke
```

Create a new database instance and migrate it by running the `createDB` npm script:

```
npm run createDB
```

Generate the Prisma Client code by running the `generate` npm script:

```
npm run generate
```

Seed the database by running the `seed` npm script:

```
npm run seed
```
</Details>

<Details><Summary><strong>Follow these steps to view the databases/tables</strong></Summary>

View the database and it's tables in a browser tab by running the `dev` npm script:

```
npm run dev
```

You can then navigate to [http://localhost:5555/](http://localhost:5555/) in your browser to view the already existing database. You should see two tabs at the top that allow you to view both Tasks and Users.
</Details>

### 2. Start the GraphQL server

Launch your GraphQL server with this command:

```
npm start
```

Navigate to [http://localhost:4000](http://localhost:4000) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).

### 3. Using the GraphQL API

The schema that specifies the API operations of your GraphQL server is defined in [`./schema.graphql`](./schema.graphql). Below are a number of operations that you can send to the API using the GraphQL Playground.

Feel free to adjust any operation by adding or removing fields. The GraphQL Playground helps you with its auto-completion and query validation features.

#### Retrieve all tasks with their id, title, content, due date, priority, tags, and creator

```graphql
query {
  Tasks {
    id,
    title,
    content,
    dueDate,
    priority,
    tags,
    createdBy
  }
}
```

<Details><Summary><strong>See more API operations</strong></Summary>

#### Create a new task

```graphql
mutation {
	createOneTask( data: {
    	title: "My task",
		content: "My task description",
		dueDate: "04/05/20",
		priority: "Medium",
		tags: "Misc",
		createdBy: "Max"
	}) {
		id,
		createdAt,
		title
	}
}
```

#### Update a task

```graphql
mutation {
  updateOneTask(
	data:{
		title:"My Updated Task", 
		createdBy:"Max"
	}, where:{
		id:" __TASK_ID__ "
	}) {
		title,
		id,
		dueDate,
		createdBy
  }
}
```

#### Delete a specific task by id

```graphql
mutation {
  deleteOneTask(where: {
    id: " __TASK_ID__ "
  }) {
    id
    title
  }
}
```

> **Note**: You need to replace the `__TASK_ID__` placeholder with an actual `id` from a `Task` item. You can find one e.g. using the `Tasks` query.

#### Retrieve a single task by its id

```graphql
query {
  Task(id: " __TASK_ID__ ") {
    id,
	title,
	content,
	dueDate,
	createdBy,
	priority,
	tags
  }
}
```

> **Note**: You need to replace the `__TASK_ID__` placeholder with an actual `id` from a `Task` item. You can find one e.g. using the `Tasks` query.

</Details>

#### Retrieve all users with their name, email, and where they live

```graphql
query {
  Users {
    name,
	email,
	lives
  }
}
```

<Details><Summary><strong>See more API operations</strong></Summary>

#### Create a new User

```graphql
mutation {
	createOneUser( data: {
    	name: "Jane",
		email: "Jane@none.com",
		lives: "Alabama"
	}) {
		name,
		email,
		lives
	}
}
```

#### Update a User

```graphql
mutation {
  updateOneUser(
	data:{
		name: "Updated User", 
		lives: "Alaska"
	}, where:{
		id:" __USER_ID__ "
	}) {
		name,
		email,
		lives
  }
}
```

#### Delete a specific user by id

```graphql
mutation {
  deleteOneUser(where: {
    id: " __USER_ID__ "
  }) {
    id,
    name
  }
}
```

> **Note**: You need to replace the `__USER_ID__` placeholder with an actual `id` from a `User` item. You can find one e.g. using the `Users` query.

#### Retrieve a single user by its id

```graphql
query {
  User(id: " __USER_ID__ ") {
    id,
	name,
	email,
	lives
  }
}
```

> **Note**: You need to replace the `__USER_ID__` placeholder with an actual `id` from a `User` item. You can find one e.g. using the `Users` query.

</Details>