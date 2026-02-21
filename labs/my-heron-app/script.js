// 多图片随机映射字典 (请确保文件名与你 images 文件夹里的一致)
const heronImages = {
    joy: ['AAA1.gif', 'AAA2.jpg','joy_1.gif','joy_2.gif','joy_3.gif','joy_4.gif',
        'joy_5.jpg','joy_6.jpg','joy_7.jpg','joy_8.gif','joy_9.jpg','joy_10.jpg','joy_11.jpg'],

    sadness: ['AAA1.gif', 'AAA2.jpg','sad_1.gif','sad_2.jpg','sad_3.jpg','sad_4.jpg','sad_5.gif',
        'sad_6.jpg','sad_7.jpg','sad_8.jpg',],

    anger: ['AAA1.gif', 'AAA2.jpg','angry_1.jpg','angry_1.jpg','angry_2.gif','angry_3.jpg','angry_4.jpg','angry_5.jpg',
        'angry_6.jpg','angry_7.jpg','angry_8.jpg'],

    fear: ['AAA1.gif', 'AAA2.jpg','scared_1.jpg'],

    surprise: ['AAA1.gif', 'AAA2.jpg','shocked_1.jpg','shocked_2.jpg'],

    love: ['AAA1.gif', 'AAA2.jpg','love_1.jpg','love_2.jpg','love_3.jpg',],

    default: ['AAA1.gif', 'AAA2.jpg','neutral_1.jpg','neutral_2.gif','neutral_3.jpg','neutral_4.jpg','neutral_5.jpg','neutral_6.jpg']

};

const textInput = document.getElementById('text-input');
const analyzeBtn = document.getElementById('analyze-btn');
const statusMsg = document.getElementById('status-msg');
const heronImg = document.getElementById('heron-img');
const emotionLabel = document.getElementById('emotion-label');

analyzeBtn.addEventListener('click', async () => {
    const text = textInput.value.trim();
    if (!text) {
        statusMsg.textContent = "请先输入一点内容哦！";
        return;
    }

    statusMsg.textContent = "夜鹭正在跨海求签...";
    analyzeBtn.disabled = true;

    try {
        // 请求我们在 Vercel 部署好的后端接口
        // 如果你是在本地 Live Server 测试，可能需要写成绝对路径，比如 'http://localhost:3000/api/analyze' (取决于你的本地环境)
        // 部署上线后，使用相对路径 '/api/analyze' 是最稳妥的
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });

        // 拦截 HTTP 状态码错误 (比如 503 冷启动报错)
        if (!response.ok) {
            const errData = await response.json();
            statusMsg.textContent = errData.error || "请求出现错误";
            return;
        }

        const data = await response.json();
        const topEmotion = data.label;

        // 随机出图逻辑
        const imagesArray = heronImages[topEmotion] || heronImages['default'];
        const imagePath = `images/${imagesArray[Math.floor(Math.random() * imagesArray.length)]}`;

        statusMsg.textContent = "识别成功！";
        emotionLabel.textContent = `心情: ${topEmotion}`;
        
        // =========================================
        // 触发 Q弹 动画逻辑
        // =========================================
        heronImg.style.display = 'inline-block';
        heronImg.src = imagePath;
        
        // 移除动画类名 -> 强制重排 -> 重新添加动画类名，确保每次点击都弹跳
        heronImg.classList.remove('animate-pop');
        void heronImg.offsetWidth; 
        heronImg.classList.add('animate-pop');

    } catch (error) {
        console.error("Fetch error:", error);
        statusMsg.textContent = "网络连接失败，请检查网络。";
    } finally {
        analyzeBtn.disabled = false;
    }
});