# 🔐 GitHub 推送鉴权解决方案

## 问题描述

推送代码到 GitHub 时出现鉴权失败错误。

## 🎯 推荐解决方案：Personal Access Token

### 步骤 1: 创建 Personal Access Token

1. **访问 GitHub Token 页面**: https://github.com/settings/tokens
2. **点击 "Generate new token"** → "Generate new token (classic)"
3. **填写 Token 信息**:
   - **Note**: `wealthease-blog-push`
   - **Expiration**: 选择 "90 days"
   - **Scopes**: 勾选 `repo` (完全控制仓库)
4. **点击 "Generate token"**
5. **立即复制生成的 token**（只显示一次！）

### 步骤 2: 使用 Token 推送

```bash
cd "/Users/lhl/Downloads/web"

# 方法 A: 直接使用 token 推送
git push https://jackbooks:你的token@github.com/jackbooks/wealthease-blog.git main

# 方法 B: 设置远程仓库后推送
git remote set-url origin https://jackbooks:你的token@github.com/jackbooks/wealthease-blog.git
git push -u origin main
```

**注意**: 将 `你的token` 替换为实际的 token 值。

## 🔑 备选方案：SSH 密钥

### 步骤 1: 检查现有 SSH 密钥

```bash
ls -al ~/.ssh
```

如果看到 `id_rsa` 或 `id_ed25519` 文件，说明已有密钥。

### 步骤 2: 生成新的 SSH 密钥

```bash
# 生成新的 SSH 密钥
ssh-keygen -t ed25519 -C "san97946@qq.com"

# 按 Enter 接受默认位置
# 设置密码（可选）
```

### 步骤 3: 添加 SSH 公钥到 GitHub

```bash
# 复制公钥内容
cat ~/.ssh/id_ed25519.pub

# 或者使用 pbcopy (macOS)
pbcopy < ~/.ssh/id_ed25519.pub
```

1. 访问: https://github.com/settings/keys
2. 点击 "New SSH key"
3. 粘贴公钥内容
4. 点击 "Add SSH key"

### 步骤 4: 使用 SSH 推送

```bash
cd "/Users/lhl/Downloads/web"

# 设置 SSH 远程仓库
git remote set-url origin git@github.com:jackbooks/wealthease-blog.git

# 测试 SSH 连接
ssh -T git@github.com

# 推送代码
git push -u origin main
```

## 🛠️ 其他解决方案

### 方案 3: 使用 GitHub Desktop

1. 下载并安装 GitHub Desktop
2. 使用 GitHub Desktop 添加仓库
3. 通过 GUI 界面推送代码

### 方案 4: 使用 GitHub CLI

```bash
# 安装 GitHub CLI (如果未安装)
brew install gh

# 登录
git auth login

# 推送
git push -u origin main
```

## 🔍 故障排除

### 常见错误及解决方案

**错误 1: "remote: Permission to user/repo denied"**
- 原因: 没有仓库的写入权限
- 解决: 确保使用正确的 token 或 SSH 密钥

**错误 2: "fatal: Authentication failed"**
- 原因: 凭据无效或过期
- 解决: 重新生成 token 或检查 SSH 密钥

**错误 3: "Repository not found"**
- 原因: 仓库不存在或 URL 错误
- 解决: 确认仓库名称和 URL

### 验证步骤

1. **检查仓库是否存在**: 访问 https://github.com/jackbooks/wealthease-blog
2. **检查远程 URL**: `git remote -v`
3. **测试连接**: `git ls-remote origin`

## 📋 快速命令参考

```bash
# 检查当前配置
git remote -v

# 使用 Personal Access Token
git push https://jackbooks:TOKEN@github.com/jackbooks/wealthease-blog.git main

# 使用 SSH
git remote set-url origin git@github.com:jackbooks/wealthease-blog.git
git push -u origin main

# 重置远程仓库（如果需要）
git remote remove origin
git remote add origin https://github.com/jackbooks/wealthease-blog.git
```

## 🎉 成功标志

推送成功后，你应该看到类似这样的输出：
```
Enumerating objects: 23, done.
Counting objects: 100% (23/23), done.
Delta compression using up to 8 threads
Compressing objects: 100% (20/20), done.
Writing objects: 100% (23/23), 15.45 KiB | 3.09 MiB/s, done.
Total 23 (delta 2), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (2/2), done.
To https://github.com/jackbooks/wealthease-blog.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

## 📞 技术支持

如果仍然遇到问题：

1. 检查 GitHub 仓库是否已创建
2. 确认你有仓库的写入权限
3. 尝试重新生成 token
4. 检查网络连接

**推荐优先使用 Personal Access Token 方案，这是最直接有效的方法！**