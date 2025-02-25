# Release Process

## Release Git Flow

### Major/Minor/Patch Release

<div style="text-align: center;">
  <img src="https://github.com/user-attachments/assets/9176fe67-53cc-455f-bbbc-ff62d38936d1">
</div>

- `main` (green) is our primary line. New versions (minor or major) release from here.
- `feature/*` (red) branches handle new features, which get merged back into main.
- `bugfix/*` (blue) branches address specific bugs, then merge back for patch releases.
- `release/v1` (yellow) is a long-term maintenance branch for older major releases, receiving only critical fixes and patches.

Each release commit bumps the version and publishes to npm under a relevant tag (e.g. latest for the current release and latest-v1 for older maintenance versions).
This allows us to maintain multiple active versions in parallel.

### Major/Minor/Patch Release With Stages

<div style="text-align: center;">
  <img src="https://github.com/user-attachments/assets/589dcab6-02cc-43d8-a87b-2969e88a4dee">
</div>

When preparing a new major version (e.g. 2.0.0), we can publish release candidates (2.0.0-rc.x) under a `next` dist-tag for testing, keeping the current release as latest.
Once finalized, the major release (2.0.0) goes to latest, and the process repeats.

### Canary Release

<div style="text-align: center;">
  <img src="https://github.com/user-attachments/assets/384d77f7-0168-471f-952e-e9bcaf428dfa">
</div>

When a feature branch (feature/*) includes significant changes, we can publish a “canary” package version (e.g. 1.2.3-canary-{git-revision}-{commit-date}).
This lets early adopters test the latest feature commits without affecting the stable release.
Once the feature is finalized and merged, a standard “release commit” increments the stable version (e.g. 1.3.0).

## Release Script

Release script supports the following options:

- `--increment` - specifies the version increment type: `major`, `minor`, `patch`, `premajor`, `preminor`, `prepatch`, `prerelease`, `canary`.
- `--preid` - specifies the prerelease identifier.
- `--tag` - specifies the NPM tag for the release.
- `--dry-run` - runs the script without publishing the package.

### Example

```bash
# Version: 1.1.1
> pnpm release --increment patch
# Incremented version: 1.1.2

# Version: 1.1.1
> pnpm release --increment minor
# Incremented version: 1.2.0

# Version: 1.1.1
> pnpm release --increment major
# Incremented version: 2.0.0
```

#### Prerelease

```bash
# Version: 1.1.1
> pnpm release --increment premajor --preid alpha
# Incremented version: 2.0.0-alpha.0

# Version: 2.0.0-alpha.0
> pnpm release --increment prerelease
# Incremented version: 2.0.0-alpha.1

# Version: 2.0.0-alpha.1
> pnpm release --increment prerelease --preid beta
# Incremented version: 2.0.0-beta.0

# Version: 2.0.0-beta.0
> pnpm release --increment release
# Incremented version: 2.0.0
```

#### Canary *(will not be persisted in the package.json)*

```bash
# Version: 1.1.2
> pnpm release --increment canary
# Incremented version: 1.1.2-canary-{git-revision}-{commit-date}
```
