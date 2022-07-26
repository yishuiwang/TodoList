package main

import (
	"go.mod/routers"
)

func main() {
	// 注册路由
	r := routers.SetupRouter()
	r.Run(":9090")
}
