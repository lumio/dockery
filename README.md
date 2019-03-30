dockery
===

[![CircleCI](https://img.shields.io/circleci/project/github/lumio/dockery/master.svg)](https://circleci.com/gh/lumio/dockery/tree/master) [![codecov](https://img.shields.io/codecov/c/github/lumio/dockery/master.svg)](https://codecov.io/gh/lumio/dockery) ![Dependencies](https://img.shields.io/david/lumio/dockery.svg) ![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/lumio/dockery.svg)

A simple script that builds your package and creates a docker image in one
sitting, preparing it for docker hub.

You can decide how to tag your image:

- The **default** uses the version number of package.json.
- **`--hash`** uses the hash of the latest git commit.
- **`--tag`** sets the tag name manually (in combination with the given repo and package name)

To push a built docker image to docker hub, you need to be logged in
with `docker login`.

Install
---

```bash
npm install -g dockery
# or
yarn global add dockery
```

Usage
---

```bash
dockery
```

Combines the package.json's `name` and `version` number as a tag name, builds the
package by running `npm run build` (or `yarn run build`) and then builds the
docker image, using a `Dockerfile`.

Note that in order to generate a valid image tag name the `name` needs to be
scoped, e.g. begins with `@dockery/`.
This is used as the docker hub repository.
You could also set the repository name by passing the `--repo` argument.

### Hashed image version

```bash
dockery --hash
```

This will read the hash of the last git commit and use it as the tag name.

### Manual tagged image

```bash
dockery --repo=test --package=test-pkg --tag=v1.0.0-alpha1 --push
```

This will create a docker image with the tag name `test/test-pkg:v1.0.0-alpha1`
and pushes it to the docker hub on a successful build.

Arguments
---

You can print all available arguments with `dockery --help`.

```
dockery [options]

 -d --directory=STRING
    Sets the work directory
 --hash
    Use latest commit hash as tag name
 -h --help
    Show this help text
 --package=ALPHANUMERIC
    Set the package name.
    Default is read from the name field in
    your package.json
 --push
    Push docker image to registry
 -q --quiet
    Disable most of the log outputs
 --repo=ALPHANUMERIC
    Set the docker repo.
    Default is read from the docker-repository field in
    your package.json
 --tag=ALPHANUMERIC
    Set manual tag name. Default is the package version number.
 -e --tag-prefix=STRING
    Prefix of the generated tag. E.g. "build-". Default is none
```

Support
---

If you have any questions, do not hesitate and raise an issue on [github.com/lumio/dockery](https://github.com/lumio/dockery/issues/new/choose).

Tests & Development
---

This project uses `yarn` to resolve its dependencies and `jest` for unit tests.

```bash
yarn
yarn test
```

We are grateful for any help. Feel free to fork this project and adapt it.
