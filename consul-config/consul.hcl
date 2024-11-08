datacenter = "dc1"
data_dir = "/consul/data"
client_addr = "0.0.0.0"
retry_join = ["consul-server"]

service {
  name = "auth-service"
  port = 3000
  check {
    http = "http://localhost:3000/auth/check/hello"
    interval = "10s"
  }
}
