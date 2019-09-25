# facade vue 项目模板

## 说明

基于 vue + typescript 一个快速开发模板，使用nswag自动生成webapi

## 使用

不能使用 dotnet 命令，需要安装 dotnet core sdk
https://dotnet.microsoft.com/download

1. 安装 facade 命令工具，`dotnet tool install --global Facade.ToolCLI`
2. 使用命令构建项目 `facade init facade-vue -t vue`

### 组件

默认采用 element-ui 组件

### 主题

可以在`./assets/element-variables.scss`中修改主题样式

### 步骤 
- 安装 `yarn install` 
- 启动 `yarn run serve`
- 编译 `yarn run build`
- 检查 `yarn run lint`
- 生成webapi `yarn run refresh`
