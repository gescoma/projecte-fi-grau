# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.245.0/containers/alpine/.devcontainer/base.Dockerfile

# [Choice] Alpine version: 3.16, 3.15, 3.14, 3.13
ARG VARIANT="3.17"
FROM mcr.microsoft.com/devcontainers/base:0-alpine-${VARIANT}

# ** [Optional] Uncomment this section to install additional packages. **
RUN apk update \
  && apk add --no-cache nodejs npm \
  && apk add --update py3-pip \
  && pip3 install --upgrade pip 

COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt
