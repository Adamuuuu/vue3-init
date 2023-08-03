# 使用 Node.js 作为基础镜像
FROM node:14.17.3 as build-stage

# 设置工作目录
WORKDIR /app

# 复制 package.json 文件并安装依赖
COPY package*.json ./
RUN npm install

# 复制项目文件并构建
COPY . .
RUN npm run build

# 构建用于生产环境的镜像
FROM nginx:1.21.1-alpine as production-stage

# 拷贝构建结果到 Nginx 配置路径下
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 使用自定义的 Nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露容器的端口（默认为 80）
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
