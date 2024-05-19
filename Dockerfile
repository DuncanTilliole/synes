FROM node:22-alpine3.18 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS dev-synes
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
RUN pnpm install
RUN npx prisma migrate dev
RUN pnpm prisma generate
EXPOSE 3000
CMD [ "pnpm", "dev" ]