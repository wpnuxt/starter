# Custom GraphQL Queries

Place your custom `.gql` or `.graphql` files here to extend or override WPNuxt's queries.

## How it works

1. **Built-in queries** (`Posts`, `Pages`, `Menu`, `GeneralSettings`, …) are shipped by `@wpnuxt/core`.
2. **CPT queries** are auto-generated at build time from your `schema.graphql`. Every type implementing `ContentNode` gets a base fragment plus `Listing` / `ByUri` / `BySlug` queries — no boilerplate required. Generated files land in `app/.queries/` (gitignored).
3. **Your files in `extend/queries/`** are merged last. A same-named file here fully replaces the generated or built-in version.

## Overriding an auto-generated CPT fragment

Say the auto-generated `Event.fragment.gql` only gives you the `ContentNode` basics but your editors use ACF fields. Drop the full replacement here:

```graphql
# extend/queries/fragments/Event.fragment.gql
fragment Event on Event {
  ...ContentNode
  ...NodeWithFeaturedImage
  eventFields {
    startDate
    location
    ticketUrl
  }
}
```

Next build, your version wins and every `useEvents()` / `useEventByUri()` / `useEventBySlug()` call returns those ACF fields.

## Adding a new query

Create `CustomPosts.gql`:

```graphql
query CustomPosts($first: Int = 10) {
  posts(first: $first) {
    nodes {
      id
      title
      date
    }
  }
}
```

This generates `useCustomPosts()` (and the async variant) automatically.

## Disabling CPT auto-gen

Opt out, or narrow the scope, in `nuxt.config.ts`:

```ts
wpNuxt: {
  cpt: {
    enabled: false,          // skip CPT auto-gen entirely
    // or be selective:
    include: ['Event'],      // only these types
    exclude: ['InternalDoc'] // skip these types (built-ins are always excluded)
  }
}
```

## Available fragments

Generated + built-in fragments you can spread from your custom queries:

- `...Post`, `...Page`, `...ContentNode`
- `...NodeWithFeaturedImage`, `...NodeWithExcerpt`, `...NodeWithContentEditor`
- `...{CptName}` — one per Custom Post Type in your schema

## Documentation

See https://wpnuxt.com/guide/custom-queries for more details.
