---
title: "TypeScript 最佳实践"
date: "2024-01-25"
excerpt: "分享 TypeScript 开发中的最佳实践，包括类型定义、接口设计和错误处理等方面的经验。"
tags: ["TypeScript", "JavaScript", "最佳实践", "编程"]
author: "博主"
---

# TypeScript 最佳实践

TypeScript 为 JavaScript 带来了类型安全，让我们的代码更加健壮。本文分享一些 TypeScript 开发中的最佳实践。

## 类型定义

### 1. 使用接口而非类型别名（当适合时）

```typescript
// 推荐：使用接口
interface User {
  id: number;
  name: string;
  email: string;
}

// 而非类型别名
type User = {
  id: number;
  name: string;
  email: string;
}
```

### 2. 善用联合类型

```typescript
type Status = 'loading' | 'success' | 'error';
type Theme = 'light' | 'dark';

interface ApiResponse<T> {
  status: Status;
  data?: T;
  error?: string;
}
```

### 3. 使用泛型提高复用性

```typescript
interface Repository<T> {
  findById(id: string): Promise<T | null>;
  create(entity: Omit<T, 'id'>): Promise<T>;
  update(id: string, updates: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}
```

## 工具类型的使用

### 1. Partial 和 Required

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

// 更新用户时使用 Partial
function updateUser(id: number, updates: Partial<User>) {
  // ...
}

// 确保所有字段都存在
function validateUser(user: Required<User>) {
  // ...
}
```

### 2. Pick 和 Omit

```typescript
// 只选择特定字段
type UserSummary = Pick<User, 'id' | 'name'>;

// 排除特定字段
type CreateUserRequest = Omit<User, 'id'>;
```

### 3. Record 类型

```typescript
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>;

const userRoles: UserRoles = {
  'user1': 'admin',
  'user2': 'user',
  'user3': 'guest'
};
```

## 错误处理

### 1. 使用 Result 类型模式

```typescript
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

async function fetchUser(id: string): Promise<Result<User>> {
  try {
    const user = await userRepository.findById(id);
    if (!user) {
      return { success: false, error: new Error('User not found') };
    }
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}
```

### 2. 自定义错误类型

```typescript
class ValidationError extends Error {
  constructor(
    public field: string,
    public value: unknown,
    message: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

class NotFoundError extends Error {
  constructor(resource: string, id: string) {
    super(`${resource} with id ${id} not found`);
    this.name = 'NotFoundError';
  }
}
```

## 配置优化

### 1. 严格模式配置

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### 2. 路径映射

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/utils/*": ["src/utils/*"]
    }
  }
}
```

## React 中的 TypeScript

### 1. 组件 Props 类型定义

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size = 'medium',
  disabled = false,
  onClick,
  children
}) => {
  // ...
};
```

### 2. 事件处理类型

```typescript
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // ...
};

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue(event.target.value);
};
```

## 总结

TypeScript 的强大之处在于其类型系统，通过合理使用类型定义、工具类型和配置选项，我们可以写出更加安全、可维护的代码。

记住：
- 从严格模式开始
- 善用工具类型
- 定义清晰的接口
- 处理好错误情况
- 保持类型定义的简洁性

这些实践将帮助您更好地利用 TypeScript 的优势！
