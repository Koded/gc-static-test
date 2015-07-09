# cx Static Site

## Building the Site

- Get content from GatherContent:

  Create a `keys.json` file:

  ```
  {
    "gathercontent": {
      "apiKey": "<YOUR KEY>"
    }
  }
  ```

  or set key as environment variable:

  ```
  $ GATHERCONTENT_API=<YOUR KEY> grunt gathercontent

  ```


- Get the content

  ```
  $ grunt gathercontent
  ```

- Build the site:

  ```
  $ grunt assemble
  ```


## Deployment

- Deploy master:

  ```
  $ grunt deploy
  ```

- Deploy branch:

  ```
  $ grunt deploy --branch=process.env.CIRCLE_BRANCH
  ```