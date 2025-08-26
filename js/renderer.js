// Copy from: https://gitee.com/cocotais/boxy/blob/master/src/theme/codemao.renderer.js
// 检查是否已经定义，避免重复声明
if (!window.CustomConstantsProvider) {
    window.CustomConstantsProvider = class extends Blockly.zelos.ConstantProvider {
        constructor() {
            super()

            this.NOTCH_WIDTH = 0
            this.NOTCH_HEIGHT = 8

            this.CORNER_RADIUS = 4

            this.FIELD_TEXT_FONTSIZE = 10
            this.FIELD_TEXT_FONTWEIGHT = '500'

            this.TOP_ROW_MIN_HEIGHT = 2
            this.BOTTOM_ROW_MIN_HEIGHT = 2

            this.SELECTED_GLOW_COLOUR = '#4062f6'
            this.REPLACEMENT_GLOW_COLOUR = '#4062f6'
        }

        /**
         * @override
         */
        makeNotch() {
            const width = 0
            const height = 0

            /**
             * Since previous and next connections share the same shape
             * you can define a function to generate the path for both.
             */
            function makeMainPath(dir) {
                return Blockly.utils.svgPaths.line([
                    Blockly.utils.svgPaths.point(0, height),
                    Blockly.utils.svgPaths.point(dir * width, 0),
                    Blockly.utils.svgPaths.point(0, -height)
                ])
            }

            const pathLeft = makeMainPath(1)
            const pathRight = makeMainPath(-1)

            return {
                width: width,
                height: height + this.NOTCH_HEIGHT,
                pathLeft: pathLeft,
                pathRight: pathRight
            }
        }
    }
}

if (!window.CustomRenderer) {
    window.CustomRenderer = class extends Blockly.zelos.Renderer {
        constructor(name) {
            super(name)
        }

        makeConstants_() {
            return new window.CustomConstantsProvider()
        }
    }
}

/**
 * 变量弹窗管理器
 */
class VariableModalManager {
    constructor(workspace) {
        this.workspace = workspace
        this.isVisible = false
        this.modalElement = null
        this.formData = {
            variableName: '',
            variableType: 'String',
            description: ''
        }
        this.validationRules = {
            variableName: {
                required: true,
                pattern: /^[a-zA-Z_$][a-zA-Z0-9_$]*$/,
                minLength: 1,
                maxLength: 50
            }
        }
        this.reservedWords = ['var', 'let', 'const', 'function', 'class', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'return']
        
        this.init()
    }

    init() {
        this.createModalTemplate()
        this.bindEvents()
        this.overrideVariableCreation()
    }

    createModalTemplate() {
        const modalHTML = `
            <div class="variable-modal-overlay" style="display: none;">
                <div class="variable-modal-container">
                    <div class="variable-modal-header">
                        <h3 class="modal-title">
                            创建新变量
                        </h3>
                        <button class="modal-close-btn" type="button">
                            <span>×</span>
                        </button>
                    </div>
                    
                    <div class="variable-modal-body">
                        <form class="variable-form" novalidate>
                            <div class="form-group">
                                <label class="form-label" for="variableName">
                                    <span class="label-text">变量名称</span>
                                    <span class="label-required">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="variableName"
                                    class="form-input"
                                    placeholder="请输入变量名称（如：myVariable）"
                                    autocomplete="off"
                                    spellcheck="false"
                                />
                                <div class="form-error" id="variableNameError"></div>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label" for="variableType">
                                    <span class="label-text">变量类型</span>
                                </label>
                                <select id="variableType" class="form-select">
                                    <option value="String">📝 字符串 (String)</option>
                                    <option value="Number">🔢 数字 (Number)</option>
                                    <option value="Boolean">✅ 布尔值 (Boolean)</option>
                                    <option value="Array">📋 数组 (Array)</option>
                                    <option value="Object">📦 对象 (Object)</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label" for="variableDescription">
                                    <span class="label-text">变量描述</span>
                                    <span class="label-optional">(可选)</span>
                                </label>
                                <textarea 
                                    id="variableDescription"
                                    class="form-textarea"
                                    placeholder="请输入变量的用途描述..."
                                    rows="3"
                                ></textarea>
                            </div>
                        </form>
                    </div>
                    
                    <div class="variable-modal-footer">
                        <button type="button" class="btn btn-cancel">
                            <span class="btn-text">取消</span>
                        </button>
                        <button type="button" class="btn btn-primary">
                            <span class="btn-icon">✨</span>
                            <span class="btn-text">创建变量</span>
                        </button>
                    </div>
                </div>
            </div>
        `
        document.body.insertAdjacentHTML('beforeend', modalHTML)
        
        this.modalElement = document.querySelector('.variable-modal-overlay')
        this.formElements = {
            variableName: document.getElementById('variableName'),
            variableType: document.getElementById('variableType'),
            variableDescription: document.getElementById('variableDescription')
        }
    }

