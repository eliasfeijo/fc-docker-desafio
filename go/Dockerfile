FROM golang:1.19-alpine as build

WORKDIR /app

COPY ./main.go .

RUN go build -o main main.go

FROM scratch

COPY --from=build /app/main /

CMD ["/main"]