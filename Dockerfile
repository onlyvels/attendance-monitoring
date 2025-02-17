FROM dunglas/frankenphp AS base

RUN apt-get update; \
    apt-get upgrade -yqq; \
    apt-get install -yqq --no-install-recommends --show-progress \
    wget \
    git \
    unzip \
    libpq-dev

RUN docker-php-ext-install pcntl pdo_pgsql

COPY . /app
WORKDIR /app

FROM base AS vendor

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
RUN composer install --no-dev

FROM node:20 AS public

WORKDIR /app

# pnpm env setup
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV SHELL="sh"
ENV ENV="/root/.shrc"

# mostly static dependencies
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -
COPY --from=vendor /app/vendor /app/vendor

# likely to change
COPY package.json /app/package.json
COPY pnpm-lock.yaml /app/pnpm-lock.yaml
COPY tsconfig.json /app/tsconfig.json

RUN pnpm install --frozen-lockfile

# copy src to build
COPY . /app
RUN pnpm run build

# Prod server, copy vendor & public and run octane server
FROM base

LABEL org.opencontainers.image.source="https://github.com/onlyvels/attendance-monitoring"

ENV OCTANE_SERVER=frankenphp

RUN arch="$(uname -m)" \
    && case "$arch" in \
    armhf) _cronic_fname='supercronic-linux-arm' ;; \
    aarch64) _cronic_fname='supercronic-linux-arm64' ;; \
    x86_64) _cronic_fname='supercronic-linux-amd64' ;; \
    x86) _cronic_fname='supercronic-linux-386' ;; \
    *) echo >&2 "error: unsupported architecture: $arch"; exit 1 ;; \
    esac \
    && wget -q "https://github.com/aptible/supercronic/releases/download/v0.2.33/${_cronic_fname}" \
    -O /usr/bin/supercronic \
    && chmod +x /usr/bin/supercronic \
    && mkdir -p /etc/supercronic \
    && echo "*/1 * * * * php /app/artisan schedule:run --no-interaction" > /etc/supercronic/laravel

WORKDIR /app
COPY . /app

COPY --from=vendor /app/vendor /app/vendor
COPY --from=public /app/public /app/public

EXPOSE 8000
ENTRYPOINT [ "./docker-entrypoint.sh" ]
CMD [ "php", "artisan", "octane:start" ]
