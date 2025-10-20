// @ts-check
import {
    defineConfig
} from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind()],
    i18n: {
        defaultLocale: 'zh',
        locales: ['zh', 'en'],
        routing: {
            prefixDefaultLocale: false
        }
    },
    // 性能优化配置
    build: {
        // 内联小于 4KB 的样式表
        inlineStylesheets: 'auto',
        // 资源压缩
        assets: '_astro'
    },
    // 图片优化
    image: {
        // 支持的图片格式
        formats: ['avif', 'webp', 'png', 'jpg'],
        // 图片质量
        quality: 80,
        // 响应式图片尺寸
        widths: [320, 640, 768, 1024, 1280, 1536]
    },
    // Vite 配置用于进一步优化
    vite: {
        build: {
            // 启用 CSS 代码分割
            cssCodeSplit: true,
            // 使用 esbuild 压缩（更快，已内置）
            minify: 'esbuild',
            // Rollup 选项
            rollupOptions: {
                output: {
                    // 手动分块以优化加载
                    manualChunks: (id) => {
                        // 将 node_modules 中的依赖分离
                        if (id.includes('node_modules')) {
                            return 'vendor';
                        }
                    }
                }
            }
        },
        // 优化依赖预构建
        optimizeDeps: {
            include: []
        },
        // esbuild 优化选项
        esbuild: {
            drop: ['console', 'debugger'], // 生产环境移除 console 和 debugger
            legalComments: 'none'
        }
    },
    // 压缩 HTML
    compressHTML: true,
    // 预取策略
    prefetch: {
        prefetchAll: false,
        defaultStrategy: 'hover'
    }
});