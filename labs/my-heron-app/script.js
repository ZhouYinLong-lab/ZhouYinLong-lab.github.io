// 从 CDN 动态导入 Transformers.js
import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.16.0';

// 禁用本地模型检测，强制从 Hugging Face Hub 下载模型到浏览器缓存
env.allowLocalModels = false;

// 1. 定义多图片随机映射字典
// 请确保你的 images 文件夹下有这些对应的文件
const heronImages = {
    joy: ['happy_1.jpg', 'happy_2.gif'], // 快乐
    sadness: ['sad_1.jpg'],              // 悲伤
    anger: ['angry_1.gif'],              // 愤怒
    fear: ['scared_1.jpg'],              // 恐惧
    surprise: ['shocked_1.jpg'],         // 惊讶
    love: ['love_1.jpg'],                // 爱/喜欢
    default: ['neutral_1.jpg']           // 兜底默认图
};

// DOM 元素获取
const textInput = document.getElementById('text-input');
const analyzeBtn = document.getElementById('analyze-btn');
const statusMsg = document.getElementById('status-msg');
const heronImg = document.getElementById('heron-img');
const emotionLabel = document.getElementById('emotion-label');

let classifier = null;

// 2. 初始化加载模型
async function loadModel() {
    try {
        statusMsg.textContent = "首次运行会自动下载模型到浏览器缓存 (约 250MB)，请耐心等待...";
        // 加载指定的轻量级情感分析模型
        classifier = await pipeline('text-classification', 'xenova/distilbert-base-uncased-emotion');
        
        statusMsg.textContent = "✅ 模型加载完毕，可以开始分析了！";
        analyzeBtn.textContent = "召唤夜鹭！";
        analyzeBtn.disabled = false;
    } catch (error) {
        console.error("模型加载失败:", error);
        statusMsg.textContent = "❌ 模型加载失败，请检查网络连接。";
    }
}

// 启动时自动加载模型
loadModel();

// 3. 随机抽取图片的辅助函数
function getRandomImage(emotion) {
    const imagesArray = heronImages[emotion] || heronImages['default'];
    const randomIndex = Math.floor(Math.random() * imagesArray.length);
    // 拼接相对路径
    return `images/${imagesArray[randomIndex]}`;
}

// 4. 处理分析按钮点击事件
analyzeBtn.addEventListener('click', async () => {
    const text = textInput.value.trim();
    if (!text) {
        statusMsg.textContent = "请先输入一点内容哦！";
        return;
    }

    if (!classifier) return;

    statusMsg.textContent = "夜鹭正在思考中...";
    analyzeBtn.disabled = true;

    try {
        // 进行本地 AI 推理
        const result = await classifier(text);
        // result 格式类似于: [{ label: "joy", score: 0.98 }]
        const topEmotion = result[0].label; 
        const confidence = (result[0].score * 100).toFixed(1);

        // 获取对应的随机图片路径
        const imagePath = getRandomImage(topEmotion);

        // 更新界面信息
        statusMsg.textContent = `分析完成！确信度: ${confidence}%`;
        emotionLabel.textContent = `心情: ${topEmotion}`;
        
        // 5. 触发 Q弹 动画逻辑
        heronImg.style.display = 'inline-block';
        heronImg.src = imagePath;
        
        // 关键技巧：移除动画类名 -> 强制浏览器重排(Reflow) -> 重新添加动画类名
        // 这样可以确保每次点击都能重新触发 CSS 的 @keyframes 动画
        heronImg.classList.remove('animate-pop');
        void heronImg.offsetWidth; // 触发重排的魔法代码
        heronImg.classList.add('animate-pop');

    } catch (error) {
        console.error("推理错误:", error);
        statusMsg.textContent = "分析过程中出现了点小问题。";
    } finally {
        analyzeBtn.disabled = false;
    }
});