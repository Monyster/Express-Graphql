# Express-Graphql

## Usage

Install dependencies

```
npm install
```

Run file

```
node server.js
```

Server starts on port 5454.
Change in server.js

```
Line 5. const port = 5454;
```

To check you can enter

```
{
  authors {
    twitterHandle
  }
}
```

```
{
  posts {
    id
    title
    author {
      name
    }
  }
}

```
