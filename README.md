## Web Template with Nextjs + Django

简单的网页项目模版，技术栈为 Nextjs + Django；已包含简单的用户模型和 jAccount 登录流程

### 安装环境

```bash
# 后端
cd backend
pip install -r requirements.txt

# 前端
cd frontend
npm install
```

然后按 `.env.sample` 填写 `.env` 中的待填内容

### 测试运行

```bash
# 后端
cd backend
python manage.py runserver

# 前端
cd frontend
npm run dev
```