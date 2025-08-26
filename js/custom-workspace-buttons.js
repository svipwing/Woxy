/**
 * 自定义Blockly工作区按钮交互逻辑
 * 为现有的HTML按钮添加完整的交互功能
 * 
 * 功能特性：
 * - 点击事件处理和状态切换
 * - 用户反馈（视觉反馈、触觉反馈）
 * - 可访问性支持（键盘导航、屏幕阅读器支持）
 * - 响应式设计适配
 * - 错误处理和容错机制
 */

class CustomWorkspaceButtons {
    constructor() {
        this.workspace = null;
        this.buttons = {};
        this.isInitialized = false;
        
        // 配置选项
        this.config = {
            // 缩放步长
            zoomStep: 0.2,
            // 最大/最小缩放级别
            maxZoom: 3,
            minZoom: 0.3,
            // 动画持续时间
            animationDuration: 200,
            // 是否启用触觉反馈（移动设备）
            enableHapticFeedback: true,
            // 防抖延迟（毫秒）
            debounceDelay: 100
        };

        // 状态管理
        this.state = {
            currentZoom: 1,
            isProcessing: false,
            lastActionTime: 0
        };

        // 绑定方法上下文
        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleResize = this.handleResize.bind(this);
        
        // 初始化
        this.init();
    }

