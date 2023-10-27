# PopStock

A virtual stock market of songs based on the Spotify API's popularity scores. / Does not use real currency. / Made as part of my training at Adidas

## Usage

TBA

## Folders

```
src
|common
||components: the 'design' library of minimal and heavily reused components (such as a basic button)
||hooks
||selectors
||types: Types and their mappers. The goal is to keep the response types and the types used by the domain together
||utils
|components
||blocks: Larger components that make up the page. (ideally only core and App.tsx can depend on these)
||partials: Components that blocks depend on
|core
||actions
||clients
||providers
||store: redux store and it's reducers
```
