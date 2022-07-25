package main

import (
	"go.mod/dao"
	"go.mod/model"
	"go.mod/routers"
)

func main() {
	// 数据库初始化
	dao.Init()
	// 模型绑定
	dao.DB.AutoMigrate(&model.Todo{})
	// 注册路由
	r := routers.SetupRouter()
	r.Run(":9090")
}