    /**
     * 初始化组件
     */
    init() {
        // 等待DOM和Blockly加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeWhenReady());
        } else {
            this.initializeWhenReady();
        }
    }

    /**
     * 当DOM和Blockly准备就绪时初始化
     */
    initializeWhenReady() {
        // 检查Blockly是否可用
        if (typeof Blockly === 'undefined') {
            console.warn('Blockly未加载，延迟初始化自定义按钮');
            setTimeout(() => this.initializeWhenReady(), 100);
            return;
        }

        // 等待workspace初始化
        this.waitForWorkspace();
    }

    /**
     * 等待Blockly工作区初始化
     */
    waitForWorkspace() {
        if (Blockly.mainWorkspace || window.workspace) {
            this.workspace = Blockly.mainWorkspace || window.workspace;
            this.setupButtons();
        } else {
            // 如果workspace还未初始化，继续等待
            setTimeout(() => this.waitForWorkspace(), 100);
        }
    }

    /**
     * 设置按钮交互逻辑
     */
    setupButtons() {
        try {
            // 隐藏原生Blockly缩放控件
            this.hideNativeControls();
            
            // 获取现有按钮并添加交互逻辑
            this.enhanceExistingButtons();
            
            // 设置全局事件监听器
            this.setupGlobalEventListeners();
            
            // 设置可访问性属性
            this.setupAccessibility();
            
            // 初始化状态
            this.updateZoomState();
            
            // 标记为已初始化
            this.isInitialized = true;
            
            console.log('自定义工作区按钮交互逻辑初始化完成');
        } catch (error) {
            console.error('初始化自定义工作区按钮时出错:', error);
        }
    }

    /**
     * 隐藏原生Blockly控件
     */
    hideNativeControls() {
        const zoomControls = document.querySelector('.blocklyZoom');
        if (zoomControls) {
            zoomControls.style.display = 'none';
            zoomControls.setAttribute('aria-hidden', 'true');
        }
    }

    /**
     * 增强现有按钮功能
     */
    enhanceExistingButtons() {
        const buttonItems = document.querySelectorAll('.blcokly-action-buttons-item');
        
        buttonItems.forEach((button, index) => {
            // 根据按钮位置确定功能
            let buttonType, handler, ariaLabel, shortcut;
            
            switch (index) {
                case 0: // 回中按钮
                    buttonType = 'center';
                    handler = () => this.handleCenterClick();
                    ariaLabel = '将工作区视图回到中心位置';
                    shortcut = 'Ctrl+Shift+C';
                    break;
                case 1: // 放大按钮
                    buttonType = 'zoomIn';
                    handler = () => this.handleZoomInClick();
                    ariaLabel = '放大工作区视图';
                    shortcut = 'Ctrl+=';
                    break;
                case 2: // 缩小按钮
                    buttonType = 'zoomOut';
                    handler = () => this.handleZoomOutClick();
                    ariaLabel = '缩小工作区视图';
                    shortcut = 'Ctrl+-';
                    break;
                default:
                    return;
            }

            // 转换为button元素以支持更好的可访问性
            this.convertToButton(button, buttonType, handler, ariaLabel, shortcut);
            
            // 存储按钮引用
            this.buttons[buttonType] = button;
        });
    }

    /**
     * 将div转换为button元素并添加交互逻辑
     */
    convertToButton(element, buttonType, handler, ariaLabel, shortcut) {
        // 设置按钮属性
        element.setAttribute('role', 'button');
        element.setAttribute('tabindex', '0');
        element.setAttribute('aria-label', ariaLabel);
        element.setAttribute('title', `${ariaLabel} (${shortcut})`);
        element.setAttribute('data-action', buttonType);
        
        // 添加点击事件
        element.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleButtonClick(buttonType, handler);
        });
        
        // 添加键盘支持
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.handleButtonClick(buttonType, handler);
            }
        });

        // 添加鼠标事件以提供更好的用户反馈
        element.addEventListener('mousedown', () => {
            this.setButtonState(buttonType, 'pressed');
        });

        element.addEventListener('mouseup', () => {
            this.setButtonState(buttonType, 'normal');
        });

        element.addEventListener('mouseleave', () => {
            this.setButtonState(buttonType, 'normal');
        });

        // 添加焦点事件
        element.addEventListener('focus', () => {
            this.setButtonState(buttonType, 'focused');
        });

        element.addEventListener('blur', () => {
            this.setButtonState(buttonType, 'normal');
        });
    }

    /**
     * 处理按钮点击
     */
    handleButtonClick(buttonType, handler) {
        // 防抖处理
        const now = Date.now();
        if (now - this.state.lastActionTime < this.config.debounceDelay) {
            return;
        }
        this.state.lastActionTime = now;

        // 检查是否正在处理中
        if (this.state.isProcessing) {
            return;
        }

        try {
            this.state.isProcessing = true;
            
            // 添加点击状态
            this.setButtonState(buttonType, 'active');
            
            // 提供触觉反馈
            this.provideFeedback(buttonType);
            
            // 执行处理函数
            handler();
            
            // 操作反馈已移除
            
        } catch (error) {
            console.error(`执行${buttonType}操作时出错:`, error);
        } finally {
            // 重置状态
            setTimeout(() => {
                this.setButtonState(buttonType, 'normal');
                this.state.isProcessing = false;
            }, this.config.animationDuration);
        }
    }

    /**
     * 设置按钮状态
     */
    setButtonState(buttonType, state) {
        const button = this.buttons[buttonType];
        if (!button) return;

        // 移除所有状态类
        button.classList.remove('btn-normal', 'btn-focused', 'btn-pressed', 'btn-active', 'btn-disabled');
        
        // 添加当前状态类
        button.classList.add(`btn-${state}`);
        
        // 设置ARIA状态
        if (state === 'active') {
            button.setAttribute('aria-pressed', 'true');
        } else {
            button.setAttribute('aria-pressed', 'false');
        }
    }

    /**
     * 提供用户反馈
     */
    provideFeedback(buttonType) {
        // 触觉反馈（移动设备）
        if (this.config.enableHapticFeedback && navigator.vibrate) {
            navigator.vibrate(50);
        }

        // 视觉反馈动画
        const button = this.buttons[buttonType];
        if (button) {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 100);
        }
    }


    /**
     * 处理回中按钮点击
     */
    handleCenterClick() {
        if (!this.workspace) {
            throw new Error('工作区未初始化');
        }

        try {
            // 获取工作区中所有积木的边界
            const blocks = this.workspace.getAllBlocks(false);
            if (blocks.length === 0) {
                // 如果没有积木，平滑回到原点
                this.animateToCenter(0, 0);
                return;
            }

            // 计算所有积木的边界框
            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
            
            blocks.forEach(block => {
                const bounds = block.getBoundingRectangle();
                if (bounds) {
                    minX = Math.min(minX, bounds.left);
                    minY = Math.min(minY, bounds.top);
                    maxX = Math.max(maxX, bounds.right);
                    maxY = Math.max(maxY, bounds.bottom);
                }
            });

            // 计算中心点
            const centerX = (minX + maxX) / 2;
            const centerY = (minY + maxY) / 2;

            // 平滑移动到积木中心
            this.animateToCenter(centerX, centerY);
            
        } catch (error) {
            // 如果获取边界失败，使用备用方案
            console.warn('无法计算积木边界，使用备用回中方案:', error);
            this.animateToCenter(0, 0);
        }
    }

    /**
     * 平滑动画移动到指定中心点
     */
    animateToCenter(targetX, targetY) {
        const workspace = this.workspace;
        const metrics = workspace.getMetrics();
        
        // 获取当前视图中心
        const currentX = metrics.viewLeft + metrics.viewWidth / 2;
        const currentY = metrics.viewTop + metrics.viewHeight / 2;
        
        // 计算目标位置（考虑缩放）
        const scale = workspace.scale;
        const finalTargetX = targetX * scale;
        const finalTargetY = targetY * scale;
        
        // 计算需要移动的距离
        const deltaX = finalTargetX - currentX;
        const deltaY = finalTargetY - currentY;
        
        // 动画参数
        const duration = 500; // 动画持续时间（毫秒）
        const startTime = Date.now();
        
        // 缓动函数（easeOutCubic）
        const easeOutCubic = (t) => {
            return 1 - Math.pow(1 - t, 3);
        };
        
        // 动画循环
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);
            
            // 计算当前位置
            const currentOffsetX = deltaX * easedProgress;
            const currentOffsetY = deltaY * easedProgress;
            
            // 应用滚动
            const newX = currentX + currentOffsetX;
            const newY = currentY + currentOffsetY;
            
            // 转换为工作区坐标并滚动
            workspace.scroll(newX / scale, newY / scale);
            
            // 继续动画或结束
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        // 开始动画
        requestAnimationFrame(animate);
    }

    /**
     * 处理放大按钮点击
     */
    handleZoomInClick() {
        if (!this.workspace) {
            throw new Error('工作区未初始化');
        }

        const currentZoom = this.workspace.scale;
        const newZoom = Math.min(currentZoom + this.config.zoomStep, this.config.maxZoom);
        
        if (newZoom <= currentZoom) {
            throw new Error('已达到最大缩放级别');
        }

        // 使用自定义缩放方法，只影响工作区
        this.setWorkspaceZoom(newZoom);
        this.updateZoomState();
    }

    /**
     * 处理缩小按钮点击
     */
    handleZoomOutClick() {
        if (!this.workspace) {
            throw new Error('工作区未初始化');
        }

        const currentZoom = this.workspace.scale;
        const newZoom = Math.max(currentZoom - this.config.zoomStep, this.config.minZoom);
        
        if (newZoom >= currentZoom) {
            throw new Error('已达到最小缩放级别');
        }

        // 使用自定义缩放方法，只影响工作区
        this.setWorkspaceZoom(newZoom);
        this.updateZoomState();
    }

    /**
     * 设置工作区缩放，不影响工具箱
     */
    setWorkspaceZoom(newScale) {
        const workspace = this.workspace;
        
        // 获取当前视图中心点
        const metrics = workspace.getMetrics();
        const centerX = metrics.viewLeft + metrics.viewWidth / 2;
        const centerY = metrics.viewTop + metrics.viewHeight / 2;
        
        // 计算缩放中心点（工作区坐标）
        const scaleCenterX = centerX / workspace.scale;
        const scaleCenterY = centerY / workspace.scale;
        
        // 设置新的缩放级别
        workspace.setScale(newScale);
        
        // 调整视图位置以保持中心点不变
        const newCenterX = scaleCenterX * newScale;
        const newCenterY = scaleCenterY * newScale;
        
        const newViewLeft = newCenterX - metrics.viewWidth / 2;
        const newViewTop = newCenterY - metrics.viewHeight / 2;
        
        // 应用新的视图位置
        workspace.scroll(newViewLeft / newScale, newViewTop / newScale);
        
        // 确保工具箱不受影响
        this.fixToolboxZoom();
    }

    /**
     * 修复工具箱缩放问题
     */
    fixToolboxZoom() {
        // 只修复工具箱相关元素，不影响工作区
        const toolbox = document.querySelector('.blocklyToolboxDiv');
        const flyout = document.querySelector('.blocklyFlyout');
        const flyoutBackground = document.querySelector('.blocklyFlyoutBackground');
        
        // 重置工具箱容器的transform
        if (toolbox) {
            toolbox.style.setProperty('transform', 'none', 'important');
            toolbox.style.setProperty('transform-origin', 'initial', 'important');
        }
        
        // 重置飞出面板的transform
        if (flyout) {
            flyout.style.setProperty('transform', 'none', 'important');
            flyout.style.setProperty('transform-origin', 'initial', 'important');
            
            // 只修复flyout中的积木，不影响工作区积木
            const flyoutBlocks = flyout.querySelectorAll('.blocklyDraggable');
            flyoutBlocks.forEach(block => {
                block.style.setProperty('transform', 'none', 'important');
                block.style.setProperty('transform-origin', 'initial', 'important');
            });
            
            const flyoutCanvas = flyout.querySelectorAll('.blocklyBlockCanvas');
            flyoutCanvas.forEach(canvas => {
                canvas.style.setProperty('transform', 'none', 'important');
                canvas.style.setProperty('transform-origin', 'initial', 'important');
            });
        }
        
        if (flyoutBackground) {
            flyoutBackground.style.setProperty('transform', 'none', 'important');
            flyoutBackground.style.setProperty('transform-origin', 'initial', 'important');
        }
        
        // 确保工作区积木可以正常布局
        const workspaceBlocks = document.querySelectorAll('.blocklyWorkspace .blocklyDraggable');
        workspaceBlocks.forEach(block => {
            // 移除可能的transform限制，让工作区积木正常布局
            if (block.style.transform === 'none') {
                block.style.removeProperty('transform');
            }
            if (block.style.transformOrigin === 'initial') {
                block.style.removeProperty('transform-origin');
            }
        });
    }

    /**
     * 更新缩放状态
     */
    updateZoomState() {
        if (!this.workspace) return;

        this.state.currentZoom = this.workspace.scale;
        
        // 更新按钮可用状态
        const centerButton = this.buttons.center;
        const zoomInButton = this.buttons.zoomIn;
        const zoomOutButton = this.buttons.zoomOut;
        
        // 回中按钮始终可用
        if (centerButton) {
            centerButton.setAttribute('aria-disabled', 'false');
            centerButton.classList.remove('btn-disabled');
        }
        
        if (zoomInButton) {
            const canZoomIn = this.state.currentZoom < this.config.maxZoom;
            zoomInButton.setAttribute('aria-disabled', !canZoomIn);
            if (!canZoomIn) {
                zoomInButton.classList.add('btn-disabled');
            } else {
                zoomInButton.classList.remove('btn-disabled');
            }
        }
        
        if (zoomOutButton) {
            const canZoomOut = this.state.currentZoom > this.config.minZoom;
            zoomOutButton.setAttribute('aria-disabled', !canZoomOut);
            if (!canZoomOut) {
                zoomOutButton.classList.add('btn-disabled');
            } else {
                zoomOutButton.classList.remove('btn-disabled');
            }
        }
    }

    /**
     * 设置全局事件监听器
     */
    setupGlobalEventListeners() {
        // 键盘快捷键支持
        document.addEventListener('keydown', this.handleKeydown);
        
        // 窗口大小变化时调整按钮位置
        window.addEventListener('resize', this.handleResize);
        
        // 监听工作区缩放变化
        if (this.workspace) {
            this.workspace.addChangeListener((event) => {
                if (event.type === Blockly.Events.VIEWPORT_CHANGE) {
                    this.updateZoomState();
                }
            });
        }
    }

    /**
     * 处理键盘快捷键
     */
    handleKeydown(event) {
        if (!this.isInitialized) return;

        const { ctrlKey, shiftKey, key } = event;
        
        // Ctrl+Shift+C: 回中
        if (ctrlKey && shiftKey && key === 'C') {
            event.preventDefault();
            this.handleButtonClick('center', () => this.handleCenterClick());
        }
        // Ctrl+=: 放大
        else if (ctrlKey && key === '=') {
            event.preventDefault();
            this.handleButtonClick('zoomIn', () => this.handleZoomInClick());
        }
        // Ctrl+-: 缩小
        else if (ctrlKey && key === '-') {
            event.preventDefault();
            this.handleButtonClick('zoomOut', () => this.handleZoomOutClick());
        }
    }

    /**
     * 处理窗口大小变化
     */
    handleResize() {
        // 响应式调整按钮位置和大小
        const container = document.querySelector('.blcokly-action-buttons');
        if (!container) return;

        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            container.classList.add('mobile-layout');
        } else {
            container.classList.remove('mobile-layout');
        }
    }

    /**
     * 设置可访问性属性
     */
    setupAccessibility() {
        const container = document.querySelector('.blcokly-action-buttons');
        if (container) {
            container.setAttribute('role', 'toolbar');
            container.setAttribute('aria-label', '工作区操作按钮');
        }

        // 为每个按钮设置可访问性属性
        Object.keys(this.buttons).forEach(buttonType => {
            const button = this.buttons[buttonType];
            if (button) {
                button.setAttribute('aria-describedby', `${buttonType}-description`);
            }
        });
    }

    /**
     * 销毁组件
     */
    destroy() {
        // 移除事件监听器
        document.removeEventListener('keydown', this.handleKeydown);
        window.removeEventListener('resize', this.handleResize);
        
        // 清理按钮引用
        this.buttons = {};
        this.isInitialized = false;
    }
}

// 创建全局实例
let customWorkspaceButtons;

// 确保在页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        customWorkspaceButtons = new CustomWorkspaceButtons();
    });
} else {
    customWorkspaceButtons = new CustomWorkspaceButtons();
}

// 导出到全局作用域以便调试
window.CustomWorkspaceButtons = CustomWorkspaceButtons;
window.customWorkspaceButtons = customWorkspaceButtons;