#!/bin/bash
npm ci && \
  (cd frontend && npm ci) && \
  (cd backend && npm ci)

(cd frontend && \
  npm run build && \
  docker build -t lulli-frontend)

(cd backend && \
  docker build -t lulli-backend)
