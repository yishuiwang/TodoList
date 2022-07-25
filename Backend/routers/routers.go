package routers

import (
	"github.com/gin-gonic/gin"
	"go.mod/controller"
	"go.mod/middleware"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()
	r.Use(middleware.Cors())
	// v1
	v1Group := r.Group("v1")
	{
		v1Group.POST("/add", controller.AddTodoList)
		v1Group.GET("/find", controller.FindTodoList)
		v1Group.POST("/update", controller.UpdateATodo)
		v1Group.POST("/delete", controller.DeleteATodo)
	}
	return r
}
