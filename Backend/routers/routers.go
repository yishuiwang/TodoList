package routers

import (
	"github.com/gin-gonic/gin"
	"go.mod/controller"
	"go.mod/middleware"
	"net/http"
)

func SetupRouter() *gin.Engine {
	http.Handle("/static/", http.FileServer(http.Dir("static/")))
	r := gin.Default()
	r.Use(middleware.Cors())
	// v1
	v1Group := r.Group("v1")
	{
		v1Group.POST("/todo", controller.AddTodoList)
		v1Group.GET("/todo", controller.FindTodoList)
		v1Group.PUT("/todo", controller.UpdateATodo)
		v1Group.DELETE("/todo/:id", controller.DeleteATodo)
	}
	return r
}
