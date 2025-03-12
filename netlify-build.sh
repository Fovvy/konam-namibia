#!/bin/bash

# Set environment variables to disable linting and type checking
export NEXT_DISABLE_ESLINT=1
export NEXT_LINT_IGNORE_ERRORS=1 
export NEXT_IGNORE_TYPESCRIPT_ERRORS=1
export DISABLE_ESLINT=true

# Run the build command with the --no-lint flag
npx next build --no-lint

# Exit with the exit code of the next build command
exit $? 