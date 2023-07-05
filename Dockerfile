FROM mcr.microsoft.com/playwright:v1.35.0-jammy

RUN mkdir /tests
COPY . /tests
WORKDIR /tests

RUN npm install
RUN npm install -D @playwright/test