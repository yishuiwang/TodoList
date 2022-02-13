package routers

import (
	"github.com/gin-gonic/gin"
	"go.mod/controller"
	"net/http"
)

func SetupRouter() *gin.Engine{
	/*
		 url     --> controller  --> logic   -->    model
		请求来了  -->  控制器      --> 业务逻辑  --> 模型层的增删改查
	*/
	http.Handle("/static/",http.FileServer(http.Dir("static/")))
	r := gin.Default()
	// v1
	v1Group := r.Group("v1")
	{
		v1Group.POST("/todo", controller.AddTodoList)
		v1Group.GET("/todo", controller.FindTodoList)
		v1Group.PUT("/todo/:id", controller.UpdateATodo)
		v1Group.DELETE("/todo/:id", controller.DeleteATodo)
	}
	return r
}