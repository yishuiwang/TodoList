package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"go.mod/dao"
	"go.mod/model"
	"net/http"
)

func AddTodoList(c *gin.Context) {
	// 1.取出数据
	var todo model.Todo
	c.ShouldBind(&todo)
	// 2. 存入数据库
	dao.DB.Create(&todo)
	// 3.返回
	c.JSON(http.StatusOK, todo)

}

func UpdateATodo(c *gin.Context) {
	var todo model.Todo
	c.ShouldBind(&todo)
	fmt.Println(todo)
	dao.DB.Model(&todo).Update("status", todo.Status)
	c.JSON(http.StatusOK, gin.H{"msg": "已更新"})
}

func DeleteATodo(c *gin.Context) {
	// 1.取出数据
	var todo model.Todo
	c.ShouldBind(&todo)
	// 2. 从数据库删除
	dao.DB.Where("id=?", todo.ID).Delete(&model.Todo{})
	// 3.返回
	c.JSON(http.StatusOK, gin.H{"msg": "已删除"})
}

func FindTodoList(c *gin.Context) {
	// 1.取出数据
	var todos []model.Todo
	c.ShouldBind(&todos)
	// 2. 从数据库查找
	dao.DB.Select("*").Find(&todos)
	// 3.返回
	c.JSON(http.StatusOK, todos)

}
