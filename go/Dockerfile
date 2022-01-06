#BUILDER
FROM golang:1.17-alpine AS builder

WORKDIR /app

COPY src/go.mod .

RUN go mod download

COPY src/*.go ./

RUN GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o /main

# RUNNER
FROM scratch

COPY --from=builder /main /main

ENTRYPOINT ["/main"]