package dao

import (
	"encoding/json"
	"fmt"
	"go.mod/model"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
	"io/ioutil"
	"time"
)

var DB *gorm.DB

// DBConfig 数据库设置
type DBConfig struct {
	Host     string // 地址
	Port     int    // 端口
	User     string // 用户名
	Password string // 密码
	Name     string // 数据库名
	Type     string // 数据库类型
}

func init() {

	data, err := ioutil.ReadFile("Backend/configs/db.json")
	if err != nil {
		fmt.Println(err)
	}
	var conf DBConfig
	json.Unmarshal(data, &conf)
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8&parseTime=True&loc=Local", conf.User, conf.Password, conf.Host, conf.Port, conf.Name)

	db, err := gorm.Open(mysql.New(mysql.Config{
		DSN:                       dsn,
		DefaultStringSize:         256,
		DisableDatetimePrecision:  true,
		DontSupportRenameIndex:    true,
		DontSupportRenameColumn:   true,
		SkipInitializeWithVersion: false,
	}), &gorm.Config{
		NamingStrategy: schema.NamingStrategy{
			TablePrefix:   "",
			SingularTable: true,
		},
	})

	// 获取通用数据库对象 sql.DB ，然后使用其提供的功能
	sqlDB, _ := db.DB()

	// SetMaxIdleConns 用于设置连接池中空闲连接的最大数量。
	sqlDB.SetMaxIdleConns(10)

	// SetMaxOpenConns 设置打开数据库连接的最大数量。
	sqlDB.SetMaxOpenConns(100)

	// SetConnMaxLifetime 设置了连接可复用的最大时间。
	sqlDB.SetConnMaxLifetime(time.Hour)

	if err != nil {
		panic(err)
	}
	DB = db

	DB.AutoMigrate(&model.Todo{})
}
