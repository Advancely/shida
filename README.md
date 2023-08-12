<p align="center">
  <img src="/client/common/images/logo.jpg" />
</p>

## 介绍

《视搭》是一个视频可视化搭建项目。您可以通过简单的拖拽方式快速生产一个短视频，使用方式就像易企秀或百度 H5 等 h5 搭建工具一样的简单。目前行业内罕有关于视频可视化搭建的开源项目，《视搭》是一个相对比较完整的开源项目，仅抛砖引玉希望您喜欢。

《视搭》的后端视频合成部分是基于`FFCreator`[https://github.com/tnfe/FFCreator](https://github.com/tnfe/FFCreator)这个库开发的，FFCreator 是一个基于 node.js 的轻量、灵活的短视频加工库。您只需要添加几张图片或视频片段再加一段背景音乐，就可以快速生成一个很酷的视频短片。

<p align="center">
 <img width="650px" src="https://tnfe.github.io/FFCreator/_media/logo/logo.png" />
</p>

《视搭》前端部分 fork 自[quark-h5](https://github.com/huangwei9527/quark-h5)项目开发，本项目未做太多扩展。quark-h5 是一个很棒的 h5 搭建开源工具，架构合理、代码比较清晰易读，感谢作者。

**项目预览：**

<p align="center">
  <img src="/assets/demo.gif" />
</p>

![](https://user-gold-cdn.xitu.io/2019/11/10/16e55daeaa08bd25?w=1733&h=816&f=gif&s=4898484)

## 工程目录

```javascript
|-- client					--------前端项目界面代码
    |--common					--------前端界面对应静态资源
    |--components				--------组件
    |--config					--------配置文件
    |--eventBus					--------eventBus
    |--filter					--------过滤器
    |--mixins					--------混入
    |--pages					--------页面
    |--router					--------路由配置
    |--store					--------vuex状态管理
    |--service					--------axios封装
    |--App.vue					--------App
    |--main.js					--------入口文件
    |--permission.js			        --------权限控制
|-- server					--------服务器端项目代码
    |--confog					--------配置文件
    |--controller				--------数据库链接相关
    |--extend					--------框架扩展
    |--model					-------Schema和Model
    |--middleware				--------中间件
    |--core				        --------Koa MVC实现自动加载核心文件
    |--views					--------ejs页面模板
    |--public					--------静态资源
    |--router.js				--------路由
    |--app.js					--------服务端入口
|-- common					--------前后端公用代码模块（如加解密）
|-- engine-template			        --------页面模板引擎，使用webpack打包成js提供页面引用
|-- config.json				        --------配置文件
```

### 编辑器整体设计

- 一个组件选择区，提供使用者选择需要的组件
- 一个编辑预览画板，提供使用者拖拽排序页面预览的功能
- 一个组件属性编辑，提供给使用者编辑组件内部 props、公共样式和动画的功能
- 用户在左侧组件区域选择组件添加到页面上，编辑区域通过动态组件特性渲染出每个元素组件。

### 视频合成核心

- 基于`FFCreator`[https://github.com/tnfe/FFCreator](https://github.com/tnfe/FFCreator)，只需要很少的依赖和较低的机器配置就可以快速开始工作

## 开发调试

### 启动 mongodb

- 安装 mongodb：[https://zhuanlan.zhihu.com/p/394960855](https://zhuanlan.zhihu.com/p/394960855)
- 配置 mongodb：配置文件在`/server/config/index.js`
- 启动 mongodb：[https://www.cnblogs.com/zhm1985/p/13111448.html](https://www.cnblogs.com/zhm1985/p/13111448.html)

### 安装依赖

```
npm i
```

- 在依赖安装过程中会去根据用户当前环境 自动拉取 `FFmpeg` 的相关二进制包，具体各个系统的相关二进制包可见[node-ffmpeg-installer二进制包详解](https://github.com/kribblo/node-ffmpeg-installer#the-binaries)

### 启动前端并开启 watch 模式

此模式下会开启热更新

```
npm run watch-publish
```

### 启动服务端

```
npm run dev-server
```

##### 启动完访问http://localhost:4000 就可以看到工程页面了

### 先注册用户, 然后登陆体验操作

<p align="center">
  <img src="/assets/login.jpg" />
</p>

## 发布部署

### 启动 mongodb

- 安装 mongodb：[https://zhuanlan.zhihu.com/p/394960855](https://zhuanlan.zhihu.com/p/394960855)
- 配置 mongodb：配置文件在`/server/config/index.css`
- 启动 mongodb：[https://www.cnblogs.com/zhm1985/p/13111448.html](https://www.cnblogs.com/zhm1985/p/13111448.html)

### 需要全局安装 pm2

```
npm install pm2 -g
```

### 启动命令

```
npm run publish && npm run start
```

### License

Apache License 2.0

```javascript
  db.createUser({user:"jw", pwd:"123", roles:[{role:"root", db:"admin"}]});
  //开启安全
  security:
    authorization: enabled
  //登录
  db.auth('jw', '123');
  //进入数据库
  use blog
  db.createUser({user:"blog", pwd:"123", roles:[{role:"dbOwner", db:"blog"}]});
  //退出
  quit();
```

```javascript
  const mongoose = rquire("mongoose");
  mongoose.connect("mongodb://blog:123@localhost:27017/blog", function(err){
    if(err){
      return console.log("数据库连接失败！");
    }
  });

  //可以来继续操作数据库了（稍后我们要查询我希望我存放的数据，是整洁的）schema骨架定义一种存储的方式
  const  UserSchema = mongoose.Schema({
    time:{
      type:Date,
      default: new Date
    },
    username:{
      type:String,
      lowercase:true,
      required:true
    },
    password:{
      type:String,
      required:true,
    },
    gender:{
      type:Number,
      enum:[0,1],
      default:0
    },
    hobby:{
      type:Array,
      default:[]
    }
  },{

    timestamps:{
      createAt:'created',
      updatedAt:'updated'
    }
  });
  (async ()=>{
    let user = await User.create({username:'zf', password:'123', age: 12});
  })();
  //批量新增
  (async ()=>{
    let arr = [];
    for(let i = 20: i<30,i++){
      arr.push({
        username:'zf',
        password:'123',
        age:i
      });
    }
    let user = await User.create(arr); //调用一次插入
  })();
  //删除
  (async () => {
    let user = await User.deleteOne({username:"zf"});
  })();
  //查询
  (async ()=> {
    let user = await User.findById({_id:''})
  })();
  //修改
  (async ()=> {
    //$set $push $pop $inc
    let user = await User.updateOne({_id:""}, {$set:{ hobby:"abc"}});
    mongoose.disconnect();
  })();

   //查询
  (async ()=> {
    // let user = await User.find({age:{$gt:3, $lt:7}})
    let user = await User.find({$or:[{age:18}, {age: 20}]})
  })();

    //分页查询
  (async ()=> {
    const currentPage = 3;
    const limit = 3;
    let user = await User.find({}).limit(limit).skip((currentPage - 1)*limit).sort({age:-1});
    mongoose.disconnect();
  })();

```
```javascript
  const Articles = mongogse.schema({
    title:String,
    content:String,
    user_id: mongoose.SchemaTypes.ObjectId,
    // user_id: {ref:'User', type: mongoose.SchemaTypes.ObjectId},
    price:Number,
  },{
      timestamps:{
        createAt:'created',
        updateAt:'updated'
      }
  });
  module.exports = mongoose.model('Article', Articles, 'article');
```

```javascript
  (async ()=>{
    //创建关联
  let user = await User.create({username:'jw', password:'jw', gender:1});
  let article = await Article.create({
    title:'',
    content:'',
    user_id: user.id
  });
  //根据文章id查找用户
  let article = Article.findById();
  //关联查询
  // let article = Article.findById('',{title:1}).populate('user_id',{hobby:0, gender:0});
  User.findOne({
    _id:article.user_id
  });
  //这个是原生的mongoose的方法
  let articles = await Article.aggregate([//pipeline管道一个个来过滤
    {
      $project:{
          createdAt:0,
          updatedAt:0
      }
    },
    {
      $lookup:{
          from:'user',
          localField:'user_id',
          foreignField:'_id',
          as:'user'
      }
    },
    {
      $match:{
        _id:mongoose.Types.ObjectId("")
      }
    }
  ])

  //这个是原生的mongoose的方法
  let users = await User.aggregate([//pipeline管道一个个来过滤
    {
      $project:{
          createdAt:0,
          updatedAt:0
      }
    },
    {
      $lookup:{
          from:'user',
          localField:'user_id',
          foreignField:'_id',
          as:'user'
      }
    },
    {
      $group:{//查出来的结果叫name
        _id:'$username',
        age:{
          $avg:'$age'
        }
    },
    }
    {
      $match:{
        _id:mongoose.Types.ObjectId("")
      }
    }
  ])
  })();
```