package controller

import (
	"github.com/gin-gonic/gin"
	"go.mod/dao"
	"go.mod/model"
	"net/http"
)

func IndexHandler(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", nil)
}

func AddTodoList(c *gin.Context) {
	// 1.取出数据
	var todo model.Todo
	c.BindJSON(&todo)
	// 2. 存入数据库
	dao.Db.Create(&todo)
	// 3.返回
	c.JSON(http.StatusOK,todo)

}

func UpdateATodo(c *gin.Context) {
	// 1.取出数据
	var todo model.Todo
	c.BindJSON(&todo)
	// 2. 从数据库查找
	dao.Db.Where("id=?",todo.ID).Find(&model.Todo{})
	// 3.保存数据
	dao.Db.Save(todo)
	// 4.返回
	c.JSON(http.StatusOK, todo)
}

func DeleteATodo(c *gin.Context) {
	// 1.取出数据
	var todo model.Todo
	c.BindJSON(&todo)
	// 2. 从数据库删除
	dao.Db.Where("id=?",todo.ID).Delete(&model.Todo{})
	// 3.返回
	c.JSON(http.StatusOK,nil)
}

func FindTodoList(c *gin.Context) {
	// 1.取出数据
	var todos []model.Todo
	c.BindJSON(&todos)
	// 2. 从数据库查找
	dao.Db.Select("*").Find(&todos)
	// 3.返回
	c.JSON(http.StatusOK,todos)

}
