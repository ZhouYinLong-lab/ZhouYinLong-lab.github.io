const heronImages = {
    joy: ['happy_1.jpg', 'happy_2.gif'],
    sadness: ['sad_1.jpg'],
    anger: ['angry_1.gif'],
    fear: ['scared_1.jpg'],
    surprise: ['shocked_1.jpg'],
    love: ['love_1.jpg'],
    default: ['neutral_1.jpg']
};

const textInput = document.getElementById('text-input');
const analyzeBtn = document.getElementById('analyze-btn');
const statusMsg = document.getElementById('status-msg');
const heronImg = document.getElementById('heron-img');
const emotionLabel = document.getElementById('emotion-label');

// 初始状态直接可用，不再需要加载模型
analyzeBtn.disabled = false;
analyzeBtn.textContent = "召唤夜鹭！";

analyzeBtn.addEventListener('click', async () => {
    const text = textInput.value.trim();
    if (!text) return;

    statusMsg.textContent = "夜鹭正在跨海求签...";
    analyzeBtn.disabled = true;

    try {
        // 请求我们刚才在 Vercel 创建的 API 路由
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });

        const data = await response.json();
        const topEmotion = data.label;

        // 随机出图逻辑
        const imagesArray = heronImages[topEmotion] || heronImages['default'];
        const imagePath = `images/${imagesArray[Math.floor(Math.random() * imagesArray.length)]}`;

        statusMsg.textContent = "识别成功！";
        emotionLabel.textContent = `心情: ${topEmotion}`;
        
        // Q弹动画
        heronImg.style.display = 'inline-block';
        heronImg.src = imagePath;
        heronImg.classList.remove('animate-pop');
        void heronImg.offsetWidth; 
        heronImg.classList.add('animate-pop');

    } catch (error) {
        statusMsg.textContent = "API 连接失败，请检查网络。";
    } finally {
        analyzeBtn.disabled = false;
    }
});