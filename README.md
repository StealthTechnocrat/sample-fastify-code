# Fastify project

**NOTE**: this is just a sample project created using fastify.
The code is in typescript, but not much of typescript features have been used.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/index.ts
```
This project was created using `bun init` in bun v1.1.15. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## What does this code contain:
- A `GET` route: `http://localhost:3000/greetings/hello/:name`
- A `POST` route: `http://localhost:3000/user` that accepts
    - name
    - age
    - email

- The app uses local mangodb installation
- Check file `sample.env` to create `.env` file
- file [index_basic_routes.ts](src/index_basic_routes.ts) can be ignored.