    bindEvents() {
        const { modalElement, formElements } = this
        
        modalElement.querySelector('.modal-close-btn').addEventListener('click', () => {
            this.hideModal()
        })
        
        modalElement.querySelector('.btn-cancel').addEventListener('click', () => {
            this.hideModal()
        })
        
        modalElement.querySelector('.btn-primary').addEventListener('click', () => {
            this.handleSubmit()
        })
        
        modalElement.addEventListener('click', (e) => {
            if (e.target === modalElement) {
                this.hideModal()
            }
        })
        
        document.addEventListener('keydown', (e) => {
            if (this.isVisible) {
                if (e.key === 'Escape') {
                    this.hideModal()
                } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    this.handleSubmit()
                }
            }
        })
        
        formElements.variableName.addEventListener('input', () => {
            this.validateField('variableName')
        })
        
        formElements.variableName.addEventListener('blur', () => {
            this.validateField('variableName')
        })
        
        formElements.variableName.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSubmit()
            }
        })
    }

    overrideVariableCreation() {
        const originalVariableCallback = Blockly.Variables.flyoutCategory
        
        Blockly.Variables.flyoutCategory = (workspace) => {
            const xmlList = originalVariableCallback(workspace)
            
            xmlList.forEach((xml) => {
                if (xml.tagName === 'button' && xml.getAttribute('text')) {
                    const buttonText = xml.getAttribute('text')
                    if (buttonText.includes('创建变量') || buttonText.includes('Create variable')) {
                        xml.setAttribute('text', '创建新变量')
                        xml.setAttribute('callbackKey', 'CUSTOM_CREATE_VARIABLE')
                    }
                }
            })
            
            return xmlList
        }

        this.workspace.registerButtonCallback('CUSTOM_CREATE_VARIABLE', () => {
            this.showModal()
        })
    }

    showModal() {
        this.isVisible = true
        this.resetForm()
        
        this.modalElement.style.display = 'flex'
        
        requestAnimationFrame(() => {
            this.modalElement.classList.add('show')
        })
        
        setTimeout(() => {
            this.formElements.variableName.focus()
        }, 300)
        
        document.body.style.overflow = 'hidden'
    }

    hideModal() {
        this.isVisible = false
        this.modalElement.classList.remove('show')
        
        setTimeout(() => {
            this.modalElement.style.display = 'none'
            document.body.style.overflow = ''
        }, 300)
    }

    resetForm() {
        this.formData = {
            variableName: '',
            variableType: 'String',
            description: ''
        }
        
        this.formElements.variableName.value = ''
        this.formElements.variableType.value = 'String'
        this.formElements.variableDescription.value = ''
        
        this.clearValidationErrors()
    }

    validateField(fieldName) {
        const field = this.formElements[fieldName]
        const value = field.value.trim()
        const rules = this.validationRules[fieldName]
        const errorElement = document.getElementById(`${fieldName}Error`)
        
        let isValid = true
        let errorMessage = ''
        
        if (rules.required && !value) {
            isValid = false
            errorMessage = '此字段为必填项'
        } else if (value && rules.pattern && !rules.pattern.test(value)) {
            isValid = false
            errorMessage = '变量名只能包含字母、数字、下划线，且不能以数字开头'
        } else if (value && rules.minLength && value.length < rules.minLength) {
            isValid = false
            errorMessage = `最少需要 ${rules.minLength} 个字符`
        } else if (value && rules.maxLength && value.length > rules.maxLength) {
            isValid = false
            errorMessage = `最多只能 ${rules.maxLength} 个字符`
        } else if (value && this.reservedWords.includes(value.toLowerCase())) {
            isValid = false
            errorMessage = '不能使用保留关键字作为变量名'
        } else if (value && this.isVariableExists(value)) {
            isValid = false
            errorMessage = '变量名已存在，请使用其他名称'
        }
        
        if (isValid) {
            field.classList.remove('error', 'shake')
            errorElement.textContent = ''
        } else {
            field.classList.add('error')
            errorElement.textContent = errorMessage
            
            field.classList.add('shake')
            setTimeout(() => field.classList.remove('shake'), 300)
        }
        
        return isValid
    }

    clearValidationErrors() {
        Object.keys(this.formElements).forEach(fieldName => {
            const field = this.formElements[fieldName]
            const errorElement = document.getElementById(`${fieldName}Error`)
            
            field.classList.remove('error', 'shake')
            if (errorElement) {
                errorElement.textContent = ''
            }
        })
    }

    isVariableExists(variableName) {
        const existingVariables = this.workspace.getAllVariables()
        return existingVariables.some(variable => variable.name === variableName)
    }

    handleSubmit() {
        const isValid = this.validateField('variableName')
        
        if (!isValid) {
            return
        }
        
        const variableName = this.formElements.variableName.value.trim()
        const variableType = this.formElements.variableType.value
        const description = this.formElements.variableDescription.value.trim()
        
        try {
            const variable = this.workspace.createVariable(variableName, variableType)
            
            this.showNotification(`变量 "${variableName}" 创建成功！`, 'success')
            
            this.hideModal()
            
            this.workspace.refreshToolboxSelection()
            
            this.emitEvent('variableCreated', {
                variable,
                type: variableType,
                description
            })
            
        } catch (error) {
            this.showNotification('创建变量失败，请重试', 'error')
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div')
        notification.textContent = message
        
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        }
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10001;
            background: ${colors[type] || colors.info};
            box-shadow: 0 4px 16px rgba(0,0,0,0.15);
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            font-size: 14px;
            max-width: 300px;
            word-wrap: break-word;
        `

        document.body.appendChild(notification)

        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)'
        })

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)'
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification)
                }
            }, 300)
        }, 3000)
    }

    emitEvent(eventName, data) {
        const event = new CustomEvent(`variableModal:${eventName}`, {
            detail: data
        })
        document.dispatchEvent(event)
    }

    destroy() {
        if (this.modalElement && this.modalElement.parentNode) {
            this.modalElement.parentNode.removeChild(this.modalElement)
        }
        
        const styleElement = document.getElementById('variable-modal-styles')
        if (styleElement && styleElement.parentNode) {
            styleElement.parentNode.removeChild(styleElement)
        }
        
        document.body.style.overflow = ''
    }
}

// 全局变量
let completeSolution = null
let originalMethods = {}

/**
 * 完整解决方案类
 */
class CompleteUltimateSolution {
    constructor() {
        this.workspace = null
        this.isInitialized = false
        this.styleApplied = false
        this.methodsOverridden = false
    }

    init(workspace) {
        this.workspace = workspace
        
        this.applyStyles()
        this.waitAndOverrideAllMethods()
        this.startMonitoring()
        
        this.isInitialized = true
    }

    applyStyles() {
        
        this.styleApplied = true
    }

    waitAndOverrideAllMethods() {
        const waitForBlockly = () => {
            if (typeof Blockly === 'undefined' || !Blockly.Variables) {
                setTimeout(waitForBlockly, 100)
                return
            }

            this.overrideAllVariableMethods()
        }

        waitForBlockly()
    }

    overrideAllVariableMethods() {
        try {
            if (Blockly.Variables && Blockly.Variables.createVariableButtonHandler) {
                originalMethods.createVariableButtonHandler = Blockly.Variables.createVariableButtonHandler
                Blockly.Variables.createVariableButtonHandler = (workspace, opt_callback, opt_type) => {
                    this.showCustomDialog(workspace, opt_callback, opt_type)
                }
            }

            if (Blockly.Variables && Blockly.Variables.createVariable) {
                originalMethods.createVariable = Blockly.Variables.createVariable
                Blockly.Variables.createVariable = (workspace, opt_callback, opt_type) => {
                    this.showCustomDialog(workspace, opt_callback, opt_type)
                }
            }

            if (Blockly.Variables && Blockly.Variables.promptName) {
                originalMethods.promptName = Blockly.Variables.promptName
                Blockly.Variables.promptName = (promptText, defaultText, callback) => {
                    this.showCustomDialog(this.workspace, callback)
                }
            }

            if (Blockly.Variables && Blockly.Variables.flyoutCategory) {
                const originalFlyoutCategory = Blockly.Variables.flyoutCategory
                Blockly.Variables.flyoutCategory = (workspace) => {
                    const result = originalFlyoutCategory.call(this, workspace)
                    
                    setTimeout(() => {
                        this.setupFlyoutButtonOverride()
                    }, 100)
                    
                    return result
                }
            }

            this.methodsOverridden = true

        } catch (error) {
            // 方法覆盖失败时的处理
        }
    }

    setupFlyoutButtonOverride() {
        const isVariableCategoryActive = this.isVariableCategoryActive()
        
        const flyoutButtons = document.querySelectorAll('.blocklyFlyoutButton')
        
        flyoutButtons.forEach((button, index) => {
            const textElement = button.querySelector('text')
            if (textElement) {
                const text = textElement.textContent || ''
                
                if (text.includes('创建') || text.includes('Create') || 
                    text.includes('变量') || text.includes('Variable') ||
                    text.toLowerCase().includes('new')) {
                    
                    if (isVariableCategoryActive) {
                        if (button.dataset.completeOverridden === 'true') {
                            return
                        }
                        
                        const newButton = button.cloneNode(true)
                        button.parentNode.replaceChild(newButton, button)
                        
                        newButton.addEventListener('click', (event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            event.stopImmediatePropagation()
                            
                            this.showCustomDialog(this.workspace)
                            return false
                        }, true)
                        
                        newButton.dataset.completeOverridden = 'true'
                        newButton.dataset.overrideTime = Date.now()
                        
                    } else {
                        button.remove()
                    }
                }
            }
        })
    }

    isVariableCategoryActive() {
        const selectedTreeRow = document.querySelector('.blocklyTreeRowSelected')
        if (selectedTreeRow) {
            const label = selectedTreeRow.querySelector('.blocklyTreeLabel')
            const labelText = label ? label.textContent || '' : ''
            const ariaLabel = selectedTreeRow.getAttribute('aria-label') || ''
            const styleColor = selectedTreeRow.style.color || ''
            
            const isVariableCategory = 
                styleColor.includes('A65C81') ||
                labelText.includes('变量') || labelText.includes('Variable') ||
                ariaLabel.includes('变量') || ariaLabel.includes('Variable') ||
                labelText.toLowerCase().includes('variable') ||
                ariaLabel.toLowerCase().includes('variable')
            
            if (isVariableCategory) {
                return true
            }
        }
        
        const flyout = document.querySelector('.blocklyFlyout')
        if (flyout) {
            const flyoutButtons = flyout.querySelectorAll('.blocklyFlyoutButton text')
            const buttonTexts = Array.from(flyoutButtons).map(text => text.textContent || '')
            
            const hasVariableButtons = buttonTexts.some(content => {
                return content.includes('创建') || content.includes('Create') || 
                       content.includes('变量') || content.includes('Variable') ||
                       content.toLowerCase().includes('new') ||
                       content.toLowerCase().includes('variable')
            })
            
            if (hasVariableButtons) {
                return true
            }
        }
        
        if (this.workspace && this.workspace.getToolbox) {
            try {
                const toolbox = this.workspace.getToolbox()
                if (toolbox && toolbox.getSelectedItem) {
                    const selectedItem = toolbox.getSelectedItem()
                    if (selectedItem) {
                        const itemId = selectedItem.getId ? selectedItem.getId() : ''
                        
                        if (itemId === 'VARIABLE' || itemId === 'blockly-a' || 
                            itemId.toLowerCase().includes('variable')) {
                            return true
                        }
                    }
                }
            } catch (error) {
                // API检测失败时的处理
            }
        }

        const variableElement = document.getElementById('blockly-a')
        if (variableElement && variableElement.classList.contains('blocklyTreeRowSelected')) {
            return true
        }

        const selectedElements = document.querySelectorAll('.blocklyTreeRowSelected')
        for (const element of selectedElements) {
            if (element.id === 'blockly-a') {
                return true
            }
        }
        
        const allFlyoutContent = document.querySelector('.blocklyFlyout')
        if (allFlyoutContent && allFlyoutContent.innerHTML.includes('变量')) {
            return true
        }
        
        return false
    }

    startMonitoring() {
        setInterval(() => {
            if (!document.getElementById('complete-solution-styles')) {
                this.applyStyles()
            }
            
            this.updateDynamicStyles()
        }, 1000)

        setInterval(() => {
            if (this.methodsOverridden && Blockly.Variables) {
                const handler = Blockly.Variables.createVariableButtonHandler
                if (handler && !handler.toString().includes('showCustomDialog')) {
                    this.overrideAllVariableMethods()
                }
            }
            
            this.setupFlyoutButtonOverride()
        }, 1000)

        document.addEventListener('click', (event) => {
            const target = event.target
            if (target && target.closest('.blocklyTreeRow')) {
                setTimeout(() => {
                    this.updateDynamicStyles()
                }, 100)
            }
        })

        const observer = new MutationObserver((mutations) => {
            let needsButtonOverride = false
            let needsStyleUpdate = false
            
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) {
                            if (node.classList?.contains('blocklyFlyout') ||
                                node.querySelector?.('.blocklyFlyoutButton')) {
                                needsButtonOverride = true
                            }
                            if (node.classList?.contains('blocklyTreeRow') ||
                                node.querySelector?.('.blocklyTreeRow')) {
                                needsStyleUpdate = true
                            }
                        }
                    })
                }
                
                if (mutation.type === 'attributes' && 
                    mutation.target.classList?.contains('blocklyTreeRow')) {
                    needsStyleUpdate = true
                }
            })

            if (needsButtonOverride) {
                setTimeout(() => {
                    this.setupFlyoutButtonOverride()
                }, 200)
            }
            
            if (needsStyleUpdate) {
                setTimeout(() => {
                    this.updateDynamicStyles()
                }, 100)
            }
        })

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style']
        })
    }

    updateDynamicStyles() {
        const allTreeRows = document.querySelectorAll('.blocklyTreeRow')
        
        allTreeRows.forEach(row => {
            const label = row.querySelector('.blocklyTreeLabel')
            if (!label) return
            
            const isVariableCategory = 
                row.style.color?.includes('A65C81') ||
                row.getAttribute('aria-label')?.includes('变量') ||
                row.getAttribute('aria-label')?.includes('Variable') ||
                label.textContent?.includes('变量') ||
                label.textContent?.includes('Variable')
            
            const isSelected = row.classList.contains('blocklyTreeRowSelected')
            
            if (isVariableCategory && isSelected) {
                label.style.setProperty('background', '#FEE7C5', 'important')
                label.style.setProperty('color', '#2c2c2c', 'important')
                label.style.setProperty('border-radius', '8px', 'important')
                label.style.setProperty('padding', '16px 40px', 'important')
                label.style.setProperty('font-weight', 'bold', 'important')
                label.style.setProperty('box-shadow', '0 2px 8px rgba(254, 231, 197, 0.5)', 'important')
                label.style.setProperty('border', '2px solid #E6D3B7', 'important')
                label.style.setProperty('transition', 'all 0.3s ease', 'important')
            } else if (isSelected) {
                label.style.removeProperty('background')
                label.style.removeProperty('color')
                label.style.removeProperty('border-radius')
                label.style.setProperty('padding', '8px 16px', 'important')
                label.style.removeProperty('font-weight')
                label.style.removeProperty('box-shadow')
                label.style.removeProperty('border')
                label.style.setProperty('transition', 'all 0.3s ease', 'important')
            }
        })
    }

    showCustomDialog(workspace, callback, type) {
        this.closeDialog()

        const modal = document.createElement('div')
        modal.className = 'complete-modal'
        modal.innerHTML = `
            <div class="complete-modal-content">
    
                <h3>创建新变量</h3>
                <input type="text" id="complete-variable-input" placeholder="请输入变量名称" autocomplete="off">
                <div class="buttons">
                    <button type="button" class="btn-cancel">取消</button>
                    <button type="button" class="btn-create">创建变量</button>
                </div>
            </div>
        `

        document.body.appendChild(modal)

        const input = document.getElementById('complete-variable-input')
        setTimeout(() => input.focus(), 100)

        const cancelBtn = modal.querySelector('.btn-cancel')
        const createBtn = modal.querySelector('.btn-create')

        cancelBtn.onclick = () => this.closeDialog()
        createBtn.onclick = () => this.createVariable(input.value, callback, type)
        
        modal.onclick = (e) => {
            if (e.target === modal) {
                this.closeDialog()
            }
        }

        input.onkeypress = (e) => {
            if (e.key === 'Enter') {
                this.createVariable(input.value, callback, type)
            }
        }

        const handleKeydown = (e) => {
            if (e.key === 'Escape') {
                this.closeDialog()
                document.removeEventListener('keydown', handleKeydown)
            }
        }
        document.addEventListener('keydown', handleKeydown)

        this.currentCallback = callback
        this.currentType = type
        this.currentWorkspace = workspace
    }

    createVariable(name, callback, type) {
        const variableName = name.trim()

        if (!variableName) {
            alert('请输入变量名称')
            return
        }

        const workspace = this.currentWorkspace || this.workspace
        const existingVariables = workspace.getAllVariables()
        const exists = existingVariables.some(variable => variable.name === variableName)

        if (exists) {
            alert('变量名已存在，请使用其他名称')
            return
        }

        try {
            const variable = workspace.createVariable(variableName, type || this.currentType)
            
            if (callback || this.currentCallback) {
                (callback || this.currentCallback)(variable)
            }

            this.closeDialog()

            setTimeout(() => this.applyStyles(), 100)

        } catch (error) {
            alert('创建变量失败: ' + error.message)
        }
    }

    closeDialog() {
        const modal = document.querySelector('.complete-modal')
        if (modal) {
            modal.remove()
        }
        
        this.currentCallback = null
        this.currentType = null
        this.currentWorkspace = null
    }

    forceReinit() {
        this.applyStyles()
        this.overrideAllVariableMethods()
        setTimeout(() => this.setupFlyoutButtonOverride(), 500)
    }

    manualTrigger() {
        this.showCustomDialog(this.workspace)
    }
}

/**
 * 初始化完整版解决方案
 */
function initCompleteSolution(workspace) {
    if (!completeSolution) {
        completeSolution = new CompleteUltimateSolution()
    }
    
    completeSolution.init(workspace)
    
    window.completeSolution = completeSolution
    return completeSolution
}

/**
 * 便捷初始化函数
 */
const initCustomVariableModal = (workspace) => {
    const modalManager = new VariableModalManager(workspace)
    return modalManager
}

const initEnhancedRenderer = (workspace) => {
    const modalManager = new VariableModalManager(workspace)
    const completeSolution = new CompleteUltimateSolution()
    completeSolution.init(workspace)
    
    return {
        modalManager,
        completeSolution,
        showVariableModal: () => modalManager.showModal(),
        hideVariableModal: () => modalManager.hideModal(),
        destroy: () => modalManager.destroy()
    }
}

// 导出到全局
window.CustomRenderer = CustomRenderer
window.VariableModalManager = VariableModalManager
window.CompleteUltimateSolution = CompleteUltimateSolution
window.initCompleteSolution = initCompleteSolution
window.initCustomVariableModal = initCustomVariableModal
window.initEnhancedRenderer = initEnhancedRenderer

// 自动初始化逻辑
document.addEventListener('DOMContentLoaded', () => {
    const blocklyDiv = document.getElementById('blocklyDiv')
    if (blocklyDiv && window.workspace) {
        initCompleteSolution(window.workspace)
    }
})

// 注册自定义渲染器 - 兼容不同版本的 Blockly
try {
    if (Blockly.blockRendering && Blockly.blockRendering.register) {
        Blockly.blockRendering.register('codemao', CustomRenderer)
    } else if (Blockly.registry && Blockly.registry.register) {
        Blockly.registry.register(
            Blockly.registry.Type.RENDERER,
            'codemao',
            CustomRenderer
        )
    }
} catch (error) {
    // 如果注册失败，使用默认渲染器
}
